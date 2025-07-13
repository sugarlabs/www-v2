# Developer's Guide

## Getting the code

1. Fork this repository,

2. Clone your forked copy of the project;

   ```bash
   git clone https://github.com/<your_user_name>/www-v2.git
   ```

3. Change to the project directory;

   ```bash
   cd www-v2
   ```

## Setup Development Environment

This is a _**TypeScript**_ project that uses _**React**_. You'll just need _[**Node.js**](https://nodejs.org/en) and _**npm**\_ installed on your development machine.
Although, this is sufficient to run, build, and test the project as a whole, you might need some
extra tools for other development tasks.

You'll need _**tsc**_ (_TypeScript Compiler_) to manually compile `.ts` files. You'll need
_**ts-node**_ (_Node.js executable for TypeScript_) to manually execute `.ts` scripts directly. Finally,

Once _**npm**_ is installed, to install the above, run

```bash
npm i -g typescript
npm i -g ts-node
```

_**Note:**_ Users on _Linux_ and _MacOS_ are required to add a `sudo` before these commands.

Check installation using

```bash
node -v && npm -v && tsc -v && ts-node -v
```

Output should look like

```bash
v23.7.0
11.1.0
Version 5.7.3
v10.9.2
```

## Commands

After you are set-up, the steps you take depend on what you want to do:

- **Run a development server**
  1. To install all the dependencies (in `package.json`), run

     ```bash
     npm install
     ```

  2. Run _React scripts_.
     - For unoptimized development serving, run

       ```bash
       npm run dev
       ```

       Visit `localhost:5173` in a browser to view the web page served.

     - For generating a generic production build, run

       ```bash
       npm run build
       ```

     - For generating a production build under the subdirectory `/www-v2`, run

       ```bash
       npm run build
       ```

     - For serving the last production build (`dist` folder), run

       ```bash
       npm run preview
       ```

       Visit `localhost:4173` in a browser to view the web page served.

## Editor

_All code is just plain text, so it doesn't really matter what you use to edit them._ However,
using modern, feature-rich IDEs/text-editors like:
[_**Atom**_](https://github.blog/2022-06-08-sunsetting-atom/),
[_**Brackets**_](https://brackets.io),
[_**WebStorm**_](https://www.jetbrains.com/webstorm/),
[_**Sublime Text**_](https://www.sublimetext.com/),
[_**Visual Studio Code**_](https://code.visualstudio.com/), etc. makes life way easier. These come
with a directory-tree explorer, and an integrated terminal, at the very least, while having support
for plugins/extensions to expand their functionality.

Some (non-exhaustive) benefits of using these are _syntax highlighting_,
_warning/error annotations_, _formatting_, _auto-refactoring_, tons of customizable
_keyboard shortcuts_, etc.

_**Visual Studio Code**_ (_**VSCode**_) is currently the most-popular code editor for reasons like
being _lightweight_, _cleaner_, large marketplace of _extensions_, integrated _source control_
features, _debugger_, _remote explorer_ support, _regular expression_ based find/replace, etc.

Recommended extensions for this project are `Babel JavaScript`, `ESLint`, `Git Graph`,`GitLens`, `markdownlint`, `Prettier`, `Tailwind CSS IntelliSense`, and `SVG`.

All that, however, shouldn't necessarily stop you from using _**Emacs**_, _**Nano**_, or _**Vim**_,
if that's your poison :D. Happy coding!
