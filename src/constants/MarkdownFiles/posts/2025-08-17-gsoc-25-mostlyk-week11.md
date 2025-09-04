---
title: "GSoC '25 Week 11 Update by Krish Pandya"
excerpt: "Tray Widgets, Activity Examples, and More!"
category: "DEVELOPER NEWS"
date: "2025-08-17"
slug: "2025-08-17-gsoc-25-mostlyk-week11"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week11,mostlyk,tray,activity updates"
image: "assets/Images/GSOC.webp"
---

# Week 11: Tray Widgets, Activity Examples, and More

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** August 10, 2025 – August 17, 2025

---

## Trays, Activities

This after updating the datastore and objectchooser modules, I focused on porting the tray widget and updated the Activity.py even more featuring all the old used components of the GTK3 Toolkit.

## What’s New This Week?

### Presence

- Integrated the Presence from previous GTK3 toolkit into the new GTK4 toolkit.
- Communication between activities is now possible using the Presence.

### Activity Expansion

- Updated to handle all the old components of the GTK3 toolkit. Except the 2 Bundling methods.
- Demonstrated using 2 new examples.

#### Simple Activity Example

- Demonstrates basic usage of the new toolkit components.
- Allows saving and loading text files using the new modules.
- Showcases the integration of various widgets and functionalities.

#### Additional Activity Example

- Showcases more complex way of integrating Custom Widgets.
- Users can draw shapes, use tools from toolbar and save as well as preview drawings.

### Documentation

- With the library maturing, we have to fake root some stuff while running on local machines.
- Added how to present metadata and how to fake root in the README.

## VM Testing

- Tested the new library on a VM with Fedora 42 SoaS.

## Closing Thoughts and Next Steps

- The library has matured enough that I should start documenting for the last weeks and future plans for the contributors on how to continue from here and where it leads on.
- Start doing sphinx documentation for the library. (_foreshadowing as it has already been started at the time of writing this_)
- Bundle discussion with mentors for next week’s blog post.

---

## Resources & Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [New C Library (sugar-ext)](https://github.com/sugarlabs/sugar-ext)
- [Game Demo Video](https://youtu.be/B517C_LTCns)
