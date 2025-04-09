import { useState } from 'react';
import { products, ProductType } from '@/constants/ProductsData';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Product = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: ProductType }) => {
  const imageUrls = Object.values(product.colors);
  const hasMultipleImages = imageUrls.length > 1;
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-10">
      {/* Product Image Carousel with custom hover controls */}
      <div className="relative group w-full">
        <Carousel
          selectedItem={currentImage}
          onChange={(index) => setCurrentImage(index)}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          infiniteLoop
          useKeyboardArrows
          swipeable
        >
          {imageUrls.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`${product.name} image ${idx + 1}`}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          ))}
        </Carousel>

        {/* LEFT hover zone */}
        {hasMultipleImages && currentImage > 0 && (
          <div
            className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
            onClick={() => setCurrentImage((prev) => prev - 1)}
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white" />
          </div>
        )}

        {/* RIGHT hover zone */}
        {hasMultipleImages && currentImage < imageUrls.length - 1 && (
          <div
            className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
            onClick={() => setCurrentImage((prev) => prev + 1)}
          >
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div>
        <h3 className="text-3xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <div className="mt-6">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
