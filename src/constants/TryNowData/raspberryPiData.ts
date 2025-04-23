export const raspberrydata = {
  title: 'Raspberry-Pi',
  subtitle: 'Sugar on RaspberryPi',
  quote:
    '“Programming should be on every child’s low shelf, within reach for frequent use.” — Walter Bender, Sugar Labs founder',
  description:
    'Raspberry Pi are a series of small, low cost, low power computers. The Sugar Desktop Environment can be run on a Raspberry Pi. You will need a display, keyboard, and a mouse.',
  images: [{ src: 'assets/TryNowImages/raspberry.jpg', alt: 'RaspberryPi 1' }],
};

export const raspberrySections = [
  {
    title: 'Recommendation',
    content:
      'As of August 2017, the best way to experience Sugar on Raspberry Pi (RPi) is via Sugar on a Stick (SoaS), as it has many activities and has regular security updates. See SoaS/RPi documentation for how to download and install it. SoaS is a spin of Fedora.',
    button: '',
    links: [
      {
        text: 'Sugar on a Stick/Raspberry Pi',
        url: 'https://github.com/sugarlabs/RPi-Docs/blob/main/src/installation.md',
      },
    ],
  },
  {
    title: 'Other methods to get Sugar on Raspberry Pi?',
    content:
      'using Raspbian, the most common operating system on a Raspberry Pi, a derivative of Debian\n using Fedora\n using Debian\n using Ubuntu',
    button: '',
    links: [
      {
        text: 'Raspbian',
        url: 'https://wiki.sugarlabs.org/go/Raspbian',
      },
      {
        text: 'Fedora',
        url: 'https://github.com/sugarlabs/sugar/blob/master/docs/fedora.md',
      },
      {
        text: 'Debian',
        url: 'https://github.com/sugarlabs/sugar/blob/master/docs/debian.md',
      },
      {
        text: 'Ubuntu',
        url: 'https://github.com/sugarlabs/sugar/blob/master/docs/ubuntu.md',
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
