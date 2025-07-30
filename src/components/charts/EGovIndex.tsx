import { ResponsiveBar } from '@nivo/bar';
import { eGovernmentIndexBarData } from '../../data/chartData';
// ✅ 올바른 타입 import 제거 (실제로 사용하지 않으므로)

const EGovIndexBarChart = () => {
  if (!eGovernmentIndexBarData || eGovernmentIndexBarData.length === 0) {
    return (
      <div style={{ height: '384px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  
  const averageEGI = eGovernmentIndexBarData.reduce((sum, item) => sum + item.value, 0) / eGovernmentIndexBarData.length;

  const EGIAverageLineLayer = (props: any) => {
    const { xScale, yScale } = props;
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
      height: isMobile ? '450px' : '400px',
      width: '100%', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <ResponsiveBar
        data={eGovernmentIndexBarData as any} // ✅ 타입 단언으로 오류 해결
        keys={['value']}
        indexBy="country"
        margin={{ 
          top: 60, 
          right: 80, 
          bottom: isMobile ? 80 : 60,
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
            minWidth: '180px',
            pointerEvents: 'auto',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: isMobile ? '14px' : '16px' }}>
              {data.country}
            </div>
            <div style={{ color: color, marginBottom: '4px' }}>
              EGI: {value}
            </div>
            <div style={{ color: '#666', fontSize: isMobile ? '12px' : '13px' }}>
              Year: {data.year}
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
