---
title: "DMP '26 Week 01 Update by NSA Raiyyan"
excerpt: "Pronunciation audit for Tier 1 languages, automated scoring tests, and phoneme coverage verification."
category: "DEVELOPER NEWS"
date: "2026-06-21"
slug: "2026-06-21-dmp-26-raiyyan-week01"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week01,nsa-raiyyan,speak-ai,pronunciation"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 01 Progress Report by NSA Raiyyan
**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak)

**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)

**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-06-15 – 2026-06-21
---

## Goals for This Week

- Generate WAV samples for Tier 1 languages (Spanish, Mandarin, Portuguese, Hindi) using Kokoro.
- Write `test_pronunciation.py` for automated scoring against the evaluation rubric.
- Write `test_g2p_coverage.py` to verify phoneme coverage for each language.
- Begin collecting native-speaker feedback on generated audio.

## Achievements

### 1. WAV Generation for Tier 1 Languages

Generated pronunciation samples using Kokoro for four Tier 1 languages:

- **Spanish**
- **Mandarin**
- **Portuguese (Brazilian)**
- **Hindi**

These samples will serve as the baseline for pronunciation quality scoring. Each language was tested with the 18-sentence corpus defined in the proposal (10 common phrases, 5 difficult-phoneme sentences, 3 child-targeted sentences). The generated WAV files are available [here](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing).

### 2. Automated Pronunciation Scoring

Wrote `test_pronunciation.py` which automates pronunciation evaluation against the rubric criteria:

- Intelligibility
- Naturalness
- Phoneme accuracy
- Prosody

The script generates WAV files and scores them programmatically, providing a reproducible baseline for each language before native-speaker review.

### 3. G2P Coverage Verification

Wrote `test_g2p_coverage.py` which verifies that the G2P (grapheme-to-phoneme) pipeline covers all phonemes in each target language. This ensures that Kokoro's phoneme generation does not silently drop or misrepresent characters in the input text.

## What's Next

- Send generated WAV files to native speakers for the first checkpoint review.
- Collect feedback and update scores based on human evaluation.
- Begin wiring `alt_tts_backends.py` into `speech.py` for Tier 2 languages (Arabic, Swahili, Kinyarwanda).

## Resources & References

- **Speak-AI Repository:** [sugarlabs/speak](https://github.com/sugarlabs/speak)
- **Kokoro TTS:** [hexgrad/Kokoro](https://github.com/hexgrad/Kokoro)
- **Piper TTS:** [rhasspy/piper](https://github.com/rhasspy/piper)
- **Meta MMS-TTS:** [facebookresearch/mms](https://github.com/facebookresearch/mms)

## Acknowledgments

Thanks to Mebin and Ibiam for the continued mentorship. Looking forward to the first native-speaker review checkpoint next week.
