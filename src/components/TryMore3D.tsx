import { Marquee } from '@/components/magicui/Marquee';
import {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
} from '@/constants/TryMore3D';

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
    <figure className="relative h-full w-36 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function TryMore() {
  return (
    <div className="relative flex flex-col lg:flex-row h-auto lg:h-96 w-full items-center justify-center gap-6 lg:gap-4 overflow-hidden [perspective:300px] px-4 sm:px-6 md:px-10 lg:pl-20 bg-gradient-to-b from-[#F5DDC8] to-white-800">
      <div className="height- 30px"></div>
      {/* Left Side Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#975555] dark:text-[#975555]">
          Check out the <br className="hidden lg:block" /> remaining hundreds{' '}
          <br className="hidden lg:block" /> of activities!
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300">
          Important: Please know that in order to install and try them, you need
          to be running the Sugar Desktop Environment. If you don’t have that
          already, please reconsider your other options to explore Sugar. Try
          Sugar!
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
          Go to sugar activity page
        </button>
      </div>

      {/* Marquee Section */}
      <div
        className="flex flex-col lg:flex-row items-center gap-4 max-[1040px]:hidden"
        style={{
          transform:
            'translateX(0px) translateY(0px) translateZ(0px) rotateX(10deg) rotateY(-5deg) rotateZ(10deg)',
        }}
      >
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] w-full lg:w-auto"
        >
          {fourthRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="height- 20px"></div>
    </div>
  );
}
