// types/chart.ts
export type ChartId = 'mobile' | 'egov' | 'infrastructure' | 'accessibility';

export interface ChartOption {
  id: ChartId;
  label: string;
}

// 차트 데이터 관련 타입 - chartData.ts의 ProcessedChartData와 일치
export interface ProcessedChartData {
  country: string;
  population_covered_4G_percentage: number;
  fixed_broadband_subscriptions_per_100: number;
  original_4G_value: number | null;
  original_broadband_value: number | null;
  coverage_year: number | null;
  broadband_year: number | null;
}

export interface BarChartData {
  country: string;
  IT_MOB_4GNTWK_value: number;
}

export interface ScaleRatioResult {
  mobMax: number;
  netMax: number;
  scaleRatio: number;
}

export interface DualAxisChartProps {
  height?: number;
  width?: string | number;
}

export interface AccessibilityChartData {
  country: string;
  internet_usage_percentage: number;
  broadband_subscriptions_per_100: number;
  original_usage_value: number | null;
  original_broadband_value: number | null;
  usage_year: number | null;
  broadband_year: number | null;
}

export interface DownsoftChartData {
  country: string;
  male: number;
  female: number;
  original_male_value: number | null;
  original_female_value: number | null;
  male_year: number | null;
  female_year: number | null;
}
