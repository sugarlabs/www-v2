---
title: "DMP '26 Week 08 Update by Abhnish Kumar"
excerpt: "Announcing block connections to screen readers and adding accessible labels to toolbar buttons for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-08-21"
slug: "2026-08-21-dmp-26-abhnish-week08"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week08,abhnish-kumar,accessibility,aria-live"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-08-15 - 2026-08-21  

---

## Goals for This Week

- **Goal 1:** Pick up last week's roadmap item — announce block connections to screen readers
- **Goal 2:** Extend accessible-name coverage to the main toolbar buttons
- **Goal 3:** Get both PRs through review and merged

---

## This Week's Achievements

1. **Announced block connections to screen readers (#8078)**  
   - Added a screen reader announcement fired from `blockMoved()` in
     `js/block-drag-controller.js`, right at the point where a dragged
     block successfully docks — e.g. "connected note to pitch".  
   - Previously sighted users could see a block visually snap into
     place, but a screen reader user got no feedback that the
     connection had actually happened.  
   - Reused the shared `announceToScreenReader()` helper (from #7764)
     and mirrored the existing "picked up" drag-announcement's label
     lookup: `protoblock.staticLabels[0]`, falling back to the block's
     `.name` when no static label is set — so behavior stays
     consistent across every drag-related announcement in the app.  
   - Verified both label-lookup paths (static label present, and the
     `.name` fallback for plain test-double blocks), and confirmed the
     existing 51-test `blockMoved`/dock-snapping suite still passed
     unchanged.

2. **Added `aria-label` to toolbar buttons (#8096)**  
   - Gave the main toolbar's icon-only buttons real accessible names,
     so screen reader users get an actual label instead of silence or
     a raw filename when tabbing through the toolbar.

---

## Challenges & How I Overcame Them

- **Challenge:** The new "connected" announcement needed to sound
  consistent with the existing "picked up" drag announcement, or the
  two would read like they came from different features.  
  **Solution:** Traced how the pickup announcement resolves its label
  and reused the exact same `staticLabels[0]` → `.name` fallback chain,
  instead of writing a new lookup — kept the announcement vocabulary
  consistent across the whole drag lifecycle.

---

## Key Learnings

- When adding a new announcement alongside an existing one for the
  same interaction (pickup → connect), matching the existing label
  logic exactly is worth the extra look-up time — it avoids
  screen-reader output that sounds like two unrelated features bolted
  together.

---

## Next Week's Roadmap

- Continue closing out remaining axe-flagged accessible-name gaps
  across dialogs and widgets.  
- Follow up on review feedback for #8078 and #8096.

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR #8078:** [feat: announce block connection to screen readers](https://github.com/sugarlabs/musicblocks/pull/8078)  
- **PR #8096:** [feat: add aria-label to toolbar buttons for screen reader support](https://github.com/sugarlabs/musicblocks/pull/8096)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter and Devin for the continued review turnaround on the
aria-live announcement work.