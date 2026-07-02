---
title: "GSoC '26 Week 3 Update by Shreya Saxena"
excerpt: "Brief description of this week's progress"
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug:slug: "2026-06-14-gsoc-26-shreya-saxena-week03"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week03,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-07 – 2026-06-14

---

## Goals for This Week

- **Goal 1:** Complete the in-depth [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) runtime investigation and produce a structured bottleneck report across all major subsystems.
- **Goal 2:** Ship concrete performance improvements based on profiling findings.
- **Goal 3:** Narrow the focus from broad auditing to a single targeted optimization approach for Phase 2.

---

## This Week's Achievements

### 1. Crabcanon-Plot Runtime Investigation Report

Following last week's full performance audit, I conducted a focused multi-subsystem runtime investigation of [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) to determine whether any subsystem produces a measurable and accumulating bottleneck during playback.

The investigation covered eight areas:

- **Audio Drift** : Scheduled note timing remained bounded throughout playback. Median audio lead time was ~528 ms (p50), with only 4 notes falling below 50 ms. No progressive scheduling drift was observed.
- **Execution Queue** : The executable queue repeatedly drained to zero. The large `parentFlowQueue` values observed appear to represent bookkeeping state rather than pending work.
- **Turtle Graphics (`_move`)** : Average `_move()` duration was ~0.048 ms, with no upward trend.
- **Canvas Rendering (`stage.update()`)** : Average update cost was 2.60 ms against a 16.7 ms frame budget, with no progressive growth.
- **Main Thread Monitoring** : This was the strongest signal found: 3 long tasks (max 241 ms), 4 timer gaps (max 396.5 ms), and 10 rAF gaps (6 over 50 ms). Chrome traces also showed a 268 ms `mouseup` event and GC activity. The evidence points to intermittent main-thread stalls rather than a continuously degrading subsystem.
- **Audio Scheduling Lead Time** : Near-zero lead times occurred in only 4 of 368 notes for Crab Canon; no sustained audio starvation was found.
- **Audio Effect Graph** : Zero graph rewires were recorded for both Crab Canon and Frere Jacques.
- **Music-Timed Graphics Dispatch (`dispatchTurtleSignals`)** : Average of ~6.2 timers per dispatch, worst scheduling cost of 3.2 ms  far below the 131–250 ms long tasks observed at the browser level.

**Key conclusion:** No single subsystem shows a continuously accumulating bottleneck. The dominant source of user-visible jank is intermittent main-thread pressure from GC activity and browser scheduling delays, not application-level logic.

---

### 2. PR: Reduce Idle Canvas Re-rendering ([#7481](https://github.com/sugarlabs/musicblocks/pull/7481)) 

Based on Ruben Rodriguez's feedback, I investigated continuous canvas updates occurring during idle state and traced the root cause to the render loop's `isInteracting` check which included a `blocks.dragGroup !== null` condition that kept the stage flagged as interactive even when no drag was in progress.

Reference : [Activity.js](https://github.com/sugarlabs/musicblocks/tree/master/activity)

**Fix:** Removed the `dragGroup` check from `isInteracting`, relying instead on the existing `isDragging` and `isSelecting` flags.

```js
const isInteracting = this.isDragging || this.isSelecting;
```

A one-line change, but Walter noted: *"This is a small but significant change!!"*  it eliminated a class of unnecessary idle canvas updates that no standard profiling tool would surface without directly observing render loop branching behavior.


---

### 3. PR: Improve Planet Search Behavior and Disable Infinite Scroll ([#7485](https://github.com/sugarlabs/musicblocks/pull/7485)) 

Again Based on Ruben's feedback about excessive server requests from the Planet panel, I implemented two targeted changes:
Reference : [GlobalPlanet.js](https://github.com/sugarlabs/musicblocks/blob/master/planet/js/GlobalPlanet.js)

- **Search-on-Enter:** Replaced keystroke-triggered search with Enter-key-triggered search, eliminating a network request on every character typed.
- **Disable infinite scroll:** Removed automatic project fetching on scroll-to-bottom; users now load more projects explicitly through the existing "Load More Projects" button.
- Updated the search-clear ("x") buttons to refresh results without depending on the removed debounced handler.

Verified that typing no longer fires repeated search requests, Enter triggers a search correctly, and scrolling to the bottom no longer auto-fetches.

---

## Challenges & How I Overcame Them

- **Challenge:** The [Crabcanon-Plot](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html) runtime investigation involved 8 separate subsystems with different instrumentation approaches; browser crashes during profiling continued to interrupt data collection.  
  **Solution:** Ran stable partial sessions per subsystem, aggregated metrics across runs, and structured the report to distinguish confirmed findings from open items.

- **Challenge:** The idle canvas re-render bug wasn't surfaced by standard block-level or audio profiling , it required directly observing the render loop's branching conditions.  
  **Solution:** Combined Performance panel flame chart analysis with source-level tracing through the render loop to identify the `dragGroup` condition as the cause.

---

## Key Learnings

- **Absence of a clear bottleneck is itself a result.** After three weeks of auditing, the data shows that Music Blocks' application-level subsystems are largely healthy. The real performance headroom lies in reducing browser-level pressure (GC, long tasks, idle rendering), not in rewriting block handlers or the audio scheduler.
- **Small fixes can have outsized impact.** The idle canvas re-render fix touched a single condition but eliminated continuous unnecessary GPU work during idle state.
- **Server-side impact matters too.** Removing per-keystroke search requests and infinite scroll reduces load not just on the client, but on the Planet server a dimension of performance that pure runtime profiling wouldn't surface.

---

## Plans for Next Week

- Move into Phase 2: identify and validate a single concrete optimization target within the highest-impact execution paths.
---

## Resources & References

- **Investigation Report:** [Crabcanon-Plot Runtime Bottleneck Report](https://docs.google.com/document/d/1Kmx8WVCXzhbySVbYrz7CWLGcngm4Gk_Si-xoDkt6Z2w/edit?usp=sharing)
- **PRs This Week:**
  - [PR #7481](https://github.com/sugarlabs/musicblocks/pull/7481)
  - [PR #7485](https://github.com/sugarlabs/musicblocks/pull/7485)
- **Architecture References:** [Activity.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity.js), 
[GlobalPlanet.js](https://github.com/sugarlabs/musicblocks/blob/master/planet/js/GlobalPlanet.js)
- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
- **Benchmark Workload:** [Crabcanon-Plot (Large)](https://github.com/sugarlabs/musicblocks/blob/master/examples/crabcanon-plot.html)

---

## Acknowledgments

Thank you to Walter Bender and Om Santosh Suneri for their continued guidance, and to Ruben Rodriguez for the feedback that directly shaped both PR #7481 and PR #7485. Thanks also to Devin Ulibarri and the broader Sugar Labs community for their support.
