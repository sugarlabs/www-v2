---
title: "GSoC '26 Week 4 Report by Rejah Rabeeul Haque"
excerpt: "Feature updates, implementation of color palette, fill color and erase tool."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-gsoc-26-rejah-rabeeul-haque-week04"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week04,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! Week 4 has been a busy week for the Connect The Dots activity. I focused on improving the drawing experience, implementing the color palette and erase tool. Here's a detailed breakdown:

---

### Implemented Color Palette and Fill Color

- I implemented a color palette in the activity, allowing users to choose from multiple colors directly from the toolbar. The selected color becomes the active color for later drawings, and the toolbar button updates to reflect the current selection.

- The dots in the current stroke update instantly to the selected color, and any newly closed figure is filled using that color.

![ConnectTheDots colored figure](/assets/Developers/Rejah/connectthedots-closed-colored-figure.webp)

### Implemented Erase Tool

The erase tool allows users to selectively remove parts of their drawing. Here's how it works:

- The erase tool allows users to erase by dragging across the dots. It detects nearby line segments and removes only the targeted portions.

- For closed shapes, the fill shrinks away after the shape opens, which provides a clear visual experience. A gray preview line follows the erase path during erasing.

### Feature Updates

- One tool is always active — The Draw tool is selected by default, and switching tools automatically keeps another tool active.

- Consistent line and dot coloring — All lines are drawn in black for clear visibility, while the dots in the current stroke use the selected fill color to provide visual experience.

- Enhanced closed figure visuals — Closed figures are automatically filled with the selected color, and dots inside the filled area appear in a darker shade.

---

## Challenges Faced

- Implementing the erase tool with stroke splitting required careful handling of edge cases, especially when erasing segments from closed shapes.
- Enhancing the user experience required careful observation and continuous guidance from my mentor.

---

## What's Next

- Continuing to refine the Draw Mode experience.
- Starting the implementation of Number Mode.
- Writing a set of rules to define the behavior of the activity and exploring ways to implement unit tests to validate these rules.

---

## Acknowledgments

Thanks to my mentor Lionel Laské for the continuous guidance, and the Sugar Labs community for the support.

---

## Links

-  **Sugarizer Repository**: [https://github.com/llaske/sugarizer](https://github.com/llaske/sugarizer)
- **Connect The Dots Pull Request**: [https://github.com/llaske/sugarizer/pull/2188](https://github.com/llaske/sugarizer/pull/2188)
- **GitHub Profile**: [https://github.com/Rejah-Rabeeul](https://github.com/Rejah-Rabeeul)

---

*Thanks for reading! Stay tuned for next week's update. Feel free to reach out if you have any questions or feedback.*