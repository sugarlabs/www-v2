---
title: "GSoC '26 Week 06 Update by Shubham Sharma"
excerpt: "Rewriting the question-quality test in a real child's voice and writing the checks for it, deciding what carries over to the engine rebuild, exploring new directions for the Journal entry view, and grounding the design in constructionist research"
category: "DEVELOPER NEWS"
date: "2026-07-06"
slug: "2026-07-06-gsoc-26-vyagh-week06"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week06,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-06-29 - 2026-07-05  

---

## Goals for This Week

- Rewrite the question-quality test in a real child's voice and get it ready for the mentors
- Decide what from the current engine is safe to carry into the rebuild
- Explore new directions for the entry view after the feedback on the last one
- Check the design against real constructionist research

---

## This Week's Progress

### 1. Rewriting the question-quality test in a real child's voice

Last week the mentors said the sheet sounded robotic and AI-generated, and that real kids don't talk like that. I said I would rewrite it.

#### Finding real children's writing to copy from
I cannot write a child's voice out of my head. I need real children's writing to model it on. My first search found nothing, but it was too narrow. A wider search turned up three things I could use:

1. **[Real interview questions](https://scratched.gse.harvard.edu/ct/files/Student_Interview_Protocol.pdf).** Brennan and Resnick's list of questions an adult asks a child about a project they made.
2. **[A scoring guide](https://scratched.gse.harvard.edu/ct/files/Student_Assessment_Rubric.pdf).** It rates how specific a child is when describing their own work, rather than how vague.
3. **[Brennan's dissertation](https://scratched.gse.harvard.edu/sites/default/files/user_photos/26/brennan_2013_02_dissertation.pdf).** Real interviews with more than 25 children, aged 8 to 17.

For how children actually write, I used **[PoKi](https://arxiv.org/abs/2004.06188)**, a set of 61,330 poems by children. I only needed the ones from grades 3 to 6.

#### Can a script tell if a line sounds like a real kid?
I looked for one. No single check does it:

- **Sentence length and reading grade are no help.** They cannot tell a real child's writing from AI text.
- **The tools that judge tone need thousands of examples.** My sheet has 26 lines.
- **One thing does work: hedging.** How often a line hedges, instead of stating things flatly.

The real test is reading the sheet out loud. The hedging check only catches the obvious misses.

#### Writing the checks
I wrote small scripts. They catch the obvious problems without me having to look:

- how often a line hedges;
- whether the child's line sounds like a child;
- whether the AI's line sounds like a real teacher;
- whether a line uses words the test forbids;
- whether the sheet is still built the way the test needs.

I also wrote down the test's design in a separate file and froze it. Now I can reword the sheet without changing what it measures.

![What the research bought me: real children's material goes in, a 26-item sheet and five checks come out, and the engine waits on the result.](/assets/Developers/vyagh/gsoc26-week6-checks-pipeline.webp)

#### The rewrite
All 26 child lines got rewritten, from tidy sentences into how a kid that age writes: dropped apostrophes, run-ons, uneven punctuation. A made-up example, so no real test line is exposed:

- **Before:** "I decided to draw a bird because I like animals."
- **After:** "I drew a bird bc I like animals it was kinda hard tho"

#### Checking the rewrite
- I read every child line out loud myself.
- For the AI's lines, I checked each one against how real teachers talk to children, and against the mistakes a teacher should avoid. Nothing sounded fake, and they stayed as they were.
- I compared the new sheet with the old one, line by line, to be sure the rewrite had not changed what the test measures. It had not.

**Where it stands: the sheet is done.** Three things left before it goes back out:

1. a second reader checks the few lines that could be read two ways;
2. the mentors see the old and new wording side by side for the hardest lines;
3. the whole set goes back out for re-labelling.

### 2. Deciding what carries over to the engine rebuild

Before rebuilding the engine, I need to know which parts of the current one are worth keeping. I went through it piece by piece, 17 pieces in total, and marked each one: keep, rework, or replace.

#### What is safe to keep
**Only one piece is safe to keep as it is:** how a conversation gets saved into a Journal entry, and how the next session picks it up again.

Most of the rest are a mix. The wiring is fine, but the behaviour needs redoing. The AI's own judgment, what to ask and when to nudge, has to wait. I cannot check it until the question-quality test is trustworthy, which is a large part of why the test came first.

#### Should I train the AI on the data instead?
I also checked a bigger question. Today the engine works by giving a strong general AI a carefully written set of instructions. Should I train an AI on the data I gathered instead? The data splits two ways, and neither side can be trained on:

- **The right kind, but far too little.** Real children's reflection conversations exist, but only a couple of dozen.
- **Plenty of it, but the wrong kind.** The big sets are poems and open chat. Training on the poems would teach the AI to write like a child, but Jo is the one asking the questions, not the child.

I looked at two other ways of using the data, and parked both:

- **Letting the AI look things up in the research while it answers.** That solves the problem of having a library too big for the AI to read all at once. Mine is the opposite problem: the material is too small.
- **Training a small AI to copy how the whole engine behaves.** This one is worth doing, and it is how reflection could eventually run offline on a low-powered laptop. But there has to be something worth copying first, so it waits until the engine is good.

So the data grades the AI and fills the test with realistic examples. It does not train the model.

![My working notes for the week: the engine options I weighed, and where each one landed.](/assets/Developers/vyagh/gsoc26-week6-engine-options.webp)

#### The engine as a package
Ibiam agreed that pulling the engine into its own package is the right way to keep it independent of any one platform. We talked through how it would be packaged and shipped, and decided that question can wait.

**Where it stands: the map is done, and no new engine code is written yet.** A few calls, like how safety is handled and how Sugar will eventually use the engine, need a second look before anyone builds on them.

### 3. Rethinking the Journal entry view, again

Last week I described the from-scratch rebuild of the entry view and put a demo online. I kept refining it:

- **Own words beside the description**, at equal height. The text now scrolls instead of clipping.
- **The timeline strip.** Its gradient bars became a dotted trail joining three points: last time, today, and next.
- **Tags** moved into the left rail as badges.

I got a local backend running, so I could hold a full conversation with Jo from start to finish. That was last week's remaining test. I put the build online for the mentors to try: [sugarizer-ui.vercel.app](https://sugarizer-ui.vercel.app).

#### The feedback: still not child-friendly
Walter's feedback was that the rebuilt view still is not child-friendly. Too many things on the screen at once, so a kid cannot tell what to do first. Too much empty space, pulling things apart instead of grouping them.

#### Bolder scope, less on screen
I had been running two separate questions together:

- **How much of Sugar am I allowed to reinvent?** The entry view, the Journal, maybe reflection inside an activity. That was opened up.
- **How much goes on the screen at once?** That needs cutting.

So being ambitious means putting fewer things on the screen, not more. The step-by-step rebuild I described last week is dropped.

#### Exploring what reflection could look like
Mebin suggested working in mockups instead of code, as a faster way to find the shape. That matched where I had landed, so I built the ideas as web pages and put them up:

- **[Reflection beyond marks](https://gsoc-html-share.vercel.app/mockups/second-pass/mechanisms)**: ways to reflect that don't need a child to type.
- **[Entry-view directions](https://gsoc-html-share.vercel.app/mockups/second-pass/entry-directions)**: different shapes a Journal entry could take.
- **[A complete flow](https://gsoc-html-share.vercel.app/mockups/second-pass/complete-flow)**: the Journal from the home screen through to a finished entry.
- **[Reflection across surfaces](https://gsoc-html-share.vercel.app/mockups/second-pass/across-surfaces)**: how it behaves outside the Journal.

I also built [working prototypes](https://gsoc-html-share.vercel.app/mockups/second-pass/standalone/entry) of three screens: the activity, the entry, and the Journal.

![The entry concept: the child's work leads, and talking to Jo stays optional.](/assets/Developers/vyagh/gsoc26-week6-entry-concept.webp)

![The Journal concept: a child's work, not a list of files.](/assets/Developers/vyagh/gsoc26-week6-journal-concept.webp)

**Where it stands: these are still concepts.** Nothing goes into the prototype until the mentors pick a direction.

### 4. Grounding the design in constructionist research

Before taking the designs further, I wanted to check them against real constructionist practice instead of my own assumptions. So I spent time with the source material: Ken Kahn's work, and Walter's writing.

Ken Kahn is a researcher in Papert's lineage, best known for [ToonTalk](https://www.toontalk.com/English/papers.htm), where children build programs by demonstration. Reading through his material and Walter's, I went back to Papert's own papers from the early 1970s.

**Where it stands: the reading is done.** What it means for the design is still being worked out.

---

## Key Learnings

- **My first search for children's reflection data was too narrow.** A wider one found three usable sources, so the data was there all along.
- **No script can tell whether a line sounds like a real kid.** Reading it out loud is still the test.
- **Only one of the engine's 17 pieces was safe to keep untouched.** Checking each piece was worth more than assuming they were reusable.
- **Ambition here means bolder scope, not more on the screen.** The first rebuild ran the two together.

---

## Next Week's Roadmap

- **Send the sheet back for re-labelling,** after the second reader and the side-by-side for the mentors.
- **Build the scorer once the real labels are back.**
- **Take the concepts to the mentors** and settle on one direction to build.
- **Work out what the constructionist research means** for the design.
- **Turn peer reflection's first version into a plan,** carried over again this week.

---

## Resources & References

- **Live prototype:** [sugarizer-ui.vercel.app](https://sugarizer-ui.vercel.app)
- **Design concepts:** [the second-pass mockups](https://gsoc-html-share.vercel.app/mockups/second-pass/)
- **Engine spec:** [gsoc-html-share.vercel.app/spec](https://gsoc-html-share.vercel.app/spec)
- **Week 5 blog:** [GSoC '26 Week 05 Update](news/all/2026-06-29-gsoc-26-vyagh-week05)
- **Week 4 blog:** [GSoC '26 Week 04 Update](news/all/2026-06-22-gsoc-26-vyagh-week04)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter for the feedback that sent the entry view back to the drawing board, and for helping frame what "ambitious" should mean here. Thanks to Ibiam for talking through the engine as a standalone package, and to Mebin for pushing me to iterate in mockups. Thanks also to Diwangshu, Harshit, and Aman for their input this week.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
