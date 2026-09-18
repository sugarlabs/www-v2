---
title: "GSoC '26 Week 09 Update by Ashutosh Singh"
excerpt: "Putting the first release in front of real people, including Walter, and turning their feedback into fixes. Plus building an annotation flow so you can point at the activity and tell it what to change."
category: "DEVELOPER NEWS"
date: "2026-07-29"
slug: "2026-07-29-gsoc-26-ashutoshx7-week09"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week09,ashutoshx7,testing,annotation,feedback,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** July 21, 2026 to July 27, 2026  

---

## Goals for This Week

- Put the v1.1.0 release in front of real people and watch them build actual activities
- Turn the feedback from those sessions straight into fixes
- Build an annotation flow so a tester can point at what they see and describe the change they want
- Keep the loop tight: test, learn, patch, test again

---

## This Week's Achievements

Last week I cut the first release. This week it got used by people who are not me, which is the only test that really counts. The engine is solid, the app installs, so the question stopped being "does it work" and became "does it work for someone who has never seen it." That is a very different and much more honest question.

Two things came out of the week: a real round of testing with concrete feedback, and an annotation flow so people can tell the studio what to change by pointing at it.

![An activity generated in AOD, running in the studio preview during a testing session](assets/Images/gsoc26-ashutoshx7/aod-studio-preview.png)

### 1. Testing It With Real People

The best session was with Walter. He took the release and built a **Periodic Table Explorer**, an activity that walks through the elements using quotes, and then put it through its paces the way an actual user would.

A few things stood out from his feedback. He liked that the activity asked him questions at the start, which is exactly the kind of interactive framing the enhance flow is supposed to encourage, so it was good to see it show up in something someone else made. He reworked it using the live editing, turning the first version into a cleaner one built around a literature quote, and the refinement flow held up under that back and forth. And he liked it enough to say he would try it with some folks over the weekend and share the bundle around, which is the first time AOD has left my orbit and gone to real learners.

Then the useful part, the thing that was not working. His note was simple: "I do not know that I saw a place to name the activity. The name it chose was pretty random." He was right. The studio generated a name and never gave you a say, so you ended up with a perfectly good activity wearing a random label. That is a small thing that feels bad every single time, and it went straight onto the fix list.

This is the whole reason for testing. I can stare at the studio all day and never notice the missing name field, because I know what everything is called. One session with a real user surfaced it in about a minute.

### 2. The Annotation Flow

The other build this week grew out of watching how people ask for changes. When a tester wants to fix something, they point at it. "This button here." "That text." Words alone lose which part of the screen they mean. So I built an annotation flow: you can mark the specific part of the activity you are talking about and attach your note to it, and that annotation becomes the context the studio uses to make the change.

It builds directly on the click-to-refine work from last week, but it closes the gap between what a person means and what the model receives. Instead of describing a spot in prose and hoping the model finds it, you point at the spot and describe the change, and the annotation carries the location along with the request. It makes refinement feel less like giving directions over the phone and more like sitting next to someone and tapping the screen.

### 3. Acting on the Feedback

Testing is only worth it if the feedback turns into changes, so the naming issue from Walter's session became work this week rather than a note for later. Giving people a clear place to name their activity, instead of accepting whatever random name got generated, is exactly the kind of small fix that makes the difference between a tool that feels like a demo and one that feels like it respects you.

---

## Challenges & How I Overcame Them

**Turning a screen location into something the model can use.** An annotation is only useful if the studio can tie "this spot the user tapped" back to the part of the activity it corresponds to. Mapping a point in the running preview to the right piece of the underlying activity, and packaging that cleanly into the refinement request, was the fiddly core of the annotation work.

**Staying honest about feedback I did not like hearing.** It is tempting to explain away a piece of feedback, especially something like a random name that I had quietly stopped noticing. The discipline was to take Walter's note at face value, treat "this felt random" as a real problem, and fix the experience instead of defending it.

**Testing without a crowd.** Phase 2 is deliberately small, so I have to get a lot out of each session. Watching closely, writing down the exact wording of every complaint, and treating one person's confusion as probably many people's confusion is how I stretch a handful of testers into real signal.

---

## Key Learnings

Real testing finds the things you have gone blind to. The missing name field is the perfect example. It was in front of me the entire time and I could not see it, because I built it. A user who did not build it saw it immediately. There is no substitute for putting the thing in someone else's hands.

The annotation work taught me something about how people actually communicate with a tool like this. Nobody wants to write a precise essay describing which widget to change. They want to point. The closer I can get the interaction to "point at it and say what you want," the less the studio asks people to translate their intent into words, and the more it just does what they meant.

That instinct is very Sugar. The tool should meet a learner where they are instead of making them learn its language first, and pointing at something to change it is exactly that. Building this in the open, then letting the quietest piece of feedback in the room, a random activity name, reshape what I work on next, is the community way Sugar has always been made. The learners are not an audience for the software, they are part of building it.

---

## Next Week's Roadmap

- Ship the activity naming fix that came straight out of Walter's session
- Widen testing to the folks Walter is sharing the release with and gather a second round of feedback
- Refine the annotation flow based on how testers actually use it
- Keep the test, learn, patch loop turning through the back half of the program

---

## Acknowledgments

Thanks to Walter Bender for actually building something with the release, the Periodic Table Explorer, and for feedback that was both encouraging and precise about what was missing. The naming fix and a lot of this week's direction came straight from that one session. Thanks also to the wider Phase 2 group, and to Ibiam Chihurumnaya for the ongoing review.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
