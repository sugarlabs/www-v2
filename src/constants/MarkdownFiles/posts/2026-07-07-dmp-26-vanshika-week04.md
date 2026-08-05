---
title: "DMP '26 Week 04 Update by Vanshika Pahal"
excerpt: "Week 04: Extracting the search subsystem into a controller and a dedicated UI widget, decoupling palette loading, completing logo.js dependency injection, and shipping a synchronous PubSub module to replace DOM-based internal events."
category: "DEVELOPER NEWS"
date: "2026-07-07"
slug: "2026-07-07-dmp-26-vanshika-week04"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,week04,modularization"
image: "/assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 04 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 — Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Week:** Completing the Roadmap — Search, Palette, Logo DI & PubSub Migration  
**Reporting Period:** 2026-06-25 – 2026-07-01

---

## Overview

Week 03 closed with a four-item roadmap: decouple palette loading, split the search subsystem, finish `logo.js` dependency injection, and introduce a PubSub module to reduce DOM-based event dispatching. Week 04 cleared all four — and then went a step further by using the new PubSub infrastructure for a real migration and following the search extraction all the way through to a dedicated UI widget.

This week I worked on **7 pull requests**, changing **over 7,400 lines of code**. The work followed the same two-step extraction pattern established in previous weeks: pull logic out into a controller first, verify behavior is unchanged, then split UI concerns into their own module once the seam is proven. `SearchController` went through exactly this cycle — extracted from `activity.js` in one PR, then further split into `SearchController` (state/logic) and `SearchUI` (DOM/rendering) in a follow-up. Every PR passed all Jest tests and ESLint checks before merging.

---

## Week 04 at a Glance

| Pull Request | Subsystem Extracted | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #7667](https://github.com/sugarlabs/musicblocks/pull/7667)** | Search Controller | `js/activity/search-controller.js` | Extracted search state, suggestion filtering & helpful-search widget logic. | **Merged** |
| **[PR #7669](https://github.com/sugarlabs/musicblocks/pull/7669)** | Palette Loader | `js/palette/palette-loader.js` | Extracted palette color initialization & regeneration logic. | **Merged** |
| **[PR #7670](https://github.com/sugarlabs/musicblocks/pull/7670)** | Logo Dependency Injection | `js/logo.js` | Extended `LogoDependencies` to remove remaining direct `activity` reads. | **Merged** |
| **[PR #7673](https://github.com/sugarlabs/musicblocks/pull/7673)** | PubSub Infrastructure | `js/pubsub.js` | Introduced a lightweight synchronous publish/subscribe module. | **Merged** |
| **[PR #7679](https://github.com/sugarlabs/musicblocks/pull/7679)** | PubSub Migration | `js/blocks.js`, `js/activity.js` | Migrated `finishedLoading` from `document.dispatchEvent` to PubSub. | **Merged** |
| **[PR #7698](https://github.com/sugarlabs/musicblocks/pull/7698)** | Legacy Cleanup | `js/utils/utils.js`, `js/activity.js` | Removed obsolete Internet Explorer detection & dead mousewheel code. | **Merged** |
| **[PR #7700](https://github.com/sugarlabs/musicblocks/pull/7700)** | Search UI | `js/search-ui.js` | Split DOM/rendering responsibilities out of `SearchController` into `SearchUI`. | **Merged** |

*Total changes: **+5,645 additions** and **-1,808 deletions** across all seven pull requests.*

---

## Detailed Breakdown of Extracted Subsystems

### 1. Search Controller (PR #7667)

The search functionality — autocomplete suggestions, the helpful-search widget, and deprecated block-name handling — was still living inline inside `activity.js`, interleaved with DOM lookups and toolbar coordination.

* **Changes:** Created `js/activity/search-controller.js` housing `SearchController`. State moved into the controller: `searchSuggestions`, `_searchCache`, `_searchCloseListener`, `isHelpfulSearchWidgetOn`, `searchBlockPosition`, `deprecatedBlockNames`, and `helpfulSearchDiv`.
* **Methods Moved:** `prepSearchWidget`, `filterSuggestions`, `hideSearchWidget`, `showSearchWidget`, `doSearch`, `setHelpfulSearchDiv`, `_displayHelpfulSearchDiv`, `_hideHelpfulSearchWidget`, `showHelpfulSearchWidget`, `doHelpfulSearch`.
* **Activity Integration:** `activity.js` initializes `SearchController` and delegates to it through thin wrapper methods. `doContextMenus` was updated to read `this.searchController.isHelpfulSearchWidgetOn` instead of a local flag.
* **This is a pure refactor:** No functional or UI changes — verified that both the search widget and the helpful-search widget behave identically before and after.

### 2. Palette Loader (PR #7669)

This PR delivered the first Week 03 roadmap item: decoupling palette color initialization and regeneration from `activity.js`.

* **Changes:** Created `js/palette/palette-loader.js` housing `PaletteLoader`, which owns:
  * `initializePaletteColors()`
  * `regeneratePalettes()`
* **Activity Integration:** `activity.js` now initializes `PaletteLoader` and delegates the original implementations to it; existing callers continue to work unchanged through the delegation layer.
* **Loader Updates:** Registered the new module in `js/loader.js`.
* **Follow-up Fix:** Added a null-check on the palette DOM element before setting its style, guarding against a case where the element isn't yet attached when regeneration runs.
* **Tests Added:** 23 unit tests covering `setupPaletteLoader`, color initialization, palette regeneration, visibility restoration, and error handling.

### 3. Logo Dependency Injection (PR #7670)

Following the precedent set by the Singer action extraction, this PR finished migrating `logo.js` off direct `globalActivity` reads and onto explicit dependency injection.

* **Changes:** Extended `LogoDependencies` with additional runtime dependencies — `refreshCanvas`, `textMsg`, `markStageDirty`, `save`, and `statsWindow` — each exposed through `LogoDependencies.fromActivity()` with defensive delegation for missing methods.
* **Bug Fix Along the Way:** The legacy dependency configuration had `config` and `callbacks` getters/setters that referenced the wrong `this` context; fixed by capturing the Activity instance through a closure instead.
* **Compatibility:** The existing Activity compatibility facade was preserved for components that still expect it — no API changes, no behavioral changes.
* **Tests Added:** 74 new tests covering default dependency behavior, explicit injection, `fromActivity()` delegation, graceful handling of missing Activity methods, and the legacy getter/setter fix. Full suite passed at 5,796/5,796.
* **Payoff:** This collapses what used to be a 200+ line mock preamble in `logo.test.js` down to direct, explicit dependency construction.

### 4. PubSub Infrastructure (PR #7673)

The last Week 03 roadmap item — replacing scattered `document.dispatchEvent` calls with something lighter — started as pure infrastructure, with no existing callers migrated yet.

* **Changes:** Created `js/pubsub.js`, a synchronous publish/subscribe implementation exposing `emit()`, `on()`, `off()`, `once()`, and `clear()`.
* **Design Constraints:** Synchronous dispatch, deterministic listener ordering, no `document` or `CustomEvent` dependency, and a minimal surface that's trivial to mock in Jest.
* **Scope:** Intentionally infrastructure-only — no existing DOM event callers were touched in this PR, so runtime behavior was fully unchanged.
* **Review Feedback:** Walter asked for a concrete example of how a listener migration would look; the follow-up showed replacing `document.addEventListener("stop-turtle", onStop)` / `document.dispatchEvent(new CustomEvent(...))` with `pubsub.on("stop-turtle", onStop)` / `pubsub.emit("stop-turtle", data)` — same synchronous semantics, no DOM dependency.
* **Tests Added:** Comprehensive coverage for registration, synchronous emit, payload forwarding, multiple listeners, deterministic ordering, `off()`, `once()`, emitting with no listeners, nested synchronous emits, and listener exception propagation.

### 5. PubSub Migration — `finishedLoading` (PR #7679)

With the infrastructure in place, this PR delivered the first real migration: the internal `finishedLoading` event, emitted once after blocks finish loading and consumed by multiple modules with no actual DOM dependency.

* **Changes:** Replaced the `document.dispatchEvent` / `CustomEvent` / `document.addEventListener` chain for `finishedLoading` with `pubsub.emit()` / `pubsub.on()`. Updated the producer in `js/blocks.js` and consumers in `js/activity.js`, `js/blocks/EnsembleBlocks.js`, and `js/planetInterface.js`.
* **Cleanup:** Removed the legacy `document.attachEvent` fallback that existed solely for Internet Explorer.
* **Scope Discipline:** Browser-facing events — pointer, drag, keyboard, `DOMContentLoaded`, `visibilitychange` — were explicitly left untouched. Only the one internal event was migrated.
* **Tests:** Updated Jest coverage to verify the event still fires exactly once, listener ordering is preserved, and all existing consumers continue to execute.
* **Reference Pattern:** This PR now serves as the template for migrating the remaining internal `document.dispatchEvent` call sites incrementally.

### 6. Legacy DOM Cleanup (PR #7698)

A small cleanup surfaced directly by the DOM event audit that preceded the PubSub migration.

* **Removed:** The Internet Explorer detection block (`DetectVersionOfIE`) from `js/utils/utils.js` — IE reached end-of-life in 2022 and the warning code had no remaining runtime dependents.
* **Removed:** A dead, fully commented-out `mousewheel`/`DOMMouseScroll` listener block in `js/activity.js` — wheel handling is already covered by the active listener elsewhere in the same method.
* **Verification:** Confirmed wheel behavior and application startup are unaffected on Chrome, Firefox, Safari, and Chromium Edge.

### 7. Search UI (PR #7700)

The final PR of the week continued the search extraction from earlier in the week (#7667) through to its natural conclusion — separating logic from rendering, the same controller/UI split pattern used for grids, plugins, toolbar, and alerts in Week 03.

* **Changes:** Created `js/search-ui.js` housing `SearchUI`, which now owns DOM interactions, widget visibility, positioning, focus management, and autocomplete initialization for search.
* **Responsibility Split:**

  | Before (`SearchController`) | After |
  | :--- | :--- |
  | Search logic + state | `SearchController` — search state, suggestion generation, autocomplete callbacks, block placement |
  | DOM manipulation + rendering | `SearchUI` — widget rendering, visibility, positioning, focus, autocomplete UI |

* **This is a pure refactor:** No functional or UI changes intended — the split mirrors the controller/UI pattern already validated across grid, plugin, toolbar, and alert subsystems.

---

## Architectural Impact

Week 04 closes out the controller/UI split initiative for the two subsystems that were still pending (search, palette) and finishes the two structural threads from Week 03's roadmap that weren't about controller/UI splitting at all — dependency injection for `logo.js` and event-dispatch modernization via PubSub:

| Initiative | Status After Week 04 |
| :--- | :--- |
| **Controller/UI Split** | Grid, Plugin, Toolbar, Alert (Week 03) + Search (Week 04) — all follow the same pattern now. |
| **Palette Decoupling** | `PaletteLoader` isolates color initialization/regeneration from UI click events. |
| **`logo.js` Dependency Injection** | Complete — no more direct `globalActivity` reads for the migrated dependencies. |
| **Event Dispatching** | PubSub infrastructure shipped and validated with a real migration (`finishedLoading`). |

With search now split the same way as the other four subsystems, `activity.js` has a single, repeatable shape for every remaining extraction: state and logic in a controller, DOM and rendering in a UI module, orchestration only in `activity.js`.

---

## Key Learnings

1. **Ship Infrastructure Separately From Migration:** Introducing PubSub as a standalone, zero-caller PR (#7673) made it trivial to review in isolation, and gave the team a concrete example to discuss before any real migration (#7679) landed.
2. **Audits Surface Cleanup Work For Free:** The DOM event audit that justified PubSub also surfaced two unrelated pieces of dead code (IE detection, commented-out mousewheel handling) that were worth removing on their own merits.
3. **The Controller/UI Split Generalizes:** Applying the same pattern to search that was used for grid, plugin, toolbar, and alert in Week 03 confirms it's a repeatable template rather than something bespoke to any one subsystem.

---

## Roadmap for Week 05

* **Embedded Graphics Scheduler:** `logo.js` still carries `dispatchTurtleSignals()`, a ~700-line method that schedules and replays embedded turtle-graphics commands during note playback. Extract it into a dedicated `EmbeddedGraphicsScheduler` module so interpreter execution and animation scheduling become independently testable, with `Logo` reduced to a thin delegation wrapper around the existing public API.
* **Logo Constructor Simplification:** Close out the dependency-injection work from Week 04 by removing the constructor's duplicated manual dependency wiring in favor of `LogoDependencies.fromActivity()` — this also fixes a latent getter-binding bug where `config`/`callbacks` getters resolved `this` against the wrong object.
* **Interpreter Readability Pass:** `logo.js` remains one of the most complex files in the project. Add JSDoc to core methods (`parseArg()`, `updateNotation()`, `notationMIDI()`, `runLogoCommands()`, `runFromBlockNow()`, `safePluginExecute()`), rename opaque temporary variables, and simplify nested conditionals — no behavioral changes.
* **Logo Test Coverage:** Backfill unit tests for previously untested `logo.js` paths — plugin execution success/error handling, `parseArg()` edge cases, all `dispatchTurtleSignals()` dispatch-factor thresholds, and timer-manager guard behavior — ahead of the scheduler extraction, so the split has a coverage safety net underneath it.
* **Grid UI Regression Watch:** Fix the initialization-order bug from the earlier `GridController` extraction (#7566) where `Turtles` was constructed before `setupGridController()`, leaving `activity.turtles.doGrid` undefined and breaking the Grid menu. Add regression tests, and follow up on a secondary issue flagged in review — the grid doesn't render immediately after the fix and needs an explicit canvas refresh triggered on grid-state change.
* **Project Manager Extraction:** The largest item on the roadmap — extract project loading, saving, import, session restore, and startup/URL-parameter handling out of `activity.js` into a new `ProjectManager` module (`setupProjectManager(activity)`), with `activity.js` reduced to thin delegate wrappers. This is a pure extraction with no intended behavior change, but it touches the app's highest-risk flows, so the automated suite alone won't be enough to sign off on it.

## Acknowledgements

A special thank you to my mentor **Walter Bender** for reviewing and merging all seven pull requests this week, and for the direct feedback on the PubSub migration example that helped clarify the pattern for future work. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
