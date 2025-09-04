---
title: "GSoC’25 Final Report by Diwangshu Kakoty"
excerpt: "Reflection Widget for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-09-01"
slug: "2025-09-01-gsoc-25-diwangshu-final-report"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,final-report,AI,Music Blocks,Final Submission"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

## Abstract

Music Blocks is an educational tool that combines coding and music to enhance learning outcomes. To further support this goal, the 'Reflection Widget' was developed.

But first, what is reflective learning? It is a technique in which learners ask themselves questions that encourage them to think critically about their past actions. This requires careful analysis of what actually happened in order to understand the depth of the experience. The AI-powered Reflection Widget provides an accessible way to engage in this process.

At its core, the widget is a chat interface where AI mentors pose reflective questions, and users respond. By answering these questions, learners are encouraged to think more deeply about their experiences.

Users can interact with any mentor at any time. Another key feature of the widget is analysis: the AI mentor generates a detailed report on the user’s learning progress by comparing past reflections with the most recent conversation.

---

## Technical Implementation

### Phase 1: Project Setup

- The first step was deciding which LLM to use, since it forms the core of the chatbot. I initially experimented with Llama-3 running locally, but later switched to Gemini API.  
- I explored various sentence transformers available on HuggingFace. These play a crucial role in building a reliable RAG system. I ultimately chose the `sentence-transformers/all-MiniLM-L6-v2` model because it is both lightweight and accurate.  
- I learned and implemented a basic RAG pipeline. At first, I used ChromaDB as the vector database, but eventually migrated to a Qdrant cluster, a cloud-based vector database.
- The chatbot was hosted on Streamlit to allow mentors to test it.  
- A FastAPI backend was developed with `/chat`, `/summary`, and `/analysis` endpoints.

### Phase 2: Adding Features

**Multi-Agent Chatbot**  
- To make reflection more engaging, three persona-based AI agents were introduced:  
  - **Rohan** – for general reflection practice.  
  - **Alan Kay** – for logical and coding-related reflections.  
  - **Ludwig van Beethoven** – for reflections on musical aspects.  

**Enhanced Context Passing**  
- To better understand the user’s project, the chatbot now leverages the JSON conversion function originally developed for the `AI Debugger`. The resulting flowchart is transformed into an algorithmic summary, which helps the LLM interpret the project’s structure.  
- In addition, the descriptions of the blocks used in the project are also passed to the LLM.  

**Automated Periodic Summaries**  
- Previously, users had to click a separate button to generate summaries. However, based on feedback from Streamlit app testing, the system was updated to generate summaries periodically on its own, improving the overall user experience.  

**Reasoning Model Integration**  
- I experimented with `reasoning models`, which employ a chain-of-thought approach to simulate logical reasoning. This significantly improved the LLM’s ability to understand user projects.  
- As a result, the algorithmic summary is now generated using a reasoning model, while the rest of the conversation is handled by a base model.  

### Phase 3: Fast API Backend

- Initially, FastAPI was not part of the setup. Later, it was upgraded to include new API endpoints such as `/chat` and `/analysis`. Over time, additional endpoints like `/projectcode` and `/updatecode` were also introduced.  

You can learn more about this [here](https://github.com/sugarlabs/musicblocks_reflection_fastapi).  

### Phase 4: Native Widget Integration

- Developed a JavaScript widget and integrated it into the Music Blocks application.  
- Added real-time project analysis that continuously evaluates the user’s project state, produces an algorithmic summary, and initiates reflection with the user.  
- Built a conversational interface with session-aware tracking, allowing seamless dialogue that carries over context from previous exchanges.  
- Implemented `localStorage` support to store analysis reports, which can be reused for generating updated insights.  
- Introduced a **Download as Text** button for easy report export.  
- Added a **Refresh** button to ensure the AI receives the latest code whenever the user makes changes.  

<a href="https://ibb.co/kgVBJkJ9"><img src="https://i.ibb.co/Z6RXStSY/Screenshot-2025-09-04-213236.png" alt="reflection" border="0"></a>

### Phase 5: Deploy to EC2

- The FastAPI server was deployed on an AWS EC2 t3.micro instance running Ubuntu 22.04 LTS. 
- Security groups were configured to allow HTTP, HTTPS, SSH, and FastAPI’s custom port. 
- Since the default storage and memory were limited, the disk was resized and a swap file was created to prevent crashes.
- The project repository was cloned, dependencies installed in a virtual environment, and environment variables configured. - - - Finally, the FastAPI app was set up as a systemd service, allowing it to run in the background, restart on failure, and start automatically on boot.

---

## Data Flow Diagram

<a href="https://ibb.co/LdrV1mp5"><img src="https://i.ibb.co/608jFzsB/final-report.png" alt="client-server" border="0"></a>

---

## Tech Stack and Tools

**Frontend**
- Technologies: HTML, CSS, JavaScript
- Component: Music Blocks widget (chat-based interface)

**Backend**
- Framework: Python FastAPI with Uvicorn server, LangChain
- LLM Services: Google Gemini API
- Sentence-transformers (embedding generation)

**Vector Database**
- Qdrant cluster for semantic search and storage

**Infrastructure**
- AWS EC2 (deployment)
- systemd (service management)

---

## Project Code

- **Backend Code:** [Fast API server](https://github.com/sugarlabs/musicblocks_reflection_fastapi)
- **Frontend Code:** [Reflection Widget](https://github.com/sugarlabs/musicblocks/blob/master/js/widgets/reflection.js)

## Pull Requests 

 - [Music Blocks Reflection Widget (Frontend)](https://github.com/sugarlabs/musicblocks/pull/4747)
 - [Documentation for Developers](https://github.com/sugarlabs/musicblocks/pull/4749)
 - [Documentation for Users](https://github.com/sugarlabs/musicblocks/pull/4753)

## Weekly Blogs

 - [Week 1](https://www.sugarlabs.org/news/developer-news/2025-06-04-gsoc-25-Diwangshu-week01)
 - [Week 2](https://www.sugarlabs.org/news/developer-news/diwangshu-kakoty)
 - [Week 3](https://www.sugarlabs.org/news/developer-news/2025-06-22-gsoc-25-diwangshu-week03)
 - [Week 4](https://www.sugarlabs.org/news/developer-news/2025-06-29-gsoc-25-diwangshu-week04)
 - [Week 5](https://www.sugarlabs.org/news/developer-news/2025-07-06-gsoc-25-diwangshu-week05)
 - [Week 6](https://www.sugarlabs.org/news/developer-news/2025-07-13-gsoc-25-diwangshu-week06)
 - [Week 7](https://www.sugarlabs.org/news/developer-news/2025-07-20-gsoc-25-diwangshu-week07)
 - [Week 8](https://www.sugarlabs.org/news/developer-news/2025-07-30-gsoc-25-diwangshu-week08)
 - [Week 9](https://www.sugarlabs.org/news/developer-news/2025-08-10-gsoc-25-diwangshu-week09)
 - [Week 10](https://www.sugarlabs.org/news/developer-news/2025-08-22-gsoc-25-diwangshu-week10)
 - [Week 11](https://www.sugarlabs.org/news/developer-news/2025-08-29-gsoc-25-diwangshu-week11)
 - [Week 12](https://www.sugarlabs.org/news/developer-news/2025-08-30-gsoc-25-diwangshu-week12)

---

## Key Learnings

### Frameworks and Tools
- Gained hands-on experience with **FastAPI** and **Streamlit**, including building prototypes and integrating frontend widgets with backend services.  
- Learned to work with **LangChain** as the primary development framework.  
- Explored and deepened understanding of **Gemini** and **LangChain** documentation, covering advanced LLM concepts like structured output, function calling, reasoning, and prompting techniques.  

### APIs and Backend Development
- Learned how API endpoints function and how to manage API keys securely during deployment.  
- Improved understanding of structuring API requests and responses for a smoother user experience.   

### Prompt Engineering
- Discovered the importance of refining prompts and using **few-shot prompting** to achieve more accurate and context-aware LLM outputs.  

### Deployment and Infrastructure
- Learned how to deploy an **EC2 instance on AWS**.  

### Learning Approach
- Realized the importance of relying on **official documentation** over tutorials or blog posts, since it provides the most reliable and up-to-date information.  

## Future Development Goals
- Integrate **Sugar-AI** to enhance capabilities in the near future.  
- Add **multi-language support** to enable international educational use.  
- Implement **offline functionality** using small language models for resource-constrained environments.  
- Extend the reflection learning interface to additional Sugar apps like Sugar Journal.

---

## Acknowledgments

This project was carried out under the mentorship of **Walter Bender**, **Sumit Srivastava**, and **Devin Ulibarri** as part of **Google Summer of Code 2025** with **Sugar Labs**. Its successful implementation highlights the collaborative spirit of open-source educational technology and the dedication of the Sugar Labs community to creating accessible learning tools.  

Special thanks to the wider **Music Blocks community** for their valuable feedback during development and testing, and to **Google Summer of Code** for making this contribution to educational technology possible.  

---