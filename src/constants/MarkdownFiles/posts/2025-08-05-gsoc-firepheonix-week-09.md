---
title: "GSoC '25 Week 09 Update by Shubham Singh"
excerpt: "Successfully implemented action block export functionality."
category: "DEVELOPER NEWS"
date: "2025-08-05"
slug: "2025-08-05-gsoc-25-firepheonix-week09"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week09
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-28 – 2025-08-05

---

## Goals for This Week

- Build the action block output.
- Generate note blocks with their corresponding note values and pitches for a given phrase, based on the LEGO brick input.

---

## This Week's Achievements

1. **Implemented the correct audio output when LEGO bricks pattern was played.**  
   - Successfully integrated the LEGO brick pattern recognition with Music Blocks' audio engine.
   - The LegoBricks widget now accurately reads brick patterns and translates them into musical sequences.
   - Implemented proper timing synchronization to ensure notes play at the correct intervals based on brick positioning.
   - Added support for multiple note types (quarter notes, half notes, whole notes) based on brick spacing and arrangement.
   - Tested the audio output with various brick configurations to ensure consistent musical interpretation.

2. **Export as action blocks now working**  
   - Developed a complete export mechanism that converts LEGO brick patterns into Music Blocks action blocks.
   - The system now mimics the phrase maker's column-based approach, where each column represents a specific duration.
   - Implemented column width detection to accurately determine note durations from brick spacing.
   - Added proper metadata handling to ensure exported action blocks maintain all necessary musical information.
   - Created a seamless integration between the visual brick interface and Music Blocks' internal action block structure.
   - The exported action blocks can now be imported and used in other Music Blocks projects, maintaining full compatibility.

   ![Action block export](/assets/Developers/Shubham_Singh/action-block-export-lego.webp)

3. **Attended and demonstrated with webcam on live meet**  
   - Participated in the weekly GSoC/DMP/SSoC progress showcase meeting with all participating students.
   - Successfully demonstrated the LEGO blocks project using a live 4K webcam feed, showing real-time brick detection and music generation.
   - Received positive feedback from mentors and fellow students on the project's innovative approach to music education.
   - Showcased the system's ability to detect different colored bricks and translate them into musical notes in real-time.

---

## Challenges & How I Overcame Them

- **Challenge:** Implementing accurate column division for action block export was extremely complex. The system needed to divide the entire image into precise columns that would correctly map to musical durations, similar to how the phrase maker operates.
  **Solution:** Developed a mathematical algorithm that analyzes brick spacing and calculates optimal column boundaries. Used multiple iterations of testing with different brick arrangements to refine the column detection logic. Researched Music Blocks' phrase maker source code to understand the exact formatting requirements for action blocks.

- **Challenge:** Ensuring cross-platform compatibility for webcam integration and real-time brick detection across different operating systems and camera specifications.
  **Solution:** Implemented adaptive camera settings that automatically adjust to different webcam capabilities. Added fallback mechanisms for lower-resolution cameras and tested extensively on various hardware configurations.

---

## Key Learnings

- **Modular Problem-Solving Approach:** Breaking complex problems into smaller, manageable components creates a clear development pipeline. This approach provided much better clarity when implementing the action block export functionality, as each module could be tested and refined independently.
- **Cross-Platform Pixel Density Considerations:** Different monitor sizes and resolutions significantly impact pixel-based calculations. However, this variance becomes negligible when using relative units (vh, vw, %, em) instead of hardcoded pixel values. This insight was crucial for ensuring consistent brick detection across different devices.

---

## Next Week's Roadmap

- Make the color detection and output more accurate.
- Deal with issue related to block length detection errors.
- Develop user documentation and tutorial materials for the LEGO blocks widget.

---

## Resources & References

- **Music Blocks Documentation:** https://github.com/sugarlabs/musicblocks/tree/master/documentation
- **LEGO Blocks Notation System Video:** https://youtu.be/LOfrCPf3XJU?feature=shared
- **Devin's CMK'24 Blog:** https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c
- **Music Blocks Phrase Maker Source Code:** Referenced for action block formatting standards

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special appreciation for their feedback during the live demonstration and their continued support in refining the project's technical implementation.

---