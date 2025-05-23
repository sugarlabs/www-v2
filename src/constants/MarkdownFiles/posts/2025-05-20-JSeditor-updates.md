---
title: "JavaScript Editor Updates and Future Features"
excerpt: "Overview of changes being made to the JavaScript editor tool in MusicBlocks v3, and future plans"
category: "DEVELOPER NEWS"
date: "2025-05-20"
slug: "JSeditor-updates"
author: "Elwin Li"
description: "GSoC Contributor"
tags: "gsoc, javaScript editor, development, contribution, debugger"
---

This is the first update report on the MusicBlocks JavaScript editor enhancement project for 
GSoC 2025. This and future reports will discuss the progress and future plans for the improvement 
of user experience and features for the editor.

## Contents
- Upcoming Features
- Motivation
- JavaScript to Music Blocks
- Debugger
- Syntax highlighting

---

### Upcoming Features
This project aims to significantly enhance the JavaScript editor within Sugar Labs'
MusicBlocks environment. By implementing translation from JavaScript code to
MusicBlocks visual blocks, users will gain a powerful tool for iterative learning and code
exploration. Additionally, the project will introduce a JavaScript visualizer for step-by-step
debugging and syntax highlighting to improve the editor's usability and appeal to young
learners. This upgrade will bridge the gap between visual programming and text-based coding,
promoting a deeper understanding of real programming and empowering kids to debug
effectively.

### Motivation
I believe that kids cannot learn to
code without coding. Although they can learn the concept of coding through MusicBlocks, they
still cannot learn text-based coding effectively. The JavaScript-to-MusicBlocks conversion feature
will enable them to better transition between visual block-based programming and
textual JavaScript coding. This promotes a deeper understanding of programming concepts and
has kids learn them more effectively. 

Even more important than learning how to code is learning how to problem solve. Debugging and 
problem solving skills provide kids with the knowledge to overcome problems of any kind, not 
just in programming. With the step by step debugger, kids will learn how to break a problem down, and 
identify where problems are and track them. 

### JavaScript to Music Blocks
The JavaScript to Music Blocks feature is fairly simple as an end product: implementing the ability
for users to convert the JavaScript code in the editor to music blocks. The execution of this feature 
is less simple. Currently, I have implemented support for all blocks from the rhythm, flow, number, and boolean palettes. There is also support for a few blocks from the pitch, tone, and action palettes. These implementations can be seen with the [first PR](https://github.com/sugarlabs/musicblocks/pull/4591) and the [second PR](https://github.com/sugarlabs/musicblocks/pull/4692).

This was all done using the following process:

1. Using the [acorn parser library](https://github.com/acornjs/acorn), convert the input code by the user in the editor into an
[**Abstract Syntax Tree**](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST)
2. Convert the AST into a custom intermediate representation
    - In this case, it is a simpler tree consisting of all the different blocks that the code creates
    - For each block in the intermediate tree, there is information on its type, arguments, children, and/or value if it has one
3. Convert the intermediate tree into a blocklist
    - MusicBlocks generate blocks using the representation of a list of blocks, which are mostly in the form of  
    [id, name, x, y, [connections]]
    - Carefully parsing through the intermediate tree and dealing with the connections produce a list of such blocks,
    which MusicBlocks will then load into the visual programming blocks
    - The connections are made during the process of creating the blocks. 
        - For each block, if it has arguments, they will be created and connected with the block
        - Then its children are created and connected to each other
        - Finally the first child is then connected back to the block itself
    - During this process, vertical sizes of arguments are kept track of to insert the necessary amount of vertical spacers before the children

Although this process is proven to work very well as shown by the [merged PR](https://github.com/sugarlabs/musicblocks/pull/4591), 
adding future blocks is not yet as simple as it can be.

Thus, I am currently working on refactoring the code to use JSON config files to store pairs of AST to block mappings, which would
make adding new blocks an extremely quick and trivial process. The next report may go into more details on this.

### Debugger
The JavaScript editor debugger will be a tool located as a separate tab within the console space. I plan on implementing this tool as part of GSoC this summer. Although currently unavailable, I have created a simple design as to what it may look like.
![JSeditor debugger](/assets/post-assets/debugger.png)

The debugger will have the following functionalities:
 - Ability to set one or multiple breakpoints
 - Have the state of all variables at breakpoints 
 - Show function call frames
 - User can run program all the way to the next breakpoint (stops in order until user goes to next one)
 - User can step forward line by line or evaluate by unit

### Syntax Highlighting
A good IDE or code editor will always have syntax highlighting. This makes the environment easier and more fun to work with. Thus,
this feature will also be added to the JavaScript editor in MusicBlocks. Although this also has not been implemented yet, I foresee this
part of the project being the fastest, as there are many established libraries that can provide syntax highlighting. Some candidates may include highlight.js, and CodeJar.

---

This concludes the first report on the MusicBlocks JavaScript editor enhancement project for GSoC 2025. Thanks for reading, and more updates will come soon!