---
title: "GSoC '25 Week 11 Update by Shubham Singh"
excerpt: "Added SVGs, more instruments, auto arrange method in LegoBricks widget."
category: "DEVELOPER NEWS"
date: "2025-08-21"
slug: "2025-08-21-gsoc-25-firepheonix-week11"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week11
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-08-15 – 2025-08-21

---

## Goals for This Week

- Add support for other instruments
- Add new SVGs for Image and Webcam
- Auto arrange the pitches according to their order just like in the phrase maker.

---

## This Week's Achievements

1. **Added SVGs Corresponding to Camera Image and Live Webcam**   
    - Created custom SVG icons for the camera and webcam functionality using Figma, ensuring they match the existing Music Blocks design standards.
    - Maintained consistent sizing with other widget icons (24x24px) to preserve visual harmony across the interface.
      
        ![Adding it on Figma](/assets/Developers/Shubham_Singh/gsoc-25-week11-svgsOnFigma.webp)

        ![How it looks on Lego Bricks widget](/assets/Developers/Shubham_Singh/gsoc-25-week11-svgsAdded.webp)

2. **Added multiple instrument support and Auto Arrange Pitch according to frequency in Lego Bricks Widget.**  
   - Implemented a dropdown instrument selector that allows users to choose from various instruments including Electronic Synth (default), Piano, Guitar, Violin, and Drums.
   - Integrated the instrument selection with Music Blocks' existing audio engine to ensure proper sound synthesis and playback quality.
   - Each instrument maintains its unique timbral characteristics while preserving the pitch and timing information from the LEGO brick patterns.
   - Added instrument persistence so user selections are maintained throughout their session.

        ![Multiple instruments support](/assets/Developers/Shubham_Singh/gsoc-25-week11-multipleInstruments.webp)

   - Developed an intelligent auto-arrange feature that automatically sorts pitch blocks by frequency, mimicking the phrase maker's behavior.
   - The system detects when pitches are placed in incorrect order and rearranges them from lowest to highest frequency automatically.
   - This feature ensures musical coherence regardless of how users initially arrange their LEGO blocks, making the tool more user-friendly for beginners.
   - Implemented smooth visual transitions during auto-arrangement to help users understand the reordering process.

        ![Putting in wrong order](/assets/Developers/Shubham_Singh/gsoc-25-week11-wrongSVGOrder.webp)

        ![Automatically arranged themselves correctly](/assets/Developers/Shubham_Singh/gsoc-25-week11-autoArrange.webp)

---

## Challenges & How I Overcame Them

- **Challenge:** Ensuring consistent SVG rendering across different browsers and maintaining visual quality at various zoom levels while keeping file sizes minimal.    
  **Solution:** Used vector-based design principles in Figma and optimized SVG code by removing unnecessary elements and using relative units instead of fixed pixels.

- **Challenge:** Ensuring that multiple audio files were being accessed properly.   
  **Solution:** Ensured code modularity, how it's being used in the pie menu that allowed access to multiple instruments without having to have a lot many lines of code.

---

## Key Learnings

- **SVG Optimization:** Proper SVG optimization significantly impacts both file size and rendering performance. Using tools like Figma's export settings and manual code cleanup can reduce file sizes by up to 60% while maintaining visual quality.

- **User Experience Consistency:** Auto-arranging features should provide visual feedback to help users understand what's happening. Implementing smooth transitions and clear visual cues prevents confusion when the system automatically corrects user input.

---

## Next Week's Roadmap

- Optimize performance for larger LEGO brick arrangements.
- Begin work on comprehensive user documentation.
- Make Pull Request and final submissions for GSoC.
- Make Demo video for explaining how it works.

---

## Resources & References

- **Music Blocks Documentation:** https://github.com/sugarlabs/musicblocks/tree/master/documentation
- **LEGO Blocks Notation System Video:** https://youtu.be/LOfrCPf3XJU?feature=shared
- **Figma SVG Optimization Guide:** Used for creating efficient vector graphics
- **Music Blocks Audio Engine:** Referenced for instrument integration

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special appreciation for their feedback on the instrument integration and auto-arrange functionality.

---