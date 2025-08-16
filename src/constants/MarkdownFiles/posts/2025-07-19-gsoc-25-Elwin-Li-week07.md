---
title: "GSoC '25 Week 7 Update by Elwin Li"
excerpt: "MusicBlocks generation model"
category: "DEVELOPER NEWS"
date: "2025-07-19"
slug: "2025-07-19-gsoc-25-Elwin-Li-week07"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week7,javaScript editor,debugger,syntax highlighting"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Elwin Li

**Project:** MusicBlocks Generation Model

**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-07-12 - 2025-07-19

---

## Goals for This Week

- **Goal:** Work on obtaining a dataset for MusicBlocks generation model

---

## This Week’s Achievements

Before diving into the technical work, I want to share some context on the direction of my project. Last week, I experimented with a prompt-engineered Gemini API call to generate MusicBlocks code from natural language prompts. However, I found that this approach did not work well for examples more complex than simple nursery rhymes. As a result, I decided to explore the possibility of fine-tuning a model specifically for MusicBlocks code generation.

I spent a significant amount of time this week learning about the process of fine-tuning large language models. Through this research, I discovered that a high-quality dataset is essential for effective fine-tuning. This realization shaped the rest of my week's work, as I shifted my focus toward obtaining and preparing such a dataset.

This week, I mainly focused on gathering data for the MusicBlocks generation model. I used the example projects in the examples folder as my data source. Since these projects were in blocklist format, I needed to find a way to convert all of them to JavaScript code.

To accomplish this, I developed a widget that can load projects directly from the examples folder, generate the corresponding JavaScript code, and download it. This streamlined the process of extracting code from a large number of example projects.

<a href="https://ibb.co/7NTw72yd"><img src="https://i.ibb.co/HpMWmngf/Screenshot-2025-07-20-at-1-04-37-AM.webp" alt="Examples Loader Widget"></a>


However, I found that only about half of the projects could be successfully converted to JavaScript. Many of the example projects contained blocks that are not currently supported for block-to-code conversion, which limited the amount of usable data I could extract for the model.

After completing these achievements, I realized that since I didn't have much data available, fine-tuning might not be the most effective approach. Instead, I decided to shift my focus towards Retrieval-Augmented Generation (RAG) as an alternative. I have now started learning about the RAG process and how it could be applied to the MusicBlocks generation task.

---

## Challenges & How I Overcame Them

- **Challenge:** The Gemini API prompt engineering approach only worked for very simple examples and failed on more complex MusicBlocks projects.
  
  **Solution:** Decided to explore fine-tuning a model for MusicBlocks code generation, which required learning about the fine-tuning process and dataset requirements.

- **Challenge:** Many example projects could not be converted from blocklist to JavaScript due to unsupported blocks in the block-to-code conversion process.
  
  **Solution:** Built a widget to automate the conversion and identify which projects could be used, maximizing the amount of usable data.

- **Challenge:** Realized that the available dataset was too small for effective fine-tuning.
  
  **Solution:** Shifted focus to learning about Retrieval-Augmented Generation (RAG) as an alternative approach.

---

## Key Learnings

- Gained hands-on experience with prompt engineering for LLMs and its limitations for domain-specific code generation.
- Learned about the requirements and process for fine-tuning large language models, including the importance of dataset size and quality.
- Improved skills in automating data extraction and conversion workflows using custom widgets.
- Discovered the potential of Retrieval-Augmented Generation (RAG) as a practical alternative to fine-tuning when data is limited.

---

## Next Week’s Roadmap

- Continue learning about and experimenting with Retrieval-Augmented Generation (RAG) for MusicBlocks code generation.
- Investigate tools and frameworks for implementing RAG in the context of MusicBlocks.
- Explore ways to further expand or enhance the dataset, if possible.
- Begin prototyping a basic RAG pipeline using the data collected so far.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

--- 