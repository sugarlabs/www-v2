---
title: "GSoC '26 Week 4 Progress Report by Sonal Gaud"
excerpt: "Scoping a single source of truth for release config to unify Turtle Blocks and Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-gsoc-26-sonal-gaud-week4"
author: "@/constants/MarkdownFiles/authors/sonal-gaud.md"
tags: "gsoc26,sugarlabs,musicblocks,ci-cd,release-automation,infrastructure"
image: "assets/Images/GSOC.webp"
---

# Week 4 Progress Report by Sonal Gaud

**Project:** Automated Release Pipeline for Music Blocks
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** 2026-06-15 - 2026-06-21

---

## Overview

[Week 3](/news/all/2026-06-14-gsoc-26-sonal-gaud-week3) shipped `ci.yml`, the unified CI pipeline, and closed with an open question for mentors: what does the full release pipeline look like end-to-end? Week 4 was spent scoping out one piece of that answer. Turtle Blocks and Music Blocks currently ship as two codebases with duplicated config and a release flag that has to be hand-edited before every release. The plan taking shape is a single `js/releaseconfig.js` file as the source of truth, plus URL-driven detection so one bundle can eventually serve either app depending on where it's loaded from.

---

## The Problem Being Scoped

The release flag `THIS_IS_MUSIC_BLOCKS` is currently declared inline in `js/activity.js` and has to be flipped by hand for every Turtle vs. Music release, with no detection logic behind it. The splash screen is a giant base64-encoded `<img>` tag hardcoded directly into `index.html`, the tab title is static, and the rotating loading-screen text array is hardcoded too. None of it is mode-aware, so every release means editing markup by hand and hoping nothing gets missed. This week's work was mapping out exactly what a fix would need to touch before writing it.

---

## What's Planned: `releaseconfig.js`

The plan is for a new `js/releaseconfig.js` to consolidate everything that differs between the Turtle and Music releases into one file, loaded synchronously as the very first script in `<head>` - before requireJS even starts, so every later script would see the resolved flag.

**What it would own**

| Export | Purpose |
|---|---|
| `THIS_IS_MUSIC_BLOCKS` / `THIS_IS_TURTLE_BLOCKS` | The flags the rest of the codebase already reads |
| `TURTLE_SPLASH_SRC` | The animated turtle SVG, lifted out of `index.html` as a `data:image/svg+xml;base64` URI |
| `MUSIC_BLOCKS_SPLASH_SRC` | Placeholder until the real Music Blocks asset is ready |
| `getSplashScreenSrc()` | Returns the correct splash for the active mode |
| `RELEASE_TAB_TITLE` | `"Turtle Blocks"` or `"Music Blocks"` |
| `LOADING_TEXTS` | The mode-specific rotating loading-screen text array |

**URL-driven detection**

The proposed `resolveIsMusicBlocks()` would pick the mode at page load using this precedence:

| Priority | Check | Example | Result |
|---|---|---|---|
| 1 | `?turtle` query param | `localhost/?turtle` | Turtle |
| 1 | `?music` query param | `localhost/?music` | Music |
| 2 | hostname contains "turtle" | `turtle.sugarlabs.org` | Turtle |
| 2 | hostname contains "music" | `musicblocks.sugarlabs.org` | Music |
| 3 | fallback `DEFAULT_IS_MUSIC_BLOCKS` | `localhost`, `file://` | Turtle (current default) |

Query params would override hostnames, which is what should make it possible to QA one mode on the other's domain without touching DNS.

**Wiring changes to make**

- `js/activity.js:51-52` - the inline `const THIS_IS_MUSIC_BLOCKS = false` will need to go once `releaseconfig.js` declares the same name first.
- `index.html` - add `<script src="js/releaseconfig.js"></script>` as the first script in `<head>`, synchronous, no `defer`.
- `index.html` - set the tab title via `document.title = RELEASE_TAB_TITLE;`.
- `index.html` - replace the hardcoded base64 `<img src=…>` with `<img id="splash-image">`, with `src` set by `getSplashScreenSrc()`.
- `index.html` - swap the hardcoded loading-text array for `const texts = LOADING_TEXTS;`.

---

## Plans for Next Week

- Write `js/releaseconfig.js` and wire it into `index.html` per the plan above.
- Drop in the real Music Blocks splash asset if it's ready, otherwise keep the placeholder and track it as a follow-up.
- Run the three-path smoke test and bring the DNS and service-worker open questions to mentors.

---

## Acknowledgements

Thank you to Walter Bender and Om Santosh Suneri for continued feedback as this plan was scoped out.

---
