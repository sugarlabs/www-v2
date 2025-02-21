const PressRelease = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Press Release</h1>
      <p className="text-lg text-gray-700 text-center">
        Read our latest press releases to stay up-to-date on SugarLabs news and
        announcements.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Latest News</h2>
          <p className="mt-2 text-gray-700">
            Stay current with our latest press releases and news updates.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Read More →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Media Kit</h2>
          <p className="mt-2 text-gray-700">
            Download our media kit for logos, images, and other press materials.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Download →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-2 text-gray-700">
            Get in touch with our press team for inquiries and interviews.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-yellow-600 hover:underline"
          >
            Contact →
          </a>
        </div>
      </div>
    </main>
  );
};

export default PressRelease;
