---
title: "GSoC '26 Week 2 Update by Syed Khubayb Ur Rahman"
excerpt: "Redesigning the brick outline generator with new architecture "
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug: "2026-06-07-gsoc-26-syed-khubayb-ur-rahman-week02"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week02,syed-khubayb-ur-rahman"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-01 – 2026-06-07 

---

## Goals for This Week

- Implement the brick outline generator with the new architecture.
- Support dynamic sizing, arguments, and nesting cavities.
- Build a comprehensive test suite to cover layout and generation bounds.

---

## This Week's Achievements

### Architecture (`newPath.ts`)

The generation logic is split into a 3-phase process to ensure maintainability and separation of concerns:

- **`computeDimensions`**: Calculates the brick's overall layout dimensions based on the sizes of its internal elements, including labels, arguments, and nested regions.
- **`generateOutlinePoints`**: Translates the layout numbers into raw (X, Y) coordinate vertices.
- **`pointsToPath`**: Converts the vertices into a valid SVG path string.

### Features Supported

- **Main Label & Minimum Bounds**: Automatically enforces a minimum brick size, expanding if the main label exceeds it.
- **Dynamic Parameter Sizing**: Parameter labels stack vertically to the right of the main label (with an 8px spacing gap). The overall brick width seamlessly expands to accommodate the widest parameter.
- **Dynamic Argument Sizing**: Argument blocks expand the vertical height of the brick.
- **Compound Nesting Cavities**: Automatically calculates C-shape cuts with standard indentations. Supports stacking multiple nested cavities and enforcing a minimum cavity height.
- **Comprehensive Test Suite**: Includes `newPath.spec.ts` with 19 passing unit tests covering minimum enforcement, layout math, bounding box validation, and path string verification.

---

## Challenge & Key Learning

### Challenge: 

The main challenge was managing the intricate layout arithmetic required to ensure components like dynamic parameters, arguments, and nesting cavities correctly manipulate the overall boundaries of a brick. Translating calculated dimensions seamlessly to geometric coordinates was initially tricky.

### Key Learning: 

By isolating the generation structure into three clear phases (`computeDimensions`, `generateOutlinePoints`, and `pointsToPath`), it becomes significantly easier to construct, test, and debug geometric boundaries separate from raw string formatting.

---

## Next Week's Roadmap

- Continue refinement of outline parameters for varied bricks.
- Add strokeWidth, corner radius, and other parameters effecting the outline.
- Add connector notches (top, bottom, left, args).

---


## Resources & References

- **PR:** [#537 structured brick outline generator](https://github.com/sugarlabs/musicblocks-v4/pull/537)
- **Research doc:** [Brick outline notes](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.zenp5d2wawyw)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **SVG Path editor** [SVG Path editor](https://yqnn.github.io/svg-path-editor/)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for catching the coupling problem in the original design and for whiteboarding the dimension math. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
