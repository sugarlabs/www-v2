---
title: "GSoC '26 Community Bonding Report by Rejah Rabeeul Haque"
excerpt: "Introducing my GSoC '26 project: Connect The Dot activity for Sugarizer, and what I'll be working on this summer."
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-rejah-rabeeul-haque-community-bonding"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
tags: "gsoc26,sugarlabs,sugarizer,community-bonding,connect-the-dots"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->
## Community Bonding Reflections for GSoC 2026

**Project:** Sugarizer Connect The Dots Activity
**Mentors:** [Lionel Laské](https://github.com/llaske)
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** May 8, 2026 – May 24, 2026

---

## About Me

Hello everyone, I'm Rejah Rabeeul Haque, a third-year B.Tech student in Computer Science at KMCT IETM. I'll be working on **Sugarizer** at Sugar Labs this summer as a Google Summer of Code 2026 contributor.

I've started my coding journey from my second-year since then I'm actively learning about new technology and learning how to code. In my third-year I started to know about Open-Source community and GSoC. Since then, I've been contributing to Sugarizer since early 2026, with merged PRs covering bug fixes, enhancements, feature updates, and new activity creation. This work has given me deep familiarity with the Sugar-Web framework, the Journal system, the Presence API, the architecture, and the community review process that my GSoC project will build upon. 

Apart from coding, I enjoy walking and love playing sports, mainly Esports. I later became a Professional esports athlete and played in many national and international tournaments and became the Most Valuable Player(MVP) in some of the tournaments. The dedication I developed through esports has significantly helped me in my coding journey by teaching me consistency, never giving up and mainly team collaboration, which is probably the most important thing in Open Source.


## Connect the Dots GSoC Project

This is the activity I'm building for GSoC. During the community bonding period, till now I've implemented a mockup of the two primary modes: **Draw Mode** and **Number Mode**. and I'll complete my mockup for **Game mode** before the coding period starts.

### Activity Overview

A multi-mode activity using JavaScript, HTML5, CSS, and VanillaJS, featuring draw mode, number mode, and game mode with collaborative and AI support.
The activity renders a **dot grid** on an HTML5 canvas. Grid intersections are the connectable points.

### Draw Mode

![Connect the Dots — Draw Mode](/assets/Developers/Rejah/connectthedots-draw-mode.webp)

In Draw Mode, learners freely explore:

- **Click** any grid intersection to place a dot and start a drag chain
- **Drag** continuously — lines are committed as the cursor moves across near grid intersections
- **Close a polygon** — when a chain of lines forms a closed loop, the enclosed area is automatically **filled** with the selected color
- A **ghost line** (dashed, semi-transparent) follows the cursor to preview the next segment

### Color Palette and Save to Journal

A toolbar color picker shows variety of colors which apply to both lines and polygon fills.
Save to Journal feature is used for saving the users drawings to the journal.

### Number Mode

![Connect the Dots — Number Mode](/assets/Developers/Rejah/connectthedots-number-mode.webp)

Number Mode turns the activity into a **structured connect-the-dots puzzle**:

- A predefined **library of templates** (point sequence) is loaded, example: Basic shapes, Numers , Letters.
- Each dot is **numbered** (1, 2, 3…) and the user must connect them in order
- Dragging is only allowed from the **current active dot** (wrong dot clicks are ignored)
- When the shape is completed and closed, the polygon fills with the color

### Template Selection

A **template palette** dropdown lets the user pick the library of shapes. The user can create new shapes and save them to the library.


## Color Lab Enhancements

**Color Lab** is an activity I proposed and built before GSoC. During this community bonding period, I continued working on it and made several enhancements to improve the experience:

- Updated the **Harmony mode and Game mode Icons** — I have added new icons for the harmony mode and game mode
- Improved the **User Experience** — I have improved the user experience in color lab by adding enhancements on color ring and RGB sliders
- Fixed bugs in **resize handling** — I have fixed the bugs in resize handling

---

## What's Next

Heading into the official coding period (starting May 24), my priorities are:

- **Connect the Dots:** Prior to coding period, I'll finish mockups for game mode and during the coding period I'll Implement all the modes Draw Mode, Number mode, Game mode, by using Sugarizer frame works.
- Sync with my mentors on the milestone timeline and PR process

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the constant guidance, valuable suggestions, and ongoing support throughout my community bonding period and my journey in Sugarizer. His suggestions, reviews, and patience have taught me many things that I could not have learned on my own. I’m also grateful to the other contributors who have helped me throughout my journey. 

---


*This is Week 0 of my GSoC 2026 weekly blog series. Stay tuned for updates every week! :)*