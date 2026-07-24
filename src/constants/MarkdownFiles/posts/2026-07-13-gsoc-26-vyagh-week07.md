---
title: "GSoC '26 Week 07 Update by Shubham Sharma"
excerpt: "Starting the reflection engine as its own package with a first working path end to end, getting the first labels back on the rewritten question-quality test, working out what the constructionist reading means for the design, and taking the entry view exploration further"
category: "DEVELOPER NEWS"
date: "2026-07-13"
slug: "2026-07-13-gsoc-26-vyagh-week07"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week07,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-07-06 - 2026-07-12  

---

## Goals for This Week

- Get the reflection engine building as its own package, with a first path running end to end
- Get labels back on the rewritten question-quality test
- Work out what last week's constructionist research means for the design
- Take the entry view exploration further in mockups
- Keep peer reflection queued behind the other threads

---

## This Week's Progress

### 1. The reflection engine build started

[Last week](news/all/2026-07-06-gsoc-26-vyagh-week06) I looked at what was worth keeping from the current engine and decided it should live as its own package, separate from the Sugar prototype. This week I started writing the code.

#### The empty shell first
I set up the package by itself: something that installs, imports, and passes its tests, before adding any behaviour. That gave me a base to build on, instead of guessing at the structure later.

#### The first complete path
Then I wired it together. The child's work goes in as text, the engine passes it to the AI with a short instruction to ask one open question, and one question comes back. That is the whole loop, and it ran from start to finish.

#### Working with different AI services
I also set the engine up to work with different AI services, including a local one that could run without an internet connection. That matters for the low-power, often offline machines Sugar runs on. For now this is just the ability to plug in different AIs. It is not a finished offline mode yet.

#### What the engine does not do yet
The instructions I gave the AI this week are a placeholder. The engine does not save anything, has no safety checks, and only asks a single question so far. The point was to get one complete path working, so I could see where the next work needs to go.

### 2. Labels came back on the question-quality test

Last week the rewritten sheet was ready to go back out for labelling. This week it went out, and the first labels came back.

#### Two readers
Walter and Diwangshu each went through the 26-line sheet on their own, marking each line as a good or weak reflection question from the AI. They agreed on twenty of the twenty-six.

#### Where they read a line differently
The six they read differently fall into two kinds. Some are judgment calls, like whether the AI should suggest an idea to the child or name a feeling for them. In a couple of others, the AI misread what the child said. This is the kind of thing the test is meant to surface, which I wrote about in [week five](news/all/2026-06-29-gsoc-26-vyagh-week05). Here is a made-up example, so no real test line is exposed:

- **Weak:** "Great job finishing your story!"
- **Strong:** "What made you decide to end the story there?"

#### A third reader
Devin agreed to add his own labels next week, and a conversation with him raised a bigger question: right now the test judges the AI's lines one at a time, but eventually the whole back-and-forth needs to be judged as reflection. I am starting with single lines, and the whole conversation comes later.

### 3. What the constructionist research means for the design

[Last week](news/all/2026-07-06-gsoc-26-vyagh-week06) I finished reading Kahn's, Bender's, and Papert's older work on kids, computers, and learning. This week I worked out what it means for the design.

#### What the reading confirmed and changed

- **Asking instead of telling is an old idea.** It shows up across decades of older work on kids and computers, often in almost the same words.
- **One line of instruction is not enough.** In the older work, someone tried a simple "ask, do not tell" instruction. It worked for a while, then drifted back into giving answers. The AI needs more than one line to keep it asking.
- **No points or badges.** Keeping reflection free of points and badges is well supported by the reading. It turned up real programs built the opposite way, with points and feeds, used as an example of what not to do.
- **One buddy is enough.** Starting with one buddy, Jo, is better supported than starting with several. One AI voicing several characters can come across as staged, and a character can pick up a mistake and repeat it.
- **Reflection can go wrong in specific ways.** Too many doubtful questions can make a child who was right start to doubt themselves. Being too agreeable stops the AI being honest. Reflection can also turn into stalling instead of doing the work.

#### Two open questions

- **Timing.** Most of the older work has children reflect during the activity, while it is still fresh. This project's main automatic nudge comes after the activity, because the Journal only opens once the activity closes. That is a technical constraint, not a teaching choice. The design also lets a child open reflection during an activity if they want.
- **Closing the loop.** Showing a child their own "next thing to try" note when they come back is a good idea, but it has failed before. In one older system the note was displayed but never fed back into anything. I have to make sure the note actually reaches the next session.

### 4. Taking the entry view exploration further

Last week I moved the entry view work from code into mockups. This week I took that further: another round of mockups, and the screens joined into one prototype you can click through.

#### A decision board
I laid out [the design choices](https://gsoc-html-share.vercel.app/mockups/third-pass/Reflection%20-%20Decision%20Board) at each point, with a suggested default for each, so a direction can be worked out step by step.

#### Layout options and a clickable prototype
I put [a few layout options for a single opened entry](https://gsoc-html-share.vercel.app/mockups/third-pass/Reflection%20Entry%20-%20Three%20Layouts) side by side, and joined the screens into [a prototype you can click through](https://gsoc-html-share.vercel.app/mockups/third-pass/Reflective%20Journal%20-%20End%20to%20End%20Prototype): the home screen, an activity, the Journal, and the opened entry.

#### How much the AI should interrupt
I also sketched [how much the AI should step in, and how gently](https://gsoc-html-share.vercel.app/mockups/third-pass/Reflection%20Spec%20v2%20-%20Visual%20Sheet).

![The opened Journal entry in the working prototype: the child's painting with kept moments beside it, their own words, a friend's comment, a next-time idea, and Jo's panel on the right in conversation about the work.](/assets/Developers/vyagh/gsoc26-week7-entry-reflection.webp)

All of this is still a standalone prototype and set of mockups. None of it has gone into the actual Sugar Journal yet.

### 5. Peer reflection stays queued

Peer reflection builds on single-child reflection. It needs the engine to run a good reflection on its own first, and it needs the single-child entry view design settled, since the two-child version is an extension of the one-child one. Neither is finished yet, so peer reflection is next in line behind them.

---

## Key Learnings

- **Getting one complete path working showed me where the next work needs to go.** Building the whole loop first, even with placeholder instructions, made the gaps clear.
- **Two readers agreed on twenty of twenty-six lines.** The six they read differently look like judgment calls.
- **Showing a next step on screen does not mean it gets used.** The older systems only displayed it, so this project has to feed it back into the next session.

---

## Next Week's Roadmap

- **Get Devin's labels in and build the scorer.** Once all three sets of labels are in, I can build the scorer to grade the AI's lines against them.
- **Keep refining the design.** Carry the mockups and the prototype toward something worth building.
- **Keep building the engine, one piece at a time.** The next step is replacing the placeholder question with the real reflection instructions, then moving from a single question toward a back-and-forth.
- **Peer reflection stays queued** until the engine and the single-child design are further along.

---

## Resources & References

- **Prototype and mockups:** [gsoc-html-share.vercel.app/mockups/third-pass](https://gsoc-html-share.vercel.app/mockups/third-pass/)
- **Engine spec:** [gsoc-html-share.vercel.app/spec](https://gsoc-html-share.vercel.app/spec)
- **Week 6 blog:** [GSoC '26 Week 06 Update](news/all/2026-07-06-gsoc-26-vyagh-week06)
- **Week 5 blog:** [GSoC '26 Week 05 Update](news/all/2026-06-29-gsoc-26-vyagh-week05)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter, who answered a lot of my questions this week and put time into labelling the question-quality sheet, and to Diwangshu, who did the same. Thanks to Devin for agreeing to add his labels and for a helpful conversation about judging whole conversations, to Ibiam for mentoring me through the week, and to Mebin, Harshit, and Aman for their input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
