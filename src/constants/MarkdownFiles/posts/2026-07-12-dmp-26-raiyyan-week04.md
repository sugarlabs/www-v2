---
title: "DMP '26 Week 04 Update by NSA Raiyyan"
excerpt: "Rewrote the core TTS modules, added 83 tests, generated Tier 3 WAVs, and cleaned up the commit history."
category: "DEVELOPER NEWS"
date: "2026-07-12"
slug: "2026-07-12-dmp-26-raiyyan-week04"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week04,nsa-raiyyan,speak-ai,refactoring,tier3,testing"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 04 Progress Report by NSA Raiyyan
**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak-ai)

**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)

**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)

**Organization:** [Sugar Labs](https://sugarlabs.org)

**Reporting Period:** 2026-07-06 – 2026-07-12
---

## Goals for This Week

- Clean up the messy bits in `speech.py`, `alt_tts_backends.py`, and `tts_cache.py`.
- Write proper tests for all of them.
- Get Aymara working with Latin script detection.
- Generate WAVs for Kinyarwanda and Aymara using MMS-TTS.
- Clean up the commit history.

## What Got Done

### speech.py: The Big Rewrite

This one was long overdue. The file went from 927 lines down to 665. The main things:

There were two TTS pipelines in there that were basically doing the same thing with different variable names. Merged them into one. There was also this `poke()` call that had a race condition. It worked most of the time, but sometimes it would just silently fail under load. Removed it entirely and replaced it with a thread-safe preload mechanism. GStreamer cleanup was also spotty, so I added proper resource handling there. Oh, and added a `stop()` method, which somehow did not exist before.

### alt_tts_backends.py

This one was thread-unsafe. If two requests came in at the same time for different languages, it would just pick one and ignore the other. Added `threading.Lock` around the shared state. Also found that French was broken because the code was passing `fr-fr` as the language code when espeak-ng expects just `fr`. Fixed that. Trimmed about 22% of the code by removing duplicate branches that were left over from earlier experiments.

### tts_cache.py

The cache was writing the index file directly on every single put. If the process died mid-write, the whole index would be corrupted. Switched to atomic writes: write to a temp file, then rename. Also added a dirty flag so it only flushes to disk when needed instead of on every operation. Added validation so malformed entries get skipped gracefully instead of crashing the whole cache.

### Tests: 83 and Counting

| Test File | Tests | Status |
|---|---|---|
| `test_speech.py` (new) | 19 | All passing |
| `test_tts_cache.py` (new) | 31 | All passing |
| `test_alt_backends.py` (existing) | 33 | All passing |

The new tests cover language detection, singleton behavior, cache put/get, eviction, persistence, corruption recovery, and the basics. Zero flake8 errors across the board.

### Aymara Latin Hints

Added a bunch of Aymara (`ay`) words to `_LATIN_HINTS` in `speech.py`. Without this, the Latin script detector would just guess the wrong language for Aymara text. Not a huge change, but it was blocking Tier 3 from working properly.

### Tier 3 WAVs

Generated WAVs for Kinyarwanda and Aymara using MMS-TTS:

- **Kinyarwanda (rw):** 18 WAVs
- **Aymara (ay):** 18 WAVs
- **36 total**, all clean

Added `ALL_TIER_3` in `common.py` and `test_tier3.py` to generate and validate these.

## What's Next

- Export Kokoro and MMS-TTS models to ONNX for faster inference and smaller model size.
- Build a ModelManager for centralized model loading, caching, and switching between TTS engines.
- Analyze native speaker feedback from the Google Form and identify which languages need work.
- Refine corpora based on that feedback if speakers flag pronunciation issues.

## Resources & References

- **Speak-AI Repository:** [sugarlabs/speak-ai](https://github.com/sugarlabs/speak-ai)
- **PR #148:** [sugarlabs/speak-ai#148](https://github.com/sugarlabs/speak-ai/pull/148)
- **Kokoro TTS:** [hexgrad/Kokoro](https://github.com/hexgrad/Kokoro)
- **Meta MMS-TTS:** [facebookresearch/mms](https://github.com/facebookresearch/mms)
- **WAV Samples:** [Google Drive Folder](https://drive.google.com/drive/folders/1VWoYyCbb-YSCf_dXVt8Hxy5Zb9ROpyi_?usp=sharing)

## Acknowledgments

Thanks to Mebin and Ibiam for the continued mentorship. The codebase was starting to show its age in a few places, so getting to do this cleanup was satisfying. 83 tests passing, 0 flake8 errors, and the commit history finally looks intentional.
