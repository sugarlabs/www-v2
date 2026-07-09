---
title: "DMP Week 4: PR 3 Merged, Midpoint in Sight"
excerpt: "Goal 1 complete with all three PRs merged; reviewed two PRs for Walter; midpoint evaluation approaching July 14"
category: "DEVELOPER NEWS"
date: "2026-07-03"
slug: "2026-07-03-dmp-26-niravsharma-week04"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "DMP'26 Contributor at SugarLabs (Music Blocks - Refactor Temperament)"
tags: "dmp26,sugarlabs,week04,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

## Week 4 — June 30 – July 3, 2026

### What I worked on this week

I finally got PR 3 merged this week. That closes out Goal 1 - the block‑level fixes for GetCurrentInterval are done.

**PR 3 merged (July 2):**

- Fixed `GetCurrentInterval` line 157: `% 12` → `% temperamentLength`
- Fixed `GetCurrentInterval` line 169: `> 21` → `> temperamentLength + 9`
- Added tests for 19-EDO overflow guard and 12-EDO regression
- Added Walter's requested cents calculation tests

**What this means:** That means every pitch/scale function in musicutils.js and the interval blocks now actually respect the current EDO. 19‑EDO, 31‑EDO – whatever you throw at it, the math holds up.

### Also this week

Also did some reviewing for Walter this week – two PRs:

PR https://github.com/sugarlabs/musicblocks/pull/7689 - Santhosh fixed checkTemperament() so it stops crashing on JI and Pythagorean. The trick was using getTemperamentRatio() instead of reinventing the wheel.

PR https://github.com/sugarlabs/musicblocks/pull/7047 - Sampler tuner frequency was broken for flat and double‑accidental notes. The author swapped a buggy lookup for pitchToFrequency from musicutils.js. Clean fix.

### Current status

| Goal | Status |
|------|--------|
| **Goal 1a** (musicutils.js) | Complete (PR 1 + PR 2) |
| **Goal 1b** (block fixes) | Complete (PR 3) |
| **Goal 1c** (widget rendering) |  Not started |
| **Goal 2** (custom pitch blocks) |  Starting this week |

### What's coming next

**PR 4 (Goal 2) — Custom Pitch Blocks** starts (July 3):

- Audit `CustomNoteBlock` and `CustomPitchBlock`
- Parse cents from custom note strings like `"C(+42¢)"`
- Use `currentEDO` as validation bound in `PitchBlock.flow()`
- Target open by **July 14** (midpoint evaluation)

### Reflection

Honestly, this week felt good. PR 3 merged without drama, the tests actually caught what they needed to, and Walter's cents tests are finally in place - so I'm confident the math is right.

Reviewing other people's PRs was unexpectedly useful too. It forced me to poke around parts of the codebase I hadn't touched yet, and it's cool to see fixes landing elsewhere in Music Blocks.

### Links

- [PR 1 - Core EDO Math](https://github.com/sugarlabs/musicblocks/pull/7561) - merged
- [PR 2 - Remaining musicutils.js](https://github.com/sugarlabs/musicblocks/pull/7659) - merged
- [PR 3 - Block & Runtime Fixes](https://github.com/sugarlabs/musicblocks/pull/7710) - merged 
- [PR 4 - Custom Pitch Blocks](https://github.com/sugarlabs/musicblocks/pull/7712) - in progress
- [Issue #7171: Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)
