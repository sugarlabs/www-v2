---
title: "DMP ’25 Week 10 Update by Aman Naik"
excerpt: "This week focused on adding an advice feature powered by the LLM, and refactoring the ChatSidebar using Gtk.Stack to resolve UI toggling issues."
category: "DEVELOPER NEWS"
date: "2025-08-09"
slug: "2025-08-09-dmp-25-AmanNaik-week10"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week10,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 10 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-08-03 – 2025-08-09  

---

## Goals for This Week

- Add a "Get Advice" button to provide students with feedback on their stories  
- Refactor ChatSidebar to properly manage chat and framework views using `Gtk.Stack`  

---

## This Week’s Achievements

1. **Added “Get Advice” Feature**  
   - Introduced a new button labeled **Get Advice** in the toolbar.  
   - When clicked, the application retrieves all text written in the document using the `'get_content'` method.  
   - The full story is then sent to an LLM along with a carefully designed prompt template.  
   - The model responds with both advice and encouragement, written in simple, child-friendly language, attributed to a fictional guide named *Mary Tales*.  
   - For now, the advice gets displayed on the console to quickly test out the LLM response quality.  

    ![Advice being displayed in the console based on the written story](assets/Images/aman-naik-week10-img1.png)
    ![Story that was written on the document](assets/Images/aman-naik-week10-img2.png)

2. **Refactored ChatSidebar with Gtk.Stack**  
   - Migrated the sidebar view management from manual hiding/showing to `Gtk.Stack`, which allows switching between the chat and framework sections without rendering conflicts.  
   - Fixed an issue where toggling the sidebar on/off caused **both** the chat and framework to appear simultaneously.  
   - Now, the sidebar correctly restores the last active view when reopened, ensuring a smoother and more predictable user experience.
   ```chatbox.py
        # Create a Gtk.Stack to manage different views (chat, framework)
        self.main_stack = Gtk.Stack()
        self.main_stack.set_transition_type(Gtk.StackTransitionType.SLIDE_LEFT_RIGHT)
        self.main_stack.set_transition_duration(300)
    ```

---

## Challenges & How I Overcame Them

- **Challenge:** Old toggle logic caused multiple framework instances to stack below the chat  
  **Cause:** Earlier implementation relied on `'show_all()'`, which rendered every child widget in the container. This resulted in vertically stacked duplicates when switching views.  

  ![Old toggle logic causing multiple framework instances to stack below the chat](assets/Images/aman-naik-week10-img3.png)

  **Solution:** Completely refactored the code so the chat section and framework section are independent widgets. They are now managed exclusively via `Gtk.Stack`, and navigation between them is handled by the **Create Framework** and **Back to Chat** buttons. This eliminated duplicate rendering and made state management far cleaner.

---

## Key Learnings

**Integrating Context-Aware LLM Feedback**  
   - Learned how to combine user-generated content with structured prompt templates to produce relevant, age-appropriate feedback.

**Using Gtk.Stack for Multi-View UI Management**  
   - `Gtk.Stack` provides a more robust method for switching views compared to manual widget hiding, preventing unwanted re-rendering issues.

**Refactoring for Maintainability**  
   - Separating chat and framework into standalone widgets improved both readability of the code and maintainability for future UI changes.

---

## Next Week’s Roadmap

- Continue refining the “Get Advice” feature to make the advice visible within the activity instead of the console.
- Contribute to the recent developments happening with Sugar-AI so we can quickly implement it within the write-activity.
- Add proper icons to the chat and advice buttons.

---

## Acknowledgments

Thank you to my mentors for helping me validate the UX flow for the new advice feature and suggesting improvements for sidebar state management.

---
