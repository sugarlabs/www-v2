---
title: "DMP '26 Week 00: Refactor Temperament — Journey Begins"
excerpt: "Accepted into C4GT DMP 2026; pre-coding prep complete; Phase 1 coding started during exams"
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-dmp-26-niravsharma-week00"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "DMP'26 Contributor at SugarLabs (Music Blocks - Refactor Temperament)"
tags: "dmp26,sugarlabs,week00,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 00 Progress Report

**Project:** [Music Blocks - Refactor Temperament (Issue #7171)](https://github.com/sugarlabs/musicblocks/issues/7171)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-03 – 2026-06-18 (Pre-coding + Phase 1)

---

## What is this project?

Functions like `pitchToNumber`, `pitchToFrequency`, and `frequencyToPitch` all assume 12-EDO. So do note-naming, interval math, and scale calculations. If you pick 19-EDO, 31-EDO, or Just Intonation, many blocks produce wrong results: incorrect frequencies, mismatched note names, broken interval arithmetic.

**Proposal:** [Proposal Doc (Google Drive)](https://drive.google.com/drive/u/0/folders/1rm-BMd-MManIoGKVSeqyEH_DA7UqIpw2)

**Goal:** Make the temperament system dynamic so any EDO (12, 17, 19, 31…) and non-EDO temperaments (Pythagorean, Just Intonation, Meantone) work correctly across all blocks, synthesis, and widgets.

---

## Pre-coding prep (Jun 3–9)

- Found about 30 hardcoded-12 spots across six files
- Verified line numbers against the current repo because older references were out of date
- Reviewed pre-coding PRs already merged before this work:
  - [#6243](https://github.com/sugarlabs/musicblocks/pull/6243) (mine): `defineMode` validation and octave wrap fix
  - [#7278](https://github.com/sugarlabs/musicblocks/pull/7278) (Mikey3600): `getNumNote` temperament-aware
  - [#7317](https://github.com/sugarlabs/musicblocks/pull/7317) (srajang1805): non-EDO constants and helper foundation
- Confirmed the development environment is ready and `npm test` passes

---

## Phase 1: coding during exams (Jun 10–18)

I had four exams on Jun 12, 13, 15, and 18, so most of this week was short work sessions around study time.

| Date | Work done |
|------|-----------|
| Jun 10 | Set up the dev environment, created the `nirav-dmp` branch, audited `musicutils.js` |
| Jun 11 | Added `getCurrentEDO()` and seven unit tests; verified 12/17/19/31-EDO behavior |
| Jun 12 | Post-exam: sketched the `pitchToFrequency` refactor; met with Walter and Devin |
| Jun 13 | Confirmed `getCurrentEDO("equal19")` returns `19` |
| Jun 14 | Refactored `pitchToFrequency` and `pitchToNumber` with an optional `temperament` argument |
| Jun 15 | Post-exam: traced `pitchToNumber` callers |
| Jun 16 | Verified `pitchToNumber` — `octave * 12` → `octave * currentEDO` |
| Jun 17 | Refactored `frequencyToPitch` — dynamic step, unit tests for 12/17/19/31-EDO |
| Jun 18 | Last exam; sent Matrix update to mentors; composed Meeting 1 talking points |

**Result:** Most of Goal 1 core functions done. All 5438 tests still pass.

---

## Mentor feedback

- Write the plan as problem → solution → testing (done in [`C4GT/GoalPlan.md`](https://github.com/noddy021/musicblocks/blob/main/C4GT/GoalPlan.md))
- Keep PRs feature-focused instead of one PR per goal
- Start weekly meetings on Tuesdays at 16:30 IST from Jun 16 onward

---

## Bugs I already found

- `IntervalsActions.js:157`: `totalIntervals % 12` should use `% temperamentLength`
- `IntervalsActions.js:169`: `totalIntervals > 21` should be `> temperamentLength + 9`

---

## What I learned

- Check the code before trusting old notes: line references were often stale
- Small, targeted refactors make the work easier to test and keep backward compatibility
- Pre-coding PRs changed this week's scope: #7278 and #7317 already handled a lot of the foundation

---

## Acknowledgments

Thank you to Walter Bender, Devin Ulibarri, and the Sugar Labs community for the opportunity.

---

## Connect with Me

- GitHub: [021nirav-blip](https://github.com/021nirav-blip)
- Email: [021nirav@gmail.com](mailTo:021nirav@gmail.com)
- LinkedIn: https://www.linkedin.com/in/nirav-sharma-243258382
