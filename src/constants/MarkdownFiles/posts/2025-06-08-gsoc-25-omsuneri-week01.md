---
title: "GSoC ’25 Week 01 Update by Om Santosh Suneri"
excerpt: "Refining the JSON to text convertor code and creating a basic streamlit debugger app UI"
category: "DEVELOPER NEWS"
date: "2025-06-07"
slug: "2025-06-07-gsoc-25-omsuneri-week01"
author: "Om Santosh Suneri"
description: "GSoC'25 Contributor working on AI-powered Debugger for Music Blocks"
tags: "gsoc25,sugarlabs,week01,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-02 - 2025-06-07  

---

## Goals for This Week

- **Goal 1:** To refine the JSON to text convertor code.
- **Goal 2:** To convert the convertor's Javascript code to Python.
- **Goal 3:** To create a basic Streamlit debugger app UI.

---

## This Week’s Achievements

1. **JSON to Text Converter Refinement**  
   - I focused on refining the JSON to Text Converter for Music Blocks. I improved the metadata representation of the "start" block to make it more accurate and readable in the text format. Additionally, I added support for more block types, ensuring that their text representations are consistent with the design format.
   - This refinement is important because the JSON to Text Converter is a core part of our AI-powered Debugger. A clear and structured text format makes it easier for both the AI model and human users to understand the program logic.

2. **Javascript to Python Conversion**  
   - Following suggestions from mentors Walter and Devin, I began creating a Streamlit-based debugger interface. Since Streamlit is a Python framework, my first step was to convert the existing JSON to Text Converter—originally written in JavaScript—into Python. This involved translating the logic and formatting rules to ensure the output remained consistent.
   - This conversion is crucial because it enables seamless integration of the converter into the Streamlit app, which will serve as the initial interface for our debugger. By moving the code to Python, I ensured compatibility with the app’s backend, allowing further development like live user queries, debugging and feedback—all in one cohesive Python environment.

3. **Streamlit Debugger App UI Creation**  
   - As a beginner to Streamlit, I started building the UI for the debugger app. I successfully created a basic Streamlit interface that allows users to input text queries. To handle these queries, I integrated the free Google Gemini API, enabling the app to return LLM-generated responses. Currently, the app supports simple user input and displays the corresponding Gemini response.
   - This is an important first step in building an interactive AI-powered debugger. Even though it’s still in an early stage, this app lays the foundation for integrating core features like JSON-to-text conversion, error analysis, and user feedback. The goal is to evolve this into a fully functional debugging tool that enhances the Music Blocks experience.

---

## Challenges & How I Overcame Them

- **Challenge:** Learning the Streamlit framework and creating a basic UI app as a complete beginner.  
  **Solution:** To overcome this, I referred to the official Streamlit documentation, followed beginner tutorials, and experimented with small components to understand the structure. This hands-on approach helped me build a working basic UI that takes user input and integrates it with the Gemini API.

- **Challenge:** Converting all methods and functions from JavaScript to Python was time-consuming and introduced several errors.  
  **Solution:** I carefully mapped the logic from JavaScript to Python, using Pythonic alternatives where necessary. I used print-based debugging and Python’s error messages to identify issues. Although some minor bugs remain, I have a clear plan to fix them in the coming days and will be testing each function thoroughly for accurate output.

---

## Key Learnings

- I gained an understanding of Streamlit’s basic architecture and learned how to build and deploy a Streamlit app
- I explored advanced Python techniques to effectively translate the JavaScript code into Python for smoother integration.

---

## Next Week’s Roadmap

- My goal for the next week is to fully convert the JSON to Text Converter, originally written in JavaScript, into Python. 
- I also plan to integrate this Python version directly into the Streamlit debugger app to enable seamless JSON conversion within the app interface. 
- Additionally, I aim to make the basic functionality of the app usable so that users can begin interacting with it and provide initial feedback. This feedback will help identify usability issues early and guide further improvements in the UI and debugging workflow.

---

## Resources & References

- **Repository:** [AI-powered-Debugger-for-MB(JSON convertor)](https://github.com/omsuneri/AI-powered-Debugger-for-MB/blob/main/Convertor/converting-json-txt.js)  

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [@omsuneri](https://github.com/omsuneri)
- Gmail: [omsuneri@gmail.com](mailto:omsuneri@gmail.com)
- LinkedIn: [Om Santosh Suneri](https://www.linkedin.com/in/om-santosh-suneri-736767166/)
- Twitter: [@suneri_om](https://x.com/suneri_om)

---
