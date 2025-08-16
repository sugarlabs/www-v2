---
title: "DMP '25 Week 02 Update by Aman Chadha"
excerpt: "Enhanced RAG output format with POS tagging and optimized code chunking for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-06-16"
slug: "2025-06-16-dmp-25-aman-chadha-week02"
author: "@/constants/MarkdownFiles/authors/aman-chadha.md"
tags: "dmp25,sugarlabs,week02,aman-chadha"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Aman Chadha

**Project:** [JS Internationalization with AI Translation Support](https://github.com/sugarlabs/musicblocks/pull/4459)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** *None this week*  
**Reporting Period:** 2025-06-09 - 2025-06-16  

---

## Goals for This Week

- **Refactor RAG model output** to a structured dictionary format that includes part-of-speech (POS) tagging.
- **Optimize AST-based chunking** by limiting code context to 5 lines above and below translation usage, per mentor feedback.
- **Begin functional testing** of the updated RAG pipeline on real-world translation queries.

---

## This Week's Achievements

1. **RAG Output Enhancement**  
   - Refactored the Retrieval-Augmented Generation model to return results as structured dictionaries.
   - Each entry now includes `msgid`, `msgstr`, source metadata, and the dominant part of speech, improving retrieval relevance.

2. **Code Chunking Optimization**  
   - Reduced each extracted code chunk to include only 5 lines above and below the relevant `msgid` usage.
   - This improves retrieval precision and avoids irrelevant surrounding code.  
   - Implemented using Babel’s AST traversal logic.

3. **Initial Model Testing**  
   - Started testing the RAG model using sample translation queries.
   - Observed noticeable improvements in answer context relevance due to cleaner chunks and richer metadata.

---

## Challenges & How I Overcame Them

- **Challenge:** Integrating POS tagging meaningfully into the RAG data pipeline.  
  **Solution:** Designed a dictionary schema that includes the part-of-speech alongside translation metadata, and verified correctness using test entries.

- **Challenge:** Tuning chunk granularity without losing contextual utility.  
  **Solution:** Followed mentor Walter’s advice to use fixed ±5 line windows, and manually verified semantic coherence of resulting chunks.

---

## Key Learnings

- Part-of-speech tagging can significantly improve the contextual strength of retrieved translations.
- Smaller, focused code chunks often result in better retrieval precision for RAG applications.
- Mentor feedback and collaborative iteration are key to refining both code structure and user outcomes.

---

## Next Week's Roadmap

- Integrate POS-tagged RAG responses into the full i18n fallback translation pipeline.
- Expand test coverage to include edge-case translations and re-used `msgid`s.
- Prepare an internal demo to show RAG-powered retrieval resolving contextually ambiguous translation strings.

---

## Resources & References

- **Repository:** [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **RAG Concepts:** [arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
- **Babel Parser Docs:** [babeljs.io/docs/en/babel-parser](https://babeljs.io/docs/en/babel-parser)
- **spaCy POS Tagging:** [spacy.io/usage/linguistic-features#pos-tagging](https://spacy.io/usage/linguistic-features#pos-tagging)

---

## Acknowledgments

Thanks to my mentor Walter Bender for his guidance on optimizing chunking strategy and enriching the retrieval logic with linguistic features.

---

## Connect with Me

- GitHub: [@aman-chadha](https://github.com/ac-mmi)  
- Gmail: [aman.chadha.mmi@gmail.com](mailto:aman.chadha.mmi@gmail.com)  

---
