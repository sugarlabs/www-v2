---
title: "GSoC 2026 Community Bonding and First Steps into GTK4 Migration"
excerpt: "My community bonding journey with Sugar Labs while preparing to work on the GTK4 Transition Part 2: Sugar Shell project."
category: "DEVELOPER NEWS"
date: "2026-05-24"
slug: "2026-05-24-gsoc-26-dev-community-bonding"
author: "@/constants/MarkdownFiles/authors/dev.md"
tags: "gsoc26,sugarlabs,dev10-sys,Sugar Desktop,wayland"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# GSoC 2026 Community Bonding and First Steps into GTK4 Migration

**Project:** [GTK4 Transition Part 2: Sugar Shell](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#gtk4-transition-part-2-sugar-shell)  
**Mentors:** [Krish Pandya](https://github.com/MostlyKIGuess), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Juan Pablo Ugarte](https://github.com/xjuan)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  

---

I am Dev from India and this summer I will be working on the [GTK4 Transition Part 2: Sugar Shell](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#gtk4-transition-part-2-sugar-shell) project with Sugar Labs as part of Google Summer of Code 2026.

Over the past few months I have been exploring Sugar Shell internals, `GTK4` transition work, `Wayland` compatibility issues, and how the Sugar desktop environment behaves internally during runtime.

You can find more details on my [GSoC Project Page](https://summerofcode.withgoogle.com/programs/2026/projects/Yf2eiaqE).


## How I Got Into Sugar Labs

Before working with Sugar Labs, I mostly knew GTK only at a surface level. I had worked on open source projects before but Sugar felt completely different from anything I had explored earlier.

At first I thought Sugar was just another Linux application. Then I actually started using it. 

![Sugar Desktop](/news/2026-05-24-gsoc-26-dev-community-bonding/sugar-desktop.png)

Once I started running the Sugar desktop locally and exploring the Shell behavior during runtime, my understanding completely changed.

Sugar is not simply an app running on Linux. It is an entire desktop environment built around learning, collaboration, and exploration. The deeper I went, the more exciting it became. 

Activities inside Sugar are kind of like apps but they feel much more connected to the system itself. The Journal is not just a normal file manager. The Frame is not just a sidebar. 

Everything inside the Shell interacts together through activity lifecycle handling, datastore integration, `DBus` communication, and display management.

As I explored more of the Sugar codebase I became increasingly curious about how different desktop components communicate internally. The deeper I went into Shell behavior, activity lifecycle handling, datastore integration, and display management, the more I realized how much engineering work goes into maintaining a stable desktop environment.

I became particularly focused on how the Frame, Journal, and activity lifecycle systems interact internally during runtime.

## Understanding GTK4 and Wayland

As I read more Sugar code and migration discussions, it surprised me how important GTK is for Linux desktop software. 

GTK is the toolkit used for building graphical Linux applications and desktop environments. Sugar currently depends heavily on GTK3 while modern Linux systems are increasingly moving towards GTK4 and Wayland.

> GTK4 migration is not only about replacing deprecated APIs.  
> It also changes rendering behavior, input handling, display management, and runtime interaction patterns.

At first I thought GTK4 migration mostly meant replacing old widgets and changing APIs. I thought it would be easy. It was not.

One thing that surprised me during the bonding period was how interconnected desktop environment components are. Even small GTK related changes can affect rendering behavior, event handling, focus management, geometry calculations, and runtime interaction across the Shell.

Some of the migration related areas I started exploring included:

- Event Controller migration
- Widget lifecycle changes
- GTK rendering updates
- Display backend assumptions
- Geometry handling differences
- Input event behavior changes
- Deprecated GTK3 APIs

While debugging older GTK3 behavior, I started noticing how much Sugar still depended on APIs that are no longer commonly used in GTK4.

Older GTK3 code heavily depended on APIs like Gdk.Screen
which modern GTK4 systems no longer use in the same way.

One thing that stood out is how GTK4 now uses Event Controllers instead of many older event signal patterns. The migration work needs to happen incrementally while keeping the existing desktop environment stable during transition.

Another thing that became really important for me during the bonding period was Wayland. Most older Linux desktop environments historically depended on `X11` behavior. 

Wayland compatibility work is especially important because many older Linux desktop assumptions built around X11 no longer behave the same way on modern systems.

Wayland changes many of those assumptions completely, including unrestricted global positioning, direct display access assumptions, and older geometry handling behavior. 

For a project like Sugar this matters a lot because components like the Frame depend heavily on geometry calculations, input handling, focus management, and display behavior. 

That is why the GTK4 migration and Wayland compatibility work are deeply connected together. 

After debugging display related behavior, I realized why desktop environments are much harder to maintain than they look from outside. I also started noticing how many older desktop assumptions still depend on X11 behavior.

## My Community Bonding Experience

Before GSoC officially started I was already contributing to Sugar Labs repositories and exploring different parts of the Sugar Shell. 

One thing I enjoyed during this process was investigating how activities are launched and managed internally. 

I also spent time testing how DBus communication interacts with the Shell lifecycle which was very different from anything I had worked on before. 

Some of the things I explored during this period included:

- Shell startup flow
- Activity lifecycle behavior
- Journal interaction updates
- Clipboard related behavior
- DBus communication handling
- Runtime debugging inside Sugar sessions
- GTK4 migration validation
- Wayland display behavior

One thing I learned very quickly was that reading the codebase alone is often not enough for desktop related projects. Many behaviors only become understandable while observing the Shell during runtime and debugging real sessions.

## Development Setup and Runtime Testing

A large part of the bonding period was spent setting up Sugar development setups locally and understanding how the Shell behaves across different desktop sessions during runtime.

Some of the setups and debugging workflows I explored included:

- [Sugar Live Build](https://github.com/sugarlabs/sugar/blob/master/docs/development-environment.md#sugar-live-build) based development setup
- Local GTK4 migration testing
- Wayland and X11 desktop sessions
- DBus debugging and runtime inspection
- GTK Inspector usage
- Local Sugar Shell runtime testing
- Reviewing ongoing GTK4 migration changes

I also spent a lot of time testing runtime behavior locally because many issues only become visible while the Shell is actively running.

Debugging live Sugar sessions helped me observe how different parts of the desktop environment interact together internally.

During the coding phase I will mainly continue working on GTK4 migration tasks, improving Wayland compatibility, reducing older X11 assumptions, and testing runtime stability across different desktop sessions.

A lot of the work also involves improving backend safety and reducing assumptions around display availability.

I also spent time testing Frame behavior, Journal workflows, and Shell initialization flow during runtime sessions.

The bonding period has been a really valuable learning experience so far. I spent most of the time exploring Sugar architecture, reading GTK4 migration discussions, testing Shell internals, setting up development workflows, understanding Wayland related challenges, and preparing for the coding period. 

One thing I appreciate about Sugar Labs is how contributors are willing to explain difficult desktop internals and review even small runtime related issues seriously.

## Current Contribution Work

Before the official coding period started I was already contributing to Sugar repositories and exploring different migration related issues.

While exploring migration related issues I also started noticing how sensitive desktop initialization behavior can be. Some problems were related to display access during initialization while others were connected to older assumptions made around screen handling and runtime session availability.

Some of the work I explored included:

- Wayland related safety fixes
- GTK4 migration validation
- Runtime crash fixes
- Clipboard related improvements
- Display initialization behavior
- Shell stability testing

A lot of my learning during the bonding period actually came from debugging real issues, session debugging locally, exploring older Sugar architecture, and observing how different parts of the Shell interact together during runtime.

Here are some of the contributions I worked on:

- [Handle datastore restart after DBus disconnect](https://github.com/sugarlabs/sugar/pull/1030)  
  Improved datastore recovery behavior during runtime failures.

- [Defer clipboard tray screen size lookup until initialization](https://github.com/sugarlabs/sugar/pull/1059)  
  Prevented display related access before proper initialization.

- [Guard runtime GDK display and screen access for Wayland stability](https://github.com/sugarlabs/sugar/pull/1060)  
  Reduced assumptions around display availability and improved backend safety.

## What Surprised Me Most

One thing that surprised me during the bonding period was how deeply connected different parts of the Sugar Shell are internally.

Even small display related changes could affect activity startup behavior, geometry calculations, focus handling, or session initialization in unexpected ways.

It made me realize why desktop environment migration work needs extensive runtime testing instead of only static code changes.

## Runtime Testing and Validation

A major part of understanding Sugar came from testing runtime behavior across different desktop sessions and observing how components behaved during actual Shell usage.

Some of the runtime testing I focused on included:

- Testing Sugar sessions on both X11 and Wayland
- Observing display initialization behavior during Shell startup
- Debugging runtime crashes and session stability issues
- Validating GTK4 migration behavior
- Testing clipboard and Journal interaction flows
- Checking display access assumptions during initialization

## Looking Ahead

For me this project feels much bigger than simply replacing deprecated APIs. A lot of the work involves reducing assumptions that older desktop environments relied on for years.

Sugar has existed for years and seeing it slowly move towards GTK4 and modern Linux systems feels really exciting to me.

I still have a lot to learn but that is one of the most exciting parts of this journey. I am looking forward to contributing more throughout the summer and continuing to learn from the Sugar Labs community.

## Useful Links

- GTK4 Toolkit Library - [sugar-toolkit-gtk4](https://github.com/sugarlabs/sugar-toolkit-gtk4)
- Documentation - [Read the Docs](https://sugar-toolkit-gtk4.readthedocs.io/en/latest/)
- GTK4 Migration Guide - [GNOME Docs](https://docs.gtk.org/gtk4/migrating-3to4.html)
- PyPI Package - [sugar-toolkit-gtk4](https://pypi.org/project/sugar-toolkit-gtk4/)
