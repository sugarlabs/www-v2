---
title: "GSoC '25 Week 06 Update by Shubham Singh"
excerpt: "Music Player + Mid Term Evaluation"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-gsoc-25-firepheonix-week06"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week06
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-07 – 2025-07-13

---


## Goals for This Week

- Printing the outputs detected by the color detector.
- Implementing the music player.

---

## This Week's Achievements

1. **The music notations and their durations are now logged to the console**  
   - I finally logged all the colors to the console in a systematic way, without affecting projectstorage.js.
        ![Musical Notations mapped to their corresponding times](https://i.ibb.co/yFLF1fSS/Music-Blocks-Google-Chrome-18-07-2025-14-23-07.webp)


2. **Implemented the music playing feature**  
   - For example, the music player plays X rows, and the music for those X rows is played simultaneously, just like in the PhraseMaker.
   - The system works on the principle: if green → no note played; if not green → note played.
   - All notes are started simultaneously, then played according to their mapped timings.
   - And here's a sample of the music generated.

    <iframe width="800" height="405" src="https://www.youtube.com/embed/ySjvYi936tg?si=FxZQn19AiLRixlpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---

## Challenges & How I Overcame Them

- **Challenge:** Wasn't able to figure out the next steps in development, and felt stuck while trying to find multiple ways of using the existing data.   
  **Solution:** I logged the data to the console and observed the PhraseMaker's approach to simultaneous playing.

---

## Key Learnings

- Sometimes logging the output to the console helps you take the next steps more effectively. For example, in API responses, you'll need to have the same type of UI as the type of response generated, so it's better to take care of that step beforehand.

---

## Next Week's Roadmap

- Build the action block output.
- Try to build a simple Do Re Mi Fa Sol La Ti sequence and its reverse, using exported action blocks in Music Blocks.

---

## Resources & References

- **Nothing much, just the Music Blocks documentation sufficed.**

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. 

---