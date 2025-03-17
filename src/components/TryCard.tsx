import React from 'react';
import { Link } from 'react-router-dom';

interface TryCardProps {
  title: string;
  description: string;
  tryNowText: string;
  tryNowHref: string;
  learnMoreText: string;
  learnMoreHref: string;
  imagePath: string;
  gradientClass?: string;
}

interface ActivityCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  href: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  href,
}) => (
  <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center shadow-lg transition-transform hover:scale-105">
    <img
      src={icon}
      alt={title}
      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4"
    />
    <h3 className="flex-1/3 text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
      {title}
    </h3>
    <p className="flex-1/3 text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
      {description}
    </p>
    <a href={href} className="w-full">
      <button className="flex-1/3 w-full py-2 sm:py-3 px-4 sm:px-6 border-2 border-gray-900 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
        {buttonText}
      </button>
    </a>
  </div>
);

export const TryCard: React.FC<TryCardProps> = ({
  title,
  description,
  tryNowText,
  tryNowHref,
  learnMoreText,
  learnMoreHref,
  imagePath,
  gradientClass,
}) => (
  <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[rgba(13,_38,_76,_0.25)_0px_12px_28px] transition-all duration-500 overflow-hidden mx-auto w-full group h-full">
    <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
      {/* Content Section */}
      <div className="flex-1 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 text-center w-full">
          <h2 className="text-lg sm:text-xl font-black text-gray-800 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text group-hover:scale-[1.02] transition-transform duration-500">
            {title}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mx-auto font-medium tracking-wide">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2 sm:space-y-2.5 flex flex-col items-center pt-2 sm:pt-3">
          <a
            href={tryNowHref}
            className={`w-full text-white font-bold px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl 
                       transition-all duration-500 hover:scale-[1.02] hover:shadow-lg 
                       active:scale-95 text-xs sm:text-sm backdrop-blur-sm relative overflow-hidden
                       ${gradientClass || 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'}
                       before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-150%] before:skew-x-[45deg]
                       hover:before:translate-x-[150%] before:transition-transform before:duration-700
                       `}
          >
            {tryNowText}
          </a>
          <Link
            to={learnMoreHref}
            className="w-full bg-gray-50/80 backdrop-blur-sm border-[1.5px] border-gray-100 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3
                     font-bold transition-all duration-500 hover:scale-[1.02] 
                     hover:bg-gray-100/80 hover:border-gray-200 text-gray-700 text-xs sm:text-sm
                     active:scale-95 relative overflow-hidden
                     before:absolute before:inset-0 before:bg-gray-400/20 before:translate-x-[-150%] before:skew-x-[45deg]
                     hover:before:translate-x-[150%] before:transition-transform before:duration-700"
          >
            {learnMoreText}
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="-mx-4 sm:-mx-5 md:-mx-6 -mb-4 sm:-mb-5 md:-mb-6 mt-4 sm:mt-5 md:mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent h-8 sm:h-10 md:h-12 z-10" />
        <img
          src={imagePath}
          alt={title}
          className="w-full h-36 sm:h-40 md:h-48 object-cover transform transition-all duration-700 
                     group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  </div>
);
