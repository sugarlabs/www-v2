---
title: "GSoC ’25 Week 09 Update by Bishoy Wadea"
excerpt: "Odd Scoring game"
category: "DEVELOPER NEWS"
date: "2025-08-14"
slug: "gsoc-25-BishoyWadea-week09"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week09,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Week 09 Progress Report by Bishoy Wadea

**Project:** [Odd Scoring game](https://github.com/Bishoywadea/Odd-Scoring)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-08-04 – 2025-08-14  

---

## Goals for This Week

- **Make new Sugar activity**

---

## Achievements

### Added New Sugar acivity (Odd Scoring)

- **Network Multiplayer Setup**  
  Implemented working network multiplayer and integrated game state saving into the Journal  
  [Commit](https://github.com/Bishoywadea/Odd-Scoring/commit/4138378b5a85af2417b7fb9d14c88e95e78ba85e)  

- **Render PNG Instead of Emojis**  
  Replaced emoji graphics with PNG assets for better cross-platform visual consistency  
  [Commit](https://github.com/Bishoywadea/Odd-Scoring/commit/304222ad5aea4feec96c31e14d5fb954f4555c20)  

- **Toggle Theme Feature**  
  Added ability to switch between different themes during gameplay  
  [Commit](https://github.com/Bishoywadea/Odd-Scoring/commit/cefb2bfc465202c8b6e6ee3efd7b1697214dc53e)  


Multiplayer Support Across Devices [youtube: MMVlzYffTiE]

---
## Challenges & Solutions

- **Challenge:** Ensuring smooth integration of network multiplayer while maintaining Sugar’s UI/UX standards. This included aligning window and pop-up styles with Sugar’s palette guidelines and handling state persistence across sessions.

- **Solution:**  
  - Refined UI elements to follow Sugar’s visual language, including pop-up windows and overall palette adherence.  
  - Made the shared game instance persistent to prevent state loss during gameplay transitions.  
  - Simplified multiplayer by removing the lobby flow, reducing friction for players joining sessions.  
  - Replaced emoji-based rendering with PNG assets for better visual consistency across devices.  

---

## Key Learnings

- Learned how to integrate multiplayer functionality with Sugar’s `collabwrapper` while ensuring proper state synchronization between devices.  
- Developed a better understanding of Sugar’s palette guidelines and how to adapt window designs to maintain a consistent style.  

---

## Next Week’s Roadmap

- Address any feedback provided by organization members regarding multiplayer flow, UI alignment, and performance.  
- Begin development of a new Sugar activity **Magic Number Grid** 

