export interface SectionLink {
  text: string;
  url: string;
}

export interface TurtleBlockSection {
  title: string;
  content: string;
  button?: string | null;
  links?: SectionLink[];
}

export const turtleBlocksData = {
  title: 'Turtle Blocks',
  subtitle: 'Playground for Coding',
  quote:
    '“Young children learn by games; compulsory education cannot remain in the soul." — Plato',
  description:
    'Turtle Blocks JavaScript lets users create colorful art with a Logo-inspired turtle using snap-together coding blocks. It’s beginner-friendly yet powerful enough for advanced programming, graphics, and math exploration.',
  images: [
    {
      src: 'assets/TryNowImages/turtleblocks2.png',
      alt: 'Turtle Blocks Example 1',
    },
    {
      src: 'assets/TryNowImages/turtleblocks1.png',
      alt: 'Turtle Blocks Example 2',
    },
    {
      src: 'assets/TryNowImages/turtleBlocks.png',
      alt: 'Turtle Blocks Example 3',
    },
  ],
};

export const turtleBlocksSections: TurtleBlockSection[] = [
  {
    title: 'Using turtle art JS',
    content:
      "Turtle Blocks Javascript is designed to run in a browser. Most of the development has been done in Chrome, but it should also work in Firefox. You can run it directly from index.html, from a server maintained by Sugar Labs, from the github repo, or by setting up a local server. Once you've launched it in your browser, start by clicking on (or dragging) blocks from the Turtle palette. Use multiple blocks to create drawings; as the turtle moves under your control, colorful lines are drawn. You add blocks to your program by clicking on or dragging them from the palette to the main area. You can delete a block by dragging it back onto the palette. Click anywhere on a 'stack' of blocks to start executing that stack or by clicking in the Rabbit (fast) or Turtle (slow) on the Main Toolbar.",
    button: null,
    links: [
      {
        text: 'server maintained by Sugar Labs',
        url: 'http://turtle.sugarlabs.org/',
      },
      {
        text: 'local server',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/server.md',
      },
      {
        text: 'github repo',
        url: 'http://rawgit.com/sugarlabs/turtleblocksjs/master/index.html',
      },
    ],
  },
  {
    title: 'Getting Started Documentation',
    content:
      'The basic buttons and basic blocks are explained in detail in Documentation. A guide to programming with Turtle Blocks is available in Turtle Blocks Guide. A quick start: Google Code-in participant Jasmine Park has created some guides to using Turtle Blocks: Turtle Blocks: An Introductory Manual and Turtle Blocks: A Manual for Advanced Blocks.',
    links: [
      {
        text: 'Documentation',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/documentation/README.md',
      },
      {
        text: 'Turtle Blocks Guide',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/guide/README.md',
      },
      {
        text: 'Turtle Blocks: An Introductory Manual',
        url: 'http://people.sugarlabs.org/walter/TurtleBlocksIntroductoryManual.pdf',
      },
      {
        text: 'Turtle Blocks: A Manual for Advanced Blocks',
        url: 'http://people.sugarlabs.org/walter/TurtleBlocksAdvancedBlocksManual.pdf',
      },
    ],
    button: null,
  },
  {
    title: 'Found a Bug?',
    content: 'Bugs can be reported in the issues section of the repository',
    links: [
      {
        text: 'issues section',
        url: 'https://github.com/sugarlabs/turtleblocksjs/issues',
      },
    ],
    button: null,
  },
  {
    title: 'Advance Features',
    content:
      'Turtle Blocks has a plugin mechanism that is used to add new blocks. You can learn more about how to use plugins (and how to write them) from the Plugins Guide.',
    links: [
      {
        text: 'Plugins Guide',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/README.md',
      },
    ],
    button: null,
  },
  {
    title: 'List of Plugins',
    content:
      'Mindstorms: blocks to interact with the LEGO mindstorms robotics kit\n RoDi: blocks to interact with Rodi wireless robot\n Maths: addition blocks for some more advanced mathematics\n Translate: blocks for translating strings between languages, e.g., English to Spanish\n Dictionary: a block to look up dictionary definitions\n Weather: blocks to retrieve global weather forecasts\n Logic: blocks for bitwise Boolean operations\n Finance: a block for looking up market prices\n Bitcoin: a block for looking up bitcoin exchange rates\n Nutrition: blocks for exploring the nutritional content of food\n Facebook: a block for publishing a project to facebook\n Heap: blocks to support a heap and for loading and saving data\n Accelerometer: blocks for accessing an accelerometer\n Turtle: blocks to support advanced features when using multiple turtles\n Gmap: blocks to support generation of Google maps.',
    links: [
      {
        text: 'Mindstorms',
        url: 'https://github.com/SAMdroid-apps/turtlestorm',
      },
      {
        text: 'RoDi',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/rodi.json',
      },
      {
        text: 'Maths',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/maths.json',
      },
      {
        text: 'Translate',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/translate.json',
      },
      {
        text: 'Dictionary',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/dictionary.json',
      },
      {
        text: 'Weather',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/weather.json',
      },
      {
        text: 'Logic',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/logic.json',
      },
      {
        text: 'Finance',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/finance.json',
      },
      {
        text: 'Bitcoin',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/bitcoin.json',
      },
      {
        text: 'Nutrition',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/nutrition.json',
      },
      {
        text: 'Facebook',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/facebook.json',
      },
      {
        text: 'Heap',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/heap.json',
      },
      {
        text: 'Accelerometer',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/accelerometer.json',
      },
      {
        text: 'Turtle',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/turtle.json',
      },
      {
        text: 'Gmap',
        url: 'https://github.com/sugarlabs/turtleblocksjs/blob/master/plugins/gmap.json',
      },
    ],
    button: null,
  },
];

export const mockupImage = {
  path: 'assets/TryNowImages/turtleMockup.png',
};
