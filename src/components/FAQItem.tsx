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
  hover: { scale: 1.02 },
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
        className="w-full text-left py-4 text-lg font-medium flex justify-between items-center hover:cursor-pointer text-gray-900 dark:text-gray-100"
        onClick={toggleFAQ}
        whileHover="hover"
        variants={faqQuestionButtonVariants}
      >
        {question}
        <motion.span
          variants={faqToggleIconVariants(isOpen)}
          initial="initial"
          animate="animate"
          className="text-gray-600 dark:text-gray-400"
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
        <p className="p-4 text-gray-700 dark:text-gray-300">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
