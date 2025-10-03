---
title: "GSoC ’25 Week 12 + Final Report by Mebin J Thattil"
excerpt: "Integrating everything, wrapping up the project & Final Report"
category: "DEVELOPER NEWS"
date: "2025-08-24"
slug: "2025-08-24-gsoc-25-mebinthattil-week12"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week12,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"

---

# Week 12 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-17 - 2025-08-24 

---

## Goals for This Week

- **Goal 1:** Integration of LLM as brains  
- **Goal 2:** Write a script to check if user is connected to internet and choose the appropriate mode for chatbot (LLM or SLM)  
- **Goal 3:** Personas implementation
- **Goal 4:** UI changes to include the new features

---

## This Week’s Progress

### **1. Integration of LLM as brains**

Now that SugarAI was deployed I was finally able to integrate the LLM into speak! It was a fairly simple implementation. I just had to call the API and feed the response to kokoro once it passed the profanity checks. This is ofcourse only if the user is connected to internet and the SugarAI servers are up.

### **2. Script to check internet connectivity**

This is a fairly simple function that checks if the user is able to reach our servers that run SugarAI. Only if this is true will it send request to the servers.

### **3. Personas implementation**

Personas have been implemented! Each persona has a unique name, voice and personality. Personas are stored in `personas.json` and new personas can be created very easily by adding more to this file. Here is the current json file that show all the default personas:

```json
{
  "Jane": {
    "voice": "af_bella",
    "prompt": "You are a friendly teacher named Jane who is 28 years old. You teach 10 year old children. Always give helpful, educational responses in simple words that children can understand. Keep your answers between 20-40 words. Be encouraging and enthusiastic but never use emojis(ever). If you notice spelling mistakes, gently correct them. Stay focused on the topic and give relevant answers."
  },

  "Dr.Sam": {
    "voice": "am_adam",
    "prompt": "You are Dr. Sam, a friendly and thoughtful doctor who enjoys talking to 10-year-old children about what it's like to be a doctor. You don’t give medical advice—you just explain how doctors help people, what hospitals are like, and how the human body works in fun, simple ways. Use clear, easy-to-understand language and keep your answers between 20–40 words. You're curious, caring, and always calm. You love when kids ask questions and you're happy to share what it's like to care for others. If there are any spelling mistakes, gently correct them. Stay focused on the topic and give helpful, encouraging answers. Sometimes you share neat facts about the body or how doctors train, always making learning feel safe and interesting."
  },

  "Captain Stella": {
    "voice": "am_santa",
    "prompt": "You are Captain Stella, an adventurous space explorer who loves teaching 10-year-old children about planets, stars, and the mysteries of the universe. Use simple words and keep answers between 20–40 words. Be enthusiastic and encourage curiosity about space. If children make spelling mistakes, gently correct them. Stay focused on space topics and give fun, educational answers."
  },

  "Professor Oakley": {
    "voice": "bm_george",
    "prompt": "You are Professor Oakley, a curious scientist who loves explaining experiments, nature, and how things work to 10-year-old children. Use simple, clear words and keep answers between 20–40 words. Be excited about learning and encourage questions. Gently correct spelling mistakes. Stay on topic and share interesting science facts."
  },

  "Liam the Football Player": {
    "voice": "am_liam",
    "prompt": "You are Liam, a fun and energetic football player who teaches 10-year-old children about teamwork, sportsmanship, fitness, and how practice helps improve skills. Use simple words and keep answers between 20–40 words. Be motivating and friendly. Gently correct spelling mistakes. Stay focused on sports topics and give helpful answers."
  },

  "Ollie the Owl": {
    "voice": "ef_dora",
    "prompt": "You are Ollie, a wise and curious owl who teaches 10-year-old children about nature, nighttime animals, and how to observe the world quietly and carefully. Use simple words and keep answers between 20–40 words. Be calm, patient, and encouraging. Gently correct spelling mistakes. Share interesting facts about animals and nature."
  }
}

```

### **4. UI changes to include the new features**

The UI was updated to include all the new features like personas switching, voice switching etc. A new icon was made for the button to switch personas. 
![Personas Icon](https://raw.githubusercontent.com/mebinthattil/speak-ai/df1291828088316f4684569a56680e38e7e72491/icons/Personas_Icon.svg)


# Everything finally comes together

This marks the completion of a good MVP. I also made a demo showcasing all the new AI features. Note that this demo was shot before few things like the personas icon was changed, but shows how all the new features work.

*Demo:*
<iframe src="https://drive.google.com/file/d/1CZNywu1THdSUpR0my-UWqnZ4YhZ2BGkW/preview" width="840" height="480" allow="autoplay"></iframe>

---

## Final Report

### **Project Overview**

The objective of this GSoC project was to **modernize and enhance the Speak Activity** using gen-AI and transforming it from a simple text-to-speech tool into an intelligent, conversational learning companion. The project aimed to integrate modern TTS models, deploy both local Small Language Models (SLMs) and cloud-hosted Large Language Models (LLMs), and create an engaging persona-based interaction system for children.

### **Key Deliverables**
1. **Modern TTS Integration** - Replaced traditional espeak with Kokoro TTS for natural-sounding, multi-voice audio generation
2. **Dual Model System For Chatbot Brains** - Implemented both local SLM and cloud LLM as part of the chatbot mode
3. **SugarAI** - Deployed cloud infrastructure at [ai.sugarlabs.org](https://ai.sugarlabs.org) for hosting the LLMs. Used by other activities as well.
4. **Interactive Personas** - Created character based learning experiences with unique voices and personalities
5. **Comprehensive Safety Features** - Built profanity filters and child safe interaction mechanisms

All features are optimized for educational environments and resource constrained devices.

---

### **Project Timeline and Achievements**

#### **Phase 1: Research and Benchmarking (Weeks 1-3)**

**Week 1: Model Selection and Benchmarking**
- **LLM/SLM Evaluation:** Created a [Streamlit benchmarking app](https://llm-benchmarking-sugar.streamlit.app/) to compare different models
- **Dual-Model Architecture Discovery:** Experimented with generation + refinement approach using Gemma3-1B, achieving performance comparable to 30B parameter models
- **Resource Constraint Analysis:** Identified need for models under 100MB for packaging with Speak activity

**Week 2: Fine-tuning Infrastructure and Dataset Development**
- **AWS SageMaker Setup:** Provisioned GPU infrastructure for model training on `ml.g5.2xlarge` instances
- **Educational Dataset Creation:** Developed and cleaned [Education-Dialogue-Dataset](https://github.com/mebinthattil/Education-Dialogue-Dataset) with teacher-student conversations
- **Model Training:** Fine-tuned Llama3-1B with educational conversation patterns
- **Deployment Infrastructure:** Created model storage and API endpoint systems on AWS

**Week 3: Dataset Restructuring and Optimization**
- **Conversation Format Refinement:** Restructured dataset to prevent chain response generation issues
- **Model Behavior Analysis:** Identified and resolved conversational flow problems in fine tuned models
- **Training Optimization:** Developed improved training approaches for educational use cases

---

#### **Phase 2: TTS Integration and Voice Development (Weeks 4-6)**

**Week 4: Kokoro TTS Integration**
- **Modern TTS Implementation:** Successfully integrated Kokoro TTS with minimal additional dependencies
- **Voice Catalog Access:** Enabled entire collection of Kokoro voices for different personas
- **Audio Pipeline Development:** Built temporary WAV file approach as initial implementation
- **Dependency Optimization:** Swapped Kokoro's fallback from espeak-ng to espeak to reduce dependencies
- **Community Testing Platform:** Deployed [voice mixing web app](https://newstreamlit-frontend.blackpond-9921706d.eastus.azurecontainerapps.io/) for feedback collection

**Week 5: SLM Development and Quantization**
- **Lightweight Model Training:** Fine-tuned [Llama 135M](https://huggingface.co/amd/AMD-Llama-135m) on educational dataset
- **Size Optimization:** Achieved ~500MB model size with potential for further quantization
- **Performance Evaluation:** Benchmarked model performance against larger alternatives
- **Dataset Quality Improvement:** Enhanced training data with better conversational patterns

**Week 6: Dataset Enhancement and Performance Optimization**
- **Comprehensive Dataset Revision:** Created higher-quality training data using Gemini for teacher-child conversation patterns
- **Model Re-training:** Conducted multiple fine-tuning iterations with improved datasets
- **Performance Analysis:** Formal benchmarking against 50-question evaluation set
- **Size Constraint Solutions:** Achieved critical component sizes:
  - **TTS:** 0.7MB base + 0.5MB per additional voice
  - **SLM:** 82.6MB
  - **Llama.cpp:** 2MB (if using distributed binaries)

---

#### **Phase 3: Infrastructure and Streaming Optimization (Weeks 7-9)**

**Week 7: Community Feedback and Platform Deployment**
- **Comprehensive Model Benchmarking:** Added all 16 fine-tuned SLM variants to [benchmark comparison](https://slm-benchmark.streamlit.app/)
- **AWS Infrastructure Success:** Secured G-series GPU instances after multiple service limit requests
- **Model Repository Organization:** Created [comprehensive model collection](https://huggingface.co/MebinThattil/models) on Hugging Face
- **Community Evaluation Platform:** Deployed benchmarking tools for community model selection

**Week 8: Audio Streaming and Safety Features**
- **GStreamer Optimization:** Implemented direct audio streaming from Kokoro to GStreamer using `appsrc` element
- **Platform-Agnostic Inference:** Replaced compiled binaries with `llama-cpp-python` for cross-platform compatibility
- **Safety Implementation:** Built comprehensive profanity filtering system with base64-encoded word lists
- **Latency Reduction:** Achieved significant performance improvements through streaming architecture

**Week 9: Critical Bug Fixes and System Integration**
- **Mouth Movement Synchronization:** Resolved timing issues through three iterations of optimization
- **Audio Pipeline Sync:** Achieved synchronization between voice output and mouth movements
- **System Architecture Completion:** Integrated all components into cohesive Speak activity

---

#### **Phase 4: Cloud Infrastructure and Final Integration (Weeks 10-12)**

**Week 10: SugarAI Deployment**
- **Cloud Infrastructure:** Successfully deployed SugarAI on AWS EC2 with G5 GPUs
- **Containers:** Implemented Docker-based deployment with GPU acceleration
- **Network Security:** Configured secure inbound rules limiting access to HTTPS and SSH only
- **Service Architecture:** Established foundation for public API accessibility

**Week 11: Production Deployment and Security**
- **SSL Certificate Integration:** Implemented Let's Encrypt certificates for secure HTTPS access
- **Nginx Proxy Configuration:** Created proxy setup mapping internal services to public endpoints
- **DNS Configuration:** Established A record for [ai.sugarlabs.org](https://ai.sugarlabs.org) domain
- **Authentication Systems:** Integrated Google OAuth under Sugar Labs organization
- **Public API Launch:** Made SugarAI publicly accessible with comprehensive API documentation

**Week 12: Complete System Integration**
- **LLM Integration:** Connected cloud-hosted LLM to Speak activity for enhanced conversations
- **Intelligent Mode Switching:** Implemented automatic fallback between LLM (online) and SLM (offline) based on connectivity
- **Personas System:** Deployed character-based learning with unique voices and personalities
- **UI Enhancement:** Complete interface update accommodating all new AI-powered features
- **Production Demo:** Created comprehensive demonstration showcasing all integrated features

---

### **Repositories and Resources**

#### **Core Repositories**
- [SpeakAI Activity](https://github.com/sugarlabs/speak-ai)
- [PR to SpeakAI](https://github.com/sugarlabs/speak-ai/pull/1)
- [Benchmarking Tools](https://github.com/mebinthattil/LLM-benchmarking)
- [Educational Dataset](https://github.com/mebinthattil/Education-Dialogue-Dataset)
- [Model Archive](https://github.com/mebinthattil/Fine-Tune-Attempts-LlaMA-135)
- [Kokoro Integration](https://github.com/mebinthattil/Kokoro-FastAPI)

#### **Testing Platforms**
- [Model Benchmarking](https://llm-benchmarking-sugar.streamlit.app/)
- [SLM Comparison](https://slm-benchmark.streamlit.app/)
- [Voice Testing](https://newstreamlit-frontend.blackpond-9921706d.eastus.azurecontainerapps.io/)

#### **Model Collection**
[16+ fine-tuned models](https://huggingface.co/MebinThattil/models) on Hugging Face

---

### **Acknowledgments**

Thanks to mentors **Chihurumnaya Ibiam** and **Kshitij Shah**, assisting mentors **Walter Bender** and **Devin Ulibarri**, and the Sugar Labs community.

---

### **Conclusion**

This project transformed the Speak Activity from basic text-to-speech into an intelligent learning companion. The hybrid model architecture ensures accessibility regardless of connectivity, while personas make learning engaging through specialized characters. The SugarAI platform provides scalable infrastructure for future Sugar activities.

The modernized Speak activity demonstrates how AI can enhance education while maintaining offline functionality and resource efficiency for all students globally.

---

