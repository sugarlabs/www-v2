---
title: "GSoC ’25 Week 07 Update by Mebin J Thattil"
excerpt: "Benchmarking and community feedback"
category: "DEVELOPER NEWS"
date: "2025-07-20"
slug: "2025-07-20-gsoc-25-mebinthattil-week7"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week07,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"
---

# Week 07 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-14 - 2025-07-20

---

## Goals for This Week

- Add both variations of the SLM to the benchmark  
- Complete Kokoro streaming with GStreamer  
- Work on UI enhancements and group Kokoro voices by language  

---

## This Week’s Progress

### **1. Benchmark for the SLM**

For the past few weeks, I've been working on fine-tuning different SLMs. I would always try to have a conversation with the model to see how it responds, but I often found the responses unsatisfactory. The problem was that only I could see the responses. So, I was advised to create a benchmark comparing responses across all the different fine-tuned versions of the SLM. This way, the community can evaluate how each model performs in various scenarios and collectively decide which one suits our use case best.

My first step was to clean up all the different fine-tuned versions I had and segregate them based on the formats I had converted them to (GGUF, GGUF with Q4_0). I then uploaded all the [models to my 🤗 profile](https://huggingface.co/MebinThattil/models). I also created a [GitHub repo](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135) to categorize these models for easier viewing. This [repo](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135) also includes all the [training scripts](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/blob/main/Training_Script.py), [model conversion scripts](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/blob/main/gguf.sh), [inference scripts](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/blob/main/Batch_Inference_Script.py), the [benchmarking app source code](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/blob/main/slm_benchmark_app.py), as well as the [benchmark questions](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/blob/main/Benchmarking_Questions.json) and [results](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135/tree/main/Distill_Claude_RUN1/Benchmarking%20Answers).

I then built a benchmarking [Streamlit app](https://slm-benchmark.streamlit.app/) to compare the different models. This app lets users view and compare the responses of all 16 fine-tuned models. Each model is asked five sets of 50 questions, with parameters like `temperature` and `do_sample` tweaked to observe their impact.

This benchmarking process was very time-consuming because:
- Each model has a very limited context window, so I had to generate responses for each question one at a time.
- The number of questions per model was high - 250 questions per model across 16 models.

### **2. SugarAI Deployment and AWS Struggles**

A big part of my project is to use an LLM hosted on AWS. We aim to streamline how AI-powered activities use LLMs in the cloud; and that’s through SugarAI. The issue so far was that we needed an EC2 instance with a G-series GPU to run and host SugarAI. However, our previous AWS service limit requests were denied.

After several back-and-forths with the AWS support team, we finally managed to get access to 16 spot and on-demand instances with G-series GPUs. This means we now have the necessary resources to host SugarAI.

### **3. Reading GStreamer Internals for Optimizations**

I've been digging into the [GStreamer documentation](https://gstreamer.freedesktop.org/documentation/tutorials/basic/index.html) to understand how it works in greater detail. The goal is to stream audio data directly from Kokoro into GStreamer's source and pipe it into the existing two-sink setup that Speak currently uses. This lets us reuse the robust and already optimized pipeline, we just need to plug Kokoro into it. I’ll need a bit more time to get this fully functional.

### **4. Community Feedback and Opinions**

For this AI revamp of Speak, there are two critical components - the TTS model and the SLM.

- For TTS, we plan to include only 5-6 default voices to reduce the activity's size. Users can download the rest later as needed. The key question is: **Which voices should be included by default?**  
  To decide, I sent out a [community survey](https://forms.gle/axhDhBKX9n8pZJTo9) to gather input.

- I did the same for the SLM. A separate [community survey](https://forms.gle/ZNHyh4VRC67nnEzHA) was shared to get feedback on the preferred default model.

Both surveys include links to test out the TTS voices and view the SLM responses.

---

## Next Week’s Roadmap

- Optimize Kokoro + GStreamer  
- SLM inference without using compiled binaries for Llama.cpp and avoid client side binary build processes
- Begin dataset collection for the SugarAI-hosted LLM and gear up for fine-tuning  

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---