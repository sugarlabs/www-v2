---
title: "DMP ’25 Week 01 Update by Aman Chadha"
excerpt: "Working on a RAG model for Music Blocks core files to enhance context-aware retrieval"
category: "DEVELOPER NEWS"
date: "2025-06-09"
slug: "2025-06-09-dmp-25-aman-week01"
author: "Aman Chadha"
description: "DMP '25 Contributor working on retrieval-augmented generation for Music Blocks"
tags: "dmp25,musicblocks,rag,week01"
image: "assets/Images/c4gt_DMP.webp"
---

<!--markdownlint-disable-->

# Week 01 Progress Report by Aman Chadha

**Project:** [JS Internationalization with AI Translation Support](https://github.com/sugarlabs/musicblocks/pull/4459)  

**Mentors:** [Walter Bender](https://github.com/walterbender)

**Reporting Period:** 2025-06-02 - 2025-06-08

---

## Goals for This Week

- Develop a Retrieval-Augmented Generation (RAG) model using the core files of Music Blocks to provide context-aware responses.
- Collect and parse .po files, extracting msgid and msgstr pairs along with comments showing usage in source files.
- Use AST parsing (with Babel) to gather metadata chunks from source files to improve retrieval relevance.

---

## This Week’s Achievements

1. **RAG Model Development**  
   - Started working on building a RAG model focused on the core Music Blocks files. This aims to give the model context about what Music Blocks is and how it functions, improving answer relevance.
   
2. **Metadata Extraction from .po Files**  
   - Successfully collected msgid and msgstr pairs from translation files.
   - Parsed comments above the translations to identify which files use each msgstr.
   
3. **AST Parsing and Chunking**  
   - Used Babel to parse Music Blocks source files and extract relevant code chunks.
   - Stored these chunks with their associated metadata to enable better context retrieval during RAG.

---

## Challenges & How I Overcame Them

- **Challenge:** Parsing complex .po files with varied comment styles and ensuring correct association of usage metadata.  
  **Solution:** Created robust parsing scripts to handle different comment formats and verified chunk associations manually on sample files.

- **Challenge:** Extracting meaningful code chunks via AST parsing while maintaining useful granularity.  
  **Solution:** Experimented with different AST traversal strategies and filters to optimize chunk size for retrieval.

---

## Key Learnings

- Gained deeper understanding of the internals of Music Blocks core files and their translation system.
- Improved skills with Babel AST parsing and metadata extraction techniques.
- Learned the importance of detailed metadata in enhancing RAG model retrieval accuracy.

---

## Next Week’s Roadmap

- Build a demo to showcase the RAG model's ability to answer Music Blocks-related queries with context from core files.
- Begin integrating metadata-enriched .po file chunks into the RAG database for improved translation string retrieval.
- Optimize chunking and metadata tagging strategy based on initial demo feedback.

---

## Resources & References

- **Music Blocks Repository:** [github.com/your-org/musicblocks](https://github.com/your-org/musicblocks)  
- **Babel AST Docs:** https://babeljs.io/docs/en/babel-parser  
- **RAG Model Concepts:** https://arxiv.org/abs/2005.11401  

---

## Acknowledgments

Thanks to my mentors and the DMP community for their guidance and support throughout this work.

---

## Connect with Me

- GitHub: [@aman-chadha](https://github.com/ac-mmi)  
- Gmail: [aman.chadha.mmi@gmail.com](mailto:aman.chadha.mmi@gmail.com)  

---
