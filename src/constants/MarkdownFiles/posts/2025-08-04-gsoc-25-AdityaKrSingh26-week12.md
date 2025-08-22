---
title: "GSoC '25 Week 12 Update by Aditya Kumar Singh"
excerpt: "Enhanced user experience with image export functionality for Human Body activity, improved stickman visual design, comprehensive localization support, and interactive tutorial system implementation."
category: "DEVELOPER NEWS"
date: "2025-08-04"
slug: "2025-08-04-gsoc-25-AdityaKrSingh26-week12"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week12,AdityaKrSingh26"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-07-31 - 2025-08-06

---

## Goals for This Week

- **Goal 1:** Implement image export functionality for Human Body activity instances.
- **Goal 2:** Enhance stickman visual design by increasing overall size and improving visibility.
- **Goal 3:** Add comprehensive localization support for Stickman activity interface and toolbar elements.
- **Goal 4:** Design and implement an interactive tutorial system for new users.

---

## This Week's Achievements

1. **Human Body Image Export Feature**  
    - **Feature Overview:** 
        - Implemented a image export system that allows users to capture and save their painted human body models as high-quality images, making it easy to share and resuse their creative work in other activities.
        - Image export feature that lets users save their painted human body models as PNG images. When you click the export button, the system captures whatever is currently displayed on the 3D canvas and converts it to a downloadable image file.
    > Export Image in Human Body Activity  
    ![Export Button](https://res.cloudinary.com/djhshvtwo/image/upload/v1754489461/GSoC%2725%20Blog%20Images/image1_jlswus.webp)
    ![Use Image in Fototoon](https://res.cloudinary.com/djhshvtwo/image/upload/v1754489568/GSoC%2725%20Blog%20Images/image2_lit8zq.webp)



2. **Enhanced Stickman Visual Design**  
    - The original stickman figures were way too small and hard to see, especially on high-resolution screens. I spent time making everything bigger and more visible:
        - **Increased joint circles** from tiny 8px radius to a much more clickable 12px
        - **Made limb lines thicker** - bumped them up from 2px to 4px so you can actually see the stick figure clearly
        - **Improved the head circle** to be more prominent and easier to grab
        - **Enhanced selection highlighting** so you know exactly which stickman you're working on
    - The changes make a huge difference when you're trying to precisely position joints or work with multiple characters on screen. Everything feels much more responsive and easier to manipulate, especially on tablets where precise finger taps matter.




3. **Localization Support (i18n) in Stickman Activity**  
    - Added multilingual support for Stickman activity using Sugarizer’s `l10n.js`.
    - Strings like "Add Frame", "Remove", "Undo" are now wrapped in _() function.
    - Created a locales folder with example translations for `en` and `fr`.
    - Created a `translateToolbarButtons()` function that maps each button to its translation key, and set up event listeners to update everything when the localized event fires.
    - This allows the activity to automatically switch languages based on user preferences or system settings.
    - This is crucial for making the activity accessible to non-English speakers, especially in educational contexts where students may not be fluent in English. The i18n support allows us to easily add more languages in the future as needed.
    > Localization in Stickman Activity  
    ![French](https://res.cloudinary.com/djhshvtwo/image/upload/v1754489639/GSoC%2725%20Blog%20Images/localisatio_inok3u.webp)




4. **Interactive Tutorial System**
    - Added a tutorial system that actually helps new users was challenging because I needed to integrate it smoothly with the existing activity without breaking anything. I used the IntroJS library to create a step-by-step guided tour that highlights each UI element and explains what it does. The tutorial walks users through all the main features:
        - **Network button** for sharing animations with others
        - **Play/pause controls** for testing your animations
        - **Speed settings** to control animation playback
        - **Add/remove stickman tools** for managing characters
        - **Template system** for loading pre-made poses
        - **Import/export functionality** for saving work
        - **Timeline interface** for frame management
        - **Add frame button** for creating new keyframes
    - What's nice about the IntroJS approach is that it automatically positions tooltips around the actual UI elements and handles all the overlay and highlighting effects.
    - Users can navigate through steps at their own pace, and all the tutorial text is fully localized so it works in any supported language.
    > Tutorial System in Action  
    ![](https://res.cloudinary.com/djhshvtwo/image/upload/v1754489701/GSoC%2725%20Blog%20Images/14a726e1-ee5c-4f7c-8553-48253b628908.png)



---

## Technical Challenges Overcome

- **Challenge:** Making the stickman figures scale properly across different screen sizes.  
  **Solution:** Rewrote the scaling system to use relative units based on viewport dimensions. Took some trial and error to get the proportions right, but now it looks crisp on everything.

---

## Next Week's Roadmap

- **Goal 1:** Finalize the Human Body activity.
- **Goal 2:** Implement individual frame management.
- **Goal 3:** Transition from absolute to relative positioning for stickman coordinates.
- **Goal 4:** Begin implementing shared mode functionality for the Stickman activity.

---

## Acknowledgments

Special thanks to my mentors for their guidance on user experience design and internationalization best practices. Gratitude to the Sugar Labs community for testing the localization features and providing valuable feedback on the tutorial system effectiveness.

---