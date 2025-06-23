---
title: "DMP ’25 Week 02 Update by Harshit Verma"
excerpt: "To develop a basic FastAPI server and integrate it with Pippy."
category: "DEVELOPER NEWS"
date: "2025-06-15"
slug: "2025-06-15-dmp-25-therealharshit-week02"
author: "@/constants/MarkdownFiles/authors/harshit-verma.md"
tags: "dmp25,sugarlabs,week02,therealharshit"
image: "assets/Images/c4gt_DMP.png"
---

<!-- markdownlint-disable -->

# Week 02 Progress Report by Harshit Verma

**Project:** [LLM-powered Debugger for Pippy](https://github.com/sugarlabs/Pippy/issues/95)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-09 - 2025-06-15  

---

## Goals for This Week

- **Goal 1:** Set up a basic FastAPI server.
- **Goal 2:** Integrate a Hugging Face model.
- **Goal 3:** Add 'Run and Debug' buttons to Pippy UI.
- **Goal 4:** Connect Pippy to the FastAPI Server.

---

## This Week’s Achievements

1. **Built FastAPI Server with `/debug` Endpoint**  
   - Created a simple FastAPI app that listens for POST requests at `/debug`.
   - The endpoint accepts raw Python code, forwards it to the model, and returns debug tips.

2. **Integrated Hugging Face Model**  
   - Loaded a lightweight model (Qwen/Qwen2.5-1.5B-Instruct) from Hugging Face using `transformers`.
   - Connected the model with the `/debug` endpoint to generate relevant debugging suggestions.

3. **Updated Pippy UI with Debugging Controls**  
   - Added 'Run and Debug' buttons to the Pippy interface.
    ![Pippy UI: Run and Debug](assets/Images/pippy_run&debug.png)
   - This was designed to trigger actions like execute code and get debugging feedback.

4. **Connected Pippy to the FastAPI Server**  
   - Implemented functionality to extract code from the Pippy editor.
    ```Python
    #To extract the source code

    def _get_current_code(self):
        pippy_tmp_dir = '%s/tmp/' % self.get_activity_root()
        current_file = os.path.join(
            pippy_tmp_dir,
            self._source_tabs.get_current_file_name()
        )

        try:
            with open(current_file, 'r') as f:
                return f.read()
        except Exception as e:
            print(f"Error reading file {current_file}: {e}")
            return None
    ```   
   - Successfully set up an API call from Pippy to the FastAPI server when the 'Run and Debug' button is clicked.

---

## Challenges & How I Overcame Them

- **Challenge:** Running the model locally on CPU.  
  **Solution:** Faced performance limitations due to lack of GPU support. I resolved this by selecting a small, efficient model from Hugging Face.

- **Challenge:** Using GTK for Pippy UI integration.  
  **Solution:**  Since GTK was new to me, adding buttons and handling events required exploring GTK documentation and existing Sugar activity patterns. With guidance and trial-and-error, I successfully added and wired up the 'Run and Debug' button to Pippy’s interface.

---

## Key Learnings

- Learned how to build and structure an API with FastAPI.
- Gained experience integrating Hugging Face models programmatically.
- Understood how to bridge frontend (Pippy) with backend (FastAPI) effectively.
- Improved at working across virtual machines, ports, and networking setups.

---

## Next Week’s Roadmap

- Improve prompt engineering for better debugging tips.
- Add visual display of debug tips in the Pippy interface.
- Integrate sugar-ai with Pippy.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow contributors for your continued guidance and support!

---
