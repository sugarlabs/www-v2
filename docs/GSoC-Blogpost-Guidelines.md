# GSoC ’25 Blogpost Guidelines

This document explains how to write and format your weekly GSoC ’25 updates for the Sugar Labs website. Follow these instructions to ensure consistency and clarity across all posts.

<!-- markdownlint-disable -->

## 1. Official Template

Use the exact template below for every GSoC ’25 week update or you will also find this under `constants/MarkdownFiles/posts/GSoC_Template.md`. Copy it into `constants/MarkdownFiles/posts/gsoc-25-username-weekXX.md`, then fill in your details.

```markdown
---
title: "GSoC ’25 Week XX Update by Safwan Sayeed"
excerpt: "This is a Template to write Blog Posts for weekly updates"
category: "TEMPLATE"
date: "2025-05-10"
slug: "gsoc-25-sa-fw-an-weekX"
author: "Safwan Sayeed"
description: "Maintainer and GSoC'25 Contributor at SugarLabs"
tags: "gsoc25,sugarlabs,weekXX,sa-fw-an"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week XX Progress Report by Safwan Sayeed

**Project:** [Project Name](https://github.com/sugarlabs/project_repo)  
**Mentors:** [Mentor1](https://github.com/Username), [Mentor2](https://github.com/Username)  
**Assisting Mentors:** [Mentor3](https://github.com/Username), [Mentor4](https://github.com/Username)  
**Reporting Period:** yyyy-mm-dd - yyyy-mm-dd  

---

## Goals for This Week

- **Goal 1:** Describe the first planned deliverable.
- **Goal 2:** Describe the second planned deliverable.
- **Goal 3:** Describe an additional target.

---

## This Week’s Achievements

1. **[Task or Feature]**  
   - What you did and why it matters.  
   - Links (if any): PR [#123](https://github.com/owner/repo/pull/123), Issue [#456](https://github.com/owner/repo/issues/456).

2. **[Task or Feature]**  
   - Brief summary or a video.
   [youtube: MM-H69cHYMk]

3. **[Task or Feature]**  
   - Add screenshots or diagrams here if useful:
   ![screenshot-description](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2070)

---

## Challenges & How I Overcame Them

- **Challenge:** Describe a blocker or difficulty.  
  **Solution:** Outline your approach or resources used.

- **Challenge:** Another issue faced.  
  **Solution:** Steps taken to resolve or next action plan.

---

## Key Learnings

- Gained familiarity with **XYZ library or tool**.
- Deepened understanding of **SOLID principles**, **architecture modeling**, **DFDs**, etc.
- Improved skills in **testing**, **documentation**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Implement **Feature XYZ** and write corresponding tests.
- Refine **technical design** based on mentor feedback.
- Prepare a mini-demo for the community check-in.

---

## Resources & References

- **PRD:** [Link to Product Requirements Document]({{prd_link}})
- **Tech Spec & Diagrams:** [Architecture & Specs]({{tech_spec_link}})
- **Repository:** [github.com/owner/repo](https://github.com/owner/repo)
- Any additional links, diagrams, or attachments.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [@sa-fw-an](https://github.com/sa-fw-an)
- Gmail: [isafwansayeed@gmail.com](mailto:isafwansayeed@gmail.com)
- LinkedIn: [Safwan Sayeed](https://www.linkedin.com/in/safwan-sayeed-6a3a482a9/)
- Twitter: [@safwan_say](https://twitter.com/safwan_say)

---

```

## 2. Updating Your Post

1. Change the frontmatter `category` from `"TEMPLATE"` to `"DEVELOPER NEWS"`.
2. Replace placeholder text:
   - **Week XX**, dates, PR/issue numbers, links, screenshot URLs.
   - Your project name, mentor usernames, reporting period.
3. Update `title`, `excerpt`, `date`, `slug`, `author`, `description`, `tags`, `image`.
4. Please keep (`<!-- markdownlint-disable -->`) to disable any markdown linting.
5. Change the contents of the file accordingly.

## 3. File & PR Workflow

- Branch off `main` with `gsoc-weekXX-username`.
- Add your file under `constants/MarkdownFiles/posts/`.
- Commit and open a PR titled:  
  ```
  GSoC ’25 Week XX Update by Name
  ```
- In PR description, link any issue tracking the weekly report and ping your mentors.
- After review, squash-and-merge.

---

By strictly following this template and these steps, we ensure every GSoC ’25 post is uniform and high quality. Happy writing!