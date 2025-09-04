---
title: "GSoC '25 Week 9 Update by Krish Pandya"
excerpt: "Hello-World, Radio Palettes, and PyPI Release!"
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "2025-08-03-gsoc-25-mostlyk-week09"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week09,mostlyk"
image: "assets/Images/GSOC.webp"
---

# Week 9: Hello-World, Radio Palettes, and PyPI Release

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)  
**Reporting Period:** July 29, 2025 – August 3, 2025

---

## The Week of Debugging, Demos, and Downloads

This week was a classic GSoC roller coaster: the codebase is now big enough that tiny bugs become huge blockers, and huge features sometimes just work. I spent hours chasing down a path bug that turned out to be a config detail and later on hard coded the paths for a workaround for now , radio tool buttons, palettes, and the first working Hello World activity are all live!

_Hello-World isn't pushed yet, will push it with bundle itself_

## Debugging

Early in the project, writing code was fast, just a few graphical interfaces, no integration headaches. Now, every little bug can block the whole flow. This week, I spent hours just figuring out why I couldn't get the art icons working properly, the button signals not ending like I wanted. Turns out, hardcoding the path was the way I have made it work, not elegant, but it works!

_A special shoutout to the [Stack Overflow](https://stackoverflow.com/questions/72303475/gtk4-gestureclick-no-released-signal-emitted) and [GNOME Discourse](https://discourse.gnome.org/t/gtk4-need-button-pressed-and-released-signals/8506) threads that helped me fix signaling in Palettes._

## Radio Tool Buttons & Palettes: The Big Reveal

Let’s start with the fun stuff: radio tool buttons and radio palettes. After a lot of toolkit upgrades and some annoying GTK integration quirks, I finally got radio tool buttons working with their palettes. You can now select between states (eraser, pencil, etc.), and the palette stays in sync with the tool button.

Also do note: The color scheme is fully customizable via my config, sooo the rainbowish borders you see in the demo is all me, not GTK4 defaults.

Here’s a quick breakdown of what’s working:
( This is shown in the video which I have been delaying since the past few weeks! )

[youtube: gbaG9CaJJ-U]

- Radio Tool Buttons: Integrated with radio palettes, stateful selection (eraser, pencil, pen, etc.)

- Palette Groups: Grouped palettes now show and hide correctly, with proper event handling

- Menu Palettes: Custom content, icons, and actions all working

- ToolbarBox Example: Classic Sugar toolbar replicated, icons and colors working (though I need to fix icon sizes)

- Buffer Loading in Icon: Fixed buffer loading for icons, so custom SVGs and PNGs now render as expected

---

## Hello-World Activity: Actually Live

The big milestone this week: the Hello-World activity is up and running. I spent a lot of time emulating desktop environments (GNOME, KDE, Hyprland etc.) to make sure the UI looks right, even if some backend arguments are a bit hacky for now. The circular CSS isn’t perfect yet, but the basics are solid. This is the first real step toward porting and bundling activities for Sugar GTK4.

## PyPI Release

You can now download and install the toolkit directly from PyPI:  

[https://pypi.org/project/sugar-toolkit-gtk4/#description](https://pypi.org/project/sugar-toolkit-gtk4/#description)  

```
pip install sugar-toolkit-gtk4
```

We will change the authors and maintainers as GSoC comes to an end to Sugar Labs.
This makes it much easier for others to try out the toolkit and start porting their own activities. Publishing is now automated via GitHub Actions—so every new release is just a push away.

---

## Reflection & Next Steps

After nine weeks of building, breaking, and rebuilding, I’m starting to appreciate how much the little details matter. Debugging path issues, integrating palettes, and getting activities to actually launch has taught me a ton about GTK4’s quirks and strengths. The toolkit is finally at a point where I can start porting real activities.

Next up:

- Polish Hello-World and fix icon sizing
- Clean up debug statements and hardcoded paths
- Continue porting and refining the toolkit
- Add widgets example, presence and datastore from old library.

---

## Links

- [(sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [Game Demo Video](https://youtu.be/gbaG9CaJJ-U)
- [PyPI Release](https://pypi.org/project/sugar-toolkit-gtk4/#description)
- [Stack Overflow: GTK4 GestureClick](https://stackoverflow.com/questions/72303475/gtk4-gestureclick-no-released-signal-emitted)
- [GNOME Discourse: GTK4 Button Signals](https://discourse.gnome.org/t/gtk4-need-button-pressed-and-released-signals/8506)
