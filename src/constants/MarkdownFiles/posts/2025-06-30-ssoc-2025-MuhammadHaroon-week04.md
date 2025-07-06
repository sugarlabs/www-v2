---
title: "SSoC ’25 Week 04 Update by Muhammad Haroon"
excerpt: "Experimenting with prompts parameter in AudioGen model."
category: "DEVELOPER NEWS"
date: "2025-06-30"
slug: "2025-06-30-ssoc-25-MuhammadHaroon-week04"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week04,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-09 - 2025-06-15  

---

## Goals for This Week

- **Goal 1:** To further explore the effects of the temperature and top_p parameters.
- **Goal 2:** To find an effective method for removing silence and noise from audio.

---

## This Week's Achievements

1. **Explored the effects of the temperature and top_p parameters**  
   - After experimenting with different temperature and top_p values, I found that AudioGen performs well with temperature = 1 and top_p = 1 values, generating audio that closely matches the prompt.

2. **Found effective method for removing silence and nosie form audio**  
   - I found python libraries for removing silence (pydub) and noise (noisereduce) from the audio and it gave good results.

---

## Next Week's Roadmap

- Generate more samples using different prompts.
- Explore how to connect backend with the frontend using FastAPI.
- Explore how to deploy the backend on AWS.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---