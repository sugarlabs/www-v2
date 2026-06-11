---
title: "GSoC '26 Week 2: Chat and Image Viewer Ports"
excerpt: "Porting Chat and Image Viewer activities to GTK4, refactoring touch interactions, and resolving environment execution issues."
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug: "2026-06-07-gsoc-26-divyam-week2"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,wayland,fructose,week2"
image: "assets/Images/GSOC.webp"
---

# Week 2: Chat and Image Viewer

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-01 to 2026-06-07

---

## Introduction
I spent most of this week porting the **Chat** and **Image Viewer** activities to GTK4. Chat took way longer than expected—replacing the containers was fine, but porting the custom `RoundBox` speech bubbles to the new snapshot API was a massive headache. Image Viewer was easier, but ripping out the old gesture system still took some work.

## What I Worked On

### Chat Activity
For the [Chat Activity](https://github.com/sugarlabs/chat), I've been working on a local draft before opening a pull request. GTK4 removes `Gtk.VBox`, `Gtk.Fixed`, and `Gtk.Alignment`, so I had to refactor the whole Chat frontend to use a `Gtk.Box` hierarchy with native margins (`margin-start`, `margin-end`).

![Chat Activity GTK4 Layout](/assets/post-assets/chat-running-1.png "Chat Activity GTK4 port layout")
![Chat Activity Emoji Picker](/assets/post-assets/chat-running-2.png "Emoji Picker with corrected SVG scaling in GTK4")

The `RoundBox` widget for speech bubbles was the main time-sink. Since the `draw` signal is gone, I had to port the logic to the `do_snapshot` API using [`Gtk.Snapshot`](https://docs.gtk.org/gtk4/class.Snapshot.html) and Graphene. I'm still fighting with child margins since the spacing logic here isn't quite the same as the old callbacks. 

I also hit a weird scaling issue with emoji assets. I thought the emoji issue was a CSS problem at first, but it turned out to be GTK4 sizing the SVGs differently, which completely threw off the grid. I ended up downscaling double-resolution `Gdk.Texture` into a `Gtk.Picture` and switching the layout to `Gtk.FlowBox`. Finally, I cleaned up some old styling: replaced `modify_bg` with scoped CSS providers and switched text buffer insertions to `Gtk.TextBuffer.insert_paintable()`.

### Image Viewer Activity
For the Image Viewer Activity ([PR #34](https://github.com/sugarlabs/imageviewer-activity/pull/34)), the work was mostly about ripping out legacy gesture code and fixing the canvas rendering.

![Image Viewer Activity running on GTK4](/assets/post-assets/image-viewer-running.png "Image Viewer running on GTK4 without legacy gestures")

* **Gesture Migration:** Removed `EventBox` and `SugarGestures`. Switched to native `Gtk.GestureDrag`, `Gtk.GestureZoom`, and `Gtk.EventControllerKey` handlers. GTK4 handles touch points naturally, so a lot of the old zoom/pan bookkeeping just went away.
* **Canvas Updates:** Swapped `draw` for `set_draw_func()`, updated the Cairo API callback arguments (`ctx` to `cr`), and ditched all the redundant `show_all()` calls.
* **Toolkit Bug:** Kept hitting a `_buffer` `AttributeError` in `sugar4.graphics.icon.Icon` on a blank canvas. After a lot of tracing, realized the crash wasn't in Image Viewer—it was coming from the icon module whenever colors were set. Patched it and sent the fix upstream to [`sugar-toolkit-gtk4` (PR #31)](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/31).

## Debugging Hurdles and Workarounds
I spent almost as much time fighting my test environment as I did coding.

Since the old `sugar-activity4` wrapper no longer exists, I had to run activities as standalone apps. I wrote a `run_chat.py` launcher, but the window kept vanishing because Python's garbage collector was killing the activity object. Stashing a reference to the object in the script stopped the crash.

Networking was another mess. The Chat UI stays disabled without a network connection, but my cloned VMs had conflicting IDs and were silently dropping multicast packets. I lost a stupid amount of time debugging mDNS with `tcpdump` and `avahi-browse` before realizing the network was the problem—it ended up being embarrassingly simple once I noticed the overlapping MAC addresses. I temporarily added a "developer bypass" flag in `chat/box.py` to force an online state during testing so I could actually see the UI. 

For Image Viewer, I bypassed the journal database by hardcoding a local path via `self.view.set_file_location()` for testing, and wrapped `CollabWrapper` in `try/except` to skip D-Bus session dependencies.

## What's Next for Week 3
* **Debian 13 Environment:** Need to finish the Debian 13 VM setup so my local environment matches upstream. Carrying this over from [Week 1](/news/all/2026-06-01-gsoc-26-divyam-week1).
* **Collaboration Testing:** Once I drop the developer bypasses, I'll test the Chat activity over a real network connection to ensure messages send and receive correctly with the new GTK4 frontend.

---

## Acknowledgments
Thanks to my mentors for helping me work through the GTK4 and environment issues this week. Looking forward to review comments on these drafts once the maintainers get a chance to look through them.
