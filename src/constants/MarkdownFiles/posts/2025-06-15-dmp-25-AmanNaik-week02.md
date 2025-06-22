---
title: "DMP ’25 Week 2 Update by Aman Naik"
excerpt: "This week's focus was on creating a story builder feature in such a way that it engages creativity of the children."
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "2025-06-15-dmp-25-AmanNaik-week02"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week01,amannaik247"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-06-09 – 2025-06-15  

---

## Goals for This Week

- **Goal 1:** Design a story builder feature to help children write stories  
- **Goal 2:** Explore ways to integrate AI into the feature  
- **Goal 3:** Document the architecture and workflow  
- **Goal 4:** Focus on developing creative features that support learning  

---

## This Week’s Achievements

1. **Explored Engaging Approaches to Story Writing**  
   - Through guidance from mentors in biweekly and one-on-one meetings, I explored effective ways to encourage children to write creatively. This included analyzing architecture ideas that support active participation in storytelling.

2. **Finalized the Architecture for the Story Builder Feature**  
   - After research and discussions, I finalized an architecture that aids students in story writing while ensuring that the AI guides rather than writes the story for them.

   ![Question-Answer workflow](assets/Images/aman_naik_week2_img1.png)

   ![Create a framework using the context gained from the Q&A](assets/Images/aman_naik_week2_img2.png)

3. **Created Documentation for Future Reference**  
   - I’ve documented the feature's flow and design so it can be referred to later. [Link](https://docs.google.com/document/d/14V_FreatUU-gGgiHRdlvNDUXUgmBTWIeFyDaap38RnA/edit?usp=sharing)

---

## Challenges & How I Overcame Them

- **Challenge:** The grammar correction feature was too strict for learning environments.  
  **Solution:** Since the goal is to foster creativity, I decided to shift focus from strict grammar correction to more engaging, story-focused features. Grammar support can be introduced later as an enhancement.

- **Challenge:** Stories don’t always follow a fixed pattern (e.g., not every story has a villain).  
  **Solution:** I designed the AI to categorize responses into typical story elements automatically. This adaptive framework allows story parts like “villain” or “sidekick” to remain optional and dynamically appear based on user input.

- **Challenge:** Prevent the AI from writing the story directly.  
  **Solution:** Due to the resource constraints of Sugar’s environment, I couldn’t run large models locally. I used Hugging Face Spaces to host the models externally and used their APIs inside Sugar for lightweight testing. This also helped keep the feature lightweight and modular.

---

## Key Learnings

**Developed Engaging Pedagogical Strategies for Story Writing**  
   - Mentors helped me explore interactive ways to encourage children’s creativity, shifting from passive AI responses to more guided interactions.

**Designed and Finalized a Guided AI Architecture**  
   - I developed a modular design that prompts students to build stories step by step, ensuring they stay involved and learn narrative structure.

**Learned Effective Student-AI Interaction Techniques**  
   - I realized that giving the AI a playful personality that gently prompts students can make the writing process more enjoyable and educational.

---

## Next Week’s Roadmap

- Begin coding the designed architecture  
- Develop a basic Streamlit application to test the feature outside Sugar  
- Work on feedback provided by mentors  

---

## References

Here’s an insightful video shared by Walter Bender:  
[CBS: The Thinking Machine (MIT Film, 1961)](https://www.youtube.com/watch?v=HCl19WKrfeg)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for their continued support and encouragement!

---
