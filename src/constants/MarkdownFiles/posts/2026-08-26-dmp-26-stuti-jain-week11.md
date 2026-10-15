---

title: "DMP '26 Week 11 Update by Stuti Jain"

excerpt: "Improved Lesson Plans navigation with collapsible panels, established a localization workflow for Practice lessons, and continued expanding the story-driven lesson series."

category: "DEVELOPER NEWS"

date: "2026-08-26"

slug: "2026-08-26-dmp-26-stuti-jain-week11"

author: "@/constants/MarkdownFiles/authors/stuti-jain.md"

tags: "dmp26,sugarlabs,musicblocks,lessonplans,localization,week11"

image: "assets/Images/dmp_c4gt.logo.png"

---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-20 – 2026-08-26

---

## Goals for This Week

* Improve the way Lesson Plans and the Explorer Journal can be managed within the Music Blocks workspace.
* Replace the previous panel management interactions with a simpler collapse mechanism.
* Explore the localization workflow for Practice lesson content.
* Understand how lesson content can be converted into `.po` files for different languages.
* Continue expanding the Lesson Plans with additional lessons.

---

## This Week's Achievements

### Adding Collapsible Lesson Plan Panels

In the previous iteration, Lesson Plans and the Explorer Journal were made draggable and later given magnetic positioning and minimize controls.

While these interactions provided flexibility, they also introduced multiple ways of managing the panels.

To simplify the experience, I added a **collapse button** to the Lesson Plans and Explorer Journal panels.

The button allows the panels to be collapsed toward the right side of the workspace, following the interaction pattern already familiar from Music Blocks' existing toolbar.

![Collapsible Lesson Plans and Explorer Journal](/assets/Developers/Stuti-Jain/week11_collapsible_panels.png)

With this interaction, learners can temporarily move the Lesson Plans interface out of the way while continuing to work with the Music Blocks workspace.

This also allowed the earlier magnetic positioning, snap-home, and minimize interactions to be removed, resulting in a simpler panel-management experience.

---

### Exploring Localization for Practice Lessons

Another major focus this week was understanding how the story-driven Practice lessons can be made available in multiple languages.

The existing Music Blocks localization system uses `.po` files, which are intended to contain translatable strings and their corresponding translations.

Since the Practice lessons contain much more content than ordinary interface labels, including:

* Story text.
* Lesson instructions.
* Character dialogue.
* Extra-action descriptions.
* Hints.
* Rewards and other learner-facing content.

I explored how this lesson content can be connected to the existing localization workflow.

---

### Building a Lesson Localization Workflow

To make the translation process manageable, I explored using a **POT file** as an intermediate source containing the strings used by the Lesson Plans system.

The lesson content can then be processed so that the relevant sentences are available for translation.

The resulting `.po` files can be maintained for individual languages, allowing translators to work with the lesson strings without changing the underlying lesson structure.

The goal is to keep the lesson content organized while making the translation process compatible with the localization system already used by Music Blocks.

![Practice Lesson Localization](/assets/Developers/Stuti-Jain/week11_localization.png)

---

### Preparing Language-Specific Lesson Content

As part of this exploration, I also worked on organizing the lesson sentences in a way that can be converted into the appropriate language-specific localization files.

The initial target languages being explored are:

* **Spanish**
* **Japanese**
* **Hindi**

The translations can then be maintained separately from the core lesson structure.

This approach should make it possible to keep the same lesson logic while presenting the learner-facing content in different languages.

Spanish translation work is being coordinated with Walter, while Japanese translation work is being coordinated with Devin.

---

### Continuing the Lesson Series

Alongside the infrastructure and localization work, I continued expanding the story-driven lesson series with additional lessons.

The new lessons follow the same framework established in earlier levels, including:

* Story-driven introductions.
* Musical activities.
* Exploration and discovery actions.
* Contextual guidance.
* Rewards and badges.
* Explorer Journal integration.

Adding more lessons also helps validate whether the current data-driven structure can continue supporting new content without requiring changes to the core Lesson Plans mechanism.

---

## Mentor Feedback & Key Takeaways

This week's work focused on simplifying the interface while preparing the Lesson Plans system for further expansion.

The collapse interaction provides a cleaner way for learners to manage Lesson Plans and the Explorer Journal without relying on multiple panel-management mechanisms.

The localization exploration also highlighted the importance of keeping lesson content separate from the core implementation. This makes it possible to translate learner-facing content without duplicating the underlying lesson logic.

As the number of lessons continues to grow, these infrastructure decisions become increasingly important for keeping the project maintainable.

---

## Challenge & Key Learning

One of the main challenges this week was figuring out how to apply the existing Music Blocks localization system to the much larger amount of text contained in Practice lessons.

Unlike individual toolbar labels, a lesson contains interconnected story content, instructions, hints, and character dialogue. These strings need to remain organized while still being accessible to translators.

**Learning:** Supporting multiple languages in an educational application requires localization to be considered at the content-structure level, not only at the interface level. Separating lesson content from implementation makes it easier to extend the system while keeping translations manageable.

---

## Next Week's Roadmap

* Continue refining the collapse behaviour of Lesson Plans and the Explorer Journal.
* Complete and test the localization workflow for Practice lessons.
* Continue working with `.po` files for Hindi, Spanish, and Japanese translations.
* Integrate translated lesson content into the Practice experience.
* Continue adding and refining lessons in the story-driven series.
* Improve the lesson experience based on feedback from testing and mentor review.

---

## Resources & References

* **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
* **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued guidance throughout the development of the Lesson Plans framework. Their feedback has helped shape the project from an initial story-driven prototype into a more flexible learning system with scalable lesson infrastructure, reflection tools, contextual guidance, and support for multilingual learning experiences.