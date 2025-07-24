import { useAppStore } from '../../stores/useAppstore';
import ChartButtonGroup from '../ui/ChartButtonGroup';
import MobOwnSctPlt from '../charts/MobOwnSctPlt';
import EGovIndexBarChart from '../charts/EGovIndex';
import type { ChartOption } from '../../types/chart';

const ChartSection = () => {
  const { selectedChart1, setSelectedChart1 } = useAppStore();

  const chartOptions: ChartOption[] = [
    { id: 'mobile', label: 'Mobile Ownership' },
    { id: 'egov', label: 'E-Government Index' }
  ];

  return (
    <div>
      <ChartButtonGroup 
        options={chartOptions}
        selectedChart={selectedChart1}
        setSelectedChart={setSelectedChart1}
      />
      
      {/* 인라인 스타일 제거, Carbon 토큰 사용 */}
      <div className="bg-white border border-gray-300 p-6 overflow-hidden mb-16 mt-6">
        {selectedChart1 === 'mobile' && (
          <div>
            <div className="h-96 w-full overflow-hidden">
              <MobOwnSctPlt />
            </div>
          </div>
        )}
        
        {selectedChart1 === 'egov' && (
          <div>
            <div className="w-full overflow-hidden">
              <EGovIndexBarChart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;