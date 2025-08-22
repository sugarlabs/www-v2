---
title: "GSoC ’25 Week 10 Update by Aditya Kumar Singh"
excerpt: "Improved UX and syncing in Human Body activity, enhanced Stickman dashboard visuals, redesigned proportions, and implemented Journal save & multi-stickman support."
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-gsoc-25-AdityaKrSingh26-week010"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week10,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Aditya Kumar Singh and Midterm Summary

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-07-16 - 2025-07-23

---

## Goals for This Week

- **Goal 1:** Improve Human Body UX (Tour/Doctor mode randomization, camera reset, leaderboard toggle).
- **Goal 2:** Polish Stickman activity dashboard and frame preview behavior.
- **Goal 3:** Improve stickman appearance and proportions.
- **Goal 4:** Enable multi-stickman support and journal storage.

---

## This Week’s Achievements

1. **Random Part Selection in Doctor/Tour Modes**  
   - Ensured every new session randomly selects a body part to focus on.
   - The selection is now host-driven and synced to all participants.
   ```javascript
        function selectRandomPartForDoctor() {
            presenceCorrectIndex = Math.floor(Math.random() * bodyParts.length);
            document.dispatchEvent(new CustomEvent("target-updated", {
                detail: { part: presenceCorrectIndex }
            }));
        }
    ```


2. **Camera Reset and Leaderboard Cleanup on Exit**  
    - Fixed host → client camera sync when exiting Tour mode.
    - Leaderboard UI now clears correctly when Doctor mode ends.
    ```javascript
        function resetTourState() {
            if (!window.isHost) {
                camera.position.set(defaultX, defaultY, defaultZ);
                controls.target.set(0, 1, 0);
                controls.update();
            }
            hideLeaderboard();
        }
    ```


3. **Frame Preview Enhancement in Stickman Activity**  
   - Previously, users had to add a new frame for the thumbnail preview to refresh.
   - Now, any movement or change in the canvas auto-updates the preview.
   - **Approach:**
     - Detect changes in the canvas (e.g., drag end or part movement).
     - Clone the updated canvas to the current frame’s preview.
     - This ensures instant visual feedback while animating.


4. **Stickman Design Overhaul**  
   - Revisited the drawing logic and proportions:
     - Shorter neck
     - Thicker limbs
     - Solid, filled circular head
   - Inspired by Pivot Animator to offer a more professional, relatable look.
    > Updated Stickman Design  
    ![Stickman UI](https://i.ibb.co/60VymQhm/image.webp)


5. **Multi-Stickman Canvas Support**  
   - Users can now add more than one stickman in the scene.
   - Each stickman is an isolated object with its own:
     - Position and joint data
     - Frame history
     - Selectable state
   - **Algorithm:**
     - Maintain a list of stickman instances.
     - On user interaction, determine which stickman is targeted.
     - Only that stickman responds to move, draw, and animate actions.
    > Multiple Stickman preview in acitvity  
    ![Multiple Stickman](https://i.ibb.co/s9VJBctL/image.webp)


6. **Journal Integration for Stickman**  
   - Implemented save/load logic to persist stickman data (frames, templates, active character).
   - **Approach:**
     - On save: Serialize all current stickmen, their frame sequences, and selected templates into a JSON blob.
     - On load: Deserialize and reconstruct all visual data, restoring the full session.
   - This allows users to save their progress and resume where they left.


---

## Challenges & How I Overcame Them

- **Challenge:** Preventing multiple stickmen from interfering with each other’s states.  
  **Solution:** Scoped interaction events to only apply to the selected stickman instance.

- **Challenge:** Updating previews without triggering unnecessary rendering overhead.  
  **Solution:** Triggered preview redraws only on meaningful events like drag-end or transformation complete.

---

## Key Learnings

- Learned how to architect multi-actor systems on a single canvas while maintaining performance.
- Strengthened my understanding of event-driven synchronization in real-time collaborative applications.

---

## Next Week’s Roadmap

- Fix remaining issue on Human Body
- Increase the size of Stickman
- Show frames only for selected stickman for multiple stickman
- Show joints only for selected stickman for multiple stickman
- Add popup when removing stickman with frames count >1

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

