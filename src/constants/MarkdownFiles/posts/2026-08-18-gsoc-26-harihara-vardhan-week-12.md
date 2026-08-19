---
title: "GSoC '26 Week 12: Update by Harihara Vardhan"
excerpt: "In the final week of GSoC 2026, I reworded all user-facing Git terminology for kids, wrote comprehensive test suites across all Git features, and prepped the codebase and database for production deployment."
category: "DEVELOPER NEWS"
date: "2026-08-18"
slug: "2026-08-18-gsoc-26-harihara-vardhan-week-12"
author: "@/constants/MarkdownFiles/authors/harihara-vardhan.md"
description: "GSoC'26 Contributor at SugarLabs working on Git-Based Backend for Music Blocks"
tags: "gsoc26,sugarlabs,week-12,musicblocks,git-backend,testing,ui,deployment"
image: "assets/Developers/hariharavardhan/banner.png"
---

<!-- markdownlint-disable -->

**Project:** [Git-Based Backend for Music Blocks](https://summerofcode.withgoogle.com/programs/2026/projects/JitsF3AX)  
**Organization:** Sugar Labs  
**Reporting Period:** August 12, 2026 to August 18, 2026

---

## Introduction

Here we are at Week 12! It feels unreal that the official coding period for Google Summer of Code 2026 has reached its final week.

Over the past three months, this project evolved from an ambitious proposal to migrate 5,500+ student creations into a full, living Git ecosystem inside Music Blocks. I built the zero-storage migration pipeline, created a fast SQLite search index, implemented offline commit caching, designed the interactive Time Travel timeline, and built an on-canvas tutorial.

Week 12 was all about polish, reliability, and getting everything ready for prime time. I focused on three main goals:
1. Rewording all user-facing language so that version control concepts feel intuitive and friendly for students.
2. Writing comprehensive automated test suites for all the Git features.
3. Making the entire codebase clean and ready for production deployment.

Here is a breakdown of how the final week went down!

## 1. Refining the Language: Making Git Click for Kids

Building powerful Git features is only half the battle. If the terminology feels confusing or intimidating, students will hesitate to use the tools. In educational software, clear words matter just as much as clean code.

During testing and feedback sessions, We noticed that several phrases like "Save Spot", "Repository", or "Fork" either felt too abstract or sounded like developer jargon. We spent time revising the copy across the entire UI, toolbar menus, dialogs, toasts, and the tutorial.

Here is a quick summary of the key shifts I made:

* **Project Tracking over "Save Spots":** Instead of confusing labels like "Create My Save Spot", students now see **"Track my project"**. Toolbars and dialogs clearly explain that tracking turns their project into a personal scrapbook that remembers everything they build.
* **Marking Moments:** I kept **"Mark this moment"** as the core snapshot action and updated the dialog prompts so students understand *why* they are writing a message: to take a snapshot of their work and remember what changed.
* **Clearer Time Travel Actions:** In the history panel, buttons like "Take me here" and "Clear Changes" were replaced with clear, direct actions like **"Go back to this version"** and **"Undo my changes"**. Confirmation dialogs now gently ask students if they want to mark their current moment before traveling back.
* **Remixing instead of Forking:** On the Planet cards, "Fork project" became **"Remix project"**. For young learners making music and art, "remix" is an intuitive concept they already understand from creative culture.
* **Encouraging Tutorial and Notification Copy:** I updated the interactive tutorial slides and completion banners with friendly, actionable guidance, reinforcing that their original work is always safe and encouraging them to experiment without fear of breaking anything.

## 2. Writing Test Suites for Every Git Feature

When managing student data, version histories, and offline synchronization queues, reliability is everything. A dropped commit or broken sync can disrupt a student's creative work.

This week, I wrote automated test suites across all the Git modules:

* `planet/js/__tests__/OfflineCommitManager.test.js`:  
  Tests the offline commit storage, queue size limits (ensuring the 5-commit boundary is enforced safely), deduplication, payload integrity, and auto-sync trigger logic when the network transitions back to online.

* `planet/js/__tests__/GitServerInterface.test.js`:  
  Tests the communication layer with the Express backend, verifying repository creation endpoints, commit pushes, metadata queries, and graceful error handling during network timeouts or server interruptions.

* `js/__tests__/gitDropdown.test.js`:  
  Tests the toolbar dropdown behaviors, checking menu item state toggles, dynamic tooltip updates depending on whether a project is already tracked, and user interactions.

* `js/__tests__/gitTutorial.test.js`:  
  Tests the interactive tutorial overlay, covering slide navigation, keyboard shortcuts (`Escape`, arrow keys), event-driven video start/pause handling, and proper firing of the completion notification.

Having these tests in place gives me complete confidence that everything behaves reliably across different browsers and network conditions.

## 3. Preparing the Codebase for Production

With the tests passing and the UI strings polished, I cleaned up the codebase for deployment:
* Removed temporary debugging hooks and development console logging.
* Verified that error boundaries catch edge cases cleanly without interrupting the core Music Blocks canvas.
* Cleaned up mock data and test repositories so the production environment starts with a pristine state.

## What's Next: The Final Launch Plan

The main coding phase is complete, but there is still exciting work ahead to bring everything across the finish line:

1. **Final GSoC Report:** Write and submit the comprehensive final evaluation report detailing everything built over the summer, complete with architecture diagrams, benchmarks, and documentation.
2. **Backend and Clean Database Deployment:** Deploy the Express backend server alongside a clean SQLite database that contains only real migrated projects, without any leftover test artifacts created during feature development.
3. **The Final Migration Run:** Run the migration pipeline one final time right before the switchover. This will capture every project that was created on the live legacy server between my initial Week 1 migration and today, ensuring not a single student project is left behind.

## Reflections and A Huge Thank You

Seeing this project reach this stage is incredibly exciting. What started as an idea on paper is now a fully functional, kid-friendly Git system that will allow students around the world to track, remix, and preserve their musical and mathematical creations. I cannot wait to see it running live in classrooms and community workshops!

None of this would have been possible without the amazing guidance and support from my mentors. A massive thank you to:

* [Walter Bender](https://github.com/walterbender/): For your visionary architectural feedback, deployment guidance, and constant encouragement throughout every phase of the project.
* [Devin Ulibarri](https://github.com/pikurasa/): For bringing real classroom insights, helping me see the platform through a child's eyes, and guiding the educational design of these tools.
* [Ibiam Chihurumnaya](https://github.com/chimosky): For your patient help with server infrastructure, Sunjammer access, and answering countless technical questions.
* [Nikhil Bhatt](https://github.com/benikk): For pushing me to think beyond just backend migration and helping shape the frontend user experience from the very beginning.

Also, a heartfelt thank you to the entire Sugar Labs community for creating such a welcoming, collaborative space.

Thank you to everyone who followed along with my weekly updates this summer. Stay tuned for the final evaluation report and the official launch!
