---
title: "DMP ’25 Week 6 Update by Aman Naik"
excerpt: "This week involved integrating the LLM's story framework into the UI, user testing with school children, and successfully resolving AWS deployment issues."
category: "DEVELOPER NEWS"
date: "2025-07-12"
slug: "2025-07-12-dmp-25-AmanNaik-week06"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week06,midterm,amannaik247"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 6 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-07-06 – 2025-07-12  

---

## Goals for This Week

- Build a user interface for the generated story framework  
- Integrate LLM-generated responses into the UI  
- Get feedback from real students using the demo application  
- Deploy an LLM model on AWS  

---

## This Week’s Achievements

1. **Built the Story Framework UI**  
   - Designed and implemented the story framework display using GTK and GTK CSS.  
   - The UI now dynamically displays the story structure based on the JSON response received from the LLM.  
   - The framework was successfully demonstrated to mentors, who gave positive feedback on the overall integration and experience.

2. **Integrated LLM Response Into the UI**  
   - Parsed the JSON response from the LLM and displayed each story element in dedicated sections within the app.  
   - Incorporated error handling for missing or blank story categories.

   ![Framework UI(WIP) with LLM genrated response](assets/Images/aman-naik-week6-img1.png)

3. **Gathered Real-User Feedback Through a School Demo**  
   - Mentor [Devin Ulibarri](https://github.com/pikurasa) organized a hands-on testing session with 12 students across four different activity stations:  
     - LLM-Speak  
     - Story Builder  
     - Personas  
   - Students reflected on their experience via handouts. I’ll be analyzing their feedback to better understand their thoughts and identify areas of improvement.

   ![Image of the handout given by Devin Ulibarri](assets/Images/aman-naik-week6-img2.png)

4. **Resolved AWS Permissions Issue**  
   - Successfully resolved the permission issue that previously blocked AWS access.  
   - Now have access to SageMaker and am prepared to deploy the LLM model as planned in the upcoming week.

---

## Challenges & How I Overcame Them

- **Challenge:** Handling incomplete or empty story categories in LLM responses  
  **Solution:** Added placeholders in the UI for missing categories. These placeholders guide the student with helpful questions (e.g., "What could be the turning point in your story?") to encourage further development. Future updates will include buttons for AI-generated suggestions.  

- **Challenge:** Gaining access to deploy on AWS  
  **Solution:** Through clear and timely communication with mentors, I was able to get the necessary permissions and understand more about how access control and user roles work in AWS.

---

## Key Learnings

**Learned How to Build and Parse Adaptive Story Frameworks in UI**  
   - Learned how to dynamically map LLM outputs into GTK UI components and ensure the experience remains useful even when some inputs are missing.  
   - Code of try and except block parsing the response given by the LLM to update story info:  

   ```python
   try:
        start_idx = analysis.find('{')
        end_idx = analysis.rfind('}') + 1
        if start_idx != -1 and end_idx != -1:
            json_str = analysis[start_idx:end_idx]
            story_data = json.loads(json_str)
            return story_data
    except Exception:
        pass
    # Return default structure if parsing fails
    return {
        "title": "",
        "setting": "",
        "character_main": "",
        "character_side": "",
        "goal": "",
        "conflict": "",
        "climax": "",
        "helpers": "",
        "villains": "",
        "ending": "",
        "theme": ""
    }
   ```   

**Valuable Experience from Real User Testing**  
   - Understood how students react to the tool, what excites them, and what confuses them — essential insights to shape the next phase of development.

**Improved My Understanding of AWS Deployment Workflows**  
   - Resolved previous blockers and now have a clearer picture of how cloud model hosting works and how access can be securely managed.

---

## Next Week’s Roadmap

- Finalize the deployment of the selected LLM model using AWS SageMaker  
- Make the sidebar panel collapsable so it can be accessed when needed  
- Understand feedback of the UI based on student and mentor feedback    

---

## References

_Quote from Devin Ulibarri (Mentor):_  
> "Since these are experimental, I was mildly concerned that a student might find something inappropriate, but nothing of the sort happened. One student made a story about a "Blob of Poop", but it wasn't too bad."  

This has prompted me to think about on how to make LLM responses more child-friednly and create strict restrictions for inappropriate content.  

---

## Midterm Progress Summary

Over the past six weeks, I’ve made significant progress toward building an AI-powered assistant for the Write Activity:

- **Week 1–2:** Explored different approaches to creative writing and finalized a guided AI-assisted architecture for story building.
- **Week 3:** Built a working demo using Streamlit and received initial mentor feedback.
- **Week 4:** Began integrating the demo into the Sugar Activity and created the first UI prototype with a sidebar chatbot.
- **Week 5:** Designed a widget to display the story framework and attempted to deploy the LLM model on AWS (later resolved).
- **Week 6:** Fully integrated LLM JSON responses into the app's UI, tested the tool(using the demo application) with 12 students, and gathered real-world feedback. Also successfully resolved the AWS access issue for upcoming deployment.

These weeks have been packed with learning—from UI design for young learners to API integration, cloud model deployment, and real-user testing. With foundational blocks in place, I’m now ready to polish the experience and begin iterative improvements with real feedback in mind.  

---

## Acknowledgments

A huge thank you to my mentors, especially Devin Ulibarri for arranging the user testing session. I’m also grateful to Walter, Ibiam, and the Sugar Labs community for their continued support and constructive feedback every week.

---
