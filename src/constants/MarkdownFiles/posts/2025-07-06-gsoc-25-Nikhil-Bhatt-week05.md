---
title: "GSoC '25 Week 05 Update by Nikhil Bhatt"
excerpt: "Implemented historical forking using Git CLI to preserve commit history and securely update metadata for downstream workflows."
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-gsoc-25-nikhilbhatt-week05"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week05,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-06-29 – 2025-07-06  

---

## Goals for This Week

- Investigate and solve the issue of missing commit history in forked repositories.
- Switch from GitHub API–based file copying to full repo cloning with Git CLI.
- Ensure `metaData.json` updates include a new hashed key and get committed to the fork.
- Maintain clean repo history and secure edit permissions for each forked project.

---

## This Week's Achievements

###  Switched to `forkWithHistory` via Git CLI

Previously, when users forked a project, only the latest files (`projectData.json` and `metaData.json`) were copied into a new repository via GitHub's REST API. This approach **did not preserve commit history**, making it impossible to trace past changes.

To fix this:

- I implemented a new backend function `forkWithHistory()` using `git clone`, `git remote`, and `git push` with a Personal Access Token (PAT).
- This ensured that **full commit history is retained** in forked repositories.
- Each fork gets its own hashed key securely stored in the updated `metaData.json`.

- Commits now reflect actual history  
- Forks maintain lineage via `forkedFrom` metadata  
- All content and hashes are committed and pushed as part of the first commit

---

### 🔐 MetaData Commit Confirmation

- I ensured that after updating the hash and `forkedFrom` link, the file is committed and pushed using Git CLI commands (`git add`, `git commit`, `git push`).
- The Git identity is explicitly set for the commit using:

---

## Challenges & How I Solved Them

- **Challenge:** Missing commit history in GitHub API forks  
  **Solution:** Switched to using Git CLI and a service account PAT to clone and push the entire repository.

- **Challenge:** Rate Limits with PATs  
  **Solution:** We're currently using a single org service account PAT. The rate limits (5,000 requests/hour) are more than enough for current needs, but we may consider switching to app-based or scoped PATs if traffic scales up.

---

## Key Learnings

- Learned how to automate git commands securely in Node.js (using child_process.execSync).
- Understood the limitations of GitHub’s REST API for repo-level history and collaboration.

---

## Next Week's Roadmap 

- Discuss and analyse possible downsides of the current approach, ensuring good fallbacks 
- Create a commit history feature students can see how their project evolved with time

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week’s frontend PR features. 
