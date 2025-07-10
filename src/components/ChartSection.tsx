// components/ChartSection.tsx
import { useAppStore } from '../stores/useAppstore';
import ChartSelector from './ChartSelector';
import MobOwnSctPlt from './MobOwnSctPlt';
import EGovIndexBarChart from './EGovIndex';

const ChartSection = () => {
  const { selectedChart } = useAppStore();

  return (
    <div>
      <ChartSelector />
      
      {/* IBM Token 06: 24px 간격 적용 */}
      <div className="bg-white border border-gray-300 p-6 overflow-hidden" 
           style={{ marginTop: '1.5rem' }}>
        {selectedChart === 'mobile' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Mobile Phone Ownership by Gender
            </h3>
            <div className="h-96 w-full overflow-hidden">
              <MobOwnSctPlt />
            </div>
          </div>
        )}
        
        {selectedChart === 'egov' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              E-Government Index
            </h3>
            <div className="w-full overflow-hidden">
              <EGovIndexBarChart />
            </div>
          </div>
        )}
        
        {!selectedChart && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a Chart to Begin
            </h3>
            <p className="text-gray-500">
              Choose from the options above to explore different aspects of IT infrastructure data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
