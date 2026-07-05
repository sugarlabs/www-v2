---

title: "DMP '26 Week 2 Update by Stuti Jain"
excerpt: "Designed and implemented a story-driven lesson framework for Music Blocks, introducing interactive quests, exploration rewards, and the first two narrative lessons."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-dmp-26-stuti-jain-week02"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,week02"
image: "assets/Images/dmp_c4gt.logo.png"
----------------------------------------

<!-- markdownlint-disable -->

# Week 2 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** 2026-06-15 – 2026-06-21

---

## Goals for This Week
* Finalize a direction for integrating lesson plans into Music Blocks.
* Explore ways to make lessons more engaging for younger learners.
* Prototype a story-driven lesson experience.
* Implement the first narrative lessons within Music Blocks.
* Gather mentor feedback on the proposed framework.

---

## This Week's Achievements

### Designing a Story-Driven Learning Experience
One of the major discussions from the previous week was how lesson plans could become more engaging for Music Blocks' primary audience—children between **7 and 11 years old**.

Instead of presenting lessons as standalone activities with long instructional text, I explored a narrative-driven approach where learners progress through a connected world while learning musical and computational thinking concepts.

After several discussions and iterations, the story concept selected for the prototype was:

## **The Lost Melody Islands – Quest for the Hidden Treasure**
In this world, a magical song known as the **Grand Melody** once connected a chain of islands. After a mysterious **Silence Storm** shattered the melody, its fragments became scattered across different islands.

Learners join **Lyra**, a young explorer, and **Beat**, a floating musical companion, as they travel between islands restoring Melody Fragments and uncovering clues left behind by the legendary explorer **Captain Cadence**.

The long-term goal is for every lesson to become a chapter in an ongoing adventure instead of feeling like an isolated exercise.

---

### Implementing the Story Framework
To evaluate this idea, I integrated the story directly into Music Blocks and created a dedicated quest structure inside the Practice interface.

The implementation introduces:
* Story introduction and world-building.
* Level progression through quests.
* Melody Fragments and Treasure Clues.
* Captain Cadence's journal pages.
* Discovery badges encouraging exploration.

### Story Introduction
The learner is introduced to the story, characters, and overall objective before beginning the first lesson.

![Story Introduction](/assets/Developers/Stuti-Jain/story_introduction.png)

---

### Level 1 — The Bridge of Echo Island
The first lesson reimagines the existing **Hot Cross Buns** activity as part of the adventure.

Lyra and Beat arrive at Echo Island, where a magical bridge disappeared after the Silence Storm. Learners rebuild the bridge by arranging musical chunks in the correct sequence, restoring the island's first Melody Fragment.

Instead of simply completing an exercise, learners actively progress through the story while reinforcing the original musical concepts.

![Echo Island Quest](/assets/Developers/Stuti-Jain/echo_island.png)

---

### Level 2 — The Sakura Grove Echo
The second lesson adapts the existing **Sakura Sakura** activity into the same narrative framework.

Learners help awaken the sleeping Sakura Grove by rebuilding its melody, restoring another Melody Fragment and uncovering the next clue from Captain Cadence's journal.

This continues the story while preserving the educational objectives of the original lesson.

![Sakura Grove Quest](/assets/Developers/Stuti-Jain/sakura_grove.png)

---

### Exploration and Discovery Badges
A major objective of this prototype was encouraging curiosity rather than rewarding only lesson completion.

To support this, I implemented a **Discovery Badge** system that rewards learners when they naturally explore Music Blocks beyond the minimum requirements of the lesson.

Examples include:
* Renaming musical chunks.
* Exploring octave changes.
* Trying transpose blocks.
* Creating their own melody variations.

Rather than explicitly asking learners to perform these actions, discoveries appear naturally as part of the story, encouraging experimentation and exploration.

![Discovery Badge Example](/assets/Developers/Stuti-Jain/discovery_badge.png)

---

### Quest Progress and Rewards
Each completed lesson now contributes to the learner's overall journey by awarding:
* Melody Fragments.
* Captain Cadence's Journal Pages.
* Treasure Clues.
* Discovery Badges.

These rewards help create a stronger sense of progression and provide motivation for learners to continue exploring future lessons.

---

### Draft Pull Request
The complete prototype has been submitted for review as a draft pull request:  
**Draft PR:** https://github.com/sugarlabs/musicblocks/pull/7587

---

## Mentor Feedback & Key Takeaways
After implementing the prototype, I shared it with Walter to discuss how the story-driven framework fits into the long-term vision of lesson plans in Music Blocks.

The overall response was encouraging, particularly the idea of transforming lessons into a connected adventure rather than a collection of independent activities. The implementation was reviewed, and the next step is to evaluate how children interact with this new learning experience.

Walter plans to test the prototype with students over the coming days. Their feedback will help answer several important questions:
* Does the story make lessons more engaging?
* Do discovery badges encourage exploration?
* Is the amount of narrative appropriate for the target age group?
* What improvements should be made before scaling the framework to additional lesson plans?

These observations will guide the next iteration of the project.

---

## Challenge & Key Learning
The biggest challenge this week was balancing storytelling with educational objectives.

While the narrative needed to be engaging enough to motivate learners, it was equally important that it supported the lesson rather than distracting from the underlying musical concepts.

**Learning:** Young learners are naturally curious and enjoy progressing through stories. Embedding educational activities within a narrative can make lessons feel more meaningful while encouraging exploration beyond the minimum required steps.

---

## Next Week's Roadmap
* Gather feedback from classroom testing.
* Refine the story framework based on student interactions.
* Evaluate the effectiveness of the discovery badge system.
* Improve lesson flow and overall user experience.
* Begin planning additional lesson levels if the prototype proves successful.

---

## Resources & References
* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Draft PR:** https://github.com/sugarlabs/musicblocks/pull/7587
* **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments
Thanks to Walter Bender and Devin Ulibarri for their guidance and feedback throughout the design process. Their suggestions helped shape the transition from traditional lesson activities toward a more engaging, story-driven learning experience for young Music Blocks users. I also look forward to the upcoming classroom testing, which will provide valuable insights for refining the framework before expanding it to future lessons.
