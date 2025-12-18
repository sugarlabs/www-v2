import { motion } from 'framer-motion';
import { content } from '@/constants/aboutUs/mission';

const MissionSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
      {/* Main image */}
      <motion.div
        className="w-full lg:w-1/2 order-2 lg:order-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-red-600/5 rounded-lg -m-2 -z-10"></div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={content.images.main.src}
              alt={content.images.main.alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        className="w-full lg:w-1/2 order-1 lg:order-2 text-slate-700 dark:text-slate-300"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          {content.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {content.images.gallery.map((img, index) => (
            <motion.div
              key={index}
              className="aspect-video overflow-hidden rounded-md shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MissionSection;
