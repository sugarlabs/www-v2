---
title: "GSoC ’25 Week 05 Update by Diwangshu Kakoty"
excerpt: "Reflection Learning Widget in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-gsoc-25-diwangshu-week05"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week05,AI"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-06-29 - 2025-07-05  

---

## Goals for This Week

- **Goal 1:** Develop a 'reflection' widget in Music Blocks.
- **Goal 2:** Update Fast API server code.
- **Goal 3:** Fix bugs occured by these changes.

---

## This Week’s Achievements

1. **Develop a 'reflection' widget in Music Blocks**  
   - For this week, I have finally got the green light to work on the frontend of the project. I have started developing a 'reflection' widget in Music Blocks and it is almost comleted. It can be found in the Widget section.

   - The conversation history is stored in the client side. For every query, the widget sends a request to the FastAPI server with payloads like `query`, `messages` and `mentor`. The server then processes the request and returns a response. The response is then displayed in the widget.

  <a href="https://ibb.co/NdLhh6DX"><img src="https://i.ibb.co/21j227Vw/first-Reflection.webp" alt="first-Reflection" border="0"></a>

2. **Update Fast API server code**  
   - As mentioned in my first week's report that I made the Fast API endpoints `/chat` and `/summary`, I have now updated the code to handle the new 'reflection' widget. 

   - The `/chat` endpoint now expects a payload with `query`, `messages`, and `mentor`.

   - The messages include only the conversation history between the user and the AI, excluding the system message. This is because each mentor has a unique system message, which is dynamically set by the server based on the mentor field in the payload. So, we can say that the client-side is not storing any kind of prompts or system message.

---

## Challenges & How I Overcame Them

- **Challenge 01:** I found difficulties in integrating the 'reflection' widget with the FastAPI server. The widget was not handling the response correctly.

  **Solution:** Although I was familiar with async/await and promises in JavaScript, I lacked sufficient hands-on experience. To ensure the widget properly awaited the server response before updating the UI, I revisited these concepts. I also implemented error handling to address any potential issues during API calls.

- **Challenge 02:** The widget was not initializing the messages after re-opening it.

  **Solution:** This was a simple bug where I forgot to initialize the messages array in the widget's state. I fixed it by ensuring that the messages array is initialized when the widget is opened.
---

## Key Learnings

- I gained hands-on experience with integrating a frontend widget with a backend server using FastAPI.
- I learned how to handle asynchronous operations in JavaScript, which is crucial for building responsive web applications.
- I improved my understanding of how to structure API requests and responses for a better user experience.

---

## Next Week’s Roadmap

- From the last meeting with my mentors, I have learned that saving a reflection session is very necessary. It will allow users to revisit their reflections later and also helps a lot in testing. Therefore, I will be implementing saving and loading reflection sessions in the Streamlit app. Infact, I have already made a download button that downloads a JSON file containing the conversation history.

- I was also informed that the AI is asking too many follow-up questions, which is not ideal. I will be working on refining the prompts to reduce unnecessary follow-ups and give it a more natural conversation flow.

- Implement other features like 'generate summary' and 'generate analysis' in the widget. 

- Store the conversation summaries in user's browser using localStorage, so that the user can revisit their reflections later. This will also help in testing the 'analysis' phase of the reflection learning cycle.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)
- **Streamlit App:** [Reflection App](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---