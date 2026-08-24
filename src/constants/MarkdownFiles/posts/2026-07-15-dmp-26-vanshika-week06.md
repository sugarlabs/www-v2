---
title: "DMP '26 Week 06 Update by Vanshika Pahal"
excerpt: "Week 06: Closing out the activity.js decomposition — extracting the selection, workspace layout, trash, help, block scale, and context menu controllers — plus a look at the C4GT midpoint presentation."
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
**Week:** Closing Out `activity.js` — Selection, Workspace Layout, Trash, Help, Block Scale & Context Menu
**Reporting Period:** 2026-07-09 – 2026-07-15

---

## Overview

Week 05 closed with six self-contained responsibilities still left inside `activity.js`: selection, workspace layout, trash, help, block scale, and context menu. Week 06 worked through every one of them, following the same extract → delegate → cover-with-tests pattern that `ProjectManager` had already proven at scale the week before.

This week I merged **6 pull requests**, changing roughly **5,900 additions and 2,100 deletions**. Every extraction shipped as its own PR — independently reviewable, with a dedicated test suite, and no intended behavior change — and every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 06 at a Glance

| Pull Request | Subsystem Extracted | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7765](https://github.com/sugarlabs/musicblocks/pull/7765)** | Selection Controller | `js/activity/selection-controller.js` | Extracted the 2D drag-selection workflow — selection rectangle rendering, block intersection detection, multi-block copy/delete, and selection mode state. | **Merged** |
| **[PR #7768](https://github.com/sugarlabs/musicblocks/pull/7768)** | Workspace Layout Controller | `js/activity/workspace-layout-controller.js` | Extracted workspace layout and Home button logic, including responsive block repositioning and resize handling. | **Merged** |
| **[PR #7818](https://github.com/sugarlabs/musicblocks/pull/7818)** | Trash Controller | `js/trash-controller.js` | Extracted trash management — restore last/by-ID, trash view rendering, and the trash preview popup. | **Merged** |
| **[PR #7819](https://github.com/sugarlabs/musicblocks/pull/7819)** | Help Controller | `js/help-controller.js` | Extracted the help/about UI, keyboard shortcuts dialog, JS editor launcher, and statistics window launcher. | **Merged** |
| **[PR #7820](https://github.com/sugarlabs/musicblocks/pull/7820)** | Block Scale Controller | `js/block-scale-controller.js` | Extracted larger/smaller block scaling, debounced scale updates, and toolbar button state syncing. | **Merged** |
| **[PR #7821](https://github.com/sugarlabs/musicblocks/pull/7821)** | Context Menu Controller | `js/context-menu-controller.js` | Extracted context menu registration, helpful wheel rendering, and auxiliary toolbar management — the last major chunk of UI orchestration in `activity.js`. | **Merged** |

*Total changes: **+5,914 additions** and **-2,119 deletions** across all six pull requests.*

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

### 4. Help Controller (PR #7819)

The help/about UI, keyboard shortcuts dialog, JavaScript editor launcher, statistics window launcher, and the developer help-block export utility (Alt+H) moved into `js/help-controller.js`, with the existing public API (`showHelp()`, `showAboutPage()`, `showKeyboardShortcuts()`, `toggleJSWindow()`, `doAnalytics()`, `_saveHelpBlocks()`) preserved on `Activity` so no callers needed changes.

### 5. Block Scale Controller (PR #7820)

Larger/smaller block scaling — debounced scale updates, scale-limit handling, and toolbar button state syncing — moved into `js/block-scale-controller.js`, with `doLargerBlocks()`, `doSmallerBlocks()`, and `setSmallerLargerStatus()` kept as delegation methods so pinch-zoom and Ctrl+wheel integrations required no changes. 26 dedicated unit tests cover debounce timing, scale limits, and toolbar icon state.

### 6. Context Menu Controller (PR #7821)

The largest extraction of the week: context menu registration, helpful wheel rendering and positioning, palette menu construction, and auxiliary toolbar management moved into `js/context-menu-controller.js` — the last major chunk of UI orchestration still living in `activity.js`.

* **Changes:** ~589 lines removed from `activity.js`. `_showHideAuxMenu` was intentionally kept accessible on `Activity` because `project-manager.js` references it externally; a few local helper callbacks (`changeBlockVisibility`, `setScroller`) were promoted to `Activity` methods so the controller could reuse them without changing behavior.
* **Tests Added:** `js/__tests__/context-menu-controller.test.js`, covering menu registration, helpful wheel rendering and deduplication, palette menu creation, auxiliary menu open/close, and helpful search delegation — 192/192 suites and 6,797/6,797 tests passing.

---

## Architectural Impact

All six items on the list left after Week 05 are now done:

| Initiative | Status After Week 06 |
| :--- | :--- |
| **Selection Workflow** | Complete — `SelectionController` owns drag-selection, rectangle rendering, and multi-block operations. |
| **Workspace Layout** | Complete — `WorkspaceLayoutController` owns layout, Home button behavior, and resize handling. |
| **Trash Management** | Complete — `TrashController` owns restore, trash view, and preview popup logic. |
| **Help/About UI** | Complete — `HelpController` owns help, about, shortcuts, and the JS editor/statistics launchers. |
| **Block Scaling** | Complete — `BlockScaleController` owns larger/smaller scaling and toolbar sync. |
| **Context Menus** | Complete — `ContextMenuController` owns menu registration and helpful wheel rendering. |

With all six done, `activity.js` has now been decomposed into 20+ focused, independently testable modules using the same controller/UI pattern throughout — the monolith that started the program at 9,400+ lines is now a coordination layer over dedicated subsystems.

---

## C4GT Midpoint Presentation

This week also marked the **midpoint of the DMP program**, so alongside the controller extractions I put together a midpoint presentation for the C4GT/Sugar Labs review, walking through progress against the three milestones the maintainers set at the start: **`activity.js` refactored**, **`logo.js` refactored**, and **global state reduction**. All three are done — `activity.js` decomposed into 20+ modules, `logo.js` restructured around `LogoDependencies` injection with the 700-line embedded graphics scheduler extracted, and a PubSub layer shipped to start replacing scattered `document.dispatchEvent` calls.

Two slides from that deck:

![Midpoint milestones slide showing activity.js Refactored, logo.js Refactored, and CI Hardened all marked complete, plus Dependencies Modernized and Global State Reduction](/assets/post-assets/dmp26-vanshika/week06-midpoint-milestones.png)

![Final milestone confidence slide listing six reasons — proven pattern, regression protection, hardest risks solved, stable delivery pace, known approach ahead, and mentor-confirmed roadmap — plus remaining work: test coverage, Cypress E2E, Logo edge cases, and build optimization](/assets/post-assets/dmp26-vanshika/week06-final-confidence.png)

The remaining program work is now about breadth rather than structure: pushing test coverage toward 80% statements, adding Cypress E2E scenarios, backfilling Logo interpreter edge cases, and production build optimization — no new architectural unknowns left to resolve.

---

## Key Learnings

1. **A Finished List Is a Good Checkpoint:** Closing all six remaining `activity.js` responsibilities in one week — rather than letting extractions trickle across weeks — made it easy to state progress cleanly against the maintainer's original milestones going into the midpoint review.
2. **Different Subsystems, Same Pattern:** Selection (interaction-heavy), workspace layout (resize/geometry-heavy), trash (lifecycle/state-heavy), help (UI-heavy), block scale (debounce/state-heavy), and context menus (rendering-heavy) are structurally very different, but the same extract → delegate → cover-with-tests recipe worked cleanly on all six — good evidence the pattern generalizes rather than being a fit for one kind of code.
3. **Pre-Existing CI Failures Need to Be Named, Not Just Worked Around:** The `pitchstaircase`/`musickeyboard` regressions on master weren't introduced by this week's work, but leaving them unexplained in a PR would have looked like a new break. Calling them out explicitly, linking the root-cause PRs, and pointing to the fix kept review fast.
4. **Delegation Wrappers Are Cheap Insurance:** Every controller this week kept a thin delegation method on `Activity` for its old public entry points. That one convention is what let six separate extractions land with zero required changes at any external call site.

---

## Roadmap for Week 07

With the `activity.js` decomposition complete, the focus shifts toward the shared layers underneath it — pulling constants and small self-contained utilities out of the remaining large files, and continuing to widen test coverage ahead of the final program push.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all six pull requests this week, and for the detailed midpoint review of the roadmap. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
