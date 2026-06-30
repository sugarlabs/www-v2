---
title: "GSoC '26 Week 5 Update by Syed Khubayb Ur Rahman"
excerpt: "Building the new React component BrickViewInput for generic presentation of Bricks with input widgets."
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-gsoc-26-syed-khubayb-ur-rahman-week05"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "gsoc26,sugarlabs,musicblocks,week05,syed-khubayb-ur-rahman"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Syed Khubayb Ur Rahman

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Safwan Sayeed](https://github.com/sa-fw-an), [Justin Charles](https://github.com/justin212407)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-22 – 2026-06-28

---

## Goals for This Week

- Build the `BrickViewInput` component to display Bricks with input widgets.
- Define proper prop types derived from the generic `BrickView` component.
- Flesh out the React component to fully support all provided fields.
- Write Storybook stories to visualize all variations.

---

## This Week's Achievements

### Building the BrickViewInput Component

This week, I built a new React component called `BrickViewInput`. This component serves as a sub-component of the generic `BrickView` component and exclusively handles the presentation of Bricks that contain input widgets (as opposed to display widgets). Note that this functionality applies specifically to Bricks of the value kind.

### Prop Definitions and Component Flesh Out

I defined the props for this component by deriving them from the prop type definitions of the parent `BrickView` component. After establishing the definitions, I fleshed out the React component with robust support for all fields provided as props.

### Storybook Visualization

To ensure the component works flawlessly, I created comprehensive Storybook stories covering its different variations. 

Here are the five variations visualized in Storybook:

![Value - Textbox](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-textbox.png)

![Value - Numberbox](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-numberbox.png)

![Value - Toggle](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-toggle.png)

![Value - Slider](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-slider.png)

![Value - Select](assets/Images/gsoc26-Syed-khubayb-ur-rahman/storybook-value-select.png)

---

## Next Week's Roadmap

- Successfully render a tower.
- Complete the rendering of the palette.

---

## Resources & References

- **PR:** [Add BrickViewInput #626](https://github.com/sugarlabs/musicblocks-v4/pull/626)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu, Safwan Sayeed and Justin Charles for their continued feedback and guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
