---
title: "SSoC ’25 Week 12 Update by Muhammad Haroon"
excerpt: "Deploying the backend on AWS and My Journey in the Sugar Summer of Code 2025"
category: "DEVELOPER NEWS"
date: "2025-08-24"
slug: "2025-08-24-ssoc-25-MuhammadHaroon-week12"
author: "@/constants/MarkdownFiles/authors/muhammad-haroon.md"
tags: "ssoc25,sugarlabs,week12,GenAI,MusicBlocks,Music"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Muhammad Haroon

**Project:** [Generative AI Instrument Sample Generation for Music Blocks](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2025.md#Generative-AI-Instrument-Sample-Generation-for-Music-Blocks)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-18 - 2025-08-24

---

## Goals for This Week

- **Goal 1:** Deploy the backend on AWS.
- **Goal 2:** Write a detailed blog post summarizing everything I have done during my 12-week internship.

---

## This Week's Achievements

1. **Deploy the backend on AWS**
    - To deploy the backend on AWS, I reached out to Ibiam and Mebin on the Sugar System channel for guidance. Mebin suggested that I create my own account, as AWS provides free credits to new users, and try deploying there to get familiar with the process since I was new to it and we didn’t want to use Sugar AI credits unnecessarily. I created my own AWS Free Tier account, launched an EC2 instance, after following several blogs and tutorials, I was able to deploy it successfully.

    - However, since I was using the Free Tier, the instance ran out of memory and stopped automatically when accessing the URL. I believe that deploying on SugarLabs AWS, which is a Paid Tier account, would provide more memory and higher resource limits.

    - Although I couldn’t fully deploy the backend in a production-ready way, the process taught me a lot about AWS and deployment practices.

---

## My Journey in the Sugar Summer of Code 2025

- Participating in the Sugar Summer of Code 2025 has been an incredible experience where I learned many new skills and gained hands-on knowledge.

- The first six weeks of the internship were exciting, mostly focused on conducting experiments to find the best model for AI Sample Generation. I learned how to properly carry out experiments. Unfortunately, the current models are not very effective at generating useful instrument samples, they are good at producing sound effects. It was then decided to use these models to generate audio, trim specific segments with an audio trimmer and then import the trimmed audio into Music Blocks.

- The last six weeks were mostly spent creating user interface sketches and then implementing them in Music Blocks. I also developed a FastAPI application to connect the backend with the frontend. To simplify setup and avoid dependency issues, I created a Docker image of the backend. Additionally, I attempted to deploy it on AWS. Comprehensive documentation was prepared for the backend, detailing how it can be easily set up, along with a Developer Guide for the frontend.

- All of my blog posts can be found here: [Muhammad Haroon Blogposts](https://www.sugarlabs.org/authors/muhammad-haroon)

- Finally, I would like to thank Sugar Labs, [Devin Ulibari](https://github.com/pikurasa) and [Walter Bender](https://github.com/walterbender) for providing me with this wonderful opportunity and for the guidance throught the journey.

- The following video demonstrates the AI Sample Generation and Audio Trimmer feature in Music Blocks:

[youtube: ctXpf4dzln4] 

---

## Key Learnings

- Gained hands-on experience with AWS.

---

## Future Goals

- Deploy the backend on Sugar Labs AWS account.
- Create a User Guide for frontend.
- Continue contributing to Sugar Labs and Music Blocks and assisting new contributors. 

---

## Resources & References
- **Frontend Code** https://github.com/sugarlabs/musicblocks/pull/4740
- **Backend Code** https://github.com/haroon10725/AI-Sample-Generation-Backend
- **Developer Guide** https://github.com/sugarlabs/musicblocks/pull/4754

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---