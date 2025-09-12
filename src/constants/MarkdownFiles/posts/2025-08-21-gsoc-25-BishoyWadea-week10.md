---
title: "GSoC '25 Week 10 Update by Bishoy Wadea"
excerpt: "Magic Number Grid"
category: "DEVELOPER NEWS"
date: "2025-08-21"
slug: "gsoc-25-BishoyWadea-week10"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week10,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Week 10 Progress Report by Bishoy Wadea

**Project:** [Magic Number Grid](https://github.com/Bishoywadea/Magic-Number-Grid)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-08-18 – 2025-08-21  

---

## Goals for This Week

- **Develop new Sugar activity: Magic Number Grid**
- **Implement core Latin Square puzzle mechanics**
- **Add Sugar-compliant UI elements and features**

---

## Achievements

### Core Game Implementation

- **Game Logic Foundation**  
  Implemented Latin Square puzzle mechanics with grid generation and validation  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/87f76cbba392252d3c7002830c1f4889a1e4401b)

- **Visual Identity**  
  Created custom activity icon following Sugar design guidelines  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/605fcb7c92eab120cb9544b0b667c791f65a559f)

- **UI/UX Enhancements**  
  Fixed color scheme to match Sugar's visual standards for better accessibility  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/c820cd105f423081aa6b1f9f4ae842210391a80c)

![Game Interface Screenshot](https://raw.githubusercontent.com/Bishoywadea/Magic-Number-Grid/refs/heads/main/screen_shots/01.png)
*Main game interface showing the grid and number selection buttons*

### Feature Development

- **Duplicate Number Warning**  
  Added visual feedback when players attempt to place duplicate numbers in rows/columns  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/f9b557013677355284ae8138df730441921573be)

- **Difficulty Levels**  
  Implemented multiple difficulty settings to accommodate different skill levels  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/f9a8793fbbaa7aa83d9afbb1d9e15dfa95544ec8)

- **Note-Taking System**  
  Added ability for players to make temporary notes in cells for strategic planning  
  [Commit](https://github.com/Bishoywadea/Magic-Number-Grid/commit/1a7d89e3eec48f19d96a2e33b93846cd9316ad74)

![Successful Completion](https://raw.githubusercontent.com/Bishoywadea/Magic-Number-Grid/refs/heads/main/screen_shots/03.png)
*Victory screen showing completed Latin Square puzzle*

---

## Challenges & Solutions

- **Challenge:** Creating an intuitive note-taking interface that doesn't clutter the main game view while remaining accessible to younger users.

- **Solution:**  
  - Implemented a toggle mode system that switches between number placement and note-taking
  - Added clear visual indicators for note mode activation
  - Fixed note button icon for better clarity
  - Used smaller font sizes for notes to distinguish them from actual answers

- **Challenge:** Balancing difficulty levels to ensure appropriate challenge for Sugar's target age group.

- **Solution:**  
  - Created multiple grid sizes (4x4, 6x6, 8x8) with varying pre-filled cells
  - Ensured all generated puzzles have unique solutions
  - Added progressive difficulty that starts easier for new players

---

## Key Learnings

- Gained experience in implementing constraint-satisfaction puzzles with guaranteed unique solutions
- Learned to design multi-modal interfaces (play mode vs. note mode) that remain intuitive for young users
- Improved understanding of Sugar's dialog system and how to create consistent pop-up experiences

---

## Next Week's Roadmap

- Begin development of new Sugar activity: **Rubik's Cube**
  - Research 3D rendering options compatible with Sugar
  - Design intuitive touch/click controls for cube manipulation
