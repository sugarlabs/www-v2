---
title: "GSoC '26 Week 05 Update by Ashutosh Singh"
excerpt: "Turning a working pipeline into a configurable one: an LLM provider panel, an optional validation toggle, a Flatpak build, and a stability pass before Phase 2 user testing."
category: "DEVELOPER NEWS"
date: "2026-07-01"
slug: "2026-07-01-gsoc-26-ashutoshx7-week05"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week05,ashutoshx7,flatpak,validation,provider-config,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** June 23, 2026 to June 29, 2026  

---

## Goals for This Week

- Sort out the open architecture questions now that generation actually works end-to-end
- Deal with the fact that validation is slow without throwing away the safety it gives us
- Surface the model-agnostic LLM interface as a real provider configuration control
- Ship AOD as a Flatpak so mentors and testers can install it without a hand-built Sugar dev setup
- Harden overall stability ahead of Phase 2 user testing

---

## This Week's Achievements

Last week ended really well. The pipeline took a plain English sentence and handed back an installable `.xo` bundle that ran in Sugar. So this time my sync with Walter wasn't the usual "does it work" conversation. It was "okay, how should this actually be configured?" Which is a better question to be stuck on, honestly. It's also what ate up most of the week.

So that's what the week became. I made the slow validation optional but kept its teeth. The model-agnostic interface got a real provider panel. I packaged the whole thing as a Flatpak. And then a big chunk of the week just went to keeping it upright.

![The updated Prompt Screen with the new Planner, Policy, and Validation controls, the LLM provider panel, and the license picker](assets/Images/gsoc26-ashutoshx7/aod-validation-toggle.png)

Almost all of this week lands in one screen: the Prompt Screen. The new **Planner / Policy / Validation** row, the **LLM provider** panel, the license picker, all of it showed up this week. The arrow is pointing at the **Validation** toggle, flipped **Off** for a faster preview. That toggle turned out to be the design decision I chewed on the most.

### 1. The Architecture Conversation and the LLM Provider Panel

Once generation works, a pile of questions I'd been dodging come due. Which model are we calling? Where does the API key come from? How strict should validation be out of the box? I told Walter in the sync that these felt like actual architecture decisions rather than cleanup, and we spent most of the call chewing through them.

Back in Week 3 I built the LLM interface to be model-agnostic, tucked behind a single config value, so swapping models was a one-line change. Fine when I'm the only one running it. But if a teacher is supposed to use this, telling them to go edit a config value is basically telling them no. So I pulled it out into a proper **LLM provider panel** on the Prompt Screen.

The panel has:

- **Automatic** - uses the last saved provider for RAG generation, and falls back to the built-in default the first time around, so most people never have to think about any of this
- An **API key** field, masked, with **Paste**, **Save & test**, and **Remove key** actions, so a teacher can point AOD at their own key
- An optional **Model** field, for when you want a specific model instead of the default
- An optional **Endpoint** field, for pointing at a local or self-hosted inference server

There's a **Policy** control wired into this too, where `Standard` means "RAG + model validated." Under the hood it's still the Week 3 model-agnostic plumbing doing the work. This is just a front end for it. A teacher who wants to bring their own key, or run against a local endpoint for an offline deployment, can now do that without opening a single Python file.

### 2. The Validation Toggle - Making Slow Validation Optional

The AST validation and self-healing regeneration loop from Week 4 is really good at catching bad code. It's also slow. Every preview sat there waiting on a full AST pass plus, worst case, up to `MAX_RETRIES` regenerations before the learner saw anything at all. The tool is supposed to feel quick and playful, and that wait was killing it.

My first instinct, and I'll be honest about it, was to just yank out a couple of the heavier checks and move on. I took that to Walter expecting a quick nod. He pushed back. His point was that I shouldn't hardcode the safety off. If the checks are too slow to run every single time, that's a reason to make them optional, not a reason to delete them. Put the tradeoff in front of the user and let them choose.

So I built a **Validation toggle**:

- **On** - validate the generated code and retry on errors (the full Week 4 behavior)
- **Off** - skip validation for a faster preview

Here's the part I actually care about, though. Flipping validation Off does **not** mean unsafe code lands on a kid's laptop. I had to split validation into two stages: *preview-time* validation, the skippable part, and *bundle-time* validation, which always runs before anything turns into an installable activity. So "Off" only speeds up the preview. The moment you build the `.xo`, all the checks run again anyway, the AST pass, the import whitelist, the structure validation. The status line says this out loud so nobody has to guess: "Generated code will still be checked before it becomes an activity."

The toggle itself was ten minutes. The split, guaranteeing Off could only ever make the preview faster and never leak unsafe code into a build, was the part that actually took days.

### 3. Shipping a Flatpak

Later in that same sync, Walter asked whether AOD could ship as a Flatpak. Until now, running it meant having a properly set up Sugar development environment, which is the kind of setup step that quietly kills adoption before anyone tries the thing. A Flatpak skips it.

I wrote a Flatpak manifest under an `org.sugarlabs.*` app id, declared the runtime, and pulled in what AOD needs: GTK3, the Sugar toolkit, and the Python bits the generator leans on. The idea was that AOD builds and installs like any normal Flatpak on any Linux desktop, not just inside a Sugar dev checkout. For now I build it locally with flatpak-builder and hand testers one `.flatpak` bundle they install with `flatpak install ./aod.flatpak`.

The finicky part was getting the Sugar toolkit to resolve cleanly inside the sandbox. Flatpak walls the app off from the host by default, so I kept working through the runtime and permissions until `sugar3` and its GTK dependencies actually loaded from inside the sandbox instead of assuming a system-wide Sugar install was sitting there. Grungy work, but the payoff is real, mentors and testers install AOD in one command now instead of grinding through the setup page.

### 4. Overall Stability Hardening

Phase 2 user testing is right around the corner, and I really didn't want the first thing a real user hit to be a crash. So the last chunk of the week was a deliberate stability pass, mostly driven by throwing a ton of prompts through the pipeline and fixing whatever fell over.

Some of what I tightened up:

- **Worker-thread safety.** Generation runs off the main thread, and GTK3 isn't thread-safe, so I made sure every UI update coming off that path still goes through `GLib.idle_add()`, no exceptions.
- **Graceful provider failures.** Network errors, a missing key, an expired key. Instead of exploding, these now show up as a clear message in the AI Co-designer chat, something the user can actually do something about.
- **Malformed responses.** LLMs don't always hand back what you expect, so I guarded the code path that parses the model's response. A partial or malformed reply now degrades cleanly instead of dragging the whole screen down with it.
- **Persistent state.** The Validation toggle and provider settings persist now, so you're not reconfiguring them every session.

None of it is glamorous. It's also the difference between a demo and something someone else can actually run without me in the room.

---

## Challenges & How I Overcame Them

**Separating preview-time from bundle-time validation cleanly.** The easy version was one validation function that you either call or you don't. But that's exactly the shape that lets an "Off" toggle turn into a safety hole. I had to restructure things so bundle creation always calls the full validation path regardless of the preview setting, which meant untangling where in the flow validation was actually getting invoked in the first place.

**Getting GTK3 and the Sugar toolkit to resolve inside the Flatpak sandbox.** Flatpak's isolation is the whole point of it, but it also meant `sugar3` wasn't just sitting on the path the way it is in my dev environment. Working through the runtime declaration and the permissions the app actually needs took more back-and-forth than I'd guessed.

**Normalizing provider errors.** Different providers fail in wildly different shapes. Some throw structured errors, some return an HTTP status, some hand back a body with an error field buried somewhere inside. I wrote a small normalization step that flattens all of that into one clear, user-facing message, so the AI Co-designer chat never coughs up a raw stack trace.

---

## Key Learnings

The biggest thing I took from this week came straight out of Walter's pushback on validation. My instinct, when something's too slow, was to remove capability. His point: cutting the safety doesn't make it faster in any way that counts, it just makes it worse and calls it fast. The right move is to make the cost/quality tradeoff explicit and hand the control to the user. Make it an option, don't hardcode it off. On for safety, Off for speed, and the toggle just can't be the thing that lets faster mean unsafe.

Turns out packaging is part of the product, and I'd been acting like it wasn't. I'd been treating the Flatpak as a chore, something to get to after the "real" work. But a tool nobody can install just doesn't get used. Once it was a one-command install, it wasn't just my thing running on my laptop anymore. Someone else could grab it and try it.

With real users about to show up, the boring reliability work is the work that matters. A week on graceful failures and persisted state isn't as satisfying as building something new. It's also what stands between a calm Phase 2 and a pile of bug reports.

---

## Next Week's Roadmap

- Kick off **Phase 2: Small Group User Testing** using the new Flatpak build, so testers can install AOD in one command
- Collect feedback specifically on the Validation toggle and the provider config UX, since those are the newest and least-tested surfaces
- Polish the Reflective Studio around the new options so the validation and provider states are clear in context
- Keep the midterm evaluation in view and make sure the testable build is solid going into it

---

## Acknowledgments

Thanks to Walter Bender for the feedback that reshaped this week, pushing me to make validation a user choice instead of something I quietly removed to save time. I'd have shipped the shortcut if he hadn't pushed. Thanks also to Walter for the Flatpak suggestion, which made AOD something testers can actually run, and to Ibiam Chihurumnaya for the ongoing review.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
