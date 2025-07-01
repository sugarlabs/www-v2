---
title: "GSoC ’25 Week 04 Update by Diwangshu Kakoty"
excerpt: "Implementing a Reasoning-Enabled AI Model"
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-diwangshu-week04"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week04,AI"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-06-22 - 2025-06-28  

---

## Goals for This Week

- **Goal 1:** Leveraging Gemini's Thinking Feature.
- **Goal 2:** Code Migration: LangChain → Gemini SDK.
- **Goal 3:** Clean up the codebase.
- **Goal 4:** Make sample summaries to test the 'Analyis' feature.
- **Goal 5:** Fix bugs occured by these changes.

---

## This Week’s Achievements

1. **Using Gemini's 'Think' Capability for Enhanced Responses**  
   - I have implemented the 'thinking' capability of the Gemini model in the multi-agent chat model. This allows the LLM to break down complex queries into smaller, manageable parts, leading to more accurate and relevant responses. 

   - But it came with a challenge, as LangChain's Gemini module does not support the 'thinking' capability directly (more on this in the challenges section).

2. **Code Migration: LangChain → Gen AI SDK**  
   - As mentioned in the last point, LangChain's Gemini module does not support the 'thinking' capability. Therefore, I have started migrating the 'generation' code from LangChain to the official Gen AI SDK. This migration allows us to use the 'thinking' capability and other features of the Gemini model dynamically.

   - The official Gen AI SDK allows us to use the 'think' dynamically, which means the LLM can decide when to use the 'thinking' capability based on the complexity of the query. It also allows us to specify the number of thinking tokens aka 'thinkingBudget' to be used or set it to auto. This flexibility is crucial for optimizing the performance and cost of using the Gemini model.

3. **Cleaning Up the Codebase**  
   - I have cleaned up the codebase by structuring the code into separate files, functions and modules. This makes the code more organized and easier to maintain.

---

## Challenges & How I Overcame Them

- **Challenge :** LangChain's Gemini module does not support the 'thinking' capability directly. This project uses RAG (Retrieval-Augmented Generation) with LangChain, which is a popular framework for building LLM applications. While the retrieval part works well, the generation part needs to be changed. But it is not that simple. The Gen AI SDK uses its own library for storing conversations, which is different from LangChain.

  **Solution:** There's no doubt that leveraging the reasoning capabilities of the Gemini model can significantly enhance response quality. However, as this is still an evolving technology, full support in LangChain is likely to emerge soon. For testing purposes, a complete migration isn't necessary at this stage. Therefore, I've implemented two separate classes: `llm` and `reasoning_llm`, which initialize `Gemini-1.5-flash` and `Gemini-2.5-flash`, respectively. The `llm` class handles general queries, while `reasoning_llm` is dedicated to writing algorithms for the project code when passed as a query. The `Gemini-2.5-flash` is the model that supports and uses the 'thinking' capability by default. 

  This is a temporary arrangement. If I get positive feedback from the mentors, I will proceed with the complete migration of the 'generation' code to the official Gemini SDK.

---

## Key Learnings

- While working on this project, I explored extensive documentation for both Gemini and LangChain. This deep dive significantly enhanced my understanding of LLMs, including concepts like structured output, function calling, code execution, reasoning capabilities, and various prompting techniques.

---

## Next Week’s Roadmap

- Build a developer settings in the sidebar to allow testers to choose between the 'llm' and 'reasoning_llm' classes for each query. 
- Work on things suggested by mentors. This could include:
  - Full migration of the 'generation' code to the official Gen AI SDK.
- Developing sample summaries to test the 'Analysis' feature.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---