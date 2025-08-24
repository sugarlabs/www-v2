---
title: "DMP ’25 Week 10 Update by Harshit Verma"
excerpt: ""
category: "DEVELOPER NEWS"
date: "2025-08-16"
slug: "2025-08-16-dmp-25-therealharshit-week10"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week10,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-04 - 2025-08-10   

---

## Goals for This Week

- **Goal 1:** Refine debugger responses to be more accurate and **age-appropriate**.  
- **Goal 2:** Experiment with a **larger LLM (Gemma-3-27B-it)** for better explanations.  
- **Goal 3:** Test debugger workflow with various **buggy Python code examples**.  

---

## This Week’s Achievements

1. **Integrated Larger Model (Gemma-3-27B-it)**  
   - Switched from the previous smaller model to a larger one to generate more coherent and helpful debugging outputs.  
   - Early results show clearer explanations and smoother response quality.  

2. **Improved Prompt Workflow**  
   - Refined prompt design to balance **technical accuracy** with **child-friendly language**.  
   - Ensures that responses are simple, engaging, and encourage a “debugging journey” rather than just spoon-feeding answers. 
  <img src="assets/Images/Pippy_prompt-workflow.png" alt="Pippy Debugger: Prompt Workflow" width="300">

3. **Extensive Testing with Buggy Code**  
   - Ran multiple test cases on buggy Python programs.  
   - Verified that the responses are not only technically correct but also accessible to younger learners.  
  - Document: [Responses from the LLM-Powered Debugger](https://docs.google.com/document/d/1u5th52avkRwtuu78ojiD2z8llYLuxqbEGOYcBe2-N_8/edit?usp=sharing)  

---

## Challenges & How I Overcame Them

- **Challenge:** Larger models increase inference time.  
  **Solution:** Optimized API calls and reduced unnecessary context in prompts.  

- **Challenge:** Striking the right balance between correctness and simplicity.  
  **Solution:** Iterative prompt tuning and trial runs with varied buggy examples.  

---

## Key Learnings

- Learned how to **fine-tune prompt workflows** for both technical correctness and educational clarity.  
- Understood the trade-offs between **smaller vs larger models** in terms of cost, speed, and output quality.  
- Gained hands-on experience in **debugging pedagogy** making explanations more interactive for kids.  

---

## Next Week’s Roadmap

- Further refine **debug responses** for edge cases based on mentors feedback.  
- Integrate full pipeline with Sugar-AI.

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
