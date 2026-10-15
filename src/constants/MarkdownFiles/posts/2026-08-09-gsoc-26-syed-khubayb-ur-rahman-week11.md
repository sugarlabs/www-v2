---
title: "GSoC '26 Week 11 Update by Syed Khubayb Ur Rahman"
excerpt: "Defined Import/Export types and implemented the Export functionality for Workspace Programs and Projects."
category: "DEVELOPER NEWS"
date: "2026-08-09"
slug: "2026-08-09-gsoc-26-syed-khubayb-ur-rahman-week11"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week11,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-08-03 – 2026-08-09

---

## Goals for This Week

- Define the types and interfaces for importing and exporting projects.
- Implement a temporary Storybook UI to test data flow.
- Develop the core export utility to serialize Workspace data.

---

## This Week's Achievements

Following last week's discussion, the focus shifted from undo/redo functionality to prioritizing the fundamental ability to Import and Export programs and projects. This week, I successfully laid the groundwork and implemented the Export functionality.

### Defining Import/Export Types and Storybook UI

- **Temporary Storybook UI**: Added "Export Workspace" and "Import Workspace" buttons, along with a textarea, to the Storybook playground. This allows for rigorous testing of the data flow mechanics without relying on file system APIs just yet.
- **Type Definitions**: Created `@types/import-export.types.ts` to strictly define all the necessary interfaces required for serialization. This includes precise definitions for `ExportedProject`, `ExportedTower`, and `ExportedNode`.

### Export Functionality Implementation

- **Export Utility**: Developed the core export logic within `utils/import-export.ts`. I wrote the `exportWorkspace` function, which performs a deep tree traversal to successfully flatten complex node structures into a clean, exportable format. Comprehensive unit tests were also added for this utility to ensure reliability.
- **WorkspaceStore Integration**: Integrated the export logic with the main state by adding the `exportWorkspace` action directly to `workspace.ts`. This was then successfully hooked up to the Storybook "Export" button to complete the flow.

---

## Next Week's Roadmap

- Write detailed technical specification documentation covering all the features built over the entire summer. This documentation will serve as a comprehensive guide, enabling new contributors to easily understand the architecture and mechanics of the codebase without having to manually trace through all the code.

---

## Resources & References

- **PR:** [Define Import/Export Types and Implement Storybook UI #779](https://github.com/sugarlabs/musicblocks-v4/pull/779)
- **PR:** [Export Functionality #780](https://github.com/sugarlabs/musicblocks-v4/pull/780)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the rest of the Sugar Labs community.

---
