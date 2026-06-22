---
title: "GSoC '26 Week 3 Update by Syed Khubayb Ur Rahman"
excerpt: "Implementing connector notches with a center-based geometry approach."
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-gsoc-26-syed-khubayb-ur-rahman-week03"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week03,syed-khubayb-ur-rahman"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-08 – 2026-06-14

---

## Goals for This Week

- Add connector notches (top, bottom, left, arguments).
- Implement rounded corners for smooth, polished notches.
- Handle SVG stroke width properly to avoid outline overlaps.

---

## This Week's achievements

### Notches Implementation

Successfully implemented four primary connector notches for the bricks:
- Top Notch
- Bottom Notch
- Nested Top Notch
- Nested Bottom Notch

![Storybook Sample](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-sample-notch.png)

### SVG Path Geometry & Rounded Notches

Instead of utilizing rigid, straight-edged cutouts, a smooth, three-part SVG arc approach was implemented. This provides the notches with visually appealing rounded corners while dynamically adapting to the necessary widths of the tabs and grooves. 

![Notch with stroke width](assets/Images/gsoc26-Syed-khubayb-ur-rahman/notch-strokewidth.png)


### Center-Based Design Approach

To ensure long-term code maintainability, the entire system was designed around a "Center-Based" approach. Rather than measuring the notches from the left edge of the block, each notch is precisely anchored to an invisible centerline. Consequently, if the notch dimensions are adjusted in the future, the shapes will scale smoothly outward from the center, ensuring the blocks continuously retain their perfect alignment.

---

## Challenge & Key Learning

### Challenge:

One of the most complex challenges this week was dealing with SVG stroke widths. The main goal was to ensure that the stroke lines of interconnected bricks do not overlap one another while maintaining the precise dimensions of the tabs and cavities.

### Key Learning:

Anchor-based (center-based) geometry generation drastically simplifies maintaining perfect visual alignment across dynamically sizing paths, especially when working with complex SVG outlines.

---

## Next Week's Roadmap

- Apply corner radius without changing the brick size
- Define the decorator parameters that finish a brick

---

## Resources & References

- **PR:** [ Adding notches to the brick outline generator](https://github.com/sugarlabs/musicblocks-v4/pull/546)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **SVG Path editor:** [SVG Path editor](https://yqnn.github.io/svg-path-editor/)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback, especially regarding the SVG stroke width mechanics and the rounded corner .  Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.


---
