# Contributing Guide for SugarLabs Website ([www-v2](https://github.com/sugarlabs/www-v2))

## Table of Contents

- [New Contributors](#new-contributors)
- [Keep in Mind](#keep-in-mind)
- [Code Quality Notes](#code-quality-notes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup and Installation](#setup-and-installation)
- [Development Workflow](#development-workflow)
  - [1. Sync with Upstream](#1-sync-with-upstream)
  - [2. Create a New Branch](#2-create-a-new-branch)
  - [3. Make Your Changes](#3-make-your-changes)
  - [4. Committing Changes](#4-committing-changes)
- [Checklist before Commits](#checklist-before-commits)
- [Pushing Changes](#pushing-changes)

## New Contributors

Use the [discussions](https://github.com/sugarlabs/www-v2/discussions/) tab at the top of
the repository to:

- Ask questions you're wondering about.
- Share ideas.
- Engage with other community members.

Feel free. But, please don't spam :p.

## Keep in Mind

1. Your contributions need not necessarily have to address any discovered issue. If you encounter any,
   feel free to add a fix through a PR, or create a new issue ticket.

2. Use [labels](https://github.com/sugarlabs/www-v2/labels) on your issues and PRs.

3. Do not spam with lots of PRs with little changes.

4. If you are addressing a bulk change, divide your commits across multiple PRs, and send them one at
   a time. The fewer the number of files addressed per PR, the better.

5. Communicate effectively. Go straight to the point. Don't write unnecessary comments; don't be
   over-apologetic. Every single contribution is welcome, as long as it doesn't spam or distract the flow.

6. Write useful, brief commit messages. Add commit descriptions if necessary. PR name should speak
   about what it is addressing and not the issue. In case a PR fixes an issue, use `fixes #ticketno` or
   `closes #ticketno` in the PR's comment. Briefly explain what your PR is doing.

7. Always test your changes extensively before creating a PR. There's no sense in merging broken code.
   If a PR is a _work in progress (WIP)_, convert it to draft. It'll let the maintainers know it isn't
   ready for merging.

8. Read and revise the concepts about programming constructs you're dealing with. You must be clear
   about the behavior of the language or compiler/transpiler. See
   [JavaScript docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [TypeScript docs](https://www.typescriptlang.org/docs/).

9. If you have a question, do a _web search_ first. If you don't find any satisfactory answer, then
   ask it in a comment. If it is a general question, please use the new
   [discussions](https://github.com/sugarlabs/www-v2/discussions) tab on top the the repository, or
   the _Sugar-dev Devel <[sugar-devel@lists.sugarlabs.org](mailto:sugar-devel@lists.sugarlabs.org)>_ mailing
   list. Don't ask silly questions (unless you don't know it is silly ;p) before searching it on the web.

## Code Quality Notes

1. Sticking to _TypeScript_ conventions, use _camelCase_ for filenames (_PascalCase_ for _class_ files),
   _CAPITALCASE_ for constants, _camelCase_ for identifiers, and _PascalCase_ for _classes_. Linting has
   been strictly configured. A `super-linter` is configured to lint check the files on a pull request.
   In fact, the _TypeScript_ watcher or build will throw errors/warnings if there are linting problems.
   This has been done to maintain code quality.

2. If a PR is addressing an issue, prefix the branch name with the issue number. For example, say a
   PR is addressing issue `100`, a branch name could be `100-patch-foobar`.

3. Meaningfully separate code across commits. Don't create arbitrary commits. In case it gets dirty,
   please do an _interactive rebase_ with _squash_ and _reword_ to improve.

4. Follow [conventional commit messages specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
   to help issue tracking. More often than not, take time to add meaningful commit descriptions. However,
   add specificity by mentioning the component; prefer `feat(mycomponent): [UI] add button` over
   `feat: add button`, `fix(mycomponent): use try-catch` over `fix: use try-catch`, etc.

5. At any point, when new components are created or existing components are modified, unit tests (passing)
   reflecting the changes need to be part of the PR before being reviewed.

6. Two workflows -- a _Continuous Integration_ (_CI_) and a _Linter_ (_Super Linter_), have been configured.
   Each PR must pass the checks before being reviewed.

7. For any new functions/methods or classes, add extensive [TSDoc](https://tsdoc.org/) documentation.

8. Each PR needs to have supporting unit tests covering all (or as much practical) use cases to qualify
   for review. In case testing is done via some non-standard method, adequate description of the method/s
   need/s to be specified in the PR body.

## Getting Started

Ready to contribute? Here's how to set up [www-v2](https://sugarlabs.org) for local development.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. We recommend using the latest LTS version.
- **Git**: Ensure Git is installed on your machine.

### Setup and Installation

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page to create your own copy.

2. **Clone your fork**:

   ```bash
   git clone https://github.com/<your-username>/www-v2.git
   cd www-v2
   ```

3. **Add upstream remote**:
   This ensures you can keep your fork synced with the original repository.

   ```bash
   git remote add upstream https://github.com/sugarlabs/www-v2.git
   ```

   - confirm: run `git remote -v`. You should see two remotes: `origin` and `upstream`.

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to the URL shown (usually `http://localhost:5173`) to see the application running.

## Development Workflow

### 1. Sync with Upstream

Before starting any new work, make sure your local `main` branch is up to date.

```bash
git checkout main
git pull upstream main
git push origin main
```

### 2. Create a New Branch

Always create a new branch for your changes. Use descriptive names with prefixes like `feat` or `bug`/`fix`.

```bash
# For a new feature
git switch -c feat/my-new-feature

# For a bug fix
git switch -c fix/issue-number-description
```

### 3. Make Your Changes

Implement your feature or fix. Remember to follow the [Code Quality Notes](#code-quality-notes).

### 4. Committing Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

- Use prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
- Example: `feat: add new gallery component` or `fix: resolve navigation bug`.

## Checklist before Commits

Before submitting a Pull Request, please ensure you have checked the following:

- **Linting (TypeScript/JavaScript)**: Ensure there are no linting errors.

  ```bash
  npm run lint:ts
  ```

- **Linting (Markdown)**: Ensure documentation is correctly formatted.

  ```bash
  npm run lint:md
  ```

- **Formatting**: Format your code using Prettier.

  ```bash
  npm run format
  ```

  - To verify formatting without changing files:

      ```bash
      npm run format:check
      ```

- **Build Check**: Verify that the application builds successfully.

  ```bash
  npm run build
  ```

### Keeping your Branch Up-to-Date

If the upstream `main` branch has moved forward while you were working:

```bash
git checkout main
git pull upstream main
git checkout your-branch-name
git rebase main
```

Resolve any conflicts if they arise.

## Pushing Changes

After making your changes and verifying that all checks pass, add, commit and push your branch to your fork:

```bash
git add .
git commit -m "your commit message"
git push -u origin <your-branch-name>
```

> The `-u` flag sets the upstream tracking for the branch. You only need to do this for the first push of a new branch.

For subsequent pushes, simply run:

```bash
git push
```
