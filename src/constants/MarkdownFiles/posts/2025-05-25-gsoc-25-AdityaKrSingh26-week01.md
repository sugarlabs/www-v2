---
title: "GSoC ’25 Week 01 Update by Aditya Kumar Singh"
excerpt: "Refining human anatomy models and improving Sugarizer’s 3D Human Activity"
category: "DEVELOPER NEWS"
date: "2025-05-28"
slug: "2025-05-28-gsoc-25-AdityaKrSingh26-week01"
author: "Aditya Kumar Singh"
description: "GSoC'25 Contributor at SugarLabs (Sugarizer Human Activity Pack)"
tags: "gsoc25,sugarlabs,week01,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-12 - 2025-05-18   

---

## Goals for This Week

- **Goal 1:** Identify missing human body assets in the current execution.
- **Goal 2:** Simplify models and increase spacing between organs.
- **Goal 3:** Remove redundant code from the current codebase and improve structure.

---

## This Week’s Achievements

1. **Identify missing human body assets in the current execution**  
   - Reviewed current assets and mapped out missing organs and systems (e.g., stomach, intestines, food pipe, kidneys, liver, eyes, brain, etc).  
   - This helps ensure educational completeness and anatomical accuracy for users.

2. **Simplify Z-Anatomy models and increase spacing between organs**  
   - Removed mesh clutter and enhanced spacing between vital organs like heart, lungs, liver to improve visibility and user interaction.
   - This change is aimed at improving user experience, especially on touch devices.
   ![screenshot-description](https://i.ibb.co/zHbVQ39Z/Screenshot-2025-05-14-130753.png)  
   ![screenshot-description](https://i.ibb.co/hx8MSh0n/Screenshot-2025-05-14-130802.png)  


3. **Remove redundant code from the current codebase and improve structure**  
   - Removed redundant or deprecated functions, improved file modularity, and standardized naming across `activities\HumanBody.activity\js\activity.js`.
   - Resolved duplicate `loader.load()` usage: Consolidated the skeleton model loading logic into a reusable function and invoked it from both `env.getEnvironment` and `onNetworkDataReceived`, removing redundancy.
   - Optimized `env.getEnvironment` call: Now invoked only once and the result is reused where needed
   - Unified zoom functions: Replaced `zoomInFunction`, `zoomOutFunction`, `zoomEqualFunction`, and `zoomToFunction` with a single parameterized `zoomCamera(type, targetFOV)` function to streamline logic.
   - Links : PR [#1794](https://github.com/llaske/sugarizer/pull/1794).

---

## Challenges & How I Overcame Them

- **Challenge:** Code duplication across multiple model load functions and zoom handlers.  
  **Solution:** Abstracted the model loading into one reusable function to reduce maintenance overhead. Similarly, created a generalized zoom function with parameters for FOV and zoom type to replace multiple similar methods.

- **Challenge:** Finding suitable 3D models with the right level of mesh detail.  
  **Solution:** Spent time evaluating and testing various anatomy models and 3D datasets. Balanced between model quality and performance ensuring the mesh was detailed enough for educational use but light enough for smooth rendering in Sugarizer’s environment.

---

## Key Learnings

- Got hands-on with **3D modeling tools like Blender** for optimization and export for web use.
- Understood modular design and best practices for maintaining scalable code in large open-source projects.

---

## Next Week’s Roadmap

- Refine the 3D models ,remove and merge unecessary parts.
- Integrate Organs 3D models for the basic paint activity.
- Import and test Human Body model for visual alignment.

---


## Resources & References

- **Repository:** [github.com/AdityaKrSingh26/sugarizer](https://github.com/AdityaKrSingh26/sugarizer)
- **3D models used:**
    - "Human" (https://skfb.ly/6Z8LI) by aaron.kalvin,
    - "Realistic Human Lungs" (https://skfb.ly/oBDWI) by neshallads,
    - "Human heart, realistic anatomical model" (https://skfb.ly/oXBxZ) by 3d Eye Catcher,
    - "human-brain" (https://skfb.ly/6YqDO) by Yash_Dandavate,
    - Organs by Z-Anatomy (https://github.com/LluisV/Z-Anatomy)


---


## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [@AdityaKrSingh26](https://github.com/AdityaKrSingh26)
- Gmail: [adityakrsingh2604@gmail.com](mailto:adityakrsingh2604@gmail.com)
- LinkedIn: [Aditya Kumar Singh](https://www.linkedin.com/in/adityakrsingh26/)
- Twitter: [@AdityaKrSingh26](https://x.com/AdityaKrSingh26)

---
