---
title: "GSoC '26 Week 7 Update by Shreya Saxena"
excerpt: "Optimized rendering performance with viewport culling, improved Tone.Transport scheduling robustness, and fixed error message rendering."
category: "DEVELOPER NEWS"
date: "2026-07-14"
slug: "2026-07-14-gsoc-26-shreya-saxena-week07"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week07,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 – 2026-07-12

---

## This Week's Achievements

### 1. Viewport Culling for Off-Screen Blocks

Walter reported a noticeable playback slowdown in Crabcanon Plot whenever the block workspace was visible. Profiling showed that every `stage.update()` traversed the entire EaselJS display list, causing off-screen block containers to still pass through the rendering pipeline despite not being visible. Profiling showed that every `stage.update()` traversed the entire EaselJS display list, causing off-screen block containers to still pass through the rendering pipeline despite not being visible.

Implemented viewport culling in [PR #7738](https://github.com/sugarlabs/musicblocks/pull/7738) (merged):

- Added a `_viewportVisible` flag to blocks and integrated it into `container.isVisible()`.
- Introduced `_updateViewportCulling()` to hide off-screen blocks using an AABB viewport test.
- Cached container positions so culling is recomputed only after pan, scroll, or resize operations.

**Benchmark (Crabcanon Plot, blocks visible during playback)**

| Metric | Before | After | Improvement |
| --- | ---: | ---: | ---: |
| `stage.update()` average | 4.807 ms | 1.972 ms | **59% reduction** |
| `stage.update()` maximum | 19.000 ms | 4.100 ms | **78% reduction** |

Viewport culling significantly reduced rendering overhead, although the visible-block playback regression still requires further investigation.

---
 
### 2. Bug Fix: Error Message Not Displaying
 
While testing playback across projects , Walter flagged that Rainbow Connection threw an error at one point, but the message never showed up , only the red arrow error indicator appeared, even after adding a console log to `msgError` to try to trace it.
 
**Root Cause:**

The issue stemmed from three problems in [alert-renderer.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity/alert-renderer.js):

- `activity.errorMsgText.text` was never updated with the actual error message.
- After the text changed, the cached EaselJS bubble container wasn't refreshed, so it continued rendering stale (empty) content.
- The DOM error overlay was only updated in the default `switch` case, preventing known error constants from displaying their messages.

*Fix implemented in [PR #7755](https://github.com/sugarlabs/musicblocks/pull/7755) (merged):

- Updated the canvas error bubble with the actual error message text.
- Refreshed the cached EaselJS container after updating the text.
- Ensured the DOM error overlay is displayed regardless of which error type is triggered.
- Brought the error bubble to the top of the stage so it remains visible instead of being rendered beneath other elements.
 
---
 
### 3. Hardening Tone.Transport Scheduling

While reviewing the `Tone.Transport` scheduling path introduced in [PR #7703](https://github.com/sugarlabs/musicblocks/pull/7703), I identified two scheduler edge cases that could prevent delayed playback events from executing correctly.

- Scheduling only checked whether `Tone.Transport` was available, not whether its clock was actually running. If the `AudioContext` was suspended or `Tone.Transport` had stopped, scheduled events would never fire.
- Timing drift could occasionally schedule events in the past, causing multiple callbacks to execute immediately instead of at their intended times.

Implemented in [PR #7776](https://github.com/sugarlabs/musicblocks/pull/7776) (merged):

- Added an `isClockRunning` check that falls back to the existing `setTimeout` scheduler when the Transport clock is unavailable.
- Clamped scheduled times to the current Transport position before scheduling:
  ```js
  const transportTime = Math.max(
      tur._transportTime + delay / 1000,
      logo.synth.transport.seconds
  );
---
 
### 4. Memory Leak & Long-Session Stability (In Progress)
 
Started the Step 4/5 investigation into memory leaks and long-session stability, prompted by the repeated-run degradation seen on Crabcanon-Plot. This round of testing was scoped to the Crabcanon-Plot project specifically:
 
- Chrome's heap usage fluctuated across repeated runs rather than climbing steadily , not the signature of a classic leak.
- Firefox showed a steadily increasing DOM node count across repeated runs of the same project, which is more suspicious and needs further tracing.
- `_unhighlightTimers` generally returned to zero between runs, so timer leakage doesn't look like the primary cause.
- Also compared the natural playback-completion path against `doStopTurtles()`: the Stop path clears timers, Transport state, and synth state, while the natural completion path skips several of those cleanup steps , likely worth making consistent as a next step.
This isn't resolved yet , Firefox's DOM node growth in particular still needs root-causing , so it carries over into next week rather than being closed out this week. I'll also extend this testing to recursion-heavy projects.

---
 
## Challenge & Key Learning

- **Challenge:** Debugging the performance degradation in Crabcanon-Plot when blocks are visible continues to be challenging. Walter referred to as the "canary in the coal mine" because it is the first project to reveal rendering performance issues. Although viewport culling addressed one contributor, the regression is not yet fully resolved.

  **Key Learning:** Breaking the problem into smaller, measurable pieces with targeted instrumentation made it easier to isolate individual sources of overhead and validate improvements incrementally.

---
 
## Where This Leaves the Phase 2 Roadmap
 
- **Step 1: Logo Execution Engine Optimization** – Complete ([PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582), [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643)).
- **Step 2: Block Execution Analysis & Optimization** – Complete ([PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668)).
- **Step 3: Turtle & Music Execution Optimization (Execution Scheduling & Synchronization)** — In progress: Transport scheduling hardened ([PR #7776](https://github.com/sugarlabs/musicblocks/pull/7776)); rendering-side scheduling/culling work ongoing ([PR #7738](https://github.com/sugarlabs/musicblocks/pull/7738)).
- **Step 4: Memory Leak Detection & Prevention** - Started; Chrome heap vs. Firefox DOM-node divergence identified, root cause not yet confirmed.
- **Step 5: Garbage Collection & Runtime Stability** - Planned; will build on the Step 4 findings.

---
 
## Plans for Next Week
 
- Continue the highlighting-overhead follow-up, with benchmarks run consistently across Firefox, Chrome, and Edge.
- Root-cause the Firefox DOM-node growth from the memory-leak investigation, align the Stop-path and natural-completion cleanup logic, and extend testing to recursion-heavy projects.

---
 
## Resources & References
 
- **PRs This Week:**
  - [PR #7738: perf: cull off-screen blocks from display list to reduce stage.update() cost](https://github.com/sugarlabs/musicblocks/pull/7738) (Merged)
  - [PR #7755: fix: display actual error text instead of placeholder](https://github.com/sugarlabs/musicblocks/pull/7755) (Merged)
  - [PR #7776: fix: handle stopped Transport clock and past-time scheduling](https://github.com/sugarlabs/musicblocks/pull/7776) (Merged)
- **Related Prior Work:**
  - [PR #7703: Tone.Transport scheduling](https://github.com/sugarlabs/musicblocks/pull/7703)
- **Architecture References:**
  - [block.js](https://github.com/sugarlabs/musicblocks/blob/master/js/block.js)
  - [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js)
  - [activity.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity.js)
  - [alert-renderer.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity/alert-renderer.js)
  - [synthutils.js](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/synthutils.js)
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
- **Benchmark Project:**
  - [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)
- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)

---
 
## Acknowledgments
 
Thanks to Walter Bender for his guidance, valuable feedback, and for reviewing and testing my PRs throughout this week's work. Thanks also to the Sugar Labs community for their continued support.