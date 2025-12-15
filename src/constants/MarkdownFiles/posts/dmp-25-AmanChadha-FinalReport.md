---
title: "DMP '25 Final Report by Aman Chadha"
excerpt: "Final Report for the project Modernizing Music Blocks’ i18n with AI-Assisted Translation"
category: "DEVELOPER NEWS"
date: "2025-09-17"
slug: "2025-09-17-dmp-25-aman-chadha-final-report"
author: "@/constants/MarkdownFiles/authors/aman-chadha.md"
tags: "dmp25,sugarlabs,finalreport,aman-chadha"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# DMP '25 Final Report by Aman Chadha

## Contributor Details

**Name:** Aman Chadha  
**Email:** [aman.chadha.mmi@gmail.com](mailto:aman.chadha.mmi@gmail.com)  
**GitHub:** [AmanChadha](https://github.com/ac-mmi)  
**Organization:** [Sugar Labs](https://www.sugarlabs.org/)  
**Project:** [JS Internationalization with AI Translation Support](https://github.com/sugarlabs/musicblocks/pull/4731)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  

---

## Project Overview

Music Blocks is a learning platform for children worldwide. Currently, it primarily supports **English, Japanese, and Spanish**, leaving many learners struggling when the platform is not in their native language. The goal of this project was to **modernize Music Blocks’ i18n system** and introduce an **AI-assisted translation workflow** to improve accessibility and engagement globally.  

Key problems addressed:  
- The legacy `webL10n.js` system lacked **modern i18n features**, including fallback strategies and JSON-based translation support.  
- UI strings often lacked context, leading to ambiguous or inaccurate translations.  
- Translators faced difficulty translating terms with multiple meanings, like "duck" (pitch vs. volume).  

---

## Project Objectives

- Migrate from **webL10n.js to i18next** for modern, modular, and maintainable i18n.  
- Automate translation of missing strings using **AI with contextual awareness**.  
- Ensure a **contributor-friendly workflow**, where human translators can review AI suggestions.  
- Expand accessibility for new languages and improve adoption by educators worldwide.  

---

## Technical Approach

### Framework Migration

- **Why migration was needed:**  
  - `webL10n.js` was outdated and lacked support for modern i18n features.  
  - i18next supports **language-specific formatting**, flexible fallbacks, and **JSON-based translation files**.  

- **Process:**  
  - Replaced `webL10n.js` references in the codebase with i18next API calls.  
  - Added **fallback strategies**: cleaned text, lowercase, title case, hyphenated strings.  
  - Incrementally tested migration to ensure existing UI remained functional.  

### Context-Aware Translation (RAG Model)

- Extracted **code context** for each `msgid` by taking **5 lines above and below** and any developer comments.  
- Stored context snippets in **context_ui_full.json** with metadata: source file, line numbers, and snippet.  
- Indexed the JSON in **ChromaDB**, a vector database optimized for semantic search.  
- Built a **RAG model** to retrieve and analyze context, generating clear explanations for each string.  

---

## AI-Assisted Translation Workflow

### Workflow Steps

1. **.PO to JSON Automation:**  
   - Converted `.po` files to JSON using a Python script, enabling AI integration.  

2. **Translation with Context:**  
   - Retrieved context using the RAG model.  
   - Sent `msgid + context` to translation API for accurate translations.  

3. **Google Translate API Integration:**  
   - Chose Google Translate for its **robustness, contextual translation quality, and reliability**.  
   - Open-source alternatives like LibreTranslate produce **word-by-word translations** and fail to use surrounding context.  

4. **Automated QA:**  
   - Developed a **Selenium + GPT script** to validate translations automatically.  
   - Detected inaccuracies and flagged strings for manual review by a human translator.  

5. **PO File Generation:**  
   - Generated complete Arabic, Japanese, and Hindi `.po` files using the automated pipeline.  

---

### Key Python Translation Script

```python
from google.cloud import translate_v2 as translate

translate_client = translate.Client()

def translate_prompt(msgid, context, target_lang="ar"):
    prompt = f"{msgid}: {context}"
    result = translate_client.translate(prompt, target_language=target_lang)
    translated = html.unescape(result["translatedText"]).strip()
    return translated.split(':')[0].strip() if ':' in translated else translated
```

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|---------|
| Ambiguous UI strings (e.g., "duck","pitch","minor" etc) | Implemented **RAG model** for context-aware translations |
| Legacy i18n system | Migrated from `webL10n.js` → i18next with JSON support |
| Automated translation validation | Built **Selenium + GPT-based QA system** to mark errors for review |
| Open-source translation drawbacks | Used **Google Translate API** for higher quality and context handling |

---

## Achievements

- Successfully **migrated Music Blocks to i18next**.  
- Developed a **context-aware AI translation workflow**.  
- Generated **Arabic, Japanese, and Hindi `.po` files**.  
- Built an **automation pipeline** for `.po → JSON → AI translation → validation → .po` cycle.  
- Created QA tooling to **check translation accuracy** before human review.  

---

## Key Learnings

- Extracting and using **context** drastically improves translation accuracy.  
- Clean migration and testing are crucial when replacing legacy infrastructure.  
- Combining **AI automation with human review** ensures high-quality localization.  
- Open-source translation tools can be limited; commercial APIs may be necessary for production quality.  

---

## Future Work

- Add support for more AI translation models (e.g., DeepL, OpenAI).  
- Extend automated QA to **more languages**.  
- Build a **web-based UI** for translators to review flagged translations.  
- Integrate GitHub Actions for automatic updates of `.po` files on new/modified strings.  

---

## Resources & References

- **Music Blocks Repository:** [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)  
- **Migration PR:** [#4731](https://github.com/sugarlabs/musicblocks/pull/4731)  
- **i18next Documentation:** [i18next.com](https://www.i18next.com/)  
- **ChromaDB:** [chromadb.com](https://www.chromadb.com/)  

---

## Conclusion

This project modernized Music Blocks’ localization infrastructure, introduced **AI-assisted, context-aware translations**, and enabled **scalable multilingual support**. By combining **framework migration, RAG-based context generation, automated translation, and QA tooling**, Music Blocks is now better equipped to serve children worldwide in their **native languages**, improving engagement, accessibility, and global adoption.  

I am deeply grateful to my mentors, the Sugar Labs community, and C4GT for their guidance and support throughout this journey.

