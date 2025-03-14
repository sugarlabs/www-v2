import React from 'react';

interface ParagraphProps {
  title: string;
  content: string;
  button?: string | null;
}

const Paragraph: React.FC<ParagraphProps> = ({ title, content, button }) => {
  // Split content into an array if it contains line breaks or bullet points
  const contentPoints = content.includes('\n')
    ? content.split('\n')
    : [content];

  return (
    <section className="w-[90%] mx-auto text-center my-10">
      {/* Styled Title with Caveat Font */}
      <h2 className="text-4xl font-semibold border-b-2 border-gray-300 inline-block pb-2 font-[Caveat]">
        {title}
      </h2>

      {/* Render Content as a List if Multiple Lines Exist */}
      {contentPoints.length > 1 ? (
        <ul className="text-gray-700 mt-4 list-disc list-inside text-left">
          {contentPoints.map((point, index) => (
            <li key={index} className="mb-2">
              {point.trim()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 mt-4">{content}</p>
      )}

      {/* Conditional Button Rendering */}
      {button && (
        <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition">
          {button}
        </button>
      )}
    </section>
  );
};

export default Paragraph;
