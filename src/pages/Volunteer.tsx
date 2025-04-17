import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import JoinToggle from '@/components/JoinToggle';
import { roleCards } from '@/constants/VolunteerAndDev/RoleCards';
import groupimage from '/assets/Volunteer/volunteer-group.png';
import { motion } from 'framer-motion';
import { developerLinks } from '@/constants/VolunteerAndDev/Links';
import {
  slideInLeft,
  slideInRight,
  slideInBottom,
  cardFadeIn,
} from '@/styles/Animations';
import { Link } from 'react-router-dom';

const Volunteer = () => {
  const matrixLink =
    developerLinks.find((link) => link.name.includes('Matrix'))?.url ||
    'https://matrix.to/#/#sugar:matrix.org';
  const mailLink =
    developerLinks.find((link) => link.name.includes('Mailing'))?.url ||
    'https://lists.sugarlabs.org/';

  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
        <JoinToggle />

        {/* Content Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-8 max-w-5xl">
          {/* Left Side Text */}
          <motion.div
            className="max-w-lg text-center md:text-left"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-4xl font-bold">
              Become a <span className="text-red-500">Volunteer</span>
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              By bringing together people with diverse skills from around the
              globe to work toward our mission in education, volunteers in the
              Sugar Labs community have ample opportunities to grow their skills
              and learn from one another.
            </p>
            <button className="mt-6 bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-full">
              Getting Involved
            </button>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <img
              src={groupimage}
              alt="Volunteers working together"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Getting Involved Section */}
        <motion.div
          className="mt-20 max-w-4xl text-center px-4"
          variants={slideInBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat]">
            Getting Involved as a Volunteer
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            Sugar Labs is seeking volunteer assistance in the roles of
            education, communication, advocacy, research, and technical.
            Sustained, committed help in any of these areas will help us grow as
            an organization. If you are passionate or curious to learn more
            about any of these roles, and are able to commit the time necessary,
            then we encourage you to apply.
          </p>

          <p className="text-lg text-gray-700 font-[Inter] mt-4 leading-relaxed">
            Send a notification of your interest to
            <a
              href="mailto:info@sugarlabs.org"
              className="text-blue-500 underline"
            >
              {' '}
              info@sugarlabs.org
            </a>
            , including some information about yourself, what interests you
            about the volunteer role, and what experience/qualities make you a
            good candidate.
          </p>
        </motion.div>

        {/* Volunteer Roles */}
        <div className="mt-16 max-w-6xl px-4">
          <motion.h2
            className="text-5xl font-[Caveat] font-bold text-center"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Volunteer Roles
          </motion.h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          {/* Role Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleCards.map((role, index) => (
              <motion.div
                key={index}
                className="border p-6 rounded-lg shadow-lg bg-white text-center"
                variants={cardFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-2xl font-bold">{role.title}</h3>
                <hr className="w-16 border-t-2 border-gray-400 mx-auto mt-2" />
                <p className="text-gray-700 mt-4">{role.description}</p>
                <ul className="text-gray-600 text-left mt-3 space-y-2">
                  {role.points?.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 font-bold mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                {role.extra && (
                  <p className="text-gray-700 text-sm mt-3">
                    {role.extra}{' '}
                    {role.link && (
                      <a href={role.link} className="text-blue-500 underline">
                        {role.link}
                      </a>
                    )}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Get Involved Section */}
        <motion.div
          className="mt-20 max-w-4xl text-center px-4"
          variants={slideInBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat]">
            Ways to Get <span className="text-red-500">Involved</span>
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            There are multiple ways to get involved, whether as a developer,
            educator, advocate, or communicator. Each role plays a vital part in
            helping us achieve our mission.
          </p>

          {/* Embedded YouTube Video */}
          <div className="mt-8 w-full flex justify-center">
            <div className="w-full max-w-3xl aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/W5ZLFBZkE34"
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="mt-20 max-w-4xl text-center px-4"
          variants={slideInBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl font-bold font-[Caveat]">
            Interested in Helping Out?
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            Feel free to reach out to express your interest in volunteering via{' '}
            <a
              href={mailLink}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              email
            </a>{' '}
            or{' '}
            <a
              href={matrixLink}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matrix
            </a>
            . Alternatively, you may send{' '}
            <Link to="/contact-us" className="text-blue-600 hover:underline">
              direct message
            </Link>{' '}
            to one of our social media channels.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;
