import { useState, useMemo, useCallback } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import type { ComputedDatum } from '@nivo/sunburst';
import type { SunburstNode } from '../../data/chartData';
import {
  processICTTradeDataForSunburst,
  getSunburstColor,
  formatSunburstValue,
  getSunburstLabel,
  PACIFIC_COUNTRIES,
} from '../../data/chartData';
import type { SunburstFilterOptions } from '../../types/chart';
import { useAppStore } from '../../stores/useAppstore';
import ChartButton from '../ui/ChartButton';

function CustomDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  style,
  labelId,
}: {
  label: string;
  labelId?: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (val: T) => void;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" style={style}>
      <label
        id={labelId}
        className="block mb-1 text-xs"
        style={{ fontFamily: 'inherit', fontWeight: 400 }}
      >
        {label}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        className="w-[120px] flex items-center justify-between bg-white border border-gray-300 py-2 pl-3 pr-2 text-sm transition hover:border-gray-500"
        style={{
          borderRadius: 0,
          fontFamily: 'inherit',
          fontWeight: 400,
          outline: open ? '2px solid #0f62fe' : 'none',
          outlineOffset: 2,
          boxShadow: 'none',
        }}
        tabIndex={0}
        onClick={() => setOpen(v => !v)}
      >
        <span style={{ fontFamily: 'inherit', fontWeight: 400 }}>
          {options.find(opt => opt.key === value)?.label ?? ''}
        </span>
        <span style={{ fontSize: 16, marginLeft: 8, color: '#888' }}>▼</span>
      </button>
      {open && (
        <ul
          className="absolute z-40 mt-1 w-full bg-white border border-gray-300"
          style={{
            borderRadius: 0,
            fontFamily: 'inherit',
            boxShadow: 'none',
          }}
          role="listbox"
        >
          {options.map(opt => (
            <li
              key={opt.key}
              className={`pl-3 pr-2 py-2 cursor-pointer text-sm transition hover:bg-gray-100 hover:text-gray-800`}
              role="option"
              aria-selected={opt.key === value}
              onClick={() => {
                onChange(opt.key);
                setOpen(false);
              }}
              tabIndex={0}
              style={{
                background: opt.key === value ? '#e8e8e8' : 'white',
                borderRadius: 0,
                fontWeight: 400,
                fontFamily: 'inherit',
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const TRADE_FLOW_OPTIONS = [
  { key: 'both' as const, label: 'Both' },
  { key: 'M' as const, label: 'Imports' },
  { key: 'X' as const, label: 'Exports' },
];
const ICT_TYPE_OPTIONS = [
  { key: 'both' as const, label: 'Both' },
  { key: 'ICTPRD' as const, label: 'Products' },
  { key: 'ICTSRV' as const, label: 'Services' },
];

export default function ICTSunburstChart({
  height = 600,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  borderWidth = 2,
  borderColor = '#fff',
  enableArcLabels = true,
  showControls = true,
  interactive = true,
}: {
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  borderWidth?: number;
  borderColor?: string;
  enableArcLabels?: boolean;
  showControls?: boolean;
  interactive?: boolean;
}) {
  const ictTradeChart = useAppStore(state => state.ictTradeChart);
  const setTradeFlow = useAppStore(state => state.setTradeFlow);
  const setIctType = useAppStore(state => state.setIctType);
  const setSelectedCountries = useAppStore(state => state.setSelectedCountries);
  const resetICTTradeFilters = useAppStore(state => state.resetICTTradeFilters);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const filterOptions: SunburstFilterOptions = useMemo(() => ({
    tradeFlow: ictTradeChart.tradeFlow,
    ictType: ictTradeChart.ictType,
    countries: ictTradeChart.selectedCountries.length > 0
      ? ictTradeChart.selectedCountries
      : [...PACIFIC_COUNTRIES],
    yearRange: ictTradeChart.yearRange,
  }), [
    ictTradeChart.tradeFlow,
    ictTradeChart.ictType,
    ictTradeChart.selectedCountries,
    ictTradeChart.yearRange,
  ]);

  const currentSelectionLabel = useMemo(() => {
    const tradeLabel =
      ictTradeChart.tradeFlow === 'both' ? 'All Trade'
        : ictTradeChart.tradeFlow === 'M' ? 'Imports Only'
        : 'Exports Only';
    const typeLabel =
      ictTradeChart.ictType === 'both' ? 'All ICT'
        : ictTradeChart.ictType === 'ICTPRD' ? 'Products Only'
        : 'Services Only';
    const countryCount = ictTradeChart.selectedCountries.length || PACIFIC_COUNTRIES.length;
    return { tradeLabel, typeLabel, countryCount };
  }, [
    ictTradeChart.tradeFlow,
    ictTradeChart.ictType,
    ictTradeChart.selectedCountries.length,
  ]);

  const handleTradeFlowChange = useCallback(
    (val: 'both' | 'M' | 'X') => setTradeFlow(val),
    [setTradeFlow]
  );
  const handleIctTypeChange = useCallback(
    (val: 'both' | 'ICTPRD' | 'ICTSRV') => setIctType(val),
    [setIctType]
  );
  const handleReset = useCallback(() => {
    resetICTTradeFilters();
  }, [resetICTTradeFilters]);

  const isAllSelected = ictTradeChart.selectedCountries.length === 0
    || ictTradeChart.selectedCountries.length === PACIFIC_COUNTRIES.length;

  const handleToggleAllCountries = useCallback(() => {
    setSelectedCountries(isAllSelected ? ["__NONE_SENTINEL__"] : [...PACIFIC_COUNTRIES]);
  }, [isAllSelected, setSelectedCountries]);

  const handleCountryToggle = useCallback((country: string) => {
    let selection = ictTradeChart.selectedCountries.length > 0
      ? [...ictTradeChart.selectedCountries]
      : [...PACIFIC_COUNTRIES];

    if (
      (ictTradeChart.selectedCountries.length === 0 || selection.length === PACIFIC_COUNTRIES.length)
      && selection.includes(country)
    ) {
      selection = PACIFIC_COUNTRIES.filter(c => c !== country);
      if (selection.length === 0) {
        setSelectedCountries(["__NONE_SENTINEL__"]);
      } else {
        setSelectedCountries(selection);
      }
    } else if (selection.includes(country)) {
      const filtered = selection.filter(c => c !== country);
      setSelectedCountries(filtered.length ? filtered : ["__NONE_SENTINEL__"]);
    } else {
      setSelectedCountries([...selection, country]);
    }
  }, [ictTradeChart.selectedCountries, setSelectedCountries]);

  const displayedCountries = useMemo(() => {
    const c = ictTradeChart.selectedCountries;
    if (c.length === 1 && c[0] === "__NONE_SENTINEL__") return [];
    if (c.length > 0) return c.filter(v => v !== "__NONE_SENTINEL__");
    return [];
  }, [ictTradeChart.selectedCountries]);

  const handleDropdownToggle = useCallback(() => {
    setCountryDropdownOpen(v => !v);
  }, []);

  const CustomTooltip = useCallback((props: ComputedDatum<SunburstNode>) => (
    <div
      style={{
        background: '#fff',
        color: '#222',
        padding: '10px 16px',
        borderRadius: 0,
        fontSize: '13px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid #e0e0e0',
        minWidth: 180,
        pointerEvents: 'auto',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          marginBottom: 8,
          fontSize: 15,
        }}
      >
        {getSunburstLabel(String(props.id))}
        <span style={{ marginLeft: 8, color: '#e67e22' }}>
          {formatSunburstValue(props.value ?? 0)} USD
        </span>
      </div>
      <div
        style={{
          color: '#666',
          fontSize: 13,
        }}
      >
        {props.id}
      </div>
    </div>
  ), []);

  return (
    <div style={{ fontFamily: 'inherit', width: '100%', position: 'relative', minHeight: 200 }}>
      {showControls && (
        <>
          {/* Controls UI */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-3 mb-4">
            <div className="flex gap-6 items-end">
              <CustomDropdown
                label="Trade Flow"
                options={TRADE_FLOW_OPTIONS}
                value={ictTradeChart.tradeFlow}
                onChange={handleTradeFlowChange}
                labelId="tradeflow-select"
              />
              <CustomDropdown
                label="ICT Type"
                options={ICT_TYPE_OPTIONS}
                value={ictTradeChart.ictType}
                onChange={handleIctTypeChange}
                labelId="icttype-select"
              />
            </div>
            <div className="md:ml-auto flex items-center gap-3" style={{ minWidth: 280 }}>
              <button
                type="button"
                onClick={handleDropdownToggle}
                className="border border-gray-400 rounded-none bg-white hover:bg-gray-100 px-4 py-2 text-sm font-normal transition"
                style={{
                  minWidth: 120,
                  fontFamily: 'inherit',
                  borderRadius: 0,
                  boxShadow: 'none',
                }}
                aria-haspopup="listbox"
                aria-expanded={countryDropdownOpen}
              >
                Pacific Countries ▾
              </button>
              <ChartButton
                id="reset"
                label="Reset"
                isSelected={false}
                onClick={handleReset}
              />
            </div>
          </div>
          {countryDropdownOpen && (
            <div
              className="absolute z-50 mt-2 border border-gray-300 bg-white rounded-none"
              style={{
                fontFamily: 'inherit',
                borderRadius: 0,
                minWidth: 250,
                maxWidth: 420,
                maxHeight: 320,
                right: 16,
                boxShadow: 'none',
              }}
            >
              <div className="flex items-center justify-between py-2 px-3 border-b border-gray-100">
                <span className="text-xs font-semibold">
                  Countries ({displayedCountries.length || PACIFIC_COUNTRIES.length}/{PACIFIC_COUNTRIES.length})
                </span>
                <button
                  onClick={handleToggleAllCountries}
                  className="text-blue-700 text-xs px-2 py-1 border border-gray-500 bg-gray-100 rounded-none"
                  type="button"
                  style={{ borderRadius: 0 }}
                >
                  {isAllSelected ? 'Unselect All' : 'Select All'}
                </button>
              </div>
              <ul className="py-1 px-3 grid grid-cols-2 gap-y-0.5 gap-x-2 max-h-56 overflow-y-auto">
                {PACIFIC_COUNTRIES.map(code => {
                  let selected: boolean;
                  if (ictTradeChart.selectedCountries.length === 0) {
                    selected = true;
                  } else if (
                    ictTradeChart.selectedCountries.length === 1 &&
                    ictTradeChart.selectedCountries[0] === "__NONE_SENTINEL__"
                  ) {
                    selected = false;
                  } else {
                    selected = ictTradeChart.selectedCountries.includes(code);
                  }
                  return (
                    <li key={code} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleCountryToggle(code)}
                        className="w-4 h-4 border-gray-800 rounded-none"
                        id={`country-${code}`}
                      />
                      <label htmlFor={`country-${code}`} className="text-xs font-mono font-bold">{code}</label>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-end py-2 pr-4">
                <button
                  onClick={handleDropdownToggle}
                  className="text-xs border border-gray-500 px-3 py-1 rounded-none bg-gray-50"
                  style={{ borderRadius: 0 }}
                  type="button"
                >Close</button>
              </div>
            </div>
          )}
        </>
      )}

      <div
        className="relative bg-white mt-8 mb-4"
        style={{
          maxWidth: 980,
          marginLeft: 'auto',
          marginRight: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: 0,
          boxShadow: 'none',
        }}
      >
        <div style={{ height, width: '100%' }}>
          <ResponsiveSunburst
            data={
              processICTTradeDataForSunburst({
                ...filterOptions,
                countries:
                  displayedCountries.length === 0
                    ? []
                    : displayedCountries,
              })
            }
            margin={margin}
            id="id"
            value="value"
            cornerRadius={0}
            borderWidth={borderWidth}
            borderColor={borderColor}
            colors={node => getSunburstColor(String(node.id))}
            childColor={{ from: 'color', modifiers: [['opacity', 0.6]] }}
            enableArcLabels={enableArcLabels}
            arcLabel={node => {
              const label = getSunburstLabel(String(node.id));
              return label.length > 10 ? `${label.slice(0, 8)}...` : label;
            }}
            arcLabelsRadiusOffset={0.54}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            isInteractive={interactive}
            tooltip={CustomTooltip}
            animate
            motionConfig="wobbly"
          />
        </div>
        {/* 카드 내부 하단(border 바로 위) 출처 추가 */}
        <div
          className="mt-4 mb-3 px-6 text-xs text-gray-600 text-center"
          style={{ fontFamily: 'inherit' }}
        >
          ICT Trade Sunburst for {PACIFIC_COUNTRIES.length} Pacific Island Countries<br />
          <strong>Source:</strong> <a
            href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_TRADE_ICT&df[ag]=SPC&df[vs]=1.0&dq=A..AMTCUR.M%2BX.ICTPRD%2BICTSRV&pd=2010%2C&to[TIME_PERIOD]=false"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb', textDecoration: 'underline' }}
          >link</a>
        </div>
      </div>
    </div>
  );
}
