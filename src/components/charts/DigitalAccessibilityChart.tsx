import { useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
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
  processAccessibilityChartData,
  transformForAccessibilityBarChart,
} from '../../data/chartData';
import type { AccessibilityChartData, DualAxisChartProps } from '../../types/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
);

export default function DigitalAccessibilityChart({
  height = 560,
  width = '100%',
}: DualAxisChartProps) {
  const chartRef = useRef<ChartJS<'bar' | 'line', number[], string> | null>(null);

  const processedData = useMemo<AccessibilityChartData[]>(
    () => processAccessibilityChartData(),
    []
  );

  const barData = useMemo(
    () => transformForAccessibilityBarChart(processedData),
    [processedData]
  );

  // 차트 데이터 생성 시 null 대신 NaN으로 치환 (타입 호환 및 차트식별용)
  const chartData = useMemo<ChartData<'bar' | 'line', number[], string>>(() => {
    const countries = barData.map(d => d.country);
    const barValues = barData.map(d => d.IT_USE_ii99_value ?? NaN);
    const lineValues = barData.map(d => {
      const original = processedData.find(p => p.country === d.country);
      return original?.broadband_subscriptions_per_100 ?? NaN;
    });

    return {
      labels: countries,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Internet Usage',
          data: barValues,
          backgroundColor: '#e8c547',
          borderColor: '#e8c547',
          borderWidth: 0,
          yAxisID: 'y',
          order: 2,
          hidden: false,
        },
        {
          type: 'line' as const,
          label: 'Fixed Internet broadband subscriptions (per 100)',
          data: lineValues,
          borderColor: '#f47560',
          backgroundColor: '#f47560',
          pointBackgroundColor: '#f47560',
          pointBorderColor: '#f47560',
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          borderWidth: 2,
          yAxisID: 'y1',
          order: 1,
          fill: false,
          hidden: false,
        },
      ],
    };
  }, [barData, processedData]);

  const options = useMemo<ChartOptions<'bar' | 'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: false,
          boxWidth: 12,
          boxHeight: 12,
          padding: 25,
          font: { size: 12 },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#222',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 0,
        displayColors: true,
        padding: 12,
        boxPadding: 6,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar' | 'line'>[]) =>
            tooltipItems[0].label ?? '',
          label: (context: TooltipItem<'bar' | 'line'>) => {
            const country = context.label ?? '';
            const originalData = processedData.find(d => d.country === country);
            if (context.dataset.label === 'Internet Usage') {
              const value = originalData?.original_usage_value;
              return value != null
                ? `${country} Usage: ${value}%`
                : `${country} Usage: No data`;
            }
            if (context.dataset.label === 'Fixed Internet broadband subscriptions (per 100)') {
              const value = originalData?.broadband_subscriptions_per_100;
              // isNaN 체크 포함해 No data 분기
              return value != null && !isNaN(value)
                ? `${country} Broadband: ${value.toFixed(1)} per 100`
                : `${country} Broadband: No data`;
            }
            return '';
          },
          afterLabel: (context: TooltipItem<'bar' | 'line'>) => {
            const country = context.label ?? '';
            const originalData = processedData.find(d => d.country === country);
            const yearValue =
              context.dataset.label === 'Internet Usage'
                ? originalData?.usage_year
                : originalData?.broadband_year;
            return `Year: ${yearValue?.toString() ?? 'N/A'}`;
          },
          labelColor: (context: TooltipItem<'bar' | 'line'>) => ({
            borderColor:
              context.dataset.label === 'Internet Usage'
                ? '#e8c547'
                : '#f47560',
            backgroundColor:
              context.dataset.label === 'Internet Usage'
                ? '#e8c547'
                : '#f47560',
          }),
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: { display: false, text: '' },
        grid: { display: true, color: '#e0e0e0', lineWidth: 0.5 },
        ticks: { font: { size: 11 }, maxRotation: 45, minRotation: 0 },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 100,
        title: { display: true, text: 'Internet Usage (%)', font: { size: 12 } },
        grid: { display: true, color: '#e0e0e0', lineWidth: 0.5 },
        ticks: { stepSize: 20, font: { size: 11 }, display: true },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 40,
        title: {
          display: true,
          text: 'Fixed Internet broadband subscriptions (per 100)',
          font: { size: 12 },
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: { font: { size: 11 } },
      },
    },
    elements: {
      line: { tension: 0 },
      point: { radius: 0, hoverRadius: 3 },
    },
    onHover: (event: ChartEvent, activeElements: any[]) => {
      const target = event.native?.target as HTMLElement;
      if (target) {
        target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    },
    layout: {
      padding: { top: 24, bottom: 0, left: 0, right: 0 },
    },
  }), [processedData]);

  return (
    <div
      style={{
        width: typeof width === 'string' ? width : `${width}px`,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: typeof height === 'number' ? `${height}px` : height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 0,
        boxSizing: 'border-box',
      }}
    >
      <ChartComponent
        ref={chartRef}
        type="bar"
        data={chartData}
        options={options}
        style={{ flex: 1, maxWidth: '100%' }}
      />
    </div>
  );
}
