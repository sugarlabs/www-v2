---
title: "DMP ’25 Week 04 Update by Harshit Verma"
excerpt: "Developed a working prototype."
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-dmp-25-therealharshit-week04"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week04,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-23 - 2025-06-29   

---

## Goals for This Week

- **Goal 1:** Design a UI mockup for the debugging terminal.
- **Goal 2:** Develop the debugging terminal in Pippy.
- **Goal 3:** Connected the debugger llm server with Pippy.
- **Goal 4:** Feed LLM responses into the debugging terminal.

---

## This Week’s Achievements

1. **Design a UI mockup for the debugging terminal**  
   - Plan the layout and user experience for how debug tips should appear inside Pippy.
   - Design the UI of the debugging terminal, prioritized clarity and accessibility, especially for childrens.

2. **Develop the debugging terminal in Pippy**  
   - Added a new vte terminal component to Pippy using GTK.
   - Integrated the terminal into the existing layout with proper toggling between output and debug views.
   ![Pippy UI: Output Terminal](assets/Images/pippy_output-terminal.png)
   ![Pippy UI: Debug Terminal](assets/Images/pippy_debug-terminal.png)

3. **Connected the debugger llm server with Pippy**  
   - Wired up Pippy to make API calls to the FastAPI server.
   - Verified complete flow: `code is extracted → sent to /debug → response displayed in the debug terminal`.

4. **Feed LLM responses into the debugging terminal**  
  - Successfully passed LLM-generated debug suggestions into the terminal.
  - Added simple formatting: newline, spacing, removed markdown syntax elements.

---

### Complete Demo: &nbsp; [Watch here](https://drive.google.com/file/d/1Dzomam9dc3U4tHjHhYFGjRbs7-cwJHmM/view?usp=drive_link)

---

## Challenges & How I Overcame Them

- **Challenge:** GTK app crashing on API call.  
  **Solution:** The crash was due to API response handling on the main GTK thread. I fixed it by offloading the network request to a separate thread using Python’s `threading` module and updating the UI safely with `GLib.idle_add()` to avoid blocking or GTK context violations.

- **Challenge:** Rendering formatted output inside the terminal widget.  
  **Solution:** GTK doesn’t support Markdown, so I simulated structure using spacing, and removed marksown syntax elements to enhance readability.

---

## Key Learnings

- Gained hands-on experience with Python threading to perform non-blocking API calls and prevent UI freezes or crashes.
- Learned how to work with GTK widgets and using CSS in GTK, especially Gtk.Stack, Gtk.Box, and vte terminal building responsive interfaces.

---

## Next Week’s Roadmap

- Format the llm response to be more child friendly.
- Develop a custom mardown parser for GTK.
- Begin working on model selection logic and performance optimization.

---

## Resources & References

**Repository**
- [Pippy](https://github.com/therealharshit/Pippy/tree/DMP2025/Pippy-Debugger) : I have pushed my code for Pippy here.
- [pippy-debugger-server](https://github.com/therealharshit/pippy-debugger-server) : The FastAPI server which I am using as of now.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---
