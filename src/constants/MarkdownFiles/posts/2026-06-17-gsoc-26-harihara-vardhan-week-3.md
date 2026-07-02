---
title: "GSoC '26 Week 3: APIs, Thumbnails & a Database Mystery"
excerpt: "This week I shipped four new API endpoints, solved the thumbnail rate-limit problem using SQLite, and traced a legacy encoding bug back to its roots."
category: "DEVELOPER NEWS"
date: "2026-06-17"
slug: "2026-06-17-gsoc-26-harihara-vardhan-week-3"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-3,musicblocks,git-backend,express,sqlite,typescript,encoding"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** June 11, 2026 to June 17, 2026

---

## Introduction

Hey everyone! Week three is done. It was incredibly interesting because I not only built the remaining backend endpoints and shipped the thumbnail fix, but I also stumbled into a fascinating rabbit hole involving garbled Japanese text and a years-old server misconfiguration.

## The 4 New Endpoints

This week I focused on what happens after a student finds a project. I built four endpoints:

| Endpoint | What it does |
| :--- | :--- |
| `POST /report` | Reports a project to our moderation team |
| `POST /publish` | Makes a project publicly visible on the Planet |
| `GET /thumbnail/:repoName` | Serves the project's thumbnail image from SQLite |
| `GET /download/:repoName` | Proxies a `.zip` download directly from GitHub |

A few things worth highlighting:

**The reporting endpoint** (`POST /report`) creates a unified issue inside a central `mb-moderation` repository every time someone flags a project. The alternative would have been creating issues scattered across 5,000+ individual student repositories, which would make moderation completely unmanageable. Centralizing this into one place makes the community team's lives a lot easier.

**The publish endpoint** (`POST /publish`) flips a project's `visible` flag in SQLite from `0` to `1`, which is what makes it appear on the Planet discovery feed. I have `verifyOwner` middleware sitting in front of it, so there is no way for someone to publish another student's project.

**The download endpoint** (`GET /download/:repoName`) is the one I'm most happy about from an architecture standpoint. Instead of exposing GitHub's raw download URLs directly to the browser (which would leak our implementation details and exhaust API rate limits), the Express server acts as a secure proxy — it fetches the `.zip` from GitHub's servers and streams it straight through to the student's browser. Clean and safe.

## Closing the Thumbnail Loop

In last week's post, I described the thumbnail dilemma in detail. The short version: project thumbnails live inside GitHub repositories, and fetching them per-request during page load would immediately exhaust GitHub's [REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

Last week I was serving placeholder images as a temporary fallback. This week, I closed the loop permanently with two changes:

1. **Backend:** I added a `project_thumbnails` table to our SQLite database. The `GET /thumbnail/:repoName` endpoint reads directly from this table and serves it with a 1-hour cache header.
2. **Frontend:** I added a check in our `ServerInterface.js` adapter. If a project's `hasThumbnail` flag is `false`, the frontend immediately renders the default placeholder. Zero wasted network calls.

Thumbnails now load fast, GitHub's rate limits stay intact, and the SQLite file stays small.

---

## Solving a Years-Old Database Mystery

While testing, I noticed some Japanese project names (like `ドレミの歌`) were displaying as garbled characters (e.g., `ãƒ‰ãƒ¬ãƒŸã®æŒ`) in both the legacy Planet and our SQLite databases.

By comparing timestamps, I realized the corruption had a clear chronological boundary. Something had changed on the Sunjammer server years ago.

### Two Eras of Data

**Era 1: The Buggy Years (older projects)**
When Music Blocks launched, the PHP app connected to MySQL using a `latin1` character set instead of `UTF-8`. When a student saved `ドレミの歌`, the connection misinterpreted and stored it as `ãƒ‰ãƒ¬ãƒŸã®æŒ`. Ironically, because the app read the data back through the same broken connection, the damage accidentally reversed itself. Users saw perfectly fine text.

**Era 2: After the Server Upgrade (newer projects)**
Later, the server was upgraded and the connection was fixed to `UTF-8`. New projects were stored correctly. However, this exposed all the old Era 1 projects. The connection was now reading `UTF-8` properly, so it faithfully handed the garbled bytes to the browser. The mojibake became visible.

### The Recovery Algorithm

To fix this, I wrote a Python recovery function:

1. **Test first:** The script tests if a project name is already clean UTF-8. If it is, it is left untouched.
2. **Reverse the damage:** If it detects `latin1` misinterpretation, it reverses the encoding damage to heal `ãƒ‰ãƒ¬ãƒŸã®æŒ` back into `ドレミの歌`.

By running this across the database, all corrupted project names were healed.

## What's Next?

Next week shifts focus to frontend integration. I will be wiring up the new endpoints to the Music Blocks Planet interface, replacing the legacy API calls.

See you in the next update.
