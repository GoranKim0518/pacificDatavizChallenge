import React, { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { processDownsoftChartData } from '../../data/chartData';
import type { DownsoftChartData, DualAxisChartProps } from '../../types/chart';

const Downsoft: React.FC<DualAxisChartProps> = ({
  height = 500,
  width = '100%'
}) => {
  const processedData = useMemo<DownsoftChartData[]>(() => processDownsoftChartData(), []);

  // nivo.js 호환 데이터 (null 값 제거)
  const chartData = useMemo(() => {
    return processedData.map(item => ({
      country: item.country,
      male: item.male,
      female: item.female,
    }));
  }, [processedData]);

  // 툴팁용 원본 데이터 맵핑
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
    <div style={{
      width: typeof width === 'string' ? width : `${width}px`,
      height: typeof height === 'number' ? `${height}px` : height,
      padding: '20px',
      backgroundColor: 'transparent',
    }}>
      <ResponsiveBar
        data={chartData}
        keys={['male', 'female']}
        indexBy="country"
        groupMode="grouped"
        colors={['#f47560', '#e8c547']}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
          const genderLabel = genderKey === 'male' ? '남성' : '여성';
          
          return (
            <div style={{
              background: '#fff',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '12px',
              lineHeight: '1.5'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {indexValue}
              </div>
              <div style={{ color: color }}>
                {genderLabel}: {originalValue !== null ? `${originalValue}%` : 'No data'}
              </div>
              <div style={{ color: '#666', fontSize: '11px' }}>
                year: {year ?? 'N/A'}
              </div>
            </div>
          );
        }}
        animate={true}
        motionConfig={'gentle'}
      />
    </div>
  );
};

export default Downsoft;
