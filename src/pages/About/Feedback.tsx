import React from "react";

const Feedback: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Feedback</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name (optional)"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email (optional)"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Your feedback"
          required
          className="border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;