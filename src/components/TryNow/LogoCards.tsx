import { motion } from 'framer-motion';
import { logoCardAnimations } from '@/styles/Animations';

interface LogoCard {
  logo: string;
  title: string;
  description: string[];
  buttons?: { text: string; link: string }[];
}

const LogoCards = ({ data }: { data: LogoCard[] }) => {
  return (
    <section className="w-[90%] mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-blue-500 dark:border-blue-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={logoCardAnimations.card}
          custom={index}
          whileHover="hover"
        >
          {/* Logo */}
          <motion.div
            className="w-24 h-24 bg-yellow-300 flex items-center justify-center rounded-full"
            whileHover="hover"
            variants={logoCardAnimations.logoContainer}
          >
            <img src={card.logo} alt={card.title} className="w-12 h-12" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-4">
            {card.title}
          </h3>

          {/* Divider */}
          <hr className="w-full my-3 border-gray-300 dark:border-gray-600" />

          {/* Description */}
          <ul className="text-gray-600 dark:text-gray-300 text-sm text-left list-disc list-inside">
            {card.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Buttons */}
          {card.buttons && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {card.buttons.map((btn, i) => (
                <motion.a
                  key={i}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full shadow-md hover:bg-blue-700 transition duration-200"
                  whileHover="hover"
                  whileTap="tap"
                  variants={logoCardAnimations.button}
                >
                  {btn.text}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
};

export default LogoCards;
