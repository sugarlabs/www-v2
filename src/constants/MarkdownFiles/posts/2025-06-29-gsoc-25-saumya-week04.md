---

title: "GSoC '25 Week 04 Update by Saumya Shahi"
excerpt: "This week focused on implementing advanced tree rendering with nested, stacked, and argument brick support, dynamic sizing for the masonry module."
category: "DEVELOPER NEWS"
date: "2025-06-29"
slug: "2025-06-29-gsoc-25-saumya-shahi-week04"
author: "@/constants/MarkdownFiles/authors/saumya-shahi.md"
tags: "gsoc25,sugarlabs,week04,saumya-shahi"
image: "assets/Images/GSOC.webp"
---

<!-- markdownlint-disable -->

# Week 04 Progress Report by Saumya Shahi

**Project:** [Masonry Module - Music Blocks v4](https://github.com/sugarlabs/musicblocks-v4)  
**Mentors:** [Anindya Kundu](https://github.com/meganindya/)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-06-22 – 2025-06-29  

---

## Goals for This Week

- Implement advanced tree rendering with nested, stacked, and argument brick support
- Develop dynamic brick sizing based on content and children
- Create comprehensive validation systems for brick connections
- Establish robust rendering algorithms with proper traversal strategies
- Integrate the complete tree rendering system into the storybook

---

## This Week's Achievements

### 1. **Advanced Tree Rendering System Implementation**

Developed a brick tree rendering system that handles three distinct connection types:

#### **Stacked Tree Rendering**
- **Vertical Stacking**: Bricks can be connected vertically in sequence below their parent
- **Cumulative Height Calculation**: Total height of stacked trees is calculated by summing individual brick heights
- **Width Optimization**: Stacked trees maintain optimal width by taking the maximum width of all stacked bricks
![stacked bricks in storybook](assets/Images/storybook_stacked_bricks.webp)

#### **Argument Brick Rendering**
- **Expression-Only Validation**: Implemented validation ensuring only Expression bricks can be used as arguments
- **Slot-Based Positioning**: Argument bricks are positioned at specific argument slots on their parent bricks
- **Dynamic Slot Management**: Parent bricks automatically adjust their argument slots based on the number of arguments
![argument bricks in storybook](assets/Images/storybook_argument_bricks.webp)

#### **Nested Tree Rendering**
- **Multi-Level Nesting**: Implemented support for bricks nested inside compound bricks, which can themselves contain nested bricks
- **Dynamic Sizing**: Parent bricks automatically resize based on their nested children's bounding boxes
- **Proper Positioning**: Nested bricks are positioned at calculated connection points within their parent containers
![nested bricks in storybook](assets/Images/storybook_nested_bricks.webp)

### 2. **Dynamic Brick Sizing and Layout System**

#### **Label Width Adjustment**
- **Dynamic Text Measurement**: Implemented canvas-based text measurement for accurate label width calculation
- **Real-Time Updates**: Brick dimensions update automatically when labels change
- **Fallback System**: Robust fallback for server-side rendering when canvas is unavailable
![argument bricks position according to label bounding box calculations](assets/Images/storybook_label_Bbox.webp)

#### **Child-Based Resizing**
- **Bounding Box Calculation**: Parent bricks recalculate their bounding boxes based on their children's dimensions
- **Compound Brick Layout**: Compound bricks expand their nested regions to accommodate all nested children
- **Automatic Geometry Updates**: Brick geometry updates trigger re-rendering with new dimensions
![expanded nested region according to child bricks](assets/Images/storybook_nested_Bbox.webp)

### 3. **Advanced Rendering Algorithms**

#### **Two-Phase Rendering Strategy**
- **Phase 1 - Preorder Traversal**: Calculate all bounding boxes and dimensions from root to leaves
- **Phase 2 - Postorder Traversal**: Render from leaves to root, ensuring children appear on top of parents
- **Z-Index Management**: Proper layering prevents visual conflicts between nested elements

#### **Bounding Box Computation**
```typescript
function computeBoundingBoxes(allNodes: Map<string, ExtendedTreeNode>) {
  // Preorder traversal for dimension calculation
  // Handles nested, argument, and stacked children
  // Updates compound brick layouts with nested content
  // Returns comprehensive bounding box map
}
```

### 4. **Comprehensive Validation Systems**

#### **Brick Type Validation**
- **Nesting Validation**: Only Compound and Simple bricks can be nested inside other bricks
- **Argument Validation**: Only Expression bricks can be used as arguments
- **Connection Validation**: Ensures compatible brick types for different connection types

#### **Connection Point Validation**
- **Notch Compatibility**: Validates that connecting bricks have compatible notch types
- **Slot Availability**: Ensures argument slots are available before allowing connections
- **Nested Space Validation**: Verifies sufficient space in compound bricks for nested children

### 5. **Brick Model System**

Refined the brick model architecture with advanced features:
- **SimpleBrick**: Basic statement bricks with configurable notches and argument support
- **ExpressionBrick**: Value-holding bricks with expression support and argument-only usage
- **CompoundBrick**: Container bricks with nested children support and dynamic sizing

---

## Technical Implementation Details

### Advanced Tree Structure
```typescript
interface ExtendedTreeNode extends TTreeNode {
  isNested?: boolean;    // Indicates nested brick
  argIndex?: number;     // Argument slot index
  children?: {
    nested: ExtendedTreeNode[];
    args: ExtendedTreeNode[];
    stacked: ExtendedTreeNode[];
  };
}
```

### Dynamic Sizing Algorithm
```typescript
function updateCompoundBrickLayouts(nodes: Map<string, ExtendedTreeNode>) {
  // Calculate total nested content dimensions
  // Update compound brick's bboxNest array
  // Trigger geometry recalculation
  // Update connection points
}
```

### Validation System
```typescript
function validateBrickConnection(parent: BrickModel, child: BrickModel, type: ConnectionType) {
  switch(type) {
    case 'nested':
      return parent.type === 'Compound' || parent.type === 'Simple';
    case 'argument':
      return child.type === 'Expression';
    case 'stacked':
      return child.type !== 'Expression'; // expression brick can't be stacked
  }
}
```

---

## Challenges & How I Overcame Them


### Challenge 1: Compound Brick Layout with Multiple Nested Children
**Problem**: Compound bricks needed to accommodate multiple nested children with varying sizes and positions.               
**Solution**: Implemented a two-phase approach: first calculate all child dimensions, then update parent bounding boxes and trigger geometry recalculation. Developed a recursive algorithm that calculates bounding boxes bottom-up, then renders top-down with proper z-indexing to ensure children appear above parents.

### Challenge 2: Label Width Calculation and Dynamic Updates
**Problem**: Bricks needed to resize based on their label text, requiring accurate text measurement and real-time updates.
**Solution**: Implemented canvas-based text measurement with fallback for server-side rendering, and integrated it into the brick geometry update system.

![Brick Layout with Multiple Nested Children](assets/Images/storybook_compundBrick_multipleLevels.webp)

---

## Key Learnings

- **Advanced Tree Algorithms**: Deep understanding of preorder/postorder traversal for different rendering phases
- **Dynamic Layout Systems**: Learned how to implement responsive layouts that adapt to content changes
- **Canvas Text Measurement**: Mastered techniques for accurate text measurement in web environments
- **Z-Index Management**: Gained expertise in managing visual layering in complex nested structures
- **Type-Safe Validation**: Enhanced skills in creating comprehensive validation systems with TypeScript

---

## Resources & References

- **Tree Traversal Algorithms**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- **Canvas Text Measurement**: [MDN Canvas Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- **TypeScript Validation Patterns**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their guidance and support. Special thanks to the community for providing valuable feedback on the tree model design and implementation.

---
