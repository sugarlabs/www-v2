---
title: "DMP '25 Week 10 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-DMP-25-AnvitaPrasad-week10"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week10,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-04 - 2025-08-10  

---

## Goals for This Week
- **Goal 1:** Implement multi-sample support for guitar and electric guitar instruments
- **Goal 2:** Expand piano multi-sample coverage with additional samples
- **Goal 3:** Establish consistent sample configuration structure across instruments
- **Goal 4:** Test audio quality and range coverage for both instruments
- **Goal 5:** Create testing framework for the respective instruments

---

## This Week's Achievements

1. **Guitar Multi-Sample Implementation**
   - Successfully created multi-sample configurations for both acoustic guitar and electric guitar with 10 samples each (A2, A4, B3, C5, D3, D4, E2, E5, F#3, F4)
   - Implemented instrument-specific sampling strategies optimized for string characteristics

2. **Enhanced Piano Coverage**
   - Expanded piano multi-sample system from basic coverage to comprehensive 13-sample configuration (A1, A2, A3, A4, A5, A6, A7, C#2, C#3, C#4, C#5, C#6, C#8) covering nearly 8 octaves

3. **Configuration Standardization**
   - Established consistent metadata structure including sample names, center notes, frequency mappings, and MIDI number associations
   - Created unified framework for multi-sample instrument integration

4. **Testing Framework Development**
   - Built comprehensive testing framework for guitar and electric guitar sample validation
   - Implemented quality assurance protocols for audio sample consistency

---

## Challenges & How I Overcame Them

- **Challenge:** Initial samples had varying bit depths and sample rates causing audio artifacts  
  **Solution:** Listened to each sample and edited them using Audacity to remove silence and normalize the samples for consistent quality

- **Challenge:** Large File Size Issues - Base64 encoded samples were causing memory issues in the browser  
  **Solution:** Optimized sample length to 2-3 seconds and implemented lazy loading patterns to load samples only when needed

---

## Key Learnings
- Gained experience with audio format conversion and optimization for JavaScript applications
- Enhanced understanding of string instrument timbre characteristics and optimal sampling strategies
- Learned importance of audio normalization and preprocessing for web-based audio applications

---

## Next Week's Roadmap
- Implement multi-sample support for wind instruments (flute, clarinet, oboe)
- Develop cello multi-sample configuration for string section representation
- Create automated testing suite for sample selection algorithm
- Optimize performance and memory usage for large multi-sample libraries
- Write week 11 blog post

---

## Resources & References
- **[Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)**
- **[Audacity Audio Editor](https://www.audacityteam.org/)**
- **Sample Sources:** [Philharmonia Orchestra](https://philharmonia.co.uk/resources/sound-samples/)
- **Additional Samples:** [Freesound MTG Collection](https://freesound.org/people/MTG/)

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

---