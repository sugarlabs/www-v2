---
title: "GSoC '25 Week 05 Update by Shubham Singh"
excerpt: "Building and testing out the Image to video player"
category: "DEVELOPER NEWS"
date: "2025-07-05"
slug: "2025-07-05-gsoc-25-firepheonix-week05"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week05
  - firepheonix
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 5 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-07-01 – 2025-07-07

---

## Goals for This Week

- Fix some more issues in the scanning that are visible to me.
- Implementing the dynamic input of NOTES like in the phrase maker.

---

## This Week's Achievements

1. **Implemented dynamic input of Notes like in phrase maker.**  
   - So the very good thing about music blocks is, if you want to implement something, it's most LIKELY already there. Haha. So I scanned through the entire code of phrase maker's code and found out the code responsible for what type of input is taking place. Since I already extended the class LegoBricksBlock with StackClampBlock class, the input already worked, but for print block, since I used it as a dummy for future.
   - Well turns out everything fell right into place and I figured out NOT only just the input, but the output of how phrase maker took place and I implemented it on to my own LegoBrick.js . I now completely understand how the output is working out.
        ![Implementation of input and output with OOPs and using existing code and classes.](https://i.ibb.co/4npgBd1Z/Widget-Blocks-js-Working-Tree-Widget-Blocks-js-musicblocks-Cursor-13-07-2025-05-21-24.png)

        <iframe width="800" height="405" src="https://www.youtube.com/embed/ObNYq29QHZw?si=uoYPchoQUhbEnmY4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


2. **Implemented the complete phrase maker pitch functionality by adding PitchBlocks.js.**  
   - I figured out how to configure the notes, yet struggled with hardcoded value on the octave, which is by default, 4.
   - So I had to literally, manually go over the entire pitch-blocks.js and a few files. After making adjustments inside some of those files, I was finally able to get the octave as well.

        ![Had to change multiple files (14 files). This ultimately improves the way how code is being reused over and over. Rather than coding and making LegoBricks.js 10,000+ lines of code, I've kept it under 2000 using this methodology.](https://i.ibb.co/V0WsmFXX/musicblocks-Cursor-13-07-2025-05-09-24.png)

        <iframe width="800" height="405" src="https://www.youtube.com/embed/XpgFTjimPyc?si=fi9HxuN5o8BOP26J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

3. **Finally - Testing out Devin's CMK'24 project.**  
   - I finally did what I've always wanted. It was Devin's experiments that inspired me to take up this ,project in core Javascript for music blocks. So, here's a quick summary, haha:

   - Devin led a project called “Lego Musical Notation for the Blind” during the CMK workshop, aiming to create a tactile music system using Lego bricks for visually impaired users. Working with Jamie Chelel from MIT’s K12 Maker Lab, they built a prototype where pitch was mapped vertically and time horizontally on a Lego baseplate. Different brick lengths represented note durations, and a special marker block acted like a clef to guide pitch reference.

    ![Devin's CMK project idea. You can read the entire blog https://medium.com/@sugarlabs/reflections-from-constructing-modern-knowledge-2024-1ce7d60fbb1c ](https://i.ibb.co/kgPsNR4x/image-2025-07-13-041505518.png)

   - After building the basic physical model, Devin shifted focus toward digitizing the system. Devin, created a functional prototype of this scanning system, he encountered challenges when trying to assign precise, meaningful pitches within Scratch’s limitations.

    <iframe title="vimeo-player" src="https://player.vimeo.com/video/983707992?h=0b765ba25a" width="800" height="405" frameborder="0"    allowfullscreen></iframe>
    
    - Now, as you can read in my previous, week04 blog, I was able to completely overcome the Technical Hurdle of not being able to detect colors with a very high accuracy from static images.

    - And, finally here's how the scanning result looks like.

        ![Here's the cropped, put image my mentor, Devin sent. It's not clicked from the TOP, but from the bottom side, it has some edges as we can that taking 1/2 a row space even and causing some disruptions here and there. There are HOLLOW type blocks here with a little shadow inside of them which is making the color detection difficult. The red STUBS weren't predicted at first, but they were here. This photo was taken way back during CMK'24, so things weren't ](https://i.ibb.co/vChzCmWg/Music-Blocks-Google-Chrome-13-07-2025-07-47-09.png)

        ![The image output as scanned](https://i.ibb.co/QvQTGCzt/Devins-Test.png)
    
    - I realize that the output is coming ONE ROW down. also, the print functionality, it's automatically adjusting the rows ONE down. Still left with some adjustments to make something to show across all the blocks.

    - This still won't cut it. It has to be more accurate than this. I'll continue to optimize further, but I'll move on to the next phase, which is music generation from next week.

    ![Side by side comparison. (VERY ACCURATE, but just that it generated and EXTRA row at the top, which shouldn't be there. Otherwise, due the image not being taken from the TOP, there are shadows and EDGES which lead to incorrect prediction in rows. Otherwise, only row corresponding to E4 is incorrect, I'll have to see why.)](https://i.ibb.co/0pgQ8pDh/image-2025-07-13-121929214.png)

---

## Challenges & How I Overcame Them

- **Challenge:** Reading through multiple files  
  **Solution:** No solution, just did the old-fashioned, long way. Also read some documentation
- **Challenge:** Have a lot of college related in the upcoming week.  
  **Solution:** Woke up 2-3 sleepless nights to get more time?? Yeah that's what I did.

---

## Key Learnings

- If you're building something, for example, a full-stack frontend backend website, you shouldn't vibe code it with AI and THEN run into errors. Create a basic frontend -> Send post requests with some tool -> Then connect the backend. . And this applied here as well since I put the NOTES as input functionality first THEN the pitch. Build in steps. Plan it out better. Even better, use some LLM to plan it out for you step by step.
- I tried learning a LOT of stuff this week. I'm learning how CORE JAVASCRIPT in itself works and it's an amazing opportunity. I never knew any of the browser storage concepts, or for that matter, time complexity practical use case before hand. I'm just learning so in-depth. It's crazy good.

---

## Next Week's Roadmap

- Now we are getting on the main part, which is producing musical sounds with the printed output. I still have to figure out a way ALONG with that I also have my college related work I've got to do.
- Figuring out the when does music production START. This was mentioned by my mentor, Walter, that the music should start playing the moment the algorithm bumps into the FIRST color change from green. That's a START point.

---

## Resources & References

- **Nothing much, just Music Blocks documentation sufficed** 

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. I like how Devin actually reads everyone's blogs every single week. He's an inspiring person.
PS: If you're reading this blog Devin, I hope you're enjoying the details.

---