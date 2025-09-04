---
title: "DMP ’25 Week 9 Update by Aman Naik"
excerpt: "This week focused on improving the clarity and intuitiveness of the UI, refining UX elements, and aligning LLM integration plans with Sugar AI's upcoming deployment."
category: "DEVELOPER NEWS"
date: "2025-08-02"
slug: "2025-08-02-dmp-25-AmanNaik-week09"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week09,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-07-27 – 2025-08-02  

---

## Goals for This Week

- Display default explanatory text for empty story elements when creating a framework  
- Remove unintuitive UI elements for improved usability  
- Align LLM deployment strategy with the upcoming Sugar AI central inference system  

---

## This Week’s Achievements

1. **Default Text for Empty Story Elements**  
   - Enhanced the "Create Framework" functionality so that unfilled story elements now display a short description explaining their meaning.  
   - Helps guide users, especially students, to better understand what each section represents before filling it in.

   ![Default text for empty story elements](assets/Images/aman-naik-week9-img1.png)

2. **Removed Unintuitive Chat Section Back Button**  
   - The back button in the chat section had unclear functionality and caused confusion.  
   - Removed it entirely, simplifying the chat interface.

3. **Shift in Focus Toward UI/UX Improvements**  
   - Instead of deploying the model directly within the Write Activity, the plan is now to integrate with the upcoming Sugar AI system once deployed.  
   - This ensures a consistent inference backend shared across activities and avoids duplicate deployment work.

---

## Challenges & How I Overcame Them

- **Challenge:** Identifying unintuitive UX elements from a fresh perspective  
  **Solution:** Having been deeply involved in development, I found it challenging to view the interface as a new user would. Regular mentor meetings provided valuable feedback and helped me spot usability issues I had overlooked. This led to changes such as removing the unclear back button and improving guidance within the framework.

---

## Key Learnings

**Importance of Guided Placeholders in UI**  
   - Providing default explanatory text in empty fields helps users understand intended content without external guidance.

**Value of External Perspective in UX Design**  
   - Frequent mentor feedback sessions helped uncover usability issues that were invisible from a developer’s point of view.

**Strategic Planning for LLM Integration**  
   - Decided to align Write Activity’s LLM features with the centralized Sugar AI deployment, ensuring consistency and maintainability.

---

## Next Week’s Roadmap

- Add an advice button to get AI-generated suggestions during the writing of the story.
- Fix a critical UI bug I encountered while testing the sidebar toggle button.

---

## Acknowledgments

Thanks to my mentors for their honest feedback during meetings, which helped me identify and correct unintuitive UI elements.

---
