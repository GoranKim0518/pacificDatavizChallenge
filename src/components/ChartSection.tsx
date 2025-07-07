// components/ChartSection.tsx
import ContentSection from './ContentSection';

const ChartSection = () => {
  return (
    <div className="mt-16">
      <ContentSection
        title="Digital Infrastructure Analysis"
        subtitle="Comparative analysis of IT infrastructure development across Pacific nations"
        description="The following charts illustrate the current state of digital connectivity and infrastructure gaps across the region."
        containerSize="4xl"
        titleAlignment="left"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Chart 1 */}
            <h3 className="text-lg font-semibold mb-4">Internet Penetration Rates</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Chart 2 */}
            <h3 className="text-lg font-semibold mb-4">Mobile Network Coverage</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
};

export default ChartSection;
