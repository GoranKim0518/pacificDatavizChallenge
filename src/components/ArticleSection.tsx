// components/ArticleSection.tsx
import { useAppStore } from '../stores/useAppstore';

const ArticleSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-lg p-8 sm:p-12 lg:p-16">
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-left mb-8" 
                style={{ lineHeight: '1.2' }}>
              IT Sector Performance in the Pacific
            </h1>
            
            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 border-b border-gray-200 pb-6">
              <div className="mb-2 sm:mb-0">
                <span className="font-medium">Pacific Technology Research</span>
              </div>
              <div>
                <time dateTime="2024-07-07">July 7, 2024</time>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6" 
               style={{ lineHeight: '1.6' }}>
              Mobile phone ownership rates in Pacific countries demonstrate strong performance. 
              Most countries achieve ownership rates exceeding 70%, with even the lowest-performing 
              country, Kiribati, reaching 50%. Additionally, women's mobile phone ownership rates 
              have reached levels comparable to those of men across the region, indicating successful 
              digital inclusion efforts.
            </p>

            <p className="text-lg text-gray-700 mb-6" 
               style={{ lineHeight: '1.6' }}>
              Their E-Government Index (EGI) scores show respectable performance. Although Papua New 
              Guinea shows a lower EGI of 0.32, other countries perform well with an average of 0.43. 
              According to the UN E-Government Survey 2024, while this is below the global average 
              of 0.6382—which includes many developed nations—it represents a solid middle-tier 
              performance for Small Island Developing States (SIDS).
            </p>

            <p className="text-lg text-gray-700 mb-8" 
               style={{ lineHeight: '1.6' }}>
              These achievements suggest potential for continued development in the IT sector.
            </p>

            {/* Key Statistics Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4" 
                  style={{ lineHeight: '1.3' }}>
                Key Statistics
              </h3>
              <ul className="space-y-2 text-gray-700" 
                  style={{ lineHeight: '1.6' }}>
                <li>• Mobile phone ownership: 70%+ in most Pacific countries</li>
                <li>• Gender parity achieved in mobile phone ownership</li>
                <li>• Average EGI score: 0.43 (excluding Papua New Guinea)</li>
                <li>• Global EGI average: 0.6382 (2024)</li>
              </ul>
            </div>

            {/* Conclusion Section */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4" 
                  style={{ lineHeight: '1.3' }}>
                Looking Forward
              </h3>
              <p className="text-lg text-gray-700" 
                 style={{ lineHeight: '1.6' }}>
                The data indicates that Pacific nations have established a solid foundation in 
                mobile connectivity and digital inclusion. While there remains room for improvement 
                in e-government services, the region's progress in core IT infrastructure suggests 
                promising opportunities for future digital development initiatives.
              </p>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                Pacific Islands
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                Digital Development
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                E-Government
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                Mobile Technology
              </span>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
};

export default ArticleSection;
