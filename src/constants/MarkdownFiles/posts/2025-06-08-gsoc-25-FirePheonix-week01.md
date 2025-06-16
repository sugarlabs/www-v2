---
title: "GSoC ’25 Week 01 Update by Shubham Singh"
excerpt: "Creating UIs and visuals for addition of Lego Bricks "
category: "DEVELOPER NEWS"
date: "2025-06-07"
slug: "2025-06-07-gsoc-25-FirePheonix-week01"
author: "Shubham Singh"
description: "Maintainer and GSoC'25 Contributor at SugarLabs"
tags: "gsoc25,sugarlabs,week01,FirePheonix"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-01 - 2025-06-07

---

## Goals for This Week

- **Goal 1:** Basic UI for Image Upload/Real time Video upload and adjust.
- **Goal 2:** Putting the developed UIs onto the widget blocks.
- **Goal 3:** Searching for exisiting audios in the phrase maker and note blocks.

---

## This Week’s Achievements

1. **Interface for Image upload for Lego Notations**  
   - Music Blocks has a feature to detect the color of pixels generated from drawing within the program, but it cannot detect the color of pixels from images that are either uploaded or from a webcam. 
   - By adding a feature to detect color from both uploaded images and a live webcam stream, users would be able to implement Lego music notation for the blind and similarly interactive programs.
   
   ![screenshot-description](https://i.ibb.co/d0yVXJmP/Lego-Bricks-Google-Chrome-08-06-2025-01-12-56.png)
   

2. **Live webcam feed and editing options**  
   - The following feature helps to use a real time video(webcam) onto the Lego Notation detection interface. Also, you may freely edit and move it around the canvas.
   ![screenshot-description](https://i.ibb.co/n8cswJsP/Lego-Bricks-Google-Chrome-08-06-2025-01-14-01.png)

   - Here's the reference video regarding lego bricks as musical notes:
   [youtube: LOfrCPf3XJU]

   - Here's Devin's CMK project for color sensor project in music blocks:
   [Reflections from constructing modern knowledge](https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c) 
    
3. **Identified methods to making a new widget block in music blocks**  
   - I read and went through a lot of documentation, searching for how we can add a new widget block in music blocks. I figured out a few flaws and how can the documentation be improved for future contributors.
   ![screenshot-description](https://i.ibb.co/bVD8Z54/image.png)
   - From what I've realized working on it, for adding a new block on the music blocks, I definitely think that for adding a new block, a lot of the code - UIs, features, etc. would already exist and you can just inherit those exisiting classes. And also, you'll have to edit and change a LOT of files and add new methods for your own new block.
    ![screenshot-description](https://i.ibb.co/hJRKV0Vq/Documentation.png)

---

## Challenges & How I Overcame Them

- **Challenge:** Getting started on features and UIs with a lot of doubts about how it should look like.
- **Solution:** Consulting my mentors, presenting variations of "How it could be" to them, refering to EXISTING UIs in Music Blocks.

---

## Key Learnings

- Gained familiarity with **making new blocks**.
- Deepened understanding of **inheritance and code modularity**
- Improved skills in **exports, imports, code reusability**, **documentation**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Implement **mapping of musical notes to lego bricks' colors**.
- Refine **UIs** based on mentor feedback.
- Inherit the exisiting code inside **WidgetBlocks.js** code as UI.
- Target: Completing the **core implementation** in the week number 2 and 3.

---

## Acknowledgments

Thanks to some old pull requests and documentation available in music blocks, I was able to figure out on a lot about how new blocks are created on the music blocks interface. Will definitely add on more.

---

## Connect with Me

- GitHub: [@FirePheonix](https://github.com/FirePheonix)
- Gmail: [shubhsoch@gmail.com](mailto:shubhsoch@gmail.com)
- LinkedIn: [Shubham Singh](https://www.linkedin.com/in/shubham-singh-8a5643198/)
- Twitter: [@DevNinjaShubham](https://x.com/DevNinjaShubham)

---
