---
title: "DMP '25 Week 12 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-24"
slug: "2025-08-24-DMP-25-AnvitaPrasad-week12"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week12,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-18 - 2025-08-24  

---

## Goals for This Week
- **Goal 1:** Implement multi-sample support for remaining instruments (clarinet, oboe, viola)
- **Goal 2:** Implement comprehensive volume normalization system across all instruments
- **Goal 3:** Finalize multi-sample implementation for complete instrument coverage
- **Goal 4:** Ensure consistent audio levels across all multi-sample instruments

---

## This Week's Achievements

1. **Clarinet Multi-Sample System**
   - Successfully implemented 9-sample clarinet configuration (A3, A6, B5, B6, D4, E3, E6, F#5, G4) with register-specific timbral characteristics

2. **Oboe Implementation**
   - Created 8-sample oboe configuration (A5, A6, B3, C5, D4, D6, F5, G4) capturing the instrument's distinctive nasal timbre and dynamic range

3. **Viola Multi-Sample System**
   - Implemented 5-sample viola configuration (A4, C3, C7, D4, E5, G3) with emphasis on the instrument's darker, warmer tone compared to violin

4. **Advanced Volume Normalization**
   - Developed sophisticated pre-processing volume normalization system with RMS analysis and automatic level matching to 1.0 standard Music Blocks volume

5. **Cross-Instrument Consistency**
   - Standardized targetVolume across all 8 multi-sample instruments, ensuring consistent playback levels

---

## Challenges & How I Overcame Them

- **Challenge:** Volume Inconsistency Across Instruments - Each instrument required different multiplier for volume normalization  
  **Solution:** Developed instrument-specific volume normalization algorithms with RMS analysis to achieve consistent 1.0 standard across all instruments

---

## Key Learnings
- Advanced understanding of audio normalization techniques and RMS analysis
- Enhanced knowledge of woodwind and string instrument characteristics
- Gained experience in creating comprehensive audio processing pipelines for web applications
- Learned importance of consistent volume standards in multi-instrument systems

---

## Next Week's Roadmap
- Complete project documentation and user guides
- Conduct final testing across all implemented instruments
- Prepare comprehensive project summary and future enhancement recommendations
- Submit final deliverables and project wrap-up

---

## Resources & References
- **[Web Audio API Performance Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)**
- **[RMS Analysis and Audio Normalization Techniques](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)**
- **Sample Sources:** [Philharmonia Orchestra](https://philharmonia.co.uk/resources/sound-samples/)
- **Additional Samples:** [Freesound MTG Collection](https://freesound.org/people/MTG/)

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

---