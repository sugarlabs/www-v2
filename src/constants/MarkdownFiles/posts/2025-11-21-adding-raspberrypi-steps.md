---
title: "Adding steps to install suger on raspberrypi"
excerpt: "New developer Daksh kaushik shares how he implemented the steps to install suger on raspberrypi, what issues he faced and how he debugged them"
category: "DEVELOPER NEWS"
date: "2025-11-21"
slug: "adding-steps-to-install-suger-on-raspberrypi"
author: "@/constants/MarkdownFiles/authors/daksh-kaushik.md"
tags: "suger,raspberrypi,frontend,Sugar Labs"
image: "assets/Images/suger-on-raspberrypi.webp"
---


# Adding steps to install Sugar on Raspberry Pi

<!-- markdownlint-disable -->

## Introduction

Sugar Labs builds free/libre/open-source (FLO) tools that make learning playful and accessible. I recently contributed a clearer, reusable guide for installing Sugar on Raspberry Pi. This post describes the problems I found, the changes I made, and lessons learned to make the guide easier to follow and maintain.

Repository: https://github.com/sugarlabs/www-v2

## The problem

The Raspberry Pi developer pages included instructions, but many sections were descriptive without clear step-by-step commands or screenshots. That made the flow difficult to follow for users performing hands-on installation, especially for hardware-specific steps.

- Goal: provide a concise, easy-to-follow, copyable step flow (with images) and make the UI components reusable across pages.

Implementing this required converting inline, page-specific content into reusable data-driven components and enriching steps with copyable commands and images.

## Solution

- **Add structured installation steps**

	I created step arrays (data objects) for each OS flow so pages can import the exact step set they need. Each step can include a title, description, optional image, and a `commands` list.

- **Make the `StepsToUse` component reusable via props**

	The component now accepts `heading`, `steps`, and an optional `onStepChange` callback. This keeps the rendering logic in one place while allowing pages to feed different step arrays.

- **Create `LogoCard` and centralize logo-card behavior**

	I introduced a lean `LogoCard` component (props: `title`, `logo`, `onClick`). Clicking a `LogoCard` switches the steps pane to the flow associated with that card, avoiding page reloads and duplicated markup.

- **Add copyable commands and command styling**

	Steps that include `commands` render a compact code block with a copy button. Copy uses the Clipboard API with a textarea fallback. I also added a themed scrollbar for long command blocks in `src/styles/globals.css` to make horizontal overflow easier to scan.

- **Include images for clarity**

Where helpful (hardware wiring, installation output), I included images so users can validate each step visually.


## Challenges and takeaways

- **Keeping steps accurate:** The upstream Sugar repo documents are authoritative;

    I referenced this: https://github.com/sugarlabs/sugar/blob/master/docs/README.md

    and tested commands locally where possible.
- **Legacy component constraints:** The original `StepsToUse` was page-specific and missing a command field — refactoring removed duplication and enabled reuse.
- **Card sizing and density:** Existing logo cards included descriptions which increased size; `LogoCard` is intentionally compact (title + logo + click behavior) to fit multiple cards in a row without layout surprises.
- **Copy UX:** Copy-to-clipboard needs a clear, short visual confirmation — I added a temporary message when a command is copied.


## Impact and conclusion

- **Impact on users:** The new step flows reduce friction for people installing Sugar on Raspberry Pi by providing explicit, copyable commands and visual guidance.
- **Impact on the project:** Centralizing step rendering and logo cards reduces duplication and makes future changes (styling, copy, or behavior) straightforward.
- **Community value:** Clearer instructions improve onboarding for contributors and users, aligning with Sugar Labs's goal of making learning tools easy to use and maintain.

By sharing my experience, I hope to inspire others to contribute to Sugar Labs and make a positive impact on the community. I started by defining semantic tokens, honoring system preferences, and prioritizing accessibility. Through this process, I was able to deliver a guide to install Sugar on Raspberry Pi using different OSes. This guide helps people to install Sugar on machines.

## Try it out

The guide of installing suger on Raspberrypi is available on Raspberry page.
https://www.sugarlabs.org/raspberry

![Logocards for switching between guides](/assets/Images/logocard.webp)

*Look for these logocards to switch between different guides!*
