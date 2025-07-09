import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { mobileOwnershipScatterData } from '../data/chartData';

const MobOwnSctPlt = () => {
  if (!mobileOwnershipScatterData || mobileOwnershipScatterData.length === 0) {
    return (
      <div style={{ height: '384px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ height: '384px', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <ResponsiveScatterPlot
        data={mobileOwnershipScatterData}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        blendMode="multiply"
        
        colors={{ scheme: 'category10' }}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: 46
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mobile Ownership (%)',
          legendPosition: 'middle',
          legendOffset: -60
        }}
        
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle'
          }
        ]}
        
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export default MobOwnSctPlt;
