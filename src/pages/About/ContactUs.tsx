const ContactUs = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Contact Us</h1>
      <p className="text-lg text-gray-700">
        Have questions or want to get involved? Reach out to us!
      </p>
      <form className="mt-6 max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea className="w-full p-2 border rounded" rows={4} />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </main>
  );
};

export default ContactUs;
