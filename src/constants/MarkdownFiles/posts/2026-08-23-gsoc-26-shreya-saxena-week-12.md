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

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-10 – 2026-08-16  

---

## Compiling the Final Report
 
This week was mainly about pulling everything together for my final GSoC 2026 report. I went back through the work from the whole program, the benchmarks, the performance fixes, the PRs, and the lessons learned along the way, and organized it all into a single, coherent writeup. It took a good amount of time to make sure the report accurately reflects the progress made and gives a clear picture of where the project stands.

---
 
## Future Scope: PerfSense
 
As part of the final report, I also spent time thinking through what comes next for the project. PerfSense is my planned performance intelligence layer for Music Blocks.
 
In simple terms:
 
> PerfSense will continuously run selected Music Blocks benchmarks, collect performance metrics, compare them with a known baseline, and flag regressions when a change makes performance worse.

---
 
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
 
---

### What it will monitor
 
For Music Blocks, the plan is to focus on metrics that should not degrade, such as:
 
* **Loading**, project startup and load time
* **Rendering**, time required to render complex projects
* **Turtle execution**, execution and playback performance
* **Audio scheduling**, timing accuracy and drift
* **Export**, project and export completion time
* **Memory usage**, detecting unexpected memory growth
* **Frame responsiveness**, detecting rendering and UI slowdowns

---

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

---
 
### The bigger purpose
 
The Music Blocks performance work so far has essentially followed a simple loop:
 
**Measure, Optimize, Measure again**
 
PerfSense takes that one step further:
 
**Benchmark, Establish Baseline, Track, Compare, Detect Regression, Alert**
 
---

## Resources & References
 
**Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)  
**Performance Tool:** [PerfSense-AI](https://github.com/ssz2605/PerfSense-AI)


---

## A Personal Note
 
PerfSense is still in the ideation stage , a direction I'd love to see Music Blocks move toward in the future, where performance isn't just something we fix reactively, but something we actively track and protect over time.
 
I also want to be honest: 100% optimization is never really possible, there's always another edge case, another slow path waiting to be found. But I tried to optimize what I could, wherever I could, I hope the work I did throughout the summer, especially the optimizations I made, has had a meaningful impact on Music Blocks.

---
 
## Acknowledgments

Thanks to Walter Bender for his continued guidance and mentorship throughout the program. I’m truly grateful for his support and everything I learned along the way. Thanks to Devin Ulibarri for his valuable feedback and contributions throughout the program, and to Om Suneri for his guidance and support. Putting together the final report made it clear just how much progress was made this summer, and I’m grateful for all the mentorship, feedback, and support along the way.

This summer with Music Blocks and Sugar Labs has meant a lot to me. It's been a journey of learning, debugging, celebrating small wins, and growing as a developer.

*Signing off for now, with a lot of gratitude for everything this program gave me. 💛*

---
 