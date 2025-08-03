---
title: "DMP ’25 Week 08 Update by Harshit Verma"
excerpt: "This week I was focused on backend integration for the Pippy Debugger. I developed and refined the /debug endpoint in Sugar-AI, this work is key to making the debugger responsive, modular, and ready for full integration."
category: "DEVELOPER NEWS"
date: "2025-08-02"
slug: "2025-08-02-dmp-25-therealharshit-week08"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week08,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-21 - 2025-07-27   

---

## Goals for This Week

- **Goal 1:** Continue developing the `/debug` endpoint in Sugar-AI.
- **Goal 2:** Align backend structure to support clean communication between Pippy and Sugar-AI.

---

## This Week’s Achievements

This week focused on backend development, particularly building and refining the `/debug` endpoint in Sugar-AI. This endpoint serves as the core communication bridge between the Pippy interface and the Sugar's AI inference.

**Key tasks accomplished:**
- Implemented structured request parsing for incoming code and context.
- Designed a response schema that aligns with frontend rendering expectations.
- Added basic error handling and response validation.
- Conducted initial tests to simulate real-time usage from the Pippy Debugger.

Although this week involved less visible UI development, the backend enhancements are vital to delivering a seamless debugging experience.

---

## Challenges & How I Overcame Them

- **Challenge:** Understaing Sugar-AI’s existing API structure.  
  **Solution:** I followed the documentaion and my mentors guidance.

---

## Key Learnings

- Deepened understanding of API endpoint design.
- Ensuring the `/debug` endpoint remains general enough to support various use cases, while still delivering responses formatted for children.

---

## Next Week’s Roadmap

- Fully connect the new `/debug` endpoint with Pippy.
- Refine the response output to improve readability and flow for children.
- Start working on saving debug history to Sugar Journal.

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
