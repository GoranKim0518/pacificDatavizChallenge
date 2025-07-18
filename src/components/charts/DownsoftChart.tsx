import { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { processDownsoftChartData } from '../../data/chartData';
import type { DownsoftChartData } from '../../types/chart';

const Downsoft = () => {
  const processedData = useMemo<DownsoftChartData[]>(() => processDownsoftChartData(), []);

  const chartData = useMemo(() => {
    return processedData.map(item => ({
      country: item.country,
      male: item.male,
      female: item.female,
    }));
  }, [processedData]);

  const tooltipData = useMemo(() => {
    const dataMap = new Map();
    processedData.forEach(item => {
      dataMap.set(item.country, {
        original_male_value: item.original_male_value,
        original_female_value: item.original_female_value,
        male_year: item.male_year,
        female_year: item.female_year,
      });
    });
    return dataMap;
  }, [processedData]);

  return (
    <div className="bg-white border border-gray-300 p-6 overflow-hidden mb-16 mt-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          Infrastructure vs Digital Literacy
        </h3>
        <div className="h-96 w-full overflow-hidden">
          <ResponsiveBar
            data={chartData}
            keys={['male', 'female']}
            indexBy="country"
            groupMode="grouped"
            colors={['#f47560', '#e8c547']}
            margin={{ top: 30, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 45,
              legend: 'Country',
              legendPosition: 'middle',
              legendOffset: 45,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Software Download Skills (%)',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
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
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            tooltip={({ id, color, indexValue }) => {
              const genderKey = id as 'male' | 'female';
              const countryData = tooltipData.get(indexValue);
              
              if (!countryData) return null;
              
              const originalValue = genderKey === 'male' 
                ? countryData.original_male_value 
                : countryData.original_female_value;
              const year = genderKey === 'male' 
                ? countryData.male_year 
                : countryData.female_year;
              const genderLabel = genderKey === 'male' ? 'Male' : 'Female';
              
              return (
                <div style={{
                  background: '#fff',
                  color: '#222',
                  padding: '12px 16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  minWidth: '180px',
                  lineHeight: '1.5',
                  zIndex: 9999,
                  position: 'relative'
                }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '16px', 
                    marginBottom: '8px', 
                    color: '#222' 
                  }}>
                    {indexValue}
                  </div>
                  <div style={{ 
                    color: color, 
                    fontSize: '15px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    {genderLabel}: {originalValue !== null ? `${originalValue}%` : 'No data'}
                  </div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '13px' 
                  }}>
                    Year: {year ?? 'N/A'}
                  </div>
                </div>
              );
            }}
            animate={true}
            motionConfig={'gentle'}
          />
        </div>
      </div>
    </div>
  );
};

export default Downsoft;
