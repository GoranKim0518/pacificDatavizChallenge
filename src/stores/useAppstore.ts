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
  
  // 차트 관련 상태
  selectedChart: 'mobile' | 'egov' | null;
  clickedPoint: ClickedPoint | null;
  
  // 차트 액션들
  setSelectedChart: (chart: 'mobile' | 'egov' | null) => void;
  setClickedPoint: (point: ClickedPoint | null) => void;
  clearClickedPoint: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 기존 이미지 상태
  customImageUrl: '',
  setCustomImage: (url: string) => set({ customImageUrl: url }),
  
  // 차트 상태 초기값
  selectedChart: null,
  clickedPoint: null,
  
  // 차트 액션들
  setSelectedChart: (chart) => set({ selectedChart: chart }),
  setClickedPoint: (point) => set({ clickedPoint: point }),
  clearClickedPoint: () => set({ clickedPoint: null }),
}));
