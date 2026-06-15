---
title: "GSoC '26 Week 3 Progress Report by Sonal Gaud"
excerpt: "Consolidating five per-PR validation workflows into a single unified CI pipeline for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-gsoc-26-sonal-gaud-week3"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

# Week 3 Progress Report by Sonal Gaud

**Project:** Automated Release Pipeline for Music Blocks  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-08 – 2026-06-14

---

## Overview

[Week 2](../2026-06-07-gsoc-26-sonal-gaud-week2) hardened the auto-rebase workflow and surfaced a wider conversation about review routing. Week 3 moved to the next reliability gap: five separate per-PR validation workflows that each spun up their own runner, ran `npm ci` independently, and had no shared timeout or cancellation policy. The week's deliverable is `ci.yml` — a single unified CI pipeline that replaces all five with six parallel jobs, a consistent timeout, and a cancellation policy that stops wasting runner minutes the moment a newer push arrives.

---

## The Problem with Five Separate Workflows

The audit from [Week 1](../2026-05-31-gsoc-26-sonal-gaud-week1) documented the duplication clearly: `node_js.yml`, `linter.yml`, `pr-jest-tests.yml`, `pr-cypress-e2e.yml`, and `security_scan.yml` each triggered independently on the same PR event. Each installed dependencies from scratch with no coordination. If a contributor pushed a second commit while the first batch was still running, all ten runners (two sets of five) stayed alive — there was no mechanism to cancel the now-stale first batch. On a busy day this translated directly into wasted queue time for everyone.

There were also security and correctness concerns: some of the originals used inconsistent `fetch-depth` settings, and nothing enforced a uniform Node version story across jobs.

---

## What `ci.yml` Does

The new workflow consolidates all per-PR validation into one file with six jobs that run in parallel.

**Concurrency and cancellation**

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

A newer push to the same PR immediately cancels the in-flight run. Pushes to `master` get their own group keyed on the ref, so they never cancel each other.

**Least-privilege permissions**

```yaml
permissions:
  contents: read
```

Declared at the workflow level and not widened by any individual job. No job needs write access for validation.

**Security boundary**

The workflow uses `pull_request` (not `pull_request_target`). Fork code never executes with repository secrets or a write-scoped token.

**The six jobs**

| Job | What it does |
|---|---|
| `commitlint` | Validates commit messages against the conventional-commits spec using `--from base.sha --to head.sha` |
| `lint` | Incremental ESLint + Prettier on changed `.js`/`.mjs` files only; skips the step entirely if no JS changed |
| `build` | `npm run build` across a Node 20.x / 22.x matrix with `fail-fast: false` |
| `test` | Jest with `--coverage --ci`; coverage thresholds are enforced inside Jest config; uploads to Codecov with `fail_ci_if_error: false` so a flaky upload never blocks a PR |
| `e2e` | Cypress in Chrome via `cypress-io/github-action@v6`; video disabled; screenshots uploaded as an artifact on failure |
| `security` | `npm audit --omit=dev --audit-level=high` on every PR and every push to `master` |

Every job carries `timeout-minutes: 30`.

**Files deleted**

With `ci.yml` in place the following files are no longer needed and have been removed:

- `node_js.yml`
- `linter.yml`
- `pr-jest-tests.yml`
- `pr-cypress-e2e.yml`
- `security_scan.yml`

**Files deliberately kept**

These workflows are scheduled or event-specific — they are not per-PR validation checks and do not belong in the unified pipeline:

- `auto-rebase.yml` — rebases open PRs on every push to `master`
- `conflict-check.yml` — chains off `auto-rebase.yml` via `workflow_run`
- `lighthouse-ci.yml` — performance audits (warnings only)
- `po-to-json-validation.yml` — path-filtered translation validation
- `stale.yml` — stale PR management
- `pr-category-check.yml` — label management

---

## Plans for Next Week

- Open the higher-level design discussion with mentors: what does the full release pipeline look like end-to-end, and where does the consolidation work fit into it?
- Investigate the production deployment gap identified in Week 1 — no workflow, no runbook, no backup deployer — and draft options for closing it.
- Look at the Codecov token situation for fork PRs and document the current threshold-vs-upload split clearly in the repo.

---

## Acknowledgements

Thank you to Walter Bender and Om Santosh Suneri for the continued feedback, and to the Music Blocks reviewers who tested the updated workflow on live PRs this week.

---
