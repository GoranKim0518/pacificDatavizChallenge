import { useAppStore } from '../../stores/useAppstore';
import ChartButtonGroup from '../ui/ChartButtonGroup';
import MobOwnSctPlt from '../charts/MobOwnSctPlt';
import EGovIndexBarChart from '../charts/EGovIndex';

import type { ChartOption } from '../../types/chart';

const ChartSection = () => {
  const { selectedChart1, setSelectedChart1 } = useAppStore();

  const chartOptions: ChartOption[] = [
    { id: 'mobile', label: 'Mobile Ownership' },
    { id: 'egov', label: 'E-Government Index' },
  ];

  return (
    <div>
      <ChartButtonGroup
        options={chartOptions}
        selectedChart={selectedChart1}
        setSelectedChart={setSelectedChart1}
      />

      <div className="bg-white border border-gray-300 p-6 overflow-hidden mb-6 mt-6">
        {selectedChart1 === 'mobile' && (
          <div>
            <div className="w-full overflow-hidden">
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

      {selectedChart1 === 'mobile' && (
        <div
          className="text-xs text-gray-600 text-left"
          style={{
            fontFamily: 'inherit',
            marginTop: '-10px',
            paddingTop: '6px',
            paddingBottom: '2px',
          }}
        >
          <strong>Source:</strong> Mobile Ownership by country (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_MOB_OWN...Y15T49._T._T._T._T._Z._T&to[TIME_PERIOD]=false&pd=%2C"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
          )
        </div>
      )}

      {selectedChart1 === 'egov' && (
        <div
          className="text-xs text-gray-600 text-left"
          style={{
            fontFamily: 'inherit',
            marginTop: '-10px',
            paddingTop: '6px',
            paddingBottom: '2px',
          }}
        >
          <strong>Source:</strong> E-Government Index by country (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.EGI.._T._T._T._T._T._T._Z._T&to[TIME_PERIOD]=false&pd=%2C"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
          )
        </div>
      )}
    </div>
  );
};

export default ChartSection;
