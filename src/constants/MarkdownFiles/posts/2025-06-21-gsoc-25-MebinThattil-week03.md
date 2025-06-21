---
title: "GSoC ’25 Week 03 Update by Mebin J Thattil"
excerpt: "Re-thinking training dataset structure"
category: "DEVELOPER NEWS"
date: "2025-06-21"
slug: "2025-06-21-gsoc-25-mebinthattil-week3"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week03,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.png"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-14 - 2025-06-21  

---

## Goals for This Week

- **Goal 1:** Fix the issue for continious generation of chain of responses from model

---

## This Week’s Achievements

Note: _I'm officially on leave for this week and the next week, but I have however been taking calls and attending meetings, and did some light work in the background._ 

1. **Re-formatted the dataset to avoid generating chain of responses**
   - Before the dataset had a records of conversations between a student and a teacher. Each record would have around 5-10 back-and-forth questions and interactions between the student and teacher. 
   - Since we were training on this dataset format, the model would also try to replicate this format - ie. it would start generating a chain of question-answer back and forths between the student and teacher. This is obviously something that we don't want.
   - I initially kept it this way to teach the model better conversational flow, but this approach does more harm than help.
   - So I have broken up the conversations and re-structured the conversations. 
   - I will now fine-tune it again on a subset of the dataset and deploy just to test it (_this is yet to be done_)
  

---

## Key Learnings

- Structure of dataset needs to be changed, in order to make it more conversational and understand the nuances of a chain of conversations.
  
---

## Next Week’s Roadmap

- Train the model and evaluate it
- Also try to run [my model](https://huggingface.co/MebinThattil/FT-Llama3.2-1B/tree/main) that is on HF via Sugar-AI.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

