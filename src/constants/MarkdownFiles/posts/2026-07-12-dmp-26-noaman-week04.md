---
title: "DMP '26 Week 04 Update by Noaman Akhtar"
excerpt: "Adding OpenAI-compatible and Gemini providers so any hosted model can plug into Sugar-AI through the same factory, without touching RAGAgent."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-dmp-26-noaman-week04"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week04,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 – 2026-07-12  

---

## Goals for This Week

- Add `OpenAICompatibleProvider`, a single client for any service that speaks the OpenAI `/v1/chat/completions` format (Groq, Cerebras, Together.ai, OpenRouter, OpenAI, Mistral).
- Add `GeminiProvider` for Google's `generateContent` API, which uses a different request shape.
- Extend the `create_provider()` factory with `openai` and `gemini` branches, using distinct settings so they never collide.
- Keep HuggingFace as the default and add no new dependencies.

---

## Why Two More Providers

Week 03 proved the provider contract could hold a networked backend when Ollama went in. Ollama covers self-hosting, but not every school wants to run its own server. Some may have API credits, and some want the speed of a hosted service without managing hardware. Giving them that option, without ever forcing it, is the point of these two providers.

The design keeps Sugar Labs' open-by-default stance. `AI_PROVIDER` still starts on HuggingFace (for now; the default will move to Ollama in a later phase), and the plan is explicit that the organization should not depend on proprietary free tiers. At the same time, Walter Bender was clear that the software should let anyone use any model, including non-FOSS ones. These providers honor both goals: the cloud options exist for whoever configures a key, and no one is pushed toward them.

Practically, this covers two different needs. The OpenAI-compatible class unlocks a whole family of fast, free-tier services at once, while Gemini adds a strong API baseline with a very large context window for document-heavy retrieval.

---

## One Class for Every OpenAI-Format Service

`OpenAICompatibleProvider` is an HTTP client for the OpenAI `/v1/chat/completions` endpoint with bearer-token auth. Because that endpoint is universal across these services, one class covers all of them. The only things that change between Groq, Cerebras, OpenRouter, OpenAI, and Mistral are the base URL, the API key, and the model name string.

A few decisions shaped it:

- **`generate()` delegates to `chat()`.** The older `/completions` endpoint is deprecated or missing on many of these servers, while `/chat/completions` is always present. So a plain prompt is wrapped as a single user message and sent through the chat path.
- **Only standard fields are sent.** The request carries `model`, `messages`, `temperature`, `top_p`, and `max_tokens`. `top_k` and `repetition_penalty` are left out on purpose, because they are not part of the OpenAI spec and some servers reject unknown fields.
- **It fails fast on a missing key.** The constructor raises a clear error rather than letting the request come back as a confusing `401` later.

---

## Gemini Gets Its Own Provider

Gemini does not speak the OpenAI format, so forcing it through the same class would have meant piling conditionals on top of otherwise clean code. It uses different role names (`model` instead of `assistant`), a nested `contents` and `parts` body, a separate `systemInstruction` field, and a `generationConfig` block with camelCase keys. The model name even lives in the URL path rather than the body. A dedicated `GeminiProvider` keeps all of that translation in one small, readable place.

The provider converts the app's ordinary `role`/`content` messages into Gemini's shape: system messages are lifted out into `systemInstruction`, `assistant` becomes `model`, and each message's text is wrapped in a `parts` list. Authentication uses an `x-goog-api-key` header instead of a query parameter, which keeps the key out of any logged URLs. Like the OpenAI provider, it fails fast when no key is set, and it drops `repetition_penalty` since Gemini has no equivalent setting.

---

## One Factory, Four Backends

Both providers plug into the same `create_provider()` factory that Week 03 introduced. It now resolves four names: `huggingface`, `ollama`, `openai`, and `gemini`. Startup and the `/change-model` endpoint pass every provider's settings on every call, and each branch reads only the ones it needs.

The detail that mattered was keeping those settings from colliding. The Gemini branch uses `gemini_api_key`, not the OpenAI branch's `api_key`, so a stray `OPENAI_API_KEY` can never leak into a Gemini request. With that in place, switching from a local Ollama model to Groq or Gemini is once again a change to configuration, not code.

And once again, `RAGAgent` was not touched. A third and fourth backend went in with zero changes to how prompts are built or how the API layer calls the model. That is the clearest evidence yet that the Phase 1 boundary was worth building first.

---

## Challenge and Key Learning

The interesting work was in translation rather than transport. Each service names the same ideas differently: the maximum output length is `max_tokens` for OpenAI and `maxOutputTokens` for Gemini, an assistant turn is `assistant` in one format and `model` in the other, and the system prompt is an ordinary message in one and a separate field in the other. Getting each mapping right, and deliberately dropping fields a service does not understand, was the difference between a request that works and one that returns a quiet error.

The lesson reinforced the whole approach. A good abstraction is not one that hides these differences behind more branches in shared code. It is one that gives each backend a small, self-contained place to be different, while the rest of the system keeps calling the same two methods. Four backends now share one interface, and none of them leaked their quirks upward.

---

## Verification

I confirmed the default path first: with no provider configured, the server still starts on HuggingFace and every endpoint behaves as before. I then exercised each new backend through both `generate()` (via `/ask-llm`) and `chat()` (via the chat mode of `/ask-llm-prompted`), and checked that `/health` reported the correct provider and model for each one. I also verified the missing-key guard by starting the server with a cloud provider selected but no key set, and confirming it fails immediately with a clear error instead of breaking at request time.

---

## Plan for Next Week

With four backends in place, the next step is the piece that ties them together: a model router. The idea, still pending mentor sign-off, is to get two behavior tiers, fast direct answers and deeper reasoning, from a single model by toggling its thinking mode rather than swapping models in and out of memory. Alongside that, I will start benchmarking the project's target models across these providers for latency, token usage, and answer quality.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Provider pull request:** [sugar-ai#147](https://github.com/sugarlabs/sugar-ai/pull/147)
- **OpenAI chat completions API:** [platform.openai.com/docs](https://platform.openai.com/docs/api-reference/chat)
- **Gemini API reference:** [ai.google.dev](https://ai.google.dev/api/generate-content)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community. The balance these providers try to strike, keeping open models the default while still letting anyone bring their own, came directly from their guidance on what Sugar's users actually need.
