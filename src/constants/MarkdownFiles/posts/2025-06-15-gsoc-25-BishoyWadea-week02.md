---
title: "GSoC ’25 Week 02 Update by Bishoy Wadea"
excerpt: "Broken Calculator"
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "gsoc-25-BishoyWadea-week01"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week02,BishoyWadea"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Bishoy Wadea

**Project:** [Broken Calculator](https://github.com/Bishoywadea/Broken-Calculator)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-08 - 2025-06-15 

---

## Goals for This Week

- **Goal 1:** Define game features and core mechanics.
- **Goal 2:** Design and plan a child-friendly, interactive game UI.
- **Goal 3:** Implement the core game logic.

---

## This Week’s Achievements – *Broken Calculator Game*

1. **Initial Setup & Core Functionality**
   - Added starter files and project structure.
   - Implemented basic game manager functionality to handle state, inputs, and equation validation.
   - commit: [Initial Commit](https://github.com/Bishoywadea/Broken-Calculator/commit/9615fe64467e538e4b2d3df2ba6a0059177d31a7)

2. **UI Foundation and Target Display**
   - Created basic UI layout with the target number display.
   - Integrated equation panel and on-screen keyboard for child-friendly input.
   - commit: [UI Target + Equation Panel](https://github.com/Bishoywadea/Broken-Calculator/commit/fb52777a698d0846b3012140a796024edef5e577)

3. **Button Logic and Interaction**
   - Added calculator buttons and implemented event handling logic.
   - Created class-based structure for reusable buttons and interactions.
   - commit: [Calc Buttons Logic](https://github.com/Bishoywadea/Broken-Calculator/commit/f5201b9cf17c37fb70502fda55fd190b2143bca2)

4. **Gameplay Enhancements**
   - Added scoring system and validation logic for player input.
   - Implemented completion message upon solving the puzzle correctly.
   - commit: [Game Logic & Completion](https://github.com/Bishoywadea/Broken-Calculator/commit/2f985799faab59d590adae38b349c20dc0b432f9)

5. **Visual & UX Improvements**
   - Introduced dark theme palette for better visual experience.
   - Added menu buttons, teacher image, and stars animation for child appeal.
   - Relocated help button for better accessibility.
   - commit: [UI/UX Polish](https://github.com/Bishoywadea/Broken-Calculator/commit/c97ade0610d606672a99522b944ed4ec24018c02)

---

## Challenges & Solutions

- **Challenge:** Handling math equation input using only a restricted set of digits/operators.  
  **Solution:** Wrote logic to dynamically validate inputs and compute results with constraints.

- **Challenge:** Making the interface engaging for children.  
  **Solution:** Added animations, character images, and accessible visual elements.

---

## Key Learnings

- Gained proficiency in using **Pygame** for interactive game development.
- Improved understanding of **map projections** and **GeoJSON** parsing.
- Learned about structuring a project for open-source collaboration (commits, PRs, README, file organization).
- Practiced test-driven logic development and clean UI design tailored for children.

---

## Key Learnings

- Enhanced skills in **Pygame** UI design and interaction patterns.
- Practiced breaking down UI into components (buttons, input panels, layout regions).
- Understood how to make gameplay intuitive without written instructions—especially for kids.

## Next Week’s Roadmap

### Soma Cubes Game: Initial Insights & Exploration
- Begin designing core mechanics and gameplay flow for a Soma Cubes puzzle activity.
- Prototype user interactions: piece manipulation, rotation, and snapping into place.
- Investigate how to integrate puzzle constraints and feedback for users.
- Sketch out UI layout and controls tailored for children.

---

### Fix Open Issues

#### Four-Color Map Activity
- **[#1 Move buttons on the activity canvas to the activity toolbar](https://github.com/Bishoywadea/Four-Color-Map/issues/1)**  
  Adjust UI so that control buttons (e.g., Undo, Help, Menu) are relocated from the map canvas into a consistent toolbar above or beside it.
- **[#2 Sugarize activity icon](https://github.com/Bishoywadea/Four-Color-Map/issues/2)**  
  Update the icon to conform with Sugar activity design standards—ensure correct dimensions, transparency, and consistency with Sugar's visual language.

#### Broken Calculator
- **[#1 Make calculator fill activity canvas](https://github.com/Bishoywadea/Broken-Calculator/issues/1)**  
  Refactor layout to scale the calculator panel to full canvas size at any screen resolution or window rescaling.
- **[#2 Improve UI](https://github.com/Bishoywadea/Broken-Calculator/issues/2)**  
  Polish button styles, spacing, theme consistency (light/dark), and overall visual clarity based on user feedback.

---
