---
title: "GSoC '26 Introductory Blog by Shubham Sharma"
excerpt: "Building AI-powered reflection into the Sugar Journal"
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-vyagh-week00"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week00,vyagh,ai-reflection,journal"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** AI Reflection in the Sugar Journal  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/diwangshu-kakoty), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit)

---

## whoami

Hey, I'm Shubham ([@vyagh](https://github.com/vyagh)), a CS graduate and open-source contributor from India. I'll be working on AI Reflection in the Sugar Journal this summer for GSoC 2026.

I got my first computer when I was 10, a Dell Inspiron N5050 (I still have it). I have this clear memory of mentally keeping a list of things I wanted to search on Google throughout the school day, because the laptop was obviously at home. Anyone who knows me well enough knows that I ask a _lot_ of questions, about everything, and that habit hasn't really changed.

That curiosity is basically why I ended up in CS, and why I keep going toward AI projects. There's always something to figure out. So when I was going through the GSoC ideas list and saw an AI project under Sugar Labs, it got my attention pretty quickly.

## How I got here

I've been contributing since December 2025, mostly to [musicblocks](https://github.com/sugarlabs/musicblocks), [sugar-toolkit-gtk3](https://github.com/sugarlabs/sugar-toolkit-gtk3), and [sugar-toolkit-gtk4](https://github.com/niccokunzmann/sugar-toolkit-gtk4).

The weekly meetings and conversations with Jonas on Matrix about constructionism changed how I think about this project. Something he said stuck with me, he was describing how he sometimes comes across as wise, but said it's really just _"the input triggering a reflection."_

That's what the reflection buddy should do: give the kid a good question and get out of the way.

---

## The Project

Sugar has three design verbs: **Share**, **Discover**, and **Reflect**. The first two have proper software behind them. But reflecting? It's basically an empty text box in the Journal that most kids never fill.

An 8-year-old doesn't spontaneously write "I learned that loops make spirals more efficient." They need someone to ask them about it. Learning involves stumbling and getting stuck, and reflection is how kids process that, but it doesn't happen on its own without some kind of prompt.

This project adds a **reflection panel** inside the Journal detail view. When a kid opens a Journal entry, a reflection buddy asks things like _"What was the trickiest part?"_ or _"What would you try differently?"_. The AI doesn't explain things or give answers, it asks questions. The kid leads the conversation.

I built a rough prototype before submitting my proposal to get a feel for how this interaction might work:

- **Demo video:** [youtu.be/jCWb7yUrnZA](https://youtu.be/jCWb7yUrnZA)
- **Prototype:** [journal-reflection-demo.vercel.app](https://journal-reflection-demo.vercel.app)

![Prototype reflection panel showing a conversation between AI and a child about a Turtle Art project](/assets/Developers/vyagh/prototype.webp)

---

## Discussions During Community Bonding

I've been having calls with Walter during the bonding period, and the conversations went way beyond what's in the proposal. A lot of these are open design questions, and a big reason I'm writing about them here is that Devin actually uses Sugar in classrooms with real children, so we really need his take.

### Solo or collaborative reflection?

Sugar is collaborative, kids work with each other and teachers. So should reflection be collaborative too?

We mapped out a few modes:

- **Child + AI**: one-on-one reflection (the core proposal)
- **Child + peer + AI**: peer conversations that naturally become reflective (my conversations with Jonas are kind of a proof of concept for this, just not with kids)
- **Multiple children + teacher + AI**: classroom-style reflection

Open question: should everyone share a single chat, or should each participant have their own? Probably needs real classroom testing.

### Personas and the teaching skill

Starting with one generic reflection buddy. But the system should support activity-specific personas later, like imagine reflecting with Bobby Fischer after a chess activity (Walter liked this idea from Diwangshu's Music Blocks reflection work).

The interesting part was the idea of a **skills-file creator**: a way to define what a persona should know about a particular activity. A Turtle Art persona would understand "angle" and "repeat", a Write persona would focus on narrative and structure.

There's a layer that should wrap _every_ persona though: a teaching skill that makes sure the AI always asks questions, never lectures, regardless of which persona is active.

The "Sugar Activity on Demand" GSoC project also focuses on AI for activities, so there might be overlap. Something to coordinate on.

### Guardrails

We definitely need guardrails to keep conversations safe and on topic. But if reflection gets too rigid, it just becomes a form, and you don't need AI for a form.

I know this from experience, I've tried structured approaches to learning many times and they never worked for me. The moment something feels like a checklist, I stop engaging. Jonas put it well: _"constructionism is about learning, not training."_ If guardrails turn reflection into something that feels like a test, it's training, not learning. It should feel closer to play than to homework.

### Who writes the description?

The Journal has a description field that sits empty in almost every entry. Should the AI just generate it? That guarantees it's not empty, but the child didn't write it. It's like solving math on a calculator: you get the answer, but you didn't learn to think about the problem.

Asking kids to write from scratch doesn't work either, most just skip it.

The proposal's middle ground: after the conversation, show the child their own best answer and ask _"Want to save this as your description? You can edit it."_ Walter also raised the value of an AI-generated summary for younger kids. Another question for Devin.

### Offline mode

Sugar activities were designed to work without an internet connection, and some deployments only have a local network. So reflection can't just stop when there's no connectivity.

The proposal includes [Reflection Sparks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal): 50+ curated reflection prompts that work without any AI backend. Not adaptive like the AI, but they still follow the same reflection approach. When connectivity comes back, the AI picks up from there.

On a related note, I've been experimenting with reflection questions in GitHub PR templates so contributors think about their changes before submitting. Different audience, same idea.

### Future directions

Some things we discussed that go beyond core scope:

- **Video descriptions**: Sugar devices have cameras. A kid could record themselves explaining what they made instead of typing
- **Multiple previews**: multiple screenshots or a recording/GIF per entry would give more context for reflection

![Journal detail view showing a single small preview thumbnail with an empty description field](/assets/Developers/vyagh/journal-preview.webp)

- **Reflecting inside the activity**: Walter emphasized being able to **bounce back and forth between the Journal and the activity**, so reflection shouldn't feel like a separate destination

![Write Activity with a description box accessible directly inside the activity](/assets/Developers/vyagh/activity-description.webp)

---

## Quick Technical Overview

- **Frontend**: Python/GTK3, reflection panel inside `expandedentry.py`, packed between CommentsView and Buddy List
- **Backend**: Two FastAPI endpoints on Sugar-AI (`/reflect/chat` and `/reflect/summary`), stateless, client sends full history each request
- **Storage**: `metadata['reflections']`, same pattern as `metadata['comments']`, via D-Bus. No schema changes needed
- **Offline**: Reflection Sparks prompt bank, zero hardware requirements

---

## What's Ahead

Coding starts May 25. Dev environment is ready: QEMU VM for source-level development, and that old Dell Inspiron for real hardware testing:

- 2GB RAM
- can go offline
- low enough specs to catch performance issues early

The plan is to get a basic end-to-end flow working as soon as possible:
open a Journal entry -> see a reflection question -> reply -> get a follow-up

I'll be sharing progress in weekly blog posts :)

![Dell Inspiron N5050 running Sugar's Home View on Lubuntu](/assets/Developers/vyagh/dell-laptop.webp)

---

## Acknowledgments

Thanks to Walter for the bonding period conversations that shaped the thinking in this post.
To [Jonas](https://wiki.debian.org/JonasSmedegaard) for months of discussions that helped me understand what reflection actually means in a constructionist context.
To Ibiam and Devin for the organizational support, Diwangshu for the Music Blocks reflection foundation, and to the Sugar Labs community for being welcoming since I showed up in December.
