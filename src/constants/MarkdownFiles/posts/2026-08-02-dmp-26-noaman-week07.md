---
title: "DMP '26 Week 07 Update by Noaman Akhtar"
excerpt: "Adding think/no-think control to Sugar-AI so reasoning-capable Ollama models can be used selectively without changing existing clients."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-dmp-26-noaman-week07"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week07,noaman-akhtar,sugar-ai,ai-optimization,ollama,reasoning"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 - 2026-08-02

---

## Goals for This Week

- Complete the request-level reasoning control work for Sugar-AI through a `think` flag.
- Keep no-think as the default so existing clients continue to behave as before.
- Send Ollama's `think` parameter in the correct request shape.
- Add fallback behavior for models that reject the `think` field.
- Present the midterm status of the AI Optimization project and use the feedback to shape the next set of improvements.

---

## Midterm Evaluation

On July 30, I presented the current state of the AI Optimization project in the DMP midterm evaluation. The presentation focused on the architecture work completed so far: moving Sugar-AI away from a tightly coupled `RAGAgent -> HuggingFace pipeline` design and toward a provider-based system.

![Midterm status for Sugar-AI provider work](/assets/Images/dmp26-week07-midterm-status.png)

The main idea I explained was that a provider is one class that talks to one model backend through a shared interface. `RAGAgent` no longer needs to know whether the model is running through Ollama, HuggingFace, Gemini, or an OpenAI-compatible API. It builds the prompt and calls `generate()` or `chat()`, while each provider owns the backend-specific request format.

![Provider abstraction architecture](/assets/Images/dmp26-week07-midterm-architecture.png)

The external evaluators asked an important product question: switching providers through `.env` works for developers, but how does this become usable for people with little or no technical knowledge? My answer was that the current implementation keeps provider selection configuration-driven and documents each provider setup clearly in `.example.env`. That is the right first step for a backend refactor. The longer-term direction is to expose provider selection through a frontend or admin UI, so a user can switch providers without manually editing environment variables.

They also asked which Sugar projects could use this backend. The immediate candidates are [`speak-ai`](https://github.com/sugarlabs/speak-ai), Reflection, and [`Sugar activity generation`](https://github.com/sugarlabs/Sugar-activity-on-Demand). Each one needs a consistent LLM backend, but they may run in very different environments: a local classroom machine, a Sugar Labs cloud server, or a school-managed hosted model.

The testing discussion was also useful. Since the provider work did not yet have a full automated test suite, I explained the three levels I used for verification: contract-level checks for request shapes, provider-level checks with real prompts across backends, and server-level checks through the FastAPI endpoints.

![Midterm deliverables and testing levels](/assets/Images/dmp26-week07-midterm-deliverables.png)

---

## Why Think/No-Think Matters

The provider work made Sugar-AI model-agnostic. The next question was how to use that flexibility well. Some modern Ollama models support an explicit reasoning mode, where the model spends extra tokens thinking through the problem before producing an answer. That can help with multi-step tasks, debugging, and explanations, but it also increases latency and token usage.

For Sugar-AI, that tradeoff should not be forced globally. A simple question should stay fast and cheap. A harder debugging or reasoning task should be able to opt in. This is why I added a request-level `think` flag in [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151).

The goal was not to introduce a second model router or swap models in memory. The goal was smaller: expose the reasoning capability when the selected provider and model support it, while keeping the default path unchanged.

---

## API and Parameter Design

The `think` flag is accepted on every generation endpoint:

- `/ask`, `/ask-llm`, and `/debug` accept it as a query parameter.
- `/ask-llm-prompted` accepts it in the JSON body, alongside the other generation parameters.
- If the caller omits it, the default is `false`.

Internally, the flag lives in the shared `GenerationParams` object. That keeps the API route layer from needing provider-specific conditions. The routes build generation parameters, pass them into `RAGAgent` or the provider, and the provider decides whether that field means anything for its backend.

I also added a `THINKING_HEADROOM` setting. Reasoning consumes output tokens from the same budget as the final answer, so a request with `think=true` can otherwise spend its whole output budget on reasoning and leave little room for the actual answer. The headroom setting gives reasoning requests extra output space without changing the default budget for normal requests.

---

## Ollama Provider Behavior

Ollama expects `think` as a top-level field in the request body, not inside the `options` dictionary. That detail mattered because generation parameters like `temperature`, `top_p`, and `num_predict` do belong inside `options`, but `think` does not.

Only the Ollama provider sends this field. The base OpenAI-compatible provider, Gemini, and HuggingFace accept the same `GenerationParams` object but ignore `think`, because those backends do not currently use this flag in Sugar-AI.

I also added a fallback for compatibility. Some models reject requests that contain a `think` field. When Ollama returns that error, Sugar-AI removes `think` and retries the request once. This means non-reasoning models can still return an answer instead of failing just because a caller included the flag.

The important limitation is that model behavior is capability dependent. A hybrid reasoning model may honor both `think=true` and `think=false`. A non-reasoning model such as [`llama3.2:1b`](https://ollama.com/library/llama3.2) may reject the field and rely on the fallback. A reasoning-style model may still include reasoning text even when `think=false`, because the model itself may not support suppressing that behavior.

---

## RAG and Debug Pipeline Handling

Two endpoints needed a little more care: `/ask` and `/debug`.

Both are two-stage flows. `/ask` first generates an answer using retrieved documentation, then rewrites that answer into a child-friendly form. `/debug` first analyzes or explains the code, then rewrites the result for children.

For these endpoints, `think=true` applies only to the first analysis stage. The child-friendly rewrite always runs no-think. That keeps the expensive reasoning where it is useful and keeps the final simplification stage lightweight.

---

## Verification

I tested the behavior directly against Ollama and then through Sugar-AI's FastAPI endpoints.

For hybrid reasoning behavior, I used [`qwen3.5:0.8b`](https://ollama.com/library/qwen3.5%3A0.8b), which reports thinking support through Ollama. For a non-reasoning model, I used [`llama3.2:1b`](https://ollama.com/library/llama3.2) to check that the retry path still returns an answer when the `think` field is not supported. I also tested a reasoning-style model, [`deepseek-r1:1.5b`](https://registry.ollama.com/library/deepseek-r1), to confirm the important edge case: Sugar-AI can request no-think, but it cannot force a model to suppress reasoning if the model itself does not support that behavior.

The Sugar-AI endpoint checks covered:

- `/health`, to confirm the active provider and model.
- `/ask-llm`, for the simplest direct generation path.
- `/ask-llm-prompted`, for JSON-body generation parameters and chat mode.
- `/debug`, to confirm the flag passes into the analysis stage.

I also ran compile and import checks after rebasing the work onto the updated provider refactor. That mattered because the provider layer had changed since the original think/no-think branch was started, and I wanted the final pull request to contain only the reasoning-control changes rather than old provider commits.

---

## Challenge and Key Learning

The hard part was not passing one boolean through the API. The real challenge was making that boolean safe across different kinds of models.

The same `think` interface has to work for hybrid reasoning models, non-reasoning models, and reasoning-style models. Those categories do not behave the same way. Some honor the flag, some reject it, and some accept it while still producing reasoning-heavy output. The implementation therefore treats `think` as a capability request, not as a guarantee that every model will behave identically.

That was the main lesson this week: provider-level controls should be exposed without pretending that every backend has the same capabilities. Sugar-AI can make the request shape consistent, keep defaults safe, and avoid failures, but the final behavior still depends on the selected model.

---

## Plan for Next Week

The midterm discussion and the think/no-think testing both pointed to the next area of work: concurrency and production hardening.

Reasoning requests are slower, so they made an existing server behavior more visible. The FastAPI handlers currently perform blocking model calls, which means a slow generation can block other requests behind it. This issue existed before the think/no-think feature, so it should be handled in a separate pull request rather than mixed into [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151).

The next step is to measure that behavior clearly, propose a small concurrency fix, and keep moving toward the second-half milestones: benchmarking, content safety, the reasoning decision, and production hardening.

![Second half milestones](/assets/Images/dmp26-week07-second-half-milestones.png)

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Pull Request:** [sugar-ai#151](https://github.com/sugarlabs/sugar-ai/pull/151)
- **Provider refactor PR:** [sugar-ai#147](https://github.com/sugarlabs/sugar-ai/pull/147)
- **Ollama API reference:** [github.com/ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for the feedback during the provider refactor and the midterm evaluation. The questions about usability, testing, and downstream projects helped connect the backend implementation to how Sugar-AI will actually be used.

---
