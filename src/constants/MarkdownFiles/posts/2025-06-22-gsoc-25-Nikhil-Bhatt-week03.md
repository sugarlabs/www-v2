---
title: "GSoC '25 Week 03 Update by Nikhil Bhatt"
excerpt: "Set up backend routes for creating and viewing pull requests on MusicBlocks project repositories."
category: "DEVELOPER NEWS"
date: "2025-06-17"
slug: "2025-06-17-gsoc-25-nikhilbhatt-week03"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week03,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-06-15 – 2025-06-21  

---

## Goals for This Week

- Add backend support for creating pull requests when someone edits a forked project.
- Allow project maintainers to view all incoming pull requests to their original project repo.
---

## This Week's Achievements

1. **Created Pull Request Route**
   - Built a route where students who forked a project can submit updates.
   - The backend automatically creates a **new branch on the original repository**, updates the `projectData.json`, and creates a pull request from that branch to the main branch.
   - We use the original repository info stored in `metaData.json` of the forked project.
   - Only two values are required from the frontend: the name of the fork repo and the updated `projectData`.

2. **View All Pull Requests Route**
   - Added another route that **lists all open pull requests** for a given repository.
   - Maintainers can use this to preview incoming contributions.
   - In the future, clicking “merge” on the frontend will trigger the same `edit` route we already have, safely updating the project.

---

## Challenges & How I Overcame Them

- **Challenge:** GitHub’s API does not allow opening pull requests between two repos in the **same organization** (which is our setup for MusicBlocks).  
  **Solution:** Instead of trying to PR from a forked repo to the original, we create a **new branch directly in the original repo** and update content from the backend. Then we make a PR from that new branch to `main`.

- **Challenge:** Figuring out the cleanest flow with the least frontend involvement.  
  **Solution:** Used the backend to handle metadata extraction, branch creation, commit, and PR creation automatically, so the frontend only needs to pass minimal data.

---

## Key Learnings

- Understood GitHub's limitations when working with forks in the same organization.
- Learned how to manage pull request creation with custom branches and automated commits.
- Improved backend architecture by centralizing logic and reducing frontend responsibility.

---

### An interesting problem to solve

Currently, since all project repositories (original and forks) are created under the same GitHub organization using a central GitHub App, all commits and pull requests appear to be made by the original repo,and since our setup is such that we create Pull request through a branch in the original repository (We cannot do that from a repo in the same org account) we cannot keep a track of which fork's commit was merged. 

Workaround

As a workaround, fork project's details can now be stored in the `metaData.json` of each forked project. When viewing pull requests via the custom route, this data can be used to show who contributed what.


## Next Week's Roadmap

- **Start frontend development**: Add interfaces for users to view, submit, and merge pull requests.
- Add UI indicators for forked projects and pull request status.
- Improve display of `projectData` in pull request previews.

---

## Resources & References

- **GitHub PR API Docs:** [docs.github.com/rest/pulls](https://docs.github.com/en/rest/pulls/pulls)
- **Octokit REST Library:** [github.com/octokit/rest.js](https://github.com/octokit/rest.js)
- **Backend Repo:** [musicblocks-backend](https://github.com/benikk/musicblocks-backend)

---

## Acknowledgments

Big thanks to my mentors and the Sugar Labs community for their guidance and patience. Also grateful to GitHub’s documentation which helped solve tricky API issues.

---
