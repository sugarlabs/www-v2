---
title: "GSoC '26 Week 11 Update by Ashutosh Singh"
excerpt: "I tested the visual-reference workflow by taking a symmetry-garden mockup to a working Sugar activity, then reviewed community contributions for branding and activity naming."
category: "DEVELOPER NEWS"
date: "2026-08-12"
slug: "2026-08-12-gsoc-26-ashutoshx7-week11"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week11,ashutoshx7,mockup,visual-reference,symmetry,community,branding,activity-name,review"
image: "assets/Images/gsoc26-ashutoshx7/aod-symmetry-garden-result.png"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)<br />
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)<br />
**Reporting Period:** August 4, 2026 to August 10, 2026<br />
**Previous Update:** [Week 10: Multiple learning areas and visual references](/news/all/2026-08-05-gsoc-26-ashutoshx7-week10)

---

## Plans for the Week

- Fix the activity naming problem Walter found during testing
- Test the visual-reference workflow with a detailed activity mockup
- Give Sugar Activity Studio an icon of its own
- Review the first larger contributions from outside the project
- Make sure the new work fits the existing flow and has good test coverage

---

## A Different Kind of Week

After finishing multiple learning areas and visual references in [Week 10](/news/all/2026-08-05-gsoc-26-ashutoshx7-week10), this week felt a little different. I didn't write most of the visible feature code. Instead, I spent my time reviewing, testing, discussing changes, and helping two pull requests reach the main branch.

Both contributions came from [Rakshit Yadav](https://github.com/rakshityadav1868). One gave the studio its own visual identity. The other fixed the activity naming problem Walter noticed in Week 9.

It was honestly nice to step back and see someone else understand the project well enough to add to it. Until now, I had written nearly every part of the studio myself. This week it started to feel less like my GSoC code and more like a real Sugar Labs project.

### From a Mockup to a Working Sugar Activity

In [Week 10](/news/all/2026-08-05-gsoc-26-ashutoshx7-week10), I added the [visual-reference workflow](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/3febbc5). This week I gave it a more concrete test using the symmetry-garden mockup we had prepared.

The mockup described a drawing activity with vertical, horizontal, and radial symmetry modes. It also included brush and eraser tools, undo and redo, a color palette, a grid canvas, daily challenges, and a **Check My Garden** action.

![The original wireframe mockup for the symmetry-garden activity](assets/Images/gsoc26-ashutoshx7/aod-symmetry-garden-mockup.png)

*The mockup we started with. It lays out the drawing tools, symmetry controls, challenge checklist, canvas, and feedback area before any activity code is generated.*

The generated result carried the main idea into a real Sugar activity. It kept the symmetry choices, drawing tools, brush sizes, color palette, challenge instructions, requirement tracking, and the **Check Garden** button. The layout is not a pixel-for-pixel copy of the mockup, and that was not the goal. What mattered was whether the studio could understand the intended interactions and turn them into something runnable.

![The generated Sugar symmetry activity running with a butterfly-wings challenge](assets/Images/gsoc26-ashutoshx7/aod-symmetry-garden-result.png)

*The generated result running as a Sugar activity. I used the butterfly-wings challenge to check the brush, colors, grid, requirements, and vertical mirroring together.*

This was one of the clearest demonstrations of the project so far. A visual idea went in, the studio interpreted the important behavior, and a usable Sugar activity came out. It also showed me where refinement still matters. The generated layout is more compact and technical than the mockup, so the next step is not to call the first result finished. It is to use the studio's revision tools to keep improving it.

### The Studio Finally Has Its Own Icon

Sugar Activity Studio had been borrowing Sugar's generic computer icon. It worked in some places, looked confusing in others, and occasionally appeared as a blank placeholder in the desktop launcher.

Rakshit's [first pull request](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/13) added a proper studio icon. It uses the XO figure with a small spark beside it, which fits the idea of creating something new with Sugar.

[![The Sugar Activity Studio icon, an XO figure with a spark](https://raw.githubusercontent.com/sugarlabs/Sugar-activity-on-Demand/4ba8b31/data/sugar-aod-studio.svg)](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/13)

*The new Sugar Activity Studio mark. Click the icon to open the branding pull request.*

The same mark now appears in the launcher, window, toolbar, home ring, and empty state. There are two versions of the SVG because Sugar activity icons and regular Linux desktop icons handle colors differently. The Sugar version uses stroke and fill entities so the shell can recolor it. The desktop version contains its colors directly.

We also ran into a very specific SVG bug. `gdk-pixbuf` only reads the beginning of the file when it tries to identify the image format. If the SVG tag appears too late, the launcher treats the file as invalid and shows nothing. The [final icon commit](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/4ba8b31) keeps the SVG element near the start of the file and fixes the blank launcher icon.

This is the sort of bug that sounds tiny after it is solved and takes a surprising amount of time while you are staring at it.

### Letting People Name Their Activity

During [Week 9 testing](/news/all/2026-07-29-gsoc-26-ashutoshx7-week09), Walter made a Periodic Table Explorer with the studio. He liked the activity, but the generated name felt random and he couldn't find a place to change it.

That comment stayed with me because he was completely right. We had spent so much time making the generated code reliable that I had missed a basic question: what does the learner want to call the thing they made?

Rakshit's [second pull request](https://github.com/sugarlabs/Sugar-activity-on-Demand/pull/14) added a [naming step before install and export](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/5a7fc92). The learner can keep the suggested name or replace it with their own. After that, the studio asks about the license separately.

![The Sugar Activity Studio license selector showing the available software licenses](assets/Images/gsoc26-ashutoshx7/aod-license-bsd3.png)

*After confirming the activity name, the learner chooses the license in a separate step. Keeping these decisions apart made the flow easier to understand.*

The pull request changed quite a bit during review. At first, naming and licensing were mixed together. We [separated the name from the license dialog](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/9068aca) because they are different choices. We also added a [clearer view of the name change](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/090bcd8), updated the dialogs to [match Sugar's light theme](https://github.com/sugarlabs/Sugar-activity-on-Demand/commit/1a82de8), and added tests for the complete flow.

By the time it was merged, the feature felt simple. That simplicity came from several rounds of small corrections.

### Learning to Review the Whole Experience

Reviewing these pull requests taught me to look beyond whether the diff was technically correct.

For the naming feature, I followed the name through generation, install, and export. I clicked through the dialogs in order and checked what happened when the name changed. For the icon, I checked both Sugar's entity-colored SVG and the regular desktop file because one can work while the other fails.

Tests caught the mechanical problems, but I still had to ask whether the result made sense to somebody using the studio for the first time.

I also tried to make my review comments explain why I wanted a change. "Separate these dialogs because naming and licensing are different decisions" is much easier to respond to than "change this UI." That made the review process feel like working together instead of passing or failing somebody's code.

---

## What Was Tricky

**The dialog order mattered more than I expected.** Both steps worked on their own, but putting too much into one window made the final shipping flow feel crowded. Splitting the choices made everything calmer.

**Sugar and the desktop need different SVG handling.** The artwork looks the same, but the files have different jobs. Keeping both versions together and testing each one avoided fixing the launcher while breaking the activity ring.

**Good reviews take real time.** It would have been faster to edit a few things myself, but that would miss the point of accepting a contribution. Clear comments and another review round helped the contributor understand the reason behind the changes.

---

## What I Learned

This week reminded me that maintainership is part of building the product. Code is not truly ready for a community if only the original author can safely change it.

I also liked seeing the whole naming feedback loop close. Walter tried the release and noticed a problem. We turned it into a concrete task. A community contributor built the fix, we refined it through review, and it landed in the project. That is open source working exactly as it should.

The icon is a smaller change, but it still matters. A recognizable icon gives the studio a place in the activity ring and makes it feel like something learners can come back to, not just a temporary development tool.

---

## Next Week

- Do one final reliability pass across the whole generation pipeline
- Check delayed game behavior, not only whether the activity opens
- Add direct fixes for common Sugar API mistakes
- Improve the reflection and refinement sidebar
- Make technical errors understandable to learners and teachers

---

## Thanks

Thank you to [Rakshit Yadav](https://github.com/rakshityadav1868) for both contributions and for being patient with the review rounds. Thanks to Walter Bender for the naming feedback that started this work, and to Ibiam Chihurumnaya for continuing to guide the project as it gets close to the final release.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
