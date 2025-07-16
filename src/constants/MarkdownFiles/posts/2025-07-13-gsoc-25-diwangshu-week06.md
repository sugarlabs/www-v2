---
title: "GSoC ’25 Week 06 Update by Diwangshu Kakoty"
excerpt: "Reflection Learning Widget in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-gsoc-25-diwangshu-week06"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week06,AI,midterm"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-07-06 - 2025-07-13  

---

## Progress Summary

The first six weeks of GSoC'25 have been highly productive, with several key milestones already accomplished:

- Developed a Retrieval-Augmented Generation (RAG) pipeline.
- Built a fully functional Streamlit application for testing.
- Implemented a multi-agent chat model.
- Experimented with reasoning models and explored their integration.
- Created API endpoints for backend functionality.
- Developed a "reflection" widget in Music Blocks.
- Added save and upload capabilities to the Streamlit app.

## Goals for This Week

- **Goal 1:** Add upload and download of session state in Streamlit app.
- **Goal 2:** Add code conversion function in Streamlit app.
- **Goal 3:** Implement periodic summary generation.
- **Goal 4:** Fix bugs occured by these changes.

---

## This Week’s Achievements

1. **Add upload and download of session state in Streamlit app**  
   - Users can now conveniently save their conversations by downloading them. If they wish to resume at a later time, they can simply upload the saved session to continue where they left off.

   <a href="https://ibb.co/XZB7HJMG"><img src="https://i.ibb.co/zhcXdfDt/image.png" alt="image" border="0"></a>

2. **Add code conversion function in Streamlit app**
   - Users can now copy their Music Blocks project code and paste it into the app. The app then uses a conversion algorithm developed by [Omsuneri](authors/om-santosh-suneri) to generate an equivalent flowchart, which is easier for the LLM to interpret.

   - This flowchart is sent to the reasoning_llm, which produces the algorithm, a summary, and the purpose of the code. These outputs are then utilized by lightweight models.

3. **Implement periodic summary generation**
   - Based on my mentor's suggestion, I am implementing automatic periodic summary generation instead of relying on a manual button. This approach keeps the conversation seamless and allows users to take notes as they go.

   - This feature is still a work in progress.

4. **Fix bugs occured by these changes**
   - This week's work focused primarily on debugging. There were issues with the download button and updating the session state after file uploads. Further details on these challenges will be covered in the next section.

---

## Challenges & How I Overcame Them

- **Challenge :** I encountered challenges in refreshing the session states upon file upload. The expected behavior includes updating the message history, selected mentor, and user interface, but these updates weren't occurring properly.

  **Solution :** Streamlit reruns the entire script each time a button is clicked — a core behavior of the framework. Many of the issues I faced were due to the improper ordering of session state declarations, which I have now resolved. Additionally, I enhanced the download functionality to include more comprehensive information in the saved file, such as the mentor's name, the message history, and the session title.

---

## Key Learnings

- I am becoming more experienced as a Streamlit developer. 

---

## Next Week’s Roadmap

- Implement a widget with functionality to save conversations, session summaries, and analytical insights.
- Finalize the auto-summary generation feature.
- Deploy the FastAPI server on AWS.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)
- **Streamlit App:** [Reflection App](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---