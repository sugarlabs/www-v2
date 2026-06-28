---
title: "GSoC '26 Week 5 Update by Shreya Saxena"
excerpt: "Analyzed block execution timing across benchmark projects, shipped micro-optimizations to runFromBlockNow, and fixed a synth initialization regression."
category: "DEVELOPER NEWS"
date: "2026-06-29"
slug:slug: "2026-06-29-gsoc-26-shreya-saxena-week05"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week05,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-22 – 2026-06-28

---

## Goals for This Week

- **Goal 1:** Investigate whether the Logo interpreter (`runFromBlockNow`) is a significant playback bottleneck, or whether the bottleneck lies elsewhere in block execution.
- **Goal 2:** Instrument and benchmark interpreter performance across a representative set of Music Blocks projects.
- **Goal 3:** Identify and implement feasible micro-optimizations inside `runFromBlockNow` based on profiling results.

---

## This Week's Achievements

### 1. Block Execution Analysis: Is the Interpreter the Bottleneck?

Following up on the Phase 2 roadmap from last week, I carried out a full investigation into whether `runFromBlockNow()` (the core Logo interpreter loop) is a significant source of playback overhead.

**Methodology:**

Benchmarks were run using the existing Cypress/Electron performance harness, with:
- [Electron](https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci) (headless)
- [Cypress](https://www.cypress.io/#create) benchmark harness with `?performance=true`
- A fresh browser session for every run
- Projects loaded from fixtures before playback
- Execution fingerprints verified (`fingerprint.match == true`) to confirm identical workloads across runs
- Metric: cumulative `blockTimings.total`

Five representative benchmark projects were used, spanning different sizes and characteristics:

| Project | Approx. Blocks | Characteristics |
|---|---|---|
| [Crab Canon](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon.html) | 877 | music-heavy |
| [Zelda](https://github.com/sugarlabs/musicblocks/blob/master/examples/zelda.html) | 765 | large music project |
| [12 Bar Blues](https://github.com/sugarlabs/musicblocks/blob/master/examples/12-bar-blues.html) | 612 | medium music project |
| [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) | 877 | music + graphics |
| [Ascending Notes Color Spiral](https://github.com/sugarlabs/musicblocks/blob/master/examples/ascending-notes-color-spiral.html) | 46 | graphics-heavy |

**The Finding:**

Across every benchmark, interpreter execution represented **less than 1% of total playback time**:

| Project | Block execution | Wall time | Block % |
|---|---|---|---|
| [Crab Canon](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon.html)| ~304 ms | ~50.2 s | 0.60% |
| [Zelda](https://github.com/sugarlabs/musicblocks/blob/master/examples/zelda.html) | ~468 ms | ~82.3 s | 0.57% |
| [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) | ~441 ms | ~50.2 s | 0.88% |
| [12 Bar Blues](https://github.com/sugarlabs/musicblocks/blob/master/examples/12-bar-blues.html) | ~347 ms | ~37.3 s | 0.93% |
| [Ascending Notes Color Spiral](https://github.com/sugarlabs/musicblocks/blob/master/examples/ascending-notes-color-spiral.html) | ~117 ms | ~19.2 s | 0.61% |

Even eliminating interpreter execution entirely would reduce total playback time by less than 1%. The remaining runtime is dominated by Tone.js audio synthesis, Singer processing, EaselJS canvas rendering, and browser scheduling/timers.

**Block-Level Analysis:**

Instrumentation identified the most frequently executed blocks: `hidden`, `pitch`, `newnote`, and `vspace`. The `hidden` block consistently accounted for the largest cumulative interpreter time, since it dispatches child block execution throughout the program. However, typical per-call costs remained very small:

| Block | Average per call |
|---|---|
| hidden | ~0.9 ms |
| pitch | ~0.28 ms |
| newnote | ~0.19 ms |
| vspace | ~0.10 ms |

No individual block was identified as a dominant computational bottleneck.

**Benchmark Reliability:**

Stability varied by project size. [Crab Canon](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon.html) and [Zelda](https://github.com/sugarlabs/musicblocks/blob/master/examples/zelda.html) produced repeatable measurements suitable for direct comparison. [12 Bar Blues](https://github.com/sugarlabs/musicblocks/blob/master/examples/12-bar-blues.html), [Ascending Notes Color Spiral](https://github.com/sugarlabs/musicblocks/blob/master/examples/ascending-notes-color-spiral.html), and [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) showed higher variance, caused by factors outside the interpreter: JavaScript garbage collection, Electron scheduling, EaselJS rendering, and a pre-existing `adjustDocks` race condition in [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) . These three projects were therefore excluded from quantitative conclusions about small interpreter optimizations.

**Conclusion:**

Block execution is not a major bottleneck as it accounts for less than 1% of total playback time across all benchmarked projects. Remaining interpreter optimizations are necessarily micro-optimizations with correspondingly small end-to-end impact. This sets the scope for the optimization work below, ahead of moving to Step 3 next week.

---

### 2. Interpreter Micro-Optimizations:

Based on the analysis above, I implemented and merged four implementation-level improvements inside `runFromBlockNow()`, focused on removing mechanical overhead without changing interpreter behavior or execution semantics:

- **Iteration budget:** Replaced the incrementing `_totalIterations` counter with a decrementing `_iterationBudget`, while preserving identical infinite-loop detection semantics.
- **Shared timing helper:** Moved the per-call `recordBlockTiming` closure into a shared static helper, `Logo._recordBlockTiming()`, avoiding allocation of a new closure on every `runFromBlockNow()` invocation.
- **Guarded profiling calls:** `performanceTracker.enterBlock()` and `performanceTracker.exitBlock()` are now invoked only when profiling is enabled, avoiding unnecessary no-op calls during normal execution.
- **Corrected profiling order** for `enterBlock()`.

[PR #7668: perf: optimize per-block execution overhead in runFromBlockNow](https://github.com/sugarlabs/musicblocks/pull/7668)  (**Merged**).

**Benchmark Results:**

Baseline measurements were collected before the four-commit `runFromBlockNow` optimization series; optimized measurements were collected after the complete series, including this [PR](https://github.com/sugarlabs/musicblocks/pull/7668). The values below therefore reflect the cumulative impact of the series rather than this [PR](https://github.com/sugarlabs/musicblocks/pull/7668) in isolation.

| Project | Baseline | Optimized |
|---|---|---|
| [Crab Canon](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon.html) | 303.5 ms | 255.1 ms |
| [Zelda]((https://github.com/sugarlabs/musicblocks/blob/master/examples/zelda.html)) | 468.2 ms | 459.5 ms |

Smaller benchmark projects showed expected run-to-run variance from JIT compilation, garbage collection, and Electron scheduling; benchmark fingerprints stayed identical across runs, confirming identical workloads.

**Regression Risk:** Low. These changes do not modify execution order, flow dispatch, queue management, turtle state, audio generation, rendering logic, or user-visible behavior.

---

### 3. Bug Fix: Synth Initialization for Runtime-Created Turtles

Devin reported [Issue #7641 - Play is sometimes unreliable the first time](https://github.com/sugarlabs/musicblocks/issues/7641), a regression introduced by last week's `_synthsInitialized` guard [PR #7617](https://github.com/sugarlabs/musicblocks/pull/7617). The bug was difficult to reproduce because it only occurred in specific execution paths where turtles were created during playback.

**Root Cause:**

The `_synthsInitialized` guard skipped all subsequent initialization after the first Play. As a result, turtles created later during execution were never initialized with the required synth state, leading to runtime errors.

**Fix:**

Instead of returning immediately when `_synthsInitialized` is `true`, the initialization now performs a lightweight pass and initializes only turtles that have not been initialized yet. Previously initialized turtles are skipped, preserving the performance benefit from [PR #7617](https://github.com/sugarlabs/musicblocks/pull/7617) while correctly handling turtles created during execution.

[PR #7643: fix: resolve synth initialization bug](https://github.com/sugarlabs/musicblocks/pull/7643)  (**Merged**). 

---

## Challenges & Key Learnings

- **Challenge:** Last week's `_synthsInitialized` guard ([PR #7617](https://github.com/sugarlabs/musicblocks/pull/7617)) broke synth setup for turtles created mid-execution - reported by Devin as [Issue #7641](https://github.com/sugarlabs/musicblocks/issues/7641). The bug was difficult to reproduce. The fix replaced the blanket initialization skip with a lightweight per-turtle check [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643).

  **Key Learning:** Performance work always carries regression risk. The goal isn't to eliminate regressions entirely, but to catch them quickly, understand the root cause, and fix them with the smallest safe change.

- **Challenge:** Deciding whether further interpreter optimization was worthwhile once profiling showed block execution contributed only a tiny fraction of overall playback time. 

  **Key Learning:** Measure before optimizing. Verifying that interpreter execution accounted for <1% of playback time prevented spending time on micro-optimizations with little real-world impact, while still leaving room for targeted improvements like [PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668).

- **Challenge:** Benchmarks such as [12 Bar Blues](https://github.com/sugarlabs/musicblocks/blob/master/examples/12-bar-blues.html), [Ascending Notes Color Spiral](https://github.com/sugarlabs/musicblocks/blob/master/examples/ascending-notes-color-spiral.html), and [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) exhibited significant run-to-run variance unrelated to interpreter performance.

  **Key Learning:** Trustworthy benchmarks require validating the workload before analyzing the numbers. Fingerprint verification (`fingerprint.match == true`) confirmed identical execution across runs, allowing the remaining variance to be attributed to GC, Electron scheduling, and a known `adjustDocks` race rather than interpreter changes.

---

## Where This Leaves the Phase 2 Roadmap

This week's work completes the investigation portion of **Step 2: Block Execution Analysis & Optimization** from the 5-step Phase 2 plan:

- **Step 1: Logo Execution Engine Optimization** : Complete ([PR #7582](https://github.com/sugarlabs/musicblocks/pull/7582), [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643)).
- **Step 2: Block Execution Analysis & Optimization** : Investigation complete. Micro-optimizations implemented and merged via [PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668).
- **Step 3: Turtle & Music Execution Optimization** : (Execution Scheduling & Synchronization), investigating playback scheduling to identify synchronization bottlenecks and improve timing accuracy
- **Step 4: Memory Leak Detection & Prevention** : Planned.
- **Step 5: Garbage Collection & Runtime Stability** : Planned; GC pressure was already visible as a source of benchmark variance this week, which will feed directly into this step.

---

## Plans for Next Week

Proceed into Step 3 (Execution Scheduling & Synchronization), investigating the playback scheduling pipeline through instrumentation to identify synchronization bottlenecks, quantify scheduling drift, and evaluate architectural improvements for more accurate and reliable playback.

---

## Resources & References

- **Investigation Report:** [Block Execution Analysis](https://docs.google.com/document/d/1GBLlqj1BliyYaH-GzM6HmWMnot5JK_64_r7iyXwTtqc/edit?usp=sharing)

- **PRs This Week:**
  - [PR #7668: perf: optimize per-block execution overhead in runFromBlockNow](https://github.com/sugarlabs/musicblocks/pull/7668) (Merged)
  - [PR #7643: fix: resolve synth initialization bug](https://github.com/sugarlabs/musicblocks/pull/7643) (Merged)

- **Architecture References:**
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)

- **Benchmark Projects:**
  - [Crab Canon](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon.html)
  - [Zelda](https://github.com/sugarlabs/musicblocks/blob/master/examples/zelda.html)
  - [12 Bar Blues](https://github.com/sugarlabs/musicblocks/blob/master/examples/12-bar-blues.html)
  - [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)
  - [Ascending Notes Color Spiral](https://github.com/sugarlabs/musicblocks/blob/master/examples/ascending-notes-color-spiral.html)

- **Automation Framework:** [Cypress](https://www.cypress.io/) / [Electron](https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci) (headless)

- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Devin Ulibarri for catching and flagging the synth initialization regression, and to Walter Bender for reviewing and merging [PR #7668](https://github.com/sugarlabs/musicblocks/pull/7668) and [PR #7643](https://github.com/sugarlabs/musicblocks/pull/7643), and for continued mentorship alongside Om Santosh Suneri. Thanks also to the Sugar Labs community for their ongoing support.

---



