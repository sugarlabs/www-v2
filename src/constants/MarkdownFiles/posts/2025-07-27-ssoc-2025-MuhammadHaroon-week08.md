---
title: "SSoC ’25 Week 08 Update by Muhammad Haroon"
excerpt: "Code the sketches of the user interface in Music Blocks."
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-ssoc-25-MuhammadHaroon-week08"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week08,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-21 - 2025-07-27

---

## Goals for This Week

- **Goal 1:** Code the sketches of the user interface in Music Blocks.
- **Goal 2:** Create a FastAPI for connecting frontend with backend.

---

## This Week's Achievements

1. **Code the sketches of the user interface in Music Blocks.**  
   - I was succefully able to code the user interfaces in Music Blocks. Following are the screenshots of it.

   ![User Inerface 1](/assets/Developers/Muhammad_Haroon/MB_user_interface_1.png)

   - At the moment, I have used placeholders like a, b, c, d, e, f, g, h, i, j, which will later be replaced with actual prompts that users can type. Each time the user clicks on the prompt icon in the toolbar, a new prompt will appear as the placeholder, giving them an idea of what they can type.

   ![User Inerface 2](/assets/Developers/Muhammad_Haroon/MB_user_interface_2.png)

   ![User Inerface 3](/assets/Developers/Muhammad_Haroon/MB_user_interface_3.png)

   - Below is the video demonstrating the UI in Music Blocks.

   [youtube: woTpsiBh2O8]

---

## Challenges & How I Overcame Them

- **Challenge:** The actual challenge I faced was ensuring that when a user selects an audio file to trim, the file chooser should be replaced with an audio player so the user can get the timestamps of the segment to be trimmed. Initially, I tried hiding the file chooser using display: none after the file was selected. However, this caused the audio player to appear after the "Preview" and "Save" buttons, because the DOM was being modified in a way that shifted elements upwards.
- **Solution:** After researching online, I discovered the "replaceChild" function, which replaces one child element with another within the same parent, maintaining the layout structure correctly.

---

## Key Learnings

- Understood about "replaceChild" function.

---

## Next Week's Roadmap

- Create a FastAPI for connecting frontend with backend.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---