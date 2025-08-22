---
title: "GSoC ’25 Week 11 Update by Aditya Kumar Singh"
excerpt: "Polished multi-stickman support with per-frame rendering, single-shadow enforcement, per-joint visibility, and safe delete flow. Also increased stickman size for better canvas presence."
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-gsoc-25-AdityaKrSingh26-week011"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week11,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-07-24 - 2025-07-30

---

## Goals for This Week

- **Goal 1:** Increase visual scale of the stickman for better visibility.
- **Goal 2:** Show frame previews only for the selected stickman.
- **Goal 3:** Limit shadow visibility to just the selected stickman and ensure new stickmen begin with exactly one frame.
- **Goal 4:** Display joints only for the selected stickman to reduce UI clutter.
- **Goal 5:** Add confirmation popup when removing a stickman with more than one frame.
- **Goal 6:** Implement Pivot Animator-style parent-child joint logic.

---

## This Week’s Achievements

1. **Increased Stickman Size**  
   - Enlarged the base rendering scale of stickman joints and limbs to make animation more visible and intuitive on canvas.
   - **Why it matters:** It improves accessibility, especially on high-resolution screens or dense animations.
   - This was done by:
        - Scaling the joint radii
        - Adjusting connection line thickness
        - Offsetting coordinates to preserve proportions
    > Updated Stickman Design  
    ![Earlier](https://i.ibb.co/4ZkrMBYm/image.png)
    ![Now](https://i.ibb.co/YFRRH2Ys/image.png)


2. **Show Frames Only for Selected Stickman**  
   - Previously, all stickmen shared the same frame thumbnails, which led to visual confusion.
   - Now, each stickman has an isolated frame timeline that only shows when it is selected.
    - This creates an intuitive editing experience similar to video editing software with multiple tracks.
   - **Algorithm:**
        - Store `frames[]` per stickman instance.
        - When a stickman is selected:
            - Load its `frames[]` to the UI bar.
            - Render only the active stickman’s previews.
            - Hide all others.



3. **Single Shadow Enforcement + Initial Frame Guarantee**  
   - **Problem:** All stickmen had shadows simultaneously and new ones could lack animation history.
   - **Fix:** When a stickman is selected:
        - Show only its onion-skin shadow (ghost of previous frame).
        - Hide shadows of others.
        - Ensure any newly created stickman is initialized with a default frame.




4. **Only Selected Stickman Shows Joints**  
    - Added visual filtering so that: Joints (circles for draggable points) are drawn **only** for the currently selected stickman.
    - **Approach:**
        - Loop through all stickmen.
        - For each stickman, set: `showJoints = (stickman.id === selectedStickman.id);`
        - Then draw joints conditionally inside the rendering function.


5. **Safe Deletion with Popup for Multi-Frame Stickmen**  
    - When a user attempts to delete a stickman with more than one frame, a confirmation popup is shown.
    - **Why it's important:** Prevents accidental loss of complex animation timelines.
    - Ensures clarity and gives users a chance to cancel destructive actions.
    > Remove Popup UI  
    ![](https://i.ibb.co/vCHLQ67t/image.png)


## Pivot Animator Style Joint Hierarchy in Stickman Animator

One of the core architectural challenges in building a stickman animation tool is designing an effective **joint hierarchy system** a system where moving or rotating a parent joint automatically affects all of its child joints. This feature mimics the functionality of tools like Pivot Animator and is essential for creating realistic, controllable animations.

In this section, I will explain how I implemented this hierarchical joint system from scratch, including how joints are defined, how relationships are structured, and how recursive transformations are performed.

### 1. Understanding Joints

Each stickman is defined as a collection of joints. A joint represents a specific body part such as the head, torso, elbow, knee, or foot. Every joint is represented as a 2D coordinate point:
```javascript
    joints: [
        { x: ..., y: ..., name: 'head' },    // index 0
        { x: ..., y: ..., name: 'body' },    // index 1
        { x: ..., y: ..., name: 'hips' },    // index 2
        ...
        { x: ..., y: ..., name: 'middle' }   // index 11
    ]
```

### 2. Defining Joint Relationships

Joints are connected in two meaningful ways:

**A. Distance-Based Constraints**  
These constraints ensure that limbs maintain a fixed length and structure during animation:
```javascript
const jointConnections = [
    { from: 0, to: 1, length: 20 },    // head to body
    { from: 1, to: 11, length: 30 },   // body to middle
    { from: 11, to: 2, length: 30 },   // middle to hips
    { from: 2, to: 3, length: 25 },    // hips to left knee
    { from: 2, to: 5, length: 25 },    // hips to right knee
    { from: 3, to: 4, length: 25 },    // left knee to left foot
    { from: 5, to: 6, length: 25 },    // right knee to right foot
    { from: 1, to: 7, length: 25 },    // body to left elbow
    { from: 1, to: 9, length: 25 },    // body to right elbow
    { from: 7, to: 8, length: 25 },    // left elbow to left hand
    { from: 9, to: 10, length: 25 }    // right elbow to right hand
];
```

**B. Hierarchical Parent-Child Structure**  
To model recursive movement, a joint hierarchy tree is used. This structure defines how movement in one joint affects its descendants:
```javascript
const jointHierarchy = {
    2: [11],         // hips → middle
    11: [1],         // middle → body
    1: [0, 7, 9],    // body → head, left elbow, right elbow
    7: [8],          // left elbow → left hand
    9: [10],         // right elbow → right hand
    3: [4],          // left knee → left foot
    5: [6]           // right knee → right foot
};
```

### 3. Recursive Joint Rotation Algorithm

To propagate transformations across the hierarchy, we use a recursive rotation algorithm. Below is a pseudocode description of the logic:

**Algorithm: RotateJointHierarchy**  
**Input:**
- `stickmanIndex`: the index of the stickman in the array  
- `pivotJointIndex`: the joint to rotate  
- `angle`: the angle in radians  

**Steps:**
1. Get the list of joints for the given stickman.  
2. Determine the correct pivot point based on the joint being rotated.  
3. Fix the pivot coordinates to prevent them from changing.  
4. If the selected joint is not the pivot, rotate it around the pivot point.  
5. Recursively do the following for each child in `jointHierarchy`:  
    - Rotate the child joint around the pivot.  
    - Call `RotateJointHierarchy` recursively on each child.  
6. Restore the pivot joint’s original position.  

**Algorithm: RotatePointAroundPivot**  
**Input:**
- `point`: coordinates of the joint to rotate  
- `pivot`: coordinates of the pivot  
- `angle`: rotation angle in radians  

**Steps:**
1. Translate the point relative to the pivot:  
    - `dx = point.x - pivot.x`  
    - `dy = point.y - pivot.y`  
2. Apply rotation transformation:  
    - `rotatedX = pivot.x + (dx * cos(angle) - dy * sin(angle))`  
    - `rotatedY = pivot.y + (dx * sin(angle) + dy * cos(angle))`  
3. Return the new coordinates `(rotatedX, rotatedY)`

### 4. Pivot Assignment Rules

Different joints rotate around different pivots depending on their anatomical location. The implementation uses a sophisticated mapping system:

**Algorithm: GetRotationPivot**  
**Input:**
- `stickmanIndex`: the stickman to operate on
- `jointIndex`: the joint being rotated

**Implementation Logic:**
```javascript
function getRotationPivot(stickmanIndex, jointIndex) {
    const joints = stickmen[stickmanIndex].joints;
    
    const pivotMap = {
        11: joints[2],  // middle joint rotates around hip
        1: { x: joints[11].x, y: joints[11].y },  // body rotates around middle
        7: joints[1],   // left elbow rotates around body
        9: joints[1],   // right elbow rotates around body
        3: joints[2],   // left knee rotates around hip
        5: joints[2]    // right knee rotates around hip
    };
    
    return pivotMap[jointIndex] || joints[jointIndex];
}
```

**Anatomical Rules:**
1. **Torso joints (middle, body):** Rotate around their parent in the spine chain
2. **Arms (elbows, hands):** Rotate around the body/shoulder connection
3. **Legs (knees, feet):** Rotate around the hip joint
4. **Extremities (head, hands, feet):** Can rotate independently when directly manipulated

### 5. Resulting Behavior

With this system, several realistic behaviors are supported:

- **Whole-body movement:** Dragging the hips moves the entire stickman.  
- **Upper-body rotation:** Rotating the torso moves the head and arms.  
- **Limb articulation:** Rotating an elbow causes the hand to follow.  
- **Independent motion:** Feet, hands, and head can still be individually adjusted when needed.

> Final Result
![](https://i.ibb.co/fzWLMJWr/Screenshot-2025-07-29-004041.png)

---


## Key Learnings

- Developed a better grasp of selective rendering techniques to keep canvas visuals clean and relevant.
- Improved user experience by prioritizing safe defaults (e.g., confirmation popups, visual scoping, first-frame logic).
---

## Next Week’s Roadmap

- Add feature to export human body instance as image
- Add Localisation support in Stickman activity
- Update codebase to keep relative positioning, instead of absolute positioning of stickman.
- Look into pivot animator templates

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

