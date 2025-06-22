---
title: "GSoC ’25 Week 06 Update by Aditya Kumar Singh"
excerpt: "Model optimizations, onboarding tutorial, adding json for body parts, and Shared mode enhancements in Paint Mode for the 3D Human Activity in Sugarizer."
category: "DEVELOPER NEWS"
date: "2025-06-20"
slug: "2025-06-20-gsoc-25-AdityaKrSingh26-week06"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week06,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-12 - 2025-06-18  

---

## Goals for This Week

- **Goal 1:** Optimize organ model to reduce file size and improve performance.  
- **Goal 2:** Add a onboarding tutorial for users.    
- **Goal 3:** Improve organ model proportions (eye-mouth distance).  
- **Goal 4:** Create and integrate `.json` file for body parts and organs.  
- **Goal 5:** Enhancing shared mode logic for **Paint Mode**.  

---

## This Week’s Achievements

1. ***Organ Model Optimization**  
    - Reduced the organ model size from **19MB to 5.92MB** by applying **Merge Vertices by Distance** and **Mesh Decimation** in Blender.  
    - These steps simplified mesh geometry while retaining anatomical accuracy.  
    - Resulted in faster loading on low-end devices and web platforms without compromising visual quality. 

2. **Onboarding Tutorial Integration**  
    - Implemented an interactive onboarding experience using the **Intro.js** library, following Sugarizer's developer tutorial guidelines.  
    - Integrated a custom help button in the toolbar (`help.svg`) to trigger the tutorial on demand.  
    - Defined tutorial steps in a dedicated `tutorial.js` module using `introJs().setOptions()` to guide users through the UI.  
    - Customized the UI using Sugarizer-themed CSS classes for a consistent visual style.  
    - Enabled full localization support using `l10n.get()` to adapt tutorial text based on the user’s language settings.  
        ![Tutorial screen](https://i.ibb.co/TBbQPbLv/image.png)   
        ![Tutorial screen](https://i.ibb.co/q3tNbkRV/image.png)   


3. **Body Parts Metadata via JSON**  
   - Introduced a new `.json` file structure to define:
     - **Name**  
     - **Mesh name**  
     - **Position (x, y, z)**  
   - Enables simpler mapping between UI and 3D model meshes.  
   - Supports future work on localization, click handling, and performance enhancements.  
     ```json
     {
        { "name": "Hair", "mesh": "Hair_mesh", "position": [-0.01, 7.03, -0.32] },
        { "name": "LeftEyebrow", "mesh": "Mesh0207_1", "position": [0.06, 6.69, 0.63] },
        { "name": "RightEyebrow", "mesh": "Mesh0207_3", "position": [0.06, 6.69, 0.63] },
        { "name": "Left Ear", "mesh": "leftear_mesh", "position": [0.62, 6.42, -0.13] },
        { "name": "Right Ear", "mesh": "righear_mesh", "position": [-0.53, 6.4, -0.13] },
        { "name": "Face", "mesh": "Face_mesh", "position": [0.05, 6.35, 0.36] },
        { "name": "Neck", "mesh": "Neck_mesh", "position": [0.04, 5.54, -0.23] },
        { "name": "Chest", "mesh": "Chest_mesh", "position": [0.04, 4.55, 0.11] },
        { "name": "Back", "mesh": "back_mesh", "position": [0.04, 3.78, -0.83] },
        { "name": "Stomach", "mesh": "stomach_mesh", "position": [0.04, 2.41, 0.2] },
        ...
     }


4. **Shared Mode enhancements for Paint Mode**   
    - **Model sync:** when any participant switches to a different anatomical model, the client now emits a `switchModel` event; all connected users load the same model instantly.  
    - **Shared painting:** a `paintPart` broadcast (object name, color, body-part name, painter ID) lets everyone see the newly painted part in real time. A modal on each peer shows **“<user>     painted: <part>”** for clear attribution.  
        ![Shared mode](https://i.ibb.co/fV4KLx1d/image.png)   


---

## Challenges & How I Overcame Them

- **Challenge:** Displaying context-aware feedback for painting actions without breaking UX flow.  
  **Solution:** Built a shared modal system that shows **“User X painted: Part Y”** without interrupting interactions. Ensured consistent color application using hex values and mesh IDs.

- **Challenge:** Keeping the tutorial visually aligned with Sugarizer UI guidelines while supporting localization.  
  **Solution:** Customized Intro.js with Sugarizer-style buttons, icons, and tooltips. Integrated `l10n.get()` to provide multilingual support across tooltips, button labels, and descriptions.


---

## Key Learnings

- Gained practical experience in implementing **real-time collaboration** using socket-based event broadcasting for 3D interactions.  
- Learned how to **synchronize complex state changes** (like model switching, paint actions, and UI mode transitions) across multiple clients in a shared environment.  
- Deepened understanding of **modular and scalable architecture** by separating shared logic into dedicated handlers and avoiding code duplication.  

---

## Next Week’s Roadmap

- Write Weekly Blog Post summarizing progress, screenshots, and key learnings.   
- Reduce file size of the organ model to improve load time and performance across devices (optimize meshes, reduce texture resolution).   
- Add an onboarding tutorial for users   
- Create and integrate .json files containing metadata (name, position, mesh reference) for body parts and organs to simplify mesh mapping and future i18n support.   
- Begin developing shared logic for **Paint Mode** and **Tour Mode**.   

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
