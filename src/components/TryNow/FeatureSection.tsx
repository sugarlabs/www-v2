import { useState } from 'react';
import { motion } from 'framer-motion';
import { featureSectionAnimations } from '@/styles/Animations';

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
        <h2 className="text-4xl font-bold text-black mt-2">{data.subtitle}</h2>
        <p className="text-lg font-semibold mt-4">{data.quote}</p>
        <p className="text-gray-700 mt-4">{data.description}</p>
      </motion.div>

      {/* Right Side: Image Carousel */}
      <motion.div
        className="md:w-1/2 flex flex-col justify-center items-center relative"
        variants={featureSectionAnimations.imageContainer}
      >
        {data.images && data.images.length > 0 ? (
          <>
            {/* Display Active Image */}
            <motion.img
              key={currentImage} // Ensures animation triggers on image change
              src={data.images[currentImage].src}
              alt={data.images[currentImage].alt}
              className="w-full max-w-lg rounded-lg shadow-md"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={featureSectionAnimations.image}
            />

            {/* Dotted Navigation */}
            <div className="flex mt-4 space-x-2">
              {data.images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentImage ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                  whileHover="hover"
                  variants={featureSectionAnimations.button}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            className="w-full max-w-lg h-64 bg-gray-300 rounded-lg flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={featureSectionAnimations.image}
          >
            <p className="text-gray-500">No Image Available</p>
          </motion.div>
        )}
      </motion.div>

      {/* Optional Note */}
      {data.note && (
        <motion.p
          className="text-black font-bold mt-6 text-center w-full"
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
