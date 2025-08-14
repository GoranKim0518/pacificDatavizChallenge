import HeroSection from './components/sections/HeroSection';
import ArticleSection from './components/sections/ArticleSection';
import { inject } from '@vercel/analytics';
inject();

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ArticleSection />

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          This project uses open-source tools to create transparent and collaborative visualizations.<br />
          The code is openly available to encourage community involvement and ongoing improvement.<br />
          Thanks to the open-source community for their valuable contributions.
        </div>
      </section>
    </div>
  );
};

export default App;