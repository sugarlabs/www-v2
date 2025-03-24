import React, { useState } from 'react';
import { DirectorCardProps, SocialLinkProps } from '@/constants/Leadership';

const DirectorCard: React.FC<DirectorCardProps> = ({ director }) => {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = imageError || !director.imageUrl;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center pt-8 pb-4 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          {showPlaceholder ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-700 text-2xl font-bold">
              {director.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          ) : (
            <img
              src={director.imageUrl}
              alt={`${director.name}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 gap-3">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">{director.name}</h3>
          {director.position && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {director.position}
            </p>
          )}
        </div>

        <div className="w-16 h-0.5 bg-gray-200 mx-auto"></div>
        <div className="flex-grow">
          <div className="text-gray-600 text-sm leading-relaxed max-h-28 overflow-y-auto pr-1 custom-scrollbar">
            {director.bio || 'No biography available.'}
          </div>
        </div>

        <div className="pt-3 mt-auto border-t border-gray-100">
          <div className="flex items-center justify-center gap-4">
            {director.socialLinks?.linkedin && (
              <SocialLink
                href={director.socialLinks.linkedin}
                aria="LinkedIn"
                icon={<LinkedInIcon />}
              />
            )}
            {director.socialLinks?.github && (
              <SocialLink
                href={director.socialLinks.github}
                aria="GitHub"
                icon={<GitHubIcon />}
              />
            )}
            {director.socialLinks?.wiki && (
              <SocialLink
                href={director.socialLinks.wiki}
                aria="Wiki"
                icon={<WikiIcon />}
              />
            )}
            {!director.socialLinks?.linkedin &&
              !director.socialLinks?.github &&
              !director.socialLinks?.wiki && (
                <span className="text-xs text-gray-400">
                  No social links available
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, aria, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-red-500 transition-colors"
    aria-label={aria}
  >
    {icon}
  </a>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);
const WikiIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 5h2l2.5 9L12 5h2l3.5 9L20 5h2l-4 14h-2l-4-10-4 10H6L2 5z" />
  </svg>
);

export default DirectorCard;
