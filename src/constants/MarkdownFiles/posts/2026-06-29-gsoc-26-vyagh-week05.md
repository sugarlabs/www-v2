---
title: "GSoC '26 Week 05 Update by Shubham Sharma"
excerpt: "Writing the engine spec for the mentors, the first labels on the question-quality test and a reset, rebuilding the Journal entry view from scratch, and a check of Sugar's default activity set"
category: "DEVELOPER NEWS"
date: "2026-06-29"
slug: "2026-06-29-gsoc-26-vyagh-week05"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week05,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-06-22 - 2026-06-28

---

## Goals for This Week

- Define the reflection engine's contract and write it up as a spec for the mentors to review
- Send the mentors the question-quality sheet from last week and work through their labels
- Build the rest of the Journal redesign past the first slice, and check each slice live
- Take the simple peer-reflection idea from last week and give the track a proper home

---

## This Week's Progress

### 1. Writing the engine spec for the mentors

Last week I decided the reflection engine should be its own standalone package. The next step is its contract, so this week I wrote the full spec and shared it with the mentors for review (Walter had asked to see it).

The spec covers:

- the engine's inputs and outputs,
- the rules that keep the AI asking rather than answering,
- how a conversation is stored.

It is online at [gsoc-html-share.vercel.app/spec](https://gsoc-html-share.vercel.app/spec). With the contract written down, the engine and the surfaces can be built in parallel against it, rather than each reinventing how to talk to the engine.

#### Two corrections from checking against the source
Checking each claim against the live source caught two errors:

1. the work-preview is sent to the model, not kept on the device;
2. the storage field names did not match the code.

Walter's read was positive, with two questions:

1. **Which mime type the engine uses:** the entry's own, not the set an activity can open.
2. **Whether peer reflection is in this contract:** no, it stays single-child.

### 2. The question-quality test: labels and a reset

Last week I built the question-quality sheet: good and bad example replies for the same child's work, to measure whether one of the AI's questions is good. This week I sent [the 26 items](https://docs.google.com/document/d/1VYXnHo92BtMKJx606Tixh2KQ7tQk6WBXn8wVygdomHk/edit?usp=sharing) and got labels back from three mentors, Walter, Aman, and Diwangshu, each labelling independently.

#### The labels
Each item pairs the same child line with two AI replies, one asking a question and one making a statement. For a child who drew a house with a bright door:

- **The question** ("What made you pick that colour?") keeps the child thinking.
- **The statement** ("That bright door really stands out, doesn't it?") answers for them.

That distinction is what the test measures.

Two points came up from all three:

1. **Use words a child would use.** One reply used "style," which an eight-year-old would not.
2. **Respond to what the child said before moving on,** such as a child noting their writing "doesn't read very well yet."

Reading the sheets also caught two issues in the sheet itself:

1. a note pasted onto the wrong item,
2. one of my examples with a flaw of its own rather than in the AI's reply.

#### The disagreements
The raters mainly disagreed on how much the AI should step in. The same reply, a gentle correction, a nudge to fix something, or a bit of praise, looked fine to some and like the AI taking over to others. That is the harder call, and the one the test exists to pin down.

The numbers are provisional: the gold standard needs a second anchor with classroom experience, which has not come back yet.

#### The reset
The mentors found the sheet read too formally overall, closer to a textbook than to real children. So this round of 26 is now a pilot, to be rewritten in a realistic child voice before it is labelled for real. The rewrite changes only the wording, not what each item tests. One item is on the fix list: it refers to a "page" the child could have made or read, which split the raters.

I had planned to build the scorer once the labels came back. With the reset, the scorer and the engine rebuild that depends on it both wait for the rewritten, re-labelled sheet.

### 3. Rebuilding the entry view

I first built the redesign as small presentation-only slices on the existing entry form, the feed-forward loop, an offline floor, and a Journal-list banner, each changing only the screen and verified live in a browser in a separate pass from the build.

On review, that incremental reskin was not ambitious enough for a headline feature, so I rebuilt the entry view from scratch. It treats the entry as a place to think rather than a form to fill:

- a feed-forward spine across the top: last time you wanted to, today, and next you'll try;
- the artifact and its details on a side rail;
- the conversation with Jo, the reflection buddy, in the middle;
- "keep these words," where the child marks their own phrases and adds them to their description, which stays theirs (Jo helps them think; they keep the pen);
- a "Friends wondered" area for peer questions.

![The old Journal entry view: a plain form with empty description, tags, and comments.](/assets/Developers/vyagh/gsoc26-week5-journal-before.webp)
*The old, plain entry view.*

![The rebuilt entry view: the artifact, the conversation with Jo, a feed-forward spine, and the child's kept words feeding their own description.](/assets/Developers/vyagh/gsoc26-week5-journal-after.webp)
*The rebuilt entry view, a reflection space.*

### 4. Sugar's default activity set

The offline questions and the test's coverage depend on the kind of activity, so I checked a real Sugar install rather than assume from the prototype. The standard set is ten activities, with no drawing activity: Paint and TurtleArt are not included.

The Sugarizer prototype is the opposite, drawing-heavy, so its four activities are not representative. I key the offline questions and coverage off the activity type, not the specific prototype activities, so both carry over to Sugar.

![The standard Sugar activity set: ten activities, none for drawing.](/assets/Developers/vyagh/gsoc26-week5-sugar-activities.webp)
*The standard Sugar set: ten activities, and no drawing app.*

### 5. Peer reflection: first version

Last week I described the simple starting point: a child reflects alone, the AI nudges them to talk to someone nearby, and they talk in person. This week I settled it into a first version and gave the track its own notes.

Two things got pinned down. After the two talk, the AI asks what they figured out and saves it as the reflection. And the AI only ever gives a child a question to ask, never a line to repeat.

The fuller version, two children sharing one reflection in the app, stays parked: it needs a shared session the Journal cannot host as it is.

---

## Key Learnings

- **Writing the spec caught two errors** I would otherwise have shipped.
- **The raters disagreed mainly on how much the AI should step in,** which is what the test exists to measure.
- **A robotic sheet measures the wording, not the question,** so the material has to be realistic first.
- **Running the browser check as a separate pass from the build** caught what eyeballing would miss.
- **Standard Sugar has no drawing activity,** so the work keys off activity type, not the prototype's apps.

---

## Next Week's Roadmap

- **Rewrite the sheet in a realistic child voice,** read it aloud, flag the design-quirk items to Walter, and send it for re-labelling.
- **Build the scorer once the real labels return,** so the test can run against the questions.
- **Run the AI conversation end to end** in the rebuilt view, which needs the backend running locally.
- **Turn peer-reflection v1 into a plan and a first build.**

---

## Resources & References

- **Live prototype:** [sugarizer-ui.vercel.app](https://sugarizer-ui.vercel.app)
- **Engine spec:** [gsoc-html-share.vercel.app/spec](https://gsoc-html-share.vercel.app/spec)
- **Question-quality sheet:** [the 26 items I sent to the mentors](https://docs.google.com/document/d/1VYXnHo92BtMKJx606Tixh2KQ7tQk6WBXn8wVygdomHk/edit?usp=sharing)
- **Week 4 blog:** [GSoC '26 Week 04 Update](news/all/2026-06-22-gsoc-26-vyagh-week04)
- **Week 3 blog:** [GSoC '26 Week 03 Update](news/all/2026-06-15-gsoc-26-vyagh-week03)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter for reviewing the spec, steering the eval reset, and labelling the question sheet, and to Aman and Diwangshu for labelling it too. Thanks also to Ibiam, Mebin, and Harshit for their feedback this week.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
