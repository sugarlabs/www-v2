import { useState } from 'react';
import { products, ProductType } from '@/constants/ProductsData';

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
  const imageUrls = Object.values(product.colors); // Get all image URLs
  const hasMultipleImages = imageUrls.length > 1; // Check if there are multiple images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-10">
      {/* Product Image / Carousel */}
      <div className="relative">
        <img
          src={imageUrls[currentImageIndex]}
          alt={product.name}
          className="w-full rounded-lg shadow-md"
        />

        {/* Image Carousel Controls (only if multiple images exist) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Product Details */}
      <div>
        <h3 className="text-3xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Buy Now Button (Links to an external page) */}
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
