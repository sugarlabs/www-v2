// import React from 'react'; // React import not needed for JSX in .tsx files with modern React setup

export const onboardingSteps = [
  {
    target: '.sugar-labs-logo',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Welcome to Sugar Labs!
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>👋 Welcome to Sugar Labs, where learning meets creativity!</p>
          <p>
            This quick tour will help you discover all the amazing features our
            platform offers.
          </p>
        </div>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
    spotlightClicks: true,
    title: 'Welcome to Sugar Labs',
    styles: {
      options: {
        primaryColor: '#3B82F6',
        zIndex: 1000,
      },
    },
  },
  {
    target: '.main-navigation',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Navigation Menu</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📍 Here's our main navigation where you can explore:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Learn about our educational activities</li>
            <li>Discover our projects and tools</li>
            <li>Join our community</li>
            <li>Find volunteering opportunities</li>
          </ul>
        </div>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
    spotlightClicks: false,
    title: 'Explore Our Menu',
  },
  {
    target: '.try-sugar-button',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Try Sugar Now!</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>🚀 This is your gateway to experiencing Sugar Labs firsthand!</p>
          <p>
            Click here to access our interactive activities and see what Sugar
            learning is all about.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg mt-3">
            <p className="text-blue-800 font-medium">
              💡 Perfect for users who want to jump right in!
            </p>
          </div>
        </div>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
    spotlightClicks: true,
    title: 'Try Sugar Platform',
  },
  {
    target: '.activities-section',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Educational Activities
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>🎯 Explore our rich collection of educational activities:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Hands-on Learning:</strong> Block-based programming
            </li>
            <li>
              <strong>Visual Arts:</strong> Creative drawing and design tools
            </li>
            <li>
              <strong>Mathematics:</strong> Interactive math exercises
            </li>
            <li>
              <strong>Science:</strong> Physics simulations
            </li>
          </ul>
          <div className="bg-green-50 p-3 rounded-lg mt-3">
            <p className="text-green-800 font-medium">
              🌟 Swipe through the cards to see different activities!
            </p>
          </div>
        </div>
      </div>
    ),
    placement: 'top',
    disableBeacon: true,
    spotlightClicks: false,
    title: 'Discover Learning Activities',
  },
  {
    target: '.stats-section',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Our Impact</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📊 See the incredible impact Sugar Labs is making worldwide:</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="text-purple-800 font-bold">18+</div>
              <div className="text-purple-600 text-xs">Million Students</div>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <div className="text-orange-800 font-bold">100+</div>
              <div className="text-orange-600 text-xs">Countries</div>
            </div>
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="text-blue-800 font-bold">50+</div>
              <div className="text-blue-600 text-xs">Languages</div>
            </div>
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="text-green-800 font-bold">24/7</div>
              <div className="text-green-600 text-xs">Support</div>
            </div>
          </div>
        </div>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
    spotlightClicks: false,
    title: 'Global Impact',
  },
  {
    target: '.donation-section',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Support Our Mission
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>💝 Help us continue empowering young minds around the world!</p>
          <div className="space-y-2">
            <p>
              <strong>Your donation helps us:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Develop new educational tools</li>
              <li>Support teachers and educators</li>
              <li>Provide free access to all activities</li>
              <li>Reach underserved communities</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg mt-3 border border-red-200">
            <p className="text-red-800 font-medium">
              🎯 Every contribution makes a real difference in children's
              education!
            </p>
          </div>
        </div>
      </div>
    ),
    placement: 'top',
    disableBeacon: true,
    spotlightClicks: false,
    title: 'Support Education',
  },
];

export const getOnboardingStepsForPage = (
  pageType: 'homepage' | 'try' | 'about' | 'news',
) => {
  const commonSteps = [
    {
      target: '.sugar-labs-logo',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Welcome to Sugar Labs!
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>👋 Welcome to Sugar Labs, where learning meets creativity!</p>
            <p>
              This quick tour will help you discover all the amazing features
              our platform offers.
            </p>
          </div>
        </div>
      ),
      placement: 'bottom' as const,
      disableBeacon: true,
      spotlightClicks: true,
      title: 'Welcome to Sugar Labs',
    },
  ];

  const pageSpecificSteps = {
    homepage: [
      ...commonSteps,
      {
        target: '.main-navigation',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Navigation Menu
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 Here's our main navigation where you can explore:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Learn about our educational activities</li>
                <li>Discover our projects and tools</li>
                <li>Join our community</li>
                <li>Find volunteering opportunities</li>
              </ul>
            </div>
          </div>
        ),
        placement: 'bottom' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Explore Our Menu',
      },
      {
        target: '.try-sugar-button',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Try Sugar Now!
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                🚀 This is your gateway to experiencing Sugar Labs firsthand!
              </p>
              <p>
                Click here to access our interactive activities and see what
                Sugar learning is all about.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg mt-3">
                <p className="text-blue-800 font-medium">
                  💡 Perfect for users who want to jump right in!
                </p>
              </div>
            </div>
          </div>
        ),
        placement: 'bottom' as const,
        disableBeacon: true,
        spotlightClicks: true,
        title: 'Try Sugar Platform',
      },
      {
        target: '.activities-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Educational Activities
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🎯 Explore our rich collection of educational activities:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Hands-on Learning:</strong> Block-based programming
                </li>
                <li>
                  <strong>Visual Arts:</strong> Creative drawing and design
                  tools
                </li>
                <li>
                  <strong>Mathematics:</strong> Interactive math exercises
                </li>
                <li>
                  <strong>Science:</strong> Physics simulations
                </li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg mt-3">
                <p className="text-green-800 font-medium">
                  🌟 Swipe through the cards to see different activities!
                </p>
              </div>
            </div>
          </div>
        ),
        placement: 'top' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Discover Learning Activities',
      },
      {
        target: '.stats-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Our Impact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                📊 See the incredible impact Sugar Labs is making worldwide:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-purple-50 p-2 rounded text-center">
                  <div className="text-purple-800 font-bold">18+</div>
                  <div className="text-purple-600 text-xs">
                    Million Students
                  </div>
                </div>
                <div className="bg-orange-50 p-2 rounded text-center">
                  <div className="text-orange-800 font-bold">100+</div>
                  <div className="text-orange-600 text-xs">Countries</div>
                </div>
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="text-blue-800 font-bold">50+</div>
                  <div className="text-blue-600 text-xs">Languages</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="text-green-800 font-bold">24/7</div>
                  <div className="text-green-600 text-xs">Support</div>
                </div>
              </div>
            </div>
          </div>
        ),
        placement: 'bottom' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Global Impact',
      },
      {
        target: '.donation-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Support Our Mission
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                💝 Help us continue empowering young minds around the world!
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Your donation helps us:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Develop new educational tools</li>
                  <li>Support teachers and educators</li>
                  <li>Provide free access to all activities</li>
                  <li>Reach underserved communities</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg mt-3 border border-red-200">
                <p className="text-red-800 font-medium">
                  🎯 Every contribution makes a real difference in children's
                  education!
                </p>
              </div>
            </div>
          </div>
        ),
        placement: 'top' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Support Education',
      },
    ],
    try: [
      ...commonSteps,
      {
        target: '.try-activities-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Try Interactive Activities
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🎮 Explore our interactive educational activities:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Math games and puzzles</li>
                <li>Coding challenges</li>
                <li>Science simulations</li>
                <li>Art creation tools</li>
              </ul>
            </div>
          </div>
        ),
        placement: 'top' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Interactive Learning',
      },
    ],
    about: [
      ...commonSteps,
      {
        target: '.about-content-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              About Sugar Labs
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📚 Learn about our mission and values:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Our educational philosophy</li>
                <li>Team and leadership</li>
                <li>Community involvement</li>
                <li>Our impact and achievements</li>
              </ul>
            </div>
          </div>
        ),
        placement: 'top' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Learn About Us',
      },
    ],
    news: [
      ...commonSteps,
      {
        target: '.news-section',
        content: (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Latest News & Updates
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📰 Stay updated with Sugar Labs news:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Latest feature releases</li>
                <li>Community highlights</li>
                <li>Educational research updates</li>
                <li>Volunteer spotlights</li>
              </ul>
            </div>
          </div>
        ),
        placement: 'top' as const,
        disableBeacon: true,
        spotlightClicks: false,
        title: 'Stay Informed',
      },
    ],
  };

  return pageSpecificSteps[pageType] || commonSteps;
};
