---
title: "DMP '26 Week 07 Update by Abhnish Kumar"
excerpt: "Confirming the root cause of the touch drag bug, completing the touch support audit report, and sharing findings with the mentor team for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-08-14"
slug: "2026-08-14-dmp-26-abhnish-week07"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week07,abhnish-kumar,accessibility,touch-support"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-08-08 - 2026-08-14  

---

## Goals for This Week

- **Goal 1:** Confirm the exact root cause of the touch drag bug with a clean, isolated reproduction
- **Goal 2:** Finalize and open the `TOUCH-SUPPORT-AUDIT.md` report
- **Goal 3:** Share findings with Devin and request real-device verification

---

## This Week's Achievements

1. **Confirmed the exact root cause via clean reproduction**  
   - Cleared the console and ran a single, isolated press-hold-drag-release
     gesture using Chrome's Sensors panel forced touch.  
   - Result: `mousedown` fired once (confirming press was correctly
     detected), but `pressmove` never fired at all — despite a real,
     continuous drag motion.  
   - Reviewed the full `pressmove` handler body for guard clauses that
     might silently skip touch input (e.g. a mouse-button check) — found
     none. Since the log statement was the first line in the callback and
     never printed, the callback itself is never invoked by EaselJS for
     this gesture.  
   - This isolated the bug precisely to the `touchmove` → `pressmove`
     translation layer inside EaselJS, not to any logic in Music Blocks'
     own drag handling.  

2. **Finalized and opened the audit report**  
   - PR: `docs/touch-support-audit-report` — `TOUCH-SUPPORT-AUDIT.md`  
   - Documented all four findings in one place: working touch press
     detection, the broken `pressmove` gap, dead touch long-press code,
     and a redundant no-op `Touch.enable()` call.  
   - Added a clear "Next steps" section recommending real-device
     verification before further root-causing, since Chrome DevTools'
     touch emulation has known limitations simulating sustained drag
     gestures.  

3. **Shared findings with Devin**  
   - Sent the audit PR along with a plain-language summary: touch press
     works, touch drag doesn't, root cause narrowed to EaselJS's touch
     translation layer.  
   - Asked for testing on a real touchscreen Chromebook or Windows laptop
     to rule out a DevTools-emulation-only artifact before investing more
     time tracing EaselJS internals.  

---

## Console Evidence — Clean Isolated Test

Below is the console output from a single, clean press-hold-drag-release
test with the console cleared beforehand: only `mousedown` logs, no
`pressmove` at all.

![Console showing only mousedown logged, zero pressmove logs during an isolated drag test](assets/Images/Abhnish-touch-root-cause-week07.png)

This was the deciding piece of evidence for the audit report's
conclusion.

---

## Challenges & How I Overcame Them

- **Challenge:** Early tests showed ambiguous results — a block appeared
  to visually drag despite no `pressmove` logs appearing, which
  contradicted the working theory.  
  **Solution:** Cleared the console and ran one single, deliberate,
  isolated gesture instead of multiple rapid test attempts, which removed
  the ambiguity and gave a clean, trustworthy result.  

---

## Key Learnings

- When results seem contradictory, the fix is usually a cleaner test, not
  a more complicated theory — clearing state and isolating one variable
  at a time resolved what looked like a confusing signal.  
- Knowing when to stop root-causing and hand off for real-device
  verification is itself a useful engineering decision — not every bug
  needs to be fully solved through emulation alone.  

---

## Next Week's Roadmap

- Await real-device confirmation from Devin.  
- Begin block connected/snapped announcement work (aria-live), which
  doesn't depend on the touch fix.  

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **Audit Report PR:** `docs/touch-support-audit-report`  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Devin Ulibarri for his patience while this investigation took
a full week of back-and-forth debugging, and for being ready to jump in
with real-device testing once the audit was complete.