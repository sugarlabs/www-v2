---
title: "GSoC '26 Week 01 Update by Ashutosh Singh"
excerpt: "Building the entire GTK3 frontend for Sugar Activity on Demand, from prompt screen to Reflective Studio."
category: "DEVELOPER NEWS"
date: "2026-06-03"
slug: "2026-06-03-gsoc-26-ashutoshx7-week01"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week01,ashutoshx7,ai,frontend,gtk3,sugar-activity-on-demand"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** May 26, 2026 to June 1, 2026  

---

## Goals for This Week

- Design and build the complete GTK3 frontend for the Activity on Demand system
- Implement the Prompt Screen with suggestion chips, template selection, and planner/policy controls
- Build the Reflective Studio screen with AI co-designer chat, activity preview, code review, version history, and a learning sidebar
- Wire up the Use, Modify, Create progression flow

---

## This Week's Achievements

This was one of those weeks where I basically locked in and didn't come up for air. The plan was simple: get the entire frontend done before any backend work started, so that Walter and Devin could see the full vision and give feedback early. That's exactly what happened. Every screen, every panel, every button is in place. The backend will plug into a UI that's already been tested and reviewed by my mentors. Here's a full video walkthrough of everything I built:

[youtube: ApgKoOP22is]

Here's what I built.

### 1. The Use, Modify, Create Flow

The very first thing a learner sees when they open Activity on Demand is a choice: how do you want to start? This follows Papert's constructionist progression: first use something, then modify it, then create from scratch.

![Use Modify Create mode selector](assets/Images/gsoc26-ashutoshx7/aod-modify-create.png)

**Modify** lets the learner "change an existing activity. Pick a starter activity and modify it with guided challenges and hints." This is the gentle on-ramp. The learner doesn't start from zero. They start from something that works and make it their own.

**Create** lets the learner "describe something new. Describe an activity in your own words and the AI will generate it for you." This is the full experience.

The bottom of each card has a little motivational nudge: "Then try changing things" and "Then create your own!" Small touches, but they make a difference in how learners perceive the progression.

### 2. The Prompt Screen

Once the learner picks "Create," they land on the Prompt Screen. I wanted it to feel inviting, not intimidating. The screen opens with a warm headline: "Let's make a playful learning activity" and a subtitle that tells learners to describe what they want in plain language.

![Prompt Screen with suggestion chips, template selector, and planner controls](assets/Images/gsoc26-ashutoshx7/aod-prompt-screen.png)

There are a few key pieces on this screen:

The **mode selector** sits at the top with three buttons: Make (create something new), Play (try an existing activity), and Share (prepare an XO bundle). Make is selected by default. Below that there's a **template picker** with Auto, Starter, Game, and Quiz options. The "Auto" option analyzes the prompt and picks the right template automatically. If the learner wants more control, they can pick one themselves.

Then there's the **planner and policy controls**. This is where the system configuration lives. Planner options include Default (balanced plan), RAG (use Sugar examples), and Validate (AST safety checks). Policy options include Standard (cloud preferred, safe default), Local (offline-first), and Strict (kid-safe limits). These toggle buttons are styled to make the active choices really obvious at a glance.

The **learning prompt area** is a big text area where the learner types their description. There's a character counter (max 500), and below it, a suggestion chip that rotates examples like "Try: treasure-map quest where teams solve clues and explain each step." Clicking the chip fills the prompt area. A **status bar** at the bottom shows the current planner mode and policy configuration.

The whole screen is designed so a 10-year-old could use it without any guidance, but a technical teacher could also fine-tune the planner and policy to their classroom's needs.

### 3. The Reflective Studio

This is the heart of the whole project. Once an activity is generated, the learner lands in the Studio, which is a three-panel workspace where they can understand, modify, and learn from the code.

![Reflective Studio with AI co-designer and learning sidebar](assets/Images/gsoc26-ashutoshx7/aod-studio-preview.png)

The layout has three panels:

**Left panel: AI Co-designer Chat.** This isn't just a chatbot. It's a co-design partner. When the learner submits a prompt, the AI responds with context about what it's doing: "Planner: Gemini LLM. Grounding Sugar Activity patterns, GTK3 widgets, Journal hooks, and safe bundle structure." It tells the learner about age ranges, materials, and how children can share results. The learner can keep refining here, asking for changes or asking questions, while the Studio stays open.

**Center panel: Classroom Preview.** Three tabs at the top: Preview, Review, and Versions. Preview shows a live preview of the generated activity with "Make / Play / Share" buttons. The preview area also has a Live Edit Mode toggle that lets learners click on parts of the preview to target specific areas for modification.

**Right panel: Learning Sidebar.** This is where the constructionist magic happens. Three sub-tabs: Challenges, Reflections, and Annotations. Challenges start at Level 1 (Cosmetic), things like "Rename the activity title in your own words" or "Change one greeting to include the learner's name." There are 8 starter challenges, each with a Hint button and a Done button. Level 2 unlocks after the learner completes Level 1 challenges. Level 3 gets into actual structural modifications.

At the bottom there's a refinement bar: "Ask for refinements, teamwork ideas..." with a Send button. And action buttons: Back, Rebuild, Export XO, and Install & Open.

### 4. The Code Review Tab

Switch to the Review tab and the center panel transforms into a full code editor view.

![Studio Review mode showing generated activity.py with file tree](assets/Images/gsoc26-ashutoshx7/aod-studio-review.png)

On the left is a file tree showing the generated project structure: `README.md`, `activity/`, `activity.py`, `add_pangolin`, `setup.py`. Clicking any file shows its source.

The code viewer shows proper syntax highlighting, with imports in blue, class names in dark, strings in green, keywords in purple. You can see the full Sugar Activity lifecycle here: the `GeneratedActivity` class extending `activity.Activity`, the `__init__` method, `build_toolbar()`, `_build_canvas()`, `write_file()`, and `read_file()`.

Above the code there are two buttons: "Explain project" and "Explain file". These trigger the AI to give a learner-friendly explanation of what the code does. The source is marked as "(editable)" so learners know they can modify it directly.

### 5. The Version History Tab

This one I'm really proud of. Switch to the Versions tab and you get a full diff viewer showing the evolution of the generated activity.

![Studio Versions tab with diff view comparing v1 to v6](assets/Images/gsoc26-ashutoshx7/aod-studio-versions.png)

The left side shows a version history timeline: v1 through v6, each with a timestamp and description:
- v1: "Initial activity scaffold from the first learning prompt."
- v2: "Added learner-facing prompt copy and starter canvas structures."
- v3: "Connected toolbar actions and preview metadata."
- v4: "Prepared Journal save and restore hooks."
- v5: "Added safety checks and guided edit notes."
- v6: "Lazy version with preview bridge and export metadata ready."

Each version has a "View Source" button. Above the diff viewer there's a compare dropdown so you can pick which two versions to compare.

The diff itself uses red/green coloring, with removed lines in red and added lines in green. You can see real changes happening across versions: constants being renamed, new flags being added (`JOURNAL_ENABLED`, `PREVIEW_BRIDGE`, `SAFETY_CHECKS`), and methods being refined with proper docstrings.

This isn't just version tracking. It's a learning tool. When a learner can see *how* their activity evolved through six iterations, they start to understand what the AI actually did, and more importantly, *why*.

---

## Architecture Notes

The whole frontend is built in a single `activityondemand.py` module, a full-screen GTK3 window using the Sugar toolkit. A few key design decisions worth calling out:

**All UI updates go through `GLib.idle_add()`.** The generation will eventually run in a worker thread, and GTK3 is not thread-safe, so this pattern is baked in from the start.

**Lazy imports only.** The AOD module isn't loaded until the learner clicks "Create with AI" in the Home View. This keeps Sugar's startup time impact under 50ms.

**Component isolation.** Each screen (Prompt, Studio Preview, Studio Review, Studio Versions) is a separate builder method, making it straightforward to iterate on individual screens without touching the others.

**Sugar design language.** Every widget uses GTK3 + Sugar toolkit conventions. No custom frameworks, no web views. It's native GTK all the way down.

---

## Challenges & How I Overcame Them

**Designing a three-panel layout that works on small screens (including OLPC XO laptops).** I used `Gtk.Paned` with sensible default proportions and minimum widths. The sidebar collapses on narrow screens, and the code viewer wraps properly.

**Making the Learning Sidebar feel non-intrusive while still being discoverable.** Challenges default to Level 1 (simple, encouraging tasks). Reflections and Annotations are on separate tabs, not all visible at once. The sidebar doesn't compete with the main preview/review area for attention.

**The Version History diff view needed to show meaningful changes without overwhelming the learner.** I used a simple compare dropdown and color-coded diff rendering. Descriptions on each version use plain language, not git-style commit messages.

---

## Key Learnings

Building the frontend first was the right call. Walter and Devin could see the full user flow before any backend existed, and their feedback shaped decisions I would have gotten wrong otherwise.

The constructionist learning layer (Challenges, Reflections, Annotations) is what separates this from a generic code generator. Without it, we're just building another AI tool. With it, we're building a learning environment.

GTK3's layout system is actually quite capable for complex multi-panel UIs once you get comfortable with `Gtk.Box`, `Gtk.Paned`, and `Gtk.Notebook`. No need for web technologies.

---

## Next Week's Roadmap

- Start building `aodgenerator.py`, the template rendering engine that produces real Sugar Activity code from structured specs
- Implement all 5 template archetypes: Hello, Story, Typing, Quiz, and Notebook
- Begin wiring the LLM pipeline with the system prompt and RAG context injection
- Get at least 10 test prompts producing valid, installable `.xo` bundles end-to-end

---

## Acknowledgments

Thanks to Walter Bender for the constructionist framing that keeps this project honest. It would be easy to build "just another AI code generator," and the constant reminder that learners should understand what they're creating is what makes AOD different.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
