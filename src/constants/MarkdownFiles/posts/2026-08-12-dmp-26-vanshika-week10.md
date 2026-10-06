---
title: "DMP '26 Week 10 Update by Vanshika Pahal"
excerpt: "Week 10: Closing out turtleactions and piemenus mutation coverage — including second passes that pushed RhythmActions and IntervalsActions far past their week 09 scores — then opening a new front: integration tests that drive real blocks through the actual Logo interpreter."
category: "DEVELOPER NEWS"
date: "2026-08-12"
slug: "2026-08-12-dmp-26-vanshika-week10"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,testing,week10,mutationtesting,stryker,logo,integrationtests"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 10 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Finishing turtleactions Mutation Coverage and Opening Real Logo-Interpreter Dispatch Integration Tests
**Reporting Period:** 2026-08-06 to 2026-08-12

---

## Overview

Week 09 closed with two threads left open: a handful of turtleactions and piemenus modules still needed mutation-coverage passes, and RhythmActions and IntervalsActions each had survivors deliberately deferred to keep their week 09 PRs focused. Week 10 closed both. Seven pull requests worked through MeterActions, OrnamentActions, DictActions, piemenuBlockContext, and VolumeActions for the first time, then returned to RhythmActions and IntervalsActions for second passes that closed far more ground than either file's first visit had. With the turtleactions/piemenus backlog cleared, the second half of the week opened a new kind of test entirely: instead of exercising an action module in isolation, six pull requests drove real blocks through the actual Logo interpreter via `Logo.runFromBlockNow`, verifying that pitch, volume articulation, scalar interval, meter, tone timbre, and ornament/dict blocks dispatch correctly through the real execution path rather than through mocks of it.

This week I merged **13 pull requests**, changing roughly **3,328 additions and 37 deletions**. Every pull request stayed test-only, with one narrow exception — a CommonJS export added to `protoblocks.js` purely to open a test seam, with no change to browser build behavior — and every pull request reported its own local verification (Jest, plus ESLint and Prettier where noted in its description) before merging.

---

## Week 10 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #8138](https://github.com/sugarlabs/musicblocks/pull/8138)** | MeterActions Mutation Coverage | js/turtleactions/__tests__/MeterActions.test.js | Raised MeterActions' mutation score from 80.95% to 98.02%, covering the ManagedTimer interval branch, BPM boundary clamps, and the time-signature dispatch chain. | **Merged** |
| **[PR #8142](https://github.com/sugarlabs/musicblocks/pull/8142)** | OrnamentActions Mutation Coverage | js/turtleactions/__tests__/OrnamentActions.test.js | Raised OrnamentActions' mutation score from 82.52% to 93.20%, adding exact error-message assertions for invalid staccato/slur values. | **Merged** |
| **[PR #8144](https://github.com/sugarlabs/musicblocks/pull/8144)** | DictActions Mutation Coverage | js/turtleactions/__tests__/DictActions.test.js | Raised DictActions' mutation score from 95.43% to 97.14% by closing three weak-assertion gaps in _GetDict's pitch-number fallback path. | **Merged** |
| **[PR #8145](https://github.com/sugarlabs/musicblocks/pull/8145)** | piemenuBlockContext Mutation Coverage | js/__tests__/piemenu-block-context.test.js | Raised piemenuBlockContext's mutation score from 60.25% to 86.96%, covering pixel offsets, the "Paste previous stack" rebind, and exact notification text. | **Merged** |
| **[PR #8156](https://github.com/sugarlabs/musicblocks/pull/8156)** | VolumeActions Mutation Coverage | js/turtleactions/__tests__/VolumeActions.test.js | Raised VolumeActions' mutation score from 78.43% to 96.57%, covering doCrescendo/setRelativeVolume dispatch and crescendo volume restoration. | **Merged** |
| **[PR #8157](https://github.com/sugarlabs/musicblocks/pull/8157)** | RhythmActions Mutation Coverage, Second Pass | js/turtleactions/__tests__/RhythmActions.test.js | Raised RhythmActions' mutation score from 72.70% to 94.39%, closing the gaps deferred in week 09's PR #8048 and eliminating all 22 no-coverage mutants. | **Merged** |
| **[PR #8158](https://github.com/sugarlabs/musicblocks/pull/8158)** | IntervalsActions Mutation Coverage, Second Pass | js/turtleactions/__tests__/IntervalsActions.test.js | Raised IntervalsActions' mutation score from 48.55% to 86.35%, closing the gaps deferred in week 09's PR #8045. | **Merged** |
| **[PR #8166](https://github.com/sugarlabs/musicblocks/pull/8166)** | Pitch Block Dispatch Integration Test | js/__tests__/ | Added the first integration test driving a real pitch block through Logo.runFromBlockNow into Singer.PitchActions and Singer.RhythmActions. | **Merged** |
| **[PR #8167](https://github.com/sugarlabs/musicblocks/pull/8167)** | Volume Articulation Dispatch Integration Test | js/__tests__/, js/protoblocks.js | Added an integration test for the articulation block's relative-volume clamp, exposing existing block base classes as static CommonJS properties to make the test possible. | **Merged** |
| **[PR #8172](https://github.com/sugarlabs/musicblocks/pull/8172)** | Scalar Interval Dispatch Integration Test | js/__tests__/interval-scalar-dispatch-integration.test.js | Added an integration test covering the scalar-interval clamp lifecycle through Logo's real end-of-clamp dispatch cleanup. | **Merged** |
| **[PR #8186](https://github.com/sugarlabs/musicblocks/pull/8186)** | Meter Block Dispatch Integration Test | js/__tests__/meter-signature-dispatch-integration.test.js | Added an integration test proving the meter block reaches the real Singer.MeterActions.setMeter() through Logo's parseArg() and flow() path. | **Merged** |
| **[PR #8202](https://github.com/sugarlabs/musicblocks/pull/8202)** | Tone Timbre Dispatch Integration Test | js/__tests__/tone-timbre-dispatch-integration.test.js | Added an integration test covering the setTimbre dispatch lifecycle, including the unrecognized-voice fallback path. | **Merged** |
| **[PR #8245](https://github.com/sugarlabs/musicblocks/pull/8245)** | Ornament and Dict Dispatch Integration Tests | js/__tests__/ | Added two integration tests covering OrnamentActions.doNeighbor's clamp dispatch and DictActions' setdict/getdict read-write cycle. | **Merged** |

*Total changes: **+3,328 additions** and **-37 deletions** across all thirteen pull requests.*

---

## Detailed Breakdown

### Closing Out turtleactions and piemenus Mutation Coverage

#### 1. MeterActions (PR #8138)

* **Changes:** Added coverage for the previously untested `ManagedTimer`/`_timerManager` interval branch, BPM boundary clamps at exactly 30 and 1000, the full time-signature dispatch chain, the drift underflow guard, and arithmetic tests for `getBeatCount`, `getMeasureCount`, and `getWholeNotesPlayed`.
* **Result:** Mutation score rose from 80.95% to 98.02% (247 of 252 mutants killed). The 5 remaining survivors were all classified as environment-specific `module.exports` guards or one equivalent dispatch-guard mutant unreachable because `blockList` is a real Array.

#### 2. OrnamentActions (PR #8142)

* **Changes:** Added tests for the dispatch guard when a block index is defined but missing from `blockList`, the `typeof MusicBlocks === "undefined"` branch, and exact error-message text for invalid staccato and slur values rather than just checking that an error fired.
* **Result:** Mutation score rose from 82.52% to 93.20%, killing 11 previously surviving mutants. The remaining 7 were classified as environment-only `module.exports` guards or equivalent dispatch-guard mutations. Full turtleactions suite: 508/508 passing.

#### 3. DictActions (PR #8144)

* **Changes:** Closed three weak-assertion gaps in `_GetDict`'s pitch-number fallback path — the no-notes fallback now asserts `pitchToNumber` was called with the correct arguments, and a new test exercises a non-zero `pitchNumberOffset` to distinguish subtraction from an addition mutant.
* **Result:** Mutation score rose from 95.43% to 97.14%. The remaining survivors were the environment-only `module.exports` guard and one equivalent `SerializeDict` guard mutant, since `for...in` over `undefined` is a no-op regardless of the guard's truth value.

#### 4. piemenuBlockContext (PR #8145)

* **Changes:** Added exact assertions for context-wheel pixel offsets, the save-eligible block-type list across all label/tooltip/handler call sites, the "Paste previous stack" helper-item rebind, the paste-Y offset, and exact error/notification text.
* **Result:** Mutation score rose from 60.25% to 86.96%. Remaining survivors were concentrated in RequireJS/AMD environment-specific paths — the lazy `HelpWidget` require and the `define`/`module.exports` wrapper — not meaningfully testable under Jest/Node.

#### 5. VolumeActions (PR #8156)

* **Changes:** Added coverage for the `doCrescendo`/`setRelativeVolume` dispatch and mouse-listener branches, crescendo-end volume restoration, `DEFAULTVOICE` and `"custom"` i18n matching in `setSynthVolume`, and `setMasterVolume`'s zero-volume and pop guards.
* **Result:** Mutation score rose from 78.43% to 96.57%. The 5 remaining survivors were environment-only `module.exports` guards or one equivalent, unreachable `setRelativeVolume` branch. No production bug was found. 554 turtleactions tests passing.

#### 6. RhythmActions, Second Pass (PR #8157)

Week 09's RhythmActions PR (#8048) deliberately deferred its remaining listener-closure, arithmetic, and assertion-strengthening survivors to keep that PR focused. This PR closed them.

* **Changes:** Added coverage for the previously untested neighbor-beat validation branch, boundary and arithmetic assertions for beat-scheduling logic, mouse-null and dispatch-guard paths, and the `doTie` `tieCarryOver` replay path.
* **Investigation:** A runtime probe found an existing `neighborArgBeat`/`neighborArgCurrentBeat` array-length desynchronization for oversized neighbor note values, but confirmed it was already addressed upstream in PR #7591, so no duplicate fix was added here.
* **Result:** Mutation score rose from 72.70% to 94.39%, eliminating all 22 no-coverage mutants. Full turtleactions suite: 566 tests passing across 9 files.

#### 7. IntervalsActions, Second Pass (PR #8158)

Week 09's IntervalsActions PR (#8045) targeted only the three highest-concentration methods. This PR returned for the rest of the file.

* **Changes:** Added and strengthened tests for the remaining surviving mutation cases across `IntervalsActions.js`.
* **Result:** Mutation score rose from 48.55% to 86.35%, with killed mutants increasing from 212 to 381 of 447. Of the 23 remaining survivors, 22 were confirmed equivalent through invariant analysis; one low-value `setTemperament` residual was left without a production change. Full repository suite: 213 suites, 7,880 tests passing.

### Real Logo-Interpreter Dispatch Integration Tests

With the turtleactions and piemenus mutation-coverage backlog cleared, this half of the week moved from testing action modules in isolation to testing the dispatch path itself — driving real blocks through `Logo.runFromBlockNow()` rather than calling action methods directly.

#### 8. Pitch Block Dispatch (PR #8166)

* **Changes:** Added the first integration test in this series, driving a `"sol"` pitch block nested inside a `newnote` duration clamp through the real `Logo`, `Singer.PitchActions`, and `Singer.RhythmActions` execution path, verifying the note resolves through the real `musicutils.getNote()` pipeline and reaches `Singer.processNote` exactly once. Only the audio hand-off and an unrelated transposition helper were mocked.
* **Verification:** Full Jest suite: 214/214 suites, 7,958/7,958 tests.

#### 9. Volume Articulation Dispatch (PR #8167)

* **Changes:** Added an integration test for the `articulation` block's relative-volume clamp, driving the real block through `Logo.runFromBlockNow` → `ArticulationBlock.flow` → `Singer.VolumeActions.setRelativeVolume`, and verifying volume rises from `[60]` to `[60, 75]` during the clamp and returns to `[60]` after the real end-of-clamp dispatch cleanup runs.
* **Test Seam:** Required exposing existing block base classes from `protoblocks.js` as static CommonJS properties so Jest could register and exercise the real production block without duplicating its implementation — the only production file touched all week, and only to open the seam, with no runtime behavior change.

#### 10. Scalar Interval Dispatch Lifecycle (PR #8172)

* **Changes:** Added an integration test driving a minimal scalar-interval block descriptor through `Logo.runFromBlockNow()` and the real `Singer.IntervalsActions.setScalarInterval()`, verifying the interval stack transitions `[] → [5] → []` as the clamp opens and Logo's real end-of-clamp cleanup fires.
* **Verification:** Sabotage checks confirmed the test fails if either the interval push or the end-of-clamp dispatch registration is removed. Full suite: 7,967/7,968 passing, with the one `camera.test.js` failure confirmed unrelated and pre-existing.

#### 11. Meter Block Dispatch (PR #8186)

* **Changes:** Added an integration test driving a minimal meter block through `Logo.runFromBlockNow()`, letting the real `parseArg()` path evaluate beats = 6 and note value = 1/8 before executing `flow()` against the real `Singer.MeterActions.setMeter()`, and verifying the resulting turtle-singer state plus a real notation update call.
* **Scope Boundary:** BPM dispatch (`setBPM`/`setMasterBPM`) and beat/measure counting were explicitly flagged as still covered only by unit tests, needing additional shared BPM/`notesPlayed` state setup to bring into this integration style.

#### 12. Tone Timbre Dispatch (PR #8202)

* **Changes:** Added an integration test driving a minimal `settimbre("piano")` clamp through the real `Logo.runFromBlockNow()`, verifying `"piano"` resolves to `"grand-piano"`, that `instrumentNames` and `inSetTimbre` update correctly while the clamp is active, and that the real end-of-clamp dispatch restores both afterward. A second test covers the unrecognized `"kazoo"` voice fallback.
* **Follow-up Candidates:** The PR explicitly names effect-clamp methods (`doVibrato`, `doChorus`, `doPhaser`, `doTremolo`, `doDistortion`, `doHarmonic`) and synth-definition methods (`defFMSynth`, `defAMSynth`, `defDuoSynth`) as remaining candidates for this same integration style.

#### 13. Ornament and Dict Dispatch (PR #8245)

* **Changes:** Added two separate integration tests, kept apart because they exercise different Logo dispatch mechanisms — `ornament-neighbor-dispatch-integration.test.js` covers `Singer.OrnamentActions.doNeighbor`'s clamp entry/exit dispatch and state restoration, while `dict-value-dispatch-integration.test.js` covers `setdict`'s flow-block write and `getdict`'s argument evaluation through `Logo.parseArg`, sharing state through the real `activity.logo.turtleDicts`.
* **Verification:** Full `js/__tests__/` suite: 98 suites, 2,563 tests passing.

---

## Architectural Impact

| Initiative | Status After Week 10 |
| :--- | :--- |
| **turtleactions Mutation Coverage** | Backlog cleared: MeterActions (98.02%), OrnamentActions (93.20%), DictActions (97.14%), VolumeActions (96.57%), plus RhythmActions (94.39%) and IntervalsActions (86.35%) closed out from week 09's deferrals. |
| **piemenus Mutation Coverage** | piemenuBlockContext raised from 60.25% to 86.96%. |
| **Logo-Interpreter Dispatch Integration Tests** | New test category established: 6 pull requests now drive pitch, volume articulation, scalar interval, meter, tone timbre, ornament, and dict blocks through the real `Logo.runFromBlockNow()` path instead of mocking it. |
| **Test Seam Infrastructure** | `protoblocks.js` now exposes block base classes as static CommonJS properties, letting Jest register real production blocks without duplicating their implementation — no runtime behavior change. |

Clearing the turtleactions backlog first, rather than starting the Logo-integration work in parallel, meant every mutation-coverage PR this week could still be measured against a stable, already-scoped Stryker configuration — and it meant the second-pass PRs on RhythmActions and IntervalsActions had a clean, singular focus instead of competing with a second test style in the same file.

---

## Key Learnings

1. **Mutation Coverage Improves Faster on a Second Pass:** RhythmActions and IntervalsActions both made large jumps on their second visit (72.70%→94.39% and 48.55%→86.35%) — deliberately deferring the harder survivors in week 09 rather than forcing them into an already-large PR paid off once revisited with a clean, focused scope.
2. **Testing the Dispatch Seam Catches a Different Class of Bug Than Testing the Action Directly:** Unit tests on `PitchActions.playPitch()` can't catch a broken wiring between `Logo.runFromBlockNow()` and that method — only driving the real interpreter path can, which is exactly the gap the six Logo-integration PRs this week opened.
3. **A Minimal Block Descriptor Keeps an Integration Test Honest About Its Own Boundary:** Several PRs this week used a minimal glue-block descriptor instead of the full DOM-heavy protoblock hierarchy, and each one explicitly documented what that meant it did *not* cover (e.g. `ScalarIntervalBlock.flow()` itself) rather than implying broader coverage than it had.
4. **Opening a Test Seam Doesn't Require Changing Behavior:** Exposing block base classes from `protoblocks.js` as static CommonJS properties in PR #8167 made a previously untestable integration point testable without touching a single runtime code path.
5. **Equivalent-Mutant Classification Stayed Consistent Across the Week:** The same categories — `module.exports` UMD/CommonJS guards and `blockList` undefined-key equivalences — recurred across nearly every mutation-coverage PR this week, reinforcing that these are structural properties of the codebase rather than one-off exceptions worth chasing individually.

---

## Roadmap for Week 11

With the turtleactions and piemenus mutation-coverage backlog cleared and the first Logo-interpreter dispatch integration tests in place, Week 11 moves up a level, from testing individual modules to testing Music Blocks as a whole and to generating tests automatically. I plan to work in three areas:

* **End-to-end Cypress tests:** Cover the main user-facing workflows against the real application rather than mocks: loading a real project (`examples/pi.tb`) and verifying project persistence across a reload; the palette-to-canvas block drag-and-drop workflow; the Phrase Maker and Rhythm Maker widgets; the JavaScript editor and block search; custom mode persistence across reload; MIDI and LilyPond export; and verifying that real notes are dispatched when a loaded project plays back.
* **Tone.js Transport and playback clock:** Add tests for the Tone.js Transport wrapper in the synth layer, verifying the playback clock state, which extends the dispatch-level coverage from this week down to the audio-engine boundary where those tests stop.
* **AST-based test generation infrastructure:** Build a deterministic module test-plan extractor, validate the extracted module plans against the existing utility modules, and use them as the base for test generation infrastructure, so that planning tests for a module no longer starts from a blank file.

---

## Acknowledgements

A special thank you to my mentor and the project maintainer, **Walter Bender**, for his guidance throughout the project and for reviewing and merging the pitch, volume articulation, scalar interval, and meter block dispatch integration tests this week. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
