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
    title:
      'Help us reach our goal - $15,000 needed for our new community center ',
    description:
      'Your contribution makes a difference in our community. Join 230 others who have already donated.',
    buttonText: 'Donate Now',
    buttonLink: '/donate',
    theme: 'primary' as const,
  },

  sale: {
    title: 'Flash Sale! 48 Hours Only - 40% OFF All Premium Templates ',
    description: 'Use code FLASH40 at checkout. Ends Sunday at midnight.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    theme: 'sale' as const,
  },

  newRelease: {
    title: 'New Product Launch! Introducing our AI-powered design tools ',
    buttonText: 'Learn More',
    buttonLink: '/products',
    theme: 'info' as const,
  },

  limitedOffer: {
    title: 'Limited Time Offer - Early Bird Tickets Available ',
    description: 'Register now and save 30% on conference tickets',
    buttonText: 'Register',
    buttonLink: '/volunteer',
    theme: 'warning' as const,
  },

  successStory: {
    title: 'Success Story: How Our Tools Helped a Small Business Thrive',
    description: 'Read about how our solutions transformed a local business.',
    buttonText: 'Read Story',
    buttonLink: '/news/sugar-stories',
    theme: 'success' as const,
  },

  feedback: {
    title: 'We Value Your Feedback',
    description: 'Take our short survey and help us improve your experience',
    buttonText: 'Give Feedback',
    buttonLink: '/contact-us',
    theme: 'info' as const,
  },

  seasonalPromo: {
    title: 'Spring Sale! Refresh Your Wardrobe with 30% OFF',
    description: 'New season, new styles. Use code SPRING30 at checkout.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    theme: 'sale' as const,
  },

  securityUpdate: {
    title: 'Security Update: Protect Your Account',
    description:
      'Enable two-factor authentication to enhance your account security.',
    buttonText: 'Learn How',
    buttonLink: 'https://www.example.com',
    theme: 'warning' as const,
    isExternalLink: true,
  },
};
