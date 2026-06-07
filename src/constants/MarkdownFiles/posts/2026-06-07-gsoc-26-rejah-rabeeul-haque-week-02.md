---
title: "GSoC '26 Week 2 Update by Rejah Rabeeul Haque"
excerpt: "Started creation of the Connect The Dots activity."
category: "DEVELOPER NEWS"
date: "2026-06-07"
slug: "2026-06-07-gsoc-26-rejah-rabeeul-haque-week02"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week02,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->


## This Week's Progress

Hey! In Week 2 of GSoC 2026 I've started the creation of the Connect The Dots activity for Sugarizer. Here is a breakdown of what I've done:

### Starting Creation of the Activity

After completing all the mockups for the activity, the main focus was on starting to build the activity structure and the grid canvas that will be used for all modes. I started off by setting up the base activity structure in the Sugarizer framework. This involved:

- Initializing the activity directory (`ConnectTheDots.activity`).
- Setting up the core files including `activity.js`, `activity.css`, and `index.html`.
- Making sure that the activity correctly registers within the Sugarizer environment.

I then implemented the initial logic to handle dot sizes. When a user hovers or touches the dot grid, the nearby dots enlarge in a star shaped pattern according to the direction of the cursor/touch, which ensures a smooth and responsive user experience.   

![ConnectTheDots Grid Canvas](/assets/Developers/Rejah/connectthedots-grid-canvas.webp)

The other task was to find the perfect icon for the activity that helps the users understand the activity before they even start to playing. I've used Inkscape and other AI tools to create this icon  

![ConnectTheDots Icon](/assets/Developers/Rejah/connectthedots-icon.webp)

These improvements will help in the implementation of the Draw Mode, Number Mode, and Game Mode in the upcoming weeks.

---


### Testing Phase

After creating the grid canvas, I needed to test it across multiple resolutions, so I tested it on multiple devices including Android and Desktop devices. 

Beyond this testing, I tested the activity by creating and installing my own Android APK through

**Sugarizer-apkbuilder Repository**:[https://github.com/llaske/sugarizer-apkbuilder#change-activity-set](https://github.com/llaske/sugarizer-apkbuilder#change-activity-set)


---

## Challenges Faced

Finding the perfect icon for the activity was a bit challenging. But eventually with the help of the mentor, I created the activity icon. 
Another challenge was making the dots responsive so that they formed a visually appealing pattern with different sizes when a user interacted with them.

---

## What's Next

- Continuing the implementation of the Draw Mode.
- Refining the calculation of dots in the canvas.
- Testing on differenct devices.

---

## Acknowledgments

I would like to thank my mentor Lionel Laské for his constant guidance and support everytime. I would also like to thank the Sugar Labs community for providing such a wonderful platform to work on.

---

## Links

- **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots activity Repository**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*