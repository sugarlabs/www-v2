---
title: "GSoC '26 Week 12 and Final Update by Ashutosh Singh"
excerpt: "The final reliability pass makes generated activities preserve learner intent, survive deeper runtime checks, repair known Sugar mistakes, and support reflection-led refinement. Sugar Activity Studio reaches v1.4.0."
category: "DEVELOPER NEWS"
date: "2026-08-20"
slug: "2026-08-20-gsoc-26-ashutoshx7-week12"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week12,ashutoshx7,final-report,reliability,validation,repair,reflection,release,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 12 and Final Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)<br />
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)<br />
**Final Reporting Period:** August 11, 2026 to August 20, 2026

---

## Goals for This Final Week

- Audit the complete path from a learner's idea to an accepted Sugar activity
- Preserve requested mechanics through clarification, enhancement, generation, and repair
- Exercise delayed behavior and state transitions, not just application startup
- Repair common Sugar API mistakes deterministically before spending another model call
- Make refinement a guided reflection process rather than a blank instruction box
- Finish with a stable, tested release that the community can continue developing

---

## This Week's Achievements

The final week was not about adding one large headline feature. It was about making every promise from the previous eleven weeks hold at the same time.

A generated activity could already parse, launch, save, preview, and accept refinements. But a successful launch is not the same as fulfilling the learner's idea. A game might open while ignoring the requested timer. A repair might fix a traceback while accidentally undoing the learner's last change. A delayed callback might fail several seconds after the runtime gate had already declared success.

I treated the full pipeline as one system and strengthened its weakest handoffs. The result is the most substantial reliability pass of the project and the final [Sugar Activity Studio v1.4.0 release](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.4.0).

### 1. Preserving the Learner's Intent End to End

Intent can be lost a little at a time. Clarification can focus on the wrong detail, enhancement can rewrite the request too aggressively, retrieval can surface an irrelevant example, and generation can produce a polished activity that leaves out the mechanic the learner actually asked for.

I tightened every one of those stages:

- Activity specifications now carry richer metadata for the requested behavior
- Clarification questions are aware of the activity's intent and avoid asking generic questions that do not move the design forward
- Prompt enhancement preserves the original request instead of replacing it with a plausible alternative
- RAG retrieves interaction-specific Sugar patterns, not merely activities with similar words
- Generation prompts explicitly prioritize learner-requested mechanics
- Validation checks request fidelity, including delayed APIs and interactive behavior

The important shift is from asking "is this valid Sugar code?" to asking "is this valid Sugar code that does what the learner requested?"

### 2. A Deeper Acceptance and Repair Pipeline

Week 7 introduced the runtime gate. This week I made that gate much harder to fool.

The runtime harness now exercises delayed game states by pumping events and advancing through timed behavior, so code that crashes only after a callback can no longer pass simply because its first frame appeared. The critic reviews generated behavior, not only syntax and structure. The validator checks for request fidelity and unsafe or unsupported delayed calls.

I also added a deterministic repair layer for common Sugar API mistakes. When the system recognizes a known error, it can apply a precise repair immediately instead of asking the model to rediscover the same fix. Every repair remains transactional: it applies to the existing source, runs through the acceptance gates, and rolls back if it makes the activity worse.

Refinement now follows the same discipline. Revision diagnostics are retained, stale preview timers are stopped, and the repair loop preserves the learner's requested change instead of silently restoring an older version. The pipeline generates the full file once and improves that candidate with focused patches, which makes both the code and the history easier to understand.

### 3. Better Generated Activities, Not Just Safer Ones

Reliability also includes the quality of the activity itself. I improved the composition used by the generator and local templates, added Sugar-native learning-area icons, and strengthened real-time activity generation. The generated interface now has clearer structure, while games and interactive tools are more likely to have reachable states, visible feedback, and mechanics that match the request.

The provider layer received a similar hardening pass. Image-capable routing is explicit, reference-image analysis has a safer fallback, and failures return useful context to the studio instead of collapsing into a generic error.

### 4. Reflection-Led Activity Tools

The final UX change returns to the constructionist heart of the project. I redesigned the activity tools around reflection-led changes. Instead of facing an empty box and being expected to know how to improve the activity, a learner gets a guided quest through questions such as what they notice, what they want to change, and what would make the activity more useful or fun.

The sidebar keeps the connection between the reflection and the code change visible. Guided refinement suggestions make it easier to take the next step without turning the model into an invisible author. The learner still decides what matters; the studio helps turn that decision into a small, reviewable revision.

![The studio review keeps the generated plan and code visible instead of hiding how the activity was made](assets/Images/gsoc26-ashutoshx7/aod-studio-review.png)

### 5. Community Polish and v1.4.0

The community contribution cycle continued during the final stretch. Rakshit improved error cards so preview and generation failures are readable and actionable, then added API-key validation at save time with user-friendly messages. I reviewed and merged both contributions. Akshay Nazare also followed with dead-code cleanup and regression coverage immediately after the release work, another good sign that maintenance is already becoming shared.

On August 20, I tagged **v1.4.0** with guided refinement suggestions. The released studio can now take a plain-language idea or visual reference, clarify and enhance it, ground it in real Sugar patterns, generate and validate an activity, run it, repair it, preview it, preserve its revision history, guide reflection, and export or install the result.

That is the complete loop I proposed at the beginning of GSoC.

---

## Challenges & How I Overcame Them

**Distinguishing startup success from behavioral success.** A window that opens can still contain broken delayed logic or an unreachable game state. Extending the harness to exercise event-driven behavior, then feeding those results into validation and repair, made acceptance reflect real use more closely.

**Fixing code without erasing a refinement.** A repair system naturally wants to return to the last known-good source. During refinement, that can throw away the exact change the learner requested. I made the refined revision the repair transaction's source of truth and retained diagnostics for every attempt, so rollback means "before the bad repair," not "before the learner's change."

**Balancing guidance with agency.** Reflection prompts can become another form the learner has to satisfy. I kept the suggestions short, optional, and tied to visible parts of the activity. They are starting points for thought, not a required questionnaire.

**Making a large final pass reviewable.** The reliability work crossed providers, prompting, retrieval, generation, validation, runtime checks, repair, service state, and UI. I split the work into focused commits and backed each boundary with tests so a future contributor can understand one guarantee at a time.

---

## Final Project Status

Sugar Activity Studio is now a standalone Sugar Labs project rather than a patch inside the Sugar shell. It runs on a regular Linux desktop, can also be installed into the Sugar activity ring, and can be shared as source, packaged as a Sugar `.xo` bundle, or downloaded as a portable AppImage.

Across the program, the project grew through these stages:

1. A learner-centered prompt screen and structured activity specification
2. A Sugar-aware generation pipeline with provider abstraction, RAG, and validation
3. Runtime checks, model-assisted critique, and transactional self-repair
4. Live preview, click-to-refine, revision history, and generated Sugar icons
5. Standalone packaging and public releases under the Sugar Labs organization
6. Real-user feedback loops, visual references, multiple learning areas, and deliberate naming
7. Reflection-led modification and a final end-to-end reliability pass

The repository also moved beyond being a solo GSoC codebase. Contributors opened pull requests, iterated through review, added tests, and had their work merged. That shared ownership is one of the outcomes I value most because it gives the software a life beyond this final report.

---

## Key Learnings

The biggest technical lesson is that generated code needs an acceptance system, not a confidence score. The studio does not trust code because a model says it is finished. It checks the structure, safety, requested behavior, runtime, saved state, delayed events, and the result of every repair.

The biggest product lesson is that learner agency has to survive every convenience feature. Enhancement, image analysis, templates, RAG, repairs, and suggestions are useful only when they strengthen the learner's idea rather than quietly replacing it.

And the biggest open-source lesson is that completion does not mean I stop being needed because every line is perfect. It means the project is documented, testable, releasable, and understandable enough for someone else to improve. The Week 11 and Week 12 contributions made that lesson concrete.

Sugar's "low floor, no ceiling" principle guided the whole project. The floor is now a short prompt and one click. The ceiling is the ability to inspect the plan, read the code, revisit every revision, refine the activity, package it, and keep building. That is the kind of AI-assisted creation tool I wanted to make: one that helps a learner become an author, not just a consumer of generated output.

---

## What's Next

- Continue testing with learners and teachers across different Sugar environments
- Expand the local corpus of vetted Sugar interaction patterns
- Improve accessibility and keyboard navigation throughout the studio
- Track provider changes while keeping the offline template path dependable
- Welcome community issues and pull requests as the project continues beyond GSoC

---

## Acknowledgments

Thank you to Walter Bender for keeping the project centered on learners, reflection, and making rather than on generation for its own sake. Thank you to Ibiam Chihurumnaya for technical guidance and steady review throughout the program.

Thank you to Rakshit Yadav and Akshay Nazare for contributing to the project during its final weeks, and to everyone in the Sugar Labs community who tested releases, reported confusing behavior, reviewed ideas, or shared an activity. The project is better because it became shared work.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
