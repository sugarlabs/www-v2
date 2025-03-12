'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDisplayProps {
  name: string;
  description: string;
  images: string[];
  buyNowLink: string;
}

const parseMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
};

export const ProductDisplay = ({
  name,
  description,
  images = [],
  buyNowLink,
}: ProductDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (!images || images.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    if (!images || images.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <div className="overflow-hidden rounded-2xl border relative">
          <img
            src={
              images && images.length > 0
                ? images[currentIndex]
                : '/placeholder.svg'
            }
            alt={`${name} - View ${currentIndex + 1}`}
            className="object-cover transition-all duration-300"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="size-4 text-gray-700" />
              </button>
            </>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors border ${
                    currentIndex === index
                      ? 'bg-black border-black'
                      : 'bg-white border-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {name}
          </h1>
          <div className="mt-4">
            <h2 className="text-md font-medium text-gray-900 text-wrap">
              Description
            </h2>
            <div
              className="mt-2 text-gray-600 text-sm sm:text-md overflow-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
            />
            <div className="mt-6">
              <a
                href={buyNowLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-[150px] px-6 py-3 text-center text-base font-medium bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors shadow-sm hover:shadow-md"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
