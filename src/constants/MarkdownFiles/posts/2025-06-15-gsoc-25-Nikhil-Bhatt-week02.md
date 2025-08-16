---
title: "GSoC '25 Week 02 Update by Nikhil Bhatt"
excerpt: "Implemented edit functionality for project repositories and introduced a forking mechanism for collaborative workflows."
category: "DEVELOPER NEWS"
date: "2025-06-10"
slug: "2025-06-10-gsoc-25-nikhilbhatt-week02"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week02,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Nikhil Bhatt

**Project:** [Git backend for Musicblocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-06-7 – 2025-06-14  

---

## Goals for This Week

- **Implement an edit route** to allow users to update project data securely using hashed keys.
- **Design and implement a forking mechanism** where users can fork existing project repositories into new independent ones.
- **Integrate project origin tracking** in forked repos through metadata.

---

## This Week's Achievements

1. **Edit Project Functionality**
   - Created a secure API endpoint that allows users to update their project repository content using a key-authenticated system.
   - The backend checks the key hash stored in the `metaData.json` before applying any updates.
   - PR: [Edit Project API](https://github.com/BeNikk/musicblocks-backend/commit/1f61a089de7d8dbede2d46a101611133a1190bf6)

2. **Fork Project Repository**
   - Developed a new feature that enables students to fork other students' public projects into their own repositories under the same organization.
   - Forked repositories retain original content (`projectData.json`, `metaData.json`) and include the original repository link in the metadata (`forkedFrom` field).
   - PR: [Fork Feature](https://github.com/BeNikk/musicblocks-backend/commit/d1b7220476dc1fd58c1b38dc59c8a4991871ac45)

3. **Project Metadata Enhancements**
   - Updated the metadata structure to support fork tracking and improve key validation.
   - Ensured consistency between project ownership, fork source, and editing rights.

---

## Challenges & How I Overcame Them

- **Challenge:** Understanding and handling GitHub’s `SHA` and `Base64` requirements when editing file content through the API.  
  **Solution:** Read GitHub API docs and integrated `Buffer.from(...).toString('base64')` and used file `sha` to ensure proper file overwrites.

- **Challenge:** Unsure if re-initializing Octokit and generating a new installation token per request was optimal.  
  **Solution:** Kept this approach for now as each request is stateless and works correctly. Optimization will be explored after baseline features are stable.

---

## Key Learnings

- Learned how to **authenticate and authorize edits** to GitHub repos using hashed keys and GitHub’s content API.
- Understood the internal structure of GitHub forks and metadata handling.
- Improved knowledge of **Octokit**, GitHub APIs, and best practices for writing file content (`projectData.json`, `metaData.json`) to a repo.

---

## Next Week's Roadmap

- Add **pull request functionality** between forked and original projects.
- Improve project listing UI with fork indicators.
- Begin planning for collaborator permissions and PR review workflow.

---

## Resources & References

- **GitHub API Docs:** [REST Reference](https://docs.github.com/en/rest)
- **Octokit:** [octokit/rest.js](https://github.com/octokit/rest.js)
- **MetaData Example:** `metaData.json` includes `hashedKey`, `theme`, and `forkedFrom`.

---

## Acknowledgments

Thank you to my mentors and the Sugar Labs community for guidance and feedback, and to the GitHub community for their detailed API documentation and tooling support.

---
