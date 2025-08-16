---
title: "GSoC '25 Week 5 Update by Krish Pandya"
excerpt: "Animations, Toolbars, and a Playable Game"
category: "DEVELOPER NEWS"
date: "2025-07-05"
slug: "2025-07-05-gsoc-25-mostlyk-week05"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week05,mostlyk"
image: "assets/Images/GSOC.webp"
---

# Week 5: Animations, Toolbars, and a Playable Game

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** June 22, 2025 – June 28, 2025

---

## Travel and Context

This week started with an 8-hour flight from Hyderabad to Diu ( my hometown ) between Sunday and Monday.
And _YES_ , I am home, sweet home. It was fun working on animations , toolbars and the game.


## Animations and Toolbars

So as discussed and sneak peeked in last week, first part was finishing the toolbar integration and that was done! I also added animations.py.
I have always been a big fan of animations, my first addition to my [PKMS Site](https://pkms.vercel.app/) ( Personal Knowledge Management System ) was a handcrafted and personal documentation of Manim which a python animation library.

Now it has a lot of things but it started as a manim documentation.

### Animations

Added a few clean effects:

- `fade-in` and `fade-out`
- `color` transitions
- `scale-down`


### Toolbars

Features include and tested in example:

- Full range of buttons: open, save, undo, redo, cut, copy, paste
- Multi-select toggles, zoom controls, view modes
- Toolbuttons ( This requires palette somehow so will be updated next week. Sorry for the wait! )
- And because of that if someone wants to play the game, you would have to wait till next week for the palette finish and the ToolButton addition in library.


## Why Not HelloWorld Yet?

The actual HelloWorld example has more dependencies than just graphics. It needs:

- `widgets.py`
which further needs:
  - `RadioButton`, `ToolButton`, `ToolBarButton`, `PaletteMenuBox` etc.
  - A bunch of internal glue that isn't finalized yet

A good HelloWorld will take a few more weeks to land, realistically.
It requires almost all graphics-related components working in unison. Instead of rushing a half-baked HelloWorld, I decided to make something fun using what I already have.


## The Game: Super Ball Dodge

<iframe width="560" height="315" src="https://www.youtube.com/embed/B517C_LTCns?si=u4zGfRp0yEJca8_O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

So I built a game. It's simple, but fully interactive, and it uses the toolkit as it currently exists ( well it uses ToolButton which is half baked, so you would be able to play it by next week, can watch the video to see what it is though! ).

### Game Mechanics

- Use `WASD`, arrow keys, or toolbar buttons to move
- Press `P` to pause, `R` to restart
- Touch the red ball and you lose
- Hitting walls increases your speed and randomizes your color
- Max speed is capped to keep it playable

This game is both a stress test and a fun break. It's a good way to validate rendering, event handling, animation, and user interaction at once.
Also it kind of stands like a hello world alternative for now before everything is done in unison and final decisions are made.


## Summary of Progress

- Built and finalized core animations
- Integrated and tested full-featured toolbar
- Added working event bindings and accelerators
- Created Super Ball Dodge as a game/activity testbed

---

## Next Steps

- Refactor window tests (they're not up to standard yet)
- Finalize and commit `widgets.py`, `ToolButton`, and all of `pallete` stuff.
- Start building the actual HelloWorld once widget infra is stable

---

## Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [Toolkit Repo (Python)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [sugar-ext (C bindings)](https://github.com/sugarlabs/sugar-ext)
- [Game Demo Video](https://youtu.be/B517C_LTCns)


## Closing Thoughts

It's funny how animations were the thing that got me into this headspace of _I GOTTA DO SOMETHING DYNAMIC_ , and I have always loved geometry and maths. And I got to introduce and do something related to that this week and this game was the result of what came out this week and I am glad I got to do it.

Until next week,
Krish!
(P.S. If you couldn’t tell already , I love hiding pop culture references and breaking the fourth wall in these posts. So yes, you, yup, you alright, the reader.... enjoy.)
