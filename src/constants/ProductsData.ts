export type ProductType = {
  name: string;
  description: string;
  colors: Record<string, string>; // Image URLs mapped by color names
  link: string; // External purchase link
};

export const products: ProductType[] = [
  {
    name: 'Classic Cotton T-Shirt',
    description:
      'Support Sugar Labs®—a US-based 501(c)(3) nonprofit empowering youth through technology education—with this premium cotton t-shirt, designed for comfort and durability.',
    colors: {
      blue: 'assets/Products/sugarTshirtBlue.jpeg',
      white: 'assets/Products/sugarTshirtWhite.jpeg',
      green: 'assets/Products/sugarTshirtGreen.jpeg',
      purple: 'assets/Products/sugarTshirtPurple.jpeg',
    },
    link: 'https://www.bonfire.com/store/sugar-labs-merch/', // Purchase link
  },
  {
    name: 'SugarLabs USB',
    description:
      'Easily install Fedora Sugar On A Stick (SOAS) to your device directly from this USB flash drive. The Fedora SOAS on this USB drive is for Intel and AMD x86_64 systems.',
    colors: {
      white: 'assets/Products/sugarlabsUsb.jpeg',
    },
    link: 'https://www.usbmemorydirect.com/store/novelty/sugarlabs/', // Purchase link
  },
];
