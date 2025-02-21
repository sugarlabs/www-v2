const Donate = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Donate</h1>
      <p className="text-lg text-gray-700 text-center">
        Support SugarLabs' mission by making a donation. Every contribution
        helps us make a difference.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">One-Time Donation</h2>
          <p className="mt-2 text-gray-700">
            Make a one-time donation to support our mission.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Donate Now →
          </a>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Recurring Donation</h2>
          <p className="mt-2 text-gray-700">
            Set up a recurring donation to support our mission on an ongoing
            basis.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Set Up Recurring Donation →
          </a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Other Ways to Give</h2>
          <p className="mt-2 text-gray-700">
            Learn about other ways to support SugarLabs, such as volunteering or
            sponsoring an event.
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

export default Donate;
