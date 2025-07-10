import ChartSection from "./ChartSection";

const ArticleSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white border border-gray-300 p-8 sm:p-12 lg:p-16">
          {/* Article Header */}
          <header className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8"
                style={{ lineHeight: '32px' }}>
              IT Sector Performance in the Pacific
            </h2>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6"
               style={{ lineHeight: '1.5' }}>
              Mobile phone ownership rates in Pacific countries demonstrate strong performance. 
              Most countries achieve ownership rates exceeding 70%, with even the lowest-performing 
              country, Kiribati, reaching 50%. Additionally, women's mobile phone ownership rates 
              have reached levels comparable to those of men across the region, indicating successful 
              digital inclusion efforts.
            </p>

            <p className="text-lg text-gray-700 mb-6" 
               style={{ lineHeight: '1.5' }}>
              Their E-Government Index (EGI) scores show respectable performance. Although Papua New 
              Guinea shows a lower EGI of 0.32, other countries perform well with an average of 0.43. 
              According to the UN E-Government Survey 2024, while this is below the global average 
              of 0.6382—which includes many developed nations—it represents a solid middle-tier 
              performance for Small Island Developing States (SIDS).
            </p>

            <p className="text-lg text-gray-700"
               style={{ lineHeight: '1.5', marginBottom: '2rem' }}> {/* IBM Token 07: 32px */}
              These achievements suggest potential for continued development in the IT sector.
            </p>
          </div>

          {/* 차트 섹션 - IBM 표준 간격 적용 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '1.5rem' }}> {/* IBM Token 06: 24px */}
            <ChartSection />
          </div>
        </article>
      </div>
    </section>
  );
};

export default ArticleSection;
