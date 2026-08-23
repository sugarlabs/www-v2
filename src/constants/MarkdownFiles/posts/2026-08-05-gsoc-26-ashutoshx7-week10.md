---
title: "GSoC '26 Week 10 Update by Ashutosh Singh"
excerpt: "This week I made it easier to describe an activity with more than a text prompt. The studio now understands multiple learning areas, has a clearer preview, and can use an image as a visual reference."
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
**Reporting Period:** July 28, 2026 to August 3, 2026<br />
**Previous Update:** [Week 9: Testing the first release and building the annotation flow](/news/all/2026-07-29-gsoc-26-ashutoshx7-week09)

---

## What I Planned to Do

- Bring the reflection sidebar work into the main project
- Make learning areas useful to the generator, not just visible on the screen
- Clean up the preview and version review experience
- Let people use an image when words are not enough
- Release the improvements in small, stable versions

---

## What Happened This Week

[Week 9](/news/all/2026-07-29-gsoc-26-ashutoshx7-week09) was mostly about watching people use the first release. One thing I kept noticing was how often people pointed at something instead of trying to describe it perfectly. They would say, "something like this," or "change this part here." That made me think about the creation screen too.

Not every activity idea begins as a neat paragraph. Sometimes it begins as a sketch in a notebook, a worksheet from class, or a screenshot of an interface somebody wants to remix. This week I added a way to use those images as references.

I also merged the [reflection sidebar work from PR #9](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/9) and fixed several less visible issues around learning areas, saved plans, previews, and revisions. Those changes became two releases: [v1.2.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.2.0) and [v1.3.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.3.0).

![The Sugar Activity Studio prompt screen before the Week 10 input improvements](assets/Images/gsoc26-ashutoshx7/aod-prompt-screen.png)

*The earlier Prompt Screen was centered on typed input. This week's work made the context behind that prompt richer and added a path for visual references.*

### Using More Than One Learning Area

The creation screen originally treated an activity as if it belonged to one category. Real projects don't fit that neatly. A learner might want to draw a solar system, write a story-based game, or practice language through music.

I [updated the activity specification](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/f638c7f) so it can hold multiple learning areas. The obvious part was letting the learner select more than one. The time-consuming part was making sure those choices survived the rest of the pipeline.

The selected areas are now [restored with saved projects](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/e968353), used while [asking clarification questions](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/156c2d8), included during [prompt enhancement](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/d7cc96f), and [combined in the final generation prompt](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/b0456eb).

I found this work surprisingly satisfying because it closed a quiet gap between the interface and the generator. Before this change, a selection could look important on screen and then lose its meaning later. Now the generator really uses it.

### Cleaning Up Preview and Version Review

The preview and revision history had grown quickly over the previous two weeks. They worked, but some states were confusing. It was not always clear whether generation had failed, the preview had failed, or an older revision was being shown.

I [cleaned up those transitions and made version review easier to follow](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/5225745). I also simplified some of the creation controls. The common path should be short: choose the learning areas, describe the idea, and start making. Provider and validation settings are still available, but they don't need to dominate the first screen.

![The Versions view in Sugar Activity Studio showing revision cards and a source diff](assets/Images/gsoc26-ashutoshx7/aod-studio-versions.png)

*The improved Versions view shows the saved revision history beside the exact source changes, so a learner can understand what changed before moving between versions.*

These improvements became the **v1.2.0** release on July 30.

### Adding Visual References

The biggest piece of work was the [visual reference flow](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/3febbc5). A learner can now attach an image with their prompt. The studio shows a safe preview, checks whether the selected provider supports image input, and uses the image analysis as extra context while planning the activity.

Some examples I had in mind were:

- Turning a hand-drawn game layout into a first working version
- Using a classroom worksheet as the starting point for an interactive activity
- Recreating the structure of a screenshot with different content
- Building a story or science activity from a photograph

Making the button was easy. Making the feature work across providers was not. Every API handles images a little differently, and some text models cannot accept them at all. I kept those differences inside the provider layer and added a fallback path so an unsupported image does not cause a confusing failure halfway through generation.

I was also careful not to let the image take over the prompt. The learner's words still describe what should be made. The image is supporting material, not permission for the model to invent a different idea.

The completed visual reference flow became [**v1.3.0**](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.3.0) on August 3.

---

## Problems I Ran Into

**Learning areas were easy to lose.** The data passes through project storage, clarification, enhancement, planning, and generation. I added tests around those handoffs because checking only the screen would not catch a missing value later in the process.

**Image APIs are inconsistent.** Providers use different message formats and model capabilities. Keeping that logic in one provider layer made the rest of the studio much easier to reason about.

**The model sometimes paid too much attention to the picture.** I changed the instructions so the typed request stays primary. A reference should help explain the idea, not rewrite it.

---

## What I Learned

This week made me stop thinking of a prompt as only text. People explain ideas in mixed ways all the time. We talk, point, sketch, and show examples. A creation tool should be comfortable with that.

I also learned that collecting a choice in the UI is only the first ten percent of a feature. If the learning areas disappear when a project is reopened or never reach the generator, the feature is only decoration.

This fits nicely with how children already make things. They rarely begin with a complete specification. They begin with a rough drawing, something they saw, or half an idea they want to try. The studio should help them move forward from there.

---

## Next Week

- Give Sugar Activity Studio an icon and identity of its own
- Finish the activity naming fix from Walter's testing session
- Make install and export decisions easier to understand
- Review the first larger outside contributions to the repository

---

## Thanks

Thanks to Walter Bender for continuing to push the project toward learner-controlled creation, and to Ibiam Chihurumnaya for the technical reviews. Thanks as well to everyone testing the releases and sharing the messy, unfinished ways that real activity ideas begin.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
