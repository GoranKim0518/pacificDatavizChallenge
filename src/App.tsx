// App.tsx
import HeroSection from './components/HeroSection';
import ArticleSection from './components/ArticleSection';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ArticleSection />
      {/* 메타데이터 섹션 */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center leading-5">
              Report Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="border-r border-gray-200 last:border-r-0">
                <p className="text-sm text-gray-500 mb-1 leading-6">Publication Date</p>
                <p className="text-base font-medium text-gray-900 leading-5">July 2025</p>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <p className="text-sm text-gray-500 mb-1 leading-6">Research Scope</p>
                <p className="text-base font-medium text-gray-900 leading-5">IT Infrastructure Analysis of 14 Pacific Countries</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 leading-6">Data Period</p>
                <p className="text-base font-medium text-gray-900 leading-5">Based on 2020-2024 Statistical Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
