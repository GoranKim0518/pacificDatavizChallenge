import '../../styles/carbon-button.css';
import { Button } from '@carbon/react';

interface ChartButtonProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChartButton = ({ label, isSelected, onClick }: ChartButtonProps) => {
  return (
    <Button
      kind={isSelected ? 'primary' : 'tertiary'}
      onClick={onClick}
      size="md"
      style={{
        whiteSpace: 'nowrap'
      }}
    >
      <span className="cds--btn__text">
        {label}
      </span>
    </Button>
  );
};

export default ChartButton;
