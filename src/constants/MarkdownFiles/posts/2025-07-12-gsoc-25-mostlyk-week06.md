---
title: "GSoC '25 Week 6 Update by Krish Pandya"
excerpt: "Palettes, Groups, and GTK4 Decisions "
category: "DEVELOPER NEWS"
date: "2025-07-15"
slug: "2025-07-15-gsoc-25-mostlyk-week06"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week06,mostlyk,midterm"
image: "assets/Images/GSOC.webp"
---


# Week 6: Palettes, Windows, and GTK4 Decisions

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)
**Reporting Period:** July 7, 2025 – July 15, 2025

---

## Why This Blog is Two Days Late

First off, a confession: this update is getting written on 15th instead of the usual Saturday, I was travelling back to my university and this week's work was plenty and important.
I wanted to make sure I gave the proper write-up it deserves, especially since it's also the time for **midterm** evaluations. So if you are reading this, thank you for patience.


## Midterm Evaluations: Reflections

For this week we had to write about midterm evaluations and after 6 weeks we have the halfway point. To look back what's been done , what changed and why. This project has been as much about architectural decisinos and learning as it has been about code or just porting in itself.

- Weeks 1–2: Laying the foundation, setting up the C and Python split, and getting the Meson build system working.
- Weeks 3–4: We move into event controllers, file attribute utilities, and the starting of python library.
- Weeks 5–6: Animations, toolbars, and a full rework of the palette system for GTK4 python library now.

### What changed and why?

- Modern GTK4 patterns: Embracing controllers, gestures, and popovers has improved both code quality and user experience.
- Testing and documentation: Every major change is now accompanied by example scripts and documentation, making it easier for others (and my future self) to pick up where I leave off.

### Personal growth:
Beyond the code, the first half taught me a lot about communcation, documenting decisions and working with mentors across time zones. I'have learned to reason and think about changes, justify architectural decisions, think broad and wide and accept that sometimes the best solutions are just compromise!
I look forward for the next half where I can finalizing the widgets and graphics and get one or two activities ported.

## The Palette Rewrite of '25

The palette system was one of the most challenging and complex rewrites till now, it wasn't a find and replace, original implementation was tied to our own gestures. And event model and widget hierarchy which has been changed significantly in GTK4.


### What's the update in the Palettes?


- Will be sharing the example videos on next week! But here's the technical gist that I remember is big:

-   `Gtk.Popover` is King: Instead of manually managing popup windows, the new `Palette` class now uses `Gtk.Popover` for the menu implementation.

-   Controllers over Signals: The tangled web of event signals is gone. All interaction is now handled by `Gtk.EventController` and `Gtk.Gesture` objects.
For example, hover detection in `WidgetInvoker` now uses `Gtk.EventControllerMotion`, and clicks are captured with `Gtk.GestureClick`.

-  Real Widgets for Menu Items: `PaletteMenuItem` is no longer a `Gtk.EventBox`. It is now a proper `Gtk.Button`, which gives us accessibility, theming, and correct behavior for free. CSS is used to style it to look like a menu item, removing the need for manual background color changes on hover.


- `ToolButton`: The GTK3 `Gtk.ToolButton` is deprecated. So as the replacement we have `Gtk.Button` subclass styled with CSS to be our toolbutton, integrated with the `ToolInvoker` and palette system. It handles the activate state drawing and accelerator setup using modern `Gtk.Application` actions.

-  Streamlined Invokers: All invoker classes (`WidgetInvoker`, `CursorInvoker`, `ToolInvoker`, `TreeViewInvoker`) have been refactored to use the new controller-based system.

### Some Threads and Docs:

- https://gitlab.gnome.org/GNOME/gimp/-/issues/7700
- https://docs.gtk.org/gtk4/class.EventControllerMotion.html
- https://valadoc.org/gtk4/Gtk.Popover.html
- https://docs.gtk.org/gtk4/class.GestureClick.html

---


## Progress Snapshot

-   Palette System: Complete rewrite for GTK4, including `Palette`, `PaletteGroup`, `PaletteMenuItem`, and all `Invoker` types.
-   ToolButton: A new, modern `ToolButton` widget from scratch.
-   Examples: Added comprehensive demos (`palette_example.py`, `palettegroup_example.py`) to showcase every feature and edge case of the new system.

---

## Looking Ahead

With palettes and toolbuttons now on a solid GTK4 footing, the next weeks will focus on:

-   Finalizing the remaining widget infrastructure (`widgets.py`) and integrating it with the palettes.
-   Porting an actual Sugar activity to use the new toolkit, putting our work to a real-world test.

---

## Links

-   [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
-   [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
-   [New C Library (sugar-ext)](https://github.com/sugarlabs/sugar-ext)
-   [Game Demo Video](https://youtu.be/B517C_LTCns)

---

## Closing Thoughts

Next half of this GSoC going to be fun! And also we merged Sugar-AI ( _yay!_ thanks to Ibiam for taking out time to sit on a meet and go through this ) now we can deploy and test our LLMs and try to have more fun that way as well.

And YESS NOW YOU CAN PLAY THE GAME HEHE.

Until next week (on time, I promise!),
Krish
