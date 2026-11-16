---
title: "DMP '26 Week 11 Update by Vanshika Pahal"
excerpt: "Week 11: Moving from unit and dispatch-level tests to end-to-end Cypress coverage of real Music Blocks workflows — project loading, persistence, playback, export, widgets, and drag-and-drop — plus Tone.js Transport verification and the first piece of AST-based test-plan generation."
category: "DEVELOPER NEWS"
date: "2026-08-19"
slug: "2026-08-19-dmp-26-vanshika-week11"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,testing,week11,cypress,e2etesting,tonejs,ast,testgeneration"
image: "assets/Images/dmp_c4gt_logo.png"
---
<!-- markdownlint-disable -->
# Week 11 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Week:** End-to-End Cypress Workflow Coverage, Tone.js Transport Verification, and an AST-Based Test-Plan Extractor
**Reporting Period:** 2026-08-13 to 2026-08-19

---

## Overview

Weeks 09 and 10 raised mutation coverage across turtleactions and piemenus and then drove real blocks through the actual Logo interpreter. Both were still tests that stopped short of the browser. Week 11 moved up a level: instead of asking whether a module behaves correctly, the question became whether a user can actually do the thing — load a project, reload the page and get it back, press Play and hear notes, export a file, open a widget, drag a block onto the canvas. Most of the week's pull requests are Cypress end-to-end tests that go through the real UI with no mocked loaders, no stubbed audio, and no arbitrary waits.

Two pull requests step outside that pattern. One adds unit and Cypress coverage around the Tone.js `Transport` wrapper and playback clock, so a future Tone.js release that changes those APIs gets caught. The other begins the AST-based test-generation work from the Week 10 roadmap, with a deterministic extractor that produces a JSON test plan for a JavaScript module. The persistence test also turned up one real production bug in `js/blocks.js`, fixed in the same pull request.

This week I merged **10 pull requests**, changing roughly **3,439 additions and 1 deletion** across them. Every pull request was test-only or tooling-only, with one exception: a one-line scheduling fix in `js/blocks.js` that the persistence test exposed.

---

## Week 11 at a Glance

| Pull Request | Change | Target File(s) | Impact & Code Changes | Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #8260](https://github.com/sugarlabs/musicblocks/pull/8260)** | E2E: Loading a Real Project | cypress/e2e/project-loading.cy.js | Loads `examples/pi.tb` through the real `#load` → `#myOpenFile` flow and verifies the overlay clears, no error is shown, and the block count increases. | **Merged** |
| **[PR #8263](https://github.com/sugarlabs/musicblocks/pull/8263)** | E2E: Project Persistence Across Reload + `blocks.js` Fix | cypress/e2e/project-persistence.cy.js, js/blocks.js | Verifies the loaded project's block-name set survives `cy.reload()`, and fixes chunked block loading stalling in headless windows. | **Merged** |
| **[PR #8267](https://github.com/sugarlabs/musicblocks/pull/8267)** | E2E: Phrase Maker and Rhythm Maker | cypress/e2e/maker-widgets.cy.js, two project fixtures | Covers widget launch and phrase-grid rendering, and real cell-dissect interaction in Rhythm Maker. | **Merged** |
| **[PR #8269](https://github.com/sugarlabs/musicblocks/pull/8269)** | E2E: JavaScript Editor and Block Search | cypress/e2e/editor-search.cy.js | Covers the CodeJar editor opened from the toolbar and palette search autocomplete, including a position regression check for #8069. | **Merged** |
| **[PR #8270](https://github.com/sugarlabs/musicblocks/pull/8270)** | E2E: Palette-to-Canvas Drag-and-Drop | cypress/e2e/block-drag-drop.cy.js | Drags the real pitch block onto the canvas with the app's own mouse handlers and verifies it docked into the existing flow. | **Merged** |
| **[PR #8271](https://github.com/sugarlabs/musicblocks/pull/8271)** | E2E: Custom Mode Persistence | cypress/e2e/mode-persistence.cy.js, cypress/fixtures/mode-widget-minimal.tb | Saves a custom mode through the widget, reloads, re-runs the project, and verifies the custom mode is restored. | **Merged** |
| **[PR #8272](https://github.com/sugarlabs/musicblocks/pull/8272)** | E2E: MIDI and LilyPond Export | cypress/e2e/export-workflows.cy.js, cypress/fixtures/export-note-minimal.tb | Exports through the real Save menu and inspects the downloaded `.mid` and `.ly` files' contents. | **Merged** |
| **[PR #8273](https://github.com/sugarlabs/musicblocks/pull/8273)** | E2E: Real Note Dispatch on Loaded Project Playback | cypress/e2e/real-project-playback.cy.js | Loads `pi.tb`, presses the real `#play` button, and asserts a real note reached the Singer/Tone.js dispatch path. | **Merged** |
| **[PR #8274](https://github.com/sugarlabs/musicblocks/pull/8274)** | Tone.js Transport Wrapper and Playback Clock Verification | js/utils/__tests__/synthutils.test.js, cypress/e2e/main.cy.js | Added six unit tests for the Transport wrapper and strengthened the Cypress Play/Stop test to check Tone's context and transport state. | **Merged** |
| **[PR #8275](https://github.com/sugarlabs/musicblocks/pull/8275)** | AST-Based Module Test-Plan Extractor | scripts/generate-tests/ (9 files) | Added a deterministic Acorn-based extractor that emits a JSON test plan for a JavaScript module. Planning layer only; it does not generate tests. | **Merged** |

*Total changes: **+3,439 additions** and **-1 deletion** across the ten pull requests listed above.*

---

## Detailed Breakdown

### End-to-End Cypress Coverage of Real Workflows

#### 1. Loading a Real Project (PR #8260)

* **Motivation:** The Cypress suite had no test that loaded an actual Music Blocks project, so any breakage in the real file-loading path would only surface for users.
* **Changes:** Added `cypress/e2e/project-loading.cy.js`, which clicks the real `#load` toolbar button, feeds `examples/pi.tb` through the hidden `#myOpenFile` input, and verifies that the `#load-container` overlay clears, the `#errorText` alert stays hidden, `#canvas` stays visible, and the Activity block count goes up. It reads real state through `ActivityContext.getActivity()`.
* **Scope Decision:** The test deliberately stops at loading, so a loading failure can be told apart from a project-execution failure. Running the loaded project was left to a follow-up, which became PR #8273.
* **Verification:** New spec 1/1, `main.cy.js` 22/22, `startup-stability.cy.js` 1/1: 24/24 Cypress tests. ESLint and Prettier passed. No production code changed.

#### 2. Project Persistence Across Reload, and a Real Bug (PR #8263)

* **Changes:** Added `cypress/e2e/project-persistence.cy.js`, which loads `pi.tb`, records the sorted multiset of block names, calls `cy.reload()`, waits for the app to be ready, and verifies the restored block-name set matches exactly. It uses `cy.reload()` rather than the toolbar's Save action because that action exports HTML/PNG and does not trigger local persistence. I confirmed against the implementation that the `beforeunload` handler calls `ProjectManager.saveLocally()` and the saved project is restored during initialization.
* **The Bug:** While making the test pass reliably, I found that chunked block loading in `js/blocks.js` used `requestAnimationFrame()`, which can stall in headless or hidden windows after the first 20 blocks. I changed it to `setTimeout(processChunk, 0)`, which matches the function's documented behavior. The persistence test is the regression test for this one-line change.
* **Why the Fix Shipped With the Test:** The test could not pass consistently without it, so the two belong in one pull request. Codecov's one-line patch warning was for this production line, which the E2E test exercises.
* **Verification:** 24/24 Cypress tests across `main.cy.js`, `project-persistence.cy.js`, and `startup-stability.cy.js`, run twice with no flakiness.

#### 3. Phrase Maker and Rhythm Maker (PR #8267)

* **Changes:** Added `cypress/e2e/maker-widgets.cy.js` with a Phrase Maker test covering widget launch and phrase-grid rendering, and a Rhythm Maker test covering widget launch and a real cell-dissect interaction, plus two project fixtures. Both tests start through the production Play/run path and clear local storage between runs for isolation.
* **Design Choice:** Rhythm Maker interaction uses the widget's real DOM `<td>` cells, avoiding canvas-coordinate or timing-sensitive assertions.
* **Verification:** New spec passing across 3 runs; full Cypress suite 26/26. No production code changed.

#### 4. JavaScript Editor and Block Search (PR #8269)

* **Changes:** Added `cypress/e2e/editor-search.cy.js` with two tests. The first opens the JavaScript editor through the real toolbar and verifies the CodeJar editor, generated code, gutters, console pane, and syntax highlighting when available. The second searches the palette for `forward` and verifies the real jQuery-UI autocomplete results.
* **Regression Coverage:** The search test includes a position check that the dropdown stays anchored to the search input, covering the autocomplete positioning regression from issue #8069.
* **Verification:** New spec 2/2; full suite 26/26. No production code, configuration, or dependencies changed.

#### 5. Palette-to-Canvas Drag-and-Drop (PR #8270)

* **Changes:** Added `cypress/e2e/block-drag-drop.cy.js`, which opens the Pitch palette and drags the real pitch block onto the canvas using the app's own `mousedown`/`mousemove`/`mouseup` handlers rather than native HTML5 drag events. The real proximity-based docking logic then snaps the block into the existing flow.
* **Assertions:** The test checks the resulting `blockList` connections and the block's position, to confirm the block actually docked rather than being dropped nearby.
* **Review Follow-Up:** After review feedback I hardened the test and then decoupled the dock geometry from the starter project. Target coordinates now come from the live block dock offsets rather than fixed screen coordinates.
* **Verification:** Focused test passing across 2 runs; full Cypress suite 28/28.

#### 6. Custom Mode Persistence (PR #8271)

* **Changes:** Added `cypress/e2e/mode-persistence.cy.js` and a minimal `cypress/fixtures/mode-widget-minimal.tb`. The test opens the Custom Mode widget through the project's real start-stack execution, saves a custom mode with the widget's real `#customModeName` input and Save button, reloads the app, re-runs the project, and verifies the saved custom mode is restored.
* **CI Failure and Fix:** The first version failed in CI because it reloaded the app before the edited `modename` value had been persisted, so the restored value was the old `"major"`. The final version removes that timing-sensitive dependency. A reviewer also pointed out that a comment about falling back to `"major"` was inaccurate, because `_setMode()` returns early rather than falling back.
* **Verification:** Focused test passing; full Cypress suite of 28 tests across 6 specs passing.

#### 7. MIDI and LilyPond Export (PR #8272)

* **Changes:** Added `cypress/e2e/export-workflows.cy.js` and a minimal `cypress/fixtures/export-note-minimal.tb` containing a single note-value stack under start. Both tests go through the real Save menu. The MIDI test switches to Advanced mode, uses `#save-midi`, handles the filename prompt, and reads the downloaded file to verify the `MThd` Standard MIDI File header. The LilyPond test submits the export dialog, reads the generated `.ly` file, and verifies the `LILYPONDHEADER` marker.
* **Review Follow-Up:** I strengthened the LilyPond assertion to confirm the fixture's actual note data (`g'4`) appears in the output, and hardened the MIDI parser's bounds and header handling. Walter noted that checking for the version string is useful because a future LilyPond version change would show up in this check.
* **Verification:** Both new tests pass independently; full Cypress suite 32/32. The `.tb` fixture is intentionally not Prettier-formatted because the repository has no parser for that format.

#### 8. Real Note Dispatch on Loaded Project Playback (PR #8273)

* **Motivation:** PR #8260 verified that a real project loads, and `main.cy.js` verified that the audio transport starts and stops, but nothing connected the two: that a loaded real project actually executes and dispatches a note.
* **Changes:** Added `cypress/e2e/real-project-playback.cy.js`, which loads `pi.tb`, presses the real `#play` button, and asserts that `activity.logo.firstNoteAudioTime` changes from `null` to a finite value greater than 0, that `Tone.context.state` reaches `running`, and, after the real `#stop` control, that `activity.turtles.running()` reports all turtles stopped.
* **Why `firstNoteAudioTime`:** A Tone.js audio context can be running without any note being scheduled. `firstNoteAudioTime` is set in `js/turtle-singer.js` using `Tone.now()` only when the first note is actually dispatched, so it proves the real Logo → Singer → Tone.js path ran.
* **Review Follow-Up:** Walter suggested copying `pi.tb` into the fixtures so the test cannot silently drift if the example is ever changed or removed, and I addressed that.
* **Verification:** Focused spec 1/1; full Cypress suite 31/31. Nothing in Logo, Singer, or Tone is stubbed.

### Audio-Engine Verification and Test Generation

#### 9. Tone.js Transport Wrapper and Playback Clock (PR #8274)

* **Motivation:** Music Blocks uses Tone.js 15.1.22, the current stable release, so a version bump would have been pointless. Instead, the pull request pins down the Tone.js APIs Music Blocks actually relies on, so a future release that changes them gets caught.
* **Changes:** Added six unit tests in `js/utils/__tests__/synthutils.test.js` for the `Tone.Transport` wrapper, covering `schedule()` delegation and its returned event ID, the missing-`schedule()` guard, `cancel()` and `clear()` delegation, the `seconds` getter and setter, `getSecondsAtTime()` delegation and fallback, and safe no-op behavior when Tone.js is unavailable. I also strengthened `cypress/e2e/main.cy.js` to verify `Tone.context.state` reaches `"running"` on Play, `Tone.Transport.state` reaches `"started"`, and is no longer `"started"` after Stop.
* **Scope Note:** Full loaded-project playback through the real Logo → Singer → Tone.js path is covered separately by PR #8273 and not duplicated here.
* **Verification:** Jest 221 suites / 8,091 tests; `synthutils` 143/143; Cypress `main.cy.js` 22/22. ESLint, Prettier, and commitlint clean. `package.json` and the lockfile were untouched.

#### 10. AST-Based Module Test-Plan Extractor (PR #8275)

* **Changes:** Added a deterministic AST-based analysis utility under `scripts/generate-tests/`. It uses the repository's vendored Acorn parser and a hand-written ESTree walker in `module-test-plan.js`, with `extract-module.js` handling parsing. For a given JavaScript module it produces a JSON test plan describing exported functions and classes, parameters and arity, branch, return, and throw counts, dependencies, referenced globals, leading JSDoc, and aggregate totals. The pull request spans 9 files and about 2,237 lines.
* **Scope:** This is the extraction and planning layer only. It does not generate or modify any tests for production modules.

---

## Architectural Impact

| Initiative | Status After Week 11 |
| :--- | :--- |
| **End-to-End Test Coverage** | New workflow-level Cypress coverage for project loading, persistence across reload, custom mode persistence, real playback, MIDI/LilyPond export, Phrase Maker and Rhythm Maker, the JavaScript editor, block search, and palette-to-canvas drag-and-drop. |
| **Playback Verification** | A loaded real project is now verified to dispatch a note through the actual Logo, Singer, and Tone.js path, and the Transport wrapper's contract with Tone.js is pinned by unit tests. |
| **Test Fixtures** | Small fixtures were added for the maker-widget, custom-mode, and export tests. The playback test uses a fixture copy of `pi.tb` rather than depending on the example staying unchanged. |
| **Production Correctness** | One real bug found and fixed: chunked block loading in `js/blocks.js` could stall in headless or hidden windows. |
| **Test-Generation Tooling** | The first piece of AST-based tooling exists: a deterministic extractor that turns a module into a structured test plan. |

The most useful result of the week is probably the persistence bug. It took a test that loaded a real project and reloaded a real page to expose a scheduling choice in `js/blocks.js` that behaves differently in a headless browser, which neither unit tests nor Logo-dispatch tests exercise.

---

## Key Learnings

1. **End-to-End Tests Find Environment-Dependent Bugs That Lower-Level Tests Cannot:** The `requestAnimationFrame()` stall in `js/blocks.js` only shows up when the page is actually loaded in a headless or hidden window, which no Jest test or Logo-dispatch test reproduces.
2. **Assert on the State That Proves the Behavior, Not on a Proxy for It:** A running `Tone.context` does not prove a note was played. `firstNoteAudioTime` is only set when a note is actually dispatched, so asserting it checks the real path rather than just the audio engine being awake.
3. **A Timing-Sensitive Test Fails in CI Even When It Passes Locally:** The custom mode test reloaded before the edited value had been persisted and so restored `"major"`. Removing that ordering dependency, rather than adding a wait, is what made it reliable.
4. **Keep Each End-to-End Test Scoped to One Failure Mode:** Splitting loading (#8260) from playback (#8273) means a failure points at one cause. The same reasoning kept the Tone.js Transport tests in #8274 from duplicating the playback coverage.
5. **Don't Let a Test Depend on a File That Can Change Underneath It:** Walter's suggestion to copy `pi.tb` into the fixtures means the playback test keeps matching the project it was written against, even if the example is edited or removed.
6. **Drive the App Through Its Own Handlers:** The drag-and-drop test uses the app's real `mousedown`/`mousemove`/`mouseup` handlers and live dock offsets, so it tests the real docking logic rather than native drag events or hard-coded screen coordinates that would break on any layout change.

---

## Roadmap for Week 12

The next goals build on this week's work. For the AST-based test-generation work started in PR #8275, I plan to validate the extracted module plans against the repository's existing utility modules, and then build the test-generation infrastructure on top of the plan format so that planning tests for a module no longer starts from a blank file. I also plan to keep extending end-to-end Cypress coverage to further user-facing Music Blocks workflows, keeping the approach from this week: drive the real UI, use self-contained fixtures, and assert on application state rather than on timing.

---

## Acknowledgements

A special thank you to my mentor and the project maintainer, **Walter Bender**, for his guidance throughout the project and for reviewing and merging nine of this week's pull requests, from the project persistence test through the test-plan extractor, and for the suggestion to keep the playback test's project in the fixtures. I would also like to thank the rest of the Sugar Labs community for their continued support during reviews.
