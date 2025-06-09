---
title: "GSoC '25 Community Bonding and First Week by Krish"
excerpt: "A deep dive into the GTK4 migration journey for Sugar Labs - exploring the challenges, progress, and tooling setup"
category: "DEVELOPER NEWS"
date: "2025-06-04"
slug: "2025-06-04-gsoc-25-mostlyk-community-bonding"
author: "Krish Pandya"
description: "GSoC'25 Contributor working on GTK4 migration for Sugar Labs"
tags: "gsoc25,sugarlabs,gtk4,mostlyk,community-bonding"
image: "assets/Images/GSOC.png"
---


<!-- markdownlint-disable -->

# Community Bonding Period Progress Report by Krish Pandya

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)  
**Mentors:** [Walter Bender](https://github.com/walterbender) , [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky)       
**Organization:** Sugar Labs  
**Reporting Period:** May 15, 2025 till June 4, 2025  

---

## Introduction & About Me

Hey everyone! This is probably going to be my biggest blog post of the GSoC journey haha — and I'm excited to share my thoughts on the GTK4 migration project during the community bonding period and some work done till the first week. I will just give a short introduction—

I'm Krish Pandya aka MostlyK, a B.Tech student in Electronics and Communication Engineering at IIITH. While my degree says ECE, I've found myself gravitating toward robotics, graphics, software , and most imporatant of them all open source development. When I'm not debugging ~~C++~~ (Rust/Python now) code or setting up new linux systems, you'll find me reading philosophy (currently juggling reading Sartre's Nausea and Red Rising), creating music, or tinkering with RISC-V processors. I believe in doing things properly , whether it's writing neat code, understanding the philosophy behind API changes, or setting up development workflows that actually make sense. And writing stuff so coming back , anyone can just give a glance and thank me for writing this, I know my future self is going to read this a lot!

The Sugar desktop environment currently relies on GTK3, which is approaching end-of-life. My mission? Modernize Sugar by completing its migration to GTK4, ensuring long-term sustainability, improved performance, and access to modern UI features. This involves porting the core toolkit (sugar-toolkit-gtk3), porting an activity to GTK4 and making a new activity along with the new features that will be added and testing the changes.

---

## My Approach & Tooling Setup

Before diving into the actual porting work, I spent considerable time setting up an efficient development workflow. Coming from other projects, I knew that having quick way to test my changes, that is currently I just have to build the toolkit first but later on testing , it helps to have a faster way to test stuff, I may even bring out some tmux scripts later down the weeks but as of now the following is enough:

### Development Scripts That Saved My Sanity

I created a couple of shell snippets that became essential during this period:

```bash
# Replace system sugar3 with development version
# This ensures activities use the modified toolkit instead of the old system version
sudo rm -rf /usr/lib/python3.13/site-packages/sugar3;sudo cp -r ./src/sugar3 /usr/lib/python3.13/site-packages/sugar3

# Complete rebuild and install cycle
sudo ./autogen.sh;sudo make clean;sudo make;sudo make install
```

The first script is particularly crucial - it replaces the system's sugar3 package with my development version. Without this, Sugar activities would continue using the old GTK3 toolkit, making it impossible to test the GTK4 migration properly. The second command handles the full build cycle, all these small changes help a lot in the long run. I also knew that because I had to write a lot, I developed my own espanso setup and added stuff like em dashes , en dashes, some template code, and a bunch of stuff that come useful while writing.

### The Work Begins

1. **Started with the obvious**: Updated all `gi.require_version` calls from GTK 3.0 to 4.0
2. **Build system updates**: Modified GIR includes to use Gtk-4.0 and Gdk-4.0
3. **The part to work around**: Dealing with GTK4's opaque structures and API changes

---

## The Challenges & My Thought Process

### 1: GdkEvent Becomes Opaque

This was my first real "welcome to GTK4" moment. In GTK3, you could directly access event fields like `event->type` or `event->grab_broken.keyboard`. GTK4 said "nope!" and made GdkEvent structures completely opaque.

**My approach:**
- Systematically went through each event controller file
- Replaced direct field access with proper accessor functions
- `event->type` became `gdk_event_get_event_type()`
- `event->touch.x/y` became `gdk_event_get_position(event, &x, &y)`

**The human moment:** I'll be honest, this felt tedious at first. But then I realized GTK4's approach actually makes the code more maintainable and future-proof. The accessor functions provide better type safety and clearer intent.

### 2: GDK_GRAB_BROKEN Disappears

The `GDK_GRAB_BROKEN` event type just... vanished. After diving into GTK4 documentation, I learned that GTK4 handles grab management automatically now.

**Solution:** Removed the grab broken handling entirely. Well I am not sure if that's a good choice , let's see what happens next week, if we have to come here!
### 3: Goodbye GdkPoint, Hello Custom Structures

GTK4 removed the `GdkPoint` structure that Sugar was using. So naturally, I created a custom `SugarPoint` structure:

```c
typedef struct {
    double x;
    double y;
} SugarPoint;
```

**The learning:** Sometimes migration isn't just about updating APIs, it's about understanding when to create your own abstractions.

---

## Current Progress Snapshot

Here's where things stand after the community bonding period:

### Completed
- Updated all `gi.require_version` calls to 4.0 in Python files
- Updated import statements across the codebase
- Fixed build system GIR includes (Gtk-4.0, Gdk-4.0)
- **Fixed GdkEvent opaque struct access** in sugar-event-controller.c
- **Migrated all event controllers** to GTK 4 event handling
- **Created and implemented SugarPoint** structure to replace GdkPoint

### In Progress
- Hunting down remaining 3.0 version references (they're sneaky!)
- Fixing eggaccelerator errors (legacy code is fun, right?)

### Next on the Roadmap
- Replace GtkToolbar with GtkBox
- Migrate GtkEventBox to GtkWidget + EventControllers
- Update GtkContainer usage to new child management APIs
- Convert draw() methods to snapshot()
- Update size request/allocation APIs

---

## Key Learnings & Insights

This period taught me that migration projects are as much about understanding the philosophy behind changes as they are about updating code. GTK4 isn't just GTK3 with new version numbers,  it represents this shift toward:

- Better memory safety with opaque structures
- Cleaner event handling with dedicated controllers
- Modern rendering with the snapshot model

 The most valuable skill I've developed is learning to read the porting doc, and understand where to add my own implementation or follow the documentation. I try to reason my changes, so most of the time I am trying to argue to myself why this change compared to something else.

---

## Resources & References

- Project Page – [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- Sugar Toolkit Repository(original) – [sugar-toolkit-gtk3](https://github.com/sugarlabs/sugar-toolkit-gtk3)
- Draft PR ( on the gtk4 repository ) – [Initial GTK4 Migration Work](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/1/)
- GTK4 Migration Guide – [docs.gtk.org/gtk4/migrating-3to4.html](https://docs.gtk.org/gtk4/migrating-3to4.html)

---

## Acknowledgments

Huge thanks to Walter Bender for the guidance during this exploration phase, and to the Sugar Labs community for maintaining such well-documented code. I will be contacting other Mentors for their guidance as well and to know their thoughts!.

---

## Connect with Me

- GitHub:[@mostlykiguess](https://github.com/mostlykiguess)
- Email:[krishpandya93@gmail.com](mailto:krishpandya93@gmail.com)
- LinkedIn:[Krish Pandya](https://www.linkedin.com/in/krish-pandya-020aaa261/)
- Mastodon:[@mostlyk](https://mastodon.social/@mostlyk)

Looking forward to sharing more updates,


---
