---
title: "DMP '26 Week 11 Update by Noaman Akhtar"
excerpt: "Completing asynchronous test coverage for the Gemini and Hugging Face providers, turning the generic contract research into a phased plan with audio deliberately deferred, giving every endpoint a declared contract with typed multimodal content, and receiving mentor reviews on three open pull requests."
category: "DEVELOPER NEWS"
date: "2026-08-30"
slug: "2026-08-30-dmp-26-noaman-week11"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week11,noaman-akhtar,sugar-ai,ai-optimization,testing,pytest,gemini,huggingface,contracts,multimodal"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-24 - 2026-08-30

---

## Goals for This Week

- Finish the asynchronous provider test suite with Gemini and Hugging Face coverage.
- Report per-provider statement coverage for the provider layer.
- Turn last week's contract research into a phased implementation plan that a mentor can read in a few minutes.
- Decide, with reasons, what the first phase of the contract includes and what it leaves out.
- Start phase 1 by giving every endpoint a declared input and output contract, then add typed content parts to it.
- Keep the working branches current with upstream `main`.

---

## Gemini Provider Tests

Gemini differs from the OpenAI-compatible format in three ways that matter for tests: it authenticates with an `x-goog-api-key` header rather than a `Bearer` token, it takes the system instruction as a separate `systemInstruction` field rather than as a message, and its reply is a list of `candidates` rather than `choices`. Each of those is now covered in `tests/test_async_gemini_provider.py`.

- The constructor test patches `httpx.AsyncClient` and asserts the client is created with the Gemini API key header and a normalized base URL.
- `chat()` is tested with a mocked `post` returning a `candidates` payload, checking both the request body and the returned text.
- Successful and failed health checks return `True` and `False` respectively.
- A default-parameter test confirms the generation config that is sent when the caller passes nothing.
- A system-instruction test asserts the instruction appears in the payload as Gemini expects rather than being merged into the user message.
- A final test returns a response with no `candidates` and checks that `chat()` yields an empty string instead of raising an `IndexError`.

The empty-candidates case matters in practice, for example when Gemini declines to answer and returns no candidates at all. Sugar-AI should return nothing rather than crash in that situation.

## Hugging Face Provider Tests

The Hugging Face provider is different again: it runs a local Transformers pipeline, which is synchronous and CPU or GPU bound. To keep the FastAPI event loop responsive, the asynchronous `generate()`, `chat()`, and `health_check()` methods hand the work to `run_in_threadpool` and await the result. That structure led to two layers of tests in `tests/test_async_huggingface_provider.py`.

The asynchronous layer patches `app.providers.huggingface.run_in_threadpool` with an `AsyncMock` and checks that each public method delegates to its synchronous counterpart through the thread pool and returns the awaited value. This is the check that protects the concurrency fix from [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156): if a future change called the pipeline directly, the test would fail.

The synchronous layer tests the functions that run inside the thread pool with a mocked pipeline. Covered behavior includes:

- The constructor in development mode building a `text-generation` pipeline with `torch.float32` on CPU (`device=-1`), so contributors without a GPU get a working provider.
- `_generate_sync` mapping `GenerationParams` onto pipeline keyword arguments and removing the echoed prompt from the output.
- `_chat_sync` formatting the message list and cleaning the response.
- The synchronous health check returning `True` when the pipeline produces output and `False` when it raises.
- `close()` being a no-op, because a local pipeline holds no HTTP client.
- `get_eos_token()` returning the tokenizer's end-of-sequence token, and `None` when the tokenizer does not expose one.

The EOS token tests were the point where the tokenizer concept finally made sense to me. The model emits a special token to say it is done; if Sugar-AI knows that token it can truncate the answer cleanly, and if it does not know it, returning `None` is the honest answer rather than guessing a string like `</s>`.

## Coverage and Verification

All four asynchronous test files pass locally with `python -m pytest -q`. Running with `--cov=app.providers --cov-report=term-missing` gave, before the final Hugging Face constructor and EOS token tests were added, `BaseProvider` at 94 percent, `OllamaProvider` at 100 percent, `GeminiProvider` at 98 percent, and `HuggingFaceProvider` at 75 percent statement coverage. The last four Hugging Face tests target lines that were still unexecuted at that point.

When the mentors asked in a meeting how coverage was being checked, this was the answer: `pytest-cov` at the package level, reported per file. It also settled a question about scope. Some Hugging Face prompt-extraction and normalization helpers were already tested in [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157), so those were not duplicated here. When the two branches are combined the overlap will be checked again.

I also brought the working branch up to date with upstream. It had fallen three commits behind `main` while the tests were being written, and continuing on stale code would have made the eventual pull request harder to review.

## From Contract Research to a Phased Plan

Last week's survey produced a long design document. This week I split it into three phases, each with a clear boundary.

- **Phase 1** adds typed text and image parts to the request format, with size caps and format checks for PNG and JPEG, and translates them for one image-capable provider. Images travel as Base64 inside the JSON request.
- **Phase 2** adds file upload with a returned file ID, so large media can be referenced instead of resent. It also owns storage, expiry, cleanup, and quota questions, which is why it is separate.
- **Phase 3** extends image support to the remaining providers once the contract shape is stable.

Two decisions came out of the planning, both recorded in a future-work registry so they are not lost.

The first is that **audio is deferred**. I checked each candidate client. Activity on Demand uses reference images, not audio. Speak-AI generates speech locally and never sends audio to a server. Sampler AI in Music Blocks calls its own external audio-generation service. When Sampler AI is eventually moved behind Sugar-AI, it will need audio *output* first, as a long-running job that returns a file, not audio input. One generic `audio` field would not describe any of those cases, so building it now would be guessing. The type name is reserved in the contract and nothing else.

The second is that **the contract must cover responses, not only requests**. Walter's original suggestion was about how activities send data to Sugar-AI. Working through Activity on Demand made it clear that activities also need a predictable response shape, including a way to ask for structured JSON output. That is now part of the phase 1 scope.

I also confirmed that Activity on Demand could use Sugar-AI as its provider after phase 1 without changes on the Sugar-AI side beyond the contract itself; the remaining adaptation would live in the activity.

## Giving Every Endpoint a Contract

With the phases agreed, I started phase 1. The first thing to settle was not images at all, it was the fact that the API had no contract to extend.

 Three problems, all visible from outside. `/ask` and `/ask-llm` took the question as a URL query parameter, with no length bound and no validation. Every endpoint hand-built its own response dict, so two endpoints returning "the same" thing returned different shapes. Errors came back as bare strings, which a caller can only match on by comparing English text. And underneath all of it, message content was typed as `str` through every layer, which is the actual reason images had nowhere to go.

So the week went on the contract itself, in a new `app/schemas/` package, taking the output side first because it was the one I could formalize without changing any behavior.

### The Output Contract

`app/schemas/responses.py` describes what each endpoint returns: `AskResponse` for `/ask`, `/ask-llm` and `/debug`, `PromptedResponse` and `ChatCompletionResponse` for the two modes of `/ask-llm-prompted`, plus `HealthResponse`, `ModelChangeResponse`, and the shared `QuotaInfo` and `GenerationParamsInfo` blocks. Every endpoint then declares its `response_model`.

The field names and shapes match exactly what the endpoints already emitted. That was deliberate. Declaring the models is a formalization, not a change, so this step could not break a caller even in principle, and FastAPI now publishes the whole thing as OpenAPI for free.

Errors got the treatment they actually needed. Every error now leaves the API in one envelope:

```json
{ "error": { "code": "quota_exceeded", "message": "Daily quota exceeded" } }
```

The code is stable and the message is for humans. `create_app()` registers three handlers to guarantee it: one for `HTTPException`, one for `RequestValidationError`, and a catch-all for uncaught exceptions so that even a bug leaves through the same door rather than as an HTML traceback. Statuses map to fixed codes, `401` to `unauthorized`, `422` to `validation_error`, `429` to `quota_exceeded`, and so on. An activity can now branch on `error.code` instead of pattern-matching a sentence that might be reworded next month.

### The Input Contract

Then the request side. `/ask`, `/ask-llm` and `/debug` accept a proper JSON body, with bounds on the fields: a question is 1 to 32,000 characters, a code sample up to 64,000. The old query-parameter form still works, marked deprecated in the OpenAPI description, so existing callers keep working and get migrated by documentation rather than by breakage.

`/ask-llm-prompted` was the interesting one. It serves two modes, a single question under a custom prompt, and a continuing chat, and each mode needs different fields. That was a stack of `if` checks in the handler. It is now a `model_validator` on the request model, so `chat=True` requires `messages`, `chat=False` requires both `question` and `custom_prompt`, and the failure names precisely which fields were missing. The rule now lives with the data it constrains, and the handler is left with the work it actually does.

### Typed Content Parts

Only then did images become a small change. A message's content is now either a plain string, exactly as before, or a list of typed parts:

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "What is in this picture?" },
    { "type": "image", "mime_type": "image/png", "data": "iVBORw0KGgo..." }
  ]
}
```

`TextPart`, `ImagePart` and `AudioPart` are discriminated on `type`, so an unknown part name is rejected by the schema. Each media part validates that its Base64 actually decodes, that it is not empty, and that it is within its cap, which is 5 MiB for an image and 20 MiB for audio. Mime types are restricted to PNG, JPEG and WebP for images, and WAV, MP3 and Ogg for audio.

Audio is input only. The model answers in text. Spoken replies are a different shape of problem, a long-running job that returns a file, and putting them in this contract now would be guessing at a design nobody has asked for yet.

The endpoints whose question is a single string rather than a conversation take an `attachments` field instead, so `/ask-llm` can be given a picture the question refers to without pretending it is a chat. `/ask` ignores attachments, because its retrieval step is over text documents.

Keeping `str` legal alongside the list is what makes all of this safe. Every existing caller sends a string and every existing caller still works.

Thirty-nine tests cover this layer: the response models, the error envelope including the uncaught-exception path, the request bodies and their bounds, the two-mode validation, and the part types with their size and encoding rules.

## Presentation and Mentor Reviews

Midweek I gave a short progress presentation covering the problem statement, the provider abstraction, the concurrency fix, reasoning control, and the new test suite. Preparing it forced a useful reframing: the reason Sugar Labs needs provider choice is that hosting a single model on shared credits does not scale to every school, and schools should be able to bring a local model or their own API instead.

The live stream failed partway through the session, so the presentation had to be recorded separately. I recorded it and sent the video to [Ashutosh](https://github.com/Ashutoshx7), who is combining it with the other contributors' presentations into a single video for the Sugar Labs YouTube channel. Fitting the whole project into seven minutes without stumbling took several retakes, but the final recording says what I wanted it to.

On 30 August, Mebin reviewed three open pull requests. On [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151) (think/no-think) he pointed out that `THINKING_HEADROOM` has no bounds validation, and that catching every `HTTPStatusError` for the think retry also retries ordinary 4xx and 5xx failures, doubling the wait when Ollama is down. He also flagged merge conflicts. On #156 (concurrency) he identified an edge case: `set_model()` closes the old provider with no synchronization against requests still using it, so an admin swapping models mid-generation would break those requests. On #157 (tests) he suggested adding a minimal GitHub Actions workflow so pytest runs on every pull request. All three are the work for next week.

## Challenge and Key Learning

The difficult part of the week was resisting the urge to build everything the research suggested. The contract design touched images, audio, file storage, structured output, and four providers. Deciding what phase 1 does *not* include, and writing down why, made the remaining scope small enough to implement and review. The registry of deferred items turned out to be as valuable as the plan itself.

## Plan for Next Week

- Address the review on #151: bounded configuration and a narrower Ollama retry, then resolve the conflicts.
- Address the review on #156: keep the old provider alive until in-flight requests finish.
- Add the pytest CI workflow requested on #157.
- Verify the think/no-think fallback against a real Ollama model rather than only against mocks.
- Continue phase 1: gate requests on what the active provider accepts, and translate content parts for each provider.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Think/no-think pull request:** [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151)
- **Concurrency pull request:** [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156)
- **Provider test suite:** [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157)
- **Gemini API reference:** [ai.google.dev/api](https://ai.google.dev/api)
- **Transformers pipelines:** [huggingface.co/docs/transformers](https://huggingface.co/docs/transformers/main_classes/pipelines)

---

## Acknowledgments

Thanks to Mebin for the detailed reviews across all three pull requests; each comment pointed at a real failure mode rather than style. Thanks also to Walter for the contract discussion that this week's plan grew out of.

---
