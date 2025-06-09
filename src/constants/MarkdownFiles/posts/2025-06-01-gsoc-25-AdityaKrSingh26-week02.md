---
title: "GSoC ’25 Week 02 Update by Aditya Kumar Singh"
excerpt: "Merging anatomical models and enhancing Sugarizer’s Human Body Activity"
category: "DEVELOPER NEWS"
date: "2025-05-29"
slug: "2025-05-29-gsoc-25-AdityaKrSingh26-week02"
author: "Aditya Kumar Singh"
description: "GSoC'25 Contributor at SugarLabs (Sugarizer Human Activity Pack)"
tags: "gsoc25,sugarlabs,week02,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-19 - 2025-05-22   

---

## Goals for This Week

- **Goal 1:** Merge required segmented models into a single unified mesh.  
- **Goal 2:** Integrate 3D organ models required for the initial version of the paint activity.  
- **Goal 3:** Refactor and clean up code to improve maintainability of the Human Body Activity.  
- **Goal 4:** Import and test a Human body model.

---

## This Week’s Achievements

1. **Merged intestine models into a single mesh**  
   - Used Blender to unify multiple intestine segments into a single watertight mesh.  
   - Simplified mesh topology while preserving anatomical details for better performance in-browser.  
      ![screenshot-description](https://i.ibb.co/TM5r90b8/Screenshot-2025-05-19-200136.png)   
      ![screenshot-description](https://i.ibb.co/svsp626J/Screenshot-2025-05-20-234105.png)   


2. **Integrated 3D organ models for the basic paint activity**  
   - Selected essential models: heart, brain, lungs, and kidneys.  
   - Positioned and scaled them within the scene for the interactive paint activity.  
   - Confirmed interactivity through raycasting and model selection using three.js.  
      ![screenshot-description](https://i.ibb.co/spZpwD0P/Screenshot-2025-05-23-005734.png)   
      ![screenshot-description](https://i.ibb.co/jPxMn9HN/image.png)   


3. **Refactored and cleaned up existing code for Human Body Activity**  
   - Improved component structure and naming conventions in `activity.js`.   
   - PR merged: PR [#1794](https://github.com/llaske/sugarizer/pull/1794).  

4. **Imported and tested a Human body model**  
   - Imported an external Human body model and tested visual alignment.  
   - Adjusted scale, rotation, and pivot points in Blender.  

---

## Challenges & How I Overcame Them

- **Challenge:** Organs weren’t interacting properly in the paint activity due to non-unified object hierarchies.  
  **Solution:** Used grouping and bounding box checks to establish correct hit detection zones. Re-anchored object origins for each model.  

---

## Key Learnings

- Improved skills in 3D mesh merging.  
- Learned how to optimize **paintable 3D object interactions** within a browser canvas.  
- Gained experience in **codebase refactoring for open-source projects** to enhance maintainability.  


---

## Next Week’s Roadmap

- Create a `credits.md` file to document and attribute all third-party 3D models used, following proper open-source licensing guidelines.  
- Integrate additional organ models into paint mode to enrich the educational interactivity.  
- Bisect the human body model into appropriate anatomical sections (e.g., upper/lower torso, head, limbs) for easier interaction and labeling.  
- (Optional) Begin integrating the full human body model into paint mode, allowing users to interact with and label the complete anatomy structure.  


---


## Resources & References

- **Repository:** [github.com/AdityaKrSingh26/sugarizer](https://github.com/AdityaKrSingh26/sugarizer)
- **3D models used:**
    - “Z-Anatomy Human Body” (https://github.com/LluisV/Z-Anatomy)
    - "Human" (https://skfb.ly/6Z8LI) by aaron.kalvin.
    - Human Heart ,Lungs, etc from Sketchfab (refer Week 01 for links)


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
