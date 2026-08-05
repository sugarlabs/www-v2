---
title: "GSoC '26 Week 10 Report by Rejah Rabeeul Haque"
excerpt: "Added a stop button for the host in number mode shared mode, added labels for figures, introduced new built in categories, and fixed bugs."
category: "DEVELOPER NEWS"
date: "2026-08-02"
slug: "2026-08-02-gsoc-26-rejah-rabeeul-haque-week10"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week10,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hello again. This week I focused on improving the ConnectTheDots activity. The work covered giving the host more control during a shared game, adding labels to figures, expanding the built in figure library with new categories, and fixing a couple of bugs.

Here is a detailed breakdown:

---

## Stop Button for the Host

I added a "Stop Game" button that only the host (the person who shared the activity) can see and use. Players who joined cannot see this button.

Here is how it works step by step:

1. When the host starts a shared challenge, the Stop button appears in the toolbar for the host only. The code checks whether the current user is the host before making the button visible.
2. When the host clicks it, their computer sends a special "stop game" message across the network to all other players in the session.
3. Every other player's computer is always listening for incoming messages. When it receives this message, it immediately stops the local timer and shows the final score screen.
4. The host's own machine also stops the game at the same moment, so everything ends together for everyone.

This was also a help during testing. Instead of waiting for the full timer to run out every single test run, I could just click Stop and jump straight to the end screen to verify the results.

---

## Labels for Figures

Before this change, the figure gallery showed dot patterns as small thumbnail cards with no names. A player had to guess what the shape was just by looking at the dots.

I added a text label below every figure card in the gallery. Each figure already had a name stored with it internally, and now that name is shown below the thumbnail so players always know exactly what they are picking. For the built in figures, these names also go through the localization system, so they can be translated to other languages.

This label carries through to the figure editor too. When you click the button to add a new figure or edit an existing one, a form now appears asking you to type in the figure's name. The form does not let you confirm until you have actually typed something, so you cannot save a figure with no name.

When you finish drawing the dots and click the Save/Back button, a form pops up asking you to enter a name for the figure. The user types the name and hits Confirm, and the figure gets saved with that label. So the naming step works the same way for both creating new figures and editing old ones.

---

## New Built in Categories

Previously, the game only shipped with two built in categories: Basic Shapes and Objects. This week I added four more:

- Numbers — figures shaped like the digits 1 through 9
- Symbols / Signs — figures like Plus, Arrow, Cross, Checkmark, Heart, Crown, and more
- Tools — figures like Wrench, Hammer, Axe, Key, Drill, and more
- Home — figures like Lamp, Door, Chair, Mug, Sofa, and more

Each figure is stored as a list of dot positions (grid column and row), plus a closed flag that tells the game to connect the last dot back to the first one to close the shape. For example, a simple Square looks like this:

```js
{ name: 'Square', points: [[3,2],[11,2],[11,10],[3,10]], closed: true }
```

These four dots are placed at the the grid, and closed means the game will draw the fourth line back to the start automatically.

![New Categories](/assets/Developers/Rejah/connectthedots-week10-categories.webp)

---

## Bug Fixes

- Fixed No Timer Mode

The "No Timer" option was broken because the display was trying to show a countdown that never existed. The fix makes the display show just the score instead, and the game now runs indefinitely until the host presses Stop.

- Removed the Back Button During Play

When a player selected a figure from the gallery and was drawing it, there was a "Back" button on the canvas. Pressing it would clear the current drawing and return to the figure picker.

During a challenge, this was a problem. A player who got a difficult figure could press Back, skip it, and load the next figure. This let them dodge hard shapes and keep their score going without actually completing them, which is cheating.

I removed the back button from the play view during shared mode challenges. The button is now hidden whenever a player is inside a shared session. It still exists and works fine in solo mode, but it no longer appears when it could be used to gain an unfair advantage.

---

## Challenges Faced

Adding the new built in categories and figures required careful design to ensure each shape was easily recognizable within the dot grid. I also implemented the label feature across both the create and edit flows, making sure the name input behaved consistently and appeared correctly in both scenarios.

---

## What's Next

- Fix the remaining issues in the current implementation.
- Start the implementation of Game Mode.

---

## Acknowledgments

A big thank you to my mentor Lionel Laské for his continuous guidance, and to everyone at Sugar Labs for the support.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*
