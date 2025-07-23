---
title: "GSoC '25 Week 7 Update by Krish Pandya"
excerpt: "Bundling, Post MidTerm"
category: "DEVELOPER NEWS"
date: "2025-07-22"
slug: "2025-07-22-gsoc-25-mostlyk-week07"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week07,mostlyk"
image: "assets/Images/GSOC.png"
---


# Week 7: Bundling , Post MidTerm, Sugar Envrionment and Profiles

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)
**Reporting Period:** July 15 2025 – July 22, 2025

---

## Flatpak and the need for Bundling

Let's start by explaining why we need to bundle in the first place, so we are porting, there will be inherent incompatibilities which will take a lot longer than just the span of GSoC and that shouldn't stop us from writing and shipping activities in GTK4 as GTK3 is regardless reaching its EOF soon.

We can begin by writing both existing and new activities in this way to ship them as Flatpaks. I’ll share the structure in this blog post (subject to change as we progress).

Here's the main start:

```json
{
  "app-id": "org.sugarlabs.Gtk4BundleTest",
  "runtime": "org.gnome.Platform",
  "runtime-version": "45",
  "sdk": "org.gnome.Sdk",
  "command": "org.sugarlabs.Gtk4BundleTest",
  "finish-args": [
    "--share=network",
    "--socket=wayland",
    "--socket=x11",
    "--device=dri",
    "--filesystem=host"
  ],
  "modules": [
    {
      "name": "python-builddeps",
      "buildsystem": "simple",
      "build-commands": [
        "pip3 install --prefix=/app --no-build-isolation setuptools wheel pip"
      ],
      "sources": []
    },
    {
      "name": "sugar-toolkit-gtk4-py",
      "buildsystem": "simple",
      "build-commands": [
        "pip3 install --prefix=/app --no-build-isolation ."
      ],
      "sources": [
        { "type": "dir", "path": "../../", "dest": "." }
      ]
    },
    {
      "name": "gtk4-bundle-test",
      "buildsystem": "simple",
      "build-commands": [
        "install -Dm755 main.py /app/bin/org.sugarlabs.Gtk4BundleTest"
      ],
      "sources": [
        { "type": "file", "path": "main.py" }
      ]
    }
  ]
}
```


## Hacks Explained:

As I’ve explained in the [README](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py/tree/main/examples/gtk4_bundle_test), the source code needs to be two directories above. The build command would change if we were installing from a `pyproject` or as a pip dependency.

After discussing this with Walter, I have a fun flatpak to bundle now for the few weeks as a proof of concept , It is [fractionbounce](https://github.com/sugarlabs/fractionbounce/)

Additional Notes: The main.py needs to be executable and needs to have the shebang of python at the start of file.

Apart from that there are no salient quirks one needs to know, just follow the README and you can generate the flatpak , install and run it!


## The Discussion with Juan Pablo and Ibiam

So this friday ( July 18 , 2025 ) I had a call with Juan Pablo and Ibiam and we discussed about the implications of changes and overall progress.
We talked about how Popover are a really nice alternative as discussed in the last blog as well.
I learnt about GTK_DEBUG=interactive flag and it changed a lot of things for me. A bit late to learn about that but better late than never they say.


## Looking Ahead

>  With palettes and toolbuttons now on a solid GTK4 footing, the next weeks will focus on:
>  -   Finalizing the remaining widget infrastructure (`widgets.py`) and integrating it with the palettes.
>  -   Porting an actual Sugar activity to use the new toolkit, putting our work to a real-world test.

As mentioned in the previous blog, I’ve started by adding the profile and environment required for the Sugar Labs profile for the `widgets.py` port. We also need to implement a few more radio and other types of buttons, which will be completed soon.

## Links

-   [Project Page](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
-   [New Python Library (sugar-toolkit-gtk4-py)](https://github.com/MostlyKIGuess/sugar-toolkit-gtk4-py)
-   [New C Library (sugar-ext)](https://github.com/sugarlabs/sugar-ext)
-   [Game Demo Video](https://youtu.be/B517C_LTCns)
