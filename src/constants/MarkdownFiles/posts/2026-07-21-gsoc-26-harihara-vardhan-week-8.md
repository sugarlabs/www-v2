---
title: "GSoC '26 Week 8 Update by Harihara Vardhan"
excerpt: "This week the game-style Time Travel timeline is fully implemented and ready for review, I fixed the project renaming key bug, and added a proper 'Start of Project' anchor to the timeline."
category: "DEVELOPER NEWS"
date: "2026-07-21"
slug: "2026-07-21-gsoc-26-harihara-vardhan-week-8"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-8,musicblocks,git-backend,frontend,timeline,time-travel"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** July 14, 2026 to July 21, 2026

---

## Introduction

Hey everyone! Week eight is where a lot of the design work from last week finally became real. The game-style Time Travel timeline is fully implemented and ready for review. I also squashed a tricky bug around project renaming and polished up some edge cases on the frontend. Here is what went down.

## The Timeline is Live

Last week I settled on the game-style layout for Time Travel. This week I built it out completely. The winding dotted path, the colourful circular icons, the "YOU ARE HERE" badge, the "Take me here" buttons. It is all working now and looks exactly like the mockup from week seven.

<img src="/assets/Developers/hariharavardhan/timeline_implemented.png" alt="Time Travel Timeline - Implemented" width="500" />

One thing I added that was not in the original design is a proper **"Where your project started"** anchor at the bottom of the timeline. This is the very first save, and restoring to it brings the project back to the same state as the `add metadata.json` commit on the backend. So instead of students landing in a confusing git-jargon commit, they get a clean, clear starting point labelled in plain English. The start commit now reads "Where your project started" with a small flag icon, and there is a "Take me here" button just like every other stop on the timeline.

The full frontend testing pass is also done. I went through all the corner cases I could think of, including edge cases around empty histories, projects with only one commit, and what happens when a restore is triggered while unsaved changes exist. Everything behaved correctly. The frontend is ready for review.

## Fixing the Renaming Bug

This one had been sitting in the back of my mind for a while. The bug was straightforward once I found it: project keys in local storage were tied to the project's **display name**. That sounds fine until a student renames their project inside Git Planet. The moment they do that, the old keys no longer match the new name, and the project effectively loses its git identity.

The fix was to stop using the project name as the key entirely. Project keys are now tracked using the **GitHub repository name**, which never changes after a repo is created. The repo name is set once, it stays the same regardless of what the student calls their project in the UI. So renaming "My Cool Song" to "Summer Beats" inside Git Planet now does exactly what a student would expect: it just updates the display name. Nothing breaks underneath.

It is a small change on the surface but it removes a whole class of subtle bugs that would have been really confusing to debug later.

## What's Next?

Two big tasks left, and I am genuinely excited about both of them.

The first is **offline git**. The goal is to make the git features work even when a student does not have a GitHub account or an internet connection. This one is going to be interesting to design and build.

The second is a **git lesson plan**. I want to create something that actually teaches students how version control works using the features we have built. Not just "here is a button, press it," but an actual guided experience that helps students understand why saving your work matters, what a commit really is, and how going back in time can save a project.

It has been a great journey watching all of these pieces fall into place. Eight weeks in, and the core git experience is looking really solid. See you next week!
