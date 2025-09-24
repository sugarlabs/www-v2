---
title: "GSoC’25 Final Report by Bishoy Wadea"
excerpt: "Developing 10 Math Sugar Activities"
category: "DEVELOPER NEWS"
date: "2025-09-12"
slug: "2025-09-12-gsoc-25-bishoy-wadea-final-report"
author: "@/constants/MarkdownFiles/authors/bishoy-wadea.md"
tags: "gsoc25,sugarlabs,Final-Report,BishoyWadea"
image: "assets/Images/GSOC.webp"
---

# Google Summer of Code 2025: Educational Activities for Sugar

**Project:** Developing 10 Math Sugar Activities  
**Mentors:** [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentor:** [Walter Bender](https://github.com/walterbender/)  
**Reporting Period:** 2025-05-08 – 2025-09-12  

---

During Google Summer of Code 2025, I embarked on an ambitious journey to develop ten innovative educational activities for the Sugar learning platform. My mission was to create engaging, educational experiences that would enhance various cognitive skills in young learners through interactive gameplay and cutting-edge technologies. Throughout this project, I focused on implementing diverse educational concepts ranging from classic puzzles to AI-powered learning tools, ensuring each activity not only served its educational purpose but also captivated users with intuitive interfaces and engaging mechanics.

This project allowed me to explore various domains including game development, 3D graphics, network programming, and machine learning, while contributing meaningfully to the Sugar community. Through challenges and triumphs, I successfully delivered a comprehensive suite of activities that span mathematical reasoning, spatial intelligence, pattern recognition, and artificial intelligence education.

## Table of Activities

| **Activities** |
|----------------|
| [![Four Color Map Puzzle](https://raw.githubusercontent.com/sugarlabs/Four-Color-Map/e82f9972550ff44e6d400394e4fb53d3eb24d11a/activity/activity-fourcolormap.svg)](https://github.com/sugarlabs/Four-Color-Map) |
| [![Broken Calculator](https://raw.githubusercontent.com/sugarlabs/Broken-Calculator/main/activity/activity-brokencalculator.svg)](https://github.com/sugarlabs/Broken-Calculator) |
| [![Soma Cube](https://raw.githubusercontent.com/sugarlabs/Soma-Cube/main/activity/activity-somacube.svg)](https://github.com/sugarlabs/Soma-Cube) |
| [![Fifteen Puzzle](https://raw.githubusercontent.com/sugarlabs/FifteenPuzzle/86fcd04db881c39b1734a5416cf87042a9f9bb08/activity/puzzle.svg)](https://github.com/Bishoywadea/FifteenPuzzle) |
| [![Euclid's Game](https://raw.githubusercontent.com/sugarlabs/Euclid-s-Game/main/activity/activity-euclids.svg)](https://github.com/sugarlabs/Euclid-s-Game) |
| [![Odd Scoring](https://raw.githubusercontent.com/sugarlabs/Odd-Scoring/main/activity/activity-oddscoring.svg)](https://github.com/sugarlabs/Odd-Scoring) |
| [![Magic Number Grid](https://raw.githubusercontent.com/sugarlabs/Magic-Number-Grid/b6cc4e11b2c0db7326c6111b6cac046c928d13af/activity/activity-magicnumbergrid.svg)](https://github.com/sugarlabs/Magic-Number-Grid) |
| [![Rubik's Cube](https://raw.githubusercontent.com/sugarlabs/Rubik-s-Cube/refs/heads/main/activity/activity-rubiccube.svg)](https://github.com/sugarlabs/Rubik-s-Cube) |
| [![Sequence Wizard](https://raw.githubusercontent.com/sugarlabs/Sequence-Wizard/refs/heads/main/activity/activity-sequencewizard.svg)](https://github.com/sugarlabs/Sequence-Wizard) |
| [![AI Organizer](https://raw.githubusercontent.com/sugarlabs/AI-Organizer/14177a295a5c4143313dc1ef67dabd97d227435f/activity/activity-aiorganizer.svg)](https://github.com/sugarlabs/AI-Organizer) |



## Detailed Activities Description

### Four Color Map Puzzle | [GitHub Repo](https://github.com/Bishoywadea/Four-Color-Map)
The **Four Color Map Puzzle** brings the famous four-color theorem to life as an interactive educational game. Players must color different regions of real-world maps (Egypt, USA, Nigeria, India) using only four colors, ensuring no adjacent regions share the same color. This activity teaches logical reasoning, constraint satisfaction, and introduces children to basic graph theory concepts through an engaging visual interface.

**Key Features:**
- Real geographical maps converted from GeoJSON data
- Interactive coloring with constraint validation
- Undo/redo functionality and help system
- Child-friendly UI with zoom capabilities

![Four Color Map Puzzle](https://raw.githubusercontent.com/Bishoywadea/Four-Color-Map/refs/heads/main/screen_shots/02.png)

---

### Broken Calculator | [GitHub Repo](https://github.com/Bishoywadea/Broken-Calculator)
The **Broken Calculator** challenges players to reach target numbers using a calculator with limited functionality. Only certain digits and operations are available, forcing players to think creatively about mathematical operations and number relationships. This activity enhances mental math skills and problem-solving abilities.

**Key Features:**
- Dynamic puzzle generation with varying difficulty
- Restricted digit/operator sets for each puzzle
- Scoring system and completion animations

![Broken Calculator](https://raw.githubusercontent.com/Bishoywadea/Broken-Calculator/refs/heads/main/screen_shots/02.png)

---

### Soma Cube | [GitHub Repo](https://github.com/Bishoywadea/Soma-Cube)
The **Soma Cube** is a 3D spatial reasoning puzzle where players must assemble seven unique polycube pieces into a 3×3×3 cube. This activity develops three-dimensional visualization skills and spatial intelligence through hands-on manipulation of 3D objects.

**Key Features:**
- Interactive 3D piece manipulation
- Rotation and positioning controls
- Video tutorial integration
- Visual feedback for correct placement

<div style="max-width:800px; margin:0 auto;">
  <iframe
    width="100%"
    height="450"
    src="https://www.youtube.com/embed/Q4BKp3Yo3Uw"
    title="Soma Cube Tutorial"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

---

### Fifteen Puzzle | [GitHub Repo](https://github.com/Bishoywadea/FifteenPuzzle)
The classic **Fifteen Puzzle** reimagined for Sugar, where players slide numbered tiles to arrange them in order. This timeless puzzle develops logical thinking and planning skills while providing a satisfying challenge for all ages.

**Key Features:**
- Smooth tile animations
- Move counter and completion detection
- Responsive grid layout
- Help overlay with instructions

![Fifteen Puzzle](https://raw.githubusercontent.com/sugarlabs/FifteenPuzzle/refs/heads/main/screenshots/en/03.png)

---

### Euclid's Game | [GitHub Repo](https://github.com/Bishoywadea/Euclid-s-Game)
**Euclid's Game** is a mathematical strategy game based on the Euclidean algorithm. Two players take turns creating new numbers by finding differences between existing numbers, with the goal of forcing their opponent into a position with no valid moves. This activity teaches number theory concepts and strategic thinking.

**Key Features:**
- Single-player (vs AI) and multiplayer modes
- Network multiplayer support across devices
- Journal integration for game saves
- AI opponent with multiple difficulty levels

<div style="max-width:800px; margin:0 auto;">
  <iframe
    width="100%"
    height="450"
    src="https://www.youtube.com/embed/42-uk2LwToo"
    title="Euclid’s Game Sugar activity"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

---

### Odd Scoring | [GitHub Repo](https://github.com/Bishoywadea/Odd-Scoring)
**Odd Scoring** is a strategic puzzle game with unique scoring mechanics that challenge conventional thinking. Players must carefully plan their moves to maximize points while considering the odd scoring rules that reward unconventional strategies.

**Key Features:**
- Network multiplayer functionality
- Theme switching capabilities
- PNG-based graphics for consistency
- Journal integration for state persistence
- Sugar-compliant UI design

<div style="max-width:800px; margin:0 auto;">
  <iframe
    width="100%"
    height="450"
    src="https://www.youtube.com/embed/MMVlzYffTiE"
    title="YouTube video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

---

### Magic Number Grid | [GitHub Repo](https://github.com/Bishoywadea/Magic-Number-Grid)
The **Magic Number Grid** is a Latin Square puzzle where players fill a grid ensuring each number appears exactly once in every row and column. This mathematical puzzle enhances logical reasoning and pattern recognition skills through increasingly complex challenges.

**Key Features:**
- Multiple difficulty levels (4×4, 6×6, 8×8 grids)
- Note-taking system for strategic planning
- Visual feedback for duplicate numbers
- Help system with game instructions
- Sugar-style dialog windows

![Magic Number Grid](https://raw.githubusercontent.com/Bishoywadea/Magic-Number-Grid/refs/heads/main/screen_shots/02.png)

---

### Rubik's Cube | [GitHub Repo](https://github.com/Bishoywadea/Rubiks-Cube)
A fully interactive 3D **Rubik's Cube** implementation that brings the classic puzzle to Sugar. This activity develops spatial reasoning and problem-solving skills through manipulation of the iconic 3×3×3 cube puzzle.

**Key Features:**
- Full 3D graphics with OpenGL integration
- Mouse-based view rotation
- Complete set of cube moves (18 standard rotations)
- Keyboard shortcuts for experienced users
- Scramble and reset functions

![Rubik's Cube](https://raw.githubusercontent.com/Bishoywadea/Rubik-s-Cube/refs/heads/main/screen_shots/02.png)

---

### Sequence Wizard | [GitHub Repo](https://github.com/Bishoywadea/Sequence-Wizard)
**Sequence Wizard** is an innovative AI-powered educational tool where students teach an artificial intelligence to recognize and predict mathematical sequences. Through interactive feedback, the AI learns from its mistakes and improves its pattern recognition abilities.

**Key Features:**
- Multiple sequence types (arithmetic, geometric, factorial, quadratic)
- Adaptive AI that learns from user corrections
- Hierarchical rule system for pattern detection
- Persistent learning across sessions
- Educational explanations of AI reasoning

![Sequence Wizard](https://raw.githubusercontent.com/Bishoywadea/Sequence-Wizard/refs/heads/main/screen_shots/02.png)

---

### AI Organizer | [GitHub Repo](https://github.com/Bishoywadea/AI-Organizer)
The **AI Organizer** introduces young learners to machine learning through an image classification system. Students can explore how computers "see" and categorize images, making abstract AI concepts tangible and understandable.

**Key Features:**
- Image classification into animals, shapes, numbers, and objects
- Visual confidence indicators
- Educational explanations of AI decisions
- Optimized for low-resource devices
- Child-friendly interface

![AI Organizer](https://raw.githubusercontent.com/Bishoywadea/AI-Organizer/refs/heads/main/screen_shots/02.png)

---

---

## Weekly Blogs

Throughout the summer, I documented my progress in weekly blog posts.  
These updates include detailed explanations of challenges, solutions, and milestones for each week of the program.

| **Week** | **Blog Link** |
|----------|----------------|
| Week 1   | [GSoC ’25 Week 1 Update](https://www.sugarlabs.org/news/all/2025-06-07-gsoc-25-BishoyWadea-week01) |
| Week 2   | [GSoC ’25 Week 2 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week01) |
| Week 3   | [GSoC ’25 Week 3 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week03) |
| Week 4   | [GSoC ’25 Week 4 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week04) |
| Week 5   | [GSoC ’25 Week 5 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week05) |
| Week 6   | [GSoC ’25 Week 6 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week06) |
| Week 7   | [GSoC ’25 Week 7 Update]() |
| Week 8   | [GSoC ’25 Week 8 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week08) |
| Week 9   | [GSoC ’25 Week 9 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week09) |
| Week 10  | [GSoC ’25 Week 10 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week10) |
| Week 11  | [GSoC ’25 Week 11 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week11) |
| Week 12  | [GSoC ’25 Week 12 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week12) |
| Week 13  | [GSoC ’25 Week 13 Update](https://www.sugarlabs.org/news/all/gsoc-25-BishoyWadea-week13) |

---


---

## Challenges Overcome

### Technical Challenges

**Sugar OS Compatibility**
- Initially faced numerous compatibility issues with Sugar's unique environment
- Solution: Deep dive into Sugar's API documentation and extensive testing on actual Sugar environments
- Result: All activities now run seamlessly on Sugar OS

**Resource Constraints**
- XO laptops have limited processing power and memory
- Solution: Implemented efficient algorithms, lazy loading, and optimized graphics
- Result: Smooth performance across all target devices

**Network Multiplayer Implementation**
- Sugar's collaboration framework required specific implementation patterns
- Solution: Studied existing Sugar activities and adapted best practices
- Result: Robust multiplayer functionality in multiple activities

## Key Learnings

### Technical Skills
- **Game Development**: Mastered Pygame for 2D games and PyOpenGL for 3D graphics
- **Network Programming**: Learned real-time synchronization and state management
- **ML Integration**: Gained experience deploying ML models in resource-constrained environments
- **UI/UX Design**: Developed skills in creating child-friendly educational interfaces

### Soft Skills
- **Project Management**: Successfully managed 10 different activities simultaneously
- **Open Source Contribution**: Learned best practices for code organization, documentation, and community interaction
- **Communication**: Improved ability to explain complex concepts simply

---

## Acknowledgments

This incredible journey would not have been possible without the support and guidance of many individuals:

**Mentors**
- **[Ibiam Chihurumnaya](https://github.com/chimosky)**: For patient guidance, constructive feedback, and constant encouragement throughout the project

**Sugar Labs Community**
- The entire Sugar Labs community for creating an environment that prioritizes children's education

**Google Summer of Code**
- Thank you to Google for organizing this program that connects students with open source organizations

---

## Conclusion

This GSoC journey has been transformative. The ten activities created represent not just code, but opportunities for children worldwide to learn through play. From logical puzzles to AI-powered learning tools, each activity targets specific educational goals while remaining engaging and accessible.

I'm grateful for the opportunity to contribute to Sugar Labs and excited about the potential impact of these tools on education. The open source nature ensures they will continue to evolve, reaching more children and adapting to new educational needs.

Thank you to everyone who made this journey possible. Here's to the future of open source education!