---
title: "GSoC ’25 Week 06 Update by Mebin J Thattil"
excerpt: "Optimizations and reading documentation"
category: "DEVELOPER NEWS"
date: "2025-07-13"
slug: "2025-07-13-gsoc-25-mebinthattil-week6"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week06,midterm,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"
---

# Week 06 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-07 - 2025-07-13

---

## Goals for This Week

- **Goal 1:** Improve dataset quality  
- **Goal 2:** Fine-tune the model again and evaluate performance  
- **Goal 3:** Work on mechanics for voice switching and personas inside Sugar  

---

## This Week’s Progress

### **1. Improving the dataset**

I fine-tuned the model using the dataset I had before, but it didn’t meet expectations. The model's responses were often repetitive and lacked the nuanced, encouraging tone of a teacher. For instance, it would give correct but blunt answers without any of the supportive dialogue we were aiming for. At times it gave answers that were completely irrelevant to the question. 

To address this, the next logical step was to significantly improve the dataset. I expanded it with more diverse conversation types and a wider range of questions that children might ask. To better simulate a real learning environment, I added examples where the teacher corrects a child's factual mistakes or spelling errors. Finally, to make the interactions feel more natural, I included general conversational snippets like “I love pizza” or “I just woke up.”

### **2. Fine-tune the model again and evaluate performance**

I proceeded to fine-tune the [Llama 135M model](https://huggingface.co/amd/AMD-Llama-135m) again, this time on the [updated dataset](https://github.com/mebinthattil/AMD_Llama_135M). After testing its performance, the results were still disappointing. While the tone improved slightly, the model struggled to maintain context in longer conversations and sometimes produced irrelevant responses, likely due to the inherent limitations of such a small model.

Wanting to give it one last shot, I generated an entirely new, higher-quality dataset using Gemini, focusing specifically on teacher-child conversational patterns(Next week I'll share a link to a repo where I aggregate all these different datasets and model outputs in different formats). After fine-tuning the model on this new dataset, it performed better than before but still fell short of my goals. The next step is to formally benchmark both fine-tuned versions against the 50 questions I used for [benchmarking earlier](https://llm-benchmarking-sugar.streamlit.app/) and add their results for a direct comparison.

### **3. Work on mechanics for voice switching and personas inside Sugar**

I began working on the mechanics for voice switching and persona selection within Sugar. Before diving into the UI, I decided to first optimize Kokoro's integration with the Speak activity. The current process, where Kokoro writes a WAV file that GStreamer then plays, introduces a delay of 2 - 4 seconds. My goal is to get Kokoro to stream audio data directly to GStreamer as a source, which can then be played out using dual sinks similar to Speak's current implementation. This part isn’t fully working yet, as it requires a deeper dive into GStreamer's internals. I've been studying the documentation and hope to have this optimization completed in a few days, after which I can resume implementing the voice switching and persona mechanics.

### **4. Size Optimization**

One of the hardest and most interesting parts of this project was to package the SLM, the TTS model, and all its required dependencies within very tight size constraints. Every single byte matters.

These are the sizes of the components as of now:
- **TTS**: 0.7MB Base + 0.5MB for each additional voice
- **SLM**: 82.6MB
- **Llama.cpp**:
  - if we choose to distribute binaries for llama-cpp that will be used for inference: 2MB
  - else, I would need to look into optimization (not done yet)

Main factors contributing to the small size of components were:
- **TTS**: Switching Kokoro's fallback to use espeak instead of espeak-ng, since espeak was already used by the Speak activity. It also helps that Kokoro is pretty lightweight with only 82M parameters.
- **SLM**: The biggest reason is the insanely small parameter count of the SLM. I'm using LLaMA-135M. Further quantization and converting to GGUF format helped.
- **llama-cpp** (local model inference): Compiling to binary helped reduce size. I did a specific compilation, so it did not build a binary for everything, only the inference binary for chat was built.

So overall, including the TTS, SLM, and llama-cpp, the size of additional components would be ~85–110MB (85MB if we distribute the binaries, 110MB if we don't). Do note that the dependencies for the LLM have not been included, but those are pretty lightweight, since it's just calling an API endpoint.

---

## Midterm Summary

*It feels great to sit back and reflect on what I’ve done so far. I’ve learned a lot and had a lot of fun building things.*
- The first week started off with a lot of [benchmarking](https://llm-benchmarking-sugar.streamlit.app/). This was essential, as we needed to choose a model to fine-tune.  
We tested various models on a standard set of questions, asking each model the same ones and comparing the responses.  
I also ensured I had a clear understanding of the project constraints, especially the limited client-side hardware. This directly influenced many of the design decisions later on.

- The second week was focused on setting up the AWS infrastructure.  
AWS was configured, and the LLaMA3-1B foundation model was fine-tuned on the [education dataset](https://github.com/mebinthattil/Education-Dialogue-Dataset).  
The dataset was cleaned and formatted for LLaMA, and after fine-tuning, it was deployed to AWS.  
I then tested the API endpoint with a Python script. This gave us a solid base to move forward.

- The third week was spent addressing a model behavior issue where it would generate long response chains instead of simple Q&A style outputs.  
To fix this, I restructured the [dataset](https://github.com/mebinthattil/Education-Dialogue-Dataset).  
That week also coincided with my exams, so progress was slower than usual.

- In Week 4, I worked on [integrating Kokoro into Speak](https://drive.google.com/file/d/1Z-zQrnH56CDVFJnEMmm6DflwpajwrLmI/view?usp=sharing).  
While I managed to integrate Kokoro TTS, it was a bit hacky. Kokoro saved WAV files, and GStreamer read from them.  
I also built a [model quantization pipeline](https://github.com/mebinthattil/Model_Quantize_Pipeline) that allowed me to quickly quantize chat-style models from 🤗, convert them to GGUF, and run [inference with plugin](https://github.com/mebinthattil/template_llama_chat_python) support.  
This significantly sped up testing and allowed me to observe the impact of quantization on output quality.

- And finally, last week was spent building a [Streamlit app](https://newstreamlit-frontend.blackpond-9921706d.eastus.azurecontainerapps.io/) for experimenting with different Kokoro voices. The app let you try differnt voices in kokoro with different languages, and also had an option to blend and mix different voices to create a unique voice.
This app made it easier to demo the new TTS to kids and collect feedback.  
I also integrated the SLM into Speak. I used `llama-cpp-python` during inference, which led to noticeable performance boosts.  
The model used was a fine-tuned and quantized version of [Llama-135M](https://huggingface.co/MebinThattil/Llama-135M-FT/tree/main).  
However, due to the model’s small size, the initial responses were underwhelming. Even with fine-tuning, the improvements were only slight.

---

## Next Week’s Roadmap

- Complete Kokoro streaming with GStreamer  
- Work on UI enhancements and group Kokoro voices by language  
- Add both variations of the SLM to the benchmark  

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---