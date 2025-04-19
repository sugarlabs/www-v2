import { developerLinks } from '@/constants/VolunteerAndDev/Links';
import { springPop } from '@/styles/Animations';
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
            overflow-hidden transition-all group"
            variants={springPop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Expanding Oval Background Effect */}
            <span className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 origin-center"></span>

            {/* Link Content */}
            <div className="relative flex items-center gap-3 transition-all group-hover:text-white">
              <img
                src={link.icon}
                alt={link.name}
                className="w-6 h-6 transition-all group-hover:invert"
              />
              <span className="text-lg font-medium">{link.name}</span>
            </div>

            <span className="relative text-xl transition-all group-hover:text-white">
              →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default DeveloperLinks;

