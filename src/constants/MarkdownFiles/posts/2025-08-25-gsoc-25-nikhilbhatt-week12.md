---
title: "GSoC '25 Week 12 Update by Nikhil Bhatt"
excerpt: "Summarizing my Google Summer of Code project — Git backend for MusicBlocks. Highlights include implementing fork/PR workflows, writing detailed backend + frontend docs, and ensuring future contributors can onboard easily."
category: "DEVELOPER NEWS"
date: "2025-08-25"
slug: "2025-08-25-gsoc-25-nikhilbhatt-week12"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,final,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Google Summer of Code 2025 Final Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Duration:** August 18, 2025 – August 25, 2025  

---

## Project Summary

The goal of my project was to **replace the legacy Planet server** with a modern **Git-backed backend** for [MusicBlocks](https://github.com/sugarlabs/musicblocks). This enables projects to be version-controlled, forked, shared, and collaborated on seamlessly via GitHub workflows.  

I worked on two main areas:  

1. **Backend (Node.js + Express + TypeScript)** — building APIs for `create`, `edit`, `fork`, `commitHistory`, `create-pr`, etc., with GitHub App integration.  
2. **Frontend (MusicBlocks client)** — integrating the new APIs into the user interface, enabling forking, PR workflows, project history browsing, and ZIP downloads.  

Additionally, I created **comprehensive documentation** for both backend and frontend to ensure long-term maintainability.

---

## Major Contributions

###  **Backend Implementation**
- Designed and built APIs for:
  - **Project creation/editing** with Git-backed persistence.  
  - **Forking & fork history tracking**.  
  - **Commit history retrieval** at both project and commit levels.  
  - **Pull request creation & approval workflows**.  
- Added **metadata structures** (`projectData.json`, `metaData.json`) for project state and authentication.  
- Implemented **security checks** and configuration options via `.env`.  
- Wrote tests for major endpoints and validated responses.  

###  **Frontend Integration**
- Integrated backend APIs into the MusicBlocks client.  
- Added UI flows for:
  - Forking a project and tracking its history.  
  - Browsing and restoring older commits.  
  - Creating pull requests from the frontend.  
  - Downloading projects as ZIP archives.  
- Managed **localStorage keys** for state persistence.  
- Ensured smooth transition from legacy server → GitHub workflows.  

###  **Documentation & Developer Experience**
- Wrote **backend README** with setup steps, API docs, environment variables, and deployment instructions.  
- Documented **frontend integration**: API contracts, UI flows, and troubleshooting.  
- Added **manual testing checklist** to validate project workflows.  
- Created a **contributor’s guide** for future developers.  
- Improved onboarding experience with **diagrams, examples, and standardized conventions**.  

---

## Testing & Results

- Verified all API endpoints with **manual tests and Postman collections**.  
- Conducted **end-to-end tests** by linking backend ↔ frontend flows.  
- Confirmed project history, forks, and PRs behave consistently with GitHub repos.  
- Ran multiple **real-world test scenarios** (student forking a project, teacher reviewing PR, restoring commits) — all successful.  

---

## Challenges & Solutions

- **Complex Git workflows** were hard to explain. → I solved this with request/response examples and flow diagrams.  
- **Maintaining parity between backend and frontend** was tricky. → I standardized API naming conventions and cross-referenced docs.  
- **Time management** balancing documentation + coding. → Broke tasks into milestones and focused on one layer (backend/frontend) at a time.  

---

## Key Learnings

- Learned to design **GitHub-integrated APIs** using Node.js, Express, and Octokit.  
- Understood the importance of **clear documentation** as a first-class contribution.  
- Gained experience in **frontend-backend integration** with real-world workflows.  
- Improved skills in **project management and time prioritization**.  

---

## Code & Documentation

- [MusicBlocks Frontend (Branch)](https://github.com/BeNikk/musicblocks/tree/git-musicblocks-frontend)  
- [MusicBlocks Backend](https://github.com/benikk/musicblocks-backend)  
- [API Documentation (Backend README)](https://github.com/benikk/musicblocks-backend/blob/main/README.md) 
- [Final Report](https://github.com/benikk/GSoC-2025) 

---

## Future Work

- Add **CI/CD pipelines** for backend + frontend.  
- Improve **automated testing** coverage.  
- Extend backend for **more Git features** (branching, rebasing, merging).  
- Expand contributor guides with **video tutorials and walkthroughs**.  

---

## Acknowledgments

A big thank you to my mentors **Walter Bender** and **Sumit Srivastava** for their continuous guidance, and to the **Sugar Labs community** for reviews, feedback, and encouragement.  

This project has been an incredible journey — not only building new features, but also ensuring MusicBlocks is more maintainable, collaborative, and future-ready.  

---
