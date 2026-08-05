---
title: "GSoC '26 Week 08 Update by Ashutosh Singh"
excerpt: "A real pass on the UI and UX with live click-to-refine, version history, and model-drawn icons, then proper packaging and an AppImage, and cutting the first real release: v1.1.0."
category: "DEVELOPER NEWS"
date: "2026-07-22"
slug: "2026-07-22-gsoc-26-ashutoshx7-week08"
author: "@/constants/MarkdownFiles/authors/ashutosh-singh.md"
description: "GSoC'26 Contributor at SugarLabs working on Sugar Activity on Demand"
tags: "gsoc26,sugarlabs,week08,ashutoshx7,ui-ux,packaging,appimage,release,ai,llm"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Ashutosh Singh

**Project:** [Sugar Activity on Demand](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#sugar-activity-on-demand)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** July 14, 2026 to July 20, 2026  

---

## Goals for This Week

- Do a proper pass on the UI and UX now that the engine underneath is trustworthy
- Make refining an activity feel direct: point at the preview, describe a change, get a small patch
- Package AOD properly, including an AppImage anyone can run without a setup dance
- Cut the first real release

---

## This Week's Achievements

The last few weeks were all about the engine. Week 7 gave generated activities a debugging layer, so by now the thing that comes out of the pipeline is usually solid. That freed me up to look at the parts a person actually touches, and to finally make AOD something you download rather than something you build.

So this week had two halves. The first was a real pass on the UI and the UX. The second was packaging it up and cutting the first release.

![The studio keeps a full version history, so every refinement is a revision you can move between rather than a one-way change](assets/Images/gsoc26-ashutoshx7/aod-studio-versions.png)

### 1. UI and UX Improvements

The biggest UX change is live refinement. Instead of only being able to regenerate the whole activity, you can now click a part of the preview, describe the change you want in plain words, and the studio applies it. Under the hood this lives in `refine.py`, and the model returns a SEARCH/REPLACE patch rather than a brand new file. That matters for a real reason: if every small change regenerated the whole activity, you would lose everything that was already working and roll the dice again. A targeted patch keeps the parts you liked and only touches what you asked about.

Because refinement edits real code, I did not want it to be a one-way door, so every prompt and refinement is kept as a revision. You can look back at earlier versions and move between them, which is what makes it safe to experiment. Try a bold change knowing the previous good version is still right there.

I also spent time on the smaller things that add up. Chip and button labels that were unreadable under the Sugar GTK theme got fixed. And every generated activity now gets its own icon instead of a shared placeholder, drawn by the model in `icons.py` as a small SVG on Sugar's color entities, strictly sanitized and with a safe glyph fallback. A home screen full of activities finally looks like a home screen full of different things.

### 2. Proper Packaging and an AppImage

Then the distribution side. AOD could already build to a Flatpak, but I wanted the lowest-friction thing possible for a tester: a single file they double-click. So I put proper packaging in place and built an **AppImage**, one portable file that carries what it needs and runs on any modern Linux desktop with no install step and no dependency hunt. Between the pip install, the Flatpak, and now the AppImage, there is a path in for basically anyone, whether they live in a terminal or not.

### 3. The First Release: v1.1.0

With the engine trustworthy, the UX cleaned up, and the packaging sorted, it was finally time to put a version number on it. AOD is now a released project under the Sugar Labs organization, and this week I cut its first real release.

**Download it here: [Sugar Activity on Demand v1.1.0](https://github.com/sugarlabs/Sugar-activity-on-Demand/releases/tag/v1.1.0)**

Seeing it land as a tagged release on `sugarlabs/Sugar-activity-on-Demand`, with a downloadable build attached, was genuinely a milestone. Two months ago this was an idea in a proposal. It is now something a stranger can download, run, and use to make a real Sugar activity.

---

## Challenges & How I Overcame Them

**Making SEARCH/REPLACE patches apply reliably.** A patch is worthless if it does not match the code exactly. I had to handle whitespace normalization and near-miss matches, and firmly reject any patch that does not apply cleanly rather than letting it corrupt the file. A patch that cannot be applied precisely is treated as no patch at all.

**Getting the AppImage to carry the right pieces.** An AppImage has to bundle enough of the runtime to work on a machine that has never seen the app, without dragging in the whole world. Working out exactly what to include, so it starts cleanly on a fresh desktop but stays a reasonable size, took more iteration than I expected.

**Sanitizing model-generated SVG.** An icon that comes from a model is untrusted markup rendered in the UI. Stripping it down to plain shapes on Sugar color entities, and falling back to a safe glyph whenever anything looks off, keeps a cute feature from becoming an attack surface.

---

## Key Learnings

Once the engine is trustworthy, the interface becomes the product. For weeks the interesting problems were all under the hood. This week the interesting problems moved to the surface, to whether refining an activity feels direct and whether a person can get the app running at all. That is not a lesser kind of work, it is the part a user actually experiences.

Cutting a release is its own kind of forcing function. Putting a version number and a download link on something makes you honest about the rough edges, because now anyone can find them. Getting to v1.1.0 was less about adding features and more about deciding the thing was solid enough to hand out with my name on it.

This week also sat close to the heart of Sugar. Its learning path is Use, Modify, Create, and live refinement is the Modify step made real, so a learner is never stuck with whatever they were handed, they can reach in and change it. Keeping every revision rhymes with the Sugar Journal, where the process is worth saving and not just the finished result. And putting it out under Sugar Labs, free and open for anyone to run, read, and change, is the same software freedom Sugar has always stood on. It felt right that the first release was not just working software but software anyone can make their own.

---

## Next Week's Roadmap

- Start testing the release properly, with real people making real activities
- Build an annotation flow so a tester can point at what they see and turn it into a change
- Fold the first round of tester feedback straight back into the studio
- Keep an eye on the rough edges that only show up once other people are driving

---

## Acknowledgments

Thanks to Walter Bender for steadily pushing AOD toward something people can actually install and use, which is what made this packaging-and-release week feel like the obvious next step rather than a detour. Thanks to the Sugar Labs community for giving the project a home to be released under, and to Ibiam Chihurumnaya for the ongoing review.

---

## Connect with Me

- GitHub: [@Ashutoshx7](https://github.com/Ashutoshx7)
- Email: [ashutoshx002@gmail.com](mailto:ashutoshx002@gmail.com)
- Matrix: [@Ashutoshx7:matrix.org](https://matrix.to/#/@Ashutoshx7:matrix.org)

---
