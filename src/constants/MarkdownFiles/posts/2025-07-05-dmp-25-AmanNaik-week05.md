---
title: "DMP ’25 Week 5 Update by Aman Naik"
excerpt: "This week focused on improving the story framework display UI and attempting to deploy an LLM model on AWS."
category: "DEVELOPER NEWS"
date: "2025-07-05"
slug: "2025-06-05-dmp-25-AmanNaik-week05"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week05,amannaik247"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-06-29 – 2025-07-05  

---

## Goals for This Week

- **Goal 1:** Finalize the UI to display the generated story framework  
- **Goal 2:** Create an API endpoint to host an LLM model on AWS  

---

## This Week’s Achievements

1. **Worked on Story Framework Display UI**  
   - Designed and implemented a widget within Sugar to display the generated story framework.  
   - Although the basic version is functional, it still needs design improvements to make it more engaging and intuitive for children.

   ![Framework dispay: Current version(will be adding more changes)](assets/Images/aman-naik-week5-img1.png)

   ![Chat messages](assets/Images/aman-naik-week5-img2.png)


2. **Attempted AWS LLM Deployment**  
   - Made an initial attempt to deploy an LLM model on AWS.  
   - Faced permission issues during the process, which blocked progress. I plan to resolve this in discussion with mentors and continue deployment next week.

---

## Challenges & How I Overcame Them

- **Challenge:** Creating a child-friendly UI for the framework display  
  **Solution:** Designing a UI that clearly represents story elements while remaining easy to understand for young learners was tricky. Through trial and error, and repeated testing, I managed to connect the output with the UI successfully.

- **Challenge:** AWS deployment blocked by permission issues  
  **Solution:** Will consult with mentors to resolve the issue and resume progress on hosting the LLM next week.

---

## Key Learnings

**Learned the Complexity of Designing Educational UIs**  
   - UI for children must be both simple and informative. Building the framework display taught me how to balance functionality with visual clarity.

**Encountered and Tackled Real-World Deployment Hurdles**  
   - Faced permission-related roadblocks during AWS deployment. This helped me understand the practical challenges of managing cloud-based services.

**Learned the Importance of LLM Selection and Hosting Before Testing Flow**  
   - Since I am working with a Groq API using llama-versatile-70b model for testing. But due to license issues this wont be the final API used for deployment.  
   - Realized that choosing and hosting the right LLM model is critical before properly testing the conversation flow. The AI’s behavior is tightly linked to the model used, making this step a top priority for the coming week.

---

## Next Week’s Roadmap

- Finalize the LLM model and deploy it on AWS  
- Complete and finalize the story framework display UI  

---

## Acknowledgments

Thank you to my mentors and the Sugar Labs community for their continued feedback, guidance, and patience as I work through these technical and design challenges.

---
