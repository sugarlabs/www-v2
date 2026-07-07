---
title: "DMP '26 Week 03 Update by Vanshika Pahal"
excerpt: "Week 03: Splitting the monolith further. Extracting grid rendering, plugin lifecycle & dialog UI, toolbar execution controls, visual toolbar classes, and the full alert subsystem into dedicated, testable modules — the controller/UI split takes shape."
category: "DEVELOPER NEWS"
date: "2026-06-24"
slug: "2026-06-24-dmp-26-vanshika-week03"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week03,modularization"
image: "assets/Images/dmp_c4gt.logo.png"
---
<!-- markdownlint-disable -->
# Week 03 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 — Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Week:** The Controller/UI Split — Rendering, Plugins & Toolbar Decoupled  
**Reporting Period:** 2026-06-18 – 2026-06-24

---

## Overview

Week 2 established the foundation: seven modules extracted from `activity.js`, each responsible for a single self-contained subsystem. Week 3 went deeper, targeting the **architectural boundary between state/logic and rendering/UI**. The pattern that emerged is a deliberate controller/UI split — every subsystem now has a *controller* (pure logic, state transitions, and execution management) and a separate *UI* layer (DOM manipulation, EaselJS drawing, and visual state management).

This week I merged **6 pull requests**, changing **over 6,800 lines of code**. The largest single PR restructured the entire toolbar visual layer, migrating ~2,773 lines of rendering code out of `toolbar.js` into a dedicated `widgets/toolbar-ui.js` while preserving backward compatibility through a thin shim. The week closed with a full alert subsystem split — separating alert state management and visual rendering into two focused modules. Every PR passed all Jest tests and ESLint checks before merging.

---

## Week 03 at a Glance

| Pull Request | Subsystem Extracted | Target File | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7572](https://github.com/sugarlabs/musicblocks/pull/7572)** | Grid Renderer | `js/activity/grid-renderer.js` | Extracted all grid overlay rendering methods. | **Merged** |
| **[PR #7581](https://github.com/sugarlabs/musicblocks/pull/7581)** | Plugin Controller | `js/activity/plugin-controller.js` | Extracted plugin lifecycle management & persistence. | **Merged** |
| **[PR #7584](https://github.com/sugarlabs/musicblocks/pull/7584)** | Plugin Dialog UI | `js/widgets/plugin-dialog.js` | Extracted plugin dialog & file-chooser UI interactions. | **Merged** |
| **[PR #7622](https://github.com/sugarlabs/musicblocks/pull/7622)** | Toolbar Controller | `js/activity/toolbar-controller.js` | Extracted execution state & Logo runtime controls. | **Merged** |
| **[PR #7628](https://github.com/sugarlabs/musicblocks/pull/7628)** | Toolbar UI | `js/widgets/toolbar-ui.js` | Migrated all visual toolbar classes & DOM logic. | **Merged** |
| **[PR #7639](https://github.com/sugarlabs/musicblocks/pull/7639)** | Alert Controller & Renderer | `js/activity/alert-controller.js`, `js/activity/alert-renderer.js` | Extracted alert state management and all visual rendering into two dedicated modules. | **Merged** |

*Total changes: **+6,837 additions** and **-3,836 deletions** across **25 modified files**.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Grid Renderer (PR #7572)

The grid overlay system renders eight distinct coordinate systems onto the Music Blocks canvas — Cartesian, Polar, Treble, Grand, Soprano, Alto, Tenor, Bass — as well as accidental overlays. Previously, the show/hide rendering methods for every one of these overlays lived inside `activity.js`.

* **Changes:** Created `js/activity/grid-renderer.js` and moved all `_showCartesian()`, `_hideCartesian()`, `_showPolar()`, `_hidePolar()`, and all music staff rendering methods into it. A `setupGridRenderer()` helper wires the renderer onto the Activity instance during startup.
* **What Stayed in `activity.js`:** Grid state, bitmap references, `_createGrid()` bitmap-creation helper, and bitmap initialization in `setupDependencies()`. Rendering responsibilities moved; state ownership stayed.
* **Compatibility:** The existing `grid-controller.js` interface remains fully unchanged — it still calls `this.activity._showCartesian()` and `this.activity._hideCartesian()` through the same API surface. `GridRenderer` provides the implementation behind the scenes.
* **Verification:** Confirmed that Cartesian, Polar, all music staff grids, accidental overlays, and dark mode/high-contrast filter behavior produce identical visual output before and after the refactor.

### 2. Plugin Controller (PR #7581)

Plugin lifecycle management was one of the largest remaining mixed-responsibility blocks inside `activity.js`. It handled plugin state initialization, loading from `localStorage`, loading built-in plugins, reading from local files, registering plugin data, and managing persistence and deletion — all interleaved with UI and rendering logic.

* **Changes:** Created `js/activity/plugin-controller.js` housing `PluginController`. The controller manages:
  * Plugin state initialization
  * Loading stored plugins from `localStorage`
  * Loading built-in plugins
  * Loading plugins from user-selected local files
  * Plugin data registration
  * Plugin persistence and removal
* **Activity Integration:** `activity.js` now delegates plugin lifecycle operations to the controller while retaining full UI responsibility — dialogs, menus, toolbar interactions, and user-facing notifications remain in `activity.js`.
* **Loader Updates:** Added a `activity/plugin-controller` RequireJS path alias in `loader.js` and registered the controller as an Activity dependency to preserve initialization order.
* **Tests Added:** Created `js/activity/__tests__/plugin-controller.test.js` with coverage for plugin state initialization, stored plugin loading, built-in plugin loading, local file plugin loading, plugin registration, persistence, and deletion.
* **This is a pure refactor:** No behavioral changes, no UI changes, no startup-order changes, and no plugin compatibility changes were introduced.

### 3. Plugin Dialog UI (PR #7584)

With plugin *lifecycle* logic moved to `PluginController`, the natural next step was isolating the plugin *UI interactions* — the load prompt, file chooser dialog, and file input event listeners that previously cluttered `activity.js`.

* **Changes:** Created `js/widgets/plugin-dialog.js` housing `PluginDialog`. The widget is responsible for:
  * Displaying the plugin load prompt
  * Managing file chooser interactions
  * Attaching file input event listeners
  * Delegating user actions back to Activity via option callbacks
* **Decoupling via Callbacks:** Rather than taking a direct `activity` reference, `PluginDialog` accepts a callbacks object at construction time. This prevents the dialog from importing Activity internals and makes the component independently testable.
* **Architecture After This PR:**

```
PluginDialog       →  Prompt, file chooser, user-triggered plugin actions
PluginController   →  Plugin workflow orchestration, loading state, palette refresh
activity.js        →  FileReader handling, cursor updates, coordination
```

* **Verification:** Confirmed that all plugin workflows — loading built-in plugins, loading from local files, stored plugin restoration, and plugin deletion — remain functionally identical.

### 4. Toolbar Controller (PR #7622)

The toolbar execution controls — Fast Run, Slow Run, Step Run, and Hard Stop — were tightly coupled to Logo runtime internals inside `activity.js`. Extracting them into a focused controller makes execution state independently auditable and testable.

* **Changes:** Created `js/activity/toolbar-controller.js` housing `ToolbarController`. The controller manages:
  * Execution state tracking
  * `runFast()`, `runSlow()`, `runStep()`, `hardStop()` operations
  * Turtle delay configuration for each run mode
  * Logo execution control
  * Run mode transitions
* **Activity Integration:** `_doFastButton()`, `_doSlowButton()`, `_doStepButton()`, and `_doHardStopButton()` in `activity.js` now delegate execution operations to the controller. DOM updates, button styling, widget interactions, and palette interactions remain in `activity.js`.
* **Tests Added:** Created `js/activity/__tests__/toolbar-controller.test.js` covering fast/slow/step execution, hard stop behavior, run state transitions, and controller initialization.

### 5. Toolbar UI (PR #7628)

This was the largest structural change of the week. The visual toolbar had historically lived in `js/toolbar.js`, but that file mixed rendering, DOM manipulation, button highlighting, keyboard focus navigation, icon management, and color logic all in one place. This PR consolidated the entire visual implementation into a dedicated UI module and established clear backward compatibility.

* **Changes:** Created `js/widgets/toolbar-ui.js` containing `ToolbarUI` (renamed from `Toolbar` internally) and `FocusCycleManager`. This module is now the single owner of:
  * Toolbar rendering and DOM interactions
  * Button icon handling and color management
  * Keyboard focus navigation
  * Run/Stop/Step highlighting
* **Three New UI Helpers:** Added `highlightStop(color)`, `resetStop()`, and `dimThenRestoreStop(color)` to centralize stop-button updates that were previously scattered as direct DOM calls across `activity.js`.
* **Backward Compatibility Shim:** `js/toolbar.js` was converted into a thin compatibility shim that explicitly depends on `widgets/toolbar-ui` and re-exports the implementation. This preserves the existing `"activity/toolbar"` RequireJS module path for all downstream consumers without duplicating code or creating load-order issues.
* **Activity Integration:** All direct stop-button DOM manipulation in `activity.js` was replaced with calls to the three new toolbar UI helpers. Execution control remains delegated to `ToolbarController`.
* **Tests:** Updated `js/__tests__/toolbar.test.js` to target the new implementation module directly. Added `js/widgets/__tests__/toolbar-ui.test.js` covering the three new helpers including timer-based behavior using Jest fake timers.

### 6. Alert Controller & Renderer (PR #7639)

The alert and message system in Music Blocks handles two distinct concerns — managing alert lifecycle, timeouts, and queuing on one hand, and rendering text/error messages onto the EaselJS canvas and DOM on the other. Both had been mixed together inline inside `activity.js`. This PR cleanly split that responsibility across two dedicated modules.

* **AlertController (`js/activity/alert-controller.js`):** Owns all alert state and lifecycle logic:
  * `msgTimeoutID`, `errorMsgTimeoutID`, and `messageQueue` state
  * `showText()` and `showError()` — calculate and schedule alert timeouts
  * `clearTextTimeout()` and `clearErrorTimeout()` — cancel active timers
  * `activity.js` now delegates `textMsg()`, `errorMsg()`, and `hideMsgs()` lifecycle management entirely to the controller.

* **AlertRenderer (`js/activity/alert-renderer.js`):** Owns all visual rendering:

  | Previous (inline in `activity.js`) | New (`AlertRenderer`) |
  | :--- | :--- |
  | `_createMsgContainer()` | `AlertRenderer.createMsgContainer()` |
  | `_createErrorContainers()` | `AlertRenderer.createErrorContainers()` |
  | `_makeErrorArtwork()` | `AlertRenderer.makeErrorArtwork()` |
  | `_hideAlertUI()` | `AlertRenderer.hideAlertUI()` |
  | `_hideArrows()` | `AlertRenderer.hideArrows()` |
  | Text alert display logic | `AlertRenderer.showTextMsg()` / `hideTextMsg()` |
  | Error alert display logic | `AlertRenderer.showErrorMsg()` / `hideErrorMsg()` |

* **Activity Integration:** `activity.js` initializes both modules via `setupAlertController(this)` and `setupAlertRenderer(this)`. The existing `AlertController` timeout behavior is fully preserved; `textMsg()` and `errorMsg()` now simply coordinate between the controller (timing) and renderer (display).
* **Loader Updates:** Added RequireJS path and shim configuration for both `activity/alert-controller` and `activity/alert-renderer` in `loader.js`.
* **Tests Added:** Created `js/activity/__tests__/alert-renderer.test.js` covering renderer initialization, text and error alert rendering, DOM updates, alert dismissal behavior, error artwork visibility, and arrow cleanup behavior.
* **This is a pure refactor:** No functional behavior, alert timing, or user-facing display changes were introduced.

---

## Architectural Impact

The controller/UI split that emerged this week establishes a clean, repeatable pattern for the remaining `activity.js` subsystems:

| Layer | Responsibility |
| :--- | :--- |
| **Controller** | State, logic, execution management, pure functions |
| **UI / Widget** | DOM updates, EaselJS drawing, event listeners, visual state |
| **`activity.js`** | Orchestration, startup sequencing, cross-subsystem coordination |

This separation delivers three compounding benefits:

1. **Testability Without JSDOM:** Controller logic — execution state, plugin loading, grid transitions — can now be unit tested with lightweight Jest mocks rather than requiring a full DOM environment.
2. **Faster Code Review:** Reviewers can now reason about a single file's responsibility rather than hunting through 9,400 lines for the relevant logic.
3. **Isolated Bug Surface:** A rendering glitch in the toolbar highlight logic can be traced directly to `toolbar-ui.js` rather than requiring a full `activity.js` bisect.

---

## Key Learnings

1. **Backward Compatibility Through Shims:** When an existing module path is used by many consumers, convert the original file into a thin re-export shim rather than updating every import site. This makes the migration atomic from the consumer's perspective.
2. **Callbacks Over Direct References:** Passing a callbacks object to UI widgets instead of an `activity` reference prevents coupling widgets to Activity internals and makes each widget independently instantiable in tests.
3. **Two-Step Extraction Remains the Safest Path:** For large subsystems, the pattern of "extract first, then decompose" continues to pay off — the first PR proves the dependency graph is correct, and the second PR cleans up the internals.

---

## Roadmap for Week 04

* **Palette Loading:** Create `js/palette/PaletteLoader.js` to decouple UI click events in `activity.js` from palette logic, establishing a clean seam for testing block visibility without simulating toolbar interactions.
* **Search Subsystem:** Extract search indexing logic into a dedicated controller and pull search widget DOM interactions into a separate UI module, continuing the controller/UI split pattern.
* **`logo.js` Dependency Injection:** Following the Singer action extraction precedent, refactor `logo.js` to accept a `LogoDependencies` object (`blockList`, `boxes`, etc.) via explicit parameter injection rather than reading `globalActivity` properties directly — this will collapse the 200+ line mock preamble in `logo.test.js` down to a single clean import.
* **Event Dispatching:** Replace scattered `document.dispatchEvent` calls across core files with a lightweight synchronous PubSub module to reduce JSDOM mocking complexity.

---

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging these substantial architectural changes promptly across the week. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
