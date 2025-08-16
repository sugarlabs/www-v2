---
title: "GSoC '25 Week 04 Update by Shubham Singh"
excerpt: "Pivoted from Point Scanner to Line Scanner, got some real results."
category: "DEVELOPER NEWS"
date: "2025-07-01"
slug: "2025-07-01-gsoc-25-firepheonix-week04"
author: "@/constants/MarkdownFiles/authors/shubham-singh.md"
tags:   
  - gsoc25
  - sugarlabs
  - week02
  - firepheonix
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 4 Progress Report by Shubham Singh

**Project:** [Color Sensor for Music Blocks](https://github.com/sugarlabs/musicblocks/issues/4537)  
**Mentors:** [Devin Ulibarri](https://github.com/pikurasa), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-23 – 2025-06-30

---

## Goals for This Week

- Implement complete Core Implementation of Scanning the Lego Blocks image on the X-axis.
- Focus on algorithmic challenges for note-to-color mapping system.

---

## This Week's Achievements

1. **Tested out the scanning errors. Realized the scanning single pixels isnt' gonna work.**  
   - So after testing out multiple errors, I realized that the DOT scanning method just isn't working that accurately(only ~40% accuracy). It's completely because of the core functionality of how the method itself works.
   - So, I realized there has to be a better method than this. Scanning have been taking place for a long time. There had to be a better method than this.
   - Began reverse engineer everything. Questioning every decision I've made for this project. Going to the very core of how the entire process, storage, time complexity is going on with the dot method.
        ![Pros and Cons of DOT scanner](https://i.ibb.co/jZM2cXzc/dot-Scanner.webp)

2. **Tested out spherical method. Failed.**  
   - Implemented the spherical method. It basically takes an AVERAGE of all the pixels underneath it rather than a scanning a single pixel. I did this keeping in mind more and more accuracy,
   - Little did I know, I ran into more errors and worse accuracy than before.

        ![Pros and Cons of Spherical (average) scanner](https://i.ibb.co/q3rJLNgb/sphere-Scanner.webp)

3. **Finally reached an optimal, LINE scanner. Highly balanced. Got to a VERY good accuracy level.**  
   - Learned it the hard way why all bar code scanners are line type scanners. Why all machines (like, even your local printer machine/ or laser scan) follow the line scanning method. Got the best results and very a good accuracy.

        ![Reasons why Line scanner is the BEST for our Lego Blocks case.](https://i.ibb.co/7dsjzRct/line-Scanner.webp)
    
    - Now, this doesn't mean that the line scanner doesn't have it's cons. It has cons like the texture-confusion in a place where the block's edge is there, and the green background. But, such a confusion edge is only for a VERY small time. I predict it to be < 0 ms, hence automatically being ignored by the algorithm. And there are some issues still left to be fixed.

4. **Made an output system for TESTING the accuracy of algorithm.**  
   - I ofc was not able to see how my output is through a mere array{{}} type console.log().
   - So, I developed this method of outputting of the colors on .webp type image. To make it visually seem like the image itself for a DIRECT comparision.

        ![Input I gave](https://i.ibb.co/YzttknX/lego-Notation.webp)

        ![Output I got(very close to my actual input)](https://i.ibb.co/bghJwFq9/color-detection-1751401094449.webp)
    
    - Now I am rather thinking of making use of THIS .webp output instead, it's simply good. Should I? Or should I not? Gonna have to ask from my mentors and do some research on this.


---

## Challenges & How I Overcame Them

- **Challenge:** Was getting stressed about why am I not able to get the accuracy I need.
**Solution:** Reverse engineered stuff. Thought on my own. Research on youtube- how do scanning algorithms actually work?
- **Challenge:** Not being to see if my algorithm is accurate or not.
**Solution:** Made it output the array in the format of a .webp format instead of a simple console.log(array).

---

## Key Learnings

- Reverse engineering always works. Dive in the BASICS. See the core of how everything is working. Make your human brain work more than asking AI for suggestions. It's possible that you're making things complicated with AI when the answer is really simple and lies in basic thinking.
- Figuring out what will work <<<< Figuring out what DOES NOT WORK.

---

## Next Week's Roadmap

- Implement the exisiting music blocks number to color mapping system that already exists (as suggested by my mentor, Walter)
- Implementing the dynamic input of NOTES like in the phrase maker.
- Figure out how the phrase maker has many different instuments with different audio files and LOADING them into legobricks.js
- Fix some more issues in the scanning that are visible to me.
- Once the above is done, we can move to mapping the lengths to corresponding notation lengths and production of musical notations. Initial weeks will be mostly figuring out the method for figuring out length of each block for each notation, am I going to use grid? Or will I use The lengths? Or will it be the time?

---

## Resources & References

- **Some youtube videos related to arduino color detection** 

---

## Acknowledgments

Thank you to my mentors [Walter Bender](https://github.com/walterbender) and [Devin Ulibarri](https://github.com/pikurasa) for invaluable guidance throughout this development phase. Special thanks to Devin. I had typhoid last week due which I had a week of backlog in my work. He didn't mind at all. Happy have such cooperative mentors :p .
P.S.: I've finally caught up to the work I missed.

---