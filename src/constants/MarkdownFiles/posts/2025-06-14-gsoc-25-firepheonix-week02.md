---
title: "GSoC '25 Week 2 Update by Shubham Singh"
excerpt: "Adding the entire prototyped interface ON TO the music blocks"
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-firepheonix-week02"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week02
  - firepheonix
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-08 – 2025-06-15  

---

## Goals for This Week

- Basic UI for Image Upload/Real-time Video upload and adjustment.
- Integrating the developed UIs onto the widget blocks within Music Blocks.
- Researching existing audio integration patterns in the phrase maker and note blocks.

---

## This Week's Achievements

1. **Interface Implementation for Lego Notations**  
   - Successfully integrated the LegoBricks block directly onto the Music Blocks canvas.
   - Modified 6 different files to implement an entirely new block type.
   - Music Blocks already has sophisticated color detection for internal pixels, but couldn't detect colors from external sources like uploaded images or webcam feeds — this limitation was addressed.
   - The codebase proved beautifully encapsulated and thoroughly documented, making the learning curve smoother.
        ![Interface Implementation](https://i.ibb.co/d0X9zXjF/1st.png)

2. **Real-time Video Integration**  
   - Implemented real-time video functionality through webcam integration.
   - Added full editing capabilities and canvas manipulation for live video feeds.
   - Interface provides seamless interaction between video feed and detection algorithms.
        ![Real-time Video Feature](https://i.ibb.co/cXL4Hpxq/2nd.png)

3. **Export Mechanism Research**  
   - Conducted extensive research into existing export mechanisms within Music Blocks.
   - Deep-dived into Phrase Maker widget documentation and codebase.
   - Studied how different blocks export output as both MIDI files and action blocks.
        ![Export Research](https://i.ibb.co/bVD8Z54/image.png)

---

## Challenges & How I Overcame Them

- **Challenge:** UI integration complexity — getting the UI integrated into Music Blocks proved more challenging than expected due to intricate dependencies and specific implementation patterns required by the block system.
**Solution:** Leveraged multiple resources including mentor consultations, existing documentation on "how to add new blocks," and analyzed previous implementations for reference patterns.

- **Challenge:** User workflow design — determining optimal user workflow for the Lego Bricks block required careful consideration of user interaction patterns and integration with existing functionality.
**Solution:** Scheduled focused discussion with mentor during regular meeting to analyze phrase maker export functionality, gaining crucial insights into user experience patterns and technical approaches.

---

## Key Learnings

- Gained comprehensive understanding of **output mechanisms** and how different blocks handle their output generation and processing.
- Deepened appreciation for **code architecture** including inheritance patterns, code modularity, and custom return types within the Music Blocks ecosystem.
- Improved skills in **development workflow** including exports, imports, code reusability, documentation practices, and collaborative development workflows.

---

## Next Week's Roadmap

- Implement comprehensive mapping of musical notes to Lego brick colors.
- Complete the core implementation during weeks 2 and 3, ensuring robust functionality and thorough testing.
- Focus on algorithmic challenges for note-to-color mapping system.

---

## Resources & References

- **Project Issue:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)
- **Music Blocks Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **Documentation:** Music Blocks Developer Guide

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special thanks to Walter for his advice during our biweekly meeting on how the phrase maker exports output as ACTION blocks.

---