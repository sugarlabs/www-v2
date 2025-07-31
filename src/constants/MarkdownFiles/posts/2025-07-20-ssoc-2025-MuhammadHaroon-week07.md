---
title: "SSoC ’25 Week 07 Update by Muhammad Haroon"
excerpt: "Create sketches of user interface showing how students will interact with the GenAI and the audio trimming tool."
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-ssoc-25-MuhammadHaroon-week07"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week07,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-14 - 2025-07-20

---

## Goals for This Week

- **Goal 1:** Create sketches of user interface showing how students will interact with the GenAI and the audio trimming tool.

---

## This Week's Achievements

1. **Created sketches of user interface**  
   - I created sketches of the user interface, keeping children in mind to ensure it is easy for them to interact with. Below are the sketches of the user interface.

   - I added two buttons to the sampler widget, upon clicking those users can access AI sample generation tool and audio trimming functionality.

   ![User Inerface 1](/assets/Developers/Muhammad_Haroon/user_interface_1.png)

   - Upon clicking the Prompt button (which has an icon resembling a code editor), the AI sample generation tool will open. It includes an input box where users can enter a prompt and press the Submit button. Users can preview the generated audio by pressing the Preview button. If the audio doesn't sound good, they can modify the prompt and preview the audio again before saving it by pressing the Save button.

   ![User Inerface 1](/assets/Developers/Muhammad_Haroon/user_interface_2.png)

   - Once the audio is downloaded, users may need to trim it to extract the desired portion. For this, I designed an Audio Trimming Tool, it can be opened by clicking on an icon of a scissor. Users can select the downloaded audio file by clicking the file chooser button. After selecting a file, the file chooser is replaced with an HTML audio player that loads the selected audio (as shown in User Interface 4). This allows users to listen and identify the timestamps of the segment they want to keep. Two input boxes are provided where users can enter the start time and end time of the desired audio segment. A Preview button lets users listen to the trimmed portion before finalizing it. Once satisfied, they can click the Save button to download the trimmed audio.

   ![User Inerface 1](/assets/Developers/Muhammad_Haroon/user_interface_3.png)

   ![User Inerface 1](/assets/Developers/Muhammad_Haroon/user_interface_4.png)

---

## Next Week's Roadmap

- Code the sketches of the user interface in Music Blocks.
- Create a FastAPI for connecting frontend with backend.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---