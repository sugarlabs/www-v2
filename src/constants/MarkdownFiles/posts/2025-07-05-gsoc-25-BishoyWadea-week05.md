---
title: "GSoC ’25 Week 05 Update by Bishoy Wadea"
excerpt: "Fifteen Puzzle"
category: "DEVELOPER NEWS"
date: "2025-07-05"
slug: "gsoc-25-BishoyWadea-week05"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week05,BishoyWadea"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Bishoy Wadea

**Project:** [Fifteen Puzzle](https://github.com/Bishoywadea/FifteenPuzzle)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-29 - 2025-07-05 

---

## Goals for This Week

- **Goal 1:** Start implementing Fifteen Puzzle Game
---

## This Week’s Achievements

### *Goal 1: add helpful video tutorial in Soma Cube Game*

1. **add video in help button**  
   - commit: [modify code to handle help videos](https://github.com/Bishoywadea/Soma-Cube/commit/63a7daaa8009f5f54791cdf9081e765846135f70)
![illistration tutorial video](https://github.com/Bishoywadea/Soma-Cube/blob/main/help.mp4)
---

### *Goal 2: Start implementing Fifteen Puzzle Game*
1. **UI Foundation & Game Board**
    - Set up the game window with a functional 4x4 puzzle grid and animated tile movements.
    - commit: [add basic board UI](https://github.com/Bishoywadea/FifteenPuzzle/commit/ee2a8ec0a87949a93f0093b558de5d760ef66d59)
    - commit: [add animation for the board](https://github.com/Bishoywadea/FifteenPuzzle/commit/a09f407451cb0772eff80d605509854d76522d17)

![image for board UI](https://github.com/Bishoywadea/FifteenPuzzle/blob/main/screenshots/en/01.png?raw=true)

2. **Core Logic & Gameplay**
    - Added full logic for tile shifting, move counting, and puzzle completion detection.
    - commit: [add game logic](https://github.com/Bishoywadea/FifteenPuzzle/commit/28d835400fb80c32d0eebba7c08f83fcfe9f9c63)

3. **Help System & UI Integration**
    - Introduced help instructions and integrated the help button into the top toolbar for easier access.
    - commit: [add help button](https://github.com/Bishoywadea/FifteenPuzzle/commit/494f212f83e469fe2f3c24dd54e398c903a77dcc)

![image for help panel](https://github.com/Bishoywadea/FifteenPuzzle/blob/main/screenshots/en/02.png?raw=true)
![image for success animation](https://github.com/Bishoywadea/FifteenPuzzle/blob/main/screenshots/en/03.png?raw=true)


---

## Challenges & Solutions

- **Challenge:** Creating a responsive and user-friendly tile movement system.  
  **Solution:** Implemented smooth tile animations and move validation logic to ensure accuracy and a satisfying user experience.

- **Challenge:** Designing a clean UI that adapts to game states like playing, winning, or seeking help.  
  **Solution:** Built a modular UI with conditionally rendered elements such as move counters, help overlays, and success animations for clarity and flow.
---

## Key Learnings

- Gained hands-on experience in building grid-based puzzle logic, including tile shifting, move tracking, and win condition detection.

---

## Next Week’s Roadmap

- Fix any feedback provided by members of the organization.  
- Start implementing the Euclid’s Game.
---
