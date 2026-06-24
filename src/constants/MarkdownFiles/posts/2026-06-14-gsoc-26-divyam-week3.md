---
title: "GSoC '26 Week 3: PR Polish, Upstream Fixes, and Testing Blockers"
excerpt: "Bulletproofing the Calculate backend, getting a toolkit fix merged upstream, and moving to the Browse activity."
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-gsoc-26-divyam-week3"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,calculate,week3"
image: "assets/Images/GSOC.webp"
---

# Week 3: PR Polish and Testing Blockers

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-08 to 2026-06-14

---

## Introduction
This week was mostly about wrapping up work from earlier weeks instead of starting another activity port. I finalized several defensive fixes in [Calculate's](https://github.com/sugarlabs/calculate-activity) parser, had my [`sugar-toolkit-gtk4`](https://github.com/sugarlabs/sugar-toolkit-gtk4) patch merged upstream, and discussed testing blockers with my mentor. Since some activities depend heavily on the Sugar shell, my mentor and I decided to temporarily shift focus to the [Browse activity](https://github.com/sugarlabs/browse-activity) while those issues are worked out.

## What I Worked On

### Calculate Activity Parser Updates
My main code focus was finishing the Python 3.12 updates for `astparser.py` in [Calculate (PR #81)](https://github.com/sugarlabs/calculate-activity/pull/81). Although I'd already migrated to [`ast.Constant`](https://docs.python.org/3/library/ast.html#ast.Constant) in Week 1, further testing turned up a couple of edge cases I hadn't considered. In particular, the new code path could accept unexpected values like strings or booleans, so I added explicit `isinstance()` checks to reject them.

I also fixed a secondary crash in the `ParserError` handler. I noticed this issue after throwing malformed expressions at the parser during testing; if it caught an AST tree during an exception instead of a clean string, it would attempt to slice it like a string and crash. I added type checks to handle non-string inputs safely. Finally, I swapped the string replacements to raw strings (`r''`) to prevent any future backslash parsing bugs and added inline comments documenting the Python 3.12 changes.

### Debian 13 VM & Upstream Fix
I also finished setting up my Debian 13 VM, which should give me a more reliable environment for testing the GTK4 ports. The [`sugar-toolkit-gtk4` patch (PR #31)](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/31) I wrote last week while debugging the [Image Viewer](https://github.com/sugarlabs/imageviewer-activity) canvas crash was also merged upstream.

## Network Testing Blockers
Testing the [Chat](https://github.com/sugarlabs/chat) and Image Viewer activities standalone is proving difficult. Features relying on networking, [Telepathy](https://telepathy.freedesktop.org/), or [D-Bus](https://www.freedesktop.org/wiki/Software/dbus/) (like the [Portfolio activity](https://github.com/sugarlabs/portfolio-activity)) fail without the main [Sugar shell](https://github.com/sugarlabs/sugar) running.

After discussing it with my mentor, we decided it was more productive to switch focus to Browse for now rather than keep fighting those testing limitations. I opened [Chat PR #50](https://github.com/sugarlabs/chat/pull/50) as a draft, which preserves the GTK4 UI layout work and the `RoundBox` widget migrations while the remaining testing issues are sorted out. We'll revisit the remaining network-related testing once the Sugar shell port is further along.

## What's Next for Week 4
* **Browse Activity:** Continue porting Browse while the shell-dependent activities remain blocked.
* **GSoC Evaluation:** Prepare for Thursday's contributor evaluation session with Google.

---

## Acknowledgments
Thanks to Krish for the discussion around the current testing limitations and for suggesting that I move on to Browse while we work out the remaining shell-dependent issues.
