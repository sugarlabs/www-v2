import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  headerReveal,
} from '@/styles/Animations';

const Mentoring = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="container mx-auto p-4">
        <motion.section
          className="my-8 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="max-w-4xl w-4/5 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="md:w-1/2 text-left md:pr-8"
              variants={slideInLeft}
            >
              <motion.h1 className="text-4xl font-bold" variants={headerReveal}>
                Mentoring at Sugar Labs
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400 mt-4 text-lg"
                variants={fadeIn}
              >
                Learn how Sugar Labs has been running successful mentorship
                programs for nearly two decades, helping new contributors grow
                into confident open-source developers.
              </motion.p>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-end mt-6 md:mt-0"
              variants={slideInRight}
            >
              <img
                src="/assets/Images/mentoring.png"
                alt="Mentoring Illustration"
                className="w-80 md:w-[400px]"
              />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="my-16 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-6"
            variants={headerReveal}
          >
            How Our Mentorship Works
          </motion.h2>

          <motion.p
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
            variants={fadeIn}
          >
            Sugar Labs runs mentorship programs through initiatives such as
            Google Summer of Code, Sugar Summer of Code, and direct mentorship.
            These programs are built around the idea of learning by doing —
            contributors grow by actively creating real software used by
            learners worldwide.
          </motion.p>

          <motion.p
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
            variants={fadeIn}
          >
            Mentorship begins well before official programs start. Contributors
            are encouraged to explore the codebase, set up their development
            environment, and communicate openly with mentors and the community.
          </motion.p>

          <motion.p
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={fadeIn}
          >
            Once selected, mentees work closely with mentors through regular
            meetings, weekly progress reports, and milestone reviews. Many
            mentees later become mentors themselves, continuing the cycle of
            learning and collaboration.
          </motion.p>
        </motion.section>

        <motion.section
          className="my-16 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={headerReveal}
          >
            Behind the Scenes: Running a Mentorship Program for Two Decades
          </motion.h2>

          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic"
            variants={fadeIn}
          >
            By Sumit Srivastava, Sugar Labs
          </motion.p>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <motion.p variants={fadeIn}>
              Imagine you have an organisation today in which some people are
              good at what they do, and some people are new while eager to
              learn. Now you want to help those new people do great work while
              passing on little bits of your knowledge.
            </motion.p>

            <motion.p variants={fadeIn}>
              This is the perfect time for you to run a mentorship program. That
              is what I will try to explain here.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              The Guiding Principle: Constructionism
            </motion.h3>

            <motion.p variants={fadeIn}>
              We are currently running mentorship programs for new contributors
              via 3 programs:
            </motion.p>

            <motion.ul
              className="list-disc list-inside space-y-2 mb-4"
              variants={fadeIn}
            >
              <li>Google Summer of Code</li>
              <li>Direct Mentorship Program</li>
              <li>Sugar Summer of Code</li>
            </motion.ul>

            <motion.p variants={fadeIn}>
              The underlying principle of all 3 remains almost the same:{' '}
              <strong>constructionism</strong>.
            </motion.p>

            <motion.p variants={fadeIn}>
              What's that, you ask? It says that people learn most effectively
              when they are actively involved in creating tangible objects in
              the real world, be it software, hardware, poems, stories, or
              anything else!
            </motion.p>

            <motion.p variants={fadeIn}>
              Structurally, since all 3 are running at the same time we don't
              feel much of a difference except some minor reporting differences
              to the sponsors.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Three Core Components
            </motion.h3>

            <motion.p variants={fadeIn}>
              The mentorship program rests on three foundational pillars:
            </motion.p>

            <motion.ul
              className="list-disc list-inside space-y-2 mb-4"
              variants={fadeIn}
            >
              <li>
                <strong>Onboarding</strong> – Setting up new contributors for
                success
              </li>
              <li>
                <strong>Regular Meetings</strong> – Frequent communication and
                guidance
              </li>
              <li>
                <strong>Weekly Progress Reports</strong> – Tracking progress and
                addressing challenges
              </li>
            </motion.ul>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Phase 1: Onboarding
            </motion.h3>

            <motion.p variants={fadeIn}>
              Onboarding starts before the program begins, when people start
              contributing code. They join our email list, introduce themselves,
              try to set up our coding environment, and ask questions when they
              are stuck. Some of them contribute a lot with little mentorship,
              while others need more guidance along the way.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Phase 2: Selection and Planning
            </motion.h3>

            <motion.p variants={fadeIn}>
              After a few weeks, the program starts with some of the best
              contributors we found. This is when the magic begins. We try to
              set expectations on what was proposed to be done, how it could be
              broken down in chunks, and what would be needed every week to get
              it done in around 3 months.
            </motion.p>

            <motion.p variants={fadeIn}>
              Contributors select from a list of curated ideas or propose their
              own. We mostly focus on two things:
            </motion.p>

            <motion.ul
              className="list-disc list-inside space-y-2 mb-4"
              variants={fadeIn}
            >
              <li>Quality of the idea</li>
              <li>
                Demonstrated ability of the person to implement their proposed
                idea
              </li>
            </motion.ul>

            <motion.p variants={fadeIn}>
              Based on these factors, we choose contributors considering their
              previous contributions, the quality of their proposal, the
              usefulness of their idea, their activity in our community, and
              their interactions with other members. The two most important
              criteria are their previous contributions and the details of
              implementation in their proposal. This is just a thumb
              rule—deviation is permitted.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Phase 3: Regular Meetings
            </motion.h3>

            <motion.p variants={fadeIn}>
              Now, the program truly begins. We talk through two things: the
              details of implementation and how to break it down into small
              chunks of effort every week. This happens through meetings.
            </motion.p>

            <motion.p variants={fadeIn}>
              <strong>What frequency, you ask?</strong>
            </motion.p>

            <motion.p variants={fadeIn}>
              Meetings for us are high frequency, but different for different
              mentors. Some meet daily, some bi-weekly, some weekly. The key is
              regular communication about:
            </motion.p>

            <motion.ul
              className="list-disc list-inside space-y-2 mb-4"
              variants={fadeIn}
            >
              <li>What is being done</li>
              <li>What the problems are</li>
              <li>Who needs help and where</li>
              <li>What should be done before the next meeting</li>
            </motion.ul>

            <motion.p variants={fadeIn}>
              Meetings last between 20 to 60 minutes. Some are 1-to-1, some are
              group meetings—varying by what is needed.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Phase 4: Weekly Progress Reports
            </motion.h3>

            <motion.p variants={fadeIn}>
              At the end of each week, contributors submit a blog post or report
              detailing:
            </motion.p>

            <motion.ul
              className="list-disc list-inside space-y-2 mb-4"
              variants={fadeIn}
            >
              <li>What was accomplished</li>
              <li>What remains to be done</li>
              <li>Goals for the next week</li>
            </motion.ul>

            <motion.p variants={fadeIn}>
              We love blogs being a tech organization, but it could be anything:
              a note, a text, or any other format that works.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              Mid-Program Review
            </motion.h3>

            <motion.p variants={fadeIn}>
              Almost halfway through the 3-month cycle, we conduct a mid-term
              review to assess whether the contributor is performing up to
              expectations and is on track to complete approximately half of
              their promised project or task.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              The Second Half and Final Review
            </motion.h3>

            <motion.p variants={fadeIn}>
              The same process repeats for the second half of the cycle, with
              frequent meetings, weekly reports, and daily progress updates from
              contributors.
            </motion.p>

            <motion.p variants={fadeIn}>
              At the end of 3 months, we conduct a final review to assess
              whether the contributor successfully completed their project.
              Mostly, if the process was followed and communication maintained,
              the answer is yes.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold mt-6 mb-3"
              variants={headerReveal}
            >
              The Lasting Impact
            </motion.h3>

            <motion.p variants={fadeIn}>
              Some of these contributors go on to become integral parts of our
              organisation, mentoring more contributors and continuing the chain
              of progress. This creates a virtuous cycle where yesterday's
              mentees become today's mentors.
            </motion.p>

            <motion.p
              className="mt-6 text-gray-600 dark:text-gray-400 italic"
              variants={fadeIn}
            >
              This was a story about looking behind the scenes of our mentorship
              programs.
            </motion.p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Mentoring;
