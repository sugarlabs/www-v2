---
title: "DMP '26 Week 11 Update by Abhnish Kumar"
excerpt: "Scoping the value-bar hotkey guard, fixing unbounded Stairs growth and the Alt+S conflict, and correcting dark-mode popup contrast for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-09-11"
slug: "2026-09-11-dmp-26-abhnish-week11"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week11,abhnish-kumar,accessibility,keyboard-shortcuts"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-09-05 - 2026-09-11  

---

## Goals for This Week

- **Goal 1:** Scope the value-bar hotkey guard so it stops swallowing every other keyboard shortcut
- **Goal 2:** Track down and fix unbounded Stairs growth on re-init, plus a conflicting Alt+S binding while the program is running
- **Goal 3:** Correct a dark-mode popup contrast violation to meet WCAG AA

---

## This Week's Achievements

1. **Scoped the value-bar hotkey guard instead of blocking all shortcuts (#8546)**  
   - The value-bar's keyboard guard was written broadly enough that it
     was silently swallowing shortcuts that had nothing to do with the
     value bar, instead of only intercepting the keys it actually
     needed. Narrowed the guard so it only fires for its own relevant
     keys, restoring every other shortcut that was getting blocked.  
   - While fixing this, found a raw `setTimeout()` in the same code
     path that bypassed the project's `logo._timerManager` pattern —
     flagged by CodeRabbit during review. Routed it through
     `_timerManager` instead, so it gets cleared along with every other
     pending timer on stop/restart instead of becoming a zombie
     callback.

2. **Fixed unbounded Stairs growth on re-init and the Alt+S conflict (#8268)**  
   - The `Stairs` array was growing without bound every time the
     staircase block re-initialized, instead of resetting cleanly —
     tracked down where re-init was appending instead of replacing and
     fixed the growth.  
   - Also fixed Alt+S being intercepted while a program was actively
     running, which meant the shortcut silently did nothing at the
     moment a user most wanted it. This PR went through the most
     back-and-forth of anything this week, including a rebase to keep
     it in sync with ongoing changes on `master`.

3. **Corrected dark-mode popup message contrast to meet WCAG AA (#8544)**  
   - Fixed a color-contrast violation on the dark-mode popup message,
     routed through a CSS custom property in `css/tokens.css` rather
     than a one-off hex value, consistent with how every other
     contrast fix in this project has been handled.

---

## Challenges & How I Overcame Them

- **Challenge:** #8268 needed more rounds of review and a rebase
  against `master` before it could land, since it touched code that
  kept moving underneath it.  
  **Solution:** Kept re-fetching and rebasing against `upstream/master`
  rather than letting the branch drift, and re-verified the fix still
  held after each rebase instead of assuming it carried over cleanly.

- **Challenge:** The raw `setTimeout()` CodeRabbit caught in #8546
  wasn't something I was looking for — I was focused on the guard-order
  bug, not timer cleanup.  
  **Solution:** Took the review comment seriously instead of dismissing
  it as unrelated noise, traced it back to the `logo._timerManager`
  convention, and fixed it in the same PR rather than deferring it.

---

## Key Learnings

- A keyboard guard that's supposed to protect one feature can end up
  silently breaking every other shortcut in the app if it's not scoped
  tightly — "does my guard let everything else through" is worth
  checking explicitly, not just "does my own shortcut work."  
- AI review feedback is worth verifying independently rather than
  taking at face value or dismissing outright — the raw `setTimeout()`
  catch in #8546 was real and would have shipped otherwise.

---

## Next Week's Roadmap

- Continue chasing down remaining axe-flagged accessible-name gaps.  
- Follow up on review threads still open from this week's PRs.

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **PR #8546:** [fix: scope the value-bar hotkey guard instead of blocking all shortcuts](https://github.com/sugarlabs/musicblocks/pull/8546)  
- **PR #8268:** [fix: stop unbounded Stairs growth on re-init, fix Alt+S while running](https://github.com/sugarlabs/musicblocks/pull/8268)  
- **PR #8544:** [fix(a11y): correct dark-mode popup message contrast to meet WCAG AA](https://github.com/sugarlabs/musicblocks/pull/8544)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter for review on the Stairs/Alt+S fix through its
several rounds, and to CodeRabbit for catching the timer-cleanup bug
in #8546 before it shipped.