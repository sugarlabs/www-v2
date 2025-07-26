---
title: "DMP ’25 Week 7 Update by Aman Naik"
excerpt: "This week focused on UI enhancements for toggling the chat sidebar and setting up an AWS SageMaker endpoint for LLM inferencing."
category: "DEVELOPER NEWS"
date: "2025-07-19"
slug: "2025-07-19-dmp-25-AmanNaik-week07"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week07,amannaik247"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 7 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-07-13 – 2025-07-19  

---

## Goals for This Week

- Create an icon on the toolbar to toggle the chat sidebar  
- Set up and test an AWS endpoint for LLM inferencing using Amazon SageMaker  

---

## This Week’s Achievements

1. **Toolbar Button for Chat Sidebar Toggle**  
   - Added a new icon on the Sugar toolbar using GTK's `ToolButton` class.
   - Connected the button to toggle the visibility of the chat sidebar dynamically using GTK container methods.
   - Ensured the sidebar is hidden by default and only becomes visible upon user interaction.
   - This feature allows users to keep their workspace distraction-free and access the AI assistant only when needed.
   - [Toggle button demo](assets/Images/aman-naik-week7-vid1.mp4). The icon is just a placeholder for now.

2. **AWS SageMaker Endpoint for LLM Inferencing**  
   - Created an AWS endpoint using Amazon SageMaker and deployed the Hugging Face model `Qwen/Qwen3-235B-A22B-Instruct-2507`.
   - Observed that the initial outputs from the model were overly verbose and hallucinated unrelated content.
   ![Prompt and the response it generated](assets/Images/aman-naik-week7-img1.png)
   - Identified that a better prompt template could significantly improve output quality, which will be explored further.

---

## Challenges & How I Overcame Them

- **Challenge:** Chat sidebar was visible at activity startup  
  **Solution:** Initially, the sidebar was showing up by default due to its presence as a child widget in the main container. By explicitly setting its visibility to `.hide()` after the `content_box.show.all()` trigger at initialization and linking the toggle behavior to the toolbar button, the issue was resolved. Now, the sidebar behaves as intended—hidden until toggled.

- **Challenge:** Limited experience with AWS SageMaker made endpoint deployment complex  
  **Solution:** Referred to AWS and Hugging Face documentation along with video tutorials to learn how to prepare the model, create an endpoint, and configure permissions. This process enhanced my understanding of AWS instance types, inference containers, and IAM roles.

---

## Key Learnings

**GTK UI Customization and Conditional Widget Rendering**  
   - Gained hands-on experience in dynamically managing widget visibility in GTK.
   - Learned how to cleanly modify the toolbar and use callback functions to control the state of sidebar components.

**Improved Understanding of AWS SageMaker Deployment**  
   - Developed an end-to-end workflow to deploy and test a large language model using Hugging Face’s inference containers on AWS SageMaker.
   - Learned about inference pipelines, endpoint scaling, and best practices for managing response lengths and hallucinations.

---

## Next Week’s Roadmap

- Implement mentor feedback on improving the UI/UX of the story framework section  
- Experiment with improved prompt engineering  
- Explore smaller or more instruction-aligned models for improved response reliability  

---

## References

_Model deployed using Hugging Face: [Qwen/Qwen3-235B-A22B-Instruct-250](https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507)_  
_AWS SageMaker Deployment Guide: [Amazon SageMaker documentation](https://docs.aws.amazon.com/sagemaker/)_

---

## Acknowledgments

Thank you to my mentors for their consistent guidance. Special thanks to the open-source contributors and AWS documentation community whose detailed resources helped me overcome deployment challenges.

---
