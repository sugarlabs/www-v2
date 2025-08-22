---
title: "GSoC '25 Week 07 Update by Shubham Singh"
excerpt: "Method to simplify musical notes and export as action block."
category: "DEVELOPER NEWS"
date: "2025-07-21"
slug: "2025-07-21-gsoc-25-firepheonix-week07"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week07
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-13 – 2025-07-20

---

## Goals for This Week

- Figure out a method to export Lego Patterns as musical action blocks.
- Consult mentors regarding the issue of action blocks.

---

## This Week's Achievements

1. **Researched how the Phrase Maker's action block export actually works.**  
   - The Music Blocks Phrase Maker exports in the form of action blocks, organized by rows:
        ![How the format of the Phrase Maker's vertical rows looks.](https://i.ibb.co/bRgqgHBL/Music-Blocks-Google-Chrome-22-07-2025-21-54-18.png)

        ![How the format of the Phrase Maker's action output looks, corresponding to its rows.](https://i.ibb.co/fYnwD9qw/Music-Blocks-Google-Chrome-22-07-2025-21-55-27.png)

2. **After talking with my mentors**  
   - My mentor, Devin, suggested a completely new method—a complete pivot.
   - Basically, instead of the current method of placing blocks and playing them horizontally and simultaneously, the user should place the blocks in vertical rows, just like the PHRASE Maker block.
   - Next week, I'll apply this methodology and present an actual deliverable.

---

## Challenges & How I Overcame Them

- **Challenge:** The week itself was very unproductive. Action blocks don't work with the way we have designed the current system.   
  **Solution:** I talked to my mentors and figured out a completely new method.

---

## Key Learnings

- Sometimes you'll be forced to pivot. Be sure to consult others beforehand.
- People may use different different widths and heights of monitors, when doing computer vision things related to shapes and sizes, use both x and y-axis to standardize across all monitors.

---

## Next Week's Roadmap

- Complete the first actual prototype, with the action block export.
- Add vertical lines as a grid, to standardize detection time accross all widths of monitors.
- Find out a method to divide the the entire musical pattern into standard column like sections, like in phrase maker.

---

## Resources & References

- **You can refer to music blocks documentation: https://github.com/sugarlabs/musicblocks/tree/master/documentation** 
- **You may refer to the Lego Blocks Notation system video: https://youtu.be/LOfrCPf3XJU?feature=shared**
- **Devin's CMK'24 blog: https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c**

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Thanks to Devin and Walter for suggesting methods to make this process easy.

---