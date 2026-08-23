---
title: "GSoC '26 Week 12 Update by Shreya Saxena"
excerpt: "A week spent compiling the final GSoC 2026 report, along with a look at PerfSense, the planned performance intelligence layer for Music Blocks."
category: "DEVELOPER NEWS"
date: "2026-08-23"
slug: "2026-08-23-gsoc-26-shreya-saxena-week12"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week12,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** 2026-08-17 to 2026-08-23

## Compiling the Final Report

This week was mainly about pulling everything together for my final GSoC 2026 report. I went back through the work from the whole program, the benchmarks, the performance fixes, the PRs, and the lessons learned along the way, and organized it all into a single, coherent writeup. It took a good amount of time to make sure the report accurately reflects the progress made and gives a clear picture of where the project stands.

## Future Scope: PerfSense

As part of the final report, I also spent time thinking through what comes next for the project. **PerfSense** is my planned performance intelligence layer for **Music Blocks**.

In simple terms:

> PerfSense will continuously run selected Music Blocks benchmarks, collect performance metrics, compare them with a known baseline, and flag regressions when a change makes performance worse.

### How it works

```text
Music Blocks Benchmark Projects
              |
      Performance Tracker
              |
       PerfSense Analysis
              |
       Compare with Baseline
              |
     Improvement / Regression
              |
       Alert / Report
```

### What it will monitor

For Music Blocks, the plan is to focus on metrics that should not degrade, such as:

* **Loading**, project startup and load time
* **Rendering**, time required to render complex projects
* **Turtle execution**, execution and playback performance
* **Audio scheduling**, timing accuracy and drift
* **Export**, project and export completion time
* **Memory usage**, detecting unexpected memory growth
* **Frame responsiveness**, detecting rendering and UI slowdowns

### Example

Suppose the baseline for a benchmark is:

```text
Rainbow Connection
Loading:    2.0 s
Execution:  1.4 s
Export:     3.5 s
```

A future commit produces:

```text
Loading:    1.8 s   Improvement
Execution:  1.3 s   Improvement
Export:     5.1 s   Regression
```

PerfSense would identify that export performance degraded, even though the other metrics improved.

### The bigger purpose

The Music Blocks performance work so far has essentially followed a simple loop:

**Measure, Optimize, Measure again**

PerfSense takes that one step further:

**Benchmark, Establish Baseline, Track, Compare, Detect Regression, Alert**

So for Week 12, the key idea is this: I plan to integrate PerfSense with Music Blocks to build an automated performance monitoring and regression detection system, using Music Blocks' benchmarks and the Performance Tracker data collected so far.

## Resources & References

* **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)

## Acknowledgments

Thanks to Walter Bender and Om Suneri for their continued support and guidance through the program. Putting together the final report made it clear just how much progress was made this summer, and I'm grateful for the mentorship along the way.

