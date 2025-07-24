// components/sections/InfrastructureChartSection.tsx
import { useAppStore } from '../../stores/useAppstore';
import ChartButtonGroup from '../ui/ChartButtonGroup';
import Mob4gntwkDualAxisChart from '../charts/Mob4gntwkDualAxisChart';
import DigitalAccessibilityChart from '../charts/DigitalAccessibilityChart';
import type { ChartOption } from '../../types/chart';

const InfrastructureChartSection = () => {
  const { selectedChart2, setSelectedChart2 } = useAppStore();

  const chartOptions: ChartOption[] = [
    { id: 'infrastructure', label: 'Digital Infrastructure' },
    { id: 'accessibility', label: 'Digital Accessibility' }
  ];

  return (
    <div>
      <ChartButtonGroup 
        options={chartOptions}
        selectedChart={selectedChart2}
        setSelectedChart={setSelectedChart2}
      />
      
      <div className="bg-white border border-gray-300 p-6 overflow-hidden mb-12" 
           style={{ marginTop: '1.5rem' }}>
        {selectedChart2 === 'infrastructure' && (
          <div>
            <div className="w-full overflow-hidden">
              <Mob4gntwkDualAxisChart />
            </div>
          </div>
        )}

        {selectedChart2 === 'accessibility' && (
          <div>
            <div className="w-full overflow-hidden">
              <DigitalAccessibilityChart />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default InfrastructureChartSection;
