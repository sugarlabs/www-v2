---
title: "DMP Week 6: PR 2 Ready for Review — Dynamic EDO & Ratio Temperaments"
excerpt: "PR 2 (#7942) makes temperaments work end-to-end: EDO-aware math in musicutils, dynamic mode wheels, and temperament threading through blocks, actions, and widgets"
category: "DEVELOPER NEWS"
date: "2026-07-24"
slug: "2026-07-24-dmp-26-niravsharma-week06"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 6 of my C4GT DMP journey — PR 2 (#7942) ready for review with dynamic EDO and ratio-based temperament support across musicutils, piemenus, blocks, actions, and widgets."
tags: "dmp26,sugarlabs,week06,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament - Sugar Labs Music Blocks
**C4GT DMP 2026**

---

## What I worked on this week

This week I got PR 2 ready for review. It's the big one — it makes non-12 temperaments work end-to-end across the pitch engine, the blocks, and the widgets, instead of patching one hardcoded assumption at a time.

PR 2 is up: [#7942](https://github.com/sugarlabs/musicblocks/pull/7942)

### EDO-aware pitch math in musicutils.js

The core of the PR is `musicutils.js`. The pitch utilities were written around a 12-semitone octave, and most of them silently assumed it. The refactor threads a `temperament` argument through the math and, wherever the octave length matters, computes it from the active temperament.

A few concrete fixes:

- `calcOctave` now takes the temperament and uses an EDO-aware threshold: `Math.round(currentEDO / 4)` instead of a hardcoded cutoff. So 19-EDO uses a threshold of 5 while 5-EDO uses 1, instead of both being judged against a 12-EDO rule.
- `numberToPitch` wraps against the temperament's actual pitch count instead of `intervalArray.length`, which isn't always the same thing.
- `_getStepSize` no longer takes a shortcut (`return transposition`) for custom temperaments that define ratios — those need the real step computation. The shortcut is kept for custom temperaments without ratios.
- `generateNoteNames(edo)` produces the right set of note names for any EDO, and the note-name lookups use it instead of the 12-name arrays.

There's also new support for ratio-based temperaments: a function that converts a ratio to cents (`1200 * log2(ratio)`), so a perfect fifth at 3:2 maps to ~702 cents rather than the equal-tempered 700.

### Blocks thread temperament through

`PitchActions.js` was a big one. Functions like `numToPitch`, `setPitchNumberOffset`, and `deltaPitch` now read the active temperament and use `pitchToNumber % getCurrentEDO()` so pitch numbers stay in the right range for non-12 EDOs. The pitch number → frequency path threads temperament into the conversion calls.

`WidgetBlocks.js` now detects temperament changes: when the temperament widget changes the setting, it sets `changeInTemperament = true` and calls `temperamentChanged()` so the affected widgets rebuild with the new temperament.

### Widgets understand the octave length

- **Mode Wheel (`piemenus.js`)** now builds its slice from `getCurrentEDO()` and `generateNoteNames()`, so a 19-EDO temperament shows 19 slots instead of 12.
- **Pitch Slider** derives its semitone from the active EDO: `Math.pow(2, 1 / edo)` instead of a fixed 12-EDO value.
- **Music Keyboard** generates note names per-octave from `generateNoteNames(currentEDO)` and computes octave boundaries with the current EDO.

### Tests

Added coverage across the affected files — roughly 200 lines of new tests in `musicutils.test.js`, `PitchActions.test.js`, and `pitchslider.test.js`:

- `calcOctave` EDO-aware thresholds (12-EDO default 3, 19-EDO 5, 5-EDO 1, backward compat with numeric args)
- `numToPitch` / `setPitchNumberOffset` / `deltaPitch` temperament awareness
- `_getStepSize` freeze guard for non-12 EDOs and ratio-based custom temperaments
- `pitchToNumber` A reference mapping to 440 Hz for all EDOs
- EDO octave boundary resolution across the C4–C5 boundary
- Pitch slider behavior for non-12 EDOs

---

## What's next

1. Get PR 2 reviewed and merged
2. Fold in review feedback once Walter and the maintainers have a look
3. Continue with the next PR in the reorganized plan

---

## Lessons learned

- **The `12` shows up in more places than you'd think.** Octave boundaries, threshold cutoffs, note-name arrays, mod operations, semitone ratios — every one of them is an octave-length assumption in disguise. The refactor isn't one function, it's an audit of the whole pipeline.

- **Widgets and actions are where temperaments actually leak.** The math can be perfect, but if the mode wheel renders 12 slots or the slider steps by 2^(1/12), the temperament is broken from the user's perspective. Fixing the widgets was half the work.

- **The `return transposition` shortcut hides bugs.** `_getStepSize` had an early return that skipped real computation for custom temperaments. With ratios in the mix, the shortcut was silently wrong — which is a reminder to check the fast paths, not just the main flow.
