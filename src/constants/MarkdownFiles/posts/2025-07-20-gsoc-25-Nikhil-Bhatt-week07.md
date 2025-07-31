---
title: "GSoC '25 Week 07 Update by Nikhil Bhatt"
excerpt: "Implemented forking of projects in the frontend, backend route for returning project data only, and student descriptions for projects"
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-gsoc-25-nikhilbhatt-week07"
author: "@/constants/MarkdownFiles/authors/nikhil-bhatt.md"
tags: "gsoc25,sugarlabs,week07,nikhilbhatt"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Nikhil Bhatt

**Project:** [Git backend for MusicBlocks](https://github.com/benikk/musicblocks-backend)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Reporting Period:** 2025-07-13 – 2025-07-20 

---
 
## This Week's Achievements

### Backend: Project data end point

- Created a new backend route that returns project data of projects without forking them `GET/api/github/getProjectData`.   
Earlier, when we used to click "Open in Music blocks" in the projects page, a shallow fork of the project (without all the project history) 
used to get created, the route helps in only returning the projectData which is loaded to musicblocks allowing students to see first and then 
decide whether to fork or not. 

- Custom description for the project - This change allows student to add descriptions to their projects, similar to what they did in the planet page.  

---

###  Frontend: Forking projects & Student written Description for Projects

- Fork Button in UI: Users now see a "Fork This Project" button while inside any project.
- It also retains all commit history from the original repository in the fork.
- Allows student to edit the forked projects in their own repo to work further on others projects.
- Students can also enter the description for their projects when creating their projects, also visible in the projects page.
---

## Challenges & How I Solved Them

- **Challenge:** Handling local saved states for identifying projects with their keys.  
  **Solution:** We are replacing the repoName and its key when a project is forked, discussion on this approach is still in progress. 

- **Challenge:** Managing clear separation between forking and opening a project in Music Blocks.  
  **Solution:** Created a separate end point which only returns the projectData, no forking initially, will save loading time as well as un-necessary repository creation.

---

## Key Learnings
- Understanding the importance of UX clarity when introducing forking systems.
- How forks inherit full Git commit histories and the implications for educational use-cases, reflective journey in particular.
- Value of allowing students to describe their projects for documentation and self-reflection.

---

## Next Week's Roadmap
- Begin work on downloading and sharing of projects.
- Conceptualise creating pull requests and an option to see them Music Blocks.  
- Discuss on working on multiple projects simultaneously.  


---

## Resources & References

- [MusicBlocks Frontend Repo](https://github.com/sugarlabs/musicblocks)
- [musicblocks-backend](https://github.com/benikk/musicblocks-backend)
- [Octokit REST.js Library](https://github.com/octokit/rest.js)

---

## Acknowledgments

Thanks again to my mentors and the Sugar Labs community for feedback and support!  
Looking forward to next week’s frontend PR features. 

