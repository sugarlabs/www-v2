---
title: "DMP '26 Week 01 Update by Noaman Akhtar"
excerpt: "Mentor alignment week: correcting fundamental approach flaws, establishing open-source sovereignty as a design constraint, and beginning the provider abstraction build."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-dmp-26-noaman-week01"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week01,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-15 -- 2026-06-21

---

## Goals for This Week

- Meet with mentors to validate the implementation approach from Week 00.
- Clarify which model backends Sugar Labs should officially depend on.
- Understand the current Sugar Labs AWS infrastructure that hosts the AI service.
- Begin writing the [`BaseProvider`](https://github.com/sugarlabs/sugar-ai) abstraction and extract [`HuggingFaceProvider`](https://github.com/sugarlabs/sugar-ai) from the monolithic [`RAGAgent`](https://github.com/sugarlabs/sugar-ai).

---

## Key Discussions and Course Corrections

This was primarily a planning and alignment week. I had two meetings that reshaped how I think about the project.

### Meeting with Mebin (June 22)

After the community meeting, I had a call with [Mebin](https://github.com/mebinthattil) and [Vyagh](https://github.com/vyagh). Mebin gave me context about the AWS instance that currently hosts the Sugar-AI model and about the AI Optimization project's broader goals.

I walked through my initial plan, and Mebin pointed out some fundamental problems with it. My original approach included adding [Groq](https://groq.com) and [Google Gemini](https://ai.google.dev/) API support as primary providers, since both offer generous free tiers. Mebin's response was direct: **Sugar Labs cannot organizationally depend on free tiers from proprietary API providers.** The rationale is straightforward. Sugar Labs is an open-source education nonprofit. If the system relies on Groq's or Google's free tier, a policy change on their end could break every deployed Sugar activity overnight. The project needs to be self-sufficient.

From that conversation, I landed on three conclusions:

1. **The Sugar Labs AWS Ollama instance is the primary model source.** This is a server that Sugar Labs controls, running open-weight models through [Ollama](https://ollama.com). It should be the default backend for all production deployments.

2. **Schools and individuals can self-host.** A school running Ollama on their own LAN server, or any user running it on their laptop, should be able to point Sugar-AI at their local instance and use any open-weight model they choose.

3. **Content safety still needs a design.** The models will be used by children, so filtering inappropriate queries and keeping responses child-friendly is a hard requirement. But the approach for implementing this has not been decided yet. This will be discussed in a future meeting with [Ibiam](https://github.com/chimosky) and [MostlyK](https://github.com/MostlyKIGuess).

One thing Mebin did confirm: my core architectural decision of **decoupling the model provider from [`RAGAgent`](https://github.com/sugarlabs/sugar-ai)** is the right call. The [`BaseProvider`](https://github.com/sugarlabs/sugar-ai) interface pattern I proposed in Week 00 will be the foundation for everything going forward.

### Walter Bender's Clarification

After the meeting, [Walter Bender](https://github.com/walterbender) weighed in on the question of which models to support. His position added an important nuance:

> *"I think that while I agree that Sugar Labs itself should be using free models, Sugar AI should be set up to let people use any model of their choosing, including non-FOSS models. If a school has a model available, they should be able to set a config to use that model."*

This means the architecture needs to support two principles simultaneously:

- **Sugar Labs defaults to open-weight, self-hosted models.** No organizational dependency on proprietary services.
- **The system is configurable.** If a school has access to GPT-4 or Claude through their own API keys, they should be able to plug that in through a config change. We build the connectors, but we do not depend on them.

In practice, this validates building the [`OpenAICompatibleProvider`](https://github.com/sugarlabs/sugar-ai) (which covers Groq, Together.ai, OpenAI, Mistral, and others) and a [`GeminiProvider`](https://github.com/sugarlabs/sugar-ai), but treating them as optional advanced configurations rather than defaults.

---

## AWS Lambda for Cost-Optimized Hosting

We also discussed the problem of keeping the cloud server running 24/7. The Sugar Labs AWS instance hosting Ollama costs money whether or not anyone is using it. During off-hours (nights, weekends, school breaks), the server sits idle but still burns compute costs.

One proposed solution is to use **AWS Lambda** or a similar serverless approach, where the inference server only activates when a request arrives and deactivates when idle. The idea is:

- A lightweight API gateway sits in front of the actual Ollama server.
- When a request comes in, if the server is cold, it triggers a wake-up (starting the EC2 instance or container).
- After a period of inactivity (say 15-30 minutes with no requests), the server shuts down automatically.
- This converts the cost model from "always on" to "pay per use."

The tradeoff is cold-start latency. Spinning up a GPU instance and loading a 9B parameter model into VRAM is not instant -- it could add 30-60 seconds to the first request after a cold period. But for an educational tool where usage is concentrated during school hours, the savings could be significant. A possible middle ground is using a scheduled warm-up: a cron job that starts the server at 8 AM local time and shuts it down at 6 PM, covering school hours without the cold-start penalty.

This approach needs further discussion with the team and would likely involve changes to the deployment infrastructure rather than the Sugar-AI codebase itself.

---

## Technical Progress

While most of the week was spent in meetings and plan revisions, I did begin writing code for the provider abstraction.

### Provider Interface (`BaseProvider`)

Created `app/providers/base.py` with the abstract base class that every model provider must implement:

- **`generate(prompt, params)`** -- takes raw text, returns generated text. Covers the `/ask`, `/ask-llm`, and `/ask-llm-prompted` endpoints.
- **`chat(messages, params)`** -- takes a list of conversation messages with system/user/assistant roles, returns the assistant response. Covers chat-mode endpoints.
- **`health_check()`** -- reports whether the backend is alive and responsive.
- **`get_model_name()`** -- returns the name of the currently active model.

Also defined a `GenerationParams` frozen dataclass that bundles generation settings (`temperature`, `top_p`, `max_new_tokens`, etc.) into a single immutable object instead of scattering them as keyword arguments across every call site.

### Updated Implementation Plan

I rewrote the implementation plan from scratch to reflect the new direction. The key structural changes from the Week 00 plan:

| Aspect | Week 00 Plan | Week 01 Plan |
|--------|-------------|-------------|
| Default provider | HuggingFace (local pipeline) | Ollama (local or remote) |
| Groq/Gemini role | Primary providers | Optional bring-your-own-key |
| HuggingFace provider | Kept permanently | Kept for now, may be removed later |
| `torch`/`transformers` | Still in requirements | Targeted for removal (shrinks Docker image from ~10GB to ~200MB) |
| Multi-model routing | Load 2+ models in GPU | Single model with think/nothink parameter gating (proposed, needs validation) |
| Content safety | Not addressed | Flagged as a hard requirement, design pending mentor discussion |

The updated plan also includes a decision tracker that separates confirmed mentor decisions from proposed ideas and open questions. This keeps the boundary clear between "things I can build now" and "things that need sign-off first."

---

## Plan for Next Week

- Complete the [`HuggingFaceProvider`](https://github.com/sugarlabs/sugar-ai) extraction from [`RAGAgent`](https://github.com/sugarlabs/sugar-ai), ensuring all five existing endpoints produce identical output before and after the refactor.
- Begin building the [`OllamaProvider`](https://github.com/sugarlabs/sugar-ai) and test it against a local Ollama instance running `qwen3.5:1.5b`.
- Wire the provider factory into `main.py` so the active provider is selected via a single `AI_PROVIDER` environment variable.
- Prepare the agenda items for the upcoming meeting with Ibiam and MostlyK (content safety design, AWS instance hardware specs, model selection).

---

## Acknowledgments

Thanks to [Mebin](https://github.com/mebinthattil) and [Vyagh](https://github.com/vyagh) for the meeting that corrected the project direction early, and to [Walter Bender](https://github.com/walterbender) for clarifying the configurability principle.

---

## Summary

This week had no merged PRs and no shipped features. What it did have was a set of conversations that fundamentally redirected the project. The original plan was workable but built on the wrong assumptions about which model backends Sugar Labs should depend on. After Mebin's feedback and Walter's clarification, the architecture now has a clear north star: **default to self-hosted open-weight models, but make everything configurable.** The code started moving in this direction with the `BaseProvider` interface, and Week 02 will be about getting the first complete provider-to-endpoint flow working end to end.
