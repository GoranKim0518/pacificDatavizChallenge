import { useAppStore } from '../../stores/useAppstore';
import ChartButtonGroup from '../ui/ChartButtonGroup';
import type { ChartOption } from '../../types/chart';

const InfrastructureChartSelector = () => {
  const { selectedChart1, setSelectedChart1 } = useAppStore();
  
  const chartOptions: ChartOption[] = [
    { id: 'infrastructure', label: 'Digital Infrastructure' }
  ];

  return (
    <ChartButtonGroup 
      options={chartOptions}
      selectedChart={selectedChart1}
      setSelectedChart={setSelectedChart1}
    />
  );
};

export default InfrastructureChartSelector;
