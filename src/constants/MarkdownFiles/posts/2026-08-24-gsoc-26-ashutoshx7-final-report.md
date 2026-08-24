---
title: "GSoC '26 Final Report by Ashutosh Singh"
excerpt: "How Sugar Activity on Demand grew from an early GTK prototype into Sugar Activity Studio, a released tool that helps learners turn an idea or mockup into a real Sugar activity."
category: "DEVELOPER NEWS"
date: "2026-08-24"
slug: "2026-08-24-gsoc-26-ashutoshx7-final-report"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "Final GSoC 2026 report for Sugar Activity on Demand at Sugar Labs"
tags: "gsoc26,sugarlabs,final-report,ashutoshx7,sugar-activity-studio,activity-on-demand,ai,education,constructionism"
image: "assets/Developers/ashutosh-singh/sugar-activity-studio-banner.png"
---

<!-- markdownlint-disable -->

# GSoC 2026 Final Report by Ashutosh Singh

**Author:** [Ashutosh Singh](https://github.com/Ashutoshx7)<br />
**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)<br />
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)<br />
**Organization:** [Sugar Labs](https://www.sugarlabs.org)<br />
**Project Repository:** [sugarlabs/Sugar-activity-on-Demand](https://github.com/sugarlabs/Sugar-activity-on-Demand)<br />
**Reporting Period:** May 8, 2026 to August 24, 2026

---

![Sugar Activity Studio project banner showing the create, preview, refine, and export workflow](assets/Developers/ashutosh-singh/sugar-activity-studio-banner.png)

## Abstract

My GSoC project started with a simple question: could a learner describe an idea in ordinary words and receive a real Sugar activity that they could run, inspect, change, and share?

The difficult part was never just asking a model to write Python. A Sugar activity has a lifecycle, a bundle structure, Journal integration, GTK constraints, safety requirements, and a learning purpose. If any one of those is missing, the result may look convincing in a code block and still fail the learner.

Over twelve weeks, I built **Sugar Activity Studio**, a standalone desktop application for Activity on Demand. It takes a plain-language idea or visual reference, helps the learner clarify it, grounds generation in real Sugar patterns, validates and runs the generated code, repairs failures, shows a live preview, keeps every revision, and packages the result as an installable Sugar activity.

The project now lives under the Sugar Labs organization, has five tagged releases through [v1.4.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.4.0), and has already received contributions from people outside the original GSoC work.

---

## Why This Project Matters

Sugar has always encouraged learners to use, modify, and create. Most activity development tools, however, assume that a learner already understands Python, GTK, Sugar bundles, and the command line.

Activity on Demand tries to lower that first step without hiding the rest of the process. A learner can begin with "make a fraction matching game," but the result is not locked inside a chatbot. They can play it, inspect the plan and source, ask for a focused change, compare revisions, and export the activity.

That distinction guided almost every design choice I made. The model is there to help a learner become an author. It should not turn the learner into a spectator.

---

## What I Proposed and What I Shipped

| Area | Initial Goal | Final Outcome |
| --- | --- | --- |
| Creation | Turn a text prompt into a Sugar activity | Text prompts, prompt enhancement, guided clarification, multiple learning areas, and visual references |
| Generation | Produce a valid activity scaffold | Complete Sugar projects grounded in installed activities through local RAG |
| Correctness | Check syntax and bundle structure | Static validation, request-fidelity checks, runtime execution, Journal round-trips, delayed-state testing, critique, and transactional repair |
| Modification | Let learners request changes | Click-to-refine, focused patches, guided reflection, code review, and full revision history |
| Distribution | Build installable `.xo` bundles | `.xo` export, direct install, Flatpak source export, Sugar ring installation, and a portable AppImage |
| Access | Support one model path | OpenRouter, Gemini, OpenAI, Claude, DeepSeek, Qwen, Moonshot, Ollama, and an offline template mode |
| Sustainability | Complete a GSoC prototype | A standalone Sugar Labs repository with releases, documentation, tests, and community contributors |

---

## The Final Workflow

```text
Learner idea or image
        |
        v
Enhance and clarify
        |
        v
Build an activity plan
        |
        v
Retrieve relevant Sugar patterns
        |
        v
Generate the activity
        |
        v
Validate, run, critique, and repair
        |
        v
Preview and reflect
        |
        v
Refine, review versions, install, or export
```

Each stage has one job. Keeping those responsibilities separate made the system easier to test and stopped the UI, providers, generation logic, and runtime checks from becoming one large file that nobody could safely change.

---

## Phase 1: Designing the Learner Journey, Weeks 1 and 2

I began with the parts a learner would see. The first GTK prototype had a Prompt Screen for describing an idea and a Reflective Studio for preview, review, versions, and modification.

![The early Prompt Screen with template, planner, policy, and prompt controls](assets/Images/gsoc26-ashutoshx7/aod-prompt-screen.png)

The original categories were based too much on implementation details. Walter's feedback helped move them toward learner intentions such as Logic & Math, Games, Tools, and Creation. I also added an explicit license choice because generated free software still needs clear terms for sharing and remixing.

In Week 2, the first backend generator began producing complete Sugar bundles with `activity.info`, `setup.py`, an activity entry point, Journal hooks, metadata, and a README. This was the first point where the idea stopped being a UI mockup and became something Sugar could install.

### What this phase produced

- The Use, Modify, Create journey
- Prompt, preview, review, and version screens
- Learner-centered activity categories
- License selection
- Complete Sugar bundle scaffolding

---

## Phase 2: Generation, Providers, and Validation, Weeks 3 to 5

The next problem was teaching models enough about Sugar to generate an activity rather than a generic GTK application.

I designed a structured system prompt around Sugar's activity lifecycle, allowed GTK and Sugar APIs, Journal behavior, bundle layout, safety rules, and the selected learning category. I then compared multiple providers and separated provider configuration from the rest of the application so the studio would not depend on one company or model.

The first validation pipeline used Python AST parsing, import checks, bundle checks, license checks, and safety rules. Ten different test prompts made it through that pipeline to installable `.xo` bundles during the initial validation pass.

![The validation control that lets a tester choose between a fast preview and the full validation path](assets/Images/gsoc26-ashutoshx7/aod-validation-toggle.png)

Validation was useful but slow, so I made it a visible choice instead of silently making every preview wait. I also added a provider panel for API keys, model overrides, and local endpoints, and prepared Flatpak packaging so mentors and testers could run the project without recreating my development setup.

### What this phase produced

- A Sugar-specific system prompt and structured activity specification
- Provider-independent model configuration
- AST, import, safety, license, and bundle validation
- A retry path for invalid candidates
- Flatpak packaging and a validation toggle

---

## Phase 3: Real Users, a Standalone Project, and Runtime Checks, Weeks 6 and 7

User testing changed the direction of the project. I had been testing with careful prompts such as a complete game description. Real users typed "math game" or "typing practice." The weak result was not only a model problem. The studio was accepting an unfinished idea as if it were a complete specification.

I added prompt enhancement and guided clarification so a short idea could grow into a useful brief without changing the learner's intent. I also added local retrieval over installed Sugar activities, allowing generation to use real Sugar patterns when relevant examples are available.

The biggest structural change was moving Activity on Demand out of my Sugar shell fork and into its own repository. Sugar Activity Studio now uses the Sugar toolkit as a library but does not require the full Sugar shell to be running. That made normal installation, releases, and outside contributions practical.

Static checks were still not enough. Some generated activities parsed correctly and crashed as soon as they opened. I built a runtime gate that launches each candidate in a separate process, pumps GTK events, and tests a Journal save and restore round-trip. Failures become structured repair feedback instead of reaching the learner as a blank window.

```text
Static checks -> Runtime gate -> Behavior critic -> Accepted revision
       |              |                 |
       +--------------+-----------------+
                      |
                 focused repair
```

This was the point where I stopped treating generated code as text and started treating it as software that had to prove it could run.

---

## Phase 4: Refinement, Packaging, and the First Release, Weeks 8 and 9

Once the generation engine was more dependable, I spent time on the experience around it.

Learners could click a part of the preview and describe a change. The studio applies that change as a focused patch instead of generating the complete file again. Every accepted refinement becomes a new revision, so experimenting does not destroy the last working version.

![The Versions view showing saved revisions beside a source-code diff](assets/Images/gsoc26-ashutoshx7/aod-studio-versions.png)

I packaged the studio as a portable AppImage and published the first releases under Sugar Labs. Then I put the release in front of other people.

Walter built a Periodic Table Explorer and immediately noticed something I had stopped seeing: there was no clear place to name the activity, so the generated name felt random. That feedback later became a community contribution for naming before install and export.

This phase taught me that a release is not the end of testing. It is the moment testing becomes honest.

---

## Phase 5: Visual References, Sugar-Native Design, and Final Reliability, Weeks 10 to 12

The final phase connected visual input, Sugar-native design, community contributions, and a deeper reliability pass.

Activities can belong to more than one learning area, so I carried multiple selections through storage, clarification, enhancement, planning, and generation. After Walter's feedback that the category icons still felt generic, I redesigned them around Sugar's simple silhouettes, rounded strokes, and strong outlines.

![The Sugar-native learning-area selector with Games selected](assets/Developers/ashutosh-singh/sugar-native-learning-areas.png)

I also added visual references. A learner can attach a sketch, worksheet, photograph, or screenshot and use it as context alongside the written prompt. The symmetry-garden example gave me a clear end-to-end test.

![The original symmetry-garden wireframe mockup](assets/Developers/ashutosh-singh/symmetry-garden-mockup.png)

The generated activity kept the main interactions from the mockup: symmetry modes, drawing tools, brush sizes, colors, a challenge, requirement tracking, and a Check Garden action.

![The generated symmetry activity running with a butterfly-wings challenge](assets/Developers/ashutosh-singh/symmetry-garden-result.png)

The result was not a pixel copy, and it did not need to be. The important result was that a visual design became a runnable Sugar activity that could be refined further.

During the final reliability pass, I strengthened request-fidelity checks, provider routing, image fallbacks, interaction-specific retrieval, generated game behavior, deterministic Sugar API repairs, delayed runtime testing, revision diagnostics, and refinement repair.

I also redesigned the activity tools around short reflection prompts. Instead of expecting a learner to face an empty box and know what to change, the studio can ask what they notice, what they want to improve, and what would make the activity clearer or more fun.

![The Review view with generated source and reflection prompts visible together](assets/Images/gsoc26-ashutoshx7/aod-studio-review.png)

---

## How Generated Code Is Accepted

The final pipeline does not trust a candidate because a model says it is finished.

| Gate | What it checks |
| --- | --- |
| Specification | Required metadata, learning areas, license, and requested mechanics |
| Static validation | Syntax, imports, bundle structure, blocked calls, and Sugar API use |
| Request fidelity | Whether the requested interaction and delayed behavior are present |
| Runtime harness | Startup, GTK events, delayed callbacks, and process isolation |
| Journal round-trip | Saving and restoring learner state |
| Behavior critic | Reachable interactions, handlers, feedback, and game states |
| Transactional repair | Focused patches, full revalidation, and rollback of bad changes |

The complete file is generated once. Later fixes are focused patches against that candidate. This keeps working code in place, makes failures easier to understand, and preserves the learner's refinement instead of rolling back too far.

---

## Final Results

As of August 24, 2026, the project repository contains:

| Result | Current State |
| --- | --- |
| Tagged releases | 5, from v1.0.0 through v1.4.0 |
| Repository history | 147 commits |
| Contributors | 4 |
| Tracked files | 113 |
| Python source and test size | About 40,850 lines |
| Automated test collection | 448 tests |
| Model paths | 8 hosted or local providers, plus offline templates |
| Distribution | Source, AppImage, Sugar ring installation, `.xo`, direct install, and Flatpak source export |

These numbers are useful, but the result I care about is simpler: somebody can download the studio, describe or show an idea, receive a real Sugar activity, see how it was made, and keep changing it.

---

## Releases

| Release | Date | Main Milestone |
| --- | --- | --- |
| [v1.0.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.0.0) | July 17 | Portable AppImage build |
| [v1.1.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.1.0) | July 19 | Guided studio flow and first public release |
| [v1.2.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.2.0) | July 30 | Improved preview and version review |
| [v1.3.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.3.0) | August 3 | Visual-reference workflow |
| [v1.4.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.4.0) | August 20 | Guided refinement suggestions |

---

## Community Contributions

One of the best outcomes was seeing the repository become shared work.

| PR | Contribution |
| --- | --- |
| [#9](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/9) | Reflection prompts and code annotations in the learning sidebar |
| [#13](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/13) | A dedicated Sugar Activity Studio icon and desktop identity |
| [#14](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/14) | Activity naming before install and export |
| [#16](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/16) | Clearer generation and preview error cards |
| [#17](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/17) | API-key validation with useful error messages |
| [#19](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/19) | Dead-code cleanup and regression coverage |

Reviewing this work taught me that maintainership is part of implementation. A useful review explains the learner experience behind a requested change, not only the line that should be edited.

---

## What Was Hard

### Sugar has a small public code footprint

General-purpose models often know Python and GTK but not Sugar's lifecycle or Journal patterns. Structured prompting helped, but local retrieval from installed Sugar activities was what made grounding more practical.

### Valid code can still be broken software

AST checks found syntax and import problems. They could not tell me whether a window would open, a callback would fire later, a game could be completed, or Journal state could be restored. The runtime harness and behavior critic grew directly from that gap.

### Safety and iteration pull in opposite directions

Full validation makes generation slower. Skipping checks makes previews fast but less trustworthy. I exposed the choice during development, then worked on focused repairs so later attempts would not regenerate everything.

### Helpful AI can erase learner intent

Enhancement, clarification, retrieval, image analysis, and repair can all make a result look better while quietly changing the original request. I had to carry the learner's words and requested mechanics through every stage and test for fidelity at the end.

### A feature is not complete when only I understand it

Moving the code into a standalone repository, splitting it by domain, documenting setup, adding tests, and reviewing outside contributions took time away from visible features. It was still essential. The project can continue only if another person can enter the codebase safely.

---

## What I Learned

The biggest technical lesson was to treat generated code like any other untrusted program. It needs isolation, explicit gates, useful diagnostics, and rollback.

The biggest product lesson came from watching people type short prompts. Users were not failing to describe their ideas. The studio was failing to meet them where they were. Enhancement and clarification came from accepting that.

The biggest community lesson was that feedback becomes valuable when it closes a loop. Walter noticed the category language, licensing, activity naming, and icon style. Each observation became a concrete change. Later, contributors implemented several of those changes and improved them through review.

Most of all, I learned that AI-assisted creation works best when the process stays visible. The plan, source, preview, failures, and revisions should remain available to the learner. A finished answer is less valuable than a starting point they understand and can change.

---

## What Remains

GSoC is complete, but the project is not finished forever. The next useful steps are:

- Test with more learners and teachers across different Sugar environments
- Improve accessibility and full keyboard navigation
- Add more trusted Sugar interaction patterns to local retrieval
- Expand runtime interaction testing beyond startup and delayed callbacks
- Make AppImage compatibility clearer across older Linux distributions
- Keep the offline template path useful as hosted providers change
- Continue turning learner feedback into small, reviewable issues

---

## Project Resources

- [Source repository](https://github.com/sugarlabs/Sugar-activity-on-Demand)
- [Latest release](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/latest)
- [Architecture documentation](https://github.com/sugarlabs/Sugar-activity-on-Demand/blob/main/docs/ARCHITECTURE.md)
- [Child usability notes for Activity Tools](https://github.com/sugarlabs/Sugar-activity-on-Demand/blob/main/docs/CHILD_USABILITY_TEST_ACTIVITY_TOOLS.md)
- [Test suite](https://github.com/sugarlabs/Sugar-activity-on-Demand/tree/main/tests)
- [GSoC 2026 project idea](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)

---

## Weekly Archive

| Entry | Report |
| --- | --- |
| Community Bonding | [Understanding Sugar and defining the problem](/news/all/2026-05-23-gsoc-26-ashutoshx7-community-bonding) |
| Week 1 | [Building the Prompt Screen and Reflective Studio](/news/all/2026-06-03-gsoc-26-ashutoshx7-week01) |
| Week 2 | [Backend generation, learner-centered templates, and licensing](/news/all/2026-06-10-gsoc-26-ashutoshx7-week02) |
| Week 3 | [System prompting, model integration, and the test strategy](/news/all/2026-06-17-gsoc-26-ashutoshx7-week03) |
| Week 4 | [Model comparison, validation, and ten installable bundles](/news/all/2026-06-25-gsoc-26-ashutoshx7-week04) |
| Week 5 | [Provider controls, optional validation, and Flatpak packaging](/news/all/2026-07-01-gsoc-26-ashutoshx7-week05) |
| Week 6 | [User testing, prompt enhancement, RAG, and the standalone move](/news/all/2026-07-08-gsoc-26-ashutoshx7-week06) |
| Week 7 | [Runtime checks, self-repair, and behavior critique](/news/all/2026-07-15-gsoc-26-ashutoshx7-week07) |
| Week 8 | [Live refinement, version history, AppImage, and v1.1.0](/news/all/2026-07-22-gsoc-26-ashutoshx7-week08) |
| Week 9 | [Real-user feedback and focused annotations](/news/all/2026-07-29-gsoc-26-ashutoshx7-week09) |
| Week 10 | [Multiple learning areas, Sugar-native icons, and visual references](/news/all/2026-08-05-gsoc-26-ashutoshx7-week10) |
| Week 11 | [Mockup to result, community branding, and activity naming](/news/all/2026-08-12-gsoc-26-ashutoshx7-week11) |
| Week 12 | [Final reliability pass, reflection, and v1.4.0](/news/all/2026-08-20-gsoc-26-ashutoshx7-week12) |

---

## Acknowledgments

Thank you to Walter Bender for constantly bringing the project back to learners, constructionism, and the question of whether a feature actually helps someone make something. His feedback changed the categories, licensing, activity naming, icon design, testing, and the reflection flow.

Thank you to Ibiam Chihurumnaya for the technical guidance and steady review throughout the program. Thank you to Rakshit Yadav and Akshay Nazare for contributing to the repository, responding to review, and helping the project become shared work.

Thank you to everyone who tested a release, shared an activity, reported confusing behavior, or reviewed an idea. And thank you to Sugar Labs and Google Summer of Code for giving me the time and community to turn a proposal into software that people can continue using and changing.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
