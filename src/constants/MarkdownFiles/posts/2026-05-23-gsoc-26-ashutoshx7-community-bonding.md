---
title: "GSoC '26 Community Bonding: Sugar Activity on Demand by Ashutosh Singh"
excerpt: "Can an LLM write a working Sugar activity from a one-line description? That's what I'm spending this summer finding out."
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-ashutoshx7-community-bonding"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,community-bonding,ashutoshx7,ai,llm,sugar-activity-on-demand"
image: "assets/Images/GSOC.webp"
---


**Project:** Sugar Activity on Demand  
**Organization:** Sugar Labs  
**Reporting Period:** May 8, 2026 to May 24, 2026

---

## Introduction

Hey, I'm Ashutosh ([@Ashutoshx7](https://github.com/Ashutoshx7)), a developer and artist. This summer I got selected for GSoC 2026 with Sugar Labs, and I'm working on a project called [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand).

It started with a broken computer my school was throwing away. I took it home just to play games, but fixing it up ended up being my first real lesson in how systems actually work. That curiosity never really went away. Growing up with a mother who's an artist added something else too. Being around her work gave me an instinct for design and visual thinking that I didn't fully appreciate until I started building software myself.

In school I got really into biology, especially how the human brain works. When I eventually learned that neural networks are modeled after how the brain processes information, it felt like two things I'd been separately curious about suddenly clicked together. That's what pulled me toward AI.

When I got to college and started contributing to open source, everything kind of came together. My systems knowledge helped me think about architecture, my design instincts kept me thinking about the user, and through [musicblocks-v3](https://github.com/sugarlabs/musicblocks-v3) and other Sugar Labs repos I got a solid feel for the codebase and the community. The constructionist philosophy at the core of Sugar Labs, that people learn best by making things, just made sense to me.

This project is a direct expression of that idea. Let learners describe what they want, use AI to generate it, and then help them understand, modify, and own the code. That's the vision.

---

## What's the Problem

Sugar has a lot of activities. Turtle Art, Music Blocks, Write, Calculate, and plenty more. But here's the thing: if a teacher wants an activity that doesn't exist yet, they're stuck. Making a Sugar activity from scratch means knowing Python, understanding the `sugar3` framework, getting comfortable with GTK3, and figuring out the packaging format. That's a lot to ask from someone whose job is teaching, not programming.

So the question this project asks is pretty straightforward: *Can we use LLMs to generate working Sugar activities from a plain English description?*

Not a perfect activity every time. Not something that replaces developers. Just a tool that takes something like *"a flashcard activity for multiplication tables"* and gives back a `.xo` bundle that actually runs in Sugar. If it gets 80% of the way there and a teacher (or a kid) can tweak the rest, that's already a win.

---

## How It Should Work

The basic pipeline I'm building looks like this:

1. **Someone describes what they want.** A teacher types: "A quiz activity where students match country names to their capitals."

2. **The system adds context.** The description alone isn't enough. The system wraps it with everything the LLM needs to know about Sugar: how activities are structured, what the base class looks like, what goes in `activity.info`, common GTK3 patterns, etc.

3. **The LLM generates code.** Send the enriched prompt to a model and get back Python source code plus the manifest file.

4. **Validate and package.** Check if the code is syntactically valid, if the required files are present, and then bundle it as a `.xo` file.

5. **Install and test.** Drop it into Sugar and see if it launches.

The tricky part is step 2. If you just send a bare description to an LLM without any Sugar-specific context, you get generic GTK code that doesn't know about `sugar3.activity.Activity`, doesn't create a proper toolbar, and won't integrate with the Journal. The context injection is what makes or breaks the output quality.

---

## What I Did During Community Bonding

### Reading a lot of Sugar source code

I spent a good chunk of this period just reading code. The HelloWorld activity, then progressively more complex ones. I needed to understand:

- How `sugar3.activity.Activity` works and its lifecycle (`__init__`, `read_file`, `write_file`)
- The toolbar system with `sugar3.graphics`
- How `activity/activity.info` is structured
- How activities talk to the Journal via D-Bus

This matters because the LLM prompt context has to be *accurate*. If I feed the model incorrect or incomplete information about how Sugar activities work, the generated code will be broken in subtle ways that are hard to debug.

### Setting up the dev environment

I wiped Windows off my machine entirely and switched to Ubuntu to set up Sugar properly. No dual boot, no VM, just committed to it. It means I can install generated `.xo` bundles and test them directly on my system without any virtualization overhead. It also gives me a better feel for how Sugar actually runs on real hardware, which is closer to what schools using Sugar would have.

### Conversations with Walter Bender

During community bonding I had some conversations with Walter that really shaped how I'm approaching the project.

We talked about what "working" actually means. A generated activity doesn't need to be perfect. If it launches, shows a UI, and does roughly what the user described, that counts. We can always iterate from there.

We also had a good conversation about model selection. Walter's take was that we shouldn't just pick one model and run with it. Instead, we should benchmark a bunch of them against the same set of activity descriptions and compare the results properly. He specifically mentioned trying models known for strong instruction-following ability. I also suggested testing some of the competitive open-weight models that have gotten really strong at code generation, since in some regions where Sugar is deployed they might be more accessible or affordable. Walter was on board with that. So the plan is to build a model-agnostic evaluation phase before committing to any specific backend.

The offline question keeps coming up too. A lot of Sugar deployments have limited or no internet. Whatever we build needs a path toward running inference locally, maybe through `ollama` with a quantized model. It won't be as good as a cloud-hosted model, but a working offline mode is more important than a slightly better online one.

Walter also forwarded me an email from Gary Stager that really drove home why this project matters. Gary had uploaded a PDF of Brian Silverman's old Apple II program called [*The Phantom Fishtank*](https://constructingmodernknowledge.com/phantom-fishtank) (a cellular automata explorer for learners) to an AI tool, and a few minutes later had a working web version of software that had been lost to platform shifts decades ago. The original point was about how teachers now have a practical way to bring great educational software back to life, not by buying it but by making it. That's basically the thesis of Sugar Activity on Demand. If a teacher has an idea for an activity, working software should be within reach, not weeks of Python development away.

---

## A Quick Look at the Prompt Strategy

Here's a simplified version of what the context-augmented prompt looks like:

```python
SUGAR_ACTIVITY_CONTEXT = """
A Sugar activity is a Python application built on the sugar3 framework.
Every activity must:
1. Subclass sugar3.activity.activity.Activity
2. Define an __init__(self, handle) method that calls super().__init__(handle)
3. Create a GTK3 widget and set it as the canvas via self.set_canvas(widget)
4. Include an activity/activity.info file with: name, bundle_id, activity_version, exec, icon

Example minimal activity:
...
"""

def build_prompt(user_description: str) -> str:
    return f"""
{SUGAR_ACTIVITY_CONTEXT}

Using the Sugar activity framework described above, generate a complete,
working Sugar activity that does the following:

{user_description}

Return only the Python source code for the activity file and the activity.info manifest.
"""
```

Without the context block, LLMs tend to hallucinate Sugar APIs that don't exist or produce vanilla GTK code that doesn't integrate with the Sugar lifecycle. With it, the output quality jumps significantly.

---

## What I'm Worried About

**Hallucinated APIs.** LLMs will confidently call `sugar3.some_function_that_doesnt_exist()`. I'm looking at retrieval-augmented generation over the actual Sugar codebase to keep the model honest.

**Offline quality.** A 7B quantized model running locally is noticeably weaker than GPT-4o at structured code generation. Fine-tuning and prompt compression might help, but this is going to be a real constraint.

**Running untrusted code.** Generated Python code needs sandboxing before we can test it. Looking into lightweight container isolation for this.

---

## What's Next

Coding starts May 25. First week priorities:

- Start building the **frontend** for the activity generation interface and get mentor feedback on the direction early
- Begin working on the **backend async** so we can hook up different models and start testing them side by side as soon as possible
- Define what "correctness" means for generated activities so I have something concrete to measure against

The idea is to not get stuck perfecting one layer before touching the other. Get the frontend to a point where Walter and the mentors can give input, and in parallel get the backend wired up enough that we can start running the model evaluation we discussed during bonding.

I'll be posting weekly updates here. See you next week.

---

## Acknowledgments

Thanks to Walter Bender for the conversations during bonding that really shaped how I'm thinking about this project. Thanks to the Sugar Labs community for being welcoming from the start, the Matrix channels and PR reviews made it easy to find my footing. And thanks to everyone who built Sugar in the first place. The idea that kids should be creators, not just consumers, is something worth building for.

---
