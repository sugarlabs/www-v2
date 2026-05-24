---
title: "GSoC '26 Week 1 Blog by Sonal Gaud"
excerpt: "Week 1 of my GSoC '26 project on Automated Release Pipeline for Music Blocks — Infrastructure Audit and Documentation."
category: "DEVELOPER NEWS"
date: "2026-05-24"
slug: "2026-05-24-gsoc-26-sonal-gaud-week1"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->
## Community Bonding Reflections for GSoC 2026

**Project:** Automated Release Pipeline for Music Blocks
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** May 8, 2026 – May 24, 2026

---

## About Me

Hello everyone! I'm Sonal Gaud, based in Mumbai, India. I'll be working on the **Automated Release Pipeline for Music Blocks** at Sugar Labs this summer as a Google Summer of Code 2026 contributor.

I enjoy building automation and CI/CD systems, things that are stable, predictable, and easy for others to work with. My open source journey includes contributing to OpenTelemetry, setting up a containerized CI pipeline with Playwright-based E2E testing for ODK-X Application Designer, and contributing to Music Blocks itself fixing build and test issues, integrating Husky pre-commit hooks with lint-staged, tightening ESLint and Prettier enforcement, and improving CI workflow reliability.


---

## Project Overview

Music Blocks has nine GitHub Actions workflows handling lint, tests, security, and performance, a solid CI foundation. But the moment code merges, everything goes manual. Releases to `sugarlabs.github.io/musicblocks` happen through undocumented manual pushes with no staging, no rollback, no changelog, and no smoke tests. 

This project builds a complete CI/CD and release automation system on top of what already exists: multi-environment deployments spanning ephemeral PR previews, auto-promoted staging, and approval-gated production; semantic versioning and automated changelog generation; a corrected and optimized Docker image; and proper rollback workflows with post-deployment health checks.



---

## Community Bonding Activities

The community bonding period focused on connecting with the Music Blocks community, discussing project direction and expectations with mentors, collaborating with contributors, and helping newcomers get familiar with the codebase and contribution workflow.


---

## Week 1 Plan: Audit Before Automation


No workflow gets touched until the current state is formally documented every design decision must be grounded in verified facts, not assumptions.
This week I'll be creating Docs/RELEASE_AUDIT_CURRENT_STATE.md covering all nine workflows, the Dockerfile, Gulp pipeline, Express server, service worker, and translation pipeline. Alongside that: mapping the full deployment flow, building a dependency graph to spot duplicate npm ci runs and caching gaps.

---



## Acknowledgements

Thanks to my mentors Walter Bender and Om Santosh Suneri for their guidance and support throughout the community bonding period, and to the broader Sugar Labs community for the warm welcome and engaging discussions.

---
