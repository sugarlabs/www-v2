import 'react-responsive-carousel';
import { Carousel } from 'react-responsive-carousel';
import { steps } from '@/constants/TryNowData/bootableSoasData';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { renderContentWithLinks } from '@/utils/renderlinks-utils';

const StepsToUse = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="w-[90%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        Steps to Boot Sugar on a Stick
      </h2>

      <div className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
        <Carousel
          selectedItem={currentStep}
          onChange={(index) => setCurrentStep(index)}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          useKeyboardArrows
          infiniteLoop
        >
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* TEXT CONTENT */}
              <div className="text-lg font-semibold text-gray-600">
                Step {index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-black mt-1">
                {step.title}
              </h3>
              <p
                className="text-gray-700 mt-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    renderContentWithLinks(step.description, step.links),
                  ),
                }}
              />

              {/* IMAGE + HOVER ARROWS */}
              <div className="relative group mx-auto mt-4 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-auto rounded-lg"
                />

                {/* LEFT HOVER AREA */}
                {index > 0 && (
                  <div
                    className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                  </div>
                )}

                {/* RIGHT HOVER AREA */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default StepsToUse;
