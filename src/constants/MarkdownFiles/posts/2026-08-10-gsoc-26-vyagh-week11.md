---
title: "GSoC '26 Week 11 Update by Shubham Sharma"
excerpt: "Fixing the Journal's sorting and rebuilding its drawing to match how Sugar itself draws, hardening what the Journal sends to the AI, dropping the live-sharing route for peer reflection in favour of one that works with no network at all, and checking last week's conversation test against real published data"
category: "DEVELOPER NEWS"
date: "2026-08-10"
slug: "2026-08-10-gsoc-26-vyagh-week11"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week11,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-08-03 - 2026-08-09  

---

## Goals for This Week

- Check whether the Journal's grid and list views behave correctly underneath what shows on screen
- Go through what the Journal sends to the AI and bound it properly
- Get peer reflection from a written brief to something that runs
- Check last week's conversation-level AI test against real, already-published conversation data

No real children are involved in any of this yet. Every conversation below is a test entry with replies I typed myself.

---

## This Week's Progress

### 1. Journal grid and list views

#### Making the Journal quick again

The whole Journal had started feeling sluggish, so I measured it against a full datastore on the test machine.

Every time the view settled, it built a complete row for each entry just to read three small facts off it. It was also rebuilding the view that wasn't on screen alongside the one that was.

Now it reads only the facts it needs, and a hidden view does nothing until you switch to it. Filtering the list went from a visible stall to no measurable delay at all, and clearing a filter or changing the sort takes a fraction of what it did.

The scrolling lag is not mine. Stock Sugar's own Journal scrolls at the same rate on this machine; the virtual machine's software rendering sets it, and the card and timeline drawing I added is a small slice of each frame.

#### Folded stacks

A run of entries from the same day folds into a single stack.

A folded stack of thirty entries was reserving about a screen and a half of empty space below itself: the widget that slides it away collapses its width while keeping its height.

Opening a stack indented every row after the first by a whole card width. And closing one made the top card vanish for a single frame.

While fixing the empty-space bug I found a handler being reconnected without ever being disconnected, which was enough to crash the shell outright.

I also tried five different ways to animate a stack that wraps onto multiple rows. None is both smooth and cheap enough to hold a frame rate, so those stacks now swap instantly.

#### Drawing with Sugar's shared calls

The grid and list views were painting their cards by hand with low-level drawing calls. The rest of Sugar's shell uses shared drawing functions for those same things: card backgrounds, borders, checkboxes, focus rings, the little arrow that expands a folded group. I converted the two views over to those shared calls. One hand-drawn border line was straddling two pixel columns at about half strength each, and the shared call puts it in one crisp column.

The date spine and day headings also draw from one shared module now. They had drifted about thirty pixels apart between the two views, pushed by a nudge factor whose comment claimed it corrected the grid.

#### Bug hunt

Going through the surface for things that would break in day-to-day use turned up several genuine bugs, now fixed:

- **All three sort orders only looked correct on screen.** The grid view was discarding the sort order right before drawing the page. Fixed, and the two views now agree on what "sort by date created" and "sort by date modified" each mean, and on how a size-based sort captions its cards.
- **A corrupted timestamp on one entry could silently kill the entire list view**, with no error shown anywhere. An earlier fix had covered one kind of bad value; a second, differently-broken kind of value slipped past it and caused the same crash.
- **Clicking near an entry could open the wrong one, or toggle the star on an entry you weren't pointing at**, because the area GTK was treating as clickable was larger than the card actually drawn on screen.
- **A keyboard shortcut silently did nothing**, because the error it was hitting got swallowed.
- **The clock on each card was being lowercased by hand.** That breaks languages where "AM" is a translated word, and in places that use a 24-hour clock the same code was rendering 13:45 as an ambiguous "1:45".

#### Verified on a real Sugar system

I deployed the whole thing to a real Sugar system and checked it by hand. Until now these views had mostly been exercised in a quick standalone tool that draws the same widgets in isolation; it is much faster, but it resolves Sugar's visual theme differently.

Both views render correctly: cards, folded groups and their previews, day headings, keyboard and scroll navigation.

[youtube: W1SIuY696nc]

#### Getting ready for review

The grid is a custom container I wrote, so I built a working version of the Journal page on Sugar's standard list widget and compared the two over the same entries. It loses on two counts: it cannot place entries under per-date headings, and crossing the page inside folded groups takes noticeably more keypresses. The custom container stays, and the comparison build goes into the review request as evidence.

I went back through the branch to bring it closer to how Sugar's own files are written, trimming in-code explanation down to notes a reviewer can go and check. Two surfaces I had set aside earlier, the in-activity conversation panel and an ambient shelf, moved out of the working tree onto a parked branch.

Auditing my own work against upstream's also turned up three problems in Sugar's own code, each verified line by line:

- **Renaming an entry disables the Journal's keyboard shortcuts** for the rest of the session. The key handler is disconnected when the title edit starts and nothing ever reconnects it. That has been in Sugar since 2022.
- **Entry titles are invisible to screen readers.** The title is published in a form the accessibility layer doesn't read, which is why dates get read out and titles don't.
- **"Sort by date created" silently sorts by modification date on a USB stick.** No creation time is carried for entries on external drives, so the sort falls back without saying so.

These are written up to pass to the maintainers, not yet sent.

### 2. Hardening what the Journal sends to the AI

The reflection panel has been talking to the AI service since a couple of weeks ago. This week I got it running against the real service properly, and then went through everything crossing that boundary and bounded it.

Four things came out of that, all fixed:

- **Nothing limited the size of a request.** A long description or a long conversation went out whole. There are now caps on the number of conversation turns, the length of each turn, and the title, description, and saved note.
- **An empty reply from the AI reached the child as an empty question.** It now fails loudly at the boundary, so it can never surface as Jo saying nothing.
- **Conversation text was reaching the logs.** Logging now records only which entry a request was for, truncated, with line breaks stripped. What a child wrote never lands in a log file.
- **Nothing capped the model call itself**, so a runaway reply had no ceiling.

None of this shows in the interface.

### 3. Peer reflection

Peer reflection, letting children reflect with each other, has been queued behind the single-child work for weeks. The obvious design is the networked one; I built a first version of it and dropped it. It needs live presence between two machines to be reliable, and it is not; a feature built on top of it would only work in the room I test it in.

#### Handing a dry question bank to the room

The version that survived needs no network and no AI at all.

Jo carries a small built-in bank of questions for when there is no AI available, and that bank runs out. Previously that was the end of the conversation. Now Jo says so and points the child at the person next to them:

> I'm out of questions about this one. What does someone near you notice when you show it to them?

![Jo's rail on an entry made with a friend. After a few questions Jo says it has run out: "I'm out of questions about this one. Is there someone near you who could look at it with you? You could ask what they notice." The child answers "we talked about the sky picture", and Jo dims as the talk closes.](/assets/Developers/vyagh/gsoc26-week11-nearby-nudge.webp)

On a later visit to the same entry, Jo picks the thread back up:

> If you talked this one over with someone, what did you two figure out?

There is also an opener for entries the Journal already knows were made with someone else, which asks what they worked out together, or whether it was all their own.

![A Journal entry for a rocket drawing, tagged rockit, moon and space, with the moments kept along the way and their captions, and Jo's rail on the right returning to the entry on a later visit: "If you talked this one over with someone, what did you two figure out?", answered "we put a door on the side and i made the fire longer".](/assets/Developers/vyagh/gsoc26-week11-entry-moments-rail.webp)

Before building it, I searched the constructionism literature the project leans on for anything resembling this. I could not find it, which also means there is no prior work saying it is a good idea.

The honest limits: on a later visit Jo currently asks the follow-up with no sense of how much time has passed, and the case where the bank is already empty on a first visit needs more thought.

#### Keeping other people's words out of storage

What a child says about someone else stays out of the note saved for next time and out of the bookmark Jo uses to reopen a conversation. Private reflection data is kept off copies made to external drives.

If a child answers with a shrug, a bare "yes" or "dunno", that no longer gets quoted back to them later. Jo asks again in plainer terms.

![Jo asking a test entry's opener about working on something with someone. The child answers only "yes", and Jo replies "I can't see your conversation right now, but tell me about it. Who did you talk to?"](/assets/Developers/vyagh/gsoc26-week11-shrug-not-quoted.webp)

### 4. Checking the conversation-level AI test against published data

Last week I found a blind spot in the test I use to grade a whole reflection conversation end to end: it could be fooled by a question that echoes a child's own words back.

This week I checked it against published research data: real classroom exchanges and tutoring conversations released by other researchers, none of it collected by this project.

The weakness is real: a more targeted measure I had built specifically to catch this kind of hollow engagement rewarded the same echoing it was meant to flag. I've set that measure aside.

I also cleared an earlier worry, that which AI service handled a given request was skewing the scores. Checked against the same data through two different services, the scores agree within normal noise.

I'm not yet using the conversation-level test to shape what the AI says to a child, since it hasn't passed this check.

### 5. Groundwork for the safety layer

What should happen when a child writes something that needs a person, not a question? And what counts as personal information inside a reflection?

This week was sourcing and reading, gathering the established patterns for how a system like this should behave and where it must step back. Nothing is built from it yet, and it needs settling before any of this goes near a real child.

---

## Key Learnings

- **All three sort orders could pass a visual check while broken.** The grid was discarding the order right before drawing; I caught it in the code path, not on the screen.
- **The peer-reflection version that survived is the one that needs no network.** The live-sharing route failed on presence reliability, a problem outside the feature itself, and most of the work that remained was deciding what not to store about another person.
- **The conversation test passed careful reading of my own examples and still failed on real data.** Published classroom exchanges showed the echo-rewarding flaw my own examples could not.
- **The quick standalone tool and a real Sugar system do not resolve the theme the same way.** The drawing conversion only counted as done once it held up on the real thing.

---

## Next Week's Roadmap

- Turn the Journal's grid and list view work into a small number of clean, reviewable pull requests, and send the Sugar bugs found along the way to the maintainers
- Decide how to split the largest of the changed files so it's reasonable for a volunteer reviewer to look at
- Give the later-visit follow-up a sense of time passing, and handle a question bank that is empty on the first visit
- Keep working on the conversation-level AI test, now that published data has confirmed its hollow-echoing weakness
- Take the peer-reflection work to Walter and Ibiam now that there is something running to react to
- Bring the reflection conversation, the notification, and the live AI connection onto the Journal branch, still waiting on the entry view to settle
- Find a second person to hand-code the anchor sheet, still undecided who
- Turn the safety-layer reading into something concrete

---

## Resources & References

- **Week 10 blog:** [GSoC '26 Week 10 Update](news/all/2026-08-03-gsoc-26-vyagh-week10)
- **Week 9 blog:** [GSoC '26 Week 09 Update](news/all/2026-07-27-gsoc-26-vyagh-week09)

---

## Acknowledgments

Thanks to Walter and Ibiam for their continued guidance. Thanks to Diwangshu, Mebin, Harshit, and Aman for their continued input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
