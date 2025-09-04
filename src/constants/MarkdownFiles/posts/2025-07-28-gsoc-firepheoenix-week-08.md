---
title: "GSoC '25 Week 08 Update by Shubham Singh"
excerpt: ""
category: "DEVELOPER NEWS"
date: "2025-07-28"
slug: "2025-07-28-gsoc-25-firepheonix-week08"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week08
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-21 – 2025-07-28

---


## Goals for This Week

- Complete the first actual prototype, with the action block export.
- Add vertical lines as a grid, to standardize detection time accross all widths of monitors.
- Find out a method to divide the entire musical pattern into standard column like sections, like in phrase maker.

---

## This Week's Achievements

1. **Implemented the standardization method of vertical(y) axis**  
   - Earlier, the method of having the lego blocks just across the horizontal axis. Now, the number of pixels across 2 points on any monitor may vary, so we switched to time. But the length of DISPLAY of blocks might also vary.
   - So now, we're using three things: 1. X-axis 2. Y-axis 3. Time
   - Now, the time across any two columns will be the same. Hence keeping it the same across all types of monitors.

        ![Y-axis lines are now made](/assets/Developers/Shubham_Singh/gsoc-blog-week08-img2.png)


2. **Implemented the dynamic dividing of Lego Block images into different shaped columns**  
   - Now, the image detection also automatically detects the column division.
   - This will help significantly in exporting the audio as an action block.

    ![Detects column's left and right edges.](/assets/Developers/Shubham_Singh/gsoc-blog-week08-img-1.png)


---

## Challenges & How I Overcame Them

- **Challenge:** The most difficult challenge was figuring out a function that would divide the entire image into different different columns, so that they can be exported as an action block.
  **Solution:** Multiple trials and errors, some mathematical logic, and searched some other resources.
- **Challenge** I was busy with college the entire week.
  **Solution:** Managed my time better, gave more time to gsoc project at weekends.

---

## Key Learnings

- Break the entire pivot into multiple parts. And then solve step by step. You'll end with a pipeline that gives a LOT more clarity on things.
- Different monitor sizes mean different numbers of pixels between two points. But that difference doesn’t matter if a parameter is hardcoded in pixels (e.g., px) rather than in relative units like vh, vw, %, or em.
- Since different screens have different pixel densities and resolutions, the visual width of the same number of pixels could differ.

---

## Next Week's Roadmap

- Build the action block output.
- Generate note blocks with their corresponding note values and pitches for a given phrase, based on the LEGO brick input.

---

## Resources & References

- **You can refer to music blocks documentation: https://github.com/sugarlabs/musicblocks/tree/master/documentation** 
- **You may refer to the Lego Blocks Notation system video: https://youtu.be/LOfrCPf3XJU?feature=shared**
- **Devin's CMK'24 blog: https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c**

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. 

---