import { motion } from 'framer-motion';
import { logoCardAnimations } from '@/styles/Animations';
import type { LogoCard } from './LogoCards';

const LogoCard = ({ logo, title, onClick, selected }: LogoCard) => {
  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick && onClick()}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick();
      }}
      aria-pressed={selected}
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center border ${selected ? 'border-blue-600 dark:border-blue-300' : 'border-blue-500 dark:border-blue-400'} cursor-pointer`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={logoCardAnimations.card}
      whileHover="hover"
      animate="visible"
    >
      <motion.div
        className="w-24 h-24 bg-yellow-300 flex items-center justify-center rounded-full"
        whileHover="hover"
        variants={logoCardAnimations.logoContainer}
      >
        <img src={logo} alt={title} className="w-12 h-12" />
      </motion.div>

      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-4">
        {title}
      </h3>
    </motion.div>
  );
};

export default LogoCard;
