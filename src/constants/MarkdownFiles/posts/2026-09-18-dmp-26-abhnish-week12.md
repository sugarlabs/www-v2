---
title: "DMP '26 Week 12 Update by Abhnish Kumar"
excerpt: "Two review rounds on axe-flagged accessible names across Phrase Maker and Planet pages, a rebased widget open/close announcement, and a regression-test fix for a null-guard PR"
category: "DEVELOPER NEWS"
date: "2026-09-18"
slug: "2026-09-18-dmp-26-abhnish-week12"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week12,abhnish-kumar,accessibility,axe-core"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-09-12 - 2026-09-18  

---

## Goals for This Week

- **Goal 1:** Work through review feedback on the axe-flagged accessible-name fixes across Phrase Maker and Planet pages
- **Goal 2:** Rebase the widget open/close announcement PR to resolve its merge conflict with `master`
- **Goal 3:** Strengthen the regression test on the null-guard fix per reviewer feedback

---

## This Week's Achievements

1. **Two review rounds on missing accessible names for axe-flagged elements (#8662)**  
   - This PR already fixed 7 missing-alt issues across Phrase Maker's
     bellset-key and mouse-graphics icons, plus several Planet iframe,
     thumbnail, and input-label gaps — dropping Phrase Maker's axe
     issue count from 8 down to 1 (the remaining one is a
     color-contrast issue, deliberately deferred).  
   - CodeRabbit caught a real bug this round: the octave-5 bell icon's
     `title`/`alt` was hardcoded as "bell C" even on rows displaying
     as "do" — fixed by applying the same solfège-vs-letter-name check
     used everywhere else in the app instead of hardcoding one form.  
   - A second reviewer, macayu17, caught a missed icon type: the
     `MATRIXSYNTHS` rows' `synth2.svg` icon had no `alt`/`title` at
     either of its two call sites — fix underway using the same label
     pattern as the mouse-graphics fix. Also flagged a codecov
     coverage gap on the new icon branches and a count mismatch in the
     PR description that needs a manual correction.

2. **Resolved axe violations on Planet explore/project-viewer pages (#8671)**  
   - Fixed 5 axe issues: chip-select contrast, a "Load More Projects"
     link contrast violation in dark theme, a sort-by select missing
     its `aria-label`, a project image missing `alt`, and a
     project-viewer modal that wasn't keyboard-scrollable.  
   - CI's Jest suite failed after pushing — traced it to a minimal DOM
     test fixture that doesn't include the label element the
     `aria-label` fix assumed always exists, crashing on a
     null-property access. Null-guarding that lookup so the fix
     degrades safely when the fixture is minimal.

3. **Rebased the widget open/close screen-reader announcement (#7813)**  
   - This PR had a `needs-rebase` label after `master` refactored the
     old inline `onclose` handler into a `handleClose()` method with
     extra null-safety guards — which didn't carry this PR's
     announcement call over with it.  
   - Resolved the conflict by keeping `master`'s `handleClose()` call
     and manually re-adding the screen-reader announcement inside that
     method's body, so the accessibility feature wasn't silently
     dropped by the refactor. Force-pushed with `--force-with-lease`.

4. **Tightened the regression test on the null-guard fix (#8545)**  
   - Reviewers asked for the test to assert the actual `"G4"` fallback
     value returned when `cblk1` is null, rather than only checking
     that the function doesn't throw — a non-throwing test can still
     hide a wrong return value.

---

## Challenges & How I Overcame Them

- **Challenge:** #8662 has now had two independent reviewers catch two
  different real issues (CodeRabbit's solfège bug, macayu17's missed
  icon type) on what looked like a finished PR.  
  **Solution:** Treated each round of feedback as worth a real fix
  rather than a rubber-stamp response — the solfège bug in particular
  would have shipped a wrong accessible name if dismissed as
  nitpicking.

- **Challenge:** #7813's rebase risked silently dropping the
  accessibility feature this PR exists to add, since `master`'s
  refactor moved the exact code this PR touched.  
  **Solution:** Read through what `master`'s `handleClose()` refactor
  actually changed before resolving the conflict, instead of blindly
  taking one side — made sure the announcement landed inside the new
  method rather than getting lost.

---

## Key Learnings

- A PR having multiple review rounds isn't a sign something's wrong —
  it's what catching real, different bugs from different reviewers
  looks like. Two rounds of legitimate findings on #8662 this week
  reinforced that AI and human review each catch things the other
  misses.  
- Rebasing across a refactor that touches your own PR's code needs
  reading the refactor, not just resolving the conflict marker —
  otherwise a feature can disappear silently even when the rebase
  "succeeds."

---

## Next Week's Roadmap

- Confirm #7813's post-rebase CI status and follow up on #8662's
  remaining coverage/description items.  
- Continue closing out #8671's null-guard fix and review CodeRabbit's
  outstanding comment on that PR.

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR #8662:** [fix(a11y): add missing accessible names for axe-flagged elements](https://github.com/sugarlabs/musicblocks/pull/8662)  
- **PR #8671:** [fix(a11y): resolve axe violations on Planet explore/project-viewer pages](https://github.com/sugarlabs/musicblocks/pull/8671)  
- **PR #7813:** [feat: announce widget open/close to screen readers via aria-live region](https://github.com/sugarlabs/musicblocks/pull/7813)  
- **PR #8545:** [fix: guard against null cblk1 in OutputToolsBlocks.arg()](https://github.com/sugarlabs/musicblocks/pull/8545)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to CodeRabbit and macayu17 for two genuinely useful rounds of
review on #8662, and to Walter for flagging the #7813 rebase before it
could silently drop a finished feature.