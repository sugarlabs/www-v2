---
title: "GSoC '26 Week 5: Hari - Connecting the Global Planet & Designing Offline Git"
excerpt: "This week I wired up the Music Blocks Global Planet to all eight backend endpoints, got projects showing up with thumbnails and live search, and finalized the design for the offline Git system I'll start building after the frontend is complete."
category: "DEVELOPER NEWS"
date: "2026-06-30"
slug: "2026-06-30-gsoc-26-harihara-vardhan-week-5"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-5,musicblocks,git-backend,express,sqlite,global-planet,offline,indexeddb"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** June 24, 2026 to June 30, 2026

---

## Introduction

Hey everyone! Week five was mostly about connecting things together. After spending the last few weeks building out backend endpoints and testing them with a debug widget, I finally turned my attention to the actual frontend and wired the Global Planet up to the new backend. By the end of the week, projects show up with thumbnails, search works, forking works, and the full publish flow is up and running. I also put together a proper design for the offline Git feature that I'll build once the frontend work is done.

## Wiring Up the Global Planet

The Global Planet is where students browse and remix each other's projects. It was previously talking to the old Sunjammer backend, and this week I replaced that with the new Express + SQLite + GitHub stack.

Here are all the functions I built and what they connect to:

| Function | What it does | Endpoint |
| :--- | :--- | :--- |
| `downloadProjectList()` | Browse with sort, filter, and pagination | `GET /allRepos` |
| `searchProjects()` | Full-text search via SQLite FTS5 | `GET /search` |
| `getProjectDetails()` | Single project metadata with IDB cache | `GET /project/:repoName` |
| `downloadProject()` | Fetch raw project JSON with IDB cache | `GET /getProjectData` |
| `addProject()` | Create new repo, step 1 of publish | `POST /create` |
| `publishProject()` | Set `visible=1`, step 2 of publish | `POST /publish` |
| `editProject()` | Commit updated project to GitHub | `PUT /edit` |
| `forkProject()` | Fork a project on GitHub | `POST /fork` |

Getting these working took more back-and-forth than I expected. The backend was fine, but the old frontend had a lot of assumptions baked in from the previous API: different field names, different pagination structure, different error responses. Rather than patching the frontend everywhere, I adjusted the Express routes to match what the frontend naturally expected. That felt like the cleaner approach since students interact with the frontend directly.

## What's Actually Working

The planet now loads real data. Projects show up with thumbnails, the sort and filter controls work, and the FTS5-powered search is fast. Forking creates a proper GitHub fork under the right owner. Publishing goes through the two-step flow (create, then mark visible), which keeps half-finished projects off the planet.

I've been testing each function one at a time and going through edge cases: what happens with a project that has no thumbnail, what happens if you try to fork something you've already forked, what happens when the token has expired. Most of these were handled without too much trouble. A few needed fixes on the backend side that I pushed through as I found them.

## Planning the Offline Git System

Last week I described the offline problem. This week I turned it into a concrete plan. I'm not building it yet since that's scheduled for after the frontend work is wrapped up, but the design is done so I won't be figuring it out on the fly later.

The idea is simple: **draft offline, sync when online**.

When a student is offline and hits commit, the save goes into IndexedDB as a local draft. Not a fake Git commit, just a structured record with the project state, a message, and a timestamp. When the connection comes back, a sync process pushes those drafts to GitHub in order and creates real commits. From GitHub's side, the history looks normal.

To keep storage under control: up to 10 pending drafts (around 2 MB) before they get auto-merged, and only the last 3 synced commit metadata entries are cached locally. Older history needs the network.

The main pieces to build are:

- `OfflineCommitManager.js` (new) for all draft save and sync logic
- `NetworkMonitor.js` (new) to wrap the browser's `online`/`offline` events
- Updates to `ProjectStorage.js` and `ServerInterface.js` to carry the new fields and offline fallbacks

The plan is written up in full. Building starts once the frontend is in good shape.

## What's Next

Week 6 is finishing the planet-facing frontend and then starting work on the repo creation and commit workflow, the screens a student uses to create a project, write a commit message, and browse their own history. That's the piece that ties the whole backend to something students will actually use.

See you in the next update.
