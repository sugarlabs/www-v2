---
title: "DMP ’25 Week 8 Update by Aman Naik"
excerpt: "This week focused on improving model response quality, optimizing inference costs, and enhancing the UX logic of the story framework display."
category: "DEVELOPER NEWS"
date: "2025-07-26"
slug: "2025-07-26-dmp-25-AmanNaik-week08"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week08,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 8 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-07-20 – 2025-07-26  

---

## Goals for This Week

- Improve the accuracy and coherence of LLM model responses  
- Enhance user experience by reordering framework display elements  

---

## This Week’s Achievements

1. **Deployed a Smaller Qwen Model and improved configuration for accurate response generation**  
   - Switched to a smaller version of the Qwen model from Hugging Face to reduce GPU memory usage and cost.  
   - Used the `.predict()` method to generate responses and validate output.  
   - Configured the the prompt and text_generation function to generate controlled responses which contain only the required information
   ```model-deployment.py
    import json
    from sagemaker.huggingface import HuggingFaceModel, get_huggingface_llm_image_uri

    # Hub Model configuration. https://huggingface.co/models
    hub = {
      'HF_MODEL_ID':'Qwen/Qwen2-7B-Instruct',
      'SM_NUM_GPUS': json.dumps(1)
    }

    # create Hugging Face Model Class
    huggingface_model = HuggingFaceModel(
      image_uri=get_huggingface_llm_image_uri("huggingface",version="3.2.3"),
      env=hub,
      role=role, 
    )

    # deploy model to SageMaker Inference
    predictor =  huggingface_model.deploy(
      initial_instance_count=1,
      instance_type="ml.g5.2xlarge",
      container_startup_health_check_timeout=300,
      )	
   ```

2. **Improved UX by Reordering Story Framework Output**  
   - Previously, the story framework UI displayed elements in a fixed order, resulting in scattered empty and filled sections.  
   - Now, the application prioritizes displaying filled sections first, followed by the empty ones.  
   - This change improves readability and helps students better focus on the generated content.

---

## Challenges & How I Overcame Them

- **Challenge:** `.predict()` method returned prompt + raw model output  
  The raw output from the model included the prompt text followed by a generic continuation, making it difficult to isolate meaningful responses.  
  **Solution:**  
    - Discovered through documentation that structured prompting and post-processing are essential.  
    - Now slicing the model's response by measuring the prompt length and trimming everything before it.  
    - This ensures only the meaningful, post-inference content is displayed.  
    ```python
    system_prompt = (
        "<|im_start|>system\n"
        "You are a helpful assistant named Mary Tales. You are a guide to the students to help them in story telling. "
        "Your responses should be concise and simple for young learners, one line only.<|im_end|>\n"
    )
    user_prompt = (
        "<|im_start|>user\n"
        "My story is about a big business man! And he wants to rule the whole world.How is my idea?<|im_end|>\n"
        "<|im_start|>assistant\n"
    )
    full_prompt = f"{system_prompt}{user_prompt}"

    # send request
    response = predictor.predict(
        {
        "inputs": full_prompt,
        "parameters": {
            "do_sample": True,
            "max_new_tokens": 128,
            "temperature": 0.7,
            "top_k": 50,
            "top_p": 0.95,
            }
        }
    )
    generated_text = response[0]['generated_text']
    print(generated_text[len(full_prompt):])
    ```
    - This made the output from the model more consistent.


---

## An interesting gamification idea for the future
   - A progress bar to indicate the compeleteness of the story.  
   - As the student writes the story using the framework after certain number of words if they implement each element of the story framework, the progress bar will move ahead and a message of encouragement will pop up.  
   - I havent discussed this with the mentors. But this seems like a fun gamification for students. A bit outside the scope of this project but will be an addition once the scope of this project are finalised.  

   ![Rough idea of UI](assets/Images/aman-naik-week8-img1.webp)

---

## Key Learnings

**Model-Specific Prompt Engineering**  
   - Understood the difference between raw token streaming and structured prompting when using large language models in production.  
   - Learned how to manipulate string slices and structure prompts to get clean, contextually relevant outputs.

**Inference Cost Optimization with Smaller Models**  
   - Learned the importance of model size on inference speed and cost, especially when working within AWS SageMaker constraints.  
   - Successfully deployed and tested a smaller instruction-tuned variant of the Qwen model, improving both performance and affordability.

**Better UX Through Dynamic Element Sorting**  
   - Enhancing the layout logic in GTK led to a cleaner interface where students now see their generated content prioritized over empty templates.

---

## Next Week’s Roadmap

- Continue testing alternate prompt templates for more creative and friendly conversation 
- Explore other compact instruction-tuned models for better performance  
- Implement UI improvements:  
  - Framework section should display meaning of each story element(Enables students to learn more about each element)
  - Remove the `back` button and make the `Create Framework` button change state, to become the back button.

---

## Acknowledgments

Thanks to my mentors and the Sugar Labs community. Special thanks to the open-source contributors whose documentation around Qwen models and SageMaker integration helped resolve key technical issues this week.

---
