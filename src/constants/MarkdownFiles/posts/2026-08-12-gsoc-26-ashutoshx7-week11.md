---
title: "GSoC '26 Week 11 Update by Ashutosh Singh"
excerpt: "The project becomes a community effort: I review and merge a new Sugar Activity Studio identity and a contributor-built naming flow that closes the feedback loop from Week 9 testing."
category: "DEVELOPER NEWS"
date: "2026-08-12"
slug: "2026-08-12-gsoc-26-ashutoshx7-week11"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week11,ashutoshx7,community,open-source,branding,activity-name,install,export,review"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)<br />
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)<br />
**Reporting Period:** August 4, 2026 to August 10, 2026

---

## Goals for This Week

- Turn the activity-naming feedback from Week 9 into a complete install and export flow
- Give the studio its own recognizable Sugar-native identity
- Review outside contributions carefully and help them reach the main branch
- Keep contributor changes covered by the same tests and UX standards as my own work

---

## This Week's Achievements

This week looked different from most of the project. I wrote less of the visible feature code myself, and that is a good sign. Sugar Activity Studio received two substantial contributions from [Rakshit Yadav](https://github.com/rakshityadav1868), and my work shifted toward reviewing, testing, discussing revisions, and merging them.

That change matters. A project becomes healthier when another person can understand it well enough to improve it. The best milestone of Week 11 was not simply two new features. It was seeing the repository start to behave like a shared open-source project.

### 1. A Real Identity for Sugar Activity Studio

Until this week the studio borrowed Sugar's generic computer icon, and some desktop surfaces showed a blank placeholder. Rakshit's [branding contribution](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/13) introduced a dedicated mark: the XO figure with a spark beside it.

The icon now identifies the studio consistently in the launcher, window, toolbar, home ring, and empty state. There are two carefully matched forms: a Sugar activity SVG that supports Sugar's stroke and fill entities, and a literal-color desktop SVG for places where those entities are not substituted.

The work also uncovered one of those wonderfully specific desktop problems: `gdk-pixbuf` only sniffs the beginning of the SVG when detecting its format. Keeping the SVG element early in the file prevents the launcher from rejecting a valid icon and drawing a blank one.

### 2. Closing Walter's Naming Feedback Loop

During Week 9 testing, Walter noticed that the generated activity name felt random and there was no obvious place to change it. Rakshit's second contribution, [the install and export naming flow](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/14), closes that loop.

Before installing or exporting, the learner can now confirm or change the activity name. License selection remains its own deliberate step. Separating the two dialogs keeps two different decisions from being mixed together: what the activity is called, and how it may be shared.

The contribution went through several review iterations. The first version introduced the naming prompt; later commits separated naming from licensing, added a clear difference view for name changes, adopted Sugar-native light styling, and expanded the test coverage. By the time I merged it, the feature addressed the original feedback without making the shipping flow harder to understand.

### 3. Maintainer Work Is Product Work

Reviewing these changes was not just checking whether the code ran. I traced the activity name through generation, install, and export; checked the dialog sequence; verified that the Sugar and regular desktop icons both render through their different paths; and made sure the new tests captured the behavior we wanted to keep.

This is an important part of completing the project. If every feature depends on the original author holding the whole architecture in their head, the software is not ready to continue after GSoC. A contributor being able to enter through an issue, build a change, respond to review, and get it merged is evidence that the project can outlive the program.

---

## Challenges & How I Overcame Them

**Reviewing the experience, not only the diff.** The individual changes looked straightforward, but the order of naming and licensing dialogs determined whether the flow felt coherent. I reviewed the complete user journey and asked for iterations where the two decisions were still tangled.

**Supporting two SVG environments.** Sugar replaces entity colors in activity icons, while a normal Linux desktop expects literal colors. Keeping one canonical design in two compatible encodings gave the studio a consistent identity without sacrificing Sugar conventions.

**Giving useful contributor feedback.** A review has to be precise enough to act on. Linking comments to the intended learner experience, then relying on tests for the mechanical guarantees, kept the review collaborative and moved both pull requests toward merge.

---

## Key Learnings

Open-source maintainership is a different kind of engineering. Writing a feature yourself can be faster in the moment, but helping another contributor land it leaves the project with both better code and another person who understands the system.

This week also completed one of the cleanest feedback loops in the project: Walter used the release, found that the activity name felt random, the problem became a concrete issue, a community contributor implemented the fix, and review made it part of the main product. That is exactly how I hoped development at Sugar Labs would work.

The new icon may look like polish, but identity matters for learners too. A tool that has a name, a recognizable place in the activity ring, and a consistent mark feels like something they can return to and make their own.

---

## Next Week's Roadmap

- Run a final reliability pass from the learner's request through runtime acceptance
- Catch deterministic Sugar API mistakes before asking a model to debug them
- Test delayed game states rather than accepting only a clean startup
- Redesign the activity tools around reflection and guided modification
- Make technical failures understandable to learners and teachers

---

## Acknowledgments

Thanks to [Rakshit Yadav](https://github.com/rakshityadav1868) for both Week 11 contributions and for responding thoughtfully to review. Thanks to Walter Bender for the activity-naming observation that started this work, and to Ibiam Chihurumnaya for continued guidance as the project moves toward its final release.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
