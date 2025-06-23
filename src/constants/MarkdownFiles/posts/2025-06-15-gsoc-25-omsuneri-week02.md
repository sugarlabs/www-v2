---
title: "GSoC ’25 Week 02 Update by Om Santosh Suneri"
excerpt: "To Develop a Basic RAG Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-omsuneri-week02"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week02,Debugger,AI,Music Blocks"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-06-08 - 2025-06-14

---

## Goals for This Week

- **Goal 1:** Enhance and Polish the Converter code
- **Goal 2:** To Make the JSON to Text Converter Publicly Accessible
- **Goal 3:** To Develop a Basic RAG Debugger for Music Blocks

---

## This Week’s Achievements

1. **Enhance and Polish the Converter code**  
   - I refined the output of the JSON to Text Converter by improving how blocks, parameters, and nested structures are represented. I also optimized the formatting and added clearer visual symbols to make the structure easier to follow.
   - A well-structured and readable output is critical for debugging and learning. These enhancements make the converter not only functional but truly useful, especially for beginners who may be overwhelmed by raw JSON. The clarity improvements bridge the gap between raw code and conceptual understanding.
   - GitHub Repository: [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)

2. **To Make the JSON to Text Converter Publicly Accessible**  
   - I deployed the Music Blocks JSON to Text Converter as a static web tool using GitHub Pages. This involved setting up the project structure for deployment, ensuring browser compatibility, and verifying that the tool works seamlessly for any user without needing local installation.
   - By making the converter publicly accessible, I’ve removed a major barrier for non-technical users who want to understand or debug Music Blocks projects. Now, anyone can paste their JSON and instantly see a human-readable text format, making it easier to interpret the project logic, especially for educators and learners.
   - JSON to Text Converter: [Live Demo](https://omsuneri.github.io/JSON-to-Text-representation/)

3. **To Develop a Basic RAG Debugger for Music Blocks**  
   - I created the initial version of a Retrieval-Augmented Generation (RAG) app that acts as a debugger for Music Blocks. It uses Google Gemini (free API) for natural language responses and Qdrant as a vector database to search over relevant Music Blocks documentation and sample project data.
   - This is the first step toward an AI-powered assistant that can help users understand errors, debug project files, and learn concepts interactively. It lays the groundwork for a smarter, more accessible debugging experience tailored specifically to the Music Blocks environment.
   - GitHub Repository: [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)

---


## Challenges & How I Overcame Them

- **Challenge:** Error 99 – Deployment Failure due to Network Binding  
  **Solution:** I updated the Gemini API implementation to avoid explicitly binding to a local address and ensured it followed the correct networking model for serverless deployment. I also verified that no hardcoded host values (like 127.0.0.1) were used and that the requests use standard internet routes.

- **Challenge:** Reducing Container Size from 7.1 GB to Under 4 GB  
  **Solution:** I explored two approaches:
   - Optimization: I removed redundant or unused files from the embedding directory and ensured the vector database stored only the most relevant documents.
   - Cloud-based Embeddings: I evaluated storing the embeddings externally (e.g., by using a hosted Qdrant instance or remote storage) so that the app could load them at runtime, rather than bundling them in the container.These optimizations brought the container size within limits and made the app deployable on Railway.

---

## Key Learnings

- Deployment environments have strict constraints that require optimization and flexibility
I learned that successful deployment isn’t just about writing functional code — it's equally about managing resources (like container size) and handling platform-specific limitations, such as networking and storage.
- Early-stage AI apps benefit greatly from clear modularity and cloud-ready design
While building the RAG debugger, I realized the importance of designing components (like embeddings, API logic, and vector search) to be loosely coupled and scalable, which helps avoid technical roadblocks during cloud deployment.

---

## Next Week’s Roadmap

- Deploy the AI-Powered Debugger App to a Cloud Hosting Platform.
- Create Embeddings from Music Blocks Project Text Representations.
- Improve LLM Response Language for Kids and Junior Learners.

---

## Resources & References

- **Repository:** [JSON to Text representation](https://github.com/omsuneri/JSON-to-Text-representation)
- **Repository:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
