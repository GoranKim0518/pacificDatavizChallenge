import '../styles/carbon-button.css';

import { useAppStore } from '../stores/useAppstore';
import { Button } from '@carbon/react';

const ChartSelector = () => {
  const { selectedChart, setSelectedChart } = useAppStore();

  return (
    <div className="flex gap-4 mb-8 justify-start">
      <Button
        kind={selectedChart === 'mobile' ? 'primary' : 'secondary'}
        onClick={() => setSelectedChart('mobile')}
        size="md"
      >
        Mobile Ownership
      </Button>
      <Button
        kind={selectedChart === 'egov' ? 'primary' : 'secondary'}
        onClick={() => setSelectedChart('egov')}
        size="md"
      >
        E-Government Index
      </Button>
    </div>
  );
};

export default ChartSelector;
