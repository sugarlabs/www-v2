---
title: "GSoC '26 Week 10: Update by Harihara Vardhan"
excerpt: "This week I researched and designed an interactive tutorial overlay for Git features in Music Blocks, inspired by visual widget tutorials, and squashed project name sync and tooltip bugs."
category: "DEVELOPER NEWS"
date: "2026-08-04"
slug: "2026-08-04-gsoc-26-harihara-vardhan-week-10"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-10,musicblocks,git-backend,tutorial,bugfixes,frontend"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** July 29, 2026 to August 4, 2026

---

## Introduction

Hey everyone! Welcome to week ten of GSoC 2026. This week was centered on making our Git features approachable for students and refining the overall user interface. 

Now that the core Git backend, Time Travel timeline, and offline modes are working smoothly, the focus shifted to the user experience. I spent time researching and designing how to guide new users through these version control concepts. I also spent time squashing a few UI inconsistencies and bugs that were reported during review. Here is everything I worked on this week.

## Researching and Designing the Git Tutorial

Git can be an abstract topic, especially for young learners using Music Blocks for the first time. Terminology like repositories, commits, and timeline resets can sound intimidating. To make these features intuitive, I entered the research and design phase for an interactive tutorial.

I started by exploring tutorial designs on different educational coding platforms to see how they guide beginners. One design pattern that caught my attention was Scratch's tutorial system.

<img src="/assets/Developers/hariharavardhan/tutorial_inspiration.png" alt="Scratch Tutorial Widget Inspiration" width="500" />

Instead of overwhelming students with long text popups or forcing them to leave the workspace, Scratch uses a compact, floating widget card right inside the workspace canvas. It combines clear step-by-step navigation dots, short looping animations, and concise instruction banners. 

Drawing inspiration from these platforms, I drew up initial layout ideas for a Git tutorial widget that can sit directly inside Music Blocks. The idea is to place a tutorial option under the Help (?) dropdown in the main toolbar, which will open a floating guide widget.

The proposed design breaks down version control into four bite-sized steps:

1. **Save a Spot:** Guiding students on initializing a project repository.
2. **Mark this Moment:** Demonstrating how to save progress with descriptive commit messages.
3. **Time Travel:** Showing how to view project history and restore previous saves.
4. **Forking from Git Planet:** Explaining how to copy and remix existing projects.

In the design concept, each step will feature a short looping visual animation demonstrating the exact action on screen, along with pagination dots and a progress notification upon completion. 

## Fixing UI Inconsistencies and Edge Case Bugs

Along with the tutorial research and design, I worked on squashing several bug fixes and UI polish items:

### 1. Project Name Syncing across Git Planet and Toolbar
When a student renamed their project inside Git Planet, the updated title did not immediately reflect on the main toolbar. The iframe boundary was causing the state to stay out of sync until a page reload. I updated the postMessage event handlers so that project title edits inside Git Planet instantly notify the parent workspace, updating the toolbar header seamlessly.

### 2. Cleaning up Git Icon Tooltip Jargons (Reported by Ibiam)
My mentor Ibiam identified a bug with the Git icon tooltip in the toolbar. Hovering over the Git icon displayed the internal GitHub repository name instead of the human-readable project title. Because repository names use unique identifier strings (with random UUID hashes and symbols like `mb-proj-a1b2c3d4`), it looked cluttered and confused users. 

I updated the tooltip renderer to parse and display the clean user display name. Hovering over the Git icon now shows the actual project title that the student gave their project.

### 3. Preserving Project Names in Offline Mode
I fixed a bug where saving a spot while offline caused the project name to revert back to the default fallback "My project." Now, custom titles are preserved in local storage even when disconnected from GitHub, ensuring offline commits keep their proper naming.

## What's Next?

Now that the research and design phase for the Git tutorial is wrapped up, next week will be focused on building out the interactive tutorial component itself. I will be implementing the floating widget UI, adding step animations, and integrating it directly into the Music Blocks help menu.

Thanks for reading, and see you next week!
