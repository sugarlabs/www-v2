---
title: "GSoC '25 Final Wrap-Up by Saumya Shahi"
excerpt: "An in-depth summary of my GSoC 2025 journey with Sugar Labs — developing the Masonry Module for Music Blocks v4, a scalable visual programming system for music and learning."
category: "DEVELOPER NEWS"
date: "2025-08-24"
slug: "2025-08-24-gsoc-25-saumya-shahi-final"
author: "@/constants/MarkdownFiles/authors/saumya-shahi.md"
tags: "gsoc25,sugarlabs,final,saumya-shahi"
image: "assets/Images/GSOC.webp"
---

# Final Wrap-Up Report by Saumya Shahi

**Project:** [Masonry Module - Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-10 – 2025-08-24  

---

## Goals for the Wrap-up

The final phase of my Google Summer of Code journey with **Sugar Labs** aimed to refine, integrate, and finalize the **Masonry Module** — a core system powering the next-generation visual programming interface for **Music Blocks v4**.

The focus areas included:

- Final integration of **brick rendering**, **palette system**, **tower formation**, and **AST mapping**.  
- Stabilizing the **drag-and-drop playground**, ensuring reliable stacking, nesting, and disconnection.  
- Preparing comprehensive **documentation** for both developers and contributors.  
- Writing the **final technical report** and this retrospective blog.  

These efforts concluded months of iterative design, testing, and collaboration toward building a modular and educationally meaningful system.

---

## Achievements

### 1. The Masonry Module: Overview
The Masonry Module establishes a modern, scalable infrastructure for creating and manipulating **lego-like “bricks”** that represent musical or programming concepts. These can be stacked, nested, or connected dynamically — forming *towers* that map directly to Music Blocks’ internal execution engine.

This new system replaces the previous, limited brick renderer with a **Model–View architecture** and **reactive playground**. It bridges visual programming with AST-based execution, giving learners a smooth, interactive coding experience.

---

### 2. Phase-wise Implementation

#### **Brick Rendering with SVG**
- Designed **Simple**, **Expression**, and **Compound** bricks entirely using **Scalable Vector Graphics (SVGs)**.  
- Developed the `brickFactory` function to generate customized SVG paths dynamically, enabling variable width, labels, and color properties.  
- Verified rendering behavior in **Storybook**, ensuring each brick scaled correctly and retained sharpness across resolutions.  
- [Pull Request #439 – SVG Paths for Bricks](https://github.com/sugarlabs/musicblocks-v4/pull/439)

#### **Model–View Architecture**
- Established a clean separation between data and view using abstract and concrete models (`BrickModel`, `SimpleBrick`, `ExpressionBrick`, `CompoundBrick`).  
- Implemented modular React components for each brick type to ensure maintainability.  
- This architecture enables real-time UI updates without coupling with execution logic, simplifying debugging and future expansion.  
- [Pull Request #441 – Add Model and View for Bricks](https://github.com/sugarlabs/musicblocks-v4/pull/441)

#### **Tower Formation System**
- Introduced a hierarchical structure for stacking and nesting bricks to form **towers**, each representing a logical program unit.  
- Implemented DFS/BFS traversal to compute tower dimensions, resolve bounding boxes, and validate connections.  
- Managed all **connection points** and **parent-child relationships** dynamically, allowing bricks to merge or disconnect smoothly.  
- [Pull Request #442 – Tower Model and Connection Points](https://github.com/sugarlabs/musicblocks-v4/pull/442)

#### **Palette and Playground**
- Created a **categorized palette** with search and tooltips, making bricks accessible by function and category.  
- Integrated **drag-and-drop interactions** using **React Aria DnD** and **Recoil** for global state management.  
- Designed a **collision detection system** using **Quadtree data structure** to efficiently validate drop targets, improving performance even for dense workspaces.  
- [Pull Request #444 – Palette Integration](https://github.com/sugarlabs/musicblocks-v4/pull/444)  
- [Pull Request #447 – Drag-and-Drop, Collision Detection](https://github.com/sugarlabs/musicblocks-v4/pull/447)

#### **Disconnection Logic and Real-time Updates**
- Added logic to **disconnect towers** interactively by dragging bricks away.  
- Updated bounding boxes, recalculated parent-child references, and triggered state re-renders for each interaction.  
- This real-time responsiveness ensured a natural user experience, similar to physical Lego snapping.  
- [Pull Request #450 – Tower Disconnection and Workspace Dragging](https://github.com/sugarlabs/musicblocks-v4/pull/450)

#### **AST Integration**
- Developed mappings for **26+ AST node types**, including `BinaryOperatorExpression`, `FunctionCallStatement`, and others.  
- Each brick type now translates to its corresponding AST node, enabling execution within the Music Blocks engine.  
- This marks the first bridge between visual programming and Music Blocks’ underlying logic interpreter — a major step toward interactive, runnable programs.

---

## Challenges

Despite significant progress, several challenges shaped the final outcome:

- **Performance Optimization:** Managing collision detection and layout recalculations efficiently when dealing with hundreds of bricks required refining Quadtree traversal and caching results.  
- **Nesting Complexity:** Maintaining precise geometry for nested compound bricks during disconnection or drag operations involved complex coordinate recalculations.  
- **Timeline and Scope:** Deciding between additional stretch goals (like macro handling and trash management) and polishing the existing system demanded careful prioritization.  
- **Cross-Platform Consistency:** Ensuring uniform interactions across different browsers and screen resolutions added another layer of testing complexity.  

Each challenge improved my understanding of scalable system design and performance-conscious UI engineering.

---

## Key Learnings

My key learnings during this project include:

- **System Architecture:** Designing with Model–View separation improved debugging, scalability, and readability.  
- **Algorithmic Thinking:** Applying **DFS/BFS** for tower traversal and **Quadtree** for collision detection strengthened my data structure skills.  
- **Frontend Engineering:** Gained proficiency in **React**, **SVG path rendering**, **state management**, and **component reusability**.  
- **Compiler Concepts:** Mapping visual bricks to AST nodes provided practical insights into compiler design and program representation.  
- **Open-Source Collaboration:** Learned the importance of structured communication, iterative reviews, and collective ownership in distributed development.  

---

## Reflections

> “GSoC 2025 was more than a coding project — it was a design challenge, a learning curve, and a creative collaboration.”

Working on Music Blocks taught me how technical precision and educational intent can coexist.  
The Masonry Module now enables learners to **compose music while learning programming**, reflecting Sugar Labs’ vision of learning through exploration.

This project pushed me to understand not only how to build software, but how to make it *meaningful, modular, and maintainable*. It also deepened my respect for open-source collaboration — the feedback, reviews, and collective insights made each milestone achievable.

I’m proud to have contributed to something that will help future students experiment, create, and learn — through music and code.

---

## Resources & References

- **Project Repository:** [Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
- **Masonry Module Documentation:** [*Masonry MBv4 Docs*](https://docs.google.com/document/d/1UJXh3734S138BoTsGulzeTlZXstyvWd6syJK2eclMKI/edit?usp=sharing)   
- **Detailed Final Report:** [GSoC 2025 - Final Report](https://github.com/saumyashahi/GSoC-2025/blob/main/Final-Report.md)  
- **Weekly Progress Reports:** [Saumya’s GSoC Blog Series](https://www.sugarlabs.org/authors/saumya-shahi)  

---

## Acknowledgments

I extend my heartfelt gratitude to my mentors **Anindya Kundu**, **Walter Bender**, and **Devin Ulibarri** for their consistent guidance, in-depth reviews, and insightful discussions. Their mentorship helped me understand not just *what* to build, but *why* it matters.

A warm thank you to the **Sugar Labs community** for their continued support, feedback, and encouragement — especially during testing and integration stages.  
Collaborating with such a passionate community has been a defining experience in my development journey.

---

*This marks the completion of my Google Summer of Code 2025 journey with Sugar Labs — and the beginning of new explorations into how creativity and computation can work together to inspire learning.*
