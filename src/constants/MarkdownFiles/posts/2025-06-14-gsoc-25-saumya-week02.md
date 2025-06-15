---

title: "GSoC '25 Week 02 Update by Saumya Shahi"
excerpt: "This week focused on documenting the brick tree structure, refining SVG path generation, and learning testing tools like Storybook."
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-saumya-week02"
author: "@/constants/MarkdownFiles/authors/saumya.md"
tags: "gsoc25,sugarlabs,week02,saumya"
image: "assets/Images/GSOC.png"
-------------------------------

<!-- markdownlint-disable -->

# Week 02 Progress Report by Saumya Shahi

**Project:** [Masonry Module - Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/), [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-07 - 2025-06-14

---

## Goals for This Week

* Understand and define the structure for a tree of bricks (not AST).
* Document how brick configurations and connections should be modeled.
* Fix SVG path issues (left edge generation).
* Learn about testing infrastructure, especially Storybook.

---

## This Week's Achievements

1. **Brick Tree Structure Research & Documentation**

   * Studied how a tree of bricks could be represented, which visually models program constructs.
   * Created a detailed document explaining configuration schema and nested brick data structures.
   * Resource: [Masonry MBv4 Docs](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?usp=sharing).

2. **Bug Fix: Left SVG Path Issue**

   * Fixed a critical error in path rendering for bricks — the left edge generation wasn’t calculating offsets correctly.
   * Cleaned up related path logic to improve readability and scalability for future nested structures.

3. **Storybook & Testing Familiarization**

   * Understood how Storybook is used for visual component testing.
   * Learnt how to set up unit tests and component test files.
   * Setup groundwork for adding future test cases.

---

## Challenges & How I Overcame Them

* **Challenge:** Mapping the brick tree vs AST was initially confusing.
  **Solution:** Spent focused time breaking down what each structure is supposed to represent and clarified use cases.

* **Challenge:** SVG left path errors were hard to trace visually.
  **Solution:** Used visual diffing and debugger to narrow down bounding box and stroke-width miscalculations.

---

## Key Learnings

* Improved understanding of **SVG rendering logic** and path construction.
* Got hands-on exposure to **Storybook**, and how visual tests can improve modular development.
* Understood the **difference between data representations** for view (brick tree) and logic (AST).

---

## Next Week's Roadmap

* Start implementation of the brick tree rendering using the documented configuration.
* Add test cases for individual brick render states.

---

## Resources & References

* **Brick Tree Docs:** [Link](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?usp=sharing)
* **Music Blocks Repo:** [github.com/sugarlabs/musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
* **Storybook Docs:** [storybook.js.org](https://storybook.js.org/)

---

## Acknowledgments

Thank you to my mentors and the Sugar Labs community for continued guidance and thoughtful feedback!
