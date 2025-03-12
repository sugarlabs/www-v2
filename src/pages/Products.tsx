import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Product from '@/components/Product';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Responsive Heading */}
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-center mb-6 font-[Oswald] tracking-wide py-8">
          <span className="text-black">OUR</span>{' '}
          <span className="text-orange-500">PRODUCTS</span>
        </h2>

        <Product />
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
