const Products = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Products</h1>
      <p className="text-lg text-gray-700 text-center">
        Explore our range of products designed to enhance learning and
        education.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Sugar Desktop</h2>
          <p className="mt-2 text-gray-700">
            A free and open-source desktop environment for learning.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Learn More →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Sugar Learning Platform</h2>
          <p className="mt-2 text-gray-700">
            A web-based platform for learning and collaboration.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Learn More →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Sugar Activities</h2>
          <p className="mt-2 text-gray-700">
            A collection of educational activities for Sugar Desktop and the
            Sugar Learning Platform.
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

export default Products;
