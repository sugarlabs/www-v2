import kidlaptop from '/assets/Stats/KidsWhoseLife.svg';
import studentsCollaborating from '/assets/Stats/ProjectsForTeaching.svg';
import studentMobile from '/assets/Stats/ProblemSolvingTasks.svg';
import activity from '/assets/Stats/ActivitiesDownloaded.svg';
import language from '/assets/Stats/Languages.svg';
import mentorsTeaching from '/assets/Stats/MentorsHelping.svg';
import apostrophie from '/assets/Stats/quote-icon.svg';
import leftHeart from '/assets/Stats/HeartLeft.svg';
import rightHeart from '/assets/Stats/HeartRight.svg';
import faq from '/assets/Images/faq.webp';

export const stats = {
  kidlaptop,
  studentsCollaborating,
  studentMobile,
  activity,
  language,
  mentorsTeaching,
  apostrophie,
  leftHeart,
  rightHeart,
  faq,
};

export const statisticsData = [
  {
    title:
      'Kids whose lives have been enriched by using the Sugar Learning Platform.',
    value: '3,000,000+',
    imageSrc: stats.kidlaptop,
    imageAlt: 'Student with laptop',
    gradient: 'from-green-600 to-green-700',
    bgColor: 'bg-green-50 dark:bg-green-900/50',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    title:
      'Projects for teaching and learning created by Sugar Labs students and teachers.',
    value: '344+',
    imageSrc: stats.studentsCollaborating,
    imageAlt: 'Students collaborating',
    gradient: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50 dark:bg-red-900/50',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  {
    title: 'Problem-solving tasks completed by students ages 13-17.',
    value: '1,450+',
    imageSrc: stats.studentMobile,
    imageAlt: 'Student with mobile device',
    gradient: 'from-green-600 to-green-700',
    bgColor: 'bg-green-100 dark:bg-green-900/60',
    borderColor: 'border-green-300 dark:border-green-700',
  },
  {
    title: 'Activities Downloaded',
    value: '11,531,321+',
    imageSrc: stats.activity,
    imageAlt: 'Activity icon',
    gradient: 'from-yellow-600 to-yellow-700',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/50',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  {
    title: 'Languages our educational software has been translated into',
    value: '170',
    imageSrc: stats.language,
    imageAlt: 'Language icon',
    gradient: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-900/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    title:
      'Mentors helping youth learn in programs like Google Code-In (GCI) and Google Summer of Code',
    value: '55+',
    imageSrc: stats.mentorsTeaching,
    imageAlt: 'Mentors teaching',
    gradient: 'from-red-600 to-red-700',
    bgColor: 'bg-red-100 dark:bg-red-900/60',
    borderColor: 'border-red-300 dark:border-red-700',
  },
];
