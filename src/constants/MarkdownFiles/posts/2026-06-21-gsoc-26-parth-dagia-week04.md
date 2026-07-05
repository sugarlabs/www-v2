---
title: "GSoC '26 Week 4 Update by Parth Dagia"
excerpt: "Collaborating on BrickViewFixed, setting up Tailwind in the masonry module, and writing tests for the path2 outline generator."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-gsoc-26-parth-dagia-week04"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week04,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-15 – 2026-06-21  

---

## Goals for This Week

- Work with Syed on the `BrickViewFixed` display-only view component.
- Set up Tailwind CSS in the masonry module so components can use utility classes.
- Write unit tests for the `path2` outline generator from the last few weeks.

---

## This Week's Achievements

### BrickViewFixed - collaboration with Syed

Paired with [Syed](https://github.com/kh-ub-ayb) on `BrickViewFixed`, a sub-component of the generic `BrickView` that presents bricks containing display widgets (not input widgets). It supports all three brick kinds: value, expression, and statement. Props are derived from the `BrickView` prop type definitions, and a Storybook story covers the variations.

The component itself, the prop derivation, and the four Storybook variations are covered in detail in Syed's [Week 4 post](https://github.com/sugarlabs/www-v2/pull/908).

### Tailwind CSS in the masonry module - [PR #607](https://github.com/sugarlabs/musicblocks-v4/pull/607)

Added Tailwind CSS v4 to the masonry module and wired it into the two dev surfaces, the playground and Storybook. A single shared `tailwind.css` imports `tailwindcss`, the playground's `vite.config.ts` registers the `@tailwindcss/vite` plugin, and `.storybook/main.ts` adds the same plugin to `viteFinal`. Tailwind v4 doesn't need a `tailwind.config.js` or a PostCSS config, so the setup stays small.

After this, any masonry component can use utility classes (`bg-sky-500`, `rounded-xl`, `flex`, etc.) directly.

### Unit tests for path2 - [PR #609](https://github.com/sugarlabs/musicblocks-v4/pull/609)

Wrote unit tests for the `path2` outline generator built across weeks 2 and 3 (stroke-width handling, left and right notches, and corner radius).

The tests cover the width and height formulas, the path strings at different stroke widths and corner radii, arc count and convex vs concave sweep flags on the rounded corners, the closed-loop property, and groove and tab alignment under variable argument heights.

---

## Next Week's Roadmap

I have university exams this week, so I will be away until **30th June**. No new work planned during that window.

Once exams are done, I'll pick up the decorator parameters (label text, colour, background colour, state properties) and finish off the brick definition.

---

## Resources & References

- **PRs:** [#607 Tailwind CSS setup](https://github.com/sugarlabs/musicblocks-v4/pull/607), [#609 path2 unit tests](https://github.com/sugarlabs/musicblocks-v4/pull/609)
- **BrickViewFixed (collaboration):** [Syed's PR #606](https://github.com/sugarlabs/musicblocks-v4/pull/606)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Syed for the collaboration on BrickViewFixed, and to Anindya Kundu, Justin Charles, and Safwan Sayeed for their continued feedback. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
