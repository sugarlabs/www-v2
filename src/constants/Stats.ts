import kidlaptop from '/assets/Stats/KidsWhoseLife.svg';
import studentsCollaborating from '/assets/Stats/ProjectsForTeaching.svg';
import studentMobile from '/assets/Stats/ProblemSolvingTasks.svg';
import activity from '/assets/Stats/ActivitiesDownloaded.svg';
import language from '/assets/Stats/Languages.svg';
import mentorsTeaching from '/assets/Stats/MentorsHelping.svg';
import apostrophie from '/assets/Stats/quote-icon.svg';
import leftHeart from '/assets/Stats/HeartLeft.svg';
import rightHeart from '/assets/Stats/HeartRight.svg';
import faq from '/assets/Images/faq.png';

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
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    title:
      'Projects for teaching and learning created by Sugar Labs students and teachers.',
    value: '344+',
    imageSrc: stats.studentsCollaborating,
    imageAlt: 'Students collaborating',
    gradient: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    title: 'Problem-solving tasks completed by students ages 13-17.',
    value: '1,450+',
    imageSrc: stats.studentMobile,
    imageAlt: 'Student with mobile device',
    gradient: 'from-green-600 to-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
  },
  {
    title: 'Activities Downloaded',
    value: '11,531,321+',
    imageSrc: stats.activity,
    imageAlt: 'Activity icon',
    gradient: 'from-yellow-600 to-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    title: 'Languages our educational software has been translated into',
    value: '170',
    imageSrc: stats.language,
    imageAlt: 'Language icon',
    gradient: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    title:
      'Mentors helping youth learn in programs like Google Code-In (GCI) and Google Summer of Code',
    value: '55+',
    imageSrc: stats.mentorsTeaching,
    imageAlt: 'Mentors teaching',
    gradient: 'from-red-600 to-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
  },
];
