---
title: "GSoC '26 Week 10 Update by Syed Khubayb Ur Rahman"
excerpt: "Implemented real-time visual feedback for connecting and disconnecting Bricks in the Workspace."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-gsoc-26-syed-khubayb-ur-rahman-week10"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week10,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 – 2026-08-02

---

## Goals for This Week

- Implement visual feedback UI and logic when connecting Bricks.
- Implement visual feedback UI and logic when disconnecting Bricks.
- Ensure smooth drag interactions without performance bottlenecks.

---

## This Week's Achievements

This week was all about adding polish and intuitive visual cues to the drag-and-drop mechanics. Providing immediate visual feedback is essential for a fluid user experience in a block-based environment.

### Connection Feedback UI and Logic

- **Snap Preview and Hints**: Created `SnapHintOverlay.tsx` to project a colored glowing indicator on candidate connectors, and `SnapPreviewView.tsx` to render a translucent ghost clone of the dragged tower at the active snap position.
- **Dynamic Spatial Calculation**: Wired up the `resolveCandidateConnection` logic inside `useBrickMove` and `useDragFromPalette` to continuously evaluate connections on pointer move, updating the dedicated preview store.
- **Pulse Animations**: Added `brickSnapPulse` CSS keyframes and implemented `triggerBrickAnimation` to fire a satisfying pulse animation upon successfully snapping Bricks together.

![Connection Preview 1](assets/Images/gsoc26-Syed-khubayb-ur-rahman/connection-preview-1.png)

![Connection Preview 2](assets/Images/gsoc26-Syed-khubayb-ur-rahman/connection-preview-2.png)

### Disconnection Feedback UI and Logic

- **Detachment Shadows**: Built the `DisconnectShadowView.tsx` UI overlay to instantly render a grey footprint at the exact detachment socket when a brick is ripped out of a tower. This provides context of where the brick came from.
- **Edge Case Handling**: Implemented logic to capture the exact detachment socket prior to the tower split, properly handling edge cases where a nested parent brick cavity collapses.
- **State Locking**: Secured the `dragStateRef` lock during the drag start phase to prevent React re-renders from prematurely clearing the disconnect shadow.

![Disconnection Preview 1](assets/Images/gsoc26-Syed-khubayb-ur-rahman/disconnection-preview-1.png)

![Disconnection Preview 2](assets/Images/gsoc26-Syed-khubayb-ur-rahman/disconnection-preview-2.png)

### Foundational State and Performance

- **Dedicated Preview Store**: Created a separate `useConnectionPreviewStore` to track snap targets and disconnect shadows without directly coupling them to the React component tree initially, avoiding infinite re-renders during fast drag interactions.
- **Layout Effects**: Updated layout hooks like `useTowerLayout` to use `useLayoutEffect`, ensuring coordinates are safely extracted and layout flashes are prevented.

---

## Next Week's Roadmap

- Implement Importing and Exporting the Program/Project. *(Note: Initially, the goal was to implement Undo/Redo, but after a discussion, we decided to prioritize fundamental requirements and focus on Import/Export first).*

---

## Resources & References

- **PR:** [As a user, I can observe feedback when connecting/disconnecting Bricks #743](https://github.com/sugarlabs/musicblocks-v4/pull/743)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the rest of the Sugar Labs community.


---
