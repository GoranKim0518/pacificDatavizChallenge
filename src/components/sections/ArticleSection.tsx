import ChartSection from "./ChartSection";
import InfrastructureChartSection from "../sections/InfrastructureChartSection";
import DownsoftChart from "../charts/DownsoftChart";
import EducationComputerChart from "../charts/EducationComputerChart";
import IctProdChart from "../charts/IctProdChart";

const ArticleSection = () => (
  <section className="bg-gradient-to-b from-blue-50 to-white py-16">
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="bg-white border border-gray-300 p-8 sm:p-12 lg:p-16">

        {/* Foundations Section */}
        <div id="foundations" className="prose prose-lg max-w-none" style={{ marginTop: "2rem" }}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8" style={{ lineHeight: "32px" }}>
            Blue Pacific 2050: Digital Foundations
          </h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Pacific countries show strong mobile phone ownership rates. Most countries exceed 70% ownership. Even Kiribati, the lowest performer, reaches 50%. Women's ownership rates now match men's across the region. This indicates successful digital inclusion efforts.
          </p>
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            E-Government Index (EGI) scores demonstrate respectable regional performance. Papua New Guinea scores lower at 0.32. Other countries average 0.43. The UN E-Government Survey 2024 shows this is below the global average of 0.64. However, this represents solid middle-tier performance for Small Island Developing States.
          </p>
          <p className="text-lg text-gray-700" style={{ lineHeight: "1.5", marginBottom: "2rem" }}>
            These achievements provide a strong foundation for Blue Pacific 2050 connectivity goals. They suggest significant potential for continued IT sector development.
          </p>
        </div>
        <div className="not-prose chart-section-responsive" style={{ marginTop: "1.5rem" }}>
          <ChartSection />
        </div>

        {/* Infrastructure Section */}
        <div id="infrastructure" className="prose prose-lg max-w-none" style={{ marginTop: "2rem" }}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8" style={{ lineHeight: "32px" }}>
            Mobile-First Pacific Infrastructure
          </h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Pacific Island nations have shifted to mobile-centric digital infrastructure. Fixed broadband networks play a minimal role in regional connectivity. Most Pacific nations show mobile 4G usage rates far exceeding fixed networks. Many countries rely almost entirely on mobile infrastructure.
          </p>
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Internet usage patterns reinforce this mobile-first approach. There is low correlation between internet usage and fixed broadband utilization. This pattern reflects practical realities. Deploying connectivity across dispersed island territories requires mobile solutions.
          </p>
          <p className="text-lg text-gray-700" style={{ lineHeight: "1.5", marginBottom: "2rem" }}>
            However, limited fixed broadband infrastructure creates concerns for long-term development. Mobile networks have bandwidth limitations compared to fiber-optic networks. This may constrain the region's ability to support data-intensive applications. Blue Pacific 2050 sustainability goals will require high-speed, stable connections for emerging technologies.
          </p>
        </div>
        <div className="not-prose chart-section-responsive" style={{ marginTop: "1.5rem" }}>
          <InfrastructureChartSection />
        </div>

        {/* Skills Section */}
        <div id="skills" className="prose prose-lg max-w-none" style={{ marginTop: "2rem" }}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8" style={{ lineHeight: "32px" }}>
            Bridging the Digital Skills Gap
          </h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            The Pacific region shows a notable gap between infrastructure and digital competency. Fiji, Tuvalu, and Vanuatu have achieved 4G coverage exceeding 95%. However, software typically requires fixed network environments. Mobile connectivity success does not translate into high digital literacy rates.
          </p>
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Mobile infrastructure could facilitate digital service access. Yet data reveals low software competency across Pacific nations. Fiji, Kiribati, and Tonga show software skills below 20%. Gender disparities are evident throughout the region. This indicates that foundational digital skills development is necessary beyond network access.
          </p>
          <p className="text-lg text-gray-700" style={{ lineHeight: "1.5", marginBottom: "2rem" }}>
            This digital skills shortfall significantly impacts development prospects. The mismatch between connectivity and digital literacy creates barriers. It limits the region's ability to leverage technology for economic advancement. This threatens participation in the global digital economy. Addressing this gap is essential for Blue Pacific 2050 digital transformation goals.
          </p>
        </div>
        <div className="not-prose chart-section-responsive" style={{ marginTop: "2rem" }}>
          <DownsoftChart />
        </div>

        {/* Communities Section */}
        <div id="communities" className="prose prose-lg max-w-none" style={{ marginTop: "2rem" }}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-8 mb-8" style={{ lineHeight: "32px" }}>
            Building Resilient Digital Communities
          </h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Access to computers across education levels in Pacific Island countries remains at 20-60%. This indicates that digital education infrastructure within schools is limited. Shortages in equipment and network connectivity continue to directly impede ICT training and the development of skilled professionals in the region.
          </p>
          <p className="text-lg text-gray-700 mb-6" style={{ lineHeight: "1.5" }}>
            Limited opportunities to use computers further contribute to declining digital literacy across these societies. Data shows that ICT-related exports from Pacific countries remain minimal, reflecting persistent challenges in building technical capacity and industrial competitiveness.
          </p>
          <p className="text-lg text-gray-700" style={{ lineHeight: "1.5", marginBottom: "2rem" }}>
            Addressing these realities requires more than expanding infrastructure. Policies must integrate digital literacy programs and ICT sector development. Approaches such as remote learning platforms, increased regional cooperation, and international partnerships are necessary steps to improve ICT access and workforce training. These measures form the foundation for any future digital economy in the Blue Pacific context; they are essential rather than optional.
          </p>
        </div>
        <div className="not-prose chart-section-responsive" style={{ marginTop: "2rem", minHeight: 330 }}>
          <EducationComputerChart />
        </div>
        <div className="not-prose chart-section-responsive" style={{ marginTop: "2rem" }}>
          <IctProdChart />
        </div>

      </article>
    </div>
  </section>
);

export default ArticleSection;
