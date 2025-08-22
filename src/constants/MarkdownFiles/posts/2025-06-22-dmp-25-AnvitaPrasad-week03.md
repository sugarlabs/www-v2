---
title: "DMP '25 Week 03 Update by Anvita Prasad"
excerpt: "Implementation of tuner visualization system and dual-mode interface"
category: "DEVELOPER NEWS"
date: "2025-06-22"
slug: "2025-06-22-DMP-25-AnvitaPrasad-week03"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week03,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-16 - 2025-06-22  

---

## Goals for This Week
- **Goal 1:** Implement dual-mode tuner interface
- **Goal 2:** Complete basic cents adjustment UI implementation
- **Goal 3:** Enhance tuner visualization system
- **Goal 4:** Test with various audio sources and instruments

---

## This Week's Achievements

1. **Dual-Mode Tuner Implementation**
   - Successfully implemented a toggle button interface for switching between two tuner modes
   - Developed chromatic mode where target pitch moves based on input pitch
   - Implemented logic for finding closest chromatic pitch within +/- 50 cents
   - Added cent deviation value display under the tuner
   - Started work on specific target pitch mode implementation
   - Gathered feedback for further refinements

2. **Cents Adjustment UI Development**
   - Implemented basic cents adjustment interface

3. **Tuner Visualization Enhancements**
   - Made refinements to last week's visualization system
   - Added clear visual feedback for cent deviation
   - Enhanced visual clarity for pitch detection feedback

4. **Testing Progress**
   - Conducted initial testing with various audio sources
   - Identified areas for improvement in pitch detection
   - Created a test suite for tuner accuracy verification

5. **Audio Processing Improvements**
   - Implemented low-pass filtering to handle high-frequency noise
   - Enhanced pitch detection accuracy using parabolic interpolation
   - Optimized signal processing for better performance

---

## Challenges & How I Overcame Them

- **Challenge:** Creating an intuitive UI for mode switching
  **Solution:** Implemented a clear toggle interface with visual indicators for current mode

- **Challenge:** Dealing with high-frequency noise in audio signal
  **Solution:** Implemented low-pass filtering to improve signal quality and enhance pitch detection accuracy

---

## Key Learnings

- Learned about signal processing techniques like low-pass filtering and its impact on audio quality
- Gained insights into sub-cent accuracy through parabolic interpolation in pitch detection

---

## Next Week's Roadmap

- Complete and refine target pitch mode implementation
- Implement manual cent adjustment functionality
- Finalize design for cent adjustment interface
- Conduct comprehensive testing with various audio sources and instruments
- Deliverable: Fully functional tuner with cents adjustment

---

## Resources & References

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Audio Filters Guide](https://blog.native-instruments.com/audio-filters-guide/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support. 

--- 