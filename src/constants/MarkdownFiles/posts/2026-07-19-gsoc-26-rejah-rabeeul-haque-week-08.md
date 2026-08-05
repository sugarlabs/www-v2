---
title: "GSoC '26 Week 8 Report by Rejah Rabeeul Haque"
excerpt: "Implemented responsive design, back button optimization, new category addition, and Edit Features in the Number Mode of ConnectTheDots activity."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-gsoc-26-rejah-rabeeul-haque-week08"
author: "@/constants/MarkdownFiles/authors/rejah-rabeeul-haque.md"
description: "GSoC'26 Contributor at SugarLabs working on ConnectTheDots activity"
tags: "gsoc26,sugarlabs,sugarizer,connectthedots,week08,rejah-rabeeul-haque"
image: "assets/Images/sugarizer.webp"
---

<!-- markdownlint-disable -->

## This Week's Progress

Hey! This week, I worked on enhancing the Number Mode in the ConnectTheDots activity. The main focus was on improving the user interface and adding new capabilities for managing figures and categories to provide a more flexible experience.

Here is a detailed breakdown of the work done:

---

## Number Mode Enhancements

- Responsive Figures Screen
  - The Number Mode is now fully responsive. It automatically adjusts the grid layout and scales correctly across different device sizes and orientations. This ensures that whether a student is playing on a large desktop monitor, a tablet, or a smaller screen, the gallery remains well-proportioned.
  - To achieve this, we used CSS Grid and Flexbox along with responsive CSS units. CSS Grid automatically determines how many figure cards fit in each row based on the available screen width, while Flexbox is used for aligning elements within the layout. When the viewport size changes, the browser automatically reflows and redistributes the items to maintain a consistent and responsive interface.

- Optimized Back Buttons
  - Changed the location of the back buttons, moving it directly from the toolbar down onto the canvas. This change places the back button much closer to where the user is interacting with the figures. I also updated icon to be visible in the canvas.
  - Moving the back button required restructuring the DOM so that it is rendered inside the canvas container instead of the top toolbar. The button is positioned relative to the canvas using CSS positioning, allowing it to remain easily accessible while users interact with the drawing area. Its placement and styling were adjusted to ensure it remains clearly visible without interfering with the canvas content.

- Edit Features in Number Mode
  - Implemented editing capabilities in Number Mode, allowing users to modify both existing figures from the library and figures currently being created on the Number Board canvas. Users can reopen previously saved figures to add new points or continue editing, while the undo feature lets them correct mistakes during creation without restarting the entire figure.
  - When a user chooses to edit a saved figure, the application transitions from the gallery view to the editing interface. To prevent unintended modifications, a copy of the selected figure's coordinate data is loaded into the active drawing board instead of directly referencing the saved figure. This ensures that the original figure remains unchanged until the user explicitly saves their edits. During editing, the undo functionality uses a LIFO (Last-In, First-Out) stack approach. If the figure is still open, each undo operation removes the most recently added point and updates the drawing accordingly. If the figure has already been closed by connecting the last point back to the first, the first undo operation removes only the closing connection, changes the figure back to the editing state, clears the fill, and allows subsequent undo operations to remove points normally.
  - Example: Suppose a user opens a saved Square figure for editing and accidentally adds an incorrect point. Clicking the minus button removes the most recently added point while leaving the original saved Square unchanged, since the user is editing a copied version. If the figure had already been closed, the first undo operation would simply remove the closing connection and reopen the figure for editing. Only when the user clicks Save are the updated coordinates written back to the library, replacing the previous version.

![Editing a figure](/assets/Developers/Rejah/connectthedots-week8-edit-figure.webp)

- Adding New Category
  - Added a dedicated feature to create new custom categories. Instead of saving every custom shape into a single generic category, users can now create their own categories (e.g., "My Animals"). This allows users to better organize their custom figures within the library by grouping them into personalized, easily accessible collections.
  - Creating a new category uses a validation process. First, real time client side validation checks the entered category name as the user types. If the entered name exactly matches an existing category, the Confirm button is immediately disabled to prevent duplicate submissions. Second, if the validation passes but the generated normalized key already exists, a fail safe mechanism automatically resolves the collision by appending an incrementing suffix (e.g., -1) before storing the category.
  - Example: If a user tries to create a category named "Animals" but it already exists, the frontend validation immediately disables the Confirm button. However, if they create "My Shapes-" while "My Shapes?" already exists, both names normalize to the same internal key (my-shapes-). The fail-safe mechanism stores the second category using a unique key such as my-shapes--1 while continuing to display the user defined category name in the interface.

![Adding New Category](/assets/Developers/Rejah/connectthedots-week8-add-category.webp)

---

## Challenges Faced

- Managing the Edit State Without Breaking the Drawing Flow: Integrating the edit feature into the existing Number Board canvas was challenging because the canvas had to correctly handle drawing, undo operations, and transitions between open and closed figures without causing inconsistent behavior.

- Keeping Data Consistent Across Different Views: Ensuring that edits and newly created categories were correctly reflected across the figure library and the active editing screen without displaying outdated data required careful state management.

- Preventing Accidental Data Modification During Editing: Implementing the edit feature safely was challenging because the application had to work with a copy of the selected figure instead of the original. This prevented accidental changes to the saved figure until the user explicitly clicked Save.

---

## What's Next

- Fix the remaining issues in the current Number Mode implementation.
- Expand the figure library with more categories and figures.
- Begin implementing Shared Mode for collaborative gameplay.

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