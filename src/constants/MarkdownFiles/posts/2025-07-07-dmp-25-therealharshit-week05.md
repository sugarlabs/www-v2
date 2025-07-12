---
title: "DMP ’25 Week 05 Update by Harshit Verma"
excerpt: "This week, I built a custom Markdown parser for VTE (Virtual Terminal Emulator), began evaluating model performance, and discussed age appropriate debugging practices with mentors."
category: "DEVELOPER NEWS"
date: "2025-07-07"
slug: "2025-07-07-dmp-25-therealharshit-week05"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week05,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-30 - 2025-07-06   

---

## Goals for This Week

- **Goal 1:** Develop a custom Markdown parser for VTE (Virtual Terminal Emulator).
- **Goal 2:** Begin model selection and optimization.
- **Goal 3:** Discuss best debugging practices for children.

---

## This Week’s Achievements

1. **Built a Lightweight Markdown Parser for VTE**  
   - Created a simple parser to interpret basic Markdown (like `**bold**`, `- bullets`, `### headers`) and display it using ANSI-style formatting in the VTE terminal.
   - Iterated by testing different wording styles and instruction formats, which led to noticeably better visual output.
   ![Pippy UI: Parsed markdown response in vte](assets/Images/pippy_markdown-parser.png)

2. **Started Model Evaluation and Optimization**  
   - Compared several models (like Mistral, CodeLlama, and others from Hugging Face) to balance output quality with local performance.
   - The response was good but it was taking a lot of time to generate the response.

3. **Had a Discussion on Debugging Practices for Children**  
   - Talked with mentors about how to present debugging in a way that encourages curiosity rather than frustration.
   - Key ideas included: focusing on helpful language, start with contextualization, and offering clear, step-by-step suggestions.

---

## Challenges & How I Overcame Them

- **Challenge:** Parsing Markdown in a VTE terminal widget.  
  **Solution:** Since VTE doesn't support rich text natively, I built a custom parser to translate basic Markdown into stylized terminal output using spacing, symbols, and ANSI codes.

- **Challenge:** Running the model locally on CPU.  
  **Solution:** Faced performance limitations due to lack of GPU support. To address this, I explored the option of offloading model inference to AWS.

---

## Key Learnings

- Gained experience in building a custom parser, handling string pattern detection and safe rendering within VTE.
- Practiced simplifying technical content for young learners, focusing on clarity over complexity.

---

## Next Week’s Roadmap

- Work on setting CSS for Debugging terminal, to style it.
- Finalize model selection and prepare integration with Sugar-AI.
- Start working on saving debug history to Sugar Journal.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---
