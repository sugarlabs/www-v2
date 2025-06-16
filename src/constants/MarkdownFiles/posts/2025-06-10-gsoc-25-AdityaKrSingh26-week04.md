---
title: "GSoC ’25 Week 04 Update by Aditya Kumar Singh"
excerpt: "localization for 3D Human Activity in Sugarizer, palette switcher, and skeletal improvements."
category: "DEVELOPER NEWS"
date: "2025-06-10"
slug: "2025-06-10-gsoc-25-AdityaKrSingh26-week04"
author: "Aditya Kumar Singh"
description: "GSoC'25 Contributor at SugarLabs (Sugarizer Human Activity Pack)"
tags: "gsoc25,sugarlabs,week04,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-30 - 2025-06-05   

---

## Goals for This Week

- **Goal 1:** Add a model selection palette UI to toggle between models.  
- **Goal 2:** Integrate the Human-body model into the paint activity and set the Human-body human model as the default view.  
- **Goal 3:** Refactor and improve naming conventions for bones in the skeleton model.  
- **Goal 4:** Localize the Human Body Activity using i18next.js, supporting English and French.  


---

## This Week’s Achievements

1. **Model Palette Implementation**  
    - Developed a new model selection palette in the UI allowing users to switch between:
        - Human body
        - Skeleton
        - Organs 
    - Set the Human body as the default model loaded on activity start.
    - Palette updates the 3D scene dynamically without requiring a full reload.
           ![screenshot-description](https://i.ibb.co/SDSYFJf7/image.png)   


2. **Human-Body Model Paint Integration**  
    - Integrated the Human body model with the interactive paint activity.  
    - Ensured hierarchical structure for smooth interactivity and logical mesh grouping  
        ![screenshot-description](https://i.ibb.co/4wqNymfG/image.png)   


3. **Improved Bone Naming in Skeleton Model**  
    - Refactored the skeletal model for accurate and educational naming:
        - Replaced generic labels like “Lower Leg” with specific names like **Tibia** and **Fibula**.
        - Split forearm into **Radius** and **Ulna**, adjusting geometry and mesh positions.



4. **Implemented i18next.js to support internationalization.**  
    - Implemented **i18next.js** to support internationalization.
    - Completed full translation of Human Body Activity in **English** and **French**.  
    - Translation files follow standard .json structure for easy future expansion.  
    - Example image for French:
        ![screenshot-description](https://i.ibb.co/99ggYBDj/image.png)   


---

## Challenges & How I Overcame Them

- **Challenge:** Naming skeleton bones accurately without anatomical overlap.  
  **Solution:** Cross-referenced medical diagrams and validated model mesh mapping manually in Blender.

---

## Key Learnings

- Deepened understanding of scene management in Three.js and optimized mesh rendering for performance.  
- Gained experience in internationalization using i18next.js  
- Developed more precise anatomical terminology awareness and importance of educational clarity.

---

## Next Week’s Roadmap

- Write Weekly Blog Post summarizing progress, screenshots, and key learnings.   
- Fix Organs model. Distance between eyes and mouth seems to be more than required, reduce that and see if there is some alignment issue.   
- Integrate the full human body model into the paint activity to allow direct interaction and labeling across complete anatomy.   
- Merge Paint and Learn mode to show a popup at bottom of screen when user click a part

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
