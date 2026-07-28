---
title: "GSoC '26 Week 9 Update by Syed Khubayb Ur Rahman"
excerpt: "Added support for disconnecting Argument Bricks and created a mock tower in the Workspace."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-gsoc-26-syed-khubayb-ur-rahman-week09"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week09,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-20 – 2026-07-26

---

## Goals for This Week

- Add support for disconnecting Argument Bricks apart.
- Create a mock tower in the Workspace to test interactions.

---

## This Week's Achievements

This week I continued refining the drag-and-drop mechanics and block interactions within the Workspace, extending the disconnect logic to Argument Bricks and setting up a mock environment for testing.

### Disconnecting Argument Bricks

- **Drag Start Detachment**: Updated the drag start event handler in `useBrickMove` to detect if the target Argument Brick has a parent connection. If it does, dragging it automatically severs its connection with the parent Brick's input within the `useBrickLayoutStore`.
- **New Tower Spawning**: The logic intelligently extracts the detached Argument Brick, along with any of its connected children, and uses them to form a newly created Tower instance starting exactly at the current cursor coordinates.
- **Smooth Cursor Tracking**: The original Tower remains unchanged while the newly formed Tower seamlessly follows the drag cursor.
- **Collision Space Updates**: Ensured that once the drag ends, the new Tower's connector points are accurately updated and registered in the Collision space.

### Mock Tower in the Workspace

- **Workspace Testing Environment**: Created a mock tower directly within the workspace. This acts as a reliable playground to rigorously test all the new dragging, connecting, and disconnecting mechanics in real-time.

![Mock Tower](assets/Images/gsoc26-Syed-khubayb-ur-rahman/mock-tower.png)

---

## Next Week's Roadmap

- Implement visual feedback observations when connecting and disconnecting Bricks.
- Implement undo and redo functionality for changes made within the Workspace.

---

## Resources & References

- **PR:** [feat(masonry): Add support for disconnecting Argument Bricks apart #739](https://github.com/sugarlabs/musicblocks-v4/pull/739)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
