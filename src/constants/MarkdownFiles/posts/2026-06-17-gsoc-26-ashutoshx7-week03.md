---
title: "GSoC '26 Week 03 Update by Ashutosh Singh"
excerpt: "Designing the system prompt, wiring the LLM pipeline, and building a three-phase testing strategy after Walter asked the hard question."
category: "DEVELOPER NEWS"
date: "2026-06-17"
slug: "2026-06-17-gsoc-26-ashutoshx7-week03"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week03,ashutoshx7,ai,testing,llm,system-prompt,sugar-activity-on-demand"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** June 9, 2026 to June 15, 2026  

---

## Goals for This Week

- Design the system prompt that tells the LLM how to generate Sugar Activity specs
- Wire up the LLM pipeline end-to-end
- Figure out a testing strategy after Walter asked how we're going to validate the generated activities

---

## This Week's Achievements

This was the week where the project stopped being "I built a cool frontend" and started being "okay but does it actually work." The big moment was during my weekly sync with Walter when he asked a question I should've thought about earlier: "How are you going to test this?"

Not like unit tests. He meant: how do you know the activities coming out of the generator are actually good? How do you know they install correctly, run on Sugar, and actually teach something? That question completely shaped this week. I ended up designing a three-phase testing strategy while also finishing the system prompt and getting the LLM pipeline wired up.

### 1. The System Prompt

Before I could test anything, I needed the LLM to actually produce useful output. That meant designing the system prompt, which is basically the instruction manual you hand to the model before any user input.

This took way more iteration than I expected. The prompt needs to do a lot:

- Tell the model it's generating Sugar Activities, not generic Python apps
- Explain the GTK3 widget set and which widgets are safe to use
- Describe the Sugar Activity lifecycle: `__init__`, `build_toolbar()`, `_build_canvas()`, `write_file()`, `read_file()`
- Specify the project structure: `activity/`, `activity.info`, `setup.py`, `activity.py`
- Enforce coding patterns like `GLib.idle_add()` for thread safety
- Include examples of working Sugar Activities as reference
- Tell it to respect the selected template category (Logic & math, Tools/utilities, Games, Creation) and license

The first few versions of the prompt were way too long and the models kept ignoring parts of it. I ended up breaking it into sections with clear headers and priority markers. The critical constraints (like "never use Gtk.Application, always extend sugar3.activity.Activity") go at the top. The nice-to-haves (like "add docstrings to every method") go at the bottom.

I also built a template system for the prompt itself. Instead of one massive string, the system prompt is assembled from modular blocks depending on the learner's choices. If they pick "Games" as the template, a games-specific block gets injected with examples of score tracking and game loops. If they pick "Creation," it includes canvas drawing patterns and file save/load examples. This keeps the prompt focused and avoids overwhelming the model with irrelevant context.

### 2. Wiring the LLM Pipeline

With the system prompt in place, I wired up the actual pipeline. The flow is:

1. Learner types a prompt and picks a template category + license
2. The system assembles the full prompt (system prompt + template block + user prompt)
3. The prompt goes to the LLM API
4. The model returns a structured spec (JSON) describing the activity
5. The generator from Week 2 takes that spec and produces the project files
6. The project gets packaged into a `.xo` bundle

Right now I'm testing with multiple models to see which ones produce the best output. More on that in the testing section below.

The pipeline is designed to be model-agnostic. The LLM call is behind a simple interface, so swapping models just means changing a config value. This turned out to be really important for the testing work.

### 3. The Testing Strategy - Walter's Question

This is the big one. When Walter asked "how will you test this?" I didn't have a great answer. I had been thinking about it as a code generation problem, where you just check if the output compiles. But Walter pushed further. A Sugar Activity isn't just code that runs. It's a learning tool. It needs to install cleanly, open in Sugar, respond to user input, save to the Journal, and actually make sense as an educational experience.

So I designed a three-phase testing strategy:

**Phase 1: Model Comparison (Manual, by me)**

This is where I am right now. I take the same set of test prompts and run them through different LLM models to see which ones produce the best Sugar Activity code. The models I'm testing:

- **ChatGPT (GPT-4o)** - strong at following structured instructions, good at Python
- **Claude** - really good at understanding constraints and producing clean code
- **DeepSeek** - Chinese model, surprisingly good at code generation, want to see how it handles Sugar-specific patterns
- **Qwen** - another strong Chinese model, testing for diversity in approaches

For each model, I'm evaluating on:
- Does the generated code actually parse (no syntax errors)?
- Does it follow the Sugar Activity structure correctly?
- Does it use the right GTK3 widgets?
- Does the `.xo` bundle install on Sugar?
- Does the activity actually launch and do something reasonable?

I'm running about 10 test prompts through each model. Things like "make a multiplication quiz for 8-year-olds," "build a drawing app where kids can save their art," "create a typing tutor that tracks words per minute." Different enough to test the template categories, simple enough that I can manually verify the output.

Early results: Claude and GPT-4o are neck and neck for code quality. DeepSeek is surprisingly competitive, especially for straightforward activities. The Chinese models sometimes struggle with Sugar-specific conventions (like Journal integration) because there's less Sugar Labs content in their training data, but the system prompt helps a lot.

**Phase 2: Small Group User Testing**

Once I'm confident in the model output from Phase 1, the next step is putting it in front of real people. Not a big launch, just a small group of users from the Sugar community - a few learners, a couple of teachers, maybe some fellow contributors. The idea is to watch them actually use the system and see what breaks.

The questions here are completely different from Phase 1:

- Can someone who isn't me actually use the Prompt Screen without getting confused?
- Do the generated activities make sense to a learner who didn't write the prompt?
- Can they modify the activity using the Reflective Studio?
- Do the template categories (Logic & math, Games, Creation, etc.) feel intuitive?
- Does the Use -> Modify -> Create progression actually work as a learning path?

This is the testing that matters most. I can stare at generated code all day, but until a kid actually tries to use the activity, I don't really know if it works. The feedback from this phase will directly shape what gets refined before the midterm evaluation.

**Phase 3: Automated Validation + Broader Rollout**

Phase 3 is about scaling. Once I know from real users what "good" looks like, I can build automated checks that catch the bad stuff before anyone sees it:

- **AST parsing** - does the Python code parse without errors?
- **Import validation** - does it only import modules available in Sugar's environment?
- **Structure checks** - does it have `activity.info`, `setup.py`, and the right entry point?
- **Bundle integrity** - does the `.xo` file have the correct internal structure?
- **License compliance** - are SPDX headers present? Does the LICENSE file match the selected license?
- **Safety checks** - no network calls, no file system access outside the activity directory, no subprocess spawning

The automated pipeline is what lets this scale beyond "Ashutosh manually checking every generated activity." Every activity that passes the pipeline should install, launch, and be safe to run on a kid's laptop. Combined with the user feedback from Phase 2, this gives us a solid quality bar for the final release.

---

## Challenges & How I Overcame Them

**The system prompt kept getting too long.** Models have context limits, and a 3000-word system prompt eats into the space available for the user's prompt and the model's response. The modular template approach solved this. Instead of one giant prompt, I assemble only the relevant blocks. A "Games" prompt doesn't need to see canvas drawing examples.

**Different models interpret the same system prompt differently.** GPT-4o follows instructions very literally, which is great for structure but sometimes produces rigid code. Claude is better at inferring intent but occasionally gets creative in ways that break Sugar conventions. I ended up tweaking the prompt slightly for each model, with a base template and model-specific overrides.

**Defining "good enough" for generated activities is hard.** A generated activity might install and launch but produce a terrible user experience. For Phase 1, I'm being pragmatic: if it installs, launches, and does roughly what the prompt asked for, it passes. Quality refinement is what the Reflective Studio and the iterative chat are for.

---

## Key Learnings

Walter's testing question was humbling. I'd been so focused on the generation pipeline that I hadn't thought carefully about how to validate the output. Building an AI code generator is one thing. Building one you can trust to put in front of children is a completely different challenge. The three-phase approach gives me confidence at each level: I trust the model (Phase 1), I trust the code (Phase 2), and I trust the learning experience (Phase 3).

Testing across multiple models taught me that the system prompt is everything. The difference between a good and bad Sugar Activity isn't the model, it's the instructions. A well-crafted system prompt makes even mid-tier models produce usable output. A vague prompt makes even GPT-4o produce garbage.

The modular prompt template system was a good architectural decision. It keeps the prompts maintainable and lets me tune each template category independently. When I eventually add new categories, I just write a new prompt block. Nothing else changes.

---

## Next Week's Roadmap

- Finish Phase 1 model comparison and pick the default model(s)
- Start building the Phase 2 automated validation pipeline (AST parsing, import checks, bundle integrity)
- Get at least 10 test prompts producing valid, installable `.xo` bundles end-to-end
- Begin integrating the RAG context layer with real Sugar Activity examples

---

## Acknowledgments

Thanks to Walter Bender for asking the question that reshaped this entire week. "How will you test this?" sounds simple, but answering it properly forced me to think about quality, safety, and trust in a way I hadn't before. The three-phase strategy is directly inspired by that conversation.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
