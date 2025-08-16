export const raspberrydata = {
  title: 'Raspberry-Pi',
  subtitle: 'Sugar on RaspberryPi',
  quote:
    '“Programming should be on every child’s low shelf, within reach for frequent use.” — Walter Bender, Sugar Labs founder',
  description:
    'Raspberry Pi are a series of small, low cost, low power computers. The Sugar Desktop Environment can be run on a Raspberry Pi. You will need a display, keyboard, and a mouse.',
  images: [{ src: 'assets/TryNowImages/raspberry.webp', alt: 'RaspberryPi 1' }],
};

export const raspberrySections = [
  {
    title: 'Recommendation',
    content:
      'As of August 2017, the best way to experience the Sugar learning platform on a Raspberry Pi (RPi) is by using Sugar on a Stick (SoaS), a portable version of Sugar that runs from a USB drive. SoaS offers a rich collection of educational activities, making it ideal for learners, and it benefits from regular security updates to ensure a safe and stable environment. Designed as a spin of the Fedora operating system, SoaS combines the flexibility of Fedora with the educational focus of Sugar. For setup instructions, refer to the SoaS/RPi documentation, which guides users through the process of downloading, installing, and running it on a Raspberry Pi.',
    button: '',
    links: [
      {
        text: 'Sugar on a Stick/Raspberry Pi',
        url: 'https://github.com/sugarlabs/RPi-Docs/blob/main/src/installation.md',
      },
    ],
  },
  {
    title: 'Developers',
    content:
      'Developers may focus on Fedora or Debian when setting up a development environment for Sugar on Raspberry Pi, because Sugar development on generic computers is focused on those operating systems.',
    button: '',
    links: [
      {
        text: 'Fedora',
        url: 'https://github.com/sugarlabs/sugar/blob/master/docs/fedora.md',
      },
      {
        text: 'Debian',
        url: 'https://github.com/sugarlabs/sugar/blob/master/docs/debian.md',
      },
    ],
  },
];

export const raspberryLogoCards = [
  {
    logo: 'assets/TryMoreSvgs/trisquel-desktop.svg',
    title: 'using Raspbian',
    description: [
      'Raspbian (now known as Raspberry Pi OS) is the most widely used OS for Raspberry Pi and is based on Debian.',
      'You can install the Sugar learning environment using package managers or custom scripts.',
      'It’s lightweight, actively maintained, and optimized for Raspberry Pi hardware.',
      'Best suited for users already familiar with Raspberry Pi setups.',
    ],
    buttons: [
      {
        text: 'Read Raspbian installation guide',
        link: 'https://wiki.sugarlabs.org/go/Raspbian',
      },
    ],
  },
  {
    logo: 'assets/TryMoreSvgs/fedora.svg',
    title: 'using Fedora',
    description: [
      'Fedora offers a reliable and cutting-edge platform to run Sugar on various hardware, including Raspberry Pi.',
      'Sugar on a Stick (SoaS) is a Fedora-based spin tailored for educational purposes.',
      'You can run Sugar live from a USB stick or install it on the Pi directly with some configuration.',
      'Suitable for users seeking a polished Linux experience with SELinux and Wayland support.',
    ],
    buttons: [
      {
        text: 'View Fedora instructions',
        link: 'https://github.com/sugarlabs/sugar/blob/master/docs/fedora.md',
      },
    ],
  },
  {
    logo: 'assets/TryMoreSvgs/debian.svg',
    title: 'using Debian',
    description: [
      'Debian is the upstream source of Raspbian and offers a very stable environment for Sugar.',
      'You can install Sugar via APT repositories or build it from source for more customization.',
      'Recommended for developers and advanced users familiar with Debian packaging and systems.',
      'You gain fine-grained control over packages and system updates.',
    ],
    buttons: [
      {
        text: 'Read Debian instructions',
        link: 'https://github.com/sugarlabs/sugar/blob/master/docs/debian.md',
      },
    ],
  },
  {
    logo: 'assets/TryMoreSvgs/ubuntu.svg',
    title: 'using Ubuntu',
    description: [
      'Ubuntu is a user-friendly Linux distribution and supports running Sugar with a few extra steps.',
      'You can install Sugar directly via terminal or explore Ubuntu derivatives for a lighter setup.',
      'Popular among new users due to its graphical interface and large support community.',
      'Ideal if you’re already using Ubuntu on other machines and want consistency.',
    ],
    buttons: [
      {
        text: 'View Ubuntu setup guide',
        link: 'https://github.com/sugarlabs/sugar/blob/master/docs/ubuntu.md',
      },
    ],
  },
];
