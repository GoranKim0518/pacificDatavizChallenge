import '../styles/carbon-button.css';

import { useAppStore } from '../stores/useAppstore';
import { Button } from '@carbon/react';

const ChartSelector = () => {
  const { selectedChart, setSelectedChart } = useAppStore();

  return (
    <div className="carbon-btn-group mb-8 justify-start sm:justify-start">
      <Button
        kind={selectedChart === 'mobile' ? 'primary' : 'tertiary'}
        onClick={() => setSelectedChart('mobile')}
        size="md"
        style={{
          whiteSpace: 'nowrap'
        }}
      >
        <span className="cds--btn__text">
          Mobile Ownership
        </span>
      </Button>
      <Button
        kind={selectedChart === 'egov' ? 'primary' : 'tertiary'}
        onClick={() => setSelectedChart('egov')}
        size="md"
        style={{
          whiteSpace: 'nowrap'
        }}
      >
        <span className="cds--btn__text">
          E-Government Index
        </span>
      </Button>
    </div>
  );
};

export default ChartSelector;
