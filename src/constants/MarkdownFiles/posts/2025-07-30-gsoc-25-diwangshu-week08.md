---
title: "GSoC ’25 Week 08 Update by Diwangshu Kakoty"
excerpt: "Reflection Learning Widget in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-07-30"
slug: "2025-07-30-gsoc-25-diwangshu-week08"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week08,AI"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 08 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-07-19 - 2025-07-27  

---

## Goals for This Week

- **Goal 1:** Improved 'reflection' widget UI.
- **Goal 2:** Implement IndexedDB for storing user data.
- **Goal 3:** Fix bugs caused by these changes.

---

## This Week’s Achievements

1. **Improved the widget's User Interface**  
   - I have made improvements to the 'reflection' widget's user interface. The new design is more intuitive and user-friendly, enhancing the overall user experience. On opening the widget window, users can initialize a new session by clicking the 'Start New Session' button. This action sends the project code to the server, which then responds with a flowchart and algorithm.

2. **Storing User Data**
    - I have implemented IndexedDB to store user data, including summaries and analysis reports. IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.  Now the LLM can take reference from the stored data to generate more accurate analysis.

---

## Challenges & How I Overcame Them

- **Challenge 01:** Working with vanilla JavaScript is really time-consuming. Although my fundamentals about this language are getting stronger, I still find it challenging to make dynamic UI components using it.

  **Solution :** I am using existing CSS styling to make the UI components a little bit faster.

- **Challenge 02:** The 'reflection' widget block comes in the project code. So, the LLM also describes the block in the algorithm that is not needed.

  **Solution :** I have not figured out a solution for this yet. I am thinking of using a regex to remove the block from the code before sending it to the LLM.
---

## Key Learnings

- I have learned how to use IndexedDB for storing user data in a structured way. This will be beneficial for future projects that require client-side storage.
---

## Next Week’s Roadmap

- From recent discussions with my mentor, I will be assigning persona-like names to the AI agents.
- I will be implementing the 'analysis' feature in the 'reflection' widget. Therefore, it has to read the previous summaries and analysis reports from the IndexedDB.
---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)
- **Streamlit App:** [Reflection App](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)
- **IndexedDB Documentation:** [MDN Web Docs - IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
