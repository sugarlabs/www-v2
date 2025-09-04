---
title: "DMP ’25 Week 11 Update by Aman Naik"
excerpt: "This week focused on restructuring the advice feature for persistent visibility within the sidebar and refining the UX to better support students’ writing flow."
category: "DEVELOPER NEWS"
date: "2025-08-16"
slug: "2025-07-16-dmp-25-AmanNaik-week11"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week11,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-08-10 – 2025-08-16  

---

## Goals for This Week

- Move the advice section into the sidebar for persistent visibility  
- Add a button to toggle the advice section within the sidebar  

---

## This Week’s Achievements

1. **Integrated Advice Section into Sidebar**  
   - Previously, the “Get Advice” button lived in the toolbar and printed feedback in the console, which was not accessible or user-friendly.  
   - I redesigned the interaction so that advice now appears inside the sidebar alongside the framework view.  
   - This allows students to keep advice visible while continuing to build their story, instead of losing it after an action or context switch.  

   ![Advice section toggled on](assets/Images/aman-naik-week11-img1.webp)

2. **Toggle Button for Advice Section**  
   - Added a dedicated toggle button within the sidebar to control the visibility of the advice section.  
   - Students can now choose between focusing only on the story framework or expanding the sidebar to see both the framework and advice in parallel.  
   - The sidebar structure now uses `Gtk.Stack` to handle multiple subviews cleanly, preventing layout conflicts and allowing for flexible switching between sections.  

   ![Advice section not toggled on](assets/Images/aman-naik-week11-img2.webp)

---

## Challenges & How I Overcame Them

- **Challenge:** Persistent visibility for advice section  
  **Problem:** In the old design, advice appeared below the toolbar button but disappeared when clicking anywhere else, meaning the student could not revisit it.  
  **Solution:** Created a dedicated advice section inside the sidebar and added a toggle button to control its display. This ensured persistence and improved discoverability without cluttering the workspace.  

- **Challenge:** Iterating UX without upfront testing  
  **Problem:** The initial design underestimated the importance of persistent context. Students often need to revisit advice multiple times while writing.  
  **Solution:** Midway through implementation, I restructured the UI to reflect actual student needs, demonstrating the importance of adaptive design based on iterative testing and mentor feedback.  

---

## Key Learnings

- Learned how to use `Gtk.Stack` effectively to manage multiple sidebar views (chat, framework, advice) while maintaining a clean state transition.  
- Understood the importance of persistent UI components in educational tools, where students benefit from continuous access to feedback and guidance.  
- Realized that UX design often requires mid-development revisions and that structured mentor feedback helps identify overlooked usability issues.  

---

## Next Week’s Roadmap

- Implement saving of chat history into the Sugar Journal for persistence across sessions  
- Begin integrating Sugar AI as the inference backend, replacing the temporary Groq API placeholder  

---

## Acknowledgments

Thanks to my mentors for guiding me through iterative design discussions and encouraging me to prioritize the student’s perspective in UI/UX decisions.  

---
