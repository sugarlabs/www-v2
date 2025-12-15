import { useState } from 'react';
import { motion } from 'framer-motion';

type FAQItemProps = {
  index: number;
  question: string;
  answer: string;
};

const faqItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const faqQuestionButtonVariants = {
  initial: { backgroundColor: 'rgba(0,0,0,0)', y: 0 },
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(0,0,0,0.12)',
    y: -1,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
  },
};

const faqToggleIconVariants = (isOpen: boolean) => ({
  initial: { rotate: 0 },
  animate: { rotate: isOpen ? 180 : 0, transition: { duration: 0.2 } },
});

const faqAnswerVariants = (isOpen: boolean) => ({
  initial: { height: 0, opacity: 0 },
  animate: {
    height: isOpen ? 'auto' : 0,
    opacity: isOpen ? 1 : 0,
    transition: { duration: 0.3 },
  },
});

const FAQItem = ({ index, question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      key={index}
      className="border-b last:border-b-0 border-gray-200 dark:border-gray-700"
      variants={faqItemVariants}
      initial="initial"
      animate="animate"
    >
      <motion.button
        className="w-full text-left py-4 px-4 text-lg font-medium flex justify-between items-center hover:cursor-pointer text-gray-900 dark:text-gray-100 rounded-md"
        onClick={toggleFAQ}
        whileHover="hover"
        variants={faqQuestionButtonVariants}
      >
        <span className="flex-1">{question}</span>
        <motion.span
          variants={faqToggleIconVariants(isOpen)}
          initial="initial"
          animate="animate"
          className="text-gray-600 dark:text-gray-400 ml-2"
        >
          {isOpen ? '-' : '+'}
        </motion.span>
      </motion.button>
      <motion.div
        variants={faqAnswerVariants(isOpen)}
        initial="initial"
        animate="animate"
        style={{ overflow: 'hidden' }}
      >
        <p
  className="px-6 pb-4 text-gray-700 dark:text-gray-300"
  dangerouslySetInnerHTML={{
    __html: answer.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800 dark:text-blue-400">$1</a>'
    ),
  }}
/>

      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
