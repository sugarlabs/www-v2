---
title: "GSoC '25 Week 06 Update by Nikhil Bhatt"
excerpt: "Implemented commit history viewer and version loading system using Git CLI and new backend routes, enabling seamless time-travel across project states."
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-gsoc-25-nikhilbhatt-week06"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week06,nikhilbhatt,midterm"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 06 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-07-07 – 2025-07-13  

---

## Progress Summary 

The first 6 weeks of GSoC'25 have been a great learning experience. The project is progressing as planned with meaningful improvements every week. <br/>
Our primary focus during this phase was the backend, with some attention to enhancing the user experience. 
- Repository Creation with Ownership Tracking (using a Github app) - ```Github apps``` are safer, and scalable way of dealing with github directly, students can now create repositories directly into a centralised account, with ownership using a key, note that we do not save any user related information.
- Secure Editing Mechanism - even after publishing a project, students are able to edit their projects. Only those having a valid key can now edit their projects, in absence of that key, the project becomes ```read only```.
- Forking with Metadata & History - Projects can be forked easily via the UI. Forked repositories retain original content and metadata,A later upgrade replaced basic copying with full Git CLI–based cloning, ensuring complete ```commit history is preserved```.
- Commit History & Version Time Travel - Users can now select a commit from a UI modal and load the project state at that point. This feature introduces ```reflective-learning``` in students. 
- Pull Request Workflow - an interesting addition to our existing planet based system, students can now contribute back to original projects after forking. The backend logic for this is complete and tested. Frontend integration is currently underway and will allow students to ```submit PRs with minimal effort.```

## A flow chart about the architecture of the project
![Flow chart](assets/Developers/Nikhil/project-flow.png)

 
## This Week's Achievements

### Backend: Commit History & Version Retrieval

To support loading older versions of projects, I implemented two key backend routes using the Git CLI:

- `GET /api/github/commitHistory/?repoName`  
  → Returns a list of all commit SHAs and messages for a given repository.

- `GET /api/github/getProjectDataAtCommit?repoName=""&sha=""`  
  → Accepts a repo name and commit SHA, checks out the commit, and returns the `projectData.json` at that point in history.

Both routes use secure Git Rest API methods.

---

### 💡 Frontend: Modal Interface for Commit Viewer

- Added a modal component that displays when the user clicks **"Show Commits"** from the GitHub dropdown.
- Each commit is rendered as a card showing the commit message, SHA, and a **"Load this version"** button.
- On click, the selected commit is sent to the backend, and the returned `projectData` is loaded using:

---

## Challenges & How I Solved Them

- **Challenge:** GitHub API only returns the latest file in current branch
  **Solution:** Used GET /repos/:owner/:repo/contents/:path?ref=sha to fetch files at a specific commit.

- **Challenge:** Loading project data for specific commits
  **Solution:** Created an end point which takes the commit `sha` and returns the project data for that commit

---

## Key Learnings
- How to use GitHub's REST API to interact with historical commit data.
- How to extract blob data (projectData) from specific commits using SHA.
- Importance of UX when introducing power-user features like history viewing.

---

## Next Week's Roadmap
- Begin work on pull request functionality from forked projects.
- Enable students to raise PRs with metadata describing their changes.
- Explore preview diffs before PR submission.

---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week’s frontend PR features. 

