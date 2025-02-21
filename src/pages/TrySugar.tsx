const TrySugar = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Try Sugar</h1>
      <p className="text-lg text-gray-700 text-center">
        Experience the Sugar learning platform and desktop environment.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Sugar Desktop</h2>
          <p className="mt-2 text-gray-700">
            Download and install Sugar Desktop on your computer.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Download →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Sugar Learning Platform</h2>
          <p className="mt-2 text-gray-700">
            Try the Sugar Learning Platform online, no installation required.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Try Now →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">
            Documentation and Resources
          </h2>
          <p className="mt-2 text-gray-700">
            Find documentation, tutorials, and other resources to help you get
            started with Sugar.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-yellow-600 hover:underline"
          >
            Learn More →
          </a>
        </div>
      </div>
    </main>
  );
};

export default TrySugar;
