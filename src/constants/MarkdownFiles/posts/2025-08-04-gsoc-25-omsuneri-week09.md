---
title: "GSoC’25 Week 09 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-04"
slug: "2025-08-04-gsoc-25-omsuneri-week09"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week09,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-07-28 - 2025-08-03

---

## Goal for This Week

The primary goal for this Week was to **embed the AI-powered Debugger directly into the Music Blocks UI** so that users, especially kids, could debug their projects *without leaving the app*. This meant replacing the previously external Streamlit interface with a fully functional, session-aware UI widget inside the Music Blocks canvas, connected to the FastAPI backend.

---

## This Week’s Achievements

### Introduction

Until now, users had to export their Music Blocks project and visit an external site to use the AI Debugger. This week marks a key turning point: **the debugger is now available as a draggable widget inside the Music Blocks interface**. With a fully integrated chat UI, live connection to the backend, and context-rich messaging, the experience has become smoother and more educational.

This change not only improves usability but also opens the door for better debugging workflows, especially for children and educators.

### What I Did

Here’s a breakdown of what was implemented and how:

#### 1. **Custom Music Blocks Widget**

* Developed a new **UI widget** inside Music Blocks.
* The widget supports a **session-aware chat interface**: users can ask the AI for help, and the assistant retains context across messages.
* Integrated controls like:

  * Reset conversation
  * Download session history
  * Minimize/maximize
  * Re-analyze current code

#### 2. **Connected to FastAPI Backend**

* The widget sends the current project’s JSON representation to the FastAPI backend.
* Backend runs a custom module (`convert_music_blocks`) that:

  * Extracts block types, structure, and key events from the Music Blocks JSON.
  * Converts that into a **natural-language program summary**.
* Context (code + prompt history) is passed to Gemini via a modular prompt manager.
* Gemini responds in a **teacher-like tone** based on prompt count:

  * First prompt: Friendly, curious, Socratic
  * Later prompts: More directive and explicit

#### 3. **Conversation Session Management**

* Sessions are now **stateless in the frontend but tracked via conversation ID**.
* Every prompt includes metadata:

  * `prompt_number`
  * `history` (with speaker names and timestamps)
  * System prompt fingerprint
* This ensures that users get progressive help and avoids repeated suggestions.

#### 4. **CORS + JSON Fixes + Robust API Calls**

* Added full CORS support for local and production deployment.
* Built fallback messages and UI alerts for:

  * Invalid JSON export
  * Backend timeout
  * Gemini failure

--- 

### Preview

<a href=""><img src="https://i.ibb.co/VYhCQzjL/Screenshot-2025-07-29-at-9-45-19-PM.png" alt="Music Blocks Debugger"/></a>

Here’s what the new AI Debugger UI inside Music Blocks includes:

* A draggable debugger block in the block palette
* Chat interface with:

  * Conversation bubbles
  * Reset options
* One-click analysis of current project (auto-export + backend call)
* System prompt: Designed for kids, friendly, and context-aware

Here’s a sample flow:

1. User opens the AI Debugger widget.
2. The debugger auto-loads current project code.
3. Debugger types out a friendly greeting and a first view of the project.
4. User types: “Why is the melody not playing after this repeat block?”
5. Gemini (via FastAPI) responds: “It seems you’ve placed the melody inside a block that never runs. Try moving it outside the repeat loop.”

And it all happens **without leaving Music Blocks**.

---

### Why It Matters

This integration transforms the debugging experience:

* **No context switching** → learners stay inside Music Blocks.
* **Seamless feedback loop** → real-time guidance as they build music.
* **Age-appropriate design** → kids get hints, not just fixes.
* **Educator-friendly** → can be used in classrooms without external tools.

From an architectural point of view:

* The modular backend and frontend now follow a **clean interface contract** (`/analyze` API).
* The design is future-proof — e.g., can support multiple LLMs, save sessions to the cloud, or run offline with local models.

---

### Final Thoughts

This week’s milestone is a big leap towards **making Music Blocks truly AI-augmented**. Embedding the debugger inside the platform not only enhances the UX but also lays the groundwork for advanced features like Intelligent code suggestions.

As a developer, this week helped me deeply understand:

* How to write modular UI widgets in Music Blocks
* How to structure backend APIs for interactive apps
* How to balance UX for kids with technical depth in LLM prompts

---

## Next Week’s Roadmap

**Refining the debugger widget based on feedback from the community and mentors, and deploying the backend for seamless integration.**

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)


## Acknowledgments

Grateful as always to my mentors and the Sugar Labs community for their thoughtful feedback, patience, and encouragement as I shape this into a usable tool for learners.

---
