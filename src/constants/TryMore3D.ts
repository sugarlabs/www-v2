export const tryMoreActivities = [
  {
    title: 'Finance',
    description: 'Roleplay with money',
    buttonText: 'Get Finance',
    img: 'assets/Activities/activity-finance.svg', // Update with actual SVG path
  },
  {
    title: 'Maze',
    description: 'Have fun with progressive challenges',
    buttonText: 'Get Maze',
    img: 'assets/Activities/activity-maze.svg', // Update with actual SVG path
  },
  {
    title: 'Paint',
    description: 'Express your creativity',
    buttonText: 'Get Paint',
    img: 'assets/Activities/activity-finance.svg', // Example, add more as needed
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
