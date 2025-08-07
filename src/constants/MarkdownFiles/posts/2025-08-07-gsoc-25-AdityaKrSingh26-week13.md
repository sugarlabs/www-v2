---
title: "GSoC '25 Week 13 Update by Aditya Kumar Singh"
excerpt: "Fixed critical model switching bugs in Human Body activity, enhanced Stickman animation with individual frame management, transitioned to relative positioning, and began implementing shared mode functionality."
category: "DEVELOPER NEWS"
date: "2025-08-07"
slug: "2025-08-07-gsoc-25-AdityaKrSingh26-week13"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week13,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 13 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-08-07 - 2025-08-13  

---

## Goals for This Week

- **Goal 1:** Finalize the Human Body activity by resolving the critical model switching bug in shared mode.
- **Goal 2:** Implement individual frazme management for each stickman in the Stickman activity.
- **Goal 3:** Transition from absolute to relative positioning for stickman coordinates.
- **Goal 4:** Begin implementing shared mode functionality for the Stickman activity.

---

## This Week’s Achievements

1. **Fixed Critical Model Switching Bug in Human Body Activity**  
    - **Problem Identified:** In shared mode, when User A switched to a non-default model (e.g., skeleton) and User B joined the shared session, the application would incorrectly display both the default body model and the current model overlapped, creating visual confusion. 
    - **Root Cause Analysis:** The issue occurred in the model synchronization logic where:
        - New users joining a shared session would load the default "body" model first
        - The host's current model state wasn't properly communicated to new joiners
        - Model switching messages weren't prioritized during the initial sync process.

2. **Individual Frame Management for Stickman Animation**  
    - **Enhancement Overview:** Previously, all stickmen shared a common frame timeline, which created confusion during multi-character animation. Now each stickman maintains its own independent frame sequence.
    - **Memory Optimization Approach:**
        - Used JSON deep copying to prevent reference sharing
        - Added timestamp tracking for frame management and debugging
    - **Benefits Achieved:**  
        - Each stickman can have different numbers of frames (1-100+ frames per character)
        - Independent timeline scrubbing for complex multi-character scenes
        - Memory-efficient frame storage with delta compression

3. **Transition to Relative Positioning System**  
    - **Previous System Limitation:** Stickmen were positioned using absolute canvas coordinates, making it difficult to:
        - Move entire characters as units
        - Scale animations proportionally
        - Implement consistent character spacing
    - **Solution Architecture:**
        **Data Structure Redesign:**
        1. **Anchor Point System:** Each stickman has a base anchor coordinate (x, y)
        2. **Relative Joint Positions:** All joints stored as offsets from anchor
        3. **Transformation Matrix:** Anchor acts as transformation origin

        - **Algorithm: Relative to Absolute Conversion**
            1. **Input:** Stickman index for processing
            2. **Anchor Retrieval:** Get stickman's anchor coordinates
            3. **Joint Iteration:** Loop through all joints in the stickman
            4. **Coordinate Calculation:** For each joint, compute absolute position = anchor + joint.offset
            5. **Rendering Preparation:** Pass absolute coordinates to drawing functions

        - **Algorithm: Character Movement**
            1. **Input:** Stickman index and new position delta
            2. **Anchor Update:** Modify only the anchor coordinates
            3. **Automatic Propagation:** All joints automatically move with anchor
            4. **Single Operation:** Entire character moves with one coordinate change

        **Benefits of Implementation:**
        - Character movement: O(1) operation instead of O(n) where n = number of joints
        - Proportional scaling becomes simple multiplication of offset values
        - Template system can store relative coordinates for reusability
        - Collision detection simplified to anchor point + bounding box calculations

        **Advantages Gained:**  
        - Easy character repositioning by moving anchor point
        - Proportional scaling of entire characters
        - Simplified collision detection between characters
        - Better support for character templates and presets

3. **Shared Mode Implementation**  
    - **Architecture Design:** Built the groundwork for real-time collaborative stickman animation using Sugar's presence system.
    - **How Shared mode works:**  
        - Each stickman is represented as a presence object with unique ID
        - Host can create, update, and delete stickmen in the shared session
        - Presence updates are broadcasted to all connected users
        - Users can see real-time changes made by others
        - Users can edit their own stickmen independently while syncing changes
        - Conflict resolution via timestamp comparison to handle simultaneous edits
    - **Optimization Strategies:**
        - Delta compression for joint updates (only send changed coordinates)
        - Throttling mechanism to prevent message flooding during rapid movements
    > Shared Mode Implementation  
    ![Shared Mode](https://res.cloudinary.com/djhshvtwo/image/upload/v1754553152/GSoC%2725%20Blog%20Images/ee3d7398-c986-4565-8e09-f5fef3387271.png)

---


## Challenges & How I Overcame Them

- **Challenge:** Model switching bug in Human Body activity caused visual overlap when users joined shared sessions.  
  **Solution:** Analyzed THREE.js scene graph structure and implemented proper model cleanup sequences. Added state synchronization logic to ensure new users receive the correct current model instead of defaulting to body model first.

- **Challenge:** Converting from shared frame timeline to individual frame management for each stickman without breaking existing animations.  
  **Solution:** Refactored animation UI architecture using JSON deep copying and implemented memory optimization with frame limits. Maintained backward compatibility by converting old shared frames to individual sequences during load.

- **Challenge:** Migrating coordinate system from absolute to relative positioning while maintaining visual consistency.  
  **Solution:** Implemented anchor point system with mathematical transformations. Updated all rendering logic to convert relative coordinates to absolute for drawing, allowing O(1) character movement

---

## Next Week’s Roadmap

- Improve shared mode implementation.
- Add Journal import functionality for Stickman.
- Begin work on export to video feature and save the video in journal.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

