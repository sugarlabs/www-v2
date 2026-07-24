---
title: "DMP '26 Week 03 Update by Noaman Akhtar"
excerpt: "Adding OllamaProvider and a provider factory so Sugar-AI can run any model self-hosted or in the cloud, proving the BaseProvider contract is truly model-agnostic."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-dmp-26-noaman-week03"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week03,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 – 2026-07-05  

---

## Goals for This Week

- Implement the first alternative backend, `OllamaProvider`, against the `BaseProvider` contract built in Phase 1.
- Add an `AI_PROVIDER` setting and a provider factory so the backend is chosen from configuration, not code.
- Wire the factory into application startup and the `/change-model` endpoint.
- Expose a public `GET /health` endpoint so deployments can check whether the model backend is alive.
- Keep HuggingFace as the default so existing deployments see zero behavioral change.

---

## Why a Second Provider

Phase 1 gave Sugar-AI a provider interface, but it still shipped with only one real backend: a HuggingFace model loaded directly into Python memory. That is a single point of dependency. If Sugar-AI is going to serve schools with very different hardware and connectivity, it cannot assume everyone runs the same model the same way.

[Ollama](https://ollama.com) is the answer the mentors and I settled on as the primary backend, and the reason is flexibility. A school can install Ollama on one machine on its local network and serve open-weight models to an entire classroom completely offline. The same software can also run on Sugar Labs' cloud server, where Ollama hosts a larger shared model for everyone. The important part is that **the client code does not change between these cases**. Whether the model lives on `localhost`, a school LAN box, or a remote AWS instance, the only thing that differs is a URL.

This matters for an education non-profit. Keeping inference on self-hosted or community infrastructure avoids vendor lock-in, works in low-connectivity classrooms, and keeps children's queries off third-party servers. So Ollama is not just "another provider"; it is the one that lets Sugar Labs give users real choice about where and how their models run.

The test for this week was simple: could a completely different kind of backend, HTTP over the network instead of a model in local memory, satisfy the `BaseProvider` contract without touching `RAGAgent` at all?

---

## Implementing OllamaProvider

The new `OllamaProvider` is an HTTP client for Ollama's REST API. It implements the same four methods every provider must (`generate()`, `chat()`, `get_model_name()`, and `health_check()`) by calling Ollama's `/api/generate` and `/api/chat` endpoints.

A few design choices are worth highlighting:

- **No new dependencies.** Ollama's API is plain HTTP, so the provider reuses `httpx`, which the project already depends on. Nothing new was added to `requirements.txt`.
- **A generous timeout.** The first request to a cold model can take minutes while Ollama pulls and loads weights, so the client uses a 5-minute timeout instead of failing early.
- **Parameter translation.** Sugar-AI's `GenerationParams` uses HuggingFace-style names, so a small `_params_to_options()` helper maps them to Ollama's option names. For example, `max_new_tokens` becomes `num_predict` and `repetition_penalty` becomes `repeat_penalty`.
- **No role hacks.** Unlike the HuggingFace path, which needed special handling for Gemma's role names, Ollama accepts system/user/assistant roles natively. The messages pass straight through.

Because this provider talks to a server rather than loading a model, one class covers local, LAN, and cloud deployments. The base URL is the only thing that changes.

---

## Provider Selection: Config and a Factory

With two real backends, the application needs a way to pick one. I added three settings to the config: `AI_PROVIDER` to choose the backend, `AI_MODEL` for the model name, and `OLLAMA_BASE_URL` for the server address. All three default to values that preserve the current HuggingFace behavior, so a deployment that sets none of them behaves exactly as before.

The selection itself lives in a new `create_provider()` factory. Instead of any file hardcoding `HuggingFaceProvider(...)`, the factory reads the provider name and returns the right instance. Adding a future backend, such as an OpenAI-compatible API or Gemini, becomes a single new branch in one function rather than an edit scattered across the codebase.

---

## Wiring: Startup and Runtime Switching

Two call sites used to construct a HuggingFace provider directly, and both now go through the factory.

Application startup picks the model name by priority: an explicit `AI_MODEL` wins, otherwise it falls back to the existing dev/prod model logic. It then calls `create_provider()` and injects the result into `RAGAgent`. The `/change-model` endpoint does the same, so an administrator switching models at runtime now respects the configured provider instead of always creating a HuggingFace one.

`RAGAgent` itself was not touched. It still only knows how to build prompts and call `provider.generate()` or `provider.chat()`. That is the whole point of the Phase 1 boundary paying off.

---

## The /health Endpoint

Phase 1 defined a `health_check()` method on every provider but did not expose it. This week added the public `GET /health` endpoint that uses it.

The endpoint reports the active provider type, the model name, and whether the backend is responsive. It requires no API key, so load balancers and monitoring tools can call it freely, and it always returns a `200` with a status field rather than raising an error. This matters far more for Ollama than it did for HuggingFace: when the model runs on a separate machine, "is the backend reachable?" becomes a real question that deployments need a quick answer to.

---

## Challenge and Key Learning

The subtle work was in response handling. An in-memory pipeline and an HTTP API return generated text differently, and my first cut trimmed responses too aggressively and cut off multiline answers. Fixing it meant relying on the model's end-of-sequence handling rather than naive truncation, so longer replies survive intact.

The key lesson reinforced Phase 1's bet. Dropping in a networked backend required zero changes to `RAGAgent` and zero changes to how the API layer calls it. The abstraction held under a backend that was structurally nothing like the original. That is the strongest signal so far that the interface is genuinely model-agnostic and not just a wrapper shaped around HuggingFace.

---

## Verification

I confirmed backward compatibility first: with no provider configured, the server still starts on HuggingFace and every existing endpoint behaves as before. Then I tested the Ollama path against a local Ollama instance running `qwen2.5:1.5b`, checking that startup reported the Ollama provider, that the ask endpoints returned sensible answers, and that `/health` reported the correct provider and model for both backends. Each step also went through syntax and import checks before moving on.

---

## Plan for Next Week

With the factory pattern proven, the next step is to extend it to cloud and API backends so schools that prefer a hosted option are covered too. That means an OpenAI-compatible provider (which covers several fast free-tier services through one class) and a Gemini provider. Both slot into the same factory without further changes to `RAGAgent`.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Ollama provider branch:** [feature/ollama-provider](https://github.com/Noaman-Akhtar/sugar-ai/tree/feature/ollama-provider)
- **Ollama API reference:** [github.com/ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community. The decision to make Ollama the primary provider, and to keep it working identically whether self-hosted or in the cloud, came out of their guidance on what Sugar's schools actually need.
