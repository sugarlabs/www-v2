---
title: "GSoC '26 Week 1 Update by Syed Khubayb Ur Rahman"
excerpt: "Designing an outline-only brick definition for Music Blocks v4 and a separate SVG path generator file built around it."
category: "DEVELOPER NEWS"
date: "2026-06-01"
slug: "2026-06-01-gsoc-26-syed-khubayb-ur-rahman-week01"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week01,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 1 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-05-25 – 2026-05-31  

---

## Goals for This Week

- Decide the different parameters that define a brick's outline.
- Read the existing v4 path generation code.
- Implement a basic SVG generator that generates the outline only.

---

## This Week's Achievements

### Research and Parameter Analysis

This week, I focused on understanding how brick outlines are generated and identifying which parameters are required for defining a brick's shape.

I explored the existing `path.ts` implementation and reviewed the v3 brick catalog to understand the different brick structures that need to be supported.

The outline-related parameters I identified are:

- `hasTopNotch`
- `hasBottomNotch`
- `hasLeftNotch`
- `containsNesting`
- `nestingDimensions`
- `argumentDimensions`
- `labelWidth`
- `labelHeight`
- `secondaryLabel`
- `strokeWidth`

Parameters such as colors, tooltips, icons, selectors, images, and argument labels were intentionally excluded since they belong to the rendering layer rather than the outline generation layer.

### Outline Path Generator

After finalizing the required parameters, I started developing an outline-focused path generator.

The generator uses only outline-related parameters and produces:

- SVG path data
- Bounding box dimensions
- Connection point information

The implementation currently exists alongside the existing `path.ts` so it can be tested and improved independently without affecting the current application.

---

## Challenge & Key Learning

### Challenge: 

One challenge this week was deciding how much responsibility the generator should have. Initially, I considered including both shape generation parameters (such as hasTopNotch, hasBottomNotch, hasLeftNotch etc) and rendering-related parameters (such as label, colour, icons, tooltips, selectors) in a single system. However, as more parameters were added, the design became increasingly complex. To address this, I separated the work into two layers (outline first  then everything else on top), this separation made the implementation cleaner and easier to maintain.

### Key Learning: 

Keeping shape generation separate from rendering logic results in a more modular and maintainable design.

---


## Next Week's Roadmap

- Successfully generate outlines for all possible brick types.
- Test all possible cases for each brick and ensure they work correctly.
- Goal by the end of Week 2: Complete the path generator.

---

## Resources & References


- **Research doc:** [Brick outline parameters](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.0)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **Reference file:** [`path.ts`](https://github.com/sugarlabs/musicblocks-v4/blob/develop/modules/masonry/src/brick/utils/path.ts)
- **SVG Path editor** [SVG Path editor](https://yqnn.github.io/svg-path-editor/)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for the guidance and the help during the back-and-forth on which parameters belong to the outline layer. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
