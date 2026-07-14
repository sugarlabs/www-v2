---
title: "GSoC '26 Week 7 Update by Harihara Vardhan"
excerpt: "This week I finalized the Time Travel timeline UI after exploring three design directions, renamed Planet to Git Planet for clarity, and ran a round of frontend testing to catch data leaks and performance issues."
category: "DEVELOPER NEWS"
date: "2026-07-14"
slug: "2026-07-14-gsoc-26-harihara-vardhan-week-7"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-7,musicblocks,git-backend,frontend,timeline,git-planet"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** July 7, 2026 to July 14, 2026

---

## Introduction

Hey everyone! Week seven was mostly about design and testing. Before jumping into implementing the Time Travel timeline, I wanted to get the UI right first. I also ran some frontend tests and made a small but important naming change. Here is what I got done this week.

## Designing the Time Travel Timeline

The commit history timeline is the main way students will navigate their project's save history. I sketched out three different layouts before settling on a final one.

### Option 1 - Minimal Vertical

This layout stacks commits top to bottom in a card list. The current state sits at the top, labeled "YOU ARE HERE", with older commits below it. Each card shows a numbered step, a small icon, and a plain-language commit message like "You added a drum beat." Older commits have a "Go here" button to jump back, while the current one shows "Clear changes" instead. The project start sits at the very bottom.

It is easy to read, but felt a bit too plain for Music Blocks students.

<img src="/assets/Developers/hariharavardhan/timeline_minimal_vertical.png" alt="Minimal Vertical Timeline" width="500" />

### Option 2 - Minimal Horizontal

Same cards as the vertical layout, but arranged left to right as a scrollable row. "START" is on the left and "YOU ARE HERE" is on the right. Dashed arrows connect each step in sequence.

This one maps a bit more naturally to the idea of moving through time from left to right. Still minimal, but slightly more intuitive.

<img src="/assets/Developers/hariharavardhan/timeline_minimal_horizontal.png" alt="Minimal Horizontal Timeline" width="600" />

### Option 3 - Game-Style (Chosen!) ⭐

This is the one we are going with. It uses a winding dotted path, similar to a level map in a mobile game. Each save is a stop on the path, shown as a colourful circular icon with a description and a "Take me here" button. The current save is highlighted with a "YOU ARE HERE" badge and tagged "This is your song right now."

The winding path and the colourful icons make scrolling through your project history feel like exploring a map rather than reading a log. It fits the playful character of Music Blocks and should be much more engaging for students.

<img src="/assets/Developers/hariharavardhan/timeline_maximal_game.png" alt="Game-Style Timeline" width="500" />

## Button Map and New Project Flows

I also drew out a full diagram mapping which buttons do what and all the different ways a student can start or open a project. There are more paths than you might expect:

- **New project from the toolbar** - creates a blank project with no repo attached.
- **New project from Git Planet** - same result, but triggered from inside Git Planet.
- **Load project from file (toolbar or Git Planet)** - opens an existing project file.
- **New Git button in the toolbar** - creates a project and initialises it as a GitHub repo straight away, via "Create My Save Spot."
- **Fork in global Git Planet** - creates the project as a repo.
- **Fork in local Git Planet** - this flow is still being figured out. It may need branching support, which is an open question for now.

There is also a "Merge with current project" flow. Whether the merged result stays as a repo depends on whether the base project already is one.

You can [explore the full interactive diagram on Excalidraw](https://excalidraw.com/#json=lTha216Bwkh0qnoFkpUDj,GUdZM3dOQ2n3isO8kH_JoQ) if you want to see all the flows in detail.

<img src="/assets/Developers/hariharavardhan/whiteboard_sketch.png" alt="Button Map Whiteboard Sketch" width="700" />

## Git Planet - Clearing Up the Confusion

From now on, the new Git-powered version of Planet will be called **Git Planet**. The name change avoids confusion with the original Planet, which still exists. Most of the frontend stays the same, but the updated name makes it immediately clear which one is being referred to in the UI and in any documentation.

## Frontend Testing

I ran a focused round of frontend testing this week, looking at two things:

- **Data leaks** - checking that project data does not bleed across sessions or contexts, especially at the postMessage boundary between the main window and the Git Planet iframe.
- **Performance** - profiling the postMessage bridge and IndexedDB reads to confirm nothing is blocking the UI during project loads or commits.

Nothing critical came up. A few small things were tightened along the way.

## What's Next?

Next week I will start implementing the game-style timeline UI and keep testing more features end to end.

See you next week!
