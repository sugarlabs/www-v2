---
title: "GSoC '25 Week 10 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates - Continuing work on the RAG pipeline and MIDI widget improvements"
category: "DEVELOPER NEWS"
date: "2025-08-09"
slug: "2025-08-09-gsoc-25-Elwin-Li-week10"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week10,RAG pipeline,MIDI widget"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Elwin Li

**Project:** MusicBlocks Generation Model

**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-08-03 - 2025-08-09

---

## Goals for This Week

- **Goal:** Connect the MIDI upload widget with the RAG pipeline to enable end-to-end Music Blocks generation from user queries.

---

## This Week's Achievements

This week I made a lot of progress on the Music Blocks generation project. I successfully connected the MIDI upload widget with the RAG pipeline, and now users can enter a query and generate a Music Blocks project as per their request. This creates a complete workflow from natural language input to final Music Blocks output.

[youtube: 5Ha7WlbHOfc]

---

## Challenges & How I Overcame Them

- **Challenge:** The generated MIDI files didn't sound right and had quality issues.
  **Solution:** Improved the prompt engineering and changed the model used for generation, which resulted in better-sounding MIDI output.

---

## Key Learnings

- Gained experience in integrating different components of a music generation pipeline.
- Improved skills in prompt engineering for better MIDI generation quality.
- Learned about the importance of model selection for specific generation tasks.

---

## Next Week's Roadmap

- Adjust the tempo of the generated MIDI files, as they currently seem to always be generated at very fast speeds for some reason.
- Investigate and fix the underlying cause of the tempo issues in the generation process.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
