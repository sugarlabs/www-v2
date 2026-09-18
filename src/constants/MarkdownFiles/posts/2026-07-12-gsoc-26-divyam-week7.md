---
title: "GSoC '26 Week 7: Completing the Read Activity GTK4 Port"
excerpt: "Finishing the Read activity GTK4 migration by porting the document adapters, migrating from Evince to Papers for PDFs, and updating the EPUB viewer to WebKit6."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-gsoc-26-divyam-week7"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,read,papers,webkit6,week7"
image: "assets/Images/GSOC.webp"
---

# Week 7: Completing the Read Activity GTK4 Port

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-06 to 2026-07-12

---

## Overview

Following the UI frame migration last week, my focus for Week 7 was entirely on the core rendering engines for the Read activity. Since each document format relies on a different backend, each adapter required its own migration. This week, I ported the adapters for PDF, EPUB, Comic, Image, and Text, bringing the core GTK4 port to completion in **[Pull Request #50](https://github.com/sugarlabs/read-activity/pull/50)**. 

*(Note: There are a few known gaps that will be addressed later, such as the Table of Contents (TOC) being disabled in the PDF viewer and Text-To-Speech (TTS) being currently disabled).*

---

## Document Adapters Migration

Most of the work this week was in the document adapters, with the PDF backend being the most involved migration. 

### Migrating PDF Viewer: Evince to Papers
In GTK3, Read used the Evince library for PDF rendering. Since Evince doesn't provide a GTK4-native document view, I migrated the PDF backend to Papers.
* Replaced the GTK3 Evince integration with the GTK4-native Papers document viewer.
* Updated the PDF viewer integration to work with the new document model and view APIs.

![Papers PDF Viewer rendering in GTK4](/assets/post-assets/read-gtk4-papers.png "Papers PDF Viewer rendering in GTK4")

### Challenges Faced: Papers Search Functionality
Search ended up being the most time-consuming part of the PDF migration. Papers exposes search results through a different API than Evince. Instead of navigating matches directly, it returns a `GtkSelectionModel` (a `GListModel` implementation) of all matches. To implement "find next/previous" functionality, I had to rewrite the navigation logic to manipulate the selection state of this list model (`sel.set_selected(pos + 1)`) and connect to the `'finished'` signal to auto-select the first result. Getting search back to parity with the GTK3 version took more of my time this week than the EPUB, Comic, Image, and Text adapters combined.

### Migrating EPUB Viewer: WebKit2 to WebKit6
The EPUB reader ran on `WebKit2` under GTK3; under GTK4, the EPUB viewer uses the `WebKit` namespace from WebKit6. `EpubAdapter` needed its imports and setup routines rewritten for that. The biggest change was adapting to the new `evaluate_javascript()` API, which replaces `run_javascript()` and uses a different callback-based interface. JavaScript results also no longer require `get_js_value()` before conversion. I also replaced the legacy window event masks for touch gestures with a modern `Gtk.GestureClick` controller. I tested these changes by loading an EPUB document, verifying JavaScript execution, and confirming page navigation behaved correctly.

![WebKit6 EPUB Viewer in GTK4](/assets/post-assets/read-gtk4-webkit6.png "WebKit6 EPUB Viewer in GTK4")

### Other Formats: Comic, Image, Text
The remaining document adapters required straightforward UI container updates:
* **Comic & Image Adapters:** Updated buffer handling and widget packing to GTK4 `Gtk.Box` and `Gtk.Picture` / `Gdk.Texture` concepts.
* **Text Adapter:** Migrated the `Gtk.TextView` and `Gtk.TextBuffer` configurations to standard GTK4 properties.

## Fixing GTK4 Theme Styling Regressions

Separately from Read, I opened **[Pull Request #130](https://github.com/sugarlabs/sugar-artwork/pull/130)** against `sugar-artwork` to fix GTK4 contrast regressions: invisible toolbar text, flat entry widgets, and broken PDF colour inversion. I discovered these while testing the GTK4 branch, particularly while verifying the `TitleEntry`, search bar, and PDF invert toggle in both light and dark themes.

Initially, I included Papers-specific CSS (`pps-view`) in this PR. However, during review, my mentor Ibiam rightly pointed out that activity-specific styling shouldn't pollute the shared theme. I reverted those changes from `sugar-artwork` and migrated them to a local `papers.css` in Read, loaded via `Gtk.CssProvider`. I verified that the updated theme continued to render correctly across the rest of the shell while keeping Read's styling cleanly isolated.

## UI Polish and Standalone Testing

Once the adapters were working, I finished the week with a few smaller fixes:
* **Empty Panel CSS Fix:** Fixed visual regressions in `emptypanel.py` by mapping to `.background-white` instead of the non-existent `.bg-white` class in the `sugar-artwork` theme.
* **Standalone Runner:** Created a `local_run.py` script to allow for easier standalone testing of the activity outside the Casilda shell during the porting process.
* **Release Prep:** Bumped the activity release version to `125` and documented the GTK4/Sugar4 port in the `NEWS` file. 

---

## What's Next for Week 8
With Read functionally ported, next I'll move on to Jukebox. I'll also continue testing these activities in the Casilda shell to iron out any cross-activity toolkit issues. 

---

## Acknowledgments
Thanks to my mentors for their guidance this week. Thanks to Ibiam for pointing out during review that Papers-specific styling belonged in the Read activity rather than the global `sugar-artwork` theme.
