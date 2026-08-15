---
title: "DMP '26 Week 08: Closing Goal 4 — Microtonal Pitch Math, PR Refinement, and Walter's Feedback"
excerpt: "Closing out Goal 4 with PR #8059. Diving into microtonal pitch math, decoupling mode lookups, and iterating through mentor feedback from Walter on SVG rendering, 19-EDO playback bugs, and UI interactions."
category: "DEVELOPER NEWS"
date: "2026-08-14"
slug: "2026-08-14-dmp-26-niravsharma-week08"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 8 update: Closed PR #8038 due to scope creep and shifted all focus to PR #8059. Tackled microtonal frequency math, dynamic EDO switching bugs, SVG state cleanup, and mentor feedback from Walter."
tags: "dmp26,sugarlabs,musicblocks,temperament,microtonality,week08"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma  
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)  
**C4GT DMP 2026 / GSoC 2026**  
**Reporting Period:** August 3 – August 14, 2026

---

## Closing Goal 4 (mostly)

This week was mostly PR iteration, and a chunk of it was me cleaning up after myself.

I closed **PR #8038**. It started out focused, but unrelated changes kept sneaking into the diff and the approach got more convoluted than the problem needed. Rather than keep fighting it, I folded the useful parts into **PR #8059**, which Walter is reviewing now.

## The 19-EDO playback bug

Walter caught a weird one during testing: playing a minor mode in 19-EDO kept repeating the exact same pitch. Not a slightly off pitch. The same pitch, over and over.

The cause was 12-EDO assumptions still hiding in the audio engine. Mode patterns were being looked up against a 12-tone scale, so notes that didn't fit just collapsed onto a single step.

The fix was to decouple `getModePattern()` from the frequency hot path. Instead of static 12-tone offsets, the frequency is computed directly from the scale step and the EDO degree count:

$$f(k) = f_0 \cdot 2^{\frac{k}{N}}$$

where $k$ is the scale step and $N$ is the number of EDO degrees. The hot path got simpler, and it's now mathematically correct for 19-EDO, 31-EDO, and whatever else someone throws at it.

## Walter's review feedback

Reviewing **PR #8059** surfaced a few edge cases I would not have found on my own:

1. **The 12→5→12 EDO reset bug.** Switching from 12-EDO down to 5-EDO and back left the widget stuck on 5 notes instead of restoring the original 7-note configuration.
2. **SVG accumulation.** Toggling temperaments repeatedly kept stale wheel elements around. The old ones weren't being cleared, so the browser slowed down and duplicate note indicators piled up on screen.
3. **Project loading desyncs.** Projects saved with a 12-EDO mode didn't always load back correctly.
4. **Mode selection UX.** Saving multiple custom modes worked, but picking between them was clunky. The dropdown is hard to search. Walter suggested the existing pie menus, used elsewhere for temperament and mode selection, as a better fit.

## What's in PR #8059

- Custom mode creation, with the root note locked to interval 0 so you can't build a mode with no tonic.
- Export of custom modes straight to workspace blocks (Action + Define Mode).
- Cleaner DOM teardown and SVG re-rendering when switching between EDOs.

## PR reviews

Reviewed a couple of temperament PRs from other contributors this week.

- **PR #7965** (Vanshika) — extracted the copy-pasted logic scattered across `TemperamentWidget` into small helpers (`ratioToWheelAngle`, `ratioToCents`, `computeFrequencies`, `setNavItemColor`, and friends). The interesting part was the back-and-forth on where `ratioToWheelAngle` should live; it ended up in `musicutils.js` next to the other temperament math rather than as a widget method, which made the test story much cleaner.
- **PR #8036** (Ayush Raj) — added null guards for the `pitchNumber_` DOM elements in `__playLoop` and deduplicated the edit click listener in `showNoteInfo` so repeated calls don't stack handlers. Both came with unit test coverage.

## What's next

A few things left before #8059 can land: finish the SVG cleanup so elements stop accumulating, rework mode selection based on Walter's feedback, then merge and get on with the rest of Goal 4.

---

## Links

- [PR #8059 (Under Review)](https://github.com/sugarlabs/musicblocks/pull/8059)
- [PR #8038 (Closed)](https://github.com/sugarlabs/musicblocks/pull/8038)
- [Issue #7171: Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)
