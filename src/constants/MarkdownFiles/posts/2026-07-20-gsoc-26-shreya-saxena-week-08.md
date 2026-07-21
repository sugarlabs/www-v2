---
title: "GSoC '26 Week 8 Update by Shreya Saxena"
excerpt: "Landed natural-completion cleanup parity and the runtime/visual-reset separation fix, ruled out an explicit memory leak on Musical Tree and Hilbert Recursive, and kept iterating on the block-highlighting slowdown."
category: "DEVELOPER NEWS"
date: "2026-07-21"
slug: "2026-07-21-gsoc-26-shreya-saxena-week08"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week08,shreya-saxena"
image: "assets/Images/GSOC.webp"
---
<!-- markdownlint-disable -->

# Week 8 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-14 – 2026-07-20


---

## This Week's Achievements

### 1. Natural Completion Cleanup Parity
Continuing from last week's `Tone.Transport` hardening, I closed two remaining gaps between the natural-completion path and `doStopTurtles()`: `evalOnStopList` callbacks were not firing when playback finished on its own, and `logo.sounds` kept holding references to sound objects that had already completed.

Implemented in [PR #7832](https://github.com/sugarlabs/musicblocks/pull/7832) (merged):
- Run `evalOnStopList` plugin callbacks on natural completion, not only on explicit Stop.
- Clear `logo.sounds` so completed sound references can be released.
- Deliberately left the rest of `doStopTurtles()`'s cleanup (timer cancellation, transport stop/cancel, instrument disposal) untouched, since an earlier attempt at broadening this cleanup [PR #7829](https://github.com/sugarlabs/musicblocks/pull/7829) introduced regressions and was reverted. Timers had already fired and Transport events already processed by the time natural completion runs, and instrument/Transport state is intentionally kept alive for reuse on the next `runLogoCommands()` call.

---

### 2. Separating Runtime Cleanup from Visual Reset

While testing repeated Run cycles, I revisited the canvas accumulation / graph distortion issue mentioned in last week's memory-leak notes. The root cause was that the same cleanup path was being used for both natural completion and explicit Stop, even though the two have different requirements: natural completion should clean up runtime state while preserving the drawing (for SVG/PNG export), while Stop should additionally clear the canvas, stop the recorder, and execute stop-specific actions.

Implemented in [PR #7848](https://github.com/sugarlabs/musicblocks/pull/7848) (merged), after several rounds of review:

- Extracted a shared runtime-cleanup path for audio, transport, and instrument disposal while keeping Stop-specific behavior separate.
- Moved canvas clearing out of the shared cleanup path so natural completion preserves drawings, and limited canvas clearing to toolbar Run actions instead of every execution path.
- Fixed a race condition where stale cleanup timers could trigger duplicate cleanup on the next run, interrupting audio playback, and added safeguards for overlapping multi-turtle completion.
- Restored Stop-only callbacks to their intended behavior and prevented duplicate instrument disposal when multiple turtles finished at different times.
- Added regression tests covering drawing preservation after natural completion, cleanup races, recorder safety, and repeated execution.

**Before/after check on [Musical Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html):** This project previously showed graph distortion / canvas accumulation after roughly 6–7 consecutive runs. During post-fix testing, I did not observe the issue even after 20+ consecutive runs.

---

### 3. Highlight-Throttling Experiment (Deferred)

I experimented with [PR #7815](https://github.com/sugarlabs/musicblocks/pull/7815), which throttled block highlighting to 60 FPS, removed redundant unhighlight timers, and skipped updateCache() for off-screen blocks.

Testing showed a small improvement, but audio desynchronization still remained. The highlight-throttling changes were therefore deferred, as they altered visible highlighting without fully resolving the issue. The viewport-culling optimization (skipping updateCache() for off-screen blocks) was implemented as part of this work.

This aligns with the earlier Firefox stage.update() bottleneck investigation from [Crabcanon-plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)

A consolidated document covering all identified block-highlighting issues, experiments, observations, and prototype investigations has been added to the References section for future reference.

---

### 4. Memory Leak Profiling : No Explicit Evidence Found

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Hilbert-recursive-profiling.jpeg"
    alt="Hilbert Recursive memory profiling results"
    width="700"
  />
</p>

As a follow-up to last week's investigation, I profiled [Musical Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) and [Hilbert Recursive](https://github.com/sugarlabs/musicblocks/blob/master/examples/hilbert-recursive.html) using repeated heap snapshots.

| Project | Initial Heap | After First Run | Peak Heap | Result |
|---------|-------------:|----------------:|----------:|--------|
| Musical Tree | ~34.74 MB | ~43.69 MB | ~46.31 MB | Stable after initialization with minor fluctuations; no consistent retained-heap growth observed. |
| Hilbert Recursive | ~34.74 MB | ~43.20 MB | ~42.70 MB | Stable after initialization with no sustained upward trend. |

**Key observations:**
- Both projects showed the expected one-time increase during initialization.
- Subsequent snapshots remained largely stable, with only minor fluctuations consistent with normal garbage collection.
- Repeated heap snapshots provided **no explicit evidence of a significant retained-heap memory leak** in either project.
- While this doesn't completely rule out memory-related issues in other workloads, it suggests retained-heap growth is not currently the primary performance bottleneck. The investigation and profiling results have been documented for future reference.

> **Note:** The complete heap snapshot results and repeated-run profiling data for both [Musical Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) and [Hilbert Recursive](https://github.com/sugarlabs/musicblocks/blob/master/examples/hilbert-recursive.html) are linked in the References section.


<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Heap-Snapshot.jpeg"
    alt="Heap usage during repeated Music Blocks execution"
    width="700"
  />
</p>

## Challenges & Key Learning

### Challenges
- Debugging the canvas accumulation/graph distortion issue was difficult because it only appeared after multiple runs, making the root cause hard to reproduce and isolate.
- Performance PRs required extensive benchmarking and repeated testing to ensure optimizations didn't introduce subtle rendering, playback, or synchronization regressions.

### Key Learning
Performance engineering is as much about validation as optimization. Systematically reproducing intermittent issues, using instrumentation to identify root causes, and validating changes across repeated runs, different project sizes, and multiple browsers are essential to delivering reliable performance improvements.

---


## Where This Leaves the Phase 2 Roadmap

- **Step 1: Logo Execution Engine Optimization** – Complete ([PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582), [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643)).
- **Step 2: Block Execution Analysis & Optimization** – Complete ([PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668)).
- **Step 3: Turtle & Music Execution Optimization (Execution Scheduling & Synchronization)** – Complete ([PR #7776](https://github.com/sugarlabs/musicblocks/pull/7776), [PR #7703](https://github.com/sugarlabs/musicblocks/pull/7703)).
- **Step 4: Canvas Rendering Optimization** – Substantially complete. Rendering investigations identified block highlighting and canvas update overheads, leading to optimizations for off-screen block rendering ([PR #7815](https://github.com/sugarlabs/musicblocks/pull/7815)). Additional rendering improvements may be explored in future iterations.
- **Step 5: Memory Management, Garbage Collection & Runtime Stability** – In progress. Runtime cleanup on natural completion ([PR #7832](https://github.com/sugarlabs/musicblocks/pull/7832)) and separation of runtime cleanup from visual reset ([PR #7848](https://github.com/sugarlabs/musicblocks/pull/7848)) improved execution stability. Heap profiling of [Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) and [Hilbert Recursive](https://github.com/sugarlabs/musicblocks/blob/master/examples/hilbert-recursive.html) found no explicit evidence of retained-heap memory leaks, while runtime profiling indicated normal garbage collection behavior. A final round of end-to-end runtime profiling will be performed before moving on to load-time optimizations.

---

## Plans for Next Week

- Investigate remaining garbage collection and runtime stability issues to fully complete **Step 4 (Memory Leak Detection & Prevention)** and **Step 5 (Garbage Collection & Runtime Stability)**.
- Perform a final round of profiling and long-running benchmark validation to confirm there are no remaining runtime or memory-related issues before moving on to load-time optimizations.

---

## Resources & References

### Investigation Reports
- [Memory Profiling Report: Musical Tree & Hilbert Recursive (Firefox)](https://docs.google.com/document/d/1Fzv_UVI1GzzNcmbldt8wUDz0MGG6NgRGd_CQlnV97B0/edit?usp=sharing)
- [Memory Profiling Report: Musical Tree (Chrome)](https://docs.google.com/document/d/1oEGNx-u_OXqWORjbxy_jnsvd-DhlDhnNCD3yUBM_LiE/edit?usp=sharing)
- [Performance Investigation: Block Highlighting](https://docs.google.com/document/d/1y7rgFBAM86nibpL1QYtFb-bJU5m-YOaz7BDNM4VC8m0/edit?usp=sharing)

### PRs This Week
- [PR #7832: fix: run stop callbacks and clear sounds on natural completion](https://github.com/sugarlabs/musicblocks/pull/7832) *(Merged)*
- [PR #7848: fix: separate runtime cleanup from visual reset](https://github.com/sugarlabs/musicblocks/pull/7848) *(Merged)*
- [PR #7815: perf: skip updateCache and markStageDirty for off-screen blocks](https://github.com/sugarlabs/musicblocks/pull/7815) *(Merged)*

### Related Prior Work
- [PR #7776: fix: handle stopped Transport clock and past-time scheduling](https://github.com/sugarlabs/musicblocks/pull/7776)
- [PR #7738: perf: cull off-screen blocks from display list to reduce stage.update() cost](https://github.com/sugarlabs/musicblocks/pull/7738)
- [PR #7829: earlier natural-completion cleanup attempt (reverted)](https://github.com/sugarlabs/musicblocks/pull/7829)

### Architecture References
- [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
- [block.js](https://github.com/sugarlabs/musicblocks/blob/master/js/block.js)
- [toolbar-controller.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity/toolbar-controller.js)
- [turtle-painter.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtle-painter.js)

### Benchmark Projects
- [Musical Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html)
- [Hilbert Recursive](https://github.com/sugarlabs/musicblocks/blob/master/examples/hilbert-recursive.html)
- [Crabcanon Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)

### Repository
- [Music Blocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Walter Bender for testing my pull requests, providing direct feedback throughout the review process, and for his continued guidance this week. Thanks also to the entire Sugar Labs community for their continued support.