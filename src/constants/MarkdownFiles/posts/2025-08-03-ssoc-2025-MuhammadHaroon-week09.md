---
title: "SSoC ’25 Week 09 Update by Muhammad Haroon"
excerpt: "Create a FastAPI for connecting frontend with backend for AI Sample Generation."
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "2025-08-03-ssoc-25-MuhammadHaroon-week09"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week09,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-28 - 2025-08-03

---

## Goals for This Week

- **Goal 1:** Create a FastAPI for connecting frontend with backend for AI Sample Generation.

---

## This Week's Achievements

1. **Create a FastAPI for connecting frontend with backend for AI Sample Generation.**  
   - I successfully created a FastAPI for connecting the frontend with the backend for AI Sample Generation.

   - Users can now enter a prompt in the Music Blocks Sampler widget. Initially, only the Submit button will be enabled. The prompt will be sent to the backend server, and audio generation will begin. While the audio is being generated, a text message will repeatedly appear on the screen at regular intervals to inform the users. Once the audio is ready, another message will be displayed to let them know that the audio has been generated. After this, the Preview and Save buttons will become enabled, allowing users to listen to the generated audio and, if satisfied, save it.

   - Below is the video demonstrating the AI Sample Generation in Music Blocks.

   [youtube: 7e6454_j74g]

---

## Challenges & How I Overcame Them

- **Challenge:** I had no experience with FastAPI before.
- **Solution:** Learned it along the way, followed the docs of FastAPI and some Youtube tutorials for it.

---

## Key Learnings

- Learned about CORSMiddleware in FastAPI, which allows your frontend (running on a different port) to communicate with your backend by relaxing the browser’s cross-origin restrictions. Without it, browsers block such requests for security reasons.

- Discovered that FastAPI can also send file and JSON responses to the browser.

---

## Next Week's Roadmap

- Create a FastAPI for connecting frontend with backend for Audio Trimmer.

---

## Resources & References
- **Frontend Code** https://github.com/sugarlabs/musicblocks/pull/4740
- **Backend Code** https://github.com/haroon10725/AI-Sample-Generation-Backend

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---