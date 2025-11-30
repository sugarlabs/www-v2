import { steps } from './bootableSoasData';

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
  },
  {
    logo: 'assets/TryMoreSvgs/fedora.svg',
    title: 'using Fedora',
  },
  {
    logo: 'assets/TryMoreSvgs/debian.svg',
    title: 'using Debian',
  },
  {
    logo: 'assets/TryMoreSvgs/ubuntu.svg',
    title: 'using Ubuntu',
  },
];

export const raspberrySteps: steps[] = [
  {
    heading: 'Steps to install Sugar using Raspbian',
    StepData: [
      {
        step: 1,
        title: 'Download Raspberry Pi OS',
        description:
          'Download the latest Raspberry Pi OS image formerly known as Raspbian from the official Raspberry Pi website',
        links: [
          {
            text: 'website',
            url: 'https://www.raspberrypi.com/software/',
          },
        ],
        image: 'assets/TryNowImages/raspbian-step1.webp',
      },
      {
        step: 2,
        title: 'Flash the OS to an SD Card',
        description:
          'You can use Raspberry app interface and select desired models to be flashed.',
        image: 'assets/TryNowImages/raspbian-step2.webp',
      },
      {
        step: 3,
        title: 'Boot Raspberry Pi',
        description:
          'Insert the microSD card into your Raspberry Pi and power it on. Follow the on-screen prompts to set up the Raspberry Pi OS.',
        image: 'assets/TryNowImages/raspbian-step3.webp',
      },
      {
        step: 4,
        title: 'Update System Packages',
        description: 'Once Raspberry Pi OS is up, update the system packages:',
        commands: 'sudo apt update; sudo apt upgrade',
        image: 'assets/TryNowImages/raspbian-step4.webp',
      },
      {
        step: 5,
        title: 'Install Sugar Desktop Environment',
        description:
          'Run the following commands to install the Sugar desktop environment:',
        commands: 'sudo apt install sucrose',
        image: 'assets/TryNowImages/raspberry-install.webp',
      },
      {
        step: 6,
        title: 'Configure Sugar',
        description: 'Configure Sugar as the default desktop environment:',
        commands: 'sudo update-alternatives --config x-session-manager',
        image: 'assets/TryNowImages/raspbian-step6.webp',
      },
      {
        step: 7,
        title: 'Reboot Raspberry Pi',
        description:
          'Reboot your Raspberry Pi to apply the changes and start using Sugar:',
        commands: 'sudo reboot',
        image: 'assets/TryNowImages/raspberry-reboot.webp',
      },
      {
        step: 8,
        title: 'Enjoy Sugar',
        description:
          'After rebooting, your Raspberry Pi should boot into the Sugar desktop environment. You can now explore and use Sugar activities!',
        image: 'assets/TryNowImages/step7.webp',
      },
    ],
  },
  {
    heading: 'Steps to install Sugar using Fedora',
    StepData: [
      {
        step: 1,
        title: 'Download Fedora for Raspberry Pi',
        description:
          'Download and install the Fedora for Raspberry Pi from the official Fedora website.',
        links: [
          {
            text: 'website',
            url: 'https://getfedora.org/en/workstation/download/',
          },
        ],
        image: 'assets/TryNowImages/fedora-step1.webp',
      },
      {
        step: 2,
        title: 'Install Sugar on Fedora using Sugar desktop environment',
        description:
          'Open a terminal and run the following command to install Sugar:',
        commands: 'sudo dnf install sugar',
        image: 'assets/TryNowImages/fedora-step2.webp',
      },
      {
        step: 3,
        title: 'Install Sugar using with another desktop environment',
        description:
          'If you are using another desktop environment, you can install Sugar with the following command:',
        commands:
          'sudo dnf group install sugar-desktop; sudo dnf install sugar-runner; sugar-runner --set-default',
        image: 'assets/TryNowImages/fedora-step3.webp',
      },
      {
        step: 4,
        title: 'Reboot Fedora',
        description: 'Reboot your Fedora system to apply the changes',
        commands: 'sudo reboot',
        image: 'assets/TryNowImages/raspberry-reboot.webp',
      },
      {
        step: 5,
        title: 'Enjoy Sugar',
        description:
          'After rebooting, your Fedora system should boot into the Sugar desktop environment. You can now explore and use Sugar activities!',
        image: 'assets/TryNowImages/step7.webp',
      },
    ],
  },
  {
    heading: 'Steps to install Sugar using Debian',
    StepData: [
      {
        step: 1,
        title: 'Download Debian for Raspberry Pi',
        description:
          'Download and install the Debian for Raspberry Pi from the official Debian website.',
        links: [
          {
            text: 'website',
            url: 'https://www.debian.org/',
          },
        ],
        image: 'assets/TryNowImages/debian-step1.webp',
      },
      {
        step: 2,
        title: 'Install Sugar on Debian ',
        description:
          'Open a terminal and run the following command to install Sugar:',
        commands: 'sudo apt install sucrose',
        image: 'assets/TryNowImages/raspberry-install.webp',
      },
      {
        step: 3,
        title: 'Reboot Debian',
        description: 'Reboot your Debian system to apply the changes.',
        image: 'assets/TryNowImages/raspberry-reboot.webp',
      },
      {
        step: 4,
        title: 'Login with Sugar',
        description:
          'At the login screen, select Sugar from the session options before logging in.',
        image: 'assets/TryNowImages/debian-step4.webp',
      },
      {
        step: 5,
        title: 'Enjoy Sugar',
        description:
          'After rebooting, your Debian system should boot into the Sugar desktop environment. You can now explore and use Sugar activities!',
        image: 'assets/TryNowImages/step7.webp',
      },
    ],
  },
  {
    heading: 'Steps to install Sugar using Ubuntu',
    StepData: [
      {
        step: 1,
        title: 'Download Ubuntu for Raspberry Pi',
        description:
          'Download and Install the Ubuntu for Raspberry Pi from the official Ubuntu website.',
        links: [
          {
            text: 'website',
            url: 'https://ubuntu.com/download/raspberry-pi',
          },
        ],
        image: 'assets/TryNowImages/ubuntu-step1.webp',
      },
      {
        step: 2,
        title: 'Install Sugar on Ubuntu',
        description:
          'Open a terminal and run the following command to install Sugar:',
        commands: 'sudo apt update; sudo apt install sucrose',
        image: 'assets/TryNowImages/raspberry-install.webp',
      },
      {
        step: 3,
        title: 'Reboot Ubuntu',
        description: 'Reboot your Ubuntu system to apply the changes',
        image: 'assets/TryNowImages/raspberry-reboot.webp',
      },
      {
        step: 4,
        title: 'Login with Sugar',
        description:
          'At the login screen, select Sugar from the session options before logging in.',
        image: 'assets/TryNowImages/ubuntu-step4.webp',
      },
      {
        step: 5,
        title: 'Enjoy Sugar',
        description:
          'After rebooting, your Ubuntu system should boot into the Sugar desktop environment. You can now explore and use Sugar activities!',
        image: 'assets/TryNowImages/step7.webp',
      },
    ],
  },
];
