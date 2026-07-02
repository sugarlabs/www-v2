---
title: "GSoC '26 Week 04 Update by Shubham Sharma"
excerpt: "Starting the engine rebuild, a question-quality test that passes, building the Journal redesign, and a simple start on peer reflection"
category: "DEVELOPER NEWS"
date: "2026-06-22"
slug: "2026-06-22-gsoc-26-vyagh-week04"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week04,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-06-15 - 2026-06-21

---

## Goals for This Week

- Start rebuilding the reflection engine from scratch
- Build the question-quality test, the simple version first, then prepare the harder one for the mentors
- Move the Journal redesign from mockups into the actual prototype

---

## This Week's Progress

### 1. Rebuilding the reflection engine

This week was the design work for the rebuild, before any of the code.

#### Re-deriving the design
I re-derived the whole design from scratch instead of patching the old engine, with my earlier conclusions set aside so I wouldn't just reproduce them. It landed on essentially the same design, which confirms the direction. It also showed where I'd over-built: a planned sub-system for tracking the child's ideas turned out to be redundant, since the model already tracks them from the chat, so I cut it along with a few other unused parts.

#### Two refinements for ages 8 to 12
- **Connecting should be concrete.** Link to what the child actually did ("how is this like something you made before?") rather than abstract self-reflection ("what does this say about who you are?"), which tends to fall flat at that age.
- **Most activities aren't visual.** Writing, music, and reading don't produce a meaningful screenshot, so the dependable basis for reflection is the child's own account of what they did, with the artifact as a bonus when it's informative.

#### Making the engine its own package
The engine is currently tangled inside the prototype, which is the wrong place for it. It should be its own importable package so any surface (Sugar, Sugarizer, a future activity) can use it the same way, and so it runs offline. Settling this now avoids reworking it after the rebuild.

![Before: the engine tangled inside the prototype. After: a standalone engine library any Sugar surface plugs into.](/assets/Developers/vyagh/gsoc26-week4-engine-package.webp)
*The engine moves out of the prototype into a standalone package any Sugar surface can use.*

### 2. The question-quality test

The eval, a way to measure whether one of the AI's questions is good, is the keystone the rest of the engine depends on, so I'm building it before tuning the prompt. The earlier version couldn't tell a strong answer from a mediocre one, so it couldn't show whether the engine had improved; this time the measure comes first.

#### Step one: the basic check (done)
Can it reliably separate an obviously good question from an obviously bad one? Built, run, and passing. I also confirmed it can see the specific quality that matters, whether a question helps a child connect their own ideas, not just good-versus-bad in general, since a test can pass overall while being blind to that.

#### Step two: the hard cases (prepared)
The subtle, borderline cases need someone who works with kids to judge. I assembled a set of near-miss examples across the activity types (writing, music, reading, not just drawings), plus a rubric for the mentors written as an open question rather than my expected answer, so their labels test the approach instead of echoing it. It needs a final pass before it goes to them.

![The question-quality test in two steps: the obvious cases the test handles, and the subtle ones the mentors judge.](/assets/Developers/vyagh/gsoc26-week4-eval-two-step.webp)
*Step one's clear cases the test handles; step two's subtle ones need a human to call.*

#### Where it stands
Passing step one is a low bar, it only confirms the easy cases. Whether the test catches the subtle cases, and whether the approach actually helps children reflect, are still open.

### 3. Building the Journal redesign for real

The redesign is being built in small, presentation-only slices. Slice one is committed and code-reviewed; live verification across the four activities is the one step left.

#### What slice one changes

- **Artifact as the focus.** The child's work leads the screen and the reflection reads as a conversation, not another form field.
- **Jo's own mark.** Jo, the reflection buddy, gets a distinct mark instead of reusing the activity icon.
- **Description ownership.** The description is labelled as the child's, with a note that Jo never writes it.
- **Tag pills.** Tags are add/remove pills over the same stored string.

None of this touches the engine or the stored data, it's purely presentation.

#### What's planned next
The bigger pieces are held for later slices and currently out of scope: a think-back banner that resurfaces last session's next step, AI tag suggestions, and offline reflection prompts.

### 4. Peer reflection

Peer reflection, children reflecting together, has been the open thread carried over from last week, when I'd narrowed it to four possible flows for what the AI does once it opens one. This week I took them to Walter.

#### Walter's steer: start simple
He wasn't sure the AI is even needed for a couple of the flows, especially the one that just sets up a game. Rather than building a complex multi-child flow, he suggested starting with the smallest thing that works.

#### A simple starting point
The rough idea: one child reflects at their laptop while another is possibly nearby in the same room, on a laptop or not. Every so often the AI nudges, something like "is there anyone near you you'd want to talk to about this?", and the two talk in person. It needs no networking, works offline, and sidesteps the hard parts (syncing, watching several children at once). The fuller, live version waits for later.

---

## Key Learnings

- **Rebuilding from scratch was a check, not wasted work.** Landing on the same design confirmed the direction instead of just re-confirming a preference.
- **A test that only handles easy cases proves little.** It's easy to mistake a passing test for a working system.
- **Where the engine lives matters.** Pulling it out of the prototype into its own package keeps it usable offline and reusable elsewhere.

---

## Next Week's Roadmap

- **Send the mentors the question-quality materials,** then build the scorer once their labels come back.
- **Start the engine rebuild proper,** beginning by moving the test into the engine's own package.
- **Live-verify the Journal slice** across the four activities, then start the next slice.
- **Turn the simple peer-reflection idea into a first version** to build, now that Walter's pointed at a simple starting point.

---

## Resources & References

- **Live prototype:** [sugarizer.vercel.app](https://sugarizer.vercel.app)
- **Mockups and diagram:** [gsoc-html-share.vercel.app](https://gsoc-html-share.vercel.app/)
- **Week 3 blog:** [GSoC '26 Week 03 Update](news/all/2026-06-15-gsoc-26-vyagh-week03)
- **Week 2 blog:** [GSoC '26 Week 02 Update](news/all/2026-06-08-gsoc-26-vyagh-week02)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter for shaping the question-quality test and for calibrating the hard cases, and to Ibiam, Diwangshu, Mebin, Harshit, and Aman for the feedback this week.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
