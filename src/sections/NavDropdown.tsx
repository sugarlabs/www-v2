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
        className={`px-2 lg:px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md
                  transition-all duration-200 hover:bg-gray-50 flex items-center space-x-1
                  ${isActive ? 'text-blue-600' : ''}`}
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
            className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div className="py-2">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50
                          transition-all duration-200 hover:text-blue-600"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100
                              transition-all duration-200 mr-2 transform scale-0 group-hover:scale-100"
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
