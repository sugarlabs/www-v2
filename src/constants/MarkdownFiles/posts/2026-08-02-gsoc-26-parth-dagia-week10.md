---
title: "GSoC '26 Week 10 Update by Parth Dagia"
excerpt: "Bricks can leave the Workspace now: a Trash drop target sits in the corner of the canvas, and dropping a Tower on it takes the Tower out along with its connector points and its layout entries."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-gsoc-26-parth-dagia-week10"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week10,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 – 2026-08-02  

---

## Goals for This Week

- Put a Trash drop target on the Workspace canvas that reacts when a Brick is dragged over it.
- Remove the dragged Tower when the drag ends over the Trash, and clean up everything the removed Bricks leave behind.

---

## This Week's Achievements

### A Trash drop target on the canvas - [PR #746](https://github.com/sugarlabs/musicblocks-v4/pull/746)

The Trash is pinned to the bottom right of the Workspace and only renders while there is at least one Tower on the canvas, so it shows up on the first drop from the Palette and goes away again once the Workspace is empty. That is read straight off `useWorkspaceStore` rather than being tracked as its own piece of state.

The part that needed some thought was the hover state. `interact.js` owns the pointer for the whole length of a Brick drag, so CSS hover never fires, and the Trash is `pointer-events-none` like `DragGhost` so it can't swallow the drag of a Brick parked underneath it. Instead its bounds go into a small store, and the drag move handler in `useBrickMove` tests the pointer's client coordinates against those bounds to set the hovered flag, then clears it when the drag ends. It is the same approach `useDragFromPalette` already uses to test a release against the canvas rect.

### Removing a Tower on drop - [PR #747](https://github.com/sugarlabs/musicblocks-v4/pull/747)

Drag a Tower onto the Trash, let go, and it's gone.

Dragging a connected Brick already detaches it into a Tower of its own, so removal only ever has to act on the Tower currently being dragged, and the Tower it came out of was re-laid out at the start of the drag. `removeTower` takes care of the Tower itself and purges its points from both the Statement and the Argument Collision space, along with the book-keeping that maps those points back to their Brick and Tower, so nothing stale is left to be queried on the next drop.

What was missing was the layout store. `useBrickLayoutStore` only ever merged entries in and had no way to drop them, so the `coords`, `mounted` and `positioned` entries of every removed Brick would have stayed behind for Bricks that no longer exist. It got an action that clears entries for a set of Brick IDs, and the drag end handler calls it with the whole removed sub-tree. A drop over the Trash also skips the usual connection attempt and the connector re-sync, so a Tower on its way out can't snap onto something on the way there.

![A Music Blocks program in the Workspace: a start Brick holding a set instrument Brick and three note Bricks, each note carrying a value Brick and a pitch Brick in its Argument slots, with the Trash pinned in the bottom right corner of the canvas.](/assets/Developers/parth-dagia/gsoc26-week10-workspace-before-removal.png "The Workspace before removal, with three note Bricks stacked under the start Brick.")

![The same Workspace after the three note Bricks were dragged onto the Trash, leaving only the start Brick and the set instrument Brick inside it.](/assets/Developers/parth-dagia/gsoc26-week10-workspace-after-removal.png "The same Workspace after the note Bricks were dropped on the Trash.")

Both PRs were reviewed and merged, which closes out the removal work.

---

## Challenge

Nothing much to report this week. Both tickets were small and well scoped, the design conversation we had in week 9 meant there was no guesswork left about how the drag lifecycle should behave, and the work went smoothly.

---

## Next Week's Roadmap

Next up is scaling the Workspace. A scale control goes on the canvas first, and then the Bricks themselves have to respond to the selected scale level, which touches the path utility, the layout, and the connector points in the Collision spaces.

---

## Resources & References

- **PR:** [#746 Add a Trash drop target to the Workspace](https://github.com/sugarlabs/musicblocks-v4/pull/746)
- **PR:** [#747 Remove a Tower from the Workspace when it is dropped on the Trash](https://github.com/sugarlabs/musicblocks-v4/pull/747)
- **Planning:** [Six-week plan and tickets](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.rlueajs95u4n)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu for the reviews on both PRs, and to Syed for building this alongside me. Thanks also to Justin Charles and Safwan Sayeed for their continued guidance, and to Devin Ulibarri, Walter Bender, and the wider Sugar Labs community.

---
