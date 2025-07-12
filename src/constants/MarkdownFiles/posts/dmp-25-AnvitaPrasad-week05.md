---
title: "DMP '25 Week 05 Update by Anvita Prasad"
excerpt: "Implementation of manual cent adjustment interface and mode-specific icons for the tuner system"
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-DMP-25-AnvitaPrasad-week05"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week05,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-30 - 2025-07-06  

---

## Goals for This Week
- **Goal 1:** Design and implement a slider for manual cent adjustment
- **Goal 2:** Develop functionality for cent adjustment system
- **Goal 3:** Design and implement mode-specific icons for the tuner interface


---

## This Week's Achievements

1. **Mode-Specific Icon Design and Implementation**
   - Created distinctive icons for both tuning modes
   - Successfully integrated icons into the tuner interface
   - Ensured visual consistency with existing Music Blocks design language

2. **Manual Cent Adjustment Interface Redesign**
   - Transitioned from pie menu to slider-based interface
   - Implemented basic slider UI for cent adjustment
   - Designed interface to accommodate ±50 cents range
   - Optimized for both recorded and uploaded samples through the sampler

3. **Cent Adjustment System Development**
   - Implementing core functionality for precise pitch adjustment
   - Developed system to handle cent adjustments within ±50 range
   - Created framework for real-time pitch modification

4. **Integration and Testing**
   - Successfully integrated new components with existing tuner system
   - Conducted initial testing of slider functionality
   - Verified icon visibility and clarity in different modes

---

## Challenges & How I Overcame Them

- **Challenge:** Maintaining precise control over cent adjustments while ensuring smooth slider operation
- **Solution:** Implemented a custom scaling algorithm and added intermediate value snapping for better control


---

## Key Learnings
- Gained deeper understanding of real-time audio processing in web applications
- Discovered best practices for handling micro-pitch adjustments in digital audio systems
- Enhanced knowledge of Web Audio API's capabilities and limitations

---

## Next Week's Roadmap
- Conduct extensive testing with various audio sources and instruments
- Process free/open samples from identified sources
- Design basic categorization system for samples
- Write Week 06 blog post summarizing progress and learnings

---

## Resources & References
- **Audio Processing:** [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Cent Calculation:** [Cents to Frequency Ratio Calculator](https://www.sengpielaudio.com/calculator-centsratio.htm)
- **Musical Tuning:** [Musical Acoustics - Cents and Frequency Ratios](https://newt.phys.unsw.edu.au/jw/notes.html)
- **UI Components:** Referenced existing Music Blocks slider implementations for consistency

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

--- 