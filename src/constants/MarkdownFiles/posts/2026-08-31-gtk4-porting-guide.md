---
title: "What I Learned Porting Sugar Activities to GTK4"
excerpt: "A look at the real-world problems and unusual cases I encountered while porting 9 core Sugar activities to GTK4 and Wayland."
category: "DEVELOPER NEWS"
date: "2026-08-31"
slug: "2026-08-31-gtk4-porting-guide"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,wayland,porting"
image: "assets/Images/GSOC.webp"
---

This summer during GSoC 2026, I worked on porting 9 of the core Fructose activities—Calculate, Log, Image Viewer, Chat, Browse, Read, Jukebox, Terminal, and TurtleArt—from GTK3 to GTK4.

If you are looking for the official API changes, the [GNOME GTK4 Migration Guide](https://docs.gtk.org/gtk4/migrating-3to4.html) is still the best place to start. But once I started porting the Sugar codebase, I kept running into weird problems and old code assumptions that aren't really covered in the documentation.

I wrote down the main issues here, hoping it saves the next person some debugging time.

## Quick Reference: GTK3 to GTK4 Replacements

| GTK3 / Old API | GTK4 / New API | Notes |
| :--- | :--- | :--- |
| `Gtk.HBox` / `Gtk.VBox` | `Gtk.Box` | Set orientation explicitly. |
| `Gtk.Table` | `Gtk.Grid` | |
| `pack_start()` | `append()` / `prepend()` | |
| `add()` | `set_child()` | Depends on the container. |
| `Gtk.Toolbar` | `Gtk.Box` + `Gtk.Popover` | Toolbar was removed entirely. |
| `Gtk.IconView` | `Gtk.FlowBox` | Useful with `Gtk.Picture` for scaling SVGs. |
| `button-press-event` | `Gtk.GestureClick` | |
| `key-press-event` | `Gtk.EventControllerKey` | |
| EventBox | `Gtk.GestureClick` / `Gtk.GestureDrag` / `Gtk.GestureZoom` | Use the controller matching the interaction. |
| `modify_bg()` | `Gtk.CssProvider` | Bind strictly to the needed widgets. |
| `Gdk.cairo_set_source_pixbuf` | Convert pixbuf to a Cairo image surface | Convert pixbufs manually. |

## Layouts broke everywhere

The first thing I noticed was that almost every activity layout was broken. The old codebase used `Gtk.HBox`, `Gtk.VBox`, `pack_start()`, and `add()` in many places. Since GTK4 removes those, I spent the first few weeks rewriting the UI code around `Gtk.Box` and `Gtk.Grid`.

In practice, this usually means replacing:

* `Gtk.HBox` / `Gtk.VBox` with `Gtk.Box` (and setting orientation)
* `Gtk.Table` with `Gtk.Grid`
* `pack_start()` with `append()` or `prepend()`
* `add()` with `set_child()` or the appropriate container API

Browse ([PR #141](https://github.com/sugarlabs/browse-activity/pull/141)) was probably the hardest case here. GTK4 removed `Gtk.Toolbar`, which Browse used for most of its navigation. I couldn't just swap in a GTK4 replacement, so I had to rebuild the toolbars using a mix of `Gtk.Box` and `Gtk.Popover`.

I had a similar problem with `Gtk.IconView`, which was also removed. In TurtleArt's sample project picker, I moved to a `Gtk.FlowBox` with `Gtk.Picture` for scaling the SVGs. In Chat's emoji picker, I used a `Gtk.Grid` with `Gtk.Picture` instead.

## Sugar's startup arguments vs. GTK4

Early on, I ran into crashes before my activity code even got to run. It turned out GTK4's `Gtk.Application` automatically tries to parse command-line arguments on startup. Sugar always launches activities with specific internal flags (like `-s` and `-b`), which confused GTK4 so much that it just failed and crashed the process.

I realized I couldn't fix this inside the activities themselves. I had to go into the toolkit ([sugar-toolkit-gtk4 PR #35](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/35)) and patch the application startup to tell GTK to ignore Sugar's arguments.

## CSS bleeding into Jarabe

In GTK3, changing colors while running was usually done with methods like `modify_bg()`. With GTK4, I had to move everything to `Gtk.CssProvider`.

Initially, I just injected the CSS globally for my custom widgets. But because activities run in the same environment as the shell, I quickly realized my styles were affecting other widgets. A global CSS rule for a button in Calculate would suddenly alter the appearance of buttons in Jarabe.

To stop this, I started limiting each CSS provider to the widgets that needed it. For the toolkit's `ToolbarBox`, I created one provider per page, made sure to clean it up when the page was destroyed, and used `sugar4.graphics.style.apply_css_to_widget` to bind it only to the specific widgets that needed it.

## Wayland problems and input handling

Input handling was a problem at first. I removed all the old `button-press-event` and `key-press-event` connections and replaced them with GTK4 event controllers. For GTK4 ports, the usual replacements are `Gtk.GestureClick` for mouse/button events and `Gtk.EventControllerKey` for keyboard input.

In the Image Viewer, I removed the old `EventBox` and `SugarGestures` wrappers and moved to `Gtk.GestureZoom` and `Gtk.GestureDrag` controllers.

Wayland also messed with dialogs. While porting TurtleArt and Read, my popups would either render behind the main window, lose focus, or just fail to appear at all. After debugging it for a while, I realized they needed `.set_transient_for()` and `.set_modal(True)` calls to behave correctly under the Wayland window system.

While testing the UI, I noticed that dragging pages around in `ToolbarBox` left the related `Gtk.Popover` broken. I finally fixed it by clearing the page content (`set_child(None)`) before moving the widget to another parent, rather than destroying the popover itself.

## The DBus null-byte nightmare

This was one of the most unusual bugs I found. When sending preview data over DBus, the binary data kept getting cut off, throwing a random `GLib.Error`. I stared at it for a while before realizing the binary stream contained null bytes inside the data, which DBus was interpreting as string terminators. I had to patch the toolkit to handle binary data properly so the preview wouldn't get chopped off at the first null byte.

## Custom rendering was harder than I thought

Rendering was probably the part I underestimated most. GTK4 removed the old `draw` path, which made the Cairo-based rendering code much harder to fit into the new pipeline.

This wasn't too bad for some of the simpler widgets. In Chat, moving the speech bubbles to `do_snapshot` using `Gtk.Snapshot` and Graphene bounds was fairly simple compared with the old GTK3 drawing code.

But TurtleArt was a completely different story. Its entire architecture is heavily tied to Cairo for drawing the complex block shapes and the canvas itself. I found during debugging that functions like `Gdk.cairo_set_source_pixbuf()` simply don't exist anymore. You can't just use a pixbuf directly with a Cairo context. I had to manually convert the pixbufs to Cairo image surfaces so the old rendering code could work with GTK4. It required touching almost every sprite and block rendering class in the activity.

I had another rendering problem with GStreamer in Jukebox ([PR #35](https://github.com/sugarlabs/jukebox-activity/pull/35)). The old method of grabbing an X11 window handle (`xid`) and passing it to the sink doesn't work on Wayland. I rewrote the video pipeline to use `gtk4paintablesink` connected to a `Gtk.Picture` widget instead.

## Papers and WebKit6 in Read

For the Read activity ([PR #50](https://github.com/sugarlabs/read-activity/pull/50)), the GTK4 port meant dealing with two completely different rendering backends.

First, the old `Evince` backend was no longer usable for GTK4, so I had to move the PDF viewer to its modern successor, `Papers`. The API migration from `EvinceDocument 3.0` to `PapersDocument 4.0` required updating the document adapters (for Comic, Image, and Text) and loading custom Papers CSS locally to ensure it rendered correctly in the Sugar environment.

*A quick warning if you touch this code:* the Table of Contents (TOC) is currently disabled. Papers moved the outline from `GtkTreeModel` to `GListModel`, and `has_document_links()` segfaults on `GListModel` input. It needs a full rewrite of the outline parser.

Second, Read also supports EPUB files, which meant I couldn't just stop at Papers. I had to simultaneously port the EPUB viewer from WebKit2 to WebKit6. Juggling these two massive rendering engines in the same activity made this port significantly more complex.

## Testing (and why I started ignoring Jarabe)

Because the Sugar shell (Jarabe) was undergoing its own massive porting effort at the exact same time, testing my activities inside the shell was incredibly unstable. I'd get a crash and have no idea if my activity caused it or if the shell just broke again.

To make debugging easier, I wrote a `local_run.py` script for almost every activity I ported. This created a minimal `Gtk.Application`, bypassing DBus and Datastore dependencies. If it crashed in `local_run.py`, the bug was on me. If it ran perfectly standalone but crashed in Sugar, I knew I was looking at an issue between the activity and Sugar. Even now that the shell is mostly ported, testing with a local wrapper is just so much faster.

The development environment mattered too. While the Fedora Sugar Live ISO is a great out-of-the-box testing environment, I found Debian 13 (Trixie) much easier for development since it had newer GTK4 packages, including `Papers`, that were missing or outdated in Fedora.

## What I would do differently

Looking back at the 12 weeks, there are a few things I'd change about my approach if I were starting over:

* **Start with a standalone wrapper immediately:** Early on, I wasted so much time trying to debug activities inside the broken shell. Writing `local_run.py` should have been step one.
* **Fix the toolkit first:** Sometimes I tried to hack around toolkit bugs inside the activity itself, only to realize later that the proper fix belonged in the toolkit (`sugar-toolkit-gtk4`).
* **Test Wayland behavior earlier:** I initially did a lot of testing in an X11 environment, which masked the dialog window and popup positioning bugs. Wayland has to be tested as early as possible.
* **Audit dependencies upfront:** I didn't realize Evince was dead in GTK4 until I was already deep into porting Read. Looking closely at dependencies like Evince/Papers or VTE before touching the UI code would have made planning much smoother.
* **Document recurring patterns:** I should have kept a running list of GTK3 → GTK4 replacements (like `modify_bg` → CSS, or `pack_start` → `append`) from week one, rather than finding them again.

After doing all of this, the biggest thing I took away is that the GTK4 port wasn't really about replacing old APIs. A lot of the work was figuring out which assumptions in the old code were tied to X11, GTK3, or the old Sugar shell.
