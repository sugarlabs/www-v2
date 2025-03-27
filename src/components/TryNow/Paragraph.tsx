import React from 'react';
import { motion } from 'framer-motion';
import { paragraphAnimations } from '@/styles/Animations';
import DOMPurify from 'dompurify';
import { renderContentWithLinks } from '@/utils/renderlinks-utils';

interface ParagraphProps {
  title: string;
  content: string;
  button?: string | null;
  buttonLink?: string | URL;
  links?: { text: string; url: string }[] | null;
}

const Paragraph: React.FC<ParagraphProps> = ({
  title,
  content,
  button,
  buttonLink,
  links,
}) => {
  const contentPoints = content.includes('\n')
    ? content.split('\n')
    : [content];

  return (
    <motion.section
      className="w-[90%] mx-auto text-center my-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={paragraphAnimations.section}
    >
      {/* Styled Title */}
      <motion.h2
        className="text-4xl font-semibold border-b-2 border-gray-300 inline-block pb-2 font-[Caveat]"
        variants={paragraphAnimations.text}
      >
        {title}
      </motion.h2>

      {/* Render Content as a List if Multiple Lines Exist */}
      {contentPoints.length > 1 ? (
        <ul className="text-gray-700 mt-4 list-disc list-inside text-left">
          {contentPoints.map((point, index) => (
            <motion.li
              key={index}
              className="mb-2"
              custom={index}
              variants={paragraphAnimations.listItem(index)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    renderContentWithLinks(point.trim(), links),
                  ),
                }}
              />
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.p
          className="text-gray-700 mt-4"
          variants={paragraphAnimations.text}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                renderContentWithLinks(content, links),
              ),
            }}
          />
        </motion.p>
      )}

      {/* Conditional Button Rendering */}
      {button && (
        <motion.button
          className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition"
          whileHover="hover"
          variants={paragraphAnimations.button}
          onClick={() => window.open(buttonLink, '_blank')}
        >
          {button}
        </motion.button>
      )}
    </motion.section>
  );
};

export default Paragraph;
