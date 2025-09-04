---
title: "GSoC’25 Week 12 Update by Om Santosh Suneri"
excerpt: "AI-powered Debugger for Music Blocks"
category: "DEVELOPER NEWS"
date: "2025-08-24"
slug: "2025-08-24-gsoc-25-omsuneri-week12"
author: "@/constants/MarkdownFiles/authors/om-santosh-suneri.md"
tags: "gsoc25,sugarlabs,week12,Debugger,AI,Music Blocks,Final Submission"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Om Santosh Suneri

**Project:** [AI-powered Debugger for Music Blocks](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender/) [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa/)  
**Reporting Period:** 2025-08-21 - 2025-08-24

---

## Goal for This Week

The **primary objective** for this final week of Google Summer of Code 2025 was to **refactor and modularize the backend FastAPI server**, enabling it to operate **independently from the Streamlit frontend**. Additionally, I aimed to make the project **production-ready by deploying it on an AWS EC2 instance using systemd**, allowing continuous availability of the service.

Alongside the deployment, I also worked on **documenting the complete contributor and user experience**, ensuring that **future contributors and users can easily get started** with the AI Debugger system.

---

## This Week’s Achievements

### Backend Independence from Streamlit

One of the **most important milestones** of this week was separating the **FastAPI backend** from the **Streamlit app**. Previously, the backend was tightly coupled with the Streamlit interface, limiting flexibility. I restructured the repository and added an **independent `api.py` file** that runs **Uvicorn as a FastAPI app**, making it easier to scale, test, and deploy.

```bash
# Now the backend can be launched directly with:
python -m uvicorn app.api:app --host 0.0.0.0 --port 8000
```

This approach aligns with production-grade practices and allows the **Streamlit app and FastAPI backend to scale independently**.


### Production Deployment on AWS EC2 with systemd

To ensure the backend could **serve users 24/7**, I set up a **dedicated EC2 instance** on AWS and deployed the backend using a `systemd` service.

Here’s a breakdown of the finalized configuration:

```ini
[Unit]
Description=Debugger for Music Blocks - FastAPI backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/AI-powered-Debugger-for-Music-Blocks
ExecStart=/home/ubuntu/AI-powered-Debugger-for-Music-Blocks/venv/bin/python -m uvicorn app.api:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

**Key Highlights:**

* `ExecStart` runs Uvicorn directly from the virtual environment, ensuring environment consistency.
* `Restart=always` allows **automatic recovery** in case of backend crashes.
* Using `systemctl`, I enabled and started the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable debugger.service
sudo systemctl start debugger.service
```

This ensures the backend remains **persistent and robust**, especially under real-world usage.


### Contributor Documentation

To make the project **accessible for new developers**, I authored the **AI-powered Debugger Widget - Contributor Guide**, which outlines the full stack — from the frontend widget integration to backend architecture.

Some key highlights:

* **Architecture Overview**:

<a href=""><img src="https://i.ibb.co/CK8qXhfm/Screenshot-2025-08-22-at-12-34-44-AM.png" alt="Debugger Architecture"></a>

* **API Interaction Sample**:

  ```js
  fetch("http://13.49.246.243:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: projectData,
      prompt: message,
      history: history,
      prompt_count: this.promptCount
    })
  });
  ```

📎 [Contributor Guide on GitHub](https://github.com/omsuneri/musicblocks/blob/Debugger-docs/js/widgets/aidebugger-guide.md)


### User Guide & Demo Video

To assist end-users, especially **students, teachers, and parents**, I published a **visually engaging User Guide** along with a demo video:

<a href=""><img src="https://i.ibb.co/93HCW8hC/Screenshot-2025-08-22-at-12-45-48-AM.png" alt="AI-Powered Debugger Widget Demo"/></a>

**🎥 [Click to Watch the Demo Video](https://www.youtube.com/watch?v=G-NfDo_A5PM)**

This guide explains:

* How to drag and use the AI Debugger widget
* Example questions to ask the AI
* How the AI assistant explains errors and suggests fixes

📘 [AI-Powered Debugger Widget Guide](https://github.com/omsuneri/musicblocks/blob/Debugger-docs/AI-Debugger-widget-guide.md)

---

### Why It Matters

This week's work marks a **significant transition from development to deployment**. By **decoupling the backend**, setting up **system-level service management**, and providing **comprehensive documentation**, the project is now **fully production-ready**.

This effort makes the **AI Debugger more scalable**, **developer-friendly**, and **accessible to educators and learners** across the Sugar Labs community. Now, **Music Blocks users can rely on a stable, intelligent assistant** to help them debug their musical creations in real time.

---

### Final Thoughts

As this marks the **final official week of Google Summer of Code 2025**, I want to take a moment to reflect on this incredible journey.

Working on this project has not only sharpened my technical skills in **FastAPI**, **Streamlit**, **systemd**, **deployment pipelines**, and **full-stack architecture**, but also introduced me to the **open-source world** in the most collaborative way possible. I’m **deeply grateful** to my mentors and the Sugar Labs community for their continuous support and guidance.

Building the AI-powered Debugger has been **one of the most fulfilling experiences** of my development journey so far. The ability to contribute to something that helps kids **learn music and programming more easily** makes me feel proud and inspired for future contributions.

---

## Resources & References

* **Backend Repository**: [AI Debugger](https://github.com/omsuneri/AI-powered-Debugger-for-Music-Blocks)
* **Frontend Widget Code**: [Music Blocks Repository](https://github.com/omsuneri/musicblocks/blob/Debugger-docs/js/widgets/aidebugger.js)
* **Documentation**: [Contributor Guide](https://github.com/omsuneri/musicblocks/blob/Debugger-docs/js/widgets/aidebugger-guide.md) | [User Guide](https://github.com/omsuneri/musicblocks/blob/Debugger-docs/AI-Debugger-widget-guide.md)
* **Demo Video**: [Watch on YouTube](https://www.youtube.com/watch?v=G-NfDo_A5PM)

---

## Acknowledgments

Huge thanks to my mentors **Walter Bender**, **Sumit Srivastava**, and **Devin Ulibarri** for their mentorship, trust, and encouragement throughout the summer.

Thanks also to the **Sugar Labs community** for welcoming me and providing constant feedback and motivation.

I look forward to staying active in this community, contributing more, and supporting new learners through the tools we’ve built together.

---
*Made with ❤️ for Music, Open Source, and Learning.*

