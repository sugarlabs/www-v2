---
title: "GSoC ’25 Week 01 Update by Bishoy Wadea"
excerpt: "Bonding and Four Color Map puzzle"
category: "DEVELOPER NEWS"
date: "2025-06-07"
slug: "2025-06-07-gsoc-25-BishoyWadea-week01"
author: "Bishoy Wadea"
description: "GSoC'25 Contributor"
tags: "gsoc25,sugarlabs,week01,BishoyWadea"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Bishoy Wadea

**Project:** [Four Color Map Puzzle](https://github.com/Bishoywadea/Four-Color-Map)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-01 - 2025-06-07  

---

## Goals for This Week

- **Goal 1:** Define game features and core mechanics.
- **Goal 2:** Design and plan a child-friendly, interactive game UI.
- **Goal 3:** Implement the core game logic for map coloring and rule enforcement.

---

## This Week’s Achievements

1. **Initial Game Implementation**
   - Implemented the basic game loop, event handling, and win condition detection. This created the foundation for gameplay.
   - Added support for checking that no two adjacent regions have the same color.  
   - PR: [#1 Gameplay Base](https://github.com/Bishoywadea/Four-Color-Map/commit/91eabce38439fc08da652d1de309b556393fcee3)

2. **UI Enhancements & Interaction Features**  
   - Designed and integrated colorful buttons, icons, and zoom functionalities to make the UI more appealing to children.
   - Added menu navigation for selecting countries and levels.
   - Added Undo, Erase, and Help buttons for better usability.  
   - PR: [#2 UI Enhancment](https://github.com/Bishoywadea/Four-Color-Map/commit/4fe1c755c47696cc20e6dd757190ed1f3df98717)

3. **Map Data Integration**
   - Generated and added regional map data for Egypt, US, Nigeria, and India.
   - Developed a script to convert GeoJSON files into game-ready polygon data.
   - Screenshot of gameplay:  
   PR: [#3 Data Integration](https://github.com/Bishoywadea/Four-Color-Map/commit/de018722d2d32d3ebd40429f8e59e1793cd34e9c)

---

## Challenges & How I Overcame Them

- **Challenge:** Generating accurate and clean polygon data from raw GeoJSON files.  
  **Solution:** Wrote a custom Python script to extract, simplify, and format the regions into usable coordinates while preserving geographical structure.

- **Challenge:** Preventing adjacent regions from being colored the same.  
  **Solution:** Implemented an adjacency-check function that verifies constraints during each coloring action.

---

## Key Learnings

- Gained proficiency in using **Pygame** for interactive game development.
- Improved understanding of **map projections** and **GeoJSON** parsing.
- Learned about structuring a project for open-source collaboration (commits, PRs, README, file organization).
- Practiced test-driven logic development and clean UI design tailored for children.

---

## Next Week’s Roadmap

- Checking if any bugs appears
- develop broken calculator game

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for the warm support and constant feedback during this bonding period.

---

## Connect with Me

- GitHub: [@Bishoywadea](https://github.com/Bishoywadea)
- Gmail: [bishoywadea@gmail.com](mailto:bishoyw.fathy@gmail.com)
- LinkedIn: [Bishoy Wadea](https://www.linkedin.com/in/bishoy-wadea-27b016250/)

---
