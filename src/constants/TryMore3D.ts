export const tryMoreActivities = [
  {
    title: 'Abacus',
    description: 'A tool for simple arithmetic calculations',
    buttonText: 'Get Abacus',
    img: 'assets/Activities/Abacus.svg', // Update with actual SVG path
  },
  {
    title: 'BlockParty',
    description: 'Blocks arrangement game',
    buttonText: 'Get BlockParty',
    img: 'assets/Activities/BlockPartyActivity.svg', // Update with actual SVG path
  },
  {
    title: 'Cells',
    description:
      'This game is based on the mechanisms present in gene regulatory networks',
    buttonText: 'Get Cells',
    img: 'assets/Activities/CellManagement.svg', // Example, add more as needed
  },
  {
    title: 'Flappy',
    description: 'The popular Flappy bird game',
    buttonText: 'Get Flappy',
    img: 'assets/Activities/flappy.svg', // Example, add more as needed
  },
  {
    title: 'JAMath',
    description: 'A fun and interactive math game',
    buttonText: 'Get JAMath',
    img: 'assets/Activities/JAMath.svg', // Example, add more as needed
  },
  {
    title: 'Jumble',
    description: 'Rearrange and uncover the hidden pattern',
    buttonText: 'Get Jumble',
    img: 'assets/Activities/Jumble.svg', // Example, add more as needed
  },
  {
    title: 'JupyterLabs',
    description: 'Coding, data science, and visualization',
    buttonText: 'Get JupyterLabs',
    img: 'assets/Activities/JupyterLabs.svg', // Example, add more as needed
  },
  {
    title: 'Math Hurdler',
    description: 'Solve equations to keep moving forward',
    buttonText: 'Get Math Hurdler',
    img: 'assets/Activities/math-hurdler.svg', // Example, add more as needed
  },
  {
    title: 'Memorize',
    description: 'Here you can play games that challenge your memory!',
    buttonText: 'Get Memorize',
    img: 'assets/Activities/Memorize.svg', // Example, add more as needed
  },
  {
    title: 'Read ETexts',
    description:
      'Download and read thousands of free e-books in plain text format from Project Gutenberg!',
    buttonText: 'Get Read ETexts',
    img: 'assets/Activities/ReadEtextsActivities.svg', // Example, add more as needed
  },
  {
    title: 'Recall',
    description: 'Memory exercise game',
    buttonText: 'Get Recall',
    img: 'assets/Activities/RecallActivities.svg', // Example, add more as needed
  },
  {
    title: 'Speak',
    description: 'An animated face that speaks whatever you type',
    buttonText: 'Get Speak',
    img: 'assets/Activities/Speak.svg', // Example, add more as needed
  },
  {
    title: 'Tic-Tac-Toe',
    description: 'A classic strategy game of Xs and Os',
    buttonText: 'Get Tic-Tac-Toe',
    img: 'assets/Activities/TicTacToe.svg', // Example, add more as needed
  },
];

export const firstRow = tryMoreActivities.slice(
  0,
  tryMoreActivities.length / 2,
);
export const secondRow = tryMoreActivities.slice(tryMoreActivities.length / 2);
export const thirdRow = tryMoreActivities.slice(
  0,
  tryMoreActivities.length / 2,
);
export const fourthRow = tryMoreActivities.slice(tryMoreActivities.length / 2);
