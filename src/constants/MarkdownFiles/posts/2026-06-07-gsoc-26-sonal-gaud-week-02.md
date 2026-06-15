---
title: "GSoC '26 Week 2 Progress Report by Sonal Gaud"
excerpt: "Hardening the auto-rebase workflow and opening up the CODEOWNERS vs merge-queue discussion for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug: "2026-06-07-gsoc-26-sonal-gaud-week2"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

# Week 2 Progress Report by Sonal Gaud

**Project:** Automated Release Pipeline for Music Blocks  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-01 – 2026-06-07

---

## Overview

[Week 1](../2026-05-31-gsoc-26-sonal-gaud-week1) was mostly about observing how Music Blocks ships today and mapping out where automation would help. Week 2 was the first hands-on step: hardening the piece of CI that touches every open contribution, the auto-rebase workflow  and starting a wider conversation about how the project routes reviews as it grows. A reliable release pipeline starts with a reliable everyday merge flow, so this felt like the right place to begin.

## Hardening the auto-rebase workflow
 
The auto-rebase workflow keeps open pull requests current with `master` so that a PR is mergeable the moment a review finishes. The existing version worked, but it had a few rough edges that showed up on busier days. This week I reworked it for reliability and submitted the changes in [PR #7477](https://github.com/sugarlabs/musicblocks/pull/7477).

## Plans for Next Week

- Continue improving the existing CI flows, building on the rebase work and looking for other reliability and speed wins.
- Hold a higher-level design discussion with my mentors to align the automation work with the broader project requirements, and start shaping the release pipeline design rather than just observing it.

---

## Acknowledgements

Thank you to Walter Bender and Om Santosh Suneri for the guidance and context this week, and to the wider Sugar Labs community for the feedback on the rebase workflow. Looking forward to moving from observation toward design as the project takes shape.

---