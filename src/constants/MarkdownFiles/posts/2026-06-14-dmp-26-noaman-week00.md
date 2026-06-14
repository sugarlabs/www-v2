---
title: "DMP '26 Week 00 Update by Noaman Akhtar"
excerpt: "Kickoff week: establishing local environment setups, conducting a deep-dive exploration of the Sugar-AI codebase, and mapping the model provider abstraction."
category: "DEVELOPER NEWS"
date: "2026-06-14"
slug: "2026-06-14-dmp-26-noaman-week00"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week00,noaman-akhtar,sugar-ai,introduction"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 00 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)
**Organization:** [Sugar Labs](https://sugarlabs.org)
**Reporting Period:** 2026-06-01 – 2026-06-14

---

## whoami

Hey, I'm Noaman Akhtar ([@Noaman-Akhtar](https://github.com/Noaman-Akhtar)), a third-year CSE undergraduate at KIIT University, Bhubaneswar. This summer I'll be working on **AI Optimization** as a contributor for the Digital India Mentorship (DMP) 2026 cohort with Sugar Labs.
My journey into software development started with a natural interest in systems and problem-solving. Contributing to open-source software became a major focus because I love knowing that the code I write actually runs on people's machines and solves tangible issues. Having previously contributed to the `sugarlabs/musicblocks` codebase I'm very excited to dive deep into the Python and AI backend side of the Sugar Labs ecosystem this summer by working on sugar-ai.

---

## Project Overview

The `sugar-ai` repository is a lightweight Python/FastAPI service that provides RAG (Retrieval-Augmented Generation), chat completions, and text simplification pipelines to downstream activities (such as `speak-ai`).

Currently, the service relies on a monolithic `RAGAgent` class that couples model loading, RAG pipelines, and API routing directly with a local HuggingFace `pipeline()` instance. If an activity or school environment wants to leverage different hosting models (e.g., local servers like Ollama, or external cloud endpoints like OpenAI, Groq, or Gemini), the service cannot easily accommodate them.

The primary goal of my project is to decouple this architecture by implementing a modular, model-agnostic **BaseProvider** interface. This abstraction will allow switching model backends via simple environment configuration edits, bringing multi-provider flexibility to Sugar Labs' educational activities.

---

## Goals for This Week

- Set up the local development environment for `sugar-ai` and run the FastAPI server.
- Perform a thorough codebase walkthrough to trace request flows and identify key integration boundaries.
- Map out the existing HuggingFace dependencies inside the `RAGAgent` class.
- Document known architectural bottlenecks and bugs to fix during the refactoring phases.

---

## Achievements

### 1. Local Environment & Development Configuration
I successfully cloned the repository, set up a Python virtual environment, and installed all required packages. To test the pipeline locally on standard hardware without a GPU, I configured the local `.env` file with `DEV_MODE=1`. This switches the default HuggingFace model path to `SmolLM-135M-Instruct` (a lightweight 300MB model) which runs smoothly on local CPU resources for testing:

### 2. Codebase Walkthrough & Architecture Mapping
I spent several days reading the source files and mapped the exact request-response lifecycle across the endpoints:

* **`main.py` & `app/__init__.py`:** Traced the startup sequence where the server initializes the `RAGAgent` singleton and registers the FastAPI application routers.
* **`app/routes/api.py`:** Traced endpoints like `/ask`, `/ask-llm`, `/ask-llm-prompted`, and `/debug` back to their corresponding agent executors.
* **`app/ai.py`:** Conducted a detailed method analysis on the 401-line `RAGAgent` class. Currently, this class holds direct dependencies on HuggingFace pipelines for raw text completion, custom prompts, and chat templates.

### 3. Identified Codebase Bottlenecks
During my review, I documented 7 key structural issues that will be addressed alongside the provider refactoring:
- **Broken FAISS Scoring:** The RAG retrieval method always returns `None` because the distance score key check doesn't match FAISS metadata return schemas.
- **Unsafe Model Switcher:** The `/change-model` endpoint updates variables directly without checking if the model name is valid, leading to runtime crashes.
- **Hardcoded Embedding Model:** The vector store initialization hardcodes the `all-MiniLM-L6-v2` string rather than reading from configurables.
- **Gemma-Specific Hacks:** Chat message normalization uses rigid `if "gemma" in model` blocks that will be moved into model-specific provider logic.
- **Missing Features:** No streaming (SSE) support and no health checks for provider availability.

---

## Challenge & Key Learning

A main challenge was recognizing that jumping straight into implementing Ollama or cloud APIs would only add to the technical debt in the monolithic `RAGAgent`. Decoupling the codebase with a clean `BaseProvider` interface is a prerequisite. Getting the HuggingFace logic safely extracted into a `HuggingFaceProvider` class first ensures we have a stable test baseline before adding new model servers.

---

## Resources & References

- **Sugar-AI Repository:** [sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **FastAPI Documentation:** [fastapi.tiangolo.com](https://fastapi.tiangolo.com/)
- **Ollama API Reference:** [github.com/ollama/ollama/blob/main/docs/api.md](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for their guidance on the project boundaries. Special thanks to the developers who laid the groundwork for the initial `RAGAgent` implementation.
