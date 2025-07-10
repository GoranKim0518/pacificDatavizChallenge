import { ResponsiveBar } from '@nivo/bar';
import type { BarCustomLayerProps } from '@nivo/bar';
import { eGovernmentIndexBarData } from '../data/chartData';

interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode: string;
  [key: string]: string | number;
}

const EGovIndexBarChart = () => {
  if (!eGovernmentIndexBarData || eGovernmentIndexBarData.length === 0) {
    return (
      <div style={{ height: '384px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  
  // 전체 데이터로 평균값 계산
  const averageEGI = eGovernmentIndexBarData.reduce((sum, item) => sum + item.value, 0) / eGovernmentIndexBarData.length;

  const EGIAverageLineLayer = ({ xScale, yScale }: BarCustomLayerProps<BarChartDataPoint>) => {
    const y = yScale(averageEGI);
    const startX = xScale.range()[0];
    const endX = xScale.range()[1];
    
    return (
      <g>
        <line
          x1={startX}
          x2={endX}
          y1={y}
          y2={y}
          stroke="#e74c3c"
          strokeWidth={2}
          strokeDasharray="8,4"
          opacity={0.8}
        />
        <text
          x={endX - 10}
          y={y - 8}
          textAnchor="end"
          fill="#e74c3c"
          fontSize={isMobile ? "10" : "12"}
          fontWeight="bold"
        >
          Average: {averageEGI.toFixed(2)}
        </text>
      </g>
    );
  };

  return (
    <div style={{ 
      height: isMobile ? '450px' : '400px', // 2글자 코드로 높이 약간 축소 가능
      width: '100%', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <ResponsiveBar
        data={eGovernmentIndexBarData}
        keys={['value']}
        indexBy="countryCode" // country → countryCode로 변경
        margin={{ 
          top: 60, 
          right: 80, 
          bottom: isMobile ? 80 : 60, // 2글자로 마진 축소 가능
          left: 90 
        }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        
        layers={['grid', 'axes', 'bars', 'markers', EGIAverageLineLayer]}
        
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0, // 2글자라서 회전 불필요
          legend: 'Countries (ISO codes)',
          legendPosition: 'middle',
          legendOffset: isMobile ? 60 : 45, // 오프셋 축소
          // format 함수 제거 - 원본 countryCode 그대로 사용
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
          <div style={{
            background: '#fff',
            color: '#222',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: isMobile ? '12px' : '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            minWidth: '180px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: isMobile ? '14px' : '16px' }}>
              {data.country}
            </div>
            <div style={{ color: color, marginBottom: '4px' }}>
              EGI Score: {value}
            </div>
            <div style={{ color: '#e74c3c', fontSize: isMobile ? '10px' : '12px', marginBottom: '4px' }}>
              Average: {averageEGI.toFixed(2)}
            </div>
            <div style={{ color: '#666', fontSize: isMobile ? '10px' : '12px' }}>
              Code: {data.countryCode}
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
