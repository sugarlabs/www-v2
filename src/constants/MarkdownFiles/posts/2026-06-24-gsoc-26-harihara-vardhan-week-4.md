---
title: "GSoC '26 Week 4: Hari - Frontend Testing, Thumbnail Pipeline & an Offline Problem"
excerpt: "This week I completed the remaining Git-facing endpoints, tested them live with a temporary frontend widget, shipped a thumbnail migration pipeline, and discovered a tricky new challenge: offline commits."
category: "DEVELOPER NEWS"
date: "2026-06-24"
slug: "2026-06-24-gsoc-26-harihara-vardhan-week-4"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-4,musicblocks,git-backend,express,sqlite,typescript,offline"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** June 18, 2026 to June 24, 2026

---

## Introduction

Hey everyone! Week four is in the books, and this one was a really satisfying mix of finishing things and discovering new problems. I finally completed all the Git-facing backend endpoints, saw them working end-to-end through the temporary widget in the frontend, and shipped the thumbnail migration pipeline. But just when everything felt like it was coming together nicely, I ran into a problem I hadn't fully thought through. what happens when a student is offline?

## Completing the Git-Facing Endpoints

Over the past few weeks, I've been steadily building out the REST API that connects the Music Blocks frontend to the GitHub-backed repositories. This week, I wrapped up the remaining ones:

| Endpoint | What it does |
| :--- | :--- |
| `POST /createBranch` | Lets a student branch their project to try new ideas |
| `GET /commitHistory` | Shows the full commit log for a project |
| `GET /getProjectDataAtCommit` | Loads a project exactly as it was at any past commit |
| `POST /fork` | Forks another student's project (with or without history) |
| `GET /forkHistory` | Lists all forks of a project |
| `POST /create-pr` | Opens a Pull Request to suggest changes back |

These join the endpoints I built in previous weeks, things like `/allRepos`, `/search`, `/like`, `/publish`, and `/download`. Together, they form the complete API surface that the frontend needs to replace the legacy Planet server entirely.

## Seeing It Work: The Temporary Debug Widget

Building endpoints in isolation is one thing. Seeing them actually work inside the real Music Blocks interface is something else entirely.

To test the new API without waiting for the full frontend integration to be designed and built, I threw together a temporary debug widget, a small, bare-bones UI panel that sits inside the app and lets me trigger every endpoint manually. It's ugly, it's not meant for students, and it'll be removed before anything ships. But it was incredibly useful.

Being able to click a button in the actual app and watch a branch get created on GitHub in real time, or scroll through a live commit history, gave me a lot of confidence that the backend is solid. It also helped me catch a few edge cases I would have completely missed if I'd only been testing with Postman or curl.

## The Thumbnail Migration Pipeline

Alongside the endpoint work, I also shipped the thumbnail migration pipeline. This is a standalone Python tool that pulls all the legacy project thumbnails from the old Sunjammer MySQL database and gets them into the new system cleanly.

The interesting part is that it doesn't just blindly copy everything over. The pipeline streams each thumbnail, analyzes it, and classifies it as either a real image, a blank canvas, or a generic placeholder. Placeholder and blank thumbnails get dropped entirely since there's no point migrating thousands of identical default images. Real thumbnails are hashed and deduplicated before being stored, which keeps the final database size manageable.

It's one of those things that sounds simple on paper but took real effort to get right, especially the classification logic. Some "real" thumbnails were just a single colored pixel, and some "placeholders" had subtle variations that made them look unique at first glance.

## The Offline Problem

Here's where things get interesting. During a discussion about the Git features, Walter raised an important question: what happens if a student is working on a project at home without internet?

Right now, if you're offline, you lose access to all the Git features. No commits, no branches, no history. The project is just a file sitting in your browser. That's fine for casual use, but it defeats the whole purpose of what I'm building. The entire point of this backend is to give students ownership and version history over their work. If that only works when they have a stable connection, a huge chunk of users get left out.

This is the problem I'm tackling this week. The basic idea is to figure out a way to let students make commits locally, even when they're completely disconnected, and then sync those commits to GitHub once they're back online. It's a non-trivial problem. I need to make sure the local history doesn't conflict with remote changes, and that the experience feels seamless rather than confusing.

I'm still in the research and planning phase for this, so I'll have a lot more to share next week once I've landed on a concrete approach.

## What's Next?

This week is all about offline Git support. I'll be researching how to implement a local versioning layer that records commits without a network connection and syncs them back to GitHub when connectivity returns. The goal is to make it invisible to the student. They should be able to commit, branch, and browse history regardless of whether they're online or not.

See you in the next update.
