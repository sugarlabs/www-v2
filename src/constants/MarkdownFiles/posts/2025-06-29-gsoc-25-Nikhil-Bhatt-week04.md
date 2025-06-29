---
title: "GSoC '25 Week 04 Update by Nikhil Bhatt"
excerpt: "Integrated the frontend with the Git backend and enabled project creation, editing, and forking via the UI in MusicBlocks."
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-nikhilbhatt-week04"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week04,nikhilbhatt"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-06-22 – 2025-06-28  

---

## Goals for This Week

- Integrate the frontend with the backend Git routes.
- Enable project creation and editing via UI.
- Build a dashboard to list and manage all projects.

---

## This Week's Achievements

###  Frontend-Backend Integration

I created a dedicated branch in the MusicBlocks repo to begin integrating the Git backend routes.

- Created API calls to interact with the backend for:
  - Creating a new project.
  - Editing an existing one.
  - Forking a project.


###  Create & Edit Projects from UI

Users can now:

- Create new projects from the frontend.
- Edit and update existing ones.

This is made possible by sending project name and data to the backend, which handles Git commit and push operations.

---

###  Project Dashboard

Built a new page to display **all projects** (original and forked) in a list format.

Features include:

- “Open in MusicBlocks” to edit any project.
- “Fork” to create a copy with the current user as owner.
- Display of metadata like project name, fork status, and last updated time.

**All Projects Dashboard**
![All Projects Page](assets/Developers/Nikhil/project-dashboard.png)

---

## Challenges & How I Solved Them

- **Challenge:** Avoiding Git complexity on the frontend.  
  **Solution:** All operations like branch creation, commits, and metadata updates are handled server-side. Frontend only triggers them.

- **Challenge:** Keeping fork lineage visible.  
  **Solution:** Stored original repo metadata inside `metaData.json` of each fork.

---

## Key Learnings

- How to bridge frontend interfaces with a Git-based backend.
- Improved UI/UX by keeping it simple, made it similar to existing planet page for students to learn.

---

###  Fun Debug Moment

Accidentally forked a fork of a fork and ended up with a hilarious recursive repo tree.  
But it confirmed my fork metadata system worked perfectly across multiple levels!

---

## Next Week's Roadmap 

- Build UI to submit pull requests from forks.
- Display list of pull requests and metadata.

---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [GitHub REST API for PRs](https://docs.github.com/en/rest/pulls/pulls)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week’s frontend PR features. 

