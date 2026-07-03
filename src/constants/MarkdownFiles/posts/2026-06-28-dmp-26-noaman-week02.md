---
title: "DMP '26 Week 02 Update by Noaman Akhtar"
excerpt: "Extracting the HuggingFace pipeline from RAGAgent into a model-agnostic BaseProvider without changing existing behavior."
category: "DEVELOPER NEWS"
date: "2026-06-28"
slug: "2026-06-28-dmp-26-noaman-week02"
author: "@/constants/MarkdownFiles/authors/noaman-akhtar.md"
description: "DMP'26 Contributor at SugarLabs working on AI Optimization"
tags: "dmp26,sugarlabs,week02,noaman-akhtar,sugar-ai,ai-optimization"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Noaman Akhtar

**Project:** [AI Optimization](https://github.com/sugarlabs/sugar-ai)  
**Mentors:** [sum2it](https://github.com/sum2it), [mostlyk](https://github.com/MostlyKIGuess), [chimosky](https://github.com/chimosky)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa), [Mebin](https://github.com/mebinthattil)  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Reporting Period:** 2026-06-22 – 2026-06-28  

---

## Goals for This Week

- Extract the HuggingFace-specific code from [`RAGAgent`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L35).
- Define a model-agnostic provider interface for text generation and chat.
- Fix the [`/ask-llm`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L122) endpoint so it no longer calls the model pipeline directly.
- Keep the existing API response shapes and behavior stable throughout the refactor.

---

## The Coupling Problem (Recap)

At the start of the week, `RAGAgent` was responsible for too many unrelated tasks. The roughly 401-line class loaded the language model, configured 4-bit quantization, created the HuggingFace pipeline, retrieved documentation with FAISS, assembled prompts, and generated responses. Both [`torch`](https://pytorch.org/) and [`transformers`](https://huggingface.co/docs/transformers/) were imported directly into the agent, which made the entire application depend on one inference implementation.

The coupling also extended beyond the class. The `/ask-llm` endpoint reached into `agent.model()` and called the raw HuggingFace pipeline itself. Chat handling contained Gemma-specific role normalization inside the shared agent. Adding another backend at that point would have required more provider-specific conditions throughout `RAGAgent` and the API routes.

Phase 1 therefore focused only on separation. Before adding Ollama or any cloud API, I needed to establish a contract that the existing HuggingFace implementation could satisfy without changing how clients use Sugar-AI.

---

## Building the Provider Abstraction

### The BaseProvider Interface

I added [`app/providers/base.py`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py), which defines the [`BaseProvider`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py#L38) abstract base class. Every model backend must implement the same four operations:

```python
generate(prompt, params)
chat(messages, params)
get_model_name()
health_check()
```

The same file introduces [`GenerationParams`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py#L24), a frozen dataclass that groups settings such as `max_new_tokens`, `temperature`, `top_p`, `top_k`, and `repetition_penalty`. Its [`__post_init__()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py#L34) method derives `do_sample` from whether the temperature is greater than zero. This keeps generation settings consistent across providers and prevents call sites from passing a growing list of unrelated keyword arguments.

### Extracting HuggingFaceProvider

I moved the existing inference implementation into [`HuggingFaceProvider`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py#L28). It now owns model and tokenizer loading, optional [`BitsAndBytesConfig`](https://huggingface.co/docs/transformers/main_classes/quantization#transformers.BitsAndBytesConfig) 4-bit quantization, pipeline construction, raw generation, and chat generation.

Provider-specific compatibility logic moved with it. [`_normalize_chat_messages()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py#L141) handles the role ordering needed by Gemma models, while [`_extract_after_prompt()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py#L173) separates newly generated text from the input prompt. As a result, [`app/providers/huggingface.py`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py) is now the only Phase 1 file that imports `torch` and `transformers`.

The provider also implements [`get_model_name()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py#L130) and [`health_check()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/huggingface.py#L133). The health method is groundwork for future availability checks and safer model switching. Phase 1 does not expose a public `/health` endpoint.

### Rewriting RAGAgent

The rewritten `RAGAgent` accepts a `BaseProvider` through [`__init__(self, provider: BaseProvider)`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L38). It no longer loads a causal language model or knows how a HuggingFace pipeline returns generated text.

Instead, [`run()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L107), [`debug()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L90), and [`run_with_custom_prompt()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L136) assemble their prompts and delegate inference to [`provider.generate()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py#L42). [`run_chat_completion()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L157) delegates structured messages to [`provider.chat()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/providers/base.py#L46). The previous LangChain chain composition for these calls was replaced with direct prompt formatting, while the agent retained the parts that belong to the RAG layer: document loading, embeddings, FAISS retrieval, and prompt construction.

This creates a clear ownership boundary. `RAGAgent` decides what context and instructions the model receives, while the provider decides how those inputs reach a model backend.

### Wiring It Up

In [`main.py`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/main.py), application startup now creates a `HuggingFaceProvider` first and injects it into `RAGAgent`. The agent depends on the provider interface rather than constructing a concrete model pipeline itself.

I also updated [`app/routes/api.py`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py). The `/ask-llm` path now calls [`agent.provider.generate(question)`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L134) instead of accessing `agent.model()`. The prompted and chat modes translate request fields into one `GenerationParams` object, and [`/change-model`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L307) builds a replacement `HuggingFaceProvider` before passing it to [`set_model()`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/ai.py#L55).

This is dependency inversion in a practical form: high-level retrieval and API behavior depend on a small interface, while HuggingFace-specific details sit behind that interface.

---

## Challenge & Key Learning

The main challenge was keeping this a structural refactor. Moving model loading and generation across files created many opportunities to change output parsing, prompt formatting, or parameter defaults accidentally. I had to compare each call path carefully and resist adding alternative providers before the first contract was stable.

The key lesson was that an abstraction is useful only when the existing implementation can pass through it cleanly. Extracting `HuggingFaceProvider` first exposed which responsibilities belonged to inference and which belonged to retrieval. That boundary is what will make later providers simpler rather than adding another layer of conditionals.

For local checks, [`DEV_MODE`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/.example.env#L9) allowed me to use the lighter [`HuggingFaceTB/SmolLM-135M-Instruct`](https://huggingface.co/HuggingFaceTB/SmolLM-135M-Instruct) model on CPU instead of requiring the production model and GPU setup.

---

## Verification

I checked the existing request paths after the refactor: [`/ask`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L84), `/ask-llm`, both custom-prompt and chat modes of [`/ask-llm-prompted`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L153), and [`/debug`](https://github.com/Noaman-Akhtar/sugar-ai/blob/refactor/provider-abstraction/app/routes/api.py#L273) with and without documentation context. I verified that the API response structures and intended behavior remained consistent while inference passed through the provider interface.

I also performed syntax and import checks after each extraction step. The `health_check()` contract and provider replacement in `set_model()` establish the groundwork for a future health endpoint and safer runtime model switching, but those follow-up features are outside this phase.

---

## Plan for Next Week

The next step is to implement the first alternative backend, `OllamaProvider`, and test it against a local Ollama instance running `qwen2.5:1.5b`. This will test whether the `BaseProvider` contract is genuinely model-agnostic rather than only a wrapper around HuggingFace.

I also plan to add an `AI_PROVIDER` environment setting and a provider factory so startup can select a backend without changing application code. Those changes will build on this Phase 1 branch rather than expanding the interface prematurely.

---

## Resources & References

- **Repository:** [https://github.com/sugarlabs/sugar-ai](https://github.com/sugarlabs/sugar-ai)
- **Phase 1 branch:** [https://github.com/Noaman-Akhtar/sugar-ai/tree/refactor/provider-abstraction](https://github.com/Noaman-Akhtar/sugar-ai/tree/refactor/provider-abstraction)
- **Python abstract base classes:** [https://docs.python.org/3/library/abc.html](https://docs.python.org/3/library/abc.html)
- **HuggingFace pipelines:** [https://huggingface.co/docs/transformers/main_classes/pipelines](https://huggingface.co/docs/transformers/main_classes/pipelines)
- **FastAPI documentation:** [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community for helping keep the implementation focused on a stable provider contract before adding more backends. Their feedback helped turn the initial architecture plan into a clear first refactoring phase.

---
