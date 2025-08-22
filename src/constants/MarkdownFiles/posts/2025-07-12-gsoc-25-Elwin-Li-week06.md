---
title: "GSoC '25 Week 6 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates"
category: "DEVELOPER NEWS"
date: "2025-07-12"
slug: "2025-07-12-gsoc-25-Elwin-Li-week06"
author: "@/constants/MarkdownFiles/authors/elwin-li.md"
tags: "gsoc25,sugarlabs,midterm,week6,javaScript editor,debugger,syntax highlighting"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Elwin Li

**Project:** [Advanced JavaScript Editor with MusicBlocks Interactions](https://github.com/sugarlabs/musicblocks/tree/config_driven_conversion/elwin)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-07-05 - 2025-07-12

---

## Goals for This Week

- **Goal:** Complete syntax/error highlighting, and conclude the project

---

## This Week’s Achievements

**Made PR for Syntax highlighting project**

The syntax/error highlighting project has been complete and a [PR has been made](https://github.com/sugarlabs/musicblocks/pull/4723). This project adds syntax highlighting and error highlighting to the JS editor, making the editor easier to work with. The syntax highlighting was done using
the highlightjs library, and the error highlighting was done by using the acorn library to parse the JavaScript code, and marking down the location
of any errors, and doing some calculations to highlight the associating places red.

Any syntax errors will not only cause the place of errors to be highlighted, but it will also print an error message in the console log. This will additionally make it easier for the user to understand when and where an error occurs. A demo of the highlighting is displayed below:

<a href="https://ibb.co/VpVMyZFM"><img src="https://i.ibb.co/yB0gT1zg/Screenshot-2025-07-12-at-9-01-37-PM.webp" alt="Syntax Highlight"></a>

<a href="https://ibb.co/1YTRYQFx"><img src="https://i.ibb.co/Y4hf4QHG/Screenshot-2025-07-12-at-9-01-48-PM.webp" alt="Error Highlight"></a>

**Made prototype for prompt to valid JavaScript code that can convert to MusicBlocks AI**

This week, I have also made a gemini wrapper that takes in a prompt such as "Play twinkle twinkle little star with the guitar" and outputs JavaScript code that specifically works with MusicBlocks, so the user can copy paste the result into the JSeditor, convert the code to blocks, and play the result. This was done with a Google gemini API call along with extensive prompt engineering making sure it knows exactly what kind of code works with MusicBlocks, and what kind of code will cause errors if attempted to convert to blocks.

[youtube: BFY3Bbi8V2g]

[youtube: TEGWOAf5iO4]

## Midterm Progress Summary

**Over the 6 weeks of GSoC, I have accomplished the following**

### Community Bonding: Project Foundation
- **Planning and Research**: Defined project scope and educational goals
- **Initial Implementation**: Started with basic JavaScript-to-blocks conversion for rhythm, flow, number, and boolean palettes
- **Architecture Design**: Planned the overall system architecture and feature roadmap

### Week 1: Architecture Breakthrough
- **Config-Driven Refactoring**: Developed JSON-based configuration system for block mappings
- **AST Integration**: Implemented Acorn parser for JavaScript code analysis
- **Pattern Matching**: Created flexible AST pattern matching for complex JavaScript constructs
- **Extensibility**: Made adding new blocks as simple as updating configuration files

### Week 2: Complete Implementation
- **Full Block Support**: Extended system to support all compatible block types
- **Optimization**: Implemented JSON minification and config consolidation
- **Documentation**: Created comprehensive conversion guide and unit tests
- **Production Deployment**: Successfully deployed feature through merged PR

### Week 3: Debugger Development
- **Interactive Debugger**: Built working debugger with breakpoint system
- **Variable Inspection**: Implemented real-time variable display and tracking
- **Visual Integration**: Connected debugger statements to visual blocks
- **Educational Features**: Added step-by-step execution and status block integration

### Week 4: Debugger Refinement
- **UX Optimization**: Simplified debug mode and improved user interface
- **Status Block Enhancement**: Optimized variable management and display
- **Execution Control**: Enhanced integration with existing play controls
- **Bug Fixes**: Resolved execution flow and block behavior issues

### Week 5: Final Integration
- **Debugger Completion**: Finalized debugger with comprehensive PR
- **Syntax Highlighting**: Added basic syntax highlighting to JavaScript editor
- **Production Ready**: Completed all planned features and deployed to production
- **Documentation**: Finalized user guides and technical documentation
---

## Key Learnings

- Improved skills in UX design and keeping tools simple for the user
- Deepened understanding of highlightjs
- Learned Gemini API calls
- Improved skills in prompt engineering
- Improved skills in **debugging**, **code design**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Fine tune an LLM to work better with MusicBlocks specific requests

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
