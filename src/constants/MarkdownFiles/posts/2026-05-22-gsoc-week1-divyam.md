---
title: "Kicking off GSoC 2026: Modernizing the Sugar Desktop with GTK4"
excerpt: "A deep dive into the GTK4 migration journey for the Fructose suite, bypassing the legacy shell, and Week 1 progress."
category: "DEVELOPER NEWS"
date: "2026-05-22"
slug: "2026-05-22-gsoc-26-divyam-community-bonding"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
description: "GSoC 2026 Contributor working on GTK4 Transition Part 1 Fructose for Sugar Labs"
tags: "gsoc26,sugarlabs,gtk4,wayland,fructose,community-bonding"
image: "assets/Images/GSOC.webp"
---

### Introduction & About Me

Hey everyone! 

I'm excited to share that I'll be participating in Google Summer of Code 2026 with Sugar Labs, and this post marks the beginning of my journey throughout the program.

I'm Divyam Agarwal, a first-year undergraduate at [Delhi Technological University (DTU)](https://www.dtu.ac.in/). While my major is officially Production and Industrial Engineering, my real passion has always been systems engineering and the collaborative nature of open-source development. Transitioning to university life and living in the campus hostels has been a major shift, but one thing has remained constant: my enthusiasm for building and breaking down software. Whether it's debugging C and C++ programs, writing Python, or exploring Linux internals, I love figuring out how complex pieces fit together. 

Over the past few months, I've been actively contributing to Sugar Labs. By working across multiple repositories and diving into the ongoing GTK4 migration effort, I've gained incredible hands-on experience with the Sugar codebase, the intricacies of GTK, and the reality of Wayland-related challenges.

### The Mission: Fructose & GTK4

This summer, I'll be working on [GTK4 Transition Part 1: Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#gtk4-transition-part-1-fructose).

With GTK3 approaching end-of-life, modernizing core Sugar activities for a GTK4 and Wayland-based future is critical. My work will involve porting heavy-duty activities like Calculate, Log, and TurtleArt to GTK4, updating legacy APIs, and helping establish a smoother architectural path toward the broader desktop transition.

Through this blog series, I'll be documenting my progress, technical discoveries, and the raw challenges of contributing to a massive open-source ecosystem. Stay tuned for future updates!

---

### My Approach & Tooling Setup

Before diving straight into replacing `gi.require_version` calls, I realized I needed a frictionless way to actually test my UI layout changes. 

Thanks to the incredible groundwork laid by Krish in his previous GSoC project, we already have the experimental GTK4 Sugar Toolkit available to build on. However, the legacy Jarabe shell remains a massive bottleneck for iterative development. If you try to run a newly ported Fructose activity inside the full environment, the older DBus dependencies and legacy shell architecture will fight you. You end up debugging the environment instead of your Wayland UI.

**The Solution: The Standalone Wrapper**

To bypass the shell entirely, I built a custom `main.py` testing wrapper. Instead of launching the full desktop, this script artificially sets up the required Sugar environment variables and leverages the new GTK4 toolkit to completely isolate the activity. 

It acts as a mock shell, instantiating the application directly so I can test my tier-based migrations in a clean, standalone Wayland window:

```python
# A simplified look at my standalone Calculate testing wrapper
import os
import gi
gi.require_version("Gtk", "4.0")
from gi.repository import Gtk, Gdk

# 1. Spoof the standalone Sugar environment to bypass the Jarabe shell
os.environ.setdefault("SUGAR_BUNDLE_ID", "org.sugarlabs.Calculate")
os.environ.setdefault("SUGAR_ACTIVITY_ROOT", os.path.expanduser("~/.sugar/default/org.sugarlabs.Calculate"))

from sugar4.activity.activityhandle import ActivityHandle
from calculate import Calculate

def on_activate(app):
    # 2. Inject a mock ActivityHandle directly into the GTK4 toolkit
    handle = ActivityHandle(activity_id="calculate-local", object_id="calculate-local")
    
    try:
        # 3. Launch the fully isolated Wayland activity
        win = Calculate(handle)
        app.add_window(win)
        win.present()
    except Exception as e:
        print(f"Failed to launch activity: {e}")
        app.quit()

app = Gtk.Application(application_id="org.sugarlabs.Calculate.local")
app.connect("activate", on_activate)
app.run(None)
```

This single script has saved me hours of debugging. Instead of running a full build cycle just to see if a `Gtk.Box` layout rendered correctly, I can test my Fructose migrations instantly in pure isolation. 

---

### The Challenges & My Thought Process

While the standalone wrapper solved the immediate problem of DBus blocking, it introduced a new challenge regarding UI fidelity. 

**The Missing `sugar-artwork` Theme**

Because the wrapper bypasses the Jarabe shell entirely, it also bypasses the global `sugar-artwork` GTK theme injection. When I run a ported activity like Calculate via `main.py`, the UI appears minimal and falls back to the default GTK4 Adwaita styling. 

At first, I considered artificially injecting custom CSS or simulating Sugar-specific styles directly into the wrapper to make it look "correct" during testing. However, I realized that would be an anti-pattern. 

By relying strictly on GTK4 defaults during standalone testing, the Fructose codebase remains completely theme-agnostic. This ensures that I am not inadvertently hardcoding non-compliant styling, and guarantees that the activities will correctly inherit the official Sugar theme once they are eventually integrated back into the actual Wayland-based shell.

---

### Current Progress & Roadmap

Here is a quick look at where things stand as we officially kick off the coding period:

**Current Progress**

* **Standalone Testing:** The `main.py` wrapper is functional and successfully bypassing the Jarabe shell for isolated Wayland testing.
* **Pre-GSoC Ports:** The bulk of the widget-level API migrations for both the Calculate and Log activities were completed prior to the community bonding period.

**Next on the Roadmap (Week 1 Focus)**

My immediate goal is to finalize the architectural blockers for Calculate and Log so they are fully stable on GTK4:

* **Calculate Activity:** Rewriting the `svgimage.py` rendering pipeline to use `Gdk.Texture` instead of legacy pixbufs, and fixing the broken graph clipboard export functionality.
* **Log Activity:** Resolving Python 3.8+ runtime crashes caused by removed `time.clock()` calls, replacing insecure `os.popen()` usage with the modern `subprocess` module, and swapping hardcoded widget dimensions for display-aware proportional layouts via `Gdk.Display` monitor APIs.

---

### Acknowledgments

A huge thanks to my mentors, Krish Pandya, Ibiam Chihurumnaya, and Walter Bender , for their guidance, and to the wider Sugar Labs community for maintaining such a welcoming ecosystem. 

I'll be sharing another update next week once these initial ports are finalized. Let the coding period begin!