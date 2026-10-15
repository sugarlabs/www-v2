---
title: "DMP '26 Week 05 Update by Abhnish Kumar"
excerpt: "Closing out the remaining axe violations and rebase troubleshooting on a fast-moving master for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-07-31"
slug: "2026-07-31-dmp-26-abhnish-week05"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week05,abhnish-kumar,accessibility"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-07-25 - 2026-07-31  

---

## Goals for This Week

- **Goal 1:** Fix the remaining axe violations from mid-point (contrast on notification banner, help scroll wrapper keyboard access)
- **Goal 2:** Update WCAG-AUDIT-REPORT.md to reflect the reduced violation count
- **Goal 3:** Get the fix branch rebased and opened as a PR against a fast-moving master

---

## This Week's Achievements

1. **Fixed 2 of the remaining 4 axe violations**  
   - PR: [#7988](https://github.com/sugarlabs/musicblocks/pull/7988)  
   - Added `tabIndex = 0` to `helpScrollWrapper` in `js/widgets/help.js`
     so keyboard users can focus and scroll the help/tour content —
     resolved the `scrollable-region-focusable` violation.  
   - Added `--color-notification-bg` and `--color-notification-text`
     tokens to `css/tokens.css` (light, dark, highcontrast) and updated
     `#persistentNotification` to use them instead of hardcoded hex —
     resolved the contrast violation.  
   - Violation count dropped from 4 → 1 remaining.  

2. **Documented the one unresolved violation instead of guessing at a fix**  
   - `#helpWidgetID` "Take a tour" title still fails contrast (2.12:1,
     needs 4.5:1). The background color is set at runtime, and I couldn't
     locate its source after an extensive search through CSS and JS.
     Rather than patch around it blindly, documented it clearly in the
     updated audit report as a known open issue.  

3. **Rebase troubleshooting on a moving master**  
   - CI flagged a Prettier failure on a file I hadn't touched. Traced it
     back to my branch being several commits behind `sugarlabs:master` —
     rebased onto `upstream/master`, which resolved it.  
   - Also hit a failing "Security audit" check — investigated and
     confirmed the vulnerabilities (`nanoid`, `postcss`,
     `materialize-css`) are pre-existing on `master` itself, unrelated to
     my changes, and already being addressed in a separate community PR
     (#7989). Documented this rather than duplicating effort.  

---

## axe DevTools Scan — Remaining Violation

Below is the axe DevTools scan result after this week's fixes were applied.
Violations dropped from **4 to 1**.

![axe DevTools scan showing 1 remaining violation after this week's fixes](assets/Images/Abhnish-axe-scan-week05.png)

The 1 remaining violation (`#helpWidgetID` contrast) is documented for
further investigation.

---

## Challenges & How I Overcame Them

- **Challenge:** CI failed on a file I never edited.  
  **Solution:** Learned to check whether a branch is out of sync with
  master before assuming a code fix is needed — confirmed via a clean
  checkout of the file at master's tip, which passed Prettier fine on
  its own.  

- **Challenge:** A failing security check with no clear connection to my PR.  
  **Solution:** Reproduced the failure on a clean master checkout to
  confirm it wasn't caused by my branch, then checked for existing
  related work before duplicating effort.  

---

## Key Learnings

- A CI failure isn't always about your own diff — checking sync-state
  against master first saves a lot of wasted debugging.  
- Documenting an unresolved issue clearly is often better than a rushed
  or speculative fix, especially when the root cause (a runtime-set
  style with no traceable source) genuinely isn't findable through
  static search.  

---

## Next Week's Roadmap

- Begin the touch support audit requested by Devin — full review of
  current touch state for block dragging on desktop Chromium.  

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR:** [#7988](https://github.com/sugarlabs/musicblocks/pull/7988)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter Bender and Devin Ulibarri for their continued guidance,
and to the broader Sugar Labs community for the existing dependency-fix
PR (#7989) that saved me from duplicating unrelated security work.