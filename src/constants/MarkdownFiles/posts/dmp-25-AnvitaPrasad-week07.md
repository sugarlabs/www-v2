---
title: "DMP '25 Week 07 Update by Anvita Prasad"
excerpt: "Improve Synth and Sample Feature for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-DMP-25-AnvitaPrasad-week07"
author: "@/constants/MarkdownFiles/authors/anvita-prasad.md"
tags: "dmp25,sugarlabs,week07,AnvitaPrasad"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Anvita Prasad

**Project:** [Music Blocks - Improve Synth and Sample Features](https://github.com/sugarlabs/musicblocks/issues/4539)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-14 - 2025-07-20  

---

## Goals for This Week
- **Goal 1:** Research and document comprehensive sampling strategy for instruments
- **Goal 2:** Begin sample collection and quality assessment process
- **Goal 3:** Begin implementing multiple sample functionality starting with piano
- **Goal 4:** Create draft PR for tuner implementation

---

## This Week's Achievements

1. **Comprehensive Sampling Strategy Research**
   - Conducted in-depth analysis of acoustic properties and sampling requirements:
     
     **Piano - Multiple Register Sampling**
     - Analyzed acoustic reality across registers:
       - Low notes (C2-C3): Thick steel strings with copper winding, large felt hammers
       - Middle notes (C4-C5): Plain steel strings, medium hammers
       - High notes (C6-C7): Thin steel strings, small light hammers
     - Documented why transposition fails:
       - Upward transposition (e.g., C2 → C4) creates thin, metallic sound
       - Downward transposition (e.g., C6 → C4) results in muddy, artificial sound
     - Recommended sampling structure:
       ```javascript
       "piano": {
           "C2": { "staccato": "...", "legato": "..." },  // Bass register
           "C3": { "staccato": "...", "legato": "..." },  // Lower middle
           "C4": { "staccato": "...", "legato": "..." },  // Middle C
           "C5": { "staccato": "...", "legato": "..." },  // Upper middle
           "C6": { "staccato": "...", "legato": "..." }   // Treble register
       }
       // 10 samples total
       ```

     **Flute - Register-Based Approach**
     - Mapped register characteristics:
       - Low (C4-F4): Breathy, weak tone
       - Middle (G4-C6): Clear, characteristic sound
       - High (D6-C7): Bright, piercing quality
     - Different embouchure techniques affect overtone series
     - Recommended sampling structure:
       ```javascript
       "flute": {
           "low": { "D4": { "staccato": "...", "legato": "..." } },    // Breathy
           "middle": { "G4": { "staccato": "...", "legato": "..." } }, // Clear
           "high": { "C6": { "staccato": "...", "legato": "..." } }    // Bright
       }
       // 6 samples total
       ```

     **Violin - String-Specific Sampling**
     - Analyzed individual string characteristics:
       - G string (G3): Warm, rich, slightly nasal
       - D string (D4): Balanced, clear tone
       - A string (A4): Bright, focused sound
       - E string (E5): Brilliant, potentially harsh
     - Documented playing techniques (arco/pizzicato)
     - Note: Articulations (staccato/legato) can be simulated within each technique
     - Recommended sampling structure:
       ```javascript
       "violin": {
           "G_string": { "G3": { "arco": "...", "pizzicato": "..." } },
           "D_string": { "D4": { "arco": "...", "pizzicato": "..." } },
           "A_string": { "A4": { "arco": "...", "pizzicato": "..." } },
           "E_string": { "E5": { "arco": "...", "pizzicato": "..." } }
       }
       // 8 samples total
       ```

     **Trumpet - Harmonic Series Based**
     - Leverages natural harmonic series principles
     - Consistent timbre across range due to uniform bore
     - Natural acoustics support pitch shifting
     - Recommended sampling structure:
       ```javascript
       "trumpet": {
           "Bb3": { "open": "...", "muted": "..." },
           "Bb4": { "open": "...", "muted": "..." }
       }
       // 4 samples total
       ```

     **Drums - Individual Sampling**
     - Each drum requires individual sampling
     - No transposition possible due to fixed acoustic properties
     - Separate samples needed for different playing techniques
     - Recommended sampling structure:
       ```javascript
       "drums": {
           "kick": { "hit": "kick.wav" },
           "snare": { "hit": "snare.wav", "rim": "rim.wav" },
           "hihat": { "closed": "hihat_closed.wav", "open": "hihat_open.wav" }
       }
       // Each drum needs individual samples
       ```

   Detailed specifications and complete analysis available in the [Comprehensive Sampling Strategy Document](https://docs.google.com/document/d/1VoRCEq9SgVe22Q5nvP-9_-R-R3cKR7hfvBHKa3VBFM8/edit?usp=sharing).

2. **Sample Collection Progress**
   - Started collecting samples for all instrument categories
   - Established quality criteria for sample selection
   - Set up framework for sample organization and naming conventions
   - Created systematic approach for sample categorization

3. **Implementation Initiation**
   - Began implementation with piano as proof of concept
   - Designed data structure for multiple sample storage
   - Started developing sample loading and management system
   - Created framework for handling different articulations

4. **Tuner Implementation Progress**
   - Created draft PR for tuner and manual cent adjustment features
   - Resolved UI alignment issues in maximized window state
   - PR: [#4725](https://github.com/sugarlabs/musicblocks/pull/4725)

---

## Challenges & How I Overcame Them

- **Challenge:** Post-Rebase Integration Issues  
  **Solution:** After rebasing with upstream/master, the toolbar search completely stopped working. I traced the root cause to disrupted jQuery script loading order during conflict resolution. Fixed the issue by restoring the correct script dependency order in index.html:
  ```html
  <script src="lib/jquery-2.1.4.min.js"></script>
  <script src="lib/jquery-ui.js" defer></script>
  ```
  This experience highlighted the importance of carefully reviewing dependency relationships during rebase operations.

- **Challenge:** Sample Collection and Quality Management  
  **Solution:** Faced significant challenges in finding high-quality samples with consistent recording techniques, especially for specialized articulations like staccato piano notes. I developed a systematic approach by:
  1. Creating clear criteria for sample selection
  2. Documenting required articulations per instrument
  3. Establishing minimum recording quality standards
  4. Setting up a consistent naming and organization system

---

## Key Learnings
- Sample Management Strategy: Learned to analyze instrument-specific sampling requirements based on acoustic properties
- Progressive Loading: Learned about strategies to optimize memory usage by loading samples only for instruments currently in use, which will be crucial for performance optimization

---

## Next Week's Roadmap
- Continue implementing multiple sample functionality
- Search, collect, and clean up samples for different instruments
- Test and refine implementation
- Write Week 08 blog post summarizing progress and learnings

---

## Resources & References
- **Documentation:** [Comprehensive Sampling Strategy Document](https://docs.google.com/document/d/1VoRCEq9SgVe22Q5nvP-9_-R-R3cKR7hfvBHKa3VBFM8/edit?usp=sharing)
- **Pull Request:** [Implemented tuner and manual cent adjustment in sampler widget](https://github.com/sugarlabs/musicblocks/pull/4725)
- **Sample Sources:**
  - [MTG Freesound Collection](https://freesound.org/people/MTG/)
  - [Freesound Harmonium Samples](https://freesound.org/search/?q=harmonium)
  - [Freesound Percussion Collection](https://freesound.org/search/?q=cowbell)
  - [Sonic Pi Sample Repository](https://github.com/sonic-pi-net/sonic-pi/tree/dev/etc/samples/perc)
  - [Philharmonia Orchestra Sound Samples](https://philharmonia.co.uk/resources/sound-samples/)
- **Audio Processing:** [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Performance:** [Progressive Loading Techniques for Audio Applications](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Loading)

---

## Acknowledgments
Thank you to my mentors, the Sugar Labs community, and fellow contributors for ongoing support.

--- 