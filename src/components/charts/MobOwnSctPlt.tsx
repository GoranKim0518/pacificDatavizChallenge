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

  // TailwindCSS breakpoints 기준 모바일 환경 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640; // sm: 640px
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024; // md: 768px, lg: 1024px

  // Tailwind 기준에 맞춰 마진/크기 최적화
  let chartMargin;
  let chartHeight;
  let chartWidth;
  if (isMobile) {
    chartMargin = { top: 40, right: 30, bottom: 80, left: 40 };
    chartHeight = 340;
    chartWidth = '100%';
  } else if (isTablet) {
    chartMargin = { top: 60, right: 60, bottom: 100, left: 60 };
    chartHeight = 410;
    chartWidth = '100%';
  } else {
    chartMargin = { top: 80, right: 90, bottom: 120, left: 100 };
    chartHeight = 480;
    chartWidth = '100%';
  }

  function CustomTooltip({ node }: { node: any }) {
    const year = node.data.year ?? '';
    const country = node.formattedX;
    const gender = node.serieId;
    const value = node.formattedY;

    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          padding: '9px 14px',
          fontSize: 15,
          fontFamily: 'inherit',
          color: '#222',
          boxShadow: 'none',
          borderRadius: 0,
          minWidth: 120,
          minHeight: 40,
          lineHeight: 1.5,
          pointerEvents: 'auto',
        }}
      >
        <div style={{ fontWeight: 700 }}>
          {country}{' '}
          <span
            style={{
              color: `${node.serieColor} !important`,
              fontWeight: 700,
            }}
          >
            {gender}
          </span>
          : {value}%
        </div>
        <div style={{ fontWeight: 400, color: '#666', fontSize: 13 }}>
          Year: {year}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          height: chartHeight,
          width: chartWidth,
          maxWidth: isMobile ? '100vw' : '700px',
          margin: '0 auto',
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
          colors={{ scheme: 'nivo' }}
          axisTop={null}
          axisRight={null}
          legends={[]}
          tooltip={CustomTooltip}
        />
      </div>
    </div>
  );
};

export default MobOwnSctPlt;
