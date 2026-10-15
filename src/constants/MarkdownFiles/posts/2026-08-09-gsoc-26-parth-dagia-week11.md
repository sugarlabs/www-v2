---
title: "GSoC '26 Week 11 Update by Parth Dagia"
excerpt: "The Workspace can be zoomed now: a pair of magnifier buttons on the canvas step a scale level, and every Brick on the canvas resizes to it - which meant fixing a units mismatch that had been sitting in the Brick model since week 5."
category: "DEVELOPER NEWS"
date: "2026-08-09"
slug: "2026-08-09-gsoc-26-parth-dagia-week11"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week11,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-03 – 2026-08-09  

---

## Goals for This Week

- Put a scale control on the Workspace canvas and hold the selected level in a store.
- Make the Bricks themselves respond to the level, so changing it resizes everything on the canvas and the layout follows.

---

## This Week's Achievements

### A scale control on the canvas - [PR #756](https://github.com/sugarlabs/musicblocks-v4/pull/756)

Brick models have carried a `scaleLevel` of 1, 2 or 3 since the shape work, each level selecting an entry from `SCALE_LEVEL_CONFIG`. Nothing had ever set it. This PR adds the control that does: a pair of magnifying glass buttons like the ones in v3, sitting to the left of the Trash so the corner stays clear for the drop target.

The level is a single Workspace wide value rather than something per Tower or per Brick, because Bricks move between Towers and a Tower whose Bricks disagree on the level has connector geometry that doesn't line up. The store clamps instead of trusting its callers, so no reader can index `SCALE_LEVEL_CONFIG` with a level it doesn't define, and a clamped-away step doesn't notify at all - re-laying out every Tower is expensive, and a click on a disabled boundary shouldn't pay for it. The bounds are derived from the config rather than hard-coded, so adding a fourth level later doesn't mean hunting for literals.

One small thing worth noting: unlike `Trash`, this control needs real pointer events, so it can't be `pointer-events-none`. That's safe here because the delegated selector `useDragFromPalette` listens on only ever matches a Palette slot, never a button.

### Scaling the Bricks to the selected level - [PR #762](https://github.com/sugarlabs/musicblocks-v4/pull/762)

This is the half that made the control do something, and it turned out to be the more interesting one.

The `scaleLevel` setter on the model already rebuilds the outline generator and notifies its update callbacks, so the views re-render on their own. The layout doesn't: `useTowerLayout` only re-runs when a root changes, so the Bricks would have sat at their new sizes with their old positions still in `useBrickLayoutStore`. Writing the level and re-running the layout had to land together, which is what the new `useWorkspaceScale` hook does - it subscribes to the level, writes it onto every Brick model in every Tower, then asks the Workspace store to refresh the layouts. That refresh replaces each Tower's root reference and deliberately leaves `position` alone, so the layout's origin fast-path stays quiet and no Tower drifts when you zoom.

The part I hadn't expected was a units mismatch in the model. The outline generator works in SVG units and the canvas works in pixels, related by the level's `brickScale`. Measurements were already going in through `pxToSvg`, but `dims`, `bounds` and the connector coordinates were coming straight back out in generator units. At level 2 that factor happens to be 1, so it was invisible for the whole of the snapping and removal work. At level 1 an Argument slot came out 1.33x too wide, and at level 3 it came out 0.8x too small - so a Brick would either rattle around in its slot or overflow it, and the notches would land in the wrong place. Adding the conversion on the way out fixed the sizes, the slots and the connector coordinates in one go, and the tests for it assert against every level in the config rather than a couple of literals, so this can't quietly regress.

Two smaller pieces rounded it off. A Brick dropped in from the Palette now takes the Workspace's current level, read at drop time rather than closed over, since those listeners bind once on mount - the Palette itself keeps its own size. And the connector points did pick up their new coordinates on their own, because the layout ends by writing `positioned`, which `Workspace` already watches to re-sync both Collision spaces. That was the one thing in the ticket I wanted to confirm rather than assume, and it held.

Here is what the same program looks like at each of the three levels.

![The Music Blocks Workspace at the smallest scale level: a start Brick holding a set instrument Brick and three note Bricks, each with a value Brick and a pitch Brick in its Argument slots, the whole program compact enough to fit on the canvas at once.](/assets/Developers/parth-dagia/gsoc26-week11-scale-level-1.png "Scale level 1 - the whole program fits on the canvas.")

![The same program at the default scale level, the Bricks noticeably larger and the program running most of the height of the canvas.](/assets/Developers/parth-dagia/gsoc26-week11-scale-level-2.png "Scale level 2 - the default the Workspace starts at.")

![The same program at the largest scale level, the Bricks and their labels large enough that the program now runs past the bottom of the canvas.](/assets/Developers/parth-dagia/gsoc26-week11-scale-level-3.png "Scale level 3 - the largest level, with the program running past the canvas.")

Same Towers, same origins, same connections - only the level changed between the three.

---

## Challenge

The challenge this week wasn't the code. Both PRs were up early in the week, and then they sat. Anindya was busy with work, and with the scaling work being the last fundamental left in the Workspace, there wasn't much that could move ahead of it - the Bricks resizing correctly is the thing everything after it assumes. They were reviewed and merged later, on the 12th, which is why this report is going out describing work that was finished before it was in.

What I'd take from it is that a blocked review isn't the same as a blocked week. Syed and I used the time to go back over what's actually left against the plan and split it between us properly, so that when the reviews landed we weren't starting from a blank page. I also spent some of it on the tests for the units conversion, which is the sort of thing that's easy to leave thin when you're moving fast and impossible to add convincingly after the fact. Waiting on someone else is going to happen on any project with one maintainer and two students pointed at the same module; the useful skill is having something worth doing while you wait.

---

## Next Week's Roadmap

Week 12 is the last one. With scaling in, the Workspace has everything it needs, so what's left is tying it off - going back over the six-week plan to make sure nothing was left half-done, and getting the module into a state someone else can pick up after GSoC.

---

## Resources & References

- **PR:** [#756 Add a scale control to the Workspace](https://github.com/sugarlabs/musicblocks-v4/pull/756)
- **PR:** [#762 Scale the Bricks in the Workspace to the selected scale level](https://github.com/sugarlabs/musicblocks-v4/pull/762)
- **Planning:** [Six-week plan and tickets](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.rlueajs95u4n)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu for the reviews on both PRs, and to Syed for building this alongside me. Thanks also to Justin Charles and Safwan Sayeed for their continued guidance, and to Devin Ulibarri, Walter Bender, and the wider Sugar Labs community.

---
