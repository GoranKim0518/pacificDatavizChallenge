import ChartSection from "./ChartSection";
import InfrastructureChartSection from "../sections/InfrastructureChartSection";
import DownsoftChart from "../charts/DownsoftChart";
import EducationComputerChart from "../charts/EducationComputerChart";
import IctProdChart from "../charts/IctProdChart";

const ArticleSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white border border-gray-300 p-8 sm:p-12 lg:p-16">
          {/* Article Header */}
          <div className="prose prose-lg max-w-none" style={{ marginTop: '2rem' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8"
                style={{ lineHeight: '32px' }}>
              IT Sector Performance in the Pacific
            </h2>
          </div>

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
               style={{ lineHeight: '1.5', marginBottom: '2rem' }}>
              These achievements suggest potential for continued development in the IT sector.
            </p>
          </div>

          {/* 첫 번째 차트 섹션 - IBM 표준 간격 적용 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '1.5rem' }}>
            <ChartSection />
          </div>

          {/* 디지털 인프라 글 섹션 */}
          <div className="prose prose-lg max-w-none" style={{ marginTop: '2rem' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8"
                style={{ lineHeight: '32px' }}>
              Digital Infrastructure
            </h2>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              Pacific Island nations demonstrate a pronounced shift toward mobile-centric digital 
              infrastructure, with fixed broadband networks playing a minimal role in regional 
              connectivity. The overwhelming majority of Pacific nations show mobile 4G network 
              usage rates that far exceed their fixed network counterparts, with many countries 
              displaying near-complete reliance on mobile infrastructure.
            </p>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              Internet usage patterns across the Pacific reinforce this mobile-first approach, 
              with consistently low correlation between internet usage and fixed broadband network 
              utilization throughout the region. This pattern reflects the practical realities 
              of deploying connectivity solutions across dispersed island territories.
            </p>

            <p className="text-lg text-gray-700"
              style={{ lineHeight: '1.5', marginBottom: '2rem' }}>
              However, the limited fixed broadband infrastructure presents concerns for long-term 
              digital development. Mobile networks have inherent limitations in bandwidth capacity 
              compared to fiber-optic fixed networks, potentially constraining the region's ability 
              to support data-intensive applications and emerging technologies requiring high-speed, 
              stable connections.
            </p>
          </div>

          {/* 두 번째 차트 섹션 - 디지털 인프라 차트들 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '1.5rem' }}>
            <InfrastructureChartSection />
          </div>

          {/* 디지털 리터러시 글 섹션 */}
          <div className="prose prose-lg max-w-none" style={{ marginTop: '2rem' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8"
                style={{ lineHeight: '32px' }}>
              Infrastructure vs Digital Literacy
            </h2>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              The Pacific region demonstrates a notable gap between educational technology 
              infrastructure and actual digital competency. While most Pacific nations including Fiji, 
              Tuvalu, and Vanuatu have achieved impressive 4G network coverage rates exceeding 95%, 
              since software is typically managed in fixed network environments, this mobile connectivity 
              success does not translate into correspondingly high digital literacy rates.
            </p>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              Despite having mobile infrastructure that could facilitate digital service access, 
              data reveals that the proportion of individuals capable of finding, downloading, installing, 
              and configuring software remains considerably low across most Pacific nations. Countries 
              like Fiji, Kiribati, and Tonga show software competency rates below 20%, with concerning 
              gender disparities evident throughout the region. This indicates that foundational digital 
              skills development that extends far beyond network access capabilities is necessary.
            </p>

            <p className="text-lg text-gray-700"
              style={{ lineHeight: '1.5', marginBottom: '2rem' }}>
              The implications of this digital skills shortfall are particularly significant for Pacific 
              nations' development prospects. This mismatch between mobile connectivity and practical 
              digital literacy creates barriers to leveraging technology for economic advancement, potentially 
              limiting the region's ability to capitalize on digital opportunities and participate effectively 
              in the global digital economy, even when other digital infrastructure elements may be readily available.
            </p>
          </div>

          {/* 세 번째 차트 - 디지털 리터러시 차트 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '2rem' }}>
            <DownsoftChart />
          </div>

          {/* 디지털 리터러시 글 섹션 */}
          <div className="prose prose-lg max-w-none" style={{ marginTop: '2rem' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8"
                style={{ lineHeight: '32px' }}>
              Pacific Countries' Digital Divide
            </h2>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              Pacific Small Island Developing States show 20-60% computer access rates across all education levels. 
              Geographic isolation increases infrastructure costs, economic constraints limit resources, and 
              ICT professional shortages create structural problems beyond simple budget issues, deepening 
              the Pacific region's digital divide.
            </p>

            <p className="text-lg text-gray-700 mb-6"
              style={{ lineHeight: '1.5' }}>
              Educational constraints directly impact ICT industry development, evidenced by Pacific countries' 
              poor ICT export performance. Limited computer access creates a cycle of declining digital literacy 
              and professional shortages. However, as global digitalization accelerates, ICT products become 
              increasingly important, offering Pacific nations opportunities to overcome geographic constraints 
              through digital solutions.
            </p>

            <p className="text-lg text-gray-700"
              style={{ lineHeight: '1.5', marginBottom: '2rem' }}>
              Solving these challenges requires integrated approaches combining educational infrastructure expansion 
              with ICT industry development. Key priorities include remote education platforms, regional cooperation 
              for economies of scale, and international development programs. Comprehensive strategies linking 
              education investment with industrial policy must establish foundations for Pacific regions to 
              capture digital economy opportunities.
            </p>
          </div>

          {/* 네 번째 차트 - 교육용 컴퓨터 차트 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '2rem' }}>
            <EducationComputerChart />
          </div>

          {/* 다섯 번째 차트 - ICT 상품 수출·입 차트 */}
          <div className="not-prose chart-section-responsive" style={{ marginTop: '2rem' }}>
            <IctProdChart />
          </div>

        </article>
      </div>
    </section>
  );
};

export default ArticleSection;
