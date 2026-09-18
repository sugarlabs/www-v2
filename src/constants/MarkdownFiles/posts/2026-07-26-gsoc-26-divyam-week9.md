---
title: "GSoC '26 Week 9: Starting the Terminal Activity GTK4 Port"
excerpt: "Beginning the Terminal activity GTK4 migration by adopting VTE 3.91, modernizing layouts, and cleaning up legacy dependencies."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-gsoc-26-divyam-week9"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,terminal,vte,week9"
image: "assets/Images/GSOC.webp"
---
**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-20 to 2026-07-26

---

## Overview

![Terminal GTK4 Port](/assets/post-assets/terminal-gtk4-screenshot.png "Terminal GTK4 Port")

After finishing Read and Jukebox, I moved on to Terminal this week. Terminal relies heavily on VTE, so most of the port involved adapting the VTE code to the new API.

### Overall Progress Update

My GSoC project covers porting a specific set of activities to GTK4. Read and Jukebox are already ported and working, which I covered in my [Week 7](news/all/2026-07-12-gsoc-26-divyam-week7) and [Week 8](news/all/2026-07-19-gsoc-26-divyam-week8) weekly posts. [Terminal](https://github.com/sugarlabs/terminal-activity) was next on the schedule, so I started with the basic GTK4 and VTE changes this week. So far, there haven't been any major blockers. Once Terminal is finished, I only have [TurtleArt](https://github.com/sugarlabs/turtleart-activity) left to port to complete my project scope!

---

## Key Migration Steps

### 1. Toolkit & Dependencies

I started by cleaning up the project setup before getting into the terminal code:

- Updated `activity.info` to use `sugar-activity4`.
- Updated `setup.py` to use `sugar4.activity.bundlebuilder`.
- Went through `sugarterm.py` and `terminal.py` and swapped the imports to `Gtk 4.0`, `Vte 3.91`, and `sugar4`.
- Dropped `SugarExt` and `SugarGestures` as dependencies — Terminal doesn't need them once it's on native GTK4/GDK event handling. (`sugar-ext` itself is being ported separately in parallel.)

### 2. Modernizing Layouts & Containers

GTK4 removed the separate `Gtk.HBox` and `Gtk.VBox` widgets, so I had to move these over to `Gtk.Box` with the appropriate orientation. Touched `widgets.py`, `terminal.py`, `palette.py`, and `helpbutton.py` for this:

- `Gtk.HBox` / `Gtk.VBox` are now `Gtk.Box(orientation=...)`.
- `pack_start` doesn't exist anymore either, so it's `.append()` with `set_hexpand(True)` / `set_vexpand(True)` set manually where needed.
- `Gtk.VScrollbar` → `Gtk.Scrollbar(orientation=Gtk.Orientation.VERTICAL)`.
- `ScrolledWindow.add_with_viewport` → `.set_child()`.

Mostly find-and-replace, though a couple of the palette widgets needed the expand flags set by hand since it's not a clean 1:1 swap.

### 3. VTE 3.91 Integration

This part took most of the week.

`fork_command_full` and `spawn_sync` are gone in VTE 3.91 — you spawn with `Vte.Terminal.spawn_async()` now. Since `spawn_async()` is asynchronous, I had to use an `on_spawn_cb` callback to get the child PID instead of getting it directly from the synchronous call. Lost a chunk of time here because I assumed the callback signature matched what the older docs described, and it didn't quite.

Color parsing changed too — `Gdk.Color` is gone, so that's `Gdk.RGBA.parse()` now.

For writing data to the child process I fell back on `feed_child_binary` where the plain byte stream approach wasn't enough.

---

## What's Next for Week 10

Next week: replacing the old signal connections with GTK4's Event Controllers, and testing clipboard/drag-and-drop under Wayland, which I haven't touched yet.

---

## Acknowledgments

Thanks to Sugar Labs and the GSoC program for the opportunity to work on this!
