import { motion } from 'framer-motion';
import {
  fadeInUpAnimation,
  zoomInAnimation,
  staggerContainer,
} from '@/styles/Animations.ts';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Product from '@/components/Product';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Parent container to control animation sequence */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-center mb-6 font-[Oswald] tracking-wide py-8"
            variants={fadeInUpAnimation}
          >
            <span className="text-black">OUR</span>{' '}
            <span className="text-orange-500">PRODUCTS</span>
          </motion.h2>
          <motion.div variants={zoomInAnimation}>
            <Product />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
