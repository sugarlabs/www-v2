---
title: "DMP '26 Week 05 Update by NSA Raiyyan"
excerpt: "Added word-level highlighting synced to speech, waveform-driven mouth animation, and streaming playback for Kokoro."
category: "DEVELOPER NEWS"
date: "2026-07-19"
slug: "2026-07-19-dmp-26-raiyyan-week05"
author: "@/constants/MarkdownFiles/authors/nsa-raiyyan.md"
description: "DMP'26 Contributor at SugarLabs working on Speak-AI Multilingual Support"
tags: "dmp26,sugarlabs,week05,nsa-raiyyan,speak-ai,streaming,lipsync,highlighting"
image: "assets/Images/c4gt_DMP.webp"
---
<!-- markdownlint-disable -->
# Week 05 Progress Report by NSA Raiyyan

**Project:** [Speak-AI Multilingual Support](https://github.com/sugarlabs/speak-ai)  
**Mentors:** [Mebin Thattil](https://github.com/mebinthattil), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-07-13 to 2026-07-19 

---

## Goals for This Week

- Make the face react to what is actually being spoken instead of animating blindly.
- Highlight the current word in the text entry as it is spoken.
- Move Kokoro playback from "synthesize everything, then play" to streaming.
- Fix the `misaki` G2P compatibility breakages that were blocking non-English languages.

## What Got Done

### Word-Level Highlighting

This was the main feature this week. As Speak talks, the word being spoken is now selected in the text entry, so a child can follow along while listening.

The tricky part is that none of the backends give you per-word timing. Kokoro and MMS both hand back a waveform and nothing else. True phoneme alignment would have meant pulling in a forced aligner, which is a lot of weight for what this needs to do.

So I estimate it instead. Within each synthesized chunk, every word gets a slice of that chunk's real measured duration, proportional to its character length. It is an approximation, but it barely drifts in practice because it re-anchors on every chunk rather than extrapolating across the whole utterance. The nice part is that it behaves the same no matter which backend produced the audio.

Highlights go out as a new `word` signal carrying `(start, end)` character offsets. These are global offsets into the full text, not chunk-local ones. `_schedule_word_highlights()` takes a `base_offset`, and the streaming path keeps a cursor into the original text so each chunk knows where it sits in the whole string. `(-1, -1)` is the clear sentinel, which resets the entry to the whole-utterance selection that Speak already used as its resting state.

On the activity side this is wired up in `activity.py` through a `__word_highlight_cb` connected to the speech singleton.

### Mouth Animation from the Actual Waveform

The mouth used to move on a generic timer. Now `_schedule_mouth_from_waveform()` pulls peak amplitude out of each audio chunk as it gets pushed and schedules the face to match. Loud syllables open the mouth wider, silence settles it back to idle.

It lines up with the audio far better than the timer did, and it costs almost nothing since the chunks are already sitting right there.

`_emit_idle()` and `_schedule_idle_at()` handle returning the face to rest at end of stream. Before this, playback ending on a loud frame could leave the mouth frozen half open, which looked a bit unsettling.

### Streaming Playback

Kokoro audio now streams to GStreamer through `_stream_kokoro_audio()` and `_push_waveform_to_appsrc()` instead of waiting for the full waveform before playback starts. Audio begins as soon as the first chunk is ready, which cuts the wait noticeably on longer sentences.

Pacing took some fiddling. Pushing everything into `appsrc` as fast as possible defeats the purpose, because both the highlighting and the mouth scheduling key off wall-clock time, so they would run ahead of what you are actually hearing. The push loop now keeps a small lead buffer ahead of playback and sleeps the difference. Enough headroom to avoid underruns, not so much that the visuals desync.

### misaki G2P Compatibility

Two real breakages fixed in `kokoro/pipeline.py`:

- `ZHG2P` was being constructed with `version=` and `en_callable=` arguments, but some `misaki` versions ship a constructor that takes no arguments at all. That threw a `TypeError` on import for `lang_code='z'`. It now falls back to the bare constructor.
- `self.g2p(chunk)` assumed a `(phonemes, extra)` tuple came back. That holds for the en/ja/zh G2Ps, but `EspeakG2P` returns a bare phoneme string, so every espeak-backed language was unpacking wrong. It now handles both shapes.

The second one had been quietly affecting a good chunk of the multilingual work, so it was satisfying to finally track down.

## What's Next

- ONNX export for Kokoro and MMS-TTS. Carried over from last week, still the priority for inference speed and model size.
- A ModelManager for centralized model loading, caching, and switching between engines.
- Tests for the highlighting and streaming paths. The timing logic especially needs coverage.
- Go through the native speaker feedback from the Google Form and refine corpora where pronunciation gets flagged.

## Resources & References

- **Speak-AI Repository:** [sugarlabs/speak-ai](https://github.com/sugarlabs/speak-ai)
- **Kokoro TTS:** [hexgrad/kokoro](https://github.com/hexgrad/kokoro)
- **misaki G2P:** [hexgrad/misaki](https://github.com/hexgrad/misaki)
- **Meta MMS-TTS:** [facebookresearch/fairseq (examples/mms)](https://github.com/facebookresearch/fairseq/tree/main/examples/mms)
- **Kokoro-82M Model:** [hexgrad/Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)

## Acknowledgments

Thanks as always to Mebin and Ibiam. This week was less about adding capability and more about making Speak feel right. The synthesis was already working fine, but watching the face move out of sync with the voice made it obvious how much the presentation matters when the thing you are building is meant for kids. Driving both the mouth and the highlighting off real audio timing made a bigger difference than I expected it to.
