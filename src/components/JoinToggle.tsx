import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JoinToggle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active page
  const isVolunteerPage = location.pathname === '/volunteer';
  const isDevPage = location.pathname === '/join-development';

  return (
    <div className="pt-12 md:pt-20">
      <div className="flex flex-wrap items-center justify-center md:justify-between w-full max-w-6xl font-Oswald">
        {/* Left Side: JOIN (Always stays the same) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-12">
          <h1 className="text-6xl md:text-[10rem] font-extralight tracking-tight text-center md:text-right">
            JOIN
          </h1>
        </div>

        {/* Right Side: Volunteer & Development (Stacked) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
          {/* Volunteer (Active or Clickable) */}
          <motion.h2
            className="text-4xl md:text-[5rem] font-extralight pb-1 md:pb-2 cursor-pointer transition-colors"
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{
              color: isVolunteerPage ? '#EF4444' : '#D1D5DB',
              opacity: isVolunteerPage ? 1 : 0.7,
              scale: isVolunteerPage ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => !isVolunteerPage && navigate('/volunteer')}
          >
            Volunteer
          </motion.h2>

          {/* Divider Line */}
          <div className="border-t border-gray-300 w-3/4 md:w-4/5"></div>

          {/* Development (Active or Clickable) */}
          <motion.h2
            className="text-4xl md:text-[5rem] font-extralight pt-1 md:pt-2 cursor-pointer transition-colors"
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{
              color: isDevPage ? '#EF4444' : '#D1D5DB',
              opacity: isDevPage ? 1 : 0.7,
              scale: isDevPage ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => !isDevPage && navigate('/join-development')}
          >
            Development
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

export default JoinToggle;
