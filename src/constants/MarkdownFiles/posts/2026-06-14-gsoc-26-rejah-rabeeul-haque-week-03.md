---
title: "GSoC '26 Week 3 Report by Rejah Rabeeul Haque"
Week 3 update for my GSoC '26 project: Implemented the Pencil and Clear tools, determined the ideal grid size, and improved the dot wave animation.
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-gsoc-26-rejah-rabeeul-haque-week03"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week03,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! During Week 3, I made significant progress in refining the Connect The Dots activity for Sugarizer by adding new features and improving the user experience. Here's a breakdown of what I've done:

### Implementing Pencil and Clear Tools

I successfully implemented the Pencil and Clear tools for the Connect The Dots activity. This involved updating the drawing logic to define how the dots in a line should behave when a user draws, enabling freehand drawing with the Pencil tool, and allowing users to clear the entire canvas with the Clear tool. These additions enhance the creative possibilities for users engaging with the activity.

### Determining the Ideal Grid Size

I focused on optimizing the grid generation process by determining the ideal grid size of 13×15. The goal was to create a grid that is visually appealing, easy to interact with, and suitable for various screen sizes. After determining the ideal grid size, I tested it across multiple resolutions and devices, including Android and desktop devices.

![ConnectTheDots grid canvas with drawing](/assets/Developers/Rejah/connectthedots-grid-canvas-drawing.webp)

### Improving the Dot Wave Animation

I refined the dot wave animation in the Connect The Dots activity. The previous animation had some visual issues, so I worked on making it smoother. This involved adjusting the range of dots affected by the wave and refining the overall wave shape.


### Setting Up Shared Mode and Localization

I implemented the initial stage of Shared Mode in the Connect The Dots activity, which allows multiple users to collaborate on the same canvas. This involved updating the drawing logic to handle interactions from multiple users and ensuring that the canvas is properly synchronized across all users.    

Additionally, I set up the localization files to support multiple languages. This ensures that the activity's text, including the newly added tutorial strings, can be easily translated into English, Spanish and French.

---

## Challenges Faced

- Implementing the ideal grid size was a bit tricky because it needed to work across different screen sizes. I tested it on multiple devices and referred to the Pok Pok activity to find the ideal grid size.  
- Implementing the Pencil tool also required several visual changes to the canvas. When a user draws on the canvas, the dots along the line needed to behave differently from the rest of the dots. We needed to make these visual changes interactive so that users would have a better experience, which made this feature challenging to implement.

---

## What's Next

- Continuing the implementation of the Draw Mode.
- Refining the visuals of the dots while drawing.
- Testing on different devices.

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the continuous guidance, and the Sugar Labs community for the support.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots activity Repository**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*