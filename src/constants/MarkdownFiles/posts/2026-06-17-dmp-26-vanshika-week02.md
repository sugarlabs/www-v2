---
title: "DMP '26 Week 02 Update by Vanshika Pahal"
excerpt: "Week 02: Taming the monolith. A systematic modularization of activity.js, extracting the canvas recorder, SVG/PNG exporters, ABC parser, inactivity watcher, and grid control systems into focused AMD modules."
category: "DEVELOPER NEWS"
date: "2026-06-17"
slug: "2026-06-17-dmp-26-vanshika-week02"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week02,modularization"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 — Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Week:** The Great Modularization Campaign & Subsystem Decoupling  
**Reporting Period:** 2026-06-11 – 2026-06-17

---

## Overview

In my Week 1 analysis, I established a clear baseline: **the primary bottleneck to expanding test coverage and performing safe dependency updates in Music Blocks v3 is the tight coupling in the core class `activity.js`**. Clocking in at over 9,400 lines, this single file handled everything from canvas rendering and event orchestration to export pipelines, file formatting, UI throttling, and notation parsing. 

This week, I moved from planning into massive execution. The goal was to systematically deconstruct `activity.js` by extracting self-contained subsystems into dedicated AMD (RequireJS) modules. By keeping public APIs, browser initialization paths, and rendering flows intact, we ensured **zero regression** in user-facing behavior, while significantly reducing cognitive load and laying down a clean, mock-free surface for new tests.

Over the course of the week, I successfully merged **7 pull requests**, changing **over 2,500 lines of code**, introducing dedicated test suites, and resolving a long-standing triplet state leakage bug in the music parser.

---

## The Great Modularization at a Glance

Here is a summary of the architectural changes implemented this week:

| Pull Request | Subsystem Extracted | Target File | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7503](https://github.com/sugarlabs/musicblocks/pull/7503)** | Canvas Recording System | `js/activity/recorder.js` | Extracted recording lifecycle helpers. | **Merged** |
| **[PR #7508](https://github.com/sugarlabs/musicblocks/pull/7508)** | SVG & PNG Exporters | `js/activity/exporters.js` | Extracted image-rendering & save logic. | **Merged** |
| **[PR #7509](https://github.com/sugarlabs/musicblocks/pull/7509)** | Exporter Cleanups | `js/activity/exporters.js` | Refactored export pattern & loader paths. | **Merged** |
| **[PR #7511](https://github.com/sugarlabs/musicblocks/pull/7511)** | ABC Notation Parser | `js/activity/abc-parser.js` | Extracted parser system, added test suite. | **Merged** |
| **[PR #7524](https://github.com/sugarlabs/musicblocks/pull/7524)** | ABC Parser Decomposition | `js/activity/abc-parser.js` | Decomposed monolithic logic into helpers. | **Merged** |
| **[PR #7562](https://github.com/sugarlabs/musicblocks/pull/7562)** | Idle Watcher & Autosave | `js/activity/idle-watcher.js` | Extracted inactivity listener & save interval. | **Merged** |
| **[PR #7566](https://github.com/sugarlabs/musicblocks/pull/7566)** | Grid Controller | `js/activity/grid-controller.js` | Decoupled coordinate transitions & visibility. | **Merged** |

*Total changes: **+2,814 additions** and **-1,830 deletions** across **15 modified files**, with Jest tests increasing from **5,449 to 5,501**.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Canvas Recording System (PR #7503)

The recording system is a self-contained feature that captures turtle movements on the canvas and outputs a `.webm` video. Previously, the entirety of this logic sat inline inside the core Activity constructor.

* **Changes:** Extracted ~390 lines into `js/activity/recorder.js`. The new module hosts `setupActivityRecorder` alongside core helpers: `recordScreen`, `recordCanvasOnly`, `recordScreenWithTools`, `saveFile`, `stopRec`, `createRecorder`, and the reactive `recording` state.
* **Compatibility:** Retained the public-facing `this._doRecordButton()` hook in `activity.js` as an entry point.
* **Verification:** Validated that both canvas-only and screen-with-menus recording continue to toggle blinking indicators, capture actions, and download correct `.webm` packages.

### 2. SVG & PNG Block Exporters (PR #7508 & #7509)

The menu action allowing users to save their visual programming blocks as standalone vector images (SVG) or raster files (PNG) is crucial for student documentation. 

* **Changes:** Extracted the core compilation and downloading helpers (`printBlockSVG`, `printBlockPNG`, `extractSVGInner`) into `js/activity/exporters.js`.
* **Refining the RequireJS Architecture:** In the follow-up PR (#7509), I resolved module path problems by registering a clean `"activity/exporters"` RequireJS alias in `loader.js` (rather than a nested `"activity/activity/exporters"` structure) and wrapping the module in a standard AMD `define()` shell to avoid polluting the global `window` namespace.
* **Bug Fix:** Removed a redundant `activeBlock = null` statement in the exporter wrapper that caused state desynchronization without providing utility.

### 3. ABC Music Parser: Extraction & Decomposition (PR #7511 & #7524)

The ABC parser converts standard text-based sheet music notation into structured Music Blocks stacks. This was one of the largest logical branches coupled inside `activity.js`.

* **The Extraction (PR #7511):** Moved the parser pipeline (`_adjustPitch`, `_abcToStandardValue`, `_createPitchBlocks`, `_searchIndexForMusicBlock`, and the orchestrator `parseABC`) into `js/activity/abc-parser.js`.
* **The Decomposition (PR #7524):** The initial extraction left `parseABC` as a large monolithic method. I decomposed it into focused, single-responsibility functions:
  * `_organizeStaffs(lines)`: Pre-organizes input voices.
  * `_buildStartBlock(...)`: Standardizes block-ID generation based on structural output.
  * `_processVoice(...)`: Parses notes, bar elements, and action blocks.
  * `_handleBarElement(...)`, `_processRepeatFromStart(...)`, `_processRepeatMid(...)`, `_processRepeats(...)`: Isolates repeat rewiring workflows.
  * `_finalizeStaffBlocks(...)`: Trims and flattens connections.
* **Highlight - Triplet State Bleed Fix:** Previously, triplet status was held in a single state tracker across the parser. An unclosed triplet in one voice could bleed across boundaries, distorting notes in subsequent voices. The refactor isolates triplet state per voice, correcting this behavior.
* **Tests Added:** Created `js/activity/__tests__/abc-parser.test.js`, adding coverage for single-voice, multi-voice, repeat bounds, triplets, and accidentals.

```javascript
// Example of decomposed flow coordination in parseABC()
parseABC(tune) {
    let staffs = this._organizeStaffs(tune.lines);
    let blockId = this._buildStartBlock(staffs);
    blockId = this._processVoices(staffs, blockId);
    blockId = this._processRepeats(staffs, blockId);
    this._finalizeStaffBlocks(staffs);
}
```

### 4. Activity Idle Watcher & Autosave (PR #7562)

To prevent browser tabs from consuming excessive CPU cycles when left open, Music Blocks uses an inactivity detector that throttles the easel rendering canvas to 1 Frame Per Second (FPS). It also automatically triggers periodic XML backups.

* **Changes:** Created `js/activity/idle-watcher.js` which registers `_initIdleWatcher()`, `_stopIdleWatcher()`, `_initAutoSave()`, and `_stopAutoSave()` methods.
* **Lifecycle Management:** Replaced inline `setInterval` and `clearInterval` event listeners with controlled hooks managed during the Activity construction and destruction lifecycles.
* **Verification:** Monitored the CPU timeline to confirm that leaving the canvas untouched for 5 seconds throttles the frame rate to 1 FPS, and immediately restores to 60 FPS upon pointer interaction.

### 5. Grid Controller (PR #7566)

Music Blocks renders several coordinate overlays (Cartesian, Polar, and standard musical staff lines) to help students map geometric movements. 

* **Changes:** Extracted toggle logic, transition states (Cartesian ↔ Polar), and visibility helpers into `js/activity/grid-controller.js`, linking it via `setupGridController()`.
* **Decoupling Logic from Paint:** Kept performance-critical canvas and EaselJS rendering paths inside `activity.js`, while moving state control, mode checks, and visibility attributes to the controller.
* **Tests Added:** Created `js/activity/__tests__/grid-controller.test.js` validating grid transitions across various modes and ensuring update flags trigger redraws correctly.

---

## Architectural Impact

By extracting these five systems, we have dramatically trimmed the footprint of the primary class and improved developer ergonomics:

1. **Clearer Separation of Concerns:** Core orchestrator files no longer need to know how to construct an SVG string or register media streams.
2. **Simplified Mock Environments:** Developers wanting to write tests for the ABC parser or Grid Controller can now import those modules directly, without instantiating the entire `activity.js` UI tree.
3. **Robust Safety Rails:** By enforcing strict input-output validation on the newly decomposed parser functions, malformed user files trigger clean error states instead of bringing down the entire execution thread.

---

## Key Learnings

1. **Keep AMD Modules Pure:** RequireJS projects require strict management of global contexts. Placing helper modules in self-executing AMD definitions prevents unintended window-level leaks.
2. **Decompose Incrementally:** When refactoring large blocks of legacy logic, the safest path is a two-step approach: first, extract the logic as a whole to prove dependency paths are correct, and then decompose the monolith into smaller functions.
3. **Verify via Automation and Manual Observation:** Unit tests catch regression, but system limits—like video exports or rendering frame rates—require human-in-the-loop validation under real hardware conditions.

---

## Roadmap for Week 03

The modularization of `activity.js` continues with PRs 7–15, each splitting a remaining subsystem into a focused **controller** (logic + state) and a **UI** (DOM + EaselJS drawing) layer. The targets are: grid rendering, plugin lifecycle management + dialog UI, toolbar execution controls + toolbar UI, alert queueing + alert rendering, and search indexing + search widget. In parallel, structural work begins on `logo.js` — auditing its implicit global reads (`Singer`, `Turtle`, `blockList`, `boxes`) and designing a `LogoDependencies` injection interface that will collapse the 200+ line mock preamble in `logo.test.js` down to a single clean import.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing these substantial structural changes and providing swift feedback. I would also like to thank the rest of the Sugar Labs community for their assistance during reviews.
