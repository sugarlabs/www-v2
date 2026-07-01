---
title: "DMP '26 Week 3 Update by Stuti Jain"
excerpt: "Refined the story-driven lesson prototype based on classroom feedback by improving lesson accessibility, encouraging learner reflection, and enhancing the overall lesson experience."
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-dmp-26-stuti-jain-week03"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,week03"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** 2026-06-22 – 2026-06-28

---

## Goals for This Week
- Gather feedback from classroom testing of the story-driven lesson prototype.
- Improve the lesson experience based on observations from children.
- Reduce friction while completing exploration activities.
- Investigate loading issues reported during testing.
- Explore ways to encourage learners to reflect on their learning journey.

---

## This Week's Achievements

### Refining the Prototype Through Classroom Feedback

Last week's story-driven lesson prototype was tested with children by Walter to better understand how learners interacted with the lessons.

The overall response was encouraging. Children enjoyed progressing through the story, collecting Melody Fragments, earning discovery badges, and experimenting with Music Blocks beyond the required tasks.

Alongside the positive feedback, the testing also highlighted several usability issues and opportunities to improve the overall learning experience. This week's work focused on refining the prototype based on these real classroom observations rather than introducing new lesson content.

---

### Making Exploration Easier

One of the optional exploration activities asked learners to change the color of the bridge using the **Transpose** block.

During testing, many children understood what they wanted to achieve but struggled to locate the Transpose block within Music Blocks. Instead of exploring the musical concept, they spent time searching through palettes.

To reduce this friction, I updated the preloaded lesson workspace so that the **Transpose** block is already available on the canvas when the lesson begins.

This allows learners to immediately experiment with transposition while keeping the focus on creativity instead of interface navigation.
---

### Investigating Project Loading Issues

Another issue observed during testing was that the project occasionally failed to load on some devices.

To investigate this, I tested the lesson prototype across multiple browsers, including **Google Chrome** and **Mozilla Firefox**.

During testing, the prototype loaded correctly on both browsers, suggesting that the issue may be device-specific or related to the testing environment rather than the lesson implementation itself.

This investigation provides a starting point for narrowing down the source of the issue in future testing sessions.
---

### Encouraging Reflection Alongside Exploration

Perhaps the most interesting observation from classroom testing was that children genuinely enjoyed experimenting with Music Blocks.

Once they discovered the exploration badges, many learners immediately began performing additional actions simply to unlock more achievements.

While this was encouraging from an engagement perspective, it also revealed an opportunity for improvement. Learners were actively exploring, but they rarely paused to think about **what they had actually learned** before moving on to the next activity.

This led to discussions with Walter about introducing a lightweight reflection system that naturally fits within the story.

Rather than adding quizzes or assessments, the goal is to encourage learners to briefly reflect on their own discoveries—for example, what they changed, what surprised them, or what they enjoyed most during the lesson.

Instead of settling on a single solution immediately, I explored multiple reflection mechanisms that could integrate naturally into the narrative, including journal-based reflections, in-story conversations, explorer logs, and lesson summaries.

A collection of these design ideas is documented here:
**Reflection Design Notes**
https://iitracin-my.sharepoint.com/:w:/g/personal/stuti_j_cy_iitr_ac_in/IQB_OVxMgEUPTaSPSzMDB56rAUPne-RkFUIPMCgiCNLUZOE?e=f7UZU4

These ideas will continue evolving over the coming weeks before deciding which approach best supports young learners.

---

### Exploring Better Lesson Conclusions
Building on the reflection discussion, I also experimented with using the **Print** block as part of the lesson conclusion.

Instead of ending immediately after completing a level, learners could leave a short message about their adventure before continuing to the next island.

This small interaction has the potential to make each lesson feel more personal while naturally reinforcing the idea of reflecting on what was learned.

---

## Mentor Feedback & Key Takeaways

This week's discussions were centered around refining the learning experience instead of expanding the number of lessons.

One important takeaway was that educational friction and productive exploration are very different. While exploration should encourage curiosity, learners should never become stuck simply because they cannot locate the appropriate block or feature within the interface.

Another important discussion focused on the balance between exploration and reflection. The badge system successfully motivated learners to experiment with Music Blocks, but we also want them to pause and recognize what they learned before immediately chasing the next reward.

These observations reinforced that educational software should evolve through continuous user testing. Even relatively small usability improvements can significantly improve how learners experience the lesson.

---

## Challenge & Key Learning

The biggest challenge this week was interpreting user behavior beyond simple completion statistics.

Watching children interact with the prototype revealed patterns that were impossible to anticipate during development. Many learners completed every task successfully, yet their interaction patterns showed opportunities to improve the lesson flow, exploration mechanics, and overall learning experience.

**Learning:** Designing educational software is an iterative process. Real classroom observations often provide more valuable insights than assumptions made during development, and small refinements based on learner behavior can have a meaningful impact on both engagement and learning.

---

## Next Week's Roadmap

- Continue refining the lesson experience based on classroom feedback.
- Prototype and evaluate reflection-based features.
- Improve lesson conclusion and progression mechanics.
- Continue simplifying exploration activities for younger learners.
- Begin expanding the story framework to future lesson levels.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Story Prototype Draft PR:** https://github.com/sugarlabs/musicblocks/pull/7587
- **Reflection Design Notes:** https://iitracin-my.sharepoint.com/:w:/g/personal/stuti_j_cy_iitr_ac_in/IQB_OVxMgEUPTaSPSzMDB56rAUPne-RkFUIPMCgiCNLUZOE?e=f7UZU4
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments
Thanks to Walter Bender for organizing classroom testing and sharing valuable observations from students interacting with the lesson prototype. The feedback from these sessions played a significant role in shaping this week's work and highlighted several opportunities to improve the learning experience. I also appreciate Devin Ulibarri and the Sugar Labs community for their continued guidance and support throughout the project.