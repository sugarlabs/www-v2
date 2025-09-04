---
title: "SSoC ’25 Week 10 Update by Muhammad Haroon"
excerpt: "Create a FastAPI for connecting frontend with backend for Audio Trimmer."
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-ssoc-25-MuhammadHaroon-week10"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week10,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-4 - 2025-08-10

---

## Goals for This Week

- **Goal 1:** Create a FastAPI for connecting frontend with backend for Audio Trimmer.

---

## This Week's Achievements

1. **Create a FastAPI for connecting frontend with backend for Audio Trimmer.**  
   - I successfully created a FastAPI for connecting the frontend with the backend for Audio Trimmer in Music Blocks.

   - Users can now upload an audio sample. Once uploaded, the file chooser will be replaced by an HTML audio player, where students can listen to the audio and select the segment they want to trim. Below the player, there are two input boxes: the first for the start time and the second for the end time. After entering the times, users can click the Preview button to listen to the trimmed audio and check whether it matches the segment they need or if the times need adjusting. Once they are satisfied with the selection, they can download the segment locally by clicking the Save button.

   - Below is the video demonstrating the AI Sample Generation in Music Blocks.

   [youtube: 2Zq0UOrxe1c]

---

## Key Learnings

- I learned about the Python pydub library, which can be used to trim audio.

---

## Next Week's Roadmap

- Test the changes and document the entire process.

---

## Resources & References
- **Frontend Code** https://github.com/sugarlabs/musicblocks/pull/4740
- **Backend Code** https://github.com/haroon10725/AI-Sample-Generation-Backend

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---