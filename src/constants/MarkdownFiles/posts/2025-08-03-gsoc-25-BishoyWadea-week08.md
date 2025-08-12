---
title: "GSoC ’25 Week 08 Update by Bishoy Wadea"
excerpt: "Fixing Sugar OS compatibility and enhancing Euclid’s Game"
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "gsoc-25-BishoyWadea-week08"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week08,BishoyWadea"
image: "assets/Images/GSOC.png"
---

# Week 08 Progress Report by Bishoy Wadea

**Project:** [Euclid’s Game](https://github.com/Bishoywadea/Euclid-s-Game)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-07-13 – 2025-08-03  

---

## Goals for This Week

- **Make all games developed before the midterm fully compatible with Sugar OS.**

---

## Achievements

### Fixed compatibility issues in Sugar OS

- **Four Color Map**  
  Resolved launch issue under Sugar environment  
  [Commit](https://github.com/Bishoywadea/Four-Color-Map/commit/7c7135b0234e81ebe27247383230ac824a4908c9)

- **Euclid’s Game**  
  Corrected Sugar-specific loading error and startup crash  
  [Commit](https://github.com/Bishoywadea/Euclid-s-Game/commit/f18dcec942b0063d4763100245ce501649289718)

---

### Added New Features to Euclid’s Game

- **Journaling Integration**  
  Games are now saved in the Journal with metadata and can be restored later  
  [Commit](https://github.com/Bishoywadea/Euclid-s-Game/commit/0e67b7df641c0ff89faac3206ad1cc45929081f1)

- **Multiplayer Support Across Devices**  
  Enabled players on different machines to join a shared Euclid game session  
  [Commit](https://github.com/Bishoywadea/Euclid-s-Game/commit/b3cd9de10159a67422f46f9fba4d54912b42a81e)

Multiplayer Support Across Devices [youtube: 42-uk2LwToo]

---

## Challenges & Solutions

- **Challenge:** Implementing reliable multiplayer functionality across devices within the Sugar OS ecosystem using `collabwrapper`, while ensuring compatibility with the unique networking and activity-sharing model in Sugar.

- **Solution:** Integrated Sugar’s `collabwrapper` API to manage session joining, data synchronization, and peer discovery. Adjusted the game’s state handling logic to respond to collaboration events, ensuring consistent gameplay across machines. Also performed extensive testing in simulated multi-user Sugar environments to fine-tune message broadcasting and activity resumption.


---

## Key Learnings

- Gained deeper understanding particularly how GTK, Journal, and Activity toolbars interact.

---

## Next Week’s Roadmap

- Fix any feedback provided by members of the organization.  
- Start implementing the Magic moving game.
---
