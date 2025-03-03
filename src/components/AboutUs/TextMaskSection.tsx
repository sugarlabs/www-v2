import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TextMaskSection = () => {
  const [fontSize, setFontSize] = useState('120');
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setFontSize('50');
      } else if (width < 768) {
        setFontSize('70');
      } else if (width < 1024) {
        setFontSize('90');
      } else {
        setFontSize('120');
      }
    };

    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className="relative my-20 overflow-hidden rounded-xl shadow-2xl group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <div className="relative h-[280px] md:h-[400px] overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/assets/Images/teach.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.1) saturate(1.2)',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />

          <div className="relative h-full flex items-center justify-center">
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <mask id="textMask">
                  <rect width="100%" height="100%" fill="white" />

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    fontSize={fontSize}
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    letterSpacing="0.1em"
                    className="select-none"
                  >
                    SUGAR LABS
                  </text>

                  <line
                    x1="30%"
                    y1="65%"
                    x2="70%"
                    y2="65%"
                    stroke="black"
                    strokeWidth="4"
                  />
                  <line
                    x1="35%"
                    y1="70%"
                    x2="65%"
                    y2="70%"
                    stroke="black"
                    strokeWidth="3"
                  />
                </mask>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="rgba(255, 255, 255, 0.85)"
                mask="url(#textMask)"
              />
            </svg>
          </div>

          <div className="absolute top-4 left-4 w-[10%] h-[10%] border-t-2 border-l-2 border-white/30"></div>
          <div className="absolute bottom-4 right-4 w-[10%] h-[10%] border-b-2 border-r-2 border-white/30"></div>
        </div>

        <div className="py-8 px-6 md:px-12 bg-white text-center">
          <motion.h3
            className="text-lg md:text-xl font-medium text-red-600 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Innovate. Educate. Transform.
          </motion.h3>

          <motion.p
            className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Sugar Labs creates innovative educational tools that transform how
            children learn and explore technology. Our community-driven approach
            empowers young minds to become creators, not just consumers.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TextMaskSection;
