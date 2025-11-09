import 'react-responsive-carousel';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { renderContentWithLinks } from '@/utils/renderlinks-utils';
import { steps } from '@/constants/TryNowData/bootableSoasData';

const StepsToUse = ({ heading, StepData }: steps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  function clicktocopy(command: string) {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <section className="w-[90%] mx-auto py-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
        {heading}
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
          {StepData.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* TEXT CONTENT */}
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                Step {index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mt-1">
                {step.title}
              </h3>
              <p
                className="text-gray-700 dark:text-gray-300 mt-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    renderContentWithLinks(step.description, step.links),
                  ),
                }}
              />
              {/* Command */}
              {step.commands && (
                <div className="overflow-x-auto overflow-y-hidden commands-scroll w-full mt-4">
                  <div className="relative group inline-flex min-w-max items-center gap-3 px-4 py-2 rounded-lg border border-gray-200/5 bg-slate-800 text-white dark:bg-slate-800 dark:text-white">
                    <button
                      onClick={() => {
                        clicktocopy(step.commands || '');
                      }}
                      className="absolute top-1 right-1 text-gray-400 hover:text-white transition"
                    >
                      {copied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => clicktocopy(step.commands || '')}
                      className="p-2 text-white rounded cursor-pointer whitespace-nowrap font-mono text-sm text-gray-200 truncate"
                    >
                      {`$ ${step.commands}`}
                    </button>
                  </div>
                </div>
              )}
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
                {index < StepData.length - 1 && (
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
