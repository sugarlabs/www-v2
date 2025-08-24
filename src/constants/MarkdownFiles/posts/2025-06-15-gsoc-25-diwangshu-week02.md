---
title: "GSoC ’25 Week 02 Update by Diwangshu Kakoty"
excerpt: "Multi-AI Agent Chat Model"
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "diwangshu-kakoty"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week02,AI"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-06-08 - 2025-06-14  

---

## Goals for This Week

- **Goal 1:** Develop a chat model consisting of multiple AI agents/mentors.
- **Goal 2:** Improve the 'Analysis' generation.
- **Goal 3:** Try and test different embedding models.
- **Goal 4:** Fix bugs occured by these changes.

---

## This Week’s Achievements

1. **AI Mentors**  
   - From the last meeting with my mentor, I received feedback on having specialised AI mentors for areas of expertise, such as music and coding. Hence, I have implemented a way to have conversations with mentors in music, code, and meta.

   - *Music Mentor* : Handles reflection for music learning.

   - *Code Mentor* : Handles programming concepts and debugging reflection. Users can paste their simplified project code for better feedback and guidance.

   - *Meta Facilitator* : Guides general reflective thinking (learning goals, struggles, progress).

2. **Improve Analysis Generation**  
   - As mentioned in the last report, the analysis was inaccurate. I have refined the instructions, and now it functions effectively. It did not take much time.

3. **Tested various Embedding Model**  
   - Embedding models are machine learning models that convert complex data such as text, images, or audio into numerical representations called embeddings. I am using `all-MiniLM-L6-v2`, which is lightweight and fast. Although it is lightweight, it is still quite effective. I have not found better models than this, so I will stick with this model for now. 

---

## Challenges & How I Overcame Them

- **Challenge 1 :** The LLM needs to be invoked with the user query, retrieved context, and message history. Since this project involves multiple AI agents, it is somewhat tricky to decide what kind of memory space to use. Possible ways to store messages:

  i) Shared memory space: Each agent will use one common message history with named tags to differentiate among themselves. This way, the AI agents won't repeat questions.

  ii) Separate memory space: Each agent will have their own space. This way, we can prevent confusion for the LLM. However, the trade-off is space. Additionally, we need to pass these message histories separately for summary generation.

  **Solution:** I first implemented the second option because it is simple and works fine, but the summary generation needs to be done separately for each agent, which I don't think is ideal. Therefore, I have decided to try the first option. I have already started working on it. I need to fix some bugs, and it will be completed by tomorrow (2025-06-16).

- **Challenge 2 :** Retrieved context is irrelevant when the project code is passed. The retriever component returns three chunks arranged in priority. However, a project code can contain many keywords, making the retriever not particularly useful.

  **Solution:** I am considering scanning all the keywords (like block names) first and passing their information to the LLM. This data will be stored in a dictionary. Example:

```python
blocks = {
    "Action": "An Action block contains a sequence of actions that will only be executed when the block is referred to by something else, such as a start block.",
    "Start": "A Start Block is an Action that will automatically be executed once the start button is pressed."
}
```
This way the LLM can understand block structure and their meaning as well.

---

## Key Learnings

- The prototype for this project is developing in Streamlit, and I am learning Streamlit a lot.
- Also gainig experience in LangChain as this is the primary tool of development.

---

## Next Week’s Roadmap

- Work on things suggested by mentors.
- Fix challenge no. 2 as mentioned above.
- Start preparing for the frontend interface.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)


---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---