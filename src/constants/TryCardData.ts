import MusicBlocksImg from '/assets/Cards/MusicBlocks.png';
import TurtleBlocksImg from '/assets/Cards/TurtleBlocks.png';
import SugarizerImg from '/assets/Cards/Sugarizer.png';
import BootableDriveImg from '/assets/Cards/BootableDrive.png';
import DesktopInitializationImg from '/assets/Cards/DesktopInitialization.png';
import TrisquelImg from '/assets/Cards/Trisquel.svg';
import RaspberryPiImg from '/assets/Cards/RaspberryPi.png';
import FlatHubImg from '/assets/Cards/Flathub.png';
import Finance from '/assets/Cards/activity-finance.svg';
import Maze from '/assets/Cards/activity-maze.svg';
import Measure from '/assets/Cards/activity-measure.svg';
import Turtle3D from '/assets/Cards/activity-turtle3d.svg';
import Words from '/assets/Cards/activity-words.svg';
import Ruler from '/assets/Cards/activity-ruler.svg';
import StarChart from '/assets/Cards/activity-star-chart.svg';
import Recall from '/assets/Cards/activity-recall.svg';
import Physics from '/assets/Cards/activity-physics.svg';

interface CardDataType {
  title: string;
  description: string;
  tryNowText: string;
  tryNowHref: string;
  learnMoreText: string;
  learnMoreHref: string;
  imagePath: string;
  gradientClass: string;
}

export const TryCardData: CardDataType[] = [
  {
    title: 'Music Blocks',
    description:
      'Create musical code with the browser-based visual programming language Music Blocks',
    tryNowText: 'Try Music Blocks now!',
    tryNowHref: 'https://musicblocks.sugarlabs.org/',
    learnMoreText: 'Learn more about Music Blocks',
    learnMoreHref: '/musicblocks',
    imagePath: MusicBlocksImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-500',
  },
  {
    title: 'Turtle Blocks',
    description:
      'Explore math and computation through beautiful, artful and creative geometry.',
    tryNowText: 'Try Turtle Blocks now!',
    tryNowHref: 'https://turtle.sugarlabs.org/',
    learnMoreText: 'Learn more about Turtle Blocks',
    learnMoreHref: '/turtleblocks',
    imagePath: TurtleBlocksImg,
    gradientClass: 'bg-gradient-to-r from-pink-600 to-blue-500',
  },
  {
    title: 'Try now on any device with Sugarizer.',
    description:
      'Get a taste of Sugar with Sugarizer, which opens in your browser with no installation.',
    tryNowText: 'Try Sugarizer now!',
    tryNowHref: 'https://sugarizer.org/',
    learnMoreText: 'Learn more about Sugarizer',
    learnMoreHref: '/sugarizer',
    imagePath: SugarizerImg,
    gradientClass: 'bg-gradient-to-r from-yellow-400 to-green-500',
  },
  {
    title: 'Desktop/laptop bootable drive',
    description:
      'With Sugar a Stick (SOAS), you can experience the full Sugar Learning Platform on any computer at any time from a bootable thumb drive',
    tryNowText: 'Try Bootable drive now!',
    tryNowHref: 'https://fedoraproject.org/spins/soas/download/',
    learnMoreText: 'Learn more about Bootable Drive',
    learnMoreHref: '/bootablesoas',
    imagePath: BootableDriveImg,
    gradientClass: 'bg-gradient-to-r from-gray-900 to-gray-400',
  },
  {
    title: 'Desktop/laptop installation',
    description:
      'Sugar Learning platform can be installed as a full operating system on ost desktop and laptop computers.',
    tryNowText: 'Try Desktop Installation now!',
    tryNowHref: 'https://fedoraproject.org/spins/soas/download/',
    learnMoreText: 'Learn more about Installation',
    learnMoreHref: '/bootablesoas',
    imagePath: DesktopInitializationImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-500',
  },
  {
    title: 'Try Trisquel for full freedom',
    description:
      'Get all the benefits of a bootable/installation frive on the fully free and well maintained Trisquel distro.',
    tryNowText: 'Try Trisquel now!',
    tryNowHref: 'https://trisquel.info/en/download',
    learnMoreText: 'Learn more about Trisquel',
    learnMoreHref: '/trisquel',
    imagePath: TrisquelImg,
    gradientClass: 'bg-gradient-to-r from-blue-700 to-blue-900',
  },
  {
    title: 'Try Sugar on Raspberry Pi',
    description: 'The full Sugar environment on a Raspberry P.(RPk)',
    tryNowText: 'Try Raspberry Pi now!',
    tryNowHref: 'https://wiki.sugarlabs.org/go/Raspbian',
    learnMoreText: 'Learn more about Raspberry Pi',
    learnMoreHref: '/raspberry',
    imagePath: RaspberryPiImg,
    gradientClass: 'bg-gradient-to-r from-red-600 to-green-500',
  },
  {
    title: 'Convenient installation via Flathub',
    description:
      'Create musical code with the browser based visual programming language Music Blocks',
    tryNowText: 'Try Flathub now!',
    tryNowHref: 'https://flathub.org/apps/search?q=sugar%20labs',
    learnMoreText: 'Learn more about Flathub',
    learnMoreHref: '/flathub',
    imagePath: FlatHubImg,
    gradientClass: 'bg-gradient-to-r from-gray-400 to-gray-900',
  },
];

export const Activities = [
  {
    title: 'Finance',
    description: 'Roleplay with money',
    icon: Finance,
    buttonText: 'Get Finance',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4040',
  },
  {
    title: 'Maze',
    description: 'Have fun with progressive challenges',
    icon: Maze,
    buttonText: 'Get Maze',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4727',
  },
  {
    title: 'Measure',
    description: 'Use your computer to measure things in the physical world',
    icon: Measure,
    buttonText: 'Get Measure',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4197',
  },
  {
    title: 'TurtleBlocks3D',
    description: 'Turtle Blocks? But in three dimensions!',
    icon: Turtle3D,
    buttonText: 'Get TurtleBlocks3D',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4757',
  },
  {
    title: 'Words',
    description: 'Compose and share your ideas',
    icon: Words,
    buttonText: 'Get Words',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4315',
  },
  {
    title: 'Ruler',
    description: 'Measure and explore math',
    icon: Ruler,
    buttonText: 'Get Ruler',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4192',
  },
  {
    title: 'StarChart',
    description: 'Explore numbers and information in charts',
    icon: StarChart,
    buttonText: 'Get StarChart',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4300',
  },
  {
    title: 'Recall',
    description: 'Test your memory with this fun game',
    icon: Recall,
    buttonText: 'Get Recall',
    href: 'https://v4.activities.sugarlabs.org/app/org.sugarlabs.RecallActivity.html',
  },
  {
    title: 'Physics',
    description: 'Physical world simulator and playground',
    icon: Physics,
    buttonText: 'Get Physics',
    href: 'https://activities.sugarlabs.org/en-US/sugar/addon/4193',
  },
];
