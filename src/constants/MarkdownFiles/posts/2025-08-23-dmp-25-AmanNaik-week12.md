---
title: "DMP ’25 Week 12 Update by Aman Naik"
excerpt: "This week focused on implementing persistent storage for chat history by integrating with Sugar’s Journal, ensuring continuity for students across sessions."
category: "DEVELOPER NEWS"
date: "2025-08-16"
slug: "2025-08-16-dmp-25-AmanNaik-week12"
author: "@/constants/MarkdownFiles/authors/amannaik247.md"
tags: "dmp25,writeactivity,write,sugarlabs,week12,amannaik247"
image: "assets/Images/c4gt_DMP.webp"
---

<!-- markdownlint-disable -->

# Week 12 Progress Report by Aman Naik

**Project:** [Add an AI-assistant to the Write Activity](https://github.com/sugarlabs/write-activity/issues/52)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Reporting Period:** 2025-08-16 – 2025-08-23  

---

## Goals for This Week

- Store chat history in the Sugar Journal for persistent storage  

---

## This Week’s Achievements

1. **Implemented Journal-based Chat History Persistence**  
   - Until now, conversations with Mary Tales were lost when the activity was closed, limiting continuity for students.  
   - Leveraging Sugar’s existing Journal integration, I extended the `write_file` method to save chat history alongside document text.  
   - This ensures that when students reopen the activity, whether the next day or after class, their previous chat is restored and they can continue seamlessly.  

   ```python
    def write_file(self, file_path):
        logging.debug('AbiWordActivity.write_file: %s, mimetype: %s',
                      file_path, self.metadata['mime_type'])
        
        # ... exiting code to save canvas text
        
        # Save conversation messages to metadata
        if hasattr(self, 'chat_sidebar') and hasattr(self.chat_sidebar, 'context') and hasattr(self.chat_sidebar.context, 'messages'):
            try:
                self.metadata['conversation'] = json.dumps(self.chat_sidebar.context.messages)
            except TypeError as e:
                logger.debug(f"Error serializing conversation messages in write_file: {e}")
    ```

2. **Refined Data Handling with Journal Metadata**  
   - Instead of generating separate JSON files for storing chat messages (which Sugar does not allow), I embedded serialized chat history into Journal metadata.  
   - This approach keeps all user data consolidated in a single entry, aligning with Sugar’s design philosophy of having one canonical record per activity session.  

---

## Challenges & How I Overcame Them

- **Challenge:** Finding a way to persist chat history without creating additional files  
  **Problem:** My first approach involved writing a JSON file every time the activity closed. However, Sugar prohibits programmatically creating arbitrary files within its environment.  
  **Solution:** After a discussion with my mentor Ibiam, I adopted Sugar’s built-in `read_file` and `write_file` methods to store metadata directly into the Journal entry. This allowed me to serialize and persist the chat state without breaking Sugar’s constraints.  

---

## Key Learnings

- Learned how to extend Sugar’s `write_file` and `read_file` methods to handle custom metadata, enabling persistent storage beyond just document text.  
- Understood the importance of designing within platform constraints, as Sugar discourages arbitrary file creation and instead enforces centralized data storage through the Journal.  
- Realized that persistent context is essential for educational UX, as students benefit from being able to revisit and build upon previous conversations across multiple sessions.  

---

## Next Week’s Roadmap

- Draft and finalize maintainer and user-facing documentation  
- Submit the final project reports  
- Prepare a presentation deck for the DMP final showcase  

---

## Acknowledgments

Thanks to my mentor Ibiam for pointing me towards Sugar’s Journal `read_file`/`write_file` workflow, which turned out to be the correct and elegant solution for persisting chat history.  

---
