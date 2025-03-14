import React from 'react';
import { motion } from 'framer-motion';
import { numberedCardAnimations } from '@/styles/Animations';

interface NumberedCardProps {
  number: string;
  title: string;
  description: string;
  image?: string;
  borderColor: string;
}

const NumberedCard: React.FC<NumberedCardProps> = ({
  number,
  title,
  description,
  image,
  borderColor,
}) => {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center p-6 rounded-2xl shadow-md"
      style={{ border: `2px solid ${borderColor}` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={numberedCardAnimations.card}
      whileHover="hover"
    >
      {/* Number Circle */}
      <motion.div
        className="absolute -top-6 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold"
        style={{ backgroundColor: borderColor }}
        whileHover="hover"
        variants={numberedCardAnimations.numberCircle}
      >
        {number}
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-semibold mt-6">{title}</h3>

      {/* Description */}
      <p className="text-gray-700 mt-2">{description}</p>

      {/* Conditionally Render Image */}
      {image && (
        <motion.img
          src={image}
          alt={title}
          className="w-full h-auto mt-4 rounded-lg"
          whileHover="hover"
          variants={numberedCardAnimations.image}
        />
      )}
    </motion.div>
  );
};

export default NumberedCard;
