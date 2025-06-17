---
title: "GSoC ’25 Week 05 Update by Aditya Kumar Singh"
excerpt: "UI improvements, model fixes, skeletal updates, and continued localization work for the 3D Human Activity in Sugarizer."
category: "DEVELOPER NEWS"
date: "2025-06-17"
slug: "2025-06-17-gsoc-25-AdityaKrSingh26-week05"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
description: "GSoC'25 Contributor at SugarLabs (Sugarizer Human Activity Pack)"
tags: "gsoc25,sugarlabs,week05,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-05-06 - 2025-06-12  

---

## Goals for This Week

- **Goal 1:** Fix and enhance model selection palette to reflect current selection.  
- **Goal 2:** Refine and divide bones in the skeleton model for improved clarity and continue localization efforts for Human Activity.    
- **Goal 3:** Improve organ model proportions (eye-mouth distance).  
- **Goal 4:** Update UI layout for model filter (mode selector).  
- **Goal 5:** Merge Paint and Learn mode to show a popup at bottom of screen when user click a part  

---

## This Week’s Achievements

1. **Model Selection Palette Fix**  
    - Resolved issue where the palette UI did not reflect the currently selected model.
    - Now dynamically highlights the active selection across Human, Skeleton, and Organs views.
           ![Updated Tool](https://i.ibb.co/k2jLsdZ1/image.png)   
           ![Mode pallete](https://i.ibb.co/vCtQr98B/image.png)   

2. **Skeleton Bone Naming and Splitting Update**  
    - Expanded the skeletal model by splitting compound bones and renaming:
     - For example, **“Arm”** is now divided into **Humerus**, **Radius**, and **Ulna**.
     - Ensured correct orientation and geometry alignment across these divisions.


3. **Localization Progress**  
    - Continued translation integration using **i18next.js**.
    - Initiated support for dynamically changing labels based on selected language.


4. **Organ Model Alignment Fix**  
   - Reduced the gap between eyes and mouth in the 3D organ model.
   - Realigned surrounding features to maintain anatomical accuracy.
     ![Organ Alignment Fix](https://i.ibb.co/W4SVHnGx/image.png)


6. **Vertical Mode Selector UI Implementation**  
    - Reworked the mode selection UI to display vertically.
    - Inspired by Dollar Street UI design, this improves accessibility.
    - Earlier :  
        ![Mode selector earlier](https://i.ibb.co/bR32J4bm/image.png)
    - Now :  
        ![Mode selector Now](https://i.ibb.co/60NHStQy/image.png)


7. **Merged Paint and Learn mode**
    - Implemented a modal system that appears in the bottom-right corner when users click on body parts in paint mode.
    - Added fade-in/fade-out transitions with CSS transforms for better user experience and added duplicate prevention system that removes existing modals before showing new ones.
     ![Paint Modal](https://i.ibb.co/7tW0PdzH/image.png)
     


---

## Challenges & How I Overcame Them

- **Challenge:** Maintaining proper alignment while modifying 3D organ models.  
  **Solution:** Used Blender’s measurement tools to iteratively adjust spacing, followed by live testing in the Sugarizer environment.  

- **Challenge:** Creating paint mode notifications that don't interfere with 3D interaction.  
  **Solution:** Developed bottom-right positioned modals with smooth animations and automatic cleanup to maintain workflow continuity while providing clear user feedback.  


---

## Key Learnings

- Gained experience in internationalization using i18next.js  
- Learned UI layout best practices for improving accessibility across devices.
- Gained practical Blender experience for precision model editing. 
- Developed more precise anatomical terminology awareness and importance of educational clarity.

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

## Connect with Me

- GitHub: [@AdityaKrSingh26](https://github.com/AdityaKrSingh26)
- Gmail: [adityakrsingh2604@gmail.com](mailto:adityakrsingh2604@gmail.com)
- LinkedIn: [Aditya Kumar Singh](https://www.linkedin.com/in/adityakrsingh26/)
- Twitter: [@AdityaKrSingh26](https://x.com/AdityaKrSingh26)

---
