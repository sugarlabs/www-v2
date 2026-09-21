---
title: "DMP '26 Week 10 Update by Abhnish Kumar"
excerpt: "Proposing an accessible mirror-DOM approach for the programming canvas, exposing announceToScreenReader on window, and enabling keyboard navigation on pie menus"
category: "DEVELOPER NEWS"
date: "2026-09-04"
slug: "2026-09-04-dmp-26-abhnish-week10"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week10,abhnish-kumar,accessibility,keyboard-navigation"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-08-29 - 2026-09-04  

---

## Goals for This Week

- **Goal 1:** Write up a proposal for making the programming canvas accessible via a mirror-DOM approach
- **Goal 2:** Expose `announceToScreenReader` on `window` explicitly so other modules can call it reliably
- **Goal 3:** Enable keyboard navigation on the pie menus using wheelnav's built-in support

---

## This Week's Achievements

1. **Proposed an accessible mirror-DOM approach for the programming canvas (#8212)**  
   - The EaselJS canvas itself is opaque to screen readers — nothing
     drawn on it is exposed to the accessibility tree. Wrote up a
     design doc proposing a hidden, DOM-based mirror of the canvas
     structure that stays in sync with what's rendered, giving screen
     readers something real to read while leaving the visual canvas
     untouched.  
   - This is a documentation/proposal PR, not an implementation —
     intended to get Walter and Devin's sign-off on the approach
     before committing to the larger engineering effort.

2. **Exposed `announceToScreenReader` on `window` explicitly (#8226)**  
   - The helper was already used internally, but wasn't reliably
     reachable from every module that needed it. Attached it to
     `window` explicitly so any part of the codebase can call it
     without needing to import it through an unpredictable chain.

3. **Enabled wheelnav's built-in keyboard navigation on all pie menus (#8227)**  
   - Turned on wheelnav.js's native keyboard navigation support across
     Music Blocks' pie menus, so arrow keys move focus between pie
     menu options instead of the menu being mouse/touch-only.

---

## Challenges & How I Overcame Them

- **Challenge:** The canvas accessibility problem (#8212) doesn't have
  a small, incremental fix the way most of this project's other
  issues do — any real solution touches how the whole programming
  canvas is structured.  
  **Solution:** Wrote the mirror-DOM approach up as a proposal doc
  first rather than jumping straight into implementation, so the
  design gets mentor sign-off before a large chunk of engineering
  time goes into it.

---

## Key Learnings

- Not every accessibility gap has a same-week fix — some, like canvas
  accessibility, need a design proposal and mentor buy-in before any
  code gets written, and it's worth treating that as real progress in
  its own right rather than waiting to report until there's a merged
  PR.

---

## Next Week's Roadmap

- Get feedback from Walter and Devin on the mirror-DOM proposal
  (#8212) and refine based on their input.  
- Continue closing remaining axe-flagged gaps across widgets and pie
  menus.

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR #8212:** [docs: propose an accessible mirror-DOM approach for the programming canvas](https://github.com/sugarlabs/musicblocks/pull/8212)  
- **PR #8226:** [fix(a11y): expose announceToScreenReader on window explicitly](https://github.com/sugarlabs/musicblocks/pull/8226)  
- **PR #8227:** [fix(a11y): enable wheelnav's built-in keyboard navigation on all pie menus](https://github.com/sugarlabs/musicblocks/pull/8227)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter and Devin for their patience reviewing the canvas
accessibility proposal — it's a bigger design question than most of
this project's fixes, and their input will shape next week's work.