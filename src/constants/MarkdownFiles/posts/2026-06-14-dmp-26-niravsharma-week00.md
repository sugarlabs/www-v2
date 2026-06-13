---
title: "DMP '26 Week 00: Refactor Temperament — Journey Begins"
excerpt: "Accepted into C4GT DMP 2026; pre-coding prep complete; Phase 1 coding started during exams"
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-dmp-26-niravsharma-week00"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "DMP'26 Contributor at SugarLabs (Music Blocks - Refactor Temperament)"
tags: "dmp26,sugarlabs,week00,niravsharma,musicblocks,temperament"
---

<!-- markdownlint-disable -->

# Week 00 Progress Report

**Project:** [Music Blocks - Refactor Temperament (Issue #7171)](https://github.com/sugarlabs/musicblocks/issues/7171)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-03 – 2026-06-18 (Pre-coding + Phase 1)

---

## What is this project?

Music Blocks hardcodes **12** everywhere — pitch math, note names, intervals. If you pick 19-EDO, 31-EDO, or Just Intonation, half the blocks give wrong answers: wrong frequencies, wrong note names, broken intervals.

**Goal:** Make the temperament system dynamic so any EDO (12, 17, 19, 31…) and non-EDO temperaments (Pythagorean, Just Intonation, Meantone) work correctly across all blocks, synthesis, and widgets.

---

## Pre-Coding Prep (Jun 3–9)

- Codebase audit complete — I mapped ~30 hardcoded-12 locations across 6 files
- Line numbers verified against current codebase (many original proposal numbers were stale)
- Three PRs already merged before coding period:
  - [#6243](https://github.com/sugarlabs/musicblocks/pull/6243) (mine): `defineMode` validation + octave wrap fix
  - [#7278](https://github.com/sugarlabs/musicblocks/pull/7278) (Mikey3600): `getNumNote` temperament-aware
  - [#7317](https://github.com/sugarlabs/musicblocks/pull/7317) (srajang1805): Non-EDO constants & helpers foundation
- Dev environment ready — `npm test`: 5438 tests passing

---

## Phase 1: Coding During Exams (Jun 10–18) ✅

**Constraint:** 4 exams (Jun 12, 13, 15, 18) — only ~1 hr/day on break days.

| Date | Work Done |
|------|-----------|
| Jun 10 | Dev env setup, `nirav-dmp` branch, grep audit of `musicutils.js` |
| Jun 11 | **`getCurrentEDO()` helper** + 7 unit tests (all 12/17/19/31-EDO passing) |
| Jun 12 | Post-exam: outlined `pitchToFrequency` refactor; **one-time mentor meeting** (Walter + Devin) |
| Jun 13 | Console verified `getCurrentEDO("equal19")` → 19 |
| Jun 14 | **`pitchToFrequency` + `pitchToNumber` refactored** — optional `temperament` param, `Math.pow(2, 1/currentEDO)` |

**Result:** Most of Goal 1a core functions done. All 5438 tests still pass.

---

## Mentor Feedback (Jun 12 One-Time Meeting)

1. **Goal 1 plan doc** — write problem → solution → testing (done: [`C4GT/GoalPlan.md`](https://github.com/noddy021/musicblocks/blob/main/C4GT/GoalPlan.md))
2. **Small PRs** — not 1 PR per goal; feature-scoped PRs since goals coincide
3. **Regular meetings** — Tuesdays 16:30 IST starting Jun 16

---

## Specific Bugs Already Identified (Not in Original Proposal)

- `IntervalsActions.js:157` — `totalIntervals % 12` → `% temperamentLength`
- `IntervalsActions.js:169` — `totalIntervals > 21` → `> temperamentLength + 9`

---

## Next Week (Jun 19–25): Goal 1a Finish

- Fix remaining 11 functions in `musicutils.js` (`numberToPitchSharp`, `numberToPitch`, `_calculate_pitch_number`, `getPitchInfo`, `getNotePlayedValue`, `getNote`, `calculatePitch`, `_getStepSize`, scale-inclusion, `getSolfege`, `noteToNumber`)
- Unit tests for each at 12, 17, 19, 31-EDO
- Regression: full `npm test`

---

## Key Learnings

- **Read the code first** — many line numbers in the proposal were stale; grep verification saved me hours
- **Small, incremental refactors** — optional `temperament` param + `getCurrentEDO()` pattern keeps backward compat and lets each function be tested independently
- **Pre-coding PRs change scope** — PR #7278 and #7317 already did a big chunk of Goal 1/3; my plan must adapt

---

## Acknowledgments

Thanks to Walter Bender, Devin Ulibarri, and the Sugar Labs community for the opportunity.

---

## Connect

- GitHub: [@noddy021](https://github.com/noddy021)
- Email: [niravsharma021@gmail.com](mailto:niravsharma021@gmail.com)
- LinkedIn: [Nirav Sharma](https://www.linkedin.com/in/nirav-sharma-021)
