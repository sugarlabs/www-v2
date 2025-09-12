---
title: "GSoC '25 Week 11 Update by Bishoy Wadea"
excerpt: "Rubik's Cube - 3D Puzzle Challenge"
category: "DEVELOPER NEWS"
date: "2025-08-28"
slug: "gsoc-25-BishoyWadea-week11"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week11,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Week 11 Progress Report by Bishoy Wadea

**Project:** [Rubik's Cube](https://github.com/Bishoywadea/Rubik-s-Cube)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-08-21 – 2025-08-28  

---

## Goals for This Week

- **Complete Magic Number Grid features**
- **Develop new Sugar activity: Rubik's Cube with 3D graphics**
- **Implement intuitive controls for cube manipulation**

---

## About Rubik's Cube

Rubik's Cube is a 3D puzzle game that brings the classic cube-solving challenge to Sugar. This activity helps develop spatial reasoning skills as players rotate faces and manipulate the cube to get each side showing only one color.

---

## Achievements

### Rubik's Cube Development

- **Initial Activity Setup**  
  Created Sugar activity framework with proper manifest and icon  
  [Commit](https://github.com/Bishoywadea/Rubik-s-Cube/commit/20f3f7d84889d4210a9319a627c13bac7d123e22)

- **Core Game Logic**  
  Implemented Rubik's Cube mechanics with accurate rotation algorithms  
  [Commit](https://github.com/Bishoywadea/Rubik-s-Cube/commit/ca45ea368009342317be967fd2f41ab012619ca1)

- **3D Graphics Integration**  
  Added OpenGL setup for 3D rendering within Sugar environment  
  [Commit](https://github.com/Bishoywadea/Rubik-s-Cube/commit/b86e788a9c732163308f9c2e11bb6ac8afd09187)

![Rubik's Cube Interface](https://raw.githubusercontent.com/Bishoywadea/Rubik-s-Cube/refs/heads/main/screen_shots/01.png)
*3D Rubik's Cube with interactive controls*

![Gameplay Example](https://raw.githubusercontent.com/Bishoywadea/Rubik-s-Cube/refs/heads/main/screen_shots/02.png)
*Cube mid-solve showing different colored faces*

---

## Challenges & Solutions

- **Challenge:** Integrating 3D graphics (OpenGL) within Sugar's GTK+ framework while maintaining compatibility across different hardware.

- **Solution:**  
  - Used PyOpenGL with careful context management
  - Implemented fallback rendering for systems with limited GPU support
  - Created custom event handling to bridge GTK and OpenGL interactions

- **Challenge:** Making 3D cube manipulation intuitive for young users unfamiliar with Rubik's Cube notation.

- **Solution:**  
  - Designed visual toolbar with clear icons for each move
  - Implemented mouse drag rotation for natural cube exploration
  - Added keyboard shortcuts matching standard cube notation

---

## Key Learnings

- Gained deep understanding of 3D graphics programming within constrained environments
- Learned to implement complex rotation algorithms and quaternion mathematics
- Developed skills in creating hybrid 2D/3D interfaces that remain user-friendly

---

## Next Week's Roadmap

- Begin development of new Sugar activity: **Sequence Wizard**
  - Design pattern recognition and sequence completion challenges
  - Implement various sequence types (arithmetic, geometric, visual patterns)
  - Create progressive difficulty system for different age groups