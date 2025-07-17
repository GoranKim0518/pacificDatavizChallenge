// components/legacy/ChartSelector.tsx
import ChartButtonGroup from '../ui/ChartButtonGroup';
import type { ChartOption } from '../../types/chart';

const ChartSelector = () => {
  const chartOptions: ChartOption[] = [
    { id: 'mobile', label: 'Mobile Ownership' },
    { id: 'egov', label: 'E-Government Index' }
  ];

  return <ChartButtonGroup options={chartOptions} />;
};

export default ChartSelector;
