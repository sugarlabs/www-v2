---
title: "DMP '26 Week 06 Update by Noaman Akhtar"
excerpt: "Refactoring Sugar-AI's provider layer so the base provider itself speaks the OpenAI chat format, removing the separate OpenAI class, and cleaning up methods the other providers were duplicating."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-dmp-26-noaman-week06"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week06,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-20 – 2026-07-26  

---

## Goals for This Week

- Move the OpenAI-compatible logic into the base provider so every provider inherits it.
- Remove the separate OpenAI provider class, since a proprietary format should not have a dedicated class.
- Remove methods the other providers were copying from the base for no reason.
- Keep the whole change behavior-preserving, so every provider returns the same answers as before.

---

## Why This Refactor

This week was follow-up work on the provider layer, based on mentor feedback from Ibiam.

To explain the why, a quick recap of how the layer was built. Every backend the app can talk to (Ollama, Gemini, HuggingFace, and any OpenAI-compatible endpoint) has its own provider class, and they all inherit from a shared `BaseProvider`. The problem was where the shared logic lived. `BaseProvider` was **abstract**: it listed the method names every provider must have, with empty bodies, and existed only to force each backend to implement them. It could not be used on its own. The actual working code that speaks the OpenAI `/v1/chat/completions` format lived in a separate class called `OpenAICompatibleProvider`, sitting next to the base rather than inside it.

The feedback was that this is backwards. The OpenAI chat format is the natural default shape for a provider, so it belongs in the base itself, where everything can inherit it. And a class named after a single proprietary vendor should not be the thing that owns that shared logic, since the project prefers to name explicit open-source backends. So the goal was to fold that logic down into the base and delete the vendor-named class.

---

## Moving the OpenAI Logic into the Base

**What I did:** I turned `BaseProvider` from an abstract interface into a concrete, working provider, and deleted `OpenAICompatibleProvider` entirely. The base now owns the OpenAI wire format directly, and the factory that builds providers by name returns a plain `BaseProvider` for any OpenAI-format endpoint.

**Why:** With the base concrete, there is one place that defines the default chat behavior, and every provider inherits it for free. There is no longer a separate vendor-named class holding logic that conceptually belongs to all providers.

**How:** In practice this meant removing the abstract machinery (`ABC` and the `@abstractmethod` markers) so the class can actually be instantiated, and copying the real method bodies into it: the constructor that builds the HTTP client with a `Bearer` auth header, the `generate` method that wraps a prompt as a chat message, the `chat` method that posts to `/v1/chat/completions` and reads the reply, the health check, and the parameter mapping. One detail I improved along the way: the old class logged messages and raised errors using its own name as a hard-coded string. I replaced those with the class's actual runtime name, so any provider reports its own real name rather than a stale label.

There is one visible side effect worth calling out. The health endpoint reports a provider by its class name, so an OpenAI-format endpoint now reports the base provider's name instead of the old `OpenAICompatibleProvider` name. That label is cosmetic, and re-adding a small named class purely for the nicer label is a one-line change, so I raised it as an open question in the pull request instead of deciding it silently.

---

## Removing Duplicated Methods

**What I did:** Once the base was concrete, I found the three other providers were carrying methods identical to what the base now offered, and removed them. The method that returns the model name was the exact same single line in all three providers, and the plain text-generation method in the Gemini provider was identical to the base version. All four were deleted so the providers inherit them.

**Why:** A method in a subclass that just re-implements the parent line for line adds nothing. Worse, it hides which methods are genuinely specialized. Removing the copies leaves only the methods that actually do something different for that backend, which makes the code easier to read.

**How:** This relies on how inheritance works in Python. When a subclass does not define a method, calls fall through to the parent's version, so deleting the identical copies changes nothing at runtime. The one subtle case is Gemini's inherited `generate`, which internally calls `self.chat`. Because Python resolves methods on the real object at runtime, that call still goes to Gemini's own `chat`, not the base's, so it keeps talking to Google's API exactly as before. I kept this cleanup as its own commit, separate from the main refactor, since removing subclass duplication is a different logical change from making the base concrete.

---

## Why the Other Providers Stayed the Same

Making the base speak OpenAI did not require rewriting Ollama, Gemini, or HuggingFace, because they do not speak the OpenAI format. Ollama uses its own native API and the reasoning `think` field from last week, Gemini uses Google's own request and response shape, and HuggingFace does not make an HTTP call at all but runs a model directly in memory. Each of them already overrides the base methods its backend needs, so the base's new OpenAI implementation never runs for them. The abstract base used to force those overrides; now they exist because each backend genuinely does something different. This is the whole idea of the design: the base holds the shared default, and each provider specializes only where it truly differs.

---

## Verification

There is no automated test suite for the providers yet, so I verified this manually at several levels.

At the code level I confirmed that the removed methods now resolve to the base in every provider, and that the genuinely different methods are still each provider's own. At the runtime level I ran every provider against a real prompt and checked the actual responses: Ollama through its native API, the refactored base through Ollama's OpenAI-compatible endpoint (which conveniently let me exercise the moved code against a real local server with no cloud key), Gemini through the real Google API, and HuggingFace with a small local model. I also booted the full server and confirmed the health and ask endpoints return a clean answer as plain text, which matters because the rest of the app does string operations on that result.

The reason I could be confident it is behavior-preserving is structural. The OpenAI methods were moved, not rewritten, so the code that runs for OpenAI endpoints is the same code in a new home. The deleted methods were identical to the base versions that now replace them. So identical inputs produce identical outputs, before and after.

---

## Plan for Next Week

With the provider layer cleaned up, the next step is to continue the benchmarking work: measuring the target models across providers for latency, token usage, and answer quality, so decisions about production come with real numbers rather than assumptions.

---

## Resources and References

- **Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Pull Request:** [provider refactor on the multi-provider PR](https://github.com/sugarlabs/sugar-ai/pull/147)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community. This refactor came directly from their review of the provider code, and the guidance to keep the shared logic in the base and avoid a vendor-specific class shaped the final design.
