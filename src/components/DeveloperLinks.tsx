import { developerLinks } from '@/constants/VolunteerAndDev/Links';
import { fadeIn } from '@/styles/Animations';
import { motion } from 'framer-motion';
const DeveloperLinks = () => {
  return (
    <section className="container mx-auto text-center p-6">
      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">
        {developerLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full flex items-center justify-between border border-gray-400 px-6 py-4 rounded-full
      overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Expanding Oval Background Effect */}
            <span className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 origin-center"></span>

            {/* Link Content with animated background on hover */}
            <motion.div
              className="relative flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-300"
              whileHover={{ backgroundColor: '#000000' }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={link.icon}
                alt={link.name}
                className="w-6 h-6 transition-all group-hover:invert"
              />
              <span className="text-lg font-medium group-hover:text-white transition-colors">
                {link.name}
              </span>
            </motion.div>

            {/* Arrow */}
            <motion.span
              className="relative text-xl transition-all group-hover:text-white"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              →
            </motion.span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default DeveloperLinks;
