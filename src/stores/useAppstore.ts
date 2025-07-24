// stores/useAppStore.ts
import { create } from 'zustand';
import { PACIFIC_COUNTRIES } from '../data/chartData';

interface ClickedPoint {
  chartId: string;
  serieId: string;
  x: string;
  y: number;
  data?: any;
}

interface ICTTradeChartState {
  tradeFlow: 'both' | 'M' | 'X';
  ictType: 'both' | 'ICTPRD' | 'ICTSRV';
  selectedCountries: string[];
  yearRange?: [number, number];
}

interface AppState {
  customImageUrl: string;
  setCustomImage: (url: string) => void;
  
  selectedChart1: 'mobile' | 'egov' | null;
  setSelectedChart1: (chart: 'mobile' | 'egov' | null) => void;
  
  selectedChart2: 'infrastructure' | 'accessibility' | null;
  setSelectedChart2: (chart: 'infrastructure' | 'accessibility' | null) => void;
  
  selectedChart3: 'ictTrade' | 'education' | null;
  setSelectedChart3: (chart: 'ictTrade' | 'education' | null) => void;
  
  ictTradeChart: ICTTradeChartState;
  setTradeFlow: (flow: 'both' | 'M' | 'X') => void;
  setIctType: (type: 'both' | 'ICTPRD' | 'ICTSRV') => void;
  setSelectedCountries: (countries: string[]) => void;
  setYearRange: (range: [number, number] | undefined) => void;
  resetICTTradeFilters: () => void;
  
  clickedPoint: ClickedPoint | null;
  setClickedPoint: (point: ClickedPoint | null) => void;
  clearClickedPoint: () => void;
  
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  customImageUrl: '',
  setCustomImage: (url: string) => set({ customImageUrl: url }),
  
  selectedChart1: 'mobile',
  setSelectedChart1: (chart) => set({ selectedChart1: chart }),
  
  selectedChart2: 'infrastructure',
  setSelectedChart2: (chart) => set({ selectedChart2: chart }),
  
  selectedChart3: 'ictTrade',
  setSelectedChart3: (chart) => set({ selectedChart3: chart }),
  
  ictTradeChart: {
    tradeFlow: 'both',
    ictType: 'both',
    selectedCountries: [...PACIFIC_COUNTRIES]
  },
  
  setTradeFlow: (flow) => set((state) => ({
    ictTradeChart: { ...state.ictTradeChart, tradeFlow: flow }
  })),
  
  setIctType: (type) => set((state) => ({
    ictTradeChart: { ...state.ictTradeChart, ictType: type }
  })),
  
  setSelectedCountries: (countries) => set((state) => ({
    ictTradeChart: { ...state.ictTradeChart, selectedCountries: countries }
  })),
  
  setYearRange: (range) => set((state) => {
    const newState = { ...state.ictTradeChart };
    if (range === undefined) {
      delete newState.yearRange;
    } else {
      newState.yearRange = range;
    }
    return { ictTradeChart: newState };
  }),
  
  resetICTTradeFilters: () => set(() => ({
    ictTradeChart: {
      tradeFlow: 'both',
      ictType: 'both',
      selectedCountries: [...PACIFIC_COUNTRIES]
    }
  })),
  
  clickedPoint: null,
  setClickedPoint: (point) => set({ clickedPoint: point }),
  clearClickedPoint: () => set({ clickedPoint: null }),
  
  hoveredCountry: null,
  setHoveredCountry: (country) => set({ hoveredCountry: country }),
}));
