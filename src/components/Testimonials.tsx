import { Marquee } from '@/components/magicui/Marquee'; // Marquee for scrolling effect
import { testimonials } from '@/constants/Testimonials';
import { stats } from '@/constants/Stats';

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 flex flex-col items-center text-center min-h-[250px] h-auto w-[350px] shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Quote Icon */}
      <img
        src={stats.apostrophie}
        alt="double-quotes"
        className="w-10 h-10 self-start opacity-70"
      />
      {/* Feedback Text */}
      <p className="text-gray-700 dark:text-gray-300 mt-2">{body}</p>

      {/* User Info */}
      <div className="flex items-center mt-4 space-x-3">
        <img
          src={img}
          alt={name}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  // Split testimonials into two rows for smooth animation effect
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <div className="w-full bg-gradient-to-b from-white-800 to-[#F5DDC8] p-6">
      {/* Heading Section with Hearts */}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {/* Left Heart */}
        <img
          src={stats.leftHeart}
          alt="Heart Left"
          className="w-8 md:w-12 lg:w-16 fill-current text-red-500 border-none shadow-none"
        />

        <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Left Apostrophe (Hidden Below 400px) */}
          <img
            src={stats.apostrophie}
            alt="Apostrophe Left"
            className="w-8 md:w-12 lg:w-16 -translate-y-2 block max-[400px]:hidden"
          />

          {/* Heading */}
          <h2 className="font-bold tracking-wider font-Caveat text-3xl md:text-5xl lg:text-6xl text-gray-800 text-center">
            <span className="text-black">
              Words of appreciation and
              <br /> admiration from others.
            </span>
          </h2>

          {/* Right Apostrophe (Flipped, Hidden Below 400px) */}
          <img
            src={stats.apostrophie}
            alt="Apostrophe Right"
            className="w-8 md:w-12 lg:w-16 -translate-y-2 scale-x-[-1] block max-[400px]:hidden"
          />
        </div>

        {/* Right Heart */}
        <img
          src={stats.rightHeart}
          alt="Heart Right"
          className="w-8 md:w-12 lg:w-16 fill-current text-red-500 border-none shadow-none"
        />
      </div>

      {/* Testimonials Section */}
      <div className="relative flex flex-col items-center justify-center w-full overflow-hidden mt-6">
        {/* First Row (left to right) */}
        <Marquee pauseOnHover className="w-full">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Second Row (right to left) */}
        <Marquee reverse pauseOnHover className="w-full mt-4">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Gradient Fading Effect for Smooth UI */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
