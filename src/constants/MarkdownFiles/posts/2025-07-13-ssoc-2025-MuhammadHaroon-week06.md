---
title: "SSoC ’25 Week 06 Update by Muhammad Haroon"
excerpt: "Find another open-source model that can generate sound samples from prompts."
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-ssoc-25-MuhammadHaroon-week06"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,midterm,sugarlabs,week06,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-07 - 2025-07-13  

---

## Progress Summary

The first half of my Sugar Summer of Code 2025 project has been both challenging and rewarding. My project focuses on generating sound samples from prompts. Over the past six weeks, I've made significant progress toward this goal, working closely with my mentors which is as follow:

- Researched state of art open-source models for generating sound samples from prompts, including [AudioGen](https://audiocraft.metademolab.com/audiogen.html) and [TangoFlux](https://huggingface.co/spaces/declare-lab/TangoFlux).

- Set up the models locally to enable hands on testing and integration.

- Tested the models using various prompts. (High quality sound of dog bark, A natural and rich sound of car horn etc). Saved the sounds samples into Google Drive which was then scored by both the mentors.

- Concluded that the generated sound samples cannot be used directly in Music Blocks, they need to be trimmed before integration.

---

## Goals for This Week

- **Goal 1:** Find another open-source model to generate high quality sound samples.

---

## This Week's Achievements

1. **Find another open-source model**  
   - I was sucessfully able to find another open-source model [TangoFlux](https://huggingface.co/spaces/declare-lab/TangoFlux). However, after testing several prompts, I realized that these models are unable to generate sound samples suitable for use in Music Blocks. After discussing this with the mentors, we decided that an additional tool is needed, one that can clip audio between specific timestamps. This trimmed audio can then be used in Music Blocks, similar to how it's done in Audacity software.

---

## Next Week's Roadmap

- Create sketches of user interfaces showing how students will interact with the GenAI and the audio trimming tool.

---

## Proof of Concept (POC)

Since current LLMs are not capable of generating audio that can be used directly in Music Blocks, the following workflow serves as an alternative approach:

- The user first generates an audio using a text-to-audio model such as TangoFlux.  
![TangoFlux - text to audio generation model](/assets/Developers/Muhammad_Haroon/TangoFlux-Text_to_Audio_Generation_Model.webp)

- The generated audio is then passed into an audio trimming tool, for demonstration purpose I am using an Audacity software.
![Trimming AI-generated audio in Audacity](/assets/Developers/Muhammad_Haroon/Trimming_AI_generated_audio_in_Audacity.webp)

![Trimmed audio in Audacity](/assets/Developers/Muhammad_Haroon/Trimmed_audio_in_Audacity.webp)

- Click on the video below to see how can we import the audio into Music Blocks:

[youtube: eR8hfvNzPTg]

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---