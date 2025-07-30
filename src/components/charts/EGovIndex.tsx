import { ResponsiveBar } from '@nivo/bar';
import { eGovernmentIndexBarData } from '../../data/chartData';

const EGovIndexBarChart = () => {
  if (!eGovernmentIndexBarData || eGovernmentIndexBarData.length === 0) {
    return (
      <div style={{
        height: '384px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#666' }}>Cannot load data.</p>
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const averageEGI = eGovernmentIndexBarData.reduce(
    (sum, item) => sum + item.value, 0
  ) / eGovernmentIndexBarData.length;

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
        data={eGovernmentIndexBarData as any}
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
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: isMobile ? 65 : 80,
            translateY: -10,
            itemsSpacing: 2,
            itemWidth: isMobile ? 50 : 60,
            itemHeight: 12,
            itemDirection: 'left-to-right',
            symbolSize: isMobile ? 8 : 10,
            symbolShape: 'circle',
            itemTextColor: '#666',
            effects: [
              {
                on: 'hover',
                style: { itemTextColor: '#000' }
              }
            ]
          }
        ]}
        tooltip={({ value, color, data }) => (
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
              {data.country}{' '}
              <span style={{ color }}>
                EGI
              </span>
              :{' '}
              <span style={{ color: '#e67e22' }}>
                {Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div
              style={{
                color: '#666',
                fontSize: isMobile ? 12 : 13,
              }}
            >
              Year: {data.year}
            </div>
          </div>
        )}
        animate
        motionConfig="gentle"
      />
    </div>
  );
};

export default EGovIndexBarChart;
