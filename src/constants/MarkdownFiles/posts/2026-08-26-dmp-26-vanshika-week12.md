---
title: "DMP '26 Week 12 Update by Vanshika Pahal"
excerpt: "Week 12, the final week: validating and safely writing AST-generated tests, using the AST plans to add coverage to utility modules, targeted coverage for rubrics and the focus-cycle manager, a transposition dispatch integration test, and an end-to-end test for the Tempo widget."
category: "DEVELOPER NEWS"
date: "2026-08-26"
slug: "2026-08-26-dmp-26-vanshika-week12"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,testing,week12,ast,testgeneration,cypress,e2etesting,finalreport"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 12 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Completing the AST Test-Generation Pipeline, Targeted Coverage, and Final Integration and E2E Tests
**Reporting Period:** 2026-08-20 to 2026-08-26

---

## Overview

This is the final week of my DMP '26 project, which also completes my C4GT and maintenance work on Music Blocks. Week 11 ended with an AST-based extractor that turns a JavaScript module into a JSON test plan, and a roadmap to validate those plans and build generation on top of them. Week 12 did the first half of that and then returned to the kind of targeted, behavior-first coverage that the earlier weeks established.

The main piece of work was the safety layer for AST-generated tests: a static validator that rejects unsafe or low-quality generated Jest tests before they can reach disk, and a writer that only ever creates new `.generated.test.js` files under a controlled path. With that in place, I used the AST plans to find the real coverage gaps in a group of pure utility modules and wrote behavior-derived tests for them, then did the same for `rubrics.js` and `focus-cycle-manager.js`. The last two pull requests returned to the interpreter and the browser, with a transposition dispatch integration test and an end-to-end test for the Tempo widget.

This week I merged **5 pull requests**, changing roughly **4,268 additions and 23 deletions**. All five were test-only or test-tooling changes. No production application code was modified.

---

## Week 12 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #8381](https://github.com/sugarlabs/musicblocks/pull/8381)** | Validation and Safe Writer for AST-Generated Tests | scripts/generate-tests/ (10 files) | Added a static validator and an exclusive-create writer for generated Jest tests, plus `--emit` and `--write` CLI modes. | **Merged** |
| **[PR #8457](https://github.com/sugarlabs/musicblocks/pull/8457)** | Generated Coverage for Utility Modules | js/utils/__tests__/utils-logic.test.js, musicutils.test.js, language-utils.test.js, js/__tests__/base64Utils.test.js, cypress.config.js | Raised `utils-logic.js` branch coverage from 66.66% to 94.44% and its targeted mutation score from 66.77% to 86.45%. | **Merged** |
| **[PR #8565](https://github.com/sugarlabs/musicblocks/pull/8565)** | rubrics and focus-cycle-manager Coverage | js/__tests__/rubrics.test.js, js/__tests__/focus-cycle-manager.test.js | Raised `rubrics.js` branch coverage from 56.7% to 90.8% and `focus-cycle-manager.js` from 66.8% to 81.6%. | **Merged** |
| **[PR #8567](https://github.com/sugarlabs/musicblocks/pull/8567)** | Semitone Transpose Clamp Dispatch Integration Test | js/__tests__/transpose-pitch-dispatch-integration.test.js | Drives real `settransposition` clamps through `Logo.runFromBlockNow` and verifies the transposed pitch and state restoration. | **Merged** |
| **[PR #8653](https://github.com/sugarlabs/musicblocks/pull/8653)** | Tempo Widget E2E Test | cypress/e2e/tempo-widget.cy.js, cypress/fixtures/tempo-widget-minimal.tb | Covers the Tempo widget lifecycle and verifies a real BPM edit is clamped and written back to the underlying block. | **Merged** |

*Total changes: **+4,268 additions** and **-23 deletions** across the five pull requests listed above.*

---

## Detailed Breakdown

### Completing the AST Test-Generation Pipeline

#### 1. Validation and Safe Writer for Generated Tests (PR #8381)

* **Motivation:** Generated test source is only useful if it can be trusted not to do anything harmful or meaningless. Before any generation reaches disk, it needs to be checked, and writing it needs to be safe by construction.
* **Validator:** Added `validate-generated.js`, a deterministic static validator. It parses the candidate without ever executing it or touching the network. It requires valid syntax, meaningful test structure (`it`/`test` and `expect`), and an import of the module named by the `ModuleTestPlan`. It rejects:
  * mocking the module under test, and unrelated production imports;
  * filesystem and process modules, and unsafe filesystem operations;
  * `module.exports` / `exports` mutation, and private `_`-prefixed member access;
  * meaningless or snapshot-only assertions;
  * uncontrolled randomness and timers, undeclared globals, and duplicate test titles.

  It only warns on potentially nondeterministic `Date.now()` / `new Date()` usage and on mismatched `describe` titles.
* **Writer:** Added `write-generated.js`, which writes only to `<dir>/__tests__/<module>.generated.test.js`. It rejects absolute paths and traversal, requires the `.generated.test.js` suffix, never overwrites an existing file by using exclusive creation (`wx`), supports a dry-run mode, and validates the source before writing anything. The dedicated suffix keeps existing handwritten `.test.js` files unaffected.
* **CLI and Docs:** Extended `cli.js` with `--emit[=provider]` and `--write`, where `--write` requires `--emit` and generation modes stay mutually exclusive with `--check`. Updated the README with the pipeline, safeguards, usage, and API, and added regression fixtures for valid generated tests from real Music Blocks utility modules.
* **Review:** Walter asked me to go through the automated review suggestions. I addressed them and rebased after a merge conflict with master.
* **Verification:** Focused `scripts/generate-tests` suite 7 suites / 184 tests; full Jest suite 229 suites / 8,416 tests; ESLint, Prettier, `git diff --check`, and commitlint clean. I verified that invalid generated tests are rejected before reaching disk, that existing generated tests are never overwritten, that dry-run performs no writes, and that results are deterministic across repeated runs.
* **Limit:** The validation is deliberately static and heuristic. It checks structure, safety, determinism, and test quality, but does not try to prove a generated test is semantically correct. The AST extractor and `ModuleTestPlan` implementation were unchanged.

### Targeted Behavioral Coverage

#### 2. Generated Coverage for Utility Modules (PR #8457)

* **Approach:** Used the AST-guided pipeline to enumerate exported functions and uncovered branches from generated `ModuleTestPlan` data, then wrote behavior-derived Jest tests for the meaningful gaps in existing suites.
* **Changes:**
  * `utils-logic.js`: exhaustive `oneHundredToFraction` cases and property checks, GCD/LCD invariants, additional `rationalSum` validation paths, `mixedNumber` boundary cases, `rationalToFraction` edge cases, `toFixed2` formatting, and `resolveObject` error handling.
  * `musicutils.js`: previously untested exports, including the EDO/temperament helpers and `getEdoNoteNamePosition`.
  * `base64Utils.js`: known-answer UTF-8 Base64 vectors and extra round-trip cases.
  * `language-utils.js`: idempotency and complete mapping consistency checks.
* **Result:** Overall focused branch coverage rose from 68.35% to 72.28%, with `utils-logic.js` going from 66.66% to 94.44%. A targeted Stryker run on the `utils-logic.js` range raised the mutation score from 66.77% to 86.45%, killing 58 more mutants (201 to 259) and reducing no-coverage mutants from 45 to 2. The remaining survivors were reviewed and are equivalent, logging-only, or environment-specific, so I did not add artificial tests to remove them.
* **CI Change:** The Cypress end-to-end job was failing intermittently on audio timing, so this PR also sets `retries: { runMode: 2, openMode: 0 }` in `cypress.config.js`. Failed tests are retried in CI only, and interactive runs are not retried so failures stay visible. This is a CI-reliability change, not a production one.
* **Verification:** Focused utility tests 728/728; full Jest suite 229 suites / 8,698 tests with no failures. ESLint with `--max-warnings=0` and Prettier clean.
* **Noted, Not Changed:** The `getEdoNoteNamePosition` JSDoc example doesn't match the function's current proportional fallback behavior. I left it alone as out of scope for a test-only PR.

#### 3. rubrics and focus-cycle-manager (PR #8565)

* **Selection:** I picked these two modules from a full-suite coverage baseline, based on meaningful uncovered branches, clear public APIs, existing test scaffolding, and maintenance value. The AST plan was used only to enumerate the public surface and find branch gaps. The tests themselves are behavioral rather than generated blindly.
* **`js/rubrics.js`:** Added coverage for `analyzeProject()` connection guards, slot 1/3/4 connection cases, the not-in-catalog debug path, tuplet counting, pitch-range tracking, articulation markers, rests, custom temperament handling, and zero-vector handling in `scoreToChartData()`. Branch coverage rose from 56.7% to 90.8%, function coverage from 85.7% to 100%, and the mutation score for the touched functions from 25.2% to 88.4%.
* **`js/focus-cycle-manager.js`:** Added coverage for the keyboard-accessibility state machine against a populated DOM: workspace, toolbar, and palette focus, zone entry and exit, palette state synchronization, focus-ring cleanup, and the mousedown handoff. Branch coverage rose from 66.8% to 81.6% and function coverage from 88.2% to 97.1%.
* **Deliberate Choice:** The rubrics tests intentionally avoid locking in a pre-existing "end articulation" routing quirk, so a future correction to that behavior won't require rewriting the test.
* **Remaining Gaps:** Left alone on purpose: AMD/window environment shims, defensive branches unreachable through the public API, alternative DOM shapes, and equivalent mutants.
* **Verification:** Full Jest suite 233 suites / 9,015 tests; ESLint and Prettier clean; verified after rebasing onto the latest master.

### Interpreter Integration and End-to-End Coverage

#### 4. Semitone Transpose Clamp Dispatch (PR #8567)

* **Motivation:** The existing pitch dispatch integration test never placed a transposition clamp in the program, so `tur.singer.transposition` stayed at 0 and the transposition path was never exercised through real Logo dispatch.
* **Changes:** Added `js/__tests__/transpose-pitch-dispatch-integration.test.js`, which dispatches `settransposition` clamps through the real `Logo.runFromBlockNow`. The path under test runs through the clamp machinery, `PitchActions.setSemitoneTranspose`, the transposition revert listener, `PitchActions.playPitch`, `Singer.processPitch`, `getNote`, and `RhythmActions.playNote`.
* **What It Verifies:** At the scheduling boundary, +2 semitones shifts `sol/4` to A4 and -2 shifts it to F4. Nested +2 and +3 accumulate and cross the octave boundary to produce C5. Transposition returns to 0 after the clamp, and the transposition stack is empty, which shows the real end-of-clamp machinery ran the revert listeners.
* **Mocking Boundary:** Only the Tone.js hand-off (`Singer.processNote`) and the unrelated `Singer.addScalarTransposition` are mocked. `PitchActions`, `RhythmActions`, `Singer.processPitch`, and `getNote` stay real.
* **Review:** An automated review comment pointed out that a program with no transposition clamps takes a separate wiring branch that the clamp-only tests don't exercise, and suggested a baseline case for it.
* **CI Note:** A failing Jest check turned out to be an existing `synthutils.test.js` problem on master, already covered by PR #8637, so I kept that fix out of this PR.
* **Verification:** The focused integration test passed 4/4 when the PR was opened, and the full Jest suite of 234 suites / 9,006 tests passed. No production code changed.

#### 5. Tempo Widget End-to-End Test (PR #8653)

* **Motivation:** The Tempo widget had no Cypress coverage. A recent fix in #8605 made the BPM input parse its value as a float, but that behavior was only covered by Jest unit tests.
* **Changes:** Added `cypress/e2e/tempo-widget.cy.js` and a minimal `cypress/fixtures/tempo-widget-minimal.tb` fixture that starts the widget with an initial BPM of 90. The test opens the widget through a real Play run, edits the BPM input using the widget's real Enter-key handler, and verifies the BPM is clamped (to 1000 and 30 at the limits) and that a value of 125 is stored as a number. It also checks that the clamped value is written back to the underlying block rather than only shown in the widget, and that the dialog is removed when the widget closes.
* **Review Follow-Up:** After review I trimmed comments, scoped the setup cleanup to the help dialog, and made the cleanup specific to the Tempo widget.
* **Verification:** Full Cypress suite 59/59; full Jest suite 9,236/9,236; lint, Prettier, and `git diff --check` clean. No production code changed.

---

## Architectural Impact

| Initiative | Status After Week 12 |
| :--- | :--- |
| **AST Test-Generation Pipeline** | Extractor (Week 11), validator, and safe writer are all in place, with CLI support for `--emit` and `--write`. Generated tests are validated statically and can only be created as new `.generated.test.js` files. |
| **Utility Module Coverage** | `utils-logic.js` branch coverage at 94.44% and targeted mutation score at 86.45%, with new coverage across `musicutils.js`, `base64Utils.js`, and `language-utils.js`. |
| **Module Coverage** | `rubrics.js` at 90.8% branch coverage and `focus-cycle-manager.js` at 81.6%, with the remaining gaps documented rather than chased. |
| **Interpreter Integration Tests** | Semitone transposition is now verified through the real Logo dispatch path and its end-of-clamp cleanup. |
| **End-to-End Coverage** | The Tempo widget is covered through a real user workflow, including the BPM clamp reaching the underlying block. |
| **CI Reliability** | Cypress failures in CI are retried up to twice to reduce audio-timing flakiness, with interactive runs unaffected. |

The generator-side safeguards are the part of this week I would point to as the lasting result. A generator that can write files is only safe to use if the checks live in the pipeline itself, so the validator, the exclusive-create writer, and the dedicated `.generated.test.js` suffix are enforced by the tooling rather than left to the person running it.

---

## Key Learnings

1. **Put the Safety Checks in the Pipeline, Not in Reviewer Discipline:** Static validation before the write, exclusive file creation, and a dedicated suffix mean a bad generated test is rejected before it reaches disk and a good one can never replace a handwritten test.
2. **A Static Validator Has a Clear Boundary:** The validator checks structure, safety, determinism, and test quality, but it cannot prove a generated test is semantically right. Saying so up front kept the claims about the tool honest.
3. **Use Generated Plans to Find Gaps, Then Write the Tests by Hand:** The AST plan was good at listing the public surface and the uncovered branches. The tests that actually killed mutants in `utils-logic.js` and `rubrics.js` were written from observed behavior, not emitted blindly.
4. **Don't Lock a Test to a Known Quirk:** The rubrics tests avoid asserting on the "end articulation" routing quirk, and a reviewer later pointed at that same spot. A test that asserts a bug's current output has to be rewritten when the bug is fixed.
5. **Cypress Retries Apply to Tests, Not Whole Specs:** The retry setting for CI flakiness retries a failing test, and with test isolation off a retry can reuse earlier state. A review comment made that limit clear, which is why retries are only enabled in CI run mode.
6. **A Behavior Fix Should Get a Test at the Level Users See It:** The BPM float-parsing fix from #8605 was covered by Jest only. The Tempo widget test checks that the clamped value reaches the underlying block, which is where a user's edit actually has to land.

---

## Roadmap Beyond DMP '26

This was the last week of the project, so the remaining items are the follow-ups recorded in this week's pull requests rather than a new plan:

* The remaining coverage gaps in the utility modules, `rubrics.js`, and `focus-cycle-manager.js` are documented as intentional, mostly environment shims and unreachable defensive branches, and could be revisited if those environments become testable.
* The "end articulation" routing quirk in `rubrics.js` is a pre-existing behavior that was deliberately left out of the tests, and would need a separate fix.
* The `getEdoNoteNamePosition` JSDoc example needs correcting to match its current proportional fallback behavior.
* The AST pipeline now has extraction, validation, and safe writing, so the next step for anyone continuing it is using `--emit` with a provider to generate tests for further modules.

---

## Acknowledgements

Thank you to my mentor and the project maintainer, **Walter Bender**, for his guidance and patient reviews throughout the project, and for reviewing and merging this week's AST validation, transposition dispatch, and Tempo widget pull requests. I would also like to thank **Sugar Labs** and the **C4GT** program for the opportunity, and the rest of the Sugar Labs community for their support and reviews over these twelve weeks.
