import { stats } from '../constants/Stats.ts';

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Text Section - Modernized typography */}
        <div className="lg:w-1/4">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            <span className="text-black font-Caveat text-8xl">What </span>
            <div
              className="text-transparent bg-clip-text bg-gradient-to-r 
                                from-red-500 to-orange-500 font-Pacifico text-7xl"
            >
              numbers
            </div>
            <span className="text-black italic">say for us?</span>
          </h1>
          <p className="text-gray-600 text-2xl leading-relaxed font-Roboto">
            Sugar Labs, founded in 2008, has had{' '}
            <span className="italic">an impact on the lives of many</span>. Here
            are some of the statistics we are tracking
          </p>
        </div>

        {/* Stats Grid Section - Modernized cards */}
        <div className="container mx-auto p-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Large Card - Kids Enriched */}
            <div
              className="md:col-span-2 row-span-2 bg-green-100 rounded-xl p-6 md:p-11 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-2xl font-medium mb-4 font-AnonymousPro">
                Kids whone lives have been enriched by using the Sugar Learning
                Platform.
              </h3>
              <div className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent font-Caveat">
                3,000,000+
              </div>
              <img
                src={stats.kidlaptop}
                alt="Student with laptop"
                className="w-full h-48 md:h-64 object-cover rounded-lg"
                width={800}
                height={600}
                decoding="async"
              />
            </div>

            {/* Top Row - Right Side */}
            <div
              className="bg-red-100 rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-lg font-medium mb-2 font-AnonymousPro">
                Projects for teaching and learning created bay Sugar Labs
                students and teachers.
              </h3>
              <div className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-Caveat">
                344+
              </div>
              <img
                src={stats.studentsCollaborating}
                alt="Students collaborating"
                className="w h-36 object-cover rounded-lg"
                loading="lazy"
                width={400}
                height={300}
                decoding="async"
              />
            </div>

            <div
              className="bg-green-200 rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-lg font-medium mb-2 font-AnonymousPro">
                Problem-solving tasks conmpleted by students ages 13-17.
              </h3>
              <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent font-Caveat">
                1,450+
              </div>
              <img
                src={stats.studentMobile}
                alt="Student with mobile device"
                className="w h-36 object-cover rounded-lg"
                loading="lazy"
                width={400}
                height={300}
                decoding="async"
              />
            </div>

            {/* Bottom Row */}
            <div
              className="bg-yellow-100 rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-lg font-medium mb-2 font-AnonymousPro">
                Activities Downloaded
              </h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent font-Caveat">
                11,531,321+
              </div>
              <img
                src={stats.activity}
                alt="Activity icon"
                className="w-full h-1/2 rounded-lg"
              />
            </div>

            <div
              className="bg-blue-200 rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-lg font-medium mb-2 font-AnonymousPro">
                Languages our educational software has been translated into
              </h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-Caveat">
                170
              </div>
              <img
                src={stats.language}
                alt="Language icon"
                className="w-full h-1/2 rounded-lg"
              />
            </div>

            <div
              className="bg-red-200 rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-500 ease-out"
            >
              <h3 className="text-gray-700 text-lg font-medium mb-2 font-AnonymousPro">
                Mentors helping youth learn in program like Google Code-In (GCI)
                and Google Summer of Code
              </h3>
              <div className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-Caveat">
                55+
              </div>
              <img
                src={stats.mentorsTeaching}
                alt="Mentors teaching"
                className="w-full h-1/2 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
