---
title: "GSoC '26 Week 12 Report by Rejah Rabeeul Haque"
excerpt: "Implemented multiplayer in Game Mode, enabling real time state synchronization, player spawning, network event handling, and shared territory capture through the Sugarizer shared activity network"
category: "DEVELOPER NEWS"
date: "2026-08-21"
slug: "2026-08-21-gsoc-26-rejah-rabeeul-haque-week12"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week12,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey everyone. This week, I worked on Collaborative Mode in Game Mode, allowing multiple users on different devices to play against each other in real time. Here’s a breakdown of everything I worked on.

---

## Shared Game Mode

The territory capture game now works over the Sugarizer shared activity network. When a host shares the activity while in Game Mode, other users can join and everyone plays on the same dot grid simultaneously. Each player controls their own head, leaves their own trail, and captures their own territory, all visible on every device in real time.

The game always requires at least two participants before it can begin. The Play button starts disabled and only becomes active once an opponent is present.

- Solo mode: The player must toggle the robot button to enable the AI opponent. The Play button only becomes active once the AI is present.

- Shared mode: The AI is disabled, and opponents are real users. The host's Play button becomes active once at least one network player joins. The game starts for everyone when the host presses Play.

When the host presses Play, a start signal is sent across the network. Every connected device receives this message and begins the game at the exact same moment. Each player starts at their assigned spawn position with a single dot of territory.

Only the host has the ability to restart the game, and the restart button is hidden for all other players. When the host restarts the match, a network message is broadcast, resetting every player to their original spawn position with fresh territory and an empty trail.

### Player Controls

The player can change direction using input methods. All follow the same rule: you cannot reverse direction (no 180° turns).

- Keyboard (Arrow Keys / WASD): Pressing an arrow key or its WASD equivalent queues the new direction. The direction change is applied when the player reaches the next grid intersection. The player cannot reverse direction (no 180° turns).
- Mouse Click / Tap: Clicking or tapping on the canvas selects a direction based on the clicked position relative to the player. The code compares the horizontal and vertical distances between the player's head and the click point. The larger distance determines whether the player turns horizontally or vertically.
- Mouse Drag / Swipe: Clicking and dragging, or swiping on touch devices, changes the player’s direction based on the gesture. The code tracks the movement delta from the previous mouse position. Once the drag exceeds 5 pixels on either axis, the dominant axis determines the new direction. This makes touch controls feel more natural.

### State Serialization and Synchronization

Every player continuously broadcasts their current state to the network. This includes their position, movement direction, next queued direction, trail points, captured territory, and player colors, all packed into a single network message. To avoid flooding the network, these updates are sent roughly every 100 milliseconds.

On the receiving end, the game takes this data and either creates a new opponent on the screen or updates an existing one. To keep movement looking smooth, the game locally predicts where opponents should be based on their last known direction and speed. When a new update arrives, it checks the distance: if the actual position is too far from the predicted position, it snaps the opponent to the correct coordinates. Otherwise, it simply updates their territory and queued direction without interrupting the smooth animation. 

This hybrid approach local simulation combined with periodic network correction keeps the multiplayer experience smooth and responsive. With a maximum of eight players in a game, the update frequency provides enough synchronization while keeping network traffic manageable.

### Network Events

When a new user joins the shared session, the host sends them the current game state and assigns them a spawn point. The new player uses this information to set up their screen. At the same time, every existing player broadcasts their current state, ensuring the newcomer immediately sees everyone else on the grid.

When a user disconnects, the game detects their absence and removes their territory from the grid, and updates the lobby status.

Elimination works exactly the same way as in solo mode: hitting a wall, running into your own trail, or having your trail crossed by someone else. When a player is eliminated, they send one final broadcast so everyone's screen updates to show they are out. The match ends when only one player remains alive.

---

## Game Mode Architecture

Game Mode is built as one self contained module. Every frame, it goes through a fixed sequence of steps to keep everything moving and in sync.

- Setting up a player — When a new player joins (or the game restarts), the game creates a fresh player record. This stores where they start, which direction they are facing, what color they use, a set containing their single starting dot of territory, and an empty trail. The same setup logic is used for every player.

- Moving players — Every frame, each player advances a tiny amount in their current direction. The speed is slow enough that the movement looks smooth, but the actual game logic only processes events at grid intersections. When a player snaps to a dot, the game checks whether they are inside or outside their own territory and updates the trail accordingly. If they have just returned home with a trail behind them, the territory capture runs immediately.

- Capturing territory — When a player closes their loop by stepping back inside their own territory, the game calculates which grid cells are now enclosed and adds them all at once. Any cells that previously belonged to an opponent are taken away from that opponent at the same time.

- Checking eliminations — After all players have moved for the current frame, the game checks every player against every other player for collisions: hitting a wall, crossing your own trail, an opponent crossing your trail, or two heads meeting. The outcome of each collision is resolved and dead players are removed.

- Network sync — Each player's position, direction, trail, and territory are packaged into a compact snapshot and sent to all other devices. On arrival, each device either registers a new opponent or updates an existing one. Drawing is done separately in two passes: territory and trails are drawn first, then the player heads are drawn on top so they always appear above everything else.


---

## Territory Capture Algorithm

When a player closes their trail by returning to their own territory, the game needs to figure out which grid cells are now enclosed. The approach is an inverse flood fill:

1. Merge the player's existing territory and trail into a boundary set.
2. Start a BFS from every cell on the grid's outer edges that is not part of the boundary.
3. The BFS spreads inward, but cannot pass through boundary cells.
4. After the BFS finishes, any cell that was never visited must be enclosed inside the loop.
5. All unvisited cells are added to the player's territory, and if any of them belonged to an opponent, they are removed from the opponent's territory set.

---

## Challenges Faced

- Getting the network sync to feel smooth was the biggest challenge. Sending full state every frame would flood the network, but sending too infrequently would cause players to teleport. The 100ms throttle with local prediction in between struck a good balance.
- Handling joiners required careful coordination. The joiner needs to receive the host's state, set up their own spawn, and also see every other player's current position and territory. This meant every existing player had to broadcast their state when a new user appeared, not just the host.
- Detecting eliminations across multiple players required checking every player against every other player. The collision system had to be generalized to support any number of players without missing possible interactions.

---

## What's Next

- Improve the user experience in Game Mode and update the Game Mode icon to better represent the actual gameplay.
- Create tutorials for both Draw Mode and Number Mode so that new users can quickly understand how each mode works.

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the continuous guidance, and to the Sugar Labs community for the support.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week’s update. Feel free to reach out if you have any questions or feedback.*