// stores/useAppStore.ts
import { create } from 'zustand';

interface ClickedPoint {
  chartId: string,
  serieId: string;
  x: string;
  y: number;
  data?: any,
}

interface AppState {
  // 기존 이미지 관련 상태
  customImageUrl: string;
  setCustomImage: (url: string) => void;
  
  // 첫 번째 섹션 차트 상태 (IT Sector Performance)
  selectedChart1: 'mobile' | 'egov' | null;
  setSelectedChart1: (chart: 'mobile' | 'egov' | null) => void;
  
  // 두 번째 섹션 차트 상태 (Digital Infrastructure)
  selectedChart2: 'infrastructure' | 'accessibility' | null;
  setSelectedChart2: (chart: 'infrastructure' | 'accessibility' | null) => void;
  
  // 클릭된 포인트 상태
  clickedPoint: ClickedPoint | null;
  setClickedPoint: (point: ClickedPoint | null) => void;
  clearClickedPoint: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 기존 이미지 상태
  customImageUrl: '',
  setCustomImage: (url: string) => set({ customImageUrl: url }),
  
  // 첫 번째 섹션 차트 상태 초기값
  selectedChart1: 'mobile',
  setSelectedChart1: (chart) => set({ selectedChart1: chart }),
  
  // 두 번째 섹션 차트 상태 초기값
  selectedChart2: 'infrastructure',
  setSelectedChart2: (chart) => set({ selectedChart2: chart }),
  
  // 클릭 포인트 상태
  clickedPoint: null,
  setClickedPoint: (point) => set({ clickedPoint: point }),
  clearClickedPoint: () => set({ clickedPoint: null }),
}));
