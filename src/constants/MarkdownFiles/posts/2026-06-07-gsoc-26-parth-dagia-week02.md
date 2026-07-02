---
title: "GSoC '26 Week 2 Update by Parth Dagia"
excerpt: "Redesigning the outline generator around inner bounding boxes and absolute corner points."
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug: "2026-06-07-gsoc-26-parth-dagia-week02"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week02,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-01 – 2026-06-07  

---

## Goals for This Week

- Define the remaining decorator parameters (label, colour, icons, tooltips, selectors).
- Wire the new outline generator into the brick model.
- Build four representative bricks and verify they render.

---

## This Week's Achievements

The plan changed mid-week. During a design review with my mentors I realised the generator I built last week was still doing the same thing `path.ts` does: the caller pre-computes widths and passes boolean flags. Any change to padding or min-width has to be made in two places. So the week ended up being about redesigning the generator before adding anything on top of it.

### Inner sizes in, outer shape out - [PR #537](https://github.com/sugarlabs/musicblocks-v4/pull/537)

The new generator (`brickOutline.ts`) takes only the four inner bounding boxes: `mainLabel`, `paramLabels`, `args`, and `nesting`. From those, `computeDimensions()` derives every outer measurement (W, H, gaps, arg row positions, nesting offsets). Change `PADDING` or `MIN_WIDTH` once, and the path string, width, and height all update together.

The W and H formulas were worked out on the whiteboard with Anindya during the design call.

### Absolute corners instead of relative strokes

`path.ts` draws with relative pen commands (`v 12`, `h -8`, `a 4 4 ...`). To know where the pen actually is you have to replay every prior command, which is where all the running vertical totals in the old code came from.

The new generator walks the four sides clockwise (Top → Right → Bottom → Left), computes the absolute corner points as it goes, and only converts to `M` / `L` / `Z` at the very end. Every corner is independently knowable, and the point list reads like the picture.

The Storybook story renders the four inner bounding boxes as coloured regions to verify the layout end to end.

### What didn't ship this week

The decorator parameters and the four representative bricks didn't get done. The redesign took the week. Those move to week 3.

One honest caveat on the current outline: it draws straight edges only. The connector notches, rounded corners, and centroid connection points that `path.ts` has aren't on it yet. The dimension-driven layout is proven, but it isn't a drop-in replacement for `path.ts` until the notches go back on.

---

## Challenge & Key Learning

The redesign is really two changes that only make sense together: the input side (inner boxes in, outer shape out) and the output side (relative strokes to absolute corners). I tried writing one of them without the other early in the week and the file got messy fast, half the geometry was still computed by the caller and the other half by the generator.

Doing both at once means `computeDimensions()` is the single source of truth, and the path string is just a coordinate walk on top of it.

**Learning:** if you're refactoring one side of a function, check whether the other side needs the same refactor. Doing both at once is cleaner than two halves that don't agree.

---

## Next Week's Roadmap

- Add connector notches (top, bottom, left, args) on top of the coordinate walk.
- Add rounded corners and centroid connection points so the new generator is a drop-in replacement for `path.ts`.
- Start on the decorator parameters (label, colour, background, icons), the work originally planned for this week.

---

## Resources & References

- **PR:** [#537 structured brick outline generator](https://github.com/sugarlabs/musicblocks-v4/pull/537)
- **Research doc:** [Brick outline notes](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.zenp5d2wawyw)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **Reference file:** [`path.ts`](https://github.com/sugarlabs/musicblocks-v4/blob/develop/modules/masonry/src/brick/utils/path.ts)

---

## Acknowledgments

Thanks to Anindya Kundu, Justin Charles, and Safwan Sayeed for catching the coupling problem in the original design and for whiteboarding the dimension math. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
