const Volunteer = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Volunteer</h1>
      <p className="text-lg text-gray-700 text-center">
        Join our community of volunteers and help us make a difference in
        education.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Ways to Volunteer</h2>
          <p className="mt-2 text-gray-700">
            Explore the different ways you can volunteer with SugarLabs.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Learn More →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Current Projects</h2>
          <p className="mt-2 text-gray-700">
            Check out our current projects and see how you can get involved.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            View Projects →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Meet Our Volunteers</h2>
          <p className="mt-2 text-gray-700">
            Meet the dedicated volunteers who make SugarLabs possible.
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

export default Volunteer;
