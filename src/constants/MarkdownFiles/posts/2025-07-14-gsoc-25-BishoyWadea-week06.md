---
title: "GSoC ’25 Week 06 Update by Bishoy Wadea"
excerpt: "Mid term evaluation reflection"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "gsoc-25-BishoyWadea-week06"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week06,midterm,BishoyWadea"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Bishoy Wadea

**Project:** [Euclid’s Game](https://github.com/Bishoywadea/Euclid-s-Game)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-07 - 2025-07-14 

---

## Goals for This Week

- **Goal 1:** Start implementing Euclid’s Game
---

## This Week’s Achievements

### *Goal 1: add helpful video tutorial in Soma Cube Game*

1. **add video in help button**  
   - commit: [modify code to handle help videos](https://github.com/Bishoywadea/Soma-Cube/commit/63a7daaa8009f5f54791cdf9081e765846135f70)

Soma Cube as Sugar activity [youtube: Q4BKp3Yo3Uw]

---

### *Goal 2: Start implementing Euclid’s Game*

**description of the game:**
The game inspired by Euclid’s game is a two-player mathematical strategy game
that illustrates the principles of the Euclidean algorithm, particularly in finding the
greatest common divisor (GCD) of two numbers. The game begins with two unequal
positive integers written on a board. Players alternate turns, and on each turn, a
player writes a new number on the board, which is the positive difference of any two
numbers already present. The new number must be distinct from all numbers
previously written. The game continues until a player cannot make a valid move; this
player loses the game.

**Menu Light Theme:**

This shows the main menu screen of Euclid’s Game in light mode. You can see the toolbar at the top with buttons like New Game and Help, along with options to switch between light and dark themes. Below that, there are buttons for selecting difficulty levels and choosing game modes, such as 2‑player or vs AI.

![menu light theme](https://github.com/Bishoywadea/Euclid-s-Game/blob/main/screenshots/01.png?raw=true)

**Menu Dark Theme:**

This shows the main menu screen of Euclid’s Game in Dark theme

![menu dark theme](https://github.com/Bishoywadea/Euclid-s-Game/blob/main/screenshots/02.png?raw=true)

**Gameplay Dark Theme:**

Here you’re looking at the core game screen in dark mode. There's a board displaying numbers—the starting pair and any differences added. You can also see the current player’s turn and the move counter.

![game play dark theme](https://github.com/Bishoywadea/Euclid-s-Game/blob/main/screenshots/05.png?raw=true)

**Gameplay Dark Theme:**

![game play light theme](https://github.com/Bishoywadea/Euclid-s-Game/blob/main/screenshots/04.png?raw=true)

**Gameplay Light Theme**

This is the same gameplay view but in light theme. 

**Help Panel**

This overlay provides instructions or guidance on how to play the game. It likely appears when you click the “Help” button from the toolbar, offering context and tips for first-time users.

![help panel](https://github.com/Bishoywadea/Euclid-s-Game/blob/main/screenshots/06.png?raw=true)
---

## Challenges & Solutions

- **Challenge:** Creating a responsive and user-friendly .  
  **Solution:** Implemented smooth game play logic to ensure accuracy and a satisfying user experience.
---

## Midterm Evaluation Reflection

As I reach the halfway point of my GSoC journey, I’ve had the chance to reflect on the past six weeks—both the technical milestones and personal growth that came with them.

### Progress So Far
Over the first phase of GSoC, I successfully developed and shipped five fully functional Sugar activities:
- [**Four Color Map Puzzle**](https://github.com/Bishoywadea/Four-Color-Map) – Core gameplay, UI enhancements, region data integration.
- [**Broken Calculator**](https://github.com/Bishoywadea/Broken-Calculator) – Restrictive math puzzle with scoring, themes, and child-friendly UX.
- [**Soma Cube**](https://github.com/Bishoywadea/Soma-Cube) – A 3D spatial reasoning puzzle featuring piece manipulation, textures, collision, and video tutorials.
- [**Fifteen Puzzle**](https://github.com/Bishoywadea/FifteenPuzzle) – Classic sliding puzzle with smooth animations and responsive layout.
- [**Euclid’s Game**](https://github.com/Bishoywadea/Euclid-s-Game) – Strategic math game with theme switching, help overlays, and polished UI.


Each activity was built from scratch or significantly improved, covering diverse gameplay styles—from logic puzzles to real-time spatial challenges—all designed with **educational value and child accessibility** in mind.

### What I’ve Learned
- **Technical Mastery:** Strengthened my experience with **Pygame**, **Three.js**, and **GTK**, along with concepts like game loops, animation, and real-time input handling.
- **UI/UX Design:** Built interfaces tailored for young learners, focusing on clarity, feedback, and accessibility.
- **Open Source Discipline:** Embraced good development practices—clean commits, documentation, issue tracking, and community feedback cycles.

### cknowledgments
This progress would not have been possible without the patient guidance of my mentors, Ibiam. Their feedback has helped me think more deeply about software design, education, and the impact of simplicity. The Sugar Labs community’s encouragement has also been motivating and insightful.


---

## Next Week’s Roadmap

- Fix any feedback provided by members of the organization.  
- Start implementing the Magic moving game.
---
