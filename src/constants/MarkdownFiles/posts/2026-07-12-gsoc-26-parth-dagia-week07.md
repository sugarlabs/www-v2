---
title: "GSoC '26 Week 7 Update by Parth Dagia"
excerpt: "Shipped drag-from-Palette into the Workspace, then spent most of the week planning out the next six weeks with Syed - breaking the whole connection story into epics, stories, and tasks."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-gsoc-26-parth-dagia-week07"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week07,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 – 2026-07-12  

---

## Goals for This Week

- Let the user drag a Brick out of the Palette and drop it into the Workspace.
- Sit down with Syed and plan out how we spend the next six weeks, since the remaining work is the trickiest part of the project.

---

## This Week's Achievements

### Dragging Bricks from the Palette - [PR #686](https://github.com/sugarlabs/musicblocks-v4/pull/686)

Until now the two halves sat next to each other but didn't talk: the Palette listed all the Bricks styled from their config, and the Workspace was a barebones canvas. This week I connected them. The user can now grab a Brick from the Palette and drop it into the Workspace as a real, movable Brick.

Most of the work lives in a `useDragFromPalette` hook that handles the drag lifecycle, a `DragGhost` component that follows the cursor so there's something to look at while dragging, and a `brick-model-factory` utility that turns a Palette catalog entry into an actual Brick model the Workspace understands. The rest is wiring: the Workspace listens for the drop, the store records the new Brick, and I added unit tests across the hook, the factory, and the store so this doesn't quietly break as we start stacking connection logic on top of it.

### Planning the next six weeks

This was the bigger part of the week, and honestly the more important one. Everything left in the project is the hard, interaction-heavy stuff - moving Towers, disconnecting Bricks, snapping them together, feedback while connecting, removing, undo/redo, scaling, folding, selection - and a lot of it depends on getting the order right. So Syed and I sat down and broke the whole thing into epics, stories, and tasks, writing each one out as a concrete user story with objectives instead of a vague "make Bricks connect" line.

A good chunk of the time went into debating the sequence and checking whether we were missing anything before we started building. The clearest example: connecting Bricks needs us to find the nearest open connection point to the cursor quickly, which means a spatial data structure - so we settled on a QuadTree, one for Statement connection points and one for Argument slots. But a QuadTree is only useful if the Brick path utility can hand us connector coordinates in the first place, and the Workspace has to store those connection points as Bricks come and go. Laying it out as a plan made those dependencies obvious: connector coordinates first, then storing connection points, then the QuadTrees, then the actual snapping and the visual feedback on top. It also surfaced smaller things we would have tripped over later, like reusing a single `detachSubtree` routine for both disconnecting and removing Bricks.

---

## Challenge

The challenge this week wasn't code, it was resisting the urge to just start typing. It's tempting to jump straight into "connect Bricks" because it's the exciting part, but the connection story is where a wrong sequencing decision would cost the most to unwind. Turning a fuzzy goal into an ordered list of tasks, and being honest about what each one actually depends on, took real thought. It's less satisfying than a merged PR, but I think it's the thing that keeps the next six weeks from turning into rework.

---

## Next Week's Roadmap

Next week we confirm the plan with our mentors and then start on the snapping track. That begins with the groundwork the rest of it stands on: moving Brick Towers from the root, disconnecting Bricks within a Tower, and updating the Brick path utility to return connector coordinates - the pieces that make snapping possible before snapping itself.

---

## Resources & References

- **PR:** [#686 Dragging Bricks from the Palette](https://github.com/sugarlabs/musicblocks-v4/pull/686)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Syed for planning the road ahead with me, and to Anindya Kundu, Justin Charles, and Safwan Sayeed for their continued guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
