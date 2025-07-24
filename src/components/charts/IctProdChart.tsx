// components/charts/IctSunburstChart.tsx
import { useMemo, useCallback } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { 
  processICTTradeDataForSunburst,
  getSunburstColor,
  //formatSunburstValue,
  getSunburstLabel,
  PACIFIC_COUNTRIES
} from '../../data/chartData';
import type { 
  SunburstFilterOptions,
  SunburstChartConfig 
} from '../../types/chart';
import { useAppStore } from '../../stores/useAppstore';

interface ICTSunburstChartProps extends SunburstChartConfig {
  title?: string;
  showControls?: boolean;
  interactive?: boolean;
}

const TRADE_FLOW_BUTTONS = [
  { key: 'both' as const, label: 'Both', description: 'Imports and Exports' },
  { key: 'M' as const, label: 'Imports', description: 'Import flows only' },
  { key: 'X' as const, label: 'Exports', description: 'Export flows only' }
];

const ICT_TYPE_BUTTONS = [
  { key: 'both' as const, label: 'Both', description: 'Products and Services' },
  { key: 'ICTPRD' as const, label: 'Products', description: 'ICT Products only' },
  { key: 'ICTSRV' as const, label: 'Services', description: 'ICT Services only' }
];

function ICTSunburstChart({
  height = 600,
  width = '100%',
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  borderWidth = 2,
  borderColor = '#ffffff',
  enableArcLabels = true,
  title = `ICT Trade Sunburst - ${PACIFIC_COUNTRIES.length} Pacific Countries`,
  showControls = true,
  interactive = true
}: ICTSunburstChartProps) {
  
  const ictTradeChart = useAppStore(state => state.ictTradeChart);
  const setTradeFlow = useAppStore(state => state.setTradeFlow);
  const setIctType = useAppStore(state => state.setIctType);
  const setSelectedCountries = useAppStore(state => state.setSelectedCountries);
  const resetICTTradeFilters = useAppStore(state => state.resetICTTradeFilters);

  const filterOptions = useMemo<SunburstFilterOptions>(() => ({
    tradeFlow: ictTradeChart.tradeFlow,
    ictType: ictTradeChart.ictType,
    countries: ictTradeChart.selectedCountries.length > 0 ? ictTradeChart.selectedCountries : [...PACIFIC_COUNTRIES],
    yearRange: ictTradeChart.yearRange
  }), [
    ictTradeChart.tradeFlow,
    ictTradeChart.ictType,
    ictTradeChart.selectedCountries,
    ictTradeChart.yearRange
  ]);

  const sunburstData = useMemo(() => {
    try {
      return processICTTradeDataForSunburst(filterOptions);
    } catch (error) {
      console.error('Error processing sunburst data:', error);
      return { id: 'ICT Trade', children: [] };
    }
  }, [filterOptions]);

  const currentSelectionLabel = useMemo(() => {
    const tradeLabel = ictTradeChart.tradeFlow === 'both' ? 'All Trade' :
                      ictTradeChart.tradeFlow === 'M' ? 'Imports Only' : 'Exports Only';
    const typeLabel = ictTradeChart.ictType === 'both' ? 'All ICT' :
                      ictTradeChart.ictType === 'ICTPRD' ? 'Products Only' : 'Services Only';
    const countryCount = ictTradeChart.selectedCountries.length || PACIFIC_COUNTRIES.length;
    
    return { tradeLabel, typeLabel, countryCount };
  }, [ictTradeChart.tradeFlow, ictTradeChart.ictType, ictTradeChart.selectedCountries.length]);

  const handleTradeFlowChange = useCallback((flow: 'both' | 'M' | 'X') => {
    setTradeFlow(flow);
  }, [setTradeFlow]);

  const handleIctTypeChange = useCallback((type: 'both' | 'ICTPRD' | 'ICTSRV') => {
    setIctType(type);
  }, [setIctType]);

  const handleCountrySelectionChange = useCallback((countries: string[]) => {
    setSelectedCountries(countries);
  }, [setSelectedCountries]);

  const CountrySelector = useMemo(() => {
    const isAllSelected = ictTradeChart.selectedCountries.length === PACIFIC_COUNTRIES.length || ictTradeChart.selectedCountries.length === 0;

    const handleSelectAll = () => {
      handleCountrySelectionChange(isAllSelected ? [] : [...PACIFIC_COUNTRIES]);
    };

    const handleToggleCountry = (countryCode: string) => {
      const currentSelection = ictTradeChart.selectedCountries.length > 0 ? ictTradeChart.selectedCountries : [...PACIFIC_COUNTRIES];
      if (currentSelection.includes(countryCode)) {
        handleCountrySelectionChange(currentSelection.filter(c => c !== countryCode));
      } else {
        handleCountrySelectionChange([...currentSelection, countryCode]);
      }
    };

    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">
            Pacific Countries ({ictTradeChart.selectedCountries.length || PACIFIC_COUNTRIES.length}/{PACIFIC_COUNTRIES.length})
          </span>
          <button
            onClick={handleSelectAll}
            className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 font-medium transition-colors"
            type="button"
          >
            {isAllSelected ? 'Select None' : 'Select All'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
          {PACIFIC_COUNTRIES.map(countryCode => {
            const isSelected = ictTradeChart.selectedCountries.length === 0 || ictTradeChart.selectedCountries.includes(countryCode);
            return (
              <label 
                key={countryCode} 
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleCountry(countryCode)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="font-mono font-bold">{countryCode}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }, [ictTradeChart.selectedCountries, handleCountrySelectionChange]);

  const ControlPanel = useMemo(() => {
    if (!showControls) return null;

    return (
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-6 items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-3 items-center">
            <span className="text-sm font-semibold text-gray-700">Trade Flow:</span>
            <div className="flex gap-2">
              {TRADE_FLOW_BUTTONS.map(button => (
                <button
                  key={button.key}
                  onClick={() => handleTradeFlowChange(button.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    ictTradeChart.tradeFlow === button.key 
                      ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                      : 'bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  type="button"
                  title={button.description}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
            <span className="text-sm font-semibold text-gray-700">ICT Type:</span>
            <div className="flex gap-2">
              {ICT_TYPE_BUTTONS.map(button => (
                <button
                  key={button.key}
                  onClick={() => handleIctTypeChange(button.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    ictTradeChart.ictType === button.key 
                      ? 'bg-green-500 text-white shadow-md transform scale-105' 
                      : 'bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  type="button"
                  title={button.description}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={resetICTTradeFilters}
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
            type="button"
          >
            🔄 Reset All
          </button>
        </div>

        {CountrySelector}
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="font-semibold mb-3 text-gray-800">
            Current Selection: {currentSelectionLabel.tradeLabel} × {currentSelectionLabel.typeLabel}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentSelectionLabel.countryCount}</div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{PACIFIC_COUNTRIES.length}</div>
              <div className="text-xs text-gray-600">Total Pacific</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-xs text-gray-600">Hierarchy Levels</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
            💡 <strong>Sunburst Structure:</strong> Trade Flow → ICT Type → Countries • 
            <span className="text-amber-600 font-semibold">Values in Millions USD</span>
          </div>
        </div>
      </div>
    );
  }, [
    showControls,
    ictTradeChart.tradeFlow,
    ictTradeChart.ictType,
    handleTradeFlowChange,
    handleIctTypeChange,
    resetICTTradeFilters,
    CountrySelector,
    currentSelectionLabel
  ]);

  if (!sunburstData.children || sunburstData.children.length === 0) {
    return (
      <div className="w-full">
        {title && (
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {title}
          </h2>
        )}
        {ControlPanel}
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="text-8xl text-gray-300 mb-4">🌅</div>
            <p className="text-xl text-gray-500 mb-2 font-semibold">
              No trade data available
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting filters or select different countries
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>
      )}
      
      {ControlPanel}
      
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div style={{ height, width }}>
          <ResponsiveSunburst
            data={sunburstData}
            margin={margin}
            id="id"
            value="value"
            cornerRadius={3}
            borderWidth={borderWidth}
            borderColor={borderColor}
            colors={(node: any) => getSunburstColor(node.id)}
            childColor={{ from: 'color', modifiers: [['opacity', 0.6]] }}
            enableArcLabels={enableArcLabels}
            arcLabel={(node: any) => {
              const label = getSunburstLabel(node.id);
              return label.length > 10 ? `${label.slice(0, 8)}...` : label;
            }}
            arcLabelsRadiusOffset={0.5}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            isInteractive={interactive}
            animate={true}
            motionConfig="wobbly"
          />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 mb-1">
          ICT Trade Sunburst for {PACIFIC_COUNTRIES.length} Pacific Island Countries
        </div>
        <div className="text-xs text-gray-500">
          Source: DF_TRADE_ICT_records.json • 
          <span className="text-amber-600 font-semibold">Values in Millions USD (UNIT_MULT: 6)</span> • 
          Hierarchy: {currentSelectionLabel.tradeLabel} → {currentSelectionLabel.typeLabel} → Countries
        </div>
      </div>
    </div>
  );
}

export default ICTSunburstChart;
