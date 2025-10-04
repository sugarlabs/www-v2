import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import DirectorCard from '@/components/DirectorCard';
import { directors } from '@/constants/Leadership';
import {
  simpleFadeIn,
  container,
  item,
  testimonialHeading,
  decorativeElement,
  dividerVariants,
} from '@/styles/Animations';

const Leadership = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          {/* Section header with animations */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={testimonialHeading}
            >
              <motion.span
                className="text-red-500 font-Pacifico"
                variants={decorativeElement}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Meet{' '}
              </motion.span>
              Our Board of Directors
            </motion.h2>

            <div className="flex justify-center">
              <motion.div
                className="h-1 bg-red-500 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={dividerVariants}
              ></motion.div>
            </div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={simpleFadeIn}
            >
              The "Sugar Labs Board of Directors" consists of dedicated six
              individuals who guide our organization's mission to provide
              educational tools for children worldwide. They bring diverse
              expertise in education, technology, and nonprofit leadership.
            </motion.p>
          </div>

          {/* Directors grid with equal height cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {directors.map((director) => (
              <motion.div
                key={director.id}
                className="h-full"
                variants={item}
                whileHover="hover"
              >
                <DirectorCard director={director} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Leadership;
