---
title: "GSoC '26 Week 13 Report by Rejah Rabeeul Haque"
excerpt: "Improved Game Mode with speed adjuster, XO buddy colors, spawn positioning, and 50% win condition, added localized tutorials for Draw and Number Mode, and added Journal save for Draw Mode."
category: "DEVELOPER NEWS"
date: "2026-08-26"
slug: "2026-08-26-gsoc-26-rejah-rabeeul-haque-week13"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week13,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hello Everyone! This week I improved the Game Mode by adding the speed adjuster, XO buddy colors, player positioning and redesigned the Game Mode icon. I also completed tutorials for both Draw Mode and Number Mode. Here is a detailed breakdown of the work.

### Interactive Tutorials

Added step by step tutorials for Draw Mode and Number Mode using Intro.js. The tutorials dynamically identify the relevant buttons and canvas elements and display only the steps required for each mode. Each step includes localized text, with support for English, French, and Spanish.

### Game Mode Speed Adjuster

Added a speed palette so players can adjust movement speed in a match. The slider maps a 0-100 range to 0.01-0.10 grid units per frame using speed = 0.01 + (value x 0.0009), so the player never fully stops but can go noticeably fast at the top end.

### XO Buddy Colors and AI Color Selection

Each player's territory, trail, and head are drawn in their personal XO colors, read from the Sugarizer profile at load time.

For the AI, the activity runs a filter over Sugarizer's built-in XO color palette and removes any buddy color combination whose exact stroke and fill pair matches the player's color pair. Then it picks one at random from what is left. So if your XO colors are blue and dark blue, only that specific blue/dark blue combination is excluded.

![Player and AI territory rendered with XO buddy colors](/assets/Developers/Rejah/connectthedots-xo-colors.webp)

### Player Positioning Algorithm

Spawn positions are assigned so every player starts on an edge:

1. Players are assigned edges in round robin order: left → right → top → bottom, then repeating for players 5–8.
2. Single occupant (players 1–4): The first player on any edge spawns at the midpoint of that edge.
3. Two occupants (players 5–8): When a second player is assigned to the same edge, both positions are recalculated so they sit at the 1/3 and 2/3 marks of that edge.
4. The position fraction is multiplied by the grid dimension to get the grid cell, then converted to canvas pixels using cellSize.
5. Each edge recalculates its own positions independently, so changes on one edge don't affect any other.

![Multiplayer spawn positions showing 1/3 and 2/3 edge placement](/assets/Developers/Rejah/connectthedots-spawn-positions.webp)

### Win Condition Logic


1. For each player, the number of grid cells tagged with their player ID are counted.
2. If any single player's count exceeds 50% of the total grid area (i.e., half of the entire board), they are immediately declared the winner.
3. The win sequence fires, the game state is set to finished, and the result is broadcast via the Sugarizer shared activity to every connected client simultaneously.

### "Add to Journal" Integration

Added a save button to the Draw Mode toolbar. Clicking it grabs the canvas as an image, packages it with Sugarizer metadata pointing to the Media Viewer, and saves it to the datastore. On success, a notification says "Image saved to journal!".

---

## Challenges Faced

- The main challenge was implementation itself. Every new feature added had a tendency to break something that was already working, so a lot of time went into keeping things stable while building forward.

---

## What's Next

- Improve Game Mode with difficulty levels for the AI opponent.
- Add tooltips across the activity for better discoverability.
- Add a full tutorial for Game Mode.

---

## Acknowledgments

Thanks to my mentor Lionel Laske for the continuous guidance and patience, and to the Sugar Labs community for the support.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*