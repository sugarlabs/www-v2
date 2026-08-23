---
title: "GSoC '26 Week 12 and Final Update by Ashutosh Singh"
excerpt: "I spent my final week making generated activities more dependable, improving the reflection flow, and wrapping up Sugar Activity Studio with the v1.4.0 release."
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

## What I Wanted to Finish

- Check the whole journey from a learner's prompt to a working activity
- Make sure important details from the original idea don't disappear along the way
- Test behavior that happens a few seconds after an activity starts
- Fix common Sugar API mistakes without always needing another model call
- Make the refinement sidebar easier and more inviting to use
- Finish the program with a release that people can actually try

---

## What I Worked On

My final week was mostly about the small gaps that only become obvious when the entire project is running together.

By this point, the studio could generate an activity, validate it, open it in a preview, save revisions, and package it. That sounds complete, but I kept finding cases where each individual part worked and the final activity still missed the point. A game might open correctly but forget the timer the learner asked for. A repair might solve a crash but undo the latest refinement. Sometimes an activity failed only after a delayed callback, long after the first screen appeared.

I spent this week chasing those cases. It was less glamorous than adding a brand new screen, but it made the studio much more trustworthy.

### Keeping the Original Idea Intact

A learner's request passes through several stages before it becomes code. The studio may clarify it, enhance it, retrieve examples, create a plan, and then generate the activity. Every stage is helpful, but every stage is also another place where the original idea can get watered down.

I went through that path carefully. Clarification questions now pay more attention to the type of activity being made. Prompt enhancement keeps the learner's original request visible instead of replacing it with a nicer sounding alternative. Retrieval looks for Sugar examples with similar interactions, not just similar words. The generation prompt also gives more weight to mechanics the learner explicitly requested.

I added request checks to validation as well. The question is no longer only, "Is this valid Python and Sugar code?" The pipeline also asks, "Did we build the thing the learner described?"

### Testing More Than the First Screen

The runtime checker from Week 7 was good at catching activities that crashed while opening. It wasn't as good at catching a game that failed three seconds later.

I extended the runtime harness so it keeps GTK events moving and exercises delayed states. This catches broken timers and callbacks that a simple startup check would miss. The critic also looks more closely at whether interactions and game states are reachable.

For mistakes that appear often in generated Sugar code, I added a set of known repairs. These are small, deterministic fixes for specific API problems. There is no reason to spend another model call rediscovering a fix we already understand. The repaired code still has to pass every check, and a bad patch is rolled back.

Refinement needed the same care. I fixed a case where stale preview timers could continue after a revision, kept diagnostics for each attempt, and made sure the repair loop starts from the learner's refined version. A repair should never "help" by quietly removing the change the learner just asked for.

### Making the Activity Tools Friendlier

I also redesigned the activity tools sidebar. The old version gave you an empty input and expected you to know what to ask. That works once you are comfortable with the studio, but it is not a great first experience.

The new flow uses short reflection prompts. It asks what you notice, what you would like to change, and what could make the activity clearer or more fun. These prompts act as conversation starters. They are optional, and the learner still decides what should change.

This part was especially important to me because Activity on Demand should not feel like a machine that produces a finished answer. It should help a learner look at what they made, think about it, and improve it.

![The studio review keeps the generated plan and code visible instead of hiding how the activity was made](assets/Images/gsoc26-ashutoshx7/aod-studio-review.png)

### Community Improvements

Rakshit Yadav continued contributing during the final week. He improved the error cards so generation and preview failures are easier to understand, and added API key validation with useful messages when a key does not work. I reviewed and merged both changes.

Akshay Nazare also cleaned up unused studio code and added regression coverage. Seeing other people find their way around the repository and improve it has been one of the nicest parts of finishing this project.

### Releasing v1.4.0

On August 20, I released [Sugar Activity Studio v1.4.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.4.0).

The studio can now take a plain language idea or an image, ask useful follow-up questions, generate a Sugar activity, validate and run it, repair problems, show it in a live preview, keep its revision history, and export or install it. More importantly, the learner can keep changing the result instead of being stuck with the first version.

That is the complete loop I described in my proposal, and it feels good to see it working as one project.

---

## Things That Were Hard

**A window opening does not mean an activity works.** Some bugs only appear when a timer fires or the activity reaches another state. Running the event loop for longer and checking delayed behavior gave the runtime test a much more honest definition of success.

**Repairs can accidentally erase good work.** The repair loop originally had cases where it could fall back too far and lose a refinement. I changed the transaction so the newest learner-approved revision is always the starting point.

**Guidance can become annoying very quickly.** I wanted the reflection prompts to help without turning them into another form to complete. Keeping them short and optional made the sidebar feel more like an invitation than an instruction.

---

## Looking Back at the Project

Sugar Activity Studio started as work inside my Sugar shell fork. It is now its own project under Sugar Labs. It runs on a regular Linux desktop, can be added to the Sugar activity ring, can build a Sugar `.xo` bundle, and has a downloadable AppImage.

Over twelve weeks, I worked on:

1. A learner-friendly prompt screen and structured activity plans
2. Sugar-aware generation with multiple model providers and local RAG
3. Static validation, runtime checks, critique, and safe repair
4. Live previews, focused refinement, and complete revision history
5. Standalone packaging and public releases
6. User testing, visual references, and multiple learning areas
7. Reflection-led changes and a final reliability pass

The project also stopped being something only I worked on. Contributors opened pull requests, responded to reviews, wrote tests, and had their changes merged. That gives me confidence that the repository can keep growing after GSoC.

---

## What I Learned

My biggest technical lesson is that generated code needs to prove itself. A confident answer from a model means very little if the activity crashes, ignores the prompt, or cannot save its state. Running and checking the code is what makes the system useful.

My biggest product lesson is to protect the learner's idea. Enhancement, RAG, image analysis, and suggestions should help express that idea. They should not quietly replace it.

I also learned how much better open source becomes when you let other people into the work. Reviewing a contribution sometimes took longer than writing a quick fix myself, but it left the project with another person who understood that part of the code.

Sugar's "low floor, no ceiling" idea stayed in my head throughout the project. The floor is now a short prompt and a few clicks. The ceiling is much higher. A learner can inspect the plan, read the code, revisit an older version, refine the activity, and package it for somebody else.

---

## What Comes Next

- Keep testing the studio with learners and teachers
- Add more trusted Sugar examples to the local retrieval collection
- Improve keyboard navigation and accessibility
- Keep the offline template path dependable as model providers change
- Help new contributors work on issues and pull requests

---

## Thank You

Thank you to Walter Bender for always bringing the conversation back to learners, reflection, and making. Thank you to Ibiam Chihurumnaya for the technical guidance and steady reviews throughout the program.

Thank you to Rakshit Yadav, Akshay Nazare, everyone who tested a release, and everyone in the Sugar Labs community who shared feedback. This project is much better because it became shared work.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
