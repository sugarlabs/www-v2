---
title: "DMP '26 Week 06 Update by Abhnish Kumar"
excerpt: "Touch support audit for block dragging on desktop Chromium — investigation, DevTools instrumentation, and root cause narrowing for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-08-07"
slug: "2026-08-07-dmp-26-abhnish-week06"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week06,abhnish-kumar,accessibility,touch-support"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-08-01 - 2026-08-07  

---

## Goals for This Week

- **Goal 1:** Investigate why block dragging via touch doesn't work on desktop Chromium (Devin's request)
- **Goal 2:** Determine what currently works, what's broken, and what's dead code in the existing touch handling
- **Goal 3:** Write up findings as a formal audit report

---

## This Week's Achievements

1. **Traced the existing touch event wiring via static analysis**  
   - Found `createjs.Touch.enable(this.stage)` in `js/activity.js`, which
     translates native touch input into EaselJS's `mousedown`/`pressmove`/
     `pressup` event system used for block dragging.  
   - Found a second, redundant `Touch.enable()` call elsewhere — confirmed
     it's a silent no-op (EaselJS guards against double-enabling), but
     flagged it as misleading dead code worth cleaning up.  
   - Found three `touchstart`/`touchmove`/`touchend` listeners on block
     containers that never fire — EaselJS doesn't dispatch raw touch
     event names on display objects, only its own synthesized set. This
     was meant to power a touch long-press context menu that's currently
     non-functional.  

2. **Live-tested using Chrome DevTools touch emulation**  
   - Instrumented `mousedown` and `pressmove` handlers with temporary
     console logging to trace real event flow.  
   - Used Chrome's Sensors panel (Touch: Force enabled) to get genuine
     `TouchEvent` dispatch rather than emulated mouse clicks — confirmed
     touch press correctly reaches the block and translates to
     `mousedown`.  
   - Ran a clean, isolated drag test: confirmed `pressmove` never fires
     during an actual touch-drag gesture, despite no guard clause in the
     handler filtering out touch input.  

3. **Wrote and opened the audit report**  
   - PR: `docs/touch-support-audit-report` — added `TOUCH-SUPPORT-AUDIT.md`  
   - Documented all findings: what works, what's broken, dead code, and
     next steps.  
   - Root cause narrowed to the `touchmove` → `pressmove` translation gap
     in the EaselJS touch-handling layer, not in Music Blocks' own drag
     logic.  

---

## Challenges & How I Overcame Them

- **Challenge:** Chrome DevTools' device toolbar dimensions kept
  triggering the app's "play-only mode" (viewport under 600px), hiding
  the full editor entirely.  
  **Solution:** Found the exact CSS breakpoint and switched to a
  manually-sized responsive viewport above it.  

- **Challenge:** Initial touch tests kept showing real `MouseEvent`s
  instead of touch, even with the device toolbar open.  
  **Solution:** Found the correct dedicated control — Chrome's Sensors
  panel "Touch: Force enabled" setting — which reliably dispatches
  genuine `TouchEvent`s regardless of device toolbar mode.  

---

## Key Learnings

- Chrome's device toolbar changes viewport/UA but doesn't reliably force
  real touch event dispatch on its own — the Sensors panel is the actual
  authoritative control for that.  
- Isolating a bug to "press works, drag doesn't" through clean, repeatable
  tests is far more useful than guessing at fixes — it narrows exactly
  where in a three-layer translation chain (`touchstart`→`mousedown`,
  `touchmove`→`pressmove`) the actual gap is.  

---

## Next Week's Roadmap

- Share findings with Devin and await real-device confirmation before
  continuing to root-cause the `pressmove` gap, to rule out a
  DevTools-emulation-only artifact.  
- Begin block connected/snapped announcement work in parallel.  

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **Audit Report PR:** `docs/touch-support-audit-report`  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Devin Ulibarri for raising the touch support issue with clear,
actionable detail from his classroom observations, which made this
investigation much more focused.