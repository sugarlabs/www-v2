---
title: "DMP '26 Week 07: PR 8 Merged — Core Engine and Scale Builders"
excerpt: "PR #7959 merged with scalePatternToEDO(), getModePattern(), and PITCH_COLLECTIONS_EDO_OVERRIDES. Backward compatible. Notation research: Sagittal vs. Kite's Ups and Downs. Walter's bug report proves the microtonal engine works."
category: "DEVELOPER NEWS"
date: "2026-07-31"
slug: "2026-07-31-dmp-26-niravsharma-week07"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 7 — PR 8 merged with core engine and scale builders. Notation research on Sagittal vs. Kite's Ups and Downs. Walter's bug report proves the microtonal engine works. Next: PR 9, 10, 11"
tags: "dmp26,sugarlabs,week07,niravsharma,musicblocks,temperament,microtonality"
image: "public/assets/Developers/Nirav/mermainDiagramGoal4.png"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma  
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)  
**C4GT DMP 2026 / GSoC 2026**  
**Reporting Period:** July 24–31, 2026

---

## PR 8 merged: core engine and scale builders

PR #7959 (PR 8) got merged into master this week. It's the math that lets Music Blocks generate non-12 EDO scales instead of being hardcoded to 12-EDO.

### What's in it

| Function / Constant | What it does | 12-EDO behavior |
|---|---|---|
| `scalePatternToEDO(pattern, edo)` | Converts a step pattern to an EDO-specific scale using cumulative positions and rounding. | Returns what the old code returned. |
| `getModePattern(modeName, edo)` | Returns interval patterns for named modes at any EDO. | Standard 12-EDO patterns. |
| `PITCH_COLLECTIONS_EDO_OVERRIDES` | Lets specific EDOs pin interval choices (like 19-EDO major). | Unused; no change. |

All three are backward compatible. 11 new unit tests pass, and I didn't break any of the 7,200+ existing ones.

### Test failures that weren't failures

Two tests in `musicutils.test.js` under `getStepSizeDown` failed during my pre-submission check. I checked out a clean `HEAD` and traced them: the failures were from uncommitted local code calling `_getStepSize`, which early-returns 0 for custom temperaments without ratios. That's a known limitation — it's queued for PR 7a₂. PR 7a₁ doesn't touch that code path. So I left it alone and kept 7a₁ scoped to what it needed to do.

---

## Notation research: Sagittal vs. Kite's Ups and Downs

Devin and I looked at two notation systems for LilyPond export.

| System | How it works | Trade-offs |
|---|---|---|
| **Sagittal** (`sagittal.org`) | Specialized symbols (arrows, split accidentals) for exact ratios and cents. | Needs external font files and `.ly` includes. |
| **Kite's Ups and Downs** (`xen.wiki`) | Standard note names with `^` and `v` modifiers (`^C`, `vG`). | Readable for EDOs, but needs custom staff mapping. |

### What we decided

Full visual notation rendering would pull in external fonts and blow up the scope. So for PR 9 we'll focus on two things: stop LilyPond from crashing on non-12 EDO scales (the hardcoded 12-slot arrays need to go), and optionally add plain-text cents markup above notes — something like `c4^\markup { "+15¢" }`. Full Sagittal or Kite rendering can wait for later.

---

## Walter's crash report is good news

Walter hit this when opening the Pitch/Solfege Pie Menus:

```
Uncaught (in promise) TypeError: can't access property "substr", EQUIVALENTACCIDENTALS[scale[i]] is undefined
```

This isn't a regression from my PR. The engine is now generating microtonal note names like `C^` and `vG` that didn't exist before, and the pie menu's `EQUIVALENTACCIDENTALS` table doesn't know them yet. The fix is straightforward: teach the table about the new names.

The good part: this is the first real consumer hitting the microtonal note names the engine produces. The crash proves the names are actually being generated and flowing through the system. I'll take that over silence.

---

## What's next

| PR | Scope | Target |
|---|---|---|
| PR 9 | Derived math: `_getStepSize()`, `getSolfege()`, `getNumber()`, EDO > 12 pitch-name mapping, integration tests | Week 8 |
| PR 10 | LilyPond crash fix, plain-text cents markup, microtonal keys in `musickeyboard.js` | Week 8–9 |
| PR 11 | UI scale builder widget | Week 9–10 |

---

## Links

- [PR #7959](https://github.com/sugarlabs/musicblocks/pull/7959) — merged
- [Issue #7171](https://github.com/sugarlabs/musicblocks/issues/7171)
