---
title: "GSoC '26 Week 02 Update by Shubham Sharma"
excerpt: "Activity-agnostic preview capture, multimodal reflection, and metadata-driven context"
category: "DEVELOPER NEWS"
date: "2026-06-08"
slug: "2026-06-08-gsoc-26-vyagh-week02"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week02,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/diwangshu-kakoty), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-06-01 - 2026-06-07

---

## Goals for This Week

- Expand the prototype beyond two activities to test the reflection system across different activity types
- Make the AI multimodal so it can see the child's preview image
- Explore what metadata is available across activities for use as reflection context

---

## This Week's Progress

### 1. Activity-agnostic preview capture

Last week the prototype had per-activity code to capture preview images. That won't scale when we need to support more activities.

Sugar's desktop toolkit already solves this. In `sugar-toolkit-gtk3`, the base `Activity` class has a `get_preview()` method that captures the canvas via Cairo and stores it as `metadata['preview']`. Every activity inherits it, no custom code per activity. I followed the same approach in the prototype so that the design stays consistent with how it'll work in the actual Sugar implementation.

The web version does the same thing: find a visible `<canvas>`, check it has actual drawn content, write the result to `metadata.preview`. Adding a new activity to the prototype is now just an entry in the deploy config.

### 2. From two activities to four

Walter suggested adding a game activity during our calls. Games are different from creative tools: the conversation should be about strategy and what happened during play, not artistic choices.

Aman suggested Write. It uses a rich text editor (Quill), not a canvas, so there's no visual preview at all.

The prototype now covers four activity types:

- **Paint** (visual art) and **Turtle Blocks JS** (programming): both have canvas-based previews
- **Write** (writing): uses Quill, no canvas, so no visual preview at all
- **Blockrain** (gaming): canvas preview, but no "artifact" to reflect on

![Sugar Home View with 2 new Activities (Write & Blockrain)](/assets/Developers/vyagh/home-view-week2.webp)

### 3. Multimodal reflection

Previously the reflection AI only had the activity name and project title to work with. Now the frontend extracts the preview image from the journal entry and sends it to the backend, which passes it to Gemini as an inline image.

With the preview, the AI can reference things actually visible in the child's work instead of asking generic "what did you make?" questions.

![Blockrain Journal Entry View with Reflection AI having the context of Preview Image](/assets/Developers/vyagh/blockrain-reflection.webp)

### 4. Metadata audit and per-activity guidance

I mapped out what metadata Sugar's `Activity` class and Sugarizer's journal already store:

- Activity type (`activity` / bundle ID)
- Title
- Time spent (`spent-times`)
- Tags, description
- Buddy colors
- Saved object text

The schema is the same in both Sugar and Sugarizer. Anything that works here will work on the desktop.

The backend currently uses activity type, title, duration, and the preview image. I also added per-activity guidance to the system prompt, one line per activity telling the AI what to focus on:

- **Paint**: visual choices and what the artifact shows
- **Turtle Blocks**: the program, how the child built or debugged it
- **Write**: the writing, revision choices, what the child wants a reader to notice
- **Blockrain**: game strategy, challenges, what to try next time

The saved object text (`this.text` on the frontend) is the next piece of context to wire up.

### 5. Vercel deploy workflow

Connected Vercel to the deploy repo with `prod` as the production branch. Feature branches get their own preview URLs automatically.

**Production URL:** [sugarizer.vercel.app](https://sugarizer.vercel.app)

### 6. Reflection trigger point (design discussion)

Walter and Aman raised the question of where the reflection should be invoked. Right now the prototype opens it from the Journal detail view, but another option is to trigger it inside the activity right after the child stops. We need mockups to evaluate both before committing.

---

## Key Learnings

- **Activity-agnostic is the right default.** Sugar's toolkit already provides most useful context (preview, title, duration, tags, saved text) through generic metadata. A one-line guidance string per activity is enough. Custom adapters per activity type won't scale.
- **Different activities surface different constraints.** Games have no "artifact", so the reflection is about the experience. Write has no visual preview, so the AI works from text alone. These are edge cases worth finding early.

---

## Next Week's Plan

- **Reflection context engine.** Build the system that assembles all available context (metadata, preview, saved text, activity guidance) into a structured payload for the AI. This is the core piece that determines reflection quality.
- **Reflection trigger mockups.** Create UX mockups for in-activity vs Journal-based reflection invocation, based on the design discussion with Walter and Aman.
- **UI improvements.** Explore UI/UX improvements for Journal Entry.

---

## Resources & References

- **Live prototype:** [sugarizer.vercel.app](https://sugarizer.vercel.app)
- **Week 1 blog:** [GSoC '26 Week 01 Update](news/all/2026-06-03-gsoc-26-vyagh-week01)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter for pushing the game activity addition and to Aman for suggesting Write. Both helped uncover edge cases in the reflection design. Thanks to Ibiam, Mebin, Harshit, and Diwangshu for the continued feedback.

---
