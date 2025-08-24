---
title: "GSoC '25 Week 11 Update by Nikhil Bhatt"
excerpt: "Focused on writing detailed backend and frontend documentation for MusicBlocks, improving developer onboarding and API clarity."
category: "DEVELOPER NEWS"
date: "2025-08-17"
slug: "2025-08-17-gsoc-25-nikhilbhatt-week11"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week11,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-08-11 – 2025-08-17  

---

## This Week's Achievements

This week was heavily centered on **documentation** for both the backend and frontend of MusicBlocks. The goal was to make the project easier to understand, set up, and contribute to for future developers.

### **Backend Documentation**
- Wrote a comprehensive README detailing the backend's purpose, high-level design, and tech stack (Node.js, Express, TypeScript).
- Documented **all API endpoints** with request/response examples:
  - `create`, `edit`, `fork`, `forkHistory`, `create-pr`, `openPR`, `commitHistory`, `getProjectData`, etc.
- Added detailed **setup and configuration instructions**, including GitHub App requirements and `.env` variables.
- Described **metadata file structure** (`projectData.json`, `metaData.json`) and their role in authentication and PR workflows.
- Included **security best practices** and notes for production readiness.
- Added developer instructions for **building, linting, and running tests**.

### **Frontend Documentation**
- Created a dedicated guide explaining **how the frontend integrates with the Git-backed backend**.
- Documented **UI flows** (initialize repo, push changes, fork, browse projects, download ZIPs).
- Mapped out **frontend API contracts**, including expected shapes for `getProjectData` vs `getProjectDataAtCommit`.
- Described **localStorage keys** used by the frontend and their purpose.
- Added **manual test checklist** and troubleshooting tips.
- Clarified **legacy Planet server** replacement strategy and GitHub-based workflows.

### **Developer Experience Improvements**
- Consolidated documentation into a structured format, covering both **high-level workflows** and **low-level API details**.
- Added diagrams and examples to reduce ambiguity for new contributors.
- Made the docs self-contained: anyone can now set up backend + frontend and understand the full flow without tribal knowledge.

---

## Challenges & How I Solved Them

- **Challenge:** Explaining complex Git-backed workflows clearly for both backend and frontend.  
  **Solution:** Used request/response examples, flow diagrams, and separated sections for quick starts vs deep dives.

- **Challenge:** Ensuring documentation reflects **actual code behavior** accurately.  
  **Solution:** Verified each API contract and frontend integration manually, creating a **manual test checklist** to validate workflows.

- **Challenge:** Maintaining consistency between backend and frontend docs.  
  **Solution:** Standardized naming conventions and cross-referenced related sections in both documentation sets.

---

## Key Learnings

- Writing clear, detailed documentation is as impactful as writing code — it **lowers the barrier to entry** for future contributors.
- Learned how to **document APIs effectively**, including authentication flows, request shapes, and edge cases.
- Realized the importance of documenting **project history and future improvements**, making the project more maintainable.

---

## Next Week's Roadmap

- Collect feedback from mentors and community on the documentation usability.
- Add **deployment and CI/CD guides** for backend and frontend.
- Continue refining contributor guides (including coding standards and PR workflows).

---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [octokit GitHub SDK](https://github.com/octokit/octokit.js)
- [JSDoc](https://jsdoc.app/)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for providing feedback and guidance while drafting the documentation.  
This week’s work makes the MusicBlocks Git backend easier to adopt and extend — a key step towards long-term sustainability and community contributions.

