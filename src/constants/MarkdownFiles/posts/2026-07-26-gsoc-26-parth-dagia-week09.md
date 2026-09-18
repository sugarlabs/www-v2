---
title: "GSoC '26 Week 9 Update by Parth Dagia"
excerpt: "Snapping actually works now: Argument connector points live in a Collision space, Argument Bricks plug into slots, and Statement Bricks join into a single Tower - so you can build, break apart, and move a program around the Workspace."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-gsoc-26-parth-dagia-week09"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week09,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-20 – 2026-07-26  

---

## Goals for This Week

- Store the Argument connector points in a Collision space so the Workspace can be asked which connector is nearest the cursor.
- Make Bricks actually connect: Argument Bricks into Argument slots, and Statement Bricks into Statement connection points.

---

## This Week's Achievements

### Argument connector points in the Collision space - [PR #734](https://github.com/sugarlabs/musicblocks-v4/pull/734)

Last week the path utility learned to hand back connector bounds. This week those bounds needed somewhere to live. I added a Collision space for Argument connector points in the Workspace: when a Brick is dropped in from the Palette its Argument connectors go in, and when a Brick is moved the points get updated once the drag ends.

The other half of this was book-keeping. A connector point on its own isn't enough - when a query comes back saying "this is the nearest slot", you need to know which Brick and which Tower that slot belongs to before you can do anything with it. So every point in the Collision space is stored alongside that mapping.

### Connecting Argument Bricks - [PR #737](https://github.com/sugarlabs/musicblocks-v4/pull/737)

This is where it starts feeling like a real program builder. Drop a Value or Expression Brick near an empty Argument slot and it plugs in. The Collision space gets queried for the closest empty slot within a snap distance, the connection is validated (the slot has to be empty, and it can't be a slot on the same Tower you're dragging), then the Brick's Output connector snaps in, gets linked as an Argument of the target Brick, and the two Towers merge into one. The parent Brick's shape is recomputed and the layout runs again, so the Brick it just swallowed changes its size the way you'd expect.

### Connecting Statement Bricks - [PR #738](https://github.com/sugarlabs/musicblocks-v4/pull/738)

Same idea, harder case. Statements stack, so a connection can be a next, a prev, or a nestedNext inside a compound Brick like `Forever`, and the notches have to match before any of it is allowed. On drop I query the Statement Collision space for the closest open connection point within snap distance, validate it, then snap the whole dragged Tower into place, link the Bricks, merge the Towers, and re-run the layout.

With both of these in, the Workspace does what you'd want it to do: you can snap Bricks together, pull them back apart, and move them around freely.

![A Music Blocks program built in the Workspace by snapping Bricks together: a start Brick holding a Forever loop, with a set instrument Brick and three note Bricks stacked inside it, each note carrying a value Brick and a pitch Brick in its Argument slots.](/assets/Developers/parth-dagia/gsoc26-week9-connected-tower.png "A full program assembled entirely by snapping Bricks in the Workspace.")

---

## Challenge

The challenge this week was one I made for myself. I started out trying to do all of this in a single PR as a series of commits, and Syed and I hadn't sat down to agree on the design of the snapping engine before either of us started building. Those two things together stretched what should have been one week's work into more than that - a big PR is hard to review, and it's harder still when two people are writing towards the same thing with slightly different pictures of it in their heads.

Splitting it into three PRs along the lines the tickets already suggested fixed most of it. The real lesson is the one before that though: the plan we made in week 7 said what to build and in what order, but not how the snapping engine itself should be shaped. That conversation was worth having up front, and I'd rather find that out now than in week 12.

---

## Next Week's Roadmap

Connecting works, but it's still a bit of a guess for the user until the Workspace tells them where a Brick is about to land. Next up is the visual feedback while connecting - showing the target connection point as you drag - and then removing Bricks, reusing the same `detachSubtree` routine that disconnecting already uses.

---

## Resources & References

- **PR:** [#734 Add all Argument connector points in the Collision space](https://github.com/sugarlabs/musicblocks-v4/pull/734)
- **PR:** [#737 Add support for connecting Argument Bricks together](https://github.com/sugarlabs/musicblocks-v4/pull/737)
- **PR:** [#738 Add support for connecting Statement Bricks together](https://github.com/sugarlabs/musicblocks-v4/pull/738)
- **Planning:** [Six-week plan and tickets](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.rlueajs95u4n)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu for the reviews across all three PRs, and to Syed for building this alongside me. Thanks also to Justin Charles and Safwan Sayeed for their continued guidance, and to Devin Ulibarri, Walter Bender, and the wider Sugar Labs community.

---
