---
title: "GSoC '26 Community Bonding: Git-Based Backend for Music Blocks"
excerpt: "Moving student creations from a local MySQL database to structured GitHub repositories, bringing version history, ownership, and collaboration to Music Blocks."
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-harihara-vardhan-community-bonding"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,community-bonding,musicblocks,git-backend,version-control"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** Git-Based Backend for Music Blocks  
**Organization:** Sugar Labs  
**Reporting Period:** May 8, 2026 to May 24, 2026

---

## Introduction

Hey, I'm Hari (@zealot_zew), an Information Science undergraduate from Bangalore. This summer I'm working on the Git-Based Backend for Music Blocks with Sugar Labs for GSoC 2026.

Though this was not my first time exploring the Planet infrastructure, since I had already spent time understanding parts of it during the proposal period, the bonding phase gave me a chance to look at it much more deeply.

Planet currently contains 3,085 Music Blocks projects and 2,457 Turtle Blocks projects as of May 23rd. That is 5,547 student creations sitting on a small production server. The more I explored the system, the more I realized this project is not just about migration. It is about preserving student creativity and making these projects feel like they truly belong to the students who created them.

Right now, when a student saves a Music Blocks project, it goes into a MySQL database they will probably never directly interact with again. There is no proper ownership model, version history, or visibility into how their projects evolve over time. My goal is to move these projects onto GitHub repositories while introducing concepts like commits, forks, and version history in a way that feels natural for students.

## Exploring the Infrastructure

One thing I was very careful about during bonding was the fact that I was dealing with a real production server. I did not want to accidentally break anything while experimenting or testing ideas.

At the same time, I was extremely curious about how everything was structured internally. I spent time exploring the database schema, checking tables, comparing project counts with APIs, and understanding how data flows between Planet and the frontend.

A lot of my time went into validating assumptions from my proposal and figuring out whether the architecture I initially designed would still hold up with real production data. Thankfully, most of the core decisions still made sense, which gave me confidence in the direction of the project.

One interesting detail was understanding how project data is actually stored. Project JSON is encoded multiple times before being stored in the database, and thumbnails are handled differently from what I initially expected. Exploring these details early helped me identify where migration failures could happen before touching GitHub APIs.

## Thinking Beyond Migration

Devin Ulibarri’s insights from his everyday classroom experience helped me better understand how students behave and encouraged me to think more from a student’s perspective.

Initially, my proposal was heavily focused on migration and backend infrastructure. But after discussions with my mentors, especially Nikhil Bhatt, I started looking at the project from the perspective of students actually using Music Blocks.

While planning frontend changes and workflows, I kept trying to think like a curious student using the platform for the first time. I constantly asked myself questions like:

* How smooth should saving feel?
* How much friction is acceptable before a student loses focus?
* How can version control concepts fit naturally into the experience without interrupting learning?

That shifted my perspective completely. The project stopped feeling like just a migration problem and started feeling more like building an experience that quietly teaches students ownership, collaboration, and version control while they create projects.

## Discussions With Mentors

One of the most valuable parts of bonding was the architectural discussions with my mentors.

During the proposal period, my project was mainly focused on migration itself. Conversations with Nikhil Bhatt helped broaden the scope toward frontend improvements and student-facing features rather than treating the project as only backend infrastructure work.

I also discussed deployment and migration strategies with Walter Bender. Initially I considered running migration directly on the Sunjammer server, but that quickly raised concerns about production load and long-running scripts on infrastructure already serving live users.

The current direction is to run the migration pipeline on AWS EC2 instead, which is something I am genuinely excited about because it gives me a chance to learn how large migration scripts are handled in real production environments.

Another huge help during bonding was from Ibiam, who helped me get shell access to Sunjammer through SSH and patiently answered many of the questions I had while exploring the infrastructure.

## Migration Challenges

One of the biggest challenges I spent time thinking about was figuring out how migration and backend development would happen in parallel.

The difficult part was deciding when migration should run, how the backend would stay connected with migrated data during development, and how everything would safely come together in production.

Another surprisingly important issue was duplicate projects. Planet contains many projects that are either exact duplicates or slightly modified versions of older saves. Removing duplicates safely became important both for storage and for keeping the migrated ecosystem clean and searchable.

I also spent time thinking about reliability during migration itself. Since the scripts would handle thousands of projects over long-running sessions, I wanted the workflow to safely recover from interruptions instead of restarting everything from scratch.

To reduce unnecessary GitHub API calls during browsing and searching, I also decided to maintain a local SQLite layer for fast metadata access instead of repeatedly querying GitHub directly.

## A Separate Organization for Projects

Another infrastructure decision I made during bonding was creating a separate sibling organization for migrated student projects.

Keeping thousands of student repositories inside the main Sugar Labs organization would eventually clutter the space where the actual source code repositories live. Separating them keeps the development ecosystem cleaner while still making student projects accessible and searchable.

## What’s Next

Coding officially starts now, and I want to move quickly.

The next major goal is finishing the migration pipeline and connecting the backend directly with the migrated GitHub repositories while building APIs for browsing, searching, liking, and loading projects efficiently.

I am especially excited to see projects loading faster globally compared to the current setup running on a single Sunjammer server located far from many users.

More importantly, I want to get this system live as soon as possible so students can start benefiting from proper project ownership, version history, and a smoother experience overall.

See you in the next update.

## Acknowledgments

Huge thanks to Nikhil Bhatt for helping shape the direction of the project during the proposal and bonding period, Walter Bender for the architectural and deployment discussions, and Ibiam for helping me get shell access to Sunjammer through SSH and guiding me during the bonding phase.

Also thanks to the Sugar Labs community for being welcoming from the very beginning.
