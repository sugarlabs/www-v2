import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <div
      className="relative"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
    >
      <button
        className={`px-2 lg:px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium rounded-md
                  transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-1
                  ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}
        aria-expanded={isActive}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
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
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-[0.074rem] w-56 rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 overflow-hidden"
          >
            <div className="py-2">
              {items.map((item) => {
                const isItemActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onNavigate}
                    className={`group flex items-center px-4 py-3 text-sm
                            transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700
                            hover:text-blue-600 dark:hover:text-blue-400
                            ${isItemActive ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-blue-600 mr-2 transform
                                transition-all duration-200
                                ${isItemActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
