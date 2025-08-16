---
title: "GSoC '25 Week 4 Update by Krish Pandya"
excerpt: "Python Library Graphics "
category: "DEVELOPER NEWS"
date: "2025-06-28"
slug: "2025-06-28-gsoc-25-mostlyk-week04"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week04,mostlyk"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4: Development on the Python Library

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** June 21, 2025 till June 28, 2025

---


## Style , MenuItem and Changes

I seem to have missed updating about the Python start on the last week's blog.
This week has 2 videos and less of text! Sorry about that , I will try to summarize the video trascripts for my beloved reading enthusiasts.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OD1PBOK3g94?si=NT8wfgk7UkQt6gxl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This short video covers the initial Python layout and CI pipeline. I’ve structured the repo cleanly:

- `make ci-test` now runs a clean, install, test and build.
- Removed the linting stage since we're not enforcing strict import ordering (consistent with GTK3’s sugar-toolkit style). So it is always going to fail on the top import, but I have kept the formatting check!.
- Wheel gets built automatically , and is stored inside `dist/`. Following this we can also build tar using `make tarbell`, also stored inside `dist/`.

On the graphics front, I wired up a base activity with `XOColors`, and a simple close button. This will expand soon as more components are added.
I'm planning to move forward with alert icons, styled windows, and the tool bar to give our activities the "sugary" look.

> So that was written on Sunday (22nd) and while at the time of writing some more things are added mentioned and demoed in the next video!.


I urge you to go to [sugar-toolkit-gtk4-py](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)'s README as it also has a quick start activity which you can directly bump up. Cheers!

And the next video which is a bit long (_6 mins_) where I talk about what I did this week is:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-WTojjHpQLs?si=m0msTtsXOvzDTTP-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This longer video goes into the real dev work of the week.

- Fixed deprecated API usage in styles by warning users when they try to use old GTK3-style methods, and re-routing to the newer alternatives. I have shown this in video specifically.
- Built a `MenuItem` wrapper that supports icons, keyboard accelerators, as used `Gtk.Button` rather than `GtkImageMenuItem`  which is deprecated.
- On styles, I added something more like `primary`, `success`, etc. The last section in style example shows this.
- Demonstrated accelerators (`Ctrl+O`, `Ctrl+S`, `Ctrl+Q`).  these are now working using the newer GTK4 shortcut handling instead of relying on `GtkImageMenuItem` and it's older signal.


## Sneak Peek & Road Ahead

Near around 3-4 min mark I started giving the sneak peeks haha, and take this as for the work of week 5-6, and let's see how fast it can be pushed. A bit rough, but fun stuff:

- Vertical tray widgets with clickable icons and buttons.
- Fullscreen and window information tools.
- Sugar artwork preview with randomized XO colors. ( sanity check if colors are working again v2)
- First version of the window and tray abstraction layers (some bugs but foundational).
- Starting experiments with `Palette`, `Tray`, and `Toolbar`.

This is the first time I'm actively trying to integrate things built in Week 3 and 4 into full activity flows.
The idea is to not just build features in isolation but make sure they cooperate.

Ideally I want to have some sort of more quick start activity which uses bunch of these Palettable, Toolbar, Style etc. to see everything in action.

## Resources & References

- Project Page – [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- New C Library - [sugar-ext repository](https://github.com/sugarlabs/sugar-ext)
- New Python Library - [sugar-toolkit-gtk4-py ](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- Active PR - [Establish C library base template with Meson for GTK4](https://github.com/sugarlabs/sugar-ext/pull/1)
- Sugar Toolkit Repository(original) – [sugar-toolkit-gtk3](https://github.com/sugarlabs/sugar-toolkit-gtk3)
- GTK4 Migration Guide – [docs.gtk.org/gtk4/migrating-3to4.html](https://docs.gtk.org/gtk4/migrating-3to4.html)


---

## Acknowledgments

Thanks to all the mentors whose guidance and support have been strong in helping me navigate the Port.
