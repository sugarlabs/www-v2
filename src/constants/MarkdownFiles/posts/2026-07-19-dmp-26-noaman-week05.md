---
title: "DMP '26 Week 05 Update by Noaman Akhtar"
excerpt: "Adding reasoning on/off to Sugar-AI so one model can serve fast direct answers and slower step-by-step reasoning, with no-think as the safe default."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-dmp-26-noaman-week05"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week05,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 – 2026-07-19  

---

## Goals for This Week

- Add a reasoning on/off capability so one model can serve both fast answers and deeper step-by-step reasoning.
- Keep no-think the default everywhere, with reasoning strictly opt-in.
- Send Ollama's native `think` field correctly so reasoning-capable models honor it.
- Degrade gracefully when a model does not support reasoning, instead of failing the request.
- Make sure reasoning traces never reach the user.

---

## Why Reasoning On/Off

Different requests need different amounts of thinking. A child asking "what is a loop?" wants a fast, direct answer. Debugging a snippet of code or working through a tricky question benefits from the model reasoning step by step first. Serving both well from a single backend is the goal this week.

The obvious approach, keeping two separate models loaded and routing between them, does not fit the hardware. On a single GPU that causes constant loading and unloading of model weights, a swap overhead that mentor Mebin flagged early on. Modern reasoning-capable models offer a cleaner path: they can turn their internal chain-of-thought on or off through one parameter. That gives two behavior tiers, a fast instruction mode and a slower reasoning mode, from a single loaded model with nothing swapping in memory.

The rule I settled on with the design is that no-think is the default and reasoning is opt-in. A reasoning model can decide to think on its own, so to guarantee a fast default the app sends an explicit "off" rather than leaving the choice to the model.

---

## Sending `think` to Ollama

Ollama exposes this switch as a `think` field in the request body. The important detail, and the easiest thing to get wrong, is that it belongs at the top level of the request next to `model` and `stream`, not inside the `options` block where the other generation settings live. Put it in `options` and it is silently ignored, so the feature looks dead even though nothing errors. The provider adds `think` at the top level of both the generate and chat requests.

Not every model can reason, though. A non-reasoning model rejects a request that carries `think`, returning an error. To keep those models working, the provider wraps the request so that if a `think` request is rejected, it drops the flag and retries once. The caller still gets a normal answer, and the fallback is logged so the behavior is visible. This keeps the door open for schools on lighter models without special-casing them anywhere else.

---

## Off by Default, Opt-In Where It Helps

Reasoning is exposed on four endpoints and stays off unless the caller asks for it. `/ask`, `/ask-llm`, and `/debug` accept a simple `think` flag that defaults to off, and `/ask-llm-prompted` accepts it as part of its request body. Every other path stays no-think automatically.

For now this is an Ollama-only capability, since it relies on Ollama's native `think` field. The OpenAI-compatible and Gemini providers added in earlier weeks simply ignore the flag rather than pretending to support it. Keeping that honest matters more than claiming uniform behavior the backends do not actually have.

---

## Two Things the Testing Surfaced

Two problems only became clear once I started exercising the feature against a real model, and both shaped the final design.

The first was that reasoning shares the answer's token budget. The model has one output budget, and when it thinks, the reasoning consumes tokens from the same pool as the answer. With a modest budget and reasoning turned on, I watched the model spend its entire allowance thinking and return an empty answer. The fix is a token headroom setting: when reasoning is on, the API automatically adds extra output budget so the chain-of-thought has room to run without starving the reply. With that headroom in place, a reasoning request finishes its thinking and still returns a real answer.

The second was about keeping reasoning away from the user, which matters because children are the primary audience. Two things protect that. Ollama returns the reasoning trace in a separate field from the answer, and the provider only ever reads the answer, so the trace is never surfaced. On top of that, the retrieval and debug paths run in two stages, and only the first analysis stage is allowed to reason. The final stage that rewrites the response into child-friendly language always runs no-think, so reasoning can never leak into or garble what a child actually sees.

---

## Verification

I verified the feature manually at each layer. At the raw API level I confirmed that a reasoning-capable model honors `think`, that its reasoning comes back in a separate field from the answer, and that a non-reasoning model rejects the flag with an error, which is exactly the case the fallback is built for. At the provider level I confirmed the trace is never returned and that the retry fallback lets a non-reasoning model answer normally instead of crashing. At the routing level I confirmed the token headroom is applied only when reasoning is on and that the other endpoints stay no-think. Finally I ran the full server end to end and checked that opt-in reasoning works, the answer stays non-empty thanks to the headroom, the kid-facing paths never expose reasoning, and a non-reasoning model degrades gracefully.

---

## Plan for Next Week

With the mechanism working, the next step is measurement. I plan to benchmark the project's target models across the providers for latency, token usage, and answer quality, and to compare reasoning on against reasoning off on the same prompts. Adopting this approach in production is still pending mentor sign-off, so the goal is to bring real numbers to that discussion rather than an abstract proposal.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Ollama thinking documentation:** [github.com/ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community. The choices that mattered most here, keeping reasoning off by default and making sure its trace never reaches a child, came directly from their guidance on building for young users.
