---
title: "DMP '26 Week 6 Update by Stuti Jain"
excerpt: "Expanded the Explorer Journal with general notes and improved contextual guidance by redesigning the help system for optional exploration activities."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-dmp-26-stuti-jain-week06"
author: "@/constants/MarkdownFiles/authors/stuti-jain.md"
tags: "dmp26,sugarlabs,musicblocks,lessonplans,journal,help,week06"
image: "assets/Images/dmp_c4gt.logo.png"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 – 2026-07-19

---

## Goals for This Week

- Expand the Explorer Journal beyond lesson-based reflections.
- Improve journal management features.
- Provide guidance for optional exploration activities.
- Redesign the contextual help interface to better match Music Blocks.
- Continue refining the overall lesson experience.

---

## This Week's Achievements

### Expanding the Explorer Journal

The Explorer Journal was extended from being purely a lesson reflection tool into a more flexible notebook that learners can use throughout their Music Blocks journey.

Previously, learners could only write reflections associated with completed lessons. This week, I introduced support for **general notes**, allowing children to create their own notebook entries independent of any lesson.

Learners can now create a note by providing a custom title and an initial thought. These notes are stored separately from lesson reflections while remaining part of the same Explorer Book.

This transforms the Journal into a personal space where learners can record musical ideas, experiments, observations, or anything they would like to remember while exploring Music Blocks.

![Explorer Journal Overview](/assets/Developers/Stuti-Jain/explorer_journal_notes.png)

---

### Supporting Multiple Entries

Learning often happens gradually, with children returning to previous ideas after exploring further.

To support this workflow, both lesson journals and general notes now allow multiple entries to be added over time.

Instead of replacing previous reflections, learners can continue documenting new discoveries within the same page, creating a timeline of their learning journey.

This encourages long-term reflection rather than treating journal entries as one-time responses.

---

### Editing and Deleting Notes

The journal management system was also expanded to provide learners with greater control over their notes.

Both lesson reflections and general notes now support:

- Editing existing entries.
- Deleting entries that are no longer needed.
- Continuing an existing note by adding new memories.

These additions make the Explorer Journal behave more like a personal notebook while keeping the interface simple for younger learners.

![Lesson Journal Management](/assets/Developers/Stuti-Jain/journal_management.png)

---

### Adding Contextual Guidance for Discovery Activities

One challenge identified during classroom testing was that children often wanted to complete optional exploration activities but were unsure how to begin.

To address this, I reused the existing Music Blocks help-card widget to provide contextual guidance whenever learners select one of the optional discovery activities.

For example, selecting **Change Octave** now opens a help card explaining:

- What the learner is expected to do.
- Which Music Blocks block should be used.
- What changing the octave means musically.

Rather than directly giving the answer, these cards guide learners toward discovering the solution themselves.

This keeps optional challenges approachable while preserving exploration and experimentation.

![Contextual Help Card](/assets/Developers/Stuti-Jain/help_card.png)

---

### Redesigning the Help Interface

While implementing the contextual guidance, I also redesigned the help card interface so that it aligns more closely with the existing Music Blocks visual language.

The updated design incorporates:

- A cleaner layout.
- Improved typography.
- Better spacing.
- Larger interactive elements.
- A consistent color palette matching the rest of Music Blocks.

The redesigned interface feels much more integrated with the application compared to the earlier prototype and provides a more consistent user experience.

![Updated Help Interface](/assets/Developers/Stuti-Jain/help_ui.png)

---

## Mentor Feedback & Key Takeaways

This week's discussions focused on making the contextual guidance more maintainable while keeping the learner experience simple and intuitive.

Although the current contextual help cards successfully explain optional discovery activities, creating a separate help page for every exploration task may not be the best long-term solution.

Instead, we discussed making better use of the help resources that already exist within Music Blocks.

The application already includes:

- The built-in Help Tour available from the Help menu.
- Context-sensitive help cards accessible by interacting with individual blocks.

Rather than introducing a completely new collection of help pages, the existing infrastructure could be adapted so that the content changes according to the discovery activity being performed.

This would reduce duplication, simplify future maintenance, and provide learners with a more consistent experience throughout Music Blocks.

The redesigned help interface received positive feedback and serves as a useful prototype for exploring how future contextual guidance could integrate with the existing system.

---

## Challenge & Key Learning

The biggest challenge this week was balancing discoverability with simplicity.

Providing enough guidance for younger learners without removing the opportunity for independent exploration required careful consideration. Too much information risks turning exploration into step-by-step instructions, while too little guidance can leave learners frustrated.

Similarly, expanding the Explorer Journal beyond lesson reflections required maintaining a simple interface despite introducing more functionality.

**Learning:** Educational tools become more effective when new features build upon existing workflows instead of introducing entirely separate systems. Reusing familiar interfaces helps reduce cognitive load while keeping the application easier to maintain.

---

## Next Week's Roadmap

- Refine the content of the contextual help cards to better match each discovery activity.
- Explore replacing the current contextual cards with the existing Music Blocks Help Tour wherever possible.
- Investigate reusing block-specific help cards instead of maintaining separate guidance pages.
- Continue reducing duplicate help content by adapting existing Music Blocks infrastructure.
- Improve the overall integration between lessons, discovery activities, and the Help system.

---

## Resources & References

- **Project Issue:** https://github.com/sugarlabs/musicblocks/issues/6607
- **Story Prototype Draft PR:** https://github.com/sugarlabs/musicblocks/pull/7587
- **Repository:** https://github.com/sugarlabs/musicblocks

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued feedback on improving both the Explorer Journal and the contextual help experience.

This week's discussions emphasized the importance of building upon existing Music Blocks infrastructure wherever possible, ensuring that new features remain consistent with the application while providing better support for young learners.