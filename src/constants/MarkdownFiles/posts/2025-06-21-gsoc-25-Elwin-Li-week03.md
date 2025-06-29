---
title: "GSoC '25 Week 3 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates"
category: "DEVELOPER NEWS"
date: "2025-06-21"
slug: "2025-06-21-gsoc-25-Elwin-Li-week03"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week3,javaScript editor"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Elwin Li

**Project:** [Advanced JavaScript Editor with MusicBlocks Interactions](https://github.com/sugarlabs/musicblocks/tree/config_driven_conversion/elwin)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-06-14 - 2025-06-21

---

## Goals for This Week

- **Goal:** Start on debugger for musicblocks and JS editor.

---

## This Week’s Achievements

**Made Working Debugger**

This week, I made a working debugger tool for Music Blocks JS editor. I added a button in the JS editor that is a toggle for the debug mode. On debug mode, users are able to add a breakpoint in any line of the code using buttons on the side of the line numbers. When the user then converts the code back to blocks, there are new debugger statement blocks that shows up.

Then, when the user runs their code, execution will be paused at every debugger statement, and a status block with all the user defined and musicblocks defined variables up till that point will appear, showing the user those values, making it easy to debug. The user can then choose which variables they want to keep, and continue execution. This tool works perfectly with the run slowly and run step by step buttons, in order for more careful debugging.

Also, I made block highlights contrast much more from original block colors, for easier tracking of which block is being executed.

[youtube: jEJuXpyQbS8]

---

## Challenges & How I Overcame Them

- **Challenge:** Status blocks default to a set macro of variables

  **Solution:** Was able to go through the blocklist and single out needed variables to put in the status block instead

---

## Key Learnings

- Deepened understanding of how music blocks execution works
- Improved skills in **debugging**, **code design**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Finish debugger project (fix bugs)
- Add syntax highlighting to JSeditor code

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
