export interface Director {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  position: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    wiki?: string;
  };
}

export interface DirectorCardProps {
  director: Director;
}

export interface SocialLinkProps {
  href: string;
  aria: string;
  icon: React.ReactNode;
}

export const directors: Director[] = [
  {
    id: 1,
    name: 'Claudia Urrea',
    position: 'Treasurer, Sugar Labs',
    bio: "Claudia Urrea is the Senior Associate Director for pK-12 at the MIT Abdul Latif Jameel World Education Lab (J-WEL). Claudia was born in Colombia, where she received an undergraduate degree in Computer Science from EAFIT University. Claudia received her master's degree in Educational Media and Technology from Boston University, and her doctorate degree from the MIT Media Laboratory. Her Ph.D. thesis studied the implications of one-to-one learning in a rural setting in Costa Rica. Claudia worked for 5 years as the Director of Learning for One Laptop Per Child, collaborating with SugarLabs in that role. She has been in the board of SugarLabs since 2010.\n\nFor the past 25 years, Claudia has helped multiple governments and non-government agencies- The New York Academy of Sciences, Schlumberger Excellence in Education Development, International Development Research Centre, among others- to empower and support schools and communities of learners to evolve from traditional teaching methods into progressive learning environments. She has also a research scientist position with the Lifelong Kindergarten group at the MIT Media Lab. She has taught several classes at the Harvard Summer Program and Early Childhood Development program at Tufts University.",
    imageUrl: 'assets/Images/BoardMembers/Claudia.png',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/claudia-urrea-ph-d-0335041/',
      wiki: 'https://wiki.sugarlabs.org/go/User:Claudia_Urrea',
    },
  },
  {
    id: 2,
    name: 'Devin Ulibarri',
    position: 'Executive Director, Sugar Labs',
    bio: "Devin Ulibarri has been involved in Sugar Labs for over a decade. Ulibarri has been involved in education for twenty years, and he's advocated for free/libre/open (FLO) source software, particularly in education, for the past decade. For two years from 2022 to 2024, he worked as Outreach and Communications Coordinator at the Free Software Foundation.\n\nAt Sugar Labs, Ulibarri has worked closely with Walter Bender to create Music Blocks visual programming language. In addition to this, he's mentored for Google Summer of Code (GSoC) and Google Code-In (GCI), and he regularly teaches students as young as five years old using a rich variety of Sugar tools. Ulibarri plays classical guitar, and he is the Dungeon Master for his family on the weekends.",
    imageUrl: 'assets/Images/BoardMembers/Devin.png',
    socialLinks: {
      github: 'https://github.com/pikurasa',
      linkedin: 'https://www.linkedin.com/in/devin-ulibarri-76277a300/',
      wiki: 'https://wiki.sugarlabs.org/go/User:Pikurasa',
    },
  },
  {
    id: 3,
    name: 'Samson Goddy',
    position: 'Board Member, Sugar Labs',
    bio: 'Samson is an open source advocate who is very passionate about Edtech. He is currently working with International Telecommunication Union (ITU) to bring more African girls into Technology. He is the co-founder of Open Source Community Africa, a movement that promotes and educate everything open source within Africa.',
    imageUrl: 'assets/Images/BoardMembers/Samson.jpeg',
    socialLinks: {
      github: 'https://github.com/samswag',
      linkedin: 'https://www.linkedin.com/in/samsongoddy/',
      wiki: 'https://wiki.sugarlabs.org/go/User:Samson_Goddy',
    },
  },
  {
    id: 4,
    name: 'Sebastian Silva',
    position: 'Board Member, Sugar Labs',
    bio: 'Sebastian Silva learned Logo as a 5-year-old child in a workshop in Lima in the 1980s. Later, he taught himself Basic, Pascal, Python, JS, etc... but most importantly, through exploring GNU/Linux, he became enamoured with the philosophy of Software Freedom. He went on to study Psychology to satisfy his curiosity. Soon, he was involved with the original Sugar deployments on OLPC laptops in Peru, Colombia, and Uruguay - organizing local groups to promote software freedom in the region. SomosAzucar initiative (a SL local lab) was responsible for the addition of Quechua, Aymara and Awajún system locales to GLIBC in order to support these deployments. Currently, Silva works as Senior Programming Coach at Laboratoria, a feminist organization. In his spare time, he has written a few programming-learning gadgets such as SUPER-8 and Jappy Creator, and he\'s the Software Curator for the laptop-deployment projects of Repurpose-IT.org. He misses having a viable constructivist learning environment that "free desktops" can use, so he has returned to the Sugar Labs board.',
    imageUrl: 'assets/Images/BoardMembers/Silva.png',
    socialLinks: {
      github: 'https://github.com/icarito',
      wiki: 'https://wiki.sugarlabs.org/go/User:Sebastian',
    },
  },
  {
    id: 5,
    name: 'Sumit Srivastava',
    position: 'Board Member, Sugar Labs',
    bio: 'Sumit Srivastava is a recipient of Stability AI supercomputer grant for open source AI research and is currently working on a new AI project called Cotyper. Prior to this, he started a leading medical search engine and was a part of the leading talent investor Entrepreneur First. He is a maintainer of the Music Blocks programming language. Sumit started many learning groups in Asia where people learn by doing and get iterative feedback. For fun, he plays ukulele and flute, and he builds things like livestreaming software and air purifiers.',
    imageUrl: 'assets/Images/BoardMembers/Sumit.jpeg',
    socialLinks: {
      github: 'https://github.com/sum2it',
      linkedin: 'https://www.linkedin.com/in/sumsri/',
      wiki: 'https://wiki.sugarlabs.org/go/User:Sum2it',
    },
  },
  {
    id: 6,
    name: 'Walter Bender',
    position: 'Secretary, Sugar Labs',
    bio: 'Founder of Sugar Labs and co-founder of One Laptop Per Child (OLPC), Walter Bender has more than thirty years experience as an academic advisor at MIT. He has more than forty years experience as a software developer. Author of numerous learning tools, Bender is the original author of Turtle Blocks and Music Blocks, as well as many Sugar Activities.',
    imageUrl: 'assets/Images/BoardMembers/Walter.png',
    socialLinks: {
      github: 'https://github.com/walterbender',
      linkedin: 'https://www.linkedin.com/in/walterbender/',
      wiki: 'https://wiki.sugarlabs.org/go/User:Walter',
    },
  },
];
