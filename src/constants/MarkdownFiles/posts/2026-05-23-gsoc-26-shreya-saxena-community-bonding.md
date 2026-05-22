---
title: "GSoC '26 Community Bonding Blog by Shreya Saxena"
excerpt: "Introducing my GSoC '26 project on Music Blocks Performance and what I'll be working on this summer."
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-shreya-saxena-community-bonding"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,community-bonding,performance,optimization"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->
## Community Bonding Reflections for GSoC 2026

**Project:** Music Blocks Performance  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** May 8, 2026 – May 24, 2026

---

## About Me

Hello everyone, I'm Shreya Saxena, a second-year B.Tech student in Smart Manufacturing at IIIT Jabalpur. I'll be working on **Music Blocks Performance** at Sugar Labs this summer as a Google Summer of Code 2026 contributor.

I've been contributing to Music Blocks since early 2026, with merged PRs covering bug fixes, documentation, and test coverage including fixes for runtime and internationalization issues, along with unit tests for core graphics and rhythm components. That work gave me hands-on familiarity with the execution pipeline, rendering stack, and global singleton architecture that my GSoC project will be working around.

Outside of code, I enjoy blogging, reading, and writing especially about technology. I find that writing about a problem forces me to understand it more clearly, which is probably why performance work appeals to me: *you can't optimize what you haven't articulated*.

---

## Project Overview

Music Blocks v3 is a browser-based visual programming environment used by students and educators worldwide. As projects grow in complexity, with more voices, larger block graphs, and MIDI imports, users hit a wall: the interface freezes with no indication of whether it's working, stuck, or crashed. Students in time-limited classroom sessions often end up force-refreshing the browser and losing their work.

The core problem is that long-running operations like LilyPond export, MIDI import, and complex block graph execution all run synchronously on the main thread with no yielding, no progress feedback, and no way to cancel. On top of that, there's no systematic measurement of where things degrade, so optimization efforts have historically been reactive rather than evidence-based.

My project takes a measurement-first approach. The main goals for the summer are:

1. **Establishing a performance baseline:** using operation-scoped instrumentation with the Performance Observer API, so every optimization decision is grounded in real data.
2. **Introducing user-facing progress feedback and cancellation:** for LilyPond export, MIDI import, and large project execution, so users always know what the application is doing.
3. **Applying targeted runtime optimizations:** a frame-budget execution scheduler, Web Worker offloading for heavy operations, render batching, and recursion safeguards, all guided by the profiling data collected in Phase 1.
4. **Protecting improvements over time:** through automated CI benchmarks that flag regressions before they ship.

---

## Community Bonding Activities
The community bonding period has focused on connecting with the Music Blocks community, discussing project direction and expectations with mentors, collaborating with contributors, and helping newcomers get familiar with the codebase and contribution workflow. Alongside this, I’ve been building the instrumentation and profiling foundation required for the project.

A major focus has been `crabcanon-plot.html`, which Walter suggested as an initial benchmark due to noticeable performance regressions over time. The project plays a melody forwards and backwards simultaneously across parallel voices, with rendering and execution tightly coupled on the main thread.

To analyze this, I built a Phase 1 instrumentation layer (`performanceTracker.js`) with operation-scoped timing hooks, along with a Playwright headless benchmark setup that exports JSON baseline results.

<a href="https://postimg.cc/w3VhyhQd">
<img src="https://i.postimg.cc/65szPc7T/Crabcanon-plot-research.jpg" alt="Crabcanon Performance Profiling Baseline Results" border="0">
</a>

**Baseline results from `crabcanon-plot.html`:**

| Metric | Value |
|---|---|
| Execution Time | ~48 seconds |
| Memory Delta | ~2.3 MB |
| Max Execution Depth | 1 |

Currently, I’m isolating canvas rendering costs versus block graph traversal overhead to identify the primary bottleneck.

****For more details, see the Resources & References section below.***

---

## What Drew Me to This

The more I profiled, the more I realized the problem wasn't a bug, it was a design assumption. Block traversal, LilyPond export, and canvas rendering all competed on the main thread with no scheduling, no yielding, no feedback. In an educational tool used by children in time-limited classroom sessions, a frozen interface isn't just a performance issue. It's the moment a learner decides whether to keep creating or give up.

> "A child staring at a frozen screen is not thinking about main-thread blocking. He is wondering whether his idea broke."

That's what made this feel worth fixing. I was also drawn to the engineering challenge itself: improving a synchronous execution engine without breaking existing behavior requires measurement-driven, careful optimization, exactly the kind of work I wanted to learn and tackle.

---

## Work Plan : Phase 1 (May 25 – Jun 7)

The first two weeks are Phase 1 of my proposal: completing the instrumentation layer and establishing solid baselines before any optimization work begins.

Specifically, I'll be:

- Finishing and validating the `performanceTracker.js` instrumentation hooks for LilyPond export (per-stage timing), MIDI import (block instantiation count and duration), and block graph execution (frame drops, execution duration, recursion depth)
- Running the Playwright benchmark script across small (~50 blocks), medium (~300 blocks), and large (~1000+ blocks) project sizes to understand how each operation scales with complexity
- Completing the isolation of canvas rendering time versus traversal time in `crabcanon-plot.html` to confirm where the 48-second execution budget is actually going
- Generating initial profiling reports identifying the highest-impact bottlenecks
- Validating findings against community-reported pain points and mentor feedback before moving into the progress feedback and scheduling work in Phase 2

The frame-budget scheduler, Web Worker offloading, progress indicators, and cancellation support are intentionally out of scope for this initial phase. The current focus is entirely on measurement and profiling, ensuring that future optimization decisions are driven by data rather than assumptions.

---

## Resources & References

- **Music Blocks Repository:** [Music Blocks on GitHub](https://github.com/sugarlabs/musicblocks)
- **Crabcanon Performance Profiling Research:** [Initial Profiling and Instrumentation Notes](https://docs.google.com/document/d/1Gf53RNNLc0IDzUPz8uInUBqBPkSda8KbJC5uAa2S9mI/edit?usp=sharing)
- **Organization:** [Sugar Labs](https://sugarlabs.org)

---

## Acknowledgments

Thanks to my mentors Walter Bender and Om Santosh Suneri for their guidance, insightful feedback, and continuous support throughout the community bonding period. I’m also grateful to Devin Ulibarri and the broader Sugar Labs community for the engaging discussions, encouragement, and sense of community that made the bonding phase genuinely enjoyable.