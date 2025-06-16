---
title: "GSoC ’25 Week 03 Update by Aditya Kumar Singh"
excerpt: "Organ integration, anatomical bisection, and open-source attributions in Sugarizer's Human Body Activity"
category: "DEVELOPER NEWS"
date: "2025-06-02"
slug: "2025-06-02-gsoc-25-AdityaKrSingh26-week03"
author: "Aditya Kumar Singh"
description: "GSoC'25 Contributor at SugarLabs (Sugarizer Human Activity Pack)"
tags: "gsoc25,sugarlabs,week03,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-23 - 2025-05-29   

---

## Goals for This Week

- **Goal 1:** Create a **credits.md** file to attribute and list licenses for all 3D assets used.  
- **Goal 2:** Integrate organ models into the interactive paint mode.  
- **Goal 3:** Bisect the full human body model into meaningful anatomical sections using Blender.  
- **Goal 4:** Time-permitting, begin integration of the bisected full-body model into paint mode.  


---

## This Week’s Achievements

1. **Created credits.md file for 3D model attribution**  
   - Documented sources, authors, and licenses for each 3D model used in the activity.  
   - Ensured compliance with open-source licensing (CC, GPL, etc.) where applicable. 


2. **Integrated additional organ models into paint mode**  
   - Added 3D human organs model containing: stomach, liver, intestines, etc to the interactive paint activity.  
   - Verified clickable regions and ensured raycasting targets are accurate and intuitive.  
   - Updated model hierarchy for smoother interactivity and better scene management. 
   - Refactored the existing click handler for better mesh selection using **screen-space testing**.
        ![screenshot-description](https://i.ibb.co/ZRCJbPX0/image.png)   


3. **Bisected full human body model into anatomical sections**  
   - Used Blender’s Bisect tool to separate the full mesh into functional regions: head, torso, arms, and legs.  
   - Cleaned geometry to avoid overlapping or orphaned faces.  
   - Exported and tested the segmented meshes in the Three.js scene.
        ![screenshot-description](https://i.ibb.co/NgxGXNyz/Screenshot-2025-05-29-233012.png)   
        ![screenshot-description](https://i.ibb.co/xS4yvMYr/Screenshot-2025-05-29-233650.png)   
        ![screenshot-description](https://i.ibb.co/zH6K7RC2/Screenshot-2025-05-29-233659.png)   


4. **(Bonus) Partial integration of bisected model into paint mode**  
   - Imported segmented torso and head into paint mode as a pilot test.  
   - Validated paint interactions on new sections to ensure consistency.  
        ![screenshot-description](https://i.ibb.co/XxymdWbF/image.png)   

---

## Challenges & How I Overcame Them

- **Challenge:** Bisecting the human body mesh led to artifacts and unclean separations.  
  **Solution:** Used high-precision knife and cleanup tools in Blender and manually adjusted vertex groups. 

---

## Key Learnings

- Improved proficiency with Blender’s mesh slicing and cleanup tools.  
- Learned proper practices for open-source asset attribution.  

---

## Next Week’s Roadmap

- Write Weekly Blog Post summarizing progress, screenshots, and key learnings from Week 03.   
- Implement a model selection palette that allows users to toggle between different anatomical models (e.g., organs, skeleton, full body).   
- Integrate the full human body model into the paint activity to allow direct interaction and labeling across complete anatomy.   
- Rename labels in the skeleton model to reflect accurate anatomical terminology and improve educational clarity.   
- Add localization support for the 3D Human Body Activity to make it accessible in multiple languages.   


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
