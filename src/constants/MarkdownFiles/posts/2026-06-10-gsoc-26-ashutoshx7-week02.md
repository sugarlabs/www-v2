---
title: "GSoC '26 Week 02 Update by Ashutosh Singh"
excerpt: "Starting the backend generator, reworking templates based on mentor feedback, and adding license selection to the Prompt Screen."
category: "DEVELOPER NEWS"
date: "2026-06-10"
slug: "2026-06-10-gsoc-26-ashutoshx7-week02"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week02,ashutoshx7,ai,backend,templates,license,sugar-activity-on-demand"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** June 2, 2026 to June 8, 2026  

---

## Goals for This Week

- Start building the backend generator - the thing that actually turns a prompt into a real Sugar Activity
- Act on Walter's feedback from the Week 1 review
- Add license selection to the Prompt Screen

---

## This Week's Achievements

If last week was all about the frontend, this week was about what happens behind it. I started writing the backend generator, the part that takes a structured spec and spits out an actual installable Sugar Activity. But honestly, the more interesting story this week is what happened when Walter reviewed my Week 1 work.

He had two very specific pieces of feedback, and both of them turned out to be way more meaningful than I expected. What looked like "just change some labels" ended up reshaping how the whole system thinks about templates and licensing. Let me walk through everything.

### 1. The Backend Generator

This is the boring-but-important part. I started building `aodgenerator.py`, which is basically the engine that sits between the AI planner and the final `.xo` bundle. The planner figures out *what* to build, and the generator actually *builds* it.

Right now it can:

- **Scaffold a full project** - creates the whole directory structure (`activity/`, `activity.info`, `setup.py`, `activity.py`, `README.md`) from a template spec
- **Emit template-based code** - each template archetype has its own skeleton, and the generator fills in the specifics: activity name, toolbar config, canvas widgets, Journal hooks
- **Generate metadata** - the `activity.info` file gets auto-populated with the right `bundle_id`, `name`, `summary`, `icon`, and `license` fields
- **Package bundles** - it can produce a `.xo` file that Sugar can install directly (it's just a zip with a specific structure, but getting it right matters)

Nothing fancy architecturally. One module, pure Python, no dependencies beyond the Sugar toolkit. I wanted it to be dead simple to test and audit, because this code is eventually running on kids' laptops and I don't want any surprises.

### 2. Walter's First Feedback - Rethinking the Templates

This one caught me off guard. Remember the template picker from Week 1? It had four options: **Auto**, **Starter**, **Game**, and **Quiz**. I thought they were fine. Walter didn't.

His point was that those labels are *tool-centric*. They describe what the system does internally, not what the learner is trying to create. And in a constructionist learning tool, that distinction matters a lot. A kid shouldn't be thinking "I want the Starter template." They should be thinking "I want to make something creative."

So we reworked them into four new categories:

- **Logic & math** - puzzles, patterns, mathematical thinking
- **Tools/utilities** - build helpful tools that solve real problems
- **Games** - play loops, scoring, and interactive mechanics
- **Creation** - drawing, writing, building, and expression

![Prompt Screen with reworked template categories - Creation template selected](assets/Images/gsoc26-ashutoshx7/aod-templates-creation.png)

See the difference? "Starter" and "Auto" are implementation details. A learner sees those and has no idea what they mean. But "Creation" and "Logic & math"? Those are things a kid actually relates to. When they click "Creation," they're telling the system what *kind of thing* they want to make, and the system figures out the right code template behind the scenes.

This also had backend implications. The generator now maps learning categories to template archetypes internally. A "Creation" prompt might pull in a canvas-based template with drawing tools. A "Logic & math" prompt might use a grid-based template with state tracking. The mapping logic lives in the generator, completely separate from the UI. That separation already proved useful - when the categories changed, I only had to touch the mapping, not the generator itself.

### 3. Walter's Second Feedback - Adding License Selection

The second thing Walter flagged was licensing. Every Sugar Activity needs a license, and my Week 1 Prompt Screen had... nothing for that. No way to pick one, no default, nothing. Walter's take was simple: add a license selector, default it to MIT, and give teachers the option to pick something else if they need to.

So I added a license section right below the planner and policy controls. It has seven options:

| License | What It Is |
|---------|------------|
| **MIT** | Simple permissive - the default |
| **GPLv3+** | Sugar's own share-alike license |
| **Apache** | Permissive with patent grant |
| **AGPLv3** | Network share-alike |
| **LGPLv3** | Library share-alike |
| **MPL-2.0** | File-level share-alike |
| **BSD-3** | Permissive with attribution |

![Prompt Screen showing the new license selector - BSD-3 selected](assets/Images/gsoc26-ashutoshx7/aod-license-bsd3.png)

MIT is selected by default because it's the simplest. Most learners, especially the younger ones, won't care about this at all and that's totally fine. But for teachers deploying activities in schools, or for activities that might end up on the Sugar Activity Library, having the right license baked in from the start saves a lot of headaches later.

There's a nice little description line below the license buttons that updates dynamically. Pick MIT and it says "Simple permissive license. Adds LICENSE, SPDX headers, and bundle metadata. SPDX: MIT." Pick BSD-3 and it says "Permissive license with attribution..." Pick MPL-2.0 and it explains the file-level copyleft. It's a small thing, but it helps teachers understand what they're choosing without having to go read legal documents.

On the backend, the generator now reads the selected license and does three things:

1. Writes a full `LICENSE` file into the generated project
2. Adds SPDX headers to every generated source file (like `# SPDX-License-Identifier: MIT`)
3. Sets the `license` field in `activity.info` and the bundle metadata

So every activity that comes out of AOD is properly licensed from the moment it's created. No need to retroactively add license files or fix metadata later.

---

## Challenges & How I Overcame Them

**The template category -> archetype mapping isn't clean.** "Creation" could mean a drawing app, a music maker, or a story builder. For now, I'm doing keyword analysis on the prompt to pick the right archetype. It works for testing, but it's a bit hacky. Once the LLM planner is wired up, it'll handle this mapping much more intelligently. For now, good enough.

**SPDX identifiers are annoyingly specific.** MIT is just `MIT`, but GPL v3 is `GPL-3.0-or-later`, and BSD 3-Clause is `BSD-3-Clause`. Get any of these wrong and the license metadata is technically invalid. I built a small registry in the generator that maps each UI label to its correct SPDX identifier, full license text, and header template. One source of truth, no guessing.

**Seven license options is a lot for a kid.** Walter and I talked about this. His suggestion was to keep MIT as the default and just let the other options be there for teachers who know what they want. The dynamic description text helps. Down the road we might collapse the less common ones behind an "Advanced" toggle, but for now it doesn't feel overwhelming.

---

## Key Learnings

Walter's feedback on the templates was one of those moments where you realize how much *naming* matters. From an engineering perspective, "Auto" and "Starter" made perfect sense to me. But I'm not the user. A 10-year-old in a classroom is. And to them, "Creation" means something. "Starter" doesn't. It's a small change in the UI, but it reflects a completely different way of thinking about who this tool is for.

The license work was a good reminder that open-source compliance isn't just a checkbox you tick at the end. Getting SPDX headers, LICENSE files, and bundle metadata all consistent takes actual engineering. Doing it at generation time is way easier than trying to bolt it on after the fact.

And honestly, building the backend in parallel with these UI changes forced me to think carefully about separation of concerns. The generator doesn't know about GTK widgets or button states. It just reads a spec dict. That paid off immediately - when the template categories changed, the generator didn't need a single line of modification.

---

## Next Week's Roadmap

- Finish all template archetypes in the generator: Canvas, Grid, Narrative, Quiz, and Utility
- Start wiring the LLM pipeline - system prompt design, RAG context injection, spec generation
- Get the first end-to-end flow working: prompt -> LLM -> spec -> generator -> installable `.xo` bundle
- Test with at least 5 diverse prompts to see if the template selection logic actually holds up

---

## Acknowledgments

Thanks to Walter Bender for the feedback that reshaped this week. What started as "change some labels and add a license picker" turned into a deeper conversation about who we're building this for and what the UI should communicate. Both changes made the system better in ways I wouldn't have thought of on my own.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
