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
            <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              Mobile Phone Ownership by Gender
            </h3>
            <div className="h-96 w-full overflow-hidden">
              <MobOwnSctPlt />
            </div>
          </div>
        )}
        
        {selectedChart1 === 'egov' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              E-Government Index
            </h3>
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