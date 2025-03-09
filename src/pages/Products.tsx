import { ProductDisplay } from '@/components/Products/ProductDisplay';
import Header from '@/sections/Header';
import { subtleRise } from '@/styles/Animations';
import { motion } from 'framer-motion';
import { ProductConstants } from '@/constants/Info';

const Products = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={subtleRise}
        >
          <h1 className="text-5xl md:text-9xl text-center my-8 py-4 md:py-10 font-Oswald font-thin tracking-[0.05em]">
            OUR <span className="text-[#FF4F01]">PRODUCTS</span>
          </h1>
        </motion.div>
        <div className="flex flex-col items-center w-full">
          {ProductConstants.map((product, index) => (
            <div key={index} className="w-full max-w-5xl">
              <ProductDisplay
                name={product.name}
                description={product.description}
                images={product.images}
                buyNowLink={product.buyNowLink}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
