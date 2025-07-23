---
title: "GSoC’25 Week 07 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-gsoc-25-omsuneri-week07"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week07,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-13 - 2025-07-20

---

## Goal for This Week

**Build the backend API for the AI Debugger and enrich the LLM using Music Blocks lesson plans**

---

## This Week’s Achievements

### Introduction

This week was focused on two critical and foundational systems that expand the functionality, scalability, and intelligence of the debugger:

1. I developed the core **FastAPI backend** (`api.py`) for handling LLM interactions with contextual awareness.
2. I scraped and parsed all **Music Blocks lesson plans** from the MAP FLC site and created **embeddings** for retrieval augmentation.

Together, these components make the AI-powered debugger more conversational, contextually smart, and aligned with the Music Blocks pedagogy.

### What I Did

#### 1. FastAPI Backend for Conversational Debugging

To move beyond a local Streamlit prototype and toward a production-ready debugger, I created a structured backend API using **FastAPI**. The key route is a `POST /analyze` endpoint that handles user input, retrieves context, formats prompts, and returns LLM responses.

**Key Features of the API:**

* **CORS Support**: Enabled via `CORSMiddleware` to allow frontend access from any origin.
* **User Prompt + History**: Accepts user queries, chat history, and the converted Music Blocks code.
* **Dynamic Prompting**: Varies the LLM’s response style based on `prompt_count`, guiding the bot to be playful early and more helpful later.
* **System Personality**: A carefully designed system instruction makes the LLM act like a fun, patient music teacher  using emojis, stories, and simple words.
* **Contextual Awareness**: The input code is parsed from JSON into text (via `convert_music_blocks()`), and semantic context is retrieved from documentation using the `retrieve_relevant_chunks()` method.
* **LLM Integration**: The constructed prompt is sent to Gemini (via `ask_gemini()`), and the response is returned as JSON.

This modular architecture is easy to integrate with Music Blocks UI, scalable across users, and makes the debugger interactive in real-time.

---


#### 2. Embedding Music Blocks Lesson Plans

To make the LLM better at understanding educational goals, I wrote a full scraping pipeline to collect and embed **lesson plans from the [MAPFLC](https://mapflc.com/lesson-plans/) site**.

**What the Script Does:**

* Crawls all `https://mapflc.com/lesson-plans/` URLs using BeautifulSoup.
* Extracts key metadata: title, duration, age range.
* Parses sections such as Objectives, Materials, Steps, and Vocabulary.
* Cleans up and flattens the text into structured JSON.
* Saves all data into a single JSON file: `music_blocks_lessons.json`.

Once the data was collected, I passed the documents through our embedding pipeline to store them as vector chunks. This allows the LLM to retrieve lesson-specific context (e.g., "loop rhythm exercises" or "pitch experiments") when analyzing a project or answering a student’s question.

---

### Why It Matters

Both of these systems expand the AI debugger’s capabilities beyond prototype-level tooling.

#### The Backend API:

* **Decouples frontend from logic** — allowing future deployment on Music Blocks.
* **Improves UX** — conversations can now be smooth, asynchronous, and stateful.
* **Encodes domain-specific tone and guidance** — the bot behaves like a kid-friendly tutor with every response.

#### Lesson Plan Embeddings:

* **Bring pedagogical context into the loop** — aligning AI suggestions with real-world music education.
* **Enable smarter retrieval** — the LLM doesn’t just guess; it recalls relevant activities.
* **Support curriculum-based learning** — ideal for educators using Music Blocks in structured settings.

These tools pave the way for a smarter, kinder, and more helpful AI debugger tailored for kids and teachers.

---

### Final Thoughts

This week marked a turning point in the architecture of the debugger. With a clean, modular backend and embedded educational context, the foundation is now strong enough to scale and personalize the debugging experience.

---

## Next Week’s Roadmap

**Create a Music Blocks Widget and basic integration of the debugger backend with the widget**

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)


## Acknowledgments

Huge thanks to my mentors and the Sugar Labs community for always guiding me to think pedagogically, build modularly, and focus on what helps learners most.

---
