import Image from '/assets/Images/DonatePic.png';
import Arrow from '/assets/Icons/arrow.svg';
import PdfIcon from '/assets/Icons/pdf-icon.svg';

interface donationData {
  heading: string;
  subHeading: string;
  paragraph: string;
  url: string;
  urlMonth: string;
  buttonText: string;
}

export const Img = [Image, Arrow, PdfIcon];

export const donationData: donationData = {
  heading: 'Support and Empower Those in Need',
  paragraph:
    "Support Sugar Labs and make a difference in children's education. Sugar Labs has brought educational software and authentic problem-solving to millions in the US and across the globe.",
  subHeading: 'Donate to Sugar Labs to make a positive impact',
  url: 'https://www.every.org/sugar-labs?suggestedAmounts=17,37,57&frequency=ONCE#donate',
  urlMonth:
    'https://www.every.org/sugar-labs?suggestedAmounts=17,37,57&frequency=MONTHLY#donate',
  buttonText: 'Donate now',
};

export const IMPACT_STATS = [
  {
    value: '300+',
    title: 'Educational Tools',
    description:
      "We've created over three-hundred tools for learning that are used around the globe, helping students develop critical thinking and technical skills.",
  },
  {
    value: '1000s',
    title: 'Mentorship Hours',
    description:
      "We've mentored students for thousands of hours, guiding young developers at critical points in their development and helping them become leaders.",
  },
  {
    value: 'Global',
    title: 'Educational Impact',
    description:
      "We've assisted schools in bringing project-based learning activities into their classrooms, empowering youth with technology skills worldwide.",
  },
];

export const FINANCIAL_FILINGS = [
  {
    year: '2023',
    link: 'assets/tax-filings/2023-Form-990EZ.pdf',
  },
  {
    year: '2022',
    link: 'assets/tax-filings/2022-Form-990EZ.pdf',
  },
  {
    year: '2021',
    link: 'assets/tax-filings/2021-Form-990EZ.pdf',
  },
  {
    year: '2020',
    link: 'assets/tax-filings/2020-Form-990EZ.pdf',
  },
  {
    year: '2019',
    link: 'assets/tax-filings/2019-Form-990EZ.pdf',
  },
];
