---
title: "DMP '26 Week 09 Update by Vanshika Pahal"
excerpt: "Week 09: Building the Stryker mutation testing infrastructure from scratch, fixing a scalability blocker before it could stall real work, and using it to raise mutation coverage across five turtleactions modules — including a real infinite-loop bug caught along the way."
category: "DEVELOPER NEWS"
date: "2026-08-05"
slug: "2026-08-05-dmp-26-vanshika-week09"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,testing,week09,mutationtesting,stryker,turtleactions"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 09 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Building Stryker Mutation Testing Infrastructure and Raising turtleactions Mutation Coverage
**Reporting Period:** 2026-07-30 to 2026-08-05

---

## Overview

Week 08 closed with a roadmap pointed squarely at mutation testing: build out Stryker infrastructure, improve its scalability, and then use it to raise mutation coverage across the turtle actions modules in turn — IntervalsActions, RhythmActions, PitchActions, ToneActions, and DrumActions. Week 09 carried that plan out in full. The Stryker setup went in first as a deliberately conservative proof of concept scoped to a handful of already-well-tested files, a scalability problem surfaced almost immediately once the full configured scope was attempted and was diagnosed and fixed before it could block any real coverage work, and the remaining five pull requests used the now-working infrastructure to systematically kill surviving mutants across turtleactions, one file at a time. The PitchActions pass also turned up a genuine production bug — an infinite loop in `deltaPitch` — that mutation analysis exposed and this week's work fixed alongside its regression tests.

This week I merged **7 pull requests**, changing roughly **2,566 additions and 172 deletions**. Every pull request stayed test-only except the one-line `deltaPitch` fix it directly motivated, and every pull request passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 09 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #8034](https://github.com/sugarlabs/musicblocks/pull/8034)** | Stryker Mutation Testing Infrastructure | package.json, stryker.config.js | Added Stryker Mutator 9.6.1 as a declared dependency with a tracked config and `test:mutation` script, scoped to turtleactions, musicutils.js, and piemenu-block-context.js. | **Merged** |
| **[PR #8042](https://github.com/sugarlabs/musicblocks/pull/8042)** | Mutation Testing Scalability Fix | stryker.config.js | Removed musicutils.js from the default mutation scope after it was found to generate 7,391 of ~9,911 mutants, and tuned Stryker's concurrency and test-runner recycling. | **Merged** |
| **[PR #8045](https://github.com/sugarlabs/musicblocks/pull/8045)** | IntervalsActions Mutation Coverage | js/turtleactions/__tests__/IntervalsActions.test.js | Raised IntervalsActions' mutation score from 34.48% to 48.05% with exact behavioral assertions for GetModename, GetIntervalNumber, and GetCurrentInterval. | **Merged** |
| **[PR #8048](https://github.com/sugarlabs/musicblocks/pull/8048)** | RhythmActions Mutation Coverage | js/turtleactions/__tests__/RhythmActions.test.js | Added dispatch/listener and boundary tests targeting 124 surviving mutants concentrated in playNote, doRhythmicDot, doTie, multiplyNoteValue, and addSwing. | **Merged** |
| **[PR #8071](https://github.com/sugarlabs/musicblocks/pull/8071)** | PitchActions Mutation Coverage + deltaPitch Fix | js/turtleactions/PitchActions.js, __tests__/PitchActions.test.js | Raised PitchActions' mutation score from 78.25% to 88.73% and fixed a real infinite-loop bug in deltaPitch that mutation analysis surfaced. | **Merged** |
| **[PR #8087](https://github.com/sugarlabs/musicblocks/pull/8087)** | ToneActions Mutation Coverage | js/turtleactions/__tests__/ToneActions.test.js | Raised ToneActions' mutation score from 76.70% to 89.27% with tests for dispatch guards, boundary conditions, and setTimbre deduplication. | **Merged** |
| **[PR #8109](https://github.com/sugarlabs/musicblocks/pull/8109)** | DrumActions Mutation Coverage | js/turtleactions/__tests__/DrumActions.test.js | Raised DrumActions' mutation score from 82.48% to 94.16% with 5 targeted tests, and classified all 8 remaining survivors as equivalent or environment-specific. | **Merged** |

*Total changes: **+2,566 additions** and **-172 deletions** across all seven pull requests.*

---

## Detailed Breakdown

### Stryker Infrastructure

#### 1. Mutation Testing Infrastructure (PR #8034)

Stryker's packages were already present in `node_modules` but were extraneous — nothing in the repository declared them, so the setup wasn't reproducible from a fresh install.

* **Changes:** Declared Stryker Mutator 9.6.1 as a development dependency, added a tracked `stryker.config.js` reusing the existing `jest.config.js`, and added a `test:mutation` npm script. Two narrowly scoped dependency overrides were added — one for `minimatch`'s `brace-expansion` pin and one for `ajv` — both scoped to Stryker's own dependency tree so the repository's existing global overrides were left untouched.
* **Initial Scope:** `js/turtleactions/*.js`, `js/utils/musicutils.js`, and `js/piemenu-block-context.js`, chosen because they already had meaningful Jest coverage that could give mutation results useful signal.
* **Verification:** A dry run instrumented 10,036 mutants across 11 files with `perTest` coverage analysis working correctly, and a real mutation run against `DictActions.js` (175 mutants, 167 killed, 95.43% score) confirmed per-test attribution was accurate. A full-scope run was attempted but abandoned after ~29 minutes when its estimated completion time exceeded 25 hours and climbing, with three test-runner processes terminating in SIGSEGV.

#### 2. Mutation Testing Scalability Fix (PR #8042)

The full-scope run from PR #8034 needed a real fix before mutation testing could be used day-to-day.

* **Root Cause:** `musicutils.js` alone generated **7,391 of the ~9,911 mutants** in the full scope, driven by large module-level lookup tables that produce static mutants Stryker's `perTest` selection can't narrow down. A 94-mutant sample from that file needed roughly 739 related tests per mutant, versus roughly 7 for `DictActions.js`.
* **Changes:** Removed `musicutils.js` from the default mutation scope, documented bounded line-range runs for it separately, set Stryker's concurrency to half the available CPU cores, and added `maxTestRunnerReuse: 50` to recycle test-runner processes periodically. `ignoreStatic` was deliberately left disabled so mutation signal wasn't silently discarded.
* **Result:** The default scope dropped to roughly 2,685 mutants across 10 files, where related-test discovery gives much stronger signal, verified by a clean dry run and a repeat of the `DictActions.js` mutation run at the same 95.43% score.

### turtleactions Mutation Coverage

#### 3. IntervalsActions (PR #8045)

* **Motivation:** IntervalsActions.js sat at a 34.48% mutation score with 223 surviving mutants, mostly because existing tests only checked return *type* rather than exact results, letting incorrect arithmetic and conditional mutations survive.
* **Changes:** Added exact-value tests for `GetModename`, `GetIntervalNumber`, and `GetCurrentInterval` covering octave signs, wrap-around, the boundary at exactly 21 vs. 22, negative-octave wording, letter-gap wrapping, and the `index1 === index2` boundary.
* **Result:** Mutation score rose from 34.48% to 48.05%; surviving mutants in the three targeted methods dropped from 67 to 10, all confirmed equivalent or unreachable through invariant analysis. Full Jest suite: 209/209 suites, 7,429/7,429 tests.

#### 4. RhythmActions (PR #8048)

* **Motivation:** Mutation testing found 124 surviving mutants out of 357, concentrated around repeated dispatch-block and mouse-listener registration logic in `playNote`, `doRhythmicDot`, `doTie`, `multiplyNoteValue`, and `addSwing`.
* **Changes:** Added dispatch/listener tests covering every combination of `blk` present/absent from `blockList` and `MusicBlocks.isRun` true/false, boundary tests for a `null` `noteValue`, an empty-`notePitches` guard, and cleanup for mocked globals to stop state leaking between tests.
* **Scope Note:** Remaining listener-closure, arithmetic, and assertion-strengthening survivors were deliberately deferred to keep this PR focused — that follow-up landed the next week as PR #8157.

#### 5. PitchActions and the deltaPitch Bug (PR #8071)

* **The Bug:** A surviving mutant, `if (i > 100) return;` inside `deltaPitch`'s `_calculate` closure, only returned from the closure and never broke the enclosing `while` loop. Investigating why it survived led to a real bug: for any temperament where `isCustomTemperament()` treats it as custom-with-no-ratios, the step size computes to `0`, `delta` never changes, and the loop never terminates.
* **Why the Fix Shipped With the Tests:** The regression tests for the fix are the same tests that close the mutation-coverage gap, so splitting them into a separate PR would mean landing tests for behavior that didn't exist yet. The fix itself is an isolated 4-line change wiring the already-present `i` counter into both `while` conditions as an explicit 100-iteration cap.
* **Result:** Mutation score rose from 78.25% to 88.73%, with the 54 remaining survivors individually investigated and classified as equivalent, environment-only, or one deliberately deferred dispatch-guard pattern already fixed on four sibling methods. Full `js/turtleactions` suite: 467/467 passing, no regressions.

#### 6. ToneActions (PR #8087)

* **Changes:** Added targeted tests for dispatch guards, boundary conditions, synth parameter state, and `setTimbre` deduplication, replacing mutation-specific tests with genuine behavioral assertions.
* **Result:** Mutation score rose from 76.70% to 89.27%, with 48 additional mutants killed. 493 turtleactions tests passing.

#### 7. DrumActions (PR #8109)

* **Changes:** Added 5 targeted tests to `DrumActions.test.js`, run twice against the same survivor set to confirm the remaining 8 survivors were consistent rather than flaky.
* **Result:** Mutation score rose from 82.48% to 94.16% (125 of 137 mutants killed). The 8 remaining survivors were all classified: 4 environment-specific `module.exports` CommonJS/UMD guards, 2 equivalent mutations in the `playNoise` fallback, and 2 equivalent `blk !== undefined` dispatch guards that can't occur because `blockList` is a real JavaScript Array. Full `js/turtleactions` suite: 941/941 passing.

---

## Architectural Impact

| Initiative | Status After Week 09 |
| :--- | :--- |
| **Stryker Mutation Testing Infrastructure** | Complete and reproducible from a fresh install, scoped to turtleactions and piemenu-block-context.js after musicutils.js was found too expensive to run unscoped. |
| **Mutation Testing Scalability** | Resolved: default scope reduced from ~9,911 to ~2,685 mutants, with concurrency and test-runner recycling tuned to avoid the earlier SIGSEGV failures. |
| **turtleactions Mutation Coverage** | Five modules improved this week — IntervalsActions (34.48%→48.05%), RhythmActions (124 survivors targeted), PitchActions (78.25%→88.73%), ToneActions (76.70%→89.27%), DrumActions (82.48%→94.16%). |
| **Production Correctness** | One real bug found and fixed: an infinite loop in PitchActions' deltaPitch for custom temperaments with no ratios, caught directly by mutation analysis. |

The scalability fix turned out to be as load-bearing as the infrastructure itself — without narrowing the default scope, every subsequent coverage PR this week would have been run against an unusably slow or crashing mutation suite instead of the fast, focused runs that actually made five files' worth of coverage work possible in a single week.

---

## Key Learnings

1. **Prove Infrastructure on a Narrow Scope Before Trusting It Widely:** Scoping the initial Stryker setup to files that already had strong Jest coverage made it possible to verify per-test attribution and mutation scoring against a known-good file (DictActions.js) before ever touching the harder, larger-scope run.
2. **A Few Files Can Dominate a Mutation Run's Cost:** `musicutils.js` alone accounted for 7,391 of ~9,911 mutants because of its module-level lookup tables — a reminder that mutation count doesn't track file count or even line count, and that profiling before scaling up matters.
3. **Mutation Analysis Finds Real Bugs, Not Just Coverage Gaps:** The `deltaPitch` infinite loop wasn't found by manual review — it was found because a specific surviving mutant pointed directly at a dead return statement, and tracing why it survived led straight to the bug.
4. **A Fix Discovered by Its Own Regression Test Belongs in the Same PR:** Splitting the deltaPitch fix from the tests that motivated it would have meant landing untested behavior or delayed coverage for no real benefit — keeping the causal chain in one PR kept it reviewable.
5. **Not Every Surviving Mutant Is Worth Chasing:** Across all five coverage PRs this week, remaining survivors were investigated and classified as equivalent or environment-specific rather than forcing artificial tests to inflate the score — a pattern set here that continued through the following week's work too.

---

## Roadmap for Week 10

The next goals are to close out the remaining turtleactions and piemenus mutation-coverage targets — MeterActions, OrnamentActions, DictActions, VolumeActions, and piemenuBlockContext — including second passes on RhythmActions and IntervalsActions to close the gaps deliberately deferred this week, and then extend the mutation-testing pattern into a new kind of test: integration tests that drive real blocks through the actual Logo interpreter rather than testing action modules in isolation.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging five of this week's pull requests — the Stryker infrastructure, the scalability fix, and the IntervalsActions, RhythmActions, and PitchActions coverage work — and to **Ashutosh Singh** for reviewing and merging the ToneActions and DrumActions coverage PRs. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
