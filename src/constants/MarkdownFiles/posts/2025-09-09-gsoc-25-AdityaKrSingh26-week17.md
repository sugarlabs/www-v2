---
title: "GSoC '25 Week 17 and Bug Fixes Update by Aditya Kumar Singh"
excerpt: "Final polish: template palette, fullscreen mode implemented, export/import refinements, shared-mode fixes, localization and final report PRs."
category: "DEVELOPER NEWS"
date: "2025-09-09"
slug: "2025-09-09-gsoc-25-AdityaKrSingh26-week17"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week17,AdityaKrSingh26,final"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 17 Progress and Bug Fix Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-09-03 - 2025-09-10

---

## Goals for this week

- Land final UX polish and localization for the Template Palette.  
- Implement fullscreen viewing mode and evaluate behavior after canvas resize.  
- Make export-to-video produce standard-resolution outputs and verify parity with preview.  
- Harden PoseNet-based import from video and prevent multi-person crashes.  
- Finish documentation / PRs: weekly progress + final report.  

---

## This week’s achievements

1. **Published progress and final report PRs**
    - Created and submitted the weekly progress PR documenting the code changes, decisions, and open issues.  
    - Submitted the final GSoC report as a PR summarizing the whole project and linking the main feature merges. The final report contains the overall timeline, metrics, and merged PR list.
    - Final Submissions : 
        - [GSoC '25 Final Report by Aditya Kumar Singh](https://www.sugarlabs.org/news/all/2025-08-31-gsoc-25-AdityaKrSingh26-final-report)
        - [GSoC '25 Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/etFtxnpi)



3. **Fullscreen viewing mode**
    - **Fullscreen implemented.** A fullscreen toggle hides toolbars and the timeline, enlarges the canvas to the viewport, and reveals an "unfullscreen" control. The code adds/removes a `fullscreen` class on the canvas and calls `resizeCanvas()` to recompute dimensions. 
    - **Optimized fullscreen behavior for video preview.** Frame list / thumbnails are hidden in fullscreen to provide an uncluttered video-showing mode. This makes the activity better for presentations or playback-only viewing.

4. **Export-to-Video — fixed resolution and preview parity**
    - **Standard resolutions.** Export pipeline changed from recording the raw bounding box dimensions to rendering at fixed standard resolutions (720p and 1080p). This makes outputs predictable and easier to share. The export code now renders the animation frames into a fixed-size canvas before feeding them to MediaRecorder.
    - **Verified preview parity.** Exported video frames are rendered using the same frame reconstruction (baseFrames + deltaFrames) and same `enforceJointDistances()` constraints that power the activity preview, ensuring exported video matches what users see in the editor.

5. **Import from video (PoseNet) — safer, more robust**
    - **Limit to one stickman per video import.** Import flow now only produces a single stickman from a video to avoid crashes and ambiguity when PoseNet detects multiple people. This was a pragmatic choice to keep the feature reliable on low-end devices and in shared sessions. The import flow and library-loading guard live in `activity.js`.
    - **Model selection & loading UX.** PoseNet can be loaded as either MobileNet (fast, light) or ResNet (heavier, more accurate). A loading spinner and disabled UI guard prevent user interactions while TensorFlow.js/Posenet models initialize. There is also a timeout to avoid indefinite blocking.
    - **Frame de-duplication & joint constraints.** Duplicate consecutive frames are skipped and `enforceJointDistances()` is applied after mapping PoseNet keypoints to the stickman skeleton to avoid odd limb lengths. This reduces noise and yields smoother imported animations.

6. **Shared mode improvements and remote-offset handling**
    - **Remote offsets stored separately.** When a remote user drags a stickman locally, the offset is stored in `remoteStickmanPositions[stickmanId]` and only applied during rendering. This prevents network updates from wiping out local adjustments.
    - **Global vs local moves clarified.** Frame 0 changes are considered global (applied across all frames); moves on later frames are local. Tutorials were updated to explain this, and color-coded indicators were added to the UI. The tutorial and network handlers are updated in the activity code.
    - **Preserve local positioning across drags.** Multiple drag ops no longer accumulate errors; offsets are re-applied consistently so remote stickmen remain stable during playback.

7. **Joint color coding & small UI/UX refinements**
    - **Joint color coding restored:** red = end joints (movable), orange = parent joints (move children), green = hip joint (dragging center). These colors improve discoverability for new users. (Color code implemented in the rendering path.)
    - **Template palette UI finalized.** Buttons follow Sugar UI look-and-feel, previews autoplay muted, and palette close/active state behavior is stabilized.

---

## Challenges & How I Overcame Them

- **Challenge:** Users dragging remote stickmen observed position jumps when network updates arrived.  
  **Solution:** Keep original network joints and a separate local offset; apply offset only during rendering. This preserves local adjustments without interfering with incoming updates.

- **Challenge:** PoseNet sometimes detects multiple people and mapping to a single stickman led to crashes or malformed animations.  
  **Solution:** Limit video import to a single detected person, randomize imported stickman placement to avoid overlap, and apply `enforceJointDistances()` after mapping. Also added frame deduplication to reduce noise.

---

## Acknowledgments

Thanks to Lionel Laské and Samarth Bagga for patient guidance and code review, and to the Sugar Labs community for testing and helpful UX feedback. The work this week packaged final UX polish, export/import stability, and the template system into a form ready for the wider community to try and extend.

---
