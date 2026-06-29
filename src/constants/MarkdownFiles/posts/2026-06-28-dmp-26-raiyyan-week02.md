---
title: "DMP '26 Week 02 Update by NSA Raiyyan"
excerpt: "Native speaker feedback: sending WAV samples to the Sugar Labs and Ankidroid communities for pronunciation review."
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-dmp-26-raiyyan-week02"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week02,nsa-raiyyan,speak-ai,pronunciation,native-speaker"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 02 Progress Report by NSA Raiyyan
**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak)

**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)

**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-06-22 – 2026-06-28
---

## Goals for This Week

- Send WAV samples to native speakers for pronunciation scoring.
- Set up a scoring rubric covering naturalness, intelligibility, and phoneme accuracy.
- Distribute samples to the Sugar Labs and Ankidroid communities for review.
- Collect feedback and figure out which languages need corpus or voice adjustments.

## Achievements

### 1. WAV Samples Distributed for Review

Got the pronunciation samples out to native speakers this week. The WAV files for Spanish, Mandarin, Portuguese, and Hindi are in the [shared Google Drive folder](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing) if you want to listen yourself.

Sent them to two communities:

- **Sugar Labs community** via Element channel
- **Ankidroid community** for a language learning perspective

### 2. Scoring Rubric Established

Put together a pronunciation evaluation rubric with four criteria, each scored 1-5. The full review document with scoring details is [here](https://docs.google.com/document/d/1h7_upGQq0ut5zY7E92U1AzwntLI6aFPXJZb8Ffg6DKc/edit?usp=sharing).

| Criterion | 1 (Poor) | 3 (Acceptable) | 5 (Excellent) |
|---|---|---|---|
| Intelligibility | Hard to understand | Understandable with effort | Clear and easy |
| Naturalness | Robotic or broken | Slightly unnatural rhythm | Near-native flow |
| Phoneme accuracy | Multiple errors | 1-2 minor errors | All phonemes correct |
| Prosody | Flat monotone | Mostly correct contours | Natural rise and fall |

### 3. Feedback Collection in Progress

Native speakers are listening to the WAV files right now. The feedback will tell us:

- Which languages sound good enough out of the box.
- Which ones need corpus tweaks or different voice embeddings.
- Whether any languages should use Piper or MMS-TTS instead of Kokoro.

## What's Next

- Go through the feedback from native speakers.
- Score each language against the rubric and write up the baseline results.
- Start wiring `alt_tts_backends.py` into `speech.py` for languages that need alternative backends.

## Resources & References

- **Speak-AI Repository:** [sugarlabs/speak](https://github.com/sugarlabs/speak)
- **Kokoro TTS:** [hexgrad/Kokoro](https://github.com/hexgrad/Kokoro)
- **Piper TTS:** [rhasspy/piper](https://github.com/rhasspy/piper)
- **Meta MMS-TTS:** [facebookresearch/mms](https://github.com/facebookresearch/mms)
- **WAV Samples:** [Google Drive Folder](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing)

## Acknowledgments

Thanks to Mebin and Ibiam for the continued mentorship. Also thanks to the Sugar Labs and Ankidroid communities for taking the time to review the pronunciation samples.
