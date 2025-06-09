---
title: "GSoC ’25 Week 01 Update by Nikhil"
excerpt: "Implemented repository creation via GitHub App, secure key generation, and metadata integration"
category: "DEVELOPER NEWS"
date: "2025-06-08"
slug: "2025-06-08-gsoc-25-Nikhil-Bhatt-week01"
author: "Nikhil Bhatt"
description: "GSoC'25 Contributor at SugarLabs (Git backend for Musicblocks)"
tags: "gsoc25,sugarlabs,week01,Nikhil-Bhatt"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Nikhil Bhatt

**Project:** [Git backend for Musicblocks](https://github.com/BeNikk/git-backend)   
**Mentors:** [Walter Bender](https://github.com/walterbender)   
**Assisting Mentors:** [Sumit Srivastava](https://github.com/sum2it)   
**Reporting Period:** 2025-06-02 - 2025-06-08   

---

## Goals for This Week

- **Goal 1:** Implement GitHub App JWT + Installation Token Authentication
- **Goal 2:** Set Up Repository Creation from Backend 
- **Goal 3:** Write Metadata and Content Files to Repository
- **Goal 4:** Design Backend Folder Structure for Scalability


---

## This Week’s Achievements

1. **GitHub App JWT + Installation Token Auth Flow Implemented**
   - Created a Github app and installed it on a separate organisation account.
   - Implemented JWT generation using App ID and private key.
   - Fetched installation token dynamically to create repositories securely within the GitHub organization.


2. **Created Repositories via Backend with Files**
   - Built an Express-based controller to create repositories inside the organization.
   - On repository creation, wrote three files:
     - `README.md`
     - `projectData.json` (from frontend)
     - `metaData.json` (containing hashed key, theme, and timestamp)


3. **Implemented Unique Ownership via Hashed Keys**
   - Generated a random project key and stored a hashed version in metadata.
   - Only the original key holder (sent to frontend) can perform future edits, ensuring project ownership.


4. **Structured Clean Codebase for Scalability**
   - Organized backend into proper folders: `controllers`, `services`, `utils`, `routes`, `config`, and `types`.
   - Made the repo production-ready with readable service-based architecture.
   - Check the project at [Link](https://github.com/benikk/musicblocks-backend)

5. **Optimized Token Management & Project Creation**
   - Validated rate limits (15,000 requests/hour for GitHub App installation tokens).
   - Each request generates a fresh installation token, no collisions or race conditions observed so far.


---

## Challenges & How I Overcame Them

- **Challenge:** Writing multiple files to a new GitHub repository using Octokit caused noticeable delays
- **Solution:** Batched file uploads with asynchronous control using a loop and base64-encoded content, I plan to imrove it
  by exploring GitHub’s Create a tree and commit API to upload multiple files in a single commit for performance optimization.

---

## Key Learnings

- Deep understanding of GitHub App authentication using JWT + installation tokens.  
- Secure project ownership enforcement using hashing and metadata tracking.  
- Octokit’s repo/file handling APIs and best practices for GitHub integrations.  

---

## Next Week’s Roadmap

-  Add **edit project** functionality: Only owner (with original key) can update content.  
-  Implement **key-based ownership check middleware** to protect sensitive routes.  
-  Allow users to **open GitHub issues** on created repositories via the backend.  


---


## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [BeNikk](https://github.com/BeNikk)
- Gmail: [bhattnik442@gmail.com](mailto:bhattnik442@gmail.com)
- LinkedIn: [Nikhil](https://www.linkedin.com/in/nikhil-bhatt-3b37a0255/)
- Twitter: [Nikhil Bhatt](https://x.com/Be_Nikkk)

---
