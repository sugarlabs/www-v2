import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  bgColor: string;
}

const TeamSection: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  return (
    <section className="w-[90%] mx-auto text-center py-12">
      {/* Title */}
      <h1 className="text-5xl font-[Caveat] font-bold">
        Music Blocks Offline Edition
      </h1>
      <h2 className="text-4xl font-[Caveat] font-bold mt-2">
        and <br /> Curriculum Development Team
      </h2>
      <hr className="w-24 border-t-2 border-gray-500 mx-auto mt-4" />

      {/* Grid Layout for Members */}
      <div className="grid md:grid-cols-2 gap-10 mt-12 bg-gray-100 p-10 rounded-lg">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6"
          >
            {/* Member Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />

            {/* Member Info */}
            <div className="md:ml-6 text-left mt-4 md:mt-0">
              <h3
                className={`text-lg font-bold px-3 py-1 rounded-lg inline-block`}
                style={{ backgroundColor: member.bgColor }}
              >
                {member.name}
              </h3>
              <p className="text-gray-700 mt-2">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
