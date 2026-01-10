import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Try from '@/components/Try';
import { useNavigate } from 'react-router-dom';

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
          <button
            onClick={goBack}
            className="text-sm text-blue-600 hover:underline mb-4"
          >
            ← Back
          </button>

          <Try />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrySugar;
