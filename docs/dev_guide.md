# Developer's Guide

## Getting the code

1. Fork this repository

2. Clone your forked copy of the project

   ```bash
   git clone https://github.com/<your_user_name>/www-v2.git
   ```

3. Change to the project directory

   ```bash
   cd www-v2
   ```

## Setup Development Environment

This is a ***TypeScript*** project that uses ***React***. You'll just need
*[**Node.js**](https://nodejs.org/en)* and ***npm*** installed on your development machine.
This is sufficient to run, build, and test the project as a whole, but you might need extra tools for other development tasks.

You'll need ***tsc*** (*TypeScript Compiler*) to manually compile `.ts` files, and
***ts-node*** (*Node.js executable for TypeScript*) to manually execute `.ts` scripts directly.

Finally, once ***npm*** is installed, to install the above, run:

```bash
npm i -g typescript
npm i -g ts-node
```

***Note:*** Users on *Linux* and *macOS* are required to add `sudo` before these commands.

Check installation using:

```bash
node -v && npm -v && tsc -v && ts-node -v
```

Expected output:

```bash
v23.7.0
11.1.0
Version 5.7.3
v10.9.2
```

## Commands

After setup, the steps you take depend on what you want to do:

* **Run a development server**

  1. To install all the dependencies (in `package.json`), run:

     ```bash
     npm install
     ```

  2. Run *React scripts*:

     * For unoptimized development serving, run:

       ```bash
       npm run dev
       ```

       Visit `localhost:5173` in a browser to view the web page served.

     * For generating a generic production build, run:

       ```bash
       npm run build
       ```

     * For generating a production build under the subdirectory `/www-v2`, run:

       ```bash
       npm run build
       ```

     * For serving the last production build (`dist` folder), run:

       ```bash
       npm run preview
       ```

       Visit `localhost:4173` in a browser to view the web page served.

## Editor

*All code is just plain text, so any editor works.* However, using modern,
feature-rich IDEs/text-editors like:
[***Atom***](https://github.blog/2022-06-08-sunsetting-atom/),
[***Brackets***](https://brackets.io),
[***WebStorm***](https://www.jetbrains.com/webstorm/),
[***Sublime Text***](https://www.sublimetext.com/),
[***Visual Studio Code***](https://code.visualstudio.com/), etc. makes development much easier.
They provide a directory-tree explorer,
an integrated terminal, and support for plugins/extensions to expand their functionality.

Some (non-exhaustive) benefits of using these are *syntax highlighting*,
*warning/error annotations*, *formatting*, *auto-refactoring*, and tons of customizable
*keyboard shortcuts*.

***Visual Studio Code*** (***VSCode***) is currently the most popular code editor due
to being *lightweight*, *clean*, having a large *extensions* marketplace, integrated
*source control*, a *debugger*, *remote explorer* support, and
*regular-expression-based find/replace*.

Recommended extensions for this project are:
`Babel JavaScript`, `ESLint`, `Git Graph`,
`GitLens`, `markdownlint`, `Prettier`, `Tailwind CSS IntelliSense`, and `SVG`.

All that, however, shouldn't necessarily stop you from using ***Emacs***, ***Nano***, or ***Vim***,
if that's your poison :D. Happy coding!

```
```
