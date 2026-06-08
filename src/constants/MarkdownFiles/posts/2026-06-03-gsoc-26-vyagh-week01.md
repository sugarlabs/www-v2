---
title: "GSoC '26 Week 01 Update by Shubham Sharma"
excerpt: "From standalone simulation to a real Sugarizer prototype with working activities and AI reflection"
category: "DEVELOPER NEWS"
date: "2026-06-03"
slug: "2026-06-03-gsoc-26-vyagh-week01"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week01,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/diwangshu-kakoty), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-05-25 - 2026-05-31

---

## Goals for This Week

- Audit the previous prototype against community bonding feedback
- Decide on a prototype strategy that supports classroom testing
- Build a higher-quality prototype with working activities and AI reflection

---

## Where Things Stood

During the proposal phase, I'd built a [standalone demo](https://journal-reflection-demo.vercel.app), a web page that simulated the Journal list view and entry view, with a reflection pane where the AI could have a conversation with the child. ([intro blog](https://www.sugarlabs.org/news/2026-05-23-gsoc-26-vyagh-week00), [demo video](https://youtu.be/jCWb7yUrnZA))

The conversation flow worked fine, but everything around it was a mock. There were no real activities, no real data, and no preview images. It felt a bit empty because there was nothing real to reflect on.

---

## Why a New Prototype?

A recurring point in the community bonding calls was that this project needs real classroom testing, we can't validate how kids interact with a reflection AI without actually putting it in front of them.

The final implementation goes into Sugar OS (GTK/Python), but that means anyone testing needs a full Sugar environment. For the first few weeks, while the conversational design is still being figured out, I needed something simpler i.e. a URL I can share with mentors, no setup required.

---

## The Options I Considered

I looked at a few ways to build this:

- **Option A: Add real activities to the standalone demo.** The demo was just a fake shell. Inserting real activities (like Paint or Turtle Blocks) onto it would mean writing custom code to handle launching, saving, and updating the journal. I would have spent the whole week building a shell instead of working on reflection.
- **Option B: Start a new web app from scratch.** Same problem. I'd be rebuilding a custom Sugar-like environment from scratch.
- **Option C: Fork Sugarizer.** Sugarizer is already a web port of Sugar. It has the home view, the activities, and a working journal. The only catch is that Sugarizer has no entry detail view, clicking a journal item just resumes the activity. But building a detail view on top of Sugarizer is more feasible, Plus I am Happy to eventually Integrate the AI reflection in Sugarizer too :)

I went with Option C.

---

## This Week's Achievements

### 1. Sugarizer fork with scoped activity set

I set up a `reflection` branch with just **Paint** and **Turtle Blocks JS**: one creative, one programming. A custom `activities.deploy.json` + `.vercelignore` keeps the deployment under Vercel's free tier limits while the branch still has all activities locally.

Paint needed a small patch: the AMD import paths in `lib/l10n.js` weren't relative, so the vendored i18next library wouldn't resolve under plain static hosting.

### 2. Journal detail view

Sugarizer didn't have one, clicking a Journal entry just re-launched the activity. I intercepted the `goright` handler in `journal.js` to show a new detail component instead.

I added a `Sugar.ReflectionDetail` Enyo component (`js/reflection.js`) that shows:

- Activity icon (colorized with XO colors) + editable title
- Preview image from `metadata.preview`
- Description and tags fields
- Comments
- **Reflection chat panel**
- Participants

The layout follows Sugar's `expandedentry.py`: preview on the left, fields on the right, reflection panel after comments. This way the GTK version won't feel like a different product.

### 3. Activity previews

Both Paint and Turtle Blocks now capture their canvas as a base64 PNG during save and write it to `metadata.preview`. The detail view picks it up automatically i.e. same model Sugar uses.

![new prototype's journal entry view](/assets/Developers/vyagh/new-journal-entry-view.webp)

### 4. Reflection backend

Single Python file (`api/reflect.py`) deployed as a Vercel serverless function:

- Activity-specific reflection frameworks: Creative Learning Spiral for Paint, Artifact Interview for Turtle Blocks
- Engagement detection: two short answers in a row and the AI wraps up
- 5-turn limit per conversation

Previews are display-only for now, the AI doesn't see the image yet.

### 5. Live deployment

Up at **[sugarizer-reflection-demo.vercel.app](https://sugarizer-reflection-demo.vercel.app)**.

You can open Paint or Turtle Blocks, make something, stop the activity, open Journal, click the entry, see the preview, and start a reflection conversation.

![new prototype's home view](/assets/Developers/vyagh/new-home-view.webp)

---

## Key Learnings

- Forking Sugarizer saved me from weeks of shell reimplementation. Reuse over rebuild.
- Sugarizer uses Enyo, which is old but internally consistent. Once I got the pattern (`enyo.kind`, `createComponent`, `render`), adding views was quick.
- Just having a visible preview next to the chat already changes how reflection feels. Even without the AI seeing the image yet, the child has their work right there while they talk about it.

---

## Next Week's Roadmap

- **Enable multimodal reflection.** Right now the AI can't see the preview, it only has the activity name and title to work with. I want to send the preview image to the API so it can ask about what the child actually made.
- **Fix conversation ending.** The AI sometimes loops when it should stop, the `should_end` flag isn't always handled correctly on the frontend.
- **Detail view polish.** Layout works but feels rough. Want to work on spacing, chat bubble design, and making it more friendly.

---

## Resources & References

- **Live prototype:** [sugarizer-reflection-demo.vercel.app](https://sugarizer-reflection-demo.vercel.app)
- **Previous demo:** [journal-reflection-demo.vercel.app](https://journal-reflection-demo.vercel.app)
- **Intro blog:** [GSoC '26 Introductory Blog](https://www.sugarlabs.org/news/2026-05-23-gsoc-26-vyagh-week00)

---

## Acknowledgments

Thanks to Walter, Ibiam, Mebin, Harshit, Diwangshu, and Aman for the calls and feedback this week.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
