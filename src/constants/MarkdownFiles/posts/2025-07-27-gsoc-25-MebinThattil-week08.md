---
title: "GSoC ’25 Week 08 Update by Mebin J Thattil"
excerpt: "Platform Agnostic Inference, Profanity Filters and Kokoro Optimizations"
category: "DEVELOPER NEWS"
date: "2025-07-27"
slug: "2025-07-27-gsoc-25-mebinthattil-week8"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week08,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.png"
---

# Week 08 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-20 - 2025-07-27

---

## Goals for This Week

- Optimize Kokoro + GStreamer  
- Enable SLM inference without using compiled binaries for Llama.cpp and avoid client side binary build processes  
- Begin dataset collection for the SugarAI-hosted LLM and gear up for fine-tuning  

---

## This Week’s Progress

### **1. Audio Pipeline Optimizations (Kokoro & GStreamer)**

After reading through the GStreamer documentation, I finally got Kokoro to stream audio directly to GStreamer, avoiding the intermediate step of writing a WAV file. This not only reduces latency, since writing to a WAV file requires the entire text to be processed, saved, and then read. While streaming we can break up the input into multiple different chunks. These chunks can be sent to Kokoro's engine for processing and then output into GStreamer’s source. This significantly reduces latency and removes the need to write to a file.

I was able to get the streaming to work using the `appsrc` element. `appsrc` is a GStreamer element that lets external applications insert data into a GStreamer pipeline. The best part is that it provides external API functions.

Currently, the command to construct the pipeline looks like:
```python
cmd =   'appsrc name=kokoro_src' \
        ' ! audioconvert' \
        ' ! audio/x-raw,channels=(int)1,format=F32LE,rate=24000' \
        ' ! tee name=me' \
        ' me.! queue ! autoaudiosink name=ears' \
        ' me.! queue ! audioconvert ! audioresample ! audio/x-raw,format=S16LE,channels=1,rate=16000 ! fakesink name=sink'
```

And the fallback pipeline if Kokoro is not available (using espeak) looks like:
```python
cmd = 'espeak name=espeak' \
      ' ! capsfilter name=caps' \
      ' ! tee name=me' \
      ' me.! queue ! autoaudiosink name=ears' \
      ' me.! queue ! fakesink name=sink'
```

You’ll notice that in the Kokoro pipeline, we use `audioconvert` to convert Kokoro's audio input into F32LE, 24kHz audio. This ensures the audio is in the correct format for the pipeline. Kokoro, by default, outputs audio in F32LE, 24kHz, so this is actually a redundant step made to enforce that the audio is infact in that format. 
It’s important to note that the logic written for the mouth movements assumes the audio is in 16kHz, 16-bit, signed integer format. So for the `fakesink` sink, we convert it into S16LE, 16kHz, while the `ears` sink (the speaker/audio device) remains in F32LE, 24kHz.

However, there’s still one issue - the mouth movements are not working. I initially thought it was because the logic assumes 16kHz, 16-bit signed integer audio, but even after converting the audio to that format, the mouth movements still didn't work. I’ll be debugging this further to identify the root cause.

But for now, streaming works perfectly, but the mouth movements don’t work.

### **2. OS-Agnostic GGUF Inference**

The most performant and lightweight inference binary provided by llama.cpp is only around 2MB in size. With this compiled binary, we can run inference on the local SLM. However, this poses a problem - we either need to build and distribute binaries for every platform we want to support, or build them on the client side.

Since we aim to support most OLPC laptops (which are quite limited in terms of hardware) it’s wise to avoid client-side builds. So we decided to use `llama-cpp-python`. This allows us to run inference on a local SLM without worrying about building binaries for different platforms. Sure, if you dive into the nitty-gritty, there’s still a small build that happens client-side, but it's handled by pip and we don’t need to manage the distributions ourselves. This increases our dependencies, but it’s a worthwhile tradeoff.

### **3. Profanity Filters**

While working on the inference script, I realized it made sense to add profanity filters as part of this module itself. To set this up, I scoured the internet for a list of curse words and compiled a comprehensive list. I then encoded each bad word into base64 and added them to a `.txt` file.

The reason for encoding the words is to prevent children from understanding the list if they stumble upon the file, since it just looks like gibberish. Of course, during processing in code, we decode the words and use them.

Right now, the profanity checks happen at two points:
- **First**, when the user submits a question to the chatbot. If the input contains a bad word, the filter intercepts the request and doesn't send it to the SLM. Instead, it informs the user that their input contains a blacklisted word.
- **Second**, after the SLM generates a response. If the output contains a bad word, we inform the user that the response cannot be processed and don't show the user the SLM response.

When working with SLMs, it’s crucial to put these strong guardrails in place, because these models are still limited in their capabilities and can sometimes blurt out random or inappropriate responses.

---

## Next Week’s Roadmap

- Fix the mouth movements in Speak  
- Integrate everything into Speak  

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---