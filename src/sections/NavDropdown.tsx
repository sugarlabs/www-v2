import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type NavDropdownProps = {
  id: string;
  label: string;
  items: { label: string; path: string }[];
  isActive: boolean;
  setActive: (id: string | null) => void;
  onNavigate: () => void;
};

const NavDropdown: React.FC<NavDropdownProps> = ({
  id,
  label,
  items,
  isActive,
  setActive,
  onNavigate,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
    >
      <button
        className={`px-4 lg:px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold rounded-xl
                  transition-all duration-300 hover:bg-blue-50 
                  flex items-center space-x-2 group relative overflow-hidden border border-transparent
                  hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10
                  ${isActive ? 'text-blue-600 bg-blue-50 shadow-lg shadow-blue-500/20 border-blue-200/50' : ''}`}
        aria-expanded={isActive}
      >
        <span className="relative z-10">{label}</span>
        <svg
          className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {/* Enhanced hover effect background */}
        <div className="absolute inset-0 bg-blue-100/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -15, scale: 0.9, rotateX: -15 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="absolute left-0 mt-4 w-72 rounded-3xl bg-white 
                     shadow-2xl shadow-blue-500/20 ring-1 ring-black/5 border border-gray-100 overflow-hidden
                     transform origin-top perspective-1000"
          >
            {/* Subtle border effect */}
            <div className="absolute inset-0 bg-blue-50/30 rounded-3xl" />
            
            {/* Top accent */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-blue-400/30 rounded-full" />
            
            <div className="relative py-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.08,
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={onNavigate}
                    className="group flex items-center px-5 py-4 text-sm text-gray-700 hover:text-blue-600
                            transition-all duration-300 hover:bg-blue-50
                            relative overflow-hidden mx-3 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10
                            border border-transparent hover:border-blue-200/50"
                  >
                    {/* Enhanced hover background */}
                    <div className="absolute inset-0 bg-blue-100/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-2xl" />
                    
                    {/* Animated dot indicator */}
                    <div className="relative z-10 flex items-center w-full">
                      <div className="relative">
                        <span
                          className="w-3 h-3 rounded-full bg-blue-500 
                                    opacity-0 group-hover:opacity-100 transition-all duration-300 mr-4 
                                    transform scale-0 group-hover:scale-100 shadow-lg shadow-blue-500/50
                                    flex items-center justify-center"
                        >
                          <span className="w-1 h-1 bg-white rounded-full opacity-80" />
                        </span>
                      </div>
                      
                      <span className="relative z-10 font-medium group-hover:font-semibold transition-all duration-300 text-gray-800 group-hover:text-blue-700">
                        {item.label}
                      </span>
                      
                      {/* Enhanced arrow indicator */}
                      <svg
                        className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 
                                 transform translate-x-3 group-hover:translate-x-0 text-blue-500 group-hover:text-blue-600
                                 group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced bottom accent */}
            <div className="h-1.5 bg-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
