---

title: "DMP '26 Week 10 Update by Stuti Jain"

excerpt: "Improved Lesson Plans navigation with collapsible panels, expanded the story with Lessons 7 and 8, and explored the localization workflow for making Practice lessons available in multiple languages."

category: "DEVELOPER NEWS"

date: "2026-08-19"

slug: "2026-08-19-dmp-26-stuti-jain-week10"

author: "@/constants/MarkdownFiles/authors/stuti-jain.md"

tags: "dmp26,sugarlabs,musicblocks,lessonplans,week10"

image: "assets/Images/dmp_c4gt.logo.png"

---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-13 – 2026-08-19

---

## Goals for This Week

* Improve the interaction between Lesson Plans and the main Music Blocks workspace.
* Make draggable panels easier to manage.
* Continue expanding the story-driven lesson series.
* Add Lessons 7 and 8.
* Explore how Practice lessons can be translated into different languages.
* Understand how the existing `.po` localization system can support lesson content.

---

## This Week's Achievements

### Improving Lesson Plan Panel Navigation

Last week, the Lesson Plans and Explorer Journal panels were made draggable so that learners could keep them open while interacting with other parts of Music Blocks.

While this solved the problem of accessing the workspace alongside Lesson Plans, another usability issue became apparent.

A learner may not always want the panel to occupy workspace space while working with Music Blocks.

To address this, I added a **magnetic pull behaviour** to the panels.

When a draggable panel is moved close to the right side of the workspace, it is automatically pulled toward that area. This provides a predictable location for the panel and makes it easier to organize the workspace.

---

### Adding a Minimize Option

Along with the magnetic behaviour, I added a **minimize button** next to the close button of the Lesson Plans panel.

The panel can now be minimized when the learner needs more space for the Music Blocks workspace.

This follows the existing interaction pattern used for minimizing blocks and helps the Lesson Plans interface feel more consistent with the rest of Music Blocks.

The combination of dragging, magnetic positioning, and minimizing gives learners more control over how the Lesson Plans interface occupies the workspace.

---

### Expanding the Story with Lessons 7 and 8

The story-driven lesson series was also expanded with two additional lessons, bringing the adventure further into the Lost Melody Islands.

The new lessons continue the same structure used by the earlier levels, combining:

* Narrative-based lesson introductions.
* Musical activities.
* Visual story elements.
* Additional exploration activities.
* Contextual help for extra actions.
* Discovery rewards.
* Explorer Journal connections.

**Lesson 7** continues the learners' journey through the islands with a new musical challenge, while **Lesson 8 — The Starlight Sky Song** introduces a new story setting and musical activity.

![Lesson 8 — The Starlight Sky Song](/assets/Developers/Stuti-Jain/week10_lesson8.png)

The continued expansion also helped test whether the data-driven lesson structure introduced earlier could support additional lessons without requiring major changes to the core Lesson Plans implementation.

---

### Midpoint Evaluation

During this period, I also prepared and presented my **DMP Midpoint Evaluation**.

The evaluation covered the project's progress from the initial narrative concept through the development of the Lesson Plans infrastructure, exploration and discovery system, contextual help, and Explorer Journal.

The midpoint evaluation also provided an opportunity to demonstrate the working system and discuss the direction for the remaining project period.

**Midpoint Evaluation Presentation:**  
https://docs.google.com/presentation/d/1YD-m8j5cW2xzRD2ncZKJsHje23uMe3dr/edit?usp=sharing&ouid=116555257076685356332&rtpof=true&sd=true

---

### Exploring Localization for Practice Lessons

Another focus this week was exploring how the Practice lessons could be made available in multiple languages.

Since Music Blocks already uses `.po` files for localization, I studied the existing localization structure to understand how lesson-specific text could be integrated into the same system.

The lesson content contains a significant amount of narrative text, instructions, hints, and other learner-facing content. Therefore, simply translating interface labels would not be sufficient for making the complete Practice experience multilingual.

The exploration this week focused on understanding how lesson data can be connected with the existing localization workflow.

This provides the foundation for creating language-specific lesson data and integrating translated Practice content in future work.

---

## Mentor Feedback & Key Takeaways

This week's work highlighted two important areas for the next stage of the project.

The first is **workspace flexibility**. Lesson Plans should remain available without taking control of the entire Music Blocks workspace. The magnetic and minimize behaviours provide an initial solution for managing this interaction.

The second is **scalability**. As more lessons are added, both the lesson-data structure and the localization system need to remain easy to maintain.

The addition of Lessons 7 and 8 also provided an opportunity to validate whether the existing lesson infrastructure can support continued expansion of the story.

---

## Challenge & Key Learning

One of the main challenges this week was designing Lesson Plans so that they remain useful without becoming intrusive.

A lesson panel needs to be visible enough to guide the learner, but learners should also be able to move it aside when they want to experiment directly in the Music Blocks workspace.

The exploration of localization also showed that supporting multiple languages requires considering the lesson content structure from the beginning rather than treating translation as only a UI-level change.

**Learning:** As an educational feature grows, usability and scalability become as important as the individual lesson content. The infrastructure needs to give learners freedom while also making it easy for contributors to add and maintain lessons.

---

## Next Week's Roadmap

* Add a **collapse button** similar to the existing Music Blocks toolbar behaviour so that draggable windows can be completely collapsed.
* Improve the relationship between the Lesson Plans and Explorer Journal panels.
* Evaluate whether the magnetic positioning and minimize options are still required after introducing panel collapse.
* Create separate `.po` files for Practice lesson translations in **Hindi, Spanish, and Japanese**.
* Add common Practice lesson strings to the existing localization files for these languages.
* Continue integrating translated lesson content into the existing localization workflow.

---

## Resources & References

* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Midpoint Evaluation Presentation:** https://docs.google.com/presentation/d/1YD-m8j5cW2xzRD2ncZKJsHje23uMe3dr/edit?usp=sharing&ouid=116555257076685356332&rtpof=true&sd=true
* **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued feedback throughout the development of the Lesson Plans framework. Their suggestions have helped guide the project toward a more flexible interface, a scalable lesson structure, and a learning experience that can eventually be made accessible to learners in multiple languages.