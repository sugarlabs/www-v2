import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { DeveloperTestimonials } from '@/components/DeveloperTestimonials';
import DeveloperLinks from '@/components/DeveloperLinks';
import JoinToggle from '@/components/JoinToggle';
import { motion } from 'framer-motion';
import { slideInBottom } from '@/styles/Animations';
import { useEffect } from 'react';

const JoinDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-red-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
        <JoinToggle />

        {/* Getting Involved Section */}
        <motion.div
          className="mt-20 max-w-4xl flex flex-col items-center text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat] dark:text-white">
            Before Beginning to Contribute
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 dark:border-gray-600 mx-auto mt-2" />

          <p className="text-lg text-gray-700 dark:text-gray-300 font-[Inter] mt-6 leading-relaxed">
            As a developer, whether you are just starting out or you've
            participated in other development before, there are a few things you
            need to know about our community. This page has important
            information on not just where to find the code, documentation, and
            how to reach us, but it also has information on our philosophy and a
            link to our Code of Conduct.
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <div className="w-full mt-16">
          <DeveloperTestimonials />
        </div>

        {/* Thank You to Website Contributors */}
        <section className="py-16 w-full" id="contributors">
          <motion.div
            className="max-w-5xl mx-auto px-6"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
                ❤️ Thank Yous
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-[Caveat] mb-4 dark:text-white">
                Website Contributors
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A huge thank you to all the amazing developers who have
                contributed to building and improving the Sugar Labs website!
                Your dedication and hard work make our community stronger. 🚀
              </p>
            </div>

            {/* Contributors Grid */}
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-red-200 dark:border-red-900/30">
                <a
                  href="https://github.com/sugarlabs/www-v2/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://contrib.rocks/image?repo=sugarlabs/www-v2"
                    alt="Sugar Labs Website Contributors"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </a>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Click on the avatars above to view all contributors on
                    GitHub
                  </p>
                  <a
                    href="https://github.com/sugarlabs/www-v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Important Links Section with Anchor */}
        <section className="py-16 w-full" id="links">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
                Resources
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-[Caveat] mb-4 dark:text-white">
                Important Links for Developers
              </h2>
              <div className="w-24 h-1 bg-red-700 dark:bg-red-500 rounded mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Essential resources for people interested in making development
                contributions to Sugar Labs
              </p>
            </div>

            <DeveloperLinks />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinDevelopment;
