import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Try from '@/components/Try';

const TrySugar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#F6DEC9] p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <Try />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrySugar;
