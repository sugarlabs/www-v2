---
title: "DMP ’25 Week 02 Update by Aman Chadha"
excerpt: "Enhancing RAG output with part-of-speech tagging and optimizing chunk granularity"
category: "DEVELOPER NEWS"
date: "2025-06-16"
slug: "dmp-25-aman-week02"
author: "Aman Chadha"
description: "DMP '25 Contributor working on retrieval-augmented generation for Music Blocks"
tags: "dmp25,musicblocks,rag,week02"
image: "assets/Images/c4gt_DMP.png"
---

# Week 02 Progress Report by Aman Chadha

**Project:** [JS Internationalization with AI Translation Support](https://github.com/sugarlabs/musicblocks/pull/4459)  

**Mentors:** [Walter Bender](https://github.com/walterbender)

**Reporting Period:** 2025-06-09 – 2025-06-16

---

## Goals for This Week

- Refine the RAG model output format for improved downstream use.
- Implement part-of-speech tagging to enrich context awareness in RAG retrieval.
- Reduce chunk size for more precise retrieval based on mentor feedback.
- Begin testing the RAG model with real-world queries.

---

## This Week’s Achievements

1. **Enhanced RAG Output Format**  
   - Updated the RAG model to return results in a dictionary structure.
   - Included part-of-speech information for each translation unit, enabling more nuanced context retrieval.

2. **Chunk Optimization**  
   - Adjusted AST-based code chunking logic to include only 5 lines above and below the relevant translation call.
   - This change was implemented based on feedback from mentor Walter during a sync-up meeting.
   - The refined chunk size improves focus and reduces noise in context matching.

3. **Initial Testing of RAG Model**  
   - Started testing the RAG system with real query samples from Music Blocks.
   - Observed initial improvements in contextual relevance due to enriched metadata and refined chunks.

---

## Challenges & How I Overcame Them

- **Challenge:** Integrating part-of-speech tagging meaningfully into the RAG pipeline.  
  **Solution:** Created a structured dictionary-based output that includes the msgid, msgstr, pos, and source metadata for every entry.

- **Challenge:** Deciding optimal chunk boundaries without losing semantic context.  
  **Solution:** Followed mentor advice to use 5-line windows above and below relevant code, then verified accuracy by manual testing.

---

## Key Learnings

- Better metadata, such as part-of-speech labels, can significantly improve the performance of retrieval-augmented models.
- Small refinements in chunk size and structure can lead to clearer, more actionable context.
- Collaborative iteration with mentor input is crucial in aligning technical decisions with practical outcomes.

---

## Next Week’s Roadmap

- Integrate the refined RAG model into the full translation flow in Music Blocks.
- Evaluate RAG accuracy with various translation strings, particularly ambiguous or reused ones.
- Continue improving the fallback logic for missing translations using AI suggestions.

---

## Resources & References

- **Music Blocks Repository:** [github.com/your-org/musicblocks](https://github.com/your-org/musicblocks)  
- **Babel AST Docs:** https://babeljs.io/docs/en/babel-parser  
- **Part-of-Speech Tagging (spaCy):** https://spacy.io/usage/linguistic-features#pos-tagging  
- **RAG Model Concepts:** https://arxiv.org/abs/2005.11401  

---

## Acknowledgments

Thanks to my mentor Walter Bender for his continued feedback and suggestions to improve retrieval relevance and model usability.

---

## Connect with Me

- GitHub: [@aman-chadha](https://github.com/ac-mmi)  
- Gmail: [aman.chadha.mmi@gmail.com](mailto:aman.chadha.mmi@gmail.com)  

---
