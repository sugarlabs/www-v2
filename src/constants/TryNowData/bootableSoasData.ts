export const bootableSoasData = {
  title: 'Boot SOAS',
  subtitle: 'Sugar On A Stick',
  quote:
    '“Young children learn by games; compulsory education cannot remain in the soul.” — Plato',
  description:
    'Learn how to boot Sugar Labs OS on your computer. Follow our step-by-step guide to get started easily.',
  images: [{ src: 'assets/TryNowImages/step7.png', alt: 'Boot SOAS step 7' }],
};

interface StepData {
  step: number;
  title: string;
  description: string;
  image: string;
  links?: { text: string; url: string }[];
}

export const steps: StepData[] = [
  {
    step: 1,
    title: 'Sugar On a Stick',
    description:
      'To boot Sugar Labs OS on your computer, you will need a bootable Sugar on Stick setup already. To see how to set it up, visit the wiki.',
    links: [
      {
        text: 'wiki',
        url: 'https://wiki.sugarlabs.org/go/Sugar_on_a_Stick/Installation',
      },
    ],
    image: 'assets/TryNowImages/step1.jpg',
  },
  {
    step: 2,
    title: 'Insert the USB Drive',
    description:
      'Plug the prepared Sugar on a Stick USB drive into an available USB port on your computer.',
    image: 'assets/TryNowImages/step2.jpg',
  },
  {
    step: 3,
    title: 'Access Advanced Boot Options (Windows)',
    description:
      "On Windows systems, access the advanced boot options by holding the 'Shift' key while clicking 'Restart.' This will bring you to the advanced boot menu.",
    image: 'assets/TryNowImages/step3.jpg',
  },
  {
    step: 4,
    title: 'Choose to Boot from USB (Windows)',
    description:
      "In the advanced boot menu, select 'Use a Device' to proceed with booting from the USB drive.",
    image: 'assets/TryNowImages/step4.jpg',
  },
  {
    step: 5,
    title: ' Select the USB Drive (Windows)',
    description:
      'Choose your USB drive from the list of devices to boot into the Sugar OS.',
    image: 'assets/TryNowImages/step5.jpg',
  },
  {
    step: 6,
    title: 'Traditional Boot Method (Non-Windows Systems)',
    description:
      "For non-Windows computers:Power on your computer and immediately press the appropriate key (commonly F9, F12, or Esc) repeatedly to access the boot menu or BIOS settings. In the boot menu, select your USB drive, often identified by its brand or model name, and press 'Enter' to boot into Sugar.",
    image: 'assets/TryNowImages/step6.jpg',
  },
  {
    step: 7,
    title: 'Enjoy Sugar on a Stick',
    description:
      'After selecting the USB drive, your computer should boot into the Sugar OS interface. If you encounter any issues during the boot process, seek assistance in the Sugar Labs Matrix room. For detailed instructions and additional resources, visit the Sugar Labs Booting SoaS page.',
    image: 'assets/TryNowImages/step7.png',
    links: [
      {
        text: 'Matrix room',
        url: 'https://matrix.to/#/#sugar:matrix.org',
      },
    ],
  },
];

export const mockupImage = {
  path: 'assets/TryNowImages/boatsoasMockup.png',
};
