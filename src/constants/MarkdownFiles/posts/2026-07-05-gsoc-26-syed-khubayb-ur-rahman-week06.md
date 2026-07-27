---
title: "GSoC '26 Week 6 Update by Syed Khubayb Ur Rahman"
excerpt: "Developing the Brick Tower layout logic for measuring dimensions and positions, and integrating the Brick Palette."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-gsoc-26-syed-khubayb-ur-rahman-week06"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week06,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 – 2026-07-05

---

## Goals for This Week

- Develop the layout hook logic for computing dimensions and positions of Bricks in a Tower.
- Integrate the rendering of Bricks inside the Brick Palette.

---

## This Week's Achievements

This week I primarily focused on two major components: the Brick Tower and the Brick Palette.

### Brick Tower Layout Computation

I worked on the layout algorithm to compute the dimensions and positions of the Bricks inside a Brick Tower tree. The layout process is divided into two main phases:

#### Phase 1: Measuring Dimensions (Bottom-Up)

1. **Horizontal Measurements:** All the horizontal leaf node dimensions (the deepest value bricks) are measured first, no matter which level they are in. Then, their parent expression dimensions are calculated, continuing inwards until all horizontal arguments attached to the tower are fully measured.
2. **Vertical Measurements:** The statements inside the deepest, lowermost cavities (nesting) are measured. Following this, the parent statements wrapping those cavities are calculated, continuing outwards until the entire vertical main chain of statements is fully measured.

#### Phase 2: Calculating Positions (Top-Down)

3. **Vertical Positioning:** The root (outermost) vertical statements are positioned on the canvas. Next, the child statements inside their cavities are positioned, continuing inwards to grandchild cavities until the entire vertical statement skeleton is fully locked into place.
4. **Horizontal Positioning:** Finally, the horizontal expressions plugged directly into those positioned statements are calculated. Their child arguments are positioned, continuing outwards horizontally until the final leaf value bricks are entirely locked into place.

![Tower 1](assets/Images/gsoc26-Syed-khubayb-ur-rahman/tower-1.png)

![Tower 2](assets/Images/gsoc26-Syed-khubayb-ur-rahman/tower-2.png)

![Tower 3](assets/Images/gsoc26-Syed-khubayb-ur-rahman/tower-3.png)

### Brick Palette Rendering

I also worked on rendering the Bricks within the Brick Palette, successfully integrating the visual presentation so users can see the available Bricks.

![Brick Palette](assets/Images/gsoc26-Syed-khubayb-ur-rahman/palette.png)

---

## Next Week's Roadmap

- Successfully drag a brick from the palette.

---

## Resources & References

- **PR:** [Create Brick Tower](https://github.com/sugarlabs/musicblocks-v4/pull/661)
- **PR:** [Integrate rendering of Bricks in Brick Palette](https://github.com/sugarlabs/musicblocks-v4/pull/663)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
