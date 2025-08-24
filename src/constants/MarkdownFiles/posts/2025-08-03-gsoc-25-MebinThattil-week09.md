---
title: "GSoC ’25 Week 09 Update by Mebin J Thattil"
excerpt: "Critical fixes and breathing life back into Speak"
category: "DEVELOPER NEWS"
date: "2025-08-03"
slug: "2025-08-03-gsoc-25-mebinthattil-week9"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week09,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"
---

<!-- markdownlint-disable -->

# Week 09 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-07-27 - 2025-08-03

---

## Goals for This Week

- Fix the mouth movements in Speak  
- Integrate everything into Speak 

---

## This Week’s Progress

### **1. Fix the mouth movements in Speak**

I got the mouth movements working after three iterations. The outcomes of the three iterations were:
- Initially, the mouth movements would occur **after** the TTS model spoke the text.
- Then I got them to start exactly **when** the TTS model began speaking. But another issue came up - the movements were too fast and ended **before** the entire text was spoken.
- Finally, I got the mouth movements to start at the right time, behave as expected, and end precisely when the voice stopped.

The issues were caused by a few conditions:
1. There were cases where the TTS model didn't get enough time to process a chunk, which was still passed into the pipeline. The mouth movement logic didn’t account for this empty data - I had to handle that.
2. In some instances, chunking failed or didn't work properly, so I had to manually set a few defaults like chunk size and explicitly split the data.
3. The reason mouth movements started late was simply because they were triggered **after** the full text was converted. I just had to trigger them **at the start** instead.
4. The reason for the mouth movements finishing too early (sped up) was because each mouth frame was, by default, rendered every 25ms. Since we're streaming, it’s important **not** to keep a fixed delay. I had to dynamically adjust based on how long the audio actually takes. So I updated the logic accordingly.

### **2. UI enhancements to accommodate Kokoro**

The UI had to be updated to provide options to select from different Kokoro voices and group them into languages and categories - such as default voices and add-on voices. Waiting indicators have also been added to let the user know they need to wait a few seconds when switching voices.

The setup also handles cases where the user can download a voice model if it’s not part of Speak’s default list. These are pulled via the Hugging Face hub, so it adds an extra dependency for users who want to access add-on voices.

Currently, I haven’t added new icons - I reused the old world map icon as a placeholder. I’ll replace this with something more appropriate later.

### **3. Integrate SLM + TTS into Speak**

I got Kokoro to stream into the existing GStreamer pipeline. I also made UI accommodations to allow voice selection. My SLM inference script and profanity filters were ready, so I was finally able to stitch everything together.

Here’s a demo of the new Speak activity (excluding LLM and LLM-exclusive features like personas):

<iframe src="https://drive.google.com/file/d/141iU7v0zw9cKyynaz3BN83kMA783OoEB/preview" width="740" height="480" allow="autoplay"></iframe>

---

## Next Week’s Roadmap

- Set up AWS for LLM deployment along with [Krish](https://www.sugarlabs.org/authors/krish-pandya)  
- Build the foundations for personas and LLM integration

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---