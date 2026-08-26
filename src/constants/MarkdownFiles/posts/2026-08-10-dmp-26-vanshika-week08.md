---
title: "DMP '26 Week 08 Update by Vanshika Pahal"
excerpt: "Week 08: Building out the widget dependency metadata architecture and loading unification, fixing two Phrase Maker bugs, and resolving an Electron rebuild dependency mismatch."
category: "DEVELOPER NEWS"
date: "2026-08-10"
slug: "2026-08-10-dmp-26-vanshika-week08"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week08,widgets,dependencies"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 08 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Widget Dependency Metadata, Loading Unification, and Two Phrase Maker Fixes
**Reporting Period:** 2026-07-23 to 2026-08-10

---

## Overview

Week 07 closed by pointing at the widget layer: unifying widget loading, deferring widget DOM creation, and attaching dependency metadata to widget definitions. Week 08 carried out that whole plan. Dependency metadata went in first, then the widget loading path was unified on top of it, then two smaller widget lifecycle issues that turned up during that work got fixed, and the week closed with a Phrase Maker cleanup pass and an Electron packaging dependency fix.

This week I merged **9 pull requests**, changing roughly **2,220 additions and 450 deletions**. Every extraction and fix shipped as its own PR, independently reviewable, with a dedicated test suite, and every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 08 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7919](https://github.com/sugarlabs/musicblocks/pull/7919)** | Dependency Metadata, Proof of Concept | js/widgets/phrasemaker.js | Attached a static dependencies field to PhraseMaker, following the same definition-attached pattern used by ProtoBlock capability metadata. | **Merged** |
| **[PR #7920](https://github.com/sugarlabs/musicblocks/pull/7920)** | Dependency Metadata, Full Rollout | js/WidgetBlocks.js and 17 widget files | Updated WidgetBlocks.js to read dependencies from each widget's metadata instead of hardcoded arrays, and migrated every remaining lazy-loaded widget to declare its own dependencies. | **Merged** |
| **[PR #7927](https://github.com/sugarlabs/musicblocks/pull/7927)** | Phrase Maker Stale Matrix Fix | js/widgets/phrasemaker.js | Fixed Phrase Maker rows not refreshing when a tracked pitch block's value changed from its own pie menu. | **Merged** |
| **[PR #7928](https://github.com/sugarlabs/musicblocks/pull/7928)** | Unified Widget Loading | js/WidgetBlocks.js and widget files | Introduced a shared lazy-loading helper and migrated three widgets off duplicated loading code. | **Merged** |
| **[PR #7932](https://github.com/sugarlabs/musicblocks/pull/7932)** | Duplicate Init Fix | Status and Reflection blocks | Removed a redundant init() call that ran widget initialization twice in a single execution. | **Merged** |
| **[PR #7933](https://github.com/sugarlabs/musicblocks/pull/7933)** | Deferred Widget DOM Creation | js/widgets/temperament.js | Moved TemperamentWidget's DOM element creation out of the constructor and into init(activity). | **Merged** |
| **[PR #7971](https://github.com/sugarlabs/musicblocks/pull/7971)** | Phrase Maker Cleanup | js/widgets/phrasemaker.js | Fixed an isInitial typo, removed a dead field, and deduplicated a repeated helper inside _save(). | **Merged** |
| **[PR #7973](https://github.com/sugarlabs/musicblocks/pull/7973)** | Electron Rebuild Node Engine Fix | package.json, package-lock.json | Pinned the electron rebuild dependency to a version compatible with Node 20. | **Merged** |
| **[PR #8012](https://github.com/sugarlabs/musicblocks/pull/8012)** | Dependency Override Docs | Docs/DEPENDENCY_OVERRIDES.md | Documented why the electron rebuild override exists and when to revisit it. | **Merged** |

*Total changes: **+2,220 additions** and **-450 deletions** across all nine pull requests.*

---

## Detailed Breakdown

### Widget Loading and Dependency Metadata

#### 1. Dependency Metadata, Proof of Concept (PR #7919)

Widget dependency lists had historically been defined separately from the widget implementation itself, in WidgetBlocks.js, which meant every change to a widget's dependencies required updates in two places. This PR is a small, deliberately narrow proof of concept for fixing that.

* **Changes:** Added a static dependencies array to PhraseMaker containing its AMD module IDs, following the same definition-attached approach already used by ProtoBlock capability metadata. The existing _ensureWidget() loading logic was left completely unchanged, and the dependency array already present in WidgetBlocks.js was intentionally left in place too, so runtime behavior did not change at all in this PR.
* **Tests Added:** Verified that the dependencies metadata contains the expected module IDs, and that it is a static class property rather than something copied onto individual widget instances.
* **Verification:** phrasemaker.test.js (71/71 passing) and the WidgetBlocks tests (29/29 passing) both pass unchanged.

#### 2. Dependency Metadata, Full Rollout (PR #7920)

With the pattern proven on PhraseMaker, this PR rolled it out to every other lazy-loaded widget and switched the loader itself over to read from metadata.

* **Changes:** Removed the hardcoded dependency arrays from WidgetBlocks.js and updated it to read each widget's dependencies from its own metadata instead, making the widget definition the single source of truth. _ensureWidget() and _lazyRequire() themselves were kept unchanged; only where the dependency list comes from changed.
* **Widgets Migrated:** TemperamentWidget, SampleWidget, TimbreWidget, MeterWidget, Oscilloscope, ModeWidget, Tempo, Arpeggio, PitchDrumMatrix, PitchSlider, MusicKeyboard, PitchStaircase, RhythmRuler, AIWidget, ReflectionMatrix, LegoWidget, and AIDebuggerWidget, plus the PhraseMaker call site switching over to the metadata added in PR #7919.
* **Verification:** Full Jest suite passing at 203/203 suites and 7,150 tests, with the existing WidgetBlocks tests passing without any modification.

#### 3. Unified Widget Loading (PR #7928)

With every widget now declaring its own dependencies, the next step was standardizing how listener-deferred widgets actually load them, since several widgets duplicated the same inline loading block.

* **Changes:** Introduced a shared _lazyLoadWidget() helper for listener-deferred widget loading, and migrated MeterWidget, Oscilloscope, and ModeWidget from duplicated _lazyRequire() blocks over to it. Updated js/widgets/README.md to document the supported widget loading patterns.
* **Deliberate Scope Boundary:** This PR intentionally only touches the 18 widgets that already expose dependency metadata. StatusMatrix, HelpWidget, JSEditor, StatsWindow, PluginDialog, and TunerDisplay are not part of the current WidgetBlocks lazy-loading architecture and were left out rather than expanding scope to bring them in. AIWidget's listener-based loading was also left unchanged, since it reflects a separate behavioral issue rather than loading-path duplication.
* **Verification:** Full Jest widget and WidgetBlocks test suite passes, with updated tests verifying the new shared helper.

#### 4. Duplicate Init Fix (PR #7932)

An audit of the widget initialization lifecycle, prompted by the loading unification work, turned up two widgets calling init() twice in a single execution.

* **Root Cause:** StatusMatrix and ReflectionMatrix both called init() directly from flow() and again from the registered turtle listener, unlike every other _ensureWidget()-based widget, which only initializes once.
* **Changes:** Removed the redundant init() call from both StatusBlock.flow() and ReflectionBlock.flow(), keeping initialization in the turtle listener to match the pattern used by other widget blocks, and removed a now-unused field-preparation block that only existed to support the deleted call.
* **Tests Added:** Verified init() is not called before the listener executes and is called exactly once, alongside updated StatusBlock tests and new ReflectionBlock initialization tests.
* **Verification:** Full Jest suite passing at 204/204 suites and 7,226/7,226 tests.

#### 5. Deferred Widget DOM Creation (PR #7933)

The widget lifecycle audit found one more small, low-risk cleanup: TemperamentWidget's constructor was eagerly creating a detached DOM element that was only actually used after init(activity) ran.

* **Changes:** Moved creation of temperamentTableDiv out of the constructor and into init(activity), so the constructor is now responsible only for state initialization, matching the constructor and init(activity) separation already used by most other widgets.
* **Verification:** temperament.test.js (54/54 passing), the full widget suite (29 suites, 1,459 tests), and the full Jest suite (204 suites, 7,224 tests) all pass, since every production code path already initializes the widget through init(activity) before anything that depends on the DOM element runs.

### Phrase Maker Fixes

#### 6. Stale Matrix Refresh (PR #7927)

Phrase Maker rows are a snapshot captured when the matrix flow block runs, and rowLabels and rowArgs are never re-derived afterward. Changing a pitch block's value from its own canvas pie menu committed the new value to the block but never notified an already-open Phrase Maker, so the matrix kept showing the stale pitch.

* **Root Cause:** Phrase Maker already had a row-scoped redraw for exactly this situation inside its own internal pitch pie menu handler, which resolves a note and repaints just that row's header and label cells. That logic simply was not reachable from the block's own canvas pie menu.
* **Changes:** Factored the existing redraw logic out into a shared _repaintRowCells() method, and added a new PhraseMaker.refreshRowForBlock() that the canvas pie menu's exit handler now calls when the edited block is a tracked row. This follows the existing refresh pattern already used elsewhere in PhraseMaker rather than introducing a new redraw mechanism, and it does not rebuild the whole matrix.
* **Guardrails:** refreshRowForBlock() no-ops unless the widget is currently open and the block is one of its tracked rows, so no other widget or block type is affected.

#### 7. Phrase Maker Cleanup (PR #7971)

A maintenance pass over phrasemaker.js turned up a real initialization bug alongside dead code and duplication.

* **isInitial Typo:** this.isInitial was set in the constructor, but init() was updating this.inInitial instead, a one-character typo. As a result, the first-time onboarding message and sendToCenter() ran on every initialization instead of only the first. The assignment now correctly updates this.isInitial.
* **Dead Field Removed:** The unused notesBlockMap constructor property was removed after confirming it had no references anywhere else in the repository.
* **Deduplication:** The repeated lastConnection calculation inside _save() was extracted into a shared helper, eliminating six identical code blocks that differed only by connection offset, with no change in behavior.
* **Tests Added:** Regression tests confirming _save() produces identical connection structures before and after the refactor for every affected block type, and confirming the onboarding message now shows only once.

### Dependency and Build Fixes

#### 8. Electron Rebuild Node Engine Fix (PR #7973)

electron-builder pulls in @electron/rebuild transitively, and version 4.0.4 requires Node.js 22.12.0 or newer, which produced an EBADENGINE warning on the project's supported Node 20.

* **Changes:** Added an npm override pinning @electron/rebuild to 3.7.2, a version compatible with Node 20 that also resolves node-abi to a compatible 3.94.0, rather than raising the project's Node.js floor. The lockfile change was audited to confirm all 78 added and 13 removed packages belong exclusively to the two rebuild dependency trees, with no unrelated churn.
* **Verification:** npm ci completes on Node 20.20.2 with no EBADENGINE warnings, and the full Jest suite (205/205 suites, 7,287/7,287 tests) passes. The existing Electron packaging failure reproduces independently on both Node 20 and Node 22 and was confirmed out of scope for this fix.

#### 9. Dependency Override Docs (PR #8012)

A follow-up to document the reasoning behind the override so it does not look like an unexplained pin later.

* **Changes:** Added Docs/DEPENDENCY_OVERRIDES.md explaining why @electron/rebuild is pinned to 3.7.2, linking back to PR #7973, and stating explicitly when the override should be revisited: once Music Blocks intentionally raises its minimum supported Node.js version to 22.12.0 or newer.

---

## Architectural Impact

| Initiative | Status After Week 08 |
| :--- | :--- |
| **Widget Dependency Metadata** | Complete: every lazy-loaded widget declares its own dependencies, and WidgetBlocks.js reads from that instead of a hardcoded list. |
| **Widget Loading Unification** | Started: 18 widgets share a common lazy-loading helper; six widgets outside the current architecture remain intentionally out of scope. |
| **Widget Lifecycle Cleanup** | Two issues fixed: duplicate initialization in Status and Reflection blocks, and eager DOM creation in TemperamentWidget's constructor. |
| **Phrase Maker Correctness** | Two bugs fixed: stale matrix rows after canvas pie menu edits, and the isInitial typo that repeated the onboarding flow. |
| **Build Dependency Health** | Electron rebuild Node engine mismatch resolved and documented for future maintainers. |

The dependency metadata rollout turned out to be the foundation everything else in the week built on. Once widget definitions became the single source of truth for their own dependencies, unifying the loading path and auditing the initialization lifecycle for duplicate or misplaced work became a much smaller, safer step.

---

## Key Learnings

1. **Prove the Pattern Small Before Rolling It Out Wide:** Attaching metadata to a single widget first, without touching the loader at all, made it possible to validate the approach with almost no risk before migrating all 17 remaining widgets and then unifying the loading path itself.
2. **An Audit Finds More Than It Sets Out to Find:** The widget lifecycle audit was aimed at loading duplication, but it also caught two unrelated issues, the duplicate init() calls and TemperamentWidget's eager DOM creation, that were worth fixing while already in that code.
3. **Scope Boundaries Are Worth Writing Down:** PR #7928 explicitly lists the six widgets it does not touch and why. That made it easy for reviewers to confirm the PR was not silently skipping something, rather than having to check for themselves.
4. **A Dependency Override Needs a Reason Attached:** Pinning a package version without documentation just becomes a mystery the next person has to re-investigate. Writing down why the override exists and when to revisit it, in the same week it was added, keeps that knowledge from getting lost.

---

## Roadmap for Week 09

The next goals are to build out mutation testing infrastructure with Stryker and use it to improve mutation coverage across the turtle actions modules, ToneActions, PitchActions, RhythmActions, and IntervalsActions, and to extract piemenuBlockContext out into its own module.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all nine pull requests this week. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
