---
title: "GSoC '26 Week 06 Update by Ashutosh Singh"
excerpt: "Phase 2 user testing starts and people type short prompts, so I build the Enhance flow and local RAG to fix it at the source. Plus the big structural move: lifting AOD out of Sugar OS into its own standalone project."
category: "DEVELOPER NEWS"
date: "2026-07-08"
slug: "2026-07-08-gsoc-26-ashutoshx7-week06"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week06,ashutoshx7,rag,prompt-enhancement,standalone,user-testing,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** June 30, 2026 to July 6, 2026  

---

## Goals for This Week

- Actually kick off Phase 2 small group user testing on the new Flatpak build
- Watch real people use the Prompt Screen and see what breaks
- Fix the "short prompt produces a weak activity" problem at the source instead of blaming the model
- Ground generation in real Sugar activities rather than hoping the model just knows Sugar
- Lift AOD out of the Sugar OS shell and into its own standalone project

---

## This Week's Achievements

Last week I shipped the Flatpak so testers could install AOD in one command. This week I finally got to use it for what it was for, which was putting the tool in front of people who are not me. Phase 2 started. And the very first lesson landed within about ten minutes of the first session.

People type short prompts.

I had been testing with things like "a fraction matching game with three difficulty levels and instant feedback when the answer is wrong." A real person types "math game" and hits send. That is the whole prompt. And then they look at the mediocre thing that comes back and, fairly, decide the tool is not very good. The problem was never the model. The problem was that the model was being handed almost nothing to work with and left to guess at the other 90 percent.

So a big part of this week became about the input, not the output. But there was a second, more structural piece too. Alongside the testing work, I lifted AOD out of the Sugar OS codebase and into its own standalone project, which is the thing that turns it from "my branch of Sugar" into software anyone can pick up.

![The Prompt Screen where the learner describes an idea, picks a template category and license, and can enhance a short prompt before generating](assets/Images/gsoc26-ashutoshx7/aod-prompt-screen.png)

### 1. Phase 2 Started, and It Was Humbling

I ran the first sessions with a small group from the Sugar community, a couple of fellow contributors and a teacher who was kind enough to sit with me. I did the thing Walter kept telling me to do, which was shut up and watch instead of narrating. That was hard and also the most useful hour of the week.

What I saw, over and over: rough, short prompts. Not because anyone was lazy, but because that is simply how people describe an idea before they have thought it all the way through. "typing practice." "a game about the planets." "quiz." My generator was treating those three words as a complete spec, and it showed.

### 2. The Enhance Flow

So I built prompt enhancement into the pipeline. There is a new module, `enhance.py`, whose only job is to take a short or rough learner idea and expand it into a clearer activity brief before any generation happens. It fills in the parts a person leaves implicit: what the learner actually does, what a win or a correct answer looks like, roughly what should be on screen.

On the Prompt Screen this shows up as:

- A **✨ Enhance** button, so you can grow your idea into a brief on demand and see what the model thinks you meant
- An **auto-enhance** toggle, which automatically runs enhancement on prompts that are clearly too short to generate anything decent from
- The enhanced brief shown back to you in the chat before generation runs

That last part matters more than it looks. The enhanced brief is not hidden. You see exactly what got added, and if it guessed wrong you can edit it or turn enhancement off. I did not want a tool that silently rewrites what you asked for and then builds something you never described. The whole point is that you stay in charge of the idea.

### 3. Grounding Generation in Real Sugar Activities

The other half of the input work was making the model write more like Sugar and less like a generic Python tutorial. The system prompt from Week 3 got us far, but a prompt can only describe conventions. It cannot show a hundred real examples.

So I added a local retrieval layer, `rag.py`. Before generating, it pulls patterns out of real Sugar activities that are already installed on the machine and feeds the relevant ones into the planner. If you ask for a drawing activity, it can lean on how existing activities actually set up a canvas and save to the Journal, instead of inventing something that looks plausible but is not how Sugar does it. It runs locally, over activities already on your system, and nothing is uploaded anywhere or used for training.

### 4. Porting AOD Out of Sugar OS Into Its Own Project

Here is the structural move I am most glad about. Until now, AOD lived inside my fork of the Sugar OS shell, tangled into the `jarabe` codebase. That was the right place to build it, because it let the experience run embedded in the Sugar home view. But it also meant that trying AOD required a full Sugar OS development environment, and it meant the code was married to the whole desktop.

So I pulled the entire thing out into its own standalone project: a normal `src`-layout Python package, `sugaraod`, organized by domain instead of one flat pile of files. `core/` for the spec and licenses, `llm/` for the providers and this week's enhance step, `generation/` for the pipeline and RAG, `service/`, and `ui/`. The studio now depends on the Sugar **toolkit** as a library, the same way any GTK app depends on GTK, and not on the Sugar OS shell at all. I added a test that enforces exactly that: it fails if any `jarabe` shell module is ever imported, so the separation cannot quietly rot later.

![AOD running as its own standalone studio, with the Sugar-style home carried over from the shell](assets/Images/gsoc26-ashutoshx7/aod-modify-create.png)

The Sugar feel came along for the ride. The home screen is still the Sugar-style ring of activities around your XO icon, ported out of the shell's favorites layout, so it looks and moves like Sugar even though the shell is gone. The payoff is simple: AOD now runs on any Linux desktop on its own, and the code is finally a project rather than a patch.

---

## Challenges & How I Overcame Them

**Deciding when to auto-enhance.** If someone already wrote a careful, detailed prompt, rewriting it is insulting and usually makes it worse. So auto-enhance only fires when a prompt is clearly too thin to build from, and the explicit ✨ button is always there for the in-between cases. Short and vague gets help. Detailed and deliberate gets left alone.

**RAG over a tiny corpus.** On a fresh machine there might only be a few installed activities to retrieve from, so noisy retrieval was a real risk. I tuned it to prefer a small number of clearly relevant snippets over stuffing the prompt full, and to fall back gracefully to the plain system prompt when nothing good matches.

**Cutting the cord to the Sugar OS shell.** The hard part of the extraction was the home view, which lived deep inside the shell and reached into things only the full desktop has. Porting just the ring layout and the studio styling, and then locking the separation in place with the no-`jarabe` test, was what let me pull AOD out without losing the Sugar look.

---

## Key Learnings

The input matters as much as the model. Back in Week 3 I wrote that the system prompt is everything. This week extended that. It is not just the instructions to the model, it is the entire brief the model is working from, and most of that brief comes from a person who is understandably going to under-specify. My job is to close that gap before generation, not to be surprised by it afterward.

Watching real users was the other lesson, and it was humbling in the good way. Every assumption I had about how people phrase a prompt was slightly off. One hour of watching people actually type told me more than weeks of guessing.

And making AOD standalone changed how the whole thing feels. For weeks the honest answer to "can I try it" was "first set up a Sugar OS dev environment." Pulling it into its own project quietly turned that into "install this app." That is the difference between a demo and something someone else can keep.

There is a Sugar idea sitting under the enhance work, too. Sugar has always aimed for a low floor, letting a learner start from wherever they happen to be. Helping a three word idea grow into a real activity brief is that same principle pointed at the prompt box. Nobody should have to already know how to write a spec before they get to make something.

---

## Next Week's Roadmap

- Build a proper debugging layer for generated activities, so a bad activity gets caught and fixed before a learner ever sees it
- Draw out the architecture of that layer so the pipeline is easy to reason about
- Chase down the activities that pass every static check and still crash the moment they open
- Keep feeding Phase 2 observations back into the enhance and RAG behavior

---

## Acknowledgments

Thanks to Walter Bender for the advice to watch testers instead of talking over them, which is the only reason I caught the short-prompt problem this early. Thanks to the Phase 2 testers, especially the teacher who sat through the rough edges with me, and to Ibiam Chihurumnaya for the ongoing review.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
