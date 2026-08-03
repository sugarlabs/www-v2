---
title: "DMP '26 Week 05 Update by Vanshika Pahal"
excerpt: "Week 05: Extracting the embedded graphics scheduler from Logo, simplifying the Logo constructor via LogoDependencies.fromActivity, an interpreter readability/JSDoc pass, a Grid UI regression fix, backfilling logo.js test coverage, and extracting ProjectManager from activity.js."
category: "DEVELOPER NEWS"
date: "2026-07-14"
slug: "2026-07-14-dmp-26-vanshika-week05"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week05,modularization"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 05 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 — Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Week:** Clearing the `logo.js` Roadmap & Starting the ProjectManager Extraction  
**Reporting Period:** 2026-07-02 – 2026-07-08

---

## Overview

Week 04 closed with a five-item roadmap almost entirely centered on `logo.js`: extract the embedded graphics scheduler, finish the constructor simplification, do a readability/JSDoc pass, fix a Grid UI regression, and backfill test coverage ahead of the scheduler split. Week 05 cleared every one of those items — and then went on to deliver the largest single extraction of the project so far, pulling project loading, saving, import, and session-restore logic out of `activity.js` into a new `ProjectManager` module.

This week I worked on **6 pull requests**, changing roughly **6,300 additions and 3,400 deletions**. The `logo.js` work followed a deliberate sequencing: land test coverage *before* the big extraction so the scheduler split had a safety net underneath it, then do the extraction, then simplify what was left. Every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 05 at a Glance

| Pull Request | Subsystem Extracted | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7705](https://github.com/sugarlabs/musicblocks/pull/7705)** | Embedded Graphics Scheduler | `js/embedded-graphics-scheduler.js`, `js/logo.js` | Extracted the ~700-line `dispatchTurtleSignals()` into a dedicated, independently testable scheduler module. | **Merged** |
| **[PR #7709](https://github.com/sugarlabs/musicblocks/pull/7709)** | Logo Constructor Simplification | `js/logo.js` | Replaced duplicated manual dependency wiring with `LogoDependencies.fromActivity()`; fixed a latent `this`-binding bug along the way. | **Merged** |
| **[PR #7712](https://github.com/sugarlabs/musicblocks/pull/7712)** | Interpreter Readability & JSDoc | `js/logo.js` | Added JSDoc to core interpreter methods, renamed opaque temp variables, simplified nested conditionals. | **Merged** |
| **[PR #7718](https://github.com/sugarlabs/musicblocks/pull/7718)** | Grid UI Regression Fix | `js/activity.js`, `js/activity/grid-controller.js` | Fixed initialization-order bug from the `GridController` extraction that broke the Grid menu; added a canvas-refresh follow-up fix. | **Merged** |
| **[PR #7746](https://github.com/sugarlabs/musicblocks/pull/7746)** | Logo Test Coverage | `js/tests/logo.test.js` | Backfilled coverage for `safePluginExecute()`, `parseArg()`, dispatch-factor thresholds, timer-manager guards, and more. | **Merged** |
| **[PR #7754](https://github.com/sugarlabs/musicblocks/pull/7754)** | Project Manager Extraction | `js/project-manager.js`, `js/activity.js` | Extracted project load/save/import/session-restore/startup logic into a dedicated `ProjectManager` module. | **Merged** |

*Total changes: **+6,259 additions** and **-3,389 deletions** across all six pull requests.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Embedded Graphics Scheduler (PR #7705)

`dispatchTurtleSignals()` had been the largest method in `logo.js` — roughly 700 lines responsible for scheduling and replaying embedded turtle-graphics commands during note playback, entangled with deeply nested helper closures like `__pen`, `__forward`, `__arc`, `__bezier`, and a dozen others.

* **Changes:** Created `js/embedded-graphics-scheduler.js` housing `EmbeddedGraphicsScheduler`, which now owns embedded graphics scheduling, dispatch timing calculations, animation sequencing, timer callback scheduling, graphics replay during note execution, and embedded-graphics completion handling.
* **Logo Integration:** `logo.js` now holds an `EmbeddedGraphicsScheduler` instance and delegates through a lightweight wrapper: `dispatchTurtleSignals()` simply calls `this._graphicsScheduler.schedule(...)`, so no external callers required modification.
* **Tests Added:** `js/__tests__/embedded-graphics-scheduler.test.js`, covering graphics scheduling, dispatch ordering, timer scheduling, animation sequencing, embedded-graphics completion, helper method behavior, and async execution. Scheduler-related tests were migrated out of `logo.test.js` into the new dedicated suite.
* **This is a pure refactor:** No intended functional changes — the module boundary was drawn around a distinct subsystem that was already conceptually separate from interpreter execution.

### 2. Logo Constructor Simplification (PR #7709)

This closed out the dependency-injection work from Week 04. The `Logo` constructor still carried two separate code paths that manually mapped `Activity` methods into `this.deps`, duplicating logic that `LogoDependencies` already implemented.

* **Changes:** Removed ~79 lines of duplicated dependency wiring and replaced it with `LogoDependencies.fromActivity()`, while preserving `this.activity = activityOrDeps` for backward-compatible reference equality.
* **Improved Activity Detection:** Simplified constructor detection from multiple property checks down to a single distinguishing condition, `typeof activityOrDeps.errorHandler === "function"`, which more accurately differentiates an `Activity` instance from an explicit dependency object.
* **Bug Fix:** The previous manual dependency builder had a latent bug where the `config` and `callbacks` getters referenced `this.activity` from inside plain object literals — inside that context `this` resolved to the object itself, not the `Logo` instance. Routing through `LogoDependencies.fromActivity()` eliminated the duplicated implementation and the bug with it.
* **Tests:** Updated the minimal `mockActivity` in `logo.test.js` with the required `stage` mock for `LogoDependencies` validation. All 5,655 tests, ESLint, and Prettier passed on a branch rebased against the latest master.

### 3. Interpreter Readability Pass (PR #7712)

`logo.js` remains one of the most complex files in the project, so this PR focused purely on making it easier to read without touching behavior.

* **JSDoc Added:** Comprehensive documentation for `parseArg()` (the 5-step argument resolution flow), `updateNotation()` (the measure-boundary splitting algorithm), `notationMIDI()` (per-turtle MIDI buffering), `runLogoCommands()` (initialization vs. dispatch phases), `runFromBlock()` (step mode vs. delayed scheduling), `runFromBlockNow()` (argument evaluation, block execution, queue continuation), and `safePluginExecute()` (function vs. string plugin handling, with context on the security fix from [#5449](https://github.com/sugarlabs/musicblocks/issues/5449)).
* **Readability Cleanups:** Renamed opaque temporary variables in `updateNotation()` — `d` → `overflowTime`, `d2` → `partialTime`, `b` → `measureDuration` — and added inline comments explaining the backward-traversal logic in `runFromBlockNow()` (clamp-scope detection, traversal boundaries, fallback to normal execution).
* **Local Simplifications:** Removed obsolete commented-out debugging statements and simplified several conditional branches by removing redundant nesting, eliminating empty `else` blocks, inverting guard conditions, and simplifying equivalent boolean checks.
* **No functional changes:** All 168 test suites / 5,655 tests passed unchanged.

### 4. Grid UI Regression Fix (PR #7718)

A regression surfaced from the earlier `GridController` extraction ([#7566](https://github.com/sugarlabs/musicblocks/pull/7566)): the on-screen Grid menu stopped working, while the Print block continued to function normally.

* **Root Cause:** `Turtles` was being constructed *before* `setupGridController()` ran. Since `TurtlesModel` captures `activity._doCartesianPolar` at construction time, `activity.turtles.doGrid` ended up `undefined` because the grid controller hadn't set that property yet.
* **Fix:** Reordered initialization in `js/activity.js` so `setupGridController(this)` runs before `this.turtles = new Turtles(this)`, restoring the expected `activity.turtles.doGrid` wiring. Corrected the JSDoc in `js/activity/grid-controller.js` to document the required initialization order.
* **Follow-Up:** Walter caught a secondary issue in review — the grid element didn't appear immediately after the fix, requiring a canvas refresh to display. A follow-up commit triggers a canvas refresh after the grid state changes, with a regression test covering the case.
* **Tests Added:** `js/tests/turtles.test.js` covering `TurtlesModel` initialization and `doGrid` wiring, plus an `istanbul ignore` annotation on a browser-only line in the `Turtles` constructor that isn't reachable under Jest. All 168 suites / 5,658 tests passed.

### 5. Logo Test Coverage (PR #7746)

Ahead of the scheduler extraction, this PR backfilled coverage for previously untested `logo.js` paths — pure test additions, no production code touched.

* **Coverage Added:** `safePluginExecute()` (success, error recovery, unary/binary/constant math patterns, parameter plugin pattern, arbitrary-code-execution rejection); expanded `parseArg()` coverage (`dectofrac` with null/non-number children, hue block outside the status matrix, `returnValue` with empty/populated stacks, `evalArgDict` dispatch, unknown-block fallback); all `dispatchTurtleSignals()` dispatch-factor threshold branches (`>100`, `>50`, `>25`, `>12.5`, `≤12.5`) plus zero-step-time clamping; timer-manager getter behavior, `clearAll()`, `getStats()`, and `setGuardedTimeout()` under both allow and suppress guard conditions; `doStopTurtles()` delayed-timeout cleanup and debug logging; `runLogoCommands()` plugin execution and listener cleanup; `runFromBlockNow()`'s `MAX_ITERATIONS` guard and `evalFlowDict` dispatch; and constructor/facade compatibility checks.
* **Coverage Improvement (`logo.js`):**

  | Metric | Before | After |
  | :--- | :--- | :--- |
  | Statements | 82.53% | 87.66% |
  | Branches | 68.66% | 72.18% |
  | Functions | 72.13% | 80.32% |
  | Lines | 82.93% | 88.10% |

* **Why First:** Landing this coverage before the scheduler and constructor PRs meant both extractions had a much stronger safety net to catch regressions during the split.

### 6. Project Manager Extraction (PR #7754)

The largest item on the Week 04 roadmap, and the biggest single extraction so far: project loading, saving, import, session restore, and initialization logic moved out of `activity.js` into a new `js/project-manager.js` module.

* **Changes:** Introduced `setupProjectManager(activity)`, which creates a `ProjectManager` instance wired to the activity via dependency injection — no new globals added.
* **What Moved:** Loading-animation lifecycle (`doLoadAnimation`, `stopLoadAnimation`, `showContents`); load orchestration (`_loadStart`, `_loadProject`, `loadStartWrapper`, `justLoadStart`); UI-triggered load/new operations (`doLoad`, `doMergeLoad`, `_afterDelete`, `newProject`); save/export logic (`prepareExport`, `saveLocally`, `__saveLocally`); the runtime entry point `runProject`; the MIDI helper `getClosestStandardNoteValue`; the file-chooser change handler plus `__handleFileSelect` and `__handleDragOver` for drag-and-drop import; startup URL-parameter parsing and initial load, consolidated into `projectManager.start()`; and the `midiImportBlocks` modal.
* **Compatibility:** All extracted functions in `activity.js` were replaced with thin delegate wrappers forwarding to `this.projectManager`, preserving the existing public API with no callers requiring modification. The trash handshake sequencing, session-restore behavior, merge logic, and planet integration were all preserved exactly.
* **Tests:** `activity_startup_recovery.test.js` was updated to exercise `ProjectManager._loadStart`, `runProject`, and `_loadProject` directly from `project-manager.js`; `activity_toolbar_integration.test.js` was updated to mock `setupProjectManager` in the VM sandbox. All 5,902 existing tests passed, with a dedicated unit test suite added for `ProjectManager` and pubsub-based spy assertions later replaced with behavior tests per review feedback.
* **Scale:** ~3,200 lines added, ~1,200 removed, across 6 files — by far the largest extraction of the project to date.

---

## Architectural Impact

Week 05 fully retires the `logo.js`-focused roadmap from Week 04 and kicks off the next phase of `activity.js` decomposition:

| Initiative | Status After Week 05 |
| :--- | :--- |
| **`logo.js` Scheduler Extraction** | Complete — `EmbeddedGraphicsScheduler` owns all embedded graphics animation timing and dispatch. |
| **`logo.js` Dependency Injection** | Complete — constructor now delegates entirely to `LogoDependencies.fromActivity()`, no duplicated wiring left. |
| **`logo.js` Readability** | JSDoc added to every core interpreter method; opaque variable names and dead code removed. |
| **`logo.js` Test Coverage** | Statement coverage up from 82.53% to 87.66%, providing a safety net for the scheduler split. |
| **Grid UI Regression** | Fixed — initialization order restored, canvas refresh follow-up landed. |
| **`activity.js` Decomposition** | `ProjectManager` is the largest extraction yet, establishing the pattern for the remaining `activity.js` responsibilities (selection, workspace layout, trash, help, and more) to follow next. |

With `logo.js` now meaningfully smaller, better documented, and better tested, and with `ProjectManager` proving the extraction pattern scales to the app's highest-risk flows (load/save/session-restore), the remaining `activity.js` decomposition work has a clear, validated template to follow.

---

## Key Learnings

1. **Sequence Extractions Behind Test Coverage:** Landing `logo.js` test-coverage backfill (#7746) before the scheduler extraction (#7705) meant the riskiest refactor of the week had the strongest safety net underneath it — not the other way around.
2. **High-Risk Extractions Need More Than Green CI:** For `ProjectManager`, the automated suite passing wasn't treated as sufficient sign-off on its own, given it touches load, save, and session-restore — the app's highest-risk flows. Preserving exact event sequencing (like the trash handshake) mattered as much as test coverage.
3. **Regressions From Past Extractions Surface Late:** The Grid UI bug from the earlier `GridController` extraction ([#7566](https://github.com/sugarlabs/musicblocks/pull/7566)) only became visible weeks later, and review caught a *second* layer to the same regression (the missing canvas refresh) even after the initialization-order fix — a reminder to add regression tests immediately after any reordering-sensitive extraction, not just functional ones.

---

## Roadmap for Week 06

With `ProjectManager` proving the extraction pattern holds up even for the app's highest-risk flows, next week is about running that same pattern — extract into a dedicated controller, delegate from `activity.js`, cover with behavioral tests — across the remaining self-contained responsibilities still living in `activity.js`:

* **Selection Controller:** Extract the 2D drag-selection workflow — selection rectangle rendering, block intersection detection, multi-block copy/delete, and selection mode state — into a dedicated `SelectionController`.
* **Workspace Layout Controller:** Pull the workspace layout and Home button logic (`findBlocks`, `setHomeContainers`, `repositionBlocks`, resize handling) into a `WorkspaceLayoutController`.
* **Trash Controller:** Move trash management — restoring the last deleted block, restoring by block ID, trash view rendering, and the trash preview popup — into a dedicated `TrashController`.
* **Help Controller:** Extract the help/about UI, keyboard shortcuts dialog, JavaScript editor launcher, and statistics window launcher into a `HelpController`.
* **Block Scale Controller:** Isolate larger/smaller block scaling, debounced scale updates, and toolbar button state syncing into a `BlockScaleController`.
* **Context Menu Controller:** Extract context menu registration and helpful wheel rendering into a `ContextMenuController`, the last major chunk of UI orchestration left in `activity.js`.

Each of these should land as its own PR, same as this week — small, independently reviewable, with a dedicated test suite and no intended behavior change.

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all six pull requests this week, and for catching the follow-up Grid UI rendering issue that would have otherwise shipped as a partial fix. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
