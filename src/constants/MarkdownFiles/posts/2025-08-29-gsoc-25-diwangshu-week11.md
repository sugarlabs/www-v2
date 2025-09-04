---
title: "GSoC ’25 Week 11 Update by Diwangshu Kakoty"
excerpt: "Reflection Widget"
category: "DEVELOPER NEWS"
date: "2025-08-29"
slug: "2025-08-29-gsoc-25-diwangshu-week11"
author: "@/constants/MarkdownFiles/authors/diwangshu-kakoty.md"
tags: "gsoc25,sugarlabs,week11,AI"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 11 Progress Report by Diwangshu Kakoty

**Project:** [AI Tools for Reflection](https://github.com/Commanderk3/reflection_ai)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Ajeet Pratap Singh](https://github.com/apsinghdev)  
**Reporting Period:** 2025-08-12 - 2025-08-18  

---

## Goals for This Week

- **Goal :** Deploy the backend on AWS.

---

## This Week’s Achievements

1. **Deployed the backend on AWS**  
  - I was able to successfully deploy the FastAPI backend on Sugar Labs' AWS. This involved setting up the server environment, configuring necessary dependencies, and ensuring that the API endpoints were accessible.

  - I chose EC2 instance and set up a linux server. I installed Python, FastAPI, and other required libraries. I also configured security groups to allow incoming traffic on the necessary ports.

  - Because the backend is runing a sentence-transformer model, I chose t3.micro instance which has 2 vCPUs and 1 GiB of memory. This is sufficient for handling requests without incurring high costs.

  - It is using systemd to manage the FastAPI service. This ensures that the service starts automatically on server reboot and can be easily monitored.

---

## Challenges & How I Overcame Them

- **Challenge 01:**  This was my first time deploying a backend on AWS, so I faced several challenges related to server configuration, security settings, and dependency management. The first cahllenge was setting up thr disk space. The default disk space was not sufficient for installing all the required libraries and models. I increase the volume size from 8 GB to 25 GB but it was not enough.

  **Solution:** I came to know that the volume size was not the issue but the root partition size was the issue. So, I resized the root partition using `growpart` and `resize2fs` commands. After resizing, I was able to install all the required libraries and models without any issues.

- **Challenge 02:** Next challenge was running the uvicorn server. The t3.micro instance has low memory and therefore, the sentence transformer model was causing the server to crash frequently.

  **Solution:** I used the leftover swap space to increase the memory. I created a swap file of 1 GB and enabled it. This helped in stabilizing the server and preventing crashes.
 

---

## Next Week’s Roadmap

- Work on things suggested by my mentors. This may include:
  - Adding more features to the reflection widget.
  - Improving the performance of the backend.

- Write documentation for the project.

---

## Resources & References

- **Reflection widget development branch:** [reflection](https://github.com/Commanderk3/musicblocks/tree/reflection)
- **Fast API server:** [musicblocks_reflection_fastapi](https://github.com/Commanderk3/musicblocks_reflection_fastapi)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---