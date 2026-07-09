---
title: "DMP '26 Week 03 Update by Abhnish Kumar"
excerpt: "Block drag and trash announcements for screen readers, and reviewing accessibility-related PRs in Music Blocks"
category: "DEVELOPER NEWS"
date: "2026-07-07"
slug: "2026-07-07-dmp-26-abhnish-week03"
author: "@/constants/MarkdownFiles/authors/abhnish-kumar.md"
tags: "dmp26,sugarlabs,week03,abhnish-kumar,accessibility"
image: "assets/Images/c4gt-official-logo.png"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Abhnish Kumar

**Project:** [Music Blocks - WCAG 2.1 AA Accessibility & Touch Support](https://github.com/sugarlabs/musicblocks/issues/6608)  
**Mentors:** [Walter Bender](https://github.com/walterbender)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2026-06-28 - 2026-07-07  

---

## Goals for This Week

- **Goal 1:** Announce block drag interactions to screen readers
- **Goal 2:** Announce block deletion (sent to trash) to screen readers
- **Goal 3:** Review open accessibility-related PRs

---

## This Week's Achievements

1. **Announced block name on drag via aria-live region**
   - PR: [#7744](https://github.com/sugarlabs/musicblocks/pull/7744)
   - When a user picks up and drags a block on the canvas, the screen
     reader now announces the block's name — e.g. "picked up note value"
     or "picked up start".
   - Previously, blind users using screen readers had zero audio feedback
     when interacting with blocks on the EaselJS canvas.
   - The announcement goes directly to the shared `mbA11yLiveRegion`
     (no visual message), triggered once per drag via an `_announced`
     flag that resets on `pressup`.
   - Walter's feedback: updated to remove the `textMsg` visual display
     and include the block name, both addressed in the same PR.

2. **Announced block name when sent to trash via aria-live region**
   - PR: [#7752](https://github.com/sugarlabs/musicblocks/pull/7752)
   - When a block is dragged to the trash and deleted, the screen reader
     now announces "[block name] block sent to trash".
   - Hooked into `sendStackToTrash` in `js/blocks.js` — same shared
     `mbA11yLiveRegion` pattern, screen reader only, no visual change.

3. **Reviewed PR #5592 — Pie menu TTS and aria-live**
   - Provided detailed review: flagged always-active resize listener,
     global flag fragility, and TTS verification issue Devin reported.
     PR is blocked on rebase and Devin's sign-off.

---

## How It Works (Technical)

Both PRs follow the same pattern:

1. A shared hidden `div` with `role="status"` and `aria-live="polite"`
   is lazily created once in the DOM (`id="mbA11yLiveRegion"`).
2. When a significant interaction happens (block picked up, block
   trashed), the block's human-readable label is written into that div.
3. Screen readers automatically announce any text written into an
   `aria-live` region — no extra APIs needed.
4. Sighted users see no change — the region is visually hidden
   (`position: absolute; left: -9999px`).

This is the standard pattern for making canvas-based UIs accessible,
and keeps all announcements consistent through one shared region.

---

## Challenges & How I Overcame Them

- **Challenge:** Walter asked to remove the visual `textMsg` display
  and include the block name in the drag announcement.
  **Solution:** Replaced `this.activity.textMsg()` with a direct write
  to `mbA11yLiveRegion`, and pulled the block label from
  `protoblock.staticLabels[0]` with a fallback to `myBlock.name`.

- **Challenge:** The live region helper logic was duplicated across
  `block.js` and `blocks.js` since `__ensureA11yLiveRegion` is defined
  in `activity.js` scope and not accessible in these files.
  **Solution:** Used an inline lazy-init pattern (IIFE) at each call
  site — checks for an existing element by ID, creates it only if
  missing. Clean and self-contained.

---

## Key Learnings

- `aria-live="polite"` with `aria-atomic="true"` is the right
  combination for action confirmations — polite waits for the user to
  finish their current interaction, atomic ensures the full message
  is read rather than just the changed portion.
- EaselJS canvas interactions (pressmove, pressup) are not accessible
  to screen readers by default — the only way to bridge this gap is
  through parallel DOM announcements via `aria-live`.

---

## Next Week's Roadmap

- Widget open/close announcements (phrase maker, rhythm ruler, pitch
  staircase, music keyboard, timbre widget)
- Block connected/snapped announcement
- Re-run axe DevTools scan to verify violation count after all merged fixes

---

## Resources & References

- **Tracking Issue:** [#6608](https://github.com/sugarlabs/musicblocks/issues/6608)
- **Audit Report:** [WCAG-AUDIT-REPORT.md](https://github.com/sugarlabs/musicblocks/pull/7510/files)
- **Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Walter Bender for the quick review and feedback on the drag
announcement PR — the suggestion to remove the visual display and
include the block name made the implementation much cleaner.
