---
title: "GSoC '25 Week 4 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates"
category: "DEVELOPER NEWS"
date: "2025-06-28"
slug: "2025-06-28-gsoc-25-Elwin-Li-week04"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week4,javaScript editor"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Elwin Li

**Project:** [Advanced JavaScript Editor with MusicBlocks Interactions](https://github.com/sugarlabs/musicblocks/tree/config_driven_conversion/elwin)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-06-21 - 2025-06-28

---

## Goals for This Week

- **Goal:** Complete the debugger project

---

## This Week’s Achievements

**Reworked Status Block for Debugger Tool**

The main goal of this week was to work out difficulties with the status block and status matrix in regards to the debugger tool. There has been many pivots in terms of the UX design, and it is now going in a cleaner direction.

How the debugger tool currently works:
- The user can set debugger statements either through the debugger block itself, or adding breakpoints in the JSeditor and converting to blocks.
- The user can now begin debugging through one of three methods:
  - Run slowly button
  - Run step by step button
  - Clicking on a block itself (e.g. an action block)
- This will run the blocks and pause at the debugger block(s)
- The user can then choose to inspect variables by dragging out a status block
  - The status block will be automatically prepopulated by all the custom variables that are used in the users code
  - The status window will also automatically pop up and show the user their variables

**Small UI fixes**
- I made it so that block highlighting only highlights the current block being executed, for easier code tracing when using run slowly or run by step.
- I made debugger blocks have no effect when using the normal play button, since that's for a finished product, but it will pause execution when ran slowly, by step, or a user manually runs a stack of blocks
- Changed behavior of manually clicking on blocks to run it default to run slowly, as it is for debugging purposes.
- Fixed bug where execution will continue even if you change/delete blocks

---

## Challenges & How I Overcame Them

- **Challenge:** Having a "debug mode" was not a clean solution

  **Solution:** Instead of having a "debug mode", we now distinguish in terms of the play buttons, with the run slowly and run by step buttons being meant for debugging

- **Challenge:** Status block doesn't work as intended, and dragging a status block manually behaves differently from the one triggered by the debugger block. There could also be multiple status blocks at the same time, which messed up the status window.

  **Solution:** Constrained the maximum number of status blocks to one, and updated the logic for all status blocks to automatically include the custom variables in the blocklist.

---

## Key Learnings

- Improved skills in UX design and keeping tools simple for the user
- Deepened understanding of how music blocks execution works
- Deepened understanding of how the blocks are designed and the whole flow of a block
- Improved skills in **debugging**, **code design**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Complete and deploy debugger project
- Add syntax highlighting to JSeditor code

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
