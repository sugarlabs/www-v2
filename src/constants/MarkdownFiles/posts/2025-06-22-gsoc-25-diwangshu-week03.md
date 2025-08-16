---
title: "GSoC ’25 Week 03 Update by Diwangshu Kakoty"
excerpt: "AI with Reasoning Capabilities"
category: "DEVELOPER NEWS"
date: "2025-06-22"
slug: "2025-06-22-gsoc-25-diwangshu-week03"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week03,AI"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-06-15 - 2025-06-21  

---

## Goals for This Week

- **Goal 1:** Implement streaming response by LLM.
- **Goal 2:** Improve context passing for project code.
- **Goal 3:** Experiment and test different Gemini models and their capabilities.
- **Goal 4:** Fix bugs occured by these changes.
- **Goal 5:** Test the multi-agent chat model.

---

## This Week’s Achievements

1. **Implemented streaming response by LLM**  
   - I have implemented streaming responses from the LLM. This allows the model to send partial responses as they are generated, which is particularly useful for long responses. The implementation is straightforward and works well with the current setup.

2. **Improved context passing for project code**  
   - As mentioned in the last report, the retrieved context was not particularly useful when passing project code. 

   - I have improved this by scanning all keywords (like block names) first and passing their information to the LLM. This data is stored in a dictionary, which allows the LLM to understand the block structure and their meanings better.

3. **Experiment and test different Gemini models and their capabilities**  
   - I have experimented with various Gemini models, including `gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-2.0-flash-lite` and `gemini-2.5-flash`. 

   - The most interesting one is `gemini-2.5-flash`, because of its 'thinking' capability. I did not know that Gemini models had this feature. The 'thinking' capability provides quality responses by breaking down complex queries into smaller, manageable parts. This could be very useful for the LLM to understand the project code or any other complex queries.  
   
   - The RPM (Requests per minute) of `gemini-2.5-flash` is 10 and TPM (Tokens per minute) is 250,000. When 'thinking` is enabled a different token is used called 'thinking token'. We can specify the number of thinking tokens to be used or it can be set to auto. Threrefore, the thinking capability should be used for complex queries only, as it consumes more tokens and is slower than the regular response.

---

## Challenges & How I Overcame Them

- **Challenge :** I am trying to implement the 'thinking' capability of the Gemini model, but I am facing some issues with the response format. The model is not returning the expected structured response when 'thinking' is enabled. Their are not many resources on this topic.

  **Solution:** I found that the official Gemini documentation is the best resource for understanding how to implement this feature. I am currently working on it and hope to resolve the issue soon.

---

## Key Learnings

- I have realised one thing for sure, that a developer has to rely on the official documentation of any technology or library they are owrking on. As a student I often tend to look for tutorials or blog posts, but they are not always reliable or up-to-date. The official documentation is the most accurate and comprehensive resource.

---

## Next Week’s Roadmap

- Work on things suggested by mentors. This could include:
  - Improving the multi-agent chat model.
  - Testing the multi-agent chat model with different Gemini models.
- Discuss with mentors about the 'thinking' capability of the Gemini model. On what kind of queries it can be used.
- Implement the 'thinking' capability in the multi-agent chat model.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---