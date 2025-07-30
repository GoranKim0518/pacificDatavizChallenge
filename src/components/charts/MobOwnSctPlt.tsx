import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { mobileOwnershipScatterData } from '../../data/chartData';

const MobOwnSctPlt = () => {
  if (!mobileOwnershipScatterData || mobileOwnershipScatterData.length === 0) {
    return (
      <div
        style={{
          height: '384px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#666' }}>Cannot load data.</p>
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const chartMargin = isMobile
    ? { top: 40, right: 70, bottom: 70, left: 80 }
    : { top: 60, right: 90, bottom: 90, left: 100 };

  // Use the exact original color order and code as in your very first base code with 'colors={{ scheme: "nivo" }}'
  // DO NOT override with your own array—let nivo handle color assignment as in your first code
  // So do not pass a custom color array at all.

  return (
    <div
      style={{
        height: '400px',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        zIndex: 10,
      }}
    >
      <ResponsiveScatterPlot
        data={mobileOwnershipScatterData}
        margin={chartMargin}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        blendMode="multiply"
        // USE THE ORIGINAL COLOR SCHEME SETTING HERE - DO NOT PASS A CUSTOM PALETTE
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: isMobile ? 55 : 65,
            itemWidth: isMobile ? 50 : 60,
            itemHeight: isMobile ? 20 : 24,
            itemsSpacing: isMobile ? 24 : 32,
            itemDirection: 'left-to-right',
            symbolSize: isMobile ? 8 : 10,
            symbolShape: 'circle',
            itemTextColor: '#666',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
        tooltip={({ node }) => (
          <div
            style={{
              background: '#fff',
              color: '#222',
              padding: '10px 16px',
              borderRadius: 0,
              fontSize: isMobile ? 12 : 13,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #e0e0e0',
              minWidth: 180,
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
                fontSize: isMobile ? 14 : 16,
              }}
            >
              {node.data.x}{' '}
              <span style={{ color: node.color }}>
                {node.serieId}
              </span>
              :{' '}
              <span style={{ color: '#e67e22' }}>
                {Number(node.data.y).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </div>
            <div
              style={{
                color: '#666',
                fontSize: isMobile ? 12 : 13,
              }}
            >
              Year: {node.data.year}
            </div>
          </div>
        )}
        animate
        motionConfig="gentle"
      />
    </div>
  );
};

export default MobOwnSctPlt;
