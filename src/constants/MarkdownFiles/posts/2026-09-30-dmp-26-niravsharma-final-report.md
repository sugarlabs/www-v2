---
title: "DMP '26 Final Report: Refactor Temperament in Music Blocks by Nirav Sharma"
excerpt: "Six goals, six delivered. The 12-EDO assumptions pulled out of Music Blocks' pitch, interval, synthesis and widget paths, so a student can pick 19-EDO, 31-EDO or a just-intonation scale and actually hear it. 15 pull requests merged inside the coding window, four more after it."
category: "DEVELOPER NEWS"
date: "2026-09-30"
slug: "2026-09-30-dmp-26-niravsharma-final-report"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Final report for DMP '26 project Refactor Temperament (Music Blocks issue #7171): dynamic EDO support, custom pitch blocks, non-EDO temperaments, the scale and mode builder, the temperament visualizer, and temperament import/export."
tags: "dmp26,sugarlabs,final-report,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# DMP '26 Final Report by Nirav Sharma

**Project:** [Refactor Temperament — Music Blocks issue #7171](https://github.com/sugarlabs/musicblocks/issues/7171)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Coding period:** June 10 – September 10, 2026  
**Proposal:** [Project proposal document](https://drive.google.com/drive/u/0/folders/1rm-BMd-MManIoGKVSeqyEH_DA7UqIpw2)

---

## What this project was about

Music Blocks lets a student open the Temperament widget and pick 19-EDO, 31-EDO, Pythagorean, just intonation, or a scale of their own. Underneath, none of that worked.

`pitchToNumber`, `pitchToFrequency` and `frequencyToPitch` all assumed 12 notes to the octave. So did note naming, interval arithmetic, scale construction and six widgets. Pick 19-EDO in the widget and the label changed while the pitch did not.

Before I wrote any code I audited the codebase. The audit came to 700+ lines: 60 hardcoded 12-EDO assumptions across 16 files. Everything below is downstream of that list.

All six goals in issue #7171 are done.

## The goals, and where they landed

| Goal | Outcome | Pull requests |
|---|---|---|
| 1. Support any EDO temperament | Done | [#7561](https://github.com/sugarlabs/musicblocks/pull/7561), [#7659](https://github.com/sugarlabs/musicblocks/pull/7659), [#7710](https://github.com/sugarlabs/musicblocks/pull/7710), [#7835](https://github.com/sugarlabs/musicblocks/pull/7835) |
| 2. Refactor the custom pitch block | Done | [#7770](https://github.com/sugarlabs/musicblocks/pull/7770) |
| 3. Support non-EDO temperaments | Done | [#7807](https://github.com/sugarlabs/musicblocks/pull/7807), [#7853](https://github.com/sugarlabs/musicblocks/pull/7853), [#8240](https://github.com/sugarlabs/musicblocks/pull/8240) |
| 4. Scale and mode builder | Done | [#7942](https://github.com/sugarlabs/musicblocks/pull/7942), [#7959](https://github.com/sugarlabs/musicblocks/pull/7959), [#7986](https://github.com/sugarlabs/musicblocks/pull/7986), [#7991](https://github.com/sugarlabs/musicblocks/pull/7991), [#8059](https://github.com/sugarlabs/musicblocks/pull/8059) |
| 5. Temperament visualizer widget | Done | [#8286](https://github.com/sugarlabs/musicblocks/pull/8286) |
| 6. Exporting and importing temperaments | Done | [#8650](https://github.com/sugarlabs/musicblocks/pull/8650), [#9029](https://github.com/sugarlabs/musicblocks/pull/9029) |

## Goal 1: any EDO temperament

The foundation. `getCurrentEDO()` reads the active temperament's pitch count, and `pitchToFrequency`, `pitchToNumber` and `frequencyToPitch` take the temperament instead of assuming 12.

Intervals followed. `GetCurrentInterval` was doing `% 12` and `> 21` where it should have used `temperamentLength`, so a 19-EDO scale wrapped at the wrong place.

Later work pulled the audio engine and the widgets in line too: pitch slider, tuner, sampler. The rule I held to was that 12-EDO behaviour must not change, so every refactor came with a regression test asserting the old result still held.

## Goal 2: the custom pitch block

You could type `C(+42¢)` into a custom pitch block and the cents never reached the synth. `flow()` hardcoded `0`, so you heard a plain C. A `_parseCents()` helper pulls the offset out of the string now, both blocks use it, and the pie menu keeps it: pick D from `C(+50¢)` and you get `D(+50¢)`. Double sharps and double flats work too.

The blocks stayed hidden by default, at Walter's request, until the UX around them was sorted out.

## Goal 3: non-EDO temperaments

Equal temperament is the easy case. A ratio is not.

The work here was foundational ratio data, consonant stepping that follows the scale's own intervals, and `inTemperament` threaded through the pitch actions so a harmonic partial is computed against the tuning you actually chose.

#8240 hardened it further. Scalar transposition moves by mode degree instead of a semitone, and the key pie menu now offers every mode group and your saved custom modes instead of seven church modes.

## Goal 4: scale and mode builder

`scalePatternToEDO()`, `getModePattern()` and the EDO overrides decoupled scale and mode math from 12-EDO, all backward compatible. On top of that, #8059 rebuilt the Mode Widget: a control bar with tuning and EDO, saved custom modes, a name field, save and delete, and custom modes that export straight to workspace blocks.

That PR took the longest to land. Devin found the widget would not open at all. Walter found stale SVG elements piling up on every temperament switch, and a 12 → 5 → 12 EDO reset that left the widget stuck on five notes. All three were real, and all three are fixed.

## Goal 5: the temperament visualizer

An interactive circular diagram. Compare the active temperament against a reference, see pitch deviations at a glance, drag notes around the circle to retune them. The table view is editable too: cents, hertz and ratio update each other, with bounds so a note cannot cross its neighbour.

Along the way, 17-EDO used to collapse into a single dot because the temperament definition was missing data, and comparisons across different pitch counts silently fell back to 12-EDO. Both are fixed, along with the legend overlapping the note labels and the widget growing two scrollbars.

![The temperament visualizer, comparing a custom scale against 12-EDO](assets/Developers/Nirav/temperamentVisulizer.png)

## Goal 6: exporting and importing temperaments

My original draft for this (#8137) was closed and replaced by two smaller pull requests, which was the right call. #8650 adds Scala `.scl` import and export for temperament and mode data. #9029 puts JSON and `.scl` import and export in the Temperament widget, behind a Share menu.

This one fixed a data-loss bug as well. A custom tuning used to vanish on reload, taking any canvas blocks that referenced it with it. Imported files are validated before they are applied: malformed, incomplete or out-of-range files get an error instead of being loaded, and Scala pitch lines have to be strictly ascending.

## After the coding period

The last stretch of work landed just after the coding window closed, so the dates matter:

- **September 11** — #8650, Scala `.scl` import and export
- **September 17** — #8286, the temperament visualizer (Goal 5)
- **September 28** — #9029, JSON and `.scl` import and export in the widget (Goal 6)
- **September 29** — #9067, the temperament guide updated for the canvas visualizer

## Still open

Three things did not close:

- #9332, proportional wheel slices for non-EDO temperaments, is still open
- EDOs above 57 are capped for now. Devin's note was that 41 and 57 are the ones that matter in that range, and larger divisions belong in a separate change
- `pitchToNumber` accepting ASCII `##` symmetrically with `bb`

## Results

- 19 pull requests merged in total: 15 inside the coding window, 4 after it
- 12 pull requests reviewed for other contributors
- Test suite grew from 5,438 to more than 7,200 passing tests, including EDO contract tests across 1 to 53 divisions, sampler and tuner frequency tests, and import/export serialization tests

## What I learned

- The `(step / EDO) * 12` formula is everywhere. It maps EDO steps onto 12 pitch class names, right for 12-EDO and wrong for everything else. The fix is always proportional mapping.
- 1200 is a constant. Cents in an octave do not change with EDO: 12-EDO gives 100¢ per step, 31-EDO gives 38.7¢. It is a unit, not a 12-EDO artifact.
- A crash can be good news. The pitch pie menu threw on `EQUIVALENTACCIDENTALS[scale[i]]` because the engine had started producing microtonal note names the lookup table did not know yet. The crash proved the new names were flowing through the system.
- Mocked Tone.js hides frequency bugs. The mock returns the mock, so every frequency assertion turns into NaN. Mock Tone properly, or assert on shape instead.
- Widgets are the expensive part. Parameter swaps were cheap. The Mode Widget needed a redesign, and that is where the schedule went.

## Acknowledgments

Thank you to Walter Bender and Devin Ulibarri for the patient reviews, and to the Sugar Labs community and the other DMP contributors for the PR reviews and the bug reports. And thank you to everyone who tested a temperament and told me it sounded wrong, and again thank you devin and walter i cant't express my gratitude enough.

## Links

- [Issue #7171 — Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)
- [PR #8286 — Temperament visualizer](https://github.com/sugarlabs/musicblocks/pull/8286)
- [PR #8650 — Scala `.scl` import and export](https://github.com/sugarlabs/musicblocks/pull/8650)
- [PR #9029 — JSON and `.scl` import and export in the widget](https://github.com/sugarlabs/musicblocks/pull/9029)
- [PR #9067 — temperament guide for the canvas visualizer](https://github.com/sugarlabs/musicblocks/pull/9067)
- [PR #9332 — proportional wheel slices (open)](https://github.com/sugarlabs/musicblocks/pull/9332)
