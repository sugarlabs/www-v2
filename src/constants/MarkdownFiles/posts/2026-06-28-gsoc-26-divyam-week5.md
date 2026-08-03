---
title: "GSoC '26 Week 5: Finishing the Browse Port & Opening the PR"
excerpt: "Wrapping up the Browse Activity migration to GTK4/WebKit 6.0 by modernizing custom widgets, toolbars, async file pickers, and finalizing the PR."
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-gsoc-26-divyam-week5"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,browse,webkit6,week5"
image: "assets/Images/GSOC.webp"
---

# Week 5: Finishing the Browse Port & Opening the PR

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-22 to 2026-06-28

---

## Introduction

This week was mostly about wrapping up the [Browse activity](https://github.com/sugarlabs/browse-activity) port. In Week 4, I ported the core WebKit 6.0 engine and fixed a few [upstream toolkit bugs](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/32). This week I focused on the UI side of the port: completely rewriting the toolbars, porting custom widgets, handling asynchronous dialogs, and making sure the drag-and-drop system still works in GTK4.

Before opening the PR, I cleaned up the commit history and squashed a few related commits. You can review the complete migration in my [Browse activity PR](https://github.com/sugarlabs/browse-activity/pull/141).

## What I Worked On

### Reworking the Toolbars
GTK4 completely removes the old `Gtk.Toolbar` and `Gtk.ToolItem` widgets, which meant I had to rewrite the `edittoolbar`, `viewtoolbar`, and `webtoolbar` from scratch using standard `Gtk.Box` containers. 

Rebuilding the layout was fairly straightforward. Most of my time went into updating the event handling because GTK4 handles focus changes differently. I ended up replacing the old signal-blocking logic with `EventControllerFocus` and a small timeout to keep the search popover behaving as before. I also moved the global CSS injection over to scoped, per-widget styling via `style.apply_css_to_widget()`, which makes the CSS much cleaner and less prone to breaking the rest of the app.

![The new GTK4 toolbars in the Browse Activity](/assets/post-assets/browse-gtk4-toolbars.png "The new GTK4 toolbars in the Browse Activity")

### Asynchronous File Pickers & Modern Widgets
GTK4 removes blocking loops like `Dialog.run()`. Our `FilePicker` relied heavily on this blocking behavior, so I had to rewrite it to use an asynchronous callback pattern tied to the `response` signal. It now uses a callback-based flow and closes itself after the response is handled.

![The Asynchronous File Picker Dialog](/assets/post-assets/browse-gtk4-filepicker.png "The Asynchronous File Picker Dialog")

I also ported `LinkButton` to use `Gtk.Picture` and `Gdk.Texture`. Because GTK4 doesn't have a direct Cairo surface-to-texture conversion path, I implemented a workaround that round-trips the SVG data through a PNG in memory. While porting it, I also fixed an old [thumbnail scaling bug](https://github.com/sugarlabs/browse-activity/pull/141/changes/4c5363127fa31e525fa94995134c1046934cde06).

![Crisp thumbnails with SVG-to-PNG texture fallback](/assets/post-assets/browse-gtk4-thumbnail-fix.png "Crisp thumbnails with SVG-to-PNG texture fallback")

### Context Menus & Synthetic Events
`ContentInvoker` and `BrowsePalette` needed a different approach because GTK4 no longer allows synthetic pointer events. I replaced the old setup with a clean `Gtk.GestureLongPress`. For now, I trigger the browser's context menu through a JavaScript `contextmenu` event directly into the DOM, although this still needs testing on touch devices.

![Custom context menu with Gtk.GestureLongPress](/assets/post-assets/browse-gtk4-contextmenu.png "Custom context menu with Gtk.GestureLongPress")

### Structuring the PR
Since the port modified many files, I made sure the git history was clean. I rewrote the commit messages to clearly explain the API changes so the migration would be easier for the mentors to review.

## Known Issues & Blockers
There are still a couple of issues left to fix:
* **Empty History Palettes:** The Back/Forward palettes are currently rendering empty in my local testing. I suspect they rely on the actual Sugar shell (`jarabe`) running to position themselves correctly.
* **Progress Animations:** The `ProgressIcon` widget was completely removed in Sugar 4. For now, the `ProgressToolButton` is just a static compatibility stub. If we want download fill animations back, we might need to build a custom `Gtk.Snapshot` replacement.

## What's Next for Week 6
* **Read Activity:** Officially begin porting the [Read activity](https://github.com/sugarlabs/read-activity), applying the lessons learned from Browse (especially regarding `Gtk.Popover` and asynchronous dialogs).

---

## Acknowledgments
Thanks to my mentors for their patience as the scope of this migration expanded. Porting the Browse activity to GTK4 and WebKit 6.0 was a significant amount of work, and I'm glad to finally have [that PR open](https://github.com/sugarlabs/browse-activity/pull/141).
