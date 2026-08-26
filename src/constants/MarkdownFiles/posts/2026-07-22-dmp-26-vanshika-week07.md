---
title: "DMP '26 Week 07 Update by Vanshika Pahal"
excerpt: "Week 07: Moving past activity.js into blocks.js and the shared utility layer, extracting block constants, connection validation, block dragging, FocusCycleManager, DOM helpers, and browser detection helpers, plus CI and process fixes."
category: "DEVELOPER NEWS"
date: "2026-07-22"
slug: "2026-07-22-dmp-26-vanshika-week07"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week07,modularization"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 07 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** Beyond activity.js: blocks.js and the Shared Utility Layer
**Reporting Period:** 2026-07-16 to 2026-07-22

---

## Overview

Week 06 closed out the activity.js decomposition and pointed at what came next: the shared layers underneath it. Week 07 moved into blocks.js, pulling out constants, connection validation, and block dragging, and into the toolbar and utils layers, extracting FocusCycleManager, DOM helpers, and browser detection helpers. The week also included a couple of process and CI fixes that came up along the way.

This week I merged **9 pull requests**, changing roughly **4,700 additions and 1,720 deletions** across the six main refactors, plus three smaller supporting fixes. Every extraction shipped as its own PR, independently reviewable, with a dedicated test suite and no intended behavior change, and every PR passed the full Jest suite, ESLint, and Prettier before merging.

---

## Week 07 at a Glance

| Pull Request | Subsystem Extracted | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7838](https://github.com/sugarlabs/musicblocks/pull/7838)** | Block Constants | js/block-constants.js | Extracted block-related constants out of blocks.js and replaced remaining magic numbers with named constants. | **Merged** |
| **[PR #7839](https://github.com/sugarlabs/musicblocks/pull/7839)** | Connection Validator | js/connection-validator.js | Extracted ALLOWED_CONNECTIONS and the block connection-type validation logic. | **Merged** |
| **[PR #7840](https://github.com/sugarlabs/musicblocks/pull/7840)** | Block Drag Controller | js/block-drag-controller.js | Extracted dock snapping, drag group calculation, and block/stack movement out of blocks.js. | **Merged** |
| **[PR #7856](https://github.com/sugarlabs/musicblocks/pull/7856)** | Focus Cycle Manager | js/focus-cycle-manager.js | Extracted the FocusCycleManager class out of toolbar-ui.js into its own module. | **Merged** |
| **[PR #7857](https://github.com/sugarlabs/musicblocks/pull/7857)** | DOM Helpers | js/utils/dom-helpers.js | Extracted shared DOM helper utilities out of utils.js. | **Merged** |
| **[PR #7858](https://github.com/sugarlabs/musicblocks/pull/7858)** | Browser Utils | js/utils/browser-utils.js | Extracted browser detection helpers out of utils.js. | **Merged** |

*Total changes across the six extractions: **+4,664 additions** and **-1,720 deletions**.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Block Constants (PR #7838)

blocks.js had accumulated a large set of constants (value markers, block group names, thresholds) mixed directly into the file alongside logic. This PR is the first cut at separating data from behavior in blocks.js.

* **Changes:** Created js/block-constants.js and moved block-related constants out of blocks.js, removing duplicate definitions and replacing remaining magic numbers with named constants where appropriate. All references and imports were updated to use the shared module, and the existing AMD/CommonJS export pattern was preserved.
* **Scope Note:** During review, Walter pointed out that some of the moved constants (like NOTEBLOCKS and PITCHBLOCKS) overlap with the block capability-metadata work happening in parallel, so those specific groups were deliberately kept out of this extraction rather than risk conflicting with that effort.
* **Verification:** Existing Jest suite, ESLint, and Prettier all pass with no functional, public API, or UI changes.

### 2. Connection Validator (PR #7839)

Block docking correctness in Music Blocks depends on ALLOWED_CONNECTIONS and the connection-type check that decides whether one block's dock can accept another. Both lived inline in blocks.js.

* **Changes:** Created js/connection-validator.js housing ConnectionValidator, moving ALLOWED_CONNECTIONS and the internal connection-type check (now exposed as ConnectionValidator.testConnectionType). blocks.js now delegates to it, and the module is registered as a dependency of activity/blocks in the RequireJS shim.
* **Tests Added:** js/__tests__/connection-validator.test.js, covering all 69 allowed connection pairs, invalid combinations, case sensitivity, empty/null/undefined inputs, dock names containing embedded colons, and immutability of ALLOWED_CONNECTIONS.
* **Verification:** All 195 suites and 6,920 tests pass.

### 3. Block Drag Controller (PR #7840)

The largest extraction of the week: dock snapping and connection handling (blockMoved), drag group calculation and caching (findDragGroup, cacheDragGroup, clearCachedDragGroup, _calculateDragGroup), and block and stack movement (moveBlockRelative, moveBlockRelativeBatched, moveStackRelative) all moved out of blocks.js into a dedicated controller.

* **Changes:** Created js/block-drag-controller.js and setupBlockDragController(this), which installs delegation methods on the Blocks instance. Drag-related state (dragGroup, _cachedDragGroup, _dragActiveGroup) stayed on Blocks itself so existing consumers, including block.js, palette.js, trash-controller.js, keyboard-controller.js, and workspace-layout-controller.js, kept working through the same delegated API with no changes required.
* **Deliberate Scope Boundary:** The pointer event handlers (mousedown, pressmove, pressup) were intentionally left in block.js to keep this refactor focused on blocks.js rather than expanding into event wiring.
* **Tests Added:** js/__tests__/block-drag-controller.test.js, covering single- and multi-block drag groups, mouse and touch drag movement, successful dock snapping, incompatible dock rejection, out-of-range docking, and cancelled drag cleanup.
* **Follow-up Fix:** The RhythmBlocks test harness had not been updated for the new setupBlockDragController call and started failing with a ReferenceError. PR #7855 fixed the harness the same day, restoring all 73 tests in that suite.

### 4. Focus Cycle Manager (PR #7856)

toolbar-ui.js carried both the visual toolbar implementation and a separate FocusCycleManager class handling keyboard focus navigation. The two were unrelated enough to split.

* **Changes:** Moved FocusCycleManager into js/focus-cycle-manager.js. toolbar-ui.js now imports it and continues to expose it through the existing export paths, so the toolbar shim and its Jest tests needed no changes beyond the new AMD dependency.
* **Verification:** toolbar-ui.test.js, toolbar.test.js, and activity_toolbar_integration.test.js all pass with no behavior changes.

### 5. DOM Helpers (PR #7857)

utils.js had grown into a catch-all file mixing DOM manipulation helpers with unrelated utility functions.

* **Changes:** Moved the shared DOM helper functions into js/utils/dom-helpers.js. utils.js imports and re-exports them, so existing callers across the codebase needed no changes. The new module is registered in both the RequireJS loader and the Planet build, and works in both browser and Jest/Node environments.

### 6. Browser Utils (PR #7858)

The browser detection helpers living in utils.js (feature detection, user-agent checks) followed the same pattern as the DOM helpers extraction the same day.

* **Changes:** Moved browser utility functions into js/utils/browser-utils.js, re-exported from utils.js, and registered in the RequireJS loader and activity initialization. Existing callers and tests remain unchanged.

---

## Other Changes This Week

A few smaller PRs supported the main refactors and general project health:

* **[PR #7855](https://github.com/sugarlabs/musicblocks/pull/7855)** fixed the RhythmBlocks test harness after the block drag controller extraction (described above).
* **[PR #7862](https://github.com/sugarlabs/musicblocks/pull/7862)** fixed the Lighthouse CI workflow, which was refusing to check out fork PR code under pull_request_target due to GitHub's newer anti pwn-request guard. Switching the job to run as a plain pull_request gives it an unprivileged, read-only context with no secrets, which is all the audit needs, while Lighthouse scores stay available to every PR through the uploaded artifact.
* **[PR #7854](https://github.com/sugarlabs/musicblocks/pull/7854)** updated CONTRIBUTING.md to clarify draft PR etiquette: draft PRs are welcome for sharing progress and getting high-level feedback, while detailed code review is expected once a PR is marked Ready for Review.

---

## Architectural Impact

| Initiative | Status After Week 07 |
| :--- | :--- |
| **Block Constants** | Started: constants extracted from blocks.js, with capability-metadata-overlapping groups intentionally deferred. |
| **Connection Validation** | Complete: ConnectionValidator owns all docking-compatibility logic. |
| **Block Dragging** | Complete: BlockDragController owns drag groups, dock snapping, and block/stack movement. |
| **Toolbar Focus Navigation** | Complete: FocusCycleManager is now an independent module. |
| **Shared DOM Utilities** | Complete: dom-helpers.js owns shared DOM helper functions. |
| **Shared Browser Utilities** | Complete: browser-utils.js owns browser detection helpers. |

blocks.js and utils.js, the two large shared files sitting underneath activity.js, are both meaningfully smaller now, and the same extract, delegate, and cover-with-tests pattern that worked across 20+ activity.js modules held up just as well here.

---

## Key Learnings

1. **Watch for Overlapping Work in Flight:** The block-constants extraction crossed paths with a parallel effort on block capability metadata. Catching that overlap during review, and deliberately excluding the affected constant groups, avoided a conflict rather than creating one after the fact.
2. **Same-Day Extractions Need a Shared Checklist:** Three PRs merged within hours of each other on Jul 20 (FocusCycleManager, DOM helpers, browser utils). Keeping each one to a single, narrowly scoped file made it possible to review and merge all three without them stepping on one another.
3. **A Test Harness Is a Consumer Too:** The RhythmBlocks test harness broke not because of a behavior change, but because it constructed Blocks directly without the new setup call. Extractions that add a required setup step need every direct instantiation site checked, not just production call sites.

---

## Roadmap for Week 08

The next phase of work moves into the widget layer: unifying widget loading, deferring widget DOM creation to init() where it still runs eagerly, and attaching dependency metadata to widget definitions so widgets can declare what they need instead of assuming global state is already in place.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all nine pull requests this week, including catching the block-constants overlap with the capability-metadata work early. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
