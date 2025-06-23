---
title: "GSoC’25 Week 03 Update by Om Santosh Suneri"
excerpt: "To Develop a Basic RAG Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-06-22"
slug: "2025-06-22-gsoc-25-omsuneri-week03"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week03,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 03 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-15 - 2025-06-21

---

## Goals for This Week

- **Goal 1:** Deploy the AI-Powered Debugger App to a Cloud Hosting Platform
- **Goal 2:** Create Embeddings from Music Blocks Project Text Representations  
- **Goal 3:** Improve LLM Response Language for Kids and Junior Learners  

---

## This Week’s Achievements

1. **Deploy the AI-Powered Debugger App to a Cloud Hosting Platform**  
   - This week, I successfully deployed the AI-Powered Debugger application on Streamlit Cloud, making it publicly accessible to anyone interested in testing it. The deployment process included optimizing the app structure for cloud compatibility, setting up environmental variables securely, and ensuring a smooth user experience. The live deployment now allows users—especially educators, learners, and developers—to interact with the debugger without needing to set up anything locally.
   - Making the debugger accessible via the web marks a major step in making AI tools more usable and available to the community. It enables initial-stage testing by real users, which is essential for collecting feedback and observing how the debugger performs across different user behaviors. This helps build a feedback loop that will guide future improvements and robustness of the tool, making it more valuable in the long term.

2. **Create Embeddings from Music Blocks Project Text Representations**  
   - After performing some minor improvements to the Music Blocks JSON-to-text converter, I selected 14 representative projects from the Music Blocks examples directory. These projects span across a range of tags and categories—such as music composition, transcription, games, utilities, and miscellaneous projects. I then generated vector embeddings for the textual representations of these projects and stored them in a Qdrant vector database cluster.
   - These embeddings serve as the foundation for teaching the LLM about the structure and semantics of real-world Music Blocks projects. By creating a searchable knowledge base of real examples, we are equipping the LLM with contextual understanding of how blocks are logically connected and used in different domains. This will significantly improve the LLM’s ability to understand, explain, and debug Music Blocks code based on actual use cases, making it more intelligent and helpful in practice.

3. **Improve LLM Response Language for Kids and Junior Learners**  
   - To make the debugger more inclusive and approachable for younger audiences, I updated the LLM prompt with additional guidance that instructs the model to assume the user is a child or junior learner. This involved reworking how queries are framed when sent to the LLM, prompting it to respond in a simpler, clearer, and more encouraging language style suitable for kids.
   - Music Blocks is widely used in educational environments, especially among school-age children learning to code. By making the language of AI responses more kid-friendly, we ensure that young learners can better understand and learn from the debugger’s suggestions. This step plays a key role in increasing the educational value, accessibility, and inclusivity of the project, ultimately making learning more fun and effective for our target audience.

---


## Challenges & How I Overcame Them

- **Challenge:** Improving ingest.py to Create Embeddings Efficiently  
  **Solution:** I enhanced the ingest.py script to process the improved text representations generated from various Music Blocks projects. I created and configured a Qdrant cluster to store the generated embeddings. This allowed me to index 14 representative projects across different categories. The modified script now supports smoother ingestion of data into Qdrant, and the embeddings are successfully retrievable for use by the LLM. This improvement lays the foundation for more intelligent, context-aware search and reasoning by the debugger.

- **Challenge:** Handling Environment Variables in Streamlit Cloud  
  **Solution:** After some thorough research and trial-and-error, I realized that Streamlit Cloud requires environment variables to be set via their Secrets Manager, not directly via .env files or code. I restructured the way the debugger reads sensitive values like API keys, moving everything into Streamlit's secure secrets.toml configuration. Once set properly, the application worked as expected in the cloud environment. This not only solved the deployment issue but also ensured better security practices moving forward.

---

## Key Learnings

- Deploying the AI debugger to Streamlit Cloud taught me the importance of environment-specific configurations, especially handling environment variables securely using platform-specific methods like Streamlit’s Secrets Manager. It highlighted how even small deployment details can significantly impact the usability and accessibility of an application.
- Creating embeddings from Music Blocks project representations and integrating them into a Qdrant vector database deepened my understanding of how LLMs can be enhanced with contextual knowledge. I also learned how to structure data ingestion pipelines effectively for scalable and meaningful semantic search.
- Tweaking the LLM prompt to generate child-friendly responses helped me appreciate the importance of audience-aware design in educational tools. It reinforced the idea that technology should be not just functional, but also inclusive, approachable, and aligned with the learning level of its users.

---

## Next Week’s Roadmap

- Integrate the JSON convertor directly into the Debugger Streamlit app 
- Testing the Debugger with Intensive Prompting
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
