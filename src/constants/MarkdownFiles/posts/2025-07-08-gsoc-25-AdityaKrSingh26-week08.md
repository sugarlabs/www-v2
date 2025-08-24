---
title: "GSoC ’25 Week 08 Update by Aditya Kumar Singh"
excerpt: "Resolved key issues in shared Paint & Tour workflows, introduced a real-time XO-icon leaderboard in Doctor mode, and bootstrapped the Stickman activity scaffold."
category: "DEVELOPER NEWS"
date: "2025-07-09"
slug: "2025-07-08-gsoc-25-AdityaKrSingh26-week08"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week08,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-07-03 – 2025-07-09  

---

## Goals for This Week

- **Goal 1:** Bug-hunt Shared Paint & Tour PR  (Restore zoom-out capability when a session starts at a custom FOV, Guarantee that newcomers instantly receive every painted mesh, Ensure the palette reflects the host-selected mode (Paint / Tour / Doctor) on join.)
- **Goal 2:** Finish Doctor refactor – replace the legacy username-only leaderboard with XO icons tinted to each participant’s Sugar colour.    
- **Goal 3:** Kick-off Stickman Activity – create a blank shell with full toolbar assets ready for upcoming features.  


---

## This Week’s Achievements

1. **Fixed Zoom-Out Limitation**  
    - **Issue:** When the Human Body activity was opened with a custom zoom level, users were unable to zoom out due to improper FOV (Field of View) limits.  
    - **Fix:**  
        - Implemented clamped zoom logic by calculating and bounding the `camera.fov` value between 5° and 75°.  
        - Both scroll wheel and toolbar zoom now honor the same constraints.  
    - This method ensures that camera zoom respects a realistic viewing range, preventing the camera from getting stuck in an unusable state.
    ```javascript
        function getFov(zoom) {
            return Math.min(Math.max(zoom, 5), 75); // clamp zoom to valid FOV range
        }
2. **Shared Paint Mode – Late Joiner Synchronization**  
    - **Issue:** When a new user joined an already shared Paint session, the previously painted parts weren’t visible to them.  
    - **Fix:**  
        - The host maintains a complete list of painted parts and their corresponding color mappings in paintedPartsList.  
        - When a new user joins, the host invokes: `sendFullPaintDataToNewUser(presenceId)`   
        - This sends all `meshName → hexColor` mappings via the `syncAllPaintData` action.  
        - Peers then replay this data and apply consistent material colors to each 3D mesh
    - This method ensures that camera zoom respects a realistic viewing range, preventing the camera from getting stuck in an unusable state.


3. **Mode Palette Sync Across Clients**  
   - **Issue:** The palette mode (Paint, Tour, Doctor) would sometimes display inconsistently across users in a shared session.
    - **Fix:** 
        - Centralized mode state and now rebroadcast on every mode change.  
        - When any user joins, their client listens to `syncCurrentMode` and updates icons accordingly:   
    - **Effect:** UI remains consistent regardless of when users join or switch modes.


4. **Redesigned Doctor Mode Leaderboard with XO Icons**   
    - **Objective:** Replace the old leaderboard (just usernames and scores) with a Sugar-style UI using XO icons and user colors. 
    - **Implementation Highlights:**
        - `generateXOLogoWithColor(userColor)`: A dynamic SVG generator that outputs an XO icon with the user’s stroke and fill colors, derived from Sugar presence data.
        - `showLeaderboard()`: Constructs a ranked visual layout showing each user’s XO icon, name, and score—updated in real time with every correct answer.
    - **Algorithm Steps:**
        - Maintain a scoreBoard object mapping presenceId → {score, userInfo}.
        - Upon a correct answer:
            - Host sends a `scoreUpdate` broadcast.
            - All peers update their UI leaderboard.
        - Leaderboard HTML is re-rendered using updated user data and SVG icons.
        ![Shared Doctor Mode](https://i.ibb.co/jkLPqWDP/image.webp)   


3. **Stickman Activity – Initial Scaffold**  
    - Created an initial version of the activity.
    - Toolbar now displays all expected icons (draw, move, add frame, delete frame, play, stop).
    - Currently, button clicks do nothing—but the structure is laid out to integrate drawing and animation logic next week.
    ![Stickman Basic UI](https://i.ibb.co/mCpmRp3J/image.webp) 



---

## Challenges & How I Overcame Them

- **Challenge:** Simultaneous paint broadcasts leading to race conditions.  
  **Solution:** Ensured all paints are stored only on host, then synced post-join via a single action.

- **Challenge:** Dynamic XO SVGs without image files.  
  **Solution:** Used inline SVG with JS string templates to create colored icons on-the-fly.


---

## Key Learnings

- Gained in-depth understanding of Three.js camera manipulation and persistence.  
- Built a robust synchronization pattern using presence broadcasts and authoritative state snapshots.  
- Practiced UI/UX consistency across Sugarizer activities with reusable SVG elements and Sugar-specific color schemes.  

---

## Next Week’s Roadmap

- Write Weekly Blog Post summarizing progress, screenshots, and key learnings.   
- Fix Remaining Issues in Human Body Activity   
- Stickman Dashboard – Draw & Move   
- Stickman Frame Management   

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
