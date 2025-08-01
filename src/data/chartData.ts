import rawData from "./json/merged-all.json";
import educationComputerRawData from "./json/SE_ACS_CMPTR.json";
import ictTradeRawData from "./json/DF_TRADE_ICT_records.json";

export interface RawDataItem {
  GEO_PICT: string;
  TIME_PERIOD: number;
  EGI_value: number | null;
  IT_MOB_4GNTWK_value: number | null;
  IT_NET_BBND_value: number | null;
  IT_USE_ii99_value: number | null;
  NCSI_POLI_value: number | null;
  NCSI_RANK_value: number | null;
  OSI_value: number | null;
  IT_MOB_OWN_value: number | null;
  IT_MOB_4GNTWK_unit: string | null;
  IT_NET_BBND_unit: string | null;
  IT_USE_ii99_unit: string | null;
  IT_MOB_OWN_unit: string | null;
  SEX: string | null;
  AGE: string | null;
  NATURE: string | null;
  DOWNSOFT_value: number | null;
  DOWNSOFT_unit: string | null;
}

const data: RawDataItem[] = rawData as RawDataItem[];

export const PACIFIC_COUNTRIES = [
  'CK', 'FJ', 'FM', 'KI', 'MH', 'NC', 'NR', 'NU', 
  'PF', 'PG', 'PW', 'SB', 'TO', 'TV', 'VU', 'WS'
] as const;

type PacificCountry = typeof PACIFIC_COUNTRIES[number];

// SE_ACS_CMPTR
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

// ICT
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

// Sunburst
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

export const EDUCATION_LEVEL_LABELS = {
  'PRIMARY_ALL': 'Primary Education',
  'SECONDARY_UPPER': 'Upper Secondary', 
  '_Z': 'All Levels'
} as const;

type EducationLevelCode = keyof typeof EDUCATION_LEVEL_LABELS;

// D3.js HeatMap
export interface D3HeatmapDataPoint {
  country: string;
  level: string;
  value: number | null;
  year: number | null;
  source: string | null;
}

interface ProcessedEducationData {
  value: number | null;
  year: number;
  source: string;
}

export const processEducationComputerDataForD3 = (): {
  data: D3HeatmapDataPoint[];
  countries: string[];
  levels: string[];
} => {
  const rawEducationData = educationComputerRawData as EducationComputerRawData[];
  const allowedLevels: EducationLevelCode[] = ['_Z', 'PRIMARY_ALL', 'SECONDARY_UPPER'];
  
  const filteredData = rawEducationData.filter(item => 
    PACIFIC_COUNTRIES.includes(item.GEO_PICT as PacificCountry) && 
    allowedLevels.includes(item.COMPOSITE_BREAKDOWN as EducationLevelCode)
  );

  const dataMap = new Map<string, ProcessedEducationData>();
  
  filteredData.forEach(item => {
    const key = `${item.GEO_PICT}-${item.COMPOSITE_BREAKDOWN}`;
    const existing = dataMap.get(key);
    
    if (!existing || item.TIME_PERIOD > existing.year) {
      dataMap.set(key, {
        value: item.OBS_VALUE,
        year: item.TIME_PERIOD,
        source: item.DATA_SOURCE || 'Unknown'
      });
    }
  });
  
  const heatmapData: D3HeatmapDataPoint[] = [];
  const countries = [...PACIFIC_COUNTRIES].sort();
  const levels = allowedLevels.map(code => EDUCATION_LEVEL_LABELS[code]);
  
  countries.forEach((country) => {
    allowedLevels.forEach((levelCode) => {
      const levelLabel = EDUCATION_LEVEL_LABELS[levelCode];
      const key = `${country}-${levelCode}`;
      const data = dataMap.get(key);
      
      heatmapData.push({
        country: country,
        level: levelLabel,
        value: data?.value ?? null,
        year: data?.year ?? null,
        source: data?.source ?? null
      });
    });
  });
  
  return {
    data: heatmapData,
    countries: countries,
    levels: levels
  };
};

export const getHeatMapColor = (value: number | null): string => {
  if (value === null) return '#f3f4f6';
  if (value >= 80) return '#08306b';
  if (value >= 60) return '#2171b5';
  if (value >= 40) return '#4292c6';
  if (value >= 20) return '#6baed6';
  if (value > 0) return '#c6dbef';
  return '#deebf7';
};

export interface ProcessedChartData {
  country: string;
  population_covered_4G_percentage: number;
  fixed_broadband_subscriptions_per_100: number;
  original_4G_value: number | null;
  original_broadband_value: number | null;
  coverage_year: number | null;
  broadband_year: number | null;
}

export const processChartData = (): ProcessedChartData[] => {
  return PACIFIC_COUNTRIES.map(country => {
    const countryData = data.filter(
      (item: RawDataItem) => item.GEO_PICT === country
    );
    
    const coverageData = countryData
      .filter(item => item.IT_MOB_4GNTWK_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const broadbandData = countryData
      .filter(item => item.IT_NET_BBND_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const original4G = coverageData?.IT_MOB_4GNTWK_value ?? null;
    const originalBroadband = broadbandData?.IT_NET_BBND_value ?? null;
    
    return {
      country,
      population_covered_4G_percentage: original4G ?? 0,
      fixed_broadband_subscriptions_per_100: originalBroadband ?? 0,
      original_4G_value: original4G,
      original_broadband_value: originalBroadband,
      coverage_year: coverageData?.TIME_PERIOD ?? null,
      broadband_year: broadbandData?.TIME_PERIOD ?? null,
    };
  });
};

interface BarChartItem {
  country: string;
  IT_MOB_4GNTWK_value: number;
}

export const transformForBarChart = (data: ProcessedChartData[]): BarChartItem[] => {
  return data.map(item => ({
    country: item.country,
    IT_MOB_4GNTWK_value: item.population_covered_4G_percentage
  }));
};

interface LineChartData {
  id: string;
  data: { x: string; y: number }[];
}

export const transformForLineChart = (
  data: ProcessedChartData[], 
  scaleRatio: number
): LineChartData[] => {
  return [{
    id: 'Fixed_Broadband_Subscriptions',
    data: data.map(d => ({
      x: d.country,
      y: d.fixed_broadband_subscriptions_per_100 * scaleRatio
    }))
  }];
};

interface ScaleRatioResult {
  mobMax: number;
  netMax: number;
  scaleRatio: number;
}

export const calculateScaleRatio = (data: ProcessedChartData[]): ScaleRatioResult => {
  const coverageMax = Math.max(...data.map(d => d.population_covered_4G_percentage));
  const broadbandMax = Math.max(...data.map(d => d.fixed_broadband_subscriptions_per_100));
  
  const safeScaleRatio = broadbandMax > 0 ? coverageMax / broadbandMax : 1;
  
  return {
    mobMax: coverageMax,
    netMax: broadbandMax,
    scaleRatio: safeScaleRatio
  };
};

export interface ScatterPlotDataPoint {
  x: string;
  y: number;
  country: string;
  sex: string;
  year: number;
}

interface ScatterPlotData {
  id: string;
  data: ScatterPlotDataPoint[];
}

export const mobileOwnershipScatterData: ScatterPlotData[] = (() => {
  const filteredData = data.filter(item => 
    item.IT_MOB_OWN_value !== null && 
    item.SEX !== null && 
    (item.SEX === 'M' || item.SEX === 'F')
  );

  const countriesWithBothSex = new Set<string>();
  const countryGenderMap = new Map<string, Set<string>>();
  
  filteredData.forEach(item => {
    if (!countryGenderMap.has(item.GEO_PICT)) {
      countryGenderMap.set(item.GEO_PICT, new Set());
    }
    countryGenderMap.get(item.GEO_PICT)!.add(item.SEX!);
  });

  countryGenderMap.forEach((sexSet, country) => {
    if (sexSet.has('M') && sexSet.has('F')) {
      countriesWithBothSex.add(country);
    }
  });

  const finalData = filteredData.filter(item => 
    countriesWithBothSex.has(item.GEO_PICT)
  );

  const maleData: ScatterPlotDataPoint[] = [];
  const femaleData: ScatterPlotDataPoint[] = [];

  finalData.forEach(item => {
    if (item.IT_MOB_OWN_value === null || item.SEX === null) return;

    const dataPoint: ScatterPlotDataPoint = {
      x: item.GEO_PICT,
      y: item.IT_MOB_OWN_value,
      country: item.GEO_PICT,
      sex: item.SEX === 'M' ? 'Male' : 'Female',
      year: item.TIME_PERIOD
    };

    if (item.SEX === 'M') {
      maleData.push(dataPoint);
    } else if (item.SEX === 'F') {
      femaleData.push(dataPoint);
    }
  });

  return [
    { id: 'Male', data: maleData },
    { id: 'Female', data: femaleData }
  ];
})();

export const availableCountries = Array.from(
  new Set(
    mobileOwnershipScatterData
      .flatMap(series => series.data)
      .map(point => point.country)
  )
).sort();

export interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode: string;
  year: number;
}

export const eGovernmentIndexBarData: BarChartDataPoint[] = (() => {
  const filteredData = data.filter(item => 
    item.EGI_value !== null && 
    item.EGI_value !== undefined
  );

  const countryLatestData = new Map<string, RawDataItem>();
  
  filteredData.forEach(item => {
    const existing = countryLatestData.get(item.GEO_PICT);
    if (!existing || item.TIME_PERIOD > existing.TIME_PERIOD) {
      countryLatestData.set(item.GEO_PICT, item);
    }
  });

  const barData: BarChartDataPoint[] = Array.from(countryLatestData.values())
    .filter(item => item.EGI_value !== null)
    .map(item => ({
      country: item.GEO_PICT,
      value: item.EGI_value!,
      countryCode: item.GEO_PICT,
      year: item.TIME_PERIOD
    }))
    .sort((a, b) => b.value - a.value);

  return barData;
})();

export const egiAvailableCountries = eGovernmentIndexBarData
  .map(item => item.country)
  .sort();

export interface DownsoftChartData {
  country: string;
  male: number;
  female: number;
  original_male_value: number | null;
  original_female_value: number | null;
  male_year: number | null;
  female_year: number | null;
}

export const processDownsoftChartData = (): DownsoftChartData[] => {
  const countriesWithBothSex = new Set<string>();
  const countryGenderMap = new Map<string, Set<string>>();
  
  const filteredData = data.filter(item => 
    item.DOWNSOFT_value !== null && 
    item.SEX !== null && 
    (item.SEX === 'M' || item.SEX === 'F') &&
    PACIFIC_COUNTRIES.includes(item.GEO_PICT as PacificCountry)
  );
  
  filteredData.forEach(item => {
    if (!countryGenderMap.has(item.GEO_PICT)) {
      countryGenderMap.set(item.GEO_PICT, new Set());
    }
    countryGenderMap.get(item.GEO_PICT)!.add(item.SEX!);
  });

  countryGenderMap.forEach((sexSet, country) => {
    if (sexSet.has('M') && sexSet.has('F')) {
      countriesWithBothSex.add(country);
    }
  });

  return Array.from(countriesWithBothSex).map(country => {
    const countryData = filteredData.filter(item => item.GEO_PICT === country);
    
    const maleData = countryData
      .filter(item => item.SEX === 'M')
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const femaleData = countryData
      .filter(item => item.SEX === 'F')
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const originalMale = maleData?.DOWNSOFT_value ?? null;
    const originalFemale = femaleData?.DOWNSOFT_value ?? null;
    
    return {
      country,
      male: originalMale ?? 0,
      female: originalFemale ?? 0,
      original_male_value: originalMale,
      original_female_value: originalFemale,
      male_year: maleData?.TIME_PERIOD ?? null,
      female_year: femaleData?.TIME_PERIOD ?? null,
    };
  });
};

export interface AccessibilityChartData {
  country: string;
  internet_usage_percentage: number;
  broadband_subscriptions_per_100: number;
  original_usage_value: number | null;
  original_broadband_value: number | null;
  usage_year: number | null;
  broadband_year: number | null;
}

export const processAccessibilityChartData = (): AccessibilityChartData[] => {
  return PACIFIC_COUNTRIES.map(country => {
    const countryData = data.filter(
      (item: RawDataItem) => item.GEO_PICT === country
    );
    
    const usageData = countryData
      .filter(item => item.IT_USE_ii99_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const broadbandData = countryData
      .filter(item => item.IT_NET_BBND_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    const originalUsage = usageData?.IT_USE_ii99_value ?? null;
    const originalBroadband = broadbandData?.IT_NET_BBND_value ?? null;
    
    return {
      country,
      internet_usage_percentage: originalUsage ?? 0,
      broadband_subscriptions_per_100: originalBroadband ?? 0,
      original_usage_value: originalUsage,
      original_broadband_value: originalBroadband,
      usage_year: usageData?.TIME_PERIOD ?? null,
      broadband_year: broadbandData?.TIME_PERIOD ?? null,
    };
  });
};

export const transformForAccessibilityBarChart = (data: AccessibilityChartData[]) => {
  return data.map(item => ({
    country: item.country,
    IT_USE_ii99_value: item.internet_usage_percentage
  }));
};

interface AccessibilityScaleResult {
  usageMax: number;
  broadbandMax: number;
  scaleRatio: number;
}

export const calculateAccessibilityScaleRatio = (data: AccessibilityChartData[]): AccessibilityScaleResult => {
  const usageMax = Math.max(...data.map(d => d.internet_usage_percentage));
  const broadbandMax = Math.max(...data.map(d => d.broadband_subscriptions_per_100));
  
  const safeScaleRatio = broadbandMax > 0 ? usageMax / broadbandMax : 1;
  
  return {
    usageMax: usageMax,
    broadbandMax: broadbandMax,
    scaleRatio: safeScaleRatio
  };
};

const ictTradeData: ICTTradeRawData[] = ictTradeRawData as ICTTradeRawData[];

export const processICTTradeDataForSunburst = (
  filters: SunburstFilterOptions = {
    tradeFlow: 'both',
    ictType: 'both',
    countries: [...PACIFIC_COUNTRIES]
  }
): SunburstNode => {
  const targetCountries = filters.countries || [...PACIFIC_COUNTRIES];
  
  // 필터링
  const filteredData = ictTradeData.filter((item: ICTTradeRawData) => {
    if (!item.GEO_PICT || !item.TIME_PERIOD || item.OBS_VALUE == null) {
      return false;
    }

    const countryMatch = targetCountries.includes(item.GEO_PICT);
    const tradeFlowMatch = filters.tradeFlow === 'both' || item.TRADE_FLOW === filters.tradeFlow;
    const ictTypeMatch = filters.ictType === 'both' || item.ICT_PRDSRV === filters.ictType;
    const yearMatch = !filters.yearRange || 
      (item.TIME_PERIOD >= filters.yearRange[0] && item.TIME_PERIOD <= filters.yearRange[1]);
    
    return countryMatch && tradeFlowMatch && ictTypeMatch && yearMatch;
  });

  const aggregatedData = new Map<string, number>();
  
  filteredData.forEach((item: ICTTradeRawData) => {
    const unitMult = item.UNIT_MULT || 0;
    const value = item.OBS_VALUE * Math.pow(10, unitMult - 6);
    
    const tradeFlowKey = item.TRADE_FLOW === 'M' ? 'Imports' : 'Exports';
    const ictTypeKey = item.ICT_PRDSRV === 'ICTPRD' ? 'Products' : 'Services';
    const countryKey = item.GEO_PICT;
    
    const keys = [
      tradeFlowKey,
      `${tradeFlowKey}.${ictTypeKey}`,
      `${tradeFlowKey}.${ictTypeKey}.${countryKey}`
    ];
    
    keys.forEach(key => {
      aggregatedData.set(key, (aggregatedData.get(key) || 0) + value);
    });
  });

  const root: SunburstNode = {
    id: 'ICT Trade',
    children: []
  };

  const tradeFlows = ['Imports', 'Exports'];
  tradeFlows.forEach(tradeFlow => {
    if (filters.tradeFlow !== 'both' && 
        ((filters.tradeFlow === 'M' && tradeFlow !== 'Imports') ||
         (filters.tradeFlow === 'X' && tradeFlow !== 'Exports'))) {
      return;
    }

    const tradeFlowValue = aggregatedData.get(tradeFlow) || 0;
    if (tradeFlowValue === 0) return;

    const tradeFlowNode: SunburstNode = {
      id: tradeFlow,
      value: tradeFlowValue,
      children: []
    };

    const ictTypes = ['Products', 'Services'];
    ictTypes.forEach(ictType => {
      if (filters.ictType !== 'both' && 
          ((filters.ictType === 'ICTPRD' && ictType !== 'Products') ||
           (filters.ictType === 'ICTSRV' && ictType !== 'Services'))) {
        return;
      }

      const ictTypeKey = `${tradeFlow}.${ictType}`;
      const ictTypeValue = aggregatedData.get(ictTypeKey) || 0;
      if (ictTypeValue === 0) return;

      const ictTypeNode: SunburstNode = {
        id: `${tradeFlow}_${ictType}`,
        value: ictTypeValue,
        children: []
      };

      targetCountries.forEach(country => {
        const countryKey = `${tradeFlow}.${ictType}.${country}`;
        const countryValue = aggregatedData.get(countryKey) || 0;
        if (countryValue === 0) return;

        const countryNode: SunburstNode = {
          id: `${tradeFlow}_${ictType}_${country}`,
          value: countryValue
        };

        ictTypeNode.children!.push(countryNode);
      });

      if (ictTypeNode.children!.length > 0) {
        tradeFlowNode.children!.push(ictTypeNode);
      }
    });

    if (tradeFlowNode.children!.length > 0) {
      root.children!.push(tradeFlowNode);
    }
  });

  return root;
};

export const getSunburstColor = (nodeId: string): string => {

  if (nodeId === 'Imports') return '#3b82f6';
  if (nodeId === 'Exports') return '#ef4444';
  

  if (nodeId.includes('Imports_Products')) return '#1d4ed8';
  if (nodeId.includes('Imports_Services')) return '#60a5fa';
  if (nodeId.includes('Exports_Products')) return '#dc2626';
  if (nodeId.includes('Exports_Services')) return '#f87171';
  
  if (nodeId.includes('_')) {
    const parts = nodeId.split('_');
    if (parts.length >= 3) {
      const country = parts[2];
      const index = PACIFIC_COUNTRIES.indexOf(country as PacificCountry);
      const hue = index >= 0 ? (index * 360) / PACIFIC_COUNTRIES.length : 0;
      
      if (nodeId.includes('Imports')) {
        return `hsl(${hue}, 70%, 50%)`;
      } else {
        return `hsl(${hue}, 70%, 65%)`;
      }
    }
  }
  
  return '#6b7280';
};

export const formatSunburstValue = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}B`;
  } else if (value >= 1) {
    return `${value.toFixed(1)}M`;
  } else if (value >= 0.001) {
    return `${(value * 1000).toFixed(1)}K`;
  } else if (value > 0) {
    return `${(value * 1000000).toFixed(0)}`;
  } else {
    return '0';
  }
};

export const getSunburstLabel = (nodeId: string): string => {
  if (nodeId === 'ICT Trade') return 'ICT Trade';
  if (nodeId === 'Imports') return 'Imports';
  if (nodeId === 'Exports') return 'Exports';
  
  if (nodeId.includes('_')) {
    const parts = nodeId.split('_');
    
    if (parts.length === 2) {
      return parts[1];
    } else if (parts.length === 3) {
      return parts[2];
    }
  }
  
  return nodeId;
};
