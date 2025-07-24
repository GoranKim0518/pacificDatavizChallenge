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
