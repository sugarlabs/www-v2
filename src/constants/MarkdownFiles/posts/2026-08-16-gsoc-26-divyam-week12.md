---
title: "GSoC '26 Week 12: Wrapping Up the TurtleArt Port & Splitting the PR"
excerpt: "Wrapping up the TurtleArt GTK4 migration, fixing a bunch of pre-existing bugs, and splitting the work into two PRs based on mentor feedback."
category: "DEVELOPER NEWS"
date: "2026-08-16"
slug: "2026-08-16-gsoc-26-divyam-week12"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,turtleart,wayland,week12"
image: "assets/Images/GSOC.webp"
---

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender), [Juan Pablo Ugarte](https://github.com/xjuan)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-10 to 2026-08-16

---

## Overview

This week I wrapped up the core of the [TurtleArt](https://github.com/sugarlabs/turtleart-activity) port. It was definitely the most involved activity of the summer. I spent a lot of time getting things like the drawing logic and media playback working on Wayland, as well as fixing the custom sprites.

While working through the codebase, I also ran into a bunch of older bugs that had nothing to do with GTK4. After talking it over with my mentors, I ended up splitting all those fixes into a separate PR so they could be merged right away.

---

## Wrapping Up the GTK4 Migration (PR #104)

My main focus was porting the core drawing pipeline in `TurtleArtActivity.py`.

The most tedious part was moving all the Cairo drawing over to explicit image surfaces. I replaced the old `Gdk.cairo_set_source_pixbuf` calls across the canvas and sprite renderers.

For the UI, I had to swap out the legacy `Gtk.Menu` popups for GTK4's `Gio.Menu` models and actions. I also replaced the removed `Gtk.IconView` with a responsive `Gtk.FlowBox` to handle loading the sample projects. I spent a while figuring out why dialog popups were acting weird on Wayland. It turned out they just needed to explicitly call `.set_transient_for(self)` and `.set_modal(True)` to map correctly.

I pushed all of this to [PR #104](https://github.com/sugarlabs/turtleart-activity/pull/104), targeting the new `gtk4` branch that quozl set up for us.

## Fixing Legacy Bugs (PR #105)

While tracking down issues during the port, I kept hitting crashes that predated the GTK4 work. Some were Python 2→3 leftovers, and others were just old resource leaks.

I didn't want to hide these fixes in the massive GTK4 diff, so I just grouped them into [PR #105](https://github.com/sugarlabs/turtleart-activity/pull/105) and targeted it directly at `master`.

There were around 24 fixes in total across 5 commits. Some of the bigger ones were:

* Fixing a fatal Python 3 MRO conflict in `util/odf/element.py`.
* Fixing missing arguments and dictionary crashes in the plugin system (`taplugin.py`).
* Cleaning up window memory leaks by swapping `.hide()` for `.destroy()` in the config wizard dialogs.

## Code Review

Most of my activity PRs this summer have just been sitting open in the queue, but this week Walter Bender and Ibiam (@chimosky) jumped right into reviewing the TurtleArt PRs.

During review, Ibiam pointed out that my tutorial GIF path handling could break depending on how the activity was launched. I switched it over to use `pathlib.Path` instead and tested it in the VM, which fixed the issue.

![TurtleArt GTK4 Tutorial Popup](/assets/post-assets/turtleart-tutorial-gtk4.png "TurtleArt GTK4 Tutorial Popup")

## What's Next

* **Final GSoC Submission:** Since the coding period is wrapping up, my main focus this weekend is compiling my Final Work Product report for the `sugarlabs/GSoC` 2026 archives, linking all my PRs, commits, and weekly blogs.
* **Mentor Reviews:** I have 9 activities ported and waiting in the review queue now (Calculate, Log, Image Viewer, Chat, Browse, Read, Jukebox, Terminal, and TurtleArt). I’ll keep an eye on the PRs and address any review comments as they come in.

---

## Acknowledgments

Thanks to my core mentors MostlyK, Ibiam, and Walter for the direct reviews and guidance this week, and to Juan Pablo Ugarte for his overall mentorship. Thanks also to quozl for creating the upstream `gtk4` branch.
