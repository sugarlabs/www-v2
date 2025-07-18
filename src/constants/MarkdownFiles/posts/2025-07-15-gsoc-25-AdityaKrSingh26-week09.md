---
title: "GSoC ’25 Week 09 Update by Aditya Kumar Singh and Midterm Summary"
excerpt: "Enhanced collaboration in Human Body activity by refining Paint and Tour interactions, improved UX in Doctor mode, and launched key features in Stickman like frame handling and animation controls."
category: "DEVELOPER NEWS"
date: "2025-07-15"
slug: "2025-07-15-gsoc-25-AdityaKrSingh26-week09"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week09,AdityaKrSingh26,midterm"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Aditya Kumar Singh and Midterm Summary

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)  
**Mentors:** [Lionel Laské](https://github.com/llaske)  
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)  
**Reporting Period:** 2025-07-10 – 2025-07-16

---

## Goals for This Week

- **Goal 1:** Fix key UX and sync issues in the Human Body activity for Paint and Tour modes.
- **Goal 2:** Improve interactivity and usability in Doctor mode.
- **Goal 3:** Add shared leaderboard functionality for Doctor participants.
- **Goal 4:** Begin dashboard and animation logic in Stickman activity.

---

## This Week’s Achievements

1. **Human Body Paint & Tour Interaction Fixes**  
    - **Issue:** When switching from Tour to Paint, highlighted parts remained visually active across users.  
        - **Fix:** Restored original mesh material on mode switch using `restoreMeshColor()` and synced the update with a new `restoreMaterials` action.  
    - **Issue:** Unnecessary part-name popup showed for everyone when anyone painted.
        - **Fix:** Restricted the popup to only the user who performed the action, enhancing clarity in shared sessions.
    - **Issue:** Doctor mode lacked reminders of the current target part after failed guesses.
        - **Fix:** Implemented a reminder popup after every 3 failed attempts to display:  `"Remind you, we're looking for [Part Name]"`.
    ```javascript
        // restore material
        if (msg.action = = "modeChange") {
            if (msg.content != 0) return;
            if (currentModel) {
                currentModel.traverse((node) => {
                    if (node.isMesh && node.userData.originalMaterial) {
                        node.material = node.userData.originalMaterial.clone();
                    }
                });
            }
        }
        // Reminder popup
        if (failedAttempts % 3 === 0 && failedAttempts > 0) {
            showModal("Remind you, we're looking for " + l10n.get(bodyParts[presenceCorrectIndex].name));
        }
    ```
    - Links : PR [#1800](https://github.com/llaske/sugarizer/pull/1800) 
    > Failed Attempt Popup  
    ![Leaderboard](https://i.ibb.co/TxWvQShK/image.png)


2. **Shared Doctor Mode Leaderboard Enhancements**  
    - Reworked the leaderboard to show users with the **highest score on top** in real-time.
    - Implemented logic to sort and re-render the leaderboard HTML dynamically after each answer.
    - Ensured that scores are updated and synchronized across all participants using the `scoreUpdate` action.
    ```javascript
        playerScores.sort((a, b) => b[1] - a[1]);
    ```
    - XO icons rendered dynamically using user colors:
     ```javascript
        iconElement.style.backgroundImage = `url(${generateXOLogoWithColor(playerColor)})`;
     ```
    > Real-time XO Leaderboard during Shared Doctor Mode  
    ![Leaderboard](https://i.ibb.co/jkLPqWDP/image.png)


3. **Stickman Activity – Dashboard Features Bootstrap**  
    - **Launched key drawing infrastructure**:
        - Users can now **create stickman**, **drag**, and **move** the whole figure.
        - Proper **distance constraints** between joints maintain anatomical correctness.
    - Integrated real-time canvas rendering loop to support:
        - Drawing joint previews.
    - Added mouse interaction listeners to support **joint selection and dragging**.


4. **Stickman Frame Handling + Animation Tools**
    - Added **Add Frame**, **Preview Frame**, and **Remove Frame** options via UI.
    - Integrated **Play / Pause** logic controlled via speed slider (`speedpalette.js`) to control animation playback.
    - Introduced **Onion Skinning**—each frame preview shows a translucent version of adjacent frames for better motion consistency.
    - Enabled **Template Palette** with selectable pre-built poses (run, dance).
    - **Export as Video** and playback scaffold in progress using HTML5 Canvas.
    - Links : PR [#1799](https://github.com/llaske/sugarizer/pull/1799)
    > Stickman Dashboard UI with Toolbar and Timeline  
    ![Stickman UI](https://i.ibb.co/H86RT1Z/image.png)


---

## Challenges & How I Overcame Them

- **Challenge:** Popup messages overloaded users in shared mode.  
  **Solution:** Added `networkId` checks to restrict popup visibility only to the sender.

---

## Key Learnings

- Gained deeper understanding of **presence synchronization patterns** in collaborative activities.
- Learned best practices for **frame-by-frame animation** and **canvas optimization**.
- Improved on creating **real-time UI updates** and dynamic SVG rendering using data-driven design.

---

## Midterm Summary

Over the past nine weeks, my journey with Sugar Labs through GSoC has been incredibly rewarding, both technically and personally. Here's a quick recap of my key milestones:

- **Weeks 01–03:** I dove deep into the world of 3D anatomy, cleaning and merging segmented organ models, improving mesh clarity, and laying the foundation for the interactive Paint Mode in the Human Body activity.
- **Weeks 04–05:** I introduced internationalization with `i18next.js`, created a palette system to switch between anatomical models, and improved educational clarity through accurate labeling and skeletal refactoring.
- **Week 06:** I implemented onboarding tutorials, optimized models for performance, and started building shared logic for collaborative Paint Mode.
- **Weeks 07–08:** I built synchronization features for Tour and Doctor modes, including real-time scoring, shared camera states, and adaptive mesh highlighting. I also bootstrapped the new Stickman activity with animation tools and scaffolding.
- **Week 09 (this week):** I improved user experience by fixing shared mode bugs, added a real-time XO leaderboard in Doctor mode, and implemented critical frame-based animation controls like onion skinning and play/pause for Stickman.

Throughout this phase, I’ve gained:

- A much deeper understanding of **Three.js**, especially around camera controls, mesh interactions, and rendering pipelines.
- Hands-on experience in designing **real-time collaborative environments**, ensuring consistent state across clients.
- Confidence in writing **modular, scalable JavaScript**, integrating localization, and building UI that’s both intuitive and accessible.
- Awareness of **educational UX design**, where clarity and simplicity matter just as much as functionality.


I’m sincerely **grateful to my mentors** Lionel and Samarth for their patient guidance, critical feedback, and unwavering support. I’ve also grown by engaging with the Sugar Labs community, learning from discussions, and reading others’ code.

This journey so far has not only improved my technical depth but also taught me how to think like an open-source contributor—collaborative, responsible, and focused on impact. I'm excited for the second half of GSoC and all the challenges and learning it will bring.

Thank you again to everyone who's been part of this experience so far!

## Next Week’s Roadmap

- Fix remaining issue on Human Body
- Fix issues on dashboard and frame for Stickman activity
- Handle the adding a new stickman feature
- Handle Journal storage for stickman activity

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

