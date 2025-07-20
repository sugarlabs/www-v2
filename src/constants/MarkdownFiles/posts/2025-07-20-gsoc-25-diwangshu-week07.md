---
title: "GSoC ’25 Week 07 Update by Diwangshu Kakoty"
excerpt: "Reflection Learning Widget in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-gsoc-25-diwangshu-week07"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week06,AI"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-07-14 - 2025-07-19  

---

## Goals for This Week

- **Goal 1:** Implement periodic summary generation.
- **Goal 2:** Upgrading the 'reflection' widget.
- **Goal 3:** Fix bugs occured by these changes.

---

## This Week’s Achievements

1. **Implement periodic summary generation**  
   - As mentioned in the previous blog, I’ve now implemented periodic summary generation. Currently, it uses a straightforward prompt that requests a summary after every five bot messages. While this is a simple and somewhat detailed approach, it’s still basic and may not consistently produce accurate results. I’m in the process of testing it. 
   
   - If it proves unreliable, I’ll switch to invoking the LLM with a dedicated prompt template after every five bot messages. This will ensure a structured and consistent summary each time.

2. **Upgrading the 'reflection' widget**

   - The widget now allows users to interact with all available AI mentors directly within the interface. When a user initiates a conversation, their project code is automatically sent to the server, enabling mentors to provide more context-aware guidance and feedback. For this I developed a '/code' endpoint. This is the flow:

        - Music Blocks sends the project code to the server as a POST request in JSON format.

        - The server processes this data by running a conversion module and then calls the reasoning LLM to generate the corresponding algorithm.

        - It then responds with both the flowchart and the algorithm.

        - The client is responsible for storing this information and including it in requests sent to the /chat endpoint.


   - I have also enhanced the save functionality. Users can now choose to save their entire conversation history at any point. In addition, the system automatically stores generated summaries and analytical insights, ensuring that important information and progress are preserved for future reference.

---

## Challenges & How I Overcame Them

- **Challenge :** I faced a minor challenge while implementing the periodic summary. My approach is to start simple and build up as needed, so I initially relied on prompting. However, the LLM wasn’t following the instruction. After some brainstorming, I realized that other instructions like 'Limit your response to 30 words' might have been conflicting with it 

  **Solution :** I modified the conflicting prompts and experimented with few-shot prompting, which resolved the issue.
---

## Key Learnings

- Adjusting or refining conflicting prompts, combined with the use of few-shot prompting, can significantly improve an LLM’s output. This highlights the importance of prompt engineering in guiding model behavior and achieving desired results.
---

## Next Week’s Roadmap

- I need to finish building the widget to store user data, such as messages, summaries, and analysis reports using IndexedDB.
- Once that’s completed, I’ll move on to the 'analysis generation' phase.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)
- **Streamlit App:** [Reflection App](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---