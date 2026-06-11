---
title: "DMP '26 Week 01 Update by Vanshika Pahal"
excerpt: "Introductory week: establishing the current state of Music Blocks v3, coverage baseline, security audit, structural bottleneck analysis, and the plan ahead."
category: "DEVELOPER NEWS"
date: "2026-06-10"
slug: "2026-06-10-dmp-26-vanshika-week01"
author: "@/constants/MarkdownFiles/authors/vanshika2720.md"
tags: "dmp26,sugarlabs,musicblocks,introduction,week01,vanshika"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Vanshika Pahal

**Project:** [Music Blocks v3 - Test Coverage, Refactoring & Dependency Updates](https://github.com/sugarlabs/musicblocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Week:** Introduction & Baseline Investigation  
**Reporting Period:** 2026-06-01 – 2026-06-10

---

## Overview

This is my first weekly blog post for DMP 2026. This week was focused on introducing myself, understanding the current state of the Music Blocks v3 codebase, and establishing the baselines that will guide the rest of the summer.

Following mentor feedback, the direction is clear: **structural work in `activity.js` comes first**. Before expanding tests or touching dependencies, the implicit global coupling in the core modules needs to be reduced because until that coupling is untangled, writing meaningful tests for these modules is impractical, and dependency upgrades remain unpredictably risky.

This week is about measuring the current state so that Week 2 structural work begins on a documented, understood foundation.

---

## Goals for This Week

- Run `jest --coverage` and document the current Istanbul coverage baseline.
- Run `npm audit` and establish a security vulnerability baseline.
- Analyse the [PR #5435](https://github.com/sugarlabs/musicblocks/pull/5435) dependency graph to identify the highest-coupling structural bottlenecks.
- Review the CI pipeline configuration and identify any integrity issues.
- Review the eight test directories established by Om Santosh Suneri during GSoC 2025.

---

## About the Project

**Music Blocks** is an open-source creative-coding environment for children developed by Sugar Labs. Students compose music by snapping together visual blocks representing notes, rhythms, instruments, and control flow. It runs entirely in the browser with no install required, making it accessible in classrooms worldwide.

Music Blocks v4 is under active development for later in 2026. Until that transition is complete, v3 is the production system used by teachers and students every day. A codebase without a complete test suite and with accumulating dependency drift poses a quiet but serious risk: bugs go undetected, security advisories go un-patched, and upgrade PRs break functionality that nobody anticipated.

This project completes the unit-and-integration test suite that Om Santosh Suneri began in GSoC 2025, carries out a systematic dependency audit and update cycle, and, as the foundation for everything else, reduces the structural coupling that currently makes both testing and upgrades harder than they need to be.

---

## Current State of the Codebase

### Coverage Baseline

Running `jest --coverage` across the full test suite produces the following Istanbul report:

<p align="center">
  <img
    src="assets/Developers/vanshika/jest-coverage-baseline.png"
    alt="Istanbul coverage summary showing ~47% statement, ~39% branch, ~52% function coverage across Music Blocks v3"
    width="800"
  />
</p>

| Metric | Current | Target |
| :--- | :---: | :---: |
| Statement Coverage | ~47.06% | ≥ 80% |
| Branch Coverage | ~38.54% | ≥ 70% |
| Function Coverage | ~51.53% | ≥ 80% |
| E2E Scenarios | 1 | ≥ 8 |

The test suite is structured across eight directories that Om Santosh Suneri established during GSoC 2025:

| Directory | Files | Scope |
| :--- | :---: | :--- |
| `js/__tests__/` | 41 | Core & integration modules |
| `js/blocks/__tests__/` | 24 | Music/boolean block suites |
| `js/widgets/__tests__/` | 22 | Widget interface suites |
| `js/utils/__tests__/` | 7 | Mathematical & musical utilities |
| `js/turtleactions/__tests__/` | 9 | Turtle execution suites |
| `js/js-export/__tests__/` | 6 | JS export logic |
| `js/js-export/API/__tests__/` | 11 | Individual API method tests |
| `planet/js/__tests__/` | 2 | Planet backend interface suites |

The gaps fall across four categories: untested core files (loader resolution, global state initialization), shallow tests (happy-path only, missing error branches), integration gaps (no tests across the block-system ↔ Logo interpreter seam), and a nearly absent E2E suite (one Cypress spec covering only page load).

### Security Audit

Running `npm audit` reveals the current vulnerability landscape before any dependency work begins:

<p align="center">
  <img
    src="assets/Developers/vanshika/npm-audit-report.png"
    alt="npm audit output showing 1 high and 5 moderate severity vulnerabilities"
    width="800"
  />
</p>

| Severity | Count |
| :--- | :---: |
| High | 1 |
| Moderate | 5 |

Key findings:
- **`@babel/plugin-transform-modules-systemjs`** (High) arbitrary code execution risk when compiling malicious input; fix available via `npm audit fix`
- **`materialize-css`** multiple XSS vulnerabilities; no upstream fix currently available
- **`follow-redirects`** leaks authentication headers to cross-domain redirect targets
- **`postcss`** XSS via unescaped `</style>` in CSS stringify output
- **`qs`** remotely triggerable DoS via `qs.stringify`

The `materialize-css` case has no upstream fix and will need a separate approach (pinning, patching, or removal).

### Why Testing Is Hard: The Structural Coupling Problem

The low coverage figures are not simply because nobody has written tests. The deeper problem is structural. Looking at `logo.test.js`, the test file requires **over 200 lines of global mock declarations** before a single assertion can run:

<p align="center">
  <img
    src="assets/Developers/vanshika/logo-test-mock-setup.png"
    alt="logo.test.js showing 200+ lines of global mock setup before any test assertions"
    width="800"
  />
</p>

This is because the Logo interpreter reads directly from unscoped globals `Singer`, `Turtle`, `blockList`, `boxes` during block execution. A test cannot import just the functionality it needs; it must simulate the entire global activity context. Every time a new global is added to `logo.js`, every test that imports it can silently break unless someone manually updates this 200-line mock block.

The same problem exists in `activity.js` (8,369 lines), which mixes UI wiring, block registration, event dispatch, and global state passed as an implicit dependency container to nearly every module. This is why the dependency graph from [PR #5435](https://github.com/sugarlabs/musicblocks/pull/5435) found **123 modules** with **792 implicit global dependencies**:

<p align="center">
  <img
    src="assets/Developers/vanshika/dependency-graph.svg"
    alt="Module dependency graph showing 123 modules and 792 implicit global dependencies in Music Blocks v3, from PR #5435"
    width="800"
  />
</p>

This is why structural work in `activity.js` is the starting point and the mentor-confirmed priority. Extracting block registration into `BlockRegistry.js`, applying `LogoDependencies` injection to `logo.js`, and decoupling palette loading are the changes that make everything downstream tests, dependency updates, AI-assisted coverage significantly safer and more tractable.

### Three CI Bugs Found

While reviewing the pipeline, three integrity issues were identified:

| Bug | Severity | Description |
| :--- | :---: | :--- |
| **Always-Green CI** | High | The Jest step uses a bash `\|\|` pattern CI shows green even when tests fail |
| **Ghost Cypress** | High | `cypress:run` exists in `package.json` but never runs in CI; zero E2E tests execute on PRs |
| **Node Version Mismatch** | Medium | CI runs Node v22; `package.json` declares Node v20 |

These will be fixed at the start of Week 2.

---

## Challenge & Key Learning

### Why Structural Work Has to Come First

The instinct when looking at 47% statement coverage is to start writing tests immediately. But the structural coupling in `activity.js` and `logo.js` makes that a poor strategy: the mock setup required to test these files is so large and fragile that any test written against the current architecture breaks as soon as the global environment changes.

**Learning:** Fixing the architecture so that modules can be tested in isolation is more valuable than writing 50 tests against the current brittle structure. Structural changes are multiplicative one well-scoped decomposition unlocks clean tests for many downstream modules, whereas tests written against implicit globals require constant maintenance.

---

## Next Week's Roadmap

- **`activity.js` - Block Registration Extraction:** Extract the block registration lifecycle into a new `js/blocks/BlockRegistry.js` module with explicit dependency injection. This is the primary focus for Week 2.
- **`logo.js` - LogoDependencies Interface:** Begin refactoring `js/logo.js` to accept `LogoDependencies` (blockList, boxes, turtleHeaps, actions) via explicit parameter injection rather than unscoped globals.
- **Structural Audit Doc:** Document the decomposition plan in `docs/structural-audit-2026.md`.
- **CI Hardening:** Fix the Node version mismatch and remove the `||` pattern masking Jest failures.

---

## Resources & References

- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **Dependency Graph:** [PR #5435](https://github.com/sugarlabs/musicblocks/pull/5435) - 123 modules, 792 implicit global dependencies
- **Architecture References:**
  - [logo.js](https://github.com/sugarlabs/musicblocks/blob/master/js/logo.js)
  - [activity.js](https://github.com/sugarlabs/musicblocks/blob/master/js/activity.js)
- **CI Workflows:** [.github/workflows](https://github.com/sugarlabs/musicblocks/tree/master/.github/workflows)
- **Testing Guide:** [guide_addingtest.md](https://github.com/sugarlabs/musicblocks/blob/master/js/guide_addingtest.md)
- **Istanbul Coverage:** [Jest Coverage Configuration](https://jestjs.io/docs/configuration#collectcoverage-boolean)

---

## Acknowledgments

Thanks to [Walter Bender](https://github.com/walterbender) for the architectural guidance and for confirming the priority of structural work over raw coverage expansion.

Thanks to [Devin Ulibarri](https://github.com/pikurasa) for mentorship throughout the proposal and onboarding process.

Thanks to [Om Santosh Suneri](https://github.com/omsuneri), whose testing infrastructure from GSoC 2025 is the foundation this project builds upon.

Thanks to [Sumit Srivastava](https://github.com/sum2it) for the mentorship support.

Thanks to the entire Sugar Labs community for the welcoming environment and collaborative discussions.

---
