---
title: "SSoC ’25 Week 02 Update by Muhammad Haroon"
excerpt: "Setting up AudioGen locally and building a simple user interface using Streamlit for generating audio from text."
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "2025-06-15-ssoc-25-MuhammadHaroon-week02"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week02,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-09 - 2025-06-15  

---

## Goals for This Week

- **Goal 1:** Set up AudioGen locally.
- **Goal 2:** Create a UI using streamlit.

---

## This Week's Achievements

1. **Set up AudioGen locally**  
   - I was able to set up AudioGen locally for that I followed [AudioGen docs](https://github.com/facebookresearch/audiocraft/blob/main/docs/AUDIOGEN.md). I also created a virtual environment and a requirements.txt file to make the project easier to run.

2. **Create a UI using streamlit**  
   - I also created a UI using streamlit with the help of the [Streamlit docs](https://docs.streamlit.io/).

---

## Challenges & How I Overcame Them

- **Challenge:** The challenge I actually faced was due to limited resources. AudioCraft (which provides AudioGen) requires a GPU with at least 16 GB of memory for running inference with the medium-sized models (~1.5B parameters). For generating 5 minutes duration of audio, it took around 15-20 minutes.  
- **Solution:** I ran the model and used the waiting time to complete other tasks. I plan to deploy the model on AWS, where I expect significantly better performance. 

---

## Key Learnings

- Gained familiarity with **Streamlit**

---

## Next Week's Roadmap

- Generate more samples using AudioGen and save them in Google Drive.
- Experiment with temperature and top_p parameters in AudioGen.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---