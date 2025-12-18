import { useState, useEffect } from 'react';
import { ProductType } from '@/constants/ProductsData';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductCard = ({ product }: { product: ProductType }) => {
  const imageUrls = Object.values(product.colors);
  const hasMultipleImages = imageUrls.length > 1;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, imageUrls.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b dark:border-gray-700 pb-10">
      {/* Product Image Carousel with custom hover controls */}
      <div className="relative group w-full">
        <Carousel
          selectedItem={currentImage}
          onChange={(index) => setCurrentImage(index)}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={hasMultipleImages}
          infiniteLoop={hasMultipleImages}
          useKeyboardArrows={hasMultipleImages}
          swipeable={hasMultipleImages}
          renderIndicator={(onClickHandler, isSelected, index) => (
            <button
              type="button"
              className={`mx-1 h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                isSelected
                  ? 'bg-gray-800 dark:bg-gray-300 scale-125'
                  : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
              }`}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              title={`Go to slide ${index + 1}`}
            />
          )}
        >
          {imageUrls.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border-2 border-gray-100"
            >
              <img
                src={img}
                alt={`${product.name} image ${idx + 1}`}
                className="w-full shadow-lg"
              />
            </div>
          ))}
        </Carousel>

        {/* Custom navigation arrows */}
        {hasMultipleImages && (
          <>
            {/* LEFT arrow */}
            <button
              onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))}
              disabled={currentImage === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-800/70 dark:bg-gray-300/70 backdrop-blur-sm transition-all duration-300 ${
                currentImage === 0
                  ? 'opacity-0 cursor-default'
                  : 'opacity-0 group-hover:opacity-100 hover:bg-gray-800/90 dark:hover:bg-gray-300/90'
              }`}
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-white dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* RIGHT arrow */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  Math.min(prev + 1, imageUrls.length - 1),
                )
              }
              disabled={currentImage === imageUrls.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-800/70 dark:bg-gray-300/70 backdrop-blur-sm transition-all duration-300 ${
                currentImage === imageUrls.length - 1
                  ? 'opacity-0 cursor-default'
                  : 'opacity-0 group-hover:opacity-100 hover:bg-gray-800/90 dark:hover:bg-gray-300/90'
              }`}
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-white dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gray-800/70 dark:bg-gray-300/70 backdrop-blur-sm text-sm text-white dark:text-gray-800 font-medium">
            {currentImage + 1} / {imageUrls.length}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-4 md:pt-0">
        <h3 className="text-3xl font-semibold dark:text-white">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {product.description}
        </p>

        <div className="mt-6">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Buy Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
