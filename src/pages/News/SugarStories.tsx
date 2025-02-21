const SugarStories = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Sugar Stories</h1>
      <p className="text-lg text-gray-700 text-center">
        Hear from our community members and read inspiring stories about the
        impact of SugarLabs.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Community Spotlight</h2>
          <p className="mt-2 text-gray-700">
            Meet our community members and learn about their experiences with
            SugarLabs.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Read More →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Success Stories</h2>
          <p className="mt-2 text-gray-700">
            Discover how SugarLabs has made a positive impact on education and
            communities worldwide.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Read More →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Share Your Story</h2>
          <p className="mt-2 text-gray-700">
            We'd love to hear about your experiences with SugarLabs! Share your
            story with us.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-yellow-600 hover:underline"
          >
            Share →
          </a>
        </div>
      </div>
    </main>
  );
};

export default SugarStories;
