import { renderMarkdown } from '../utils/mdparser-utils.ts';

const sampleMarkdown = `
Here is a code example:

\`\`\`javascript
console.log("Hello, world!");
\`\`\`
`;

const htmlOutput = renderMarkdown(sampleMarkdown);
console.log(htmlOutput);