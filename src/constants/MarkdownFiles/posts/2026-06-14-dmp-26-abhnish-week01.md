---
title: "DMP '26 Week 01 Update by Abhnish Kumar"
excerpt: "Kicking off WCAG 2.1 AA accessibility and touch support work on Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-dmp-26-abhnish-week01"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week01,abhnish-kumar,accessibility"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-09 - 2026-06-14  

---

## Goals for This Week

- **Goal 1:** Get oriented in the Music Blocks codebase and identify concrete accessibility and touch issues
- **Goal 2:** Run a full WCAG 2.1 AA audit using axe DevTools and document findings
- **Goal 3:** Continue touch support work on widget scrolling and context menus

---

## This Week's Achievements

1. **Completed first WCAG 2.1 AA audit pass**  
   - Ran axe DevTools (axe-core 4.11.4) against the local dev build and documented 16 issues (14 critical, 2 serious) in a new `WCAG-AUDIT-REPORT.md`.  
   - PR: [#7510](https://github.com/sugarlabs/musicblocks/pull/7510)
   - Key findings: insufficient color contrast on the "Take a tour" tooltip, 13 palette category icons with no accessible names, and a paste button with no discernible text.
   - Each finding includes the affected file, WCAG criterion, and a recommended fix, to guide upcoming work.

2. **Fixed a two-finger scroll direction bug on touch devices**  
   - PR: [#7501](https://github.com/sugarlabs/musicblocks/pull/7501)
   - Averaged two-finger touch deltas to fix inconsistent/inverted scroll direction during pinch and pan gestures.

3. **Added touch long-press support for the context (pie) menu**  
   - PR: [#7484](https://github.com/sugarlabs/musicblocks/pull/7484)
   - On mobile, holding a block now opens the same pie context menu that right-click opens on desktop, addressing part of [#4096](https://github.com/sugarlabs/musicblocks/issues/4096).

---

## Challenges & How I Overcame Them

- **Challenge:** Translating raw axe-core output into actionable, prioritized fixes.  
  **Solution:** Mapped each automated finding to its specific WCAG 2.1 success criterion and the exact file/element responsible, so the audit report doubles as a fix roadmap.

- **Challenge:** Touch deltas from multi-touch gestures were inconsistent, causing jumpy scroll behavior.  
  **Solution:** Averaged the deltaX/deltaY across all active touch points before applying scroll, smoothing out the behavior.

---

## Key Learnings

- Got hands-on experience with `axe-core` and how to translate automated scan output into file-level fixes mapped to WCAG success criteria.
- Better understanding of how touch event deltas need to be normalized across multiple touch points to avoid jumpy or inverted scroll behavior.
- Learned how the Music Blocks pie context menu system works and how to trigger it from non-mouse input.

---

## Next Week's Roadmap

- Fix the global Tab-key trap in `js/activity.js` that blocks keyboard navigation (identified during audit, fix planned)
- Fix the focus indicator suppressed on the `#search` input (`outline: none` overriding `:focus-visible`)
- Add accessible names (`aria-label`) to the 13 palette category icons
- Fix the unlabeled paste button (`doPaste()`) so it has a discernible name
- Continue touch support work on the oscilloscope and sampler widgets

---

## Resources & References

- **Audit Report:** [WCAG-AUDIT-REPORT.md](https://github.com/sugarlabs/musicblocks/pull/7510/files)
- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to my mentor Walter Bender and assisting mentor Devin Ulibarri for their guidance as I get oriented in the codebase, and to the Sugar Labs community for maintaining such a welcoming environment for new contributors.