---
title: "DMP '26 Week 10: Goal 4 Merged, Goal 5 Ahead"
excerpt: "Goal 4 (PR #8059) and the non-EDO hardening (PR #8240) both landed. Reviewed three PRs. Starting Goal 5: the Temperament Visualizer."
category: "DEVELOPER NEWS"
date: "2026-08-28"
slug: "2026-08-28-dmp-26-niravsharma-week10"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 10: Goal 4 merged. PR #8240 landed with non-EDO hardening and scalar step fixes. Reviewed #7983, #7969, #8271. Starting Goal 5."
tags: "dmp26,sugarlabs,musicblocks,temperament,week10"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)
**C4GT DMP 2026**

---

## Goal 4 is done

PR #8059 merged on August 24. It took a while to get there — Devin and Walter both went through it, and they found real problems (the widget wouldn't open, SVG elements piled up on every switch, and the 12→5→12 EDO reset left the widget stuck). All fixed now. The Mode Widget overhaul is in: a control bar with tuning/EDO and saved modes, a name field, save/delete, and custom modes that export straight to workspace blocks.

## PR #8240 landed too

The other big merge this week. PR #8240 is the non-EDO temperament hardening — until now, custom temperaments rendered fine but didn't actually behave right when you played them. This is the fix.

- Scalar steps follow mode degrees for custom EDOs now. `_getStepSize` used to bail out early when a custom temperament had no ratio data, so transposing +1 moved a semitone instead of a mode degree. It now falls through to `buildScale` and does the right thing.
- The key pie menu is no longer hardcoded to 7 church modes. It pulls from every `MODE_PIE_MENUS` group plus your saved custom modes, so pentatonic, blues, and chromatic all show up.
- `isEquallyTempered` got rewritten with caching and proper detection. There's an `isNonEDO` helper now, and `getModePattern` can take a temperament argument to return cents-based intervals for non-EDO scales.
- `setKey` mode lookup is case-insensitive now — both sides lowercased before comparing.
- Mode widget fixes: lazy-load won't double-load, `updateModeWheelItems` repaints the navTitle on group switch (that was the blank outer ring), and `piemenuModes` falls back to the first available group if it doesn't recognize the mode.
- Storage got wrappers for restricted contexts — `_storeGet` / `_storeSet` use localStorage when they can and a plain object otherwise.
- Test cleanup: dropped 83 trivial init tests from `turtle-singer.test.js`, removed duplicates, and updated 11 tests that were asserting the old broken behavior.

## PR reviews

Three this week.

**PR #7983** (inland-taipen) - a guard in `_saveCustomMode()` that refuses to save a mode with only the tonic selected. The destructive bug it originally targeted is already gone (fixed by #8059), so what's left is just hygiene. I asked the author to resolve the merge conflict.

**PR #7969** (lavjeetrai) - the pie menu interval visibility fix. I ran my test again: pick "perfect", expect only 1, 4, 5, 8 in the inner ring. Still got all 8. The author's fix keeps every tab on screen and just disables the clicks, but the intended UX is to hide the invalid degrees entirely. I asked what layout-shift problem they were actually seeing, because that's the part I don't understand yet. Still conflicts.

**PR #8271** (Vanshika) - Cypress E2E for custom mode persistence across reload. Solid coverage. Two notes from me: the test checks the widget title, which is fragile (it's tied to rendering and i18n) — assert against `customModes` directly instead. And a comment says it "falls back to major", which isn't true. `_setMode()` returns early, so the custom name just never applies. No fallback happens.

## What's next

Goal 5: the Temperament Visualizer. The part users actually see — interval structure, pitch layout, however it maps onto the circle of fifths or some other frame. Goal 4 is landed, so I'm starting on this now.

---

## Links

- [PR #8059 (Merged)](https://github.com/sugarlabs/musicblocks/pull/8059)
- [PR #8240 (Merged)](https://github.com/sugarlabs/musicblocks/pull/8240)
- [PR #7983 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/7983)
- [PR #7969 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/7969)
- [PR #8271 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/8271)
- [Issue #7171: Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)
