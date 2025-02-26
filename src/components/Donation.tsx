import React from 'react';
import { donationData } from '../constants/Donation';
import { Link } from 'react-router-dom';
import { volunteerImages } from '../constants/Volunteer';

const Donation: React.FC = () => {
  const handleClick = () => {
    window.location.href = donationData.url;
  };

  return (
    <section className="relative overflow-hidden bg-white text-black py-16 px-4">
      <div className="absolute top-1/8  right-1/6 w-96 h-96 bg-[#8df090] rounded-full -mt-32 -mr-32 z-1" />
      <div className="absolute top-1/2 right-1/6 w-96 h-96 bg-[#ebee67] rounded-full -mt-32 -mr-64 z-0" />

      <div className="relative z-10">
        <div className="container mx-auto text-left">
          <p className="font-Caveat text-2xl uppercase">
            {donationData.subHeading}
          </p>
          <h1 className="text-4xl font-bold mt-2">{donationData.heading}</h1>
          <p className="text-lg mt-4">{donationData.paragraph}</p>
          <button
            onClick={handleClick}
            className="mt-6 px-6 py-3 bg-[#fbd04d] text-black text-2xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 outline-4 uppercase"
          >
            {donationData.buttonText}
          </button>
        </div>

        <Link to="/volunteer">
          <div className="mt-12 flex justify-center items-center">
            <div className="relative">
              <div className="absolute -top-8 -right-8">
                <i className="fas fa-arrow-right text-2xl" />
              </div>
              <div className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center shadow-lg">
                {volunteerImages.map((volunteer) => (
                  <img
                    key={volunteer.id}
                    alt={volunteer.alt}
                    className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                    src={volunteer.src}
                  />
                ))}
                <span className="ml-4 text-sm">Join the volunteer</span>
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  +1000
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-16 text-center">
          <p className="text-lg">
            Join Us to Empower Young Learners all Across the Globe. The simplest
            way to get involved is to join our newsletter.
          </p>
          <div className="mt-4 flex justify-center items-center">
            <input
              className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
              placeholder="Enter your email"
              type="email"
            />
            <button className="px-6 py-2 bg-red-500 text-white font-bold rounded-r-full shadow-lg hover:bg-red-600 transition duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
