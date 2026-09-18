---
title: "GSoC '26 Week 08 Update by Shubham Sharma"
excerpt: "Walter's steer to stop waiting on review and build directly on the actual Sugar codebase, settling scoring rules and starting to judge whole conversations, narrowing six design directions down to one, and giving the engine a shared way to describe a child's work"
category: "DEVELOPER NEWS"
date: "2026-07-20"
slug: "2026-07-20-gsoc-26-vyagh-week08"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week08,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-07-13 - 2026-07-19  

---

## Goals for This Week

- Get Devin's labels in and build the scorer
- Keep refining the design
- Keep building the engine: replace the placeholder question with the real reflection instructions, then move from a single question toward a back-and-forth
- Keep peer reflection queued behind the other threads

---

## This Week's Progress

### 1. Walter's steer: stop waiting, build on the actual Sugar codebase

Walter's guidance was direct: reviews on the actual Sugar codebase move slowly. Start building there now, on a fork, simplest version first.

Design and engine both had plans built around waiting for review. Design was headed toward another round of prototypes; the design work below is now a build target. The engine's plan had been a small standalone demo, kept separate from Sugar; that plan changed too. Both now aim at the same thing: something running on the actual Sugar codebase, in small pieces, checked as it goes.

### 2. Settling the scoring rules with Walter, and starting to judge whole conversations

[Last week](news/all/2026-07-13-gsoc-26-vyagh-week07) Walter and Diwangshu had each marked a 26-line test sheet, and a conversation with Devin raised a bigger question: the test judges one of the AI's questions at a time, but reflection is a back-and-forth. This week covered both.

#### Four rules, settled with Walter directly

Walter went through the sheet again on Element, and we settled four things that make a question from the AI good or weak:

- **Don't assert what the work means.** The AI can react to a piece of work, but shouldn't claim to know what it means or how it makes the child feel, unless the child already said so.
- **Don't sum up who the child is as a person.** Comparing new work to something they made before is fine; concluding something about their character is not.
- **Don't invent something that isn't there.** The AI shouldn't presume an object or detail exists in the work that the child never mentioned.
- **Don't hand out directions the child didn't ask for.** A suggestion to change something is only fair if the child raised that concern first.

The same pass also dropped one of my own rules: that the AI should never praise a child's work outright, since Walter's own marking showed he was fine with plain praise. It also cut a scorer category, meant to catch unsafe replies, that had no citation behind it and scored identically on every case tested so far. The project's separate, deterministic safety checks are untouched; this only removes a dead scoring category.

#### Checking the rules against two mentors

The automatic score and Walter's judgment disagree on a handful of genuinely subtle cases; looking closely, the score itself is too blunt there, and Walter's calls hold up. I also built a proper check for the score: a held-out test it has to pass, separate from the sheet it was tuned on. On three of the twenty-six lines, genuinely subtle cases, it still gets the call wrong; on the rest, it separates good questions from weak ones clearly.

Diwangshu went through the sheet independently and disagreed with Walter on several lines, mostly about whether the AI can sum up what a piece of work says about the child as a person. That's a genuinely open judgment call between two mentors, and one I'll need to settle before leaning on this rule too heavily.

#### Starting to judge the whole conversation

Devin's remark from last week pointed at this: reflection is more than one good question. This week I started building a second test that looks at a full back-and-forth, using a set of adult-child conversations from published research as a starting point, plus a first version of a judge for the AI's side of a conversation. It's a first pass. Devin's labels, whenever they arrive, are still the one outside check I haven't shown any of this to.

### 3. Design: from six directions down to one, built four screens deep

#### Two rounds of options

I ran a first round of options for how reflection could work, nothing like a straightforward chat box among them. Then a second, wider round: an AI in conversation beside the work, marks placed directly on the work, watching how a piece changed over time, talking it through out loud, and a couple of others. [Six held up](https://gsoc-html-share.vercel.app/mockups/fourth-pass/wireframes/) from that second round, and I committed to building one of them out fully, so there'd be a concrete blueprint ready once it's time to port into Sugar.

Before going further, I looked back at an earlier, more built-out design attempt at this same problem, and took two specific pieces from it: a way to track a piece of work's own version history, and a way to identify one meaningful moment inside it.

#### Narrowing it down

I showed Ibiam and Mebin the full range from that second round. Ibiam, who knows Sugar's technical side well, helped filter which ones were realistic. His read overall: the designs were good, but a few needed a harder look at how broad they were. One concrete example: an idea built entirely around dropping marks directly on a piece of work, no chat at all, doesn't generalize, since not every Sugar activity is visual. Two of the other directions are viable but complex enough to save for later as extensions, one of them especially ambitious to attempt first.

The plan going in was to cut those six down to one, based on what's actually buildable in Sugar. Checking it against the real Sugar source changed that: almost everything turns out buildable once the question becomes "can this be built into Sugar," not "does Sugar already do this." One direction failed the check regardless: reflecting by watching a piece of work change over time needs version history Sugar's datastore doesn't keep. Everything else became layers on one core experience, so nothing gets thrown away for good, and only the build order is still open.

#### Building the first layer, four screens deep

I built the simplest of the six, an AI you can talk to right beside your work, in full as a [working, click-through prototype](https://gsoc-html-share.vercel.app/mockups/fourth-pass/prototype/), across four screens: a version that works mid-activity, a quiet nudge to open it afterward, the conversation itself, and the entry showing up in the Journal list with the conversation marked on the row. These are also the first screens styled to look like actual Sugar, XO icons and all, not a generic mockup, matching where the work is headed. It also settled a smaller open question: reflecting mid-activity is in scope, as long as the child chooses to open it themselves.

![The mid-activity screen: Jo opens beside the canvas while still in Paint, saying the painting stays put, then asks a question with the same say-it, type-it, or draw-it answer options.](/assets/Developers/vyagh/gsoc26-week8-midactivity-jo-screen.webp)

![The "home" screen of the click-through prototype: after leaving Paint, a small card on Home reads "psst, your rocket from today, want to tell me about it?" with "open it" or "not now."](/assets/Developers/vyagh/gsoc26-week8-home-nudge-screen.webp)

![The "entry" screen of the click-through prototype: Jo's question, an answer box, and who was there.](/assets/Developers/vyagh/gsoc26-week8-entry-talk-screen.webp)

![The Journal-list screen: the rocket entry holds Jo's question right in the row, other saved work listed below it, real Sugar icons standing in for each activity.](/assets/Developers/vyagh/gsoc26-week8-journal-list-screen.webp)

### 4. The engine gets a shared way to describe a child's work

The engine needs to know what a child made before Jo can ask about it: what activity it came from, what it's called, what the child wrote about it, and any tags. This week I gave it one shared, simple shape for that, every part of it optional, used the same way whether the description comes from Sugar, the browser prototype, or a test. The child's own words in it are read-only: the engine only ever reads them, never fills them in or changes them.

I didn't touch the AI's actual question this week. I want a working way to judge whether a rewritten version of its instructions is better before I write one, so I'm not tuning by feel. One thing is already settled for when I do write it, though: it needs to say plainly that it's AI, that it can make mistakes, and that the child is still encouraged to talk to friends and a teacher, an idea Devin raised this week. That's most of why this week's engine work went into this shared shape and the conversation-level test above.

### 5. Two things from the research reading

Going back through the last few weeks' reading against decisions already made in the project turned up two things worth naming:

- **A persistent buddy carries its own risk.** Older research on children and computers found that dwelling on a struggle can become part of how a child sees themselves. None of my current plans guards against that yet.
- **Storing everything and always replaying it back has a known failure mode.** If a mistaken read of a child's work slips into what gets stored, replaying the full history back to the AI on every turn can make that same slip repeat itself. This is a risk the reading names; I haven't observed it happening.

### 6. Peer reflection stays queued

Still queued behind the single-child engine and design work, same as last week. Devin separately suggested the AI could nudge a child to talk the work over with a friend or teacher partway through a conversation, which lines up with how peer reflection was already imagined: the AI encouraging another person into the conversation now and then.

---

## Key Learnings

- **Walter's steer affected design and engine both.** Both had plans built around waiting for review, and both changed once he said so.
- **Devin's remark last week pointed straight at this week's second test.** Reflection needs judging as a whole conversation.
- **Where Walter and the automatic score disagree, the score is too blunt on subtle cases.** Walter's calls hold up.
- **A persistent buddy has its own specific risk.** Older research names a failure mode, a struggle becoming part of a child's self-image, that a one-off tool doesn't have to guard against. I don't have a guard for it yet.

---

## Next Week's Roadmap

- **Move design and engine work onto the actual Sugar codebase**, per Walter's steer: a fork, simplest version first.
- **Devin's labels run as an independent check whenever they land**, alongside everything else moving forward.
- **Keep building and testing the conversation-level judge**, closer to something I can trust.
- **Peer reflection stays queued** until the single-child work is further along.

---

## Resources & References

- **Prototype and design directions:** [gsoc-html-share.vercel.app/mockups/fourth-pass](https://gsoc-html-share.vercel.app/mockups/fourth-pass/)
- **Week 7 blog:** [GSoC '26 Week 07 Update](news/all/2026-07-13-gsoc-26-vyagh-week07)
- **Week 6 blog:** [GSoC '26 Week 06 Update](news/all/2026-07-06-gsoc-26-vyagh-week06)
- **Intro blog:** [GSoC '26 Introductory Blog](news/all/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter, who went through the test sheet again on Element and settled the scoring rules with me directly, and whose steer this week to build on the actual Sugar codebase changed the plan. Thanks to Diwangshu for an independent second read on the same sheet, to Devin for raising the idea of clearer AI disclaimers and for a conversation that confirmed the direction on peer reflection, to Ibiam for going through the breadth of the design options with me and helping filter which were realistic, to Mebin for being part of that same discussion, and to Harshit and Aman for their input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
