---
title: "GSoC '25 Week 14 Update by Aditya Kumar Singh"
excerpt: "Enhanced shared mode ownership & visibility for Stickman, added Journal import functionality for saved stickmen, and export-to-video integration with Journal storage."
category: "DEVELOPER NEWS"
date: "2025-08-17"
slug: "2025-08-17-gsoc-25-AdityaKrSingh26-week14"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week14,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 14 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-08-14 - 2025-08-20

---

## Goals for This Week

- **Goal 1:** Improve shared mode implementation with clear ownership, visibility, and remote drag/drop support.  
- **Goal 2:** Add Journal import functionality for saved stickmen (similar to Fototoon).  
- **Goal 3:** Begin export-to-video in Journal feature.

---

## This Week’s Achievements

1. **Improved Shared Mode Implementation**  
    - The shared mode experience in Stickman has been improved. Each user now has a clear sense of **ownership** over their characters:  
    - Local stickmen are displayed in black, turning red when actively selected for editing.  
    - Remote stickmen are represented with user-specific colored markers, which makes them visible at all times but clearly distinct from editable ones.
    - Frames are now editable only if the stickman belongs to the current user. For remote stickmen, the timeline remains empty and locked, preventing accidental edits while still allowing observation of their movement.
    - Added the ability to **drag and reposition remote stickmen**. This makes collaborative arrangements easier: one user can adjust where another’s stickman stands in the scene, but without being able to alter its animation frames or joints. This separation of **movement versus editing privileges** ensures smoother teamwork during shared sessions.
    > Shared Mode Implementation  
    ![Shared Mode](https://res.cloudinary.com/djhshvtwo/image/upload/v1755528077/GSoC%2725%20Blog%20Images/57fb70a1-49a8-4fcd-97d8-42a3b818a106.png)

2. **Journal Import Functionality**  
    - Implemented the ability to import saved stickmen from the Journal, allowing users to easily retrieve and work with their previous creations.
    - When choosing to import, the Journal dialog now filters and displays only entries associated with the Stickman activity.
    - Imported stickmen are reconstructed on the canvas using their saved frames and delta movements.
    - Journal entry names are used as identifiers, making it easier for users to recognize their past creations. 
    - This feature allows users to reuse, remix, or continue working on stickmen created in earlier sessions, strengthening the connection between the Journal and creative workflows inside the Stickman activity.
    > Journal Import Functionality  
    ![Shared Mode](https://res.cloudinary.com/djhshvtwo/image/upload/v1755528027/GSoC%2725%20Blog%20Images/2d9491c0-bdfd-44fb-900f-61e967f9d968.png)

3. **Export-to-Video Feature Implemented**  
    - One of the biggest milestones this week was completing the **export-to-video feature**. Stickman animations can now be recorded and saved directly into the Journal as video files.
    - The system sequentially plays through animation frames, rendering them to a canvas.
    - A recording pipeline captures these frames into a **WebM video stream**.
    - Once complete, the video is finalized and saved in the Journal with proper metadata, making it accessible like any other video entry.
    - This implementation turns Stickman into a full animation tool — users can now **create, save, and share animations as videos**.

---

## Challenges & How I Overcame Them

- **Challenge:** Ownership consistency in shared mode  
  **Solution:** I embedded the creator’s network ID into stickman identifiers, ensuring a clear and reliable ownership check.

- **Challenge:** Balancing collaboration with restrictions.  
  **Solution:** I carefully separated drag events from frame editing logic, allowing remote stickmen to be moved but not edited.

---

## Next Week’s Roadmap

- Improve shared mode implementation.
- Improve export to video feature.
- Explore import stickmen from video using AI.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

