---
title: "DMP '26 Week 09 Update by Abhnish Kumar"
excerpt: "Adding dialog semantics to Music Blocks modals, fixing a help-widget contrast violation, and describing the New Project confirmation buttons for screen readers"
category: "DEVELOPER NEWS"
date: "2026-08-28"
slug: "2026-08-28-dmp-26-abhnish-week09"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week09,abhnish-kumar,accessibility,aria"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-08-22 - 2026-08-28  

---

## Goals for This Week

- **Goal 1:** Give Music Blocks' three modal dialogs proper dialog semantics for screen readers
- **Goal 2:** Fix a contrast violation on the help widget flagged by axe
- **Goal 3:** Add an accessible description to the New Project confirmation buttons

---

## This Week's Achievements

1. **Added dialog semantics to all three modals (#8159)**  
   - Gave each of Music Blocks' three modal dialogs the semantics
     screen readers expect from a dialog — role, an accessible name
     tied to the modal's title, and correct focus handling on open —
     so a screen reader user is told they've entered a dialog instead
     of the modal opening silently underneath whatever they were
     already focused on.

2. **Fixed the help-widget contrast violation (#8170)**  
   - Resolved a color-contrast violation on `#helpWidgetID` flagged by
     axe, following the project's established pattern of routing the
     fix through a CSS custom property in `css/tokens.css` rather than
     a one-off hardcoded hex value.

3. **Added `aria-describedby` to the New Project confirmation buttons (#8211)**  
   - Gave the New Project confirmation buttons an accessible
     description via `aria-describedby`, so screen reader users get
     the same "this will discard your current project" context that
     sighted users get visually before confirming.

---

## Challenges & How I Overcame Them

- **Challenge:** Getting dialog semantics right on #8159 meant making
  sure focus actually moved into the modal on open and returned to the
  trigger element on close, not just adding a `role="dialog"` attribute
  and calling it done.  
  **Solution:** Verified focus behavior directly with VoiceOver rather
  than relying on the DOM attributes alone — an element can have the
  right role and still be a dead end for keyboard/screen-reader users
  if focus isn't managed.

---

## Key Learnings

- Dialog accessibility is as much about focus management as it is
  about ARIA roles — the role tells assistive tech what the element
  is, but focus handling is what actually gets the user there and
  back out again.

---

## Next Week's Roadmap

- Continue closing out remaining axe-flagged accessible-name and
  contrast gaps across widgets.  
- Follow up on review feedback for #8159, #8170, and #8211.

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR #8159:** [feat: add dialog semantics to all three modals for screen readers](https://github.com/sugarlabs/musicblocks/pull/8159)  
- **PR #8170:** [fix: resolve helpWidgetID contrast violation via design tokens](https://github.com/sugarlabs/musicblocks/pull/8170)  
- **PR #8211:** [feat(a11y): add aria-describedby to the New Project confirmation buttons](https://github.com/sugarlabs/musicblocks/pull/8211)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter and Devin for continued review on this batch of
dialog and contrast fixes.