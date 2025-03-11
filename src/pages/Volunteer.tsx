import Header from '../sections/Header';
import Footer from '../sections/Footer';

const Volunteer = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
           {/* Split into Two Halves */}
            <div className="grid grid-cols-2 w-full max-w-6xl items-center font-oswald">
              
              {/* Left Side: JOIN (Aligned Right) */}
              <div className="flex justify-end pr-6">
                <h1 className="text-8xl font-bold tracking-tight">JOIN</h1>
              </div>

              {/* Right Side: Volunteer & Development (Stacked Vertically) */}
              <div className="flex flex-col justify-center space-y-2">
                <h2 className="text-4xl text-red-500 font-normal">Volunteer</h2>
                <h2 className="text-4xl text-gray-300 font-light">Development</h2>
              </div>

            </div>

        {/* Content Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-8 max-w-5xl">
          {/* Left Side Text */}
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold">
              Become a <span className="text-orange-500">Volunteer</span>
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              By bringing together people with diverse skills from around the globe to work toward
              our mission in education, volunteers in the Sugar Labs community have ample
              opportunities to grow their skills and learn from one another.
            </p>
            <button className="mt-6 bg-orange-500 text-white text-lg font-semibold px-6 py-3 rounded-full">
              Getting Involved
            </button>
          </div>

          {/* Right Side Image Placeholder */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/volunteer-group.png"
              alt="Volunteers working together"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Getting Involved as a Volunteer Section */}
        <div className="mt-20 max-w-4xl text-center">
          <h2 className="text-5xl font-bold font-[Caveat]">
            Getting Involved as a Volunteer
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            Sugar Labs is seeking volunteer assistance in the roles of education, communication, advocacy, research, and technical.
            Sustained, committed help in any of these areas will help us grow as an organization.
            If you are passionate or curious to learn more about any of these roles, and are able to commit the time necessary, then we encourage you to apply.
            Send a notification of your interest to <a href="mailto:info@sugarlabs.org" className="text-blue-500 underline">info@sugarlabs.org</a>,
            including some information about yourself, what interests you about the volunteer role, and what experience/qualities make you a good candidate for the position.
          </p>

          <p className="text-lg text-gray-700 font-[Inter] mt-4 leading-relaxed">
            Please note that, as a growing organization, we don't currently have the resources to hire people to fulfill these roles.
            Our hope is that we one day will be able to, but, for now, we are looking for volunteers who can work with the executive director and the board to work diligently to improve our operations.
          </p>
        </div>

        {/* Volunteer Roles Title */}
        <h2 className="text-5xl font-[Caveat] font-bold relative text-center">
          Volunteer Roles
        </h2>
        <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

        {/* Arrows (Can be done via SVGs or Tailwind classes for absolute positioning) */}
        <div className="relative w-full flex justify-center">
          <svg className="absolute -top-10 left-1/4 w-16 h-16 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
          </svg>
          <svg className="absolute -top-10 right-1/4 w-16 h-16 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
          </svg>
        </div>

        {/* Role Cards Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {/* Educator Role */}
          <div className="border p-6 rounded-lg shadow-lg bg-white text-center">
            <h3 className="text-2xl font-bold">Educator</h3>
            <hr className="w-16 border-t-2 border-gray-400 mx-auto mt-2" />
            <p className="text-gray-700 mt-4 text-left">
              Sugar Labs is focused on education, and we value the feedback of other educators.
              Here are ways that educators can participate in Sugar Labs as a volunteer:
            </p>
            <ul className="text-gray-700 text-left mt-3 list-disc list-inside">
              <li>Use our software and lesson plans in your classroom.</li>
              <li>Test software and give feedback as an educator.</li>
              <li>Create lesson plans for other teachers.</li>
            </ul>
            <p className="text-gray-700 text-sm mt-3">
              Contact: <a href="mailto:iaep@sugarlabs.org" className="text-blue-500 underline">iaep@sugarlabs.org</a>
            </p>
            <p className="text-gray-700 text-sm">
              Subscribe: <a href="http://lists.sugarlabs.org/listinfo/iaep" className="text-blue-500 underline">lists.sugarlabs.org</a>
            </p>
          </div>

          {/* Communicator Role */}
          <div className="border p-6 rounded-lg shadow-lg bg-white text-center">
            <h3 className="text-2xl font-bold">Communicator</h3>
            <hr className="w-16 border-t-2 border-gray-400 mx-auto mt-2" />
            <p className="text-gray-700 mt-4 text-left">
              Help us document stakeholder experiences. Here are a few ways you can help:
            </p>
            <ul className="text-gray-700 text-left mt-3 list-disc list-inside">
              <li>Share your story using Sugar (blog or video).</li>
              <li>Assist with translations.</li>
              <li>Give feedback on Sugar tools.</li>
            </ul>
          </div>

          {/* Advocate Role */}
          <div className="border p-6 rounded-lg shadow-lg bg-white text-center">
            <h3 className="text-2xl font-bold">Advocate</h3>
            <hr className="w-16 border-t-2 border-gray-400 mx-auto mt-2" />
            <p className="text-gray-700 mt-4 text-left">
              Help spread awareness about Sugar Labs and our mission in education. Here’s how:
            </p>
            <ul className="text-gray-700 text-left mt-3 list-disc list-inside">
              <li>Follow us on social media and share our message.</li>
              <li>Parents & teachers can inform school admins about Sugar.</li>
            </ul>
          </div>
        </div>

        {/* Ways to Get Involved Section */}
        <div className="mt-20 max-w-4xl text-center">
          <h2 className="text-5xl font-bold font-[Caveat]">
            Ways to Get <span className="text-orange-500">Involved</span>
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
            There are multiple ways to get involved with our community, whether you want to contribute as a developer, educator, advocate, or communicator.  
            Each role plays a vital part in helping us achieve our mission.
          </p>

          {/* Embedded Video Placeholder */}
          <div className="mt-8 w-full flex justify-center">
            <div className="w-3/4 h-60 bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg">[Video Placeholder]</p>
            </div>
          </div>

          {/* Additional Info Box */}
          <div className="mt-8 bg-gray-100 p-6 rounded-lg border border-gray-300 text-left">
            <p className="text-lg text-gray-700 font-[Inter] leading-relaxed">
              Learn more about how you can contribute by watching the video or visiting our  
              <a href="#" className="text-blue-500 underline"> contribution page</a>.
            </p>
          </div>
        </div>

        {/* Interested in helpin out section */}
        <div className="mt-20 max-w-4xl text-center">
          <h2 className="text-5xl font-bold font-[Caveat]">
            Interested in Helping Out?
          </h2>
          <hr className="w-32 border-t-2 border-gray-400 mx-auto mt-2" />

          <p className="text-lg text-gray-700 font-[Inter] mt-6 leading-relaxed">
          Feel free to reach out to express your interest in volunteering. You are encouraged to reach out by email or by Matrix. Alternatively, you may send a direct message to one our social media channels.
          </p>

        </div>

        
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;
