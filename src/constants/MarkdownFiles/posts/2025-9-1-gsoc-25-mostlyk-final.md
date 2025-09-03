---
title: "GSoC '25 Final Week Update by Krish Pandya"
excerpt: "Everything Everywhere all at Once"
category: "DEVELOPER NEWS"
date: "2025-09-01"
slug: "2025-09-01-gsoc-25-mostlyk-final"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,final week,mostlyk,bundling updates,future"
image: "assets/Images/GSOC.webp"
---


# Final Week: Everything Everywhere all at Once

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)

**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)

**Reporting Period:** August 17, 2025 – August 25, 2025

---

## Confession Time

This marks the end of my GSoC blogs, (_more blogs yet to come_) but this, better be the magnus opus of all my blogs. I have been postponing this blog for a while because I wanted it to start perfect , end perfect and be perfect throughout. So it starts with confession time, this blog is not perfect, this idea is not perfect. I started off for port with the idea of it being perfect, but GSoC taught me a lot of things, one of them is "perfection is the enemy of done". So here I am, writing this blog, not perfect but done.

## Humble Beginnings

The first few changes were too simple almost, read GTK3 line by line, translate it to GTK4 and voila, done. Starting with update `gi.require_version`, fixing build includes, this was all tutorial. Then the first boss fight, `GdkEvent`!. In GTK3 you can just reach the code and grab whatever you want, but in GTK4, that pointer ->x was shut down. This was the first "welcome to the game". Demanded new philosophy, stop translating , start thinking!

The project was re-structured from the second week itself and we decided to write a new library from scratch, keeping the old GTK3 toolkit as reference.
( The pivotal call in Week 2 with my mentors Juan Pablo and Ibiam wasn't just a check in , it was complete teardown of the old plan and a fresh start.)
It was ambitious, but I was determined to make it work. First few weeks were like a breeze, I write, I poke at it, write an example and done. Write the blog for that week and done. But as the weeks progressed, the project got more and more complex.
The first time I felt truly stuck was Palettes, when I had to deal with X11 , wayland discourse and all that jazz. Sticking with it, finally got it working.
As the weeks progressed, workflows changed, now it's not about writing code, it's about finding origins of the bugs, reading GTK4 docs, reading protocols and old code deeply. Refactor more , write less.

## Absurdity and the Obstacle

We are around few weeks in, to give you the sense of idea that I had. I would explain it in a way where, I knew where everything was, where everything would go, but wasn't sure if it was correct or not. It was a limbo. The shift from direct signals to abstract Gesture objects and the death of `draw()` in favor of `snapshot()` were major shifts. Quietly things ran, it was the mid-point and I was able to build "Super Ball Dodge", a simple game that was my proof of work, a sign that the new library was functional and could do something dynamic. But the real test was yet to come.

Everything was going well, then came _Palettes_ the Obstacle. On X11 , you could ask, "Where is my widget on the screen?" and get a straight answer. On Wayland? for security reasons it was forbidden knowledge. This was a tough one, many gnome discourses later, my popovers started to pop. By week 10, the biggest challenges were behind me.

## Path Forward

With the graphics layer stable, it was time to bring back datastore, presence, and all the other things that made Sugar, Sugar.
Most were GTK independent, so it was just a matter of plugging them in and testing. We had some plans for modernizing the bundling system, but that will be for future ( check week-12 future plans ) . The goal was to get the new library stable and usable, and that was achieved.
The library was pushed to [pypi](https://pypi.org/project/sugar-toolkit-gtk4/#description) and can be installed via pip:

```
pip install sugar-toolkit-gtk4 
```

Finally for the last week, I focused on documentation, the map for future explorers. Documentation built with sphinx, is clean, comprehensive and live at [sugar-toolkit-gtk4-py.readthedocs.io](https://sugar-toolkit-gtk4-py.readthedocs.io/en/latest/).

I will attach all the videos and links at the end of the blog, but for now, I want to thank my mentors Walter Bender, Ibiam Chihurumnaya Ibiam and Juan Pablo Ugarte for their constant support and guidance. This journey has been incredible, and I am grateful for the opportunity to contribute to Sugar Labs and the open-source community. Also a thanks to Martin Abente for his help with bundling discussions.

And now, for the first time in 13 blogs, there will be no "Future Plans." Instead, I'll leave you with a quote from one of my favorite films, Perfect Days:
[clip](https://youtu.be/F24IoeMlM3Y?si=xeY2M1n1B-fzz0kS)the quote says. "Next Time is Next Time, Now is Now".

So here I am, signing off, not with future plans, but with a promise to keep my presence and contributions, keep learning and keep growing.
Thank you once again, it has been a great summer!

## Resources & Links

- [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
- [Documentation](https://sugar-toolkit-gtk4-py.readthedocs.io/en/latest/)
- PyPI: [sugar-toolkit-gtk4](https://pypi.org/project/sugar-toolkit-gtk4/#description)

## Video Demonstrations

_Update with the final Sugar Presentation video once available_

- [Event Controller Video](https://youtu.be/m0gwwo_0ZDE)
- [Sugar Python Initialization Video](https://youtu.be/OD1PBOK3g94)
- [Menu and Style Video](https://youtu.be/-WTojjHpQLs)
- [Animations, ToolBox and Super Ball Dodge](https://youtu.be/B517C_LTCns)
- [Palettes, Popovers and Bundling](https://youtu.be/gbaG9CaJJ-U)
