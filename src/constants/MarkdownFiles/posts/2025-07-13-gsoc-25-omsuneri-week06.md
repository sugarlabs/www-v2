---
title: "GSoC’25 Week 06 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-gsoc-25-omsuneri-week06"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week06,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-07-06 - 2025-07-12

---

## Goal for This Week

**Build a tightly integrated debugging experience by embedding the JSON-to-Text converter into the main debugger Streamlit app and enabling users to export complete chat logs with the AI assistant**

---

## This Week’s Achievements

### Introduction

This week’s focus was two-fold:

1. **Merge and integrate** the Music Blocks JSON-to-Text converter directly into the existing Streamlit-based debugger UI.
2. **Enhance user experience** by introducing a "Chat Export" feature that allows users to download their complete AI-debugger conversation history in `.txt` format.

These updates mark a major usability milestone and make the debugging experience smoother and more developer-friendly.

### What I Did

#### 1. Embedded JSON-to-Text Converter in the Debugger Workflow

Previously, users had to first convert their Music Blocks JSON into readable text using a separate converter app and then copy that result into the debugger interface. This extra step caused friction in the user flow.

Now, I’ve **fully integrated the `convert_music_blocks()` function** (from our `json_parser.py` module) directly into the debugger pipeline. Here’s how it works:

* A user pastes raw Music Blocks JSON code into a text area inside the main debugger app.
* Upon clicking **"🚀 Launch My Music Blocks Project!"**, the code is parsed using `json.loads()` and fed into the `convert_music_blocks()` function.
* This recursive function translates the block structure into a clean, readable text representation using a tree-like format (`├──`, `│`, etc.), supporting clamp/stack logic and deeply nested project structures.
* The converted code is **stored in `st.session_state.project_code`** and becomes the foundational context for the entire debugging session.

**Key Enhancements**:

* Handles more block types like `arc`, `incrementOne`, `pitch`, and `settransposition`.
* Automatically redacts base64-encoded data like audio/image blobs by replacing them with `"data"` in output.
* Maintains formatting consistency to assist LLM comprehension and improve semantic chunk retrieval.

---

#### 2. Chat Export Functionality

To support documentation, sharing, and revisiting past sessions, I implemented a **chat export button**. The feature is context-aware and only appears when the user has interacted with the debugger.

**Implementation Details**:

* On each AI-user interaction, chat messages are appended to `st.session_state.chat_history` as a list of message dictionaries (`{"role": ..., "content": ...}`).
* The `generate_chat_export()` function:

  * Adds a timestamp using Python’s `datetime.now()`.
  * Includes both the original converted project code and the full chat history.
  * Formats everything into plain text.
* The Streamlit `st.download_button()` is used to render the export option, generating a downloadable `.txt` file named like `music_blocks_chat_20250711_143512.txt`.

This makes the tool much more practical for teachers or learners who want to **archive** AI insights, share results, or continue the session later.

---

### Why These Features Matter

**Improved UX**:
With the converter now inside the debugger, users no longer need to juggle multiple tools. They can paste once, click once, and begin debugging immediately.

**Smarter Debugging**:
The LLM uses the converted project code + relevant chunks from Music Blocks documentation (via `retrieve_relevant_chunks()`) to generate highly contextual, beginner-friendly replies.

**Educational Value**:
Students and educators can **save their interactions**, review solutions offline, or submit chat logs for peer or mentor feedback.

---

### 📸 Preview Features

<a href=""><img src="https://i.ibb.co/FbHymBYN/Screenshot-2025-07-11-at-2-16-30-PM.png" alt="Music Blocks Debugger"></a>

* 🔁 One-click conversion of Music Blocks JSON to structured text.
* 💬 Chat-driven debugging using Music Blocks Bot + documentation chunks.
* 💾 "Export Chat" button for persistent chat history.
* 🧽 "Clear Chat" button to reset sessions easily.

---

### Final Thoughts

This week involved deep integration between previously decoupled components of the app. Bridging the JSON converter and the debugger not only streamlines the UX but also unlocks better prompt generation for the LLM.

From a technical standpoint, handling state persistence, error boundaries, and contextual prompt generation offered many learning opportunities. I’m also seeing the value of modular code (`convert_music_blocks`, `retrieve_relevant_chunks`, etc.) in accelerating such integrations.

---

### Next Week’s Roadmap

* Deploy the debugger application to the official Sugar Labs AWS server
* Create a Music Blocks Debugger widget for seamless in-platform integration.

---

## Resources & References

- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)

---

### Acknowledgments

Thanks to my mentors Walter Bender for the consistent feedback and support, and to Devin Ulibarri for assisting with insights into Music Blocks educational usage. The Sugar Labs community continue to be an invaluable support system.

---
