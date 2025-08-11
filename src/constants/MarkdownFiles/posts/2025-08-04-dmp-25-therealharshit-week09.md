---
title: "DMP ’25 Week 09 Update by Harshit Verma"
excerpt: "Finalized the /debug endpoint in Sugar-AI and tested its performance using buggy Python code. I also plan to experimented with a larger model to evaluate debugging responses and began refining them to be more age-appropriate."
category: "DEVELOPER NEWS"
date: "2025-08-09"
slug: "2025-08-09-dmp-25-therealharshit-week09"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week08,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-28 - 2025-08-03   

---

## Goals for This Week

- **Goal 1:** Complete work on the `/debug` endpoint in Sugar-AI.  
- **Goal 2:** Test the debugging response using Sugar-AI on various buggy Python code samples.

---

## This Week’s Achievements

1. **Enhanced `/debug` Endpoint in Sugar-AI**  
  - Finalized the logic for better parsing and structured debugging feedback.  
  - Ensured the endpoint outputs clear, concise, and kid-friendly messages.  

2. **Testing with Real Buggy Python Code**  
  - Curated multiple buggy Python scripts ranging from beginner-level mistakes to more advanced logical errors.  
  - Verified that Sugar-AI correctly identifies, explains, and suggests fixes for each case.  
  - Helped improve prompt handling to maintain age-appropriate explanations for kids.
  - Document: [LLM response](https://docs.google.com/document/d/1a8GgsccWm9lSuFCWc7yStXzZ3dZW_EIigLyGXseOfjs/edit?usp=sharing)  

---

## Challenges & How I Overcame Them

- **Challenge:** Initial debugging responses were too technical for the target audience.  
  **Solution:** Iterated the prompt design and response formatting to make them simpler and more engaging.

---

## Key Learnings

- Deepened understanding of API endpoint design.
- Improved prompt engineering for educational AI tools.  

---

## Next Week’s Roadmap

- Observed that the current responses were too technical, so worked on making them more age-appropriate.
- Tested the debugging responses using a larger language model for improved accuracy.

---

## Resources & References

**Repository**
- [Pippy](https://github.com/therealharshit/Pippy/tree/DMP2025/Pippy-Debugger)
- [sugar-ai](https://github.com/sugarlabs/sugar-ai)
- [pippy-debugger-server](https://github.com/therealharshit/pippy-debugger-server)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---
