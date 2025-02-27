import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { dropdowns } from '../constants/Header';
import logo from '/assets/logo.svg';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/90 shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={closeMenu}
            >
              <img
                src={logo}
                alt="Sugar Labs"
                className="h-12 w-auto transition-transform hover:scale-105"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 focus:outline-none group z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    menuOpen
                      ? 'rotate-45 translate-y-1.5'
                      : 'translate-y-[-4px]'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    menuOpen
                      ? '-rotate-45 -translate-y-1.5'
                      : 'translate-y-[4px]'
                  }`}
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {Object.entries(dropdowns).map(([key, { label, items }]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md
                              transition-all duration-200 hover:bg-gray-50 flex items-center space-x-1
                              ${activeDropdown === key ? 'text-blue-600' : ''}`}
                    aria-expanded={activeDropdown === key}
                  >
                    <span>{label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === key ? 'rotate-180' : ''
                      }`}
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
                    {activeDropdown === key && (
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
              ))}

              {/* Navigation Links */}
              {['Products', 'Donate', 'Join Development', 'Volunteer'].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md
                            transition-all duration-200 hover:bg-gray-50"
                  >
                    {item}
                  </Link>
                ),
              )}

              {/* CTA Button */}
              <Link
                to="/try-sugar"
                className="inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-white
                          bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                          transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                TRY NOW
              </Link>
            </div>

            {/* Mobile Navigation Backdrop */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/30 md:hidden z-40"
                  onClick={closeMenu}
                />
              )}
            </AnimatePresence>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed md:hidden top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl z-40
                            flex flex-col h-screen overflow-y-auto"
                >
                  <div className="h-20" />
                  <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                    <div className="space-y-6">
                      {Object.entries(dropdowns).map(
                        ([key, { label, items }]) => (
                          <div key={key} className="space-y-2">
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === key ? null : key,
                                )
                              }
                              className="flex items-center justify-between w-full text-left px-2 py-2
                                    text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                              aria-expanded={activeDropdown === key}
                            >
                              <span>{label}</span>
                              <svg
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  activeDropdown === key ? 'rotate-180' : ''
                                }`}
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
                              {activeDropdown === key && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 space-y-2">
                                    {items.map((item) => (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={closeMenu}
                                        className="flex items-center px-4 py-2 text-sm text-gray-600
                                              rounded-lg hover:bg-gray-50 hover:text-blue-600"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ),
                      )}

                      {[
                        'Products',
                        'Donate',
                        'Join Development',
                        'Volunteer',
                      ].map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase().replace(' ', '-')}`}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-gray-700 font-medium rounded-lg
                                  hover:bg-gray-50 hover:text-blue-600"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      to="/try-sugar"
                      onClick={closeMenu}
                      className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                              text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700
                              hover:to-blue-800 transition-all duration-300 w-full"
                    >
                      TRY NOW
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </>
  );
};

export default Header;
