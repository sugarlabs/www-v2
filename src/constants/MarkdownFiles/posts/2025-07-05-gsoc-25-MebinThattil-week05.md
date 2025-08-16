---
title: "GSoC ’25 Week 05 Update by Mebin J Thattil"
excerpt: "New brains and new voices for Speak!"
category: "DEVELOPER NEWS"
date: "2025-07-06"
slug: "2025-07-06-gsoc-25-mebinthattil-week5"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week05,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"
---

<!-- markdownlint-disable -->

# Week 05 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-29 - 2025-07-06

---

## Goals for This Week

- **Goal 1:** Test out different Kokoro voices  
- **Goal 2:** Integrate the SLM into Speak  

---

## This Week’s Progress

### **1. Hey Kokoro, you sound different today**

This week, I tested out different voices of Kokoro in two different ways:

1. I tested them inside Speak, within Sugar, and it worked. It still uses the _hacky_ way of creating a temporary WAV file and then playing it via GStreamer, but it works. Streaming will be introduced soon.  

    **Under-the-hood changes:**
    - Kokoro currently uses the following stack:  
      > Text → Kokoro → handle phonemes via G2P engine → Misaki (primary G2P) → fallback → Espeak-ng  
    - Speak already uses Espeak.  
    - So I swapped Misaki's fallback with Espeak (instead of Espeak-ng) to reduce dependencies.  
    - I’ve yet to encounter a case that triggers the fallback, as Misaki is already quite good.

2. I deployed a web app that lets you generate and mix audio. You can try it out [here](https://newstreamlit-frontend.blackpond-9921706d.eastus.azurecontainerapps.io/).
    - The primary reason this was built as a web app is so that we can get kids to test this out and having things as a web app makes it easier. It's cruical for us to get real world feedback before proceeding with the implementation.
    - This web app allows you to try out a plethora of different voices and also mix and match different voices to create basically infinite combinations. It's truly amazing the kind of voices you can create with this.

    ![UI of web app](https://mebin.shop/Kokoro-Streamlit-UI.webp)

    - It's a container app, meaning both the frontend (Streamlit) and backend (Kokoro - FastAPI) run as separate Docker containers hosted on Azure.  
    - The [Kokoro - FastAPI](https://github.com/mebinthattil/Kokoro-FastAPI) exposes an OpenAI-compatible API to generate audio.  
    - This allows us to stream audio output to a client using OpenAI’s Python libraries, like so:

    ```python
    from openai import OpenAI

    client = OpenAI(
        base_url="http://my_kokoro_backend:8880/v1", api_key="not-needed"
    )

    with client.audio.speech.with_streaming_response.create(
        model="kokoro",
        voice="af_sky+af_bella",  # single or multiple voicepack combo
        input="Hello world!"
    ) as response:
        response.stream_to_file("output.mp3")
    ```

    - Another potential application of this setup (deploying as separate containers) is to bring Kokoro into pre-existing Speak with minimal dependency changes.  
    - This would work on low end machines with a stable internet connection, as audio is generated server-side and streamed to the client.  
    - While this wasn’t in the original plan, the current architecture makes it a _possibility_ worth exploring.
    - The original plan was to have an offline only version of Kokoro that Speak uses for it's voice. 

#### _Understanding and playing with Kokoro:_

- **How voice names are read**

    Kokoro has a catalog of voices like `af_bella` or `af_sky`.  
    The first letter of the voice name indicates the language:
    - `a` for American English
    - `b` for British English
    - `j` for Japanese
    - `m` for Mandarin Chinese
    - `s` for Spanish
    - `f` for French
    - `h` for Hindi
    - `i` for Italian
    - `p` for Brazilian Portuguese

    The second letter indicates gender:
    - `m` for male  
    - `f` for female  

    So `af_bella` would be American English, female.

- **Different language options:**

    These do two things:
    1. Speak the text with an accent.
    2. Handle the language-specific text more effectively.

    Example: Using `hf_alpha` with both Hindi and English:  
    Input:
    > नमस्ते, आप कैसे हैं? I can also speak in English as well!

    Output audio:  
    <iframe src="https://drive.google.com/file/d/1vd0V3hoZlEYQBhm9clSeeDz25qwtwXEE/preview" width="450" height="50" allow="autoplay"></iframe>

    I speak Hindi, and I can confirm it sounds correct.  
    This is a great example of how Kokoro can help kids learning new languages by combining accent and language aware pronunciation.

- **Voice mixing:**

    - You can mix any of the available Kokoro voices.
    - Mixing is done by assigning weights (between 0 and 1) to each voice.
    - For example, mixing two voices with 0.5 weight each gives a 50-50 blend.
    - Mixing three voices with weights 0.6, 0.3, and 0.1 gives a 60-30-10 blend.
    - This allows for basically infinite voice combinations.

    This could be super useful for building *personas* in Speak, as each persona could have a unique voice!

    ![Image showing how the waveforms are combined](https://github.com/mebinthattil/Kokoro-FastAPI/raw/master/assets/voice_analysis.webp)

**Links:**
- [Streamlit web app](https://newstreamlit-frontend.blackpond-9921706d.eastus.azurecontainerapps.io/)
- [Kokoro - Fast API](https://github.com/mebinthattil/Kokoro-FastAPI)
- [Streamlit Source Code](https://github.com/mebinthattil/Streamlit-Kokoro-Voice-Mixer-Demo)

---

### **2. New brains for Speak**

- I used the previously quantized Tiny Llama 1B GGUF model with llama-cpp-python inside Sugar, using it as the backend for Speak’s chatbot.  
- Using llama-cpp gave great performance boosts, but there's a catch:  
    - Llama-cpp needs to be built for each OS and architecture.
    - This complicates distribution and packaging.  
    - We can’t shift the build process to the client since most of them are using constrained hardware.

- So I tried a different approach: fine-tune a smaller model that doesn't need such optimizations.
- I chose [Llama 135M](https://huggingface.co/amd/AMD-Llama-135m) (yes, *M*, not *B* 😄) and fine-tuned it on my [educational conversation dataset](https://github.com/mebinthattil/Education-Dialogue-Dataset).
- I cleaned and extended the dataset (cleanup scripts are in the repo).
- The model was fine-tuned on AWS Sagemaker. You can find the files [here](https://huggingface.co/MebinThattil/Llama-135M-FT/tree/main).
- The unquantized size is ~500MB, so post-quantization it should shrink further.

But...

- I didn’t proceed with quantization because the raw performance post finetuning wasn’t up to expectations.
- So next step: gather better data, retrain, and re-evaluate.
- Will also discuss next directions with mentors after the next fine-tune round.

---

## Next Week’s Roadmap

- Work on mechanics for voice switching and personas inside sugar.  
- Improve dataset quality.  
- Fine-tune the model again and evaluate performance.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---