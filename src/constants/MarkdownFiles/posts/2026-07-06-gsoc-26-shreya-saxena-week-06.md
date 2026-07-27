---
title: "GSoC '26 Week 6 Update by Shreya Saxena"
excerpt: "Investigated playback synchronization drift and improved scheduling accuracy using Tone.Transport."
category: "DEVELOPER NEWS"
date: "2026-07-06"
slug:slug: "2026-07-06-gsoc-26-shreya-saxena-week06"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week06,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 – 2026-07-05

---

## Goals for This Week
 
This week I wanted to answer three questions:
 
* Why does playback gradually drift in long, multi-voice projects?
* Can I prove the root cause instead of relying on assumptions?
* Can I fix it without changing the existing interpreter or playback behavior?

---
 
## Understanding the Problem
 
Before writing any code, I wanted to understand what was actually going wrong.
 
Imagine Music Blocks playing a simple melody where each note should fire 500ms after the last one:
 
```text
0 ms        500 ms       1000 ms      1500 ms
A ---------- B ---------- C ---------- D
```
 
Music Blocks scheduled this with `setTimeout()`. The catch: `setTimeout(500)` doesn't mean "run exactly after 500ms." It means "run *after at least* 500ms, whenever the browser's event loop is free." If the browser is busy rendering, running other JS, or garbage collecting, the callback fires a little late:
 
```text
0 ms        512 ms       1025 ms      1538 ms
A ---------- B ---------- C ---------- D
```

> **Note:** The timeline below is a simplified example to illustrate how small scheduling delays can accumulate over successive notes. The actual delay varies depending on browser load and playback conditions.
 
A 10-15ms delay sounds trivial, but every callback schedules the *next* one so the second note starts from an already-late callback, the third from another late one, and so on. Over hundreds of notes and multiple voices, that compounds into noticeable drift. That was the problem I set out to investigate this week.
 
---
 
## Investigating the Root Cause

Rather than assuming `setTimeout` was the problem, I instrumented the playback pipeline and investigated each possible cause. I first ruled out the Logo interpreter, as earlier profiling showed `runFromBlockNow()` accounted for **less than 1%** of total playback time. Next, I verified that `ManagedTimer` was simply a lightweight wrapper around `setTimeout` with negligible overhead. I then examined the lag-correction logic in `doWait()`. The calculation itself was correct, but because it ran before callback latency occurred, it couldn't compensate for delays introduced afterwards.

Graphics rendering was another suspect, but although it added a small amount of overhead, the same synchronization drift appeared even in projects with almost no graphics.

That left the scheduler itself. I instrumented the scheduling path and measured the gap between when callbacks were expected to run and when they actually started. Every callback arrived late, averaging **10–12 ms** across the benchmark projects. Since each callback scheduled the next note, those delays accumulated over time, eventually growing to several seconds in longer, multi-voice projects.

That was the turning point. The issue wasn't the interpreter, graphics, or Tone.js , it was relying on the browser's timer queue for audio-critical scheduling.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/perf-graph.jpeg"
    alt="Performance graph of Frere-Jacques"
    width="800"
  />
</p>

---

## From Investigation to Solution

Once the investigation pointed to the scheduler, the solution became much clearer.

The existing implementation relied on `setTimeout()`, which depends on the browser's event loop. Whenever the browser is busy rendering, executing JavaScript, or performing garbage collection, callbacks are delayed—and because each callback schedules the next one, those delays gradually accumulate throughout playback.

For a music application, that's not ideal.

Instead of relying on browser timer accuracy, I replaced the non-zero-delay scheduling inside `runFromBlock()` with `Tone.Transport.schedule()`. Unlike `setTimeout()`, `Tone.Transport` is designed specifically for musical timing and schedules playback using Tone.js' transport timeline rather than depending on the browser's timer queue.

The important part is that this change only affects how delayed playback events are scheduled. The interpreter, playback logic, and graphics pipeline remain unchanged. I also added per-turtle transport state, ensured pending transport events are cancelled during stop/restart, and preserved the original `setTimeout()` path for zero-delay execution, step mode, async-yield execution, and environments where the transport scheduler isn't available.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Scheduler-Diagram.png"
    alt="Before and after scheduler architecture"
    width="700"
  />
</p>

---

## Architecture Improvements

During review, Walter suggested keeping all transport-specific logic inside [synthutils.js](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/synthutils.js) instead of referencing `Tone.Transport` throughout the codebase.

Following that suggestion, I introduced a transport wrapper that encapsulates all transport-related operations. [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js) now interacts with `this.synth.transport` instead of calling `Tone.Transport` directly.

Although this doesn't change functionality, it makes the design cleaner by isolating the Tone.js dependency to a single location. If the transport implementation ever changes in the future, only the wrapper will need to change while the rest of the playback code can remain untouched.

---

## Measuring the Impact
 
To verify the fix, I instrumented the existing [Cypress](https://www.cypress.io/) performance benchmark rather than relying on manual spot-checks. The benchmark loads a project, triggers playback, and the instrumentation captures scheduling metrics (callback latency, drift) directly during the automated run, so results are reproducible instead of eyeballed. One snag: after switching schedulers, my original latency metric no longer measured the same thing across both implementations, so I fixed the instrumentation itself before trusting any numbers.
 
Using [Frère Jacques](https://github.com/sugarlabs/musicblocks/blob/master/examples/Frere-Jacques.html) (268 notes, 4 voices):
 
| Metric                      | Before    | After    |
| --------------------------- | --------- | -------- |
| Mean callback latency       | ~44.95 ms  | ~11.73 ms |
| P99 callback latency        | ~704.9 ms  | ~66.17 ms |
| Worst callback latency      | ~1861.5 ms | ~327.3 ms |
| Cumulative scheduling drift | ~29.8 s    | ~7.8 s    |
 
---
 
## Challenges
 
The real challenge wasn't the fix , it was proving that it was necessary. Several components looked like plausible bottlenecks (interpreter, graphics, lag correction), so I had to collect evidence and eliminate each one rather than optimizing on a hunch. Benchmarking also needed a second pass, since the scheduler swap silently changed what the latency metric actually measured.
 
---
 
## What I Learned
 
The first suspected bottleneck is rarely the real one , instrumentation beats assumption every time. Browser timers and audio scheduling have very different guarantees, and audio work benefits far more from scheduling against an audio clock than an event loop. I also came away with a stronger appreciation for isolating third-party libraries behind small wrappers - cheap insurance for future changes.
 
---

## Where This Leaves the Phase 2 Roadmap

This week's work completes the **Execution Scheduling & Synchronization** milestone under **Step 3** of the Phase 2 roadmap. With playback scheduling now improved, my next focus will be investigating canvas rendering performance—particularly the slowdown observed when large block stacks remain visible during playback in projects like [CrabCanon Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html). After that, I'll move on to the remaining Phase 2 milestones.

- **Step 1: Logo Execution Engine Optimization** – Complete ([PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582), [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643)).
- **Step 2: Block Execution Analysis & Optimization** – Complete ([PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668)).
- **Step 3: Turtle & Music Execution Optimization** – Complete  ([PR #7703](https://github.com/sugarlabs/musicblocks/pull/7703)).
- **Step 4: Memory Leak Detection & Prevention** – Planned.
- **Step 5: Garbage Collection & Runtime Stability** – Planned.

---
 
## Next Week
 
With scheduling fixed, my next focus is the remaining runtime cost during playback particularly rendering, which earlier investigation showed gets expensive in larger projects like [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html). I'll profile the rendering pipeline and look for ways to cut unnecessary canvas updates without changing the user experience and then I will move towards step 4.
 
---

## Resources & References

- **Investigation Report:** [Playback Scheduling Synchronization Investigation Report](https://docs.google.com/document/d/1nFWIswAdXjaU1mFpLa_wxaTn1CGgscrR_55qjK9sOU4/edit?usp=sharing)
- **PR This Week:**
  - [PR #7481](https://github.com/sugarlabs/musicblocks/pull/7703)
- **Architecture References:**
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  - [synthutils.js](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/synthutils.js)
  - [turtle.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtle.js)
  - [tonemock.js](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/__tests__/tonemock.js)

- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
- **Automation Framework:** [Cypress](https://www.cypress.io/) / [Electron](https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci) (headless)
- **Benchmark Workload:** [Frere-Jacques](https://github.com/sugarlabs/musicblocks/blob/master/examples/Frere-Jacques.html)

---

## Acknowledgments

A big thanks to my mentor, Walter Bender, for his guidance, thoughtful reviews, and valuable feedback throughout this work. I'd also like to thank my co-mentor, Om Santosh Suneri, and the entire Sugar Labs community for their continuous support.
 