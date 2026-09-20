---
title: "DMP '26 Week 08 Update by Noaman Akhtar"
excerpt: "Building the first offline provider test suite and removing the event-loop bottleneck that blocked concurrent Sugar-AI requests."
category: "DEVELOPER NEWS"
date: "2026-08-09"
slug: "2026-08-09-dmp-26-noaman-week08"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week08,noaman-akhtar,sugar-ai,ai-optimization,testing,pytest,concurrency,async"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-03 - 2026-08-09

---

## Goals for This Week

- Establish the first automated test foundation for Sugar-AI's provider layer.
- Keep the initial tests fully offline, without model downloads, API keys, network access, Docker, or a running application server.
- Verify the shared generation-parameter contract and the provider factory before testing live model execution.
- Cover the differences between Hugging Face, Ollama, Gemini, and OpenAI-compatible provider request formats.
- Keep FastAPI responsive while remote providers, local inference, or document retrieval are running.
- Verify that concurrent requests overlap correctly without promising unlimited model capacity.

---

## Why Provider Tests Matter Now

The provider refactor gave Sugar-AI a common interface for several different model backends. That flexibility also creates a new kind of regression risk. A small change to a shared parameter object, factory branch, or message conversion helper can affect every provider even when the change was intended for only one of them.

Until this week, most verification was manual. Manual checks are useful for confirming that a real model responds, but they are slow, require a particular environment, and do not give the project a dependable check that can run on every change. The next phase therefore needed a small test suite that could validate the provider contract quickly and repeatably.

I started this work in [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157). The initial target was not end-to-end inference. It was a stable offline foundation that could catch configuration and translation errors before a test needed to load a model or call an external service.

The week also included a concurrency pass on the running application. The provider tests protect the multi-provider contract, while the concurrency work makes sure that one slow model request does not hold the FastAPI event loop hostage.

## Keeping Sugar-AI Responsive During Model Requests

The Sugar-AI routes were declared with `async def`, but some of the work they called was still synchronous. A slow model generation or document retrieval operation could therefore block the single Uvicorn worker's event loop. The practical effect was that requests were handled one after another, even when the server could otherwise have accepted more work. Before the fix, a lightweight `GET /openapi.json` request took about 0.21 seconds while the server was idle, but about 29.65 seconds when sent during a roughly 31.9-second model request.

The goal was to let the application continue serving unrelated requests while model work was in progress. The implementation uses two different strategies, depending on where the work runs.

### Asynchronous Remote Providers

Ollama, Gemini, and OpenAI-compatible providers wait for another process or server to generate the response. Their synchronous `httpx.Client` instances were replaced with `httpx.AsyncClient`, and their HTTP calls are now awaited. When Sugar-AI reaches that network wait, the event loop can process another request instead of remaining blocked until the model server responds.

The provider contract was updated at the same time. `generate`, `chat`, `health_check`, and `close` are now asynchronous methods. The routes and `RAGAgent` were updated together so every provider call is awaited. This matters because an async method returns a coroutine until its caller awaits it. Updating only the provider would have returned coroutine objects instead of generated text.

### Local Inference and Retrieval

Local Hugging Face inference cannot become network-asynchronous because the Transformers pipeline runs inside the Sugar-AI process. Its blocking implementation remains in private synchronous helpers, while the public async methods call those helpers through FastAPI's threadpool. The same pattern is used for Hugging Face chat generation and health checks.

FAISS and LangChain retrieval can also block the event loop, so retriever invocation was moved to the threadpool as well. This does not make local inference infinitely faster or guarantee that two local generations will run efficiently at the same time. Its purpose is narrower and important: the event-loop thread remains available to handle unrelated API requests while a worker performs local model or retrieval work.

The resulting request flow is now:

```text
Client
  -> FastAPI route
    -> RAG agent
      -> FAISS retrieval in threadpool
      -> async provider request
        -> Ollama or remote model server
```

### Cleanup and Capacity Limits

Remote providers own asynchronous HTTP clients, so their `close()` methods await `aclose()`. The application closes the active provider during shutdown, and the previous provider is closed when a model is changed. The local Hugging Face provider keeps an async no-op close method because it does not own an HTTP client.

The Python GIL does not make this a guarantee of unlimited local throughput. For remote providers, the main benefit comes from asynchronous network I/O. For local Hugging Face and FAISS work, the threadpool protects responsiveness, while actual throughput still depends on CPU cores, GPU memory, model behavior, and native library execution. The accurate claim is that Sugar-AI no longer imposes an avoidable one-request-at-a-time event-loop bottleneck.

## Concurrency Verification

I compiled the changed Python modules with `py_compile`, ran `git diff --check`, and audited the provider call chain to confirm that generation, chat, health checks, and cleanup are awaited correctly.

For the runtime check, I used Ollama with the non-reasoning `llama3.2:1b` model and `OLLAMA_NUM_PARALLEL=2` on a local CPU. One direct Ollama request took 9.06 seconds and returned HTTP 200 with 660 characters. Two requests released together took 11.41 and 11.49 seconds, with a total wall-clock time of 11.49 seconds compared with 22.90 seconds summed across both clients. Both responses were complete.

I repeated the test through Sugar-AI's `POST /ask-llm-prompted` endpoint. One request took 10.39 seconds and returned 652 characters. Two simultaneous requests took 12.14 and 12.82 seconds, with a total wall-clock time of 12.82 seconds compared with 24.96 seconds summed across both clients. Both returned HTTP 200 and non-empty answers.

While those requests were running, `GET /openapi.json` returned HTTP 200 in approximately 0.006 seconds. This was the clearest before-and-after signal that the FastAPI event loop could respond to a lightweight request while generation was still in progress.

## Establishing an Offline Test Foundation

The first step was adding a dedicated `pytest.ini` configuration. Test discovery is limited to the `tests/` directory, and strict marker validation is enabled. Strict markers make an incorrectly named or unregistered marker fail early instead of silently changing how a test is collected.

I also registered a `live_provider` marker for a later class of tests that will intentionally contact a configured provider. Those tests are meant to be opt-in. The initial suite does not use that marker because it should remain safe to run on a development laptop or in continuous integration without credentials, model files, or network access.

To keep the dependency boundary clear, I added `requirements-dev.txt` with Pytest as a development-only dependency. Testing tools remain separate from Sugar-AI's production requirements, so adding the suite does not make the deployed service install another runtime dependency by accident.

## Testing the Generation Contract

The first behavioral tests cover `GenerationParams`, the shared object that carries generation settings from the API layer to a provider. It is a small object, but it is an important boundary because every backend receives the same internal representation before translating it into its own request format.

The tests verify the defaults for maximum output length, temperature, top-p, top-k, repetition penalty, truncation, and sampling. They also cover the relationship between temperature and sampling:

- At temperature zero, generation should be deterministic and sampling is disabled.
- At a positive temperature, sampling is enabled even if a caller tries to disable it manually.

Testing this rule directly protects behavior implemented in the provider base layer. It also prevents a future provider or route change from quietly producing different sampling behavior for the same request.

## Checking Provider Factory Configuration

The next group tests the `create_provider()` factory. The factory is responsible for selecting the correct implementation from configuration, so it is the point where a provider name becomes a concrete Hugging Face, Ollama, Gemini, or OpenAI-compatible provider.

These tests use mocks instead of constructing real providers. That lets me inspect the arguments passed to each constructor without loading a model or creating an HTTP client. The suite checks that the factory forwards the right model name and provider-specific settings, including:

- Hugging Face quantization and development-mode options;
- Ollama's base URL;
- Gemini credentials and endpoint configuration; and
- OpenAI-compatible endpoint configuration and API credentials.

The factory tests also cover every supported alias for the OpenAI-compatible provider, reject an unknown provider name, and verify that cloud providers fail early when the required API key is empty. Failing at configuration time is clearer and safer than allowing a request to travel to a provider and return a less useful authentication error later.

## Verifying Provider-Specific Parameter Mappings

Sugar-AI uses one `GenerationParams` format internally, but the backends do not use the same field names. The helper tests document and protect those translations.

The OpenAI-compatible provider uses standard fields such as `max_tokens`. Ollama expects names such as `num_predict` and `repeat_penalty`. Gemini uses camelCase fields including `maxOutputTokens`, `topP`, and `topK`. The tests confirm that each provider receives the fields it understands and that the shared internal names do not leak into a backend request unchanged.

This separation is one of the main benefits of the provider architecture. Routes and `RAGAgent` can work with one stable parameter object, while each provider owns the details of its external API. A test at this boundary makes that design visible and gives future provider changes a precise place to start.

## Gemini Messages and Response Parsing

Gemini needs additional tests because its chat format differs from the internal message format. The suite checks that system messages are separated into Gemini's system-instruction structure, user messages remain user messages, and assistant messages are converted to Gemini's `model` role.

The response tests cover another small but important edge case. Gemini can return text in multiple response parts, so the provider must join those parts into one answer. If the response contains no candidates, the helper should return an empty string instead of raising an indexing error. These cases are easy to miss when testing only a successful one-part response, but they are exactly the sort of provider-specific behavior that belongs in a focused unit test.

The initial helper coverage also protects the Hugging Face response and chat-normalization logic. That keeps the existing local provider behavior under the same test discipline as the newer HTTP providers.

## Verification

The first commits in [PR #157](https://github.com/sugarlabs/sugar-ai/pull/157) established nineteen offline test cases covering provider configuration, generation-parameter behavior, backend field mappings, message conversion, and response parsing.

The suite is intended to run with:

```powershell
.\venv\Scripts\python.exe -m pytest tests -q -p no:cacheprovider
```

The important property of this first layer is what it does not require. It does not download a model, read a provider API key, start Docker, contact Ollama or a cloud service, or launch the FastAPI application. Mocks and small helper inputs keep the feedback loop quick while still exercising the decisions that affect every provider.

This is a contract-level test layer, not a claim that every provider can generate a good answer in production. Live-provider tests will be useful later, but they need separate setup, explicit opt-in behavior, and a configured service. Keeping that distinction clear prevents an offline unit test from becoming dependent on external availability.

## Challenge and Key Learning

The challenging part was deciding what to test first. It would have been tempting to begin with a real prompt and a running model, but that would have tested the environment as much as it tested Sugar-AI. The more useful first step was to test the boundaries where provider-specific behavior enters the shared architecture.

The main lesson is that a provider abstraction needs tests for both sides of its contract. The shared side must preserve stable defaults and factory behavior. The backend side must translate those values into the exact field names, roles, and response shapes that each service expects. Testing only one side would leave the most error-prone part of the abstraction unprotected.

The suite also gives the project a better way to handle future changes. When asynchronous provider execution and resource cleanup are ready for coverage, those tests can build on the same offline foundation instead of starting from an unstructured collection of live requests.

The concurrency work reinforced a second lesson: declaring a route with `async def` is not enough if it immediately calls blocking code. Remote waits need real asynchronous I/O, while local inference and retrieval need a threadpool boundary. The benchmark also made the distinction between responsiveness and throughput explicit. The event loop can stay available without promising that one model can serve unlimited local generations at once.

## Plan for Next Week

The next stage is to extend the offline suite to the now-asynchronous provider execution methods: `generate`, `chat`, `health_check`, and resource cleanup. These tests should verify awaited results, failure paths, and client closure without requiring a live provider.

I will keep the same separation between fast offline tests and explicitly marked live-provider tests. The offline suite should continue to validate request construction and provider helper behavior without external services, while live tests can verify real compatibility against a configured backend when that environment is available. A separate load test should cover the RAG path and measure deployment-specific Ollama settings, since `OLLAMA_NUM_PARALLEL` depends on available CPU, GPU, and memory.

The provider design also leaves room for future inference servers such as vLLM, which can expose an OpenAI-compatible HTTP API. That work will require its own deployment and performance validation rather than being assumed from the current Ollama test.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Provider test suite:** [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157)
- **Pytest documentation:** [docs.pytest.org](https://docs.pytest.org/)
- **Ollama API reference:** [github.com/ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for the guidance on making the provider layer testable and responsive as the architecture expands. Establishing a small, deterministic test foundation alongside measured concurrency work will make the next provider changes easier to review with confidence.

---
