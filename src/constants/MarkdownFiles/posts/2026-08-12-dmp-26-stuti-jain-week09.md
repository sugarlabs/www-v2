---
title: "DMP '26 Week 9 Update by Stuti Jain"
excerpt: "Improved the Lesson Plans infrastructure by separating lesson data from implementation and making Lesson Plans and the Explorer Journal work alongside the rest of the Music Blocks interface."
category: "DEVELOPER NEWS"
date: "2026-08-12"
slug: "2026-08-12-dmp-26-stuti-jain-week09"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,week09"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-06 – 2026-08-12

---

## Goals for This Week

* Improve the way Lesson Plans coexist with the rest of the Music Blocks interface.
* Allow learners to access other toolbar features while keeping their lesson progress.
* Separate lesson data from the main implementation.
* Make it easier to add and edit future lessons.
* Continue refining the Lesson Plans infrastructure based on learner feedback.
* Review observations from testing Lessons 1 and 2.

---

## This Week's Achievements

### Making Lesson Plans Work Alongside Music Blocks

As the Lesson Plans system became more feature-rich, an important usability issue became apparent.

Previously, opening the Lesson Plans interface could restrict access to other parts of Music Blocks. If a learner wanted to use another toolbar feature, they had to close the Lesson Plans window.

This created an unnecessary interruption in the learning experience. Closing the Lesson Plans interface could also mean losing the context of what the learner was currently doing.

To improve this, I worked on making the Lesson Plans interface draggable so that it can be repositioned within the workspace instead of acting as a fixed panel.

The **Explorer Journal** was also made draggable.

This allows learners to keep Lesson Plans or the Explorer Journal open while continuing to interact with the Music Blocks workspace and other toolbar features.

![Draggable Lesson Plans and Explorer Journal](/assets/Developers/Stuti-Jain/week09_draggable_panels.png)

The updated interface allows multiple parts of the learning experience to coexist without forcing learners to repeatedly close and reopen panels.

---

### Separating Lesson Data from the Implementation

Another important improvement this week was restructuring how lesson information is stored.

As more lessons were being added, keeping all lesson descriptions, objectives, rewards, badges, extra actions, and hints directly inside the main implementation was becoming difficult to maintain.

To address this, I moved the lesson-specific information into separate **JSON files**.

The lesson data can now be maintained independently from the core Lesson Plans implementation.

This makes it easier to:

* Add new lessons.
* Modify existing lesson content.
* Update rewards and badges.
* Change extra actions and their hints.
* Organize lesson-specific information separately.

The goal is to make the system more scalable as the number of lessons increases.

---

### Building a More Scalable Lesson Structure

The separation of lesson data also creates a clearer distinction between the **Lesson Plans engine** and the **content of individual lessons**.

Instead of changing the main implementation whenever a lesson needs to be updated, contributors can work primarily with the lesson data files.

This provides a stronger foundation for continuing to expand the story-driven lesson framework in the coming weeks.

With more lessons planned, having an organized and easily editable data structure becomes increasingly important.

---

### Reviewing Learner Feedback

The earlier testing of Lessons 1 and 2 continued to inform the development of the infrastructure.

The testing showed that learners were engaging with the story, completing the main activities, and exploring additional Music Blocks features.

At the same time, it reinforced the importance of keeping the lesson interface flexible and ensuring that learners can move between the Lesson Plans experience and the rest of Music Blocks without losing their progress.

These observations helped guide this week's focus toward improving the overall interaction between Lesson Plans and the main Music Blocks workspace.

---

## Mentor Feedback & Key Takeaways

A major focus of this stage of the project is making sure that the Lesson Plans system can grow beyond the initial prototype.

The improvements made this week address two important parts of that goal:

* **Better integration:** Lesson Plans and the Explorer Journal can now coexist with the Music Blocks workspace instead of restricting access to other features.
* **Better maintainability:** Lesson content is separated into structured data files, making future lesson development easier.

These changes are important because the project is moving from a small prototype toward a framework that can support a larger collection of lessons.

---

## Challenge & Key Learning

One of the main challenges this week was balancing the Lesson Plans experience with the existing Music Blocks interface.

Lesson Plans should guide learners through a structured story, but they should not prevent learners from freely exploring the rest of the application.

Similarly, as the number of lessons grows, the implementation needs to remain easy for contributors to understand and modify.

**Learning:** A successful educational feature needs to work naturally within the existing application rather than becoming an isolated interface. At the same time, separating content from implementation makes it easier to scale the system and support future contributions.

---

## Next Week's Roadmap

* Explore a magnetic area, minimize button, or similar interaction to allow Lesson Plans and the Explorer Journal panels to be quickly collapsed or returned to their default position.
* Integrate Git-backed lessons into the Lesson Plans system.
* Add the next lessons in the series, including **Lesson 5 and Lesson 6**.
* Explore approaches for translating Practice lessons into different languages.
* Study the existing `.po` file structure and documentation to understand how lesson translations can be integrated into the current localization system.

---

## Resources & References

* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued feedback on the Lesson Plans framework. Their observations from learner testing have helped guide the project beyond the initial prototype and toward a more flexible, maintainable, and scalable learning experience within Music Blocks.