import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { DeveloperTestimonials } from '@/components/DeveloperTestimonials';
import DeveloperLinks from '@/components/DeveloperLinks';
import JoinToggle from '@/components/JoinToggle';
import { motion } from 'framer-motion';
import { slideInBottom } from '@/styles/Animations';

const JoinDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <Header />

      {/* Hero Section with Pattern Background */}
      <div className="relative overflow-hidden bg-indigo-900 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Join Our Development Community
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Be part of a global team building educational software that
              empowers children to learn and create
            </p>
            <JoinToggle />
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-6">
        {/* Getting Involved Section with Card Layout */}
        <section className="py-16">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="md:flex">
              <div className="md:w-2/5 bg-indigo-600 p-8 flex items-center justify-center">
                <div className="text-white">
                  <h2 className="text-3xl md:text-4xl font-bold font-[Caveat] mb-4">
                    Before You Begin
                  </h2>
                  <div className="w-16 h-1 bg-white rounded mb-6"></div>
                  <p className="text-indigo-100">
                    Important things to know before contributing to our
                    community
                  </p>
                </div>
              </div>

              <div className="md:w-3/5 p-8">
                <p className="text-gray-700 leading-relaxed">
                  As a developer, whether you are just starting out or you've
                  participated in other development before, there are a few
                  things you need to know about our community. This page has
                  important information on not just where to find the code,
                  documentation, and how to reach us, but it also has
                  information on our philosophy and a link to our Code of
                  Conduct.
                </p>
                <div className="mt-6">
                  <a
                    href="#links"
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                    <span>View Important Links</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <DeveloperTestimonials />
        </section>

        {/* Important Links Section with Anchor */}
        <section className="py-16" id="links">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center mb-2">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
                Resources
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-[Caveat] mb-4">
                Important Links for Developers
              </h2>
              <div className="w-24 h-1 bg-indigo-600 rounded mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
