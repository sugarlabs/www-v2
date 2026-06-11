---
title: "GSoC '26 Community Bonding by Syed Khubayb ur Rahman"
excerpt: "Introducing my GSoC '26 project on Music Blocks 4 and what I'll be working on this summer."
category: "DEVELOPER NEWS"
date: 2026-05-23
slug: "2026-05-23-gsoc-26-syed-khubayb-ur-rahman-community-bonding"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,community-bonding,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Community Bonding Period Report by Syed Khubayb ur Rahman


- **Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)
- **Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an) ,[Justin Charles](https://github.com/justin212407)
- **Organization:** Sugar Labs
- **Reporting Period:** May 8, 2026 – May 24, 2026

---

## Introduction & About Me

Hi everyone, I'm Syed Khubayb ur Rahman, a third-year Computer Science student. I'll be working on the [Music Blocks 4 Program Builder](https://musicblocks.net/2022/02/12/public-release-of-music-blocks-v4-0-for-testing/) at Sugar Labs this summer as a Google Summer of Code 2026 contributor.
I have been actively contributing to multiple repositories within the Sugar Labs ecosystem since August 2025, gaining valuable experience working with the codebase and collaborating with the community Many of these pull requests fixed issues and bugs, introduced new features and improvements, and several contributions focused on expanding automated test coverage. All of these pull requests were meaningful contributions aimed at improving the stability, functionality, and maintainability of the Sugar Labs projects.

---

## About the Project

Music Blocks v4 is a major redesign of the v3 platform's architecture. This adopts a modern modular system built with TypeScript and React, making the platform more maintainable, extensible, and scalable. This redesign separates the system into multiple independent modules responsible for visual programming, program representation, and program execution. A key goal is to establish a complete pipeline that converts visual brick structures into executable programs. While several modules of the new architecture are already functional, the connection between the visual programming interface and the program execution system is still incomplete. This project focuses on completing that pipeline by improving the brick connection system, generating Abstract Syntax Trees (ASTs) from connected bricks, and enabling program execution through the existing runtime infrastructure.

The main goals for the summer are:

1. **Default Brick Generation** 
2. **Brick snapping and connection** 
3. **Program Representation via AST** 
4. **Execution Pipeline & Domain Bridging**

## Community Bonding Period So Far

During the community bonding period, I have been actively interacting with mentors to understand the Music Blocks v4 architecture and project goals. The focus has been on discussing implementation approaches, understanding the workflow, planning next steps, and preparing technical documentation related to the project.

## Plan for Weeks 1 & 2 (May 25 – Jun 7)

During the first two weeks, my primary focus will be on expanding and stabilizing the brick generation system in Music Blocks v4.

Currently, several bricks are either missing or not being generated correctly. This includes important root compound bricks such as `start`, `action`, and others, along with multiple missing bricks across different categories in the palette. My initial goal will be to systematically identify all missing and incorrectly generated bricks in Music Blocks.

After identifying them, I will document:
- Missing brick
- Missing brick generation parameters
- Parameters that exist but are not functioning correctly
- Different brick generation patterns required across categories

Once the analysis is complete, I will begin implementing support for all missing parameters in the codebase to ensure every required brick pattern can be generated correctly. I will verify the implementation through Storybook by manually testing different brick configurations and generation scenarios.

Following this, I will define all missing bricks inside the `brick-config.json` file and update incorrectly configured bricks to ensure accurate rendering of all the bricks in the palette.
 

## Resources & References

- **Project:** [Music Blocks v4 on GitHub](https://github.com/sugarlabs/musicblocks-v4)
- **Organization:** [Sugar Labs](https://sugarlabs.org)
- **AST Reference:** [AST Reference](https://www.geeksforgeeks.org/compiler-design/abstract-syntax-tree-vs-parse-tree/)

---

## Acknowledgments

Thanks to my mentors Anindya Kundu, Safwan Sayeed and Justin Charles for their guidance and support during the community bonding period. I’m also grateful to Devin Ulibarri, Walter Bender and the entire Sugar Labs community for the warm welcome

---