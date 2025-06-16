---
title: "GSoC ’25 Week 01 Update by Mebin J Thattil"
excerpt: "Experimenting, Benchmarking and Researching"
category: "DEVELOPER NEWS"
date: "2025-06-06"
slug: "2025-06-06-gsoc-25-mebinthattil-week1"
author: "Mebin J Thattil"
description: "GSoC'25 Contributor at SugarLabs - Speak Activity"
tags: "gsoc25,sugarlabs,week01,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.png"
---

<!-- markdownlint-disable -->

# Week 01 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-02 - 2025-06-06  

---
## Introduction & About Me
Hey, I'm Mebin 👋🏻! I'm a first year student at PES University, Bangalore, India, currently pursuing a BTech in Computer Science. I’ve had a deep passion for tech ever since I was 10, when I first learned in a CS class that you could write a couple of lines of code and build a (barely functional) website. That simple idea sparked something in me, and over the years, my love for computer science has only grown—especially while building a bunch of cool things along the way.

About a month ago, I launched my personal portfolio website: [mebin.in](https://mebin.in/). It runs on an 8-year-old Raspberry Pi sitting at home 🤩, so apologies in advance if the site is occasionally slow or down (power cuts are a real pain). I'll be posting a copy of these blogs there as well. Go check 'em out and a bunch of other blogs I've written there!

I'm also building a Bluesky client in the Nim programming language. I'm a strong advocate for education in technology. In the past, I built a web application aimed at connecting students in rural areas with those in urban areas to help foster a free and open peer-to-peer learning ecosystem.

To say that I’m thrilled to be working on the Speak Activity would be an understatement. I can’t wait for an amazing summer filled with learning, collaboration and helping enhance educational journey for millions of learners world-wide.

---

## Goals for This Week

- **Goal 1:** Benchmark and test various models and architectures.
- **Goal 2:** Evaluate the feasibility and implementation approach based on project constraints such as hardware limitations and size requirements.

---

## This Week’s Achievements

1. **Created a Streamlit benchmark app**  
   - A simple streamlit app was made to compare responses of different Large Language Models (LLMs) & Small Language Models (SLMs). This was done to understand which models were a good fit for our requirements.
   - Links: [Streamlit App](https://llm-benchmarking-sugar.streamlit.app/), [GitHub](https://github.com/mebinthattil/LLM-benchmarking).


---

## Selection Of Models and Challenges

- The selection of the LLM was fairly easy, as all the models in the 30-ish billion parameter range performed reasonably well without any fine-tuning. These models were _smart_ but required significant resources to run. That was fine, since the model was intended to be hosted on AWS and accessed via an API endpoint managed by Sugar-AI.
- The selection of the SLM was a bit tricky. Initially, we looked at models under 1B parameters like the Qwen3-0.6B, and the responses were hilariously bad as expected. Later, I experimented with a dual-model architecture, where one model would generate the answer and another model (or the same model with a different system prompt) would refine the answer. I tried this with the Gemma3-1B model as the generating model and the same Gemma3-1B(with a different system prompt), as the evaluation/refinement model. The results were surprisingly good! This model generated answers that were up there with the 30B parameter models! The only caveat is that it technically takes twice the time for inference, but considering the model is pretty small, it wasn’t too bad.
- That said, Gemma3-1B Instruct even after 4-bit quantization is still around 1GB in size, which is much more than we can package with the Speak activity. So now I’m going to be looking into even lighter models like TinyBERT and will update the benchmarks soon.
- Fine-tuning in the next step should hopefully improve the performance of these models as well. Considering that we also need to package the TTS model, we really need to make sure the SLM is as lightweight as possible.

**TLDR:**  
LLM selection was easy — they all perform pretty well. SLM poses some challenges. Dual-model (generation + evaluation/refinement) seems to produce much better responses. Size of the SLM needs to be reduced further (hopefully under 100MB).

  

---

## Key Learnings

- Dual model architecture (generation model + evaluation/refinement model) produces some great results, even if the individual models are very small or perform bad individually!

---

## Next Week’s Roadmap

- Setup AWS for fine-tuning the model.
- Finalize on the model to go forward with.
- Finalize on the dataset to start fine-tuning SLM with.
- Include much smaller models like TinyBert in the benchmark.
- Start fine-tuning TinyBert or any other SLM on the agreed upon dataset in the hopes to improve performance.


---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- Website: [mebin.in](https://mebin.in/)
- GitHub: [@mebinthattil](https://github.com/mebinthattil)
- Gmail: [mail@mebin.in](mailto:mail@mebin.in)
- LinkedIn: [Mebin Thattil](https://www.linkedin.com/in/mebin-thattil/)

---
