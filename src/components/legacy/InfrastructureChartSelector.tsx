// components/legacy/InfrastructureChartSelector.tsx
import ChartButtonGroup from '../ui/ChartButtonGroup';
import type { ChartOption } from '../../types/chart';

const InfrastructureChartSelector = () => {
  const chartOptions: ChartOption[] = [
    { id: 'infrastructure', label: 'Digital Infrastructure' },
    { id: 'accessibility', label: 'Digital Accessibility' }
  ];

  return <ChartButtonGroup options={chartOptions} />;
};

export default InfrastructureChartSelector;
