---
title: "GSoC ’25 Week 09 Update by Diwangshu Kakoty"
excerpt: "Reflection Learning Widget in Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-gsoc-25-diwangshu-week09"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week09,AI"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-07-28 - 2025-08-04  

---

## Goals for This Week

- **Goal 1:** Fixed 'reflection' widget UI.
- **Goal 2:** Improved chat interface.
- **Goal 3:** Improved prompts for child-friendly language.
- **Goal 4:** Automated algorithm generation.
- **Goal 5:** Fixed a bug where the first message triggered twice.

---

## This Week’s Achievements

1. **Fixed 'reflection' widget UI**  
  - The user interface design of the widget now aligns with other widgets. There is a sidebar with buttons like export and "generate a summary".

    <a href="https://ibb.co/PZWZQDhN"><img src="https://i.ibb.co/gMWMV4T3/Screenshot-2025-08-10-195926.png" alt="chat interface" border="0"></a>

2. **Improved chat interface**
  - Every message bubble will now show its sender name on top of the text.

3. **Improved prompts for child-friendly language**
  - I was suggested by my mentor that the LLM's responses were not child friendly in terms of its complexity of sentences. So, I have added specific instructions regarding this.

4. **Automated algorithm generation**
  - Earlier, I had a "Start" button to initialize the conversation. When clicked, Music Blocks would send the project code to the backend, which then called the LLM to generate an algorithm for it and attempt to predict the code’s purpose. Now, there’s no button — simply opening the widget window triggers the entire process automatically. Implementing this change took some time, as I had to fix a tricky bug. I’ll explain more about that bug in the next point.

---

## Challenges & How I Overcame Them

- **Challenge 01:** The first message was triggered twice. As I mentioned, the bot automatically sends the first message containing the project code algorithm and asks the user to confirm if the guess is correct. However, the algorithm generation function ended up being triggered twice. I discovered that the widget’s initialization function runs twice. I don’t think this is a bug in itself, as the same behavior occurs with all other widgets.

  **Solution :** The challenge was identifying the problem; the solution itself was straightforward. I initialized a boolean flag that is set to true only during the first call of the initialization function. This allows us to prevent subsequent calls by simply checking the flag’s value.

- **Challenge 02:**  While integrating my `generateAnalysis()` function in a JavaScript class, I was passing `this.chatHistory` and `this.summary` as arguments. This caused a 422 error from the FastAPI backend because the arguments were evaluated before the function executed, leading to stale or incorrect values.

  **Solution :**  I removed the parameters from generateAnalysis() and accessed this.chatHistory and this.summary directly inside the method. This ensured the function always used the latest and correct state from the class instance at the time of execution, eliminating the backend validation error

---

## Key Learnings

- Always ensure method parameters match actual property names, and be mindful that passing arguments captures their value at that moment. Accessing properties directly from this inside the method guarantees using the latest, correct state, especially in asynchronous JavaScript flows.
---

## Next Week’s Roadmap

- The widget is almost complete. Now I need to figure out deploying the FastAPI application in AWS.
- I will also be testing Sugar-ai to see how it can beneficial for the reflection widget.

---

## Resources & References

- **Repository:** [reflection_streamlit](https://github.com/Commanderk3/reflection_streamlit)
- **Streamlit App:** [Reflection App](https://reflectionapp-2yoxtvn6sknvktme2zorvq.streamlit.app/)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---