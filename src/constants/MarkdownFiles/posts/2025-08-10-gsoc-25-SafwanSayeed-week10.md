---
title: "GSoC '25 Week 10 Update by Safwan Sayeed"
excerpt: "Design and Implementation of Scheduler for Music Blocks 4"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-gsoc-25-safwan-sayeed-week10"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week10,sa-fw-an"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-08-04 - 2025-08-10

---

## A Blog-style Retrospective

This week I Designed and Implemented the Scheduler for Music Blocks 4. The Scheduler is responsible for managing the execution of musical blocks, ensuring that they are played in the correct order and at the right time.

---

## Goals for This Week

- Write a TechSpec for the Scheduler, outlining its architecture and components.
- Implement the Scheduler's core functionality, focusing on the management of musical block execution.
- Develop the Data Flow Diagram (DFD) for the Scheduler to visualize data movement and interactions within the system.
---

## This Week's Highlights

- **TechSpec for Scheduler:**  
  Created a detailed TechSpec document that outlines the architecture and components of the Scheduler, including the timing and sequencing of musical block execution.
- **Implementation of Scheduler:**  
  Successfully implemented the core functionality of the Scheduler, focusing on the management of musical block execution.

- **Data Flow Diagram (DFD):**  
  Developed a Data Flow Diagram (DFD) to visualize the data movement and interactions within the Scheduler system, providing a clear overview of how data flows through the various components.

![Scheduler-DFD](/assets/Developers/Safwan/scheduler-dfd.png)

---

## Challenges & Solutions

- **Complexity of Scheduler Implementation:**  
  The implementation of the Scheduler was complex due to the need to maintain the timing and sequencing of musical block execution. I tackled this by breaking down the implementation process into smaller, manageable components, allowing for easier debugging and testing.

---

## Key Learnings

- Gained a deeper understanding of scheduler design principles, particularly in the context of real-time systems.
- Learned about the intricacies of managing task execution order and timing, including the challenges of maintaining system responsiveness while optimizing for performance.
---

## Next Week's Roadmap

- **Think about the Integration with the Masonry:**  
  Explore how the Engine can be integrated into the Masonry to manage the execution of programs more effectively, including task prioritization and resource allocation.

---

## Resources & References

- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

=======
Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their invaluable support and guidance throughout this project.

---