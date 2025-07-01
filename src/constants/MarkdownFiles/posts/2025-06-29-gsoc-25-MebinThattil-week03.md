---
title: "GSoC ’25 Week 04 Update by Mebin J Thattil"
excerpt: "A new voice for Speak & laying down pipelines"
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-mebinthattil-week4"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week04,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.png"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-22 - 2025-06-29  

---

## Goals for This Week

- **Goal 1:** Integrate Kokoro into Speak  
- **Goal 2:** Create a pipeline to quickly quantize and run a model hosted on 🤗

---

## This Week’s Achievements

_Note: I was on leave this week till the 26th due to my final exams. But I still managed to do a bunch of cool stuff after that._

1. **Kokoro meets Speak - A new chapter**
   - One of the three major parts of my proposal was to integrate a more modern, natural-sounding TTS model into Speak.
   - I used Kokoro and integrated it with the activity.
   - We now have access to the entire catalog of voices that Kokoro comes with. This will be helpful for our idea of having different personas—each persona could have a different voice.
   - The current implementation of the code is a _rather hacky_ way of integrating Kokoro. I say this because the audio pipeline currently looks like this:  
     > Text → Kokoro → Outputs a temporary WAV file → Read by GStreamer → Audio output can be heard
   - This is not ideal for obvious reasons. We don't want Kokoro to save an audio file every time and then read from it again. This is slow because Kokoro has to process the entire text, convert it to a WAV, and then GStreamer has to read and output it. For smaller text inputs it's still fine, but it’s not optimal.
   - The better approach would be to have Kokoro stream the audio directly, which GStreamer can then stream and output. This would reduce perceived latency significantly. Kokoro currently does not have a function / API that works like this. I would have to make one.
   - But for now, this is just an initial implementation to get feedback from mentors and peers, optimization can come later.
   - Kokoro also uses the espeak-ng engine as a fallback. Since Speak already uses espeak, I’ll try to go under the hood and tweak Kokoro to use espeak instead. This would reduce additional dependencies.
   - Currently, I was able to get this working with just 125KB of additional dependencies.

Video demo:
<iframe src="https://drive.google.com/file/d/19oUe3oIlMIO_pFUHVZatR6uWP1u23oU7/preview" width="740" height="480" allow="autoplay"></iframe>

_Note that the recording has a slight echo, but that's the recordings issue, it sounds perfectly fine inside of speak._

2. **Quantization Pipeline**
   - This is fairly simple. I created a script that:
  > pulls a model hosted on 🤗 → sets up all local dependencies → quantizes the model → exports it as a GGUF → and uses a plugin script (model dependent) to run it in chat mode.
   - Currently, this works only for chat-styled models.
   - This was essential because we are fine-tuning foundational models, and after fine-tuning we get unquantized models. It doesn't make sense to benchmark these unquantized versions. We need to evaluate their performance post-quantization to truly understand their behavior.
   - This script could also be useful for other contributors training models intended to run locally.
   - The config for the script is shown below and can adjusted to match whichever model you intend to use:
     ```bash
     # Model Config

     MODEL_REPO="hfusername/modelname"
     GGUF_OUT="output_model_name.gguf"
     GGUF_QUANT="output_model_name-q4.gguf"
     N_CTX=2048
     BUILD_DIR="build"
     SAVED_DIR_NAME_HF="output_dir_name"
     ```
   - Another thing to note is the URL to the plugin inference script:
     ```bash
     RAW_URL="https://raw.githubusercontent.com/mebinthattil/template_llama_chat_python/main/chatapp.py"
     ```
   - This script tries to be OS agnostic, and attempts to detect which OS you're on to run commands accordingly. It’s not fully comprehensive yet, but it works well on macOS, as that’s the only platform I’ve tested it on.

---

## Next Week’s Roadmap

- Integrate the SLM into Speak  
- Test out different Kokoro voices  
- Lay the foundations for different personas and automatic voice selection  

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---