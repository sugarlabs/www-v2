---
title: "GSoC’25 Week 08 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-gsoc-25-omsuneri-week08"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week08,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-07-21 - 2025-07-27

---

## Goal for This Week

**Implement a Music Blocks-compatible UI widget for the AI Debugger with proper session tracking, error handling, and user interaction controls.**

---

## This Week’s Achievements

### Introduction

This week, I focused on integrating a clean and interactive **chat-based UI debugger widget** into the Music Blocks environment. The UI is designed to give learners a smooth experience interacting with the AI assistant while also maintaining session context, error visibility, and chat history.

### What I Did

#### Built a fully functional AI Debugger Widget UI:
- A resizable, centralized widget rendered directly within Music Blocks.
- Uses a flexbox-based layout to separate the **sidebar** and **chat area**.
- Styled consistently with Music Blocks' aesthetics.

#### Added an intelligent Chat Interface:
- Live chat log with user/system/assistant message types.
- Timestamped message bubbles with color-coded roles.
- Smooth scroll and message history tracking.

#### Built Conversation Controls:
- **Reset Conversation**: Starts a new session with a fresh `conversationId`, clears history, and reloads the project context.
- **Clear Chat**: Simply clears the visible chat log while keeping session data intact.

#### Sidebar with Context Info:
- Shows a shortened **conversation ID**.
- Live **message count** display.
- Clearly labeled "Debugger Controls" with contextual buttons.

#### Session Management:
- Each session generates a unique `conversationId` using timestamp and random string logic.
- Message history (`chatHistory`) and prompt count (`promptCount`) tracked across interactions.

---

### Preview

Here’s a quick preview of the widget:

<a href=""><img src="https://i.ibb.co/k6MCM1M6/Screenshot-2025-08-02-at-3-02-23-PM.png" alt="Music Blocks Debugger Widget"></a>

### Why It Matters

An AI debugger UI integrated into Music Blocks allows learners—especially kids and beginners—to:
- Ask natural-language questions about their projects.
- Receive helpful feedback in an intuitive format.
- See error messages and solutions as part of a conversation.
- Restart or reset when they feel stuck.

This brings us a big step closer to making **Music Blocks truly interactive, intelligent, and kids-friendly.**

---

### Final Thoughts

Working on the UI this week was both **technically enriching** and **pedagogically important**. The focus wasn't just styling but thinking deeply about how to build a **debugging experience** that feels responsive, informative, and simple for learners.

---

## Next Week’s Roadmap

- Add streaming response support from the backend (type-as-you-go for AI).
- Improve UI polish, add avatars or icons to message bubbles.
- Begin user testing with kids and teachers.

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)


## Acknowledgments

Grateful as always to my mentors and the Sugar Labs community for their thoughtful feedback, patience, and encouragement as I shape this into a usable tool for learners.

---
