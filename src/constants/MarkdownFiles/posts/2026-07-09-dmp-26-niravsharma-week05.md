---
title: "DMP Week 5: Goal 2, Goal 3 Fully Mapped,"
excerpt: "PR 4 opened with cents forwarding, pie menu fix, and CENTSSYMBOL constant; D♯ investigation complete; Goal 3 expanded to 24 fixes across 6 categories"
category: "DEVELOPER NEWS"
date: "2026-07-09"
slug: "2026-07-09-dmp-26-niravsharma-week05"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 5 of my C4GT DMP journey — PR 4 opened fixing custom pitch block cents forwarding and discoverability, pie menu cents preservation, D♯ bug investigation complete, and Goal 3 expanded to 24 fixes across 6 categories."
tags: "dmp26,sugarlabs,week05,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# DMP Week 5: Goal 2 , Goal 3 Fully Mapped,

**Coding period:** June 10 – September 10, 2026
**Project:** [Refactor Temperament — Issue #7171](https://github.com/sugarlabs/musicblocks/issues/7171)
**Mentors:** Walter Bender, Devin Ulibarri

---

## What I did this week

Goal 2 is all about custom pitch blocks – the ones where you type in a note name and cents offset directly.

**What was broken:**

You could type `"C(+42¢)"` into the block, but the cents never made it to the synth. `flow()` hardcoded `0`, so you heard plain C every time. Also, both blocks were hidden by default – you only saw them if you'd already created a custom temperament, which made them impossible to discover.

**What I fixed:**

Added `_parseCents()` – a small helper that pulls the `(+N¢)` or `(-N¢)` out of the string and returns `[note, cents]`. Both `flow()` methods now use it instead of ignoring the cents. The regex is built from the `CENTSSYMBOL` constant and handles double sharps (𝄪) and double flats (𝄫):

```js
static _parseCents(value) {
    if (typeof value !== "string") return [value, 0];
    const match = value.match(
        new RegExp(`^([A-Ga-g](?:[#b♯♭]|𝄪|𝄫)?)(\\(([+-]\\d+)${CENTSSYMBOL}\\))?$`)
    );
    if (match) {
        return [match[1], match[3] !== undefined ? parseInt(match[3], 10) : 0];
    }
    return [value, 0];
}
```

`flow()` also now passes `turtle` and `blk` to `processPitch()` — 6 args instead of 4.

The blocks remain `hidden: true` for now. Walter asked to keep them hidden until the UX concerns (no in-menu cents editing, strange behavior without a custom temperament) are addressed in follow-up work.

Fixed the pie menu – if you have `C(+50¢)` and pick D, you get `D(+50¢)`, not just D. Cents stick.

Added `CENTSSYMBOL = "\u00A2"` to `musicutils.js` per Walter's feedback – tests now use constants instead of raw unicode.

The `_parseCents()` regex handles `"C(+42¢)"`, `"D(-15¢)"`, `"F𝄪(+42¢)"`, and plain `"E"` – all the common cases plus double accidentals.

PR 4 was merged on Jul 11: [#7770](https://github.com/sugarlabs/musicblocks/pull/7770)

---

## D♯ Bug in Nth Modal Pitch — Investigation Complete

Devin spotted that D♯ wasn't working with the Nth Modal Pitch block. I traced it through and found four separate issues:

1. **`NOTESSHARP` lookup fails.** `buildScale("D♯ dorian")` gives `[D♯, E♯, F♯, G♯, A♯, B♯, C♯, D♯]` – `E♯` and `B♯` come from `CONVERT_DOWN` to avoid duplicate letter names. But `NOTESSHARP.indexOf("E♯")` returns `-1` because `E♯` isn't in the list, and everything breaks.

2. **`getNote()` rewrites D♯ → E♭ in flat keys.** So even if the first issue were fixed, the semitone lookup would still get the wrong note.

3. **`_offset` gets thrown away.** The offset calculated in `playNthModalPitch` doesn't carry forward to the next note.

4. **No tests for sharp keys, flat keys, or double sharps.** So this bug was hiding in plain sight.

**The fix for issues 1–2:** normalize through `EQUIVALENTNATURALS` before lookup – `E♯ → F`, `B♯ → C`. That map already existed in `musicutils.js` and is used in 6 other places for exactly this purpose. I applied it in both `playNthModalPitch` (PitchActions.js) and `ScaleDegreeBlock` (PitchBlocks.js).

The fix is in my working tree but not committed yet – it's going into PR 5 (Goal 3).

---

## Goal 3 Investigation — 24 Fixes Mapped

I did a full sweep of the codebase for 12-EDO hardcoded values. Found **24 fixes** across **6 categories**:

**A. Synthesis Infrastructure (9 fixes)** – the big one. `getCachedPitchToFrequency()` ignores temperament entirely, the cache key has no temperament dimension (so you get stale values), `inTemperament` never resets between runs, and `_getFrequency()` hardcodes `Math.pow(2, power)` instead of using `getOctaveRatio()`.

**B. Pitch Name Mapping (8 fixes)** – `numberToPitch()`, `numberToPitchSharp()`, `frequencyToPitch()` all force 12 pitch classes with `(step / EDO) * 12`. `_getStepSize()`, `getNumNote()`, `getSolfege()` map through 12-element arrays. `getNumber()` and `GetIntervalNumber()` use 12-EDO semitone positions.

**C. Custom Pitch Block Failures (4 fixes)** – `getCustomFrequency()` chokes on accidental format mismatches, `playPitchNumber()` has no range validation, `numberToPitch()` auto-fills with 12-EDO approximations, `YToPitch` hardcodes `lc + 12 * o`.

**D. D♯ nthModalPitch (3 fixes)** – already mapped out from the investigation I did earlier.

**E. Widget Hardcoding (6 widgets)** – Mode Widget, Music Keyboard, Temperament Widget, Pitch Slider, Sampler, Tuner. All have 12-EDO assumptions baked in.

**Estimated lines:** ~670 total (~490 source + ~180 tests).

Walter signed off on Option B for `getCachedPitchToFrequency` – thread temperament as a parameter through `processPitch → addPitch → getCachedPitchToFrequency`. Explicit, testable, no global state coupling.

---

## PR Reviews

Reviewed **PR #7734** (KeerthiKumarR — Temperament widget play loop fixes):
- Caught `this.inbetween = false` assigning to `window` instead of the widget instance
- Flagged stray `console.log`
- Both issues fixed by the author

---

## What's next

- **PR 4** — address CI failure (pre-existing flaky tests, not our changes), get merged
- **PR 5** — start Jul 15, 24 fixes across synthesis infrastructure, pitch name mapping, custom pitch blocks, D♯, and widgets

---
