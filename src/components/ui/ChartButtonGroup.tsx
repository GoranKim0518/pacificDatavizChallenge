// components/ui/ChartButtonGroup.tsx
import ChartButton from './ChartButton';
import type { ChartOption } from '../../types/chart';

interface ChartButtonGroupProps {
  options: ChartOption[];
  selectedChart: string | null;
  setSelectedChart: (chart: any) => void;
  className?: string;
}

const ChartButtonGroup = ({ 
  options, 
  selectedChart,
  setSelectedChart,
  className = "carbon-btn-group mb-6 justify-start sm:justify-start" 
}: ChartButtonGroupProps) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <ChartButton
          key={option.id}
          id={option.id}
          label={option.label}
          isSelected={selectedChart === option.id}
          onClick={() => setSelectedChart(option.id)}
        />
      ))}
    </div>
  );
};

export default ChartButtonGroup;
