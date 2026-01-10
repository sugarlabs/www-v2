import { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { featureSectionAnimations } from '@/styles/Animations';
import '@/styles/FeatureSection.css';

interface FeatureData {
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  images?: { src: string; alt: string }[];
  note?: string;
}

const FeatureSection = ({ data }: { data: FeatureData }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const hasMultipleImages = data.images && data.images.length > 1;

  return (
    <motion.section
      className="w-[90%] mx-auto py-10 flex flex-col md:flex-row items-center gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={featureSectionAnimations.section}
    >
      {/* Left Side: Text Content */}
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        variants={featureSectionAnimations.textContainer}
      >
        <h1 className="text-5xl font-bold text-blue-600">{data.title}</h1>
        <h2 className="text-4xl font-bold text-black dark:text-white mt-2">
          {data.subtitle}
        </h2>
        <p className="text-lg font-semibold mt-4 dark:text-gray-300">
          {data.quote}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          {data.description}
        </p>
      </motion.div>

      {/* Right Side: Image Carousel */}
      <motion.div
        className="md:w-1/2 flex flex-col justify-center items-center"
        variants={featureSectionAnimations.imageContainer}
      >
        {data.images && data.images.length > 0 ? (
          <div className="relative group w-full">
            <Carousel
              selectedItem={currentImage}
              onChange={(index) => setCurrentImage(index)}
              showArrows={false}
              showThumbs={false}
              showStatus={false}
              showIndicators={hasMultipleImages}
              infiniteLoop={hasMultipleImages}
              autoPlay={hasMultipleImages}
              interval={3000}
              transitionTime={600}
              useKeyboardArrows={hasMultipleImages}
              swipeable={hasMultipleImages}
              emulateTouch={hasMultipleImages}
            >
              {data.images.map((image, index) => (
                <motion.div key={index}>
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-lg shadow-md"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={featureSectionAnimations.image}
                  />
                </motion.div>
              ))}
            </Carousel>

            {/* LEFT hover zone */}
            {hasMultipleImages && currentImage > 0 && (
              <div
                className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                onClick={() => setCurrentImage((prev) => prev - 1)}
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white" />
              </div>
            )}

            {/* RIGHT hover zone */}
            {hasMultipleImages && currentImage < data.images.length - 1 && (
              <div
                className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                onClick={() => setCurrentImage((prev) => prev + 1)}
              >
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
              </div>
            )}
          </div>
        ) : (
          <motion.div
            className="w-full max-w-lg h-64 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={featureSectionAnimations.image}
          >
            <p className="text-gray-500 dark:text-gray-400">
              No Image Available
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Optional Note */}
      {data.note && (
        <motion.p
          className="text-black dark:text-white font-bold mt-6 text-center w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={featureSectionAnimations.note}
        >
          {data.note}
        </motion.p>
      )}
    </motion.section>
  );
};

export default FeatureSection;
