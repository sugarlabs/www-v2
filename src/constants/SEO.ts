/**
 * SEO metadata constants for all pages
 *
 * This file centralizes all SEO-related content for easy maintenance
 * and consistency across the website.
 */

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * SEO metadata for all static pages
 */
export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'Home',
    description:
      'Sugar Labs is a nonprofit organization providing free, open-source educational software for children worldwide. Learn, create, and explore with Sugar, Sugarizer, and Music Blocks.',
    keywords: [
      'Sugar Labs',
      'educational software',
      'open source',
      'children education',
      'learning platform',
      'Sugarizer',
      'Music Blocks',
      'OLPC',
    ],
  },

  aboutUs: {
    title: 'About Us',
    description:
      'Learn about Sugar Labs, a nonprofit organization dedicated to creating free educational software for children. Discover our mission, vision, and commitment to open-source learning.',
    keywords: [
      'Sugar Labs about',
      'nonprofit education',
      'open source education',
      'educational mission',
      'learning software',
    ],
  },

  leadership: {
    title: 'Leadership',
    description:
      'Meet the leadership team and board of directors at Sugar Labs. Learn about the people guiding our mission to provide free educational software to children worldwide.',
    keywords: [
      'Sugar Labs leadership',
      'board of directors',
      'nonprofit governance',
      'educational leadership',
    ],
  },

  contactUs: {
    title: 'Contact Us',
    description:
      'Get in touch with Sugar Labs. Find our contact information, join our community on Matrix, or reach out through social media.',
    keywords: [
      'contact Sugar Labs',
      'Sugar Labs email',
      'Sugar Labs Matrix',
      'get in touch',
    ],
  },

  faqs: {
    title: 'Frequently Asked Questions',
    description:
      'Find answers to common questions about Sugar Labs, our educational software, how to get involved, and technical support.',
    keywords: [
      'Sugar Labs FAQ',
      'frequently asked questions',
      'Sugar help',
      'educational software questions',
    ],
  },

  news: {
    title: 'News',
    description:
      'Stay updated with the latest news, announcements, and stories from Sugar Labs. Read about our projects, community updates, and educational initiatives.',
    keywords: [
      'Sugar Labs news',
      'educational software updates',
      'Sugar announcements',
      'community news',
    ],
  },

  authors: {
    title: 'Authors',
    description:
      'Meet the authors and contributors who write for Sugar Labs. Discover their stories, insights, and contributions to open-source education.',
    keywords: [
      'Sugar Labs authors',
      'contributors',
      'blog writers',
      'community members',
    ],
  },

  donate: {
    title: 'Donate',
    description:
      'Support Sugar Labs with a donation. Your contribution helps us provide free educational software to millions of children around the world.',
    keywords: [
      'donate to Sugar Labs',
      'support education',
      'nonprofit donation',
      'educational charity',
    ],
  },

  volunteer: {
    title: 'Volunteer',
    description:
      "Join the Sugar Labs volunteer community. Discover opportunities to contribute to open-source educational software and make a difference in children's lives.",
    keywords: [
      'volunteer Sugar Labs',
      'contribute education',
      'open source volunteering',
      'educational nonprofit volunteer',
    ],
  },

  joinDevelopment: {
    title: 'Join Development',
    description:
      'Become a Sugar Labs developer. Learn how to contribute to our open-source educational projects including Sugar, Sugarizer, Music Blocks, and Turtle Blocks.',
    keywords: [
      'Sugar Labs developer',
      'contribute code',
      'open source development',
      'GitHub Sugar Labs',
      'developer guide',
    ],
  },

  products: {
    title: 'Merchandise',
    description:
      'Shop Sugar Labs merchandise and show your support for open-source education. Browse our collection of branded items and gear.',
    keywords: [
      'Sugar Labs merchandise',
      'Sugar Labs shop',
      'educational merchandise',
      'nonprofit store',
    ],
  },

  trySugar: {
    title: 'Try Sugar',
    description:
      'Experience Sugar Labs software today. Try Sugarizer, Music Blocks, Turtle Blocks, and more - all free and open-source educational tools for learners of all ages.',
    keywords: [
      'try Sugar',
      'Sugarizer demo',
      'Music Blocks',
      'Turtle Blocks',
      'educational software demo',
    ],
  },

  contributors: {
    title: 'Contributors',
    description:
      'Explore the amazing community of contributors who make Sugar Labs possible. View profiles of developers, designers, and volunteers from around the world.',
    keywords: [
      'Sugar Labs contributors',
      'open source community',
      'GitHub contributors',
      'volunteer developers',
    ],
  },

  matrix: {
    title: 'Matrix Chat',
    description:
      'Join the Sugar Labs community on Matrix. Connect with developers, educators, and volunteers in our open communication channels.',
    keywords: [
      'Sugar Labs Matrix',
      'Sugar Labs chat',
      'community chat',
      'developer communication',
    ],
  },

  // Try Now sub-pages
  turtleBlocks: {
    title: 'Turtle Blocks',
    description:
      'Explore Turtle Blocks, a visual programming environment for learning computational thinking. Create art, animations, and learn coding concepts through interactive graphics.',
    keywords: [
      'Turtle Blocks',
      'visual programming',
      'learn coding',
      'educational graphics',
      'Logo programming',
    ],
  },

  sugarizer: {
    title: 'Sugarizer',
    description:
      'Discover Sugarizer, a free educational platform with activities for children. Available on web, Android, iOS, and desktop - learn anywhere, anytime.',
    keywords: [
      'Sugarizer',
      'educational activities',
      'learning app',
      'children education app',
      'cross-platform education',
    ],
  },

  musicBlocks: {
    title: 'Music Blocks',
    description:
      'Create music while learning coding with Music Blocks. An innovative visual programming language that teaches computational thinking through music composition.',
    keywords: [
      'Music Blocks',
      'learn music coding',
      'music programming',
      'computational music',
      'STEAM education',
    ],
  },

  bootableSoas: {
    title: 'Bootable SOAS',
    description:
      'Download Sugar on a Stick (SOAS), a complete Sugar learning environment you can boot from a USB drive. Take your learning environment anywhere.',
    keywords: [
      'Sugar on a Stick',
      'SOAS',
      'bootable Sugar',
      'USB education',
      'portable learning',
    ],
  },

  trisquel: {
    title: 'Trisquel',
    description:
      'Learn how to run Sugar on Trisquel, a fully free GNU/Linux distribution. Set up a complete open-source learning environment.',
    keywords: [
      'Sugar Trisquel',
      'GNU Linux education',
      'free software learning',
      'Trisquel education',
    ],
  },

  raspberry: {
    title: 'Raspberry Pi',
    description:
      'Install Sugar on Raspberry Pi for an affordable learning computer. Get started with open-source education on low-cost hardware.',
    keywords: [
      'Sugar Raspberry Pi',
      'Pi education',
      'affordable learning computer',
      'Raspberry Pi education',
    ],
  },

  flathub: {
    title: 'Flathub',
    description:
      'Install Sugar activities from Flathub. Easy one-click installation of educational software on any Linux distribution.',
    keywords: [
      'Sugar Flathub',
      'Linux education apps',
      'Flatpak Sugar',
      'Linux learning software',
    ],
  },

  // More pages
  more: {
    title: 'More Resources',
    description:
      'Explore additional resources from Sugar Labs including guides for students, teachers, parents, and administrators.',
    keywords: [
      'Sugar Labs resources',
      'educational guides',
      'learning resources',
      'teacher resources',
    ],
  },

  culture: {
    title: 'Culture and Pedagogy',
    description:
      'Learn about the educational philosophy and pedagogical approach behind Sugar Labs. Discover how we promote constructionist learning.',
    keywords: [
      'Sugar Labs pedagogy',
      'constructionist learning',
      'educational philosophy',
      'learning theory',
    ],
  },

  students: {
    title: 'For Students',
    description:
      'Resources for students using Sugar Labs software. Learn how to get started, explore activities, and enhance your learning journey.',
    keywords: [
      'Sugar for students',
      'student learning',
      'educational activities',
      'student resources',
    ],
  },

  schoolAdmin: {
    title: 'For School Administrators',
    description:
      'Information for school administrators about implementing Sugar Labs software. Learn about deployment, training, and support options.',
    keywords: [
      'Sugar for schools',
      'school deployment',
      'educational software implementation',
      'school administration',
    ],
  },

  parents: {
    title: 'For Parents',
    description:
      "Resources for parents interested in Sugar Labs educational software. Learn how Sugar can enhance your child's learning at home.",
    keywords: [
      'Sugar for parents',
      'home education',
      'children learning software',
      'parent resources',
    ],
  },
};

/**
 * Get SEO metadata for a specific page
 * @param pageKey - The key of the page in pageSEO
 * @returns The SEO metadata for the page, or default home metadata
 */
export const getPageSEO = (pageKey: string): PageSEO => {
  return pageSEO[pageKey] || pageSEO.home;
};
