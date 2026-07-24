---
title: "DMP Week 6: Audio Engine EDO-Aware, Widget Fixes, 6799 Tests Passing"
excerpt: "PR 5.2 fixes audio engine EDO fallback in numberToPitch, temperamentChanged, and _getFrequency; PR 5.3 makes Pitch Slider, Tuner, and Sampler EDO-aware"
category: "DEVELOPER NEWS"
date: "2026-07-18"
slug: "2026-07-18-dmp-26-niravsharma-week06"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 6 of my C4GT DMP journey — audio engine fixes (PR 5.2) for non-12 EDO temperament support, widget EDO-awareness (PR 5.3) for Pitch Slider, Tuner, and Sampler, plus lessons learned on proportional mapping and Tone.js mocks."
tags: "dmp26,sugarlabs,week06,niravsharma,musicblocks,temperament"
image: "images/DMP-2026-NiravSharma-Week06.png"
---

# Weekly Blog Post — Jul 14–18, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament — Sugar Labs Music Blocks
**C4GT DMP 2026**

---

## What I worked on this week

This week I completed the audio engine fixes (PR 5.2) and started on widget EDO-awareness (PR 5.3) for non-12 EDO temperament support in Music Blocks.

### PR 5.2 — Audio Engine Fixes (Goal 3b)

The core problem: when a user selected a non-12 temperament (e.g., 5-EDO, 19-EDO), the audio engine silently fell back to 12-EDO behavior. Notes that should sound in the selected tuning were calculated using 12-equal-temperament formulas, producing wrong frequencies.

**Bug 1: `numberToPitch` EDO branch (musicutils.js)**

The old formula used an A0-based offset that mixed EDO units with 12-EDO units. For example, `playPitchNumber(0)` in 5-EDO produced G9 (12.5 kHz, inaudible) instead of C4 (261 Hz, correct).

The fix: use `startPitch` as the reference point. Convert the pitch number to EDO steps relative to `startParsed` using `Math.round(pitchNumber / (12/currentEDO))`, then compute note/octave from that reference. This ensures pitch 0 always maps to the starting pitch (C4) regardless of EDO.

**Bug 2: `temperamentChanged` EDO path (synthutils.js)**

The `temperamentChanged` function builds a `noteFrequencies` lookup table that the synth uses to convert note names to frequencies. For EDO temperaments, it was building frequencies from interval names like "perfect 5" (ratio 2), which only covered ~7 note names and produced wrong ratios for EDO systems.

The fix: add an EDO-specific code path that builds all 12 note names using proportional mapping — `Math.round((pos/12)*edo) % edo` for each of the 12 standard note names (C, D, E, F, G, A, B, Db, Eb, Gb, Ab, Bb). This ensures all 12 names map to distinct EDO steps.

**Bug 3: `_getFrequency` fallback (synthutils.js)**

When the synth couldn't find a note in `noteFrequencies`, it fell back to calculating the frequency from the note name. But for EDO temperaments, the fallback had two problems:
1. `noteFrequencies` was only populated on first use, not when temperament changed via blocks
2. The modulo guard was missing, so `edoStep` could exceed EDO range

The fix: added `_lastTemperamentBuilt` tracking so `noteFrequencies` rebuilds when temperament changes, and added `% currentEDO` to the fallback calculation.

### PR 5.3 — Widget EDO-Awareness (Goal 3c, partial)

Three of six widgets were fixed:

**Pitch Slider (pitchslider.js)**

Added `static stepRatio(edo)` returning `Math.pow(2, 1/edo)`. The existing `SEMITONE` constant was preserved for backward compatibility.

**Tuner (tuner.js)**

`frequencyToPitch(frequency)` now accepts an optional `edo` parameter (defaults to 12). The formula changed from `12 * Math.log2(...)` to `currentEDO * Math.log2(...)`, and octave calculation uses `currentEDO` as divisor.

**Sampler (sampler.js)**

Added `_getCurrentEDO()` helper that reads from `this.activity.logo.synth.inTemperament`. Updated three functions:
- `_calculateFrequency`: `* 12` → `* currentEDO`, `/ 12` → `/ currentEDO`
- `_playReferencePitch`: same replacements
- `frequencyToNote`: added optional `edo` parameter, MIDI-to-frequency uses `currentEDO`

### Deferred: modewidget.js and musickeyboard.js

These two widgets have deep 12-note coupling — the modewidget has 34+ hardcoded `12` instances tied to mode definitions, piano keys, and wheel UI. The musickeyboard has 14+ instances tied to the PITCHES2 12-note array and keyboard layout. Both require a full redesign and will get their own PR.

---

## Test coverage

| File | New tests | Total |
|------|-----------|-------|
| `musicutils.test.js` | 12 (EDO numberToPitch) | 590 |
| `synthutils.test.js` | 5 (EDO temperamentChanged) | ~200 |

All 6799 existing tests pass. Prettier formatting clean on all changed files.

---

## Stats

| Metric | Value |
|--------|-------|
| Files changed | 7 |
| Lines added | 413 |
| Lines removed | 65 |
| Net | +348 |
| Test suites | 192 pass |
| Tests | 6799 pass |

---

## What's next

1. Open PR 5.2 + PR 5.3 for review
2. Fix remaining `temperament.js` "Back to 2:1" division (uses `/ 12`)
3. Tackle modewidget.js and musickeyboard.js EDO-awareness (separate PR)
4. Begin PR 7 — Scale Builder in Temperament Widget (Goal 4)

---

## Lessons learned

- **The `(step / EDO) * 12` formula is everywhere.** It maps N EDO steps to 12 pitch class names, which works for 12-EDO but produces wrong note names and octave transitions for any other EDO. The fix is always proportional mapping: `Math.round(step * 12 / currentEDO)` to find the nearest 12-EDO name.

- **Tone.js mocks in tests make frequency assertions impossible.** The mock `Frequency().toFrequency()` returns the mock object itself, making all frequencies NaN. Tests must use `expect.any_NUMBER_` or mock Tone properly.

- **Widget refactors are high-risk.** The modewidget and musickeyboard are tightly coupled to 12-note assumptions. A full redesign is needed, not just parameter swaps. Better to ship what works and defer the complex widgets.

- **The `1200` in cents formulas is a constant.** It's the number of cents in an octave (logarithmic unit), not EDO-dependent. Don't change it when making things EDO-aware.
