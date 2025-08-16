---
title: "DMP '25 Week 08 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-DMP-25-AnvitaPrasad-week08"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week08,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-21 - 2025-07-27  

---

## Goals for This Week
- **Goal 1:** Design and implement multi-sample piano system with register-based sampling
- **Goal 2:** Develop intelligent sample selection logic based on MIDI note ranges
- **Goal 3:** Create comprehensive testing framework to validate multi-sample functionality

---

## This Week's Achievements

1. **Multi-Sample Piano System Implementation**
   - Created comprehensive piano_multi.js file with C1-C8 sample placeholders
   - Successfully integrated multi-sample system into Music Blocks' audio synthesis
   - Implemented intelligent sample selection covering full piano range

2. **Core System Architecture Development**
   - Enhanced synthutils.js with MULTIPITCH configuration for piano registers
   - Modified createSampleSynth method to handle multi-sample instruments
   - Updated samplesManifest and SOUNDSAMPLESDEFINES for seamless integration

3. **Intelligent Sample Selection Logic**
   - Implemented MIDI note range boundaries for optimal sample selection
   - C1 sample covers notes up to B1 (MIDI 0-35)
   - C2 sample covers notes up to B2 (MIDI 36-47)
   - C3 sample covers notes up to B3 (MIDI 48-59)
   - And so on up to C8 for highest octave

4. **Testing and Validation Framework**
   - Developed verifyPianoMultiSamples() function for sample integrity validation
   - Created piano-multi-direct-test.js for comprehensive console testing
   - Built multiple HTML test files for different testing scenarios

---

## Challenges & How I Overcame Them

- **Challenge:** Ensuring proper sample loading and preventing crashes during multi-sample initialization  
  **Solution:** Implemented robust error checking and added comprehensive logging to track sample loading process

- **Challenge:** Implementing precise MIDI note range calculations for optimal sample selection  
  **Solution:** Developed systematic boundary logic with extensive testing to verify correct sample mapping

- **Challenge:** Finding high-quality audio samples for different articulations 
  **Solution:** Still actively searching for better solutions to ensure consistent sound quality across all samples

---

## Key Learnings
- Gained deep understanding of Tone.js Sampler implementation for multi-sample instruments
- Discovered importance of proper sample format consistency across different instrument types
- Enhanced knowledge of MIDI note range calculations and their impact on audio quality

---

## Next Week's Roadmap
- Extend multi-sample system to additional instruments (violin, cello, etc.)
- Implement advanced sample selection algorithms for better timbre matching
- Develop user interface for sample management and customization
- Write Week 09 blog post summarizing progress and learnings

---

## Resources & References
- **Pull Request:** [Initial multi-sample implementation](https://github.com/sugarlabs/musicblocks/pull/4738)
- **Audio Synthesis:** [Tone.js Sampler Documentation](https://tonejs.github.io/docs/14.7.77/Sampler)
- **MIDI Standards:** [MIDI Note Numbers and Frequencies](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
- **Sample Management:** Referenced existing Music Blocks sample handling patterns for consistency

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

---
