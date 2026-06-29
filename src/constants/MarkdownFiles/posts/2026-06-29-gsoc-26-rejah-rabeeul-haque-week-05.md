---
title: "GSoC '26 Week 5 Report by Rejah Rabeeul Haque"
excerpt: "Refining activity behavior, implementing rules and unit tests, and implementing Number Mode."
category: "DEVELOPER NEWS"
date: "2026-06-29"
slug: "2026-06-29-gsoc-26-rejah-rabeeul-haque-week05"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week05,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! This week was focused on fixing current activity behavior, defining rules for activity behavior, building automated unit tests, and starting the implementation of Number Mode. Here is a detailed breakdown:

---

### Fixing current behavior

- I refined the unfill logic and animation that occurs after erasing a figure's path. It was already working, but needed some refinement. Also, when the activity reopens after saving the animation starts to play which was not the intended behavior.
- Fixed synchronization issues across shared instances so that shape completions, fill colors, and eraser modifications propagate correctly. This ensures all connected users maintain a consistent view of the canvas state.

### Implementing Behavioral Rules & Unit Testing

To ensure that upcoming code updates don't break the drawing logic, I documented the rules for how the activity should behave:

1) When closing a figure, the current paint color fills the figure(s) closed.
2) When closing a figure inside another figure, the new closed figure(s) are filled with the current paint color.
3) When closing a figure outside another figure, the new closed figure is filled with the current paint color without affecting the inner figures.
4) When a closed figure is erased, its fill color shrinks.
5) When a outer closed figure is erased, its fill color shrinks away without affecting the inner figure(s) fill.

To verify these rules automatically after each update to the activity, I also implemented automated unit testing. It still needs refinement to work better.

### Starting Number Mode Implementation

- Started the implementation of Number Mode, where users can select predefined drawings or create their own drawings and the activity will display dots on the canvas according to that sequence. The user has to connect the dots in the correct order to form the drawing.
- Currently, I've implemented two libraries Basic Shapes and Objects which contains drawings.

![ConnectTheDots Number Mode Library of Drawings](/assets/Developers/Rejah/connectthedots-number-mode1.webp)

- After selecting a drawing, the user can connect the numbered dots and at the end, the complete drawing will be formed.

![ConnectTheDots Number Mode Completing a Drawing](/assets/Developers/Rejah/connectthedots-number-mode2.webp)

---

## Challenges Faced

- Creating a simple way to test those rules so that we can verify the activity's behavior automatically after each update was challenging. I've implemented it, but it still requires much more improvement.
- The erase logic for the activity was also a bit challenging.

---

## What's Next

- Continuing the implementation of Number Mode.
- Improving the automated unit testing.
- Fixing issues in current behavior.

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