---
title: "GSoC '25 Week 3 Update by Krish Pandya"
excerpt: "From initial GTK4 porting to building a solid foundation with separate C and Python libraries"
category: "DEVELOPER NEWS"
date: "2025-06-21"
slug: "2025-06-21-gsoc-25-mostlyk-week03"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week03,mostlyk"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 3: Development on the C estabhlishment

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)
**Reporting Period:** June 14, 2025 till June 21, 2025

---


## Following the meet of big change

> On last to last Friday(06-06-2025), we had a pivotal video call with Juan Pablo Ugarte and Ibiam Chihurumnaya that completely reshaped the porting approach.
What started as a discussion about my initial porting work evolved into something much more strategic and forward-thinking.

As discussed about these changes in the past week's blog, I have been continuing to update the C library. I have ported

### Commited:

- Sugar File Attributes ( in discussion of do we need to modernize or no)
- Event Controllers for Sugar ( handles clicks, movement etc. )
- Long Press Controllers

### Local:

- Sugar Touch Controllers
- Building on top of them, zoom, swipe and rotate.


## Demonstration of the Controllers:

<iframe width="560" height="315" src="https://www.youtube.com/embed/m0gwwo_0ZDE?si=M0ljKFFGuwAqAzrf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This video shows working example of Event Controller and Long Press controller.

---

## PR Deep Dive

### Review & Iteration

The review process was thorough and collaborative, with mentors providing feedback on:

- API and Versioning: Ensuring symbol and identifier prefixes followed conventions, and clarifying versioning strategy to align with Sugar’s release cycle.
- Code Structure: Moving away from including XO Colors in the C library (to be handled in Python).
- Licensing: Correctly attributing copyright and following LGPL-2.1. ( As discussed in last week's blog for the versioning ).
- Formatting: Retaining original code formatting for readability, and avoiding unnecessary changes from auto-formatters.
- Build System: Making examples optional in the build, and keeping the project modular.

### Modernization Decisions

A key discussion was around modernizing the file attributes utility using GLib APIs. My rationale was to unify the codebase under a modern standard, leveraging GLib for better error handling and maintainability. However, Ibiam and James highlighted the importance of compatibility with filesystems like FAT32, and the need to test on real hardware. I will be formatting my USB to test this soon. I will keep it as a TODO for now.

### Testing

Every ported module includes comprehensive tests. Just do the following to test:

```bash
meson test -C builddir
```

The tests cover attribute creation, setting/getting values, and simulating real-world activity workflows. I plan to continue this rigorous testing approach for all future modules as always , yours truly Krish.

### Lessons Learned

- Consistency matters - Unifying the codebase under GLib/GTK4 improves maintainability, but must be balanced with legacy compatibility.
- Testing is critical - Automated and example-based tests are essential for safe modernization.
- Documentation and commit messages - Clear explanations of why changes are made (not just what) are crucial for future maintainers.

 _I am still learning on how to improve all of these , especially commit messages_

---

# Apart from Porting

Outside of the core Sugar porting work, I also spent some time tinkering (_I love music_) some side projects for MusicBlocks and SL:

- AWS & SoundScape: I continued working on [SoundScape](https://soundscape.streamlit.app/), the audio processing web app.
This week, I wanted to update the platform to include an SheetMusic-To-MusicXML model in addition to existing Audio-to-Sheet-Music model and  Audio-to-MIDI functionality.
I sadly was using Oemer and my own system rqreuiement were not capable enough to run it .

- Machine Learning Experiments: I tried running [Oemer](https://github.com/BreezeWhite/oemer), an open-source Optical Music Recognition tool.So I’m planning to set up a dedicated AWS instance for further testing and integration. And if that works out I can deploy by dockerizing SoundScape.

Overall, I like tinkering with these kinds of projects and learn more about foundational models.

To someone who is interested in research and wants a tool to have beside reading papers you can check [Dread-Rising](https://dread-rising.streamlit.app/). It can also be used for someone who just wants to read a book , or an article, you can get highlighted version of the PDF, multiple understanding and can do in-depth.

These small problems that I tackle using my pre-existing knowledge on LLMs and Python help me in porting as well, even though it's a completely different side of project which is writing a C library right now, the skills and thinking translate a lot and I have fun!

## Resources & References

- Project Page – [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- New C Library - [sugar-ext repository](https://github.com/sugarlabs/sugar-ext)
- Active PR - [Establish C library base template with Meson for GTK4](https://github.com/sugarlabs/sugar-ext/pull/1)
- Sugar Toolkit Repository(original) – [sugar-toolkit-gtk3](https://github.com/sugarlabs/sugar-toolkit-gtk3)
- GTK4 Migration Guide – [docs.gtk.org/gtk4/migrating-3to4.html](https://docs.gtk.org/gtk4/migrating-3to4.html)


---

## Acknowledgments

Huge thanks to Juan Pablo Ugarte first of all for being the official mentor and Ibiam Chihurumnaya for the guidance that that changed this project's direction. Their architectural vision has transformed porting into a comprehensive modernization effort. Thanks also to Walter Bender for mentorship.
