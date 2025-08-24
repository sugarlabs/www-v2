---
title: "GSoC '25 Week 09 Update by Nikhil Bhatt"
excerpt: "Implemented theme selection via GitHub topics, added fetch-all-repositories route, and introduced download project as ZIP functionality."
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "2025-08-03-gsoc-25-nikhilbhatt-week09"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week09,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-07-28 – 2025-08-03  

---
## This Week's Achievements

###  Added Theme Feature (GitHub Topics)
This week, I implemented the functionality to allow users to **add a theme** to their repositories, in the backend it is what we see on GitHub’s “About” section using `topics`.

- Themes like `music`, `education`, `learning` can now be added directly through our UI, and they will reflect in the GitHub repository’s topic list.
- This helps with **categorization**, **searchability**, and **better discovery** of projects.


###  Added Route to Get All Repositories (Authenticated)

To overcome the GitHub API rate-limiting issue, I implemented a **new route** that fetches all repositories using **authenticated access** through our GitHub app. 

- This ensures users can list all their repositories reliably without hitting the public API rate limit.
- The route fetches repositories the app has access to, respecting GitHub permissions. 

## Updated Projects page (with themes and updated route)

After integrating the new theme feature and the authenticated repository fetch route, I updated the Projects page to showcase these enhancements in action. You can now see repository themes displayed alongside project descriptions, making it easier for users to visually identify and filter projects.

![Projects page](assets/Developers/Nikhil/projectPage.webp)

## Actual GitHub repository created in Music Blocks project account 

Here's an example of a repository actually created in the Music Blocks GitHub organization using the new backend functionality. The topics we added (themes) are visible directly in GitHub's About section, showcasing that the integration works end-to-end.

![GitHub repo](assets/Developers/Nikhil/github-repo.webp)

---


## Challenges & How I Solved Them

- **Challenge:** Rate limits with unauthenticated API calls.  
  **Solution:** Switched to authenticated GitHub App API routes to ensure seamless access without throttling.

- **Challenge:** Adding topics to a repository programmatically.  
  **Solution:** Used Octokit to update the `topics` field via PATCH request to the GitHub REST API.

- **Challenge:** Handling ZIP file downloads in a seamless way.  
  **Solution:** Wrapped GitHub’s archive download API and added front-end UI to allow one-click downloads. 

---

## Key Learnings

- Deeper understanding of GitHub's REST API and how authenticated apps can bypass public API limits.
- Clean separation between frontend controls and backend functionality to make features more extensible.
- Designing features with fallbacks for future flexibility. 

---

## Next Week's Roadmap

- Finalize the ZIP download structure and filename pattern.
- Improve UI/UX of repository listing with themes.
- Write some tests for the backend. 

---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week.  

