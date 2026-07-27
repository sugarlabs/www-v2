---
title: "GSoC '26 Week 6: Hari - The New My Project Dropdown, Planet Sync & Bulletproof Persistence"
excerpt: "This week I introduced a new My Project dropdown, synced Git state across contexts via a postMessage bridge, and fixed some tricky local storage bugs for bulletproof project persistence."
category: "DEVELOPER NEWS"
date: "2026-07-07"
slug: "2026-07-07-gsoc-26-harihara-vardhan-week-6"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-6,musicblocks,git-backend,frontend,planet"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** July 1, 2026 to July 7, 2026

---

## Introduction

Hey everyone! Week six was huge for frontend integration and making the Git experience feel like a natural part of Music Blocks. The goal was to bring version control directly into the main editor workspace and ensure that it syncs perfectly with the Planet UI. I also chased down a really annoying data loss bug to ensure local persistence is bulletproof. Let's dive in!

## The New "My Project" Git Dropdown

We introduced a brand new, highly visible "My Project" menu right in the main Music Blocks toolbar. We're using a custom Git branch icon to represent it, and it brings three massive improvements directly to the workspace:

1. **Save Spots (Init):** Students can now initialize their project as a GitHub repository with a single click, completely removing the need to navigate away to the Planet UI first.
2. **Commits:** Students can easily save their progress by making a commit directly from the workspace, allowing them to track their changes over time.
3. **Time Travel:** This is easily my favorite feature so far. We built an interactive timeline panel that fetches the project's commit history in the background. Students can scroll through their past saves and instantly restore older versions of their code directly into the workspace. If any student wants to go back in time, the system will promptly ask if they want to save their current work first.

*The new dropdowns in the main toolbar.*
<img src="/assets/Developers/hariharavardhan/save_spot.png" alt="Create My Save Spot" width="250" /> <img src="/assets/Developers/hariharavardhan/commit_dropdown.png" alt="Commit and Show Commits Dropdown" width="250" />

*The interactive Time Travel timeline. (Still working on the final UI, but it's fully functional!)*
<img src="/assets/Developers/hariharavardhan/timeline.png" alt="Time Travel Timeline" width="500" />

I also used our existing UI modals to keep everything consistent with the rest of Music Blocks. 

## Cross-Context State Synchronization

Because the Planet UI runs inside an iframe, keeping the main toolbar's Git state in sync with the Planet was a major architectural challenge. I built a robust event-listener bridge using `postMessage` to solve this.

Why is this useful? It means that when a user clicks a project in the Local Planet, it securely messages the main window to instantly update the toolbar to reflect that specific project's repo and Time Travel history. Conversely, when a user initializes a repo via the toolbar, it messages the iframe to automatically update the project's name and metadata inside the Local Planet view. Everything stays perfectly in sync without the user ever noticing the boundary between the iframe and the main app.

## Bulletproof Local Project Persistence

This week I tackled a problem I faced during project transitions. Previously, creating a "New Project" could silently wipe the user's active canvas if it hadn't been explicitly named, which caused data loss.

I re-engineered the `activity.js` transition lifecycle to guarantee that the current project is explicitly saved to IndexedDB (`ProjectStorage`) before any new workspace is initialized. No more silently lost code!

## Canonical Thumbnail Generation

Finally, I upgraded the publishing pipeline so that the backend receives an accurate, high-quality snapshot of the block canvas when saving. The frontend now consistently generates and attaches the canvas thumbnail data in the payload before firing it off to the GitHub API, ensuring projects always look great when browsing.

## What's Next?

Next week, my main focus will be on improving the UI and testing everything with mentors and students. I'll also be documenting exactly how all the buttons and features work. The goal is to see if there is any redundancy or to remove any confusion that might happen for users. 

See you next time!
