import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { socialLinks } from '@/constants/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import {
  slideInLeft,
  slideInRight,
  slideInBottom,
  cardFadeIn,
  fadeIn,
  headerReveal,
} from '@/styles/Animations';

interface CardProps {
  icon: string;
  title: string;
  content: ReactNode;
}

const Card: React.FC<CardProps> = ({ icon, title, content }) => (
  <motion.div
    className="relative bg-gradient-to-b from-white to-red-50 dark:from-gray-800 dark:to-gray-900
               border border-gray-200 dark:border-gray-700 
               rounded-2xl p-8 text-center shadow-md hover:shadow-xl 
               transition-[box-shadow] duration-300 overflow-hidden"
    variants={cardFadeIn}
    whileHover={{ scale: 1.05, y: -4 }}
  >
    {/* Gradient bar at top */}
    <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-red-500 to-red-700" />

    <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-300 flex items-center justify-center mb-4 shadow-inner mt-2">
      <img src={icon} alt={`${title} Icon`} className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
      {title}
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
      {content}
    </div>
  </motion.div>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userRole: '',
  });
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          userRole: formData.userRole,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            userRole: '',
          });
          setFormStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Contact form submit error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        {/* Hero Section */}
        <motion.section
          className="my-8 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="max-w-4xl w-4/5 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="md:w-1/2 text-left md:pr-8"
              variants={slideInLeft}
            >
              <motion.h1 className="text-4xl font-bold" variants={headerReveal}>
                Contact Us
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400 mt-2 text-lg"
                variants={fadeIn}
              >
                We'd love to hear from you. Reach out to our team and join our
                global community dedicated to bringing learning opportunities to
                children worldwide.
              </motion.p>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-end mt-6 md:mt-0"
              variants={slideInRight}
            >
              <img
                src="/assets/Images/contact-us.png"
                alt="Contact Us Illustration"
                className="w-80 md:w-[400px]"
              />
            </motion.div>
          </div>
        </motion.section>

        <div className="w-4/5 max-w-5xl mx-auto">
          {/* Contact Methods */}
          <motion.section
            className="my-16 px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center"
              variants={headerReveal}
            >
              <motion.span
                className="text-red-500 font-Pacifico"
                variants={fadeIn}
              >
                Get In{' '}
              </motion.span>
              Touch
            </motion.h2>

            <hr className="w-24 border-t-4 border-red-600 dark:border-red-500 mx-auto mt-3" />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              variants={fadeIn}
            >
              <Card
                icon="assets/Icons/mail.svg"
                title="By Mail"
                content={
                  <>
                    Sugar Labs <br />
                    2028 E Ben White Blvd <br />
                    STE 240 PMB 1271 <br />
                    AUSTIN, TX 78741 <br />
                    USA
                  </>
                }
              />

              <Card
                icon="assets/Icons/phone.svg"
                title="By Phone"
                content={
                  <a
                    href="tel:+16177024088"
                    className="text-red-600 dark:text-red-400 hover:underline font-medium"
                  >
                    +1 (617) 702-4088
                  </a>
                }
              />
            </motion.div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            className="my-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideInBottom}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3"
              variants={headerReveal}
            >
              <motion.span
                className="text-red-500 font-Pacifico"
                variants={fadeIn}
              >
                Send Us{' '}
              </motion.span>
              A Message
            </motion.h2>

            <hr className="w-24 border-t-4 border-red-600 dark:border-red-500 mx-auto mb-8" />

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="userRole"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      I am a (Optional)
                    </label>
                    <select
                      id="userRole"
                      name="userRole"
                      value={formData.userRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">Select your role</option>
                      <option value="Educator">Educator</option>
                      <option value="Student">Student</option>
                      <option value="Developer">Developer</option>
                      <option value="Contributor">Contributor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg"
                  >
                    Thank you — your message was sent.
                  </motion.div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-red-600 dark:bg-red-500 text-white rounded-full hover:bg-red-700 dark:hover:bg-red-400 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.section>

          {/* Social Links */}
          <motion.section
            className="my-16 mt-4 justify-center px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center"
              variants={headerReveal}
            >
              <motion.span
                className="text-red-500 font-Pacifico"
                variants={fadeIn}
              >
                Connect{' '}
              </motion.span>
              With Our Community
            </motion.h2>

            <hr className="w-32 border-t-4 border-red-600 dark:border-red-500 mx-auto mt-2" />
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-center mt-4 text-lg max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Join our global community of educators, developers, and learners
              who are passionate about bringing educational software to children
              around the world.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-8"
              variants={fadeIn}
            >
              {socialLinks.map((social) => (
                <div className="flex justify-center" key={social.href}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-24 h-24 bg-white dark:bg-gray-800 shadow-md rounded-2xl flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700"
                    variants={cardFadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-1">
                      <img
                        src={social.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="filter brightness-0 dark:invert opacity-90"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium text-center">
                      {social.name}
                    </span>
                  </motion.a>
                </div>
              ))}
            </motion.div>
          </motion.section>

          {/* Matrix Chat */}
          <motion.section
            className="my-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideInBottom}
          >
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-300 flex items-center justify-center rounded-lg border border-red-100 dark:border-none">
                    <img
                      src="assets/Icons/chat.svg"
                      alt="Chat Icon"
                      className="h-8 w-8"
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-[Caveat]">
                    Join Our Matrix Chat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Connect with our community in real-time. Get help, share
                    ideas, and collaborate with fellow educators and developers.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    to="matrix"
                    className="inline-block px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-full hover:bg-red-700 dark:hover:bg-red-400 transition-colors font-medium whitespace-nowrap"
                  >
                    <span>Join Chat</span>
                    <span className="ml-1 text-lg leading-none relative top-[-1.2px]">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
