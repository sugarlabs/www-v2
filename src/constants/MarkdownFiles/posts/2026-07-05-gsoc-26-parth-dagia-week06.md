---
title: "GSoC '26 Week 6 Update by Parth Dagia"
excerpt: "Back from exams: built the Brick Palette config and shell components, wrote unit tests for them, and started positioning bricks in the tower."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-gsoc-26-parth-dagia-week06"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week06,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-29 – 2026-07-05  

---

## Goals for This Week

- Define the config object for the Brick Palette.
- Build the palette shell components on top of that config.
- Write unit tests for the palette components.
- Start positioning the bricks in the tower.

---

## This Week's Achievements

### Palette configuration - [PR #653](https://github.com/sugarlabs/musicblocks-v4/pull/653)

Back from exams, I picked up the palette side of the plan Syed and I made before the break. The first step was the config object, following the same pattern we used earlier for the Brick config. The Palette is modelled as a three-level tree, matching the Techspec: a **Category** (name, icon, sections) at the top, like "Music"; a **Section** (name, icon, color, bricks) inside it, like "Pitch"; and a **Brick** (id, name, description, thumbnail, bbox) as the catalog entry. It's just the type definitions plus a short entry in the module's specification doc, so everything built after it has a single shape to agree on.

### Palette shell components - [PR #657](https://github.com/sugarlabs/musicblocks-v4/pull/657)

With the config in place, I built the shell of the Brick Palette: a category rail, a search box, a section list, and placeholder brick slots, all driven by the `PaletteConfig` types. The components use shadcn and Tailwind, so there's no custom stylesheet to maintain. Each component gets its own Storybook story along with a mock config, which means the whole palette can be previewed in isolation without touching the rest of the app. Rendering the real bricks inside the slots is the piece Syed takes over, as we planned.

### Unit tests for the Palette - [PR #662](https://github.com/sugarlabs/musicblocks-v4/pull/662)

After the components were up, I wrote unit tests for the Palette so the shell doesn't silently break as we build on top of it: rendering from the config, switching categories, and the search behaviour.

### Positioning the bricks in the tower

The other half of the swap was mine to finish: positioning the bricks in the tower that Syed built. Before writing anything, I spent time reading through his code to understand how the tower is structured, and then started on the positioning logic that places each brick where it belongs in the stack.

---

## Challenge

The positioning work was my first real time working with DSA-heavy code in this project, and it's on top of code I didn't write. Reading your own code is one thing; reading a fellow contributor's tree-and-layout logic and holding it all in your head is another, and it takes noticeably longer. So I went slower than usual before touching anything, but honestly it was fun - I came out the other side understanding the tower much better than if I had only worked on my own half.

---

## Next Week's Roadmap

Next up is bringing the bricks from the palette into the workspace. We haven't planned yet how we'll divide that work between us, but we're moving at the pace we planned, so hopefully we deliver the MVP this summer as intended.

---

## Resources & References

- **PRs:** [#653 Palette config](https://github.com/sugarlabs/musicblocks-v4/pull/653), [#657 Palette shell components](https://github.com/sugarlabs/musicblocks-v4/pull/657), [#662 Palette unit tests](https://github.com/sugarlabs/musicblocks-v4/pull/662)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Syed for writing code that was worth the read, and to Anindya Kundu, Justin Charles, and Safwan Sayeed for their continued guidance. Thanks also to Devin Ulibarri, Walter Bender, and the Sugar Labs community.

---
