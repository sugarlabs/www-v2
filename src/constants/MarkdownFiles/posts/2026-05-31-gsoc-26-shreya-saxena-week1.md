---
title: "GSoC '26 Week 1 Update by Shreya Saxena"
excerpt: "Runtime instrumentation validation and baseline benchmark collection for Music Blocks."
category: "DEVELOPER NEWS"
date: "2026-05-30"
slug: "2026-05-30-gsoc26-shreya-week1"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance"
image: "assets/Images/GSOC.webp"
---

# Week 1 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-05-25 – 2026-05-31

---

## Goals for This Week

- Validate the performance instrumentation framework.
- Collect baseline metrics from representative Music Blocks projects.
- Explore execution flow for future profiling work.

---

## This Week's Achievements

### Performance Instrumentation Validation
Successfully verified collection of:

- Block execution time
- Baseline JSON exports
- Performance baselines across small, medium, and large benchmark workloads

### Baseline Benchmark Collection

| Project | Complexity | Execution Time |
|----------|------------|---------------|
| [Hot-Cross-Buns](https://github.com/sugarlabs/musicblocks/blob/master/examples/Hot-Cross-Buns.html) | Small | 9.54s |
| [Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) | Medium | 23.91s |
| [In-C](https://github.com/sugarlabs/musicblocks/blob/master/examples/In-C.html) | Large | 82.1s |

The collected benchmarks establish an initial performance baseline before optimization work begins.

- [Hot-Cross-Buns](https://github.com/sugarlabs/musicblocks/blob/master/examples/Hot-Cross-Buns.html) (Small)

  A simple introductory Music Blocks project that demonstrates melodic structure and musical form using a compact AABA pattern.

  ![A screenshot of Music Blocks visual code with various Action Blocks and the Phrase Maker; the browser is in development mode and browser logs can be seen at right.](/assets/Developers/shreya-saxena/Hot-Cross-Buns-Profiling.jpeg "Hot Cross Buns Performance Profiling Baseline Results")

- [Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html) (Medium)

  A procedural composition project that generates branching musical patterns through repeated action execution.

  ![A screenshot of Music Blocks visual code with various Action Blocks; A geometric tree is displayed behind the code; the browser is in development mode and browser logs can be seen at right.](/assets/Developers/shreya-saxena/musical-tree.jpeg "Musical-Tree Performance Profiling Baseline Results")

- [In-C](https://github.com/sugarlabs/musicblocks/blob/master/examples/In-C.html) (Large)

  A large-scale generative music project containing numerous actions and execution paths, making it suitable for evaluating performance under complex workloads.

  ![A screenshot of Music Blocks visual code with many, many Action Blocks containing musical code; the browser is in development mode and browser logs can be seen at right.](/assets/Developers/shreya-saxena/In-C.jpeg "In-C Performance Profiling Baseline Results")

### Benchmark Automation

I continued building a [Playwright](https://playwright.dev/) based benchmark suite to:

- Launch Music Blocks automatically
- Run benchmark projects
- Export performance metrics
- Generate reproducible benchmark artifacts

---

## Challenge & Key Learning

### Execution Depth Investigation

While collecting baseline benchmarks, all projects reported a maximum execution depth of 1. During review, Walter questioned this result for [Musical-Tree](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html), which appears to involve recursive action calls.

To investigate, I traced execution through `runFromBlockNow()` in [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js), explored action invocation via `NamedDoBlock` in [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js), and examined the queue-based execution model used by Music Blocks. This helped narrow down potential areas affecting the reported execution depth and provided a foundation for future analysis.

This process also provided a deeper understanding of the Music Blocks runtime architecture, including block execution, action invocation, and queue-based scheduling. Although the execution depth question remains unresolved, the analysis identified several promising directions for future profiling work.

**Learning**: This experience reinforced the importance of validating what a metric actually represents before drawing conclusions from performance data.

---

## Next Week's Roadmap

Building on this week's findings, I plan to focus on the following areas:

- Investigate the maximum execution depth metric and determine how recursive action calls can be more accurately represented in benchmark results.
- Add operation-level measurements for [MIDI](https://en.wikipedia.org/wiki/MIDI) import and [LilyPond](https://lilypond.org/) export.
- Investigate which stages of block graph execution contribute most to overall runtime and examine long-session performance issues, including potential memory leaks.
- Identify potential runtime bottlenecks before beginning optimization work.
- Continue improving benchmark automation for repeatable performance testing.

---

## Resources & References

  - **Benchmarking Notes:** [Project Documentation](https://docs.google.com/document/d/19OoI3Ke4wjH267EKrSf_SEVC4XxAMJOL4tqYnkj4BdI/edit?usp=sharing)
  - **Architecture References:**
  [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  [ActionBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/ActionBlocks.js)
  - **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
  - **Automation Framework:** [Playwright](https://playwright.dev/)
  - **Benchmark Workloads:**
  [Hot-Cross-Buns (Small)](https://github.com/sugarlabs/musicblocks/blob/master/examples/Hot-Cross-Buns.html)
  [Musical-Tree (Medium)](https://github.com/sugarlabs/musicblocks/blob/master/examples/musical-tree.html)
  [In-C (Large)](https://github.com/sugarlabs/musicblocks/blob/master/examples/In-C.html)
  - **Educational Reference:** [MAP FLC Lesson Plans](https://mapflc.com/lesson-plans/)

---

## Acknowledgments

Thanks to Walter Bender for his valuable feedback and for helping steer my research in the right direction. Thanks also to Om Santosh Suneri, Devin Ulibarri, and the Sugar Labs community for their guidance, support, and encouragement throughout the process.
