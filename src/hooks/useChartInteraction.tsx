
// 기본 기능만 제공하는 커스텀 훅 (상태/툴팁/음영/포커스 등 없음)
import { useRef } from 'react';

interface ChartInteractionConfig {
  chartId: string;
}

export const useChartInteraction = (_config: ChartInteractionConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return {
    containerRef
  };
};
