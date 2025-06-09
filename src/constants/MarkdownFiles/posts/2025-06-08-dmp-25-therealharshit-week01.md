---
title: "DMP ’25 Week 01 Update by Harshit Verma"
excerpt: "Week 01 focused on understanding the Pippy codebase, testing Sugar-AI endpoints, and evaluating AI models for the debugger."
category: "DEVELOPER NEWS"
date: "2025-06-09"
slug: "2025-06-09-dmp-25-therealharshit-week01"
author: "Harshit Verma"
description: "Member and DMP'25 Contributor at SugarLabs"
tags: "dmp25,sugarlabs,week01,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-02 - 2025-06-08  

---

## Goals for This Week

- **Goal 1:** Study Pippy codebase.
- **Goal 2:** Explore Sugar AI and test its endpoints.
- **Goal 3:** Research suitable AI models for debugging.

---

## This Week’s Achievements

1. **Studied the Pippy codebase**  
   - Spent time navigating through the Pippy repository to understand how activities are structured and how debugging might integrate.
   - Cloned and set up the development environment locally to test and experiment changes.
2. **Tested Sugar-AI API endpoints**  
   - Successfully ran the FastAPI server and tested endpoints like /ask and /ask-llm.
   - Validated the flow from input to model response, which sets the stage for integrating custom prompts and debugging logic.

3. **Evaluated model options for Pippy Debugger**  
   - Tested Codellama and Mistral locally using Ollama, which provided quick setup and testing on my local machine.
   - After discussing with my mentor, I’ve shifted focus to using models directly from Hugging Face, as it aligns better with our deployment plans and integration goals.

---

## Challenges & How I Overcame Them

- **Challenge:** Understanding the Pippy codebase and its dependencies.  
  **Solution:** Followed documentation and explored Sugar Labs learning resources. Used Ubuntu in a virtual machine to setup sugar desktop.

- **Challenge:** Running Sugar AI locally to test endpoints.  
  **Solution:** Followed the documentation to run th sever but the default model was taking too long to download so I changed it to a smaller model.

---

## Key Learnings

- Gained familiarity with the **Pippy codebase and its structure.**.
- Learned to work with **FastAPI**, **Linux** and **Virtual Machine**.
- Developed better understanding of **LLM system requirements**, **quantization**, and **local model serving**.

---

## Next Week’s Roadmap

- Create a basic FastAPI server **(/debug endpoint)** that accepts Python code and suggests debugging steps.
- Integrate the **selected LLM** to respond to debugging prompts.
- Collaborate with mentors to refine design and implementation plans.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---

## Connect with Me

- GitHub: [@therealharshit](https://github.com/therealharshit)
- Gmail: [therealharshit014@gmail.com](mailto:therealharshit014@gmail.com)
- LinkedIn: [Harshit Verma](https://www.linkedin.com/in/therealharshit/)

---
