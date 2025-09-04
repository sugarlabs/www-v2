---
title: "GSoC '25 Week 15 Update by Aditya Kumar Singh"
excerpt: "Enhanced shared mode position handling, optimized export-to-video with bounding box stabilization, and introduced AI-based stickman import from video."
category: "DEVELOPER NEWS"
date: "2025-08-25"
slug: "2025-08-25-gsoc-25-AdityaKrSingh26-week15"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week15,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 15 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-08-21 - 2025-08-27

---

## Goals for This Week

- **Goal 1:** Improve shared mode to preserve relative positions and refine deletion logic.
- **Goal 2:** Optimize export-to-video using adaptive bounding box recording.
- **Goal 3:** Add feature to import stickman animation from real videos using AI.

---

## This Week's Achievements

1. **Enhanced Shared Mode Implementation**  
  Previously, when a user dragged a stickman in shared mode, positions were reset whenever remote updates arrived. I introduced relative position preservation:
    - Maintains a local offset for each remote stickman in `remoteStickmanPositions`.
    - On incoming updates, the original joints are updated but local offset is reapplied, avoiding position jumps.

   ```javascript
   function resetRemoteStickmanPosition(stickmanId) {
     const offsetX = remoteStickmanPositions[stickmanId].offsetX || 0;
     const offsetY = remoteStickmanPositions[stickmanId].offsetY || 0;
     // Update original joints then reapply offset
   }
   ```

    - Added ability to drag and reposition remote stickmen locally without altering their frames or animation sequences.
    - Improved deletion logic, now confirmation modal now appears only when:
      - More than one stickman exists, and
      - Stickman has multiple frames.

2. **Optimized Export-to-Video Feature**  
   - Replaced full-board rendering with a computed bounding box containing all posture changes across all frames and stickmen.
   - This minimizes empty space and centers animation.
   - Algorithm:
     - Iterate through all frames of all stickmen.
     - Collect all joint coordinates.
     - Compute minX, maxX, minY, maxY → define bounding box.
     - Add margin and keep this bounding box fixed for all frames to avoid zoom flicker.
   - Benefit: Consistent view without abrupt zooming in/out during playback.
   ```javascript
    const boundingBox = { 
        minX, 
        minY, 
        width: maxX - minX, 
        height: maxY - minY 
    };
    ctx.drawImage(frameCanvas, boundingBox.minX, boundingBox.minY, boundingBox.width, boundingBox.height);
   ```
   - Export pipeline:
     - Plays frames sequentially → renders cropped canvas → records to WebM → saves to Journal.
    > Export-to-Video Feature  
    ![Origanl Canvas](https://res.cloudinary.com/djhshvtwo/image/upload/v1756201507/GSoC%2725%20Blog%20Images/1136ed0e-9987-40d1-963d-48ccfe775a02.png)
    ![Exported Video](https://res.cloudinary.com/djhshvtwo/image/upload/v1756201630/GSoC%2725%20Blog%20Images/7ab7537b-2a4c-48ab-93be-3160da923481.png)

3. **AI-based Import from Video**  
   - Implemented the first step of integrating PoseNet via TensorFlow.js to convert real videos into stickman movements.
   - Workflow:
     - Load video → extract frames.
     - Run PoseNet on each frame to detect body keypoints.
     - Normalize keypoints to match stickman joint hierarchy.
     - Generate baseFrames and deltaFrames arrays for animation.
   - Challenges:
     - Mapping PoseNet keypoints to Stickman joints.
     - Maintaining limb proportions using `enforceJointDistances()` (see activity.js).
   - This feature lays the foundation for video-to-animation import, making Stickman a real creative tool for educational content.
   > AI Import from Video 
    ![AI created Frame](https://res.cloudinary.com/djhshvtwo/image/upload/v1756201787/GSoC%2725%20Blog%20Images/ac11bcc6-1bb7-46ae-9f86-24faaab3ac15.png)

---

## Challenges & Solutions

- **Challenge:** Avoid jitter during shared mode movements.  
  **Solution:** Introduced originalJoints + offset logic with local persistence.

- **Challenge:** PoseNet joint mapping didn't align with Stickman's simpler skeleton.  
  **Solution:** Created mapping rules and normalized distances using jointConnections.

---

## Next Week's Roadmap

- Refine AI-based video import with better pose detection accuracy.
- Optimization by removing duplicated frames created by AI (two successive frames with same positions).
- Improve shared mode implementation.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
