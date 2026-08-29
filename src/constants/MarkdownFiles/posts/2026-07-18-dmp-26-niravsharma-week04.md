---
title: "DMP Week 4: Squashing the 'Ting' Sound - Synth Pipeline & Pitch Fixes"
excerpt: "PR #7807: normalizing Unicode accidentals in the synth pipeline, fixing numberToPitch out-of-bounds crashes, and making the pitch cache temperament-aware."
category: "DEVELOPER NEWS"
date: "2026-07-18"
slug: "2026-07-18-dmp-26-niravsharma-week04"
author: "@/constants/MarkdownFiles/authors/nirav-sharma.md"
description: "Week 4: PR #7807 fixes the synth pipeline. Unicode accidental normalization, numberToPitch bounds, and temperament-aware pitch caching."
tags: "dmp26,sugarlabs,week04,niravsharma,musicblocks,temperament"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Weekly Blog Post, 2026

**Contributor:** Nirav Sharma  
**Project:** Refactor Temperament — Sugar Labs Music Blocks (Issue #7171)  
**C4GT DMP 2026 

---

## What I worked on this week

This week was PR #7807, the infrastructure PR for Goal 3: getting the synthesis pipeline to actually respect the active temperament. The headline symptom was a "ting" that played instead of the right note on certain pitches, but the real fix was broader than that one bug.

Music Blocks lets you write notes with Unicode accidentals like ♯, ♭, 𝄪 (double sharp), and 𝄫 (double flat). Tone.js, the synth underneath, doesn't understand those characters. So when a note with a Unicode accidental reached the synth, it couldn't parse the name and you'd hear a "ting" instead of the note, on pitches 7 and 8.

The fix was to normalize those accidentals to ASCII before the synth ever saw them. I added a `normalizeNoteAccidentals()` helper and called it in two places: at the start of `_performNotes`, and again in `__getFrequency`'s key lookup, so a Unicode key matches the ASCII key sitting in `noteFrequencies`.

## The numberToPitch crash

Walter caught this one while testing pitch numbers. It worked fine in 17-EDO, but the moment he switched to 5-EDO, pitch number 7 threw an error that never reached the user. The cause was in `numberToPitch`: its `else` branch indexed straight into `TEMPERAMENT[temperament]["interval"][pitchNumber]`, so once the pitch number ran past the end of the interval array it went out of bounds and crashed.

The fix modulo-wraps the index back into range and tracks how many octaves you skipped, then adds that as an offset:

js
const intervalArray = TEMPERAMENT[temperament]["interval"];
const idx =
    ((pitchNumber % intervalArray.length) + intervalArray.length) % intervalArray.length;
const octaveOffset = Math.floor(pitchNumber / intervalArray.length);
interval = intervalArray[idx];
const noteObj = getNoteFromInterval(startPitch, interval);
return [noteObj[0], noteObj[1] + octaveOffset];

Making the pipeline temperament-aware
The bigger piece was that a lot of the synth code simply ignored the temperament. getCachedPitchToFrequency, _getFrequency, noteToFrequency, and a string of getNote/pitchToNumber calls all hardcoded 12-EDO assumptions. So switching to 19-EDO changed the label but not the frequencies, and the pitch cache had no temperament dimension, so flipping back and forth served stale values.

What changed:
- getCachedPitchToFrequency now takes a temperament argument (all 7 call sites updated), and the cache key includes the temperament, so no more collisions.
- Added Singer.clearPitchToFrequencyCache(), called when the temperament changes and between runs, so old values don't stick around.
- inTemperament resets to "equal" between runs, and I fixed a type bug where changeInTemperament was set to the string "equal" instead of the boolean false.
- Replaced the isEDOTemperament check with a plain temperament === 'equal' comparison; non-equal temperaments now use getNoteFromInterval, which produces note names consistent with temperamentChanged.
- In synthutils.js, _getFrequency uses getOctaveRatio() instead of a hardcoded 2, and the temperament widget's pitch calculations use the active EDO's pitch count instead of a hardcoded 12.
Small things that came along
- Added 17-EDO (equal17) to the temperament dictionaries — it was just missing.
- Extended EQUIVALENTNATURALS to cover double sharps (𝄪), so D𝄪 maps to E, E𝄪 to F♯, and so on. This also fixes the D♯ → E♭ rewrite edge case Devin had hit.
- Tests: 8 new tests for the EQUIVALENTNATURALS mappings, the accidental normalization, and the pitch wrapping, plus updated mocks — a little over 130 lines added across musicutils.test.js, synthutils.test.js, and logo.test.js.
What's next

PR #7807 is merged. A few call sites are now threaded with the temperament but still need proper handling — calculateInvert, drumStyle, inPitchStaircase, inMusicKeyboard, and justMeasuring — so the next PR cleans those up and moves on to the EDO-native consumers and Lilypond export work.

Links
- PR #7807 — wire active temperament through synthesis pipeline (https://github.com/sugarlabs/musicblocks/pull/7807)
- Issue #7171: Refactor Temperament (https://github.com/sugarlabs/musicblocks/issues/7171)
