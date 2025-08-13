---
title: "GSoC '25 Week 10 Update by Krish Pandya"
excerpt: "20,000 Lines, Datastore, ObjectChooser, and Sugar Widgets!"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-gsoc-25-mostlyk-week10"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week10,mostlyk,datastore,objectchooser,widgets"
image: "assets/Images/GSOC.png"
---

# Week 10: 20,000 Lines, Datastore, ObjectChooser, and Sugar Widgets

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** August 3, 2025 – August 10, 2025

---

## 20,000 Lines and Counting

This week marks a milestone: I’ve crossed 20,000 lines of code for the Sugar GTK4 migration!

Here’s the obligatory GitHub Insights screenshot

![20k LOC Milestone](assets/Images/20k-loc-gtk4.png)

It is quite wild to think of how much the codebase has grown since I started writing the python porting. From the initial days of porting just the graphical interfaces to now having pushed the datastore and profile, env , mime required to run the systems on Sugar, the library has come a long way and it has been a good lesson in architecture, I keep mentioning this every 2 weeks that I understand a lot of decision of the old library as I write more and I continue to stand by that. Every new addition is a lesson in architecture, debugging and patiences.

## What’s New This Week?

### 1. Datastore Module

- Stable, Extensible, and Tested: The new `datastore.py` and `datastore/__init__.py` bring in all the core logic for activity data storage, retrieval, and signals.
- Unit Tests: Comprehensive tests for metadata, object creation, copying, deletion, and signal handling.

### 2. ObjectChooser: Journal Integration for Activities

- ObjectChooser: Activities can now prompt users to select objects from the Journal, with support for mime filters, previews, and DBus integration.
- Example : Try out `objectchooser_example.py` to see it in action (with graceful fallback if Journal isn’t running).
( Try this in Sugar Sandbox! )

### 3. Alert System

- Alert, ConfirmationAlert, ErrorAlert, TimeoutAlert, NotifyAlert: All ported and refactored for GTK4, with snapshot-based drawing and flexible button handling.
- Example: `alert_example.py` demonstrates all alert types, including timeouts and response signals.

## Technical Deep Dive

This week’s commits were all about foundational infrastructure:

- DBus and Signals: Rewrote the dispatching mechanism for multi-consumer, multi-producer signals (see `dispatch/dispatcher.py` and `dispatch/saferef.py`).
- Widget Modernization: The new `widgets.py` is a beast—over 500 lines of code, refactored for GTK4, with careful preservation of legacy comments and architecture.
- Testing: Every major module now has a corresponding test file in `tests/`, following the pattern of previous weeks—mocking DBus where needed, and ensuring coverage for edge cases.
- Tested on VM: I have been testing the examples on the Fedora 42 Sugar ISO and I have had a issue of an extra topbar appreance which is to be tackled next week.

## Closing Thoughts and Next Steps

- Testing on the VMs which is where the tookit will be used is the next important step.
- The library has matured enough that I should start documenting for the last weeks and future plans for the contributors on how to continue from here and where it leads on.
- Activity Porting: With widgets and datastore in place, it’s time to port real Sugar activities—starting with [fractionbounce](https://github.com/sugarlabs/fractionbounce/).
- Documentation: Begin writing developer docs and migration guides for the new toolkit.

---

## Resources & Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [New C Library (sugar-ext)](https://github.com/sugarlabs/sugar-ext)
- [Game Demo Video](https://youtu.be/B517C_LTCns)
