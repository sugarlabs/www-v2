---
title: "GSoC '25 Week 4 Update by Safwan Sayeed"
excerpt: "AST to IR Implementation"
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-sa-fw-an-week4"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week4,sa-fw-an"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-23 - 2025-06-29  

---

## A Blog-style Retrospective

This week marked a significant milestone in our Music Blocks program engine development as we transitioned from the foundational memory architecture to the core compilation logic. The focus shifted to implementing the AST-to-IR (Intermediate Representation) translation layer - the crucial bridge between our abstract syntax tree representation and executable code.

---

## Goals for This Week

- Complete the AST-to-IR compilation logic technical specification with detailed pseudocode patterns.
- Implement the AST Parsing logic for all expression classes returning instruction lists.
---

## This Week's Highlights

1. **AST-to-IR Compilation Logic Specification**  
   - Expanded the tech spec with comprehensive AST-to-IR translation documentation covering expression and statement compilation patterns.
   - Detailed instruction list generation requirements and variable management strategies.
   - Link: [IR Compilation Logic](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.i655udul8zuq)

2. **Implemented AST Parsing Logic**
   - Developed parsing logic for all expression classes, ensuring they return the correct instruction lists.  

---

## Challenges & Solutions

- **Understanding Static vs Runtime Compilation:**  
  Initially confused about whether we were performing runtime calculations or static code translation.  
  *Solution:* Mentors clarified that this is purely static AST-to-IR conversion with no runtime execution, helping focus the implementation approach.


---

## Key Learnings

- Gained a deeper understanding of static compilation principles and the importance of maintaining clean instruction generation patterns.
- Learned how to effectively manage variable scopes and dependencies during the AST-to-IR translation process.

---

## Next Week's Roadmap

- Finalize the AST-to-IR compilation logic implementation for all expression and statement classes.
- Begin integrating the IR generation with the memory management system to ensure proper variable resolution.
- Start working on the execution engine that will interpret the generated IR instructions.
---

## Resources & References

- **Tech Spec:** [AST to IR Methods](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.87123fra3s4#heading=h.gqjcwrtkdgvq)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their crucial guidance on compiler design principles and static compilation concepts. Their clarification on the AST-to-IR translation approach and emphasis on maintaining clean instruction generation patterns was essential for this week's successful progress.

---