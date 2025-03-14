import React from 'react';
import { motion } from 'framer-motion';
import { teamSectionAnimations } from '@/styles/Animations';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  bgColor: string;
}

const TeamSection: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  return (
    <motion.section
      className="w-[90%] mx-auto text-center py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={teamSectionAnimations.section}
    >
      {/* Title */}
      <motion.h1
        className="text-5xl font-[Caveat] font-bold"
        variants={teamSectionAnimations.heading}
      >
        Music Blocks Offline Edition
      </motion.h1>

      <motion.h2
        className="text-4xl font-[Caveat] font-bold mt-2"
        variants={teamSectionAnimations.heading}
      >
        and <br /> Curriculum Development Team
      </motion.h2>

      <motion.hr
        className="w-24 border-t-2 border-gray-500 mx-auto mt-4"
        variants={teamSectionAnimations.heading}
      />

      {/* Grid Layout for Members */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 mt-12 bg-gray-100 p-10 rounded-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={teamSectionAnimations.section}
      >
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6"
            variants={teamSectionAnimations.memberCard}
          >
            {/* Member Image */}
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
              variants={teamSectionAnimations.memberImage}
            />

            {/* Member Info */}
            <div className="md:ml-6 text-left mt-4 md:mt-0">
              <h3
                className="text-lg font-bold px-3 py-1 rounded-lg inline-block"
                style={{ backgroundColor: member.bgColor }}
              >
                {member.name}
              </h3>
              <p className="text-gray-700 mt-2">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TeamSection;
