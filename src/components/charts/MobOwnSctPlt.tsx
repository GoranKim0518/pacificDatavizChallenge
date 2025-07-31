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
    : { top: 70, right: 90, bottom: 90, left: 100 };

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
        />
      </div>
      {/* 카드 내부 맨 아래, 하단 border 바로 윗부분에 Source */}
      <div
        className="text-xs text-gray-600 text-left"
        style={{
          fontFamily: 'inherit',
          paddingTop: '18px',
          paddingBottom: '2px',
          marginTop: 0,
        }}
      >
        <strong>Source:</strong> Mobile Ownership by country (
        <a
          href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.IT_MOB_OWN...Y15T49._T._T._T._T._Z._T&to[TIME_PERIOD]=false&pd=%2C"
          style={{ color: '#2563eb', textDecoration: 'underline' }}
          target="_blank" rel="noopener noreferrer"
        >
          link
        </a>
        )
      </div>
    </div>
  );
};

export default MobOwnSctPlt;
