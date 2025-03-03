import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <motion.h3
      className="text-3xl md:text-4xl font-bold mb-6"
      variants={fadeInUp}
    >
      {children}
    </motion.h3>
  );
};

export default SectionTitle;
