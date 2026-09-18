---
title: "GSoC '26 Week 10 Update by Shubham Sharma"
excerpt: "Building the Journal's grid and list views, redesigning the entry view again, writing a first peer-reflection brief, and finding the conversation-level test isn't solid enough to build on yet"
category: "DEVELOPER NEWS"
date: "2026-08-03"
slug: "2026-08-03-gsoc-26-vyagh-week10"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week10,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-07-27 - 2026-08-02  

---

## Goals for This Week

- Get the Journal's grid and list views further along in Sugar
- Settle where the entry view and the reflection conversation should live, and bring that back onto the main branch
- Move peer reflection from queued to a next step
- Check whether the conversation-level test built last week is solid enough to write Jo's instructions against
- Keep building the research base behind the project

---

## This Week's Progress

### 1. Journal grid and list views

Last week the grid view was still an unscoped task. This week I built it: a card grid with entries grouped by date, next to the list view Sugar already has.

Most of the week went into making it usable. Keyboard and touch both work for opening and selecting an entry. Checkboxes let you select several entries at once, like the list view already does. Several entries from the same day fold into a single stack you open with a tap.

![The Journal grid view: entries grouped under "Today," with a folded stack of two Write Activity versions below.](/assets/Developers/vyagh/gsoc26-week10-grid-view.webp)

The list view changed too. Rows are now drawn as cards on a timeline, grouped by day. The grid and list share the same grouping, so switching views keeps entries together the same way.

![The Journal list view redesigned as a timeline: day and time-of-day headers on a spine, entries as rows with a checkbox, star, icon, and timestamp, and two folded runs marked "2 more" and "1 more".](/assets/Developers/vyagh/gsoc26-week10-list-view.webp)

At the end of the week I looked for bugs that would only show up on real hardware, not in the test VM. Four turned up, all fixed:

- **One entry with a bad timestamp silently broke the whole list view**, with no error shown anywhere.
- **The new grid view's file was never added to the build**, so a real install would have shipped a Journal that fails to start.
- **Pressing Return while typing an entry's description resumed the whole activity** instead of typing a character.
- **The new grid-view toggle showed up dead** in a screen it doesn't belong in.

### 2. Entry view and reflection

The plan was to bring the reflection conversation, the notification, and the live AI connection back onto the rebuilt entry view. That didn't happen yet. The entry view's layout kept changing as I tested it.

One version I got running end to end saves each moment worth reflecting on as its own small unit, tagged to the activity it came from, instead of one long write-up for the whole session. It's not final, but it's the clearest working version so far.

![The Journal entry view, one version built this week: the artwork, a picker for choosing the whole work or one specific moment, and Jo's question in a panel on the right.](/assets/Developers/vyagh/gsoc26-week10-entry-moments.webp)

![A full conversation with Jo about a Paint Activity piece: three questions and answers, each with its own keep button, and a running note of which parts are already saved.](/assets/Developers/vyagh/gsoc26-week10-entry-history.webp)

The same idea changed the in-activity side. It started as a typed conversation with Jo inside the activity. Partway through the week I switched to something lighter: just marking a moment as worth coming back to, instead of stopping to talk right then. The conversation panel is set aside, not deleted.

![The in-activity "Taking a moment" card over a Paint Activity canvas: a snapshot of the current work, a spot to write about it, proud, tricky, and wonder tags, and buttons to keep it or not.](/assets/Developers/vyagh/gsoc26-week10-inactivity-moment.webp)

At one point, across the two VMs I was working on in parallel, every piece was running somewhere: the grid view, the after-activity reflection panel, the in-activity moment-marking (still buggy), and the entry-view redesign (still missing pieces). They weren't in one build yet, but each piece worked on its own.

To keep the grid and list work clean, I pulled the reflection panel and the older entry-view changes out of that branch and reverted those files to stock Sugar. The two tracks now move separately until the entry view settles.

### 3. Peer reflection

Peer reflection (children seeing or responding to each other's reflections) has been waiting behind the single-child work for weeks. This week I wrote a first brief on how it could work, to bring to the mentors. Nothing is built yet.

### 4. Checking the conversation-level test

Last week I built a test that grades a whole reflection conversation instead of one line at a time, and it agreed with careful manual checking on almost everything. This week I asked whether it's solid enough to write Jo's instructions against. I ran three separate checks, each trying to break it a different way. All three said no.

The problem: the test rewards a question that just repeats the child's own words back, as if that were a real follow-up. A conversation written to do exactly that scored higher than one with genuinely thoughtful questions. The test still separates clearly weak conversations from strong ones, so it stays useful for catching obvious failures. But I won't use it to shape what Jo says until this is fixed, because that would teach Jo the same empty habit.

The recheck also caught two things I'd already marked as confirmed, both wrong: a miscalculated number comparing two scoring approaches, and a gap in a check that was supposed to stop the test from grading its own homework.

### 5. Research

I read through a new batch of papers and folded the ones that held up into the project's notes. I also confirmed that Jo's most basic rule (ask questions, never tell the child the answer) has its own check in the automatic checker, though only turn by turn, not across a whole conversation. And I corrected several of my own earlier claims that didn't hold up against the sources.

---

## Key Learnings

- **A test that agrees with careful checking on normal examples still isn't proven.** It took a conversation written specifically to fool it to show it rewards empty echoing.
- **Something already marked "confirmed" is still worth rechecking.** A number and a check I'd already signed off on both turned out wrong on a second look.
- **A bug that breaks the app for every user can hide as long as testing means hand-copying files instead of a real install.** The grid view's missing build entry only showed up when I checked what an installed build would include.
- **Redesigning more than once doesn't mean starting from nothing each time.** Each round of the entry view narrowed down what works on the device kids will actually use.

---

## Next Week's Roadmap

- Bring the reflection conversation, the notification, and the live AI connection back onto the Journal branch once the entry view settles further
- Turn the grid and list view work into a small number of clean, reviewable changes instead of the long working history it's accumulated so far
- Fix the conversation-level test so it stops rewarding hollow echoing, then use it to shape Jo's instructions
- Bring the peer-reflection brief to Walter and Ibiam
- Get the depth-coder anchor sheet hand-coded by a second person, still undecided who
- Continue folding new research material in

---

## Resources & References

- **Week 9 blog:** [GSoC '26 Week 09 Update](news/all/2026-07-27-gsoc-26-vyagh-week09)
- **Week 8 blog:** [GSoC '26 Week 08 Update](news/all/2026-07-20-gsoc-26-vyagh-week08)

---

## Acknowledgments

Thanks to Walter and Ibiam for their continued guidance. Thanks to Diwangshu, Mebin, Harshit, and Aman for their continued input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
