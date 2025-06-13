export interface BannerConfig {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'primary' | 'success' | 'warning' | 'sale' | 'info';
  isExternalLink?: boolean;
}

export interface IconProps {
  theme: 'primary' | 'success' | 'warning' | 'sale' | 'info';
}

export const bannerConfigs = {
  donation: {
    title: 'Help us reach our next fundraising milestone.',
    description:
      'Through every.org, we accept donations via credit card, ACH, PayPal, crypto, stocks, DAF, and Venmo.',
    buttonText: 'Donate Now',
    buttonLink: '/donate',
    theme: 'primary' as const,
  },

  sale: {
    title: 'Have you seen our merchandise?',
    description:
      'Check out t-shirts, hoodies, and bootable USB sticks, all with the official Sugar Labs logo.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    theme: 'info' as const,
  },

  limitedOffer: {
    title: 'Interested in joining the community?',
    description:
      'Learn more about the first steps to volunteering for Sugar Labs.',
    buttonText: 'Learn more',
    buttonLink: '/volunteer',
    theme: 'info' as const,
  },

  announcement: {
    title: 'This is our new website!',
    description:
      "We've launched our new website. If you found something missing, please let us know in a GitHub issue.",
    buttonText: 'Report an issue',
    buttonLink: 'https://github.com/sugarlabs/www-v2',
    theme: 'info' as const,
    isExternalLink: true,
  },

  successStory: {
    title:
      'Learn more about Sugar Labs through a Sugar Story, told by members of our community.',
    description:
      '"Sugar Stories" are stories told by members of the Sugar Labs community.',
    buttonText: 'Read Story',
    buttonLink: '/news/sugar-stories',
    theme: 'success' as const,
  },

  webinar: {
    title: 'Live online events',
    description:
      'Join us Fridays, starting 4/25/25 at 17:00 UTC (1:00pm EDT) to celebrate our website launch and learn more about Sugar Labs.',
    buttonText: 'Subscribe for reminders',
    buttonLink: 'https://www.youtube.com/@SugarlabsOrg-EN',
    theme: 'info' as const,
    isExternalLink: true,
  },

  feedback: {
    title: 'We value your feedback',
    description: 'Take our short survey and help us improve your experience.',
    buttonText: 'Give Feedback',
    buttonLink: '/contact-us',
    theme: 'info' as const,
  },
};
