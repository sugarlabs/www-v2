import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { DeveloperTestimonials } from '@/components/DeveloperTestimonials';
import DeveloperLinks from '@/components/DeveloperLinks';
import JoinToggle from '@/components/JoinToggle';
import { motion } from 'framer-motion';
import { slideInBottom } from '@/styles/Animations';

const JoinDevelopment = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
        <JoinToggle />

        {/* Getting Involved Section */}
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

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            As a developer, whether you are just starting out or you've
            participated in other development before, there are a few things you
            need to know about our community. This page has important
            information on not just where to find the code, documentation, and
            how to reach us, but it also has information on our philosophy and a
            link to our Code of Conduct.
          </p>
        </motion.div>

        <DeveloperTestimonials />

        {/* Important Links */}
        <motion.div
          className="mt-20 max-w-4xl flex flex-col items-center text-center px-6"
          variants={slideInBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat]">
            Important Links for Developers
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            List of important links for people interested in making development
            contributions to Sugar Labs:
          </p>
        </motion.div>

        <DeveloperLinks />
      </main>
      <Footer />
    </div>
  );
};

export default JoinDevelopment;
