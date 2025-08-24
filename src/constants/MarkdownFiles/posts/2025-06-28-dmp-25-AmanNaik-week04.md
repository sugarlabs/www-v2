---
title: "DMP ’25 Week 4 Update by Aman Naik"
excerpt: "This week focused on building a basic UI for the chatbot within Sugar and implementing a book recommendation system using the Google Books API."
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-22-dmp-25-AmanNaik-week04"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week04,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-06-22 – 2025-06-28  

---

## Goals for This Week

- **Goal 1:** Create some UI to test the demo chatbot inside Sugar  
- **Goal 2:** Develop a book recommendation feature for the demo application  

---

## This Week’s Achievements

1. **Built a Basic Chatbot UI Inside Sugar**  
   - Created an initial UI within Sugar using the demo logic from the Streamlit version as reference.  
   - Implemented a basic sidebar within the activity that allows students to converse with the chatbot while simultaneously viewing the story context.  
   - The framework generated from the conversation is currently being saved as a JSON file. UI for displaying the framework is still under development and will be added later.

   ![User interface(sidebar) and AI generated responses](assets/Images/aman-naik-week4-img1.webp)

2. **Implemented Book Recommendation Feature**  
   - Integrated the Google Books API to recommend the top 3 similar books based on the conversation with the AI assistant.  
   - The goal is to inspire children by connecting their creative stories with real-world books.  
   - Based on mentor feedback, I will prioritize refining the chatbot and story framework builder before expanding the recommendation feature.

   ![Book recommendations based on the conversation fro streamlit demo](assets/Images/aman-naik-week4-img2.webp)
   
---

## Challenges & How I Overcame Them

- **Challenge:** Integrating the chatbot into Sugar and dealing with GTK  
  **Solution:** As I had limited experience with GTK, I faced difficulties while setting up the interface. Additionally, the initial setup used Groq's SDK, which wasn’t compatible with Sugar. I refactored the code to use the `requests` module for calling Groq’s API instead, which made integration possible without extra dependencies.

- **Challenge:** Displaying the final story framework after clicking the "Create Framework" button  
  **Solution:** I’m currently working on UI design ideas to present the story structure in a child-friendly and intuitive way. I’ll be discussing different visual layouts with my mentors in the upcoming meeting to finalize a clear and engaging format.

---

## Key Learnings

**Integrated AI Chatbot Into Sugar's UI Framework**  
   - Learned how to work with GTK and adapt web-based chatbot logic into a desktop environment suitable for Sugar.

**Designed Book Recommendation Feature Using Google Books API**  
   - Built a feature that enriches the student’s experience by recommending related books based on the story they are writing.

**Improved Problem-Solving Skills While Debugging API and GTK Issues**  
   - Encountered real-world software integration issues and learned how to handle dependency mismatches and platform limitations effectively.

---

## Next Week’s Roadmap

- Finalize the UI for the story framework display  
- Focus on polishing the conversational flow of the AI assistant  
- Exploring LLM's to be used instead of Groq API for AWS integration  

---

## Acknowledgments

Grateful to my mentors, the Sugar Labs community, and fellow contributors for their continuous support and insightful suggestions throughout the week!

---
