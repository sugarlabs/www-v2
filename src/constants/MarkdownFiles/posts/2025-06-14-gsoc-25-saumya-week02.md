---
title: "GSoC '25 Week 02 Update by Saumya Shahi"
excerpt: "This week focused on documenting the brick tree structure, refining SVG path generation, and learning testing tools like Storybook."
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-saumya-shahi-week02"
author: "@/constants/MarkdownFiles/authors/saumya-shahi.md"
tags: "gsoc25,sugarlabs,week02,saumya-shahi"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Saumya Shahi

**Project:** [Masonry Module - Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-08 – 2025-06-14  

---

## Goals for This Week

- Refine and complete configuration-driven rendering logic.
- Test rendering of multiple brick types and validate correctness using sample input.
- Document how brick configurations and connections should be modeled.
- Start building foundational elements for brick tree rendering.

---

## This Week's Achievements

1. **Dynamic SVG Brick Rendering**  
   - Finalized implementation for rendering SVG paths dynamically based on type-specific configurations.  
   - Different bricks (e.g., nested bricks, simple bricks, expression bricks) now render accurately according to their label sizes, scale, and other config props.  
   - Output adjusts responsively with different numbers of arguments, notches, and labels.

2. **Rendered Output Validation & Screenshots**  
   - Verified each visual brick against expected path geometry.  
   - Screenshots below show rendered bricks:
        ![Simple Brick](/assets/Images/simple-bricks.png)
        ![Brick with Arguments](/assets/Images/expression-bricks.png)
        ![Nested Brick](/assets/Images/nested-bricks.png)

2. **Bug Fix: Left SVG Path Issue**

   * Fixed a critical error in path rendering for bricks — the left edge generation wasn’t calculating offsets correctly.
   * Cleaned up related path logic to improve readability and scalability for future nested structures.

3. **Storybook & Testing Familiarization**

   * Understood how Storybook is used for visual component testing.
   * Learnt how to set up unit tests and component test files.
   * Setup groundwork for adding future test cases.

---

## Challenges & How I Overcame Them

- **Challenge:** Mapping the brick tree vs AST was initially confusing.
**Solution:** Spent focused time breaking down what each structure is supposed to represent and clarified use cases.

- **Challenge:** SVG left path errors were hard to trace visually.
**Solution:** Used visual diffing and debugger to narrow down bounding box and stroke-width miscalculations.

---

## Key Learnings

- Improved understanding of **SVG rendering logic** and path construction.
- Got hands-on exposure to **Storybook**, and how visual tests can improve modular development.
- Understood the **difference between data representations** for view (brick tree) and logic (AST).


---

## Next Week's Roadmap

- Start implementing **multi-brick layout rendering**: bricks with children rendered as a tree in the workspace.
- Introduce bounding box calculation utilities for each rendered brick.
- Plan initial strategy for brick connection detection and snapping logic.

---

## Resources & References

- **Brick Rendering:** [Google Doc](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?tab=t.dxoea5urpxyl#heading=h.wa29sjgrasfn)
- **SVG Path Reference:** [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
- **Playground for Manual SVG Paths:** [SVG Path Editor](https://yqnn.github.io/svg-path-editor/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for support and insightful feedback throughout the week.

---
