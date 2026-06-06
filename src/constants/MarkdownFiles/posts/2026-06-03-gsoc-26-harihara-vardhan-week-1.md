---
title: "GSoC '26 Week 1: Migrating 5,500+ Projects to GitHub & SQLite"
excerpt: "Successfully migrated 5,543 legacy Music Blocks projects from MySQL to individual GitHub repositories with a fast SQLite index."
category: "DEVELOPER NEWS"
date: "2026-06-03"
slug: "2026-06-03-gsoc-26-harihara-vardhan-week-1"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-1,musicblocks,git-backend,migration,github,sqlite"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** May 25, 2026 to June 3, 2026

---

## Introduction

Hey again! Coding has officially started, and Week 1 was all about execution. Migrating legacy database stacks to modern, developer-friendly architectures is always full of surprises. As part of my GSoC 2026 project to build a Git-based backend for Music Blocks, I recently completed the migration of the entire database of student-created music and math projects.

I originally estimated that this migration phase would take about four weeks to complete. However, because I put a lot of effort into the research and preparation during the community bonding period, the testing went much faster than expected, and I was able to run the migration much sooner. Finishing this phase early is a huge relief and gives me plenty of time to focus on researching the frontend UI with the students' experience in mind.

Here is the story of how I moved 5,543 projects from a legacy MySQL database on Sunjammer to individual, public GitHub repositories and a fast, portable SQLite index. All migrated projects are now hosted in the dedicated migration organization: [musicblocks-planet](https://github.com/musicblocks-planet). This means the legacy Planet server is no longer a bottleneck, and there is now a safe place for all the projects where they can comfortably stay for a few weeks until they start getting used in real production.

## The Final Numbers

After refining my scripts, cleaning up test artifacts, and executing the pipeline, the final migration results are pretty exciting:

| Status | Count | Description |
| :--- | :--- | :--- |
| **Total database projects** | 5,543 | Total projects processed from legacy Planet MySQL. |
| **Loaded (Successfully Migrated)** | 5,300 | Repositories successfully created on GitHub with metadata and thumbnails, and indexed in SQLite. |
| **Duplicates (Skipped)** | 243 | Content-identical projects (identical SHA-256 blocks) skipped to prevent spam. |
| **Failures (Unrecovered)** | 0 | Every single project was successfully accounted for. |

As part of my post-migration verification, I also successfully purged 113 junk test repositories from the GitHub organization and cleaned up the local index, achieving complete data consistency.

## The Architecture & Why My Expectations Held True

In the early planning stages during the community bonding period, I made several key architectural decisions. Running the migration at scale proved every single one of these hypotheses correct:

### Zero Intermediate Storage (RAM-only Processing)
* **Expectation:** Avoid generating large temporary files on the migration server.
* **Reality:** Each project row was streamed from MySQL, decoded, validated, transformed, pushed to GitHub, and indexed in SQLite entirely in memory in under 5 seconds. I didn't have any temporary disk overhead.

### SQLite as the Social/Search Index
* **Expectation:** SQLite's embedded file database would offer sub-millisecond local reads, eliminating database server overhead and network latency.
* **Reality:** Querying the completed `projects.sqlite` locally takes less than a millisecond. I am using SQLite FTS5 for full-text search, which is incredibly fast and completely avoids the need to run a separate database server.

### The `migration_log.json` Checkpoint System
* **Expectation:** A state-tracking log would make the long-running migration (which took about 7 to 8 hours) completely resumable.
* **Reality:** This was the single most important safety net of the project. Whenever network failures or timeouts occurred, I could just restart the script and instantly skip the projects I had already migrated.

## Key Challenges Faced & Overcome

No major database migration goes completely according to plan. I encountered three major technical hurdles during execution:

### 1. The MySQL Connection Loss (Mid-Stream Timeout)
* **The Problem:** The migration script streams projects from Sunjammer via a secure SSH tunnel. Because I used an unbuffered MySQL cursor, after about 40 minutes, the MySQL connection would drop mid-stream with a `Lost connection to MySQL server during query` error.
* **The Solution:** I built a resilient bash wrapper (`run_migration.sh`) that automatically restarted the Python script whenever it crashed. Combined with the checkpoint system, the script resumed right where it left off, making the whole migration self-healing. I also removed `set -e` in the wrapper so the restart logic could properly handle the Python exit codes.

### 2. The Non-ASCII Project Naming Challenge
* **The Problem:** Many student projects had names using Japanese, Korean, Arabic, or emojis. GitHub repository naming rules only allow alphanumeric characters, hyphens, and periods. When I ran these names through my sanitizer, they were stripped down to empty strings, which caused API errors.
* **The Solution:** I implemented a deterministic fallback rule. If a project name sanitized to an empty string, I defaulted it to `"project"`. If a name collision happened (for example, if multiple projects had non-ASCII names), the script appended the original database project ID to the repository name (like `project-1523987537164737`), guaranteeing unique and valid GitHub names.

### 3. The "Tulip Project" Recovery
* **The Problem:** One specific project (a Japanese "Tulip" project, チューリップ) failed to upload because both the fallback `project` and `project-1523987537164737` names were taken by leftover junk test repositories from previous runs. This was my only permanent failure.
* **The Solution:** I manually purged the legacy test repository `project-1523987537164737` from the Sugar Labs organization, reset the checkpoint status to interrupted, and ran the script again. The retry mechanism immediately picked it up, uploaded it, and successfully populated both the GitHub repository and SQLite database, bringing my unrecovered failures down to exactly 0.

## How Testing Saved the Day

If I had run the migration script in one shot without rigorous testing, I would have run into severe API blocks. Testing helped in two major areas:

* **Dry-Run Verification:** I implemented a `--dry-run` flag which queried MySQL, parsed and decoded JSON payloads, validated schema constraints, and checked for duplicates, all without making any write calls to GitHub or SQLite. This allowed me to verify that my base64 and URI decoding logic worked across 100% of the database rows.
* **The 25-Project Test Batch:** I ran a test batch of 25 projects against a test GitHub organization (`mb-migration-test`). This revealed a crucial detail: GitHub caches deleted repository names for several minutes. If you delete a repository and immediately try to recreate it with the same name, GitHub returns a 422 error. Because I discovered this during testing, I was able to write logic to gracefully handle name collisions and transient caching delays before doing the actual production run.

## What's Next?

With 5,300 repositories live on GitHub and the portable `projects.sqlite` verified and downloaded locally, Phase 2 is complete.

The next step for Phase 3 is to build the TypeScript Express backend endpoints (`GET /allRepos`, `GET /search`, `POST /like`, etc.) and wire them up to read directly from my newly created SQLite index. 

Stay tuned for the next update as I bring the Git-based backend fully online!
