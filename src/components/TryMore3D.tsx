import { Marquee } from '@/components/magicui/Marquee';
import {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
} from '@/constants/TryMore3D';
import { motion } from 'framer-motion';
import {
  slideInLeft,
  staggerContainer,
  bounce,
  fadeIn,
  headerReveal,
} from '@/styles/Animations';

const ReviewCard = ({
  img,
  title,
  description,
  buttonText,
}: {
  img: string;
  title: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <figure className="relative h-full w-36 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] flex flex-col items-center text-center">
      {/* SVG Icon */}
      <img className="w-12 h-12 mb-2" alt={title} src={img} />

      {/* Title */}
      <figcaption className="text-lg font-semibold dark:text-white">
        {title}
      </figcaption>

      {/* Description */}
      <p className="text-xs font-medium dark:text-white/40">{description}</p>

      {/* Button */}
      <button className="mt-4 px-3 py-1 border rounded-lg border-gray-950 dark:border-gray-50 text-sm font-medium dark:text-white">
        {buttonText}
      </button>
    </figure>
  );
};

export function TryMore() {
  return (
    <div className="relative flex flex-col lg:flex-row h-auto lg:h-96 w-full items-center justify-center gap-6 lg:gap-4 overflow-hidden [perspective:300px] px-4 sm:px-6 md:px-10 lg:pl-20 bg-gradient-to-b from-[#F5DDC8] to-white-800">
      <div className="height- 30px"></div>

      {/* Left Side Content */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-[#975555] dark:text-[#975555]"
          variants={headerReveal}
        >
          <motion.span variants={slideInLeft} custom={0}>
            Check out the <br className="hidden lg:block" />
          </motion.span>
          <motion.span variants={slideInLeft} custom={1}>
            remaining hundreds <br className="hidden lg:block" />
          </motion.span>
          <motion.span variants={slideInLeft} custom={2}>
            of activities!
          </motion.span>
        </motion.h2>
        <motion.p
          className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300"
          variants={fadeIn}
          custom={3}
        >
          Important: Please know that in order to install and try them, you need
          to be running the Sugar Desktop Environment. If you don't have that
          already, please reconsider your other options to explore Sugar. Try
          Sugar!
        </motion.p>
        <motion.a
          href="https://v4.activities.sugarlabs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            variants={bounce}
            custom={4}
            whileHover={{
              scale: 1.05,
              backgroundColor: '#4338ca',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Sugar Activity page
          </motion.button>
        </motion.a>
      </motion.div>

      {/* Marquee Section */}
      <div
        className="flex flex-col lg:flex-row items-center gap-4 max-[1040px]:hidden"
        style={{
          transform:
            'translateX(0px) translateY(0px) translateZ(0px) rotateX(10deg) rotateY(-5deg) rotateZ(10deg)',
        }}
      >
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {firstRow.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {secondRow.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {thirdRow.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {fourthRow.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="height- 20px"></div>
    </div>
  );
}
