---
title: "Adding dark mode to  the main Sugar Labs website"
excerpt: "New developer Syed Khubayb Ur Rahman shares how he implemented dark mode, what issues he faced and how he debugged them."
category: "DEVELOPER NEWS"
date: "2025-10-04"
slug: "adding-dark-mode-to-sugar-labs"
author: "@/constants/MarkdownFiles/authors/syed-khubayb-ur-rahman.md"
tags: "dark-mode,accessibility,frontend,Sugar Labs"
image: "assets/Images/darkmode.png"
---


<!-- markdownlint-disable -->


# Adding dark mode to a Sugar Labs Website


## Introduction
Sugar Labs builds free/libre/open-source (FLO) tools that make learning playful and accessible. I recently contributed dark mode to a Sugar Labs web project. This post outlines the problem I encountered, how I debugged and fixed it, and the key lessons I learned so others can ship accessible theming with confidence.
Repository: [https://github.com/sugarlabs/www-v2](https://github.com/sugarlabs/www-v2)


## The Problem
The main Sugar Labs website originally lacked a dark mode option, which made browsing less comfortable in low-light conditions.
Without dark mode, the bright interface could cause eye strain and reduce accessibility for users with light sensitivity.


- **Goal:** Deliver a robust dark mode that respects system preference, including a manual toggle with persistence, and  maintaining accessible contrast across the interface.


Implementing the dark mode required careful planning to ensure consistency and accessibility. I began by auditing the color system, identifying issues with hardcoded values, and setting up a structure that would support scalable theming. The steps below summarize my debugging process and how each challenge was resolved.


## Debugging and Solution
- **Color audit and mapping:** I inventoried all color usages, identified hardcoded values, and grouped them into semantic tokens (background, text, muted, accent, surface). This created a maintainable foundation for theming.
- **Single source of truth:** I centralized color decisions via tokens instead of scattering values across files and components. This reduced duplication and made changes less error‑prone.
- **Preference‑aware default:** The implementation respects the user’s system setting via the `prefers-color-scheme` media query when no explicit preference is stored. This provides a sensible baseline experience that aligns with OS‑level accessibility choices.
- **Manual toggle with persistence:** A simple theme switch allows users to override the system default. The selected theme is persisted (e.g., using `localStorage`) so their preference remains consistent across sessions.
- **Component‑wide updates:** I refactored buttons, inputs, cards, alerts, focus rings, and states (hover, active, disabled) to use tokens. Each state was validated for contrast in both themes.
- **Icons and media adjustments:** I standardized icons to adapt to the active theme and introduced subtle borders/surfaces to preserve structure on dark backgrounds.
- **Accessibility validation:** I checked contrast ratios, improved focus visibility, and tested keyboard navigation and zoom to ensure inclusive design.
- **Cross‑browser and performance checks:** I verified behavior across major browsers and optimized the switch to be instantaneous by relying on theme variables rather than heavy DOM updates.


## Challenges and Takeaways
- **Third‑party components:** Some libraries hardcoded their colors. Carefully scoped overrides and mapping external variables to our tokens aligned them with the overall theme.
- **Brand color tuning:** The primary accent required adjustments for dark backgrounds. Preserving hue while tweaking lightness/saturation retained brand identity and improved legibility.
- **Legacy inline styles:** Inline color rules resisted theming. Moving values into tokens eliminated one‑off overrides and simplified maintenance.
- **Documentation as leverage:** I documented the token system and theme architecture. Clear guidelines made it easier for future contributors to build consistently.
- **Accessibility‑first mindset:** Dark mode is not color inversion. Designing for contrast, depth, and hierarchy from the start avoids costly rework later.


## Impact and Conclusion
- **Impact on users:** Reduced eye strain, improved readability, and a cohesive experience especially valuable for users with light sensitivity.
- **Impact on the project:** A unified token system speeds up future development, theming, and contributor onboarding.
- **Community value:** The approach respects user preferences, provides control, and centers accessibility principles aligned with Sugar Labs’ mission.


By sharing my experience, I hope to inspire others to contribute to Sugar Labs and make a positive impact on the community. I started by defining semantic tokens, honoring system preferences, and prioritizing accessibility. Through this process, I was able to deliver a dark mode that feels natural, inclusive, and maintainable.

## Try it out

The dark mode toggle button is available on the top-right corner of the page.


![Dark mode toggle location in light mode](/assets/Images/dark_mode_toggle.png)
![Dark mode toggle location in dark mode](/assets/Images/dark_mode_toggle2.png)

*Look for this button to switch between light and dark themes!*