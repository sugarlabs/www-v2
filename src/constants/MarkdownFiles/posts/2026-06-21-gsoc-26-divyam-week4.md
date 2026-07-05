---
title: "GSoC '26 Week 4: The GTK4 & WebKit6 Migration"
excerpt: "Porting the Browse Activity from GTK3/WebKit2 to GTK4/WebKitGTK 6.0, updating event controllers, and fixing an upstream toolkit bug."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-gsoc-26-divyam-week4"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,browse,webkit6,week4"
image: "assets/Images/GSOC.webp"
---

# Week 4: The GTK4 & WebKit6 Migration

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-15 to 2026-06-21

---

## Introduction

Since Chat and Image Viewer are currently blocked by shell dependencies, I moved on to porting the [Browse activity](https://github.com/sugarlabs/browse-activity) this week. I expected Browse to be another routine GTK4 migration, but once I started touching the WebKit code the scope grew pretty quickly. I had to deal with GTK4, [WebKitGTK 6.0](https://webkitgtk.org/), and the move to `sugar4` all at the same time. 

By the end of the week, the Browse port had grown to 31 commits touching 16 files. Looking back at the commit history, most of the work wasn't anything user-visible. It was mostly replacing old GTK3 patterns and fixing things that broke when moving to WebKit 6.

![Browse Activity in GTK4](/assets/post-assets/browse-main.png "The Browse activity running GTK4 and WebKit 6.0")

## What I Worked On

### GTK4 Container & Widget Migration
More time than I'd like to admit went into updating container code. GTK4 drops a lot of the old layout assumptions, so I spent a while replacing `Gtk.HBox` and `Gtk.VBox` with standard `Gtk.Box(orientation=...)`. 

I also had to swap out old legacy packing methods like `pack_start()` for `append()` and `prepend()`. Since GTK4 shows widgets by default now, I was at least able to clean up and delete a bunch of redundant `show_all()` calls that were scattered everywhere.

### Event Handling & Styling
Most of the event-controller changes were straightforward, but tracking down all the old signal handlers was more tedious than I expected. I replaced traditional signals like `button-press-event` with `Gtk.GestureClick`, and moved the keyboard and focus events over to `Gtk.EventControllerKey` and `Gtk.EventControllerFocus`. Sugar-specific gestures were updated to use `Gtk.GestureLongPress`.

I probably spent more time on a startup segfault than I should have. For a while, I was convinced the issue was somewhere in the GTK4 styling changes, but after tracing the startup sequence, it turned out to be an initialization-order bug with `CssProvider`. I fixed it by purposely delaying the initialization block. 

While I was already touching that code, I replaced the old `Gtk.Window` search popups with GTK4 `Gtk.Popover` widgets, which handles the overlay much better.

![GTK Popover Search](/assets/post-assets/browse-search.png "The new Gtk.Popover search widget successfully highlighting text via WebKit6")

### WebKitGTK 6.0 Integration
I originally expected WebKit 6 to mostly be a dependency bump. Instead, the API changes ended up touching code throughout the activity because several APIs disappeared entirely. 

The change that caused the most churn was the move to `NetworkSession`. A lot of the old cookie and download handling code was built around `WebContext`, so I had to rework several pieces of the activity just to route everything through the new API. I also had to rewrite the JavaScript execution calls to use `evaluate_javascript()` and swap the old Cairo screenshot tool for WebKit’s native `get_snapshot`. Finally, I just dropped all the old `PluginError` and NPAPI code since WebKit 6.0 completely removes support for them.

### Upstream Toolkit Fix
While testing the UI, I kept hitting a confusing `AttributeError: '_title'` crash whenever `Alert.__init__` was called. It turned out that because GTK4 triggers `do_set_property` during construction, variables were being accessed before they were actually initialized. 

I patched this locally in [`sugar-toolkit-gtk4`](https://github.com/sugarlabs/sugar-toolkit-gtk4) by moving the `self._title`, `self._msg`, and `self._icon` declarations to happen *before* the `super().__init__(kwargs)` call. I've opened [PR #32](https://github.com/sugarlabs/sugar-toolkit-gtk4/pull/32) upstream so it can be reviewed and merged.

## Known Issues & Blockers
Testing in standalone mode (`local_run.py`) is still throwing some expected D-Bus errors because the `sugar-datastore` service isn't running. As a workaround, I added a fallback so downloads just save to the local temporary directory when the datastore isn't found.

## What's Next for Week 5
* **UI Polish:** Fix some lingering navigation bugs in the Browse UI.
* **Read Activity:** Start porting the [Read activity](https://github.com/sugarlabs/read-activity) to GTK4, hopefully reusing some of what I learned from Browse.

---

## Acknowledgments
Thanks to my mentors and everyone who helped test things and answer questions while I was working through the Browse port. Hopefully I'll start getting review feedback on the PR next week so I can move on to Read.
