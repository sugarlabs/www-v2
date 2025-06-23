---
title: "GSoC '25 Week 3 Update by Safwan Sayeed"
excerpt: "AST to IR Compilation Logic and Pseudocode Implementation"
category: "DEVELOPER NEWS"
date: "2025-06-22"
slug: "2025-06-22-gsoc-25-sa-fw-an-week3"
author: "@/constants/MarkdownFiles/authors/safwan-sayeed.md"
tags: "gsoc25,sugarlabs,week3,sa-fw-an"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 3 Progress Report by Safwan Sayeed

**Project:** Music Blocks 4 Program Engine  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/), [Sumit Srivastava](https://github.com/sum2it)  
**Assisting Mentors:** [Devin Ullibari](https://github.com/pikurasa/), [Walter Bender](https://github.com/walterbender)  
**Reporting Period:** 2025-06-16 - 2025-06-22  

---

## A Blog-style Retrospective

This week marked a significant milestone in our Music Blocks program engine development as we transitioned from the foundational memory architecture to the core compilation logic. The focus shifted to implementing the AST-to-IR (Intermediate Representation) translation layer - the crucial bridge between our abstract syntax tree representation and executable code.

The challenge was designing a static compilation system that converts AST nodes into a linear sequence of IR instructions, following the three-address code format. Working with complex expression hierarchies and statement blocks required careful consideration of instruction ordering and variable management.

Our mentors provided invaluable guidance on maintaining the static nature of the compilation process, emphasizing that we're translating program structure rather than executing runtime calculations. This distinction was crucial for keeping our implementation focused and efficient.

---

## Goals for This Week

- Complete the AST-to-IR compilation logic technical specification with detailed pseudocode patterns.
- Implement evaluate() methods for all expression classes returning instruction lists.
- Develop pseudocode for simple statements following the established IR generation patterns.
- Design the instruction chaining mechanism for complex nested expressions.

---

## This Week's Highlights

1. **IR Compilation Logic Specification**  
   - Expanded the tech spec with comprehensive AST-to-IR translation documentation covering expression and statement compilation patterns.
   - Detailed instruction list generation requirements and variable management strategies.
   - Link: [IR Compilation Logic](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.i655udul8zuq)

2. **AST-to-IR Pseudocode Implementation**  
   - Implemented evaluate() methods for all expression classes (Literal, Binary/Unary Operators, Arrays, Dictionaries, etc.)
   - Developed instruction list generation patterns following three-address code format
   - Created symbol table integration using sym_query, sym_declare, and sym_assign operations
   - Link: [Tech Spec Document - AST to IR Methods](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.87123fra3s4#heading=h.gqjcwrtkdgvq)

3. **Simple Statements Compilation Logic**  
   - Implemented pseudocode for VariableDeclarationStatement, VariableAssignmentStatement, FunctionCallStatement, and JumpStatement
   - Established parameter passing patterns for evaluate() methods ensuring proper instruction dependency chains

---

## Challenges & Solutions

- **Understanding Static vs Runtime Compilation:**  
  Initially confused about whether we were performing runtime calculations or static code translation.  
  *Solution:* Mentors clarified that this is purely static AST-to-IR conversion with no runtime execution, helping focus the implementation approach.


---

## Key Learnings

- Mastered the distinction between static compilation and runtime execution in compiler design.
- Gained deep understanding of three-address code generation and instruction dependency management.
- Enhanced skills in designing clean pseudocode patterns that can be translated to actual implementation.
- Learned the importance of maintaining consistent parameter passing patterns across class hierarchies.

---

## Next Week's Roadmap

- Implement pseudocode for compound statements.
- Design basic block generation logic for control flow structures.
---

## Resources & References

- **Tech Spec:** [IR Compilation Logic](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.i655udul8zuq)  
- **Tech Spec:** [AST to IR Methods](https://docs.google.com/document/d/1_MCCgl-RqiEQH0UQ4EX-2O6G4iRxgHAY1rZpw3QPXT0/edit?tab=t.87123fra3s4#heading=h.gqjcwrtkdgvq)
- **Repository:** [musicblocks-v4](https://github.com/sugarlabs/musicblocks-v4)

---

## Acknowledgments

Special thanks to my mentors Anindya, Sumit, Devin, and Walter for their crucial guidance on compiler design principles and static compilation concepts. Their clarification on the AST-to-IR translation approach and emphasis on maintaining clean instruction generation patterns was essential for this week's successful progress.

---