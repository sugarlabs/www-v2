---
title: "GSoC '25 Week 12 Update by Krish Pandya"
excerpt: "Sphinx , Bundling Discussion, and Future Plans"
category: "DEVELOPER NEWS"
date: "2025-08-25"
slug: "2025-08-25-gsoc-25-mostlyk-week12"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week12,mostlyk,sphinx,bundling updates"
image: "assets/Images/GSOC.webp"
---


# Week 12: Sphinx , Bundling Discussion, and Future Plans

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** August 17, 2025 – August 25, 2025

---

## Sphinx Documentation

Having the whole library in a working state and getting finished with Activity, which is the essential element to make any sort of activity, I started working on the Sphinx documentation for the library.

Link: [GTK4-Toolkit-Documentation](https://sugar-toolkit-gtk4-py.readthedocs.io/)

## What’s New This Week?

### Documentation

- Contains everything from examples to API references.
- Indexed in the manner of:
  - Activity Framework ( sugar.activity )
  - Graphics and UI (sugar.graphics)
  - Data and Storage (sugar.datastore )
  - Bundle Management (Yet to be implemented)
  - Collaboration (sugar.presence )
  - Event System (sugar.dispatch)
  - Core Utils (sugar package)
  - Examples

### Meet Regarding Bundling

- Had a pleasure to meet Martin , Juan , Walter and Ibiam to discuss the bundling methods.
- We decided on to using the old method of bundling as it is more straightforward and easier to implement , for the most part GTK independent.
- Bundling was implemented and Hello World activity was successfully bundled and tested on a clean Fedora Sugar on a Stick.

## ComboBox, ToggleToolButton and ToolComboBox

- Added 3 new widgets to the library.
- Added the corresponding examples for the same as well it's tests.
- Will keep adding more widgets as I go.

### Future Sugar Plans

- Flatpak Ports
- Sugar Shell Ports
- Complete Wayland Port

## Closing Thoughts and Next Steps

- Documentation was possible as I had written docstrings for most of the methods and classes while writing the library. ( I am so happy about this )
- Documentation covers everything from examples to API references.
- Will write the final blog post and wrap up the project and how to continue from here for future contributors.

---

## Resources & Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [Documentation](https://sugar-toolkit-gtk4-py.readthedocs.io/en/latest/)
