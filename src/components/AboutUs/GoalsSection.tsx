import { motion } from 'framer-motion';
import {
  goals,
  progressItems,
  sectionContent,
} from '@/constants/aboutUs/goals';
import { useMemo, FC } from 'react';

interface GoalStat {
  total: number;
  completed: number;
  inProgress: number;
  percentComplete: number;
}

const GoalsSection: FC = () => {
  interface ProgressItem {
    label: string;
    percent: number;
    color: string;
  }

  const goalStats: GoalStat = useMemo(() => {
    const totalGoals = goals.length;
    const completedGoals = progressItems.filter(
      (item) => item.percent >= 75,
    ).length;
    const inProgressGoals = progressItems.filter(
      (item) => item.percent >= 25 && item.percent < 75,
    ).length;

    return {
      total: totalGoals,
      completed: completedGoals,
      inProgress: inProgressGoals,
      percentComplete: Math.round((completedGoals / totalGoals) * 100),
    };
  }, []);

  const refinedProgressItems = progressItems.map((item) => {
    let refinedColor;
    if (item.percent >= 75) {
      refinedColor = 'bg-emerald-500'; // Completed items
    } else if (item.percent >= 50) {
      refinedColor = 'bg-blue-400'; // More than halfway
    } else if (item.percent >= 25) {
      refinedColor = 'bg-amber-400'; // Started but less than halfway
    } else {
      refinedColor = 'bg-rose-300'; // Just started
    }
    return { ...item, color: refinedColor };
  });

  const renderProgressBars = (items: ProgressItem[]) => {
    return items.map((item, index) => (
      <motion.div
        key={index}
        className="mb-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 * index }}
      >
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">
            {item.label}
          </span>
          <span className="text-sm font-medium text-slate-700">
            {item.percent}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className={`h-2.5 rounded-full ${item.color}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + 0.1 * index }}
          ></motion.div>
        </div>
      </motion.div>
    ));
  };

  return (
    <section id="goals" className="w-full py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-semibold text-slate-800 sm:text-4xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 font-medium">
              {sectionContent.title.main}
            </span>{' '}
            <span className="text-red-600 font-medium">
              {sectionContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-rose-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.p
            className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {sectionContent.introduction}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column - Goals List */}
          <div className="w-full lg:w-1/2">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                className="mb-6 bg-white rounded-lg shadow-sm p-6 border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-l-4 hover:border-l-rose-400"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <h4 className="font-semibold text-slate-800 text-lg mb-2">
                  {goal.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Progress Stats */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="bg-white rounded-lg shadow-sm p-8 border border-slate-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-100">
                  {sectionContent.progressTitle}
                </h3>

                {/* Progress summary stats */}
                <div className="grid grid-cols-2 gap-5 mb-10">
                  <motion.div
                    className="bg-slate-50 p-5 rounded-lg text-center border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="w-12 h-12 border-3 border-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-500 text-lg font-semibold">
                        {goalStats.total}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">Total Goals</p>
                  </motion.div>

                  <motion.div
                    className="bg-slate-50 p-5 rounded-lg text-center border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="w-12 h-12 border-3 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-emerald-600 text-lg font-semibold">
                        {goalStats.completed}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">Completed</p>
                  </motion.div>

                  <motion.div
                    className="bg-slate-50 p-5 rounded-lg text-center border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-12 h-12 border-3 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-amber-500 text-lg font-semibold">
                        {goalStats.inProgress}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">In Progress</p>
                  </motion.div>

                  <motion.div
                    className="bg-slate-50 p-5 rounded-lg text-center border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="w-12 h-12 border-3 border-rose-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-rose-500 text-lg font-semibold">
                        {goalStats.percentComplete}%
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">
                      Overall Progress
                    </p>
                  </motion.div>
                </div>

                {/* Overall progress bar */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Overall Completion
                    </span>
                    <span className="text-sm font-medium text-blue-500">
                      {goalStats.percentComplete}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-rose-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goalStats.percentComplete}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Individual progress bars */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h4 className="font-semibold text-slate-800 text-lg mb-6 pb-2 border-b border-slate-100">
                    Individual Progress
                  </h4>
                  {renderProgressBars(refinedProgressItems)}
                </motion.div>

                {/* Goal insights */}
                <motion.div
                  className="mt-10 p-5 border border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h5 className="font-semibold text-slate-800 mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {sectionContent.insightsTitle || 'Progress Insights'}
                  </h5>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Our goals are on track with {goalStats.percentComplete}%
                    overall completion. We've fully achieved{' '}
                    {goalStats.completed} goals, with {goalStats.inProgress}{' '}
                    more in progress. We continue to work towards our mission
                    with steady progress across all initiatives.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
