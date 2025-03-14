import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '/assets/Icons/logo.svg';
import NavDropdown from '@/sections/NavDropdown';
import { navigationData } from '@/constants/Header';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown and menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close everything when navigating
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-white/90 shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={handleNavigation}
            >
              <img
                src={logo}
                alt="Sugar Labs"
                className="h-8 md:h-12 w-auto transition-transform hover:scale-105"
              />
            </Link>

            {/* Mobile menu toggle button */}
            <button
              className="md:hidden relative w-10 h-10 focus:outline-none z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'rotate-45 translate-y-1.5'
                      : 'translate-y-[-4px]'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen
                      ? '-rotate-45 -translate-y-1.5'
                      : 'translate-y-[4px]'
                  }`}
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
              {/* Dropdown menus */}
              {Object.entries(navigationData.dropdowns).map(
                ([key, dropdown]) => (
                  <NavDropdown
                    key={key}
                    id={key}
                    label={dropdown.label}
                    items={dropdown.items}
                    isActive={activeDropdown === key}
                    setActive={setActiveDropdown}
                    onNavigate={handleNavigation}
                  />
                ),
              )}

              {/* Regular links */}
              {navigationData.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="px-2 lg:px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md
                            transition-all duration-200 hover:bg-gray-50 text-sm lg:text-base"
                  onClick={handleNavigation}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                to="/try-sugar"
                className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold text-white
                          bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                          transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm lg:text-base"
                onClick={handleNavigation}
              >
                TRY NOW
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onClose={handleNavigation}
      />

      {/* Space holder to prevent content from being hidden under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

// Mobile Navigation Drawer component to keep the main component cleaner
const MobileNavDrawer: React.FC<{
  isOpen: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onClose: () => void;
}> = ({ isOpen, activeDropdown, setActiveDropdown, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed md:hidden top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl z-40
                    flex flex-col h-full"
        >
          <div className="flex flex-col h-full">
            {/* Space to avoid overlay with main header */}
            <div className="h-16" />

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <div className="space-y-4">
                {/* Dropdown menus */}
                {Object.entries(navigationData.dropdowns).map(
                  ([key, dropdown]) => (
                    <div key={key} className="space-y-1">
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === key ? null : key)
                        }
                        className="flex items-center justify-between w-full text-left px-2 py-2
                              text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        aria-expanded={activeDropdown === key}
                      >
                        <span>{dropdown.label}</span>
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
                            <div className="pl-4 space-y-1 pb-2">
                              {dropdown.items.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  onClick={onClose}
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

                {/* Regular links */}
                {navigationData.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-700 font-medium rounded-lg
                            hover:bg-gray-50 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA button footer */}
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <Link
                to="/try-sugar"
                onClick={onClose}
                className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                        text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700
                        hover:to-blue-800 transition-all duration-300 w-full"
              >
                TRY NOW
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;
