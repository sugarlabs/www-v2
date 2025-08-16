---
title: "GSoC ’25 Week 03 Update by Bishoy Wadea"
excerpt: "Broken Calculator"
category: "DEVELOPER NEWS"
date: "2025-06-22"
slug: "gsoc-25-BishoyWadea-week03"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week03,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Bishoy Wadea

**Project:** [Broken Calculator](https://github.com/Bishoywadea/Broken-Calculator)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-06-22 - 2025-06-28 

---

## Goals for This Week

- **Goal 1:** Fix issues in Four Color Map game opened by ibiam [Move buttons from canvas to tool bar](https://github.com/Bishoywadea/Four-Color-Map/issues/1), [Sugarize activity icon](https://github.com/Bishoywadea/Four-Color-Map/issues/2), [adding lisence to activity](https://github.com/Bishoywadea/Four-Color-Map/issues/3).

![image to show difference between before and after](https://i.postimg.cc/vmWPFd6q/b4e81f67-3e05-4389-a67d-82eb71a14899.webp)

- **Goal 2:** Fix issues in Broken Calculator game opened by ibiam [change UI to be more focused](https://github.com/Bishoywadea/Broken-Calculator/issues/2).

![image to show difference between before and after](https://i.postimg.cc/7LsNyYZN/download.webp)
---

## This Week’s Achievements

### *Goal 1: Fix Issues in Four Color Map Activity*

1. **Moved Control Buttons to Toolbar**  
   - Relocated in-canvas buttons (Undo, Help, Menu) to a proper activity toolbar for a more intuitive UI layout.  
   - PR: [Move Buttons to Toolbar](https://github.com/Bishoywadea/Four-Color-Map/pull/5)

2. **Sugarized the Activity Icon**  
   - Designed and applied a new icon that follows Sugar activity standards in shape, color, and transparency.  
   - PR: [Sugarized Icon](https://github.com/Bishoywadea/Four-Color-Map/pull/6)

3. **Added License File**  
   - Included a standard open-source license file in the repo, ensuring compliance with FOSS guidelines.  
   - PR: [Add License](https://github.com/Bishoywadea/Four-Color-Map/pull/7)

---

### *Goal 2: Improve Broken Calculator UI & UX*

1. **Redesigned UI for Focused Gameplay**  
   - Refactored layout to fill the canvas with the calculator interface and decluttered extra elements.  
   - commit: [Canvas Layout Update](https://github.com/Bishoywadea/Broken-Calculator/commit/7ec076475ae1c7e77c96a6ae155b151681fa724a)

---

## Challenges & Solutions

- **Challenge:** Migrating control elements from canvas to toolbar in Four Color Map.  
  **Solution:** Familiarized myself with the Sugar toolbar API and successfully relocated buttons, improving UI consistency.

- **Challenge:** Making the interface engaging for children.  
  **Solution:** Added animations, character images, and accessible visual elements.

---

## Key Learnings

- Deepened experience working with **Sugar activity design standards**, including toolbars and icon sugarization.
- Gained hands-on experience applying **open-source contribution practices**—issue tracking, commit hygiene, licensing, and documentation.
- Practiced creating UI/UX for young learners, focusing on minimalism, feedback clarity, and visual accessibility.

---

## Next Week’s Roadmap

### Soma Cubes Game: Initial Insights & Exploration
- Begin designing core mechanics and gameplay flow for a Soma Cubes puzzle activity.
- Prototype user interactions: piece manipulation, rotation, and snapping into place.
- Investigate how to integrate puzzle constraints and feedback for users.
- Sketch out UI layout and controls tailored for children.

---

### Fix Open Issues

#### Four-Color Map Activity
- **[#4 Make activity pep8 compliant](https://github.com/Bishoywadea/Four-Color-Map/issues/4)**  
  The activity isn't pep8 compliant.

---
