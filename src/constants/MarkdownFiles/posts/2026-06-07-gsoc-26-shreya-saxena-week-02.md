---
title: "GSoC '26 Week 2 Update by Shreya Saxena"
excerpt: "Brief description of this week's progress"
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug:slug: "2026-06-07-gsoc-26-shreya-saxena-week02"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week02,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-01 – 2026-06-07

---

## Goals for This Week

- **Goal 1:** Conduct a comprehensive performance audit of the [Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) benchmark to identify runtime hotspots and optimization opportunities.
- **Goal 2:** Perform an in-depth performance analysis of [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) as a large-workload benchmark to evaluate scalability and execution costs.
- **Goal 3:** Review findings with mentors, validate the highest-impact optimization targets, and refine the project roadmap based on profiling results.

---

## This Week's Achievements

1. **[Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) - Full Performance Audit**

   <p align="center">
  <img
    src="assets/Developers/shreya-saxena/Musical-Tree-Block-Profiling.png"
    alt="Musical-Tree Block Profiling Metrics"
    width="600"
  />
</p>

   [Musical Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) uses async recursion via `setTimeout` to generate a fractal musical structure. I ran three baseline executions and established that runtime is stable at ~22.5 seconds with less than 1% variation. That runtime is by design , it equals audio playback duration.

   Key findings:
   - Block handlers account for **less than 2% of total runtime** (`hidden` dominated by call volume, not cost; `newnote` was the most expensive music-processing block measured, accounting for 31.4 ms across 156 calls).
   - Interpreter dispatch (`runFromBlockNow`) accounted for **~1.99% of total runtime** across 1,130 calls - measured via JavaScript [monkey-patching](https://www.geeksforgeeks.org/javascript/monkey-patching-in-javascript/) from the console since [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js) doesn't natively expose per-call timing for the dispatcher itself
   - Recursion scaling is **near-linear**: halving the stop threshold doubles iterations, interpreter time, and total runtime consistently
   - 20-run long session showed **no memory leak or runtime degradation**
   - `maxDepth = 1` reported by [performanceTracker](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/performanceTracker.js) across all runs confirmed as an instrumentation gap, not real behavior. Musical Tree uses async recursion via `setTimeout`, so each recursive call is a new async task. The current depth counter only tracks synchronous call stack depth and does not reflect actual recursion depth.

2. **[Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) - Full Performance Audit**

 <img
  src="assets/Developers/shreya-saxena/Crabcanon-plot-Block-Profiling.jpeg"
  alt="Crabcanon-Plot Block Profiling Metrics"
  width="600"
/>

   [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) is one of the largest benchmark projects analyzed so far - 900 runtime block objects, ~48.6 second execution time, and simultaneous multi-voice playback. I ran three baseline executions (all stable, <1% variation) and performed block-level, interpreter-level, and save-performance analysis.

   Key findings:
   - `vspace` was the most frequently called block (744 calls) but contributed only 94.3 ms total
   - `hidden` had the highest cumulative block execution time at 591.6 ms across 382 calls  (worth investigating further)
   - `pitch` was the most expensive music-processing block: 117.0 ms across 368 calls
   - Interpreter dispatch accounted for **~2.08% of total runtime** (1,013.5 ms across 2,450 calls)
   - `turtleDelay` confirmed as 0 in both projects which rules out scheduling delay as a factor
   - Canvas readback warnings observed (`getImageData` without `willReadFrequently`) may warrant follow-up
   - Long-session stability analysis is **ongoing** due to runtime instability (`unhighlight` exceptions) and repeated browser crashes during profiling

3. **Mentor Alignment : Optimization Target Confirmed**

   Based on audit findings, I proposed using [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) as the primary benchmark and optimization target going forward. Since it stresses the most components simultaneously, optimizations developed there are most likely to generalize. Walter confirmed: *"[Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) is the right benchmark as it stresses many components."* Runtime performance was confirmed as the top priority.

---

## Challenges & How I Overcame Them

- **Challenge:** [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js) doesn't expose per-call timing for `runFromBlockNow` natively.  
  **Solution:** Used JavaScript [monkey-patching](https://www.geeksforgeeks.org/javascript/monkey-patching-in-javascript/) from the browser console — stored the original function reference via `.bind()` before wrapping to avoid infinite recursion, then measured wall time around each dispatch call.

- **Challenge:** Browser repeatedly crashed during [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) profiling (4× CPU throttle, [LilyPond](https://lilypond.org/) export, long Performance recordings).  
  **Solution:** Collected metrics across multiple stable partial runs; flagged [LilyPond](https://lilypond.org/) export and long-session stability as open investigation items rather than forcing unreliable data.

- **Challenge:** [performanceTracker](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/performanceTracker.js) reported `maxDepth = 1` for [Musical-Tree's](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) despite clear recursive behavior.  
  **Solution:** Traced through [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js) to confirm that [Musical-Tree's](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) recursion is async (`setTimeout`-based), meaning each recursive call is a new task on the event loop. The synchronous stack depth counter is architecturally incorrect for this pattern documented as a known instrumentation gap.

---

## Key Learnings

- Gained hands-on familiarity with [JavaScript monkey-patching](https://www.geeksforgeeks.org/javascript/monkey-patching-in-javascript/) as a non-invasive profiling technique for production codebases.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Monkey-Patch-Profiling.jpeg"
    alt="Monkey patch profiling results for Musical-Tree"
    width="600"
  />
</p>

- Understood why **async recursion via `setTimeout` breaks synchronous depth tracking** and why this matters for instrumentation design.
- Learned to distinguish **call volume cost vs. per-call cost** in block execution data `hidden` looks expensive in totals but is cheap per call.
- Deepened understanding of **browser GC behavior** memory delta oscillating between positive and negative values across runs is normal, not a leak signal.
- Confirmed the value of **measurement before optimization**: both audits show that block handlers and interpreter dispatch are not bottlenecks. The real cost is audio scheduling  which shapes what optimization strategies make sense.

---

## Plans for Next Week

- I will begin Phase 2 by identifying and validating concrete optimization opportunities within the most significant execution paths of [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html).
- I will analyze the high cumulative execution cost of the `hidden` block and evaluate potential optimization strategies.
- Profile the Canvas `getImageData` / `willReadFrequently` warning to determine whether it contributes meaningfully to runtime overhead.
- Investigate and resolve `unhighlight` runtime exceptions that are currently affecting profiling stability and long-session testing.
- Draft a detailed optimization roadmap outlining proposed changes, benchmarking methodology, expected impact, and validation criteria for mentor review.

---

## Resources & References

  - **Audit:**
  [Musical-Tree](https://docs.google.com/document/d/1oEGNx-u_OXqWORjbxy_jnsvd-DhlDhnNCD3yUBM_LiE/edit?usp=sharing)
  [Crabcanon-plot](https://docs.google.com/document/d/1dFID3FZA3LMOLEOxmkw2_Kf1KkGomPLjol6QyI6uh_U/edit?usp=sharing)
  - **Architecture References:**
  [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  [performanceTracker](https://github.com/sugarlabs/musicblocks/blob/master/js/utils/performanceTracker.js)
  - **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
  - **Automation Framework:** [Playwright](https://playwright.dev/)
  - **Benchmark Workloads:**
  [Musical-Tree (Medium)](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html)
  [Crabcanon-Plot (Large)](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)
  - **Performance Instrumentation References:** [Monkey-Patching Technique](https://www.geeksforgeeks.org/javascript/monkey-patching-in-javascript/)
  
---

## Acknowledgments

Thank you to Walter Bender and Om Santosh Suneri for their guidance throughout the week, and to Devin Ulibarri and the broader Sugar Labs community for their continued support and valuable feedback.