// types/chart.ts
export type ChartId = 'mobile' | 'egov' | 'infrastructure' | 'accessibility' | 'education' | 'ictTrade';

// Sunburst 차트 관련 타입들
export interface SunburstNode {
  id: string;
  parent?: string;
  value?: number;
  children?: SunburstNode[];
}

export interface SunburstFilterOptions {
  tradeFlow?: 'M' | 'X' | 'both';
  ictType?: 'ICTPRD' | 'ICTSRV' | 'both';
  countries?: string[];
  yearRange?: [number, number];
}

export interface SunburstChartConfig {
  height?: number;
  width?: string | number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  borderWidth?: number;
  borderColor?: string;
  enableArcLabels?: boolean;
  enableArcLinkLabels?: boolean;
}

// ICT Trade 관련 타입
export interface ICTTradeRawData {
  GEO_PICT: string;
  TIME_PERIOD: number;
  TRADE_FLOW: 'M' | 'X';
  ICT_PRDSRV: 'ICTPRD' | 'ICTSRV';
  OBS_VALUE: number;
  UNIT_MULT: number;
  OBS_STATUS?: string;
  UNIT_MEASURE?: string;
}

// Software Download Skills 차트용 데이터 타입
export interface DownsoftChartData {
  country: string;
  male: number;
  female: number;
  original_male_value: number | null;
  original_female_value: number | null;
  male_year: number | null;
  female_year: number | null;
}

// D3 히트맵 차트용 데이터 타입
export interface D3HeatmapDataPoint {
  country: string;
  level: string;
  value: number | null;
  year: number | null;
}

// 범례 아이템 타입
export interface LegendItem {
  range: string;
  color: string;
}

// D3 차트 마진 타입
export interface D3ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// 차트 옵션 타입
export interface ChartOption {
  id: string;
  label: string;
}

// ✅ 수정: data/chartData.ts와 일치하는 ProcessedChartData
export interface ProcessedChartData {
  country: string;
  population_covered_4G_percentage: number;
  fixed_broadband_subscriptions_per_100: number;
  original_4G_value: number | null;
  original_broadband_value: number | null;
  coverage_year: number | null;
  broadband_year: number | null;
}

// Chart.js 바 차트용 변환된 데이터 타입
export interface BarChartData {
  country: string;
  IT_MOB_4GNTWK_value: number;
}

// 듀얼 축 차트 컴포넌트 Props 타입
export interface DualAxisChartProps {
  height?: number;
  width?: string;
}

// ✅ 수정: data/chartData.ts와 일치하는 BarChartDataPoint (Nivo 호환)
export interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode: string;
  year: number;
  [key: string]: any; // Nivo BarDatum 호환성을 위한 필수 인덱스 시그니처
}

// Nivo 계산된 바 데이터 타입
export interface ComputedBarDatum<T> {
  data: T;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// Nivo 바 차트 커스텀 레이어 Props 타입
export interface BarCustomLayerProps<T> {
  bars: readonly ComputedBarDatum<T>[];
  xScale: any;
  yScale: any;
}

// ✅ 수정: data/chartData.ts와 일치하는 AccessibilityChartData
export interface AccessibilityChartData {
  country: string;
  internet_usage_percentage: number;
  broadband_subscriptions_per_100: number;
  original_usage_value: number | null;
  original_broadband_value: number | null;
  usage_year: number | null;
  broadband_year: number | null;
}

// Accessibility Bar Chart용 변환된 데이터 타입
export interface AccessibilityBarChartData {
  country: string;
  IT_USE_ii99_value: number;
}

// 추가 유틸리티 타입들
export interface CustomLayerProps {
  xScale: any;
  yScale: any;
  [key: string]: any;
}

export interface BaseChartData {
  country: string;
  [key: string]: any;
}

export interface FlexibleProcessedChartData extends BaseChartData {
  coverage_year?: number | null;
  broadband_year?: number | null;
}

// ✅ 새로 추가: Chart.js 변환용 타입
export interface BarChartItem {
  country: string;
  IT_MOB_4GNTWK_value: number;
}

export interface LineChartData {
  id: string;
  data: { x: string; y: number }[];
}

export interface ScaleRatioResult {
  mobMax: number;
  netMax: number;
  scaleRatio: number;
}

// ✅ 새로 추가: Scatter Plot 관련 타입
export interface ScatterPlotDataPoint {
  x: string;
  y: number;
  country: string;
  sex: string;
  year: number;
}

export interface ScatterPlotData {
  id: string;
  data: ScatterPlotDataPoint[];
}

// ✅ 새로 추가: Education 관련 타입
export interface ProcessedEducationData {
  value: number | null;
  year: number;
  source: string;
}

export interface EducationComputerRawData {
  INDICATOR: string;
  GEO_PICT: string;
  COMPOSITE_BREAKDOWN: string;
  TIME_PERIOD: number;
  OBS_VALUE: number | null;
  UNIT_MEASURE: string;
  REPORTING_TYPE: string;
  DATA_SOURCE: string;
}

// ✅ 새로 추가: Accessibility 관련 스케일 타입
export interface AccessibilityScaleResult {
  usageMax: number;
  broadbandMax: number;
  scaleRatio: number;
}
