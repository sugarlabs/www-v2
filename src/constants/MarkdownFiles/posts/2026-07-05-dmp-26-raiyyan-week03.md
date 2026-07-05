---
title: "DMP '26 Week 03 Update by NSA Raiyyan"
excerpt: "Tier 2 language aliases, cross-lingual voice testing, full WAV generation, and G2P coverage verification for all 9 languages."
category: "DEVELOPER NEWS"
date: "2026-07-05"
slug: "2026-07-05-dmp-26-raiyyan-week03"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week03,nsa-raiyyan,speak-ai,tier2,cross-lingual"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 03 Progress Report by NSA Raiyyan
**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak-ai)

**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)

**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-06-29 – 2026-07-05
---

## Goals for This Week

- Add missing language aliases for Tier 2 languages (Arabic, Swahili, Quechua, Guarani).
- Test cross-lingual voice transfer with all available Kokoro voice embeddings.
- Generate full WAV samples for Tier 2 languages.
- Verify G2P coverage for all 9 target languages.

## Achievements

### 1. Language Aliases Added

Got the missing language aliases into `pipeline.py`:

| Language | Alias | Code |
|---|---|---|
| Arabic | ar | r |
| Swahili | sw | w |
| Quechua | qu | q |
| Guarani | gn | g |

Had to remove `rw` (Kinyarwanda) and `ay` (Aymara) from ALIASES though. espeak-ng doesn't support them, so they would just crash the pipeline.

### 2. Cross-Lingual Voice Transfer Testing

This was the interesting part. Tested all 4 Tier 2 languages with every available voice embedding to see what works:

- **120 WAVs generated** (5 sentences x 6 voices x 4 languages), 0 failures
- Every voice worked across all languages
- **`hf_alpha` turned out to be the best cross-lingual fit** for Tier 2

### 3. Full WAV Generation for Tier 2

Once we knew `hf_alpha` was the right voice, generated the full 18-sentence WAV files for Arabic, Swahili, Quechua, and Guarani:

- **72 WAVs total**, 0 failures
- All using `hf_alpha` voice
- Samples are in the [Google Drive folder](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing) if you want to listen

### 4. G2P Coverage for All 9 Languages

Went through all 9 target languages and verified phoneme coverage. Had to fix the expected phonemes for Tier 2 since they were using Arabic script instead of IPA.

| Language | Coverage | Status |
|---|---|---|
| Spanish (es) | 7/7 | Full |
| French (fr) | 6/6 | Full |
| Hindi (hi) | 6/6 | Full |
| Portuguese (pt-br) | 6/6 | Full |
| Mandarin (zh) | 6/6 | Full |
| Arabic (ar) | 3/4 | Partial |
| Swahili (sw) | 1/2 | Partial |
| Quechua (qu) | 3/3 | Full |
| Guarani (gn) | 4/4 | Full |

**Key finding:** espeak-ng handles Arabic, Swahili, Quechua, and Guarani. But it does NOT support Kinyarwanda or Aymara, so those will need MMS-TTS.

### 5. Verification Script

Wrote `verify_all.py`, a 215-check script that verifies everything: corpora, aliases, G2P, WAVs, reports. All 215/215 checks passed.

## Decision

All 4 Tier 2 languages will use Kokoro cross-lingual with espeak-ng G2P and the `hf_alpha` voice. No need for Piper or MMS-TTS for these.

## What's Next

- Wire `alt_tts_backends.py` into `speech.py` for Kinyarwanda and Aymara (MMS-TTS).
- Get native speaker feedback on Tier 2 WAV samples.
- Start integrating the alt backends into the main pipeline.

## Resources & References

- **Speak-AI Repository:** [sugarlabs/speak-ai](https://github.com/sugarlabs/speak-ai)
- **Kokoro TTS:** [hexgrad/Kokoro](https://github.com/hexgrad/Kokoro)
- **Piper TTS:** [rhasspy/piper](https://github.com/rhasspy/piper)
- **Meta MMS-TTS:** [facebookresearch/mms](https://github.com/facebookresearch/mms)
- **WAV Samples:** [Google Drive Folder](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing)

## Acknowledgments

Thanks to Mebin and Ibiam for the continued mentorship. The cross-lingual results are looking good, and we now have a clear path for all Tier 2 languages.
