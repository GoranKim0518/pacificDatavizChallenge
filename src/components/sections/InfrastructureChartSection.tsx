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
           style={{ marginTop: '1.5rem', minHeight: '500px' }}>
        {selectedChart2 === 'infrastructure' && (
          <div
            style={{
              width: '100%',
              height: '450px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',   // vertical centering
              alignItems: 'center',       // horizontal centering
              position: 'relative',
            }}
          >
            <Mob4gntwkDualAxisChart height={400} />
          </div>
        )}

        {selectedChart2 === 'accessibility' && (
          <div
            style={{
              width: '100%',
              height: '450px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <DigitalAccessibilityChart height={400} />
          </div>

        )}
        
        {/* 기본 선택값 설정 */}
        {!selectedChart2 && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>차트를 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfrastructureChartSection;
