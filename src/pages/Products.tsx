import { ProductDisplay } from '@/components/Products/ProductDisplay';
import Header from '@/sections/Header';
import { subtleRise } from '@/styles/Animations';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Product Name',
    description:
      '*This is a mock description* Our premium cotton t-shirt offers exceptional comfort and durability. Made from 100% organic cotton, this versatile piece features a classic fit, reinforced seams, and a tagless collar for maximum comfort. Perfect for everyday wear, this t-shirt maintains its shape and softness even after multiple washes.',
    images: ['/assets/Images/sugarTshirtBlue.jpeg'],
    buyNowLink: 'https://www.bonfire.com/sugar-labs-education/',
  },
  {
    name: 'Product Name',
    description:
      '*This is a mock description* Our classic hoodie is made from ultra-soft fleece, providing warmth and comfort. Featuring a relaxed fit, a spacious front pocket, and an adjustable drawstring hood, it is perfect for casual outings or lounging at home.',
    images: [
      '/assets/Images/sugarTshirtWhite.jpeg',
      '/assets/Images/sugarTshirtWhite.jpeg',
    ],
    buyNowLink: 'https://www.example.com/classic-hoodie',
  },
];

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
          {products.map((product, index) => (
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
