---
title: "GSoC '26 Week 1 Update by Parth Dagia"
excerpt: "Designing an outline-only brick definition for Music Blocks v4 and a separate SVG path generator file built around it."
category: "DEVELOPER NEWS"
date: "2026-06-01"
slug: "2026-06-01-gsoc-26-parth-dagia-week01"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week01,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 1 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-05-25 – 2026-05-31  

---

## Goals for This Week

- Decide which parameters define a brick's outline.
- Read the existing v4 path generation code.
- Take a first pass at a cleaner SVG generator built only around the outline.

---

## This Week's Achievements

### Outline parameters

Most of the week went into figuring out which parameters belong to the outline and which are rendering details that sit on top. I read v4's [`path.ts`](https://github.com/sugarlabs/musicblocks-v4/blob/develop/modules/masonry/src/brick/utils/path.ts), looked at the [v3 brick catalog](https://github.com/sugarlabs/musicblocks) to see the shapes we need to support, and split every parameter into shape vs. visual.

What I'm moving forward with for the outline: `hasTopNotch`, `hasBottomNotch`, `hasLeftNotch`, `containsNesting`, `nestingDimensions`, `argumentDimensions`, `labelWidth`, `labelHeight`, `secondaryLabel`, `strokeWidth`.

Things like `color`, `tooltip`, `labelType`, `labelSource`, `argumentLabels`, `selector`, `icon`, `image`, and `variableArguments` are intentionally left out at this layer they're rendering, not outline. Full notes in the [research doc](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.0).

### Outline-only path generator - [PR #535](https://github.com/sugarlabs/musicblocks-v4/pull/535)

With the parameter list settled, I wrote a new generator that consumes only those outline parameters and produces the SVG path, bounding box, and connection points. It lives next to the existing `path.ts` so nothing in the running app changes yet.

Added 40 [Vitest](https://vitest.dev/) tests, all passing. They run the same inputs through the new file and the old `path.ts` and check the path string, bounding box, and connection points match.

### Cleanup along the way - [PR #534](https://github.com/sugarlabs/musicblocks-v4/pull/534)

While reading the masonry code I noticed three broken TypeScript imports that were silently typing `TConnectionPoints` and `TColor` as `any`. Fixing them surfaced ten previously-hidden type errors plus a missing field on `TConnectionPoints` that the producer in `path.ts` actually returns. Types only, no runtime change.

---

## Challenge & Key Learning

I started the week trying to define the *entire* brick outline, label, colour, tooltip, selectors, everything in one schema and one generator. The schema kept growing and the generator I was writing on top of it was starting to mix shape and rendering, which is the same problem `path.ts` already has.

I broke it into two passes instead: outline first (this week), then everything else on top (next week). Once I did that the rest of the week went quickly.

**Learning:** when a parameter list keeps growing while you're designing it, that's a signal to split the layer, not to keep adding fields.

---

## Next Week's Roadmap

- Define the remaining parameters (label, colour, icons, tooltips, selectors).
- Wire the new outline generator into the brick model.
- Build four representative bricks against the full definition (stack, expression, compound, if-else) and verify they render.
- Goal by end of week 2: brick definition work done for the catalog.

---

## Resources & References

- **PRs:** [#535 outline-only path generator](https://github.com/sugarlabs/musicblocks-v4/pull/535), [#534 type import fixes](https://github.com/sugarlabs/musicblocks-v4/pull/534)
- **Research doc:** [Brick outline parameters](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.0)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **Reference file:** [`path.ts`](https://github.com/sugarlabs/musicblocks-v4/blob/develop/modules/masonry/src/brick/utils/path.ts)

---

## Acknowledgments

Thanks to Anindya Kundu, Justin Charles, and Safwan Sayeed for the back-and-forth on which parameters belong to the outline layer. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
