---
title: "GSoC’25 Week 05 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-gsoc-25-omsuneri-week05"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week05,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-29 - 2025-07-05

---

## Goal for This Week

**Migrating Music Blocks JSON-to-Text Converter to Streamlit App**

---

## This Week’s Achievements

### Introduction

This week, I focused on one of the key deliverables of the project — **integrating the JSON-to-Text Representation Converter into a Streamlit application**. This marks a major step in our plan to create a seamless debugging experience for Music Blocks users. The converter, which was originally built using JavaScript, is now fully functional in Python via Streamlit and ready for integration with the AI-powered debugger.

### What I Did

#### Goal

The previous tool was a **client-side JavaScript converter** that parsed JSON representations of Music Blocks projects and produced a structured, readable **tree-view text format**. The aim this week was to **translate this logic into Python** and build a **Streamlit interface** to make the tool backend-friendly and easily integrable with the AI Debugger app.

#### Migration from JavaScript to Python

Converting the JavaScript-based logic to Python wasn’t a simple one-to-one translation. It involved rethinking data structures, managing recursion differently, and carefully ensuring that **each Music Blocks "block" type was accurately represented** in the output.

Key technical components of the migration included:

* **Parsing the block structure**:

  * Each block in the JSON is structured like `[block_id, block_type, ..., connections]`
  * The Python version uses dictionaries (`block_map`) and recursion to follow nested or sequential connections (`clamp` and `stack` logic).

* **Handling specific block types**:

  * Each block type (like `start`, `setmasterbpm2`, `newnote`, `repeat`, etc.) has a distinct logic for representation.
  * For example, the `setmasterbpm2` block may include a divider block to represent beat values (like `4/4 = 1.00`), which must be parsed recursively.

* **Redacting base64-encoded content**:

  * Just like in the JS version, the Python converter checks for base64 strings (e.g., audio/image data) and replaces them with `"data"` to keep the output clean and safe.

* **Maintaining tree formatting**:

  * I replicated the `├──` and `│` styled tree structure for visual clarity.
  * Indentation is handled dynamically based on the depth of recursion.

#### Enhancements Added

While rewriting, I also took the opportunity to **extend the support to more block types** that weren’t handled earlier — for example:

* `arc`
* `incrementOne`
* `pitch`
* `text`
* `settransposition`

This ensures that even **newer or more complex Music Blocks projects** are parsed correctly and comprehensively.

#### The Streamlit App

Once the backend logic was ready, I integrated it with a user-friendly Streamlit interface. The app consists of:

* A **text area** for JSON input.
* A **convert button** to trigger the parsing.
* A cleanly formatted **output section** with scrollable, monospaced text.
* Error handling for invalid or empty JSON.

---

### Why It Matters

Music Blocks is used in educational environments. One of the biggest challenges new users face is **understanding how blocks connect and function** under the hood. By converting the visual block code into a readable text format, this tool:

* Makes debugging more accessible for students.
* Helps educators explain project logic in class.
* Provides an exportable, printable format of block logic.

#### Foundational Component for the Debugger

This converter will play a **crucial role** in the **AI-powered Music Blocks Debugger**. By giving a structured, simplified text representation of the project:

* The LLM (Large Language Model) will better understand the project logic.
* It enables **embedding**, **chunk retrieval**, and **semantic search** for debugging.
* Users will be able to see both their visual project and a clean text summary on the same platform.

#### Seamless Integration Ahead

Now that the converter is in Streamlit (and Python), integrating it into the AI Debugger system becomes straightforward:

* No need to mix JavaScript and Python — the backend stays unified.
* Users can input JSON and debug in the **same interface**.
* It aligns with the vector database and LLM pipeline we’re building.

### 📸 Preview

Here’s a quick preview of the app:

<a href=""><img src="https://i.ibb.co/XZt6MF9k/Screenshot-2025-07-05-at-3-09-15-PM.png" alt="Convertor Streamlit interface"></a>


### Final Thoughts

Rewriting an entire logic-heavy JavaScript app into Python was both challenging and rewarding. It made me deeply understand how each block works in Music Blocks and how a simple but well-structured parser can bring clarity to even the most complex visual projects.

--- 

## Next Week’s Roadmap

* Integrate the Streamlit-based converter directly into the AI Debugger interface.
* Improve the understanding of actions in the project by enhancing the LLM prompts.

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)


## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
