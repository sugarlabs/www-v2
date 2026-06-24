---
title: "DMP '26 Week 01 Update by Abhnish Kumar"
excerpt: "TAB trap fix, palette icon accessibility, PR reviews, and mid-point milestone progress for Music Blocks WCAG 2.1 AA project"
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-dmp-26-abhnish-week01"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week01,abhnish-kumar,accessibility"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-15 - 2026-06-21  

---

## Goals for This Week

- **Goal 1:** Fix the global TAB key trap blocking keyboard navigation
- **Goal 2:** Fix missing accessible names on palette category icons
- **Goal 3:** Review open PRs related to keyboard and touch accessibility

---

## This Week's Achievements

1. **Fixed global TAB key trap in `js/activity.js`**
   - PR: [#7563](https://github.com/sugarlabs/musicblocks/pull/7563)
   - The `__keyPressed` handler was unconditionally calling `event.preventDefault()` on every Tab keypress, making keyboard-only navigation impossible throughout the entire app (WCAG 2.1.2 — No Keyboard Trap).
   - Fixed so Tab is only suppressed when focus is on the canvas or body. When focus is on a real DOM element (toolbar button, widget input), Tab now passes through naturally.

2. **Added alt text and ARIA roles to palette icons**
   - PR: [#7564](https://github.com/sugarlabs/musicblocks/pull/7564)
   - All icons created via `makePaletteIcons()` now carry `alt=""` and `role="presentation"` since their parent containers already hold the accessible name — eliminating 13 critical `image-alt` violations found during the Week 00 axe scan.
   - The palette menu close button is functional (not decorative), so it was given `alt="Close"`, `role="button"`, and `tabIndex="0"` separately.

3. **Reviewed PR #7135 — Remove outline none to restore focus indicators**
   - Walter tagged me to review. Confirmed both changes (search input + range sliders) align with our audit findings. The global `*:focus-visible` rule already provides the focus ring — no additional CSS needed. Merged.

4. **Reviewed PR #7096 — Block keyboard shortcuts**
   - Flagged that the new shortcuts quietly override existing keyboard behavior in `__keyPressed` instead of working with it — recommended removing duplicate arrow/DEL handling so there is one source of truth rather than two systems fighting silently.

5. **Reviewed PR #7259 / #7376 — Pinch-to-zoom on canvas**
   - PR #7259 had conflicts with our two-finger pan fix (#7501) and fully removed play-only mode — flagged both issues.
   - PR #7376 (alternate implementation by harshwardhan-kp) builds cleanly on top of #7501. Noted two non-blockers: `passive: false` impact on scroll smoothness on lower-end devices, and ambiguous gesture handling when small pinch + small pan occur simultaneously. Walter merged #7376.

---

## Challenges & How I Overcame Them

- **Challenge:** After pushing the TAB trap fix, CI showed a Prettier failure on `musicutils.js` — a file I hadn't touched.  
  **Solution:** Traced it to a stale `origin/master` (my fork was behind `upstream/master`). Rebased against `upstream/master` and force-pushed — Prettier check passed immediately.

- **Challenge:** `makePaletteIcons()` is called from 10 different places. Marking all icons as decorative by default risked making functional icons (like the close button) completely invisible to screen readers.  
  **Solution:** Audited every call site, confirmed 9 of 10 have labeled parents, and added explicit accessible markup to the one exception (close button).

---

## Key Learnings

- `git diff origin/master` can be misleading when your fork's `origin` is stale — always diff against `upstream/master` for an accurate picture of what your PR actually changes.
- When patching a shared utility function used across many call sites, audit every call site before applying a blanket change — one functional exception can turn a fix into a regression.
- Reviewing other contributors' PRs is a good way to stay in sync with parallel work and catch conflicts early before they compound.

---

## Next Week's Roadmap

- Start ARIA live regions for dynamic events (program running/stopped, block connected, errors)
- Comprehensive `aria-label`/`role` audit of `index.html` toolbar buttons and modal dialogs
- Re-run axe DevTools scan to verify violation count has dropped from 16 after merged fixes

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)
- **Audit Report:** [WCAG-AUDIT-REPORT.md](https://github.com/sugarlabs/musicblocks/pull/7510/files)
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Walter Bender for tagging me on multiple PRs for review — it is a good way to stay in sync with parallel accessibility and touch work happening across the repo.