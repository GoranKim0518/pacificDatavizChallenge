import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController, // 추가됨
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { processDownsoftChartData } from '../../data/chartData';
import type { DownsoftChartData } from '../../types/chart';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';

// 반드시 컨트롤러 등록! (BarController)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

export default function Downsoft() {
  const processedData = useMemo<DownsoftChartData[]>(() => processDownsoftChartData(), []);

  const chartData = useMemo<ChartData<'bar'>>(() => ({
    labels: processedData.map(item => item.country),
    datasets: [
      {
        label: 'Male',
        data: processedData.map(item => item.male),
        backgroundColor: '#f47560',
        barPercentage: 0.88,
        categoryPercentage: 0.88,
      },
      {
        label: 'Female',
        data: processedData.map(item => item.female),
        backgroundColor: '#e8c547',
        barPercentage: 0.88,
        categoryPercentage: 0.88,
      },
    ],
  }), [processedData]);

  const options = useMemo<ChartOptions<'bar'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 25,
          font: { size: 12 },
          color: '#222',
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
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 12 },
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar'>[]) => tooltipItems[0].label ?? '',
          label: (context: TooltipItem<'bar'>) => {
            const i = context.dataIndex;
            const d = processedData[i];
            const idx = context.datasetIndex ?? 0;
            if (!d) return '';
            if (idx === 0) {
              return `Male: ${d.original_male_value !== null ? d.original_male_value + '%' : 'No data'}`;
            }
            if (idx === 1) {
              return `Female: ${d.original_female_value !== null ? d.original_female_value + '%' : 'No data'}`;
            }
            return '';
          },
          afterLabel: (context: TooltipItem<'bar'>) => {
            const i = context.dataIndex;
            const d = processedData[i];
            const idx = context.datasetIndex ?? 0;
            return `Year: ${idx === 0 ? (d.male_year ?? 'N/A') : (d.female_year ?? 'N/A')}`;
          },
          labelColor: (context: TooltipItem<'bar'>) => ({
            borderColor: context.datasetIndex === 0 ? '#f47560' : '#e8c547',
            backgroundColor: context.datasetIndex === 0 ? '#f47560' : '#e8c547',
          }),
        },
      }
    },
    scales: {
      x: {
        title: { display: false },
        grid: { display: false },
        ticks: {
          display: true,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Software Download Skills (%)',
          font: { size: 12 },
        },
        grid: { color: '#e0e0e0' },
        beginAtZero: true,
        max: 100
      }
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
        left: 24,
        right: 32,
      },
    }
  }), [processedData]);

  return (
    <>
      <div
        className="bg-white border border-gray-300 p-6 overflow-hidden"
        style={{
          marginTop: '1.5rem',
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{
          width: '100%',
          height: 450,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: -10,
        }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>

      <div
        className="text-xs text-gray-600 text-left"
        style={{
          fontFamily: 'inherit',
          marginTop: '-10px',
          paddingTop: '6px',
          paddingBottom: '2px',
        }}
      >
        <strong>Source:</strong> Software download skills by country (
        <a
          href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.DOWNSOFT.CK+FJ+FM+KI+MH+NC+NR+NU+PF+PG+PW+SB+TO+TV+VU+WS.F+M.Y15T49._T._T._T._T._Z._T&to[TIME_PERIOD]=false&ly[rs]=INDICATOR&ly[rw]=GEO_PICT%2CTIME_PERIOD&pd=,"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#2563eb', textDecoration: 'underline' }}
        >
          link
        </a>
        )
      </div>
    </>
  );
}
