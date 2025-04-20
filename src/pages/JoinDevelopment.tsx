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
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
        <JoinToggle />
        <motion.div
          className="mt-20 max-w-4xl flex flex-col items-center text-center px-6"
          variants={slideInBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat]">
            Before Beginning to Contribute
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />
          <p className="text-lg text-gray-700 font-[Inter] leading-relaxed mt-6">
            As a developer, whether you are just starting out or you've
            participated in other development before, there are a few things you
            need to know about our community. This page has important
            information on not just where to find the code, documentation, and
            how to reach us, but it also has information on our philosophy and a
            link to our Code of Conduct.
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <DeveloperTestimonials />

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
              <span className="inline-block px-3 py-1 bg-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                Resources
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-[Caveat] mb-4">
                Important Links for Developers
              </h2>
              <div className="w-24 h-1 bg-blue-700 rounded mx-auto mb-6"></div>
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
