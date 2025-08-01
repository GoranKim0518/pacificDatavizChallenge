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
      
      <div 
        className="bg-white border border-gray-300 p-6 overflow-hidden mb-12" 
        style={{ marginTop: '1.5rem', minHeight: '500px' }}
      >
        {selectedChart2 === 'infrastructure' && (
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
        
        {!selectedChart2 && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>차트를 선택해주세요.</p>
          </div>
        )}
      </div>

      {selectedChart2 === 'infrastructure' && (
        <div
          className="text-xs text-gray-600 text-left"
          style={{
            fontFamily: 'inherit',
            marginTop: '-30px',
            paddingTop: '6px',
            paddingBottom: '4px',
          }}
        >
          <strong>Source:</strong> Fixed Broadband & Network by country (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_NET_BBND.._T._T._T._T._T._T._Z._T&to[TIME_PERIOD]=false&ly[rs]=INDICATOR&ly[rw]=GEO_PICT%2CTIME_PERIOD&pd=%2C"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
          ) / 4G Mobile Network (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_MOB_4GNTWK.._T._T._T._T._T._T._Z._T&to[TIME_PERIOD]=false&ly[rs]=INDICATOR&ly[rw]=GEO_PICT%2CTIME_PERIOD&pd=%2C"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
          )
        </div>
      )}

      {selectedChart2 === 'accessibility' && (
        <div
          className="text-xs text-gray-600 text-left"
          style={{
            fontFamily: 'inherit',
            marginTop: '-30px',
            paddingTop: '6px',
            paddingBottom: '4px',
          }}
        >
          <strong>Source:</strong> Fixed Broadband & Network by country (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_NET_BBND.._T._T._T._T._T._T._Z._T&to[TIME_PERIOD]=false&ly[rs]=INDICATOR&ly[rw]=GEO_PICT%2CTIME_PERIOD&pd=%2C"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
          ) / Internet Usage by country (
          <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_USE_ii99.._T._T._T._T._T._T._Z._T&to[TIME_PERIOD]=false&ly[rs]=INDICATOR&ly[rw]=GEO_PICT%2CTIME_PERIOD&pd=%2C"
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

export default InfrastructureChartSection;
