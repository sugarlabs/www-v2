---
title: "GSoC '26 Week 2: Supercharging Planet with a SQLite & Express Backend"
excerpt: "Bringing instantaneous search and discovery to Music Blocks by replacing legacy APIs with a lightweight Express backend."
category: "DEVELOPER NEWS"
date: "2026-06-10"
slug: "2026-06-10-gsoc-26-harihara-vardhan-week-2"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-2,musicblocks,git-backend,express,sqlite,typescript"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** June 4, 2026 to June 10, 2026

---

## Introduction

Hey everyone! Week two of coding is a wrap, and I'm thrilled to share what I've been working on. If last week was all about moving our massive library of student projects over to GitHub, this week was about making sure students can actually find and interact with those projects faster than ever before. 

The old Planet server did its job, but as the community grew, it started to feel a bit heavy. My goal for this week was to cut that overhead entirely. I set out to build a standalone, lightning-fast Express and TypeScript API to serve as the new backbone for Music Blocks. 

By building on top of the excellent groundwork laid by Nikhil, I was able to connect my new Express backend directly to the embedded SQLite database I generated during the migration. The result is a system that strips away the bloat of traditional database servers and delivers exactly what the app needs, instantly.

## The New Endpoints

To make the SQLite database accessible to the frontend, I built a set of lightweight APIs. I wanted to keep things simple, fast, and highly targeted. Here are the core endpoints I implemented:

* **`GET /allRepos`**: Powers the main discovery feed. It handles dynamic sorting (by recent, most liked, etc.) and topic filtering natively in SQLite. Most importantly, it uses database-level pagination to keep bandwidth and memory consumption extremely low.
* **`GET /search`**: Replaces slow standard queries with an embedded search engine. By using SQLite's [FTS5 extension](https://www.sqlite.org/fts5.html), it instantly parses search terms and returns highly relevant results ranked by accuracy.
* **`GET /project/:repoName`**: The deep-dive tool for individual projects. When a student shares a direct link to their creation, this endpoint fetches the exact metadata instantly without having to scan the whole database.
* **`POST /like` & `GET /likes/:repoName`**: Handles the social side of Planet. These endpoints allow users to quickly drop a like on a project and fetch live engagement stats.

## Experiencing the Speed 

These new APIs are a massive upgrade over the legacy Planet APIs. Music Blocks can now rely on a robust, modern infrastructure that doesn't buckle under load. 

Testing these endpoints with a temporary frontend showed me just how transformative this architecture really is. The new Planet interface feels incredibly snappy. You have the same interface and the same options, but the lag is completely gone. You'll never have to hit reload to fetch projects or stare at endless loading spinners again. Searching and filtering happen instantaneously, making the whole platform feel incredibly responsive.

## Infrastructure Struggles: The Thumbnail Dilemma

One of the most interesting infrastructure challenges I hit this week was figuring out how to handle project thumbnails.

In the new Git-based architecture, project thumbnails are stored as image files directly inside each project's GitHub repository. While this is great for data ownership, it creates a massive bottleneck for the discovery feed. If the server tries to make a GitHub API request to fetch the thumbnail for every single project as they load, we would instantly hit [API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), and the loading times would be completely unacceptable.

I briefly considered storing the thumbnail images directly inside the [SQLite](https://www.sqlite.org/index.html) index as [base64 strings](https://en.wikipedia.org/wiki/Base64) to make fetching them instantaneous. However, I quickly realized this would compromise the entire architecture. A core design goal is keeping the SQLite file portable and lightning-fast; injecting thousands of images into it would bloat the database from a few megabytes to potentially gigabytes, ruining our sub-millisecond read times.

For now, projects are gracefully falling back to default Music Blocks placeholders.

## What's Next?

With the high-speed discovery layer in place, my next major goal is to refine the existing Git-based API. I'll be working on solidifying the backend's direct connection to Git to ensure that reading from and writing to the student repositories is just as seamless. 

Additionally, to solve the thumbnail dilemma, I will be building out a dedicated `GET /thumbnail/:repoName` endpoint utilizing a lazy loading strategy:

* **Client-Side Lazy Loading:** The frontend will only request thumbnails from the server when a user physically scrolls the project card into view on their screen, preventing massive spikes in network requests.
* **Backend Proxying:** Instead of exhausting GitHub API limits, the new Express endpoint will act as a proxy, fetching the images from GitHub's raw CDN and streaming them to the client.
* **Aggressive Caching:** The backend will attach strict [`cache-control` headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), forcing the user's browser to cache the images locally.

This approach ensures our SQLite database remains incredibly fast and our GitHub API limits stay intact, all while delivering a seamless, visual browsing experience for the students.

Thanks for reading, and see you in the next update!
