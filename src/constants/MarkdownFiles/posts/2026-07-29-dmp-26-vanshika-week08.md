---
title: "DMP '26 Week 08 Update by Vanshika Pahal"
excerpt: "Week 08: Starting the widget dependency metadata architecture, attaching and then consuming dependency metadata across every lazy-loaded widget, plus a Phrase Maker bug fix for stale matrix rows."
category: "DEVELOPER NEWS"
date: "2026-07-29"
slug: "2026-07-29-dmp-26-vanshika-week08"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week08,widgets"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 08 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Widget Dependency Metadata Begins
**Reporting Period:** 2026-07-23 to 2026-07-29

---

## Overview

Week 07 closed by pointing at the widget layer: unifying widget loading, deferring widget DOM creation, and attaching dependency metadata to widget definitions. Week 08 opened that work, starting with the metadata piece, since it is the smallest, most backward-compatible slice and the one everything else can build on.

This week I merged **3 pull requests**, changing roughly **700 additions and 155 deletions**. Two PRs introduced and then rolled out a dependency metadata pattern for widgets, and one fixed a Phrase Maker bug that surfaced during that work. Every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 08 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7919](https://github.com/sugarlabs/musicblocks/pull/7919)** | Dependency Metadata, Proof of Concept | js/widgets/phrasemaker.js | Attached a static dependencies field to PhraseMaker, following the same definition-attached pattern used by ProtoBlock capability metadata. | **Merged** |
| **[PR #7920](https://github.com/sugarlabs/musicblocks/pull/7920)** | Dependency Metadata, Full Rollout | js/WidgetBlocks.js and 17 widget files | Updated WidgetBlocks.js to read dependencies from each widget's metadata instead of hardcoded arrays, and migrated every remaining lazy-loaded widget to declare its own dependencies. | **Merged** |
| **[PR #7927](https://github.com/sugarlabs/musicblocks/pull/7927)** | Phrase Maker Stale Matrix Fix | js/widgets/phrasemaker.js | Fixed Phrase Maker rows not refreshing when a tracked pitch block's value changed from its own pie menu. | **Merged** |

*Total changes: **+699 additions** and **-157 deletions** across all three pull requests.*

---

## Detailed Breakdown

### 1. Dependency Metadata, Proof of Concept (PR #7919)

Widget dependency lists have historically been defined separately from the widget implementation itself, in WidgetBlocks.js, which meant every change to a widget's dependencies required updates in two places. This PR is a small, deliberately narrow proof of concept for fixing that.

* **Changes:** Added a static dependencies array to PhraseMaker containing its AMD module IDs, following the same definition-attached approach already used by ProtoBlock capability metadata. The existing _ensureWidget() loading logic was left completely unchanged, and the dependency array already present in WidgetBlocks.js was intentionally left in place too, so runtime behavior did not change at all in this PR.
* **Tests Added:** Verified that the dependencies metadata contains the expected module IDs, and that it is a static class property rather than something copied onto individual widget instances.
* **Verification:** phrasemaker.test.js (71/71 passing) and the WidgetBlocks tests (29/29 passing) both pass unchanged.
* **Deliberate Scope Boundary:** This PR intentionally does not touch widget loading. It exists purely to prove the metadata pattern works before rolling it out further.

### 2. Dependency Metadata, Full Rollout (PR #7920)

With the pattern proven on PhraseMaker, this PR rolled it out to every other lazy-loaded widget and switched the loader itself over to read from metadata.

* **Changes:** Removed the hardcoded dependency arrays from WidgetBlocks.js and updated it to read each widget's dependencies from its own metadata instead, making the widget definition the single source of truth. _ensureWidget() and _lazyRequire() themselves were kept unchanged; only where the dependency list comes from changed.
* **Widgets Migrated:** TemperamentWidget, SampleWidget, TimbreWidget, MeterWidget, Oscilloscope, ModeWidget, Tempo, Arpeggio, PitchDrumMatrix, PitchSlider, MusicKeyboard, PitchStaircase, RhythmRuler, AIWidget, ReflectionMatrix, LegoWidget, and AIDebuggerWidget, plus the PhraseMaker call site switching over to the metadata added in PR #7919.
* **Verification:** Full Jest suite passing at 203/203 suites and 7,150 tests, with the existing WidgetBlocks tests passing without any modification.
* **Notes:** This PR intentionally does not redesign widget loading or introduce a dependency registry. It is an incremental step that removes duplication while keeping runtime behavior identical, setting up the widget loading unification planned for the following week.

### 3. Phrase Maker Stale Matrix Fix (PR #7927)

Phrase Maker rows are a snapshot captured when the matrix flow block runs, and rowLabels and rowArgs are never re-derived afterward. Changing a pitch block's value from its own canvas pie menu committed the new value to the block but never notified an already-open Phrase Maker, so the matrix kept showing the stale pitch.

* **Root Cause:** Phrase Maker already had a row-scoped redraw for exactly this situation inside its own internal pitch pie menu handler, which resolves a note and repaints just that row's header and label cells. That logic simply was not reachable from the block's own canvas pie menu.
* **Changes:** Factored the existing redraw logic out into a shared _repaintRowCells() method, and added a new PhraseMaker.refreshRowForBlock() that the canvas pie menu's exit handler now calls when the edited block is a tracked row. This follows the existing refresh pattern already used elsewhere in PhraseMaker rather than introducing a new redraw mechanism, and it does not rebuild the whole matrix.
* **Guardrails:** refreshRowForBlock() no-ops unless the widget is currently open and the block is one of its tracked rows, so no other widget or block type is affected by the change.

---

## Architectural Impact

| Initiative | Status After Week 08 |
| :--- | :--- |
| **Widget Dependency Metadata** | Complete: every lazy-loaded widget now declares its own dependencies, and WidgetBlocks.js reads from that instead of a hardcoded list. |
| **Widget Loading Unification** | Not started: the metadata groundwork from this week is what the unification work will build on. |
| **Deferred Widget DOM Creation** | Not started. |

The dependency metadata rollout is a quiet but foundational change. It does not alter behavior on its own, but it removes the last structural reason widget loading logic and widget definitions had to stay in sync by hand, which is what makes the next round of widget loading changes safe to make quickly.

---

## Key Learnings

1. **Prove the Pattern Small Before Rolling It Out Wide:** Attaching metadata to a single widget first, without touching the loader at all, made it possible to validate the approach with almost no risk before migrating all 17 remaining widgets in the follow-up PR.
2. **A Bug Fix Can Surface Mid-Refactor:** The Phrase Maker stale matrix issue was not something this week set out to fix. It came up while working through the widget layer and got a properly scoped fix, reusing an existing redraw path rather than adding a new one, instead of being deferred.
3. **Guard New Entry Points Narrowly:** refreshRowForBlock() checks both that the widget is open and that the specific block is a tracked row before doing anything. That two-part guard is what keeps a new cross-widget notification path from having any effect on unrelated widgets or block types.

---

## Roadmap for Week 09

The next goals are to build out mutation testing infrastructure with Stryker and use it to improve mutation coverage across the turtle actions modules, ToneActions, PitchActions, RhythmActions, and IntervalsActions, and to extract piemenuBlockContext out into its own module.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all three pull requests this week. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
