---
title: "GSoC '26 Week 11: Tackling the TurtleArt GTK4 Port Foundation"
excerpt: "Starting the GTK4 port of TurtleArt, beginning with migrating the plugin system, updating basic layouts, and cleaning up legacy code."
category: "DEVELOPER NEWS"
date: "2026-08-09"
slug: "2026-08-09-gsoc-26-divyam-week11"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,turtleart,week11"
image: "assets/Images/GSOC.webp"
---
**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-03 to 2026-08-09

---

## Overview

![TurtleArt Config Wizard GTK4](/assets/post-assets/turtleart-config-wizard-gtk4.png "TurtleArt Config Wizard GTK4")

With the [Terminal GTK4 port wrapped up](/news/all/2026-08-02-gsoc-26-divyam-week10), I'm now starting on the final activity in my GSoC scope: **[TurtleArt](https://github.com/sugarlabs/turtleart-activity)**.

Since TurtleArt is much larger than Terminal, I started with the smaller utilities and plugins before getting into the main canvas code.

---

## What I Worked On

### 1. Porting the Plugin System

I started with TurtleArt's plugins (`uploader_plugin.py`, `fb_plugin.py`, `collaboration_plugin.py`). These files handle external integrations like Facebook uploads and network collaboration. I went through these first and replaced the deprecated GTK3 container packing (`Gtk.VBox`, `Gtk.HBox`, and `.add()`) with the GTK4 `Gtk.Box` and `.append()` APIs.

### 2. Updating Basic Layouts and Grids

For the configuration wizard, I had to deal with `Gtk.Table`, which has been completely removed in GTK4. I migrated the layout to `Gtk.Grid` and explicitly set both rows and columns to homogeneous to keep the sizing behavior close to the old GTK3 layout. I also added some plumbing to pass the parent window down to the wizard, which is necessary for Wayland compatibility.

### 3. Cleaning Up Old Code

While going through the codebase, I fixed formatting and spacing issues around the top-level class definitions. I also tracked down and stripped out several unmaintained standalone `__main__` entrypoints and old testing functions. This also removed some unused code from the utility files.

---

## What's Next for Week 12

Next week I'll be diving into the heart of `TurtleArtActivity.py` to work through the Wayland modal dialog issues, replace deprecated UI components like `Gtk.IconView`, and start looking at the canvas drawing code.

---

## Acknowledgments

Thanks to my mentors for the reviews and to everyone in the Sugar Labs community for the feedback and help.
