import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  heroContent,
  images,
  ImageConfig,
  mission,
} from '../constants/Info.ts';

const Info: React.FC = () => {
  const renderImageCard = (key: string, image: ImageConfig) => (
    <div
      key={key}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
									transition-all duration-500 bg-white"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full max-h-80 md:h-96 object-cover transform group-hover:scale-105 
										transition-all duration-700 ease-out"
        loading="lazy"
        width={800}
        height={600}
        decoding="async"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                       to-transparent p-4 md:p-8"
        >
          <p className="text-white font-medium text-lg md:text-xl">
            {image.caption}
          </p>
        </div>
      )}
    </div>
  );

  const renderCarouselItem = (key: string, image: ImageConfig) => (
    <div key={key} className="relative">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-64 object-cover"
        loading="lazy"
        width={800}
        height={600}
        decoding="async"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                       to-transparent p-4"
        >
          <p className="text-white font-normal text-base">{image.caption}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-Inter">
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-20">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-8 max-w-7xl">
            <div
              className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl 
                         transform hover:scale-[1.01] transition-all duration-500 
                         ease-out bg-white"
            >
              <img
                src={images.main.src}
                alt={images.main.alt}
                className="w-full h-[500px] md:h-[700px] object-cover"
								width={1920}
								height={700}
								loading="eager"
								fetchPriority="high"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 
                           via-black/50 to-transparent"
              />
              <div
                className="absolute top-1/2 left-2 md:left-12 transform -translate-y-1/2 
                           text-white max-w-2xl"
              >
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 
                           leading-tight tracking-tight animate-fade-in font-display"
                >
                  {heroContent.title}
                </h1>
                <p
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 
                           animate-fade-in-delayed font-light"
                >
                  {heroContent.description}
                </p>
              </div>
            </div>

            {/* Desktop Image Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(images)
                .filter(([key]) => key.startsWith('bottom'))
                .map(([key, image]) => renderImageCard(key, image))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                transitionTime={500}
                className="rounded-2xl overflow-hidden"
                stopOnHover
                swipeable
                emulateTouch
              >
                {Object.entries(images)
                  .filter(([key]) => key.startsWith('bottom'))
                  .map(([key, image]) => renderCarouselItem(key, image))}
              </Carousel>
            </div>
          </section>

          {/* Mission Section */}
          <section className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-10">
              <div
                className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r 
                           from-red-500/10 to-orange-500/10 rounded-full"
              >
                <span
                  className="text-4xs md:text-sm font-bold text-red-600 tracking-wider 
                             uppercase"
                >
                  Empowering Young Learners
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black space-y-2 
                           font-display tracking-tight"
              >
                <span className=" font-bold tracking-wider font-Caveat text-8xl">
                  Our Mission?
                </span>
                <div>
                  <div
                    className="text-transparent bg-clip-text bg-gradient-to-r 
                                from-red-500 to-orange-500 font-Caveat text-8xl"
                  >
                    Authentic
                  </div>
                  <span className="font-semibold">Problem</span>
                  <br />
                  <span className="font-semibold">Solving</span>
                </div>
              </h2>

              <h4 className="text-lg md:text-xl font-bold text-gray-800">
                Igniting Curiosity through Project Based Learning
              </h4>

              <p className="text-gray-600 text-base md:text-lg font-Roboto">
                Empowering Young Minds with Hands-on Learning, Transforming
                Curiosity into Discovery and Innovation.
              </p>
            </div>

            <div className="relative">
              <div className="  bg-auto rounded-2xl overflow-hidden shadow-xl">
                {/* Card on Top Left */}
                <div
                  className="absolute top-2 left-2 md:top-2 md:left-2 bg-auto
                      backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg 
                      max-w-xs md:max-w-sm transform hover:scale-105 
                      transition-all duration-300 ease-out z-10 border-2 border-white"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2n text-gray-900 font-AnonymousPro">
                    Project Based Learning
                  </h3>
                  <p className="text-white text-xs md:text-sm">
                    Empowering learners and educators with hands-on
                    project-based tools that enable creation and real-world
                    problem-solving.
                  </p>
                </div>

                {/* Background Image */}
                <img
                  src={mission.learnImage}
                  alt="Students learning"
                  className="w-full rounded-2xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
                  loading="lazy"
									width={800}
									height={600}
									decoding="async"
                />

                {/* Card on Bottom Right */}
                <div
                  className="absolute bottom-4 right-4 md:bottom-2 md:right-2 bg-auto
                      backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg 
                      max-w-xs md:max-w-sm transform hover:scale-105 
                      transition-all duration-300 ease-out z-10 border-2 border-white"
                >
                  <h3 className="text-md md:text-lg font-bold mb-1 md:mb-2 text-amber-100 font-AnonymousPro">
                    Challenge and Fun: It's hard fun.
                  </h3>
                  <p className="text-white text-xs md:text-sm leading-snug">
                    Bringing interactive, meaningful experiences that make
                    education exciting and impactful.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Info;
