---
title: "My Music Blocks Journey: Learning Through Code, Music, and Creativity"
excerpt: "A personal journey of discovering Music Blocks, contributing to open source, and learning through debugging and creative projects."
category: "DEVELOPER NEWS"
date: "2026-11-16"
slug: "2026-11-16-my-musicblocks-journey"
author: "@/constants/MarkdownFiles/authors/jaydeep-biswas.md"
tags: "sugarlabs,musicblocks,open-source,learning,creativity"
---


## Where It All Started

I've always been curious about how things work, especially when technology and creativity come together. Also i always wanted to do something or contribute towards something which makes people laugh, helps them, inspires them.

Music has been part of my interests since childhood. I played piano and harmonium and spent some time learning guitar but yet i can't play any of them properly. Although I never studied music theory deeply, I always enjoyed playing around with instruments.

Discovering Music Blocks gave me an opportunity to explore something different: how programming and music can work together to create interactive learning experiences.

What started as curiosity gradually became an open-source learning journey.

## Learning by Exploring the Codebase

When I started contributing to Music Blocks, understanding its codebase was one of my biggest challenges.

Instead of immediately trying to implement large features, I began exploring smaller issues, reproducing bugs, and understanding why certain interactions behaved unexpectedly.

Some of my merged contributions include:

- [PR #9145](https://github.com/sugarlabs/musicblocks/pull/9145): Preserving resize listeners after initialization.
- [PR #9257](https://github.com/sugarlabs/musicblocks/pull/9257): Improving the auxiliary menu's clickable area.
- [PR #9237](https://github.com/sugarlabs/musicblocks/pull/9237): Fixing blocks disappearing when entering or exiting fullscreen.

These contributions taught me that even small interface problems can affect the learning experience.

Later, by reviewing other contributors' work and exploring different parts of the codebase, I gradually started understanding more concepts. One interesting discovery was learning what actually happens behind the scenes when we press the "Play" button in Music Blocks.

## Challenges, Mistakes, and Discoveries

Since I started contributing to Music Blocks in September 2026, one of my biggest challenges has been understanding an unfamiliar and fairly large codebase. Sometimes, even a small UI issue required exploring multiple files.
I started with small steps, exploring issues raised by other contributors, especially those labeled good first issue. I tried implementing small changes, sometimes breaking things along the way, then testing and rebuilding to understand what went wrong. This process eventually helped me make my first contribution to Sugar Labs.

I also started exploring and reviewing other contributors' pull requests. Initially, understanding someone else's approach was challenging, especially when the changes involved unfamiliar functionality. I tried to reproduce the same problem then how it got solved by the contriibutor's fix. Now the biggest part how the contributor fixed it by changing which code so here comes a little help of AI, trying to understand each step of the code that was changed and Questioning myself- how it behaved in the right way? Isn't there any other way to fix it? Gradually, I learned to look beyond whether the code simply works and consider edge cases, compatibility, and how changes might affect the learner's experience.

One recent and particularly interesting investigation involved the Store in Box functionality.

While exploring the issue, I learned how accidental whitespace in a box name could create unexpected behavior.

I experimented with different inputs, reproduced the problem, wrote regression tests, and proposed a fix.

[Store in Box investigation — PR #10402](https://github.com/sugarlabs/musicblocks/pull/10402)

Although that PR wasn't merged, the investigation helped me better understand how text editing, stored values, and compatibility with existing projects interact.

It also reminded me that a contribution can teach us something valuable even when it doesn't become part of the codebase. So Instead of feeling discouraged when my PR was closed, the experience motivated me to keep exploring, learning, and improving my approach to solving problems.

## Moving Beyond Bug Fixes

As I became more familiar with Music Blocks, I also began creating projects myself. Which taught me so many deep core concept of musicblocks such as turtles, pens, loops, how animation works. Learning these small concepts by building some good small projects and trying it out how it worked.

Then joining the little-little concept I learnt to make a small working project with so many challenges such as how am i going to join a "x" concept with "y", took help from existing projects which are available on the git planet tried to debugg it and understand how the blocks worked so from there i understand the concept of how can i implement my idea into the blocks and make it behave the way i want.

### Tap-a-Tune: Learning Music Through Experimentation

As I mentioned that I always played with the instruments so I thought why don't I just add my curiosity in this project and make something. Also I thought maybe this idea will help students and young children to learn melodies step by step instead of just listening to them? I began experimenting with musical notes, rhythm, and sounds in Music Blocks, gradually building five interactive levels. I still have more ideas to explore, as this is only the beginning of the project.

Along the way, I faced challenges with sound playback, hints, and level progression. Through repeated testing and adjustments, I developed an activity where learners could practice melodies and eventually create their own tunes. It helped me understand how music, programming logic, and interactive learning can work together.

Try it out - https://sugarlabs.github.io/musicblocks/index.html?repo=tap-a-tune-be73f3f9-20c2-4e56-bc7b-5db1ba701df1&run=True

### Happy Children's Day: Exploring Turtle Graphics and Animation

This project began with my curiosity about creating something visually playful using Music Blocks and as per in India 14th of November is celebrated as Children's day, so I started doing something with turtles, pens where I started experimenting with Turtle movement, drawing, colors, and animations to create an interactive Children's Day scene with a sweet melody synchronized with the movement. I also learnt how loops worked and started searching about documentation and googling it out that how can i add so many blocks together to form a loop then here came the role of coding (python script) from which I can create so many blocks with just few lines of code which also conserves the time.

One of the biggest challenges was controlling the Turtle's movements accurately. Sometimes the drawings overlapped or the animations behaved unexpectedly. By adjusting coordinates, movement sequences, and timing, I gradually improved the experience. This taught me how programming can be used for visual storytelling.

Try it out - https://sugarlabs.github.io/musicblocks/index.html?repo=happy-children-s-day&run=True

### Learning and Experimenting with Different Tools

Throughout these projects, I explored different development tools and AI-assisted approaches to understand unfamiliar concepts, the Debugger (an outstanding tool), and investigate problems.

Not every suggestion or experiment worked as expected. I often had to test things myself, identify what went wrong, and try different approaches.

One important lesson was that tools can assist the learning process, but understanding the logic, experimenting independently, and verifying the results are what truly help me learn.

## Making Practice Levels More Approachable

More recently, I began thinking about how Music Blocks could become easier for complete beginners and young children to explore.

Sometimes, presenting too much instructional text at once can make a new learning experience feel overwhelming.

I proposed exploring a more interactive approach, where students could progress through smaller stages, interact with relevant palettes, experiment with blocks, and receive guidance when needed.

[Practice Levels discussion #10449](https://github.com/sugarlabs/musicblocks/discussions/10449)

The goal is not to reduce what students learn, but to help them discover concepts through playful, hands-on exploration.

## What This Journey Has Taught Me

Working with Music Blocks has changed how I approach problems.

I've learned to investigate before changing code, test assumptions, listen to feedback, and consider how learners will experience the software.

More importantly, I've learned that open-source contribution is not only finding a bug and solving as well as getting pull requests merged. It is also about experimenting, discussing ideas, sharing knowledge, and improving through the process.

## What's Next?

I want to continue exploring Music Blocks, contributing useful improvements, building creative projects, and learning more about how programming can support music education.

I'm still learning, and there is a lot more I want to understand.

I'm grateful to the Sugar Labs community for encouraging experimentation, collaboration, and sharing our discoveries along the way.

Thank you Devin and Walter for encouraging me to write about my works.
