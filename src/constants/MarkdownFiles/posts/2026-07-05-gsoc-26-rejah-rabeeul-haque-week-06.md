---
title: "GSoC '26 Week 6 Report by Rejah Rabeeul Haque"
excerpt: "Refined the automated unit tests, enhanced the fill algorithm and Number Mode."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-gsoc-26-rejah-rabeeul-haque-week06"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week06,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! This week, I refined the automated unit tests and enhanced the fill algorithm and Number Mode.
Here is a detailed breakdown:

---

### Enhancing Unit Tests for Behavioral Rules

The tests live in `js/tests/tests.js` and they are designed to run in two environments — inside the browser alongside the activity, and directly from the command line using Node.js.

- To simulate user interaction, the test suite uses functions like addLink() that set the active tool to draw and the active paint color through setFillColor(), and then call the exact same event handler functions used by the activity: mousedown at the starting dot, mousemove to the destination dot, and mouseup. The draw-mode module's internal logic picks up the coordinates and registers the colored stroke. Similarly, erasing is simulated with eraseLink(), which switches the active tool to erase and replays the same mouse event sequence along the link's path so the segment intersection logic removes the matching stroke.

- What Each Test Checks:

    - Rule 1: Draw four lines forming a square. Before the last link, check if there are zero figures. After the last link closes the loop, check if there is exactly one figure with the correct fill color.
    - Rule 2: Draw a large outer square and then a small inner triangle. Check if both figures exist and each has its own correct fill color.
    - Rule 3: Draw the inner triangle first, then draw the outer square. Check if drawing the outer shape didn't change the inner figure's fill color.
    - Rule 4: Draw a square, then erase one edge. Check if there are now zero active figures.
    - Rule 5: Draw a square and an inner triangle, then erase one edge of the outer square. Check if only the inner triangle figure remains active, with its original fill color untouched.

- The tests also rely on serialization and deserialization, the same mechanism used to save to the Sugarizer Journal and sync multiplayer sessions. Serialize converts the in-memory graph into a JSON object by storing strokes as dot index lists and figures by unique dot keys and fill colors. Deserialization does the reverse by resolving those index arrays back to live references from the shared dots array. In the test suite, serialize() takes an initial snapshot before running tests, and deserialize() restores it at the end. However, this snapshot and restore mechanism currently needs some additional work to fully preserve live canvas UI states without visual glitches.

---

### Enhancing the Fill Algorithm in Draw Mode

Implementing this algorithm took the most time. When the user closes a figure by connecting back to a dot they've already visited, the activity needs to detect that a closed loop (figure) was formed, identify exactly which dots form its boundary, animate the fill expanding outward from the closing point, and handle nested shapes correctly.

To do all of this, the implementation combines four core algorithms: Iterative Leaf Removal to clean the graph, Planar Face Detection to find closed loops, the Shoelace Formula (Signed Area) to validate them, and the Ray-Casting Algorithm to detect nested shapes.

- Building the Graph and Removing Dangling Lines

Every time a line is drawn or erased, the graph is rebuilt from the start. It runs Iterative Leaf Removal, where any dot with only one connection is repeatedly removed until no dead ends remain. Removing dangling lines first ensures that face detection only runs on cycles that can actually form figures.
    Example: If you draw a closed square connecting Dots 0, 1, 2, and 3, but leave an extra line Dot 4, Iterative Leaf Removal detects that Dot 4 only has one connection and removes it before checking for closed shapes.

- Planar Face Detection:

To find closed loops, the code uses Planar Face Detection. To decide which way to turn at each dot, it uses a counter clockwise sort: first, each dot's connected neighbors are sorted by angle. Next, it goes through the graph edges by taking the most clockwise turn available at every vertex.

When this traversal returns to the starting dot, it has found a polygon face. To check whether this face is a real shape to fill, the algorithm applies the Shoelace Formula:
A positive signed area confirms the traversal went counter clockwise around an inner bounded face (a shape to fill). A negative signed area means the traversal went clockwise around the outside of the entire drawing (the unbounded external face), which is discarded.

- Nesting Detection:

To correctly handle a figure drawn inside another filled figure, the algorithm uses the Ray-Casting Algorithm. It casts a horizontal ray from the inner shape's vertices to check if they sit inside the outer shape's boundary, confirming the nesting relationship.
    Example: If you draw a small triangle inside a large square, the algorithm shoots an invisible horizontal test line outward from the triangle. Since that line crosses the outer border of the square, the game confirms the triangle is nested inside the square.

- Expanding Circle Fill Animation:

When a new closed shape is detected, a circle expands radially from the point where the user closed the loop. The radius grows every animation frame. The HTML Canvas ctx.clip() method clips drawing to the polygon boundary, and ctx.arc() draws the growing circle inside it. Once the circle completely covers the shape, the code switches to a simple solid fill behind the scenes to save memory. For nested shapes, the inner shape paints the outer shape's color as its background before drawing its own color, preventing any blank white gaps during animation.

- Limitations of the Fill Algorithm:

    - No crossing edges allowed. Because Planar Face Detection requires a planar graph (where edges do not cross in open space), the activity blocks drawing a diagonal that would cross an existing diagonal in the same grid cell.
    - Full rebuild on every change. The entire graph is rebuilt from scratch every time a line is added or removed.
    - Color inheritance. When a new line splits an existing shape into two, the algorithm matches new faces to old ones by counting shared dots. If the overlap score is close between two candidates, the wrong shape may inherit the old fill color.

---

### Improved Number Mode Behaviour

- The dot wave effect makes dots near the pointer grow larger and then shrink back as the user moves. It checks how close each dot is to the pointer and smoothly changes its size. Previously, switching between modes could leave some dots stuck at the initial size.
- Added a preview line that follows the pointer from the last connected dot. When the next correct dot is selected, the line becomes permanent. This makes drawing easier to follow and more responsive.

---

## Challenges Faced

- Test State: Ensuring the tests were properly done and reset between tests so one test didn't accidentally break the next one.
- Keeping Fill Colors Stable: Since the graph rebuilds on every edit, keeping the same color on existing shapes was challenging. I used unique keys for shapes and built a fallback matching system for when shapes are split in half.
- The Diagonal Crossing Constraint: Planar graphs don't allow edges to cross in open space. Supporting crossings breaks serialization and network sync, so we had to block it.

---

## What's Next

- Fixing issues in current behavior.
- Continuing the implementation of Number Mode.

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