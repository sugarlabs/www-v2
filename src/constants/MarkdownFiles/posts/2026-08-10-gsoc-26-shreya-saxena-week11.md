---
title: "GSoC '26 Week 11 Update by Shreya Saxena"
excerpt: "A ~23x speedup for headless notation exports, plus a fix for drum-polyrhythm project bug."
category: "DEVELOPER NEWS"
date: "2026-08-10"
slug: "2026-08-10-gsoc-26-shreya-saxena-week11"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week11,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-03 – 2026-08-09

---

## Goals for This Week

* Follow up on the drum-polyrhythm bug Devin flagged, land a fix, and get it validated end to end.
* Pick up the notation-export slowdown flagged as a follow-on to last week's loading work, and find out whether the same "invisible work" pattern was to blame.
* If a fix was warranted, keep it scoped to the export path so playback and the normal interactive interpreter stayed untouched.
* Get real before-and-after numbers on the same large project used for the loading work, so any export fix could be judged the same way on evidence.

---

## Closing the Loop on the Drum-Polyrhythm Bug

Last week I traced the duplicate drum hits in Devin's polyrhythm project back to the note clamp being queued twice — once inside `Singer.RhythmActions.playNote()` and again by the interpreter, even though the note blocks (`newnote`, `note`, `osctime`) already return the clamp for the interpreter to queue. The fix removed the redundant `_enqueue()` call from `playNote()`, leaving the interpreter as the single place responsible for scheduling.

On Walter's suggestion, I checked whether `_enqueue()` was used anywhere else once the redundant call was gone, and traced the callers to confirm it wasn't , it had become dead code. That cleanup (along with three now-unused `_callback` closures in `RhythmBlocks.js`) is still pending; the fix that shipped this week was scoped to just removing the redundant call from `playNote()`, leaving the dead-code removal for next week.

The reproduction case: on the stack labeled "left," an `On Every note do…` block set to `l-action`; on the stack labeled "right," the same block set to `r-action`. With a beat event registered on both voices, each note's clamp content was firing twice per note, which is exactly what was disrupting the rhythm. Once verified against the original project, [PR #7946](https://github.com/sugarlabs/musicblocks/pull/7946) was merged.

---

## The Export Path Had the Same Problem as Loading

With the polyrhythm fix out for review, I turned to a slowdown in "Save as LilyPond", and, by extension, ABC, MusicXML, and MIDI export, since they all share the same code path. Exporting notation re-runs the entire block program through the normal interpreter, and every block transition was scheduled with its own `setTimeout`. That's one event-loop round-trip per block, which is barely noticeable on a small project but adds up fast on something like Rainbow Connection, with its chord stacks and repeats.

It was the same underlying pattern as last week's rendering issue: work paced like something the user watches happen in real time, when the export just needs a result.

Using the built-in `performanceTracker` on Rainbow Connection, the baseline numbers made the case clearly:

| Metric | Before | After |
|--------|:------:|:-----:|
| Execution Time | 33,624.70 ms | 1,460.20 ms |
| Max Execution Depth | 1 | 100 |

That's roughly a 23x speedup. The fix adds a headless fast-run path that's only active while an export flag is set: block transitions now run synchronously and only yield back to the event loop every 100 transitions (`_EXPORT_YIELD_AFTER_SYNC_RUNS`), instead of once per block. The max execution depth going from 1 to 100 confirms the export now stays on the synchronous path and only yields once it hits that threshold, rather than yielding after every single block transition.

There's a trade-off worth calling out honestly: peak memory during export rose from roughly 1.3 MB to about 27 MB, because notation buffers now stay live for the full synchronous run instead of getting reclaimed during the timer gaps that used to exist between block transitions. That's expected behavior rather than a memory leak, memory returns to baseline once the export finishes, but it's the kind of trade-off that's worth flagging rather than glossing over, especially since it's the opposite direction from a pure win.

The fix landed in [PR #7970](https://github.com/sugarlabs/musicblocks/pull/7970), scoped entirely to the export flag so normal interactive playback and the loading pipeline are unaffected.

---

## Challenges

Confirming the drum-polyrhythm fix required an exact reproduction with two voices, each using its own `On Every note do…` block on the same beat event, along with clear reproduction steps.

Reproducing the drum-polyrhythm bug required two voices with separate On Every note do… blocks on the same beat event.
Keeping the export fast path safe required scoping synchronous execution to notation exports, preserving stop behavior, and preventing duplicate cleanup.

---

## What I Learned

The polyrhythm fix showed me that not every performance-looking issue is actually about performance. Careful reproduction and tracing can reveal underlying correctness issues, like unexpected double execution.

The export work reinforced the importance of profiling first. Once you find a slow path in one area, it’s worth looking for similar opportunities elsewhere.

---

## Next Week

With both fixes merged, I’ll clean up the now-unused `_enqueue()` and `_callback` closures, update the related tests, and monitor the export fast path for regressions. I’ll also continue looking for other unnecessary scheduling overhead in the codebase.


## Resources & References

- **PRs This Week:**
  - [PR #7946](https://github.com/sugarlabs/musicblocks/pull/7946): fix for `on every note do` causing drum hits to double-trigger (merged)
  - [PR #7970](https://github.com/sugarlabs/musicblocks/pull/7970): headless fast-run path for notation exports (merged)
- **Architecture References:**
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  - [RhythmActions.js](https://github.com/sugarlabs/musicblocks/blob/master/js/turtleactions/RhythmActions.js)
  - [RhythmBlocks.js](https://github.com/sugarlabs/musicblocks/blob/master/js/blocks/RhythmBlocks.js)
- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)
- **Benchmark Workload:** [Rainbow Connection](https://github.com/ssz2605/musicblocks/blob/master/examples/RainbowConnection.html)
- **Documentation:**
  - [LilyPond Documentation](https://github.com/ssz2605/musicblocks/blob/master/lilypond/README.md)
  - [MIDI Documentation](https://midi.org/midi-1-0-detailed-specification)

---

## Acknowledgments

Thanks to my mentor Walter Bender for his guidance and emphasis on concrete testing, Devin Ulibarri for sharing the real polyrhythm case, and the Sugar Labs community for the support.