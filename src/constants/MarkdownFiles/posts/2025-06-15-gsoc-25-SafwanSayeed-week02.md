---
title: "GSoC '25 Week 2 Update by Safwan Sayeed"
excerpt: "Memory Module Architecture and CRUD Operations Development"
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "2025-06-15-gsoc-25-sa-fw-an-week2"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week2,sa-fw-an"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 2 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-09 - 2025-06-15  

---

## A Blog-style Retrospective

This week was all about diving deep into the memory architecture for the Music Blocks program engine. After completing our comprehensive AST framework in week 1, we shifted focus to building the foundational memory management system that will power program execution. The challenge was designing a three-scope memory hierarchy (Global, Thread, Local) with full CRUD operations while keeping the implementation clean and focused.

Working alongside Karan Palan, we expanded our tech spec to include detailed memory module specifications. The mentors provided crucial guidance on scope requirements, emphasizing the need for thread isolation, and multi-level local scope support.

---

## Goals for This Week

- Complete the memory module technical specification with three-scope architecture details.
- Develop full CRUD operations for global variables accessible from any scope.
- Implement it with tests.

---

## This Week's Highlights

1. **Memory Module Tech Specification**  
   - Expanded the tech spec with comprehensive memory architecture documentation covering three-scope system.
   - Detailed CRUD operation requirements for global, thread, and local scope variables.
   - Link: [Tech Spec Document - Memory Section](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.3xe7coiooljb#heading=h.s3q9swsg3ifd)


2. **Memory Module CRUD Operations**  
   - Started Implementing the CRUD Operations for the Scopes

---

## Challenges & Solutions

- **Understanding Scope Hierarchy Complexity:**  
  The three-scope system (Global, Thread, Local) with proper variable shadowing was conceptually challenging.  
  *Solution:* Studied the existing reference implementation and created detailed diagrams to visualize scope relationships.


---

## Key Learnings

- Mastered hierarchical data structure design with proper encapsulation and scope isolation.
- Gained deep understanding of variable shadowing and scope resolution mechanisms.
- Enhanced collaboration skills working on complex architecture with multiple contributors.

---

## Next Week's Roadmap

- Begin symbol table implementation building on the memory module foundation.
- IR Implementation
- Write comprehensive unit tests for all memory module CRUD operations.

---

## Resources & References

- **Tech Spec:** [Memory Module Architecture](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.3xe7coiooljb#heading=h.s3q9swsg3ifd)  
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)
- **Reference Implementation:** [For conceptual guidance](https://github.com/sugarlabs/musicblocks-v4-lib/tree/develop/src/execution/scopeexecution/scope) 

---

## Acknowledgments

Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their detailed guidance on memory architecture design and scope management. Their clarification on keeping the focus on memory module fundamentals was crucial for this week's progress.

---