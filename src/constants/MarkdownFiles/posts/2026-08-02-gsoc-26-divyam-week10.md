---
title: "GSoC '26 Week 10: Finishing the Terminal GTK4 Port"
excerpt: "Finishing the Terminal GTK4 port with clipboard fixes, palette workarounds, and event controllers, plus getting ready for TurtleArt."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-gsoc-26-divyam-week10"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,terminal,wayland,week10"
image: "assets/Images/GSOC.webp"
---
**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-27 to 2026-08-02

---

## Overview

![Terminal Palette Fix](/assets/post-assets/terminal-palette-screenshot.png "Terminal Palette Fix")

This week I wrapped up the Terminal port. The VTE 3.91 migration and the main UI changes were mostly done [last week](/news/all/2026-07-26-gsoc-26-divyam-week9), so I spent most of the week fixing clipboard handling, checking the palettes, and hunting down a few remaining GTK3 assumptions.

I also opened the [pull request for the GTK4 port](https://github.com/sugarlabs/terminal-activity/pull/60). I split it up into four commits (UI layout, VTE backend, standalone test entrypoint, and clipboard/palette) to make it easier to review. Once this is merged, I just have [TurtleArt](https://github.com/sugarlabs/turtleart-activity) left!

---

## What I Worked On

### 1. Moving Terminal to the GTK4 Clipboard

GTK4 uses the asynchronous clipboard API, so I swapped out the old `Gtk.Clipboard` for `Gdk.Clipboard`.

### 2. Debugging `PaletteMenuItem`

While testing the palettes, I ran into an issue where clicking a `PaletteMenuItem` was causing a recursive signal bug. I worked around it for now by renaming the signal connection in the last commit. I flagged this in the PR because if palette clicks start acting up in other activities, we might need to dig deeper into the root cause.

### 3. Finishing the Event Migration

I also finished ripping out the old GTK3 event signals (`button-press-event` and friends). The remaining pointer and keyboard handling now uses GTK4 Event Controllers (`Gtk.EventControllerKey` and `Gtk.GestureClick`).

---

## What's Next for Week 11

Next week I'm starting on **[TurtleArt](https://github.com/sugarlabs/turtleart-activity)**. It's going to be tricky since it has a lot of custom canvas elements and relies heavily on palettes. My first step will be fixing the basic layout and seeing how much work it'll take to adapt the block-dragging code to GTK4.

---

## Acknowledgments

Thanks to my mentors for the reviews and to everyone in the Sugar Labs community for the feedback and help.
