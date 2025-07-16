---
title: "DMP '25 Week 06 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-DMP-25-AnvitaPrasad-week06"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week06,AnvitaPrasad,midterm"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-07 - 2025-07-13  

---

## Goals for This Week
- **Goal 1:** Implement manual cent adjustment functionality in the sampler widget
- **Goal 2:** Ensure cent adjustments persist when saving samples
- **Goal 3:** Research methods for manual cent adjustment implementation
- **Goal 4:** Collect SVG icons for the set instrument widget
- **Goal 5:** Design basic categorization system for samples

---

## This Week's Achievements

1. **Cent Adjustment Persistence Implementation**
   - Extended the CUSTOMSAMPLES array to include cent adjustment values
   - Modified _addSample function to maintain backward compatibility
   - Updated __save function to include cent adjustment in block properties
   - Enhanced _updateBlocks to display cent adjustments in block text (e.g., "C4 +10¢")

2. **Playback Rate Calculation System**
   - Implemented the mathematical formula for converting cents to playback rate
   - Applied consistent calculation throughout the codebase (playbackRate = Math.pow(2, cents/1200))
   - Ensured accurate pitch modification across all sample playback scenarios

3. **Synth Integration**
   - Modified _createSampleSynth function to store cent adjustments with samples
   - Updated trigger function to apply adjustments to playback rate during sample playback
   - Created framework for real-time pitch modification during performance

4. **Instrument Organization and Visualization**
   - Collected SVG icons for each instrument and instrument family
   - Designed a hierarchical structure to better organize the set instruments widget
   - Created a more intuitive categorization system for instrument selection
   - Improved visual navigation through instrument families

---

## Challenges & How I Overcame Them

- **Challenge:** Persisting Cent Adjustment Information  
  **Solution:** In the previous week, I had implemented cent adjustments by modifying the playback rate in real-time, but this information wasn't being stored with the sample. This meant that when a user saved a sample after making cent adjustments, the adjustments were lost, creating inconsistency in musical compositions. I researched two main approaches: storing notes as floating-point MIDI values (e.g., 60.1 for C4+10¢) or storing integer MIDI notes and cent adjustments separately. I chose the second approach for better compatibility with Music Blocks' existing codebase, clearer data representation, and easier UI integration. I'm still testing this implementation to ensure it works correctly across all use cases.

- **Challenge:** Modifying the Sample Data Structure  
  **Solution:** I carefully extended the CUSTOMSAMPLES array to include the cent adjustment value while ensuring backward compatibility. This required precise modifications to several core functions that interact with the sample data structure.

---

## Key Learnings
- Audio Processing Fundamentals: Deepened understanding of how cent adjustments affect pitch perception and the mathematical relationship between cents and playback rate.
- Data Persistence Strategies: Learned different approaches to storing and retrieving fine-grained musical parameters, and the trade-offs between integrated vs. separate storage models
- DOM Manipulation for Audio UI: Gained experience creating responsive audio controls that provide visual feedback while manipulating sound parameters in real-time
- Code Refactoring Best Practices: Developed skills in modifying existing functionality while maintaining backward compatibility, especially in a complex music programming environment
- Tone.js Audio API: Enhanced understanding of Tone.js's Sampler implementation and how to manipulate playback parameters like playback rate for pitch adjustments

---

## Midterm Evaluation Summary (Weeks 01–06)

Over the past six weeks, I've made significant progress on improving Music Blocks' synth and sample features, focusing on enhancing the tuning system and implementing micro-pitch adjustments. I've successfully completed the development of a comprehensive dual-mode tuner system that provides precise pitch feedback and visualization. Additionally, I've implemented a manual cent adjustment feature that allows for microtonality exploration and fine-tuning of samples. These enhancements significantly expand Music Blocks' capabilities for musical education, enabling students to explore pitch relationships beyond standard Western tuning systems and providing educators with powerful tools for teaching advanced musical concepts.

### Technical Achievements

1. **Audio Foundation Improvements**
   - Updated Tone.js library from version 15.0.4 to 15.1.22
   - Integrated YIN algorithm for accurate pitch detection
   - Implemented low-pass filtering to handle high-frequency noise
   - Enhanced pitch detection accuracy using parabolic interpolation

2. **Tuner System Development**
   - Created comprehensive dual-mode tuner interface:
     - Chromatic mode that automatically finds closest pitch
     - Target pitch mode with fixed reference point
   - Implemented 11-segment visualization system with center-outward lighting
   - Added clear visual feedback for cent deviation
   - Designed mode-specific icons and toggle interface

3. **Cent Adjustment System**
   - Evolved from initial pie menu design to more efficient slider interface
   - Implemented ±50 cents range adjustment capability
   - Created framework for real-time pitch modification
   - Developed system to store and apply cent adjustments to samples
   - Extended data structures to maintain cent adjustment information

4. **Integration and Testing**
   - Conducted extensive testing with various audio sources
   - Created test suite for tuner accuracy verification
   - Optimized signal processing for better performance
   - Ensured backward compatibility throughout implementation

### Educational and Creative Impact

These improvements significantly enhance Music Blocks' capabilities for musical education and exploration:

- **Microtonality Access**: Students can now explore pitches between standard Western notes, opening doors to world music traditions and experimental composition
- **Improved Accuracy**: The enhanced tuner provides precise feedback for instrument tuning and vocal training
- **Educational Value**: Visual feedback systems help students understand pitch relationships and develop better ear training
- **Creative Possibilities**: Cent adjustments enable more expressive performances and composition with subtle pitch variations

### Final Thoughts

The first half of this project has established a solid foundation for Music Blocks' enhanced audio capabilities. The dual-mode tuner and cent adjustment systems provide both technical accuracy and user-friendly interfaces for students and educators. These features have significantly expanded Music Blocks' capacity for musical exploration beyond standard Western tuning. Moving forward, I'll focus on sample organization and multiple sample functionality to further enhance the expressiveness and educational value of the platform.

---

## Next Week's Roadmap
- Implement the basic categorization system for samples
- Process free/open samples from identified sources
- Work on handling multiple samples
- Test the manual cent adjustment feature and finalise the approach
- Write Week 07 blog post summarizing progress and learnings

---

## Resources & References
- **Audio Processing:** [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Cent Calculation:** [Cents to Frequency Ratio Calculator](https://www.sengpielaudio.com/calculator-centsratio.htm)
- **Musical Tuning:** [Musical Acoustics - Cents and Frequency Ratios](https://newt.phys.unsw.edu.au/jw/notes.html)
- **Tone.js Documentation:** [Tone.js Sampler](https://tonejs.github.io/docs/14.7.77/Sampler)
- **Audio Sample Processing:** [Microtonality in Digital Audio Workstations](https://www.researchgate.net/publication/327567188_Microtonality_and_the_DAW_A_Design_Study)

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

--- 