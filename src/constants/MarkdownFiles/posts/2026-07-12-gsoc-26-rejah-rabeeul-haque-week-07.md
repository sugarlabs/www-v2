---
title: "GSoC '26 Week 7 Report by Rejah Rabeeul Haque"
excerpt: "Fixed current issues in ConnectTheDots including Number Mode UI enhancements, confetti animation, and implemented the Settings feature."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-gsoc-26-rejah-rabeeul-haque-week07"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week07,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! This week, I focused on resolving several UI and interaction issues in the ConnectTheDots activity and implemented the Settings Feature for Number Mode. This new feature enables users to create, update, and manage custom puzzle figures directly on the coordinate grid.
Here is a detailed breakdown:

---

## Fixed Current Issues

- Improved Number Mode Icon: Refined the Number Mode icon on the main toolbar. The icon now reflects the active mode and transitions smoothly when switching between Draw Mode and Number Mode.

- Increased the Size of Numbered Dots: Increased both the circular dot radius and the sequence number typography on the active drawing layer. Making the sequence numbers larger and bolder ensures that young students can effortlessly read the numbers and track their progress across the grid without visual strain.

- Added Ending Confetti and Fill Animation: To make puzzle completion rewarding and joyful, I implemented a smooth radial fill animation combined with a confetti effect. When a student connects the final dot to close a figure, an expanding circular clipping mask animates outward from the closing point, revealing the shape's background color. Once the fill animation completes, confetti bursts from the bottom center of the screen.

- Added a Back Button: Added a back button to the Add Figure and Complete Figure canvases, allowing users to easily return to the library and select another figure without switching modes or resetting the activity.

- Number Mode Uses Buddy Colors: Integrated Sugarizer's Buddy colors into Number Mode. The library now uses the user's Buddy Stroke and Buddy Fill colors, and figure previews automatically apply these colors to provide a personalized experience.

![ConnectTheDots Number Mode UI with Buddy Colors](/assets/Developers/Rejah/connectthedots-week7-ui.webp)

---

## Implemented the Settings Feature

1. Managing Figures
  - Figure Actions: Each figure includes Edit and Delete buttons. The Delete button removes the figure from the selected category and immediately updates the library.
  - Figure Selection: In Play Mode, clicking a figure opens it on the canvas. In Settings Mode, figure selection is disabled so users can manage figures without accidentally starting a game.

2. Custom Figure Creation
  - When the user clicks the "+ Add Figure" button at the bottom of the Settings gallery, the activity enters Figure Creation Mode:
  - Dedicated Toolbar: The standard toolbar is hidden and replaced with a toolbar containing a Minus button.
  - Create a Figure: The user clicks the coordinate dots on the 13 × 15 grid to create a custom figure. As each dot is selected, the activity draws lines between consecutive points and numbers them in order (1, 2, 3, ...).
  - Undo Last Point: If a mistake is made, clicking the Minus button removes the most recently added point and its connecting line, allowing the user to continue without starting over.
  - Save the Figure: Clicking the Back button checks that the figure is valid (at least 2 points for an open figure or 3 points for a closed figure). If the figure is valid, it is saved to the selected library

![ConnectTheDots Figure Creation Mode](/assets/Developers/Rejah/connectthedots-week7-add-figure.webp)

3. Algorithms Used

- Euclidean Distance Algorithm
    - Instead of requiring users to click exactly on the center of a dot, the activity checks whether the click is close enough to a dot. If the click is within 22.5 pixels of a dot, it is automatically selected. This makes it easier to interact with the small grid dots, especially for touch screen users. The 22.5 px threshold was chosen because adjacent grid dots are spaced 55 pixels apart, making it large enough for easy selection while preventing accidental selection of neighboring dots.
    - Example: Suppose a dot is located at (200, 150), but the user clicks at (216, 162) instead. The distance between the click and the dot is 20 pixels, which is within the allowed 22.5 px threshold. The activity automatically snaps the selection to the dot at (200, 150).

- Collinearity via Triangle Equality
    - The activity uses the Triangle Inequality Theorem to check whether a grid dot lies on the straight line between two selected dots. For each grid dot, it calculates the distance from the start point to the dot and from the dot to the end point. If the sum of these two distances is almost equal to the total distance between the start and end points, the dot is considered to be on the line and is automatically included. This ensures that all grid dots along the line are detected and colored correctly.
    - Example: Suppose a user draws a horizontal line from the dot at (100, 250) to the dot at (500, 250). Several grid dots lie between these two points. For the intermediate dot at (250, 250), the distance from the start point is 150 px, and the distance to the end point is 250 px. Since 150 + 250 = 400 px, which matches the total distance between the start and end points, the activity recognizes that this dot lies on the line and automatically includes it. This prevents gaps and ensures the entire line is drawn smoothly.

- Polygon Closure Detection
    - While creating a custom figure, the activity checks whether the user has completed a closed shape. A shape is considered closed only if it has at least three points and the user clicks the starting point again. When this happens, the activity automatically connects the last point to the first point, marks the shape as closed, and fills it with the selected color.
    - Example: Suppose a student clicks three dots to form a triangle: (4, 3), (10, 3), and (7, 9). At this stage, the figure is still an open shape. When the student clicks the starting point (4, 3) again, the activity recognizes that the first and last points are the same. It automatically draws the final line from (7, 9) back to (4, 3), closes the triangle, and fills it with the selected color.

- Ray Casting (Even Odd Rule) Point in Polygon Algorithm
    - To determine whether a grid dot is inside a closed figure, the activity draws an imaginary horizontal line from the dot toward the right. It counts how many times this line crosses the edges of the figure. If the line crosses the edges an odd number of times, the dot is inside the figure. If it crosses an even number of times, the dot is outside. This is known as the Ray Casting algorithm.
    - Example: Suppose a user creates a large square from (100, 100) to (500, 500). A grid dot at (250, 250) is inside the square. The imaginary horizontal line from this dot crosses the square's boundary once, so the activity recognizes that the dot is inside the figure and darkens its color to improve visibility against the filled background. On the other hand, a dot at (50, 250) is outside the square. Its horizontal line crosses the square's edges twice, so the activity recognizes that it is outside and leaves its appearance unchanged.

- Backtracking (LIFO Stack) Algorithm
    - When a user clicks the Minus button while creating a custom figure, the activity removes the most recently added point and its connecting line. It always removes the last item that was added, allowing users to correct mistakes without affecting the rest of the drawing. This also keeps the point numbering (1, 2, 3, ...) in the correct order.
    - Example: Suppose a user is drawing a star and has already placed points 1, 2, 3, and 4. While trying to place point 5 at (300, 350), they accidentally click (350, 400) instead. Clicking the Minus button removes the incorrect point and its connecting line, returning the drawing to point 4, allowing users continue drawing without starting over..

- Figure Validation Algorithm
    - Before a custom figure is saved to the library or when the user clicks the Back button, the activity checks whether the figure is complete. An open figure must contain at least two points, while a closed figure must contain at least three points and be properly closed. If these conditions are not met, the figure is considered incomplete and is not saved.
    - Example: Suppose a user places only one point before clicking the Back button. Since a single point cannot form a valid line or shape, the activity recognizes that the figure is incomplete and prevents it from being saved to the library.

- Duplicate Point Prevention
    - While a user is creating a figure, the activity checks whether the newly clicked dot is the same as the previously selected dot. If it is, the click is ignored. This prevents duplicate points from being added and avoids overlapping point numbers.
    - Example: Suppose a user clicks a dot to create Point 3. If they accidentally click the same dot again, the activity ignores the second click because it matches the previous point.

---

## Challenges Faced

- Accurately detecting when a user had completed a figure by returning to the starting point was challenging without accidentally closing unfinished shapes.
- Implementing the Minus (Undo) feature required keeping the drawing data synchronized so only the last point and its connecting line were removed without affecting the rest of the figure.

---

## What's Next

- Fix remaining issues in the current Number Mode implementation.
- Continue implementing Number Mode features, including the figure editing interface and custom categories.
- Start implementing Shared Mode.

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