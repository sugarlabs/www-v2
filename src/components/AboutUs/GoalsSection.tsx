import { motion } from 'framer-motion';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import {
  goals,
  progressItems,
  sectionContent,
} from '@/constants/aboutUs/goals';
import {
  slideInLeft,
  subtleRise,
  statCard,
  staggerContainer,
  container,
  statGrid,
} from '@/styles/Animations';
import { useMemo, FC } from 'react';

interface GoalStat {
  total: number;
  completed: number;
  inProgress: number;
  percentComplete: number;
}

const GoalsSection: FC = () => {
  const renderProgressBars = (items) => {
    return items.map((item, index) => (
      <motion.div
        key={index}
        className="mb-6"
        custom={index}
        viewport={{ once: true }}
      >
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {item.label}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {item.percent}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className={`h-2.5 rounded-full bg-gradient-to-r ${item.color}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          ></motion.div>
        </div>
      </motion.div>
    ));
  };

  // Memoize the goal stats for performance
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

  return (
    <>
      <SectionTitle>
        {sectionContent.title.main}
        <span className="text-red-500">{sectionContent.title.highlight}</span>
      </SectionTitle>
      <SectionContainer id="goals">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="md:w-1/2">
            <div className="space-y-6">
              <motion.p
                className="text-base md:text-lg text-gray-700 leading-relaxed"
                variants={subtleRise}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {sectionContent.introduction}
              </motion.p>

              {/* Dynamic goals rendering from goals array */}
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {goals.map((goal, i) => (
                  <motion.div
                    key={i}
                    className="p-6 border-l-4 border-red-500 bg-white rounded-lg shadow-sm 
                             hover:shadow-lg transition-all duration-300"
                    variants={slideInLeft}
                    custom={i}
                    whileHover={{ x: 10, backgroundColor: '#fef2f2' }}
                  >
                    <h4 className="font-bold text-gray-800 text-lg mb-2">
                      {goal.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              className="rounded-xl p-6 bg-white border-2 border-gray-100 shadow-lg"
              variants={subtleRise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Progress Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {sectionContent.progressTitle}
                </h3>

                {/* Progress summary stats */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                  variants={statGrid}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-red-50 p-4 rounded-lg text-center"
                    variants={statCard}
                    whileHover="hover"
                  >
                    <p className="text-3xl font-bold text-red-500">
                      {goalStats.total}
                    </p>
                    <p className="text-sm text-gray-600">Total Goals</p>
                  </motion.div>

                  <motion.div
                    className="bg-green-50 p-4 rounded-lg text-center"
                    variants={statCard}
                    whileHover="hover"
                  >
                    <p className="text-3xl font-bold text-green-500">
                      {goalStats.completed}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </motion.div>

                  <motion.div
                    className="bg-yellow-50 p-4 rounded-lg text-center"
                    variants={statCard}
                    whileHover="hover"
                  >
                    <p className="text-3xl font-bold text-yellow-500">
                      {goalStats.inProgress}
                    </p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </motion.div>

                  <motion.div
                    className="bg-blue-50 p-4 rounded-lg text-center"
                    variants={statCard}
                    whileHover="hover"
                  >
                    <p className="text-3xl font-bold text-blue-500">
                      {goalStats.percentComplete}%
                    </p>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </motion.div>
                </motion.div>

                {/* Overall progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Completion
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {goalStats.percentComplete}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      className="h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goalStats.percentComplete}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Individual progress bars */}
              <motion.div
                className="mt-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-gray-800 text-lg mb-4">
                  Individual Progress
                </h4>
                {renderProgressBars(progressItems)}
              </motion.div>

              {/* Goal insights */}
              <motion.div
                className="mt-8 p-5 border border-gray-200 rounded-lg bg-gray-50"
                variants={subtleRise}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h5 className="font-bold text-gray-700 mb-2">
                  {sectionContent.insightsTitle || 'Progress Insights'}
                </h5>
                <p className="text-sm text-gray-600">
                  Our goals are on track with {goalStats.percentComplete}%
                  overall completion. We've fully achieved {goalStats.completed}{' '}
                  goals, with {goalStats.inProgress} more in progress. We
                  continue to work towards our mission with steady progress
                  across all initiatives.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default GoalsSection;
