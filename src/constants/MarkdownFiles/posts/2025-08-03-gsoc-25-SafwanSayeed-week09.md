---
title: "GSoC '25 Week 9 Update by Safwan Sayeed"
excerpt: "Design and Implementation of Compiler for Music Blocks 4"
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "2025-08-03-gsoc-25-sa-fw-an-week9"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week9,sa-fw-an"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-28 - 2025-08-03

---

## A Blog-style Retrospective

This week I Designed and Implemented the Compiler. The work involved translating the Abstract Syntax Tree (AST) into Intermediate Representation (IR) instructions, which are essential for executing programs in Music Blocks 4.

---

## Goals for This Week

- Write a TechSpec for the Compiler, outlining its architecture and components.
- Implement the Compiler's core functionality, focusing on the translation from AST to IR.
- Develop the Data Flow Diagram (DFD) for the Compiler to visualize data movement and interactions within the system.
---

## This Week's Highlights

- **TechSpec for Compiler:**  
  Created a detailed TechSpec document that outlines the architecture and components of the Compiler, including the translation process from AST to IR.
- **Implementation of Compiler:**  
  Successfully implemented the core functionality of the Compiler, focusing on the translation from AST to IR.

![AST Converted to IR](/assets/Developers/Safwan/AST-IR.png)
- **Data Flow Diagram (DFD):**  
  Developed a Data Flow Diagram (DFD) to visualize the data movement and interactions within the Compiler system, providing a clear overview of how data flows through the various components.

![Data Flow Diagram](/assets/Developers/Safwan/compiler-dfd.png)

![Comprehensive Tests](/assets/Developers/Safwan/Compiler-test.png)

---

## Challenges & Solutions

- **Dynamic Variable Management:**  
  Encountered challenges in managing dynamic variables and memory allocation during the translation process. To address this, I implemented a robust memory management system that ensures efficient allocation and deallocation of resources.
- **Complexity of AST to IR Translation:**  
  The translation from AST to IR was complex due to the need to maintain the integrity of the original program while optimizing for performance. I tackled this by breaking down the translation process into smaller, manageable components, allowing for easier debugging and testing.


---

## Key Learnings

- Gained a deeper understanding of compiler design principles, particularly in the context of static compilation.
- Learned about the intricacies of translating an Abstract Syntax Tree (AST) into Intermediate Representation (IR) instructions, including the challenges of maintaining program semantics while optimizing for performance.
---

## Next Week's Roadmap

- **Think about the Scheduler:**  
  Explore how the Scheduler can be integrated into the Compiler to manage the execution of programs more effectively, including task prioritization and resource allocation.

---

## Resources & References

- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their crucial guidance on compiler design principles and static compilation concepts. Their clarification on the AST-to-IR translation approach and emphasis on maintaining clean instruction generation patterns was essential for this week's successful progress.

---