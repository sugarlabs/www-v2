import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../constants/Testimonials";
import { stats } from "../constants/Stats"; 

const settings1 = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const settings2 = {
  ...settings1,
  rtl: true, // Moves the second slider in the opposite direction
};

const Testimonials = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white-800 to-[#F5DDC8] p-6">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="font-bold tracking-wider font-Caveat text-6xl text-gray-800 mb-6 text-center">
          <span className="text-black">
            Words of appreciation and<br /> admiration from others.
          </span>
        </h2>

        <div className="w-full max-w-6xl">
                <Slider {...settings1}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-4">
                      <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center min-h-[250px] h-auto w-[350px]">
                      <img
                        src={stats.apostrophie}
                        alt="double-quotes"
                        className="w-10 h-10 self-start"
                        
                      />
                        <p className="text-gray-700 mt-2">{testimonial.feedback}</p>
                        <div className="flex items-center mt-4 space-x-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full "
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>


        <div className="h-6"></div> {/* Creates a gap */}

        <div className="w-full max-w-6xl">
                <Slider {...settings2}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-4">
                      <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center min-h-[250px] h-auto w-[350px]">
                      <img
                        src={stats.apostrophie}
                        alt="double-quotes"
                        className="w-10 h-10 self-start"
                      />
                        <p className="text-gray-700 mt-2">{testimonial.feedback}</p>
                        <div className="flex items-center mt-4 space-x-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>


      </div>
    </div>
  );
};

export default Testimonials;
