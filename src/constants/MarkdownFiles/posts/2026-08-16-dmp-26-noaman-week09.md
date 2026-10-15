---
title: "DMP '26 Week 09 Update by Noaman Akhtar"
excerpt: "Making Sugar-AI easier to install across CPU and CUDA environments while expanding deterministic tests for provider helpers and prompted request validation."
category: "DEVELOPER NEWS"
date: "2026-08-16"
slug: "2026-08-16-dmp-26-noaman-week09"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week09,noaman-akhtar,sugar-ai,ai-optimization,testing,pytest,docker,setup"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-10 - 2026-08-16

---

## Goals for This Week

- Make local Sugar-AI setup predictable for both CPU-only and NVIDIA environments.
- Keep the CUDA 12.8 Docker path reliable without duplicating dependency definitions.
- Expand the offline provider test suite beyond factory and generation-parameter coverage.
- Test Hugging Face text cleanup, chat normalization, provider helper contracts, and prompted request validation.
- Keep all new tests independent of model downloads, API keys, external services, and application startup.

---

## Why Setup and Contract Tests Matter Together

The provider architecture now supports several model backends, but a flexible backend is only useful if contributors can install the project and verify changes consistently. During this week I worked on both sides of that problem.

The setup work reduces avoidable failures before the application starts. The test work provides fast feedback after the code is installed, without requiring every contributor or continuous integration worker to have a model, GPU, API key, or running inference server.

The setup changes are tracked in [sugar-ai#158](https://github.com/sugarlabs/sugar-ai/pull/158). The test work extends the provider suite from the initial factory and generation-parameter coverage into the smaller helper and request-model contracts that are used by several API paths.

## Making Local Installation Predictable

The original dependency layout did not clearly distinguish CPU and CUDA installations. A contributor using an ordinary CPU machine could download large CUDA packages unnecessarily, while the Dockerfile maintained a separate list of CUDA-related versions. That made installation slower and created a risk that the declared requirements and the Docker image would drift apart.

I reorganized the requirements into three profiles. `requirements/base.txt` contains shared dependencies, `requirements/cpu.txt` contains the CPU installation, and `requirements/cuda.txt` contains CUDA-enabled Torch and `bitsandbytes`. The root `requirements.txt` selects the CPU profile by default, while users with compatible NVIDIA hardware can explicitly install the CUDA profile. Direct dependency versions were pinned to make the supported dependency surface more predictable.

Model configuration is deterministic now as well. `AI_MODEL` takes precedence when it is explicitly set, followed by `DEV_MODEL_NAME` when `DEV_MODE=1` and `PROD_MODEL_NAME` when `DEV_MODE=0`. If no model is configured, the application fails immediately instead of passing an empty model name to a provider and producing a confusing error later. The example environment file points local development toward the lightweight `HuggingFaceTB/SmolLM2-135M-Instruct` model.

I also corrected the affected HTML routes to use the request-first template response signature required by the pinned Starlette version. This fixed the frontend HTTP 500 responses without requiring an unrelated framework upgrade.

## Improving the CUDA Docker Path

The existing NVIDIA CUDA 12.8 builder and runtime images were preserved. The goal was to make the build more reliable while keeping the deployment behavior familiar.

The Dockerfile now uses `requirements/cuda.txt` as its single dependency source. It downloads the required wheels with retries into a temporary wheel directory and then installs them offline from that directory. This is more tolerant of interrupted large PyPI downloads and removes duplicated CUDA package definitions from the Dockerfile.

Runtime configuration is kept separate from the image. The Docker image no longer copies `.env` files into its layers, and Docker Compose loads `.env` at runtime when the file is available. I also moved the explanatory comment away from the `DEV_MODE=1` value. Docker had been reading the inline comment as part of the boolean value, so the environment file now uses a standalone comment followed by a clean `DEV_MODE=1` line.

The README was expanded into a complete setup path. It now covers virtual-environment creation, `.example.env` to `.env` configuration, CPU and CUDA installation, model and provider selection, local startup, `/health`, Docker, Docker Compose, first-start model and document-index downloads, and common setup failures.

## Setup and Docker Verification

I verified the CPU path in a clean Python 3.12.5 virtual environment. The CPU profile installed successfully, `pip check` reported no broken requirements, and Torch reported `2.12.1+cpu` with CUDA unavailable. With the documented development model configured, Sugar-AI started successfully. The root endpoint returned HTTP 200, and `/health` reported a healthy Hugging Face provider using `HuggingFaceTB/SmolLM2-135M-Instruct`.

The CUDA dependency profile installed successfully in the Docker builder, including CUDA-enabled Torch, `bitsandbytes`, FastAPI, Starlette, and Uvicorn. One early verification attempt ran out of Docker Desktop virtual-disk space while unpacking the large image. This was a storage limitation of the local machine rather than a dependency-resolution failure. After temporary Docker artifacts were removed and storage was recovered, the CUDA 12.8 image was rebuilt, the container started with CPU fallback, and the application startup marker, root endpoint, and `/health` endpoint were verified.

Actual GPU execution remains outside this verification because the test machine has no NVIDIA driver or NVIDIA Container Toolkit. The image and CUDA-enabled dependencies are ready for a separate GPU-host check, but CPU fallback success should not be presented as proof of GPU execution.

## Extending the Provider Test Suite

The second workstream expanded the offline tests beyond the provider factory and `GenerationParams` behavior added earlier. These new tests target small deterministic functions that are shared by multiple application paths. They construct lightweight provider objects or Pydantic models directly, so they do not start FastAPI, initialize the RAG pipeline, load Transformers, or contact a model service.

### Base Provider Helper Contracts

The first commit added focused tests for the generic provider helpers. One test verifies that `get_model_name()` returns the model assigned to the provider. This protects status reporting and model selection code from accidentally using a hard-coded or unrelated value.

The other test verifies that the base provider returns `None` from `get_eos_token()`. A generic HTTP provider cannot safely assume a model-specific end-of-sequence token because different models use different tokenizers and token IDs. Returning `None` makes that limitation explicit and avoids truncating valid output based on an unsupported assumption.

Both tests create a lightweight object with `object.__new__` instead of running a real provider constructor. They therefore test the helper contract without creating an HTTP client or requiring an API key.

### Hugging Face Output and Conversation Helpers

The next group covers the pure helper logic in the Hugging Face provider. Text-generation pipelines can return the original prompt together with the generated continuation, so `_extract_after_prompt()` must remove an echoed prompt and an EOS marker while keeping only the answer. A second test covers the valid case where the prompt is not echoed and confirms that real response text is preserved.

The chat-normalization tests verify that a system instruction is combined with the first user message using a blank line, and that the `assistant` role is translated to `model` for Gemma models while user messages remain unchanged. These transformations are model-specific, so a small regression could break chat templates without affecting the provider factory or HTTP request tests.

I also covered an assistant-first conversation. When the first non-system message is an assistant response, the normalizer prepends a new user message containing the system instruction before preserving the assistant message. This gives the chat template a valid user-to-assistant sequence without discarding the system context or changing message order.

### Prompted LLM Request Validation

The final group tests the Pydantic models used by the prompted LLM API, especially `PromptedLLMRequest` and nested `ChatMessage` values.

The boundary tests confirm that `max_length=8192` is accepted while `8193` raises a `ValidationError`. The default-value test checks the complete request behavior when optional fields are omitted: chat mode is disabled, the question and custom prompt are absent, messages are absent, `max_length` is `1024`, truncation is enabled, repetition penalty is `1.1`, temperature is `0.7`, top-p is `0.9`, and top-k is `50`.

Invalid generation values are covered with `pytest.mark.parametrize`. The cases reject zero `max_length`, repetition penalties outside the allowed range, temperatures below zero or above two, top-p values outside the probability range, and negative top-k values. Each case expects a Pydantic `ValidationError` and checks that the failing field is identified in the error, so malformed requests are rejected clearly before reaching model execution.

The final request-model test passes a raw dictionary in the `messages` list and verifies that Pydantic converts it into a typed `ChatMessage` with the expected role and content. This protects the boundary between JSON received over HTTP and the objects used by the route implementation.

## Test Design and Verification

The common design choice was to test each contract at the smallest useful level. Helper tests avoid real constructors, and request tests instantiate Pydantic models directly. This keeps the suite independent of API keys, model downloads, GPU availability, database state, FAISS indexes, and application startup.

The four Week 9 test commits add 19 individual pytest cases after the parameterized invalid-value test is expanded. Assertions check exact strings, role ordering, field names, defaults, accepted boundaries, and exception types. A future refactor that changes one of these contracts should therefore fail close to the code that introduced the regression.

These tests intentionally do not cover real provider HTTP calls, asynchronous execution, model inference, RAG retrieval, application lifespan events, authentication, HTML routes, webhooks, or model switching. Those areas need separate tests with controlled mocks or live environments. Keeping them outside this slice makes the provider-helper and request-validation suite suitable for offline continuous integration.

## Challenge and Key Learning

The main challenge was improving reliability without making the verification environment larger. The Docker path needs hardware-aware dependencies and large images, while the provider tests need to remain fast and deterministic. Separating the CPU and CUDA installation profiles addressed the first problem, and testing helper and request contracts directly addressed the second.

The strongest lesson from this week is that a reliable backend needs both a reproducible way to start and a small way to check its assumptions. A clean CPU path and a documented CUDA path help contributors reach a running service. Focused tests then protect the exact model names, roles, defaults, boundaries, and provider behaviors that the service depends on.

## Plan for Next Week

- Add offline tests for the asynchronous `generate`, `chat`, `health_check`, and `close` methods.
- Verify awaited results, provider failures, and asynchronous HTTP-client cleanup with controlled mocks.
- Add a separate RAG and concurrency test plan without making the default suite depend on live model services.
- Repeat GPU-specific validation on an NVIDIA-equipped host with the NVIDIA Container Toolkit.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Setup and Docker reliability:** [sugar-ai#158](https://github.com/sugarlabs/sugar-ai/pull/158)
- **Initial provider test suite:** [sugar-ai#157](https://github.com/sugarlabs/sugar-ai/pull/157)
- **Base provider helper commit:** [cdc5382](https://github.com/sugarlabs/sugar-ai/commit/cdc5382b4b364632a54572e93c94dabaa7034253)
- **Hugging Face helper commit:** [10d2f7f](https://github.com/sugarlabs/sugar-ai/commit/10d2f7fb2489678b72bad024b7e99e4adfbbedb6)
- **Assistant-first conversation commit:** [14517a5](https://github.com/sugarlabs/sugar-ai/commit/14517a51d654d0ee0e1f148d0538df9e47f0bf7c)
- **Prompted request validation commit:** [fba5c0a](https://github.com/sugarlabs/sugar-ai/commit/fba5c0a611451ff3f252cd811072c1cbb4c1ceee)
- **Pytest documentation:** [docs.pytest.org](https://docs.pytest.org/)
- **Docker documentation:** [docs.docker.com](https://docs.docker.com/)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for the guidance on making both local setup and provider behavior easier to verify. The combination of a documented installation path and focused offline tests gives the project a stronger foundation for the asynchronous provider and deployment work ahead.

---
