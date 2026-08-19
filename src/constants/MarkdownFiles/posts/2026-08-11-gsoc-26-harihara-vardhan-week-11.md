---
title: "GSoC '26 Week 11: Update by Harihara Vardhan"
excerpt: "This week I implemented the full interactive Git Tutorial overlay in Music Blocks, complete with custom slide animations, smart video management, keyboard shortcuts, and native notification feedback."
category: "DEVELOPER NEWS"
date: "2026-08-11"
slug: "2026-08-11-gsoc-26-harihara-vardhan-week-11"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-11,musicblocks,git-backend,tutorial,frontend,ui"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** August 5, 2026 to August 11, 2026

---

## Introduction

Hey everyone! Welcome to week eleven of GSoC 2026. Following up on last week's research and design phase, this week was all about bringing the Git Tutorial overlay to life inside Music Blocks!

Building version control tools for young learners is only half the battle. Making those tools self-explanatory so students can discover, understand, and use them independently is just as important. This week I implemented the full interactive **Git Tutorial** widget component directly into the Music Blocks workspace. Here is a breakdown of how it works and how it was built.

## Building the Interactive Git Tutorial Overlay

In `js/gitTutorial.js`, I built a lightweight, floating four-step tutorial modal overlay. Instead of taking students away from their canvas or locking up the application, the widget sits right on top of the workspace canvas.

<img src="/assets/Developers/hariharavardhan/tutorial_save_a_spot.png" alt="Git Tutorial - Save a Spot" width="550" />

I styled the widget using Music Blocks' primary blue design system (`#2196F3` toolbar blue header with `#e3f2fd` light accents) to ensure it feels like a native part of the UI. The component includes step pagination dots, horizontal slide animations, left and right navigation arrows, and full keyboard shortcut support (`Escape` to close, `ArrowLeft` and `ArrowRight` to navigate).

## The Four Core Git Concepts Explained for Kids

The tutorial breaks down Git workflows into four approachable steps, using visual walk-throughs and clear instructions:

### 1. Save a Spot
Explains how to create and reserve a project repository on the internet, showing students how to initialize their work with a single click.

<img src="/assets/Developers/hariharavardhan/tutorial_save_a_spot.png" alt="Git Tutorial Step 1 - Save a Spot" width="550" />

### 2. Mark this Moment
Teaches students how to take version snapshots and save commits with descriptive notes so they can track their creative progress over time.

<img src="/assets/Developers/hariharavardhan/tutorial_mark_this_moment.png" alt="Git Tutorial Step 2 - Mark this Moment" width="550" />

### 3. Timeline
Demonstrates how to open the Time Travel panel, browse past version history, and restore earlier states of a project whenever they want to experiment safely.

<img src="/assets/Developers/hariharavardhan/tutorial_timeline.png" alt="Git Tutorial Step 3 - Timeline" width="550" />

### 4. Fork from Planet
Shows how to take an existing project from Git Planet and create a fresh personal copy to remix and build upon.

<img src="/assets/Developers/hariharavardhan/tutorial_fork.png" alt="Git Tutorial Step 4 - Fork from Planet" width="550" />

## Smart Video & Asset Management

To keep performance fast and light, video playback is tied directly to slide navigation logic. 

Rather than playing multiple videos simultaneously in the background (which wastes memory and CPU resources), video playback is event-driven. When a student enters a slide, its corresponding clip automatically resets to `0:00` and starts playing. As soon as they navigate to another slide, the current video pauses immediately. This keeps the animation playback smooth even on lower-spec hardware.

## Integrated Toolbar Menu & Native Notification Banner

The tutorial launcher is integrated into the main Music Blocks toolbar under the Help (**?**) dropdown menu.

When a student reaches the final slide and clicks **Done**, the modal closes cleanly and fires Music Blocks' native top notification banner (`activity.textMsg`), giving them immediate actionable feedback:

> *"Start by clicking Save a Spot in the Git menu!"*

This guides students directly toward taking their first action in the workspace right after finishing the tutorial.

## What's Next?

We are approaching the final phase of GSoC! Next week, I am going to update the tutorial based on mentor feedback and testing with kids, deploy the backend server, and prepare the frontend integration for the final review.

Thanks for reading, and see you next week!
