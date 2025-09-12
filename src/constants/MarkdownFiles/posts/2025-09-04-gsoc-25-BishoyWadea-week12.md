---
title: "GSoC '25 Week 12 Update by Bishoy Wadea"
excerpt: "Sequence Wizard - AI-Powered Pattern Learning"
category: "DEVELOPER NEWS"
date: "2025-09-04"
slug: "gsoc-25-BishoyWadea-week12"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,week12,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Week 12 Progress Report by Bishoy Wadea

**Project:** [Sequence Wizard](https://github.com/Bishoywadea/Sequence-Wizard)  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-08-29 – 2025-09-04  

---

## Goals for This Week

- **Develop new Sugar activity: Sequence Wizard**
- **Implement AI-powered sequence prediction system**
- **Create adaptive learning mechanism for pattern recognition**

---

## About Sequence Wizard

Sequence Wizard is an innovative AI-powered educational tool that learns to predict the next number in mathematical sequences. Unlike traditional pattern games, this activity features a sophisticated AI that improves its predictions through user feedback, creating a unique collaborative learning experience between student and machine.

---

## Achievements

### Core Framework

- **Activity Structure**  
  Established basic Sugar activity framework with modular architecture  
  [Commit](https://github.com/Bishoywadea/Sequence-Wizard/commit/eb35d55d322b75940b032b3e9b487d6105dd4c84)

- **Modular Design**  
  Split prediction logic into separate files for better maintainability  
  [Commit](https://github.com/Bishoywadea/Sequence-Wizard/commit/fbe7731cc4857d1e77193532ce14e125952a8b55)

![Sequence Wizard Interface](https://raw.githubusercontent.com/Bishoywadea/Sequence-Wizard/refs/heads/main/screen_shots/01.png)
*Main interface showing sequence input and AI prediction*

### AI Learning System

- **Feedback Mechanism**  
  Created user feedback system for training the AI  
  [Commit](https://github.com/Bishoywadea/Sequence-Wizard/commit/1bc971e55d8876cb2ad356b0ead069150cbc43c8)

- **Data Persistence**  
  Implemented saving of learned patterns for continuous improvement  
  [Commit](https://github.com/Bishoywadea/Sequence-Wizard/commit/4a24130a28f56bcb23c0385dfe0d9ee7b493019c)


![Learning in Action](https://raw.githubusercontent.com/Bishoywadea/Sequence-Wizard/refs/heads/main/screen_shots/02.png)
*AI learning from user feedback on incorrect predictions*

---

## How It Works

1. **Enter Sequence**: Type numbers separated by spaces or commas
2. **Get Prediction**: Click "Predict Next Number" to see AI's guess
3. **Give Feedback**: Mark the prediction as Correct or Wrong
4. **Teach AI**: If wrong, provide the correct answer to train the AI

---

## Challenges & Solutions

- **Challenge:** Creating an AI system that could learn from limited examples while being computationally efficient for XO laptops.

- **Solution:**  
  - Implemented a hierarchical rule system that tries simple patterns first
  - Used lightweight pattern matching algorithms instead of heavy ML frameworks
  - Created a confidence scoring system to prioritize learned patterns
  - Optimized memory usage by storing only successful pattern templates

- **Challenge:** Making the AI's learning process transparent and educational for students.

- **Solution:**  
  - Added visual feedback showing which rule the AI used for prediction
  - Implemented explanation system that shows the AI's "thinking process"
  - Designed the interaction to feel like teaching a friend rather than using a tool

---

## Key Learnings

- Developed understanding of pattern recognition algorithms and their educational applications
- Learned to implement lightweight machine learning suitable for resource-constrained environments
- Gained experience in creating interactive AI systems that learn from user feedback
- Improved skills in designing educational tools that make abstract concepts tangible

---

## Technical Highlights

- **4-Level Hierarchy**: Rule-based system with increasing complexity levels
- **Adaptive Learning**: AI improves accuracy through user corrections
- **Pattern Memory**: Stores successful patterns for future recognition
- **Lightweight Design**: Optimized for low-resource Sugar environments

---

## Next Week's Roadmap

- Begin development of new Sugar activity: **AI Organizer**