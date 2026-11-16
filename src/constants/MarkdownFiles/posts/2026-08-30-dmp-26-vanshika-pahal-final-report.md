---
title: "DMP '26 Final Project Report by Vanshika Pahal"
excerpt: "A summary of the Music Blocks v3 maintenance project: decomposing activity.js and logo.js, introducing dependency injection and PubSub, cleaning up blocks and widgets, mutation testing, interpreter-level integration tests, Cypress E2E coverage, and an AST-based test generator."
category: "DEVELOPER NEWS"
date: "2026-08-30"
slug: "2026-08-30-dmp-26-vanshika-pahal-final-report"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,refactoring,testing,finalreport"
image: "assets/post-assets/dmp26-vanshika/dmp_c4gt.logo.png"
---
<!-- markdownlint-disable -->
# Final DMP Project Report by Vanshika Pahal
**Project:** [Music Blocks Maintenance: Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks/issues/6605)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Sumit Srivastava  
**Assisting Mentors:** Devin Ulibarri, Om Santosh Suneri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  

---

## Introduction

Music Blocks v3 is the production version that teachers and students use every day while v4 is under development. Over the years, `activity.js` and `logo.js` had grown into very large files that depended on implicit globals. At the start of the project, a dependency graph from PR #5435 showed 123 modules with 792 implicit global dependencies. Testing `logo.js` meant writing more than 200 lines of global mocks before the first assertion, and dependency upgrades were risky because nobody could tell what they would break.

My project was to make v3 safer to maintain: complete the test suite, update dependencies, and, after discussion with my mentors in the first week, reduce the structural coupling first. Tests written against tangled code break whenever the globals change, so the structure had to improve before the tests could be worthwhile.

Over the course of the project, this grew into **99 merged pull requests** (about 55,800 lines added and 17,400 removed), more than **30 extracted modules**, a dependency-injection layer for the interpreter, a PubSub module, a mutation-testing setup, interpreter-level integration tests, a Cypress E2E suite, and an AST-based test generator.

## Project Goals

The main objectives of the project were:

- Measure the baseline: test coverage, security audit and CI health.
- Reduce the coupling in `activity.js` and `logo.js` so modules can be tested in isolation.
- Raise statement, branch and function coverage towards the 80% / 70% / 80% targets.
- Move from a single E2E spec to a meaningful end-to-end suite.
- Update and fix problem dependencies.
- Leave behind patterns, documentation and tooling that make it easier for others to keep going.

## 1. Baseline Investigation

I began by measuring before changing anything.

- **Coverage:** about 47% statements, 39% branches and 52% functions.
- **Security audit:** `npm audit` reported 1 high and 5 moderate vulnerabilities, including `materialize-css`, which has no upstream fix.
- **Coupling:** the PR #5435 graph showed the 792 implicit global dependencies, and `activity.js` was over 8,000 lines.
- **CI problems:** the Jest step used a `||` pattern that could report green when tests failed, Cypress was never run in CI, and the CI Node version differed from the one declared in `package.json`.

The key decision from this phase, confirmed with Walter, was that structural work comes before raw coverage expansion.

## 2. Decomposing `activity.js`

The largest part of the project was breaking `activity.js` into single-responsibility modules. I used one repeatable pattern throughout: a **controller** owns state and logic, a **UI or renderer module** owns DOM and EaselJS work, and `activity.js` keeps only orchestration and thin delegate methods that preserve the existing API.

The subsystems that were extracted include:

- **Export and recording:** canvas recording, SVG/PNG export (`exporters.js`) and the ABC parser, which was then split into smaller helper functions.
- **Idle and autosave:** an idle watcher and autosave controller.
- **Grid:** `GridController` and `GridRenderer`.
- **Plugins:** `PluginController` and a `PluginDialog` widget that uses option callbacks instead of a reference to `Activity`.
- **Toolbar:** `ToolbarController`, a roughly 2,800-line migration into `toolbar-ui.js` behind a backward-compatible shim, and a standalone `FocusCycleManager`.
- **Alerts:** `AlertController` and `AlertRenderer`.
- **Palette and search:** `PaletteLoader`, `SearchController` and `SearchUI`.
- **Project lifecycle:** `ProjectManager`, covering load, save, import, session restore and startup, the biggest single extraction of the project.
- **Interaction:** `KeyboardController`, `SelectionController` and `WorkspaceLayoutController`.
- **Workspace features:** `TrashController`, `HelpController`, `BlockScaleController` and `ContextMenuController`.

Every one of these was intended as a pure refactor with no behavior change. Each came with tests, and each passed Jest, ESLint and Prettier before merging. When the GridController extraction introduced an initialization-order bug that broke the Grid menu, I fixed it and added regression tests.

## 3. Dependency Injection and Event Handling in the Logo Interpreter

The second structural thread was `logo.js`, the interpreter.

- **`LogoDependencies`:** I finished moving `logo.js` off direct reads of the global activity object and onto explicit dependency injection. This also fixed a `this`-binding bug in the legacy `config` and `callbacks` getters.
- **Constructor simplification:** the duplicated manual dependency wiring in the constructor was replaced by `LogoDependencies.fromActivity()`.
- **`EmbeddedGraphicsScheduler`:** the roughly 700-line `dispatchTurtleSignals()` method became its own module with its own tests, and `Logo` keeps a thin delegating wrapper.
- **Readability:** JSDoc for the core interpreter methods, clearer variable names and simpler conditionals.
- **PubSub:** I introduced `pubsub.js`, a small synchronous publish/subscribe module, as infrastructure first and then proved it by migrating the internal `finishedLoading` event away from `document.dispatchEvent`. That PR is now the template for migrating other internal events. During the same audit I removed dead Internet Explorer detection and commented-out mousewheel code.

The result is that tests can build the interpreter's dependencies explicitly instead of simulating the whole app.

## 4. Cleaning Up `blocks.js`, `utils.js` and the Widgets

After `activity.js`, I applied the same approach to other large files.

- **Blocks:** block constants, `ConnectionValidator` (with tests derived from the production connection data rather than a copy of the rules) and `BlockDragController`.
- **Utilities:** DOM helpers and browser-detection helpers extracted from `utils.js`.
- **Widgets:** widgets now declare their own dependency metadata, the `WidgetBlocks` loader consumes it, and listener-deferred widgets share a single `_lazyLoadWidget` path. I documented both loading helpers in the widgets README.
- **Widget internals:** I split the long `init()` methods and removed duplication in Rhythm Ruler, Music Keyboard, Timbre, Lego Bricks and Temperament, and extracted pie-menu block context into its own module.
- **Bug fixes found along the way:** a Phrase Maker matrix that did not refresh after pitch-block updates, duplicate `init()` calls in the status and reflection blocks, and blank filenames when a project had no name.

## 5. Dependency and CI Work

- Resolved the electron-rebuild Node engine mismatch with a version override and documented why the override exists.
- Made the security-audit CI job more reliable with retries and npm caching.
- Fixed the Lighthouse workflow so audits run on pull requests from forks.
- Added contributor documentation on draft PRs and review etiquette in `CONTRIBUTING.md`.

## 6. Deepening the Test Suite

With the structure improved, the second half of the project concentrated on test quality.

### Logo interpreter coverage
Coverage for `logo.js` rose from 82.5% to 87.7% statements. Later, I added tests that run pitch, volume and articulation, interval, meter, tone and timbre, ornament, and dictionary blocks through the **real Logo interpreter**, which covers the block-system to Logo seam that was untested at the start.

### Mutation testing
Line coverage shows which code ran, not whether a test would notice a bug. I added **Stryker mutation testing**, scoped to the turtle-action modules, and wrote tests to kill surviving mutants in the Intervals, Rhythm, Pitch, Tone, Drum, Meter, Ornament, Dict and Volume actions and in the pie-menu module. This exposed a real bug: the `deltaPitch` loop hung forever when the step size was zero, which I fixed.

### End-to-end tests
The Cypress suite grew from a single page-load spec to more than ten specs. They cover loading a real project, persistence across reload, Phrase Maker and Rhythm Maker, the JavaScript editor and block search, palette-to-canvas drag and drop, MIDI and LilyPond export, custom-mode persistence, the Tempo widget, and real note dispatch during playback.

### AST-based test generation
To make test writing scale beyond one contributor, I built a pipeline that parses a module's AST, produces a deterministic test plan, and generates test files from it. It has `--module` selection, a dry-run preview and a candidate review report, and was demonstrated on utility modules and then on `midi` and `releaseconfig`. Generated tests are reviewed before being committed.

## 7. Final Outcome

The major outcomes include:

- **99 merged pull requests** across refactoring, testing, dependencies and documentation.
- More than **30 extracted modules**, with `activity.js` reduced to orchestration through thin delegates.
- Explicit dependency injection for the Logo interpreter, replacing the 200+ line mock preamble.
- A PubSub module with a proven migration pattern.
- Cleaner `blocks.js`, `utils.js` and widget code.
- Higher coverage on the interpreter, plus mutation testing and real-interpreter integration tests.
- An E2E suite that grew from 1 spec to more than 10.
- An AST-based test generator.
- A resolved electron-rebuild dependency conflict, a hardened audit job, and contributor documentation.

*[Add final numbers here before submitting: overall Istanbul statement, branch and function coverage; the final `npm audit` result; and the status of the `materialize-css` and CI fixes from the baseline.]*

## Challenges and Learnings

The main lesson was that **structure comes before tests**. Each decomposition made the next set of tests smaller and more stable, whereas tests written against implicit globals would have needed constant maintenance.

I also learned to ship infrastructure separately from migration. Merging PubSub with no callers first made it easy to review and gave Walter a concrete pattern to comment on.

Refactoring large files will cause regressions, so careful review and regression tests matter. The Grid menu bug was a clear example.

Finally, coverage numbers can be misleading. Mutation testing showed weak assertions behind high line coverage and found a real infinite loop. Mentor feedback shaped many decisions: callbacks instead of direct references to `Activity`, behavior tests instead of spy assertions, and tests derived from production data.

## Future Work

- Continue decomposing `activity.js` and `blocks.js` with the controller/UI pattern.
- Migrate the remaining internal `document.dispatchEvent` calls to PubSub.
- Decide on the long-term approach for `materialize-css`.
- Extend the AST test generator to blocks and widgets, and widen the Stryker scope.
- Run the Cypress suite in CI on pull requests.

## Resources and References

- **Project Issue:** [\[DMP 2026\]: Music Blocks maintenance](https://github.com/sugarlabs/musicblocks/issues/6605)
- **Music Blocks Repository:** [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **Dependency Graph:** [PR #5435](https://github.com/sugarlabs/musicblocks/pull/5435)
- **Merged Pull Requests:** [PRs authored by me since June 2026](https://github.com/sugarlabs/musicblocks/pulls?q=is%3Apr+is%3Amerged+author%3Avanshika2720+merged%3A%3E%3D2026-06-01)
- **Sugar Labs:** [sugarlabs.org](https://sugarlabs.org)

## Acknowledgments

I would like to thank Walter Bender for the architectural guidance and for reviewing and merging nearly a hundred pull requests. Thank you to Sumit Srivastava and Devin Ulibarri for their mentorship, and to Om Santosh Suneri, whose GSoC 2025 testing infrastructure this project builds on.

I am also grateful to the Sugar Labs community for patient reviews and a welcoming environment. Working on this project taught me how to change a large, widely used codebase safely, and how to build the structure and tooling that let others keep improving it.
