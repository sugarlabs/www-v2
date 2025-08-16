---
title: "GSoC '25 Week 03 Update by Shubham Singh"
excerpt: "Mapped Music from Synthutils to LegoBricks. Completed LegoBricks Wdiget UIs"
category: "DEVELOPER NEWS"
date: "2025-06-25"
slug: "2025-06-25-gsoc-25-firepheonix-week03"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week02
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-16 – 2025-06-22 

---

## Goals for This Week

- Complete UIs for image upload, webcam integration to Music Blocks.
- Integrating audios from Synth Sampler to LegoBricks widget.
- Researching existing audio integration patterns in the phrase maker and note blocks.

---

## This Week's Achievements

1. **Complete Image upload facility into Lego Bricks Widget.**  
   - Integrated image upload support within the LegoBricks widget, enabling external image input directly on the Music Blocks canvas.
   - Created a new block type by modifying six core files across the codebase.
   - The codebase proved beautifully encapsulated and thoroughly documented, making the learning curve smoother.
        ![Completed UIs](https://i.ibb.co/39pZpDGv/Music-Blocks-Google-Chrome-28-06-2025-07-13-38.webp)

        ![Putting images on lego bricks widget](https://i.ibb.co/203Mjsdk/Music-Blocks-Google-Chrome-28-06-2025-07-14-47.webp)

2. **Real-time Video Integration**  
   - Implemented real-time video functionality through webcam integration.
   - Enabled real-time video streaming, with support for dynamic canvas manipulation and block interaction.
   - Made grided interface for addition of both image and webcam. Made changes for adjusting.

        <iframe width="800" height="400" src="https://www.youtube.com/embed/HG6C0ZX7QRA?si=OIGvtD4qpwxMmb8W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

3. **Addition of music notations to Lego Bricks widget**  
   - Researched about where audio samples lie.
   - Deep-dived into Phrase Maker, Synth Sampler widget documentation and codebase.
   - Applied music samples to Music Blocks.

        <iframe width="800" height="400" src="https://www.youtube.com/embed/PwuPtACP8WM?si=NpfkLI-4SUVkVeU7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Challenges & How I Overcame Them

- **Challenge:** Music Blocks didn't have any code for integrating webcam video on to the Music Blocks interface.
**Solution:** Researched some stack overflow resources and added the webcam video on to the legobricks widget canvas.
- **Challenge:** Finding out where the SVGs and existing phrase maker and synthsampler audio files lie.
**Solution:** Asked my mentor, Walter Bender in Wednesday's meet. Saw some previous PRs inside of music blocks itself, related to phrase maker, related to synth sampler.

---

## Key Learnings

- Gained comprehensive understanding of **synth utils** and how **music samples are being exported to other blocks**
- Deepened appreciation for **code architecture** including inheritance patterns, code modularity, and custom return types within the Music Blocks ecosystem.
- Improved skills in **development workflow** including exports, imports, code reusability, documentation practices, and collaborative development workflows.

---

## Next Week's Roadmap

- Implement complete Core Implementation of Scanning the Lego Blocks image on the X-axis.
- Next to Next week -> Test for shadow handling
- Focus on algorithmic challenges for note-to-color mapping system.

---

## Resources & References

- **Project Issue:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)
- **Music Blocks Repository:** [sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **Documentation:** Music Blocks Developer Guide

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special thanks to Walter. A lot of code of Music Blocks was written by Walter, he has a very good knowledge of this code base. Can completely rely on him for help. He also helped this week as well.

---