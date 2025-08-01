import ChartButtonGroup from '../ui/ChartButtonGroup';
import type { ChartOption } from '../../types/chart';

const ChartSelector = () => {
  const chartOptions: ChartOption[] = [
    { id: 'mobile', label: 'Mobile Ownership' },
    { id: 'egov', label: 'E-Government Index' }
  ];

  return <ChartButtonGroup options={chartOptions} selectedChart={null} setSelectedChart={function (): void {
    throw new Error('Function not implemented.');
  } } />;
};

export default ChartSelector;
