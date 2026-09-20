---
title: "DMP '26 Week 12 Update by Noaman Akhtar"
excerpt: "Addressing mentor reviews on three open pull requests: bounded reasoning settings and a narrower Ollama fallback verified against a real model, a provider lease so model changes stop breaking in-flight requests, a pytest CI workflow, and phase 1 of the contract carried through to image and audio support across three providers."
category: "DEVELOPER NEWS"
date: "2026-09-06"
slug: "2026-09-06-dmp-26-noaman-week12"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week12,noaman-akhtar,sugar-ai,ai-optimization,ollama,reasoning,concurrency,asyncio,github-actions,ci,contracts,multimodal,gemini,ollama-vision"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-31 - 2026-09-06

---

## Goals for This Week

- Resolve both review comments on the think/no-think pull request and its merge conflicts.
- Confirm the Ollama fallback behavior against a real model before relying on it.
- Fix the model-change race on the concurrency pull request so an admin swapping models does not break requests that are still generating.
- Add the CI workflow requested on the test-suite pull request.
- Decide where the contract should live, then carry phase 1 through to the providers.
- Settle open design questions about provider authentication and where the generic contract should live.

---

## Think/No-Think: Bounded Settings and a Narrower Fallback

Mebin's review of [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151) raised two points.

The first was that `THINKING_HEADROOM`, the number of extra output tokens reserved for reasoning when `think` is on, had no bounds. Any integer was accepted, including a negative one. I changed it to a Pydantic `Field` with `ge=0` and `le=8192`, matching the pattern already used for `max_length` and the other generation limits, so a bad `.env` value fails at startup rather than producing a confusing token budget at request time.

The second point was about the fallback for models that do not support thinking. The original code caught every `httpx.HTTPStatusError`, dropped `think` from the payload, and retried. As Mebin pointed out, that also catches ordinary 4xx and 5xx failures, so when Ollama is simply down the request is sent twice and the caller waits twice as long for the same error. The fix narrows the condition. `OllamaProvider` now sends the request once, and only if the response is `400 Bad Request` and Ollama's JSON error message contains `does not support thinking` does it strip `think` and retry. Any other failure goes straight to `raise_for_status()`.

### Verifying Against a Real Model

The narrower check depends on what Ollama actually returns, so I did not want to rely on the mocked tests alone. I sent `think: true` directly to a local Ollama instance for `llama3.2`, which does not support reasoning, on both `/api/generate` and `/api/chat`. Both returned HTTP 400 with an error stating the model does not support thinking. That confirmed the status code and message the new check looks for.

I then ran the same case through Sugar-AI. A call to `/ask-llm-prompted` with `think=true` on `llama3.2:latest` logged the 400 from Ollama, then the warning `Model llama3.2:latest does not support thinking; retrying without it.`, and returned a normal answer. The chat-mode call went through Ollama's `/api/chat` the same way. `THINKING_HEADROOM` was set explicitly in `.env` for the run to confirm the bounded field loads correctly.

### Merge Conflicts

While #151 was open, upstream merged a change that added `Field` bounds to the `PromptedLLMRequest` model in `app/routes/api.py`. My branch touched the same lines to add the `think` option, so the pull request could no longer merge cleanly. I resolved the conflict by keeping upstream's validation for `max_length`, temperature, and the sampling parameters, and keeping `think` alongside it. Invalid generation values are now rejected before they reach a provider, which is the behavior both changes wanted. The branch was rebased, pushed, and the review responses posted.

## Concurrency: A Lease on the Active Provider

On [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156), Mebin identified an edge case introduced by the fix itself. Once model generation no longer blocks the event loop, `/change-model` can run while `/ask-llm` is still generating. `set_model()` closed the old provider's HTTP client immediately, so the in-flight request would fail.

### Choosing the Behavior

There were two reasonable designs. One marks a model change as pending, rejects new AI requests until the current ones finish, then closes the old provider and loads the new one. The other swaps immediately for new requests but keeps the old provider open until every request that started on it has finished. I chose the second. The first would force the admin to either wait or be told to retry, and it turns a model change into a brief outage for everyone. Keeping the old provider alive until it is unused costs nothing for HTTP-backed providers.

The exception is local Hugging Face models, where the old and new pipelines would both sit in memory during the swap. That risk already exists in the current code, because the new provider is constructed before the old one is released. It is a separate policy question for local models.

### Implementation

The first step is knowing which requests are using which provider. `RAGAgent` now has an `asyncio.Condition` and an active-request counter, exposed through an asynchronous context manager:

```python
async with agent.use_provider() as provider:
    answer = await provider.generate(prompt, params)
```

Entering the block captures the current provider and increments the counter; leaving it decrements the counter and notifies waiters when it reaches zero. Every AI operation in `RAGAgent` (`run`, `generate`, `debug`, and the prompted chat path) and the health route in `app/routes/api.py` now hold a lease for their whole duration, so a request keeps the provider it started with even if `self.provider` changes underneath it. While making that change I also fixed an existing bug where a duplicate `settings` import inside the `/change-model` handler made every model-change request return HTTP 500.

### Verification

I tested a real switch with Ollama. With `llama3.2:1b` active, I started a debug-style request that makes two model calls, confirmed the lease count read one, and changed the model to `qwen3.5:0.8b` while it was running. `set_model()` returned immediately, the lease count returned to zero after the request ended, and the new provider reported healthy. The in-flight request still failed with a read error, because at this checkpoint `set_model()` does not yet wait for the counter before closing the old client. That result was expected: it confirms the lease tracking is correct and isolates the remaining work to the swap itself, which is the next commit on the branch.

A full application start for an end-to-end check stalled during FAISS index building, which rebuilds document embeddings on the CPU at every startup with no progress logging. I verified the route-level behavior with a lightweight FastAPI request instead and noted the startup cost as something to look at separately.

## CI for the Test Suite

Mebin's comment on [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157) was that, since this is the repository's first test suite, it should run automatically. I added `.github/workflows/ci.yml`. It triggers on pull requests targeting `main`, checks out the repository, sets up Python 3.10 with pip caching keyed on `requirements.txt` and `requirements-dev.txt`, installs both, and runs `python -m pytest -q`. The job has read-only `contents` permission. Because the suite is fully offline, the workflow needs no secrets, no model downloads, and no service containers, which is exactly why the tests were designed that way.

## Carrying the Contract Through to the Providers

Last week ended with typed content parts that every endpoint would accept and no provider could yet send. This week connected the two, which meant answering a question the contract had deferred: what happens when a caller sends a picture to a model that cannot see.

### Asking Rather Than Assuming

A provider now declares what it accepts. `GeminiProvider` declares text, image and audio, because `generateContent` takes all three inline on the current multimodal models. `OllamaProvider` declares text and image. `BaseProvider`, which speaks the OpenAI-compatible API, declares text only, and that one deserves explaining: whether such an endpoint accepts images depends entirely on the model sitting behind it, and the same base URL can serve both. Guessing generously there would produce confident failures, so the default stays narrow and a deployment widens it through a new `AI_SUPPORTED_MODALITIES` setting.

Ollama can do better than a declaration, because it will simply tell you. `detect_modalities()` asks `/api/show` for the model and reads its capability list, mapping `vision` to image input and `audio` to audio. A model that reports vision gets image support switched on for exactly as long as it stays the active model. If the server cannot be reached the provider keeps its default and logs a warning saying which assumption it fell back to, because a silent assumption is the thing I was trying to remove.

This is the part of the design I would defend hardest. The alternative, which I had in an early draft, was to quietly drop parts a provider could not handle and answer with the rest. That answers a question nobody asked. If a child sends a photo and a text-only model is configured, replying to the text while ignoring the photo is worse than saying plainly that this model does not accept images.

So the gate is explicit. A request whose modalities exceed the provider's returns `422` with the code `modality_not_supported`, and the message names the model, what it was sent, and what it does accept:

```
llama3.2:latest does not accept image input; it accepts text
```

### Three Wire Formats, One Contract

Each provider translates the same parts into its own shape, and the differences turned out to be more than cosmetic.

OpenAI-compatible endpoints take an image as a `data:` URL inside an `image_url` block, and audio as `input_audio`, where the field wants a format name like `wav` rather than a mime type, so the adapter maps between them. Gemini puts both images and audio in `inline_data` with the mime type intact, and its system instruction is text only, so media in a system message belongs in a turn instead. Ollama is the odd one: it does not interleave media with text at all, keeping the text in `content` and the images in a sibling `images` list, so the adapter has to split a single message into two fields.

None of that reaches an activity. That separation was the whole argument for having a contract, and this is the week it stopped being theoretical.

### Proving Nothing Broke

The risk in touching every endpoint is that something regresses quietly, so the last commit was an end-to-end test that drives real requests through the real stack with only the network faked, and asserts on the payload the provider would actually have received. It covers an attachment arriving as inline data, audio arriving the same way, parts surviving chat mode, the prompted-mode system instruction, and generation parameters reaching the model.

The test I care most about is the dullest one: a text-only request produces a provider payload byte-for-byte identical to what the old code sent. Every existing caller, Speak-AI included, is on that path. It is now checked on every run rather than assumed.

Fifty-three tests were added this week across gating, the three translations, Ollama's capability detection, and the end-to-end path, bringing the branch to ninety-nine. The repository had none before this work started.

## Design Discussions

Two design threads ran alongside the code.

Ibiam asked whether Sugar-AI should also integrate authentication for the OpenAI and Gemini providers. I separated two cases: a school that already has an API key from a provider, which Sugar-AI supports today by reading the key from configuration; and a school with a subscription or free account but no key, which would need an account-linking flow that Sugar-AI does not have. Ibiam confirmed the second case is the one he meant. I wrote up the current flow so we can agree on what such a feature would add before designing it.

The second thread was where the generic contract from the last two weeks should live, and this week it was settled. One option was a new versioned endpoint accepting typed content parts, leaving the existing text endpoints untouched. The other was to move the existing endpoints onto the contract, so that validation, error shape and media support lived in one place instead of being bolted onto each route.

I prototyped enough of the first to judge it, then chose the second. A versioned endpoint is the easier thing to ship, but it leaves the old routes exactly as they are: unvalidated query parameters, hand-built response dicts, bare-string errors. Sugar-AI would then have two contracts, a good one nobody uses yet and a bad one everybody uses, and the good one would have to be kept in step with the bad one indefinitely. Very few activities call Sugar-AI today, so this is the cheapest this migration will ever be, and every month it gets more expensive.

What made the choice comfortable was that migrating did not have to mean breaking. String content stays legal beside the new part list, the old query-parameter call style still works and is merely marked deprecated, and the byte-identical payload test proves a text-only request reaches the provider unchanged. The prototype of the versioned endpoint stays on its own branch as a record of what was compared.

## Challenge and Key Learning

The lesson this week came from the think/no-think retry. The original code worked in every manual check I had done, because the only failure I had ever provoked was the 400 from a model without reasoning support. It took a reviewer to ask what happens on a 503. Verifying the exact error Ollama returns, rather than assuming any HTTP error meant "unsupported", made the fix both smaller and correct. The general version: a fallback should match the specific failure it exists for, and nothing else.

## Plan for Next Week

- Finish the provider swap on #156 so `set_model()` waits for the lease count before closing the old provider, then cover it with tests.
- Bring the contract branch up to date with upstream `main`, confirm it against a live Gemini key, and open the pull request.
- Push the asynchronous provider tests as a follow-up to #157 once the CI workflow is reviewed.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Think/no-think pull request:** [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151)
- **Concurrency pull request:** [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156)
- **Provider test suite and CI workflow:** [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157)
- **Ollama API reference:** [ollama/docs/api.md](https://github.com/ollama/ollama/blob/main/docs/api.md)
- **asyncio synchronization primitives:** [docs.python.org](https://docs.python.org/3/library/asyncio-sync.html)
- **GitHub Actions documentation:** [docs.github.com/actions](https://docs.github.com/en/actions)

---

## Acknowledgments

Thanks to Mebin for reviews that each pointed at a concrete failure case, and to Ibiam for pushing on the provider authentication question until the two cases were clearly separated.

---
