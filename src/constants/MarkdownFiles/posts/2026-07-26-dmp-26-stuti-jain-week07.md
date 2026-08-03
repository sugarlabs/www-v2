---
title: "DMP '26 Week 7 Update by Stuti Jain"
excerpt: "Planned the next phase of lesson guidance by categorizing discovery actions into reusable help resources, prepared the DMP midpoint evaluation, and finalized the implementation roadmap for expanding lessons and classroom testing."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-dmp-26-stuti-jain-week07"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,helpcards,midpoint,week07"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** Walter Bender, Devin Ulibarri  
**Organization:** Sugar Labs  
**Reporting Period:** 2026-07-20 – 2026-07-26

---

## Goals for This Week

- Plan the implementation strategy for supporting optional discovery actions.
- Categorize existing and new help resources to maximize reuse of the current Music Blocks help system.
- Prepare and present the DMP Midpoint Evaluation.
- Finalize the roadmap for the next development phase.

---

## This Week's Achievements

### Planning the Discovery Help System

One of the primary goals this week was to determine how additional learner guidance should be integrated into Music Blocks without introducing unnecessary duplication.

As the lesson framework expands, learners are encouraged to perform several optional discovery activities such as changing octaves, using transpose blocks, extending melodies, renaming chunks, and creating musical variations. While these activities promote exploration, they also require appropriate guidance so learners understand both the musical concept and the corresponding Music Blocks functionality.

Instead of creating a completely separate help system, I worked on categorizing every discovery action according to the most suitable source of guidance.

The actions were divided into three categories:

- **Existing Help Dropdown:** Features that are already documented within the current Music Blocks Help menu and can be reused directly.
- **Existing Block Help:** Actions that can be explained by extending the help pages of existing Music Blocks blocks, such as Pitch, Action, Repeat, or Transpose blocks with a few lesson-specific additions.
- **New Lesson-Specific Help:** Discovery activities that require dedicated guidance because no suitable help currently exists.

This categorization provides a structured implementation roadmap while keeping the learner experience consistent with the existing Music Blocks interface.

![Help Categorization Table](/assets/Developers/Stuti-Jain/help_categorization_table.png)

---

### Preparing for the Midpoint Evaluation

Another important milestone this week was preparing the presentation for the DMP Midpoint Evaluation.

The presentation summarizes the progress made so far, including:

- Story-driven lesson infrastructure
- Interactive lesson flow
- Explorer Journal
- Contextual guidance
- Midpoint milestones achieved
- Future development roadmap

Preparing the presentation also helped review the overall project progress and identify the next major development priorities for the remaining weeks of the program.

---

## Mentor Feedback & Key Takeaways

### Reviewing the Help Categorization

The help categorization table became the main topic of discussion during this week's mentor meeting.

The overall feedback was very positive, as the structured classification clearly identified where existing infrastructure could be reused and where additional work would actually be required.

Rather than introducing new documentation for every discovery activity, the mentors recommended continuing to reuse existing Music Blocks help resources whenever possible.

For many optional discovery tasks, only a few additional explanatory lines need to be added to the existing block help pages, making the guidance more relevant to the lesson context while keeping the implementation lightweight and maintainable.

This approach reduces duplication and ensures learners receive consistent explanations throughout Music Blocks.

---

### Planning the Next Lessons

With the overall lesson infrastructure now becoming stable, the discussion also shifted toward expanding the available lesson content.

The next implementation milestone will focus on adding **Lesson 3** and **Lesson 4** to the existing story framework while continuing to build upon the same narrative and exploration model developed during the first two lessons.

---

### Preparing for Classroom Testing

Another important discussion centered around validating the lesson framework with real learners.

During the coming week, Lessons 1 and 2 will be tested with children to observe how learners interact with:

- Story-driven navigation
- Optional discovery activities
- Contextual guidance
- Explorer Journal
- Reflection prompts
- Overall lesson flow

The feedback collected during these sessions will help refine both the lesson design and the learner guidance before expanding the lesson library further.

---

## Challenge & Key Learning

The primary challenge this week was deciding when new guidance was actually necessary and when the existing Music Blocks documentation could simply be extended.

Initially, several discovery activities appeared to require entirely new help pages. However, after reviewing the existing infrastructure in detail, it became clear that many concepts were already partially supported through block help or the Help dropdown.

**Learning:** Before designing new educational content, it is valuable to carefully evaluate the existing learning resources. Reusing and extending established documentation not only reduces maintenance effort but also provides learners with a more consistent experience.

---

## Next Week's Roadmap

- Implement the categorized discovery help system.
- Extend existing Music Blocks help pages with lesson-specific guidance.
- Create new help content only where necessary.
- Add Lesson 3 and Lesson 4 to the lesson framework.
- Conduct classroom testing for Lessons 1 and 2.
- Collect learner feedback on:
  - Story-driven lessons
  - Explorer Journal
  - Contextual discovery guidance
  - Optional exploration tasks
- Refine the lesson infrastructure based on user observations.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Many thanks to Walter Bender for reviewing the help categorization strategy and providing valuable feedback on how the existing Music Blocks help infrastructure can be reused more effectively.

I also thank Devin Ulibarri and the Sugar Labs community for their continued guidance in shaping the lesson framework and preparing for the next phase of classroom testing and lesson expansion.