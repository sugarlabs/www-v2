---
title: "DMP '26 Week 06: Wrapping Goals 1-3 and Starting Goal 4"
excerpt: "PR #7853 merged (temperament persistence, B20/B21 fixes). Wrote the 12-EDO AUDIT_REPORT.md. PR #7942 merged - dynamic EDO and ratio-based temperament support across the engine, widgets, and pie menus."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-dmp-26-niravsharma-week06"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 6: PR #7853 merged. Wrote comprehensive AUDIT_REPORT.md. PR #7942 merged - EDO-aware pitch math, temperament threading, and dynamic widgets. ~140 lines of new tests."
tags: "dmp26,sugarlabs,week06,niravsharma,musicblocks,temperament,microtonality"
image: "public/assets/Developers/Nirav/mermainDiagramGoal4.png"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma  
**Project:** Refactor Temperament - Sugar Labs Music Blocks (Issue #7171)  
**C4GT DMP 2026**  
**Reporting Period:** July 27 – August 2, 2026

---

## PR #7853 merged: Goals 1-3 wrapped up

PR #7853 got merged on July 30. This closes out Goals 1-3 - the pitch and interval fixes - and shifts focus to scale and mode decoupling.

The PR handled temperament persistence and a handful of stubborn edge-case bugs:

- B20/B21: Non-equal temperament scalar transposition and the 31-EDO C / D-flat-flat loop that's been biting us
- B14-B19: Console log analysis led me to `isTrueEDO()` logic fixes and `defineMode` bounds tightening
- Tests: Suite went from 7,224 to 7,259 passing

## The 12-EDO audit

Before jumping into Goal 4 I wanted a map of what I was getting into. I wrote `AUDIT_REPORT.md` - 700+ lines cataloguing 60 hardcoded 12-EDO assumptions across 16 files. Having this documented means we won't surprise app consumers when we swap out the underlying scale math.

## PR #7942 merged: dynamic EDO and ratio-based temperaments

With the audit done, I put up PR #7942 for review. It's the big one that makes non-12 EDO and ratio-based temperaments work across the engine, widgets, and pie menus.

### Engine changes (musicutils.js, PitchActions.js)

- `calcOctave` takes a `temperament` parameter and calculates octave shifts dynamically using `Math.round(currentEDO / 4)` instead of a hardcoded 5
- `_getStepSize` no longer bails out early on custom temperaments that define ratios - it falls through to the ratio-based step calculation
- `numToPitch`, `setPitchNumberOffset`, and `deltaPitch` in `PitchActions.js` all read `inTemperament` and use `pitchToNumber % getCurrentEDO()` so pitch numbers land in the right range for non-12 EDOs

### Widget and pie menu changes

- Mode Wheel (`piemenus.js`) builds its slices from `currentEDO` and `generateNoteNames()` instead of a hardcoded 12
- Pitch Slider derives its semitone from the active EDO instead of a static constant
- Music Keyboard generates note names per-octave from `generateNoteNames(currentEDO)`
- When a widget's temperament changes, we set `changeInTemperament = true` and fire `temperamentChanged()` so the affected widgets rebuild

### Tests

Added ~140 lines across three suites: `musicutils.test.js` for `calcOctave` and `_getStepSize`, `PitchActions.test.js` for `inTemperament` threading, and `pitchslider.test.js` for the dynamic constant removal.

---

## What's next

With PR #7942 merged, I'm starting Goal 4 (PR 8) - the foundational EDO scale core for decoupling scale and mode math from 12-EDO.

## Links

- [PR #7853](https://github.com/sugarlabs/musicblocks/pull/7853) - merged
- [PR #7942](https://github.com/sugarlabs/musicblocks/pull/7942) - merged
- [Issue #7171](https://github.com/sugarlabs/musicblocks/issues/7171)
