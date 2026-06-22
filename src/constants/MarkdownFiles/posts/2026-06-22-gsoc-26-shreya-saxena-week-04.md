---
title: "GSoC '26 Week 4 Update by Shreya Saxena"
excerpt: "Investigated Firefox rendering bottlenecks and optimized the Music Blocks execution engine."
category: "DEVELOPER NEWS"
date: "2026-06-22"
slug:slug: "2026-06-22-gsoc-26-shreya-saxena-week04"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week04,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-15 – 2026-06-21

---

## Goals for This Week

- **Goal 1:** Investigate Firefox performance degradation on [Crabcanon-plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) (flagged by Devin) and identify the rendering bottleneck.
- **Goal 2:** Optimize the Logo Execution Engine to improve Music Blocks runtime performance.
- **Goal 3:** Define a concrete 5-step optimization roadmap for the remaining GSoC period.

---

## This Week's Achievements

### 1. Firefox Performance Investigation: Canvas Compositing Bottleneck

Devin flagged that [Crabcanon-plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) performs significantly worse on Firefox than Chrome. I profiled the rendering pipeline end-to-end and identified the root cause.

**The Finding:**

Profiling revealed that  approx **~83.9% of `Stage.update()` execution time is spent inside `drawImage()`** the EaselJS compositing step where each turtle's off-screen canvas is rendered onto the main stage canvas every frame.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Firefox-Perf-Graph.jpeg"
    alt="Firefox DevTools flame graph showing Music Blocks rendering performance"
    width="800"
  />
</p>

**Canvas Size Scales Without Bounds:**

The critical insight: canvas dimensions are derived directly from `window.innerWidth` and `window.innerHeight` with **no upper bound**. During a stress test at 30% browser zoom:

| Metric | 30% Zoom (Stress Test) | 100% Zoom (Baseline) |
|--------|------------------------|----------------------|
| Canvas Size | 4256 × 1483 | 1280 × 434 |
| Pixel Count | ~6.3M | ~0.56M |
| Frame Jank | ~53% | ~0.2% |
| Avg Frame Time | 30.28 ms | 4.05 ms |
| p95 Frame Time | 39 ms | 7 ms |
| Total drawImage() Time | 15,808 ms | 2,411 ms |


**Validation Through Experimentation:**

I verified the hypothesis by temporarily capping canvas dimensions to 1920×1080, which reduced rendering cost. However, this introduced coordinate misalignment (the canvas was bounded but block layout still used full viewport dimensions), so I reverted rather than propose it as a fix.

**Conclusion:**

Under normal viewport sizes (100% zoom), playback remains smooth. Firefox's extreme zoom-out scenario creates an unusually large viewport that falls outside typical usage. **Canvas size is the major contributor to Firefox slowdown under extreme zoom**, not a general Firefox rendering inefficiency. This investigation established the need for cross-browser profiling. Going forward, all performance analysis will be performed on both Firefox and Chrome.

**Recommended Approach & Implementation:**

Rather than force a canvas cap, I implemented a **Firefox-specific warning** that detects when the viewport exceeds a reasonable threshold and displays a message suggesting the user reset zoom to 100%. This approach:
- Maintains full compatibility
- Guides users toward expected behavior without forcing constraints
- Respects browser settings while educating about performance implications

**Implementation complete** : warning now displays when viewport size indicates potential performance degradation. [PR #7578](https://github.com/sugarlabs/musicblocks/pull/7578)

---

### 2. Synth Initialization Memoization

**Logo Execution Engine Optimization** : first phase of the 5-step optimization plan.

Shipped a two-part fix to reduce startup overhead:

- **Part A:** Added `_synthsInitialized` guard in `prepSynths()` to prevent redundant synth initialization on repeated Play clicks.  [PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582)
- **Part B:** Deferred `hideBlocks()` via `requestAnimationFrame` to prevent blocking the UI thread during the Play startup sequence. 
[PR #7617 (In Progress)](https://github.com/sugarlabs/musicblocks/pull/7617)

**Impact:**
- Reduced main-thread long tasks during Play startup from **232–221 ms** to **114–121 ms**, improving initial Play responsiveness, especially for larger projects with many synths.
- Reduced `runFromBlockNow()` execution time by approximately **~5%**, lowering interpreter overhead during program execution.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Performance-graph.jpeg"
    alt="Chrome DevTools performance trace showing Play startup execution."
    width="600"
  />
</p>

---

### 3. Block Execution Analysis Benchmark Harness

Implemented a comprehensive instrumentation framework for [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) to enable fine-grained performance measurement:

- **`window.actionStats`:** A global object that tracks execution timing for hot functions (e.g., `_doWait`, `_doRepeat`, `_doIf`) using high-resolution `performance.now()` timestamps.
- **Standalone Benchmark:** Created a benchmark harness that loads a project file, triggers Play, and polls for execution completion enabling automated performance regression detection.
- **Minimal Overhead:** Instrumentation is gated behind a check, so production builds incur no cost.

This benchmark harness provides the infrastructure for Phase 2 optimization work. I am currently working on the feasible optimizations (if possible) and will share the progress next week.

---

## Challenges & How I Overcame Them

- **Challenge:** Browser-level zoom isn't directly detectable via JavaScript in Firefox; attempting to disable zoom via JavaScript or viewport meta tags doesn't work reliably.  
  **Solution:** Shifted focus from prevention to detection. Instead of blocking zoom, we detect its effect (viewport size exceeding thresholds) and warn users a non-invasive approach that respects browser settings while guiding expected usage.

- **Challenge:** The canvas compositing bottleneck only manifests under extreme viewport conditions; normal usage is unaffected.  
  **Solution:** Treated this as a defect in edge-case behavior rather than a general rendering problem. Validated the root cause (pixel count) through experimentation before proposing solutions.

- **Challenge:** Instrumentation for [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) needed to be lightweight and not interfere with block execution timing.  
  **Solution:** Used `performance.now()` for wall-clock time and kept instrumentation behind conditional checks so it can be disabled in production.

---

## Key Learnings

- **Browser constraints matter.** Firefox's zoom behavior is a browser-level feature that applications cannot override. The performant path is to detect the effect and guide users, not fight the browser. Although I will now be profiling on both Firefox and Chrome to analyze the problem clearly.
- **Stress-test extremes can hide real insights.** A 30% zoom stress test revealed that canvas size scales unboundedly a finding that wouldn't emerge from normal profiling but is crucial for understanding edge-case behavior.
- **Memoization in hot paths has immediate impact.** The synth initialization fix is a one-line guard that eliminates redundant work on every Play clicksmall changes in frequently called paths compound quickly.
- **Micro-optimizations can have big impact.** Reducing main thread long tasks from 232ms to 114ms through targeted fixes demonstrates that seemingly small optimizations in hot paths yield measurable gains when applied consistently.

---

## Phase 2 Optimization Roadmap: 5-Step Plan

With Phase 1 instrumentation and bottleneck analysis complete, Phase 2 focuses on **targeted execution-path optimization** across five interconnected subsystems:

### Step 1: Logo Execution Engine Optimization 
- Implemented via [PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582) and [PR #7617](https://github.com/sugarlabs/musicblocks/pull/7617) (synth initialization memoization).
- Target: Reduce block execution latency for hot paths.

### Step 2: Block Execution Analysis & Optimization 
- Analyzing [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js) block handler overhead (parameter binding, queue management).
- Profiling [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) hot functions 

- Identifying redundant parameter copies or queue traversals.
- Determining feasibility: block execution is distributed across playback (0.1-2.5ms per block), not frame-critical. Assessing whether micro-optimizations yield meaningful per-frame gains or only cumulative improvements.

### Step 3: Turtle & Music Execution Optimization 
- Profile [turtle-singer.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtle-singer.js) and [turtle-painter.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtle-painter.js) to identify synchronization overhead.
- Reduce context-switch costs between graphics and audio dispatch.
- Optimize timeline reconciliation for large and representative projects.

### Step 4: Memory Leak Detection & Prevention 
- Implement heap profiling to detect object accumulation during playback.
- Audit event listener registration/deregistration cycles.
- Validate that `parentFlowQueue` and similar bookkeeping structures are properly cleaned up after execution.

### Step 5: Garbage Collection & Runtime Stability 
- Measure GC pause duration and frequency during long playbacks.
- Batch allocations to reduce GC pressure in hot loops.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Optimization-Plan.jpeg"
    alt="Music Blocks Phase 2 performance optimization workflow."
    width="700"
  />
</p>

---

## Plans for Next Week

**Step 2: Block Execution Optimization (Implementation Phase)**

Profiling work on block execution is almost complete. Currently detailing profiling results on specific aspects to determine whether feasible optimizations exist. Initial findings show parameter binding and queue traversal as potential optimization targets. Now moving to implementation based on profiling findings:

- Analyze profiling results from [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js) and [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) to identify concrete optimization targets.
- Implement targeted optimizations for highest-impact block handlers (parameter binding, queue overhead, block dispatch).
- Measure performance gains using the [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) instrumentation harness.
- Validate optimizations on [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) and other representative projects to ensure correctness.

---

## Resources & References

- **Firefox Performance Investigation Report:** [Full Analysis](https://docs.google.com/document/d/1sVVFc620a4MbxsBtp-Dg0wP4kr6kPTN4US4aZBR3U8c/edit?usp=sharing) *(link to investigation Report)*
- **PRs This Week:**
  - [PR #7582: Optimize logo Exceution engine (Part A)](https://github.com/sugarlabs/musicblocks/pull/7582)
  - [PR #7617: Optimize logo execution engine (Part B)](https://github.com/sugarlabs/musicblocks/pull/7617)
  - [PR #7578: Firefox warning implementation](https://github.com/sugarlabs/musicblocks/pull/7578)
- **Architecture References:**
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  - [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js)
  - [turtle-singer.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtle-singer.js)
  - [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js)
- **Automation Framework:** [Playwright](https://playwright.dev/)
- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
- **Benchmark Workload:** [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)

---

## Acknowledgments

Thank you to Devin Ulibarri for flagging the Firefox performance issue and pushing for a thorough investigation. Thanks to Walter Bender and Om Santosh Suneri for continued mentorship, and to Sugarlabs community for their support.

---

## Next Steps

Proceed into Step 2 (Block Execution Analysis & Optimization) focusing on [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js) and [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js) profiling using the new instrumentation harness.

