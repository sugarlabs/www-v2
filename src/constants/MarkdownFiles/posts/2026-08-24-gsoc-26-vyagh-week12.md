---
title: "GSoC '26 Week 12 Update by Shubham Sharma"
excerpt: "The Journal work out for review as 13 stacked pull requests, Jo's real instructions and an ending, peer reflection between real machines, and a look back at the summer."
category: "DEVELOPER NEWS"
date: "2026-08-24"
slug: "2026-08-24-gsoc-26-vyagh-week12"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week12,vyagh"
image: "assets/Images/GSOCxJournal.webp"

---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Sumit Srivastava](https://github.com/sum2it), [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/amannaik247)  
**Reporting Period:** 2026-08-10 - 2026-08-24  

---

Every piece of work a child does in Sugar lands in the Journal, and this summer I've been giving the Journal a reflection buddy called Jo. When a kid opens something they made, Jo asks one question about how they made it, and an answer the kid stars becomes the entry's description.

[Last week](/news/all/2026-08-10-gsoc-26-vyagh-week11) ended with all of that running on real hardware. This week went on getting it into other people's hands: reviewers, a friend on a second machine, and whoever runs a school's own server. The whole summer is written up in [the final report](https://github.com/sugarlabs/GSoC/blob/master/archives/2026/student-reports/GSoC_2026_Final_Report_Shubham_Sharma.md) in the Sugar Labs archive.

## Goals for This Week

- Split the Journal branch into pull requests a reviewer can read, and open them, along with the Sugar bugs found on the way
- Replace the placeholder instructions Jo, the reflection buddy, has been running on since week 7, and give the conversation a real ending
- Build the networked half of peer reflection, now that there is something running to react to
- Bring the conversation, the notification and the live AI connection onto the Journal branch, and make the AI something anyone can see and switch in Sugar's own settings
- Run the conversation-level test properly, now that published data had shown where it was weak

---

## This Week's Progress

### The Journal work went out for review

Since week 8 the Journal work had lived on one branch, months of commits on top of each other, and nobody can review that as one thing. So I split it into 13 pull requests that stack, each built on the one before it, from [ten fixes to stock Journal bugs](https://github.com/sugarlabs/sugar/pull/1111) at the bottom, through the rebuilt list and grid views, up to [Jo's rail](https://github.com/sugarlabs/sugar/pull/1119), the [redesigned entry view](https://github.com/sugarlabs/sugar/pull/1120) and the peer pages at the top.

Four more stand on their own, one in Sugar itself and one each in its toolkit, datastore and AI server, and the whole set is listed under Resources below.

The settings panel is the piece that lets someone other than me switch the AI on. It's a section in Sugar's own control panel: a checkbox for the server, an address, a key, and a connection check, so a wrong address tells you right there. The checkbox only governs the server. Jo's built-in questions stay on either way, and the server side stays off until someone ticks the box:

![The AI section in Sugar's control panel, where the server gets switched on: a ticked Use the AI server box, an address, a hidden key, and a connection check reporting the server ready.](/assets/Developers/vyagh/gsoc26-week12-ai-settings.webp)

### A Sugar bug that deletes saved data

A Journal entry came back with its conversation replaced by a one-line stub and its next-time note gone, at startup, with no activity open. I spent a few days looking for the cause in my own code before finding it in Sugar's datastore, where it has been for years.

When an activity saves, it writes back the copy of the entry's metadata it loaded when it opened, and the datastore deletes any key that save doesn't mention. So anything added to an entry while the activity is open, a conversation with Jo included, is wiped on the next save:

![How the datastore loses a reflection: Paint loads its copy of the entry's metadata, the child talks to Jo and the reflection is saved as a new key, Paint saves its old copy back, and the datastore deletes every key that save didn't mention.](/assets/Developers/vyagh/gsoc26-final-datastore-race.webp)

It's the same root cause as the known bug where the Portfolio activity overwrites an entry's description. The guard in [#1118](https://github.com/sugarlabs/sugar/pull/1118) re-reads and merges before every write, refuses to write less than what's stored, and merges back anything that vanishes. The real fix is one change in the datastore, delete a key only when a caller asks for it, and I've drafted that as a proposal for the maintainers.

### Jo's instructions, and an ending

Jo had been running on placeholder instructions, a few lines written to get the conversation working, since week 7. This week it got the real ones, and I read the first conversations under them end to end. None of these are with real children; the kid's side is replies I typed myself. Reading whole conversations turned up two problems that scoring one question at a time had missed:

- yes-or-no questions were slipping in, which Jo's own rules forbid
- Jo drifted into the story a kid wrote instead of how the kid made it. In one conversation about a diary written for a dog, Jo spent four turns asking what the dog did next

It took two more rounds of instructions before I kept a version.

The rule on praise changed too. Jo's instructions still banned praise outright, even though the mentors' labels on the example sheet back in week 8 had marked a brief warm line as fine. So the instructions now say: never grade the work, never suggest improvements, and a short warm reaction to what the kid just said is allowed, as long as the question is still the substance.

Jo can also end a conversation now. After a few exchanges it offers to wrap up:

- say yes, and you get one closing question and a short goodbye
- ask to stop, and the goodbye comes right away
- say no, and you keep going, up to twice

I looked for research on how a reflection conversation with a child should end and couldn't find any. The rule I settled on is that the child decides when it's over.

### Peer reflection, between real machines

In week 11 I'd built the peer nudge without a network, because two Sugar machines couldn't see each other reliably. The reason was packaging. Sugar's collaboration runs on telepathy-salut, the piece that lets machines on one network find each other, and Debian last shipped it in version 11. Sugar's session still asks for it, with no fallback; there's [an open issue](https://github.com/sugarlabs/sugar/issues/996) on Sugar's telepathy dependencies.

I rebuilt the package from source, with patches from Fedora's build plus one of my own for Debian 13, and two machines saw each other. A third, a laptop, joined the same network. I think Sugar should carry the parts of telepathy-salut it needs, but that's a packaging change and not mine to make alone.

With that working I built the networked half. An entry gets its own share switch, and once it's on the entry shows up in the Neighborhood next to its owner. A friend opens it from there and gets the entry read-only, with one box to ask a question in:

![What a friend gets: a Calculate entry opened from the Neighborhood, read-only, with one box on the right saying Ask your friend one question, where Buddy has asked "does it do fractions too?".](/assets/Developers/vyagh/gsoc26-final-friend-page.webp)

The question lands in the owner's comments. Here on a different entry, the next time the owner opens the conversation, Jo says a friend left a question and offers to read it out:

![What the owner gets: Buddy's question in the entry's comments, and in Jo's rail the line "Buddy left you a question in the comments." with a What did they ask? chip.](/assets/Developers/vyagh/gsoc26-final-peer-offer.webp)

A friend can only ask; there's nothing on the page to rate the work with. And Jo reading the question out sits behind the share switch, off by default.

Both halves are open as #1124 and #1125, and they survive a machine dropping off the network and coming back. The filter only checks the shape of a question, so an unkind one in question form still passes; that's still on the list.

---

## Looking back

Since this is the last of the weekly posts, here is where the summer ended up: 17 pull requests open across four Sugar Labs repos, the engine out as [reflection-engine v0.1.0](https://github.com/sugarlabs/reflection-engine/releases/tag/v0.1.0), and 19 bugs found in stock Sugar on the way.

### What a kid sees now

Most of the work went into the Journal, because the entry view had nothing on it worth talking about. In week 3 it was a file screen with an empty description box. This is the same view now, on a rocket drawing:

![The rebuilt entry view: the drawing leads, the description and starred lines sit under it, moments in the middle, and Jo's rail on the right carrying a friend's question.](/assets/Developers/vyagh/gsoc26-final-entry-rebuilt.webp)

In the order a kid runs into them:

- the notification after an activity closes: it only shows up after real work, and never asks twice about the same entry
- Jo's rail: one question at a time, always about the work; star a line and it becomes the description, word for word
- moments, the bits of a session a kid marks as worth coming back to, which now land in the entry so there's something specific to talk about later
- a friend's question, passed on in the friend's name, only when the child asks to hear it

![A starred line becoming the description: the child's second reply in Jo's rail is starred, and the same line sits in the description panel on the left of the same screen.](/assets/Developers/vyagh/gsoc26-final-rail-starred.webp)

With no server, or on any failure, the shell asks one of its built-in questions and the screen looks the same. The three rules the mentors and I settled on early haven't moved: ask, never tell; the child owns the description; no gamification. They're written into the engine's spec now. The [week 11 demo video](https://www.youtube.com/watch?v=W1SIuY696nc) shows the whole flow on real hardware.

### The numbers

The result I care about most is that a model small enough for a school's own box asked nearly as well as the cloud one. To measure that, I ran 150 scripted conversations through the shipped engine, plus 30 through my first engine as a baseline, on three models:

- gemini-3.7-flash, in the cloud
- gemma-3-12b, small enough for a school's own box
- qwen3-vl-30b, a rentable cloud model

Every question was scored 1 to 10 on the four rules from [week 8](/news/all/2026-07-20-gsoc-26-vyagh-week08) by two judges from different model families. The independent judge's numbers are the ones I'd stand behind:

| Engine and model | Independent judge |
|---|---:|
| First engine, llama-3.2-3b | 6.27 |
| Shipped, gemini-3.7-flash | 7.04 |
| Shipped, gemma-3-12b | 6.90 |
| Shipped, qwen3-vl-30b | 6.26 |

The differences are small. The shipped engine with the cloud model is about three quarters of a point above my first engine, and the local model is close behind it.

The rentable model ended level with the first engine, and its number is a little flattered: when a reply fails Jo's checks the judge skips that turn, and that happened more often for it.

Per rule, Jo asks instead of telling and holds back. Where every model is weak is building on what the child just said, and my first engine was slightly better at that:

![Scores by rule from the independent judge: every model near 5.5 on building on what the child just said, and the rebuild's biggest gain on staying with what the child actually said.](/assets/Developers/vyagh/gsoc26-final-where-jo-is-strong.webp)

There are two limits to this. Every child line was scripted, so this says how the engine behaves, not how children respond to it. And the judge reads the conversation, not the Journal entry, so in the table Jo's opening question gets marked down for mentioning the work, on every model equally. The chart leaves those openers out for the same reason.

### What I expected

In March I thought the AI would take most of the summer, and that the web prototype had settled the design, so the rest would mostly be porting it into Sugar. The Journal took more of the time than the AI, and the port was the smaller part of the work. After that, most of the summer went on working out whether what I was measuring meant anything.

I'd also been waiting on upstream review before building further. The mentors told me to stop waiting, and that changed the design and the engine plan inside a week. Two things from March held: reflection needs a nudge, and the AI should ask and never answer.

---

## Key Learnings

Measuring Jo was harder than building it, because every score I trusted at some point was hiding something. Per-question scores hid Jo drifting into a kid's story, and my own test examples hid that the conversation test could be fooled by a question that just echoes the child's own words back, which real classroom data showed in week 11. Each time the fix was to read whole transcripts before trusting a number, so now I do that first.

I also learned to check Sugar's side before my own. My tests were green for weeks while Sugar's runner wasn't collecting them, and the bug I spent days chasing in my own code was in Sugar's datastore.

And a default is a design decision. The peer voicing worked, and I still turned it off by default, because a friend's question arriving unasked isn't something the child chose.

---

## What's next

The pull requests need review, and I'll keep working on them after GSoC. The first thing I'd build next is feed-forward, Jo bringing a child's own earlier words back on the next visit: it's in the engine and not yet in the Journal. After that, an engine running a small model on the machine itself, so nothing leaves it.

The teacher summary wasn't built. Once the rule became that the child owns the description, a summary written by the AI for an adult stopped fitting. I still want a teacher to be able to see what a child found hard over time, without the AI's summary being the thing they see, and which of those should win is a question for the mentors.

Some of it isn't mine to decide. Whether reflection starts switched on, consent for sending a child's preview to a server, and whether a teacher should see anything are questions for the mentors and for schools. And what Jo should say if a child says they feel sad needs an answer before any of this reaches a real child. What I still can't say is whether any of it holds up with a real child in front of it.

---

## Resources & References

- **The final report:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/archives/2026/student-reports/GSoC_2026_Final_Report_Shubham_Sharma.md)
- **The engine:** [sugarlabs/reflection-engine v0.1.0](https://github.com/sugarlabs/reflection-engine/releases/tag/v0.1.0)
- **The Journal series, bottom to top:** [#1111](https://github.com/sugarlabs/sugar/pull/1111) ten stock Journal bugs, [#1112](https://github.com/sugarlabs/sugar/pull/1112) list-view helpers, [#1114](https://github.com/sugarlabs/sugar/pull/1114) list view, [#1115](https://github.com/sugarlabs/sugar/pull/1115) grid view, [#1116](https://github.com/sugarlabs/sugar/pull/1116) the toggle, [#1117](https://github.com/sugarlabs/sugar/pull/1117) offline questions, [#1118](https://github.com/sugarlabs/sugar/pull/1118) moment card, [#1119](https://github.com/sugarlabs/sugar/pull/1119) Jo's rail, [#1120](https://github.com/sugarlabs/sugar/pull/1120) entry view, [#1121](https://github.com/sugarlabs/sugar/pull/1121) notification, [#1123](https://github.com/sugarlabs/sugar/pull/1123) AI settings, [#1124](https://github.com/sugarlabs/sugar/pull/1124) sharing an entry, [#1125](https://github.com/sugarlabs/sugar/pull/1125) a friend's pages
- **Standing alone:** [sugar #1122](https://github.com/sugarlabs/sugar/pull/1122), the object chooser's previews
- **The endpoint:** [sugar-ai #163](https://github.com/sugarlabs/sugar-ai/pull/163)
- **Keeping reflections out of search:** [sugar-datastore #30](https://github.com/sugarlabs/sugar-datastore/pull/30)
- **A larger preview image:** [sugar-toolkit-gtk3 #520](https://github.com/sugarlabs/sugar-toolkit-gtk3/pull/520)
- **Sugar's telepathy dependencies:** [sugar #996](https://github.com/sugarlabs/sugar/issues/996)
- **The demo video:** [week 11 on real hardware](https://www.youtube.com/watch?v=W1SIuY696nc)

---

## Acknowledgments

Thanks to Walter and Ibiam for the mentoring all summer, to Devin Ulibarri for the design reviews, to Diwangshu, Mebin, Harshit and Aman for their input, and to Aman and Diwangshu for hand-labelling the example sheet.

Thanks to [Ken Kahn](https://www.linkedin.com/in/ken-kahn-997a225/), whose writing on children and AI I kept going back to, and to [Jonas Smedegaard](https://wiki.debian.org/JonasSmedegaard) for the long Matrix discussions about reflection. And thanks to Sugar Labs for the summer, and for letting me work on something children might actually use.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)
