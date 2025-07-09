interface SizeConfig {
  defaultSize: number;
  selectedSize: number;
}

// createColorFunction과 createTooltipComponent 제거
// 이제 useChartInteraction 훅에서 직접 처리

// 필요시에만 사용할 수 있는 유틸리티 함수들만 유지
export const createSizeFunction = (
  clickedPoint: any,
  config: SizeConfig
) => {
  return (node: any) => {
    try {
      if (!node.data) {
        return config.defaultSize;
      }
      
      if (clickedPoint && 
          clickedPoint.serieId === node.serieId &&
          clickedPoint.x === node.data.x &&
          clickedPoint.y === node.data.y) {
        return config.selectedSize;
      }
      
      return config.defaultSize;
    } catch (error) {
      console.error('NodeSize function error:', error);
      return config.defaultSize;
    }
  };
};
