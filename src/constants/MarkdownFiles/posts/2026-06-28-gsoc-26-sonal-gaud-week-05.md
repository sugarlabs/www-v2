---
title: "GSoC '26 Week 5 Progress Report by Sonal Gaud"
excerpt: "Drafting the releaseconfig.js integration for Turtle Blocks and Music Blocks with URL-driven mode detection"
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-gsoc-26-sonal-gaud-week5"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

# Week 5 Progress Report by Sonal Gaud

**Project:** Automated Release Pipeline for Music Blocks<br>
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)<br>
**Organization:** [Sugar Labs](https://sugarlabs.org)<br>
**Reporting Period:** 2026-06-22 - 2026-06-28<br>

---

## Overview

Following the scoping work in [Week 4](/news/all/2026-06-21-gsoc-26-sonal-gaud-week4), this week focused on implementing the proposed `js/releaseconfig.js` as a single source of truth for Turtle Blocks vs. Music Blocks release configuration. A draft PR was opened to consolidate release-specific flags, splash screen assets, tab title, and loading text into one file with URL-driven mode detection.<br><br>

---

## Draft PR: Wiring `releaseconfig.js` into `index.html` and `activity.js`

Draft PR: [sugarlabs/turtleblocksjs#517](https://github.com/sugarlabs/turtleblocksjs/pull/517)<br><br>

The key changes in the draft PR were:

- Loading `js/releaseconfig.js` synchronously as the first script in `<head>`, so `RELEASE_TAB_TITLE` and the splash logic are resolved before the rest of the page runs.<br>
- Setting `document.title` from `RELEASE_TAB_TITLE` instead of a hardcoded string.<br>
- Removing the now-duplicate `THIS_IS_MUSIC_BLOCKS` / `THIS_IS_TURTLE_BLOCKS` declarations from `js/activity.js`, which would have caused a redeclaration conflict after introducing the shared config file.<br><br>

These changes continue the release-automation work, with `releaseconfig.js` now acting as the single source of truth for Turtle vs. Music Blocks mode, resolved from URL or hostname. The tab title is now wired into the same flag, and the old hardcoded duplicate declarations have been removed.<br><br>

---

## Known Follow-ups (Not Blockers for the Draft PR)

A few rough edges were noted for future cleanup, but intentionally left out of this PR to keep the scope focused:

- The `<title>` still has a hardcoded "Turtle Blocks" placeholder that briefly flashes before `RELEASE_TAB_TITLE` overwrites it and should be neutralized, such as by setting it to an empty string.<br>
- The old `activity.js` lines are commented out rather than deleted and should be removed outright as dead code.<br>
- The `DEFAULT_IS_MUSIC_BLOCKS` fallback and the turtle splash asset format (inline base64 vs. a file path) remain open from earlier review.<br><br>

---

## Plans for Next Week

- Gather feedback on the draft PR from mentors and the team.<br>
- Incorporate any requested changes and aim to merge the PR.<br>
- Investigate the remaining follow-up items and prioritize them for future PRs.<br><br>

---

## Acknowledgements

Thank you to Walter Bender and Om Santosh Suneri for continued feedback and guidance as this draft was prepared.
