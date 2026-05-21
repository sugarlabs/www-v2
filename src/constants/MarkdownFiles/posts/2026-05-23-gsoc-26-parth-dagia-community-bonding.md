---
title: "GSoC '26 Community Bonding by Parth Dagia"
excerpt: "Introducing my GSoC '26 project on Music Blocks 4 and what I'll be working on this summer."
category: "DEVELOPER NEWS"
date: "2026-05-23"
slug: "2026-05-23-gsoc-26-parth-dagia-community-bonding"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,community-bonding,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Community Bonding Period Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)
**Organization:** Sugar Labs
**Reporting Period:** 2026-05-08 – 2026-05-24

---

## Introduction & About Me

Hi everyone, I'm Parth Dagia, a second-year Computer Science student. I'll be working on the **Music Blocks 4 Program Builder** at Sugar Labs this summer as a Google Summer of Code 2026 contributor.

I have been contributing to Music Blocks since early 2026. So far I have 55+ merged PRs on the v3 codebase across performance fixes, bug fixes, and tests, and I shipped three end-to-end features along the way. That work is how I got familiar with how bricks are structured, validated, connected, and executed, which is the area my GSoC project lives in.

A fun fact about me: I like building things from scratch to understand how the layers underneath actually work. I built a small RAG chatbot without any frameworks, and a multi-threaded HTTP/1.1 server on raw sockets, just for that reason.

---

## About the Project

Music Blocks v4 is a redesign of v3 in TypeScript, React, and Vite. A lot of the pieces already exist: an editor, a p5.js painter, a Tone.js singer, a compiler, and an interpreter. There is also the Masonry brick editor, built over GSoC 2024 and 2025, with hundreds of bricks and drag-and-drop support.

The problem is that most of these pieces don't talk to each other yet. Masonry runs in a separate playground. The compiler and interpreter only work in tests. The Run button still uses the old v3 engine. So a user opening v4 today sees a workspace, but cannot actually build or run a brick program.

My project is about closing that gap. The main goals for the summer are:

1. **Integrating Masonry into the main app** so the brick editor is part of v4, not a standalone playground.
2. **Brick snapping and connection** so bricks can actually be joined into programs with proper visual feedback.
3. **Engine integration** so pressing Run on a brick program produces real output, both on the canvas and through audio.

If time permits, I'd also like to pick up the two stretch goals from my proposal: inline brick editing (click-to-edit values) and basic workspace interactions like zoom and pan.

---

## Community Bonding So Far

The community bonding period has been mostly about talking to my mentors, agreeing on scope and priorities, and getting the v4 codebase running locally. We agreed to start with a richer brick definition schema as the foundation, since the snap system, AST conversion, and rendering layers all need to read from it later. The integration, snapping, and execution work will come after that.

---

## Plan for Weeks 1 & 2 (May 25 – Jun 7)

For the first two weeks, my focus is on expanding the brick definition system.

Right now bricks only contain basic UI metadata like label, category, color, argument count, and notches. My work will be to help design and implement a richer brick schema that fully describes each brick. This includes:

- argument slot types and default values
- output / value types
- socket / body metadata
- tooltip / help metadata
- highlight / display properties
- connection compatibility rules
- AST binding metadata for future engine integration

I'll also update the TypeScript interfaces and wire the palette and factory components so these new schema fields are actually consumed by the UI and brick creation flow.

After the schema is finalized, I'll fully define a few representative bricks first, and then expand the definitions across the remaining catalog while cleaning duplicate or leftover entries.

The actual snap system, execution engine, AST conversion logic, and rendering engine are out of scope for these two weeks. This work is focused on the metadata and schema infrastructure that those systems will later depend on.

---

## Resources & References

- **Project:** [Music Blocks v4 on GitHub](https://github.com/sugarlabs/musicblocks-v4)
- **My v3 contributions:** [PRs by parthdagia05](https://github.com/sugarlabs/musicblocks/pulls?q=is%3Apr+author%3Aparthdagia05)
- **Sugar Labs:** [sugarlabs.org](https://sugarlabs.org)

---

## Acknowledgments

Thanks to my mentors Anindya Kundu, Justin Charles, and Safwan Sayeed for their guidance during community bonding. Thanks also to Devin Ulibarri, Walter Bender, and the rest of the Sugar Labs community for the warm welcome.

---
