---
title: "DMP '25 Week 02 Update by Anvita Prasad"
excerpt: "Improving Synth and Sample Features in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "dmp-25-AnvitaPrasad-week02"
author: "Anvita Prasad"
description: "DMP'25 Contributor at SugarLabs (Music Blocks)"
tags: "dmp25,sugarlabs,week02,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.png"
---

# Week 02 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-09 - 2025-06-15  

---

## Goals for This Week
- **Goal 1:** Design dual-mode tuner interface
- **Goal 2:** Research and prototype cents adjustment UI
- **Goal 3:** Investigate temperament systems and EDO implementations
- **Goal 4:** Implement visual feedback system for pitch detection

---

## This Week's Achievements
1. **Researched Dual-Mode Tuner Design**
   - Analyzed requirements for two proposed tuning modes:
     - Specific Target Pitch mode with fixed reference
     - Arbitrary mode with dynamic ±50 cents range detection
   - Started working on UI mockups for both modes
   - Researching effective visual feedback systems for pitch deviation

2. **Implemented Initial Cents Adjustment Feature**
   - Created basic manual cents adjustment UI
   - Exploring alternative UI approaches for better user experience
   - Studying various tuner implementations (e.g., [F-Droid's Tuner](https://f-droid.org/en/packages/de.moekadu.tuner/)) for inspiration

3. **Developed Tuner Visualization System**
   - Implemented center-outward segment lighting system
   - Left/right segments indicate flat/sharp notes respectively
   - Number of lit segments shows pitch deviation magnitude

4. **Pitch Detection System Research**
   - Studied advanced pitch detection methodologies
   - Researched FFT spectrum analysis and phase information evaluation

---

## Key Learnings
- Gained deep understanding of Equal Divisions of the Octave (EDO) systems and their implementation challenges
- Learned about various temperament systems (Equal, Just, Werckmeister, Kirnberger)
- Studied advanced audio processing techniques including FFT window optimization and spectrum phase analysis
- Researched UX patterns for precise musical instrument tuning interfaces
- Explored different approaches to visual feedback systems for micro-pitch detection

---

## Next Week's Roadmap
- Complete tuner implementation with accurate visualization
- Finalize and implement the selected cents adjustment UI design
- Write Week 03 blog post summarizing progress and learnings

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

---

## Connect with Me
- GitHub: [@AnvitaPrasad](https://github.com/AnvitaPrasad)
- Email: [anvita.prasad1@gmail.com](mailto:anvita.prasad1@gmail.com)
- LinkedIn: [Anvita Prasad](https://www.linkedin.com/in/anvita-prasad)
- Matrix: [@anvita:matrix.org](https://matrix.to/#/@anvita:matrix.org) 