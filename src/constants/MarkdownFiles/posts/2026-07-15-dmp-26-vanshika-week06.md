---
title: "DMP '26 Week 06 Update by Vanshika Pahal"
excerpt: "Week 06: Extracting the selection, workspace layout, and trash controllers from activity.js — continuing the controller/UI pattern established by ProjectManager — plus a look at the C4GT midpoint presentation."
category: "DEVELOPER NEWS"
date: "2026-07-15"
slug: "2026-07-15-dmp-26-vanshika-week06"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week06,modularization,midpoint"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 06 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 — Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Selection, Workspace Layout & Trash — Continuing the `activity.js` Decomposition
**Reporting Period:** 2026-07-09 – 2026-07-15

---

## Overview

Week 05 closed with a six-item roadmap listing every self-contained responsibility still left in `activity.js`: selection, workspace layout, trash, help, block scale, and context menu. Week 06 worked through the first three, following the same extract → delegate → cover-with-tests pattern that `ProjectManager` had already proven at scale.

This week I merged **3 pull requests**, changing roughly **3,160 additions and 1,030 deletions**. Every extraction shipped as its own PR — independently reviewable, with a dedicated test suite, and no intended behavior change — and every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 06 at a Glance

| Pull Request | Subsystem Extracted | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7765](https://github.com/sugarlabs/musicblocks/pull/7765)** | Selection Controller | `js/activity/selection-controller.js` | Extracted the 2D drag-selection workflow — selection rectangle rendering, block intersection detection, multi-block copy/delete, and selection mode state. | **Merged** |
| **[PR #7768](https://github.com/sugarlabs/musicblocks/pull/7768)** | Workspace Layout Controller | `js/activity/workspace-layout-controller.js` | Extracted workspace layout and Home button logic, including responsive block repositioning and resize handling. | **Merged** |
| **[PR #7818](https://github.com/sugarlabs/musicblocks/pull/7818)** | Trash Controller | `js/trash-controller.js` | Extracted trash management — restore last/by-ID, trash view rendering, and the trash preview popup. | **Merged** |

*Total changes: **+3,164 additions** and **-1,027 deletions** across all three pull requests.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Selection Controller (PR #7765)

The 2D drag-selection workflow — draw a rectangle, highlight the blocks inside it, then copy or delete them as a group — was implemented directly inside `activity.js`, mixing mouse event wiring with rectangle geometry and block-intersection logic.

* **Changes:** Created `js/activity/selection-controller.js` housing `SelectionController`, which now owns `_create2Ddrag`, `setupMouseEvents`, `drawSelectionArea`, `selectBlocksInDragArea`, `rectanglesOverlap`, `setSelectionMode`, `deselectSelectedBlocks`, `deleteMultipleBlocks`, `copyMultipleBlocks`, and related state.
* **Behavior Preserved:** The existing delayed selection activation during the first rAF-throttled `mousemove` was kept exactly as-is — a subtle timing detail that was easy to lose during extraction.
* **Tests Added:** `js/activity/__tests__/selection-controller.test.js`, covering selection mode toggling, drag rectangle creation and rendering, overlap detection, multi-block delete/copy, and `requestAnimationFrame` throttling behavior.

### 2. Workspace Layout Controller (PR #7768)

Workspace layout and the Home button — `findBlocks`, `setHomeContainers`, `repositionBlocks`, and resize handling — followed the same controller pattern established by earlier extractions.

* **Changes:** Created `js/activity/workspace-layout-controller.js` housing `WorkspaceLayoutController`, moving row/column layout logic, responsive block repositioning, and the `_isFirstHomeClick` state used to toggle Home button behavior.
* **Regression Caught in Review:** Master was carrying two pre-existing Jest regressions from earlier, unrelated test-coverage PRs (`pitchstaircase.test.js` and `musickeyboard.test.js`); Walter flagged the failing CI and I confirmed both were pre-existing and unrelated before the fix ([#7766](https://github.com/sugarlabs/musicblocks/pull/7766)) landed.
* **Tests Added:** `js/activity/__tests__/workspace-layout-controller.test.js`, covering Home button toggling, row/column layout, responsive repositioning, resize handling, and turtle-home reset with pen-state preservation.

### 3. Trash Controller (PR #7818)

Trash management — restoring the last deleted block, restoring a specific block by ID, trash view rendering, and the trash preview popup — moved into a dedicated controller, delegating from `activity.js` through thin wrapper methods so every existing call site kept working unmodified.

* **Changes:** Created `js/trash-controller.js` with `setupTrashController(activity)`, moving `restoreTrash()`, `restoreLastFromTrash()`, `_restoreTrashById()`, `_renderTrashView()`, popup handling, and click-outside handling.
* **Behavior Preserved:** Restore ordering, companion turtle restoration, action block re-registration/renaming, artwork regeneration, palette updates, and Helpful Wheel integration were all kept exactly as before.
* **Scale:** ~360 lines removed from `activity.js`, ~438-line new module.

---

## Architectural Impact

Three of the six items on the roadmap left after Week 05 are now done:

| Initiative | Status After Week 06 |
| :--- | :--- |
| **Selection Workflow** | Complete — `SelectionController` owns drag-selection, rectangle rendering, and multi-block operations. |
| **Workspace Layout** | Complete — `WorkspaceLayoutController` owns layout, Home button behavior, and resize handling. |
| **Trash Management** | Complete — `TrashController` owns restore, trash view, and preview popup logic. |
| **Help/About UI** | Not started — next up. |
| **Block Scaling** | Not started — next up. |
| **Context Menus** | Not started — largest remaining chunk of UI orchestration in `activity.js`. |

`activity.js` is smaller after each of these three PRs, but the controller/UI pattern is really being validated here more than anything else — three different subsystems (drag interaction, layout/resize, and trash lifecycle), each extracted with zero required changes at any external call site.

---

## C4GT Midpoint Presentation

This week also marked the **midpoint of the DMP program**, so alongside the controller extractions I put together a midpoint presentation for the C4GT/Sugar Labs review, walking through progress against the three milestones the maintainers set at the start: **`activity.js` refactored**, **`logo.js` refactored**, and **global state reduction**. All three are done — `activity.js` decomposed into 20+ modules so far, `logo.js` restructured around `LogoDependencies` injection with the 700-line embedded graphics scheduler extracted, and a PubSub layer shipped to start replacing scattered `document.dispatchEvent` calls.

Two slides from that deck:

![Midpoint milestones slide showing activity.js Refactored, logo.js Refactored, and CI Hardened all marked complete, plus Dependencies Modernized and Global State Reduction](/assets/post-assets/dmp26-vanshika/week06-midpoint-milestones.png)

![Final milestone confidence slide listing six reasons — proven pattern, regression protection, hardest risks solved, stable delivery pace, known approach ahead, and mentor-confirmed roadmap — plus remaining work: test coverage, Cypress E2E, Logo edge cases, and build optimization](/assets/post-assets/dmp26-vanshika/week06-final-confidence.png)

The remaining program work is now about breadth rather than structure: finishing the last three `activity.js` controllers, pushing test coverage toward 80% statements, adding Cypress E2E scenarios, backfilling Logo interpreter edge cases, and production build optimization.

---

## Key Learnings

1. **Different Subsystems, Same Pattern:** Selection (interaction-heavy), workspace layout (resize/geometry-heavy), and trash (lifecycle/state-heavy) are structurally very different, but the same extract → delegate → cover-with-tests recipe worked cleanly on all three — good evidence the pattern generalizes rather than being a fit for one kind of code.
2. **Pre-Existing CI Failures Need to Be Named, Not Just Worked Around:** The `pitchstaircase`/`musickeyboard` regressions on master weren't introduced by this week's work, but leaving them unexplained in a PR would have looked like a new break. Calling them out explicitly, linking the root-cause PRs, and pointing to the fix kept review fast.
3. **Delegation Wrappers Are Cheap Insurance:** Every controller this week kept a thin delegation method on `Activity` for its old public entry points. That's what let three separate extractions land with zero required changes at any external call site.

---

## Roadmap for Week 07

* **Help Controller:** Extract the help/about UI, keyboard shortcuts dialog, JavaScript editor launcher, and statistics window launcher into a `HelpController`.
* **Block Scale Controller:** Isolate larger/smaller block scaling, debounced scale updates, and toolbar button state syncing into a `BlockScaleController`.
* **Context Menu Controller:** Extract context menu registration and helpful wheel rendering into a `ContextMenuController` — the last major chunk of UI orchestration left in `activity.js`.

Closing these three finishes the roadmap set at the end of Week 05 and completes the `activity.js` decomposition.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all three pull requests this week, and for the detailed midpoint review of the roadmap. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
