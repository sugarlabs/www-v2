// Function to replace link text with clickable links
export const renderContentWithLinks = (
  text: string,
  links: { text: string; url: string }[] | null | undefined,
) => {
  if (!links || links.length === 0) return text;

  // Sort links by text length in descending order to handle nested links correctly
  const sortedLinks = [...links].sort((a, b) => b.text.length - a.text.length);

  // Replace each link text with a clickable link
  let processedText = text;
  sortedLinks.forEach((link) => {
    processedText = processedText.replace(
      new RegExp(link.text, 'g'),
      `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${link.text}</a>`,
    );
  });

  return processedText;
};
