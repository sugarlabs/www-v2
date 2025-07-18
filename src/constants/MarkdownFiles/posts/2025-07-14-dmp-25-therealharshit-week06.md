---
title: "DMP ’25 Week 06 Update by Harshit Verma"
excerpt: "I added a new step to help students understand their code’s intent before debugging begins. I also worked on improving the terminal’s formatting and finalized Mistral 7B as the debugging model to be integrated with Sugar AI"
category: "DEVELOPER NEWS"
date: "2025-07-14"
slug: "2025-07-14-dmp-25-therealharshit-week06"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week06,midterm,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-07 - 2025-07-13   

---

## Goals for This Week

- **Goal 1:** Work on contextualization before debugging.
- **Goal 2:** Add CSS-style formatting to the debugging terminal.
- **Goal 3:** Finalize model decision for debugging.

---

## This Week’s Achievements

1. **Implemented Code Context Display for Learners**  
   - As discussed in the debugging meeting, added a step that shows the context or purpose of the code to the student, helping them understand what the code is trying to do before showing debug suggestions.
   - This helps children first grasp what the code is meant to do, which builds confidence and improves the effectiveness of the debugging tips that follow.
   - Introduced a new step in the debugging flow: before showing any suggestions, the interface displays a brief summary of the code’s intent or functionality.

2. **Worked on Debug Terminal Formatting**  
   - Tried to apply CSS-like styles to make debug output more structured and visually appealing.
   - GTK limitations posed challenges, continued work on enhancing the Markdown parser instead.

3. **Finalize model decision for debugging**  
   - Decided to use **Mistral 7B**, which will be integrated with Sugar AI for better compatibility and performance.
   - Based on performance tests and Sugar AI's deployment pipeline, It offers a good balance of output quality and resource efficiency for server-side use.

---

## Challenges & How I Overcame Them

- **Challenge:** Styling Virtual Terminal Emulator (VTE) output with CSS.  
  **Solution:** Learned that we can't apply CSS to the VTE terminal output as they are not GTK widget, so I decided to work on further improving the markdown parser.

---

## Key Learnings

- Learned how code contextualization can help beginner coders by giving them an idea of what the code should do, and it also improves their ability to understand and fix problems.
- Developed a design-focused mindset for user-centric debugging tools.

---

## Next Week’s Roadmap

- Start working on replacing pippy-debugger-server with sugar-ai.
- Start working on saving debug history to Sugar Journal.
- Work on preparing a presentation as part of DMP midterm evaluation.

---

# Midterm Progress Report (6 Week Summary)

## Project Objective

The goal of this project is to enhance the Pippy learning environment by integrating an LLM-powered debugger. The debugger uses LLMs to provide readable, friendly suggestions for fixing broken code, helping young learners understand and improve their programs.

---

## Technical Implementation

- Set up a **FastAPI backend** (`/debug`) to handle Python code input.

- Integrated **Hugging Face model** for generating debugging tips.

- Created **Run & Debug** buttons in Pippy’s GTK interface.

- Connected **Pippy**  with the backend server via API.

- Implemented a **Debug terminal** in the UI to display suggestions.

- Developed a **basic Markdown parser** for formatted output in VTE.

- Added a **Contextualization step** to show students what the code intends to do before debugging begins.

---

## Research & Design

- Explored multiple **UI layouts** for debug output.

- Tested different **LLM prompts** for clarity and simplicity.

- Held discussions on **Debugging best practices for children**.

- Evaluated models and selected **Mistral 7B** for deployment via Sugar AI.

---

## Project Demo
 
Please watch the project demo to see the progress I've made so far.  
[Watch here](https://drive.google.com/file/d/1-FHfsd0YiOZ2Fb7V7HeSswcga89jEvos/view?usp=drive_link)

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
