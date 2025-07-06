---
title: "DMP ’25 Week 03 Update by Harshit Verma"
excerpt: "Week 3 focused on refining the AI prompt for better debugging suggestions, exploring UI ideas for displaying tips, and testing Sugar AI integration with Pippy."
category: "DEVELOPER NEWS"
date: "2025-06-23"
slug: "2025-06-23-dmp-25-therealharshit-week02"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week03,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-16 - 2025-06-22   

---

## Goals for This Week

- **Goal 1:** Refine the base prompt for debugging tips.
- **Goal 2:** Explore multiple UX approaches for displaying debug output.
- **Goal 3:** Test Sugar AI integration with Pippy.

---

## This Week’s Achievements

1. **Refine the base prompt for debugging tips**  
   - Refine the base prompt sent to the AI model to make debugging suggestions clearer and more relevant.
   - Iterated by testing different wording styles and instruction formats, which led to noticeably better model output.

2. **Explore multiple UX approaches for displaying debug output**  
   - Considered multiple UX designs for displaying debug tips, such as:
     * **Inline** messages near code lines.
     * A **side panel** exclusively for displaying suggestions..
     * A **Dedicated Debugging Terminal** for interactive debugging.
   - Evaluated each method in terms of ease of integration, readability, and user experience.
   - Concluded that a dedicated debugging terminal offers the best balance of usability and flexibility.
   - Plan to design a UI mockup for this approach in the upcoming week.

3. **Test Sugar AI integration with Pippy**  
   - Successfully tested the connection between Pippy and Sugar-AI.
   - Verified that the Python code written in Pippy is extracted correctly, sent to the /ask-llm endpoint, and the response is generated.

---

## Challenges & How I Overcame Them

- **Challenge:** Crafting prompts that consistently lead to relevant and useful debugging suggestions.  
  **Solution:** Studied prompt engineering best practices and experimented with structure, examples, and explicit instructions to guide the model better.

- **Challenge:** Deciding how to present debug output in a child-friendly and non-intrusive way.  
  **Solution:** Brainstorm some UI ideas, reviewed how other tools display feedback, and consulted with mentors on what would best align with the Sugar UX philosophy.

---

## Key Learnings

- Gained deeper insight into prompt engineering and its impact on LLM output quality.
- Developed a design-focused mindset for user-centric debugging tools.

---

## Next Week’s Roadmap

- Plan to design a UI mockup for debugging terminal.
- Implement a first version of the debug output inside Pippy.
- Collect feedback from mentors on debug message placement and design.

---

**Note:** This week, I was mostly away from the keyboard, so I couldn’t dedicate as much time to coding as usual.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---
