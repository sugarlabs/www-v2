---
title: "GSoC '26 Week 9 Update by Harihara Vardhan"
excerpt: "This week offline git landed in Git Planet. Students can now commit up to five times without internet, see pending syncs right on the timeline, and have everything pushed to GitHub automatically when they come back online."
category: "DEVELOPER NEWS"
date: "2026-07-28"
slug: "2026-07-28-gsoc-26-harihara-vardhan-week-9"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-9,musicblocks,git-backend,offline,offline-git,sync"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** July 21, 2026 to July 28, 2026

---

## Introduction

Hey everyone! Week nine was the offline git week. I teased it at the end of last week's post, and this week I actually got it working. Here is how it came together.

## Offline Git is Working

The goal was straightforward: students should be able to save their work with git even when there is no internet connection. This covers a few real scenarios. Sometimes students are on a slow or unreliable network. Sometimes the Sunjammer backend goes down for maintenance or gets hit with a lot of traffic at once. In either case, the git features should not just stop working.

When a student creates a new project, they can set it up as a local repository. From there, committing works exactly like it does with a GitHub-backed project. The commits are stored in the browser using local storage, and each one saves a full snapshot of the project so the Time Travel feature keeps working normally. Students can make up to five offline commits per project.

When the connection comes back, the app detects it and pushes all the pending commits to GitHub automatically, in the right order. The student does not have to do anything. Their full commit history ends up on GitHub just as if they had been online the whole time.

## The Pending Sync Badge on the Timeline

I wanted to make sure students always know which commits have been pushed to GitHub and which ones are still waiting. A student should not have to guess whether their work is saved on the internet or only in the browser.

So I added a **SYNC PENDING** badge to the Time Travel timeline. Each offline commit appears on the winding path with an amber hourglass icon and an orange label that says "SYNC PENDING". When a commit syncs successfully, the badge clears and the icon updates to look like the rest of the timeline.

<img src="/assets/Developers/hariharavardhan/offline_commits_pending.png" alt="Time Travel timeline showing four offline commits each labelled SYNC PENDING" width="500" />

## Why Five Commits?

Local storage space is limited and varies across browsers and devices. Music Blocks projects can be pretty big, and saving a full snapshot for every commit adds up quickly. Five commits felt like the right balance: enough history to be genuinely useful, not so much that storage becomes a problem. It is a starting point, and it can always be revisited once there is real usage data to work with.

## Edge Cases Still to Handle

The core flow is working well, but there are still some edge cases to sort out. What should happen if a student tries to make a sixth commit when the queue is already full? What if the sync fails halfway through? What if the page is refreshed while a sync is in progress? These are all things I need to handle properly before the feature is ready to ship.

## What's Next?

Next week is about fixing those edge cases and getting the offline git feature into a finished state. After that, the focus shifts to deployment: a full end-to-end test pass, cleaning up any leftover rough edges in Git Planet, and getting everything ready to hand off.

Nine weeks down. See you next week!
