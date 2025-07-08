import { useEffect, useRef } from 'react';
import { useAppStore } from '../stores/useAppstore';

interface ChartInteractionConfig {
  chartId: string;
  onPointClick?: (point: any) => void;
  onPointClear?: () => void;
  sizeConfig?: {
    defaultSize: number;
    selectedSize: number;
  };
}

export const useChartInteraction = (config: ChartInteractionConfig) => {
  const { clickedPoint, setClickedPoint, clearClickedPoint } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // 기본 크기 설정
  const sizeConfig = config.sizeConfig || {
    defaultSize: 8,
    selectedSize: 12
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickedPoint && 
          clickedPoint.chartId === config.chartId &&
          containerRef.current && 
          !containerRef.current.contains(event.target as Node)) {
        clearClickedPoint();
        config.onPointClear?.();
      }
    };

    if (clickedPoint && clickedPoint.chartId === config.chartId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedPoint, clearClickedPoint, config.chartId, config.onPointClear]);

  // 포인트 클릭 핸들러
  const handlePointClick = (point: any) => {
    try {
      if (!point || !point.data) {
        console.warn('Invalid point data:', point);
        return;
      }

      const newClickedPoint = {
        chartId: config.chartId,
        serieId: point.serieId,
        x: point.data.x,
        y: point.data.y,
        data: point.data
      };
      
      if (!newClickedPoint.serieId || newClickedPoint.x === undefined || newClickedPoint.y === undefined) {
        console.warn('Invalid clicked point data:', newClickedPoint);
        return;
      }
      
      if (clickedPoint && 
          clickedPoint.chartId === config.chartId &&
          clickedPoint.serieId === newClickedPoint.serieId &&
          clickedPoint.x === newClickedPoint.x &&
          clickedPoint.y === newClickedPoint.y) {
        clearClickedPoint();
        config.onPointClear?.();
      } else {
        setClickedPoint(newClickedPoint);
        config.onPointClick?.(newClickedPoint);
      }
    } catch (error) {
      console.error('Point click error:', error);
    }
  };

  // 현재 차트의 클릭된 포인트인지 확인
  const isCurrentChartPoint = clickedPoint?.chartId === config.chartId;

  // 포인트가 선택된 포인트인지 확인하는 함수
  const isPointSelected = (node: any) => {
    if (!isCurrentChartPoint || !node.data) return false;
    return clickedPoint.serieId === node.serieId &&
           clickedPoint.x === node.data.x &&
           clickedPoint.y === node.data.y;
  };

  // 포인트 크기를 반환하는 함수
  const getPointSize = (node: any) => {
    try {
      if (!node.data) {
        return sizeConfig.defaultSize;
      }
      
      return isPointSelected(node) ? sizeConfig.selectedSize : sizeConfig.defaultSize;
    } catch (error) {
      console.error('Point size calculation error:', error);
      return sizeConfig.defaultSize;
    }
  };

  // 크기 함수 생성기 (Nivo 차트의 nodeSize prop에 직접 사용 가능)
  const createSizeFunction = () => {
    return (node: any) => getPointSize(node);
  };

  return {
    containerRef,
    handlePointClick,
    clickedPoint: isCurrentChartPoint ? clickedPoint : null,
    clearClickedPoint,
    isPointSelected,
    getPointSize,
    createSizeFunction,
    sizeConfig
  };
};
