import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { mobileOwnershipScatterData } from '../../data/chartData';

const MobOwnSctPlt = () => {
  if (!mobileOwnershipScatterData || mobileOwnershipScatterData.length === 0) {
    return (
      <div style={{ height: '384px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 모바일 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  
  // Scatterplot 전용 텍스트 잘림 방지 마진
  const chartMargin = isMobile 
    ? { top: 40, right: 70, bottom: 70, left: 80 } // 모바일: right +20px, left +20px 증가
    : { top: 60, right: 90, bottom: 90, left: 100 }; // PC: right +20px, left +10px 증가

  return (
    <div style={{ height: '384px', width: '100%', position: 'relative', overflow: 'visible', zIndex: 10 }}>
      <ResponsiveScatterPlot
        data={mobileOwnershipScatterData}
        margin={chartMargin}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        blendMode="multiply"
        
        colors={{ scheme: 'nivo' }}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: isMobile ? -70 : -60,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: isMobile ? 55 : 70
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mobile Ownership (%)',
          legendPosition: 'middle',
          legendOffset: isMobile ? -65 : -75 // Y축 레이블 잘림 방지를 위해 더 좌측으로 이동
        }}
        
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: isMobile ? 65 : 80, // Female 텍스트 잘림 방지를 위해 더 좌측으로 이동
            translateY: -10,
            itemWidth: isMobile ? 50 : 60, // 텍스트 공간 확보를 위해 너비 증가
            itemHeight: 12,
            itemsSpacing: isMobile ? 2 : 3,
            itemDirection: 'left-to-right',
            symbolSize: isMobile ? 8 : 10,
            symbolShape: 'circle',
            itemTextColor: '#666',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
        
        tooltip={({ node }) => (
          <div
            style={{
              background: '#fff',
              color: '#222',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: isMobile ? '12px' : '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #e0e0e0',
              minWidth: '180px',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: isMobile ? '14px' : '16px' }}>
              {node.data.x}
            </div>
            <div style={{ color: node.color, marginBottom: '4px', fontWeight: 600, fontSize: isMobile ? '14px' : '15px' }}>
              {node.serieId}: <span style={{ color: '#e67e22' }}>{Number(node.data.y).toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>
            </div>
            <div style={{ color: '#666', fontSize: isMobile ? '12px' : '13px' }}>
              Year: {node.data.year}
            </div>
          </div>
        )}
        
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export default MobOwnSctPlt;