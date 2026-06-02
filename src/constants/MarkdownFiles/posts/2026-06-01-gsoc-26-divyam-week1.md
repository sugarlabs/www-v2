---
title: "GSoC '26 Week 1: Calculate and Log GTK4 Ports"
excerpt: "Finalizing the GTK4 migrations for Calculate and Log, navigating Python 3.12+ AST changes, and planning the Chat and ImageViewer ports."
category: "DEVELOPER NEWS"
date: "2026-06-01"
slug: "2026-06-01-gsoc-26-divyam-week1"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,wayland,fructose,week1"
image: "assets/Images/GSOC.webp"
---

# Week 1: Calculate and Log

**Project:** [Part 1 Fructose (GTK4 Porting)](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-05-25 to 2026-05-31

---

## Introduction
This week I worked on the first two GTK4 ports in the Fructose suite: **Calculate** and **Log**.

## What I Worked On

![Calculate Activity running on GTK4](/assets/post-assets/calculate-gtk4.png)

*   **[Calculate Activity (PR #81)](https://github.com/sugarlabs/calculate-activity/pull/81):** Most of the work here was replacing the old `Gtk.Table` layouts with `Gtk.Grid` and `Gtk.Box`. While I was in there, I updated the input handling to use `Gtk.EventControllerKey`. I also noticed a memory leak in the Matplotlib backend, which I fixed by explicitly closing the figure objects (`pylab.close(fig)`).

![Log Activity running on GTK4](/assets/post-assets/log-gtk4.png)

*   **[Log Activity (PR #25)](https://github.com/sugarlabs/log-activity/pull/25):** This port was mostly about cleaning up the UI code. I swapped out the deprecated `VBox`/`HBox` widgets and moved the styling over to use Sugar's `apply_css_to_widget()` API. On the backend, I replaced a few legacy `os.popen()` calls with `subprocess.run()`.

## Environment Setup and Challenges
I initially set up a Debian virtual environment under WSL. However, when I tried testing Log using an older 2020 `sugar-live-build` ISO, it crashed with a `Namespace Gdk not available for version 4.0` error because it lacked modern GTK4 packages. After spending too much time fighting with the 2020 image, I gave up and switched to a recent Fedora live build with [sugar-toolkit-gtk4](https://github.com/sugarlabs/sugar-toolkit-gtk4). After that, things were a lot easier to test.

I also ran into a Python 3.12 issue in Calculate. The parser was still using `ast.Num` and `ast.Str`. Python 3.12 finally broke that code path, so I replaced everything with `ast.Constant`.

## What's Next for Week 2
With both draft PRs up, next week I'll be moving on to:
*   **Debian 13 Integration:** Setting up a Debian 13 VM so my testing environment matches the one being used upstream.
*   **[Image Viewer](https://github.com/sugarlabs/imageviewer-activity):** I'll be rewriting the legacy `SugarGestures` code to use native `Gtk.GestureZoom` and `Gtk.GestureDrag`.
*   **[Chat Activity](https://github.com/sugarlabs/chat):** I'll be starting the migration for the custom Cairo-rendered `RoundBox` widget to use `Gtk.Snapshot` and modernizing the old display APIs.

---

## Acknowledgments
Thanks to MostlyK, Ibiam, and Walter for the reviews and guidance this week. Also thanks to quozl for helping me untangle some of the Sugar build system issues.
