---
title: "GSoC '26 Week 1 Update by Rejah Rabeeul Haque"
excerpt: "Completed mockup designs for Number Mode and Game Mode in the Connect The Dots activity, and fixed bugs in the Paint activity"
category: "DEVELOPER NEWS"
date: "2026-06-03"
slug: "2026-06-03-gsoc-26-rejah-rabeeul-haque-week01"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week01,rejah-rabeeul-haque"
image: "assets/Images/GSOC.webp"
---


## Week 1 Progress

Hey! In Week 1 of GSoC 2026 I've completed all the requirements needed for the activity to build successfully. This week, I worked on completing the mockups for the Connect The Dots Activity and also fixed bugs on the other activity that helps with the release of Sugarizer 2.0. Here is a breakdown of what I've done:

---

## 1. ConnectTheDots Activity — Mockups for Number Mode & Game Mode

A major focus this week was completing the design of the two new modes in the ConnectTheDots activity:

- Number Mode: Children connect dots in numerical order. I've already completed the mockup for the activity in the previous week. This week, I've designed mockups for adding new shapes and categories to the Number Mode so users can add their own dot patterns easily.

![Number Mode - New Shapes](/assets/Developers/Rejah/connectthedots-new-shape.webp)

![Number Mode - New Category](/assets/Developers/Rejah/connectthedots-new-category.webp)

- Game Mode: This mode is similar to Paper.io, where players try to achieve the largest portion of the canvas. It contains an AI opponent so that kids can play in single player mode and enjoy the game. It contains a progress bar that helps players to see their progress.

![Connect The Dots - Game Mode](/assets/Developers/Rejah/connectthedots-game-mode.webp)

These mockups will guide the implementation over the next few weeks.

## 2. Paint Activity — Bug Fixes for Sugarizer 2.0

Alongside the main project, I worked on fixing bugs in the Paint activity. These fixes are important as they contribute directly to the upcoming Sugarizer 2.0 release. Since the Paint activity is one of the most used activities in Sugarizer, fixing these issues is important.

---

## Challenges

- Getting familiar with the full codebase of Paint Activity took some time, but it gave me a solid understanding of how Sugarizer activities are structured.

- I've tried multiple fixes for Paint Activity, none of those worked, Eventually we had to revert to the old commit, after that a small bug occurred and I'm very glad that I could help fixing it.

---

## What's Next

- Begin implementing the dot grid for all the modes in the ConnectTheDots activity.
- Continue testing and fixing any issues while building the activity.
- Installing the APK to test the activity on Android.

---

## Acknowledgments

I would like to thank my mentor Lionel Laské for his constant guidance and support throughout this week. I would also like to thank the Sugar Labs community for providing such a wonderful platform to work on.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*
