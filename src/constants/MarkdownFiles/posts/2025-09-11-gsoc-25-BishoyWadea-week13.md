---
title: "GSoC '25 Week 13 Update by Bishoy Wadea"
excerpt: "AI Organizer - Image Classification with Machine Learning"
category: "DEVELOPER NEWS"
date: "2025-09-11"
slug: "gsoc-25-BishoyWadea-week13"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week13,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Week 13 Progress Report by Bishoy Wadea

**Project:** [AI Organizer](https://github.com/Bishoywadea/AI-Organizer)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-09-05 – 2025-09-11 

---

## Goals for This Week

- **Develop new Sugar activity: AI Organizer**
- **Implement machine learning-based image classification**
- **Create educational interface for exploring AI capabilities**

---

## About AI Organizer

AI Organizer (Image Classifier) is an educational activity that introduces students to machine learning concepts through hands-on image classification. The activity uses AI to automatically categorize images into animals, shapes, numbers, or objects, helping students understand how computers "see" and interpret visual information.

---

## Achievements

### Core Implementation

- **Activity Framework**  
  Established Sugar activity structure with AI/ML integration  
  [Commit]()

- **Machine Learning Pipeline**  
  Integrated image classification model with pre-trained weights  
  [Commit](https://github.com/Bishoywadea/AI-Organizer/commit/ee311244568cbf8aa88d56515efc37889939698f)


![AI Organizer Interface](https://raw.githubusercontent.com/Bishoywadea/AI-Organizer/refs/heads/main/screen_shots/01.png)
*Clean interface for image selection and classification*

### User Experience Features

- **Image Selection System**  
  Created intuitive file browser integration for image selection  
  [Commit](https://github.com/Bishoywadea/AI-Organizer/commit/ed66375ebdd4d0641762e6f08b3b54ce248865d5)

- **Confidence Display**  
  Added visual representation of AI confidence levels in predictions  
  [Commit](https://github.com/Bishoywadea/AI-Organizer/commit/388df0ba44d9816ad496e53e6d02427bd4a24f2c)


![Classification Results](https://raw.githubusercontent.com/Bishoywadea/AI-Organizer/refs/heads/main/screen_shots/02.png)
*AI successfully classifying an image with confidence scores*

## How to Use

1. **Choose Image:** Click the folder button or "Choose Image" to select a photo
2. **Classify:** Click "Classify Image" to let the AI analyze it
3. **View Results:** See the category, details, and confidence level
4. **Try Again:** Use Clear button to reset and try different images

---

## Challenges & Solutions

- **Challenge:** Running complex ML models on resource-constrained XO laptops while maintaining responsive performance.

- **Solution:**  
  - Used lightweight, quantized models optimized for edge devices
  - Implemented lazy loading to reduce initial memory footprint
  - Created efficient image preprocessing pipeline
  - Added progress indicators during classification to improve perceived performance

- **Challenge:** Making abstract AI concepts understandable for young students.

- **Solution:**  
  - Designed visual confidence meters instead of numerical percentages
  - Used familiar category names and simple explanations
  - Created interactive tutorials showing step-by-step AI decision process
  - Added "Why did AI think this?" explanations for each classification

---

## Key Learnings

- Gained experience in deploying ML models in educational environments
- Learned to balance model accuracy with computational constraints
- Developed skills in making AI technology accessible to young learners
- Improved understanding of edge computing optimization techniques

---
## Next Week's Roadmap

- **Final GSoC Documentation**
  - Prepare comprehensive final report documenting all 10 activities
  - Compile user feedback and testing results
  - Prepare presentation materials for final evaluation
  - Submit pull requests for official Sugar Labs activity repository