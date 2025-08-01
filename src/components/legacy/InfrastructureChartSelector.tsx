import ChartButtonGroup from '../ui/ChartButtonGroup';
import type { ChartOption } from '../../types/chart';

const InfrastructureChartSelector = () => {
  const chartOptions: ChartOption[] = [
    { id: 'infrastructure', label: 'Digital Infrastructure' },
    { id: 'accessibility', label: 'Digital Accessibility' }
  ];

  return <ChartButtonGroup options={chartOptions} selectedChart={null} setSelectedChart={function (): void {
    throw new Error('Function not implemented.');
  } } />;
};

export default InfrastructureChartSelector;
