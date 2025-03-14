import { useState } from 'react';

interface FeatureData {
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  images?: { src: string; alt: string }[];
  note?: string;
  extraImage?: { src: string; alt: string };
}

const FeatureSection = ({ data }: { data: FeatureData }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className="w-[90%] mx-auto py-10 flex flex-col md:flex-row items-center gap-10">
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-5xl font-bold text-blue-600">{data.title}</h1>
        <h2 className="text-4xl font-bold text-black mt-2">{data.subtitle}</h2>
        <p className="text-lg font-semibold mt-4">{data.quote}</p>
        <p className="text-gray-700 mt-4">{data.description}</p>
      </div>

      {/* Right Side: Image Carousel */}
      <div className="md:w-1/2 flex flex-col justify-center items-center relative">
        {data.images && data.images.length > 0 ? (
          <>
            {/* Display Active Image */}
            <img
              src={data.images[currentImage].src}
              alt={data.images[currentImage].alt}
              className="w-full max-w-lg rounded-lg shadow-md"
            />

            {/* Dotted Navigation */}
            <div className="flex mt-4 space-x-2">
              {data.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentImage ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-lg h-64 bg-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}
      </div>

      {/* Optional Note */}
      {data.note && (
        <p className="text-black font-bold mt-6 text-center w-full">
          {data.note}
        </p>
      )}
    </section>
  );
};

export default FeatureSection;
