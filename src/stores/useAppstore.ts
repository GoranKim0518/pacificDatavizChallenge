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

interface PacificIslandsState {
  activeIsland: string | null;
  connectedIslands: string[];
  visitedSections: string[];
  isAnimating: boolean;
  completionStatus: 'incomplete' | 'complete';
}

interface AppState {
  // 태평양 섬 내비게이션 상태
  pacificIslands: PacificIslandsState;
  setActiveIsland: (island: string | null) => void;
  addConnectedIsland: (island: string) => void;
  setVisitedSections: (sections: string[]) => void;
  setIsAnimating: (animating: boolean) => void;
  resetPacificIslands: () => void;
  
  // 차트 선택 상태
  selectedChart1: 'mobile' | 'egov' | null;
  setSelectedChart1: (chart: 'mobile' | 'egov' | null) => void;
  
  selectedChart2: 'infrastructure' | 'accessibility' | null;
  setSelectedChart2: (chart: 'infrastructure' | 'accessibility' | null) => void;
  
  selectedChart3: 'ictTrade' | 'education' | null;
  setSelectedChart3: (chart: 'ictTrade' | 'education' | null) => void;
  
  // ICT 트레이드 차트 상태
  ictTradeChart: ICTTradeChartState;
  setTradeFlow: (flow: 'both' | 'M' | 'X') => void;
  setIctType: (type: 'both' | 'ICTPRD' | 'ICTSRV') => void;
  setSelectedCountries: (countries: string[]) => void;
  setYearRange: (range: [number, number] | undefined) => void;
  resetICTTradeFilters: () => void;
  
  // 인터랙션 상태
  clickedPoint: ClickedPoint | null;
  setClickedPoint: (point: ClickedPoint | null) => void;
  clearClickedPoint: () => void;
  
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 태평양 섬 내비게이션 초기 상태
  pacificIslands: {
    activeIsland: null,
    connectedIslands: [],
    visitedSections: [],
    isAnimating: false,
    completionStatus: 'incomplete'
  },
  
  setActiveIsland: (island) => set((state) => ({
    pacificIslands: { ...state.pacificIslands, activeIsland: island }
  })),
  
  addConnectedIsland: (island) => set((state) => {
    const newConnectedIslands = [...state.pacificIslands.connectedIslands];
    if (!newConnectedIslands.includes(island)) {
      newConnectedIslands.push(island);
    }
    
    const newVisitedSections = [...state.pacificIslands.visitedSections];
    if (!newVisitedSections.includes(island)) {
      newVisitedSections.push(island);
    }
    
    const completionStatus = newVisitedSections.length === 4 ? 'complete' : 'incomplete';
    
    return {
      pacificIslands: {
        ...state.pacificIslands,
        connectedIslands: newConnectedIslands,
        visitedSections: newVisitedSections,
        completionStatus
      }
    };
  }),
  
  setVisitedSections: (sections) => set((state) => ({
    pacificIslands: { 
      ...state.pacificIslands, 
      visitedSections: sections,
      completionStatus: sections.length === 4 ? 'complete' : 'incomplete'
    }
  })),
  
  setIsAnimating: (animating) => set((state) => ({
    pacificIslands: { ...state.pacificIslands, isAnimating: animating }
  })),
  
  resetPacificIslands: () => set(() => ({
    pacificIslands: {
      activeIsland: null,
      connectedIslands: [],
      visitedSections: [],
      isAnimating: false,
      completionStatus: 'incomplete'
    }
  })),
  
  // 기존 상태들 유지
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
