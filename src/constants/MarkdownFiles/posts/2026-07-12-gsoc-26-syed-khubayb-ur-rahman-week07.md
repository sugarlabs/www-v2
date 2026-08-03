---
title: "GSoC '26 Week 7 Update by Syed Khubayb Ur Rahman"
excerpt: "Implementing Brick Tower bookkeeping in the Workspace and drag-and-drop micro-animations in the Palette."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-gsoc-26-syed-khubayb-ur-rahman-week07"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week07,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 – 2026-07-12

---

## Goals for This Week

- Implement bookkeeping of Brick Towers within the Workspace.
- Enhance the user experience by adding drag-and-drop micro-animations to the Palette.

---

## This Week's Achievements

This week's focus was centered around improving the interactivity of the Music Blocks Workspace and Palette, specifically focusing on Brick Tower management and drag-and-drop mechanics.

### Brick Tower Bookkeeping in the Workspace

This week, I successfully implemented the foundational bookkeeping logic required to manage multiple independent Brick Towers inside the Workspace. Since a workspace can have various unconnected code segments floating around, it is critical to have a system that tracks them efficiently. 

To achieve this, I built a robust state management system utilizing a Zustand store. This store is specifically dedicated to keeping track of the various Tower states. For each Tower, it maintains essential data including its complete tree structure, its individual dimensions, and its exact spatial position on the canvas (including position offsets). 

The new Workspace shell component has been updated to act as a subscriber to this central store. Whenever the state changes, the Workspace intelligently re-renders all the Tower components, ensuring each one is placed accurately at its correct coordinate. This establishes a solid base for advanced drag-and-drop mechanics and collision detection in the future.

### Drag and Drop Micro-Animations

In addition to the core logic, I focused on enhancing the user experience by adding polished micro-animations for the drag-and-drop interactions in the Palette. In block-based programming environments, immediate and smooth visual feedback is crucial for making the interface feel responsive and natural to users.

I designed a fluid transition for the drag lifecycle. When a user picks up and drags a Brick out of the Palette, the Brick's original entry is hidden, and its container wrapper smoothly resizes down (reducing its height). This dynamic sizing gives the realistic illusion that the Brick was physically "pulled out" of its slot rather than just disappearing abruptly. 

Conversely, once the drag operation ends—whether the Brick is successfully dropped into the Workspace or the action is canceled—the wrapper smoothly sizes back up, and the Brick entry becomes visible again. This attention to detail eliminates jarring visual jumps and significantly improves the overall feel of the application.

---

## Next Week's Roadmap

- Add support for being able to move Brick Towers starting from the root Brick.
- Add all Statement connector points in the Collision space.
- Add support for disconnecting Bricks apart.

---

## Resources & References

- **PR:** [Implement bookkeeping of Brick Towers in the Workspace #684](https://github.com/sugarlabs/musicblocks-v4/pull/684)
- **PR:** [Implement drag and drop micro-animations in Palette #688](https://github.com/sugarlabs/musicblocks-v4/pull/688)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
