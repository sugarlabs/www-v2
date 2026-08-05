---
title: "GSoC '26 Week 8 Update by Parth Dagia"
excerpt: "Started working through the six-week plan: taught the Brick path utility to hand back connector coordinates, then reworked it to return connector bounds instead of single points, and turned last week's plan into real tickets so the connection work moves steadily."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-gsoc-26-parth-dagia-week08"
author: "@/constants/MarkdownFiles/authors/parth-dagia.md"
tags: "gsoc26,sugarlabs,musicblocks,week08,parth-dagia"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Parth Dagia

**Project:** [Music Blocks 4 Program Builder](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya), [Justin Charles](https://github.com/justin212407), [Safwan Sayeed](https://github.com/sa-fw-an)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 – 2026-07-19  

---

## Goals for This Week

- Start the snapping track with the first piece the rest of it stands on: make the Brick path utility hand back the coordinates of every connector.
- Turn last week's plan into actual tickets in the repo and assign them, so the next six weeks are something we can track instead of a plan sitting in a doc.

---

## This Week's Achievements

### Connector coordinates from the Brick path utility - [PR #710](https://github.com/sugarlabs/musicblocks-v4/pull/710)

This is the groundwork the whole snapping story depends on. Until now the path utility only knew how to draw a Brick's outline; it had no idea where a Brick's connection points actually sat. Without those coordinates there's nothing for a QuadTree to index and nothing to snap against, so this had to come first.

I added a `getConnectorCoords` method to the `BrickOutlineGenerator` that returns each connector's point, grouped by type: the previous connector at the top, the next connector at the bottom, the nested next inside a compound Brick, the output on the left, and zero or more argument inputs on the right. I also wrote unit tests for it and updated the Path harness so you can see the points marked on the Brick while I work on it.

![Each connector marked as a single point on the Path harness: the previous connector at the top, the argument input slots on the right, the nested next inside the compound Brick, and the next connector at the bottom.](/assets/Developers/parth-dagia/gsoc26-week8-connector-coords.png)

### Connector bounds instead of centroid points - [PR #728](https://github.com/sugarlabs/musicblocks-v4/pull/728)

After the first PR, Anindya pointed out something I'd want to fix before building on top of it. A single centroid point tells you where a connector is, but not how big it is, and snapping really cares about the area a connecting Brick meets, not just a dot. So this PR changes `getConnectorCoords` to return connector bounds with a real footprint size instead of a lone point.

Now each connector comes back as a small box covering the space it actually occupies, and I updated the harness to draw those boxes rather than dots. It's a small change on paper, but it's the difference between "roughly here" and "this is the region a Brick snaps into", which matters a lot once the QuadTree starts asking which connector is nearest the cursor.

![The same connectors returned as bounds with a real footprint instead of a single point, so each one covers the region a connecting Brick actually snaps against.](/assets/Developers/parth-dagia/gsoc26-week8-connector-bounds.png)

### Tickets for the next six weeks

Last week Syed and I broke the connection work into epics, stories, and tasks. This week I moved that out of the planning doc and into the repo: I opened tickets for each piece and assigned them in the order we agreed on, so the roadmap is now something everyone can see and track instead of a plan living in a document. Anyone who wants to follow along can check the full breakdown here: [planning doc](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.rlueajs95u4n).

---

## Challenge

The interesting part this week wasn't writing either PR, it was the small correction between them. It's easy to build something that looks done, return a coordinate, mark it on screen, tests passing, and move on. Bounds instead of a point is exactly the kind of thing that would have been painful to unwind later, once the QuadTree and the snapping logic were already assuming a single point. Catching it early, thanks to Anindya's review, is a good reminder that the cheapest time to change a shape is before anything is built on top of it.

---

## Next Week's Roadmap

With connectors now reporting where they are and how big they are, next up is storing those connection points in the Workspace as Bricks come and go, and then building the QuadTrees on top: one for Statement connection points and one for Argument slots. That's what makes finding the nearest open connection point to the cursor fast enough to snap against, which is the next real milestone.

---

## Resources & References

- **PR:** [#710 Update the Brick path utility to return connector co-ordinates](https://github.com/sugarlabs/musicblocks-v4/pull/710)
- **PR:** [#728 Return connector bounds with footprint size instead of centroid points](https://github.com/sugarlabs/musicblocks-v4/pull/728)
- **Planning:** [Six-week plan and tickets](https://docs.google.com/document/d/1HvP4gbiqo-_rJ6ipnIoOJHkO0GlawaO6mVhU1YRzz8Q/edit?tab=t.rlueajs95u4n)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Thanks to Anindya Kundu for the review that turned connector points into connector bounds, and to Syed for planning the road ahead with me. Thanks also to Justin Charles and Safwan Sayeed for their continued guidance, and to Devin Ulibarri, Walter Bender, and the wider Sugar Labs community.

---
