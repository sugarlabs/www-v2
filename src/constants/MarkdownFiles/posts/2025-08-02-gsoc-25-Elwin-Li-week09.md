---
title: "GSoC '25 Week 9 Update by Elwin Li"
excerpt: "Improvements on the musicblocks generation RAG pipeline and a new MIDI file uploading widget"
category: "DEVELOPER NEWS"
date: "2025-08-02"
slug: "2025-08-02-gsoc-25-Elwin-Li-week09"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week9,RAG pipeline,MIDI widget"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Elwin Li

**Project:** MusicBlocks Generation Model

**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-07-27 - 2025-08-02

---

## Goals for This Week

- **Goal:** Complete the MIDI generation RAG pipeline

---

## This Week's Achievements

This week I upgraded the RAG pipeline with the Gemini embedding model, which resulted in very accurate retrieval. I also used Gemini for the generation component, which also showed much better results compared to previous approaches.

The biggest update for this week is the creation of a MIDI upload widget. This widget allows users to upload any MIDI file and it will automatically generate the corresponding MusicBlocks. In the video demo below, I demonstrate using the widget to upload a MIDI file that was generated using the RAG pipeline with the query "guitar solo with similar style to hotel california". The widget also includes the option to directly generate a MIDI file and convert through a prompt, but it currently does not work, and will be next weeks plan.

[youtube: B0lPJwHc4pI]

---

## Challenges & How I Overcame Them

- **Challenge:** The RAG pipeline was not able to generate music directly to MusicBlocks format.
  
  **Solution:** Used MIDI as an intermediate format, creating a MIDI upload widget that converts MIDI files to MusicBlocks, effectively bridging the gap between the generation pipeline and the MusicBlocks format.

---

## Key Learnings

- Gained deep understanding of RAG (Retrieval-Augmented Generation) systems and their application to music generation.
- Learned about the importance of better embedding models (Gemini) for improved retrieval accuracy.

---

## Next Week's Roadmap

Connect the MIDI generation pipeline with the MIDI upload widget, so that the generated music will automatically be in MusicBlocks format.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
