---
title: "GSoC '26 Week 9 Update by Shreya Saxena"
excerpt: "A lighter week due to travel and the start of college, a GSoC Alumni Camp lightning talk, and plans to tackle load time and a scheduling issue flagged by Devin."
category: "DEVELOPER NEWS"
date: "2026-07-27"
slug: "2026-07-27-gsoc-26-shreya-saxena-week09"
author: "@/constants/MarkdownFiles/authors/shreya-saxena.md"
tags: "gsoc26,sugarlabs,musicblocks,performance,week09,shreya-saxena"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 9 Progress Report by Shreya Saxena

**Project:** [Music Blocks Performance](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#music-blocks-performance)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Om Santosh Suneri](https://github.com/omsuneri)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-20 – 2026-07-26

---

## A Lighter Week

This was a slower week for me on the code side. I had to head back to college after my summer break, and most of my time went into traveling and settling back in. I could only manage to review a few pending performance PRs. I let Walter know about this so he was in the loop.

---

## GSoC Alumni Camp, Delhi

<p align="center">
  <img
    src="assets/Developers/shreya-saxena/GSoC-Alumni-Camp.jpeg"
    alt="Presenting the Music Blocks Performance project during a lightning talk."
    width="600"
  />
</p>

On 24th July, I had the opportunity to attend the GSoC Alumni Camp in Delhi, where I delivered a lightning talk on my Music Blocks Performance project.

The event was a great opportunity to connect with members of the open-source community, exchange ideas, and learn from their experiences. I also had the chance to meet a few contributors from [Sugar Labs](https://github.com/sugarlabs), making the experience even more meaningful.

Although I was a bit nervous initially, stepping out of my comfort zone and engaging with new people made the experience truly rewarding.

Overall, it was an inspiring experience, and I’m grateful for the opportunity to be a part of it.

---

## Plans for Next Week

Getting back into the swing of things, I'll be picking up work on load time next.

Separately, Devin flagged a couple of useful points that I want to dig into:

- **New benchmark project:** Adding the [Doraemon-theme](https://github.com/sugarlabs/musicblocks/blob/master/examples/Doraemon-theme.html) project to the benchmark set as it has a lot of notes that need to be performed in time, which should stress-test timing accuracy well.
- **Parallel scheduling issue:** Performance is smooth with a single `on every note do` block, but when two start blocks use it simultaneously, performance degrades and the rhythm begins to drift. This is worth investigating and may require a user-facing warning if it cannot be resolved.

---

## Resources & References

- **Repository:** [Music Blocks](https://github.com/sugarlabs/musicblocks)

---

## Acknowledgments

Thanks to Walter Bender and Om Suneri for being so understanding about a slower week on my end, and for continuing to support and guide me despite it. I really appreciate the flexibility and mentorship, and I'm looking forward to picking up the pace again next week.
