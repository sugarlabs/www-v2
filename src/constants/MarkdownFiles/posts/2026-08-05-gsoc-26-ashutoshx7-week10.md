---
title: "GSoC '26 Week 10 Update by Ashutosh Singh"
excerpt: "Activity creation grows beyond a single text prompt: multiple learning areas now travel through the whole pipeline, previews and version review become clearer, and visual references arrive in the v1.3.0 release."
category: "DEVELOPER NEWS"
date: "2026-08-05"
slug: "2026-08-05-gsoc-26-ashutoshx7-week10"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week10,ashutoshx7,visual-reference,multimodal,learning-areas,preview,release,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)<br />
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)<br />
**Reporting Period:** July 28, 2026 to August 3, 2026

---

## Goals for This Week

- Carry the reflection sidebar from a prototype into the main project
- Make learning areas real generation context rather than a decorative UI choice
- Improve preview and version review so learners can understand what changed
- Let a learner begin with an image as well as words
- Cut releases around stable, testable milestones

---

## This Week's Achievements

Week 9 ended with a lesson about pointing: when someone wants to change an activity, they naturally point at the part they mean. This week I followed that idea in the other direction. Sometimes the clearest way to explain what you want to create is not a longer paragraph. It is a sketch, a worksheet, a screenshot, or a photo of something you want to build from.

That led to the biggest addition of the week: a complete visual-reference workflow. Alongside it, I tightened the existing preview and revision experience, carried multiple learning areas through every stage of generation, and released those improvements as [v1.2.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.2.0) and [v1.3.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.3.0).

### 1. Learning Areas Became Part of the Specification

The creation screen already let a learner describe an idea, but a single category was too restrictive. A project can be both science and drawing, or language and games. I changed the activity specification to support multiple learning areas and then followed that data all the way through the system.

The selected areas are now:

- Stored in saved project plans and restored when a project is reopened
- Included in clarification questions, so the questions fit the learning goal
- Passed into prompt enhancement without replacing the learner's original intent
- Combined in the generation prompt and retained in the final plan

This was a good example of a UI feature that is only real when the backend agrees with it. Multi-select chips on the screen would have meant nothing if the planner silently reduced them to one value later.

### 2. Clearer Preview and Version Review

The live preview and version history from Week 8 worked, but reviewing a generated activity still asked too much of the learner. I polished the preview states, made generation failures easier to distinguish from preview failures, and improved the review view so moving between revisions gives a clearer picture of what the studio produced.

I also simplified the creation controls and their defaults. The aim was to keep the common path short while leaving the advanced controls available. A learner should be able to choose an area, describe an idea, and start; they should not have to understand provider routing or validation modes before making their first activity.

### 3. Creating From a Visual Reference

The new reference workflow lets a learner attach an image to the idea they type. The studio prepares a safe preview, sends the image only through a provider that supports visual input, and turns the analysis into context for clarification and generation.

That opens several useful starting points:

- A hand-drawn layout for a game
- A classroom worksheet that could become interactive
- A screenshot whose structure a learner wants to remix
- A photograph that inspires a science, language, or storytelling activity

Provider support was the difficult part. Not every model or API accepts images in the same format, and some do not accept them at all. I added explicit capability handling and a fallback analysis path rather than letting an image fail somewhere deep inside generation. The text prompt remains the source of intent; the image adds evidence instead of taking control away from the learner.

### 4. Two Releases in One Week

On July 30, I tagged **v1.2.0** around the improved activity preview and version-review experience. On August 3, the visual-reference workflow became **v1.3.0**.

Keeping these as separate releases made the progression easy to review. v1.2.0 improved how learners inspect what they have made. v1.3.0 expanded what they can use to describe the thing they want to make.

---

## Challenges & How I Overcame Them

**Keeping learning context consistent.** The selected learning areas cross project storage, clarification, enhancement, planning, and generation. I added coverage at each boundary so reopening a project or enhancing a prompt cannot quietly lose that context.

**Normalizing image support across providers.** Multimodal APIs disagree about message shapes, MIME types, and supported models. I kept provider-specific conversion in the provider layer and exposed a simple capability to the rest of the studio. Unsupported paths now fall back cleanly instead of producing a mysterious generation error.

**Using images without overriding the learner.** A model can over-interpret a screenshot and invent a different activity. The reference analysis is treated as supporting context, while the learner's words and selected learning areas remain the main instruction.

---

## Key Learnings

Input is not synonymous with text. A learner may know exactly what they mean and still find it difficult to turn that idea into a specification. Letting them combine words, learning areas, and a visual reference lowers that translation cost.

I also learned again that state has to survive the entire pipeline. A choice is not meaningful because the interface collected it. It is meaningful because saving, reopening, clarifying, enhancing, generating, and refining all continue to respect it.

This fits Sugar's constructionist approach well. Children rarely begin a project from a perfect written brief. They begin with an example, a drawing, a half-formed idea, or something they want to remix. The studio should accept those beginnings and help turn them into something runnable.

---

## Next Week's Roadmap

- Give Sugar Activity Studio a recognizable identity of its own
- Finish the activity-naming fix identified during Walter's Week 9 test
- Make install and export choices clearer and more deliberate
- Review and integrate the first substantial outside contributions to the repository

---

## Acknowledgments

Thanks to Walter Bender for continuing to push the project toward learner-controlled creation, and to Ibiam Chihurumnaya for the ongoing technical review. Thanks also to everyone testing the releases and showing me that a rough sketch can communicate an activity idea better than another paragraph.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
