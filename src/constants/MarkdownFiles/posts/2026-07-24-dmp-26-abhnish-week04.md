---
title: "DMP '26 Week 04 Update by Abhnish Kumar"
excerpt: "Shared screen reader utility, widget open/close announcements, and mid-point evaluation prep for Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-07-24"
slug: "2026-07-24-dmp-26-abhnish-week04"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week04,abhnish-kumar,accessibility"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-07-07 - 2026-07-24  

---

## Goals for This Week

- **Goal 1:** Extract a shared `announceToScreenReader()` utility to eliminate code duplication
- **Goal 2:** Add widget open/close announcements for all five Music Blocks widgets
- **Goal 3:** Prepare mid-point evaluation presentation and collect demo videos

---

## This Week's Achievements

1. **Extracted shared `announceToScreenReader()` helper**  
   - PR: [#7764](https://github.com/sugarlabs/musicblocks/pull/7764)  
   - Walter pointed out the live region creation code was being duplicated
     across multiple files after reviewing the trash announcement PR.  
   - Extracted into a single reusable `announceToScreenReader(msg)` helper
     in `js/utils/utils.js` and refactored `block.js` to use it.  
   - All future announcements now call this one function — one line instead
     of 15 lines of repeated DOM setup code.  

2. **Widget open/close announcements for all five widgets**  
   - PR: [#7813](https://github.com/sugarlabs/musicblocks/pull/7813)  
   - Added open and close announcements to all five Music Blocks widgets:
     Phrase Maker, Rhythm Maker, Pitch Staircase, Music Keyboard, Timbre Widget.  
   - e.g. opening Phrase Maker announces "Phrase Maker opened", closing
     announces "Phrase Maker closed".  
   - Also fixed CI — added `global.announceToScreenReader = jest.fn()`
     to all four affected widget Jest test files since the global wasn't
     available in the test environment.  

3. **Mid-point evaluation preparation**  
   - Ran a fresh axe DevTools scan — violations reduced from **16 to 4**
     (75% reduction at mid-point).  
   - Recorded VoiceOver demo videos showing screen reader announcements
     working locally.  
   - Built mid-point evaluation presentation covering all 4 goals,
     demos, results, and end-point roadmap.  

---

## axe DevTools Scan — Before vs After

Below is the axe DevTools scan result after all mid-point fixes were applied.
Violations dropped from **16 (14 critical, 2 serious)** at the start of the
project to **4 (1 critical, 3 serious)** — a 75% reduction.

![axe DevTools scan showing 4 total issues after mid-point fixes](https://private-user-images.githubusercontent.com/144924616/626658353-ee313713-e098-4713-a228-0a9406964255.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQ5Nzc3NzUsIm5iZiI6MTc4NDk3NzQ3NSwicGF0aCI6Ii8xNDQ5MjQ2MTYvNjI2NjU4MzUzLWVlMzEzNzEzLWUwOTgtNDcxMy1hMjI4LTBhOTQwNjk2NDI1NS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcyNVQxMTA0MzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNWI2MDZiOTk0OWNjMTk4ZmRmMjkwNGJjMWJiZTk2MmYzM2EzYzZmZjliMjA1OTMxZmY4MjM2OGY4ZDRlYTdlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.FW2uJ3JIYozAMb_sOJuA6pY2sHgHrOgk8dJadeQNCkA)

The 4 remaining violations are targeted for the end-point milestone.

---

## Challenges & How I Overcame Them

- **Challenge:** Walter asked to consolidate repeated live region code
  into a shared helper after seeing it duplicated across files.  
  **Solution:** Extracted `announceToScreenReader()` into `js/utils/utils.js`
  — all future announcements are now one-liners.  

- **Challenge:** CI Jest tests failed after adding widget announcements
  because `announceToScreenReader` is a browser global not available in
  the Jest environment.  
  **Solution:** Added `global.announceToScreenReader = jest.fn()` to all
  four affected widget test files — tests passing cleanly.  

---

## Key Learnings

- Extracting shared utilities early pays off — every new announcement
  going forward is just one line instead of 15 lines of repeated setup.  
- Jest environments don't have browser globals — any new global added
  to the app needs a corresponding mock in the test setup files.  

---

## Next Week's Roadmap

- Fix remaining 4 axe violations (contrast on notification banner,
  paste button accessible name, help scroll wrapper keyboard access)  
- Block connected/snapped announcement  
- Comprehensive aria-label audit of toolbar buttons and modal dialogs  
- Full VoiceOver screen reader pass  

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)  
- **Audit Report:** [WCAG-AUDIT-REPORT.md](https://github.com/sugarlabs/musicblocks/pull/7510/files)  
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  

---

## Acknowledgments

Thanks to Walter Bender for the detailed review feedback and for suggesting
the shared helper refactor — it made the codebase significantly cleaner
for all future accessibility work.