---

title: "DMP '26 Final Project Report by Stuti Jain"

excerpt: "A summary of the development of a story-driven Lesson Plans framework for Music Blocks, including ten interactive lessons, contextual help, the Explorer Journal, localization, testing, and documentation."

category: "DEVELOPER NEWS"

date: "2026-10-21"

slug: "2026-10-21-dmp-26-stuti-jain-final-report"

author: "@/constants/MarkdownFiles/authors/stuti-jain.md"

tags: "dmp26,sugarlabs,musicblocks,lessonplans,explorerjournal,finalreport"

image: "assets/Images/dmp_c4gt.logo.png"

---

<!-- markdownlint-disable -->

# Final DMP Project Report by Stuti Jain

**Project:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)  
**Mentors:** [Walter Bender](https://github.com/walterbender), Devin Ulibarri  
**Organization:** [Sugar Labs](https://sugarlabs.org)  
**Project:** DMP '26

---

## Introduction

Music Blocks is a visual programming environment that helps learners explore music, mathematics, and computational thinking through programming. Although the platform offers a wide range of musical tools and blocks, there was an opportunity to make these features easier to explore through structured, interactive lessons.

My DMP project focused on building a story-driven Lesson Plans framework directly inside Music Blocks. The idea was to move beyond static instructions and create a learning experience in which students could follow a story, complete musical activities, discover additional features, receive contextual help, and reflect on what they learned.

Over the course of the project, the initial lesson prototype evolved into a framework containing **10 interactive lessons**, an Explorer Journal, contextual guidance, a scalable lesson data structure, localization groundwork, documentation, and automated tests.

## Project Goals

The main objectives of the project were:

- Build an interactive lesson framework within Music Blocks.
- Connect musical concepts and programming activities through a continuous story.
- Encourage learners to explore beyond the required activities.
- Provide contextual guidance for additional Music Blocks features.
- Give learners a place to record their reflections and notes.
- Make lessons easy to extend and maintain.
- Improve the experience through student testing and mentor feedback.

## 1. Building the Story-Driven Lesson Framework

The project began with designing the story and lesson structure. The lessons were developed around an adventure featuring Lyra and Choon, who explore different locations while recovering the pieces of a lost melody.

Each lesson connects the narrative to a musical or programming activity. Instead of presenting learners with a long list of instructions, the story introduces a problem and encourages them to explore the relevant Music Blocks functionality.

The lesson experience includes:

- Story introductions and illustrated content.
- Musical activities using Music Blocks blocks.
- Optional discovery actions that encourage further exploration.
- Rewards and badges connected to learner progress.
- Hints and contextual help when learners need guidance.
- Reflection opportunities through the Explorer Journal.

The lesson structure was expanded gradually throughout the project, eventually reaching **10 lessons**.

![Story-driven Lesson Plans interface](/assets/Developers/Stuti-Jain/final_lesson_plans.png)

## 2. Extra Actions and Contextual Help

An important part of the project was encouraging learners to explore Music Blocks beyond the main activity.

I developed a system of extra actions that guide learners toward additional features, such as changing octaves, transposing musical patterns, extending musical chunks, and exploring other blocks.

To avoid duplicating existing documentation, these actions were organized into three categories:

1. **Existing toolbar guidance:** Actions already explained in the Help menu or toolbar guide.
2. **Existing block help:** Actions that could use existing block help, with small additions where necessary.
3. **New contextual guidance:** Actions that required a new help card or lesson-specific explanation.

Where possible, the existing Music Blocks help infrastructure was reused and extended. New cards were added only where existing guidance was insufficient.

This approach helped keep the guidance consistent with Music Blocks while making it relevant to the current lesson.

![Contextual help cards for extra actions](/assets/Developers/Stuti-Jain/final_contextual_help.png)

## 3. Explorer Journal

One of the major features developed beyond the initial lesson framework was the **Explorer Journal**.

During early testing, students enjoyed exploring the activities and earning rewards, but there was less opportunity for them to record what they had learned. This led to the idea of adding a journal to support reflection throughout the learning journey.

The Explorer Journal includes:

- Lesson-specific reflection pages.
- Support for multiple entries.
- Editing and deleting existing entries.
- General notes that are not tied to a particular lesson.
- Multiple entries within general notes.
- Integration with the Music Blocks Help menu.

The journal allows learners to revisit their reflections and maintain their own notes while progressing through the lessons.

![Explorer Journal interface](/assets/Developers/Stuti-Jain/final_explorer_journal.png)

## 4. Improving the Interface and Navigation

As the Lesson Plans and Explorer Journal became more feature-rich, it was important to make sure they did not interfere with the main Music Blocks workspace.

Initially, the panels were fixed, which meant learners sometimes had to close them to access other toolbar features. This could interrupt their workflow and risk losing the context of the lesson they were working on.

To improve this experience, I implemented several interface changes:

- Made Lesson Plans and the Explorer Journal draggable.
- Allowed both panels to coexist with the main workspace.
- Added a collapse button to move panels out of the way toward the right side.
- Removed earlier panel-management interactions in favour of a simpler collapse mechanism.
- Added a **Next Lesson** button so learners can move directly to the following lesson without returning to the main menu.

These changes made the lesson interface more flexible and reduced unnecessary navigation.

![Lesson Plans and Explorer Journal working alongside Music Blocks](/assets/Developers/Stuti-Jain/final_panel_navigation.png)

## 5. Making the Lesson System Scalable

As the number of lessons increased, keeping all lesson descriptions, hints, rewards, badges, and extra-action details inside the main implementation became difficult to maintain.

To address this, I separated lesson-specific information into structured **JSON files**.

The lesson data can now be maintained separately from the core lesson implementation, making it easier to:

- Add new lessons.
- Edit existing story content.
- Update lesson-specific hints and extra actions.
- Maintain rewards and badges.
- Organize lesson information consistently.

This separation establishes a clearer distinction between the lesson engine and individual lesson content, making the framework easier for future contributors to extend.

## 6. Localization and Multilingual Support

Another important area of work was exploring how the Practice lessons could be made available in multiple languages.

Music Blocks already has a localization workflow based on POT and PO files. I investigated how this existing system could be used for the larger amount of text contained in the lessons, including story descriptions, instructions, hints, and character dialogue.

The work included:

- Exploring the existing POT/PO translation workflow.
- Investigating how lesson strings can be extracted and organized.
- Preparing a structure for language-specific lesson content.
- Exploring support for Hindi, Spanish, and Japanese.

Spanish translation work was coordinated with Walter, while Japanese translation work was coordinated with Devin.

The goal is to keep lesson logic independent of the displayed language, so that the same learning activities can be made accessible to a wider range of learners. The localization work established a path toward multilingual lessons rather than claiming that every translation was fully completed during the project.

## 7. Testing and Improvements Based on Student Feedback

Testing with children was an important part of the development process. The lessons were tested throughout the project, and feedback was used to refine both the content and the learner experience.

Some of the improvements included:

- Reducing text-heavy explanations and improving visual storytelling.
- Making lesson instructions clearer and more closely connected to the musical activities.
- Revising the context of the Chest, Snap, Clap lesson so learners could better understand what they were expected to do.
- Rearranging the block sequence in Lesson 2 vertically instead of horizontally to make the flow easier to follow.
- Refining contextual guidance and extra actions based on learner interactions.

These changes reinforced the importance of observing how students actually use the system instead of relying only on assumptions made during development.

## 8. Documentation and Automated Testing

To make the project easier to maintain after the DMP, I also worked on contributor documentation and test coverage.

### Documentation

- Added a README in the Lesson Plans area explaining how contributors can work on Lesson Plans and the Explorer Journal.
- Added user-facing documentation to the existing Music Blocks documentation explaining how to use Lesson Plans.
- Added author information to files created during the project.

### Automated tests

Test files were added to cover the Lesson Plans and Explorer Journal implementation. The resulting test coverage for the relevant files reached approximately **86%**.

This provides a foundation for future development and helps catch regressions as new lessons and features are introduced.

## 9. Final Outcome

The project evolved from an initial story and lesson prototype into a broader learning framework integrated into Music Blocks.

The major outcomes include:

- **10 interactive lessons** connected through a story-driven learning experience.
- Extra actions, discovery rewards, badges, and contextual help.
- Explorer Journal with lesson reflections and general notes.
- Draggable and collapsible panels that work alongside the Music Blocks workspace.
- Next Lesson navigation for a smoother progression between lessons.
- JSON-based lesson data for easier maintenance and expansion.
- Localization groundwork for multilingual Practice lessons.
- Documentation for contributors and users.
- Automated tests providing approximately 86% coverage for the relevant Lesson Plans and Explorer Journal files.
- Iterative improvements informed by student testing and mentor feedback.

Several of these features, particularly the Explorer Journal, contextual help, scalable lesson data, and panel integration, extended beyond the original core requirement of creating lesson plans.

## Challenges and Learnings

One of the main challenges was balancing a guided learning experience with the freedom to explore that makes Music Blocks valuable.

The lessons needed enough structure to help students understand what to do, but they also needed to leave room for experimentation. The Explorer Journal and extra-action system helped address this by combining structured activities with independent exploration and reflection.

Another important lesson was that maintainability matters as much as the visible interface. Separating lesson content, reusing existing help resources, adding documentation, and writing tests all make it easier for the community to continue building on the work.

Finally, testing with children showed that small changes to wording, context, and block layout can make a meaningful difference to how easily learners understand a musical activity.

## Final Evaluation Presentation

The endpoint evaluation presentation provides an overview of the project, the milestones achieved, the implemented features, and the remaining direction for the framework.

[View the DMP '26 Endpoint Evaluation Presentation](https://docs.google.com/presentation/d/1dnMOwxG6Aqj9ZaKtvu9FDrgickvbx3WW/edit?usp=sharing&ouid=116555257076685356332&rtpof=true&sd=true)

## Resources and References

- **Project Issue:** [Adding Lesson Plans to Music Blocks](https://github.com/sugarlabs/musicblocks/issues/6607)
- **Music Blocks Repository:** [github.com/sugarlabs/musicblocks](https://github.com/sugarlabs/musicblocks)
- **Sugar Labs:** [sugarlabs.org](https://sugarlabs.org)
- **Lesson 9 Reference:** [Make a Metronome](https://mapflc.com/lesson-plans/make-a-metronome/)
- **Lesson 10 Reference:** [Lesson description document](https://docs.google.com/document/d/1YQ5d-TXucLwZICp74Jd4h1qcXYtPBJTpx5j7T4sybyM/edit?tab=t.0#heading=h.fk2e672kc0nx)
- **Endpoint Evaluation:** [DMP '26 Final Presentation](https://docs.google.com/presentation/d/1dnMOwxG6Aqj9ZaKtvu9FDrgickvbx3WW/edit?usp=sharing&ouid=116555257076685356332&rtpof=true&sd=true)

## Acknowledgments

I would like to thank Walter Bender and Devin Ulibarri for their guidance, feedback, and support throughout the project.

Their suggestions helped shape the lesson structure, contextual help, Explorer Journal, and overall learning experience. I am also grateful for the feedback from the children who tested the lessons, which helped identify improvements that would not have been as obvious during development.

Working on this project gave me the opportunity to contribute to an open-source educational tool while learning how to build a feature that is not only functional, but also useful, maintainable, and shaped by the needs of its learners.

