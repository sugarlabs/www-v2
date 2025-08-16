# GSoC '25 Blogpost Guidelines

This document explains how to write and format your weekly GSoC '25 updates for the Sugar Labs website. Follow these instructions to ensure consistency and clarity across all posts.

<!-- markdownlint-disable -->

## Step 1: Create Your Author Profile (One-time setup)

Before writing your first blog post, you need to create an author profile that will be linked to all your posts.

1. **Create a new file** in `constants/MarkdownFiles/authors/` named `your-username.md`
2. **Use this template** and replace the placeholder information:

```markdown
---
name: "Your Full Name"
slug: "your-username"
title: "GSoC'25 Contributor"
organization: "SugarLabs"
description: "GSoC'25 Contributor at SugarLabs"
avatar: "https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID?s=400"
---

<!--markdownlint-disable-->

# About [Your Name]

Write something about yourself

## Experience

Write some experience or other categories that you want to add

## Current Projects

Your Projects or other sections 

## Connect with Me

- **GitHub**: [@your-username](https://github.com/your-username)
- **Email**: [your.email@example.com](mailto:your.email@example.com)
- **LinkedIn**: [Your Name](https://linkedin.com/in/your-profile)
- **Twitter**: [@your_handle](https://twitter.com/your_handle)
- **Website**: [yourwebsite.com](https://yourwebsite.com) *(optional)*
- **Discord**: [your#1234](https://discord.com/users/your#1234) *(optional)*
```

## Step 2: Official GSoC Blog Post Template

Use the exact template below for every GSoC '25 week update. You can also find this under `constants/MarkdownFiles/posts/YYYY-MM-DD-GSoC_DMP_SSoC_Template.md`. Copy it into `constants/MarkdownFiles/posts/YYYY-MM-DD-gsoc-25-username-weekXX.md`, then fill in your details.

```markdown
---
title: "GSoC '25 Week XX Update by [Your Name]"
excerpt: "Brief description of this week's progress"
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: ""YYYY-MM-DD-gsoc-25-username-weekXX""
author: "@/constants/MarkdownFiles/authors/your-username.md"
tags: "gsoc25,sugarlabs,weekXX,username"
image: "assets/Images/GSOC.webp"
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

## This Week's Achievements

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

## Next Week's Roadmap

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
```

## Updating Your Post

1. Change the frontmatter `category` from `"TEMPLATE"` to `"DEVELOPER NEWS"`.
2. Replace placeholder text:
   - **Week XX**, dates, PR/issue numbers, links, screenshot URLs.
   - Your project name, mentor usernames, reporting period.
3. Update `title`, `excerpt`, `date`, `slug`, `author`, `tags`, `image`.
4. The `author` field should point to your author file: `"@/constants/MarkdownFiles/authors/your-username.md"`
5. Please keep (`<!-- markdownlint-disable -->`) to disable any markdown linting.
6. Change the contents of the file accordingly.
7. **Remove the "Connect with Me" section** from your blog post - this information is now in your author profile.

## File & PR Workflow

- Branch off `main` with `gsoc-weekXX-username`.
- Add your file under `constants/MarkdownFiles/posts/`.
- Commit and open a PR titled:  
  ```
  GSoC '25 Week XX Update by Name
  ```
- In PR description, link any issue tracking the weekly report and ping your mentors.
- After review, squash-and-merge.

---

By strictly following this template and these steps, we ensure every GSoC '25 post is uniform and high quality. Happy writing!