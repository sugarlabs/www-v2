---
title: "DMP '26 Week 01 Update by Nirav Sharma"
excerpt: "PR 1 merged with temperament-aware pitch/frequency conversion, and PR 2 is progressing through remaining musicutils.js functions."
category: "DEVELOPER NEWS"
date: "2026-06-23"
slug: "2026-06-23-dmp-26-niravsharma-week01"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "DMP'26 Contributor at SugarLabs (Music Blocks - Refactor Temperament)"
tags: "dmp26,sugarlabs,week01,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Nirav Sharma

**Project:** [Music Blocks - Refactor Temperament (Issue #7171)](https://github.com/sugarlabs/musicblocks/issues/7171)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-17 - 2026-06-23

---

## What I worked on this week

### PR 1 merged on June 18

[PR #7561](https://github.com/sugarlabs/musicblocks/pull/7561) was merged with the title **"feat: make pitch/frequency conversion temperament-aware"**. It replaced hardcoded 12-EDO assumptions in the core pitch math functions and included important review feedback from Walter.

- Added `getCurrentEDO()` helper — returns `TEMPERAMENT[temperament]?.pitchNumber ?? 12`
- Refactored `pitchToFrequency()` — now uses `Math.pow(2, 1/currentEDO)`
- Refactored `pitchToNumber()` — now uses `octave * currentEDO`
- Refactored `frequencyToPitch()` — now uses dynamic `centsPerStep = 1200/currentEDO`
- Added 23 unit tests covering 12-EDO, 19-EDO, default behavior, and edge cases

Walter reviewed the PR and asked about the 1200-cent octave assumption. An octave is always 1200 cents regardless of EDO — 12-EDO gives 100¢/step, 19-EDO gives ~63.2¢/step, 31-EDO gives ~38.7¢/step. The 1200 is a constant, not a 12-EDO artifact. He also asked to move the new tests into `js/utils/__tests__/`, which I completed.

All 5561 tests pass. 12-EDO behavior is unchanged — no regression.

### PR 2: Remaining musicutils.js functions

I began work on the follow-up PR, which targets the remaining pitch and scale functions in `musicutils.js`. By the end of this week, **6 of 10** functions were fixed:

| Function | Status |
|----------|--------|
| `numberToPitchSharp` |  Done |
| `_calculate_pitch_number` |  Done |
| `getPitchInfo` (1-arg) |  Done |
| `numberToPitch` equal branch |  Done |
| `getNumber` |  Done |
| `getNote` |  Done |
| `numberToPitch` fallback loop |  Remaining |
| `_getStepSize` |  Remaining |
| `getSolfege` |  Remaining |
| `buildScale` |  Deferred to Goal 4 (Scale Builder) |

The refactor pattern is consistent across functions: replace hardcoded `12` with a dynamic `currentEDO` lookup, and replace `Math.floor(i / 12)` with `Math.floor(i / currentEDO)`.

## What’s coming next

- **Finish PR 2** — remaining functions `numberToPitch` fallback, `_getStepSize`, and `getSolfege` by June 28
- **Open PR 2** for review once the code is ready
- **Start PR 3** on June 29 — fix block-level temperament issues in `GetCurrentInterval` lines 157 and 169
- **Continue refining scale builder design** under Goal 4

---

## Reflection

This week was a major milestone because [PR #7561](https://github.com/sugarlabs/musicblocks/pull/7561) is now merged into the codebase. That means the core conversion math is temperament-aware, and the work is no longer purely experimental.

[PR #7658](https://github.com/sugarlabs/musicblocks/pull/7658) is more methodical and detailed, but the pattern is clear. I’m focusing on consistency so the remaining refactors stay stable and backward compatible.

The `getSolfege` question is a good reminder that this project is not just about numeric changes — it also needs user-facing design decisions.

---
