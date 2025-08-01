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

  // 반응형 마진 설정 (모바일 여부 체크)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const chartMargin = isMobile
    ? { top: 40, right: 70, bottom: 70, left: 80 }
    : { top: 70, right: 90, bottom: 90, left: 100 };

  // 커스텀 툴팁: 사진1 스타일, 성별 텍스트만 해당 시리즈 색상
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
          height: '410px',
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
