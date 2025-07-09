// components/EGovIndexBarChart.tsx
import { ResponsiveBar } from '@nivo/bar';
import { eGovernmentIndexBarData } from '../data/chartData';

const EGovIndexBarChart = () => {
  if (!eGovernmentIndexBarData || eGovernmentIndexBarData.length === 0) {
    return (
      <div style={{ height: '384px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ height: '384px', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <ResponsiveBar
        data={eGovernmentIndexBarData}
        keys={['value']}
        indexBy="country"
        margin={{ top: 50, right: 60, bottom: 80, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }} // Nivo.js 기본 색상 스킴
        
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Countries',
          legendPosition: 'middle',
          legendOffset: 60
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'E-Government Index',
          legendPosition: 'middle',
          legendOffset: -60
        }}
        
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        
        tooltip={({ value, color, data }) => (
          <div
            style={{
              background: '#fff',
              color: '#222',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '2px', color: '#222' }}>
              {data.country}
            </div>
            <div style={{ color: color }}>
              EGI Score: {value}
            </div>
          </div>
        )}
        
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export default EGovIndexBarChart;
