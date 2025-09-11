---
title: "DMP '25 Final Report by Aman Chadha"
excerpt: "Concluding my DMP '25 project: Migrating Music Blocks’ localization from webL10n.js to i18next and building an AI-assisted translation system with contextual support."
category: "DEVELOPER NEWS"
date: "2025-09-08"
slug: "2025-09-08-dmp-25-aman-chadha-final"
author: "@/constants/MarkdownFiles/authors/aman-chadha.md"
tags: "dmp25,sugarlabs,finalreport,aman-chadha"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Final Report by Aman Chadha

**Project:** [JS Internationalization with AI Translation Support](https://github.com/sugarlabs/musicblocks/pull/4731)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/devinulibarri)  
**Duration:** July – September 2025  

---

## Project Overview

The aim of this project was to modernize the **internationalization (i18n) system** of Music Blocks by migrating from the legacy `webL10n.js` framework to **i18next**, and to introduce an **AI-assisted translation workflow** to reduce the burden on human translators.  

Key goals included:  
- Making the i18n workflow **cleaner, modular, and maintainable**.  
- Automating missing translations with **AI + context-awareness**.  
- Supporting community-driven refinements of translations.  

---

## Achievements

1. **Migration from webL10n.js to i18next**  
   - Replaced outdated framework with i18next for modern i18n support.  
   - Added flexible fallback strategies (cleaned text, lowercase, title case, hyphenated).  
   - Enabled JSON-based translation files for better maintainability.  

2. **AI-Assisted Translation System**  
   - Designed a pipeline to parse `.po` files and extract `msgid`s.  
   - Generated **context automatically** by analyzing where each string occurs in the codebase.  
   - Built a **RAG (Retrieval-Augmented Generation) model** to store these contexts.  
   - Integrated **Google Translate API** to auto-fill missing translations using this context.  

3. **Contributor-Friendly Workflow**  
   - Human translators can review AI-generated suggestions instead of starting from scratch.  
   - New language files can be created or updated automatically.  
   - Significantly lowers the barrier for contributors to help Music Blocks reach more learners.  

---

## Challenges & Solutions

- **Challenge:** Extracting meaningful context for each translation key.  
  **Solution:** Implemented a RAG approach that links `msgid`s to their source code usage.  

- **Challenge:** Ensuring migration didn’t break existing functionality.  
  **Solution:** Incremental testing with sample `.json` files and stepwise replacement of webL10n.  

---

## Key Learnings

- Infrastructure-level improvements (like i18n) may not be flashy, but they **unlock global accessibility**.  
- Context is essential for high-quality translations — raw machine translation alone isn’t enough.  
- Clean migration strategy + thorough testing makes adoption smoother for the community.  

---

## Future Work

- Add support for more AI translation providers (e.g., DeepL, OpenAI).  
- Build a simple **web-based review UI** for translators to accept/refine AI suggestions.  
- Automate detection of new/changed strings via GitHub Actions and update translation files dynamically.  

---

## Closing Thoughts

This project was a unique opportunity to contribute infrastructure that strengthens Music Blocks for a **global user base**. By combining **modern i18n practices with AI translation support**, I hope this work helps learners worldwide access Music Blocks in their own languages with greater ease.  

I’m deeply grateful to my mentors Walter and Devin, and to the Sugar Labs community, for their support and guidance throughout this journey.  

---

## Resources & References

- **Music Blocks Repository:** [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  
- **GitHub PR:** [#4731](https://github.com/sugarlabs/musicblocks/pull/4731)  
- **i18next Documentation:** [i18next.com](https://www.i18next.com/)  

---
