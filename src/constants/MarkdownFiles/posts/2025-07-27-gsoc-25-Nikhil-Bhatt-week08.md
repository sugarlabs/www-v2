---
title: "GSoC '25 Week 08 Update by Nikhil Bhatt"
excerpt: "Implemented Local Projects display enabling students to switch between different projects they created "
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-gsoc-25-nikhilbhatt-week08"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week08,nikhilbhatt"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-07-21 – 2025-07-27  

---
## This Week's Achievements

### Frontend : Added a Local Projects page

Till last week, students were able to create a new project and view its history, and edit it, but they were not able to keep a track of the projects they made. Now, they are able to switch between projects they created (or forked) and even edit them. This allows students to work with different projects and even update them in future. A couple of techniques were used to implement this functionality. 

- Storing `allProjects` in Local Storage 
  → We store the name, description and key (to uniquely identify a project) in the allProjects array inside the local storage. This array is rendered at the localProjects.html page allowing students to see all the projects they have created. 

- Current Project and current key 
  → Anytime a student change a project, currentProject and currentKey updates inside the local storage, allowing them to work inside the project they chose to. This helps them edit the project even in future, edit them, view it's commit history. This feature acts as an addition to what we have in the Planet currently. 

---


## Challenges & How I Solved Them

- **Challenge:** Allowing students to work with multiple projects.   
  **Solution:** Saving the projects of students they have created or forked, inside a persistent local storage, which is also co-incidentally similar to the current Planet implementation. 

- **Challenge:** Switching and editing multiple projects.  
  **Solution:** Storing current project and the key associated with the project allows students to work with different projects. 

---

## Key Learnings
- Creating an effective User experience, to provide a smooth transition from the existing system without much learning curve.
- Identification of the problem, designing a simple architecture of the solution and its implementatiion. 

---

## Next Week's Roadmap
- Demo the current setup. 
- Discuss about deployment, integration and error handling/fallbacks. 

---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week’s frontend PR features. 

