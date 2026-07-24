---
title: "DMP Week 7: Fix custom pitch block, split PRs per mentor feedback"
excerpt: "Fixed the 'Not a valid pitch name' bug in custom pitch block; reorganized work into focused PRs per Walter's feedback"
category: "DEVELOPER NEWS"
date: "2026-07-24"
slug: "2026-07-24-dmp-26-niravsharma-week07"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 7 of my C4GT DMP journey — fixed custom pitch block cents bug, reorganized PRs per mentor feedback, ported helper functions and JI base frequency fix"
tags: "dmp26,sugarlabs,week07,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament - Sugar Labs Music Blocks
**C4GT DMP 2026**

---

## What I worked on this week

This week I tracked down a weird bug in the custom pitch block, ported helper functions from PR 5.2, fixed JI/Pythagorean base frequency, and reorganized the work into focused PRs per Walter's feedback.

### Fix 1 — Custom pitch block: "Not a valid pitch name" (PitchBlocks.js)

The bug: dragging a "custom pitch" block into a note and playing it threw "Not a valid pitch name" with `C(+0C)` shown — and this happened with the default value, no typing required.

Turns out the `CustomPitchBlock` macro at line 1244 was creating `[0, "pitch", ...]` instead of `[0, "custompitch", ...]`. So when it expanded, a `PitchBlock` was created instead of a `CustomPitchBlock`. That meant `PitchBlock.flow()` ran and passed the raw `"C(+0¢)"` as the note name, which `getNote()` couldn't parse. Changing the macro from `"pitch"` to `"custompitch"` fixed it — now `CustomPitchBlock.flow()` runs and correctly parses cents via `_parseCents()`.

**Files:** `js/blocks/PitchBlocks.js` (+2 -2), `js/blocks/__tests__/PitchBlocks.test.js` (+13 -2)

---

### Fix 2 — Port helper functions from PR 5.2

I also ported `generateNoteNames(edo)` and `getEdoNoteNamePosition(noteName, edo)` from PR #7835 to the current branch. These are the building blocks for EDO-aware pitch name lookups — everything after depends on them. `generateNoteNames` returns an array of note names for a given EDO (standard sharps for ≤ 12, interleaved sharps and flats for > 12), and `getEdoNoteNamePosition` returns the position of a note in an EDO scale.

Also ported:
- `synthutils.js` EDO branch in `__getFrequency` — uses `pitchToFrequency` directly for EDO temperaments
- `tuner.js` EDO parameter — `frequencyToPitch` accepts optional `edo` parameter
- `analyser.js` dispose fix — prevents audio node leak in LiveWaveForm

**Files:** `js/utils/musicutils.js` (+169 -41), `js/utils/synthutils.js` (+37), `js/widgets/tuner.js` (+12 -5)

---

### Fix 3 — JI/Pythagorean base frequency (synthutils.js)

JI and Pythagorean temperaments were using the 12-EDO base frequency (C4 = 261.63 Hz via `Tone.Frequency`) instead of their correct A0-reference frequencies (C4 ≈ 264 Hz in JI). Fixed in `temperamentChanged()` by computing frequency from A0 reference using `pitchToFrequency()` instead.

**Files:** `js/utils/synthutils.js` (+9 -2)

---

### PR Reorganization

Walter's feedback was "I am a bit concerned that you are trying to change too many things at once," so I reorganized the work into focused PRs. Each one solves one problem with clear testing instructions.

| PR | Problem | Files |
|----|---------|-------|
| PR 1 | Helper functions + tests | `musicutils.js`, test file |
| PR 2 | Goal 1 — 12-EDO regression | `logo.js`, `block.js`, `blocks.js`, `temperament.js`, `musicutils.js` |
| PR 3 | Goal 2 — 19-EDO transposition | `musicutils.js` |
| PR 4 | Goal 3 — Non-EDO temperament | `musicutils.js`, `synthutils.js`, `turtle-singer.js`, `PitchActions.js`, `temperament.js` |
| PR 5 | Custom pitch block fix | `PitchBlocks.js`, test file |
| PR 6 | Temperament widget preview | `temperament.js` |

---

## What's next

1. Get PR reorganization plan reviewed by Walter
2. Start submitting focused PRs one at a time
3. Add JSDoc examples to `generateNoteNames` and `getEdoNoteNamePosition`
4. Address any remaining custom note edge cases

---

## Lessons learned

Macros must reference their own block type. If a macro creates a different block type, the wrong `flow()` method runs at execution time. Always verify the first element of the macro array matches the block's own name.

Walter was right about the PR structure. Splitting a massive PR into focused, reviewable chunks makes testing and reviewing much easier. Each PR should solve one problem with clear testing instructions.

Font rendering can hide bugs. The `¢` character (U+00A2) rendered as `C` in the block font and console, making it look like a user-typed error. The actual bug was architectural (wrong block type in macro), not a character encoding issue.

Always trace the execution path, not just the code path. The `CustomPitchBlock.flow()` method had correct `_parseCents` logic, but it was never called because the macro created a `PitchBlock`. Reading the code isn't enough — you need to understand which code actually runs.
