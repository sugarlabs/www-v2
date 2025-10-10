---
title: "DMP '25 Week 11 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-17"
slug: "2025-08-17-DMP-25-AnvitaPrasad-week11"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week11,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-11 - 2025-08-17  

---

## Goals for This Week
- **Goal 1:** Implement multi-sample support for flute with comprehensive range coverage
- **Goal 2:** Create cello multi-sample system for orchestral string representation
- **Goal 3:** Refactor codebase architecture by moving sampling logic from synthutils.js to individual sample files

---

## This Week's Achievements

1. **Flute Multi-Sample System**
   - Implemented comprehensive 11-sample flute configuration (A5, B4, B6, C4, C6, D5, D7, E4, E6, F5, G4, G6) covering nearly 4 octaves with optimized breath articulation

2. **Cello Implementation**
   - Created 4-sample cello configuration (A3, C2, D3, G2) focusing on string resonance and bow articulation characteristics

3. **Major Architecture Refactoring**
   - Successfully moved sampling logic from centralized synthutils.js to individual instrument sample files (piano_multi.js, guitar_multi.js, etc.)
   - Implemented modular sample selection functions that account for unique timbral characteristics

4. **Enhanced Code Structure**
   - Established instrument-specific sample selection functions
   - Created maintainable and extensible codebase architecture

---

## Challenges & How I Overcame Them

- **Challenge:** Code Refactoring Complexity - Moving logic from synthutils.js while maintaining backward compatibility  
  **Solution:** Implemented gradual migration strategy with wrapper functions and extensive testing to ensure no functionality was broken

- **Challenge:** Finding high-quality samples with varying bit depths and sample rates causing audio artifacts  
  **Solution:** Listened to each sample and edited them using Audacity to remove silence and normalize the samples for consistent quality

---

## Key Learnings
- Lazy loading patterns are crucial for web applications with large audio assets
- Enhanced understanding of wind and string instrument characteristics and their unique sampling requirements
- Gained experience in large-scale code refactoring while maintaining system stability

---

## Next Week's Roadmap
- Complete final week with remaining instruments (clarinet, oboe, viola)
- Implement volume normalization system across all multi-sample instruments
- Create/update unit tests for all instrument implementations
- Develop user documentation and integration guides
- Plan future extensibility features for custom sample uploads

---

## Resources & References
- **[Web Audio API Performance Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)**
- **Sample Sources:** [Philharmonia Orchestra](https://philharmonia.co.uk/resources/sound-samples/)
- **Additional Samples:** [Freesound MTG Collection](https://freesound.org/people/MTG/)

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

---