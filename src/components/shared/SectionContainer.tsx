import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  reverse?: boolean;
}

const SectionContainer = ({
  id,
  children,
  reverse = false,
}: SectionContainerProps) => {
  return (
    <motion.section
      id={id}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start py-16 px-4 md:px-8`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export default SectionContainer;
