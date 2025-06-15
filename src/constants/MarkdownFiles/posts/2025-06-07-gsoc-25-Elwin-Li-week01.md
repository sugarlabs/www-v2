---
title: "GSoC '25 Week 1 Update by Elwin Li"
excerpt: "Weekly progress report for JSEditor updates"
category: "DEVELOPER NEWS"
date: "2025-06-07"
slug: "JSeditor-updates"
author: "Elwin Li"
description: "GSoC Contributor"
tags: "gsoc25,sugarlabs,week1,javaScript editor"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 1 Progress Report by Elwin Li

**Project:** [Advanced JavaScript Editor with MusicBlocks Interactions](https://github.com/sugarlabs/musicblocks/tree/gsoc-2025/elwin)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Anindya Kundu](https://github.com/meganindya), [Devin Ulibarri](https://github.com/pikurasa)

**Reporting Period:** 2025-06-02 - 2025-06-07

---

## Goals for This Week

- **Goal:** Complete and deploy code to blocks functionality.

---

## This Week’s Achievements

**Refactored code to be config driven**  
I refactored my code for code to block conversion to use a JSON config file so that the logic behind the conversion is as generic as possible.
An example config for a block is shown below:

         {
            "name": "repeat",
            "comments": "Repeat block in the Flow palette",
            "arguments": [
                {
                    "type": "NumberExpression"
                }
            ],
            "ast": {
                "identifiers": [
                    {
                        "property": "type",
                        "value": "ForStatement"
                    }
                ],
                "argument_properties": [
                    "test.right"
                ],
                "children_properties": [
                    "body.body"
                ]
            },
            "blocklist_connections": [
                "parent_or_previous_sibling",
                "argument",
                "first_child",
                "next_sibling"
            ],
            "default_vspaces": {
                "argument": 1
            }
         }

This config is for the repeat block, as conveniently stated in the comments section for readability. 
There are several pieces of information we need for a block for the conversion code to work:
- The name of the block
- The number of arguments, and their types
- The associated AST information
   - The identifiers, or the path to that block (needed for matching)
   - The paths to the argument and children properties from the AST
- The connections the block has in the blocklist [parent/previous sibling, argument(s), child(ren), next sibling]
- vspace information

Based on these pieces of information, the conversion code is generic enough to parse through and translate into blocklist format.
This is very important because this means that adding a new block for support is now as simple as adding a config like this to the JSON file.

---

## Challenges & How I Overcame Them

- **Challenge:** Coming up with the config format.

  **Solution:** Lots of trial and error, and using many different examples to make the code generic.

- **Challenge:** Argument handling was not working with configuration.

  **Solution:** Added a separate section in the config file for argument blocks, but made it as close to other blocks as possible.

---

## Key Learnings

- Deepened understanding of JSON configuration files.
- Improved skills in **debugging**, **code design**, and **collaboration workflows**.

---

## Next Week’s Roadmap

- Fully add all blocks that we want to support for code to block conversion, with corresponding documentation and error handling.
- Move on to next phase of the JSeditor project, which is the debugger
- Familiarize myself with the necessary files I will need to work with for the debugger
- Work on getting breakpoints to work

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---

## Connect with Me

- GitHub: [@ebeetles](https://github.com/ebeetles)
- Gmail: [elwin.s.li@gmail.com](mailto:elwin.s.li@gmail.com)
- LinkedIn: [Elwin Li](https://www.linkedin.com/in/elwinsli/)

---
