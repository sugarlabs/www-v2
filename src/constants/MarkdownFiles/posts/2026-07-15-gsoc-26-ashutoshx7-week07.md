---
title: "GSoC '26 Week 07 Update by Ashutosh Singh"
excerpt: "Static checks say the code is fine and it still crashes on open. Building a debugging layer for generated activities: a runtime gate that actually runs the code, a self-healing retry loop, and a self-review critic. With an architecture diagram of where it all sits."
category: "DEVELOPER NEWS"
date: "2026-07-15"
slug: "2026-07-15-gsoc-26-ashutoshx7-week07"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week07,ashutoshx7,debugging,runtime,sandbox,critic,architecture,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** July 7, 2026 to July 13, 2026  

---

## Goals for This Week

- Close the gap between "the code parses" and "the activity actually runs"
- Build a debugging layer that catches and fixes broken generated activities before a learner sees them
- Turn a crash into structured feedback the model can act on instead of a dead end
- Draw out the architecture so the whole pipeline is easy to reason about

---

## This Week's Achievements

Here is the moment that set the whole week. During Phase 2, a tester generated an activity that installed cleanly, passed every static check I had, and then crashed the instant it opened. Blank window, traceback in the log, nothing on screen. From the outside it looked done. It was not.

That is the uncomfortable truth I had been avoiding. My validation up to now was static. It read the code without running it. It could tell you the Python parsed, the imports were allowed, the structure was right. It could not tell you the activity would survive being opened, because the only way to know that is to open it. A Sugar activity is not a file that either compiles or does not. It is a program that has to start, draw itself, respond to a click, and save its state, and none of those are things you can prove by reading.

So this week I built a **debugging layer**: a stage in the pipeline whose whole job is to catch a broken generated activity, understand how it broke, and get it fixed before anyone sees it. It has three parts that work together, a runtime gate, a self-healing retry loop, and a self-review critic.

### 1. The Runtime Gate

The core of the debugging layer is `runtime_check.py` and `runtime_harness.py`. Together they take a freshly generated candidate and actually run it, in a separate GTK subprocess, against the preview stubs rather than a real Sugar shell. The harness is the body that runs inside that subprocess. It does roughly what a learner would do in the first few seconds:

- Start the activity
- Pump the GTK event loop so it has a chance to draw and settle
- Do a Journal write and read round-trip, to check that saving and restoring actually works
- Watch for a crash, a degraded start, or an `__init__` that blocks and never returns

If any of that goes wrong, the candidate does not get accepted. It runs in its own process on purpose. This is generated code I am about to execute, so it gets isolation, a hard timeout (25 seconds by default, tunable with `AOD_RUNTIME_CHECK_TIMEOUT`), and an off switch (`AOD_RUNTIME_CHECK=off`). Because it needs a display, it skips cleanly in headless environments instead of failing the build there.

### 2. Self-Healing: Crashes Become Feedback

This is the part that makes it a debugging layer and not just a filter. When the runtime gate catches a failure, that failure does not just reject the attempt and stop. The traceback and a description of what went wrong get handed back to the model as part of the next generation attempt, so the model gets to see how its own code died and try to fix it.

In practice that means a lot of activities that would have reached a learner as a blank crashing window now get caught, fed back, and regenerated into something that opens and works, with nobody watching. It is a self-healing loop. The model is bad at getting it perfect on the first try, like all of us, but it is reliably good at fixing a specific error once you show it the specific error.

### 3. The Self-Review Critic

The last part of the layer catches the subtler problems: code that runs fine and is still wrong. A button wired to nothing, a game where the win condition can never be reached, a save handler that writes a value nobody reads. So after a candidate passes the runtime gate, `critic.py` hands the model its own accepted code and asks it to review it once against a specific checklist: are the handlers actually wired, is the win logic reachable, is the Journal state real state.

The model replies either `OK`, or a set of minimal SEARCH/REPLACE fixes. And here is the rule that keeps this safe: if it does hand back fixes, the patched code has to re-run the runtime gate. If the "improved" version fails to run, the patch is thrown out and the original is kept. The critic is allowed to improve the code. It is not allowed to break working code and walk away.

### 4. The Architecture

Here is where the debugging layer sits in the pipeline. Everything to the left is turning an idea into code. Everything inside the box is this week's work, and the loop back to generation is the self-healing part.

```text
  Learner idea
       │
       ▼
   Enhance ──► RAG grounding ──► Plan ──► Generate code
                                              │
                                              ▼
   ┌──────────────────  DEBUGGING LAYER  ──────────────────┐
   │                                                       │
   │   1. Static validation   (validator.py)               │
   │        parse · imports · structure · safety           │
   │                     │                                 │
   │                     ▼                                 │
   │   2. Runtime gate        (runtime_check.py)           │
   │        run in sandboxed GTK subprocess,               │
   │        pump events, Journal write/read round-trip     │
   │                     │                                 │
   │                     ▼                                 │
   │   3. Self-review critic  (critic.py)                  │
   │        model checks its own code against a checklist  │
   │                     │                                 │
   └─────────────────────┼─────────────────────────────────┘
              fail ┌──────┴──────┐ pass
                   ▼             ▼
          retry-and-fix      Accepted
        (traceback back          │
         to Generate)            ▼
                          Package .xo bundle
```

Writing it out this way made the whole thing easier to reason about, and easier to explain to Walter. Each stage has one clear question and one clear way to fail, and a failure anywhere in the box either loops back with feedback or keeps the last version that worked.

---

## Challenges & How I Overcame Them

**Running untrusted generated code without taking down the studio.** The answer was to never run it in-process. It goes into its own subprocess with a hard timeout, so a hang or a crash in generated code is contained and just becomes a failed gate, not a frozen app.

**Making the activity believe it is inside Sugar.** The activity expects a Journal, a toolbar, an activity lifecycle. The harness runs it against the preview stubs so all of that exists well enough to exercise a real start and a real save/read, without needing the full Sugar shell to be installed and running.

**Keeping the critic from making things worse.** The obvious risk is a critic that "fixes" working code into broken code. Forcing every critic patch to re-pass the runtime gate, and keeping the original when it fails, meant the review can only ever be neutral or positive.

---

## Key Learnings

"It compiles" is a low bar, and I had been standing on it. The only real proof that a generated activity works is watching it run, and once I accepted that, a whole class of Phase 2 crashes just stopped reaching testers.

What surprised me more was how much leverage there is in feeding failures back to the model. I spent a lot of Week 3 trying to prompt-engineer perfection up front. This week taught me the opposite instinct is stronger. Let it fail in a place where failing is cheap, hand it the exact error, and let it fix its own work. A tight feedback loop beats a perfect first prompt.

And drawing the architecture was not just decoration. The moment I had to lay the layer out as a diagram, a couple of muddy spots in the flow became obvious, and I cleaned them up before they turned into bugs.

There is a reason this matters for Sugar in particular. The whole idea of a Sugar activity is that a learner opens it and starts tinkering, changing it, breaking it, making it theirs. You cannot tinker with something that crashes the moment it opens. So the debugging layer is really in service of that constructionist moment, the one where a learner meets a working thing they can begin to take apart. Protecting that first working version is the point.

---

## Next Week's Roadmap

- Do a real pass on the UI and UX now that the engine underneath is trustworthy
- Get proper packaging in place, including an AppImage so anyone can run it without a setup dance
- Cut the first real release of AOD
- Keep running Phase 2 prompts through the debugging layer and tightening the failure feedback

---

## Acknowledgments

Thanks to the Phase 2 tester whose beautifully broken activity made the case for a debugging layer better than any argument I could have written. Thanks to Walter Bender for pushing me, all the way back in Week 3, to treat generated activities as things that have to run rather than code that has to parse, and to Ibiam Chihurumnaya for the ongoing review.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
