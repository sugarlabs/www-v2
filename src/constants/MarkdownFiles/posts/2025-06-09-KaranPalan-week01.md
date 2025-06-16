---

title: "Community Bonding & Week 1 Update by Karan Palan"
excerpt: "From compiler theory deep-dives to brick-rendering math—mentoring the 2025 Music Blocks Masonry & Engine cohorts."
category: "DEVELOPER NEWS"
date: "2025-06-09"
slug: "2025-06-09-KaranPalan-week01"
author: "Karan Palan"
description: "GSoC 2024 mentee, now volunteering and peer-mentoring on Music Blocks 4"
tags: "gsoc25,sugarlabs,communitybonding,week1,karanpalan"
---

<!-- markdownlint-disable -->

# Community Bonding + Week 1 Progress Report

**by Karan Palan**

**Projects:** Music Blocks 4 **Masonry** & **Program Engine**  
**Role:** Volunteer & Peer-Mentor (GSoC 2024 alumnus)  
**Mentor:** [Anindya Kundu](https://github.com/meganindya/)  
**Mentees:** [Justin Charles](https://github.com/justin212407), [Saumya Shahi](https://github.com/saumyashahi) (Masonry) • [Safwan Sayeed](https://github.com/sa-fw-an) (Engine)  
**Reporting Period:** 2025-05-20 → 2025-06-08  

---

Community bonding this year felt less like “hello world” and more like an accelerated CS grad course. Anindya flipped the script: before writing a single line of code we dissected *how* languages work, explored compiler pipelines, and compared micro-compilers.

### Mapping Bricks to LLVM IR

Armed with that theory, each of us reverse-mapped **Music Blocks bricks → LLVM intermediate representation** to ground our designs in real compiler constructs. My early spreadsheet of brick vs. IR became a north star for future optimizations.

### Defining Music Blocks Grammar

After digesting JavaScript’s formal grammar, we drafted a Music Blocks-specific one that is lean, kid-friendly, but still transpilable to JS. This fed directly into the Engine tech spec.

### Meeting with Andres

Anindya set up a fireside chat with his former manager **Andrés**, giving us a crash-course in real-world engineering. Andrés drilled home that *“quick fixes live for 18 months,”* scope must be ruthlessly trimmed, and the true mark of a pro is writing code a stranger can maintain five years later, all while treating teammates (coders or not) with respect.

### Two Tracks, One Vision

We split weekly calls:

| Track   | Focus                           | Key Doc                                                                                                    |
| ------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Masonry | SVG brick generation & formulae | [Brick Sides & Formulae](https://docs.google.com/document/d/1AUlA2leDJIfV3ZXceLhCaITftExq6c5BcUBMZOtZBvE/) |
| Engine  | AST, runtime, class hierarchy   | [Engine Tech Spec + AST](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/) |

---

## Highlights So Far

1. **Project-wide Knowledge Base**
   *Spreadsheet* of compiler concepts & Music Blocks parallels—anchors every design choice.
   Link ➜ [Mentor Context Sheet](https://docs.google.com/spreadsheets/d/1LFuIlzRiMlEfeLr21x8_SYnVIQ5baVQv8tz2GWN9PfU/)

2. **Brick Taxonomy Drafted**
   Classified each brick against LLVM constructs for easy reasoning about side-effects and type constraints.
   Link ➜ [Brick ↔️ LLVM Mapping](https://docs.google.com/document/d/1BswWHadyy4yC3_3vK6KHZnMn0u6jbbYiQ6JQWiqRMLw/)

3. **Brick Geometry Formulae**
   With Justin & Saumya, derived parametric equations for every brick edge—vital for responsive SVG.
   Link ➜ [Brick Formulae Doc](https://docs.google.com/document/d/1AUlA2leDJIfV3ZXceLhCaITftExq6c5BcUBMZOtZBvE/)

4. **Engine Class Skeleton**
   Safwan and I scaffolded core *abstract* and initial *concrete* classes in TypeScript.
   Code ➜ [Replit Workspace](https://replit.com/@karanpalan007/engine-abstract-classes?v=1)



## Key Learnings

* **Teach, then build:** A solid mental model of compilers made later coding decisions friction-less.
* **Visual specs pay off:** Equation-driven SVG means less pixel-pushing, more deterministic rendering.
* **Peer-mentoring ≠ lecturing:** Guiding Justin, Saumya, and Safwan taught me to ask leading questions instead of prescribing answers.

---

## Next Week’s Roadmap

* **Masonry:** Finish implementing '_generateLeft()' so *all* brick types respect left-side notches.
* **Engine:** Flesh out 'Expression' subclasses and prototype a minimal AST → JS transpile step.
* **Docs & CI:** Auto-publish rendered SVG examples in PR previews to catch geometry regressions early.

---

## Resources & References

* Mentor Notes → [Spreadsheet](https://docs.google.com/spreadsheets/d/1LFuIlzRiMlEfeLr21x8_SYnVIQ5baVQv8tz2GWN9PfU/)
* Brick ↔️ LLVM Mapping → [Google Doc](https://docs.google.com/document/d/1BswWHadyy4yC3_3vK6KHZnMn0u6jbbYiQ6JQWiqRMLw/)
* Engine Tech Spec → [Google Doc](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/)
* Brick Geometry → [Formulae Doc](https://docs.google.com/document/d/1AUlA2leDJIfV3ZXceLhCaITftExq6c5BcUBMZOtZBvE/)
* Code Skeleton → [Replit](https://replit.com/@karanpalan007/engine-abstract-classes?v=1)

---

## Acknowledgments

Huge thanks to **Anindya** for the deep-dive lectures and mentoring, and to **Justin, Saumya, and Safwan** for matching my energy sprint-for-sprint. SugarLabs’ culture of mentoring forward keeps the snowball rolling.

---

## Connect with Me

* GitHub: [@Karan-Palan](https://github.com/Karan-Palan/)
* Email: [karanpalan007@gmail.com](mailto:karanpalan007@gmail.com)
* LinkedIn: [karan-palan-476472289/](https://www.linkedin.com/in/karan-palan-476472289/)
* Twitter: [Karan_Palan7](https://x.com/Karan_Palan7)

---
