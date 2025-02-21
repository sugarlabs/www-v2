const FAQs = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">FAQs</h1>
      <div className="mt-6 space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">What is SugarLabs?</h2>
          <p className="mt-2 text-gray-700">
            SugarLabs is a non-profit organization that develops free and
            open-source educational software for children.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">How can I get involved?</h2>
          <p className="mt-2 text-gray-700">
            You can join our community as a developer, volunteer, or donor.
            Visit the "Join Development" or "Volunteer" pages for more
            information.
          </p>
        </div>
      </div>
    </main>
  );
};

export default FAQs;
