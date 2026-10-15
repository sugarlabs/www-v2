---
title: "GSoC '26 Week 14 Report by Rejah Rabeeul Haque"
excerpt: "Wrapping up GSoC '26 with AI difficulty levels in Game Mode and in-game event notifications to improve the player experience."
category: "DEVELOPER NEWS"
date: "2026-08-31"
slug: "2026-08-31-gsoc-26-rejah-rabeeul-haque-week14"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week14,rejah-rabeeul-haque,final"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hello Everyone! This is my final weekly report. Over the last week, I focused on making the AI opponent in Game Mode smarter with different difficulty levels and adding helpful in game notifications for match events to keep players informed. Here's a breakdown of the work done.

### Game Mode AI Levels

To make Game Mode more engaging, I introduced three difficulty levels for the AI opponent: Level 1, Level 2, and Level 3. Players can change the difficulty level directly from the Game Mode toolbar. Each level drastically changes how the AI behaves on the board by evaluating the best possible move based on a set of rules.

Here is how the algorithm makes decisions:

1. Level 1: The AI behaves casually, with a 60% chance of making random moves, causing it to wander around the board. It does not actively target the player's trail or territory, making it suitable for beginners who are learning the game.

2. Level 2: The AI becomes more tactical, with random moves reduced to 15%. It generally moves toward the center of the board to claim more territory while monitoring the player's position. When the player gets too close, the AI prioritizes attacking their trail or territory.

3. Level 3: The AI provides the highest level of challenge, with no random movement. It actively targets the player's trail and head to create opportunities for collisions. It also avoids the edges, aggressively captures territory, and uses pathfinding to find the shortest route back to its safe zone when necessary.

### In game notification

In Game Mode, a lot can happen at once, especially with multiple players. To make sure players always know exactly what happened in the match, I added in game notifications that pop up when significant events occur.

Whenever an event triggers, a localized message is constructed and briefly displayed to the users. Here are the events that trigger these notifications:

- Hitting a Wall: If a player crashes into the boundary of the board, a notification appears saying `[Player Name] hit the wall`.
- Eliminations: If a player traps another by cutting off their trail, the game notifies everyone with `[Player Name] eliminated [Opponent Name]`.
- Mutual Eliminations: In the rare case of a head on collision where both players die, the notification reads `[Player Name] and [Opponent Name] eliminated each other`.
- Intercepts: When a player accidentally crosses their own active trail, the game displays `[Player Name] has been intercepted`.
- Winning the Game: The notifications also announce the winner, either with `[Player Name] won the game` or specifying a dominant victory with `[Player Name] fill more than 50% of the board`.

These notifications integrate seamlessly with Sugarizer's localization system, meaning they adapt automatically to the user's preferred language (e.g., English, French, Spanish). To prevent clutter during chaotic moments, a dictionary-based debounce system blocks identical notifications for 1500ms and cleans up entries after 2000ms.

---

## Final Thoughts

This brings me to the end of my Google Summer of Code 2026 journey with Sugar Labs. Working on Connect The Dots and integrating it into Sugarizer has been an incredible experience. Throughout the summer, I had the opportunity to work on different modes, multiplayer functionality, tutorials and localization, AI behavior, and overall improvements to the player experience.

What started as a project to build a new activity evolved into a much more complete activity with multiple modes to play, support for multiple players, and an AI opponent. Seeing these features come together and become part of Sugarizer has been incredibly rewarding.

Beyond the technical skills I gained, this experience also taught me a lot about working on a real open source project, understanding an existing codebase, responding to feedback, and collaborating with a community. I am grateful for everything I learned throughout this journey and excited to continue contributing to Sugar Labs and open source projects in the future.

---

## Acknowledgments

A massive thank you to my mentor, Lionel Laske, for his continuous guidance, insightful feedback, and endless patience throughout the entire summer. I would also like to thank the entire Sugar Labs community for their support and for making this such a welcoming environment to contribute to.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for following my journey this summer! Feel free to reach out if you have any questions or feedback.*