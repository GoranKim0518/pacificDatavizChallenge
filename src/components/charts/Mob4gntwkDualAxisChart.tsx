import { useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type {
  ChartOptions,
  ChartData,
  TooltipItem,
  ChartEvent,
} from 'chart.js';
import { Chart as ChartComponent } from 'react-chartjs-2';
import {
  processChartData,
  transformForBarChart,
} from '../../data/chartData';
import type {
  ProcessedChartData,
  BarChartData,
  DualAxisChartProps,
} from '../../types/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DualAxisChart = ({
  height = 500,
  width = '100%'
}: DualAxisChartProps) => {
  const chartRef = useRef<ChartJS<'bar' | 'line', number[], string> | null>(null);

  const processedData = useMemo<ProcessedChartData[]>(() => processChartData(), []);
  const barData = useMemo<BarChartData[]>(() => transformForBarChart(processedData), [processedData]);

  const chartData = useMemo<ChartData<'bar' | 'line', number[], string>>(() => {
    const countries: string[] = barData.map(d => d.country);
    const barValues: number[] = barData.map(d => d.IT_MOB_4GNTWK_value);
    
    // 이중축 동기화 제거 - 원본 브로드밴드 값 사용
    const lineValues: number[] = barData.map(d => {
      const original = processedData.find(p => p.country === d.country);
      return original?.original_broadband_value ?? 0;
    });

    return {
      labels: countries,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Proportion of population covered by 4G',
          data: barValues,
          backgroundColor: '#f47560',
          borderColor: '#f47560',
          borderWidth: 0,
          yAxisID: 'y',
          order: 2,
        },
        {
          type: 'line' as const,
          label: 'Fixed Internet broadband subscriptions',
          data: lineValues,
          borderColor: '#61cdbb',
          backgroundColor: '#61cdbb',
          pointBackgroundColor: '#61cdbb',
          pointBorderColor: '#61cdbb',
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          borderWidth: 2,
          yAxisID: 'y1',
          order: 1,
          fill: false,
        },
      ],
    };
  }, [barData, processedData]);

  const options = useMemo<ChartOptions<'bar' | 'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: false,
          boxWidth: 12,
          boxHeight: 12,
          padding: 25,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#222',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar' | 'line'>[]) => tooltipItems[0].label,
          label: (context: TooltipItem<'bar' | 'line'>) => {
            const country: string = context.label;
            const originalData = processedData.find(d => d.country === country);

            if (context.datasetIndex === 0) {
              const value = originalData?.original_4G_value;
              return value !== null && value !== undefined ? `${value}%` : 'No data';
            } else if (context.datasetIndex === 1) {
              const value = originalData?.original_broadband_value;
              return value !== null && value !== undefined ? `${value.toFixed(1)} per 100` : 'No data';
            }
            return '';
          },
          afterLabel: (context: TooltipItem<'bar' | 'line'>) => {
            const country: string = context.label;
            const originalData = processedData.find(d => d.country === country);
            const yearValue = context.datasetIndex === 0
              ? originalData?.coverage_year
              : originalData?.broadband_year;
            return `Year: ${yearValue?.toString() ?? 'N/A'}`;
          },
          labelColor: (context: TooltipItem<'bar' | 'line'>) => ({
            borderColor: context.datasetIndex === 0 ? '#f47560' : '#61cdbb',
            backgroundColor: context.datasetIndex === 0 ? '#f47560' : '#61cdbb',
          }),
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Country',
          font: { size: 12 },
        },
        grid: {
          display: true,
          color: '#e0e0e0',
          lineWidth: 0.5,
        },
        ticks: {
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Proportion of population covered by 4G (%)',
          font: { size: 12 },
        },
        grid: {
          display: true,
          color: '#e0e0e0',
          lineWidth: 0.5,
        },
        ticks: {
          stepSize: 20,
          font: { size: 11 },
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 40, // 고정값 40으로 설정
        title: {
          display: true,
          text: 'Fixed Internet broadband subscriptions (per 100)',
          font: { size: 12 },
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 0,
        hoverRadius: 3,
      },
    },
    onHover: (event: ChartEvent, activeElements: any[]) => {
      const target = event.native?.target as HTMLElement;
      if (target) {
        target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    },
  }), [processedData]);

  return (
    <div style={{
      width,
      height: typeof height === 'number' ? `${height}px` : height,
      padding: '20px',
      backgroundColor: 'transparent',
    }}>
      <ChartComponent
        ref={chartRef}
        type="bar"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default DualAxisChart;