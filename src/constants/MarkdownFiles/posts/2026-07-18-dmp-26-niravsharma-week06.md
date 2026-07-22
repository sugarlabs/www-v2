---
title: "DMP Week 6: fix: support non-12 EDO temperaments in audio engine and widgets"
excerpt: "PR 5.2 fix: support non-12 EDO temperaments in audio engine and widgets; PR 6 fix: remaining Goal 1+2+3 bugs and temperament reset on run"
category: "DEVELOPER NEWS"
date: "2026-07-18"
slug: "2026-07-18-dmp-26-niravsharma-week06"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 6 of my C4GT DMP journey — PR 5.2 for fix: support non-12 EDO temperaments in audio engine and widgets, PR 6 fix: remaining Goal 1+2+3 bugs and temperament reset on run
tags: "dmp26,sugarlabs,week06,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament — Sugar Labs Music Blocks
**C4GT DMP 2026**

---

## What I worked on this week

This week I completed the audio engine and widget EDO-awareness (PR 5.2) and fixed the D♯ bug with PitchActions and temperament widget playback (PR 6) for remaining Goal 1+2+3 bugs and temperament reset on run

### PR 5.2 — fix: support non-12 EDO temperaments in audio engine and widgets

The core problem: when a user selected a non-12 temperament (e.g., 5-EDO, 19-EDO), the audio engine silently fell back to 12-EDO behavior. Notes that should sound in the selected tuning were calculated using 12-equal-temperament formulas, producing wrong frequencies.

**Fix 1: `getCachedPitchToFrequency` refactor (turtle-singer.js)**

The cache function never passed temperament to `pitchToFrequency`, and the cache key had no temperament dimension — so stale 12-EDO values were served for all temperaments. Added `temperament` parameter and included it in the cache key. Added `clearPitchToFrequencyCache()` static method to flush stale values on temperament change.

**Fix 2: `generateNoteNames(edo)` + `getEdoNoteNamePosition()` (musicutils.js)**

Added a note name table generator for any EDO. For EDO ≤ 12, uses standard sharp names. For EDO > 12, interleaves sharps and flats between naturals (e.g., 19-EDO gets 19 distinct note names). Results cached in `EDO_NOTE_NAMES`. This replaced hardcoded 12-element arrays throughout the codebase.

**Fix 3: `numberToPitch` EDO branch (musicutils.js)**

The old formula used an A0-based offset that mixed EDO units with 12-EDO units. For example, `playPitchNumber(0)` in 5-EDO produced G9 (12.5 kHz, inaudible) instead of C4 (261 Hz, correct).

The fix: use `startPitch` as the reference point. Convert the pitch number to EDO steps relative to `startParsed` using `Math.round(pitchNumber / (12/currentEDO))`, then compute note/octave from that reference. This ensures pitch 0 always maps to the starting pitch (C4) regardless of EDO.

**Fix 4: `__getFrequency` EDO path (synthutils.js)**

Added `isEDO` check that uses `pitchToFrequency` directly for EDO temperaments, bypassing the broken `noteFrequencies` lookup. Added `getOctaveRatio()` instead of hardcoded `2` for the power-of-2 fallback. Added `normalizeNoteAccidentals` to convert Unicode accidentals to ASCII before Tone.js parsing.

**Fix 5: Widget EDO-awareness**

Three widgets were updated:

- **Pitch Slider (pitchslider.js):** Added `static stepRatio(edo)` returning `Math.pow(2, 1/edo)`.
- **Tuner (tuner.js):** `frequencyToPitch(frequency, edo)` now accepts an optional `edo` parameter. Formula changed from `12 * Math.log2(...)` to `currentEDO * Math.log2(...)`, octave uses `currentEDO` as divisor.
- **Sampler (sampler.js):** Added `_getCurrentEDO()` helper. Updated `_calculateFrequency`, `_playReferencePitch`, `frequencyToNote` to use `currentEDO` instead of hardcoded `12`.

**Also in PR 5.2:** Expanded `EQUIVALENTNATURALS` with double sharps (`D𝄪→E`, `A𝄪→B`, etc.), added 17-EDO temperament, added JI `frequencyToPitch` with ratio-based lookup, fixed LiveWaveForm analyser disposal.

PR 5.2 is open: [#7835](https://github.com/sugarlabs/musicblocks/pull/7835)

---

### PR 6 — fix: support non-12 EDO temperaments in audio engine and widgets

EDO Temperament Note Representation + Widget Support
This PR makes EDO temperaments (5-EDO, 7-EDO, 19-EDO, 31-EDO, etc.) actually work throughout the note representation and widget layers. For standard 12-EDO, everything behaves exactly the same.

Pitch math (musicutils.js):
pitchToNumber() now uses the actual EDO size for octave math instead of hardcoded 12.
numberToPitch() has EDO-aware pitch class lookup for equal temperaments.
getNote() uses EDO size for bounds checking – no more array overflow in non-12 EDO.
_calculate_pitch_number() uses getCurrentEDO() for octave math.

Audio engine (synthutils.js)
temperamentChanged() now does EDO-aware pitch name lookup when building the frequency table.
_getFrequency() auto-rebuilds temperament if it's stale and falls back to EDO-aware calculation.
Added Singer.clearPitchToFrequencyCache() call on temperament change – no more stale frequencies.

PR 6 is draft: [#7853](https://github.com/sugarlabs/musicblocks/pull/7853)

---


These two widgets have deep 12-note coupling — the modewidget has 34+ hardcoded `12` instances tied to mode definitions, piano keys, and wheel UI. The musickeyboard has 14+ instances tied to the PITCHES2 12-note array and keyboard layout. Both require a full redesign and will get their own PR.

---

## What's next

1. Address mentor feedback on PR 5.2 and PR 6, get reviwed and possibly gets merged
2. Fix remaining `temperament.js` "Back to 2:1" division (uses `/ 12`)
3. Tackle modewidget.js and musickeyboard.js EDO-awareness (separate PR)
4. Begin PR 7 — Scale Builder in Temperament Widget (Goal 4)

---

## Lessons learned

- **The `(step / EDO) * 12` formula is everywhere.** It maps N EDO steps to 12 pitch class names, which works for 12-EDO but produces wrong note names and octave transitions for any other EDO. The fix is always proportional mapping: `Math.round(step * 12 / currentEDO)` to find the nearest 12-EDO name.

- **Tone.js mocks in tests make frequency assertions impossible.** The mock `Frequency().toFrequency()` returns the mock object itself, making all frequencies NaN. Tests must use `expect.any(Number)` or mock Tone properly.

- **Widget refactors are high-risk.** The modewidget and musickeyboard are tightly coupled to 12-note assumptions. A full redesign is needed, not just parameter swaps. Better to ship what works and defer the complex widgets.

- **The `1200` in cents formulas is a constant.** It's the number of cents in an octave (logarithmic unit), not EDO-dependent. Don't change it when making things EDO-aware.
