---
title: "DMP '26 Week 5 Update by Stuti Jain"
excerpt: "Introduced Choon as the story companion and implemented an Explorer Journal for recording, revisiting, and expanding learners' reflections, while planning support for independent notes and contextual discovery guidance."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-dmp-26-stuti-jain-week05"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,journal,reflection,week05"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 – 2026-07-12

---

## Goals for This Week

- Connect the story companion more closely with the existing Music Blocks world.
- Implement the Explorer Journal as a new feature within the Help menu.
- Encourage learners to reflect after completing each lesson.
- Allow learners to revisit and update their previous reflections.
- Explore ways to provide guidance for optional discovery activities.

---

## This Week's Achievements

### Introducing Choon

One of the discussions from the previous week focused on connecting the story companion more closely with **Mr. Mouse**, an existing and recognizable character in Music Blocks.

Previously, the story featured **Beat**, a floating music robot. Although Beat worked well as a playful musical companion, introducing a separate robot character made the story feel less connected to the existing Music Blocks world.

After exploring different names and character directions, Beat was renamed **Choon**.

The name is inspired by the word *tune*. It preserves the playful and musical personality of the original character while allowing the companion to be connected more naturally with Mr. Mouse and the wider Music Blocks theme.

Choon continues to accompany Lyra throughout **The Lost Melody Islands**, helping her listen for hidden melodies, discover musical clues, and restore the lost pieces of the Grand Melody.

---

### Implementing the Explorer Journal

The major implementation focus this week was the **Explorer Journal**, a reflection feature designed to help learners pause and think about their experiences throughout the lessons.

During earlier classroom testing, children enjoyed completing lessons, experimenting with Music Blocks, and collecting discovery badges. However, many learners quickly moved from one achievement to another without reflecting on what they had changed, discovered, or learned.

The Explorer Journal was introduced to support reflection without turning it into a formal quiz or assessment.

The Journal is available as a new option within the **Help menu**, making it accessible throughout Music Blocks rather than limiting it to a single lesson.

The interface is designed as a personalized **Explorer Book**, where every completed lesson contributes a new page to the learner's musical journey.

![Explorer Journal Overview](/assets/Developers/Stuti-Jain/explorer_journal.png)

---

### Adding Reflections After Lesson Completion

After completing a lesson, learners are now invited to write a short note about their experience before continuing their journey.

The reflection prompt encourages them to think about something they discovered during the activity. This could include:

- Something new they learned.
- A musical change they tried.
- A discovery that surprised them.
- A part of the lesson they enjoyed.
- A new pattern or sound they created.

The prompt is intentionally short and open-ended so that learners can express their experiences in their own words.

Learners can also skip the reflection if they do not want to write at that moment. This keeps the Journal encouraging and optional rather than making it another required step for completing the lesson.

![Lesson Reflection Prompt](/assets/Developers/Stuti-Jain/journal_prompt.png)

---

### Building a Personalized Explorer Book

Each lesson has its own dedicated page inside the Explorer Journal.

For example, after completing the first lesson, learners can open the **Echo Island** page and view:

- The lesson level.
- The island they explored.
- The musical and programming concepts introduced in the lesson.
- Their saved reflections and discoveries.

As learners complete additional lessons, new pages are added to the Explorer Book. This gradually creates a personal record of their journey across the Lost Melody Islands.

The long-term goal is for learners to build a meaningful collection of memories and discoveries rather than only seeing which levels they have completed.

---

### Supporting Multiple Reflections

Learning does not always happen through a single interaction. A learner may return to a lesson later, try something new, and notice a different musical pattern or behavior.

To support this, the Explorer Journal allows learners to add multiple reflections to the same lesson page.

Instead of replacing the previous note, every new reflection is added to the learner's existing journey. This creates a continuing record of how their understanding and experimentation change over time.

Learners can revisit the same lesson and add new discoveries whenever they want.

---

### Editing Saved Reflections

An editing feature was also added so that learners can return to an existing note and update it.

This allows children to:

- Correct or improve a previous reflection.
- Add more details to an earlier discovery.
- Explain something new they learned after revisiting a lesson.
- Continue developing their thoughts over time.

The updated reflection remains associated with the same lesson page, keeping the Explorer Book organized around the learner's journey.

![Explorer Journal Lesson Page](/assets/Developers/Stuti-Jain/journal_lesson_page.png)

---

## Mentor Feedback & Key Takeaways

This week, I shared the Explorer Journal implementation with Walter and discussed how it could evolve as part of the broader Music Blocks learning experience.

The overall feedback was encouraging. The Explorer Journal was considered a useful addition that fits naturally with the Music Blocks theme and complements the story-driven lesson framework.

The journal provides a balance to the existing discovery badge system. While badges encourage learners to experiment and explore, the Journal gives them a space to pause, describe their discoveries, and revisit their learning journey later.

Several ideas for improving and extending the feature were also discussed, including giving learners greater control over their saved entries and expanding the Journal beyond lesson-specific reflections.

### Adding the Ability to Delete Notes

The current Journal allows learners to add and edit reflections.

The next improvement will be to add a **Delete** option so learners can remove notes they no longer want to keep. This will provide more complete control over the content stored in their Explorer Book.

---

### Supporting General Notes Beyond Lessons

Currently, the Explorer Journal organizes reflections around completed lessons. Each lesson has a dedicated page where learners can record their discoveries and add more reflections when they revisit the activity.

During the mentor discussion, we identified that the Journal should not be limited only to lesson-based reflections. Learners may also want to record independent ideas, musical experiments, questions, or observations while exploring Music Blocks outside the structured lesson journey.

To support this, the Explorer Journal could include an **Add New Note** option. Learners would be able to create their own journal page by providing:

- A title for the note.
- Their observation, idea, or discovery.
- Additional entries as they continue exploring the same idea.

These general notes would follow the same interaction pattern as lesson journals. Learners could return to an existing note, edit its content, add more entries over time, or delete entries they no longer want to keep.

For example, a learner experimenting independently could create a page titled **“My New Drum Song”** and write about the rhythm they created. If they return to the project later, they could add another entry to the same page instead of creating an unrelated note.

This would allow the Explorer Journal to grow beyond a lesson reflection tool and become a personal creative notebook where children can document ideas and discoveries from their wider Music Blocks journey.

---

### Providing Help for Discovery Activities

The optional discovery activities encourage learners to experiment with actions such as:

- Changing an octave.
- Using a transpose block.
- Extending a melody.
- Renaming musical chunks.

However, younger learners may not understand what these actions mean or which Music Blocks components can help them complete the discovery.

To address this, we discussed introducing interactive guidance through **flippable help cards**.

When a learner selects a discovery activity, a card could open in the center of the workspace. The card would explain:

- What the discovery means.
- What musical effect the change creates.
- Which Music Blocks blocks can be used.
- A small hint that helps the learner begin without directly giving away the solution.

The aim is to provide enough guidance for learners to continue independently while still preserving experimentation and curiosity.

---

### Reusing the Existing Help Card Infrastructure

Instead of creating an entirely separate system for discovery hints, the existing Music Blocks help-card infrastructure can be reused.

The content of the cards can change according to the selected discovery activity while continuing to use the underlying behavior already available in Music Blocks.

Reusing the existing infrastructure can help keep the implementation maintainable and consistent with the rest of the application.

---

### Redesigning the Help Card Experience

Although the existing help-card system provides useful functionality, its current interface does not visually match the newer Music Blocks experience or the story-driven lesson design.

The help cards will therefore need a UI/UX update before being used for discovery guidance.

The redesigned cards should:

- Match the visual language of Music Blocks.
- Use simple and child-friendly explanations.
- Include clear visual guidance.
- Avoid long, text-heavy instructions.
- Support interaction without interrupting the learner's creative flow.

The goal is to make help feel like part of the adventure rather than a separate documentation window.

---

### Exploring Image-Based Journal Entries

Another possible extension is allowing learners to add images to their Journal entries.

Currently, reflections are text-based. In the future, learners could attach an image alongside a note, allowing them to save visual memories of the projects and musical creations they build.

This could make the Explorer Book more expressive and accessible, especially for younger learners who may prefer communicating visually rather than through longer written reflections.

The feasibility and storage requirements of this feature will be explored before implementation.

---

## Challenge & Key Learning

The main challenge this week was designing reflection as a natural part of the learning journey rather than turning it into another task that children must complete.

Since the lessons already include story progression, musical activities, exploration challenges, and discovery rewards, the Journal needed to support the experience without interrupting it.

Making the reflection prompt optional and connecting each entry to a lesson-specific Explorer Book page helped keep the interaction personal and flexible.

Another important consideration was supporting reflection over time. Allowing learners to add multiple notes to the same lesson means that the Journal records more than a single response—it can show how their ideas and discoveries develop as they revisit Music Blocks.

**Learning:** Exploration and reflection support different parts of the learning process. Rewards can encourage children to experiment, while a personal journal can help them recognize, describe, and revisit what they discovered.

---

## Next Week's Roadmap

- Add a Delete option for saved Explorer Journal entries.
- Design an **Add New Note** option for creating general journal pages outside lessons.
- Allow learners to add multiple entries to their self-created journal pages.
- Extend the existing edit and delete functionality to general notes.
- Begin implementing contextual help for optional discovery activities.
- Reuse and adapt the existing Music Blocks help-card infrastructure.
- Design flippable help cards that explain both the musical concept and the relevant Music Blocks components.
- Redesign the help-card UI to better match the current Music Blocks theme.
- Explore the feasibility of adding images to Explorer Journal entries.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Story Prototype Draft PR:** https://github.com/sugarlabs/musicblocks/pull/7587
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender for reviewing the Explorer Journal implementation and providing valuable suggestions for improving learner control, contextual guidance, and the future direction of the feature.

The discussions around reusable help cards helped define a clearer approach for supporting children during optional discovery activities without removing the opportunity for independent exploration.

I also appreciate Devin Ulibarri and the Sugar Labs community for their continued guidance and support throughout the development of the lesson framework.