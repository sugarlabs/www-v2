---
title: "GNOME Asia Summit and GTK4 Porting"
excerpt: "Reflections on presenting at GNOME Asia Summit and progress on porting Sugar's core activities"
category: "DEVELOPER NEWS"
date: "2026-01-07"
slug: "gnome-asia-and-gtk4-port"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "sugarlabs,gtk4,porting,gnome-asia-summit,terminal-activity,fructose"
image: "assets/Images/gnome-asia.jpg"
---

# GNOME Asia Summit and GTK4 Porting

## GNOME Asia Summit: A Dream Realized

I'm still taking it in. Giving a talk at the GNOME Asia Summit, presenting "Sugar Toolkit on GTK4: A Case Study in Modernizing for Today's GNOME" to fellow GNOME devs and open-source enthusiasts, it all felt unreal. The work I did over months finally had a moment where I could present it all: the architectural changes, the X11 battles, and the countless little bugs solved during the port. It was very validating.

To the GNOME Asia Summit organizers: thank you. For giving me the opportunity to share and present my work, ensuring smooth logistics, and creating an amazing space for developers to network. I loved the talks by other presenters as well. To name a few: The work by the openKylin team on their RISC-V port achieving the feat of porting GNOME Shell and other necessities, Rocky Linux founder and his story and how Rocky came to be, internationalization on Fedora, GNOME growth in Nepal and many more. All of this was very inspiring and moving. The conversations after the talk, when people asked about Sugar, GTK4 porting strategies, how they could approach similar ports, and even a few who remembered OLPC, were especially meaningful. It reminded me why we do this.

## The Talk

[Youtube Link](https://www.youtube.com/live/WZ63lQ-DsOA?si=OfiYrn6LLQVszViB&t=14730)

If you've seen my GSoC blogs, you know this wasn't a straightforward port. 
I am grateful that I got to make a slide deck and relive the port again after it's done. The reaction was better than I expected, people resonated with the struggles of modernizing codebases, and the Sugar UI philosophy (Activities, Journal, Palettes) and their questions post talk sparked genuine curiosity. 

It made me realize how much more there is to learn. This is just the beginning.


You can check out the talk slides and materials here: [GitHub: gnome-asia-talk](https://github.com/MostlyKIGuess/gnome-asia-talk)



# Post-Summit 

## Recent Toolkit Improvements

December and January 2026 started with some fixes and additions to sugar-toolkit-gtk4 itself:

- Fixing Toolbar Icon Sizing
	- Toolbar "SugarIcon" appearing tiny, fix involved switching to explicit integer constants as GtkImage wasn't respecting our expectations.


- Build System Overhaul

- Added bundlebuilder.py for activity bundle creation and management. This is the glue that lets activities:
	- Generate translations with genpot, po etc.
	- Actually get bundled and distributed

Updated to version 1.1.4 and published to PyPI, so you can grab the latest with:

```
pip install sugar-toolkit-gtk4
```

## The Roadmap from here

Next step for Sugar would be to port the main Fructose set, which for now can be just the following activities:


In the last two weeks of my winter break, after the energy of GNOME Asia, I dived into porting the first real activity: **Terminal Activity**.

The working version is now live at: [sugarlabs/terminal-activity/tree/gtk4](https://github.com/sugarlabs/terminal-activity/tree/gtk4)

- Terminal Activity
	- The port that I have finished will almost certainly have bugs, we tackle that and add everything that is needed for the terminal-activity. It proved that the new toolkit can handle real activities and not just example demos. This also required using [vte-3.91](https://gnome.pages.gitlab.gnome.org/vte/gtk4/#classes) made for GTK4.

- Next Up: Write Activity
	- Writing is next on the list. It's also a complex activity with canvas-based drawing, text handling, and stateful toolbars. This will stress-test the drawing primitives and palette integration even more.

- After That: Browse Activity
	- Browse brings in WebKit integration, which will be... interesting. GTK4's WebKit4GTK port introduces its own set of challenges, some [guides](https://webkitgtk.org/reference/webkit2gtk/2.39.7/migrating-to-webkitgtk-6.0.html).


Each port will teach us more about the edge cases in toolkit, which means more fixes and improvements that will benefit all the future ports.

## Looking Back, Looking Forward

It's been quite a journey. From that first GSoC proposal where I thought I could just "fix the imports" from GTK3 to GTK4, to presenting at GNOME Asia, to now actively porting core activities. 

The path ahead is clear: port the fructose activities, iron out the remaining GTK4 quirks, and get Sugar running cleanly on Wayland-first distros. The community interest from GNOME Asia gave me confidence that people still care about Sugar's mission and its unique approach to learning.


## Acknowledgments

Special thanks again to the GNOME Asia organizers for the opportunity. To my mentors Walter, Ibiam, and Juan Pablo—for the architectural vision, code reviews and guidance. And to the Sugar Labs community for keeping this mission alive.


## Resources & Links

- **Talk Materials:** [GNOME Asia Talk - Source](https://github.com/MostlyKIGuess/gnome-asia-talk/blob/main/talk.typ) | [PDF](https://github.com/mostlyKIGuess/gnome-asia-talk/blob/main/talk.pdf)
- **Terminal Activity (GTK4):** [sugarlabs/terminal-activity/tree/gtk4](https://github.com/sugarlabs/terminal-activity/tree/gtk4)
- **Toolkit Repository:** [sugar-toolkit-gtk4](https://github.com/sugarlabs/sugar-toolkit-gtk4)
- **Documentation:** [sugar-toolkit-gtk4.readthedocs.io](https://sugar-toolkit-gtk4.readthedocs.io/en/latest/)
- **PyPI:** [sugar-toolkit-gtk4](https://pypi.org/project/sugar-toolkit-gtk4/#description)


## Closing Thoughts

I am very grateful for the overall experience and when I wrote my final blog, I mentioned a movie Perfect Days and its quote "Next Time is Next Time, Now is Now", I didn't have the faintest idea that I would actually visit Tokyo, and as the movie was shot in Tokyo, and I had a day to myself to visit the bridge scene and live that for myself during a quiet evening just like the movie, Perfect Days. Those were my own "Perfect Days". Thank you.


*(If you're interested in porting an activity or contributing to the toolkit, reach out!)*
