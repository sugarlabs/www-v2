---
title: "GSoC '25 Week 8 Update by Krish Pandya"
excerpt: "Palettes, Groups, and GTK4 Decisions "
category: "DEVELOPER NEWS"
date: "2025-07-26"
slug: "2025-07-26-gsoc-25-mostlyk-week08"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week08,mostlyk"
image: "assets/Images/GSOC.webp"
---


# Week 8: ToolBarBox , Radio-Palette and RadioToolButton

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)  
**Reporting Period:** July 22, 2025 – July 29, 2025

---

## In Summary

Focused on palette positioning, finished graphics for widgets.py and prepared for activity porting.

> ## The Palette Rewrite of '25
>
> The palette system was one of the most challenging and complex rewrites till now, it wasn't a find and replace, original implementation was tied to our own gestures. And event model and widget hierarchy which has been changed significantly in GTK4.

This was there in week 6 blog and oooo boi it really was, I keep coming back to this because of errors.
There seems to be a lot of bugs here and there and the timing for this has affected my own timeline on working on the next components because the following components are kind of dependent on the palettes themselves.

Every time I think I’ve solved one part, another subtle bug or incompatibility pops up, often related to how GTK4 expects widgets to interact or how events are propagated.


![Week-08-Commit](public/assets/Images/week08-mostly-commit.webp)

I’ve been itching to record a demo of palettes in action, but there’s a major technical hurdle: on Wayland, widgets don’t have absolute screen coordinates, so palettes can’t reliably appear at the cursor or next to the invoking widget. This is a big departure from X11, where absolute positioning was straightforward. As a result, palettes sometimes pop up in unexpected places, which isn’t ideal for usability or demos. I’ve documented this as a TODO in the code and am actively looking for workarounds, but for now, the ToolbarBox example is at least functional.

I’m still planning to make a video walkthrough of the new palette system, but I want to make sure the positioning bug is fixed first so the demo truly reflects the intended user experience.

On a brighter note, finishing the graphics for widgets.py is a huge step forward. This file is one of the most important file for building and porting classic Sugar activities, so having it ready means I can finally shift my focus from infrastructure to actual porting of activities as well. There are still a few minor files left to port, but the bulk of the graphics work is behind me. Looking back, it’s satisfying to see how much of the library is now GTK4-ready.

A lot of decisions make sense now after one writes on the same system and builds it for 8 weeks, one starts understanding the GTK4 way of doing things and also why the older decisions were made.

## Looking Ahead

- Continue investigating and (hopefully) resolving the palette positioning issue, since it’s a major blocker for UI polish and usability.
- Finish the palette originating position issue, this is a blocker for the next steps.
- Porting <https://github.com/sugarlabs/fractionbounce/> activity after widgets.py being ported.

---

## Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [New C Library (sugar-ext)](https://github.com/sugarlabs/sugar-ext)
- [Game Demo Video](https://youtu.be/B517C_LTCns)
