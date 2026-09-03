---
title: "DMP '26 Week 11: Goal 5 Visualizer — Drag to Tune, Table to Edit, Walter & Devin Weigh In"
excerpt: "Goal 5 (PR #8286) is taking shape: 17-EDO fixed, reference comparisons accurate, visual polish. Walter and Devin pushed on design — eliminate redundant views, make the table editable, cap EDOs at 57. Reviewed four PRs."
category: "DEVELOPER NEWS"
date: "2026-09-04"
slug: "2026-09-04-dmp-26-niravsharma-week11"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 11: Goal 5 Temperament Visualizer progressing. 17-EDO fixed, reference comparisons accurate. Mentor feedback from Walter and Devin. Reviewed #8406, #8385, #7047, #8341."
tags: "dmp26,sugarlabs,musicblocks,temperament,week11"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)
**C4GT DMP 2026 / GSoC 2026**
**Reporting Period:** August 30 – September 5, 2026

---

## Goal 5 is coming together

PR #8286 is the Temperament Visualizer — an interactive circular diagram that lets you compare any active temperament against 12-EDO (or another reference), see pitch deviations at a glance, and edit the scale by dragging notes around the circle.

This week the big fixes landed:

- **17-EDO now renders correctly.** It used to collapse to a single dot because the temperament definition was missing key data. All EDO temperaments now draw properly.
- **Reference comparisons are accurate across pitch counts.** Comparing 31-EDO vs 19-EDO (or any other pair) now shows the actual interval differences across octaves, instead of silently falling back to 12-EDO or pointing to the wrong reference positions.
- **Visual polish.** The legend no longer overlaps note labels — it moved to an HTML element below the canvas. The dual-scrollbar bug is fixed — one scrollbar per widget.

Still open: rebasing and resolving merge conflicts. Walter and Devin both weighed in this week with design feedback that will reshape the widget before it merges.

## Walter & Devin on the visualizer

The mentor conversation this week was dense with decisions. Here's what stuck:

**Walter:**
- The old "circle" and "grid" views are redundant now — the visualizer already does both. Eliminate them, simplify from three views to one, and move the buttons into the left-side menu.
- The "Add pitches" view is worth keeping but rename it: it's really "create a new temperament from scratch."
- Table entries should be editable — cents, hertz, and ratio all update each other. Hard bounds so new notes stay between their neighbors.
- Don't hard-code dark mode. Use the existing light/dark/high-contrast color schemes.

**Devin:**
- Flip the table so higher pitches go on top (like the old grid).
- The "play all pitches" button is redundant with the existing play button in the left menu — fix that play button instead.
- After a modification, show "modified" or "custom" next to the temperament name so users know they've changed something.
- The pitch count should be prominent on both graphical and table views.
- EDO cap at 57 (41 and 57 are the important ones in that range). Handle larger EDOs in a separate PR.
- When creating a new temperament from the old interface and viewing it in the visualizer, the default 12-EDO was overriding the custom one — that's confusing and needs fixing.
- On cents editing: Devin asked whether absolute cents (0–1200) in the input vs. cent deviation in the table would confuse users. Walter said if the numbers are confusing, the display is probably the problem.

**Me:**
- Implemented cents editing via double-click on the "Cents dev. from 12-EDO" column. It clamps to ±50¢ of the selected tick and inserts sorted.
- Play button now plays low-to-high then high-to-low, hitting the higher octave at the top.
- For EDO > 50, I'll find a better solution in a follow-up PR (offset dots slightly when they touch, or cap at 57 per Devin/Walter).

## PR reviews

Four this week.

**PR #8406** (Sreeram) — `getNote()` returned `undefined` for negative pitch numbers because JavaScript's `%` preserves sign (`(-1) % 12 === -1`). Fixed with the double-modulo idiom `((x % n) + n) % n` at three call sites, plus a copy-paste fix where `PITCHES.indexOf` was duplicated instead of trying `PITCHES2.indexOf`. Added focused Jest coverage for the numeric path. I tested it with 19-EDO and 1/3-comma meantone, setting key to Db major — the split accidentals (Db vs C#) now resolve correctly.

**PR #8385** — The temperament dropdown was growing unboundedly on save/load because `addTemperamentToList` was indexing `PreDefinedTemperaments` with a numeric loop index (always `undefined`), so the duplicate check never fired. Fixed with a direct `TEMPERAMENTS.some(...)` value comparison. Simple, correct.

**PR #7047** (Asish) — The sampler tuner computed target frequencies by replacing `b` with `#` in the note name — but `String.replace` only replaces the first occurrence, so `Eb4` became `E#` (missing → 440 Hz fallback) instead of the correct enharmonic. Replaced the buggy inline lookup with `pitchToFrequency` from `musicutils.js`, extracted into a testable helper `computeTargetPitchFrequency`. Added seven new tests covering naturals, sharps, flats, double accidentals, multiple octaves, and NaN handling. The `##` → `𝄪` normalization is local to the helper; making `pitchToNumber` accept ASCII `##` symmetrically with `bb` would be a reasonable follow-up.

**PR #8341** (merged) — `generateNoteNames(edo)` was returning seven natural letters for EDOs with fewer than 7 divisions, because the name-building loop pushed the letter before checking the step count. Fixed by skipping naturals with zero allotted steps so the table length always matches the EDO. The 5- and 7-EDO special cases now match the general path exactly. Contract tests added from 1 to 53 EDO.

## What's next

Finish the visualizer: merge the mentor feedback (eliminate redundant views, editable table with cross-column updates, "modified" badge, pitch count display, EDO cap at 57, light/dark/high-contrast colors), resolve conflicts, and land. Then Goal 6 (temperament import/export) is waiting in the wings.

---

## Links

- [PR #8286 (Goal 5 — In Progress)](https://github.com/sugarlabs/musicblocks/pull/8286)
- [PR #8406 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/8406)
- [PR #8385 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/8385)
- [PR #7047 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/7047)
- [PR #8341 (Merged)](https://github.com/sugarlabs/musicblocks/pull/8341)
- [Issue #7171: Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)