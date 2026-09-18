---
title: "GSoC '26 Week 9 Report by Rejah Rabeeul Haque"
excerpt: "Implemented shared mode and fixed various issues including saving to the journal and editable categories in the ConnectTheDots activity."
category: "DEVELOPER NEWS"
date: "2026-07-26"
slug: "2026-07-26-gsoc-26-rejah-rabeeul-haque-week09"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week09,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! This week, I focused on implementing Shared Mode for Number Mode, bringing competitive gameplay to the ConnectTheDots activity. Alongside this major feature, I also fixed several issues related to Journal state saving and editable categories, improving the user experience of the activity.

Here is a detailed breakdown of the work done:

---

## Shared Mode Implementation

- Competitive Challenge Mode in ConnectTheDots
  - I implemented the Shared Mode as a real time competitive challenge. When the host shares the activity to the neighborhood network, a timed challenge (default 2 minutes) automatically begins. Other users can see the shared session in their neighborhood view and join it.
  - Users compete against each other independently. Each user gets the same sequence of figures to complete as fast as possible. When a user finishes connecting all the dots for a figure, their local score increments and the next figure loads automatically.
  - Scores are only sent across the network when each player's timer runs out. At that point, each player broadcasts their final score. Once a player's timer ends, the end game leaderboard is displayed showing the scores received so far.
  - If a user joins a session that is already in progress, they receive the current category and the full challenge duration from the host. They get a fresh timer starting from the moment they join, giving them a fair chance to complete the sequence of figures from the beginning.

- Technical Details for Shared Mode
  - During a challenge, the game completely blocks all regular drawing broadcasts to avoid unnecessary network traffic. The only network message sent during a challenge is `finish-challenge`, which each player sends when their own timer runs out, containing their final score.
  - Each player's timer runs independently. There is no live score synchronization during the challenge, each player tracks their own score locally and only shares it at the end.
  - The host controls the game flow. They can restart the challenge, change the timer duration (1, 2, or 5 minutes) using the timer palette, and select the category for the next round. These actions send network messages to reset every player's board and timer before the next round begins.

  ![Shared Mode Canvas](/assets/Developers/Rejah/connectthedots-week9-shared-mode-2.webp)
  
  ![Shared Mode Leader Board](/assets/Developers/Rejah/connectthedots-week9-shared-mode-1.webp)

---

## Bug Fixes and Improvements

- Saving to Journal: One of the key improvements was fixing an issue where the activity state was not being saved correctly to the Sugarizer Journal. The save and restore workflow was refined so that the selected figure, connected lines, and overall drawing progress are now preserved correctly. When the activity is reopened, the previous state is restored, allowing users to continue exactly where they left off.

- Editable Category Fixes: Several issues related to the editable category feature were resolved to improve its reliability. In some cases, changes to custom categories were not persisting correctly or were not immediately reflected in the interface. The category management logic and state synchronization between storage and the UI were refined, ensuring that creating, editing, and deleting custom categories now behaves consistently across the activity.
  
- Additional Tweaks: Performed general code cleanup and resolved minor UI glitches that were identified during the testing of the Number Mode and the newly introduced Shared Mode features.

---

## Challenges Faced

- One of the challenges was handling new users who joined an ongoing challenge. The initialization logic had to ensure that a new user always started from the first figure of the selected category instead of the host's partially completed drawing. At the same time, each new user needed to start with their own full challenge timer, making sure everyone had an independent and consistent experience.
- Another challenge was ensuring that each player's timer runs independently while scores are exchanged only at the end, allowing the leaderboard to accurately reflect all players results. This required careful handling of network messages, as players timers may end at different times, and the leaderboard needs to update dynamically as each player's score arrives.


---

## What's Next

- Fix the remaining issues in the current implementation (Shared Mode, Time palette and Draw Mode).
- Expand the figure library with more categories and figures.
- Start the implementation of Game Mode

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the continuous guidance, and the Sugar Labs community for the ongoing support and feedback!

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*