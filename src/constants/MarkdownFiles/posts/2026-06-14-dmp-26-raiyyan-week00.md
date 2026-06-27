---
title: "DMP '26 Week 00 Update by NSA Raiyyan"
excerpt: "Kickoff week: setting up the dev environment, exploring the Speak-AI codebase, and discovering that the solution was already sitting in the repo as dead code."
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-dmp-26-raiyyan-week00"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week00,nsa-raiyyan,speak-ai,introduction"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 00 Progress Report by NSA Raiyyan
**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak)

**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)

**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-06-01 – 2026-06-14
---

## whoami

Hey, I'm NSA Raiyyan ([@7se7en72025](https://github.com/7se7en72025)). Second-year undergrad at BITS Pilani, spending my summer with Sugar Labs as part of DMP 2026.

I started coding with C and C++, then switched to the JavaScript ecosystem, React, Node.js, TypeScript, Redux, Jest. Python came later through coursework and self-study, and I now use it for scripting and working with ML libraries like PyTorch and HuggingFace Transformers. I have had 26 PRs merged into Music Blocks so far, so I am familiar with the Sugar Labs codebase. This summer, I am working on the speech and language side of things, specifically getting Speak-AI to work for languages it currently does not support.

## Project Overview
Speak-AI is Sugar Labs' upgraded version of the classic [Speak](https://v4.activities.sugarlabs.org/app/vu.lux.olpc.Speak.html) activity. Instead of the old espeak engine that sounds like a robot, it uses [Kokoro](https://huggingface.co/spaces/hexgrad/Kokoro-TTS), an 82-million-parameter neural TTS model that produces natural-sounding speech. This is especially useful for children learning to read and pronounce words in their native language.

The issue is that Kokoro only supports 8 languages right now: English, Spanish, French, Hindi, Italian, Brazilian Portuguese, Japanese, and Mandarin. That leaves out Arabic, Swahili, Kinyarwanda, Quechua, Guarani, and Aymara, languages spoken by hundreds of millions of children. My job is to fix that by wiring up existing alt TTS backends, Piper and MMS-TTS, that are already in the codebase but not connected.

## Goals for This Week
- Get the dev environment running locally.
- Read through the codebase and understand how text goes from a child typing to audio coming out of speakers.
- Identify what is already implemented but not being used.
- Open PRs for missing language aliases.

## Achievements
### 1. Environment Setup
Cloned the repo, set up a venv, installed dependencies. Speak-AI runs on GTK and needs GStreamer for audio, so there was some configuration involved. Got it working on my machine without a GPU, which matters because the target deployments are classroom laptops with limited hardware.
### 2. Codebase Exploration
Spent a few days reading through the source files. Here is what I traced:

* **`activity.py`:** The GTK UI. A child types something, hits enter, and `face.View.say(text)` gets called.
* **`speech.py`:** The routing layer. Decides whether to use Kokoro or fall back to espeak. Has an `_ensure_kokoro_lang()` method that picks the right G2P model.
* **`kokoro/pipeline.py` & `kokoro/model.py`:** The actual TTS pipeline. `KPipeline` converts text to IPA phonemes, `KModel` turns those into 24kHz audio.
* **`alt_tts_backends.py` & `tts_cache.py`:** This is where it gets interesting. Both are **fully implemented but never imported anywhere**. `alt_tts_backends.py` has `MMSTTSBackend`, `PiperBackend`, and a `get_tts_backend()` function. `tts_cache.py` has an LRU cache with SHA-256 keying that gives sub-millisecond hits. They are just sitting there unused.

### 3. Bottlenecks Identified
A few structural issues stood out:

- **Dead code everywhere:** `alt_tts_backends.py` has the routing logic for Piper and MMS-TTS but `speech.py` never imports it. The fallback chain is completely inactive.
- **Cache exists but is not used:** `tts_cache.py` can cache audio with sub-millisecond retrieval, but nobody ever calls it.
- **Missing aliases:** Kinyarwanda (`rw`) and Aymara (`ay`) are not in the `ALIASES` or `LANG_CODES` dicts in `kokoro/pipeline.py`.
- **Outdated Piper IDs:** Some voice IDs are stale, like `ar_AR-ibrahimkamal-medium` which should be `ar_JO-kareem-medium`.
- **No evaluation data:** `rubric.md` exists but there are zero WAV files, scores, or community feedback attached to it.
### 4. Pull Requests Opened
Opened three PRs this week:
* **PR #107:** Caches the SLM model so it does not reload on every prompt, which was causing multi-second delays.
* **PR #109:** Moves Kokoro voice switching to a background thread so the UI does not freeze.
* **PR #116:** Adds sequence IDs to requests so stale AI replies from older requests get discarded.

## Challenge & Key Learning
The biggest realization this week was that I do not need to build anything from scratch for the multilingual support. The code is already there, `alt_tts_backends.py` and `tts_cache.py` are complete implementations that never got wired in. The real work is integration, not creation.

Spending time reading the code before writing any code also paid off. I went in thinking I would need to design a whole new backend system, and came out realizing the system already exists and just needs to be plugged in.

## Resources & References
- **Speak-AI:** [sugarlabs/speak](https://github.com/sugarlabs/speak)
- **Kokoro TTS:** [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M)
- **Piper TTS:** [rhasspy/piper](https://github.com/rhasspy/piper)
- **Meta MMS-TTS:** [facebookresearch/mms](https://github.com/facebookresearch/mms)

## Acknowledgments
Thanks to Mebin and Ibiam for the mentorship, and to Walter and Devin for the assisting guidance. Credit also goes to whoever wrote `alt_tts_backends.py` and `tts_cache.py`, the groundwork is already there, I just need to wire it up.
