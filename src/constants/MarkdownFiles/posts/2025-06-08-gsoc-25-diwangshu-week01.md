---
title: "GSoC ’25 Week 01 Update by Diwangshu Kakoty"
excerpt: "Deploying a Streamlit app for testing"
category: "DEVELOPER NEWS"
date: "2025-06-04"
slug: "2025-06-04-gsoc-25-Diwangshu-week01"
author: "Diwangshu Kakoty"
description: "GSoC'25 Contributor working on AI Tool for Reflection"
tags: "gsoc25,sugarlabs,week01,AI"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [	Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-06-01 - 2025-06-07  

---

## Goals for This Week

- **Goal 1:** Refine prompt templates and instructions for the LLM.
- **Goal 2:** Host the project on Streamlit Cloud.
- **Goal 3:** Develop Fast API endpoints.
- **Goal 4:** Find an alternative cloud-based vector database.

---

## This Week’s Achievements

1. **Fast API Endpoints**  
   - Although I kept this task later in my proposal but it became necessary when I wanted to deploy the project for testing purposes. The endpoints /chat and /summary are used by the client-side app when having a conversation with the user. It is working perfectly in my local development environment, but it caused an issue when I tried to host the Fast API server on [Render](https://render.com/). After several trials, I found that the embedding model I am using - 'all-MiniLM-L6-v2' is a bit heavy, and the RAM usage given by the free service is not enough.
   But anyway, this is a success as we will need Fast API during the final deployment.


2. **Cloud based vector database - Qdrant**  
   - For development, I have been using ChromaDB, which is pretty good for testing and developing RAG applications locally. I have now opted to use Qdrant, which provides cloud-based vector database. It is working well with the Streamlit app.
   - [Qdrant](https://qdrant.tech/documentation/)

3. **Hosted Streamlit App**  
   - Because the Fast API server was not deployed, I simply wrote the RAG code in the Streamlit code itself. Now that it is hosted, mentors and contributors can test it and give feedback.
   - [Streamlit app](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)

4. **Refined Prompts**
   - Prompt Engineering is the key to get a well structured and quality response from any LLM. I improved the instructions for the LLM to ask follow up questions to get quality answers from users.

---

## Challenges & How I Overcame Them

- **Challenge:** Fast API deployment fails.  
  **Solution:** The overall goal was to deploy the project so that mentors can test it and give me feedback for the summer period. Therefore, I modified the streamlit code to handle the RAG application by itself. Hence, I tackled the problem by avoiding server deployment.

---

## Key Learnings

- I learned new technologies: Fast API and Streamlit. I watched tutorials on YouTube and read their documentations as well. 
- Learned how API endpoints work and how to manage API keys while deploying it.

---

## Next Week’s Roadmap

- Work on things suggested by mentors.
- Improve the analysis phase. This phase of the reflection learning cycle is suppose to compare and contrast user development over a period of time. Currently it uses a hardcoded summary but it needs to be dynamic.
- Write documentation for Music Blocks. Some topics still needs to get covered.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [@Commanderk3](https://github.com/Commanderk3)
- Gmail: [diwangshukakoty@gmail.com](mailto:diwangshukakoty@gmail.com)
- LinkedIn: [Diwangshu Kakoty](https://www.linkedin.com/in/diwangshu-kakoty/)
- Twitter: [@redCoder101](https://twitter.com/redCoder101)

---
