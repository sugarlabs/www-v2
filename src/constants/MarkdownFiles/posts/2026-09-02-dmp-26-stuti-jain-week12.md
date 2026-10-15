---

title: "DMP '26 Week 12 Update by Stuti Jain"

excerpt: "Finalized the Lesson Plans framework with Next Lesson navigation, contributor and user documentation, 86% test coverage, ten interactive lessons, and refinements based on student feedback."

category: "DEVELOPER NEWS"

date: "2026-09-02"

slug: "2026-09-02-dmp-26-stuti-jain-week12"

author: "@/constants/MarkdownFiles/authors/stuti-jain.md"

tags: "dmp26,sugarlabs,musicblocks,lessonplans,explorerjournal,testing,week12"

image: "assets/Images/dmp_c4gt.logo.png"

---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-27 – 2026-09-02

---

## Goals for This Week

* Complete the remaining Lesson Plans infrastructure work.
* Add documentation for contributors and users.
* Add test coverage for the Lesson Plans and Explorer Journal implementation.
* Expand the lesson series to ten lessons.
* Improve lesson content based on feedback from student testing.
* Add easier navigation between consecutive lessons.

---

## This Week's Achievements

### Adding Next Lesson Navigation

One of the final usability improvements was adding a **Next Lesson** option at the end of each lesson.

Previously, after completing a lesson, learners had to return to the main Lesson Plans menu before selecting the next level.

The new button allows learners to move directly to the next lesson.

![Next Lesson Navigation](/assets/Developers/Stuti-Jain/week12_next_lesson.png)

This creates a more continuous learning experience and reduces unnecessary navigation between lessons.

---

### Adding Contributor and User Documentation

As the Lesson Plans framework is intended to be extended by the Sugar Labs community, documentation was added for both contributors and users.

A **README** was added within the Lesson Plans project to explain how contributors can work with the Lesson Plans and Explorer Journal infrastructure.

The documentation covers the structure of the lesson system and provides guidance for contributors who want to add or modify lesson content.

A section was also added to the existing project documentation explaining how users can access and use the Lesson Plans experience.

This makes the feature easier to understand for both learners and future contributors.

---

### Adding Test Coverage

Test files were added to cover the Lesson Plans and Explorer Journal implementation.

The tests cover the main lesson infrastructure and help verify that changes to the system do not introduce regressions.

The current test suite provides approximately **86% coverage** for the Lesson Plans and Explorer Journal files.

This provides a stronger foundation for continuing to develop the lesson framework while keeping the existing functionality reliable.

---

### Expanding the Lesson Series to Ten Lessons

The story-driven Practice experience was expanded to a total of **10 lessons**.

The final additions include **Lesson 9 and Lesson 10**, continuing the same narrative structure and connecting musical activities with exploration, extra actions, rewards, and reflection.

The additional lesson content was also developed following the feedback and suggestions received during mentor discussions.

Lesson 9 and Lesson 10 references:

* [Make a Metronome](https://mapflc.com/lesson-plans/make-a-metronome/)
* [Lesson 10 reference document](https://docs.google.com/document/d/1YQ5d-TXucLwZICp74Jd4h1qcXYtPBJTpx5j7T4sybyM/edit?tab=t.0#heading=h.fk2e672kc0nx)

---

### Refining Lessons Using Student Feedback

The classroom testing conducted during the project continued to guide the refinement of the lessons.

Two specific improvements were made based on observations of how children understood the activities.

#### Improving the Chest, Snap, Clap Lesson

The **Chest, Snap, Clap** lesson was missing some contextual information that made it difficult for learners to understand what they were expected to do.

The lesson context was rewritten to make the connection between the story and the musical activity clearer.

The goal was to ensure that learners could understand the purpose of the activity from the story itself rather than relying only on additional instructions.

---

#### Improving the Block Flow in Lesson 2

In Lesson 2, the block sequence shown in the lesson was originally arranged horizontally.

During testing, this made it harder for children to understand the flow and relationship between the blocks.

The arrangement was changed to a **vertical structure**, making the sequence easier to follow visually.

This was a small visual change, but it made the activity more understandable for learners.

---

### Adding Author Information

Author information was also added to the files created as part of the project.

This makes the contributions easier to identify and provides clearer attribution within the Lesson Plans infrastructure.

---

## Mentor Feedback & Key Takeaways

This week brought together several areas that had been developed throughout the project.

The addition of Next Lesson navigation improved the overall flow between levels, while the documentation and testing work made the infrastructure more suitable for future contributors.

The expansion to ten lessons also provided a stronger demonstration that the framework can support a complete story-driven lesson series rather than only a small prototype.

Most importantly, student testing continued to influence the implementation. Changes such as the revised Chest, Snap, Clap context and the vertical block arrangement in Lesson 2 show how direct learner feedback can guide seemingly small but important usability improvements.

---

## Challenge & Key Learning

One of the main learnings from the final stages of development was that completing the feature itself is only one part of building a useful open-source project.

As the Lesson Plans system grew, documentation, testing, attribution, navigation, and maintainability became equally important.

**Learning:** A reusable educational framework needs to be understandable not only to learners, but also to the contributors who will maintain and extend it. Student feedback is also essential for identifying usability issues that may not be obvious during development.

---

## Next Week's Roadmap

The major development milestones for the project are now complete. The remaining work will focus on minor refinements:

* Fine-tune lesson content and extra-action definitions.
* Make lesson validation less strict where appropriate while ensuring that the required musical workflow is still correctly checked.
* Continue addressing small usability issues identified during testing.

---

## Resources & References

* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Repository:** https://github.com/sugarlabs/musicblocks
* **Lesson 9 Reference:** https://mapflc.com/lesson-plans/make-a-metronome/
* **Lesson 10 Reference:** https://docs.google.com/document/d/1YQ5d-TXucLwZICp74Jd4h1qcXYtPBJTpx5j7T4sybyM/edit?tab=t.0#heading=h.fk2e672kc0nx

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued mentorship and feedback throughout the project.

Their guidance, along with feedback from student testing, helped shape the Lesson Plans framework from an initial prototype into a more complete, scalable, and learner-focused experience within Music Blocks.