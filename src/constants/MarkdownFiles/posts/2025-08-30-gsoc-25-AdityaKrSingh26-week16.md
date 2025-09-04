---
title: "GSoC '25 Week 16 Update by Aditya Kumar Singh"
excerpt: "Advanced shared mode with global vs local moves, extended PoseNet-based video import with MobileNet/ResNet, template palette with event-driven design, and multiple UX refinements."
category: "DEVELOPER NEWS"
date: "2025-08-30"
slug: "2025-08-30-gsoc-25-AdityaKrSingh26-week16"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week16,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 16 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-08-25 - 2025-09-01

---

## Goals for This Week

- **Goal 1:** Improve shared mode implementation with fine-grained move handling.  
- **Goal 2:** Extend AI-based video import feature with multiple PoseNet backbones and UX polish.  
- **Goal 3:** Build a reusable template palette for stickman animations.  
- **Goal 4:** Address UI inconsistencies and quality-of-life fixes.  

---


## This Week’s Achievements

1. **Shared Mode Enhancements**
    - In earlier weeks, shared mode already supported ownership markers and drag/drop of remote stickmen. This week’s focus was on movement semantics and ensuring consistency across animations:
    - **Relative Position Preservation During Animation**
        - Each stickman maintains both its original joints (from remote updates) and a local offset (applied when dragged). During animations, incoming updates refresh the joints but do not overwrite local offsets, so remote stickmen appear stable in the scene.
        ```js
        function applyOffset(stickman, frame) {
            const base = stickman.originalFrames[frame];
            const offset = stickman.localOffsets[frame] || { x: 0, y: 0 };
            return base.map(joint => ({
                x: joint.x + offset.x,
                y: joint.y + offset.y
            }));
        }
        ```
    - **Global vs Local Moves**
        - Moves performed on frame 0 (the initial frame) are tagged as global and applied across all frames.
        - Moves on later frames are local and affect only that frame’s playback.
        - This required maintaining a globalOffset in the stickman object and a localOffsets dictionary keyed by frame index.

    - **Tutorial Updates**: The help/tutorial system was updated to explain new behavior and color-coding:
        - Black Head → local stickman.
        - Red dots → active/selected stickman.
        - Yellow dot at waist → For dragging stickman across screen.
        - Colored Head → remote stickman (color corresponds to the user).

2. **Video Import Improvements (PoseNet → Stickman)**
    - This task built on last week’s AI integration, moving from a working prototype into a more robust import pipeline:
    - **Debugging with Hardcoded PoseNet Samples**: Extracted sample keypoints directly from PoseNet output to manually verify joint mappings. This surfaced alignment issues between PoseNet’s 17-keypoint skeleton and Stickman’s simpler joint hierarchy.
    - **Support for Multiple Backbones**: Added flexibility to run PoseNet with two different architectures:
        - MobileNetV1 (~4.2M params) → optimized for performance on low-power devices.
        - ResNet50 (~25M params) → slower but higher accuracy, especially useful for complex movements.
    - **Joint Distance Enforcement**: A recurring issue was unnatural limb proportions when mapping PoseNet joints. To solve this, I used the `enforceJointDistances()` method from `activity.js`:
        ```js
        jointConnections.forEach(([a, b, expectedDist]) => {
            const actual = distance(joints[a], joints[b]);
            if (Math.abs(actual - expectedDist) > tolerance) {
                adjustJoint(joints, a, b, expectedDist);
            }
        });
        ```
    - This keeps the stickman body consistent regardless of PoseNet noise.
    - **Frame Deduplication**: Implemented logic to skip saving consecutive identical frames, which reduced output clutter and produced smoother animations.
    - **UI/UX Enhancements in Import Dialog**: 
        - Loading spinner during TensorFlow.js model initialization.
        - Autoplay of input video with a green pose overlay (restored for clarity).
        - Simplified controls (only Cancel + Insert).
        - Neat display of current frame index.
    - Fixed delete-frame bug → selection now stays on previous frame, not reset to first.
    - Randomized imported stickman positions to avoid overlap when multiple stickmen are added.


3. **Template Palette Feature**
    - I introduced a Template Palette, enabling quick insertion of prebuilt animations into the workspace.
    - **Implementation (templatepalette.js)**: Using Sugar’s palette system, I created a palette with buttons (run, boxing, dance1, dance2). Each button dispatches a template-selected event:
        ```js
        runButton.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('template-selected', {
                detail: { template: 'run' }
            }));
            setActiveButton(runButton);
            self.popDown();
        });
        ```
    - **Preloaded Templates**: Templates were generated from exported animations and stored as JSON. These JSONs are loaded at startup, making templates instantly available.
    - **UI Design**: Each template button shows a name and animated preview, helping users recognize the animation before inserting it. This also makes the feature accessible for younger students with limited reading skills.
    > Template Preview
    ![](https://res.cloudinary.com/djhshvtwo/image/upload/v1756666561/GSoC%2725%20Blog%20Images/2802bab9-7001-4fc1-beab-4c156d5b3ff1.png)


4. **Minor Improvements & Bug Fixes**
    - Fixed palette color persistence and closing behavior.
    - Ensured imported palette stickmen are also shared in collaborative mode.
    - Applied Sugar UI look-and-feel to buttons (rounded corners, consistent style).
    - Restored the green pose overlay in PoseNet video preview.
    - Added spinner + disabled UI during first TensorFlow.js library load.
    - Multiple incremental bug fixes merged into PR, improving stability for both single-user and shared sessions.
    > UI Changes
    ![Green pose overlay](https://res.cloudinary.com/djhshvtwo/image/upload/v1756666689/GSoC%2725%20Blog%20Images/a3235b2f-47a8-4cbb-a2ee-0fa224d80c4a.png)

## Challenges & Solutions

- **Challenge:** Explaining and implementing global vs local moves.     
  **Solution:** Designed clear frame-based rules (frame 0 = global, others = local) and updated tutorials with color-coded indicators.     

- **Challenge:** Building an extensible template system.     
  **Solution:** Used CustomEvent('template-selected') so templates are decoupled from activity logic. This makes it easy to add more templates later without touching core code.    


---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
