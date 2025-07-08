---
title: "GSoC '25 Week 5 Update by Safwan Sayeed"
excerpt: "Implementing the Symbol Table and Memory Module Integration"
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-gsoc-25-sa-fw-an-week5"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week5,sa-fw-an"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-30 - 2025-07-06  

---

## A Blog-style Retrospective

This week I implemented the Symbol Table and integrated it with the Memory Module to manage variable scopes and dependencies effectively. This was a crucial step in preparing for the Abstract Syntax Tree (AST)-to-Intermediate Representation (IR) compilation logic, ensuring that our program engine can handle variable resolution correctly during the translation process.

---

## Goals for This Week

- Design the Symbol Table.  
- Implement the Symbol Table in the Memory Module.  
---

## This Week's Highlights

1. **Symbol Table Design and Implementation**  
   - Designed the Symbol Table to manage variable scopes and dependencies effectively.
   - Integrated the Symbol Table with the Memory Module to ensure proper variable resolution during AST-to-IR translation.
   - Documented the design and usage patterns for future reference.

---

## Challenges & Solutions

- **Managing Variable Scopes:**  
  Initially faced challenges in ensuring that variable scopes were correctly maintained across different blocks of code.  
  *Solution:* Implemented a robust Symbol Table that tracks variable declarations and their scopes, allowing for accurate resolution during the AST-to-IR translation.  


---

## Key Learnings

- Gained a deeper understanding of how to manage variable scopes and dependencies in a compiler context.  
- Learned how to design and implement a Symbol Table that integrates with the Memory Module to facilitate variable resolution during the AST-to-IR translation process.  

---

## Next Week's Roadmap

- Start working on the execution engine that will interpret the generated IR instructions.  
- Begin implementing the first set of IR instructions.  
---

## Resources & References

- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their crucial guidance on compiler design principles and static compilation concepts. Their clarification on the AST-to-IR translation approach and emphasis on maintaining clean instruction generation patterns was essential for this week's successful progress.

---