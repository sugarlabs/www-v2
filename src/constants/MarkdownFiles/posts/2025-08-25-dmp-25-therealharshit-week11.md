---
title: "DMP ’25 Week 11 Update by Harshit Verma"
excerpt: "This week I focused on implementing the `/debug` endpoint in Sugar-AI, which will serve as the backbone for the Pippy Debugger."
category: "DEVELOPER NEWS"
date: "2025-08-25"
slug: "2025-08-25-dmp-25-therealharshit-week11"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week10,therealharshit"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-11 - 2025-08-17   

---

## Goals for This Week

- **Goal 1:** Implement a new `/debug` endpoint in **Sugar-AI**.  
- **Goal 2:** Ensure the endpoint integrates cleanly with the upcoming **Pippy Debugger**.  
- **Goal 3:** Raise a pull request for mentor review and feedback.  

---

## This Week’s Achievements

1. **Implemented `/debug` Endpoint in Sugar-AI**  
   - Designed and developed a new API endpoint to handle debugging requests from the Pippy Debugger.  
   - This forms the **core backend logic** enabling the LLM to analyze learners’ code and provide debugging help.  
   - PR: [sugarlabs/sugar-ai/pull/28](https://github.com/sugarlabs/sugar-ai/pull/28)  

2. **Prepared Code for Integration with Pippy**  
   - Structured the API so that it can be directly connected with the Pippy Activity.  
   - This ensures seamless integration of Sugar-Ai with Pippy.  

---

## Challenges & How I Overcame Them

- **Challenge:** Defining a clean and scalable API design for debugging.  
  **Solution:** Discussed with mentors, studied common debugging APIs, and created a minimal but extensible structure.  

---

## Key Learnings

- Learned how to effectively work with LangChain for building modular and flexible AI pipelines.  
- Gained experience in implementing multiple LLM calls within a single chain to generate more context-aware and appropriate debugging responses.

---

## Next Week’s Roadmap

- Further refine **debug responses** for edge cases based on mentors feedback.  
- Work on improving the debugger ui/ux if required.  
- Start the work on saving debug history to sugar journal.  

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
