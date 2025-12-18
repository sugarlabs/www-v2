import { motion } from 'framer-motion';
import { SECTIONS, SectionId } from '@/constants/aboutUs';

const TextMaskSection = () => {
  const handleScroll = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <motion.div
      className="
        relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
        [--mask-bg:rgba(255,255,255,0.92)]
        dark:[--mask-bg:rgba(15,23,42,0.92)]
      "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO */}
      <div className="relative h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('assets/Images/teach.webp')" }}
        />

        {/* SVG MASK LAYER */}
        <svg
          className="absolute inset-0 w-full h-full z-20"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="textMask">
              {/* visible area */}
              <rect width="100%" height="100%" fill="white" />

              {/* cutout text */}
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Inter, system-ui, sans-serif"
                className="fill-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.08em]"
              >
                SUGAR LABS
              </text>

              {/* decorative lines */}
              <line
                x1="32%"
                y1="58%"
                x2="68%"
                y2="58%"
                stroke="black"
                strokeWidth="6"
              />
              <line
                x1="38%"
                y1="64%"
                x2="62%"
                y2="64%"
                stroke="black"
                strokeWidth="4"
              />
            </mask>
          </defs>

          {/* OVERLAY USING CSS VARIABLE */}
          <rect
            width="100%"
            height="100%"
            fill="var(--mask-bg)"
            mask="url(#textMask)"
            className="transition-[fill] duration-300 ease-out"
          />
        </svg>

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-transparent dark:from-white/30" />

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-black/60 z-30 dark:border-white/60" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-black/60 z-30 dark:border-white/60" />
      </div>

      {/* CONTENT */}
      <div className="py-8 px-6 md:px-12 text-center">
        <motion.h3
          className="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Innovate. Educate. Transform.
        </motion.h3>

        <motion.p
          className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Sugar Labs creates innovative educational tools that transform how
          children learn and explore technology.
        </motion.p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />

      {/* Navigation bar */}
      <nav className="w-full py-8">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-12">
          {SECTIONS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleScroll(item.id)}
                // href={`#${item.id}`}
                className="px-4 py-2 transition-all duration-300 font-semibold text-sm md:text-base relative group hover:cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default TextMaskSection;
