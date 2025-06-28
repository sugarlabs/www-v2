---
title: "GSoC ’25 Week 04 Update by Bishoy Wadea"
excerpt: "Soma Cube"
category: "DEVELOPER NEWS"
date: "2025-06-28
slug: "gsoc-25-BishoyWadea-week04"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week04,BishoyWadea"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Bishoy Wadea

**Project:** [Soma Cube](https://github.com/Bishoywadea/Soma-Cube)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-22 - 2025-06-28 

---

## Goals for This Week

- **Goal 1:** Make Four Color map game pep8 compliant [#4 Make activity pep8 compliant](https://github.com/Bishoywadea/Four-Color-Map/issues/4)

- **Goal 2:** Start implementing Soma Cube game
---

## This Week’s Achievements

### *Goal 1: Fix Issues in Four Color Map Activity*

1. **Make Four Color map game pep8 compliant**  
   - commit: [Make main.py, activity.py PEP 8 compliant](https://github.com/Bishoywadea/Four-Color-Map/commit/45b2dd77e39a6d822d9d4ba0a12fbf1c31e1f04b)

---

### *Goal 2: Start implementing Soma Cube game*
1. **3D Environment & Controls**
    - Set up a 3D scene with movement and camera control.
    - commit: [add 3d space with cube](https://github.com/Bishoywadea/Soma-Cube/commit/c917f9d2af509cc4f405f9b72fe8d479e1f3f56f)
    - commit: [add wasd controls](https://github.com/Bishoywadea/Soma-Cube/commit/7dc779dbecd693794a2ae96f25ef3aa3dd174c83)
    - ![Demo GIF](https://i.postimg.cc/W4mpdVC6/01.gif)

2. **Soma Pieces & Core Mechanics**
    - Added the 7 pieces and enabled, rotation, and collision.
    - commit: [add the 7 basic pieces](https://github.com/Bishoywadea/Soma-Cube/commit/5ace6710608720ba05bad05df3dac26bbd1907e9)
    - commit: [add collision support](https://github.com/Bishoywadea/Soma-Cube/commit/9e1f60943b64718c4efc6deca1a0a077f1e94475)
    - ![Demo GIF](https://i.postimg.cc/9fsSHwJL/02.gif)

3. **Interaction & UI Elements**
    - Implemented help system, completion message, and on-screen controls.
    - commit: [add help button](https://github.com/Bishoywadea/Soma-Cube/commit/f00c1661fc94a9c29e3325c83c916d215a2b1c32)
    - commit: [add controls map on screen](https://github.com/Bishoywadea/Soma-Cube/commit/325d9197cedc5dfa6643382fcaf246b681201806)

4. **Texturing & Visuals**
    - Added textures for floor, sky, and Soma pieces with improved lighting.
    - commit: [add sky texture](https://github.com/Bishoywadea/Soma-Cube/commit/be08b1c314dccc7f0c984585a1ee19e27664ce89)
    - commit: [add texture for the 7 objects](https://github.com/Bishoywadea/Soma-Cube/commit/8b69f60a615037266dc2ae8e89d8ed09a231c1ea)
    - ![Demo GIF](https://i.postimg.cc/zB1jkCdY/03-Conv-Gif.gif)

---

## Challenges & Solutions

- **Challenge:** Implementing precise snapping and collision for 3D puzzle pieces.  
  **Solution:** Designed a snapping algorithm with bounding box checks and added a collision detection system to prevent overlaps.

- **Challenge:** Enhancing the visual quality of the 3D scene.  
  **Solution:** Introduced floor, sky, and object textures; adjusted lighting and shadows for a more polished and immersive look.

- **Challenge:** Allowing intuitive piece manipulation with both keyboard and mouse.  
  **Solution:** Integrated context-aware WASD controls and mouse-based dragging/rotating mechanisms for smooth interaction.

- **Challenge:** Guiding users through gameplay without overwhelming them.  
  **Solution:** Added an on-screen control map, a help button, and a success message to support the player experience.

- **Challenge:** Maintaining code readability during rapid feature additions.  
  **Solution:** Regularly removed redundant code, followed PEP8 guidelines, and modularized logic for easier updates.

---

## Key Learnings

- Strengthened understanding of **3D graphics programming** using transformations, lighting, textures, and real-time rendering.
- Gained practical experience in **interactive puzzle game design**, including snapping mechanics, collision handling, and visual feedback.
- Improved skills in **UI/UX design for educational tools**, balancing usability, clarity, and visual appeal.
- Practiced clean coding habits with **modular design**, PEP8 compliance, and ongoing refactoring.
- Learned to integrate **multi-modal controls** (keyboard + mouse) for intuitive 3D manipulation.


---

## Next Week’s Roadmap

- Fix any feedback provided by members of the organization.  
- Start implementing the 16-puzzle game.
---
