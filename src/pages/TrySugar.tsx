import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Try from '@/components/Try';
import SEO from '@/components/shared/SEO';
import { pageSEO } from '@/constants/SEO';

const TrySugar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pageSEO.trySugar.title}
        description={pageSEO.trySugar.description}
        keywords={pageSEO.trySugar.keywords}
      />
      <Header />
      <main className="flex-grow bg-[#F6DEC9] dark:bg-gray-900/95 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <Try />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrySugar;
