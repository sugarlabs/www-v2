---
title: "DMP '25 Week 04 Update by Anvita Prasad"
excerpt: "Completion of target pitch mode and implementation of manual cent adjustments pie menu"
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-DMP-25-AnvitaPrasad-week04"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week04,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-23 - 2025-06-29  

---

## Goals for This Week
- Complete and refine target pitch mode implementation
- Implement manual cent adjustment functionality and interface
- Research icons for chromatic and target pitch mode
- Conduct comprehensive testing with various audio sources and instruments
- Research different tuning systems

---

## This Week's Achievements

1. **Dual-Mode Tuner Implementation**
   - Completed target pitch mode implementation with enhanced functionality
   - Integrated target pitch selector with pie menu interface
   - Implemented logic for precise pitch matching and deviation calculation
   - Added comprehensive display for octave, semitone, and cent deviations
   - Gathered and incorporated feedback for interface refinements

![](assets/Images/tuner-interface-week4.webp)

2. **Manual Cents Adjustment Development**
   - Designed and implemented an intuitive pie menu for cent adjustments with:
     - Center Area (Controls):
       * Grey circular area with three buttons
       * "+" button for positive values
       * "-" button for negative values
       * "×" button for menu exit
     - Inner Wheel (Fine Adjustments): Numbers 1-10
     - Middle Wheel (Medium Adjustments): Numbers 20-50
     - Outer Wheel (Large Adjustments): Numbers 60-100

3. **Testing Progress**
   - Conducted initial testing with various audio sources
   - Identified areas for improvement in pitch detection
   - Created a test suite for tuner accuracy verification

---

## Challenges & How I Overcame Them

- **Challenge 1: Event Bubbling in Pie Menu**  
  The pie menu's nested event listeners for note, accidental, and octave selection were triggering multiple unintended actions due to incorrect event propagation.  
  **Solution 1:**  
  Added event.stopPropagation() at the appropriate event handlers and restructured the event listener hierarchy to ensure events were captured at the correct level only.

- **Challenge 2: State Management Complexity**  
  Managing three interdependent states (note, accidental, octave) in the tuner widget led to synchronization issues and undefined states during updates.  
  **Solution 2:**  
  Implemented a centralized state update method that handles all three components atomically and validates the complete state before triggering any dependent calculations.

---

## Key Learnings

- Gained deep understanding of Music Blocks' pitch pie menu interface and its implementation patterns
- Learned about various tuning systems including Equal Temperament, Pythagorean, and Just Intonation

---

## Next Week's Roadmap

- Implement fully functional tuner with comprehensive features
- Complete and refine manual cent adjustment functionality
- Conduct extensive testing with various audio sources and instruments
- Consider implementation of different tuning systems
- Make fine refinements to tuner interface and functionality
- Write blog post for Week 05

---

## Resources & References

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Different Tuning Systems](https://www.musiccrashcourses.com/lessons/tuning_systems.html)
- [Tuning Systems and Equal Temperament](https://www.earmaster.com/music-theory-online/ch06/chapter-6-2.html)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support and valuable feedback on the new features.

--- 