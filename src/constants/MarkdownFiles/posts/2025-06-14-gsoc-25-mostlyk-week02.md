---
title: "GSoC '25 Week 2 Update by Krish Pandya"
excerpt: "From initial GTK4 porting to building a solid foundation with separate C and Python libraries"
category: "DEVELOPER NEWS"
date: "2025-06-14"
slug: "2025-06-14-gsoc-25-mostlyk-week02"
author: "@/constants/MarkdownFiles/authors/krish-pandya.md"
tags: "gsoc25,sugarlabs,week02,mostlyk"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 2: Strategic Pivot and Foundation Building

**Project:** [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya Ibiam](https://github.com/chimosky), [Juan Pablo Ugarte](https://github.com/xjuan)       
**Reporting Period:** June 06, 2025 till June 14, 2025  

---


## The Meeting that changed everything

On Friday(06-06-2025), we had a pivotal video call with Juan Pablo Ugarte and Ibiam Chihurumnaya that completely reshaped the porting approach.
What started as a discussion about my initial porting work evolved into something much more strategic and forward-thinking.

> While the time of writing this, another meet that happened on 13-06-2025 , we discussed about the API versioning and updating with pytest, ideas about testing, more porting golden advice, more about this on next week's blog.

### The New Architecture Vision

The mentors introduced a brilliant modular approach that addresses the core challenges of the GTK4 migration:

**1. Two Separate Libraries Strategy**
- C Library 'sugar-ext': Core objects and reusable GTK widgets
- Python Wrapper Library: Python widgets and wrapper functions

![GTK4 Planning](assets/Images/gtk4drawing.webp)

> Subject to change

**2. Independent Development & Testing**
Each library will be developed in its own repository with simple Python example scripts. This approach offers several advantages:
- Clear separation of concerns between C and Python components
- Easier debugging and testing
- Better CI/CD pipeline management
- Modular, incremental development that reduces complexity

**3. Meson Build System Foundation**
We'll use Meson's shared library template from GNOME Builder as our base. This gives us:
- Modern build system designed for GTK4
- Better dependency management
- Cleaner project structure

### Why This Approach Made Sense

The more I thought about this strategy, the more I realized how elegant it is. Instead of trying to port everything at once (my initial approach, by changing the orignal toolkit and it's systems), we're building a solid foundation that can support the entire Sugar ecosystem. This modular approach means:

- Maintainability — Each component can be updated independently
- Testing — Smaller, focused libraries are easier to test thoroughly
- Future-proofing — The architecture can adapt as GTK continues to evolve
- Support — Due to the new build system, we would have more support and we can also remove things we find deprecated.
---

## Implementation

Following the meeting  – I immediately got to work implementing. 
The result that came out was [Pull Request #1](https://github.com/sugarlabs/sugar-ext/pull/1) in the new 'sugar-ext' repository.

### What I Built

**Project Structure:**
- Complete Meson build system setup
- GObject Introspection integration for seamless Python bindings
- Initial API implementation (starting with XO Colors for testing)
- Comprehensive documentation and development tools

**Key Technical Decisions:**
```c
// API versioning strategy
api_version = '1.0'     // Maintaining compatibility with existing SugarExt
package_version = '0.122.0'  // Following Sugar's versioning convention

// GIR configuration for Python bindings
symbol_prefix: 'sugarext'
identifier_prefix: 'SugarExt'
```

> This was discussed later in the meet and we decided to keep the packages version 2.0 or 4.0 because GTK4. Will be confirmed by the next blog,

- Included comprehensive build and test scripts

### Testing Framework

The project includes a robust testing setup:
```bash
meson test -C builddir
```

This runs the test suite, validating that the C library builds correctly and the test written should pass.

---

### To my Fellow Devs

- I have few files that can help you get your setup right. If you like clangd and use it as your LSP. Here's the .clangd configuration I used for sugar-ext.

```yaml
CompileDatabase: ./builddir

If:
  PathMatch: .*\.(c|h)$
CompileFlags:
  Add: [
    -I./src,
    -I./builddir,
    -I/usr/include/gtk-4.0,
    -I/usr/include/glib-2.0,
    -I/usr/lib/glib-2.0/include,
    -I/usr/include/pango-1.0,
    -I/usr/include/harfbuzz,
    -I/usr/include/fribidi,
    -I/usr/include/gdk-pixbuf-2.0,
    -I/usr/include/cairo,
    -I/usr/include/freetype2,
    -I/usr/include/libpng16,
    -I/usr/include/pixman-1,
    -I/usr/include/graphene-1.0,
    -I/usr/lib/graphene-1.0/include,
    -I/usr/include/libmount,
    -I/usr/include/blkid,
    -I/usr/include/sysprof-6,
    -I/usr/local/include/sugar-ext,
    -D_FILE_OFFSET_BITS=64
  ]

Diagnostics:
  ClangTidy:
    Add: [
      readability-*,
      bugprone-*,
      performance-*,
      misc-*
    ]
    Remove: [
      modernize-*,
      readability-isolate-declaration,
      readability-function-cognitive-complexity
    ]
  UnusedIncludes: Strict

InlayHints:
  Enabled: Yes
  ParameterNames: Yes
  DeducedTypes: Yes

Hover:
  ShowAKA: Yes

Index:
  Background: Build

Completion:
  AllScopes: Yes

Format:
  Style: GNU
```

- And if you are using VSCode and the C/C++ extension, here's the c_cpp_properties.json.
```json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**",
                "${workspaceFolder}/builddir",
                "/usr/include/gtk-4.0",
                "/usr/include/pango-1.0",
                "/usr/include/fribidi",
                "/usr/include/harfbuzz",
                "/usr/include/gdk-pixbuf-2.0",
                "/usr/include/cairo",
                "/usr/include/freetype2",
                "/usr/include/libpng16",
                "/usr/include/pixman-1",
                "/usr/include/graphene-1.0",
                "/usr/lib/graphene-1.0/include",
                "/usr/include/glib-2.0",
                "/usr/lib/glib-2.0/include",
                "/usr/include/libmount",
                "/usr/include/blkid",
                "/usr/include/sysprof-6"
            ],
            "defines": [
                "_FILE_OFFSET_BITS=64"
            ],
            "cStandard": "gnu11",
            "cppStandard": "c++17",
            "intelliSenseMode": "linux-gcc-x64",
            "compilerPath": "/usr/bin/gcc",
            "compileCommands": "${workspaceFolder}/builddir/compile_commands.json"
        }
    ],
    "version": 4
}
```

## Lessons from the PR Review Process

- To be added on week 3 as it gets merged!


# Migration List 

- Here Use as-is means if we decide to keep it we use it or it's newer version or alternatives. Port meaning we would have to change stuff, and whenever I have mentioned GTK4 we will use the new API directly rather than implementing from scratch. 
##  C Objects Migration List

| Object | Dependencies | Purpose | Port/Use GTK4 |
|--------|--------------|---------|---------------|
| sugar-grid.c/h | GLib + GDK | Grid-based layout calculations | Port |
| sugar-fatattr.c/h | Pure C, sys headers | FAT filesystem attribute utilities | Use as-is |
| acme-volume.c/h | GLib, ALSA | Audio volume control | Use as-is |
| acme-volume-alsa.c/h | GLib, ALSA | ALSA backend for volume control | Use as-is |
| sugar-wm.c/h | GLib, GDK, X11 | Window manager interaction utilities | Port |
| sugar-clipboard.c/h | GLib, GTK3 | Clipboard helper functions | Port (GdkClipboard) |
| eggdesktopfile.c/h | GLib, GTK3, GDK | Desktop file parsing and launching | Port |
| sugar-key-grabber.c/h | GLib, GDK, X11 | Global key binding system | Port (GTK4 shortcuts) |
| sugar-cursor-tracker.c/h | GLib, GDK, X11, XInput2 | Mouse cursor visibility tracking | Port (GTK4 events) |
| sugar-gesture-grabber.c/h | GLib, GDK, X11, XInput2 | Global gesture capture system | Port (GTK4 gestures) |
| sugar-event-controller.c/h | GLib, GTK4 | Base event controller | Port |
| sugar-long-press-controller.c/h | GLib, GTK4 | Long press gesture detection | Port |
| sugar-swipe-controller.c/h | GLib, GTK4 | Swipe gesture detection | Port |
| sugar-touch-controller.c/h | GLib, GTK4 | Touch event handling | Port |
| sugar-zoom-controller.c | GLib, GTK4 | Zoom gesture detection | Port |
| sugar-rotate-controller.c | GLib, GTK4 | Rotation gesture detection | Port |
| eggaccelerators.c/h | GLib, GTK3, GDK, X11 | Keyboard accelerator handling | Port |
| eggsmclient.c/h | GLib | Session management client | Use as-is |
| eggsmclient-xsmp.c/h | GLib, X11, ICE, SM | XSMP session management backend | Use as-is |
| gsm-app.c/h | GLib | Session management application handling | Use as-is |
| gsm-client.c/h | GLib | Session management client base | Use as-is |
| gsm-client-xsmp.c/h | GLib, X11, ICE, SM | XSMP client implementation | Use as-is |
| gsm-session.c/h | GLib | Session management core | Use as-is |
| gsm-xsmp.c/h | GLib, X11, ICE, SM | XSMP protocol implementation | Use as-is |



## Next Steps: Building the Foundation

### Immediate Priorities (Week 3)

1. Finalize C Library Scaffold
- Address remaining PR feedback
- Implement proper copyright and licensing
- Add core Sugar widgets starting with `sugar-grid`
- Sugar-Grid was added on 14-June-2025 while I am writing this.

2. Begin Python Wrapper Development
- Set up the Python-side repository
- Create example scripts demonstrating usage



---


## Resources & References

- Project Page – [GTK4 Exploration](https://summerofcode.withgoogle.com/programs/2025/projects/rsHsYZKy)
- New C Library - [sugar-ext repository](https://github.com/sugarlabs/sugar-ext)
- Active PR - [Establish C library base template with Meson for GTK4](https://github.com/sugarlabs/sugar-ext/pull/1)
- Sugar Toolkit Repository(original) – [sugar-toolkit-gtk3](https://github.com/sugarlabs/sugar-toolkit-gtk3)
- GTK4 Migration Guide – [docs.gtk.org/gtk4/migrating-3to4.html](https://docs.gtk.org/gtk4/migrating-3to4.html)


---

## Acknowledgments

Huge thanks to Juan Pablo Ugarte first of all for being the official mentor and Ibiam Chihurumnaya for the guidance that that changed this project's direction. Their architectural vision has transformed porting into a comprehensive modernization effort. Thanks also to Walter Bender for mentorship.

---

THe architecture is building itself, and I'm excited to lay down the foundations!

