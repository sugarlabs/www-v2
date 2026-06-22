---
title: "GSoC '26 Week 03 Update by Shubham Sharma"
excerpt: "Rethinking the reflection engine, redesigning the Journal entry view, and exploring peer reflection"
category: "DEVELOPER NEWS"
date: "2026-06-15"
slug: "2026-06-15-gsoc-26-vyagh-week03"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week03,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-06-08 - 2026-06-14

---

## Goals for This Week

- Take a proper look at the reflection engine and figure out what it really needs to be
- Redesign the plain Journal entry view into something that actually feels like a place to reflect, and build mockups
- Get a feel for how collaboration works in Sugar and Sugarizer, and what peer reflection could look like

---

## This Week's Progress

### 1. Rethinking the reflection engine

I went back to the reflection engine I built and realised I'd made it way too complicated. A lot of it was just code for problems I never really had:

- a fallback that stitched questions together from word lists,
- data I was saving but never actually using,
- an old version of the engine still hanging around next to the new one.

So instead of patching it bit by bit, I figured I'd start fresh. The plan now is to rebuild it from scratch and keep only what's actually needed. That's what I'm getting into next. This week was mostly about seeing the mess clearly and deciding to start over properly.

Here's the engine as it stands right now, the one I'm about to rebuild:

![Architecture diagram of the current reflection engine](/assets/Developers/vyagh/reflection-engine-diagram.webp)

### 2. Looking at how others have done this

To figure out what the engine should actually be, I've been reading up on projects that tried similar things with kids.

Most of the recent ones are coding helpers rather than reflection tools, but they're useful because they show the trap I want to avoid:

- [Scratch Copilot](https://arxiv.org/abs/2505.03867) (ages 7–12) is told, right in its prompt, to give the answer if a kid asks the same thing more than twice.
- [ChatScratch](https://arxiv.org/abs/2402.04975) (ages 6–12) hands kids ready-made code and art.
- [JELAI](https://arxiv.org/abs/2511.18985), a tutor for older students, found a careful prompt on its own still wasn't enough to stop kids leaning on it for answers — it took an extra nudge.

Same pattern every time: it's easy for the AI to slip into giving answers, and hard to make it hold back.

The projects that were actually about reflection are older, from before any of this AI stuff existed. [Jots](https://dl.acm.org/doi/10.1145/1551788.1551858), from MIT back in 2009, had no AI at all, kids just wrote short notes about the projects they were making. So there isn't really anything out there right now doing what I'm trying to do, which is honestly part of why it feels worth doing. One thing from back then still rings true though: the kids barely reflected on their own unless an adult nudged them to.

I don't have it all figured out yet, this is still shaping how I think about it. But one thing feels pretty clear: I need some way to tell whether one of the AI's questions is actually good before I can make it better, and there's no ready-made way to measure that for kids. So I've started putting one together, a small set of good and bad example questions for the same piece of work, with the reason each one works or doesn't.

### 3. Redesigning the Journal entry view

The Journal entry view is where reflection is supposed to happen, and right now it's pretty plain, almost like a file screen with an empty description box that most kids never fill in.

What I want is to turn it into something that actually pulls a child into reflecting, instead of just being a form to fill out. That comes from the idea the whole project sits on: kids learn by making something and then thinking about what they made. Reflection is the bit that closes that loop, so the screen should help a kid think about their work, not just store it.

In practice that meant putting the child's work and the reflection right next to each other, so the questions from Jo, the reflection buddy, sit beside the thing they're about. The conversation becomes the main part of the screen instead of a little box at the bottom. I made a bunch of mockups trying out different versions of this and put them online, with the current engine diagram on the same page, so the mentors can click through and tell me what they think.

![A redesigned Journal entry view](/assets/Developers/vyagh/gsoc26-week3-journal-redesign.webp)

- **Mockups and diagram:** [gsoc-html-share.vercel.app](https://gsoc-html-share.vercel.app/)

### 4. How collaboration works in Sugar and Sugarizer

Before designing peer reflection, I wanted to see how kids actually work together in Sugar and Sugarizer right now. The two sides of it are really different.

**Inside activities, it's live.** I jumped into Maze, Paint, and Memory, and kids work on the same thing at the same time. Sugar does this through a system called Telepathy, which connects kids either over a local network or through a server. Telepathy just opens a shared channel between them, and each activity builds its own thing on top, so it works a bit differently from one to the next.

**In the Journal, it's barely there.** There's no shared session at all. You can send an entry to a friend, but that's just a one-way copy, and the entry view shows who took part without letting you do anything together. So here, collaboration pretty much just means showing who's around — honestly, it looked half-finished to me.

Looking at all this gave me a bigger idea: an AI sidebar inside the activities that could nudge kids to reflect together while they're working, live. I really like it, but it's way too much for one summer, so I'm parking it. The plan is to build peer reflection in the Journal first, and bring the same idea into activities later on.

### 5. How the AI could facilitate peer reflection

The open question is what the AI actually does once it kicks off a peer reflection. I've got four options, going from the AI staying in charge to the AI just getting things going and stepping back:

![The four peer-reflection options on a spectrum, from most AI involvement to least](/assets/Developers/vyagh/peer-reflection-spectrum.webp)

1. The AI leads the whole way, it asks, the kids answer, it asks the next question, and so on. It stays the teacher the whole time. This is the most AI in the mix.
2. The AI starts them off, then steps back and only jumps in at quiet moments to get things going again. This is closest to Walter's idea, a spark rather than a referee: _the AI helps start the reflection, and then the children reflect together._
3. The AI gives each kid a private question to ask the other one, so they end up interviewing each other instead of answering one question as a group.
4. The AI sets up a simple game, something like "take turns: one thing you're proud of, one thing that was hard," and lets the kids run with it.

I'm leaning toward the second one, but I want to talk it through with the mentors first.

---

## Key Learnings

- I made the first engine way too complicated. The right move wasn't to keep patching it, it was to step back and rebuild it from scratch.
- Most of the AI tools I looked at are built the same way and run into the same problem, they slip back into giving answers. So the hard part isn't really the code, it's the teaching, and I think it comes down to being able to measure what makes a good question.
- Collaboration in Sugar and Sugarizer means two different things, live inside activities, barely there in the Journal. Peer reflection has to work around that.

---

## Next Week's Roadmap

- Rebuild the reflection engine from scratch, keeping only what's really needed.
- Build out the good-and-bad question set in two steps, a quick first version I can check myself, then a fuller one shaped with Walter.
- Start moving the redesign past mockups and into the actual Journal entry view.
- Talk the four peer reflection flows through with the mentors and pick one.

---

## Resources & References

- **Live prototype:** [sugarizer.vercel.app](https://sugarizer.vercel.app)
- **Mockups and architecture diagram:** [gsoc-html-share.vercel.app](https://gsoc-html-share.vercel.app/)
- **Week 2 blog:** [GSoC '26 Week 02 Update](news/all/2026-06-08-gsoc-26-vyagh-week02)
- **Week 1 blog:** [GSoC '26 Week 01 Update](news/all/2026-06-03-gsoc-26-vyagh-week01)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter for the idea behind peer reflection, that the AI starts it and the kids carry it from there, and for pushing me to treat question quality as the real problem. Thanks to Ibiam, Diwangshu, Mebin, Harshit, and Aman for the feedback this week.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
