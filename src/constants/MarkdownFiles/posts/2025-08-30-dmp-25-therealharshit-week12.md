---
title: "DMP ’25 Week 12 Update by Harshit Verma"
excerpt: "Progress on implementing debug history saving in the Journal and polishing code for final review."
category: "DEVELOPER NEWS"
date: "2025-08-30"
slug: "2025-08-30-dmp-25-therealharshit-week12"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week12,therealharshit"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-18 - 2025-08-24   

---

## Goals for This Week

- **Goal 1:** Work on implementing saving debug history into the Sugar Journal.  
- **Goal 2:** Polish existing codebase in preparation for final review.  
- **Goal 3:** Improve the Markdown parser for more readable debug responses in the terminal.  
- **Goal 4:** Conduct end-to-end testing of the `/debug` endpoint.  

---

## This Week’s Achievements

1. **Worked on saving the debugger response in the sugar journal**  
   - Explored how activities interact with the Journal using the `write_file()` and `read_file()` methods.  
   - Extended the default workflow (which only saves source tab data) to also capture **debugging terminal outputs**.  
   - Designed a JSON-based structure to record **code, errors, and LLM responses** for each session.  

2. **Refactoring of codebase**  
   - Began cleaning up previously committed code based on mentor feedback.  
   - Improved function naming, modularized some logic, and reduced redundancy.  
   - Focused on ensuring **seamless integration between Sugar-AI and Pippy**, reducing chances of UI freeze or broken API calls.  

3. **Markdown Parser Improvements**  
   - Iterated on the custom Markdown parser to better format LLM responses.  
   - Ensured that **bold keywords, bullet lists, and code snippets** appear cleanly in the GTK terminal.  
   - Began testing rendering consistency with multiple LLM outputs.  

4. **End-to-End Workflow Testing**  
   - Tested the complete flow: Pippy code → API call to Sugar-AI → Debugging response → Display in terminal.  
   - Verified data integrity across each step, ensuring nothing is lost or malformed in transmission.  

---

## Challenges & How I Overcame Them

- **Challenge:** Understanding how the Sugar Journal stores and restores activity state.  
  **Solution:** Based on discussion with my mentors I went through the Sugar toolkit documentation, experimented with other activities and learn about the `write_file()` and `read_file()` methods .  

- **Challenge:** Formatting inconsistencies in Markdown parsing.  
  **Solution:** Added step-by-step rendering checks and created a fallback for unrecognized Markdown syntax.  

---

## Key Learnings

- Learned about the importance of journaling. 
-  Improved skills in **code refactoring**, focusing on maintainability and integration.   

---

## Next Week’s Roadmap

- Raise the final PR for Pippy.  
- Complete the **project final report** and submit for evaluation.  
- Write User docs and technical docs.

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
