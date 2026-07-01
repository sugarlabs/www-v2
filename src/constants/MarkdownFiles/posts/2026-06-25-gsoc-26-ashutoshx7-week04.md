---
title: "GSoC '26 Week 04 Update by Ashutosh Singh"
excerpt: "Wrapping up the Phase 1 model comparison, building an AST-based validation pipeline with self-healing regeneration, and generating our first 10 installable Sugar Activities end-to-end."
category: "DEVELOPER NEWS"
date: "2026-06-25"
slug: "2026-06-25-gsoc-26-ashutoshx7-week04"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week04,ashutoshx7,ast-parsing,rag,automated-validation,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** June 16, 2026 to June 22, 2026  

---

## Goals for This Week

- Wrap up the Phase 1 model comparison and lock in a default LLM
- Build the Automated Validation Pipeline (AST parsing, import checking, safety sweeps)
- Take 10 test prompts all the way to installable `.xo` bundles, end to end
- Begin standing up the RAG (Retrieval-Augmented Generation) context layer using real Sugar Activity code

---

## This Week's Achievements

This was the week everything I'd been building in pieces for the last three weeks snapped together into something that actually works. For the first time I typed a plain sentence, "Make a multiplication quiz for 8-year-olds," hit generate, and watched a real GTK3-based Sugar Activity `.xo` bundle come out the other end and launch cleanly on my Sugar desktop. After weeks of frontends and specs and prompt design, actually seeing the whole loop close felt like the project finally became real.

The big shift this week was moving from me manually eyeballing model output to letting an automated validation system do the heavy lifting. Here's how it went.

### 1. Closing Out Phase 1: Choosing the Default Model

Last week I laid out the Phase 1 plan; this week I actually ran it, putting four models head to head on my suite of 10 standardized prompts across all four learning categories (Logic & math, Tools/utilities, Games, and Creation). The lineup: **Claude Sonnet**, **Claude Opus**, **Gemini 3.5 Flash**, and **ChatGPT 5.5**.

What I found was more nuanced than I expected:

- **Gemini 3.5 Flash** was the fastest of the bunch and handled the logic-heavy prompts well, but it would occasionally reach for GTK2 imports or fumble the `sugar3.activity.Activity` lifecycle. My best guess is there just isn't much Sugar Labs code in its training data, so it doesn't have a strong internal model of how an activity is actually shaped.
- **ChatGPT 5.5** was rock-solid on structure and followed the constraints almost to the letter, but the code sometimes came out a little stiff, especially on the game prompts where a bit of creative looseness would have made for a better activity.
- **Claude Sonnet** was the surprise of the test. It was fast, rarely broke Sugar conventions, and came close to Opus on most prompts. For a lighter or more cost-sensitive deployment it's a genuinely strong option.
- **Claude Opus** ended up winning the comparison. It hit the sweet spot: it respected the strict Sugar GTK3 constraints while still producing readable, well-commented code with educational logic that actually made sense for a learner, and it held up best on the trickiest prompts.

I recorded every one of these test runs as I went, so the differences between the models are easy to see for yourself instead of just taking my word for it:

[youtube: 6nNVRaqLGNY]

[youtube: wBz3GX7lBsE]

[youtube: 4lIhXR01kGI]

[youtube: bWp9Jp-seC4]

[youtube: _aVlmK7kHJE]

[youtube: eMnM8yqLbdw]

[youtube: -H_svEXM29M]

So I've set **Claude Opus** as the default model in `aodgenerator.py`, with Claude Sonnet as the obvious lighter-weight alternative. But I deliberately kept the interface model-agnostic, exactly like I built it in Week 3, so anyone who'd rather run a different or self-hosted model can swap it in with a config change. The default should be the best option, not the only option.

### 2. The Automated Validation Pipeline (AST Parsing)

Even with Claude Opus behaving well, LLM output is never fully predictable. When the person typing the prompt might be a 10-year-old, "usually correct" isn't good enough. The system can't crash on them, and it absolutely cannot run something dangerous. It needed a gatekeeper.

So this week I built the **Automated Validation Pipeline**, which sits in front of the packaging step like a bouncer before any code is allowed into an `.xo` bundle. It leans on Python's built-in `ast` module to statically inspect whatever the LLM hands back, without ever executing it.

Right now it runs three checks:

1. **Syntax parsing.** A quick `ast.parse()` confirms the generated Python is at least syntactically valid, so it won't fail to parse the moment Sugar tries to import it. Whether it actually loads and runs is what the later checks and the real install test are for.
2. **Import whitelisting.** Walking the tree, I pull out every `import` and `from X import Y` and compare them against an allowlist (`sugar3`, `gi.repository.Gtk`, `math`, `random`, and friends). Anything reaching for `os`, `subprocess`, or `sys` gets the code rejected and sent back for regeneration.
3. **Structure validation.** Another pass over the tree confirms the main class actually extends `sugar3.activity.Activity` and defines the required methods like `__init__`, rather than just being generic GTK code wearing a Sugar costume.

The part I'm most pleased with is what happens on failure. Instead of just giving up, the pipeline takes the exact AST error and feeds it back to the LLM as a "Code Review" prompt, essentially telling the model precisely what it got wrong and asking for a fix. That self-healing loop has worked better than I expected; a lot of first-pass mistakes get quietly corrected on the second attempt.

### 3. 10 for 10

The most satisfying moment of the week was running the whole test suite through the new pipeline. With AST validation catching the edge-case slip-ups and nudging the model to correct itself, all 10 test prompts made it end to end.

Everything from a "Pattern matching game" to a "Collaborative poem builder" came out complete: `activity.info` populated, the chosen open-source license applied, the Python written, the `.xo` zipped up, and, the part that matters most, every single one installed and launched in Sugar. Ten prompts in, ten activities out, zero manual fixes.

### 4. Kicking Off the RAG Context Layer

Claude Opus is capable, but it hasn't memorized the entire Sugar toolkit API perfectly, and honestly no model has. To close that gap, I started building a lightweight RAG (Retrieval-Augmented Generation) layer.

Rather than leaning only on whatever the model absorbed during pre-training, the backend now pulls snippets from real, vetted Sugar Activities, `hello-world` and `paint-activity` to start, and injects the relevant patterns into the system prompt based on the learner's template category. That way the model always has an accurate reference on hand for the fiddly stuff, like proper Journal integration through `read_file()` and `write_file()`, instead of guessing at it.

---

## Challenges & How I Overcame Them

**AST traversal is trickier than it looks.** The tree gets deep and there are a lot of ways to sneak an import past a naive check. Aliased imports like `import os as safe_os` were the obvious trap, but there were subtler cases too. I ended up writing a custom `NodeVisitor` subclass that specifically tracks every flavor of import and the aliases they bind to, so no unsafe module can slip through under a friendly-looking name.

**The self-healing loop wanted to run forever.** In the first version, if the model simply couldn't fix an error, the validator and the LLM would just keep handing the same broken code back and forth indefinitely. I capped it with a hard `MAX_RETRIES = 3`. If the code still fails after three attempts, the pipeline stops, falls back to a safe Hello-World boilerplate, and surfaces a clear note in the Reflective Studio so the user knows what happened instead of staring at a spinner.

---

## Key Learnings

Building the AST parser genuinely changed how I think about working with LLMs. The lesson that stuck: the way to keep a model in line isn't only better prompting, it's wrapping deterministic, programmatic guardrails around it. The LLM is the creative engine, but the AST pipeline is the steering wheel and the brakes. You want both.

The RAG work drove home a related point about context. Handing the model the right snippet of a real Sugar Activity at the right moment beats cramming everything into one enormous static prompt. Dynamic, targeted context produced noticeably better GTK3 UI code than any amount of up-front instruction did.

---

## Next Week's Roadmap

- Start turning toward **Phase 2: Small Group User Testing**, but there's plumbing to do first
- Deal with the fact that full validation is *slow*; every preview currently waits on the whole AST-plus-retry loop, which kills the fast-iteration feel, so I want to make validation something the user can toggle rather than always paying for
- Wire up proper **LLM provider configuration** so a teacher can point AOD at their own API key or a local endpoint instead of relying on the baked-in default
- Get AOD **installable as a Flatpak** so mentors and testers can actually run it without hand-building a Sugar dev environment

---

## Acknowledgments

As always, thanks to my mentors Walter and Ibiam for reviewing the testing approach and pushing me to take the security and validity of the generated code as seriously as the generation itself. The Python `ast` module docs also did a lot of heavy lifting this week.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
