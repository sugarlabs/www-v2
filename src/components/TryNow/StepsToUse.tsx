import 'react-responsive-carousel';
import { Carousel } from 'react-responsive-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
            <div key={index} className="text-center relative">
              {index > 0 && (
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-lg transition hover:bg-gray-400"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowLeft size={30} />
                </button>
              )}

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

              <img
                src={step.image}
                alt={step.title}
                className="mx-auto mt-4 rounded-lg shadow-lg w-3/4 sm:w-2/3 md:w-1/2 h-auto"
              />

              {index < steps.length - 1 && (
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-lg transition hover:bg-gray-400"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  <ArrowRight size={30} />
                </button>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default StepsToUse;
