---
title: "DMP '26 Week 10 Update by Noaman Akhtar"
excerpt: "Adding asynchronous provider tests with coverage measurement for the base and Ollama providers, and starting the design of a generic request contract so any Sugar activity can talk to Sugar-AI the same way."
category: "DEVELOPER NEWS"
date: "2026-08-23"
slug: "2026-08-23-dmp-26-noaman-week10"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week10,noaman-akhtar,sugar-ai,ai-optimization,testing,pytest,asyncio,coverage,contracts"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->
 
# Week 10 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-17 - 2026-08-23

---

## Goals for This Week

- Extend the offline provider test suite from synchronous helpers to the asynchronous `generate`, `chat`, `health_check`, and `close` methods.
- Start measuring test coverage so progress on the provider layer can be reported with numbers instead of a list of test names.
- Cover the `BaseProvider` HTTP path and the Ollama provider before moving on to Gemini and Hugging Face.
- Work out what a generic request contract for Sugar activities should look like, and find out which Sugar Labs projects would use it.

---

## Why Asynchronous Tests Come Next

Last week's tests covered the deterministic helpers: text cleanup, chat normalization, factory configuration, and request validation. None of them exercised the part of a provider that actually talks to a model. The `generate`, `chat`, `health_check`, and `close` methods are asynchronous, they build an HTTP payload, and they parse a provider-specific response. A regression in any of those would not be caught by the existing suite.

Testing them for real would need a running Ollama server, a Gemini API key, or a downloaded Hugging Face model. The goal for this week was to test the same code paths with controlled mocks, so the checks stay fast, offline, and safe to run on every change.

## Test Tooling

The test branch was created on top of the concurrency work from [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156), because the asynchronous provider methods are what that pull request makes non-blocking. The pytest foundation commit from [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157) was cherry-picked onto it so both branches share the same `pytest.ini` and marker configuration.

Two development dependencies were added. `pytest-asyncio` runs `async def` test functions, and `pytest.ini` now sets `asyncio_mode = auto`, so tests do not need an explicit `@pytest.mark.asyncio` decorator. `pytest-cov` measures statement coverage.

Coverage measurement did not work on the first attempt. Running pytest with `--cov=app.providers.base` on my Windows machine with Python 3.12 crashed the interpreter with an access violation during test collection, before any test ran. The same test passed normally without coverage. The crash happened while importing the module under test: importing `app.providers.base` pulls in `app/__init__.py`, which imports authentication and the database layer. Measuring the whole package with `--cov=app.providers` ran without the crash, so that became the standard command for this work. One side observation is that importing any provider module initializes unrelated application code, which is worth making lighter in a separate cleanup.

## Base Provider Execution Tests

The first test file, `tests/test_async_provider_execution.py`, covers the generic OpenAI-compatible HTTP provider that other providers build on.

- The constructor test patches `httpx.AsyncClient` and checks that the client is created with a 120 second timeout, a `Bearer` authorization header built from the API key, and a JSON content type. It also checks that a trailing slash on `base_url` is stripped.
- `close()` is tested by giving the provider a mock client and asserting that `aclose()` is awaited exactly once, so HTTP resources are released.
- `chat()` is tested with a mocked `post` that returns an OpenAI-style `choices` payload. The test asserts the request body sent to the provider and that the returned text is stripped of surrounding whitespace.
- `generate()` is tested to confirm it wraps a plain prompt into a single user message and returns the chat response.
- `health_check()` is tested for both outcomes: a successful request returns `True`, and a failing request returns `False` instead of raising.
- A final test calls `chat()` without parameters and with an empty `choices` list, confirming the default generation values are applied and an empty response yields an empty string rather than an exception.

Most of these tests create the provider with `object.__new__` and assign a mock client directly, so no real constructor and no real network client are involved.

## Ollama Provider Tests

Ollama uses a different request and response shape from the OpenAI format, so it gets its own file, `tests/test_async_ollama_provider.py`. The tests mirror the base provider set: constructor and base URL normalization (with the longer 300 second timeout that local models need), `generate()` sending the Ollama payload and reading the `response` field, `chat()` sending a message list, default generation parameters, successful and failed health checks, and client cleanup.

Writing the same seven checks against a second provider was useful in itself. It confirmed that the shared `GenerationParams` object maps to two different option formats without leaking one provider's field names into the other.

## Verification

Every test was run locally before being committed. All tests in both files passed with `python -m pytest -q`, and the coverage run with `--cov=app.providers --cov-report=term-missing` completed without the import crash. Coverage figures for the individual providers are reported next week once the Gemini and Hugging Face files are in place, since the number for a half-finished suite would not mean much.

These tests are currently on a local branch and are not yet part of #157. The plan is to push them as a follow-up once the base test suite has been reviewed, so the two pull requests stay small and independent.

## Starting the Contract Design

The second thread this week was design rather than code. In an earlier discussion, Walter suggested that rather than adapting Sugar-AI to each activity individually, Sugar-AI should offer one generic contract that activities agree to. I spent part of the week working out what that contract needs to contain.

To do that I surveyed the Sugar Labs repositories for anything that uses AI: the Journal reflection work, Sugar Activity on Demand, Speak-AI, Sampler AI in Music Blocks, and the GSoC archives. Most of these do not talk to Sugar-AI yet, which is the point: the contract is meant to be the thing they target when they do.

Two findings shaped the design. First, at least one client (Activity on Demand) sends images, and the Journal work has entry previews it would like to send, but Sugar-AI's request format only accepts string message content. A generic contract therefore has to be multimodal from the start, with typed text and image parts. Second, large media in JSON has to be Base64 encoded, which makes it roughly one third larger. That is acceptable for small preview images, but a later phase will need file uploads that return a file ID, so a follow-up question can reference the same image without resending it.

I also worked through how the current admin API key model interacts with provider selection. Today only an admin can change the model on a running instance. Whether individual users should be able to choose their own provider, or whether that stays an admin decision, is a question I am taking to the mentors rather than deciding alone.

## Challenge and Key Learning

The hardest part of the week was learning to write asynchronous tests properly rather than having them written for me. Understanding when `Mock` is enough and when `AsyncMock` is required, why `with patch(...)` is needed for the constructor but not for methods that receive an injected client, and what `response.json.return_value` actually controls, took longer than writing the assertions. The lesson is that mocks are a description of the contract you expect from a dependency, and being precise about that contract is most of the work.

## Plan for Next Week

- Write the Gemini and Hugging Face asynchronous provider tests and report per-provider coverage.
- Turn the contract findings into a phased plan and a short summary for the mentors, including why audio support is being deferred.
- Continue the mentor discussion on provider selection and who is allowed to change it.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Initial provider test suite:** [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157)
- **Concurrency pull request the tests build on:** [sugar-ai#156](https://github.com/sugarlabs/sugar-ai/pull/156)
- **pytest-asyncio documentation:** [pytest-asyncio.readthedocs.io](https://pytest-asyncio.readthedocs.io/)
- **pytest-cov documentation:** [pytest-cov.readthedocs.io](https://pytest-cov.readthedocs.io/)
- **Sugar Labs organization:** [github.com/sugarlabs](https://github.com/sugarlabs)

---

## Acknowledgments

Thanks to Walter for the push toward one generic contract instead of per-activity adapters, which gave this week's research a clear direction, and to my mentors for the continued reviews on the open pull requests.

---
