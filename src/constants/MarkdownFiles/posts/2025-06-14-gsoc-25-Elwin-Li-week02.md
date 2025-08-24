---
title: "GSoC '25 Week 2 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates"
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-Elwin-Li-week02"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,week2,javaScript editor"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Elwin Li

**Project:** [Advanced JavaScript Editor with MusicBlocks Interactions](https://github.com/sugarlabs/musicblocks/tree/config_driven_conversion/elwin)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-06-07 - 2025-06-14

---

## Goals for This Week

- **Goal:** Complete and deploy code to blocks functionality with full documentation and begin work on debugger.

---

## This Week’s Achievements

**Added All Blocks for Code to Blocks Support**  

I added all blocks that are supported for block to code conversion to be supported for code to blocks conversion. I also added all necessary unit tests, and very [detailed documentation](https://github.com/sugarlabs/musicblocks/blob/master/js/js-export/CONVERSION_GUIDE.md) on how to add new blocks for support.

**Optimized Files**

I added a script to minify the JSON config so that musicblocks doesn't need to load the entire large file. I also merged many blocks that have the same path in the AST so that the config looks cleaner, and adding new blocks of the same path is even easier.

**Deployed Project**

The code to blocks project has been complete and deployed, as seen in this [merged PR](https://github.com/sugarlabs/musicblocks/pull/4707). To test, simply write your musicblocks program in Javascript in the editor and press the convert button. Note that the only blocks supported are those supported by block to code conversion, so it won't work on every single block possible, but will work on most of them.

<a href="https://ibb.co/qLNNyH8W"><img src="https://i.ibb.co/V0ggjFGQ/Screenshot-2025-06-14-at-2-25-05-PM.webp" alt="Conversion Example"></a>

---

## Challenges & How I Overcame Them

- **Challenge:** Minimizing file size of config file

  **Solution:** Merging configs, and using minified JSON for loading.

- **Challenge:** Never-seen-before git errors when trying to push commit

  **Solution:** Image size as part of the documentation was too large, had to compress it.

---

## Key Learnings

- Deepened understanding of git.
- Improved skills in **debugging**, **code design**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Begin debugger project
- Being able to set breakpoints in the code
- Add ability to trigger status block in the code as the debugger

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
