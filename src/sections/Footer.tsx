import { Link } from 'react-router-dom';
import GithubIcon from '/assets/social/github.svg';
import {
  socialLinks,
  resourceLinks,
  developmentLinks,
  quickLinks,
} from '@/constants/Footer';

const Footer = () => {
  return (
    <>
      <footer className="bg-linear-to-b from-gray-50 to-gray-100 text-gray-700 dark:from-gray-900 dark:to-gray-950 dark:text-gray-300 py-10 sm:py-16 px-4 sm:px-6 relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>

        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 mb-8 sm:mb-12">
            {/* Resources Section */}
            <div className="lg:col-span-3">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white relative inline-block">
                Resources
                <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-blue-400 dark:bg-blue-500"></span>
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={`${link.to}`}
                      className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Development Section */}
            <div className="lg:col-span-3">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white relative inline-block">
                Development
                <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-purple-400 dark:bg-purple-500"></span>
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {developmentLinks.map((link) => (
                  <li key={link.to || link.href}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-2 bg-purple-400 dark:bg-purple-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        to={`${link.to}`}
                        className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-2 bg-purple-400 dark:bg-purple-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Contribute Section */}
            <div className="sm:col-span-2 lg:col-span-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white relative inline-block">
                Connect With Us
                <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-pink-400 dark:bg-pink-500"></span>
              </h2>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
                      bg-gray-200/70 hover:bg-gray-300 dark:bg-gray-800/30 dark:hover:bg-gray-700 rounded-xl 
                      transition-all duration-300 ease-in-out
                      hover:scale-110
                      before:absolute before:inset-0 before:rounded-xl
                      before:bg-linear-to-r before:from-blue-400/10 before:to-purple-400/10
                      dark:before:from-blue-500/20 dark:before:to-purple-500/20
                      before:opacity-0 before:transition-opacity before:duration-300
                      hover:before:opacity-100 hover:shadow-lg hover:shadow-blue-400/20 dark:hover:shadow-blue-500/10"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      width={18}
                      height={18}
                      className="relative z-10 transition-transform duration-300
                        filter dark:brightness-0 dark:invert opacity-80 dark:opacity-90 
                        group-hover:opacity-100 group-hover:scale-110
                        sm:w-5 sm:h-5"
                    />
                    <span
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 
                      whitespace-nowrap text-xs sm:text-sm opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 pointer-events-none text-gray-800 dark:text-gray-300"
                    >
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Contribute Link */}
              <a
                href="https://github.com/sugarlabs/www-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200/70 hover:bg-gray-300 
                  dark:bg-gray-800/50 dark:hover:bg-gray-700 
                  rounded-lg transition-all duration-300 transform hover:-translate-y-1 
                  hover:shadow-lg hover:shadow-gray-300/50 dark:hover:shadow-gray-800/30 mb-6 sm:mb-8 text-sm sm:text-base"
              >
                <img
                  src={GithubIcon}
                  alt="GitHub"
                  width={18}
                  className="filter dark:brightness-0 dark:invert"
                />
                <span className="text-gray-900 dark:text-white">
                  Contribute to this website
                </span>
              </a>

              {/* Organization Info */}
              <div className="p-4 sm:p-6 bg-gray-200/50 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
                <p className="text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Sugar Labs is a registered USA 501(c)(3) tax-exempt,
                  not-for-profit organization, supported by our generous
                  contributors and sponsors.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 py-6 sm:py-8 border-t border-gray-300 dark:border-gray-800">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={`${link.to}`}
                className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 text-xs sm:text-sm"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-500 pt-4 sm:pt-6 border-t border-gray-300 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p>Copyright © {new Date().getFullYear()} Sugar Labs (R)</p>
            <p className="text-center sm:text-right">
              Available under the{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300 underline decoration-dotted"
              >
                Creative Commons Attribution-ShareAlike 4.0 International
                License (CC BY-SA)
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
