// types/chart.ts
export type ChartId = 'mobile' | 'egov' | 'infrastructure' | 'accessibility' | 'education' | 'ictTrade';

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

// Chart.js 듀얼 축 차트용 처리된 데이터 타입
export interface ProcessedChartData {
  country: string;
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

// Nivo 바 차트용 데이터 포인트 (인덱스 시그니처 포함)
export interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode?: string;
  year?: number;
  [key: string]: any;
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

// ✅ Digital Accessibility Chart용 데이터 타입 (새로 추가)
export interface AccessibilityChartData {
  country: string;
  broadband_subscriptions_per_100: number;
  original_usage_value: number | null;
  original_broadband_value: number | null;
  usage_year: number | null;
  broadband_year: number | null;
}

// ✅ Accessibility Bar Chart용 변환된 데이터 타입 (새로 추가)
export interface AccessibilityBarChartData {
  country: string;
  IT_USE_ii99_value: number;
}
