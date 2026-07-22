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
      blue: 'assets/Products/sugarTshirtBlue.webp',
      white: 'assets/Products/sugarTshirtWhite.webp',
      green: 'assets/Products/sugarTshirtGreen.webp',
      purple: 'assets/Products/sugarTshirtPurple.webp',
    },
    link: 'https://www.bonfire.com/store/sugar-labs-merch/', // Purchase link
  },
];
