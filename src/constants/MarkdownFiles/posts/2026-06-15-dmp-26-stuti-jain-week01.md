---

title: "DMP '26 Week 1 Update by Stuti Jain"
excerpt: "Designed the initial lesson plan framework for Music Blocks and implemented the first two interactive lesson levels."
category: "DEVELOPER NEWS"
date: "2026-06-15"
slug: "2026-06-15-dmp-26-stuti-jain-week01"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,week01"
image: "assets/Images/dmp_c4gt.logo.png"
----------------------------------------

<!-- markdownlint-disable -->

# Week 1 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)

**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-06-10 – 2026-06-15

---

## Overview

My DMP project focuses on creating structured lesson plans for Music Blocks and integrating them directly into the platform. Music Blocks is a visual programming environment that combines music and coding, helping learners explore concepts such as rhythm, pitch, patterns, loops, and problem-solving through creative experimentation.

While Music Blocks already provides extensive documentation and examples, it currently lacks educator-ready lesson plans that can guide learners through these concepts in a structured way. The goal of this project is to design a reusable lesson plan framework and develop lessons that connect musical concepts with computational thinking skills in an engaging and accessible manner.

In addition to creating lesson content, the project also explores how lessons can be integrated into the Music Blocks interface itself. The aim is to provide a guided learning experience that supports both educators using Music Blocks in classrooms and young learners exploring music and programming independently.

---

## Goals for This Week

* Understand the existing lesson and practice infrastructure in Music Blocks.
* Explore previous lesson-plan related work.
* Create an initial framework for integrating lessons into the interface.
* Discuss the future direction of lesson plans with mentors.

---

## This Week's Achievements

### Building the Initial Lesson Framework
This week I focused on understanding how the existing Practice section works and how it could support future lesson plans.
As a proof of concept, I implemented **Lesson 1** and **Lesson 2** and integrated them into the Music Blocks interface.

**Commit:** [d34e2b1](https://github.com/stutijain2006/musicblocks/commit/d34e2b1f55b592a369eca72740a11329c42f244c)

The work included:
* Adding lesson levels to the interface.
* Creating lesson navigation.
* Connecting lesson completion checks.
* Establishing a reusable structure that future lessons can build upon.

### Practice Menu

![Practice Menu](/assets/Developers/Stuti-Jain/practiceMenu.png)

---

### First Interactive Lessons
The first lessons guide users through recreating simple musical patterns using blocks already available in Music Blocks.
The goal was not only to create activities but also to understand what information a learner needs while working through a lesson.

### Lesson Interface

![Lesson Interface](/assets/Developers/Stuti-Jain/lesson_interface.png)

---

### Lesson Completion

![Lesson Completion](/assets/Developers/Stuti-Jain/lesson_completion.png)

---

### Level Completion Validation

![Lesson Validation](/assets/Developers/Stuti-Jain/lesson_completion_validation.png)

---

## Design Decisions & Key Takeaways
A significant part of this week was spent discussing the long-term vision of lesson plans in Music Blocks with my mentors. While implementing the first two lessons helped establish the technical framework, these discussions helped clarify how lessons should be designed for the platform's primary audience—children between **7 and 11 years old**.

One of the first observations was that lesson plans should eventually be integrated more naturally into the Music Blocks experience. Rather than existing only within the Practice section, they could be made accessible through the **Help** menu, allowing new users to discover guided learning paths more easily.

We also discussed the current practice activities and their heavy reliance on validations. While this approach works well for checking correctness, it may not be the best way to introduce beginners to Music Blocks. Instead, early lessons should focus on helping learners understand what different blocks do and encouraging them to experiment with the interface.

Another important point was that the current lesson instructions are quite text-heavy. Since many Music Blocks users are younger learners, future lessons should use simpler language, clearer objectives, and a more interactive approach that guides children through exploration rather than requiring them to read large amounts of text.

A particularly exciting direction that emerged from these discussions was moving toward **story-driven lessons**. Instead of presenting standalone exercises, lessons could be connected through an ongoing narrative featuring recurring characters. Each lesson would become a chapter in a larger journey, allowing learners to discover musical and programming concepts while following a story.

We also explored ways to encourage curiosity beyond the minimum actions required to complete a lesson. Rather than rewarding only successful completion, Music Blocks could recognize exploratory actions as well—for example, experimenting with melodies or renaming Action blocks. These ideas laid the foundation for the exploration and badge systems planned for future iterations.

Overall, these discussions shifted my perspective from simply creating lesson content to designing a learning experience that is engaging, accessible, and enjoyable for young learners.

---

## Challenge & Key Learning
The biggest challenge this week was balancing implementation with long-term planning. While I was able to integrate the first two lesson levels into Music Blocks, it quickly became clear that building individual lessons is only one part of the project.

Before creating a larger collection of lesson plans, it is important to establish a consistent structure that future lessons can follow. This includes understanding how lessons will be organized, maintained, and expanded as the project grows.

**Learning:** Investing time in designing a scalable framework early will make future lesson creation more consistent, maintainable, and easier to extend as the project evolves.

---

## Next Week's Roadmap
* Continue discussions on lesson architecture and workflow.
* Identify a common template for future lesson plans.
* Explore moving lesson access into the Help menu.
* Investigate story-based lessons and character-driven learning.
* Begin prototyping the new lesson experience.

---

## Resources & References
* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Commit:** https://github.com/stutijain2006/musicblocks/commit/d34e2b1f55b592a369eca72740a11329c42f244c
* **Repository:** https://github.com/sugarlabs/musicblocks
* **Story Inspiration:** https://en.wikipedia.org/wiki/Meow_Wolf

---

## Acknowledgments
Thanks to Walter Bender for his guidance on the project direction and lesson plan integration approach. I also look forward to collaborating with Devin Ulibarri as the lesson plan framework evolves. Finally, thanks to the Sugar Labs community for their support and feedback during the initial stages of development.
