import rawData from "./json/merged-all.json";

// 기본 데이터 타입 정의
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

// 원본 데이터 타입 캐스팅
const data: RawDataItem[] = rawData as RawDataItem[];

// 태평양 국가 목록
export const PACIFIC_COUNTRIES = [
  'CK', 'FJ', 'FM', 'KI', 'MH', 'NC', 'NR', 'NU', 
  'PF', 'PG', 'PW', 'SB', 'TO', 'TV', 'VU', 'WS'
];

// 이중축 차트용 데이터 타입 - 완전한 null값 처리 및 연도 정보 포함
export interface ProcessedChartData {
  country: string;
  population_covered_4G_percentage: number; // 차트 렌더링용 (null → 0 변환)
  fixed_broadband_subscriptions_per_100: number; // 차트 렌더링용 (null → 0 변환)
  // 툴팁용 원본 데이터 보존
  original_4G_value: number | null;
  original_broadband_value: number | null;
  // 연도 정보 추가
  coverage_year: number | null;
  broadband_year: number | null;
}

export interface DualAxisChartConfig {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: number;
  pointSize: number;
  pointBorderWidth: number;
}

// 차트 기본 설정 - 색상 독립성 확보
export const defaultDualAxisConfig: DualAxisChartConfig = {
  margin: { top: 50, right: 120, bottom: 100, left: 60 },
  padding: 0.3,
  pointSize: 6,
  pointBorderWidth: 2,
};

// 이중축 차트용 데이터 처리 함수 - 완전한 null값 처리 및 연도 정보 포함
export const processChartData = (): ProcessedChartData[] => {
  return PACIFIC_COUNTRIES.map(country => {
    const countryData = data.filter(
      (item: RawDataItem) => item.GEO_PICT === country
    );
    
    // IT_MOB_4GNTWK_value (4G 네트워크 커버리지)가 있는 최신 데이터
    const coverageData = countryData
      .filter(item => item.IT_MOB_4GNTWK_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    // IT_NET_BBND_value (고정 인터넷 구독률)가 있는 최신 데이터
    const broadbandData = countryData
      .filter(item => item.IT_NET_BBND_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    // 원본 값 보존
    const original4G = coverageData?.IT_MOB_4GNTWK_value ?? null;
    const originalBroadband = broadbandData?.IT_NET_BBND_value ?? null;
    
    return {
      country,
      // 차트 렌더링용 - null을 0으로 변환
      population_covered_4G_percentage: original4G ?? 0,
      fixed_broadband_subscriptions_per_100: originalBroadband ?? 0,
      // 툴팁용 - 원본 값 보존
      original_4G_value: original4G,
      original_broadband_value: originalBroadband,
      // 연도 정보 추가
      coverage_year: coverageData?.TIME_PERIOD ?? null,
      broadband_year: broadbandData?.TIME_PERIOD ?? null,
    };
  });
};

// 축 동기화를 위한 스케일 계산 함수
export const calculateScaleRatio = (data: ProcessedChartData[]) => {
  const coverageMax = Math.max(...data.map(d => d.population_covered_4G_percentage));
  const broadbandMax = Math.max(...data.map(d => d.fixed_broadband_subscriptions_per_100));
  
  // 0으로 나누기 방지
  const safeScaleRatio = broadbandMax > 0 ? coverageMax / broadbandMax : 1;
  
  return {
    mobMax: coverageMax,
    netMax: broadbandMax,
    scaleRatio: safeScaleRatio
  };
};

// Nivo 차트용 데이터 변환 함수 - 타입 안전성 확보
export const transformForBarChart = (data: ProcessedChartData[]) => {
  return data.map(item => ({
    country: item.country,
    IT_MOB_4GNTWK_value: item.population_covered_4G_percentage
  }));
};

export const transformForLineChart = (
  data: ProcessedChartData[], 
  scaleRatio: number
) => {
  return [{
    id: 'Fixed_Broadband_Subscriptions',
    data: data.map(d => ({
      x: d.country,
      y: d.fixed_broadband_subscriptions_per_100 * scaleRatio
    }))
  }];
};

// 기존 Scatter Plot 관련 타입 및 데이터 (유지)
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

// Scatter Plot용 데이터 변환 (기존 로직 유지)
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
    const dataPoint: ScatterPlotDataPoint = {
      x: item.GEO_PICT,
      y: item.IT_MOB_OWN_value!,
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

// E-Government Index 바 차트용 타입 정의 (기존 유지)
export interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode: string;
  year: number;
  [key: string]: string | number;
}

// E-Government Index 바 차트용 데이터 변환 (기존 로직 유지)
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

// Downsoft 차트용 데이터 타입 추가
export interface DownsoftChartData {
  country: string;
  male: number;
  female: number;
  original_male_value: number | null;
  original_female_value: number | null;
  male_year: number | null;
  female_year: number | null;
}

// Downsoft 데이터 처리 함수
export const processDownsoftChartData = (): DownsoftChartData[] => {
  const countriesWithBothSex = new Set<string>();
  const countryGenderMap = new Map<string, Set<string>>();
  
  // 성별 데이터가 모두 있는 국가만 찾기
  const filteredData = data.filter(item => 
    item.DOWNSOFT_value !== null && 
    item.SEX !== null && 
    (item.SEX === 'M' || item.SEX === 'F') &&
    PACIFIC_COUNTRIES.includes(item.GEO_PICT)
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
    
    // 남성 데이터 (최신)
    const maleData = countryData
      .filter(item => item.SEX === 'M')
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    // 여성 데이터 (최신)
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


// Digital Accessibility 차트용 데이터 타입 추가
export interface AccessibilityChartData {
  country: string;
  internet_usage_percentage: number; // 차트 렌더링용 (null → 0 변환)
  broadband_subscriptions_per_100: number; // 차트 렌더링용 (null → 0 변환)
  // 툴팁용 원본 데이터 보존
  original_usage_value: number | null;
  original_broadband_value: number | null;
  // 연도 정보 추가
  usage_year: number | null;
  broadband_year: number | null;
}

// Digital Accessibility 차트용 데이터 처리 함수
export const processAccessibilityChartData = (): AccessibilityChartData[] => {
  return PACIFIC_COUNTRIES.map(country => {
    const countryData = data.filter(
      (item: RawDataItem) => item.GEO_PICT === country
    );
    
    // IT_USE_ii99_value (인터넷 사용률)가 있는 최신 데이터
    const usageData = countryData
      .filter(item => item.IT_USE_ii99_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    // IT_NET_BBND_value (고정 인터넷 구독률)가 있는 최신 데이터
    const broadbandData = countryData
      .filter(item => item.IT_NET_BBND_value !== null)
      .sort((a, b) => b.TIME_PERIOD - a.TIME_PERIOD)[0];
    
    // 원본 값 보존
    const originalUsage = usageData?.IT_USE_ii99_value ?? null;
    const originalBroadband = broadbandData?.IT_NET_BBND_value ?? null;
    
    return {
      country,
      // 차트 렌더링용 - null을 0으로 변환
      internet_usage_percentage: originalUsage ?? 0,
      broadband_subscriptions_per_100: originalBroadband ?? 0,
      // 툴팁용 - 원본 값 보존
      original_usage_value: originalUsage,
      original_broadband_value: originalBroadband,
      // 연도 정보 추가
      usage_year: usageData?.TIME_PERIOD ?? null,
      broadband_year: broadbandData?.TIME_PERIOD ?? null,
    };
  });
};

// Accessibility 차트용 막대 차트 변환 함수
export const transformForAccessibilityBarChart = (data: AccessibilityChartData[]) => {
  return data.map(item => ({
    country: item.country,
    IT_USE_ii99_value: item.internet_usage_percentage
  }));
};

// Accessibility 차트용 스케일 계산 함수
export const calculateAccessibilityScaleRatio = (data: AccessibilityChartData[]) => {
  const usageMax = Math.max(...data.map(d => d.internet_usage_percentage));
  const broadbandMax = Math.max(...data.map(d => d.broadband_subscriptions_per_100));
  
  // 0으로 나누기 방지
  const safeScaleRatio = broadbandMax > 0 ? usageMax / broadbandMax : 1;
  
  return {
    usageMax: usageMax,
    broadbandMax: broadbandMax,
    scaleRatio: safeScaleRatio
  };
};
