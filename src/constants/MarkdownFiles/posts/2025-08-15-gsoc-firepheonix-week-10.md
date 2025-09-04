---
title: "GSoC '25 Week 10 Update by Shubham Singh"
excerpt: "Successfully implemented action block export functionality."
category: "DEVELOPER NEWS"
date: "2025-08-15"
slug: "2025-08-15-gsoc-25-firepheonix-week10"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week09
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-05 – 2025-08-15

---

## Goals for This Week

- Make the color detection and output more accurate.
- Deal with issue related to block length detection errors.

---

## This Week's Achievements

1. **Made color detection and Action Blocks export very accurate**  
   - So, it ignores very small durations (lower that ~350ms) while travelling from left to right, making the color detection very accurate.

      ![After Scan Image](/assets/Developers/Shubham_Singh/gsoc-week10-after-scan.webp)

      ![Image Output](/assets/Developers/Shubham_Singh/gsoc-week10-output-image.webp)

2. **Fixed image overflow issues**  
   - Earlier, when the image either was too small or if it was overflowing on the lego widgets canvas, the lego widget would expand it by either adding more rows or contract it by removing some.
   - But now, it's configured to take blank (green) those rows if the image falls shorter in height, and ignore those rows if it overflows. Now the widget handles each case better

   ![Short Height Image example](/assets/Developers/Shubham_Singh/gsoc-week10-overflow-demo.webp)

---

## Challenges & How I Overcame Them

- **Challenge:** Achieving accurate color detection while avoiding false positives from very small color segments or noise in the image. The system was detecting tiny color variations that didn't represent actual LEGO blocks, leading to incorrect musical note generation.  
  **Solution:** Implemented a duration threshold filter that ignores color segments shorter than ~350ms when scanning from left to right. This eliminated noise while preserving legitimate LEGO block detection, significantly improving the accuracy of both color detection and action block export.

- **Challenge:** Handling varying image sizes and aspect ratios that would either overflow the LEGO widget canvas or leave empty space, causing the widget to behave unpredictably by adding or removing rows automatically.  
  **Solution:** Redesigned the image handling logic to maintain consistent widget dimensions regardless of input image size. For images shorter than the canvas height, empty rows are filled with blank (green) spaces. For images that overflow, excess rows are simply ignored rather than forcing widget expansion.

- **Challenge:** Ensuring the block length detection algorithm worked consistently across different image resolutions and LEGO block arrangements without producing duration calculation errors.  
  **Solution:** Refined the mathematical algorithms for measuring block lengths by implementing relative positioning instead of absolute pixel measurements. This approach maintains accuracy regardless of image scale or resolution.

---

## Key Learnings

- **Threshold-Based Filtering:** Implementing duration thresholds for color detection dramatically improves accuracy in computer vision applications. Small noise elements that pass initial detection can be effectively filtered out using time-based or size-based thresholds, leading to more reliable length-wise pattern recognition.


---

## Next Week's Roadmap

- Add support for other instruments
- Add new SVGs for Image and Webcam
- Auto arrange the pitches according to their order just like in the phrase maker.

---

## Resources & References

- **Music Blocks Documentation:** https://github.com/sugarlabs/musicblocks/tree/master/documentation
- **LEGO Blocks Notation System Video:** https://youtu.be/LOfrCPf3XJU?feature=shared
- **Devin's CMK'24 Blog:** https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c
- **Music Blocks Phrase Maker Source Code:** Referenced for action block formatting standards

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special appreciation for their feedback during the live demonstration and their continued support in refining the project's technical implementation.

---