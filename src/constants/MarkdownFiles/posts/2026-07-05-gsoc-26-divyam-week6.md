---
title: "GSoC '26 Week 6: Casilda Shell Integration & Starting the Read Port"
excerpt: "Testing the Fructose suite inside the GTK4 Casilda shell, fixing Wayland/toolkit rendering bugs, and starting the Read activity port."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-gsoc-26-divyam-week6"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,read,calculate,wayland,casilda,week6"
image: "assets/Images/GSOC.webp"
---

# Week 6: Casilda Shell Integration & Starting the Read Port

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 to 2026-07-05

---

## Overview

This week focused on running GTK4 activity ports directly inside the Casilda Wayland shell, with most of the integration testing centered around the Calculate activity to uncover compositor-specific bugs, styling issues, and launcher crashes.

In parallel, with the Browse activity mostly complete, I started migrating the Read activity.

---

## Part 1: Shell Integration & Toolkit Fixes

These toolkit and rendering fixes were submitted in **[Pull Request #35](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/35)**.

### Popover State Corruption in `ToolbarBox`
`ToolbarBox` was breaking when expanding and collapsing dropdown palettes repeatedly. In GTK4, `Gtk.Popover` wraps child widgets in an internal `GtkPopoverContent`. Unparenting dropdown pages directly was corrupting the popover state machine.

I switched to using `set_child(None)` before moving pages, and updated `is_in_palette()` to do a recursive ancestor walk up the widget tree instead of a direct equality check.

### Toolbar Arrow Rendering & Style Bleed
Dropdown arrows were invisible, and global CSS rules were bleeding across windows (turning some activity areas black).

* **Arrow Drawing:** Rewrote `_paint_arrow` in the toolkit to draw a Cairo triangle via `snapshot.append_cairo()` instead of `snapshot.append_color()`. Used `get_style_context().get_color()` to fetch the dynamic foreground color, with `.toolbar-expandable-button` styled explicitly to white.
* **Scoped Styles:** Cached `Gtk.CssProvider` per page in `_setup_page()` and ensured cleanup on destroy to prevent styles from leaking into other widgets.
* **Snapshot Override:** Restored `Gtk.Widget.do_snapshot()` in custom container subclasses so parent rendering isn't skipped.

### Calculate CSS Migration
`modify_bg()` and `modify_base()` are gone in GTK4. For Calculate's borderless keypad, I moved custom styling to an activity-specific `activity.css` loaded via `Gtk.CssProvider`, leaving general toolbars to `sugar-artwork`. I also stripped `.calc-button` classes from `ToolButton` initializers to prevent keypad CSS from leaking into the top bar.

![Calculate Activity with GTK4 CSS in the Casilda Shell](/assets/post-assets/calculate-gtk4-casilda.png "Calculate Activity with GTK4 CSS in the Casilda Shell")

### Shell Integration Fixes
* **Activity Icons:** Added an `activity-calculate` fallback mapping in `ActivityToolbarButton` so standalone mode resolves the bundle icon correctly without the shell prefix.
* **`Gtk.Application` CLI Arguments:** The Sugar shell passes DBus parameters (`-b`, `-a`, `-s`) on startup. `Gtk.Application` treated these shell arguments as invalid and aborted startup. Updated `activityinstance.py` in `sugar-toolkit-gtk4` to filter `sys.argv[0]` before calling `app.run()`.
* **Wayland & Cursor Fixes:** Set `WLR_NO_HARDWARE_CURSORS=1` and standard XCURSOR fallbacks for WSL testing. Fixed `sugar4` busy cursor logic to pass `Gdk.Cursor.new_from_name("default", None)` instead of `None`.

---

## Part 2: Read Activity Migration

Since most of the Browse port was complete, I reused many of the same GTK4 migration patterns while starting the Read port.

* **Layout & Container Updates:** Replaced `Gtk.VBox`/`Gtk.HBox` usages with `Gtk.Box`, swapped `.pack_start()`/`.pack_end()` for `.append()`/`.prepend()`, and set `hexpand`/`vexpand` on children directly. Swapped `.add()` calls for `.set_child()`.
* **Toolbars & Events:** Migrated `ViewToolbar` and `ReadToolbar` to GTK4 widgets. Replaced `Gtk.EventBox` with `Gtk.EventControllerKey` and `Gtk.EventControllerScroll`. Updated `bookmarkview.py` events and drawing logic.
* **Python 3 / GObject Cleanups:** Replaced legacy unbound `GObject.__init__` calls across `readdialog`, `readdb`, and adapters with standard `super().__init__()`. Updated `Gdk.Screen` geometry calls to GTK4 display APIs.
* **Disabled Speech Support:** Temporarily disabled `SpeechToolbar` pending TTS updates in `sugar-toolkit-gtk4`.

![Read Activity GTK4 basic UI frame](/assets/post-assets/read-gtk4-basic-ui.png "Read Activity GTK4 basic UI frame")

---

## Known Issues
* **Document Rendering:** Read launches into a basic UI frame, but `EvinceAdapter` (PDF) and `EpubAdapter` need deeper work before documents render.
* **Speech Toolbar:** On hold until toolkit TTS support lands.

## What's Next for Week 7
* Finish porting `EvinceAdapter`, `EpubAdapter`, and `TextAdapter` for Read.
* Test asynchronous behavior on Read dialogs.
* Continue shell integration testing with remaining Fructose activities.

---

## Acknowledgments
Thanks to my mentors and the team for their guidance as we transition from standalone activity ports to live shell integration. Testing inside the Casilda shell exposed several toolkit issues that didn't show up during standalone activity testing. Getting those fixes upstream in **[PR #35](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/35)** should make future activity ports smoother.
