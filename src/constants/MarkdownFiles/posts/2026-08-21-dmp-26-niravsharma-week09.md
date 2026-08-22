---
title: "DMP '26 Week 09: Goal 4 Under Review, and Starting Goal 6 (Temperament Import/Export)"
excerpt: "Goal 4 (PR #8059) is in review and Devin flagged a widget that won't open. I started Goal 6 (PR #8137): importing and exporting temperaments as Music Blocks JSON and Scala .scl files."
category: "DEVELOPER NEWS"
date: "2026-08-21"
slug: "2026-08-21-dmp-26-niravsharma-week09"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 9: Goal 4 (PR #8059) under Devin's review with a widget-open bug; started Goal 6 (PR #8137) for JSON and Scala .scl temperament import/export, kept as draft; reviewed PR #7969."
tags: "dmp26,sugarlabs,musicblocks,temperament,week09"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)
**C4GT DMP 2026 / GSoC 2026**
**Reporting Period:** August 15 – August 22, 2026

---

## Goal 4 is in Devin's hands now

After last week's push on PR #8059, this week was mostly waiting on review. Devin (pikurasa) took a look, and his first note was a blocker: the Temperament widget doesn't open at all on the branch right now. He attached a screenshot showing the widget failing to launch, so there's a real bug to track down before this can move forward.

Vanshika had already left review comments asking for a few things: a regression test for `_invert()` on a non-12 EDO like 5 or 19, making the case-insensitive mode lookup consistent with the save path (right now saving `MyMode` and `mymode` could create two entries instead of updating one), and some manual checks that the control bar and event handlers aren't duplicated after repeated EDO switches. GitHub also flagged merge conflicts against master, so a rebase is due.

So #8059 is alive but not landing until the widget-open issue is understood and the tests are in.

## Starting Goal 6 (kept as a draft on purpose)

While that's in review, I started PR #8137: importing and exporting temperaments. The formats are Music Blocks JSON and Scala's `.scl`.

I'm keeping it a draft for now, and the reason is dependency order. Goal 4 (#8059) has to be fully reviewed and tested by Devin and by me before Goal 6 can really be exercised, because the import/export work sits on top of the same temperament machinery. Until Goal 4 is solid, there's no point pretending Goal 6 is ready to merge.

## What's in PR #8137

JSON export saves the whole definition: ratios, note labels, intervals, reference pitch, and metadata. Import validates the structure, registers the temperament live, and it shows up in the palette immediately.

Scala export writes the ratios as cents using `ratioToSCLCents`, dropping the 1/1 line per the spec. Import reads either ratio lines (like `3/2`) or cent values (like `701.955`), and prepends 1/1 for you.

There are three ways to use it. The toolbar Save dropdown has two new entries, JSON and SCL, and the Load button takes both. The Temperament widget has Export and Import buttons right there. And you can drag a `.json` or `.scl` file onto the canvas and it loads.

A few things came up while building it. Octave computation now stores the actual octave number instead of a fixed 2, so imported temperaments sound right in `getCustomFrequency` and the widget. The export/import icons were pointing at missing files, so I swapped them for ones that exist. And the loading animation now stops properly after an import instead of hanging the screen.

Tests: 7 new in `SaveInterface.test.js` covering the JSON payload shape, validation, SCL serialization, SCL parsing (with the 1/1 prepend), and rejecting malformed SCL input.

## PR reviews

This week I reviewed PR #7969 from lavjeetrai. It's a pie-menu fix meant to keep all the interval tabs rendered for visual consistency while disabling the musically invalid ones.

I tested it the way a user would: open the Interval Name block's pie menu, pick "perfect" on the outer ring, and check that the inner degree ring shows only 1, 4, 5, 8. It didn't. I was seeing all eight intervals (1-8) for "perfect", and the same problem on the other interval types. I posted my steps with a screenshot and flagged it to lavjeetrai and Walter. Walter agreed it was still exposing options that shouldn't be there. The PR's intent (keep everything visible but disabled) turns out to run against the intended UX, which is to hide non-existent intervals entirely, so it needs a rethink.

## What's next

First, figure out why the Temperament widget won't open on #8059, get the rebase and the missing tests in, and close out Goal 4. Then un-draft Goal 6 and take it through review. Issue #7171 is the umbrella.

---

## Links

- [PR #8059 (Under Review)](https://github.com/sugarlabs/musicblocks/pull/8059)
- [PR #8137 (Draft)](https://github.com/sugarlabs/musicblocks/pull/8137)
- [PR #7969 (Reviewed)](https://github.com/sugarlabs/musicblocks/pull/7969)
- [Issue #7171: Refactor Temperament](https://github.com/sugarlabs/musicblocks/issues/7171)
