const JoinDevelopment = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Join Development</h1>
      <p className="text-lg text-gray-700 text-center">
        Contribute to SugarLabs' development and help us create innovative
        solutions for education.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <p className="mt-2 text-gray-700">
            Learn how to get started with contributing to SugarLabs'
            development.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Get Started →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Contribution Guidelines</h2>
          <p className="mt-2 text-gray-700">
            Read our contribution guidelines to learn more about our development
            process.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Read Guidelines →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Meet the Team</h2>
          <p className="mt-2 text-gray-700">
            Meet the developers, designers, and contributors who make SugarLabs
            possible.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-yellow-600 hover:underline"
          >
            Meet the Team →
          </a>
        </div>
      </div>
    </main>
  );
};

export default JoinDevelopment;
