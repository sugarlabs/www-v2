---
title: "GSoC '26 Week 09 Update by Shubham Sharma"
excerpt: "Running two builds of the reflection feature on the actual Sugar codebase, rebuilding the fork's entry view against a finished design, working out where in-activity reflection can live, and finding a scoring update had partly learned the test cases used to check it"
category: "DEVELOPER NEWS"
date: "2026-07-27"
slug: "2026-07-27-gsoc-26-vyagh-week09"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week09,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-07-20 - 2026-07-26  

---

## Goals for This Week

- Run Devin's labels as an independent check as soon as they land
- Keep building and testing the conversation-level judge
- Move design and engine work onto the actual Sugar codebase, fork, simplest version first
- Keep peer reflection queued

---

## This Week's Progress

### 1. Two builds, one status for the mentors

[Last week](news/all/2026-07-20-gsoc-26-vyagh-week08) I described Walter's steer to stop waiting on Sugar reviews and start building on a fork of the real codebase.

This week that fork was one of two places the feature existed. To keep moving past slow review cycles, I'd also been keeping a second, separate build going all week on the same real Sugar source. This whole post covers both.

#### The Sugar-fork build

On the fork, I built the reflection panel itself, and this was the first time the whole feature worked end to end. The conversation is saved in the entry's own `metadata['reflections']` field. A notification invites reflection after an activity closes. And a live version talks to the AI, carrying the last answer forward as a banner on the next visit.

I then kept matching it to the design file and building further screens from it: a foldable "Our talk" section with a thinking animation while the AI replies, a home-view nudge card, and a badge on each Journal row when Jo has a question waiting. Along the way I fixed a bug: a step reading an entry's colour failed silently, and that blanked the description, tags, comments, and conversation all at once.

#### The second build

The second build was further along in different ways. The engine there is its own package with a full test suite, reached through a small server. I'd tested the same kind of panel end to end in Sugar. And I'd run a first evaluation: thirty scripted conversations against a local model. No real children are involved anywhere in this yet; a written stand-in plays the child.

#### A same-day design sweep

The same morning, I ran a wide design sweep on that build. It covered fourteen directions for the panel and several ways to draw Jo. I also did states for waiting, being offline, and saying goodbye, plus rules for how any of it should move.

The next day I picked a direction. The child's work sits big and front-and-centre, everything Sugar's entry view already has stays, and reflection becomes a thread hanging underneath it. Jo became a plain chrome XO shape with one ember, unpainted, no buddy colours.

![The design spec for Jo's neutral XO identity: three states, available, thinking, and leaving, told apart by the amber centre's glow, plus how it sits next to a question in context.](/assets/Developers/vyagh/gsoc26-week9-jo-chrome.webp)

#### What I found running the evaluation

The small model went over the word-length limit fifty-one times, gave a few compliments it isn't supposed to give, and broke the one-question rule twice. I'd expected results like that from a model this small; real quality checks need a stronger one.

I also turned that same check on the fork build's shipped interface. The alert inviting a child back to Jo was titled "Nice work!". Since Walter's marking [last week](news/all/2026-07-20-gsoc-26-vyagh-week08) I no longer score the AI down for plain praise. But Jo's own instructions still tell her to ask about the work, never grade it, and that title grades it. I fixed it and checked again the same day.

#### What I brought to the mentors

I brought both builds to Walter and Ibiam. Three questions came out of that:

- Should reflection be on by default, or something a teacher switches on?
- Does warm acknowledgment of an idea count as the judging Jo is meant to stay out of?
- What should Jo say if a child discloses something like feeling sad?

The last question needs an answer before any of this goes in front of a child.

#### Keeping an answer

The second build already had a small mechanic for a good answer. Press a star next to what a child wrote, and it's saved word for word into the entry's description. The saved line also shows under the entry's title in the Journal's list view, so a kept thought is visible without opening the entry.

![The reflection panel on the second build's Journal entry, mid-conversation: a child's answer, "it did the sum in the wrong order but it still worked," is starred and kept word for word in the entry's description, while Jo asks how the child would explain it to a friend.](/assets/Developers/vyagh/gsoc26-week9-notification.webp)

#### A stray bug fixed along the way

In the Sugar source itself I fixed a bug unrelated to my work: pressing Enter or the Left arrow key inside a focused text field resumed or exited the whole activity instead of typing the character.

### 2. Stepping back: the design itself needed to change

#### What Walter and Ibiam said

Walter and Ibiam both read the builds as still thin, and where in-activity reflection should live is open on their side too, though both leaned away from a change that would touch every activity's toolbar and toward keeping it inside Sugar's frame somehow. Ibiam added that whatever a redesign changes has to stay at least as clear and useful as it was before.

#### Where the design file came from

The design file the fork build had been built against was a wireframe sketching out the flow, never a finished visual design. It took me most of the week to go back and trace it to its source; until then I'd assumed the gap was in my own work, and polishing harder didn't help.

On the fork, I went back to a more finished set of [mockups](https://gsoc-html-share.vercel.app/mockups/second-pass/standalone/journal) I'd built earlier and decided to build directly from those. They solve something I hadn't fully worked through: most Sugar activities don't produce one single visual thing to reflect on the way a painting does. That version treats a saved reflection as its own small unit, tagged with the activity's icon and colour, so a Turtle Blocks project or a piece of writing works the same way a painting does.

#### Designing the whole journey on the second build

On the second build I took the same realisation somewhere else: I stepped back to design the complete experience as one connected story. It runs across six moments: capturing a thought while still in the activity, a nudge to return to that same activity next time, and the conversation in the Journal. The other three are the moment a good answer gets kept, watching a replay of how the work was made, and how a reflected entry looks in the list.

The entry-view screens on that build won't get touched again until that whole journey is designed and agreed on, screen by screen. The first of the six moments, reflecting inside the activity itself, is solid enough to build now, and that's where the rest of this build's work went this week.

#### What Walter said about one piece of it

One piece of that design went straight to Walter: a small "Reflect" tag in the corner of a running activity that a child could tap. He pushed back on it sitting there all the time as too intrusive; the Frame, where a child already goes to invoke things, made more sense to him. He also floated a keyboard shortcut, which I flagged as likely too hard for a young kid, and something that could pop up on leaving an activity, so long as it never takes up space inside the activity while it's running.

#### A focus-stealing bug in fullscreen activities

On the second build, I dug into where in-activity reflection could live at all. Typing into a window drawn over a running, fullscreen activity doesn't work, because Sugar keeps the keyboard on the activity underneath no matter what's on top. Taps get through fine, so an in-activity panel there has to give a child answers to tap.

I also tried two places for its icon in Sugar's frame, one on each side of the screen; both opened the panel on the first tap, each with a small rendering glitch I need to fix before I can pick between them.

![Jo's device icon live in Sugar's own Frame, next to the other device icons, on the actual Home screen.](/assets/Developers/vyagh/gsoc26-week9-frame-icon.webp)

### 3. Rebuilding the fork's entry view, and a frame panel on the second build

Since the target design had changed, I reset the fork back to stock Sugar and rebuilt the entry view against the new mockups. The storage, the notification, and the AI wiring the fork had earlier in the week aren't running on it right now. Adding them back on top of the rebuilt view is the next piece of work.

I rebuilt Jo's reflection sidebar on the fork as a panel down the right side of the entry view, resizable and hideable, with a message area and a text box to reply in. I also merged the old separate back button into Sugar's toolbar, so it navigates through the same place as everything else in Sugar.

#### Comparing it to the reference

I looked at the rebuilt panel running on the actual VM, next to the reference design, and listed the gaps. The entry's title rendered as a big grey input box where the reference has a small identity line. The kind, date, and size details ran as three lines instead of one. The preview photo had a hard black border and square corners.

Working through that list, the preview came first: I moved it into a centred band above the rest of the entry, with rounded corners and a soft border. Tags went from one freeform text box into small chips you add and remove one at a time. The title and the three-line kind, date, and size layout haven't been touched yet.

I also found and fixed four rendering bugs in the same view, including a tag chip whose remove button looked fixed in a screenshot but silently did nothing; I only caught that one by clicking it myself.

#### Reflecting inside the activity itself

On the second build, I built a panel opened from a Frame icon, answered with the tap chips the focus finding had already pointed to. Whether opening on top of a running activity, even only on demand, still counts as taking up space by his standard is unresolved; I built it anyway so there'd be something to show him. It works live on the test device. A notification also offers to open it right after an activity closes.

![The in-activity panel, polished: mood chips, a thumbnail of the current work, and starter chips for a first answer, layered over the running activity.](/assets/Developers/vyagh/gsoc26-week9-inactivity-panel.webp)

### 4. Piloting a judge for whole conversations, and finding it tuned to its own test cases

Last week I started building a second test that judges a whole conversation, not one line at a time. This week I finished piloting both halves. The half that reads the child's side came out consistent. Before I can trust it, a second person needs to hand-label a sample, so their reading can be compared against mine.

#### Checking the question judge

A rules update I'd made had partly learned the wording of the exact test cases I check it with, rather than the general pattern behind them. I went back and checked because the scores from that update looked too good when I piloted this half. It still tells a weak suggestion apart from a carefully asked question. A fresh test, on conversations it has never seen at all, is still ahead.

I also compared it against a faster, cheaper way of scoring the same conversations. That one sometimes scored a question by which pile of examples it came from, and two nearly identical suggestions landed four points apart. It's useful as a rough first filter and I'm not relying on it for more than that.

#### What to measure at all

I'd been looking at whether one good question from Jo leads to a deeper next answer, one exchange at a time. In my example conversations the richest answers kept coming first, and the follow-ups were a coin flip. I reread the research this is built on, and it measures these effects across a whole conversation rather than at a single exchange. So that per-exchange measurement is now a note I keep rather than a score.

What I need to score is a full three-step unit: Jo asks, the child answers, and what Jo does next. The third step is what shows whether Jo's next question does anything with the child's answer, or only repeats it back.

### 5. Peer reflection stays queued

Still queued behind the single-child engine and design work, same as the last few weeks.

---

## Key Learnings

- **A design file I'd been matching pixel-for-pixel was only ever a wireframe.** Polishing harder didn't close the gap; I had to pick a finished design to build against.
- **Turning my own evaluation on my own shipped UI caught a mistake my manual review had missed.** The invite alert praised a child's work in its title, something Jo's own instructions still rule out.
- **I found that typing doesn't reach a window layered over a running activity, but tapping does.** So any in-activity panel has to lead with tap-first answers.
- **I found that a scoring rule can improve on the exact examples it was tested against without the underlying pattern getting better.** I caught it by re-checking on the very same test items; a fresh, unseen set would be a stronger check.
- **A fix can look right in a screenshot and still be broken.** I only caught the tag chip's dead remove button by clicking it myself.

---

## Next Week's Roadmap

- Add the conversation storage, the post-exit notification, and the AI wiring back on top of the fork's rebuilt entry view; all three already work in the second build.
- Finish matching the fork entry view to the reference (title styling, the kind, date, and size line); the list view's reference is a full card-grid layout, a separate task to scope.
- In-activity reflection placement is still open on the mentors' side too; compare the second build's frame-panel approach against staying inside the fork's entry view before settling on one.
- Finish designing the whole six-moment reflection journey on the second build, then decide whether the fork follows that or the mockups already in use.
- Two outside checks on the evaluation: a second person hand-labels a sample of the child-side scores, and Devin's labels run as an independent check whenever they land.
- Peer reflection stays queued.

---

## Resources & References

- **Week 8 blog:** [GSoC '26 Week 08 Update](news/all/2026-07-20-gsoc-26-vyagh-week08)
- **Week 7 blog:** [GSoC '26 Week 07 Update](news/all/2026-07-13-gsoc-26-vyagh-week07)
- **Reference design mockups:** [second-pass Journal prototype](https://gsoc-html-share.vercel.app/mockups/second-pass/standalone/journal)

---

## Acknowledgments

Thanks to Walter and Ibiam, who looked at both builds this week and gave feedback on where reflection should live and how much a redesign is allowed to change. Thanks to Diwangshu, Mebin, Harshit, and Aman for their continued input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
