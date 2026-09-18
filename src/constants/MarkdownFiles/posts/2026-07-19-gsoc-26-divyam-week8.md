---
title: "GSoC '26 Week 8: Completing the Jukebox Activity GTK4 Port"
excerpt: "Finishing the Jukebox activity GTK4 migration by replacing legacy X11 video embedding with Wayland-compatible paintable sinks, and hardening the playlist architecture."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-gsoc-26-divyam-week8"
author: "@/constants/MarkdownFiles/authors/divyam-agarwal.md"
tags: "gsoc26,sugarlabs,gtk4,jukebox,gstreamer,week8"
image: "assets/Images/GSOC.webp"
---

# Week 8: Completing the Jukebox Activity GTK4 Port

**Project:** [GTK4 Transition Part 1 Fructose](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md)  
**Mentors:** [Krish (MostlyK)](https://github.com/MostlyKIGuess), [Ibiam](https://github.com/chimosky), [Walter Bender](https://github.com/walterbender)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 to 2026-07-19

---

## Overview

This week I ported Jukebox, Sugar's media player. Since it uses GStreamer for both audio and video, I expected the video side to be the trickiest part of the migration.

The core UI, player, and playlist are now ported. The work is available in [Pull Request #35](https://github.com/sugarlabs/jukebox-activity/pull/35).

---

## Core Architectural Migrations

### Video Rendering: X11 to GTK4 Paintable Sinks

The old code rendered video by grabbing an X11 window handle and passing it to GStreamer (`set_window_handle(xid)`). That doesn't work on Wayland — there's no window handle to grab.

I switched the player to use `gtk4paintablesink` with a `Gtk.Picture`. This removes all the X11-specific code and makes the video pipeline work properly with GTK4 and Wayland.

![Jukebox Video Player rendering in GTK4](/assets/post-assets/jukebox-gtk4-video.png "Jukebox Video Player rendering in GTK4")

### Event Handling & Seeking

* **Seek Scrubbing:** The old seek bar paused on mouse-down and resumed on mouse-up, using `Gtk.Scale` press/release events that don't exist in GTK4 anymore. Reworked it around the `change-value` signal with a short debounce, so seeking now happens while dragging.
* **Input Controllers:** Replaced the old `button-press` and `key-press` event handlers with `Gtk.GestureClick` and `Gtk.EventControllerKey`.
* **Object Chooser:** Switched `ObjectChooser` to call `.run()` directly instead of connecting to `Gtk.Dialog` signals that no longer exist.

### UI Containers & Toolbars

* `Gtk.Toolbar` is gone in GTK4, replaced with `Gtk.Box` everywhere.
* `pack_start()`/`add()` → `append()`/`set_child()`.
* Stock icon constants → `Gtk.Image.new_from_icon_name`.

---

## Hardening Playlist Logic

While porting `playlist.py`, I noticed deleting multiple selected tracks could remove the wrong items because rows were deleted in ascending index order. Deleting an earlier row shifts everything after it down by one, so later deletions target the wrong rows. Deleting the selected rows in reverse index order fixes the problem.

I also noticed the "currently playing" index used `0` to mean both "track 0" and "nothing playing." I changed the sentinel to `-1`, added bounds checks (`0 <= index < len(_items)`), and updated the current index correctly when tracks before it are deleted.

These weren't GTK4 issues, but I fixed them while I was already working on the playlist code.

---

## UI Polish and Standalone Testing

* Audio-only files now show the playlist view instead of a blank video pane. The check is delayed by about 500 ms because GStreamer needs a moment to finish negotiating the stream before it knows whether a video track exists.
* `emptypanel.py`'s empty-state background was rendering transparent — wrong CSS class name. Fixed by using the correct `.background-white` CSS class.
* Added a `local_run.py` script for testing Jukebox outside Casilda.

---

## What's Next for Week 9

Next week I'll start porting the Terminal activity. It uses Vte and still relies on several GTK3 event patterns, so I expect another round of event-controller and menu migration work. I'll also keep testing Read and Jukebox inside Casilda as the shell continues to improve.

---

## Acknowledgments

Thanks to Sugar Labs and the GSoC program for the opportunity to work on this, and to everyone in the community keeping Sugar moving forward.
