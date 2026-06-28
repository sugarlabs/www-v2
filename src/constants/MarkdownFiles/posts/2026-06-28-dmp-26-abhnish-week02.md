---
title: "DMP '26 Week 02 Update by Abhnish Kumar"
excerpt: "ARIA live regions for screen reader announcements and E2E test reliability fix for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-dmp-26-abhnish-week02"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week02,abhnish-kumar,accessibility"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)
**Mentors:** [Walter Bender](https://github.com/walterbender)
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)
**Reporting Period:** 2026-06-21 - 2026-06-28

---

## Goals for This Week

- **Goal 1:** Add ARIA live region announcements for status and error messages
- **Goal 2:** Add ARIA live region announcements for program run/stop events
- **Goal 3:** Fix flaky Cypress E2E test blocking CI on accessibility PRs

---

## This Week's Achievements

1. **Added aria-live region for textMsg and errorMsg announcements**
   - PR: [#7674](https://github.com/sugarlabs/musicblocks/pull/7674)
   - Introduced a shared `__ensureA11yLiveRegion()` helper that lazily
     creates a single `role="status"` / `aria-live="polite"` region on
     first use.
   - Hooked into `textMsg()` (keyboard shortcut confirmations, scroll
     notifications, status updates) and `errorMsg()` (block errors,
     program warnings) so all these messages are now announced to screen
     reader users.
   - Follows the same pattern used in PR #5592 for pie menu announcements,
     keeping implementation consistent across the codebase.

2. **Announced program run/stop state via aria-live region**
   - PR: [#7675](https://github.com/sugarlabs/musicblocks/pull/7675)
   - Hooked into `onRunTurtle` and `onStopTurtle` callbacks to announce
     "Program running." and "Program stopped." respectively.
   - Both announcements pipe through the live region from PR #7674 — no
     additional DOM changes needed.

3. **Fixed flaky Cypress E2E test**
   - PR: [#7676](https://github.com/sugarlabs/musicblocks/pull/7676)
   - The stop button has `display: none` by default and only appears after
     play starts. The test was clicking it immediately without waiting,
     causing intermittent CI failures.
   - Added `.should("be.visible")` before `.click()` — one line fix,
     no app logic touched.

4. **Reviewed PR #5592 — Accessibility features for pie menus and toolbar speech synthesis**
   - Reviewed the approach for TTS feedback and aria-live announcements on
     pie menu selections.
   - Flagged: resize listener always active even when no pie menu is open,
     global `window.__` flag fragility, and TTS not working in Devin's
     environment. PR is blocked on rebase and Devin's TTS verification.

---

## Challenges & How I Overcame Them

- **Challenge:** `textMsg` and `errorMsg` are called from dozens of places
  across the codebase — adding a live region without touching all call sites.
  **Solution:** Added the announcement directly inside the two function
  definitions, so all existing call sites benefit automatically with zero
  changes elsewhere.

- **Challenge:** Cypress E2E failure appearing on ARIA PRs confused the
  review — needed to confirm it was pre-existing and not caused by our changes.
  **Solution:** Read the full CI log, traced the failure to a timing issue
  in the test (not app logic), and fixed it in a separate focused PR.

---

## Key Learnings

- `aria-live="polite"` with `aria-atomic="true"` is the right combination
  for status announcements — polite waits for the user to finish their
  current interaction before announcing, atomic ensures the full message
  is read rather than just the changed portion.
- Lazy initialization of shared DOM elements (create once, reuse) is cleaner
  than injecting them at page load — avoids race conditions during startup.

---

## Next Week's Roadmap

- PR 3 — widget open/close announcements
- PR 4 — block selected/connected announcements
- Comprehensive `aria-label`/`role` audit of `index.html` toolbar and modals
- Re-run axe DevTools scan to verify violation count has dropped

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)
- **Audit Report:** [WCAG-AUDIT-REPORT.md](https://github.com/sugarlabs/musicblocks/pull/7510/files)
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Walter Bender for the quick reviews and for tagging me on PR #5592
to keep me in sync with parallel accessibility work in the repo.