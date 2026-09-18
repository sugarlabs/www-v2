---
title: "GSoC '26 Week 8 Update by Syed Khubayb Ur Rahman"
excerpt: "Implementing advanced drag-and-drop mechanics, including moving Brick Towers, managing collision spaces, and disconnecting Statement Bricks."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-gsoc-26-syed-khubayb-ur-rahman-week08"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week08,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 – 2026-07-19

---

## Goals for This Week

- Add support for moving entire Brick Towers starting from the root Brick.
- Implement a Collision space in the Workspace for Statement connector points.
- Build support for disconnecting Statement Bricks from one another.

---

## This Week's Achievements

This week was packed with major functional improvements to the workspace interactivity, focusing heavily on drag-and-drop actions, collision detection, and tree-node detachments.

### Moving Brick Towers from the Root

- **Enabled Tower Movement**: Added the ability to move entire Brick Towers across the Workspace starting from the root Brick.
- **Custom Drag Hook**: Created a `useBrickMove` hook that seamlessly attaches drag events to target Bricks using `interact.js`.
- **Drag State Tracking**: The hook efficiently tracks the complete drag lifecycle (start, move, end) when initiated on a root Brick.
- **Real-time Store Updates**: During the move phase, the hook collects the position delta and constantly updates the target Brick's precise coordinates in the `useBrickLayoutStore` Zustand store, ensuring the Tower flawlessly follows the cursor.

### Statement Connector Points in Collision Space

- **Collision Space Setup**: Established a robust Collision space within the Workspace specifically tailored for Statement connector points.
- **Dynamic Registration**: Whenever a Statement Brick is dragged from the Palette into the Workspace, all of its connector points are automatically registered into the Collision space.
- **Position Syncing**: As a Brick is moved, its corresponding points are dynamically updated and kept fully synchronized when the drag ends.
- **Bookkeeping Integration**: The connector points are strictly tied to the bookkeeping system, making it easy to instantly query the exact Brick and Tower instance associated with any given point.

### Disconnecting Statement Bricks

- **Drag Start Detachment**: Updated the drag start logic so that dragging a Statement Brick connected to a `prev` or `nested` connector automatically severs its connection with the parent Brick in the layout store.
- **New Tower Spawning**: Intelligently extracts the detached Statement Brick, along with all of its connected children, and spins them off into a brand new Tower instance starting at the current cursor coordinates.
- **Smooth Interaction**: The newly formed Tower follows the cursor smoothly immediately after detachment.
- **Collision Registration**: Upon drag release, the new Tower's connectors are accurately dumped back into the Collision space for future connections.

---

## Next Week's Roadmap

- Add support for disconnecting Argument Bricks apart.
- Create a mock tower in the workspace.

---

## Resources & References

- **PR:** [feat(masonry): Add support for being able to move Brick Towers starting from the root Brick #709](https://github.com/sugarlabs/musicblocks-v4/pull/709)
- **PR:** [feat(masonry): Add all Statement connector points in the Collision space #719](https://github.com/sugarlabs/musicblocks-v4/pull/719)
- **PR:** [feat(masonry): Add support for disconnecting Statement Bricks apart #721](https://github.com/sugarlabs/musicblocks-v4/pull/721)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
