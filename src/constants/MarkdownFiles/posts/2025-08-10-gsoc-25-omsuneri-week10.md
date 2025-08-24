---
title: "GSoC’25 Week 10 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-gsoc-25-omsuneri-week10"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week10,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-08-04 - 2025-08-10

---

## Goal for This Week

**Refine the Debugger UI based on community and mentor feedback to ensure consistency with the traditional Music Blocks widget design and improve usability.**

---

## This Week’s Achievements

### Introduction

After introducing the AI-powered debugger widget, I collected detailed feedback from the Sugar Labs community and mentors. The key point that emerged was **UI consistency** the debugger widget's visuals and interactions needed to feel native to the Music Blocks experience. This week, I focused on implementing those design changes and adding a couple of useful features to enhance the user experience for students and educators.

### What I Did

#### Sidebar Replacement

The previous debugger used a wide sidebar for action buttons like *Reset* and *Clear*. I replaced this with a **compact icon bar** placed at the top-left corner of the debugger window—mirroring other native Music Blocks widgets.

Code snippet that shows this change:
```js
this._resetButton = widgetWindow.addButton(
    "reload.svg",
    ICONSIZE,
    _("Reset conversation")
);

this._exportButton = widgetWindow.addButton(
    "export-button.svg",
    ICONSIZE,
    _("Export chat")
);
````

#### Removed Session Info

Session metadata (like conversation IDs) was previously shown in the UI. However, this cluttered the interface without offering meaningful value to users. It has now been **completely removed** from the visual layout.

#### Export Chat Feature

To encourage debugging collaboration between students and mentors, I added an **export chat button**. This allows users to save the entire conversation (with AI) as a `.txt` file. The export includes the music blocks project (in human-readable form) and the complete chat history.

Relevant implementation excerpt:

```js
const blob = new Blob([exportContent], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "music_blocks_chat_" + timestamp + ".txt";
a.click();
```

Use case: A student can now share this file with a mentor or Sugar Labs community to ask, *"Why did the AI suggest this?"* — enabling deeper community engagement and learning.

#### Styling Consistency

* Unified padding, input border styles, and message layout to match the Music Blocks look.
* Implemented hover effects and color schemes that mirror existing widgets.

Example:

```js
this.messageInput.style.borderColor = "#ddd";
this.messageInput.onfocus = function() {
    this.style.borderColor = "#2196F3";
};
```

--- 

### Preview

<a href=""><img src="https://i.ibb.co/YBKkWK6h/Screenshot-2025-08-09-at-1-17-26-AM.png" alt="Music Blocks Debugger Widget"/></a>

Here’s a quick visual overview of the final UI changes:

* 🎛️ Compact icon toolbar instead of side menu
* 💬 Chat log fully scrollable and styled natively
* 📤 Exportable chat with project summary
* 🧊 Minimalist UI without unnecessary technical data

---

### Why It Matters

These UI updates are not just cosmetic—they directly impact:

* **Accessibility**: Students on smaller screens or low-spec devices can now use the debugger more easily.
* **Clarity**: Reducing technical noise (like session info) makes the tool less intimidating.
* **Collaboration**: The chat export feature opens up avenues for guided mentorship and feedback sharing.
* **Consistency**: Aligning with existing widgets builds confidence for younger learners already familiar with Music Blocks.

---

### Final Thoughts

This week’s work made the debugger more polished, focused, and learner-friendly. It’s rewarding to see the debugger evolve into a tool that integrates seamlessly with the Music Blocks platform, visually and functionally. I’m particularly excited to see how the `.txt` chat exports might encourage peer discussions, classroom engagement, and asynchronous mentoring!

---

## Next Week’s Roadmap

**Implement additional user and community feedback and prepare for final evaluations.**

## Resources & References

- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)

## Acknowledgments

Grateful as always to my mentors and the Sugar Labs community for their thoughtful feedback, patience, and encouragement as I shape this into a usable tool for learners.

---
