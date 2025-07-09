import rawData from "./json/merged-all.json";

// 타입 정의
interface RawDataItem {
  EGI_value: null;
  GEO_PICT: string;
  TIME_PERIOD: number;
  IT_MOB_OWN_value: number | null;
  IT_MOB_OWN_unit: string | null;
  SEX: string | null;
  AGE: string | null;
  NATURE: string | null;
}

interface ScatterPlotDataPoint {
  x: string; // 국가 코드
  y: number; // IT_MOB_OWN_value
  country: string;
  sex: string;
}

interface ScatterPlotData {
  id: string; // 성별 (Male/Female)
  data: ScatterPlotDataPoint[];
}

// 원본 데이터 타입 캐스팅
const data: RawDataItem[] = rawData as RawDataItem[];

// Scatter Plot용 데이터 변환
export const mobileOwnershipScatterData: ScatterPlotData[] = (() => {
  // 1. 필요한 데이터만 필터링 (IT_MOB_OWN_value와 SEX가 null이 아닌 것)
  const filteredData = data.filter(item => 
    item.IT_MOB_OWN_value !== null && 
    item.SEX !== null && 
    (item.SEX === 'M' || item.SEX === 'F')
  );

  // 2. 국가별로 남성과 여성 데이터가 모두 있는 국가만 선택
  const countriesWithBothSex = new Set<string>();
  const countryGenderMap = new Map<string, Set<string>>();
  
  filteredData.forEach(item => {
    if (!countryGenderMap.has(item.GEO_PICT)) {
      countryGenderMap.set(item.GEO_PICT, new Set());
    }
    countryGenderMap.get(item.GEO_PICT)!.add(item.SEX!);
  });

  // 남성과 여성 데이터가 모두 있는 국가만 선택
  countryGenderMap.forEach((sexSet, country) => {
    if (sexSet.has('M') && sexSet.has('F')) {
      countriesWithBothSex.add(country);
    }
  });

  // 3. 최종 데이터 필터링
  const finalData = filteredData.filter(item => 
    countriesWithBothSex.has(item.GEO_PICT)
  );

  // 4. 성별로 그룹화
  const maleData: ScatterPlotDataPoint[] = [];
  const femaleData: ScatterPlotDataPoint[] = [];

  finalData.forEach(item => {
    const dataPoint: ScatterPlotDataPoint = {
      x: item.GEO_PICT,
      y: item.IT_MOB_OWN_value!,
      country: item.GEO_PICT,
      sex: item.SEX === 'M' ? 'Male' : 'Female'
    };

    if (item.SEX === 'M') {
      maleData.push(dataPoint);
    } else if (item.SEX === 'F') {
      femaleData.push(dataPoint);
    }
  });

  return [
    {
      id: 'Male',
      data: maleData
    },
    {
      id: 'Female', 
      data: femaleData
    }
  ];
})();

// 국가 목록 export (필요시 사용)
export const availableCountries = Array.from(
  new Set(
    mobileOwnershipScatterData
      .flatMap(series => series.data)
      .map(point => point.country)
  )
).sort();

// E-Government Index 바 차트용 타입 정의
export interface BarChartDataPoint {
  country: string;
  value: number;
  countryCode: string;
  [key: string]: string | number;
}

// E-Government Index 바 차트용 데이터 변환
export const eGovernmentIndexBarData: BarChartDataPoint[] = (() => {
  // 1. E-Government Index 데이터 필터링 (EGI_value가 null이 아닌 것)
  const filteredData = data.filter(item => 
    item.EGI_value !== null && 
    item.EGI_value !== undefined
  );

  // 2. 국가별로 최신 데이터만 선택 (TIME_PERIOD가 가장 큰 값)
  const countryLatestData = new Map<string, RawDataItem>();
  
  filteredData.forEach(item => {
    const existing = countryLatestData.get(item.GEO_PICT);
    if (!existing || item.TIME_PERIOD > existing.TIME_PERIOD) {
      countryLatestData.set(item.GEO_PICT, item);
    }
  });

  // 3. 바 차트 데이터 형태로 변환
  const barData: BarChartDataPoint[] = Array.from(countryLatestData.values())
    .map(item => ({
      country: item.GEO_PICT,
      value: item.EGI_value!,
      countryCode: item.GEO_PICT
    }))
    .sort((a, b) => b.value - a.value); // 값 기준 내림차순 정렬

  return barData;
})();

// EGI 국가 목록 export
export const egiAvailableCountries = eGovernmentIndexBarData
  .map(item => item.country)
  .sort();
