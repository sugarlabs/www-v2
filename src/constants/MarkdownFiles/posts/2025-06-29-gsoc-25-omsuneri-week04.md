---
title: "GSoC’25 Week 04 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-omsuneri-week04"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week04,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-22 - 2025-06-28

---

## Goals for This Week

- **Goal 1:** Testing the Debugger with Intensive Prompting
- **Goal 2:** Improving the Quality of LLM Responses 
- **Goal 3:** Making the Debugger Interactive and Kid-Friendly 

---

## This Week’s Achievements

1. **Testing the Debugger with Intensive Prompting**  
   - I carried out extensive testing of the debugger by feeding it a wide range of Music Blocks projects and crafting diverse prompts to simulate how real users — especially children — might ask questions or seek help. This allowed me to observe how the LLM interprets different project structures and how effectively it can guide users toward understanding and improving their project.
   - Debugging is not just about fixing errors — it’s also about discovering new possibilities. Through this intensive testing, I was able to identify how the debugger could become a more intuitive assistant. Ensuring it understands various project contexts means kids can explore their creativity more freely, knowing they have a tool that helps them understand what’s happening and what more they can do. It moves the debugger from being reactive to being proactively supportive.

2. **Improving the Quality of LLM Responses**  
   - I focused on tuning the LLM prompts to ensure that the responses it generates are not only accurate but also clear, structured, and easy to understand for children. I experimented with different prompt formats, simplified technical jargon, and shaped the tone to be more friendly and encouraging. The goal was to make every response feel like it’s coming from a helpful companion, not a complicated machine.
   - For many young learners, especially those just starting their journey into coding and music, complex feedback can be discouraging. By improving the quality of responses, I’ve made the debugger more approachable and effective as an educational tool. This change ensures that kids receive feedback they can truly learn from. 

3. **Making the Debugger Interactive and Kid-Friendly**  
   - One of my main goals this week was to make the debugger feel more alive and responsive. I improved the system prompts to encourage a more interactive and friendly tone. Additionally, I introduced a feature where the debugger can automatically detect key elements of a project right after it is loaded — such as the instruments used, patterns in sequences, or loops — and immediately offer feedback or suggestions. This turns the debugger into more of a conversational partner than just a tool.
   - Young minds learn best when they feel engaged and supported. By making the debugger more interactive and giving it the ability to respond to a project from the moment it is initialized, the experience becomes more seamless and enjoyable. Kids no longer have to wait or guess what to do next — they’re gently guided and encouraged to explore, learn, and improve. It transforms the debugger into a playful mentor that supports learning through interaction, discovery, and fun.

---

## Deployed Project
- **Music Blocks Debugger:** [Live Demo](https://debuggmb.streamlit.app/)

<a href=""><img src="https://i.ibb.co/p6H5y3Bw/Screenshot-2025-06-28-at-10-41-28-AM.png" alt="Music Blocks Debugger"></a>

- **JSON to Text Converter:** [Live Demo](https://omsuneri.github.io/JSON-to-Text-representation/)

<a href=""><img src= "https://i.ibb.co/ycNPrKVs/Screenshot-2025-06-28-at-10-42-38-AM.png" alt="JSON to Text Converter"></a>

## Challenges & How I Overcame Them

- **Challenge:** Refining System Instructions for Better LLM Responses  
  **Solution:** One key challenge I encountered was fine-tuning the system instructions to consistently get high-quality, relevant responses from the LLM. The solution was to conduct extensive testing using a variety of prompts and project types. This helped me understand how the model interprets different contexts and allowed me to iteratively improve the instructions for more accurate, helpful, and kid-friendly outputs.

---

## Next Week’s Roadmap

- Integrate real-time response improvement based on project complexity.
- Enhance system prompts further through prompt-chaining and context tuning.
- Improving the Quality of LLM Responses

---

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
- **Debugger Streamlit App:** [Music Blocks Debugger](https://debuggmb.streamlit.app/)
- **Directory for Projects:** [Embedding Project Set](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks/tree/main/data/docs)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
