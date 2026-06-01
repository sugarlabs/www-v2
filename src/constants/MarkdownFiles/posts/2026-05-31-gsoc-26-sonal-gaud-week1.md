---
title: "GSoC '26 Community Bonding Blog by Sonal Gaud"
excerpt: "Introducing my GSoC '26 project on Automated Release Pipeline for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-05-31"
slug: "2026-05-31-gsoc-26-sonal-gaud-week1"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->
## Community Bonding Reflections for GSoC 2026

**Project:** Automated Release Pipeline for Music Blocks  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-05-25 – 2026-05-31

---

## Goals for This Week

### Week 1 Plan: Audit Before Automation

No workflow gets touched until the current state is formally documented - every design decision must be grounded in verified facts, not assumptions.

This week's focus was creating `Docs/RELEASE_AUDIT_CURRENT_STATE.md`, a ground-truth snapshot covering all CI/CD workflows, the Gulp build pipeline, the Express development server, the service worker, and the translation pipeline. Alongside the audit: mapping the full end-to-end deployment flow from a developer fork all the way to `musicblocks.sugarlabs.org`, and building a workflow dependency graph to identify duplicate `npm ci` runs, caching gaps, and consolidation opportunities.

---

## This Week's Achievements

### Deliverable 1: Release Infrastructure Audit - Current State

After a thorough inspection of the `sugarlabs/musicblocks` repository at HEAD `d7e16bc81`, here is what the audit uncovered:

**Workflows Mapped**

All workflows under `.github/workflows/` were documented in full, including triggers, permissions, secrets, external actions, and known limitations:

- `auto-rebase.yml` - Rebases open PRs onto master after each push; uses `execFileSync` (no shell interpolation) to prevent branch-name injection attacks. Cannot rebase fork PRs that haven't enabled maintainer edits.
- `conflict-check.yml` - Runs *after* auto-rebase via `workflow_run` trigger; labels PRs that still have conflicts with `needs-rebase` and posts instructions. Retry logic handles GitHub API eventual consistency.
- `lighthouse-ci.yml` - Parallel desktop + mobile Lighthouse audits on every PR and master push. All thresholds are **warnings only** - no build failure on score degradation. Reports go to `temporary-public-storage` (expire after a period; no historical trend preserved).
- `linter.yml` - Incremental ESLint + Prettier check on changed `.js`/`.mjs` files only. Uses `pull_request` (not `pull_request_target`) - safe for fork PRs.
- `node.js.yml` (Smoke Test) - Validates `npm ci` on Node 20 and 22. The `npm run build` script is empty in `package.json`, so effectively only dependency installation is verified.
- `po-to-json-validation.yml` - Path-filtered; activates only on `.po` file changes. Runs `convert_po_to_json.py` and verifies the resulting `locales/*.json` is already committed. No automated commit-back - contributors must run the script locally.
- `pr-category-check.yml` - Three-phase label management: category validation (fails CI if no checkbox checked), size labeling (XS through XXL by line count), and area labeling (javascript, css, i18n, ci-cd, etc.).
- `pr-cypress-e2e.yml` - Runs Cypress E2E tests in Chrome. Starts the Express server and waits up to 120 seconds for it to be available. Video recording disabled; screenshots uploaded on failure.
- `pr-jest-tests.yml` - Most expensive workflow: runs `npm ci` **twice** and Jest **twice** (once on the PR branch, once on master) to produce a coverage delta comment on the PR. Coverage thresholds are low (34% statements, 29% branches, 41% functions).
- `security_scan.yml` - Runs `npm audit --omit=dev --audit-level=high`. Only production dependencies are checked; no SAST, no secret scanning.
- `stale.yml` - Marks PRs stale after 60 days, closes after a further 3 days. Issues are explicitly excluded.

**Deployment Flow Documented**

Two distinct deployment paths were mapped:

| Environment | URL | Update Mechanism |
|---|---|---|
| Preview | `sugarlabs.github.io/musicblocks` | Automatic - every push to master via GitHub Pages (no build step) |
| Production | `musicblocks.sugarlabs.org` | **Manual** - performed by Walter Bender; no workflow, no runbook, no backup deployer |

The production deployment mechanism is entirely undocumented in-repo. No workflow file, Dockerfile, or deployment script exists for it. This is the single largest operational gap in the project.

**DORA Metrics Baseline Established**

| Metric | Preview | Production |
|---|---|---|
| Deployment Frequency | Elite (~5–14 commits/day to master) | Low (~2–4 releases/year) |
| Lead Time for Changes | Elite (minutes) | Low (days to months) |
| Change Failure Rate | ~0.36% (7 reverts in ~1,950 merges) | Cannot be measured separately |
| MTTR | Elite (fix merged → auto-deploys) | Unknown / unbounded |



---

## Week 2 Plan

### Deliverable 2: CI/CD Pipeline Design for Translation 

The Music Blocks project has a known tension between feature development cycles and translation update cadence. Deliverable 2 designs the branching strategy and pipeline architecture that resolves this tension before any code is written.


---

## Acknowledgements

Thank you to Walter Bender and Om Santosh Suneri for the guidance and context during week one. Also thanks to SugarLabs community Looking forward to moving from observation to design in Week 2.

---