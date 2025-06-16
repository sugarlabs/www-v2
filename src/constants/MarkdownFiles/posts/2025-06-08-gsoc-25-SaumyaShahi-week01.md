---
title: "GSoC ’25 Week 01 Update by Saumya Shahi"
excerpt: "Weekly Progress Report on the Masonry Module for GSoC '25"
category: "DEVELOPER NEWS"
date: "2025-06-08"
slug: "2025-06-08-gsoc-25-saumya-week01"
author: "Saumya Shahi"
description: "GSoC '25 Contributor at SugarLabs"
tags: "gsoc25,sugarlabs,masonry,week01,saumya-shahi"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Saumya Shahi

**Project:** [Masonry Module - Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender/), [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-01 - 2025-06-08

---

## Goals for This Week

- Understand the working of SVGs and path rendering logic.
- Create an exhaustive list of all configurations needed to render each visual brick type.
- Formulate the path rendering logic to dynamically generate each brick.
- Implement rendering logic for SVG bricks based on the provided configurations.
- Ensure each brick type renders correctly with various parameters.

---

## This Week’s Achievements

1. **Explored SVG-based Brick Rendering**  
   - Used [SVG Playground](https://yqnn.github.io/svg-path-editor/) to manually draw and style bricks.  
   - This helped me understand SVG path syntax, positioning, scaling, and how `viewBox` works for consistent rendering.  
   - Also referred to the [MDN SVG Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Getting_started) for deeper insights into SVG internals.

2. **Compiled a Comprehensive List of Brick Types**  
   - Created a detailed list of all visually distinct brick types to be supported by the Masonry module.  
   - This helped identify variation across different bricks and how they interact in Music Blocks.  
   - [Brick Types Document](https://docs.google.com/document/d/1BswWHadyy4yC3_3vK6KHZnMn0u6jbbYiQ6JQWiqRMLw/edit?tab=t.0)

3. **Mapped Configurations for Each Brick Type**  
   - Listed out all the necessary configurations (similar to React props) for each brick — including label size, number of arguments, shape flags, etc.  
   - This configuration map allows dynamic rendering logic per brick type.  
   - [Configurations Document](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?usp=sharing)

4. **Implemented SVG Brick Rendering**  
   - Successfully implemented dynamic SVG rendering logic.  
   - Given a configuration, each brick now generates an accurate path representation.  
   - The system supports variation in label length, slot types, and layout, making the rendering pipeline fully flexible.

---

## Challenges & How I Overcame Them

- **Challenge:** Brick structures vary significantly, making a one-size-fits-all rendering approach difficult.  
  **Solution:** Broke down commonalities across bricks and created modular rendering components that dynamically adapt based on type and config.

- **Challenge:** Path distortion with varying argument lengths and labels.  
  **Solution:** Used live preview tools and console-based debugging to isolate scaling issues. The SVG path editor was extremely useful in this phase.

---

## Key Learnings

- Gained strong understanding of **SVG path syntax** and dynamic drawing.
- Improved in building **config-driven rendering pipelines** with a clean separation of data and UI logic.
- Learned how to break down complex visual requirements into **reusable, parameterized components**.
- Realized that **explaining your thought process to mentors** is invaluable — it clarifies confusion and leads to better solutions.

---

## Next Week’s Roadmap

- Work on edge cases and introduce early validation of config inputs.
- Build a **basic layout logic**  that dynamically generates a SVGs for a tree of bricks (Multiple bricks rendering).
- Begin implementing **connection logic** based on bounding box / collision detection.

---

## Resources & References

- [Brick Types Doc](https://docs.google.com/document/d/1BswWHadyy4yC3_3vK6KHZnMn0u6jbbYiQ6JQWiqRMLw/edit?tab=t.0)
- [Brick Configurations Doc](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?usp=sharing)
- [SVG Path Editor](https://yqnn.github.io/svg-path-editor/)
- [MDN SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

---

## Acknowledgments

Grateful to my mentors Anindya, Walter, and Devin for their constant guidance and insightful feedback. Thanks to the Sugar Labs community for their welcoming support!

---

## Connect with Me

- GitHub: [@saumyashahi](https://github.com/saumyashahi)
- Gmail: [saumyashahi05@gmail.com](mailto:saumyashahi05@gmail.com)
- LinkedIn: [Saumya Shahi](https://www.linkedin.com/in/saumya-shahi/)

---
