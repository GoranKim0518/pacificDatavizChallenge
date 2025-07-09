import ChartSection from "./ChartSection";

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
          </div>

          {/* 차트 섹션 - prose 스타일 상속 차단 */}
          <div className="not-prose">
            <ChartSection />
          </div>
        </article>
      </div>
    </section>
  );
};

export default ArticleSection;

