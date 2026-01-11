import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Try from '@/components/Try';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const TrySugar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#F6DEC9] dark:bg-gray-950/95 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.button
            onClick={() => goBack()}
            className="mb-6 px-4 py-2 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors rounded-md hover:bg-[#F3D5B9] dark:hover:bg-blue-950/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </motion.button>

          <Try />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrySugar;
