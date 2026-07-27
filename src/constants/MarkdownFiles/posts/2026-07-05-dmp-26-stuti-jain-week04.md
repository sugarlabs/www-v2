---
title: "DMP '26 Week 4 Update by Stuti Jain"
excerpt: "Refined the story-driven lesson experience by simplifying lesson content, introducing richer visual storytelling, and planning new reflection and guidance features based on mentor feedback."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-dmp-26-stuti-jain-week04"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,week04"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 – 2026-07-05

---

## Goals for This Week

- Refine the story-driven lesson prototype based on mentor feedback.
- Reduce the amount of written instructions for younger learners.
- Introduce richer visual storytelling throughout the lessons.
- Strengthen the connection between the story and musical interactions.
- Explore future improvements for learner guidance and reflection.

---

## This Week's Achievements

### Making Lessons More Visual

One of the biggest pieces of feedback this week was that the lessons still relied too heavily on written instructions. Since Music Blocks is primarily used by children between **7 and 11 years old**, long paragraphs can quickly reduce engagement.

To make the lessons easier to follow, I redesigned parts of the interface by replacing text with simple visual elements that naturally fit into the story.

The updated interface now includes:

- Character cards introducing Lyra and Beat.
- A visual bridge illustration showing the required melody pattern.
- Shorter instructions with clearer objectives.
- Story elements that communicate ideas visually instead of relying on long descriptions.

These changes make the lesson feel more like an interactive story than a traditional tutorial.

![Updated Story Introduction](/assets/Developers/Stuti-Jain/story_intro_updated.png)

---

### Connecting the Story to Music

Another important discussion focused on making the story interact more directly with the music itself.

Previously, learners were told that **A** represented *Hot Cross Buns* and **B** represented another musical phrase. While technically correct, these names were not meaningful within the story and introduced unnecessary complexity.

Instead, the lesson now encourages learners to:

- Play the **A** and **B** action blocks.
- Listen to how each musical chunk sounds.
- Use what they hear to rebuild the bridge melody.

This keeps the focus on listening, experimentation, and musical discovery while making the story feel more connected to the actual Music Blocks environment.

![Updated Level 1](/assets/Developers/Stuti-Jain/level1_updated.png)

---

### Improving the Story Experience

Alongside simplifying the lesson content, I also redesigned the introduction of the story itself.

The opening now introduces **Lyra** and **Beat** through visual character cards before beginning the adventure, helping learners quickly understand who they are travelling with throughout the journey.

Small visual details throughout the interface were also updated to better match the overall theme of **The Lost Melody Islands**.

---

## Mentor Feedback & Key Takeaways

Later this week, I shared the updated prototype with Walter and Devin for another review.

The overall response was encouraging. The simplified layout and additional graphics made the lesson feel much more approachable, and the story flowed more naturally than before.

Alongside this feedback, we discussed several ideas for future improvements.

### Connecting Beat to Music Blocks

One interesting observation was that Music Blocks already includes **Mr. Mouse** as one of its recurring characters.

Since Beat has become an important guide throughout the story, we discussed exploring ways to better connect the story with existing Music Blocks characters. This may involve renaming or redesigning Beat so that the narrative feels more integrated with the rest of the platform while still preserving the friendly personality of the character.

---

### Helping Learners During Exploration

The new exploration challenges encourage children to experiment beyond the minimum lesson requirements.

However, some challenges may still leave learners wondering how to perform a particular action.

We discussed several approaches for providing lightweight guidance without interrupting exploration:

- Clicking on a highlighted block could open its Help page directly.
- Hovering over an exploration challenge could provide small hints about the associated block.
- Additional contextual guidance could help learners understand new musical concepts while still encouraging discovery.

The goal is to support curiosity without simply giving away the answer.

---

### Planning a Learner Journal

Another exciting discussion focused on adding a **Journal** to Music Blocks.

Instead of immediately moving to the next lesson after completing a level, learners could write a short note describing what they discovered or enjoyed.

Each lesson would maintain its own collection of journal entries stored locally, allowing learners to revisit their thoughts over time and reflect on how their understanding has grown.

Because this feature would exist independently of the lesson system, it could later be expanded to include personal notes, sketches, audio recordings, or even short videos, making it a useful learning companion throughout Music Blocks.

---

### Improving Maintainability

Since many of the new story graphics are built entirely using HTML and CSS rather than image assets, we also discussed making the implementation easier for future contributors.

Adding clear comments throughout the code will help developers understand how these visual components are constructed and make it easier to reuse or extend them when building future lessons.

---

## Challenge & Key Learning

The biggest challenge this week was finding the right balance between reducing text and still providing enough guidance for young learners.

Replacing instructions with visual storytelling required thinking carefully about what information children truly need and how it can be communicated through illustrations, interactions, and simple language.

**Learning:** Educational interfaces often become more effective by showing rather than telling. Carefully designed visuals can reduce cognitive load while making the learning experience more engaging and intuitive for children.

---

## Next Week's Roadmap

- Redesign **Level 2** using the same visual-first approach by reducing written content and introducing story-driven graphics.
- Prototype a contextual **hint system** to help learners complete optional exploration challenges without reducing the sense of discovery.
- Explore ways to connect **Beat** with Music Blocks' existing **Mr. Mouse** character, making the story feel more integrated with the platform.
- Begin implementing a **Journal** feature within the Help menu, allowing learners to record and revisit their reflections throughout their adventure.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their detailed reviews and thoughtful suggestions throughout the week. Their feedback continues to shape both the educational direction and user experience of the lesson framework, helping transform it into a more engaging and accessible learning experience for young Music Blocks users.