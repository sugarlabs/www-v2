---
title: "GSoC '26 Week 3 Update by Parth Dagia"
excerpt: "Adding semicircular notches and rounded corners to the brick outline, and making the path stroke-width aware."
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-gsoc-26-parth-dagia-week03"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week03,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-08 – 2026-06-14  

---

## Goals for This Week

- Add connector notches (top, bottom, left, args) on top of the coordinate walk.
- Add rounded corners.

---

## This Week's Achievements

The week was mostly geometry: working out the semicircular notches, aligning them with the argument slots, making sure two connected bricks seat together cleanly, and rounding the corners on top of all of it.

### Stroke-width aware outline - [PR #539](https://github.com/sugarlabs/musicblocks-v4/pull/539)

Before adding notches, the outline needed to handle stroke width properly. The stroke was getting clipped at the edges because the width calculation didn't reserve any space for it.

Fixed by reserving s/2 clearance on the left and right of both content boxes (head and tail), so the total reserved per box is s. strokeWidth is now a required input instead of optional. 

Added 26 new tests covering the V2 width and height formulas, the inset path strings at s = 0 and s = 4, and closed-loop checks. 45 tests passing in total.

### Left and right notches - [PR #583](https://github.com/sugarlabs/musicblocks-v4/pull/583)

Two notch types, one on each side:

- **Right edge**: one concave semicircular groove per argument slot. Each groove is centred at a fixed offset below its slot, so they stay aligned with the arguments regardless of slot height.
- **Left edge**: a single convex tab where the brick plugs into its parent. Aligned with the top-right groove. Its radius is one stroke width smaller than the groove so the two seat together cleanly at the stroke.

The left tab is deliberately excluded from the brick's width and height, otherwise two connected bricks would be pushed apart. It's reported separately as leftNotchDepth, which the Path view uses as a gutter so the tab isn't clipped. The label is centred on the notch line.

Both notches are off by default. Added a Storybook playground (argCount / argHeight / left + right toggles) to check alignment visually, plus tests for groove count, tab alignment, dimensions, label position, and path closure.

### Rounded corners - [PR #542](https://github.com/sugarlabs/musicblocks-v4/pull/542)

Added a required cornerRadius input (pass 0 for sharp corners). Each edge is shortened by cornerRadius at both ends and a quarter-circle SVG a arc fills the corner. Outer corners are convex; the two back corners of the nesting cavity are concave, so they use the opposite sweep flag. The path's starting point begins one radius past the top-left corner so the closing arc forms that corner cleanly.

computeDimensions2 is untouched, since rounding curves inward from edges that already define the box.

Added tests for the r = 0 identity case, the rounded path strings, arc count, convex vs concave sweep flags, closure, and dimensions staying unchanged. 58 tests passing.

One known limit: on a compound brick the smallest feature is the step (TAIL_STEP_H = 10), so a radius above 5 makes that edge negative. Clamping and validation will come in a follow-up.

### What didn't ship this week

Decorator parameters all move to week 4.

---

## Challenge & Key Learning

The notches in v3 were a different shape, so the semicircular version in v4 meant new geometry. Most of the week went into two things: the formula for groove position, and the radius relationship between the right groove and the left tab.

If the groove and tab radii match exactly, two connected bricks would have a visible seam along the stroke. Making the tab radius one stroke width smaller than the groove closes that.

The other tricky piece was alignment under variable argument heights. Centring each groove at a fixed offset below its slot, instead of using the slot midpoint, keeps grooves aligned regardless of slot heights.

**Learning:** when two shapes are meant to connect, the geometry has to account for the stroke between them, not just the curves.

---

## Next Week's Roadmap

- Define the decorator parameters that finish a brick: colour, label text, background colour, and state properties.
- If time permits, list all decorators inside a palette component.

---

## Resources & References

- **PRs:** [#539 stroke-width aware outline](https://github.com/sugarlabs/musicblocks-v4/pull/539), [#583 left and right notches](https://github.com/sugarlabs/musicblocks-v4/pull/583), [#542 corner radius](https://github.com/sugarlabs/musicblocks-v4/pull/542)
- **Research doc:** [Notch geometry notes](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.c6frjjkgu8qg), [Stroke-width notes](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.n7kv7l4q265b)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **Reference file:** [path.ts](https://github.com/sugarlabs/musicblocks-v4/blob/develop/modules/masonry/src/brick/utils/path.ts)

---

## Acknowledgments

Thanks to Anindya Kundu, Justin Charles, and Safwan Sayeed for the back-and-forth on the notch geometry and for spotting the stroke-width clipping issue. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
