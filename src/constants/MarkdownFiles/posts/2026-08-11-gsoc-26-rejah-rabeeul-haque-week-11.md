---
title: "GSoC '26 Week 11 Report by Rejah Rabeeul Haque"
excerpt: "Implemented game mode with territory capture, AI opponent, trail coloring, label positioning for overlapping dots, localization for all categories and figures, and used AI for adding new categories."
category: "DEVELOPER NEWS"
date: "2026-08-11"
slug: "2026-08-11-gsoc-26-rejah-rabeeul-haque-week11"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week11,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hello everyone. This week I built the Game Mode, fixed the number label overlaps in Number Mode, completed localization for all categories and figures. Here is a detailed breakdown of the work.

---

## Game Mode

- Game Mode is a completely new way to play ConnectTheDots. Instead of connecting numbered dots, the player competes against an AI opponent to capture the most territory on the dot grid. The game plays on the same 15×13 dot grid used by the other modes.

- The player starts near the top left corner and the AI starts near the bottom right. Both move continuously in one direction at a time (up, down, left, or right), and the player can change direction using arrow keys, WASD, or by swiping/dragging on the canvas.

- Each player starts with a single dot of territory. When a player moves outside their own territory, they leave behind a colored trail. When they return to their territory, everything enclosed by the trail gets captured and added to their territory. The opponent's territory inside the captured area is taken over. A bar at the top of the screen shows how much of the grid each player currently owns.

- The game ends when one player is eliminated. A player is eliminated if they hit the grid boundary, run into their own trail, or if the opponent crosses their trail. If both players collide head to head, the one with more territory survives.

- When a player returns to their own territory after leaving a trail outside it, the game needs to figure out which grid squares are now enclosed. The approach uses an inward flood fill algorithm. A search starts from every dot on the grid edges and spreads inward, but it cannot cross the player's territory (the boundary). After the search finishes, any dot it could not reach must be trapped inside the loop, so it gets captured and added to the player's territory.
  * The capture algorithm works like a flood fill. Imagine pouring water from outside the player's closed loop. The water fills every reachable empty cell but is blocked by the player's trail. After the flood fill finishes, any unvisited cells are enclosed and are captured.

### AI Decision Making

  - The AI makes decisions only when it is near a grid intersection (a dot). At each intersection, it goes through several steps utilizing Breadth First Search (BFS) for pathfinding:
    * Example: BFS explores all neighboring dots first, then moves outward to their neighbors. If the AI needs to find the shortest path back to its territory, it first checks all dots 1 step away, then 2 steps away, then 3 steps away, and so on. Since BFS explores paths in order of distance, the first time it reaches the territory, it has found the shortest route.
  - Valid directions: It lists all directions it can move (up, down, left, right), removing any that would reverse direction, go out of bounds, or hit its own trail.
  - Safety check: For each valid direction, the AI runs a reachability check (BFS) to see if it can eventually get back to its own territory from there. If going left would trap the AI in a dead end with no way home, that direction is removed.
  - Panic mode: If the AI's trail gets longer than 6 dots, it panics. It uses BFS to search for the shortest path back to its territory and heads straight there to close the loop before the trail gets too long.
  - Scoring system: The AI gives each direction a score based on factors like attacking the player's trail, capturing territory, claiming unclaimed squares, and avoiding grid edges, then picks the direction with the highest score.

- When either player passes over dots on the grid, those dots now change color to match the player. This gives a clear visual of the trail's path. The `getDotColor` function checks if a dot's grid position matches any point in the user's or AI's trail, or if the head is currently sitting on that dot, and returns the appropriate color.

---

## Number Mode: Rotating Labels for Overlapping Dots

Some figures reuse the same dot for multiple steps in their drawing sequence (such as a figure like Boat). Previously, a player could not connect to the same dot more than once during play, and step numbers drawn on shared dots would stack directly on top of each other, making them unreadable.

To resolve this, the activity now supports visiting dots multiple times using a two pass counting algorithm. In the first pass, the rendering logic tracks how many times each dot is used. In the second drawing pass, it uses those counts to dynamically position each step number in a distinct corner around the dot. This keeps every step label clean, readable, and easy to follow.

---

## New Categories & Localization

I added some new built in categories - Numbers, Symbols/Signs, Tools, and Home, bringing more than 40 new figures to the activity. To design these shapes on the 15×13 grid, I used AI to generate the initial dot coordinate lists, which I then manually tested and adjusted on the canvas to ensure each figure was clear and recognizable.

Also, I completed full localization for all built in category and figure names across English (`en.json`), French (`fr.json`), and Spanish (`es.json`). The gallery automatically uses the correct translations for figure cards and headers, allowing the built in content to seamlessly adapt to the user's language.

---

## Challenges Faced

- The AI opponent required careful tuning. Too aggressive and it would constantly die by running into walls or its own trail. Too passive and it would just circle inside its own territory. The scoring system with the panic threshold at 6 trail points struck a good balance.
- The territory capture algorithm had to be efficient since it runs every time a player closes a loop. Using a set based inward fill from the grid edges made this fast enough to run without any noticeable lag.

---

## What's Next

- Improving and fixing the current implementation.
- Implementing Shared Mode to synchronize Game Mode across devices in real time.
- Implementing overlapping labels in the custom figure, allowing users to select the same dot multiple times when drawing their own shapes.

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the continuous guidance and patience, and the Sugar Labs community for the support.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*