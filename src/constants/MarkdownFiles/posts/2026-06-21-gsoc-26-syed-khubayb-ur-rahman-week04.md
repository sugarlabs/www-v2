---
title: "GSoC '26 Week 4 Update by Syed Khubayb Ur Rahman"
excerpt: "Building the new React component BrickViewFixed for generic presentation of Bricks with display widgets."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-gsoc-26-syed-khubayb-ur-rahman-week04"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week04,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-15 – 2026-06-21

---

## Goals for This Week

- Build the `BrickViewFixed` component to display Bricks with display widgets.
- Define proper prop types derived from the generic `BrickView` component.
- Support all three Brick kinds: value, expression, and statement.
- Write Storybook stories to visualize the component's variations and add tests.

---

## This Week's Achievements

### Building the BrickViewFixed Component

This week, I built a new React component called `BrickViewFixed`. This component serves as a sub-component of the generic `BrickView` component and is designed to exclusively deal with the presentation of Bricks that contain display widgets (as opposed to input widgets). 

It fully supports all three Brick kinds:
- Value
- Expression
- Statement

### Prop Definitions and Component Flesh Out

I defined the props for the component by carefully deriving them from the prop type definitions. With the foundation in place, I fleshed out the React component to support all the fields provided as props, ensuring accurate and robust rendering.

### Storybook Visualization and Testing

To ensure the component works perfectly across different variations, I created a comprehensive Storybook story to visualize them. A test file was also written for the component to maintain reliability.

Here are the variations visualized in Storybook, covering the four main stories:

![Value Display Widget](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-display-widget.png)

![Expression With Params](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-expression-with-params.png)

![Statement Without Nesting](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-statement-without-nesting.png)

![Statement With Nesting](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-statement-with-nesting.png)

---

## Next Week's Roadmap

- Build a new React component `BrickViewInput` which will serve as a sub-component of the generic `BrickView` component.
- Ensure it exclusively deals with the presentation of Bricks with input widgets (not display). Note that this only applies to Bricks of the value kind.
- Define props for the component derived from the prop type definitions of the `BrickView` component.
- Flesh out the React component with support for all fields provided as props.
- Create a Storybook story to visualize all variations.

---

## Resources & References

- **PR:** [[brick] add BrickViewFixed display-only view component #606](https://github.com/sugarlabs/musicblocks-v4/pull/606)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
