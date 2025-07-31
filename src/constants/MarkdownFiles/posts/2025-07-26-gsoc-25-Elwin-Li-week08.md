---
title: "GSoC '25 Week 8 Update by Elwin Li"
excerpt: "MusicBlocks generation model"
category: "DEVELOPER NEWS"
date: "2025-07-26"
slug: "2025-07-26-gsoc-25-Elwin-Li-week08"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week8,music generation,RAG"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Elwin Li

**Project:** MusicBlocks Generation Model

**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-07-19 - 2025-07-26

---

## Goals for This Week

- **Goal:** Generate MIDI from prompt for MusicBlocks generation model

---

## This Week’s Achievements

Last week, I made the pivot from trying to fine tune a model to building a RAG pipeline. This week, I have completed building a RAG pipeline that takes in a prompt in the form of a song, artist, or music style, and generates a MIDI note sequence in a similar style.

This was done by the following:
1. **Data Collection & Cleaning**: Found and cleaned a large dataset of MIDI files to use as the foundation for the generation model.

2. **Metadata Extraction**: Extracted important metadata from each MIDI file including:
   - Artist name
   - Song title 
   - Musical style/genre
   - BPM (Beats Per Minute)
   - Additional musical characteristics
   This step proved crucial for improving the retrieval accuracy of the RAG pipeline.

3. **Vector Embedding**: Used Langchain to:
   - Create embeddings of the MIDI data and metadata
   - Store the embeddings in a vector database
   This forms the "Retrieval" component of the RAG system.

4. **Similarity Search**: When a user inputs a prompt (e.g., "hotel california"):
   - The system performs a similarity search between the query and vector database
   - Returns either the exact matching song (if present in dataset)
   - Or returns similar songs based on musical characteristics

5. **Generation Pipeline**: Using the retrieved MIDI representation:
   - Leveraged Gemini API with carefully engineered prompts
   - Generated new melodies that maintain similar musical characteristics
   - Output new MIDI files that capture the style of the requested song

---

## Challenges & How I Overcame Them

- **Challenge:** Realized that the available dataset was too small for effective fine-tuning.
  
  **Solution:** Shifted focus to learning about Retrieval-Augmented Generation (RAG) as an alternative approach.

- **Challenge:** Some MIDI files in the dataset had formatting issues and corruption.
  
  **Solution:** Implemented thorough data cleaning and validation:
  - Checked for proper MIDI file structure
  - Removed corrupted or malformed files
  - Validated tempo and time signature information
  - Ensured consistent formatting across the dataset

- **Challenge:** Initial attempts at embedding raw MIDI data resulted in poor retrieval accuracy.
  
  **Solution:** Enhanced the embedding process by:
  - Including rich metadata alongside MIDI data
  - Adding musical characteristics like genre, tempo, and key
  - Incorporating artist and song information
  - This significantly improved the relevance of retrieved results

---

## Key Learnings

- **RAG as an Alternative to Fine-tuning**: Learned that RAG can be an effective approach when dealing with limited training data, as it leverages existing knowledge rather than requiring extensive fine-tuning.

- **Data Quality is Critical**: Discovered the importance of thorough data preprocessing and validation in building robust ML systems. Poor quality data can significantly impact system performance.

- **Embedding Strategy Matters**: Realized that the choice of what information to include in embeddings greatly affects retrieval accuracy. Including rich metadata alongside raw data can substantially improve results.

- **MIDI Data Handling**: Gained practical experience in:
   - Working with MIDI file formats
   - Handling corrupted files
   - Extracting musical characteristics

---

## Next Week’s Roadmap

- Improve Output Quality
- Documentation & Testing
- Use gemini embedding model

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

--- 