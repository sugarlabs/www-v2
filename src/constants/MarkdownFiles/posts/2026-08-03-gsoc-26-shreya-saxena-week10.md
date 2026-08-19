---
title: "GSoC '26 Week 10 Update by Shreya Saxena"
excerpt: "A lighter week due to travel and the start of college, a GSoC Alumni Camp lightning talk, and plans to tackle load time and a scheduling issue flagged by Devin."
category: "DEVELOPER NEWS"
date: "2026-08-03"
slug: "2026-08-28-gsoc-26-shreya-saxena-week10"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week10,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 – 2026-08-03

---


## Goals for This Week
 
* Chase down Walter's suspicion that re-rendering was slowing down project load times with actual profiling data, not just a hunch.
* If the suspicion held up, fix it without touching the interpreter, the playback pipeline, or how projects visually load in.
* Get real before and after numbers on a genuinely large project, so the fix could be judged on evidence rather than feel.
* Follow up on a separate rhythm bug Devin ran into with a drum polyrhythm project, and get a fix out to him to test.

---
 
## The Screen that nobody was watching

Imagine you're a student who has spent hours building a music project in Music Blocks. Hundreds of notes, dozens of melodies, turtles moving across the canvas everything is finally ready. The next day, you excitedly open the project to keep working... and then you wait.

Not because it's playing music.

Not because it's doing any computation.

Just because it's opening.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Loading-image.jpeg"
    alt="Profiling project loading for Rainbow Connection."
    width="700" 
  />
</p>

That was exactly the experience with Rainbow Connection, one of the largest Music Blocks projects containing 5,716 blocks. Loading it meant staring at the loading overlay for an uncomfortably long time before the editor became usable again.

The obvious question was: what was the application spending all that time doing?

Walter had a suspicion. He thought the canvas might be redrawing itself repeatedly while the project was still being assembled even though the loading overlay completely covered the screen. If that was true, the application could be spending a significant amount of time rendering frames that nobody could actually see.

Rainbow Connection had already become the go-to project whenever someone wanted to reproduce loading performance issues, so it was the perfect workload to investigate. Rather than guessing, I decided to measure exactly what happened during project loading.

I instrumented the loading pipeline to record every call to `stage.update()` and then loaded Rainbow Connection while collecting the results.

The profiler quickly painted a clear picture:

| Metric | Before | After |
|--------|:------:|:-----:|
| Load time | 19.4 s | 9.5 s |
| `refreshCanvas()` | 33,482 renders | 33,483 suppressed |
| User-visible renders | No | Only final render |

> ** Every one of the 314 `stage.update()` calls occurred while the loading overlay was still covering the canvas, meaning all of that rendering work was invisible to the user.

The rendering pipeline was continuously repainting a screen that the user couldn't even see.


<p align="center">
  <img
    src="assets/Developers/shreya-saxena/project-loading.jpeg"
    alt="Render Pipeline During Project Loading."
    width="400" 
  />
</p>

Digging one level deeper revealed why.

Every time a block finished generating its bitmap, it triggered a callback, and that callback immediately called `refreshCanvas()`. With thousands of blocks being created during project loading, thousands of tiny "please redraw" requests accumulated, each triggering a full `stage.update()` even though the canvas remained hidden behind the loading overlay.

Walter's hypothesis turned out to match the profiler almost perfectly.

## Turning the Diagnosis Into a Fix

Once the cause was clear, the solution became surprisingly straightforward: if the canvas isn't visible, there's no reason to redraw it.

I introduced a small flag named `_suppressRefresh` inside `activity.js`. Whenever this flag is enabled, `refreshCanvas()` simply returns immediately without scheduling another render.

```js
this._suppressRefresh = false;

this.refreshCanvas = () => {
    if (this._suppressRefresh) return;
    this.stageDirty = true;
    this.update = true;
    this._startRenderLoop();
};
```

The flag is enabled at the beginning of `loadNewBlocks()` and disabled inside `cleanupAfterLoad()`, immediately before the single render that actually matters—the one performed after every block has finished loading and just before the loading overlay disappears.

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/optimization.jpeg"
    alt="Optimized loading pipeline with _suppressRefresh."
    width="800" 
  />
</p>

Instead of rendering hundreds of intermediate frames, project loading now performs exactly **one** render—the first frame the user can actually see.

Of course, introducing a suppression flag raises an important safety question.

What happens if loading fails halfway through?

If `_suppressRefresh` were never reset, the application would stop rendering permanently. That's exactly the sort of failure reviewers worry about, so before considering the change complete, I made sure the flag was restored regardless of how loading exited.

There are three independent reset paths:

* normal completion through `cleanupAfterLoad()`
* exception handling inside `loadNewBlocks()`
* early exits such as circular connection detection

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/Reset_paths.jpeg"
    alt="Rendering restoration flow"
    width="600" 
  />
</p>

No matter how loading finishes, rendering is always restored safely.

 
## Meanwhile, a Different Kind of Timing Bug

While the rendering optimization was under review, Devin reported a separate issue with drum-polyrhythm project. The rhythm didn't always sound correct when both voices used `On every note do` blocks. After sharing the project and explaining how to reproduce the behavior, I investigated the issue locally. Because the problem was intermittent, it appeared only once across several runs, making it more challenging to reproduce consistently.

Tracing the execution revealed that the note clamp was being queued twice: once by `Singer.RhythmActions.playNote()` and again by the interpreter. Since note blocks already return the clamp for the interpreter to queue, the additional enqueue caused the entire note clamp including blocks inside `On every note do`, such as `playdrum`to execute twice. This resulted in duplicate drum hits and disrupted the intended rhythm.

I removed the redundant queueing so that the interpreter remains the single place responsible for scheduling note execution. After verifying the behavior locally, I shared the fix with Devin and asked him to validate it using his original polyrhythm project to confirm that the rhythm now behaves consistently under real-world usage.

---
 
## Challenges
 
The biggest challenge this week was identifying the root cause of the loading slowdown. Profiling the loading pipeline and analyzing the rendering behavior were essential to confirming that unnecessary rerendering was responsible for the performance issue.

The polyrhythm issue presented a different challenge because it was intermittent, requiring repeated testing across multiple runs to confidently validate the fix.

---
 
## What I Learned
 
Two key lessons stood out this week. First, experience and intuition are invaluable when working on a mature codebase, but profiling provides the evidence needed to understand the underlying cause and quantify its impact. Walter's observation that unnecessary re-rendering might be slowing down project loading proved to be correct, and profiling helped confirm the root cause and guided the optimization.

The polyrhythm issue reinforced another important principle: intermittent bugs require thorough and repeated validation before they can be considered resolved. A fix that appears correct in an initial test may still conceal edge cases or infrequent failure modes, making comprehensive testing an essential part of the debugging process.
 
---
 
## Next Week

With the load-time improvement now merged and validated, my focus shifts to following up on the drum polyrhythm fix based on real-world testing and addressing any remaining issues that surface.

Alongside that, I'll be profiling the Save as LilyPond Export and MIDI Import workflows to identify performance bottlenecks, evaluate the feasibility of optimizations, and prioritize improvements based on the profiling results. 
 
## Resources & References

- **Investigation Report:** [Eliminating Unnecessary Canvas Renders During Project Loading](https://docs.google.com/document/d/1Xd-_R8TjtdILyWSM4baXhjNRlVk9zH_piLtBfU0zB0k/edit?usp=sharing)
 
- **PRs This Week:**
  - [PR #7923](https://github.com/sugarlabs/musicblocks/pull/7923) : suppress intermediate `refreshCanvas()` calls during project loading (merged)
  - [PR #7946](https://github.com/sugarlabs/musicblocks/pull/7946) : fix for `on every note do` causing drum hits to double-trigger, awaiting testing
- **Architecture References:**
  - [activity.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity.js)
  - [blocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks.js)
  - [RhythmActions.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtleactions/RhythmActions.js)
- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
- **Benchmark Workload:** [Rainbow Connection](https://github.com/ssz2605/musicblocks/blob/master/examples/RainbowConnection.html)

---
 
## Acknowledgments
 
Thanks to my mentor, Walter Bender, for encouraging me to investigate the rerendering issue and for his valuable guidance throughout the debugging process. Thanks also to Devin Ulibarri for identifying the drum polyrhythm issue and helping validate the issue, and to the entire Sugar Labs community for their encouragement and feedback.

