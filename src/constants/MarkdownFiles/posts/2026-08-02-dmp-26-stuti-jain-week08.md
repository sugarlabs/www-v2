---
title: "DMP '26 Week 8 Update by Stuti Jain"
excerpt: "Expanded the lesson framework with new lessons for Chapters 3 and 4, introduced reusable and custom discovery help cards, and tested the updated first two lessons with children."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-dmp-26-stuti-jain-week08"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,helpcards,week08"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** Walter Bender, Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 – 2026-08-02

---

## Goals for This Week

- Implement the discovery-help categorization planned during the previous week.
- Add new lesson content for Chapters 3 and 4.
- Provide contextual guidance for the new discovery activities.
- Connect the new lessons with the existing Explorer Journal.
- Test the updated Lessons 1 and 2 with children and observe how they interact with the new infrastructure.

---

## This Week's Achievements

### Expanding the Discovery Help System

Last week, I categorized the additional discovery activities into three groups based on whether suitable help already exists within Music Blocks.

The goal this week was to start implementing this approach without creating unnecessary new help infrastructure.

For discovery activities that could not be sufficiently explained using the existing help resources, I introduced a **general-purpose help card**.

These cards provide a dedicated space for explaining an activity when there is no existing Music Blocks help card that can be reused directly.

The new approach therefore supports three levels of guidance:

- Reusing an existing Help menu resource.
- Extending an existing block-help resource with lesson-specific information.
- Using a new general card when the activity requires completely new guidance.

This keeps the help system more manageable while allowing lesson-specific discovery activities to remain understandable for younger learners.

---

### Adding Chapters 3 and 4

With the story framework established through the first two lessons, I expanded the adventure by adding **Lesson 3** and **Lesson 4**.

The new levels continue the same structure used throughout the existing lesson framework:

**Story → Musical Activity → Exploration → Discovery → Help → Rewards → Reflection**

Each lesson introduces its own musical activity and additional exploration opportunities while remaining connected to the larger Lost Melody Islands narrative.

#### Level 3 — The Pulse Cave Rhythm

In Level 3, Lyra and Choon reach a blue cave where they discover that the next treasure clue is connected to rhythm and pulse.

The lesson introduces a new musical challenge while using the story to encourage learners to listen to and construct rhythmic patterns.

![Level 3 - The Pulse Cave Rhythm](/assets/Developers/Stuti-Jain/level_3_pulse_cave.png)

The level also introduces new optional discovery activities that learners can explore after completing the main task.

---

#### Level 4 — Chest, Snap, Clap — Build the Rhythm

Level 4 continues the journey into the Pulse Cave and introduces body-percussion concepts through **chest, snap, and clap** sounds.

The visual story helps learners connect the rhythm they create with the environment around them instead of presenting the activity only as a sequence of instructions.

![Level 4 - Chest, Snap, Clap](/assets/Developers/Stuti-Jain/level_4_rhythm.png)

The lesson also follows the same reward and exploration structure established in the earlier levels.

---

### Adding Contextual Help for New Discovery Activities

The new lessons introduced discovery activities that were not always covered by the existing Music Blocks help resources.

For these cases, I added general help cards that appear when learners select the corresponding discovery activity.

The cards explain:

- What the learner is expected to change.
- How the action can be performed in Music Blocks.
- What the change means musically.
- How the learner can experiment with it.

For example, a learner exploring **Make It Longer** can receive an explanation of how extending an action or adding more musical material changes the duration of the resulting melody.

![Discovery Help Card](/assets/Developers/Stuti-Jain/discovery_help_card.png)

Where an existing help card was already suitable, I continued to reuse it instead of creating another version. In some cases, only a small amount of additional lesson-specific information was required.

This allows the help system to remain connected to the existing Music Blocks infrastructure while still providing the context needed by the lesson.

---

### Connecting the New Lessons to the Explorer Journal

The Explorer Journal continues to be part of the lesson experience as the story expands.

Lessons 3 and 4 are connected to the same Explorer Book structure used by the earlier lessons. This allows learners to record their reflections and return to their previous discoveries as they progress through the adventure.

The long-term goal is for the Explorer Book to grow alongside the learner's journey rather than being limited to the first few lessons.

---

## Classroom Testing of Lessons 1 and 2

Another important part of this week's work was testing the updated **Lessons 1 and 2 with children**.

The testing was particularly useful because the infrastructure now includes several features that were not present during the initial prototype testing:

- Story-driven lesson progression.
- Optional discovery activities.
- Contextual help for discovery actions.
- Discovery badges.
- Explorer Journal reflections.
- Multiple reflections within a lesson.
- General notes and personal journal entries.

Testing these features with children provides an opportunity to observe whether the new infrastructure actually reduces confusion while preserving the exploratory nature of Music Blocks.

The feedback will also help identify areas where instructions, help content, or lesson flow still need to be simplified.

---

## Mentor Feedback & Key Takeaways

The implementation of the help categorization provided a more practical way to decide where new guidance should be introduced.

A major takeaway was that not every discovery activity requires a completely new help experience. Reusing existing Music Blocks resources wherever possible makes the system easier to maintain and keeps the interface familiar to learners.

At the same time, the new general cards provide flexibility for activities that do not map naturally to an existing help resource.

The addition of Lessons 3 and 4 also helped validate whether the infrastructure developed for the first two lessons can support additional content without changing the overall learner experience.

The classroom testing of Lessons 1 and 2 will provide the next important layer of feedback, particularly around how children discover and use the optional activities and contextual help.

---

## Challenge & Key Learning

One of the main challenges this week was balancing **reusability with lesson-specific guidance**.

Creating a new help card for every discovery activity would make the system difficult to maintain. However, relying only on generic Music Blocks documentation can leave learners without enough context to understand what a particular lesson activity is asking them to do.

The three-part categorization helped address this problem by providing a decision-making framework for each discovery activity.

**Learning:** Good educational infrastructure should be flexible enough to support new lessons while reusing existing resources wherever possible. Separating reusable guidance from genuinely new lesson-specific content can make the system easier to extend without making the learner experience more complicated.

---

## Next Week's Roadmap

- Improve the way Lesson Plans coexist with the rest of the Music Blocks interface.
- Allow learners to access other toolbar features while the Lesson Plan interface is open without losing their current lesson progress.
- Separate lesson data from the main implementation so that lessons can be added and edited more easily.
- Continue refining the infrastructure for adding future lessons.
- Analyze feedback from testing Lessons 1 and 2.
- Continue improving discovery guidance based on learner interactions.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued feedback on the lesson framework, discovery guidance, and overall learning experience.

The addition of Lessons 3 and 4 and the testing of the earlier lessons are helping validate whether the infrastructure can scale beyond the initial prototype while remaining accessible and engaging for young Music Blocks learners.

I also appreciate the Sugar Labs community for its continued support throughout the development of the project.