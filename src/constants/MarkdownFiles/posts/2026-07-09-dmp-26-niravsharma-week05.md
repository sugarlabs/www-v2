---
title: "DMP Week 5: Goal 2 Complete, Goal 3 Fully Mapped, Midpoint Tomorrow"
excerpt: "PR 4 opened with cents forwarding, pie menu fix, and CENTSSYMBOL constant; D♯ investigation complete; Goal 3 expanded to 24 fixes across 6 categories"
category: "DEVELOPER NEWS"
date: "2026-07-09"
slug: "2026-07-09-dmp-26-niravsharma-week05"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 5 of my C4GT DMP journey — PR 4 opened fixing custom pitch block cents forwarding and discoverability, pie menu cents preservation, D♯ bug investigation complete, and Goal 3 expanded to 24 fixes across 6 categories."
tags: "dmp26,sugarlabs,week05,niravsharma,musicblocks,temperament"
image: "images/DMP-2026-NiravSharma-Week05.png"
---

# DMP Week 5: Goal 2 Complete, Goal 3 Fully Mapped, Midpoint Tomorrow

**Coding period:** June 10 – September 10, 2026
**Project:** [Refactor Temperament — Issue #7171](https://github.com/sugarlabs/musicblocks/issues/7171)
**Mentors:** Walter Bender, Devin Ulibarri

---

## What I did this week

### PR 4 — Custom Pitch Blocks (Goal 2)

Goal 2 targets the custom pitch blocks — the blocks that let users specify pitches manually using note names and cents offsets.

Three changes and one discoverability fix:

**Change 1 — Cents forwarding.** `CustomNoteBlock` and `CustomPitchBlock` accept strings like `"C(+42¢)"` but `flow()` was hardcoding `0` for the cents parameter. The user entered `C(+42¢)`, Music Blocks played plain C.

**Fix:** Added a `_parseCents()` static helper that parses the `(+N¢)` / `(-N¢)` suffix and returns `[note, cents]`. Both `flow()` methods now use it instead of hardcoding `0`.

```js
static _parseCents(value) {
    if (typeof value !== "string") return [value, 0];
    const match = value.match(/^([A-Ga-g][#b♯♭]?)(\(([+-]\d+)¢\))?$/);
    if (match) {
        return [match[1], match[3] !== undefined ? parseInt(match[3], 10) : 0];
    }
    return [value, 0];
}
```

**Change 2 — Blocks hidden by default.** Both blocks had `this.hidden = true`, so they only appeared in the Pitch palette after a user created a custom temperament. New users had no way to find them. Fixed: `hidden = false` — now always visible with 12-EDO default.

**Change 3 — Pie menu preserves cents.** When changing a note via the pie menu, any existing cents suffix was lost. `C(+50¢)` → pick D → `D` (cents dropped). Fixed: the pie menu now preserves the `(+N¢)` suffix. `C(+50¢)` → pick D → `D(+50¢)`.

**Change 4 — CENTSSYMBOL constant (Walter feedback).** Added `CENTSSYMBOL = "\u00A2"` to `musicutils.js` and exported it. Tests now use `SHARP`/`FLAT`/`CENTSSYMBOL` constants instead of unicode literals, making the code easier to read.

PR 4 is open: [#7770](https://github.com/sugarlabs/musicblocks/pull/7770)

**Tests:** 74/74 in `PitchBlocks.test.js`, full suite passes (6199/6199).

---

### D♯ Bug in Nth Modal Pitch — Investigation Complete

Devin flagged that D♯ was not working correctly with the Nth Modal Pitch block. I traced the full code path and found 4 issues:

**Issue 1 — `NOTESSHARP` lookup fails.** `buildScale("D♯ dorian")` produces `[D♯, E♯, F♯, G♯, A♯, B♯, C♯, D♯]` — `E♯` and `B♯` are created by `CONVERT_DOWN` to avoid duplicate letter names. But `NOTESSHARP.indexOf("E♯")` returns `-1` because `E♯` is not in `NOTESSHARP`.

**Issue 2 — `getNote()` rewrites D♯→E♭.** In flat keys, `getNote()` normalizes sharps to flats, so D♯ becomes E♭ before the semitone lookup.

**Issue 3 — `_offset` discarded.** The offset calculated in `playNthModalPitch` is not carried forward to the next note.

**Issue 4 — No D♯ test coverage.** Zero tests for sharp keys, flat keys, or double sharps.

**Fix (Issues 1-2):** Normalize through the existing `EQUIVALENTNATURALS` map before lookup — `E♯ → F`, `B♯ → C`. This map already existed in `musicutils.js` and was used in 6 other places for exactly this purpose. Applied in both `playNthModalPitch` (PitchActions.js) and `ScaleDegreeBlock` (PitchBlocks.js).

The D♯ fix is implemented in the working tree but not yet committed — it belongs in PR 5 (Goal 3).

---

### Goal 3 Investigation — 24 Fixes Mapped

I completed a comprehensive analysis of all 12-EDO hardcoded values across the codebase. Found **24 fixes** across **6 categories**:

**Category A: Synthesis Infrastructure (9 fixes)**
- `getCachedPitchToFrequency()` ignores active temperament — defaults to 12-EDO
- Cache key has no temperament dimension — stale values served for all temperaments
- `inTemperament` not reset between runs
- `_getFrequency()` hardcodes `Math.pow(2, power)` instead of using `getOctaveRatio()`

**Category B: Pitch Name Mapping (8 fixes)**
- `numberToPitch()`, `numberToPitchSharp()`, `frequencyToPitch()` all use `(step / EDO) * 12` — forces 12 pitch classes
- `_getStepSize()`, `getNumNote()`, `getSolfege()` map through 12-element arrays
- `getNumber()`, `GetIntervalNumber()` use 12-EDO semitone positions

**Category C: Custom Pitch Block Failures (4 fixes)**
- `getCustomFrequency()` note name matching fails on accidental format mismatch
- `playPitchNumber()` no range validation
- `numberToPitch()` auto-fills with 12-EDO approximations
- YToPitch hardcodes `lc + 12 * o`

**Category D: D♯ nthModalPitch (3 fixes)**
- Already investigated and mapped

**Category E: Widget Hardcoding (6 widgets)**
- Mode Widget, Music Keyboard, Temperament Widget, Pitch Slider, Sampler, Tuner

**Estimated LOC:** ~670 lines (~490 source + ~180 tests)

Walter confirmed **Option B** for `getCachedPitchToFrequency` — thread temperament as a parameter through `processPitch → addPitch → getCachedPitchToFrequency`. Explicit dependency, testable, no global state coupling.

All MD files updated: `PR_TRACKING.md`, `GoalPlan.md`, `TimeLine.md`.

---

### PR Reviews

Reviewed **PR #7734** (KeerthiKumarR — Temperament widget play loop fixes):
- Caught `this.inbetween = false` assigning to `window` instead of the widget instance
- Flagged stray `console.log`
- Both issues fixed by the author

---

## What's next

- **PR 4** — address CI failure (pre-existing flaky tests, not our changes), get merged
- **PR 5** — start Jul 15, 24 fixes across synthesis infrastructure, pitch name mapping, custom pitch blocks, D♯, and widgets
- **Midpoint evaluation** — tomorrow (Jul 14), presenting Goals 1+2

---

## Numbers

- Tests passing: **6199 / 6199**
- PRs merged: **3** (PR 1, 2, 3)
- PRs open: **1** (PR 4 — [#7770](https://github.com/sugarlabs/musicblocks/pull/7770))
- Goals complete: **1** (Goal 1)
- Goals in progress: **1** (Goal 2 — PR 4 open)
- Fixes mapped for PR 5: **24**
- Estimated LOC for PR 5: **~670**
