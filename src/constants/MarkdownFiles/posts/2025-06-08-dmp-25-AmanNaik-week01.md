---
title: "DMP ’25 Week 1 Update by Aman Naik"
excerpt: "This week's focus was exploring the write-activity codebase, finding appropriate grammar correction models & understanding Abiword documentations."
category: "DEVELOPER NEWS"
date: "2025-06-08"
slug: "2025-06-08-dmp-25-AmanNaik-week01"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
description: "Member and DMP'25 Contributor at SugarLabs"
tags: "dmp25,writeactivity,write,sugarlabs,week01,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 1 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-06-02 - 2025-06-08  

---

## Goals for This Week

- **Goal 1:** Understand write activity's codebase.
- **Goal 2:** Explore pertinent grammar correction models for real time grammar correction
- **Goal 3:** Understand the [Abiword](https://github.com/AbiWord) word-processor documentation

---

## This Week’s Achievements

1. **Understood the activity's codebase**  
   - Gained a clear understanding of the overall structure and logic of the Write activity's codebase.
   - This includes identifying key components, data flow, and how the Abiword processor is leveraged for this activity.
2. **Explored pertinent grammar correction models**  
   - Shortlisted grammar correction models suitable for real time grammar correction and can be used with an open source software.
   - Created API endpoints using Hugging Face spaces for quick testing in sugar.

3. **Understood the Abiword processor**  
   - Abiword is an open source word processor, which is leveraged by the write activity.
   - It has a parser called 'link-grammar' that was recently developed, which might be useful for grammar correction as well.

---

## Challenges & How I Overcame Them

- **Challenge:** Difficulty in finding reliable grammar correction models on hugging face which can also be compatible open source software.  
**Solution:** Found link-grammar that could be an option for reliable grammar correction feature. Also, found some hugging face models(relevant license) after rigorously searching. 

- **Challenge:** Testing hugging face models with no inference points and testing them inside Sugar.  
**Solution:** Most Hugging Face models can’t be installed directly in Sugar because they require heavy dependencies like Torch and Transformers, which increase memory usage in a virtual machine. Therefore, I used hugging face spaces and ran the models there, which also provides API endpoints for quick testing inside Sugar.

---

## Key Learnings

- Gained a solid understanding of the Write activity's code structure and how it integrates the Abiword processor.
- Explored lightweight, open-source grammar correction models and successfully tested them using Hugging Face Spaces via API endpoints.
- Discovered that Abiword’s link-grammar parser might be leveraged for native grammar correction within the activity.

---

## Next Week’s Roadmap

- Finalise a grammar correction model and fine tune it if needed
- Create a FastAPI endpoint and upload the selected model on AWS for testing
- Integrate grammar correction into write-activity
- Explore better spelling correction models

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---

## Connect with Me

- GitHub: [@amannaik247](https://github.com/amannaik247)
- Gmail: [amancodes247@gmail.com](mailto:amancodes247@gmail.com)
- LinkedIn: [Aman Naik](https://www.linkedin.com/in/aman-naik/)

---
