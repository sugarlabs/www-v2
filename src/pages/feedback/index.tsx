import { useState } from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ratingLabels = [
  '',
  'Poor',
  'Needs Improvement',
  'Good',
  'Very Good',
  'Excellent',
];

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target.name === 'message') {
      setCharCount(e.target.value.length);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      ...formData,
      rating,
    });

    toast.success('Thank you for your feedback!');

    setFormData({
      name: '',
      email: '',
      category: '',
      message: '',
    });

    setCharCount(0);
    setRating(0);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      <section
        className="px-6 py-28 bg-gradient-to-br
        from-blue-50 via-white to-purple-50
        dark:from-gray-900 dark:via-gray-900 dark:to-black"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center mb-20"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/20 blur-3xl rounded-full"></div>
          <div className="absolute -top-10 -right-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>

          {/* Icon */}
          <div className="text-5xl mb-6">💬</div>

          {/* Title */}
          <h1
            className="text-5xl font-extrabold mb-6
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          bg-clip-text text-transparent"
          >
            Website Feedback
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Help us improve the{' '}
            <span className="font-semibold text-gray-800 dark:text-white">
              Sugar Labs
            </span>{' '}
            website. Share your{' '}
            <span className="text-purple-500 font-semibold">experience</span>,
            <span className="text-blue-500 font-semibold"> suggestions</span>,
            or report usability issues. Your feedback helps us build a better
            platform for the community.
          </p>

          {/* Decorative divider */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </div>
        </motion.div>

        {/* Enhanced Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16"
        >
          {/* Rating */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md
            hover:shadow-xl border border-gray-200 dark:border-gray-700
            text-center transition"
          >
            <div className="text-4xl mb-2">⭐</div>

            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              4.6
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Average Community Rating
            </p>
          </motion.div>

          {/* Feedback */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md
            hover:shadow-xl border border-gray-200 dark:border-gray-700
            text-center transition"
          >
            <div className="text-4xl mb-2">💬</div>

            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              1200+
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Feedback Received
            </p>
          </motion.div>

          {/* Global */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md
            hover:shadow-xl border border-gray-200 dark:border-gray-700
            text-center transition"
          >
            <div className="text-4xl mb-2">🌍</div>

            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Global
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Contributors Worldwide
            </p>
          </motion.div>
        </motion.div>

        {/* Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white dark:bg-gray-800
          shadow-2xl rounded-3xl p-10 border border-gray-200
          dark:border-gray-700 backdrop-blur-lg
          hover:-translate-y-1 transition"
        >
          {/* Rating */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Rate your experience
            </p>

            <div className="flex justify-center gap-3 text-4xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} stars`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`transition transform duration-200
                  ${
                    (hover || rating) >= star
                      ? 'text-yellow-400 scale-110 drop-shadow-lg'
                      : 'text-gray-300 dark:text-gray-600'
                  }
                  hover:scale-125 hover:rotate-6`}
                >
                  ★
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {ratingLabels[rating]}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name (optional)"
                className="w-full mt-1 p-4 rounded-xl border border-gray-300
                dark:border-gray-600 bg-gray-50 dark:bg-gray-900
                focus:ring-2 focus:ring-blue-400/40 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email (optional)"
                className="w-full mt-1 p-4 rounded-xl border border-gray-300
                dark:border-gray-600 bg-gray-50 dark:bg-gray-900
                focus:ring-2 focus:ring-blue-400/40 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 p-4 rounded-xl border border-gray-300
                dark:border-gray-600 bg-gray-50 dark:bg-gray-900
                focus:ring-2 focus:ring-purple-400/40 outline-none"
              >
                <option value="">Select category</option>
                <option>UI / UX</option>
                <option>Bug Report</option>
                <option>Feature Suggestion</option>
                <option>Documentation</option>
                <option>Other</option>
              </select>
            </div>

            {/* Feedback */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Feedback
              </label>

              <textarea
                name="message"
                rows={5}
                maxLength={500}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                required
                className="w-full mt-1 p-4 rounded-xl border border-gray-300
                dark:border-gray-600 bg-gray-50 dark:bg-gray-900
                focus:ring-2 focus:ring-purple-400/40 outline-none"
              />

              <p className="text-xs text-gray-400 mt-1 text-right">
                {charCount}/500 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-semibold
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20
              transition"
            >
              Submit Feedback
            </button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedback;
